'use client'

/**
 * OpenBento - Drag & Drop Demo Page
 * 
 * 使用 @dnd-kit + Framer Motion 的专业拖放演示
 * 注意: 当前演示使用相同尺寸卡片，多尺寸需要更复杂的布局算法
 */

import React, { useState } from 'react'
import { BentoDndProvider, SortableCard, CardOverlay, BentoItem } from '@/bento/dnd'
import { Text } from '@/design-system/primitives/Text/Text'

// ============ Constants ============

const CARD_SIZE = 160
const GAP = 20

// ============ Demo Data - 全部 1x1 避免布局问题 ============

const createInitialItems = (): BentoItem[] => [
    { id: 'youtube', size: '1x1', content: null, data: { label: 'YouTube', color: '#FF0000', icon: '▶️', handle: 'Biuty' } },
    { id: 'instagram', size: '1x1', content: null, data: { label: 'Instagram', color: '#E4405F', icon: '📸', handle: '@biuty.ai' } },
    { id: 'twitter', size: '1x1', content: null, data: { label: 'Twitter', color: '#1DA1F2', icon: '🐦', handle: '@biutyai' } },
    { id: 'tiktok', size: '1x1', content: null, data: { label: 'TikTok', color: '#000000', icon: '🎵', handle: '@biuty.ai' } },
    { id: 'spotify', size: '1x1', content: null, data: { label: 'Spotify', color: '#1DB954', icon: '🎧', handle: 'My Playlist' } },
    { id: 'link', size: '1x1', content: null, data: { label: 'Biuty', color: '#5B5FC7', icon: '🔗', handle: 'biuty.ai' } },
    { id: 'note', size: '1x1', content: null, data: { label: 'Add note...', color: '#F5F5F5', icon: '📝', textColor: '#999' } },
    { id: 'map', size: '1x1', content: null, data: { label: 'Location', color: '#E8F4E8', icon: '📍', isMap: true } },
]

// ============ Card Component ============

interface DemoCardProps {
    item: BentoItem
}

const DemoCard: React.FC<DemoCardProps> = ({ item }) => {
    const data = item.data as {
        label: string
        color: string
        icon: string
        handle?: string
        textColor?: string
        isMap?: boolean
    }

    const isLight = data.color === '#F5F5F5' || data.isMap
    const textColor = data.textColor || (isLight ? '#333' : '#fff')

    return (
        <div
            style={{
                width: CARD_SIZE,
                height: CARD_SIZE,
                borderRadius: 24,
                backgroundColor: data.isMap ? '#E8F4E8' : data.color,
                padding: 20,
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                border: '1px solid rgba(0,0,0,0.06)',
            }}
        >
            {/* Icon */}
            <div
                style={{
                    width: 36,
                    height: 36,
                    borderRadius: 10,
                    backgroundColor: isLight ? 'rgba(0,0,0,0.05)' : 'rgba(255,255,255,0.2)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: 18,
                }}
            >
                {data.icon}
            </div>

            {/* Text */}
            <div>
                <div style={{ fontSize: 14, fontWeight: 600, color: textColor }}>
                    {data.label}
                </div>
                {data.handle && (
                    <div style={{ fontSize: 11, color: isLight ? '#666' : 'rgba(255,255,255,0.7)', marginTop: 2 }}>
                        {data.handle}
                    </div>
                )}
            </div>
        </div>
    )
}

// ============ Main Page ============

export default function DndDemoPage() {
    const [items, setItems] = useState<BentoItem[]>(createInitialItems)
    const [dragCount, setDragCount] = useState(0)

    return (
        <div style={{ padding: 40, maxWidth: 900, margin: '0 auto' }}>
            {/* Header */}
            <div style={{ marginBottom: 32 }}>
                <Text
                    as="h1"
                    style={{
                        fontSize: 32,
                        fontWeight: 700,
                        background: 'linear-gradient(135deg, #FF6B35 0%, #FF9F1C 100%)',
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent',
                        marginBottom: 6,
                    }}
                >
                    🎮 Game-Engine DnD
                </Text>
                <Text style={{ fontSize: 14, color: '#666' }}>
                    使用 @dnd-kit + Framer Motion 实现的专业拖放
                    <span style={{ marginLeft: 12, color: '#999' }}>拖动次数: {dragCount}</span>
                </Text>
            </div>

            {/* DnD Grid */}
            <BentoDndProvider
                items={items}
                onItemsChange={setItems}
                onDragStart={(item) => console.log('🎯 Drag start:', item.id)}
                onDragEnd={(item, from, to) => {
                    console.log(`✅ Moved ${item.id}: ${from} → ${to}`)
                    setDragCount(c => c + 1)
                }}
                renderOverlay={(item) => (
                    <CardOverlay>
                        <DemoCard item={item} />
                    </CardOverlay>
                )}
            >
                <div
                    style={{
                        display: 'grid',
                        gridTemplateColumns: `repeat(4, ${CARD_SIZE}px)`,
                        gap: GAP,
                        backgroundColor: '#f8f9fa',
                        padding: 32,
                        borderRadius: 20,
                    }}
                >
                    {items.map((item) => (
                        <SortableCard key={item.id} id={item.id}>
                            <DemoCard item={item} />
                        </SortableCard>
                    ))}
                </div>
            </BentoDndProvider>

            {/* Info */}
            <div
                style={{
                    marginTop: 24,
                    padding: 20,
                    backgroundColor: '#fffbf0',
                    borderRadius: 12,
                    border: '1px solid #ffe4b5',
                    fontSize: 13,
                    color: '#8b6914',
                }}
            >
                <strong>🚀 速度感知碰撞检测</strong>
                <ul style={{ margin: '8px 0 0 0', paddingLeft: 20, lineHeight: 1.6 }}>
                    <li>慢速拖动: 需要 ~75% 重叠才触发让位</li>
                    <li>快速拖动: 只需 ~45% 重叠就提前触发</li>
                    <li>动画: Apple 风格 easing (0.32, 0.72, 0, 1)</li>
                </ul>
            </div>
        </div>
    )
}
