'use client'

/**
 * [INPUT]: (widget: WidgetConfig, onDelete, onSizeChange, onUpdate) - Widget configuration and edit callbacks
 * [OUTPUT]: React component - Edit overlay with delete button, size picker, and map widget edit form, rendered via Portal
 * [POS]: Located at /bento/editor, provides floating edit controls for selected widgets, tracks widget position using getBoundingClientRect and RAF
 * 
 * [PROTOCOL]:
 * 1. Once this file's logic changes, this Header must be synchronized immediately.
 * 2. After update, must check upward whether the parent folder's .folder.md description is still accurate.
 */

import React from 'react'
import ReactDOM from 'react-dom'
import { motion, AnimatePresence } from 'framer-motion'
import type { WidgetConfig, WidgetSize, MapWidgetConfig } from '../widgets/types'
import { SIZE_VARIANTS } from '../widgets/types'
import { cn } from '@/design-system/utils/cn'

// ============ Props ============

interface WidgetEditOverlayProps {
    widget: WidgetConfig
    onDelete: () => void
    onSizeChange: (size: WidgetSize) => void
    onUpdate?: (updates: Partial<WidgetConfig>) => void
}

// ============ Delete Icon ============

const DeleteIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg
        width="18"
        height="18"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className={className}
    >
        <path d="M3 6h18M19 6v14a2 2 0 01-2 2H7a2 2 0 01-2-2V6m3 0V4a2 2 0 012-2h4a2 2 0 012 2v2" />
    </svg>
)

// ============ Map Edit Form ============

interface MapEditFormProps {
    widget: MapWidgetConfig
    rect: DOMRect
    onUpdate: (updates: Partial<MapWidgetConfig>) => void
    onClose: () => void
}

