'use client'

/**
 * [INPUT]: (widget: WidgetConfig, onDelete, onSizeChange, onUpdate) - Widget configuration and edit callbacks
 * [OUTPUT]: React component - Edit overlay with delete button, size picker, and location search button (map widget only), rendered via Portal
 * [POS]: Located at /bento/editor, provides floating edit controls for selected widgets, tracks widget position using getBoundingClientRect and RAF. For map widgets, includes location search functionality via Google Maps Places API.
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
import { LocationSearch } from './LocationSearch'

// ============ Props ============

interface WidgetEditOverlayProps {
    widget: WidgetConfig
    onDelete: () => void
    onSizeChange: (size: WidgetSize) => void
    onUpdate?: (updates: Partial<WidgetConfig>) => void
    onClose?: () => void
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
    onClose,
}) => {
    const [rect, setRect] = React.useState<DOMRect | null>(null)
    const [isVisible, setIsVisible] = React.useState(false)
    const [showLocationSearch, setShowLocationSearch] = React.useState(false)

    // Update position loop and close on scroll
    React.useEffect(() => {
        let lastRect: DOMRect | null = null

        const updatePosition = () => {
            const element = document.getElementById(`widget-${widget.id}`)
            if (element) {
                const newRect = element.getBoundingClientRect()
                // Only update if changes are significant to avoid thrashing
                setRect((prev) => {
                    if (!prev) {
                        lastRect = newRect
                        return newRect
                    }
                    if (
                        Math.abs(prev.x - newRect.x) > 1 ||
                        Math.abs(prev.y - newRect.y) > 1 ||
                        prev.width !== newRect.width
                    ) {
                        lastRect = newRect
                        return newRect
                    }
                    return prev
                })
                setIsVisible(true)
            } else {
                setIsVisible(false)
            }
        }

        // Close overlay on any scroll/touch interaction (same as avatar overlay)
        const handleClose = () => {
            if (onClose) {
                onClose()
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

        // Listen to all possible scroll-related events to close overlay
        window.addEventListener('scroll', handleClose, { passive: true, capture: true })
        window.addEventListener('wheel', handleClose, { passive: true, capture: true })
        window.addEventListener('touchmove', handleClose, { passive: true, capture: true })
        window.addEventListener('resize', updatePosition, { passive: true })

        // Also listen on document for global scroll detection
        document.addEventListener('scroll', handleClose, { passive: true, capture: true })
        document.addEventListener('wheel', handleClose, { passive: true, capture: true })
        document.addEventListener('touchmove', handleClose, { passive: true, capture: true })

        // Also listen to scroll events on all scrollable parent containers
        let currentElement: HTMLElement | null = element?.parentElement || null
        const scrollableParents: HTMLElement[] = []
        
        while (currentElement && currentElement !== document.body) {
            const overflow = window.getComputedStyle(currentElement).overflow
            const overflowY = window.getComputedStyle(currentElement).overflowY
            if (overflow === 'auto' || overflow === 'scroll' || overflow === 'overlay' ||
                overflowY === 'auto' || overflowY === 'scroll' || overflowY === 'overlay') {
                scrollableParents.push(currentElement)
                currentElement.addEventListener('scroll', handleClose, { passive: true })
                currentElement.addEventListener('wheel', handleClose, { passive: true })
                currentElement.addEventListener('touchmove', handleClose, { passive: true })
            }
            currentElement = currentElement.parentElement
        }

        // Use requestAnimationFrame to detect position changes (catches all scroll types)
        let animationFrameId: number
        const checkPosition = () => {
            if (element && lastRect) {
                const currentRect = element.getBoundingClientRect()
                // If position changed significantly (more than 1px), close overlay
                if (
                    Math.abs(currentRect.top - lastRect.top) > 1 ||
                    Math.abs(currentRect.left - lastRect.left) > 1
                ) {
                    if (onClose) {
                        onClose()
                    }
                    return
                }
                lastRect = currentRect
            }
            animationFrameId = requestAnimationFrame(checkPosition)
        }
        animationFrameId = requestAnimationFrame(checkPosition)

        return () => {
            window.removeEventListener('scroll', handleClose, { capture: true })
            window.removeEventListener('wheel', handleClose, { capture: true })
            window.removeEventListener('touchmove', handleClose, { capture: true })
            window.removeEventListener('resize', updatePosition)
            document.removeEventListener('scroll', handleClose, { capture: true })
            document.removeEventListener('wheel', handleClose, { capture: true })
            document.removeEventListener('touchmove', handleClose, { capture: true })
            scrollableParents.forEach(parent => {
                parent.removeEventListener('scroll', handleClose)
                parent.removeEventListener('wheel', handleClose)
                parent.removeEventListener('touchmove', handleClose)
            })
            if (resizeObserver) resizeObserver.disconnect()
            cancelAnimationFrame(animationFrameId)
        }
    }, [widget.id, onClose])

    // Wait for rect to be available
    if (!rect || !isVisible) return null

    // Map widget check
    const isMapWidget = widget.category === 'map'

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

            {/* Size Picker - Bottom Center relative to widget */}
            <motion.div
                className={cn(
                    'fixed backdrop-blur-xl bg-black/90 rounded-[12px]',
                    'shadow-[0px_4px_16px_rgba(0,0,0,0.25)]',
                    'border border-white/5',
                    'px-1.5 py-1.5',
                    'flex items-center gap-1.5',
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
                {/* Size Icons Row */}
                <div className="flex items-center gap-0.5">
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
                </div>

                {/* Location Search Button - Only for Map Widget, on the right */}
                {isMapWidget && (
                    <>
                        <div className="w-[1px] h-4 bg-white/10" />
                        <motion.button
                            onClick={(e) => {
                                e.stopPropagation()
                                e.preventDefault()
                                setShowLocationSearch(!showLocationSearch)
                            }}
                            onPointerDown={(e) => {
                                e.stopPropagation()
                            }}
                            className={cn(
                                'rounded-[8px] flex items-center justify-center',
                                'size-[28px]',
                                showLocationSearch
                                    ? 'bg-white shadow-sm'
                                    : 'bg-transparent text-white/60 hover:bg-white/10'
                            )}
                            title="Search Location"
                            whileHover={{
                                backgroundColor: showLocationSearch ? undefined : 'rgba(255, 255, 255, 0.1)',
                            }}
                            whileTap={{ scale: 0.95 }}
                            transition={{
                                type: 'tween',
                                duration: 0.15,
                                ease: [0.32, 0.72, 0, 1],
                            }}
                        >
                            <svg
                                width="14"
                                height="14"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            >
                                <circle cx="11" cy="11" r="8" />
                                <path d="m21 21-4.35-4.35" />
                            </svg>
                        </motion.button>
                    </>
                )}
            </motion.div>

            {/* Location Search Dropdown */}
            {isMapWidget && showLocationSearch && onUpdate && (
                <LocationSearch
                    rect={rect}
                    onSelect={(location) => {
                        onUpdate({
                            location,
                        } as Partial<MapWidgetConfig>)
                        setShowLocationSearch(false)
                    }}
                    onClose={() => setShowLocationSearch(false)}
                />
            )}
        </div>
    )

    // Using a portal to document.body ensures it's unrelated to widget styling/clipping
    // Check if document exists (SSR)
    if (typeof document === 'undefined') return null
    return ReactDOM.createPortal(overlayContent, document.body)
}

export default WidgetEditOverlay
