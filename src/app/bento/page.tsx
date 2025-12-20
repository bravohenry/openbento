'use client'

/**
 * OpenBento - BentoCard 展示页面
 * 
 * 基于 Figma 设计 (node-id: 25-1023) 验证实现
 */

import React from 'react'
import { BentoCard, BENTO_GAP } from '@/bento/core'
import { Button, InstagramGradientIcon, TwitterIcon, WhatsAppIcon, MapPinIcon, SpotifyIcon, YouTubeIcon } from '@/design-system/patterns'
import { ThemeProvider } from '@/design-system/foundation/theme'
import { Text } from '@/design-system/primitives'

// Instagram 渐变色
const instagramGradient = 'linear-gradient(45deg, #f09433 0%, #e6683c 25%, #dc2743 50%, #cc2366 75%, #bc1888 100%)'

// Spotify 绿色
const spotifyGreen = '#1DB954'

// 示例图片
const sampleImage = 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop'

export default function BentoShowcasePage() {
    return (
        <ThemeProvider defaultMode="light">
            <div
                style={{
                    minHeight: '100vh',
                    padding: '48px 24px',
                    background: 'var(--color-bg-primary)',
                }}
            >
                <div style={{ maxWidth: 900, margin: '0 auto' }}>
                    {/* Header */}
                    <div style={{ textAlign: 'center', marginBottom: 48 }}>
                        <Text variant="display" gradient="linear-gradient(135deg, #6366f1, #8b5cf6)">
                            BentoCard Component
                        </Text>
                        <Text variant="bodyLarge" color="secondary" style={{ marginTop: 12 }}>
                            基于 Figma 设计 (node-id: 25-1023) | 圆角 27px | 双层边框效果
                        </Text>
                    </div>

                    {/* Bento Grid */}
                    <div
                        style={{
                            display: 'grid',
                            gridTemplateColumns: 'repeat(4, 175px)',
                            gap: BENTO_GAP,
                            justifyContent: 'center',
                        }}
                    >
                        {/* 1. 大图卡片 2x2 */}
                        <BentoCard size="2x2" clickable>
                            <BentoCard.Image src={sampleImage} />
                            <BentoCard.Overlay gradient="bottom">
                                <BentoCard.Title color="inverse" size="lg">
                                    Photography
                                </BentoCard.Title>
                            </BentoCard.Overlay>
                        </BentoCard>

                        {/* 2. Instagram 卡片 1x1 - 精确复刻 Figma 25:943 */}
                        <BentoCard size="1x1" backgroundColor="#ffffff" clickable>
                            {/* 内容容器：精确 24px 内边距，127×127 内容区域 */}
                            <div style={{
                                position: 'absolute',
                                top: 24,
                                left: 24,
                                width: 127,
                                height: 127,
                                pointerEvents: 'none',
                            }}>
                                {/* 图标：绝对定位 x=0, y=0, 40×40 */}
                                <div style={{
                                    position: 'absolute',
                                    top: 0,
                                    left: 0,
                                    width: 40,
                                    height: 40,
                                    borderRadius: 10,
                                    overflow: 'hidden',
                                    boxShadow: '0px 1px 2px rgba(0, 0, 0, 0.1)',
                                }}>
                                    <InstagramGradientIcon size={40} />
                                    {/* 内边框 overlay */}
                                    <div style={{
                                        position: 'absolute',
                                        inset: 0,
                                        borderRadius: 10,
                                        boxShadow: 'inset 0 0 0 1px rgba(0, 0, 0, 0.06)',
                                        pointerEvents: 'none',
                                    }} />
                                </div>

                                {/* 标题：绝对定位 y=52 (Figma: Margin y=40 + Container pt=4 + Title p=8) */}
                                <div style={{
                                    position: 'absolute',
                                    top: 52,
                                    left: 0,
                                    fontFamily: 'Inter, sans-serif',
                                    fontSize: 14,
                                    fontWeight: 400,
                                    lineHeight: '16.8px',
                                    color: '#000000',
                                }}>
                                    Instagram
                                </div>

                                {/* 按钮：绝对定位 x=0, y=97, 66×30, 8px 圆角 */}
                                <button style={{
                                    position: 'absolute',
                                    top: 97,
                                    left: 0,
                                    width: 66,
                                    height: 30,
                                    borderRadius: 8,
                                    backgroundColor: '#4093ef',
                                    border: 'none',
                                    cursor: 'pointer',
                                    fontFamily: 'Inter, sans-serif',
                                    fontSize: 12,
                                    fontWeight: 700,
                                    lineHeight: '16px',
                                    color: '#ffffff',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    pointerEvents: 'auto',
                                }}>
                                    Follow
                                </button>
                            </div>
                        </BentoCard>

                        {/* 3. Twitter 卡片 1x1 - 精确复刻 Figma 19:2332 */}
                        <BentoCard size="1x1" clickable>
                            {/* 内容容器：精确 24px 内边距，127×127 内容区域 */}
                            <div style={{
                                position: 'absolute',
                                top: 24,
                                left: 24,
                                width: 127,
                                height: 127,
                                pointerEvents: 'none',
                            }}>
                                {/* 图标：绝对定位 x=0, y=0, 40×40 */}
                                <div style={{
                                    position: 'absolute',
                                    top: 0,
                                    left: 0,
                                    width: 40,
                                    height: 40,
                                    borderRadius: 10,
                                    backgroundColor: '#55ACEE',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    boxShadow: '0px 1px 2px rgba(0, 0, 0, 0.1)',
                                }}>
                                    <TwitterIcon size={24} color="#fff" />
                                    {/* 内边框 overlay */}
                                    <div style={{
                                        position: 'absolute',
                                        inset: 0,
                                        borderRadius: 10,
                                        boxShadow: 'inset 0 0 0 1px rgba(0, 0, 0, 0.06)',
                                        pointerEvents: 'none',
                                    }} />
                                </div>

                                {/* 标题：绝对定位 y=52 */}
                                <div style={{
                                    position: 'absolute',
                                    top: 52,
                                    left: 0,
                                    fontFamily: 'Inter, sans-serif',
                                    fontSize: 14,
                                    fontWeight: 400,
                                    lineHeight: '16.8px',
                                    color: '#000000',
                                }}>
                                    Twitter
                                </div>

                                {/* Handle：绝对定位 y=69, Inter 12px, rgba(0,0,0,0.6) */}
                                <div style={{
                                    position: 'absolute',
                                    top: 69,
                                    left: 0,
                                    fontFamily: 'Inter, sans-serif',
                                    fontSize: 12,
                                    fontWeight: 400,
                                    lineHeight: '16px',
                                    color: 'rgba(0, 0, 0, 0.6)',
                                }}>
                                    @biutyai
                                </div>

                                {/* 按钮：绝对定位 x=0, y=97, 70×30, 8px 圆角 */}
                                <button style={{
                                    position: 'absolute',
                                    top: 97,
                                    left: 0,
                                    width: 70,
                                    height: 30,
                                    borderRadius: 8,
                                    backgroundColor: '#4093ef',
                                    border: 'none',
                                    cursor: 'pointer',
                                    fontFamily: 'Inter, sans-serif',
                                    fontSize: 12,
                                    fontWeight: 700,
                                    lineHeight: '16px',
                                    color: '#ffffff',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    pointerEvents: 'auto',
                                }}>
                                    Follow
                                </button>
                            </div>
                        </BentoCard>





                        {/* 4. WhatsApp 链接卡片 2x1 */}
                        <BentoCard size="2x1" clickable href="https://chat.whatsapp.com" target="_blank">
                            <BentoCard.Content padding="md" align="start" justify="center">
                                <BentoCard.Icon
                                    icon={<WhatsAppIcon size={24} color="#fff" />}
                                    backgroundColor="#25d366"
                                    style={{ borderRadius: '13px', marginBottom: 12 }}
                                />
                                <div>
                                    <BentoCard.Title size="lg" style={{ fontSize: '20px' }}>Join Biuty🌸 Community</BentoCard.Title>
                                    <BentoCard.Subtitle>chat.whatsapp.com</BentoCard.Subtitle>
                                </div>
                            </BentoCard.Content>
                        </BentoCard>

                        {/* 5. 地图卡片 2x1 */}
                        <BentoCard
                            size="2x1"
                            backgroundGradient="linear-gradient(135deg, #667eea 0%, #764ba2 100%)"
                            dark
                            clickable
                        >
                            <BentoCard.Content padding="md" justify="end">
                                <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                                    <MapPinIcon size={20} color="#fff" />
                                    <BentoCard.Title color="inverse" size="lg">Berlin, Germany</BentoCard.Title>
                                </div>
                            </BentoCard.Content>
                            <div
                                style={{
                                    position: 'absolute',
                                    top: 32,
                                    right: 48,
                                    width: 54,
                                    height: 54,
                                    borderRadius: '50%',
                                    background: 'rgba(74, 222, 128, 0.4)',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                }}
                            >
                                <div style={{ width: 14, height: 14, borderRadius: '50%', background: '#4ade80', boxShadow: '0 0 15px #4ade80' }} />
                            </div>
                        </BentoCard>

                        {/* 6. Spotify 卡片 1x1 */}
                        <BentoCard size="1x1" backgroundColor={spotifyGreen} dark clickable>
                            <BentoCard.Content padding="md" justify="between">
                                <BentoCard.Icon
                                    icon={<SpotifyIcon size={24} color="#fff" />}
                                    backgroundColor="rgba(255,255,255,0.2)"
                                />
                                <BentoCard.Footer>
                                    <div>
                                        <BentoCard.Title color="inverse">Spotify</BentoCard.Title>
                                        <BentoCard.Subtitle color="inverse" style={{ opacity: 0.8 }}>Now Playing</BentoCard.Subtitle>
                                    </div>
                                    <Button variant="secondary" size="xs" shape="pill" style={{ background: 'white', color: spotifyGreen, fontSize: '12px', padding: '4px 12px' }}>
                                        Listen
                                    </Button>
                                </BentoCard.Footer>
                            </BentoCard.Content>
                        </BentoCard>

                        {/* 7. YouTube 卡片 1x1 - Pixel-perfect (原版结构) */}
                        <BentoCard size="1x1" clickable>
                            <BentoCard.Content padding="md" align="start" justify="start" style={{ gap: 0 }}>
                                <BentoCard.Icon
                                    icon={<YouTubeIcon size={28} color="#fff" />}
                                    backgroundColor="#ff0000"
                                    size="lg"
                                    style={{ borderRadius: '13px' }}
                                />
                                <BentoCard.Title style={{ marginTop: 20, fontSize: '18px', fontWeight: 500 }}>YouTube</BentoCard.Title>
                            </BentoCard.Content>
                            {/* 按钮居中在卡片底部 (红色) */}
                            <div style={{
                                position: 'absolute',
                                bottom: 24,
                                left: '50%',
                                transform: 'translateX(-50%)',
                            }}>
                                <Button
                                    variant="youtube"
                                    size="sm"
                                    shape="pill"
                                    style={{
                                        borderRadius: '12px',
                                        padding: '10px 24px',
                                        fontSize: '15px',
                                        fontWeight: 700,
                                        background: '#ff0000',
                                        color: 'white'
                                    }}
                                >
                                    Subscribe
                                </Button>
                            </div>
                        </BentoCard>
                    </div>

                    {/* 设计规格说明 */}
                    <div
                        style={{
                            marginTop: 64,
                            padding: 32,
                            background: 'var(--color-surface)',
                            borderRadius: 24,
                            border: '1px solid var(--color-border)',
                        }}
                    >
                        <Text variant="h3" style={{ marginBottom: 16 }}>📐 设计规格 (From Figma)</Text>
                        <div
                            style={{
                                display: 'grid',
                                gridTemplateColumns: 'repeat(3, 1fr)',
                                gap: 24,
                            }}
                        >
                            <div>
                                <Text weight="semibold">圆角</Text>
                                <Text color="secondary">27px</Text>
                            </div>
                            <div>
                                <Text weight="semibold">基础单元</Text>
                                <Text color="secondary">175 × 175 px</Text>
                            </div>
                            <div>
                                <Text weight="semibold">间距</Text>
                                <Text color="secondary">40px</Text>
                            </div>
                            <div>
                                <Text weight="semibold">浅色边框</Text>
                                <Text color="secondary">rgba(0,0,0,0.08)</Text>
                            </div>
                            <div>
                                <Text weight="semibold">暗色边框</Text>
                                <Text color="secondary">rgba(255,255,255,0.22)</Text>
                            </div>
                            <div>
                                <Text weight="semibold">内边距</Text>
                                <Text color="secondary">24px</Text>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </ThemeProvider>
    )
}
