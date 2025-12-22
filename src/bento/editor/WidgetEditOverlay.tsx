'use client'

/**
 * 🔄 UPDATE ME: If this file changes, update this header AND /src/bento/editor/ARCHITECTURE.md
 *
 * @input  - WidgetConfig (来自 widgets/types), cn (样式工具), ReactDOM (Portal)
 * @output - WidgetEditOverlay (删除按钮 + 尺寸选择器浮层)
 * @pos    - 编辑器 UI 层，通过 Portal 渲染在 document.body，独立于卡片 DOM
 *
 * 使用 getBoundingClientRect + RAF 实时追踪选中卡片位置
 */

import React from 'react'
import ReactDOM from 'react-dom'
import { motion, AnimatePresence } from 'framer-motion'
import type { WidgetConfig, WidgetSize } from '../widgets/types'
import { SIZE_VARIANTS } from '../widgets/types'
import { cn } from '@/design-system/utils/cn'

// ============ Props ============

interface WidgetEditOverlayProps {
    widget: WidgetConfig
    onDelete: () => void
    onSizeChange: (size: WidgetSize) => void
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
}) => {
    const [rect, setRect] = React.useState<DOMRect | null>(null)
    const [isVisible, setIsVisible] = React.useState(false)

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

    // Render via Portal
    const overlayContent = (
        <>
            {/* Delete Button - Top Left relative to widget */}
            <motion.button
                onClick={(e) => {
                    e.stopPropagation()
                    onDelete()
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
                    'flex items-center gap-0.5',
                    'z-[9999]'
                )}
                style={{
                    left: rect.left + rect.width / 2,
                    top: rect.bottom - 20,
                    cursor: 'default',
                }}
                onPointerDown={(e) => e.stopPropagation()} // Prevent dragging the widget when clicking picker
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
                                onSizeChange(size)
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
        </>
    )

    // Using a portal to document.body ensures it's unrelated to widget styling/clipping
    // Check if document exists (SSR)
    if (typeof document === 'undefined') return null
    return ReactDOM.createPortal(overlayContent, document.body)
}

export default WidgetEditOverlay
