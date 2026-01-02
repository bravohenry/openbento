'use client'

/**
 * [INPUT]: (config: MapWidgetConfig, onClick?: () => void, isEditing?: boolean, onConfigChange?: (updates) => void) - Map widget configuration, optional click handler, editing state, config change callback
 * [OUTPUT]: React component - Static map widget using mapcn with MapLibre GL, displays location with marker. All map interactions (drag, zoom, etc.) are permanently disabled.
 * [POS]: Map widget component in bento/widgets/map, renders static map using mapcn library within BentoCard container, all mouse interactions are disabled for both edit and non-edit modes
 * 
 * [PROTOCOL]:
 * 1. Once this file's logic changes, this Header must be synchronized immediately.
 * 2. After update, must check upward whether the parent folder's .folder.md description is still accurate.
 */

import React, { useMemo, useEffect, useRef } from 'react'
import { BentoCard } from '@/bento/core'
import { Card } from '@/design-system/patterns/Card'
import { Map, MapControls, MapMarker, MarkerContent, useMap } from '@/components/ui/map'
import type { MapWidgetConfig, WidgetProps } from '../types'

// ============ Map Widget Component ============

// Internal component to handle map interactions
const MapContent: React.FC<{
    location?: MapWidgetConfig['location']
    zoom?: number
    isEditing: boolean
    onConfigChange?: (updates: Partial<MapWidgetConfig>) => void
    config: MapWidgetConfig
}> = ({ location, zoom: configZoom, isEditing, onConfigChange, config }) => {
    const { map, isLoaded } = useMap()
    const isUpdatingRef = useRef(false)

    // Disable all map interactions (always, regardless of edit mode)
    useEffect(() => {
        if (!map || !isLoaded) return

        // Always disable all interactions
        map.dragPan.disable()
        map.scrollZoom.disable()
        map.boxZoom.disable()
        map.dragRotate.disable()
        map.keyboard.disable()
        map.doubleClickZoom.disable()
        map.touchZoomRotate.disable()
    }, [map, isLoaded])

    // Update map view when config changes (from external sources like search)
    // Only update when location or zoom changes externally, not from user interaction
    const prevLocationRef = useRef(location)
    const prevZoomRef = useRef(configZoom)

    useEffect(() => {
        if (!map || !isLoaded || isUpdatingRef.current) return

        // Check if location or zoom changed externally (not from map moveend)
        const locationChanged = 
            prevLocationRef.current?.lat !== location?.lat ||
            prevLocationRef.current?.lng !== location?.lng
        const zoomChanged = prevZoomRef.current !== configZoom

        if (location && (locationChanged || zoomChanged)) {
            const targetZoom = configZoom ?? 13 // Default zoom for searched locations

            isUpdatingRef.current = true
            map.flyTo({
                center: [location.lng, location.lat],
                zoom: targetZoom,
                duration: 500,
            })
            // Reset flag after animation
            setTimeout(() => {
                isUpdatingRef.current = false
            }, 600)

            // Update refs
            prevLocationRef.current = location
            prevZoomRef.current = configZoom
        }
    }, [map, isLoaded, location, configZoom])

    return null
}

export const MapWidget: React.FC<WidgetProps<MapWidgetConfig>> = ({
    config,
    onClick,
    isEditing = false,
    onConfigChange,
}) => {
    const { title, location, size, zoom } = config

    // Convert location from {lat, lng} to [lng, lat] format for mapcn
    const mapCenter = useMemo<[number, number] | undefined>(() => {
        if (!location) return undefined
        return [location.lng, location.lat]
    }, [location])

    // Default center (San Francisco) if no location provided
    const defaultCenter: [number, number] = [-122.4194, 37.7749]
    const center = mapCenter || defaultCenter
    const mapZoom = zoom ?? 11 // Use config zoom or default

    return (
        <BentoCard
            size={size}
            clickable={!isEditing}
            onClick={onClick}
        >
                {/* Map container with Card wrapper */}
                <Card
                    className="h-full w-full overflow-hidden"
                    rounded="lg"
                    padding="none"
                    style={{ 
                        height: '100%', 
                        width: '100%', 
                        position: 'relative'
                    }}
                >
                {location ? (
                    <Map center={center} zoom={mapZoom} interactive={false}>
                        <MapContent
                            location={location}
                            zoom={zoom}
                            isEditing={isEditing}
                            onConfigChange={onConfigChange}
                            config={config}
                        />
                        <MapMarker longitude={location.lng} latitude={location.lat} draggable={false}>
                            <MarkerContent>
                                <div style={{
                                    width: 26,
                                    height: 26,
                                    borderRadius: '50%',
                                    backgroundColor: '#5871FF',
                                    border: '3px solid white',
                                    boxShadow: '0 4px 24px rgba(0,0,0,0.3)',
                                }} />
                            </MarkerContent>
                        </MapMarker>
                    </Map>
                ) : (
                    <Map center={center} zoom={mapZoom} interactive={false}>
                        <MapContent
                            location={location}
                            zoom={zoom}
                            isEditing={isEditing}
                            onConfigChange={onConfigChange}
                            config={config}
                        />
                    </Map>
                )}

                {/* 标签 (Figma 风格玻璃态按钮) - 优先显示 location.label，如果没有则显示 title */}
                {(location?.label || title) && (
                    <div style={{
                        position: 'absolute',
                        bottom: 20,
                        left: 20,
                        height: 38,
                        backgroundColor: 'rgba(255, 255, 255, 0.7)',
                        backdropFilter: 'blur(20px) saturate(160%)',
                        padding: '0 16px',
                        borderRadius: 12,
                        display: 'flex',
                        alignItems: 'center',
                        gap: 8,
                        border: '1px solid rgba(255, 255, 255, 0.4)',
                        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.05), 0 1px 2px rgba(0, 0, 0, 0.05)',
                        pointerEvents: 'none',
                        zIndex: 10,
                    }}>
                        <span style={{ fontSize: 18, lineHeight: 1 }}>🏡</span>
                        <span style={{
                            fontFamily: 'Inter, sans-serif',
                            fontSize: 14,
                            fontWeight: 500,
                            color: '#000',
                            letterSpacing: '-0.01em'
                        }}>
                            {location?.label || title}
                        </span>
                    </div>
                )}
            </Card>
        </BentoCard>
    )
}

// ============ 创建 MapWidgetConfig ============

export function createMapWidgetConfig(
    title: string = 'Where I live',
    size: MapWidgetConfig['size'] = '2x2',
    location?: MapWidgetConfig['location'],
    zoom?: number
): MapWidgetConfig {
    return {
        id: `map-${Date.now()}`,
        category: 'map',
        size,
        title,
        location,
        zoom,
    }
}

export default MapWidget
