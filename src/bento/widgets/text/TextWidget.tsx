'use client'

/**
 * [INPUT]: (config: TextWidgetConfig, onClick?: () => void, isEditing?: boolean, onConfigChange?: (updates) => void) - Text widget configuration, optional click handler, editing state, config change callback
 * [OUTPUT]: React component - Text widget with quote and note variants, supports inline editing for note variant content and emoji in edit mode
 * [POS]: Text widget component in bento/widgets/text, renders text content within BentoCard container, supports content and emoji editing for note variant
 * 
 * [PROTOCOL]:
 * 1. Once this file's logic changes, this Header must be synchronized immediately.
 * 2. After update, must check upward whether the parent folder's .folder.md description is still accurate.
 */

import React from 'react'
import { BentoCard } from '@/bento/core'
import { EmojiPicker } from './EmojiPicker'
import type { TextWidgetConfig, WidgetProps } from '../types'

// ============ Quote Widget ============

const QuoteWidget: React.FC<WidgetProps<TextWidgetConfig>> = ({
    config,
    onClick,
    isEditing = false,
}) => {
    const { content, attribution, size } = config

    return (
        <BentoCard size={size} backgroundColor="#ffffff" clickable={!isEditing}>
            <div style={{
                position: 'absolute',
                top: 24,
                left: 24,
                right: 24,
                bottom: 24,
                display: 'flex',
                flexDirection: 'column',
            }}>
                {/* 大引号 */}
                <div
                    style={{
                        fontSize: 48,
                        fontWeight: 700,
                        color: '#1a1a1a',
                        lineHeight: 0.6,
                        fontFamily: 'Georgia, serif',
                        marginBottom: 16,
                    }}
                >
                    "
                </div>

                {/* 引用内容 */}
                <div
                    style={{
                        flex: 1,
                        fontFamily: 'Inter, sans-serif',
                        fontSize: 15,
                        fontStyle: 'italic',
                        color: '#1a1a1a',
                        lineHeight: 1.5,
                        overflow: 'hidden',
                        display: '-webkit-box',
                        WebkitLineClamp: size === '2x2' ? 10 : 5,
                        WebkitBoxOrient: 'vertical',
                    }}
                >
                    {content}
                </div>

                {/* 署名 */}
                {attribution && (
                    <div
                        style={{
                            fontFamily: 'Inter, sans-serif',
                            fontSize: 13,
                            color: '#999999',
                            marginTop: 12,
                        }}
                    >
                        — {attribution}
                    </div>
                )}
            </div>
        </BentoCard>
    )
}

// ============ Note Widget ============

