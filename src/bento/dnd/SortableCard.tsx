'use client'

/**
 * OpenBento - Sortable Card
 * 
 * 可排序卡片组件，带 Framer Motion 动画
 * 游戏引擎级别的拖拽体验
 */

import React, { forwardRef } from 'react'
import { useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import { motion, AnimatePresence } from 'framer-motion'

// ============ Types ============

export interface SortableCardProps {
    id: string
    children: React.ReactNode
    /** 是否禁用拖拽 */
    disabled?: boolean
    /** 自定义 className */
    className?: string
    /** 自定义样式 */
    style?: React.CSSProperties
    /** 拖拽手柄模式 - 如果为 true，必须点击 data-drag-handle 元素才能拖拽 */
    handleMode?: boolean
}

// ============ SortableCard Component ============

export const SortableCard = forwardRef<HTMLDivElement, SortableCardProps>(
    ({ id, children, disabled = false, className, style, handleMode = false }, ref) => {
        const {
            attributes,
            listeners,
            setNodeRef,
            transform,
            transition,
            isDragging,
            isOver,
            isSorting,
        } = useSortable({
            id,
            disabled,
            // 优雅的过渡配置 - Apple 风格
            transition: {
                duration: 300, // 300ms - 快速但优雅
                easing: 'cubic-bezier(0.32, 0.72, 0, 1)', // Apple 的经典 easing
            },
        })

        // 计算 transform 样式 - 让其他卡片平滑让位
        const transformStyle: React.CSSProperties = {
            transform: CSS.Transform.toString(transform),
            // 优雅的过渡曲线 - Apple easing
            transition: isDragging
                ? 'none' // 拖拽中的卡片不需要过渡
                : transition || 'transform 300ms cubic-bezier(0.32, 0.72, 0, 1)',
            // Ensure no layout shift during drag
            willChange: isDragging ? 'transform' : 'auto',
        }

        // 合并 refs
        const combinedRef = (node: HTMLDivElement | null) => {
            setNodeRef(node)
            if (typeof ref === 'function') {
                ref(node)
            } else if (ref) {
                ref.current = node
            }
        }

        // 动画变体配置 - 优雅简洁，无缩放
        const variants = {
            idle: {
                opacity: 1,
            },
            placeholder: {
                // 被拖拽卡片原位置的占位符 - 优雅的淡化效果，无边框
                opacity: 0.3,
            },
        }

        // 选择当前动画状态
        const getAnimationState = () => {
            if (isDragging) return 'placeholder'
            return 'idle'
        }

        // 拖拽手柄 props
        const dragProps = handleMode ? {} : { ...attributes, ...listeners }
        const handleProps = handleMode ? { ...attributes, ...listeners } : {}

        return (
            <motion.div
                ref={combinedRef}
                className={`sortable-card ${isDragging ? 'sortable-card--dragging' : ''} ${className || ''}`}
                style={{
                    ...transformStyle,
                    ...style,
                    position: 'relative',
                    cursor: isDragging ? 'grabbing' : 'grab',
                    touchAction: 'none',
                    userSelect: 'none',
                    willChange: isSorting ? 'transform' : 'auto',
                    // Remove any extra borders/outlines
                    outline: 'none',
                    border: 'none',
                }}
                initial="idle"
                animate={getAnimationState()}
                variants={variants}
                transition={{
                    // 优雅的 tween 动画，比 spring 更可控
                    type: 'tween',
                    duration: 0.25,
                    ease: [0.32, 0.72, 0, 1], // Apple easing
                }}
                layout={false} // Disable layout animation to avoid conflicts with @dnd-kit
                {...dragProps}
                data-sortable-id={id}
                data-is-dragging={isDragging}
                data-is-sorting={isSorting}
            >
                {/* 提供 handleProps 给子组件 */}
                {typeof children === 'function'
                    ? (children as (props: { handleProps: typeof handleProps; isDragging: boolean }) => React.ReactNode)({ handleProps, isDragging })
                    : children
                }
            </motion.div>
        )
    }
)

SortableCard.displayName = 'SortableCard'

// ============ Card Overlay (用于 DragOverlay) ============

export interface CardOverlayProps {
    children: React.ReactNode
    style?: React.CSSProperties
    className?: string
}

export const CardOverlay: React.FC<CardOverlayProps> = ({
    children,
    style,
    className,
}) => {
    return (
        <motion.div
            className={`card-overlay ${className || ''}`}
            style={{
                ...style,
                cursor: 'grabbing',
                touchAction: 'none',
            }}
            initial={{ opacity: 0.9, boxShadow: '0 2px 8px rgba(0,0,0,0.08)' }}
            animate={{
                opacity: 1,
                // 优雅的阴影提升，无缩放
                boxShadow: '0 20px 40px rgba(0,0,0,0.12), 0 8px 16px rgba(0,0,0,0.08)',
            }}
            transition={{
                type: 'tween',
                duration: 0.2,
                ease: [0.32, 0.72, 0, 1], // Apple easing
            }}
        >
            {children}
        </motion.div>
    )
}

// ============ Drag Handle ============

export interface DragHandleProps {
    children?: React.ReactNode
    className?: string
    style?: React.CSSProperties
}

export const DragHandle: React.FC<DragHandleProps & { handleProps?: Record<string, unknown> }> = ({
    children,
    className,
    style,
    handleProps = {},
}) => {
    return (
        <div
            className={`drag-handle ${className || ''}`}
            style={{
                cursor: 'grab',
                ...style,
            }}
            data-drag-handle
            {...handleProps}
        >
            {children || (
                <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor" opacity={0.4}>
                    <circle cx="4" cy="4" r="1.5" />
                    <circle cx="12" cy="4" r="1.5" />
                    <circle cx="4" cy="8" r="1.5" />
                    <circle cx="12" cy="8" r="1.5" />
                    <circle cx="4" cy="12" r="1.5" />
                    <circle cx="12" cy="12" r="1.5" />
                </svg>
            )}
        </div>
    )
}

export default SortableCard