const MapEditForm: React.FC<MapEditFormProps> = ({ widget, rect, onUpdate, onClose }) => {
    const [title, setTitle] = React.useState(widget.title || 'Where I live')
    const [address, setAddress] = React.useState(widget.location?.label || '')
    const [lat, setLat] = React.useState(widget.location?.lat?.toString() || '')
    const [lng, setLng] = React.useState(widget.location?.lng?.toString() || '')
    const [style, setStyle] = React.useState(widget.style || 'light')

    const handleSave = () => {
        const updates: Partial<MapWidgetConfig> = {
            title,
            style,
        }

        if (lat && lng) {
            const latNum = parseFloat(lat)
            const lngNum = parseFloat(lng)
            if (!isNaN(latNum) && !isNaN(lngNum)) {
                updates.location = {
                    lat: latNum,
                    lng: lngNum,
                    label: address || undefined,
                }
            }
        }

        onUpdate(updates)
        onClose()
    }

    return (
        <motion.div
            className={cn(
                'fixed backdrop-blur-xl bg-white rounded-[16px]',
                'shadow-[0px_8px_32px_rgba(0,0,0,0.15)]',
                'border border-black/10',
                'p-4',
                'z-[9999]',
                'w-[320px]'
            )}
            style={{
                left: rect.right + 16,
                top: rect.top,
            }}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -10 }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            onPointerDown={(e) => e.stopPropagation()}
        >
            <div className="space-y-3">
                <div className="flex items-center justify-between mb-2">
                    <h3 className="text-sm font-semibold text-black">Edit Map</h3>
                    <button
                        onClick={onClose}
                        className="text-black/40 hover:text-black/60 transition-colors"
                    >
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <line x1="18" y1="6" x2="6" y2="18" />
                            <line x1="6" y1="6" x2="18" y2="18" />
                        </svg>
                    </button>
                </div>

                {/* Title Input */}
                <div>
                    <label className="block text-xs font-medium text-black/60 mb-1.5">Title</label>
                    <input
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        className="w-full px-3 py-2 bg-white border border-black/10 rounded-lg text-sm text-black placeholder:text-black/30 focus:outline-none focus:border-blue-500"
                        placeholder="Where I live"
                    />
                </div>

                {/* Address Input */}
                <div>
                    <label className="block text-xs font-medium text-black/60 mb-1.5">Address</label>
                    <input
                        type="text"
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                        className="w-full px-3 py-2 bg-white border border-black/10 rounded-lg text-sm text-black placeholder:text-black/30 focus:outline-none focus:border-blue-500"
                        placeholder="Berlin, Germany"
                    />
                </div>

                {/* Coordinates */}
                <div className="grid grid-cols-2 gap-2">
                    <div>
                        <label className="block text-xs font-medium text-black/60 mb-1.5">Latitude</label>
                        <input
                            type="number"
                            step="any"
                            value={lat}
                            onChange={(e) => setLat(e.target.value)}
                            className="w-full px-3 py-2 bg-white border border-black/10 rounded-lg text-sm text-black placeholder:text-black/30 focus:outline-none focus:border-blue-500"
                            placeholder="52.52"
                        />
                    </div>
                    <div>
                        <label className="block text-xs font-medium text-black/60 mb-1.5">Longitude</label>
                        <input
                            type="number"
                            step="any"
                            value={lng}
                            onChange={(e) => setLng(e.target.value)}
                            className="w-full px-3 py-2 bg-white border border-black/10 rounded-lg text-sm text-black placeholder:text-black/30 focus:outline-none focus:border-blue-500"
                            placeholder="13.405"
                        />
                    </div>
                </div>

                {/* Style Selector */}
                <div>
                    <label className="block text-xs font-medium text-black/60 mb-1.5">Map Style</label>
                    <div className="flex gap-2">
                        {(['light', 'dark', 'satellite'] as const).map((s) => (
                            <button
                                key={s}
                                onClick={() => setStyle(s)}
                                className={cn(
                                    'flex-1 px-3 py-2 rounded-lg text-xs font-medium transition-colors',
                                    style === s
                                        ? 'bg-black text-white'
                                        : 'bg-black/5 text-black/60 hover:bg-black/10'
                                )}
                            >
                                {s.charAt(0).toUpperCase() + s.slice(1)}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Save Button */}
                <button
                    onClick={handleSave}
                    className="w-full px-4 py-2 bg-black text-white rounded-lg text-sm font-semibold hover:bg-black/90 transition-colors mt-2"
                >
                    Save
                </button>
            </div>
        </motion.div>
    )
}

// ============ Size Icon (Visual representation) ============

interface SizeIconProps {
    size: WidgetSize
    isActive: boolean
}

const SizeIcon: React.FC<SizeIconProps> = ({ size, isActive }) => {
    // Inactive: White (faded), Active: Black (sharp against white bg)
    const stroke = isActive ? 'black' : 'rgba(255,255,255,0.6)'
    const fill = isActive ? 'rgba(255,255,255,0.15)' : 'none'
    const strokeWidth = 1.5

    // SVG viewBox is 24x24, shapes are positioned within
    const renderShape = () => {
        switch (size) {
            case '1x1':
                // Small square
                return (
                    <rect
                        x="7" y="7"
                        width="10" height="10"
                        rx="2.5"
                        stroke={stroke}
                        strokeWidth={strokeWidth}
                    />
                )
            case '2x1':
                // Horizontal rectangle (wide)
                return (
                    <rect
                        x="4" y="8"
                        width="16" height="8"
                        rx="2.5"
                        stroke={stroke}
                        strokeWidth={strokeWidth}
                    />
                )
            case '1x2':
                // Vertical rectangle (tall)
                return (
                    <rect
                        x="8" y="4"
                        width="8" height="16"
                        rx="2.5"
                        stroke={stroke}
                        strokeWidth={strokeWidth}
                    />
                )
            case '2x2':
                // Large square
                return (
                    <rect
                        x="4" y="4"
                        width="16" height="16"
                        rx="2.5"
                        stroke={stroke}
                        strokeWidth={strokeWidth}
                    />
                )
            case 'bar':
                // Thin horizontal bar
                return (
                    <rect
                        x="4" y="10"
                        width="16" height="4"
                        rx="2"
                        stroke={stroke}
                        strokeWidth={strokeWidth}
                    />
                )
            default:
                return null
        }
    }

    return (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
            {renderShape()}
        </svg>
    )
}

// ============ Component ============

export const WidgetEditOverlay: React.FC<WidgetEditOverlayProps> = ({
    widget,
    onDelete,
    onSizeChange,
    onUpdate,
}) => {
    const [rect, setRect] = React.useState<DOMRect | null>(null)
    const [isVisible, setIsVisible] = React.useState(false)
    const [showEditForm, setShowEditForm] = React.useState(false)

    // Update position loop
    React.useEffect(() => {
        const updatePosition = () => {
            const element = document.getElementById(`widget-${widget.id}`)
            if (element) {
                const newRect = element.getBoundingClientRect()
                // Only update if changes are significant to avoid thrashing
                setRect((prev) => {
                    if (!prev) return newRect
                    if (
                        Math.abs(prev.x - newRect.x) > 1 ||
                        Math.abs(prev.y - newRect.y) > 1 ||
                        prev.width !== newRect.width
                    ) {
                        return newRect
                    }
                    return prev
                })
                setIsVisible(true)
            } else {
                setIsVisible(false)
            }
        }

        updatePosition()

        // Use ResizeObserver for the target element
        const element = document.getElementById(`widget-${widget.id}`)
        let resizeObserver: ResizeObserver | null = null

        if (element) {
            resizeObserver = new ResizeObserver(updatePosition)
            resizeObserver.observe(element)
        }

        // Also track window scroll/resize
        window.addEventListener('scroll', updatePosition, { passive: true })
        window.addEventListener('resize', updatePosition, { passive: true })

        // Fast animation loop for smooth tracking during layout changes
        let animationFrameId: number
        const loop = () => {
            updatePosition()
            animationFrameId = requestAnimationFrame(loop)
        }
        animationFrameId = requestAnimationFrame(loop)

        return () => {
            window.removeEventListener('scroll', updatePosition)
            window.removeEventListener('resize', updatePosition)
            if (resizeObserver) resizeObserver.disconnect()
            cancelAnimationFrame(animationFrameId)
        }
    }, [widget.id])

    // Wait for rect to be available
    if (!rect || !isVisible) return null

    // Map widget edit form
    const isMapWidget = widget.category === 'map'
    const mapWidget = widget as MapWidgetConfig

    // Render via Portal
    const overlayContent = (
        <div 
            data-widget-overlay 
            onPointerDown={(e) => e.stopPropagation()} 
            onClick={(e) => e.stopPropagation()}
            onMouseDown={(e) => e.stopPropagation()}
        >
            {/* Delete Button - Top Left relative to widget */}
            <motion.button
                onClick={(e) => {
                    e.stopPropagation()
                    e.preventDefault()
                    onDelete()
                }}
                onPointerDown={(e) => {
                    e.stopPropagation()
                }}
                className={cn(
                    'fixed rounded-full shadow-lg',
                    'size-[34px] flex items-center justify-center',
                    'z-[9999]'
                )}
                style={{
                    left: rect.left - 12,
                    top: rect.top - 12,
                    backgroundColor: 'white',
                    cursor: 'pointer',
                }}
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0, opacity: 0 }}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                transition={{
                    type: 'spring',
                    stiffness: 500,
                    damping: 30,
                }}
            >
                <DeleteIcon className="text-black" />
            </motion.button>

            {/* Map Widget Edit Form - Right side of widget */}
            {isMapWidget && onUpdate && (
                <AnimatePresence>
                    {showEditForm ? (
                        <MapEditForm
                            widget={mapWidget}
                            rect={rect}
                            onUpdate={onUpdate}
                            onClose={() => setShowEditForm(false)}
                        />
                    ) : (
                        <motion.button
                            onClick={(e) => {
                                e.stopPropagation()
                                e.preventDefault()
                                setShowEditForm(true)
                            }}
                            onPointerDown={(e) => {
                                e.stopPropagation()
                            }}
                            className={cn(
                                'fixed rounded-full shadow-lg',
                                'size-[34px] flex items-center justify-center',
                                'z-[9999]'
                            )}
                            style={{
                                left: rect.right - 12,
                                top: rect.top - 12,
                                backgroundColor: 'white',
                                cursor: 'pointer',
                            }}
                            initial={{ scale: 0, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0, opacity: 0 }}
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.95 }}
                            transition={{
                                type: 'spring',
                                stiffness: 500,
                                damping: 30,
                            }}
                        >
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-black">
                                <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
                                <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
                            </svg>
                        </motion.button>
                    )}
                </AnimatePresence>
            )}

            {/* Size Picker - Bottom Center relative to widget */}
            <motion.div
                className={cn(
                    'fixed backdrop-blur-xl bg-black/90 rounded-[12px]',
                    'shadow-[0px_4px_16px_rgba(0,0,0,0.25)]',
                    'border border-white/5',
                    'px-1.5 py-1.5',
                    'flex items-center gap-0.5',
                    'z-[9999]'
                )}
                style={{
                    left: rect.left + rect.width / 2,
                    top: rect.bottom - 20,
                    cursor: 'default',
                }}
                onPointerDown={(e) => e.stopPropagation()}
                onClick={(e) => e.stopPropagation()}
                initial={{ opacity: 0, y: -4, x: '-50%' }}
                animate={{ opacity: 1, y: 0, x: '-50%' }}
                exit={{ opacity: 0, y: -4, x: '-50%' }}
                transition={{
                    type: 'spring',
                    stiffness: 500,
                    damping: 30,
                }}
            >
                {SIZE_VARIANTS.map((size) => {
                    const isActive = widget.size === size

                    return (
                        <motion.button
                            key={size}
                            onClick={(e) => {
                                e.stopPropagation()
                                e.preventDefault()
                                onSizeChange(size)
                            }}
                            onPointerDown={(e) => {
                                e.stopPropagation()
                            }}
                            className={cn(
                                'rounded-[8px] flex items-center justify-center',
                                'size-[28px]',
                                isActive
                                    ? 'bg-white shadow-sm'
                                    : 'bg-transparent text-white/60'
                            )}
                            title={size}
                            whileHover={{
                                backgroundColor: isActive ? undefined : 'rgba(255, 255, 255, 0.1)',
                            }}
                            whileTap={{ scale: 0.95 }}
                            transition={{
                                type: 'tween',
                                duration: 0.15,
                                ease: [0.32, 0.72, 0, 1],
                            }}
                        >
                            <SizeIcon size={size} isActive={isActive} />
                        </motion.button>
                    )
                })}
            </motion.div>
        </div>
    )

    // Using a portal to document.body ensures it's unrelated to widget styling/clipping
    // Check if document exists (SSR)
    if (typeof document === 'undefined') return null
    return ReactDOM.createPortal(overlayContent, document.body)
}

export default WidgetEditOverlay
