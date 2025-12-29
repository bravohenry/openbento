import React, { useState, useRef, useEffect, cloneElement, isValidElement } from 'react'
import { createPortal } from 'react-dom'
import { cn } from '../../utils/cn'
import { radii } from '../../tokens/radii'
import { shadows } from '../../tokens/shadows'
import type { TooltipProps, TooltipPlacement } from './Tooltip.types'

// ============ 位置计算 ============

interface Position {
    top: number
    left: number
    arrowTop?: number
    arrowLeft?: number
    arrowRotation?: number
}

function calculatePosition(
    triggerRect: DOMRect,
    tooltipRect: DOMRect,
    placement: TooltipPlacement,
    offset: number = 8
): Position {
    const scrollX = window.scrollX
    const scrollY = window.scrollY

    let top = 0
    let left = 0

    const basePlacement = placement.split('-')[0]
    const alignment = placement.split('-')[1] || 'center'

    switch (basePlacement) {
        case 'top':
            top = triggerRect.top + scrollY - tooltipRect.height - offset
            left = triggerRect.left + scrollX + (triggerRect.width - tooltipRect.width) / 2
            break
        case 'bottom':
            top = triggerRect.bottom + scrollY + offset
            left = triggerRect.left + scrollX + (triggerRect.width - tooltipRect.width) / 2
            break
        case 'left':
            top = triggerRect.top + scrollY + (triggerRect.height - tooltipRect.height) / 2
            left = triggerRect.left + scrollX - tooltipRect.width - offset
            break
        case 'right':
            top = triggerRect.top + scrollY + (triggerRect.height - tooltipRect.height) / 2
            left = triggerRect.right + scrollX + offset
            break
    }

    // 对齐调整
    if (basePlacement === 'top' || basePlacement === 'bottom') {
        if (alignment === 'start') {
            left = triggerRect.left + scrollX
        } else if (alignment === 'end') {
            left = triggerRect.right + scrollX - tooltipRect.width
        }
    } else {
        if (alignment === 'start') {
            top = triggerRect.top + scrollY
        } else if (alignment === 'end') {
            top = triggerRect.bottom + scrollY - tooltipRect.height
        }
    }

    return { top, left }
}

/**
 * Tooltip - 工具提示组件
 * 
 * @example
 * ```tsx
 * <Tooltip content="This is a tooltip">
 *   <Button>Hover me</Button>
 * </Tooltip>
 * 
 * <Tooltip content="Click to copy" placement="right" hasArrow>
 *   <IconButton icon={<CopyIcon />} />
 * </Tooltip>
 * ```
 */
export function Tooltip(props: TooltipProps) {
    const {
        content,
        children,
        placement = 'top',
        delay = 200,
        hideDelay = 0,
        disabled = false,
        hasArrow = false,
        maxWidth = 280,
        style,
        className,
    } = props

    const [isVisible, setIsVisible] = useState(false)
    const [position, setPosition] = useState<Position>({ top: 0, left: 0 })
    const triggerRef = useRef<HTMLElement>(null)
    const tooltipRef = useRef<HTMLDivElement>(null)
    const showTimeoutRef = useRef<number | undefined>(undefined)
    const hideTimeoutRef = useRef<number | undefined>(undefined)

    // 计算位置
    const updatePosition = () => {
        if (triggerRef.current && tooltipRef.current) {
            const triggerRect = triggerRef.current.getBoundingClientRect()
            const tooltipRect = tooltipRef.current.getBoundingClientRect()
            const newPosition = calculatePosition(triggerRect, tooltipRect, placement)
            setPosition(newPosition)
        }
    }

    useEffect(() => {
        if (isVisible) {
            updatePosition()
            window.addEventListener('scroll', updatePosition, true)
            window.addEventListener('resize', updatePosition)
        }
        return () => {
            window.removeEventListener('scroll', updatePosition, true)
            window.removeEventListener('resize', updatePosition)
        }
    }, [isVisible, placement])

    // 显示
    const show = () => {
        if (disabled) return
        clearTimeout(hideTimeoutRef.current)
        showTimeoutRef.current = window.setTimeout(() => {
            setIsVisible(true)
        }, delay)
    }

    // 隐藏
    const hide = () => {
        clearTimeout(showTimeoutRef.current)
        hideTimeoutRef.current = window.setTimeout(() => {
            setIsVisible(false)
        }, hideDelay)
    }

    // 清理
    useEffect(() => {
        return () => {
            clearTimeout(showTimeoutRef.current)
            clearTimeout(hideTimeoutRef.current)
        }
    }, [])

    // 克隆子元素并添加事件
    const trigger = isValidElement(children)
        ? cloneElement(children as React.ReactElement<any>, {
            ref: triggerRef,
            onMouseEnter: (e: React.MouseEvent) => {
                show()
                    ; (children as React.ReactElement<any>).props.onMouseEnter?.(e)
            },
            onMouseLeave: (e: React.MouseEvent) => {
                hide()
                    ; (children as React.ReactElement<any>).props.onMouseLeave?.(e)
            },
            onFocus: (e: React.FocusEvent) => {
                show()
                    ; (children as React.ReactElement<any>).props.onFocus?.(e)
            },
            onBlur: (e: React.FocusEvent) => {
                hide()
                    ; (children as React.ReactElement<any>).props.onBlur?.(e)
            },
        })
        : children

    // Tooltip 样式
    const tooltipStyles: React.CSSProperties = {
        position: 'fixed',
        top: position.top,
        left: position.left,
        padding: '8px 12px',
        fontSize: '10px',
        fontWeight: 400, // regular
        color: '#000000', // black text
        background: '#fafafa', // 1% gray background
        borderRadius: radii.lg,
        boxShadow: 'none', // no shadow
        maxWidth: typeof maxWidth === 'number' ? `${maxWidth}px` : maxWidth,
        zIndex: 9999,
        pointerEvents: 'none',
        animation: 'tooltipFadeIn 0.15s ease-out',
        ...style,
    }

    // 箭头样式
    const arrowStyles: React.CSSProperties = {
        position: 'absolute',
        width: 8,
        height: 8,
        background: '#ffffff', // white background
        transform: 'rotate(45deg)',
        ...(placement.startsWith('top') && { bottom: -4, left: '50%', marginLeft: -4 }),
        ...(placement.startsWith('bottom') && { top: -4, left: '50%', marginLeft: -4 }),
        ...(placement.startsWith('left') && { right: -4, top: '50%', marginTop: -4 }),
        ...(placement.startsWith('right') && { left: -4, top: '50%', marginTop: -4 }),
    }

    // Portal 渲染
    const tooltipContent = isVisible && typeof document !== 'undefined' && (
        createPortal(
            <div
                ref={tooltipRef}
                className={cn('tooltip', className)}
                style={tooltipStyles}
                role="tooltip"
            >
                {content}
                {hasArrow && <div style={arrowStyles} />}
            </div>,
            document.body
        )
    )

    return (
        <>
            {trigger}
            {tooltipContent}
        </>
    )
}

Tooltip.displayName = 'Tooltip'

// CSS Keyframes (add to globals.css):
// @keyframes tooltipFadeIn { from { opacity: 0; transform: translateY(-4px); } to { opacity: 1; transform: translateY(0); } }
