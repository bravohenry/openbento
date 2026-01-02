'use client'

/**
 * [INPUT]: (rect: DOMRect, onSelect: (location) => void, onClose: () => void) - Widget position rect, selection callback, close callback
 * [OUTPUT]: React component - Location search dropdown with OpenStreetMap Nominatim API integration
 * [POS]: Located at /bento/editor, provides location search functionality for map widget editing using free OSM Nominatim service
 * 
 * [PROTOCOL]:
 * 1. Once this file's logic changes, this Header must be synchronized immediately.
 * 2. After update, must check upward whether the parent folder's .folder.md description is still accurate.
 */

import React, { useState, useEffect, useRef, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { cn } from '@/design-system/utils/cn'

// ============ Types ============

export interface LocationResult {
    place_id: string
    description: string
    structured_formatting: {
        main_text: string
        secondary_text: string
    }
    geometry?: {
        location: {
            lat: number
            lng: number
        }
    }
}

export interface LocationSearchProps {
    rect: DOMRect
    onSelect: (location: {
        lat: number
        lng: number
        label: string
    }) => void
    onClose: () => void
}

// ============ OpenStreetMap Nominatim API Service ============

interface NominatimResult {
    place_id: number
    display_name: string
    lat: string
    lon: string
    address?: {
        city?: string
        town?: string
        village?: string
        state?: string
        country?: string
    }
}

class LocationSearchService {
    private readonly baseUrl = 'https://nominatim.openstreetmap.org'
    private readonly userAgent = 'OpenBento/1.0' // Required by Nominatim usage policy

    // Extract short location name from full display name
    // Example: "Savannah, Chatham County, Georgia, United States" -> "Savannah, Georgia"
    // Or: "San Francisco, CA, United States" -> "San Francisco, CA"
    private extractShortLabel(displayName: string, address?: NominatimResult['address']): string {
        const parts = displayName.split(',').map(p => p.trim())
        
        // If we have structured address data, prefer it
        if (address) {
            const city = address.city || address.town || address.village
            const state = address.state
            
            if (city && state) {
                // Use city and state (state might be abbreviation or full name)
                return `${city}, ${state}`
            } else if (city) {
                return city
            } else if (state) {
                return state
            }
        }
        
        // Fallback: use first 2 parts of display_name
        // Usually format is: "City, State/Province/County, Country"
        // We want: "City, State/Province" (skip county if present)
        if (parts.length >= 3) {
            // Skip middle parts that might be county, use city and state
            return `${parts[0]}, ${parts[parts.length - 2]}`
        } else if (parts.length === 2) {
            return `${parts[0]}, ${parts[1]}`
        } else if (parts.length === 1) {
            return parts[0]
        }
        
        return displayName
    }

    async searchPlaces(query: string): Promise<LocationResult[]> {
        if (!query.trim()) return []

        try {
            const url = new URL(`${this.baseUrl}/search`)
            url.searchParams.set('q', query)
            url.searchParams.set('format', 'json')
            url.searchParams.set('limit', '10')
            url.searchParams.set('addressdetails', '1')
            url.searchParams.set('extratags', '1')

            const response = await fetch(url.toString(), {
                headers: {
                    'User-Agent': this.userAgent,
                    'Accept': 'application/json',
                },
            })

            if (!response.ok) {
                console.error('Nominatim API error:', response.statusText)
                return []
            }

            const data: NominatimResult[] = await response.json()

            return data.map((item) => {
                // Extract main text and secondary text from display_name
                const parts = item.display_name.split(',')
                const mainText = parts[0]?.trim() || ''
                const secondaryText = parts.slice(1, 3).join(',').trim() || ''

                return {
                    place_id: item.place_id.toString(),
                    description: item.display_name,
                    structured_formatting: {
                        main_text: mainText,
                        secondary_text: secondaryText,
                    },
                    geometry: {
                        location: {
                            lat: parseFloat(item.lat),
                            lng: parseFloat(item.lon),
                        },
                    },
                }
            })
        } catch (error) {
            console.error('Error searching places:', error)
            return []
        }
    }

    async getPlaceDetails(placeId: string, lat?: number, lng?: number, label?: string): Promise<{
        lat: number
        lng: number
        label: string
    } | null> {
        // If we already have coordinates from search results, use them
        if (lat !== undefined && lng !== undefined && label) {
            // Extract short label from full display name
            const shortLabel = this.extractShortLabel(label)
            return {
                lat,
                lng,
                label: shortLabel,
            }
        }

        // Otherwise, fetch details by place_id
        try {
            const url = new URL(`${this.baseUrl}/lookup`)
            url.searchParams.set('osm_ids', `N${placeId}`)
            url.searchParams.set('format', 'json')
            url.searchParams.set('addressdetails', '1')

            const response = await fetch(url.toString(), {
                headers: {
                    'User-Agent': this.userAgent,
                    'Accept': 'application/json',
                },
            })

            if (!response.ok) {
                console.error('Nominatim lookup error:', response.statusText)
                return null
            }

            const data: NominatimResult[] = await response.json()
            if (data.length === 0) return null

            const item = data[0]
            // Extract short label from full display name
            const shortLabel = this.extractShortLabel(item.display_name, item.address)
            return {
                lat: parseFloat(item.lat),
                lng: parseFloat(item.lon),
                label: shortLabel,
            }
        } catch (error) {
            console.error('Error getting place details:', error)
            return null
        }
    }
}

// Global service instance
const locationSearchService = new LocationSearchService()

// ============ Component ============

export const LocationSearch: React.FC<LocationSearchProps> = ({ rect, onSelect, onClose }) => {
    const [query, setQuery] = useState('')
    const [results, setResults] = useState<LocationResult[]>([])
    const [isLoading, setIsLoading] = useState(false)
    const [selectedIndex, setSelectedIndex] = useState(-1)
    const inputRef = useRef<HTMLInputElement>(null)
    const containerRef = useRef<HTMLDivElement>(null)
    const searchTimeoutRef = useRef<NodeJS.Timeout | null>(null)

    // Focus input on mount
    useEffect(() => {
        inputRef.current?.focus()
    }, [])

    // Search places with debounce
    useEffect(() => {
        if (searchTimeoutRef.current) {
            clearTimeout(searchTimeoutRef.current)
        }

        if (!query.trim()) {
            setResults([])
            setIsLoading(false)
            return
        }

        setIsLoading(true)
        searchTimeoutRef.current = setTimeout(async () => {
            try {
                const searchResults = await locationSearchService.searchPlaces(query)
                setResults(searchResults)
            } catch (error) {
                console.error('Error searching places:', error)
                setResults([])
            } finally {
                setIsLoading(false)
            }
        }, 500) // 500ms debounce (Nominatim has rate limits, slightly longer debounce)

        return () => {
            if (searchTimeoutRef.current) {
                clearTimeout(searchTimeoutRef.current)
            }
        }
    }, [query])

    // Handle keyboard navigation
    const handleKeyDown = useCallback((e: React.KeyboardEvent) => {
        if (e.key === 'ArrowDown') {
            e.preventDefault()
            setSelectedIndex((prev) => (prev < results.length - 1 ? prev + 1 : prev))
        } else if (e.key === 'ArrowUp') {
            e.preventDefault()
            setSelectedIndex((prev) => (prev > 0 ? prev - 1 : -1))
        } else if (e.key === 'Enter') {
            e.preventDefault()
            if (selectedIndex >= 0 && results[selectedIndex]) {
                handleSelectResult(results[selectedIndex])
            }
        } else if (e.key === 'Escape') {
            onClose()
        }
    }, [results, selectedIndex, onClose])

    // Handle result selection
    const handleSelectResult = async (result: LocationResult) => {
        setIsLoading(true)
        try {
            // Use coordinates from search result if available, otherwise fetch details
            const lat = result.geometry?.location.lat
            const lng = result.geometry?.location.lng
            const label = result.description

            const details = await locationSearchService.getPlaceDetails(
                result.place_id,
                lat,
                lng,
                label
            )
            
            if (details) {
                onSelect(details)
                onClose()
            }
        } catch (error) {
            console.error('Error getting place details:', error)
        } finally {
            setIsLoading(false)
        }
    }

    // Close on outside click
    useEffect(() => {
        const handleClickOutside = (e: MouseEvent) => {
            if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
                onClose()
            }
        }
        document.addEventListener('mousedown', handleClickOutside)
        return () => document.removeEventListener('mousedown', handleClickOutside)
    }, [onClose])

    return (
        <motion.div
            ref={containerRef}
            className={cn(
                'fixed backdrop-blur-xl bg-black/90 rounded-[12px]',
                'shadow-[0px_4px_16px_rgba(0,0,0,0.25)]',
                'border border-white/5',
                'z-[9999]',
                'w-[320px]'
            )}
            style={{
                left: rect.left + rect.width / 2,
                top: rect.bottom + 8,
                transform: 'translateX(-50%)',
            }}
            initial={{ opacity: 0, y: -4, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -4, scale: 0.95 }}
            transition={{
                type: 'spring',
                stiffness: 300,
                damping: 30,
            }}
            onPointerDown={(e) => e.stopPropagation()}
            onClick={(e) => e.stopPropagation()}
        >
            {/* Search Input */}
            <div className="p-3 border-b border-white/10">
                <div className="relative flex items-center gap-2">
                    <input
                        ref={inputRef}
                        type="text"
                        value={query}
                        onChange={(e) => {
                            setQuery(e.target.value)
                            setSelectedIndex(-1)
                        }}
                        onKeyDown={handleKeyDown}
                        placeholder="Search Location"
                        className={cn(
                            'flex-1 px-3 py-2',
                            'bg-white/10 border border-white/20 rounded-lg',
                            'text-sm text-white placeholder:text-white/40',
                            'focus:outline-none focus:border-white/40',
                            'transition-colors'
                        )}
                    />
                    {isLoading && (
                        <div className="absolute right-3 w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    )}
                </div>
            </div>

            {/* Results List */}
            <AnimatePresence>
                {results.length > 0 && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="max-h-[240px] overflow-y-auto"
                    >
                        {results.map((result, index) => (
                            <motion.button
                                key={result.place_id}
                                onClick={() => handleSelectResult(result)}
                                className={cn(
                                    'w-full px-3 py-2.5 text-left',
                                    'hover:bg-white/10 transition-colors',
                                    'border-b border-white/5 last:border-b-0',
                                    selectedIndex === index && 'bg-white/10'
                                )}
                                whileHover={{ backgroundColor: 'rgba(255, 255, 255, 0.15)' }}
                                whileTap={{ scale: 0.98 }}
                            >
                                <div className="text-sm font-medium text-white">
                                    {result.structured_formatting.main_text}
                                </div>
                                {result.structured_formatting.secondary_text && (
                                    <div className="text-xs text-white/60 mt-0.5">
                                        {result.structured_formatting.secondary_text}
                                    </div>
                                )}
                            </motion.button>
                        ))}
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Empty State */}
            {!isLoading && query.trim() && results.length === 0 && (
                <div className="p-4 text-center text-sm text-white/40">
                    No results found
                </div>
            )}

        </motion.div>
    )
}

export default LocationSearch
