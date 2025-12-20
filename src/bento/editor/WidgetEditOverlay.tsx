'use client'

/**
 * OpenBento - Widget Edit Overlay
 * 
 * Widget 编辑覆盖层组件
 * 显示删除按钮和尺寸选择器
 */

import React from 'react'
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

// ============ Component ============

export const WidgetEditOverlay: React.FC<WidgetEditOverlayProps> = ({
    widget,
    onDelete,
    onSizeChange,
}) => {
    return (
        <>
            {/* Delete Button - Top Left */}
            <motion.button
                onClick={(e) => {
                    e.stopPropagation()
                    onDelete()
                }}
                className={cn(
                    'absolute top-[-10px] left-[-10px]',
                    'bg-white rounded-full shadow-lg',
                    'size-[34px] flex items-center justify-center',
                    'z-50'
                )}
                aria-label="Delete widget"
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0, opacity: 0 }}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                transition={{
                    type: 'tween',
                    duration: 0.2,
                    ease: [0.32, 0.72, 0, 1],
                }}
            >
                <DeleteIcon className="text-black" />
            </motion.button>

            {/* Size Picker - Bottom Center */}
            <motion.div
                className={cn(
                    'absolute bottom-[-50px] left-1/2',
                    'backdrop-blur-md bg-white/90 rounded-[12px]',
                    'shadow-[0px_8px_24px_rgba(0,0,0,0.12)]',
                    'border border-black/5',
                    'px-3 py-2',
                    'flex items-center gap-2',
                    'z-50'
                )}
                style={{
                    transform: 'translateX(-50%)', // Use transform instead of Tailwind class for better performance
                }}
                onClick={(e) => e.stopPropagation()}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{
                    type: 'tween',
                    duration: 0.25,
                    ease: [0.32, 0.72, 0, 1],
                }}
            >
                {SIZE_VARIANTS.map((size) => {
                    const isActive = widget.size === size
                    const [cols, rows] = size.split('x').map(Number)

                    return (
                        <motion.button
                            key={size}
                            onClick={(e) => {
                                e.stopPropagation()
                                onSizeChange(size)
                            }}
                            className={cn(
                                'px-3 py-1.5 rounded-[8px]',
                                'text-[12px] font-medium',
                                isActive
                                    ? 'bg-black text-white'
                                    : 'bg-white/50 text-black/60'
                            )}
                            title={`${cols}×${rows}`}
                            whileHover={{
                                backgroundColor: isActive ? undefined : 'rgba(0, 0, 0, 0.05)',
                            }}
                            whileTap={{ scale: 0.95 }}
                            transition={{
                                type: 'tween',
                                duration: 0.15,
                                ease: [0.32, 0.72, 0, 1],
                            }}
                        >
                            {size}
                        </motion.button>
                    )
                })}
            </motion.div>
        </>
    )
}

export default WidgetEditOverlay