const NoteWidget: React.FC<WidgetProps<TextWidgetConfig>> = ({
    config,
    onClick,
    isEditing = false,
    onConfigChange,
}) => {
    const { content, size, emoji } = config
    const [isFocused, setIsFocused] = React.useState(false)
    const [showEmojiPicker, setShowEmojiPicker] = React.useState(false)
    const contentRef = React.useRef<HTMLDivElement>(null)
    const emojiRef = React.useRef<HTMLDivElement>(null)
    
    // Default emoji
    const displayEmoji = emoji || '📝'

    // Sync contentEditable content with config content when it changes externally
    React.useEffect(() => {
        if (contentRef.current && !isFocused && contentRef.current.textContent !== content) {
            contentRef.current.textContent = content || ''
        }
    }, [content, isFocused])

    const handleBlur = (e: React.FocusEvent<HTMLDivElement>) => {
        setIsFocused(false)
        const newContent = (e.currentTarget.textContent || '').trim()
        if (newContent !== content && onConfigChange) {
            onConfigChange({ content: newContent })
        }
        // Ensure contentEditable shows empty string when content is empty
        if (!newContent && e.currentTarget.textContent) {
            e.currentTarget.textContent = ''
        }
    }

    const handleFocus = (e: React.FocusEvent<HTMLDivElement>) => {
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

    const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
        // Allow Enter for multi-line editing, but prevent default behavior that might cause issues
        if (e.key === 'Escape') {
            e.currentTarget.blur()
        }
    }

    const showPlaceholder = isEditing && !content && !isFocused

    // Handle emoji click - show picker
    const handleEmojiClick = (e: React.MouseEvent) => {
        if (isEditing) {
            e.stopPropagation()
            e.preventDefault()
            setShowEmojiPicker(true)
        }
    }

    // Handle emoji selection from picker
    const handleEmojiSelect = (selectedEmoji: string) => {
        if (onConfigChange) {
            onConfigChange({ emoji: selectedEmoji })
        }
        setShowEmojiPicker(false)
    }

    // Get emoji container rect for picker positioning
    const [emojiRect, setEmojiRect] = React.useState<DOMRect | null>(null)

    React.useEffect(() => {
        if (showEmojiPicker && emojiRef.current) {
            const rect = emojiRef.current.getBoundingClientRect()
            setEmojiRect(rect)
        }
    }, [showEmojiPicker])

    return (
        <BentoCard size={size} backgroundColor="#F8F8F8" clickable={!isEditing} onClick={onClick}>
            <div style={{
                position: 'absolute',
                top: 24,
                left: 24,
                right: 24,
                bottom: 24,
                display: 'flex',
                flexDirection: 'column',
            }}>
                {/* 便笺图标 - 可点击打开 emoji 选择器 */}
                <div
                    ref={emojiRef}
                    style={{
                        width: 40,
                        height: 40,
                        borderRadius: 10,
                        backgroundColor: isEditing && showEmojiPicker ? 'rgba(0, 0, 0, 0.05)' : 'unset',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: 32,
                        boxShadow: 'none',
                        marginBottom: 12,
                        transition: 'background-color 0.2s ease',
                        cursor: isEditing ? 'pointer' : 'default',
                    }}
                    onClick={handleEmojiClick}
                    onMouseDown={(e) => {
                        // Stop mousedown to prevent widget selection
                        if (isEditing) {
                            e.stopPropagation()
                        }
                    }}
                >
                    {displayEmoji}
                </div>

                {/* Emoji Picker */}
                {isEditing && showEmojiPicker && emojiRect && (
                    <EmojiPicker
                        rect={emojiRect}
                        onSelect={handleEmojiSelect}
                        onClose={() => setShowEmojiPicker(false)}
                    />
                )}

                {/* 便笺内容 - 可编辑 */}
                <div style={{ position: 'relative', flex: 1, width: '100%' }}>
                    <div
                        ref={contentRef}
                        contentEditable={isEditing}
                        suppressContentEditableWarning={true}
                        onBlur={isEditing ? handleBlur : undefined}
                        onFocus={isEditing ? handleFocus : undefined}
                        onKeyDown={isEditing ? handleKeyDown : undefined}
                        onClick={(e) => {
                            // Stop propagation to prevent parent onClick (widget selection) when clicking on content
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
                            fontSize: 14,
                            color: content || isFocused ? '#333333' : '#999999',
                            lineHeight: 1.5,
                            fontStyle: content && !isFocused ? 'normal' : 'italic',
                            outline: 'none',
                            cursor: isEditing ? 'text' : 'default',
                            minHeight: '1.5em',
                            width: '100%',
                            position: 'relative',
                            zIndex: 1,
                            wordBreak: 'break-word',
                            whiteSpace: 'pre-wrap',
                        }}
                    >
                        {content || ''}
                    </div>
                    {showPlaceholder && (
                        <div
                            style={{
                                position: 'absolute',
                                left: 0,
                                top: 0,
                                color: '#999999',
                                fontFamily: 'Inter, sans-serif',
                                fontSize: 14,
                                fontStyle: 'italic',
                                pointerEvents: 'none',
                                zIndex: 0,
                                lineHeight: 1.5,
                            }}
                        >
                            Add note...
                        </div>
                    )}
                </div>
            </div>
        </BentoCard>
    )
}

// ============ Main Text Widget ============

export const TextWidget: React.FC<WidgetProps<TextWidgetConfig>> = (props) => {
    const { variant } = props.config

    switch (variant) {
        case 'quote':
            return <QuoteWidget {...props} />
        case 'note':
            return <NoteWidget {...props} />
        default:
            return <NoteWidget {...props} />
    }
}

// ============ 创建 TextWidgetConfig ============

export function createTextWidgetConfig(
    content: string,
    variant: TextWidgetConfig['variant'] = 'plain',
    size: TextWidgetConfig['size'] = '1x1',
    attribution?: string,
    emoji?: string
): TextWidgetConfig {
    return {
        id: `text-${Date.now()}`,
        category: 'text',
        size,
        variant,
        content,
        attribution,
        emoji,
    }
}

export default TextWidget
