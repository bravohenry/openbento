'use client'

/**
 * OpenBento - Widget Demo Page
 * 
 * 展示所有 Widget 类型的 5 种尺寸变体
 */

import React from 'react'
import {
    LinkWidget,
    TextWidget,
    MapWidget,
    ImageWidget,
    SectionTitleWidget,
    createLinkWidgetConfig,
    createTextWidgetConfig,
    createMapWidgetConfig,
    createImageWidgetConfig,
    createSectionTitleConfig,
    SIZE_VARIANTS,
} from '@/bento/widgets'
import { Text } from '@/design-system/primitives/Text/Text'
import { BENTO_GAP } from '@/bento/core'

// ============ Demo Data ============

const sampleImage = 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop'

// ============ Main Page ============

export default function WidgetDemoPage() {
    return (
        <div style={{ padding: 40, maxWidth: 1200, margin: '0 auto' }}>
            {/* Header */}
            <div style={{ marginBottom: 40 }}>
                <Text
                    as="h1"
                    style={{
                        fontSize: 32,
                        fontWeight: 700,
                        background: 'linear-gradient(135deg, #FF6B35 0%, #FF9F1C 100%)',
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent',
                        marginBottom: 8,
                    }}
                >
                    🧩 Widget Size Variants
                </Text>
                <Text style={{ fontSize: 16, color: '#666' }}>
                    每个 Widget 支持 5 种尺寸: 1x1, 2x1, 1x2, 2x2, 4x2
                </Text>
            </div>

            {/* Instagram - All 5 Sizes */}
            <div style={{ marginBottom: 64 }}>
                <Text
                    as="h2"
                    style={{
                        fontSize: 20,
                        fontWeight: 600,
                        marginBottom: 20,
                        color: '#333',
                    }}
                >
                    Instagram Widget - 5 Sizes
                </Text>
                <div
                    style={{
                        display: 'flex',
                        flexWrap: 'wrap',
                        gap: BENTO_GAP,
                        alignItems: 'start',
                    }}
                >
                    {SIZE_VARIANTS.map((size) => (
                        <div key={size} style={{ position: 'relative' }}>
                            <LinkWidget
                                config={createLinkWidgetConfig(
                                    'https://instagram.com/biuty.ai',
                                    size
                                )}
                            />
                            <div style={{
                                position: 'absolute',
                                top: -8,
                                right: -8,
                                backgroundColor: '#333',
                                color: '#fff',
                                fontSize: 11,
                                fontWeight: 600,
                                padding: '2px 8px',
                                borderRadius: 4,
                            }}>
                                {size}
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Twitter - All 5 Sizes */}
            <div style={{ marginBottom: 64 }}>
                <Text
                    as="h2"
                    style={{
                        fontSize: 20,
                        fontWeight: 600,
                        marginBottom: 20,
                        color: '#333',
                    }}
                >
                    Twitter Widget - 5 Sizes
                </Text>
                <div
                    style={{
                        display: 'flex',
                        flexWrap: 'wrap',
                        gap: BENTO_GAP,
                        alignItems: 'start',
                    }}
                >
                    {SIZE_VARIANTS.map((size) => (
                        <div key={size} style={{ position: 'relative' }}>
                            <LinkWidget
                                config={createLinkWidgetConfig(
                                    'https://twitter.com/biutyai',
                                    size
                                )}
                            />
                            <div style={{
                                position: 'absolute',
                                top: -8,
                                right: -8,
                                backgroundColor: '#55ACEE',
                                color: '#fff',
                                fontSize: 11,
                                fontWeight: 600,
                                padding: '2px 8px',
                                borderRadius: 4,
                            }}>
                                {size}
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* YouTube - All 5 Sizes */}
            <div style={{ marginBottom: 64 }}>
                <Text
                    as="h2"
                    style={{
                        fontSize: 20,
                        fontWeight: 600,
                        marginBottom: 20,
                        color: '#333',
                    }}
                >
                    YouTube Widget - 5 Sizes
                </Text>
                <div
                    style={{
                        display: 'flex',
                        flexWrap: 'wrap',
                        gap: BENTO_GAP,
                        alignItems: 'start',
                    }}
                >
                    {SIZE_VARIANTS.map((size) => (
                        <div key={size} style={{ position: 'relative' }}>
                            <LinkWidget
                                config={createLinkWidgetConfig(
                                    'https://youtube.com/@Biuty',
                                    size
                                )}
                            />
                            <div style={{
                                position: 'absolute',
                                top: -8,
                                right: -8,
                                backgroundColor: '#FF0000',
                                color: '#fff',
                                fontSize: 11,
                                fontWeight: 600,
                                padding: '2px 8px',
                                borderRadius: 4,
                            }}>
                                {size}
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Text Widget - Quote in Multiple Sizes */}
            <div style={{ marginBottom: 64 }}>
                <Text
                    as="h2"
                    style={{
                        fontSize: 20,
                        fontWeight: 600,
                        marginBottom: 20,
                        color: '#333',
                    }}
                >
                    Text Widget (Quote) - Multiple Sizes
                </Text>
                <div
                    style={{
                        display: 'flex',
                        flexWrap: 'wrap',
                        gap: BENTO_GAP,
                        alignItems: 'start',
                    }}
                >
                    <TextWidget
                        config={createTextWidgetConfig(
                            "Here's to the crazy ones.",
                            'quote',
                            '1x1',
                            'Apple'
                        )}
                    />
                    <TextWidget
                        config={createTextWidgetConfig(
                            "Here's to the crazy ones. The misfits. The rebels.",
                            'quote',
                            '2x1',
                            'Apple'
                        )}
                    />
                    <TextWidget
                        config={createTextWidgetConfig(
                            "Here's to the crazy ones. The misfits. The rebels. The trouble makers. The round pegs in the square holes. The ones who see things differently.",
                            'quote',
                            '2x2',
                            'Apple, "Think Different"'
                        )}
                    />
                </div>
            </div>

            {/* Map Widget - Different Sizes */}
            <div style={{ marginBottom: 64 }}>
                <Text
                    as="h2"
                    style={{
                        fontSize: 20,
                        fontWeight: 600,
                        marginBottom: 20,
                        color: '#333',
                    }}
                >
                    Map Widget - Different Sizes
                </Text>
                <div
                    style={{
                        display: 'flex',
                        flexWrap: 'wrap',
                        gap: BENTO_GAP,
                        alignItems: 'start',
                    }}
                >
                    <MapWidget config={createMapWidgetConfig('NYC', '1x1')} />
                    <MapWidget config={createMapWidgetConfig('San Francisco Bay Area', '2x1')} />
                    <MapWidget config={createMapWidgetConfig('Where I live', '2x2')} />
                </div>
            </div>

            {/* Info */}
            <div
                style={{
                    padding: 20,
                    backgroundColor: '#f0f9ff',
                    borderRadius: 12,
                    border: '1px solid #bae6fd',
                    fontSize: 14,
                    color: '#0369a1',
                }}
            >
                <strong>📐 尺寸规格 (from Figma)</strong>
                <ul style={{ margin: '8px 0 0 0', paddingLeft: 20, lineHeight: 1.8 }}>
                    <li><strong>1x1</strong>: 175 × 175 px (Small)</li>
                    <li><strong>2x1</strong>: 390 × 175 px (Wide)</li>
                    <li><strong>1x2</strong>: 175 × 390 px (Tall)</li>
                    <li><strong>2x2</strong>: 390 × 390 px (Large)</li>
                    <li><strong>4x2</strong>: 820 × 390 px (Extra Wide)</li>
                </ul>
            </div>
        </div>
    )
}
