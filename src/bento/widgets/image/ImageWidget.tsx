'use client'

/**
 * OpenBento - Image Widget
 * 
 * 基于 BentoCard 组件的图片 Widget
 */

import React from 'react'
import { BentoCard } from '@/bento/core'
import type { ImageWidgetConfig, WidgetProps } from '../types'

// ============ Image Widget Component ============

export const ImageWidget: React.FC<WidgetProps<ImageWidgetConfig>> = ({
    config,
    onClick,
    isEditing = false,
}) => {
    const { src, alt, title, subtitle, size } = config

    const hasOverlay = title || subtitle

    return (
        <BentoCard size={size} clickable={!isEditing}>
            <BentoCard.Image src={src} alt={alt || title || ''} />

            {hasOverlay && (
                <BentoCard.Overlay gradient="bottom">
                    {title && (
                        <BentoCard.Title color="inverse" size="lg">
                            {title}
                        </BentoCard.Title>
                    )}
                    {subtitle && (
                        <div style={{
                            fontFamily: 'Inter, sans-serif',
                            fontSize: 13,
                            color: 'rgba(255,255,255,0.8)',
                            marginTop: 4,
                        }}>
                            {subtitle}
                        </div>
                    )}
                </BentoCard.Overlay>
            )}
        </BentoCard>
    )
}

// ============ 创建 ImageWidgetConfig ============

export function createImageWidgetConfig(
    src: string,
    size: ImageWidgetConfig['size'] = '1x1',
    options?: Partial<ImageWidgetConfig>
): ImageWidgetConfig {
    return {
        id: `image-${Date.now()}`,
        category: 'image',
        size,
        src,
        objectFit: 'cover',
        ...options,
    }
}

export default ImageWidget
