'use client'

/**
 * OpenBento - Map Widget
 * 
 * 基于 BentoCard 组件的地图 Widget
 * 复刻 /bento 页面的精确设计
 */

import React from 'react'
import { BentoCard } from '@/bento/core'
import type { MapWidgetConfig, WidgetProps } from '../types'

// ============ Map Widget Component ============

export const MapWidget: React.FC<WidgetProps<MapWidgetConfig>> = ({
    config,
    onClick,
    isEditing = false,
}) => {
    const { title, location, size } = config

    return (
        <BentoCard
            size={size}
            // 使用占位符背景色，实际地图背景可通过 backgroundImage 设置
            backgroundColor="#E8F4E8"
            clickable={!isEditing}
        >
            {/* 网格背景纹理 */}
            <div style={{
                position: 'absolute',
                inset: 0,
                opacity: 0.15,
                background: `
                    linear-gradient(90deg, #a8d8a8 1px, transparent 1px),
                    linear-gradient(#a8d8a8 1px, transparent 1px)
                `,
                backgroundSize: '20px 20px',
                pointerEvents: 'none',
            }} />

            {/* 中央定位点 (精确复刻 Figma 设计) */}
            <div style={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                width: 26,
                height: 26,
                borderRadius: '50%',
                backgroundColor: '#5871FF',
                border: '3px solid white',
                boxShadow: '0 4px 24px rgba(0,0,0,0.3)',
                zIndex: 2,
            }} />

            {/* 扩散光晕 */}
            <div style={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                width: 234,
                height: 234,
                borderRadius: '50%',
                background: 'radial-gradient(circle, rgba(88, 113, 255, 0.1) 0%, rgba(88, 113, 255, 0) 70%)',
                pointerEvents: 'none',
                zIndex: 1,
            }} />

            {/* 标签 (Figma 风格玻璃态按钮) */}
            <div style={{
                position: 'absolute',
                bottom: 20,
                left: 20,
                height: 38,
                backgroundColor: 'rgba(255, 255, 255, 0.7)',
                backdropFilter: 'blur(20px) saturate(160%)',
                padding: '0 16px',
                borderRadius: 12,
                display: 'flex',
                alignItems: 'center',
                gap: 8,
                border: '1px solid rgba(255, 255, 255, 0.4)',
                boxShadow: '0 4px 12px rgba(0, 0, 0, 0.05), 0 1px 2px rgba(0, 0, 0, 0.05)',
                pointerEvents: 'none',
                zIndex: 3,
            }}>
                <span style={{ fontSize: 18, lineHeight: 1 }}>🏡</span>
                <span style={{
                    fontFamily: 'Inter, sans-serif',
                    fontSize: 14,
                    fontWeight: 500,
                    color: '#000',
                    letterSpacing: '-0.01em'
                }}>
                    {title || 'Where I live'}
                </span>
            </div>

            {/* 装饰性道路线条 */}
            <svg
                style={{
                    position: 'absolute',
                    bottom: 0,
                    right: 0,
                    width: '60%',
                    height: '60%',
                    opacity: 0.2,
                    pointerEvents: 'none',
                }}
                viewBox="0 0 100 100"
                preserveAspectRatio="none"
            >
                <path
                    d="M0 80 Q30 60, 50 70 T100 50"
                    fill="none"
                    stroke="#5a8a5a"
                    strokeWidth="2"
                />
                <path
                    d="M20 100 Q40 80, 60 90 T100 70"
                    fill="none"
                    stroke="#5a8a5a"
                    strokeWidth="1.5"
                />
                <path
                    d="M60 100 Q80 85, 100 90"
                    fill="none"
                    stroke="#5a8a5a"
                    strokeWidth="1"
                />
            </svg>
        </BentoCard>
    )
}

// ============ 创建 MapWidgetConfig ============

export function createMapWidgetConfig(
    title: string = 'Where I live',
    size: MapWidgetConfig['size'] = '2x2',
    location?: MapWidgetConfig['location']
): MapWidgetConfig {
    return {
        id: `map-${Date.now()}`,
        category: 'map',
        size,
        title,
        location,
    }
}

export default MapWidget
