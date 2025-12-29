'use client'

/**
 * [INPUT]: (query: string, onSelect: (location) => void) - Search query string and selection callback
 * [OUTPUT]: React component - Location search dropdown with Google Maps Places API integration
 * [POS]: Located at /bento/editor, provides location search functionality for map widget editing
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

// ============ Google Maps Places API Service ============

class PlacesService {
    private apiKey: string | null = null
    private autocompleteService: google.maps.places.AutocompleteService | null = null
    private placesService: google.maps.places.PlacesService | null = null
    private isLoaded = false

    constructor() {
        if (typeof window !== 'undefined') {
            this.apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || null
        }
    }

    async loadScript(): Promise<boolean> {
        if (this.isLoaded) return true
        if (!this.apiKey) {
            console.warn('Google Maps API key not configured. Set NEXT_PUBLIC_GOOGLE_MAPS_API_KEY environment variable.')
            return false
        }

        return new Promise((resolve) => {
            // Check if script already exists
            if (window.google?.maps?.places) {
                this.isLoaded = true
                this.initializeServices()
                resolve(true)
                return
            }

            // Load Google Maps script
            const script = document.createElement('script')
            script.src = `https://maps.googleapis.com/maps/api/js?key=${this.apiKey}&libraries=places`
            script.async = true
            script.defer = true
            script.onload = () => {
                this.isLoaded = true
                this.initializeServices()
                resolve(true)
            }
            script.onerror = () => {
                console.error('Failed to load Google Maps script')
                resolve(false)
            }
            document.head.appendChild(script)
        })
    }

    private initializeServices() {
        if (window.google?.maps?.places) {
            this.autocompleteService = new window.google.maps.places.AutocompleteService()
            // Create a dummy div for PlacesService (it requires a DOM element)
            const dummyDiv = document.createElement('div')
            this.placesService = new window.google.maps.places.PlacesService(dummyDiv)
        }
    }

    async searchPlaces(query: string): Promise<LocationResult[]> {
        if (!this.isLoaded) {
            const loaded = await this.loadScript()
            if (!loaded) return []
        }

        if (!this.autocompleteService) {
            console.error('AutocompleteService not initialized')
            return []
        }

        return new Promise((resolve) => {
            this.autocompleteService!.getPlacePredictions(
                {
                    input: query,
                    types: ['geocode'], // Restrict to addresses
                },
                (predictions, status) => {
                    if (status === 'OK' && predictions) {
                        const results: LocationResult[] = predictions.map((p) => ({
                            place_id: p.place_id,
                            description: p.description,
                            structured_formatting: {
                                main_text: p.structured_formatting.main_text,
                                secondary_text: p.structured_formatting.secondary_text,
                            },
                        }))
                        resolve(results)
                    } else {
                        resolve([])
                    }
                }
            )
        })
    }

    async getPlaceDetails(placeId: string): Promise<{
        lat: number
        lng: number
        label: string
    } | null> {
        if (!this.isLoaded) {
            const loaded = await this.loadScript()
            if (!loaded) return null
        }

        if (!this.placesService) {
            console.error('PlacesService not initialized')
            return null
        }

        return new Promise((resolve) => {
            this.placesService!.getDetails(
                {
                    placeId,
                    fields: ['geometry', 'formatted_address', 'name'],
                },
                (place, status) => {
                    if (status === 'OK' && place?.geometry?.location) {
                        resolve({
                            lat: place.geometry.location.lat(),
                            lng: place.geometry.location.lng(),
                            label: place.formatted_address || place.name || '',
                        })
                    } else {
                        resolve(null)
                    }
                }
            )
        })
    }
}

// Global service instance
const placesService = new PlacesService()

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
                const searchResults = await placesService.searchPlaces(query)
                setResults(searchResults)
            } catch (error) {
                console.error('Error searching places:', error)
                setResults([])
            } finally {
                setIsLoading(false)
            }
        }, 300) // 300ms debounce

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
            const details = await placesService.getPlaceDetails(result.place_id)
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

            {/* No API Key Warning */}
            {!process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY && (
                <div className="p-3 border-t border-white/10">
                    <div className="text-xs text-white/60">
                        Configure NEXT_PUBLIC_GOOGLE_MAPS_API_KEY to enable location search
                    </div>
                </div>
            )}
        </motion.div>
    )
}

export default LocationSearch
