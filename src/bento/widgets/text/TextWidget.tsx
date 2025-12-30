'use client'

/**
 * OpenBento - Text Widget
 * 
 * 基于 BentoCard 组件的文本 Widget
 */

import React from 'react'
import { BentoCard } from '@/bento/core'
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
}) => {
    const { content, size } = config

    return (
        <BentoCard size={size} backgroundColor="#F8F8F8" clickable={!isEditing}>
            <div style={{
                position: 'absolute',
                top: 24,
                left: 24,
                right: 24,
                bottom: 24,
                display: 'flex',
                flexDirection: 'column',
            }}>
                {/* 便笺图标 */}
                <div
                    style={{
                        width: 40,
                        height: 40,
                        borderRadius: 10,
                        backgroundColor: 'unset',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: 32,
                        boxShadow: 'none',
                        marginBottom: 12,
                    }}
                >
                    📝
                </div>

                {/* 便笺内容 */}
                <div
                    style={{
                        fontFamily: 'Inter, sans-serif',
                        fontSize: 14,
                        color: content ? '#333333' : '#999999',
                        lineHeight: 1.5,
                        fontStyle: content ? 'normal' : 'italic',
                    }}
                >
                    {content || 'Add note...'}
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
    attribution?: string
): TextWidgetConfig {
    return {
        id: `text-${Date.now()}`,
        category: 'text',
        size,
        variant,
        content,
        attribution,
    }
}

export default TextWidget
