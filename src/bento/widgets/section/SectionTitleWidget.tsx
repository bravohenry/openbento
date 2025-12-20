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
}) => {
    if (!config) return null

    const { title, size = '2x1' } = config
    const { width, height } = getWidgetDimensions(size)


    return (
        <div
            onClick={isEditing ? onClick : undefined}
            style={{
                width,
                height,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'flex-start',
                cursor: isEditing ? 'pointer' : 'default',
                padding: '0 8px',
            }}
        >
            <h2
                style={{
                    fontFamily: 'Inter, sans-serif',
                    fontSize: 24,
                    fontWeight: 700,
                    color: '#1a1a1a',
                    margin: 0,
                }}
            >
                {title}
            </h2>
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
