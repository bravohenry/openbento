/**
 * OpenBento - Drag Overlay Component
 * 
 * 拖拽时的浮动预览层
 */

import React from 'react'
import { createPortal } from 'react-dom'
import type { DragOverlayProps, DragItem } from './dnd.types'
import { useDndContext } from './DndProvider'
import { getBentoSize } from '../core/BentoSizeMap'

// ============ DragOverlay Component ============

export const DragOverlay: React.FC<DragOverlayProps> = ({
    children,
    offset = { x: 0, y: 0 },
    scale = 1.02,
    opacity = 0.9,
    showShadow = true,
    animation = 'smooth',
}) => {
    const { state } = useDndContext()
    const { isDragging, activeItem, dragPosition } = state

    // Don't render if not dragging
    if (!isDragging || !activeItem || !dragPosition) {
        return null
    }

    // Get size for the active item
    const sizeConfig = getBentoSize(activeItem.size)

    // Calculate position
    const x = dragPosition.x + offset.x - sizeConfig.width / 2
    const y = dragPosition.y + offset.y - sizeConfig.height / 2

    // Animation styles
    const getAnimationStyle = (): React.CSSProperties => {
        switch (animation) {
            case 'spring':
                return {
                    transition: 'transform 0.15s cubic-bezier(0.18, 0.89, 0.32, 1.28)',
                }
            case 'smooth':
                return {
                    transition: 'transform 0.1s ease-out',
                }
            case 'none':
            default:
                return {}
        }
    }

    // Overlay styles
    const overlayStyle: React.CSSProperties = {
        position: 'fixed',
        left: 0,
        top: 0,
        transform: `translate(${x}px, ${y}px) scale(${scale})`,
        width: sizeConfig.width,
        height: sizeConfig.height,
        pointerEvents: 'none',
        zIndex: 10000,
        opacity,
        boxShadow: showShadow ? '0 20px 40px rgba(0, 0, 0, 0.15), 0 10px 20px rgba(0, 0, 0, 0.1)' : 'none',
        borderRadius: 27,
        ...getAnimationStyle(),
    }

    // Render content
    const renderContent = () => {
        if (typeof children === 'function') {
            return children(activeItem)
        }
        if (children) {
            return children
        }
        // Default preview
        return (
            <div
                style={{
                    width: '100%',
                    height: '100%',
                    backgroundColor: 'var(--color-surface, #ffffff)',
                    borderRadius: 27,
                    border: '2px solid var(--color-brand-primary, #FF6B35)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: 14,
                    fontWeight: 500,
                    color: 'var(--color-text-secondary, #666)',
                }}
            >
                {activeItem.size}
            </div>
        )
    }

    // Render via portal to escape any overflow/transform contexts
    return createPortal(
        <div className="drag-overlay" style={overlayStyle}>
            {renderContent()}
        </div>,
        document.body
    )
}

// ============ Grid Preview Overlay ============

interface GridPreviewOverlayProps {
    /** 网格容器的 ref 或元素 */
    gridRef?: React.RefObject<HTMLElement>
    /** 网格位置偏移 */
    gridOffset?: { x: number; y: number }
    /** 预览颜色 */
    color?: string
    /** 是否显示 */
    visible?: boolean
}

export const GridPreviewOverlay: React.FC<GridPreviewOverlayProps> = ({
    gridRef,
    gridOffset = { x: 0, y: 0 },
    color = 'rgba(255, 107, 53, 0.15)',
    visible = true,
}) => {
    const { state } = useDndContext()
    const { isDragging, activeItem, gridPreviewPosition, canDrop } = state

    if (!visible || !isDragging || !activeItem || !gridPreviewPosition) {
        return null
    }

    const sizeConfig = getBentoSize(activeItem.size)
    const gap = 40 // BENTO_GAP
    const unit = 175 // BENTO_UNIT

    // Calculate pixel position from grid position
    const x = gridPreviewPosition.col * (unit + gap) + gridOffset.x
    const y = gridPreviewPosition.row * (unit + gap) + gridOffset.y

    const previewStyle: React.CSSProperties = {
        position: 'absolute',
        left: x,
        top: y,
        width: sizeConfig.width,
        height: sizeConfig.height,
        borderRadius: 27,
        backgroundColor: canDrop ? color : 'rgba(244, 67, 54, 0.15)',
        border: `2px dashed ${canDrop ? 'var(--color-brand-primary, #FF6B35)' : '#f44336'}`,
        pointerEvents: 'none',
        transition: 'all 0.15s ease-out',
        zIndex: 100,
    }

    return <div className="grid-preview-overlay" style={previewStyle} />
}

// ============ Drop Indicator ============

interface DropIndicatorProps {
    /** 位置 */
    position: 'before' | 'after' | 'inside'
    /** 方向 */
    direction?: 'horizontal' | 'vertical'
    /** 颜色 */
    color?: string
}

export const DropIndicator: React.FC<DropIndicatorProps> = ({
    position,
    direction = 'vertical',
    color = 'var(--color-brand-primary, #FF6B35)',
}) => {
    const baseStyle: React.CSSProperties = {
        position: 'absolute',
        backgroundColor: color,
        borderRadius: 2,
        transition: 'all 0.15s ease',
        zIndex: 100,
    }

    if (direction === 'vertical') {
        const horizontalStyle: React.CSSProperties = {
            ...baseStyle,
            left: 0,
            right: 0,
            height: 4,
            ...(position === 'before' && { top: -2 }),
            ...(position === 'after' && { bottom: -2 }),
            ...(position === 'inside' && { top: '50%', transform: 'translateY(-50%)' }),
        }
        return <div className="drop-indicator" style={horizontalStyle} />
    }

    const verticalStyle: React.CSSProperties = {
        ...baseStyle,
        top: 0,
        bottom: 0,
        width: 4,
        ...(position === 'before' && { left: -2 }),
        ...(position === 'after' && { right: -2 }),
        ...(position === 'inside' && { left: '50%', transform: 'translateX(-50%)' }),
    }

    return <div className="drop-indicator" style={verticalStyle} />
}
