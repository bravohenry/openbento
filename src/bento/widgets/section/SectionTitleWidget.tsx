'use client'

/**
 * OpenBento - Section Title Widget
 * 
 * 分区标题 Widget
 */

import React from 'react'
import type { SectionTitleConfig, WidgetProps } from '../types'
import { BENTO_UNIT, BENTO_GAP } from '@/bento/core'

// 计算尺寸
function getWidgetDimensions(size: string) {
    const [cols, rows] = size.split('x').map(Number)
    return {
        width: cols * BENTO_UNIT + (cols - 1) * BENTO_GAP,
        height: rows * BENTO_UNIT + (rows - 1) * BENTO_GAP,
    }
}

// ============ Section Title Widget Component ============

export const SectionTitleWidget: React.FC<WidgetProps<SectionTitleConfig>> = ({
    config,
    isEditing = false,
    onClick,
    onConfigChange,
}) => {
    if (!config) return null

    const { title, size = '2x1' } = config
    const { width, height } = getWidgetDimensions(size)
    const [isFocused, setIsFocused] = React.useState(false)

    const handleBlur = (e: React.FocusEvent<HTMLHeadingElement>) => {
        setIsFocused(false)
        const newTitle = (e.currentTarget.textContent || '').trim()
        if (newTitle !== title && onConfigChange) {
            onConfigChange({ title: newTitle })
        }
        // If empty after blur, ensure placeholder shows
        if (!newTitle && e.currentTarget.textContent) {
            e.currentTarget.textContent = ''
        }
    }

    const handleFocus = (e: React.FocusEvent<HTMLHeadingElement>) => {
        setIsFocused(true)
        // Select all text when focusing for easier editing
        if (isEditing && e.currentTarget.textContent) {
            const range = document.createRange()
            range.selectNodeContents(e.currentTarget)
            const selection = window.getSelection()
            selection?.removeAllRanges()
            selection?.addRange(range)
        }
    }

    const handleKeyDown = (e: React.KeyboardEvent<HTMLHeadingElement>) => {
        if (e.key === 'Enter') {
            e.preventDefault()
            e.currentTarget.blur()
        }
    }

    const showPlaceholder = isEditing && !title && !isFocused

    // Show gray background only when there's no title
    const hasTitle = title && title.trim().length > 0
    const showBackground = !hasTitle

    return (
        <div
            onClick={isEditing ? (e) => {
                // Only trigger widget selection if not clicking on the editable title
                const target = e.target as HTMLElement
                if (target.tagName !== 'H2' && !target.closest('h2')) {
                    onClick?.()
                }
            } : undefined}
            style={{
                width,
                height,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'flex-start',
                cursor: isEditing ? 'pointer' : 'default',
                padding: '0 16px',
                backgroundColor: showBackground ? '#F5F5F5' : 'transparent',
                borderRadius: '12px',
                minHeight: '48px', // Minimum height for the bar
            }}
        >
            <div style={{ position: 'relative', flex: 1, width: '100%' }}>
                <h2
                    contentEditable={isEditing}
                    suppressContentEditableWarning={true}
                    onBlur={isEditing ? handleBlur : undefined}
                    onFocus={isEditing ? handleFocus : undefined}
                    onKeyDown={isEditing ? handleKeyDown : undefined}
                    onClick={(e) => {
                        // Stop propagation to prevent parent onClick (widget selection) when clicking on title
                        if (isEditing) {
                            e.stopPropagation()
                        }
                    }}
                    onMouseDown={(e) => {
                        // Also stop mousedown to prevent widget selection
                        if (isEditing) {
                            e.stopPropagation()
                        }
                    }}
                    style={{
                        fontFamily: 'Inter, sans-serif',
                        fontSize: 16,
                        fontWeight: 600,
                        color: title || isFocused ? '#1a1a1a' : '#999999',
                        margin: 0,
                        outline: 'none',
                        cursor: isEditing ? 'text' : 'default',
                        height: '1.5em',
                        lineHeight: '1.5em',
                        width: '100%',
                        position: 'relative',
                        zIndex: 1,
                        whiteSpace: 'nowrap',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                    }}
                >
                    {title || ''}
                </h2>
                {showPlaceholder && (
                    <div
                        style={{
                            position: 'absolute',
                            left: 0,
                            top: 0,
                            color: '#999999',
                            fontFamily: 'Inter, sans-serif',
                            fontSize: 16,
                            fontWeight: 600,
                            pointerEvents: 'none',
                            zIndex: 0,
                            height: '1.5em',
                            lineHeight: '1.5em',
                        }}
                    >
                        Add a title...
                    </div>
                )}
            </div>
        </div>
    )
}

// ============ 创建 SectionTitleConfig ============

export function createSectionTitleConfig(
    title: string,
    size: SectionTitleConfig['size'] = '2x1'
): SectionTitleConfig {
    return {
        id: `section-${Date.now()}`,
        category: 'section',
        size,
        title,
    }
}

export default SectionTitleWidget
