'use client'

/**
 * OpenBento - BentoCard 展示页面
 * 
 * 基于 Figma 设计 (node-id: 25-1023) 验证实现
 */

import React from 'react'
import { BentoCard, BENTO_GAP } from '@/bento/core'
import { Button, InstagramGradientIcon, TwitterIcon, TikTokIcon, WhatsAppIcon, MapPinIcon, SpotifyIcon, YouTubeIcon } from '@/design-system/patterns'
import { ThemeProvider } from '@/design-system/foundation/theme'
import { Text } from '@/design-system/primitives'

// ============ Standard Card Content Component ============

interface PlatformCardContentProps {
    icon: React.ReactNode;
    iconBg?: string;
    iconShadow?: string;
    title: string;
    subtitle?: string;
    action?: {
        label: string;
        count?: number | string;
        color?: string;
        textColor?: string;
        shape?: 'rounded' | 'pill';
        borderRadius?: number;
    };
    textColor?: string;
    subtitleColor?: string;
    is2x1?: boolean;
}

const PlatformCardContent = ({
    icon,
    iconBg = '#fff',
    iconShadow = '0px 1px 2px rgba(0, 0, 0, 0.1)',
    title,
    subtitle,
    action,
    textColor = '#000000',
    subtitleColor = 'rgba(0, 0, 0, 0.6)',
    is2x1 = false
}: PlatformCardContentProps) => (
    <div style={{
        position: 'absolute',
        top: 24,
        left: 24,
        right: 24,
        bottom: 24,
        pointerEvents: 'none',
    }}>
        {/* Icon: 40x40, rounded 10px */}
        <div style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: 40,
            height: 40,
            borderRadius: 10,
            backgroundColor: iconBg,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: iconShadow,
            overflow: 'hidden',
        }}>
            {icon}
            <div style={{
                position: 'absolute',
                inset: 0,
                borderRadius: 10,
                boxShadow: 'inset 0 0 0 1px rgba(0, 0, 0, 0.06)',
                pointerEvents: 'none',
            }} />
        </div>

        {/* Title: 14px, Starts at y=52 */}
        <div style={{
            position: 'absolute',
            top: 52,
            left: 0,
            right: is2x1 ? '50%' : 0,
            fontFamily: 'Inter, sans-serif',
            fontSize: 14,
            fontWeight: 500,
            lineHeight: '1.2',
            color: textColor,
            display: '-webkit-box',
            WebkitLineClamp: is2x1 ? 2 : 3,
            WebkitBoxOrient: 'vertical',
            overflow: 'hidden',
            whiteSpace: 'pre-wrap',
        }}>
            {title}
        </div>

        {/* Subtitle: 12px, Starts at y=69 or below Title */}
        {subtitle && (
            <div style={{
                position: 'absolute',
                top: 69,
                left: 0,
                right: is2x1 ? '50%' : 0,
                fontFamily: 'Inter, sans-serif',
                fontSize: 12,
                fontWeight: 400,
                lineHeight: '16px',
                color: subtitleColor,
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                whiteSpace: 'nowrap',
            }}>
                {subtitle}
            </div>
        )}

        {/* Action Button: Starts at y=97, height 30px */}
        {action && (
            <button style={{
                position: 'absolute',
                top: 97,
                left: 0,
                minWidth: action.shape === 'pill' ? 70 : 66,
                height: 30,
                borderRadius: action.borderRadius || (action.shape === 'pill' ? 23 : 8),
                backgroundColor: action.color || '#4093ef',
                border: 'none',
                cursor: 'pointer',
                fontFamily: 'Inter, sans-serif',
                fontSize: 12,
                fontWeight: 600,
                color: action.textColor || '#ffffff',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: 4,
                padding: '0 12px',
                pointerEvents: 'auto',
            }}>
                <span>{action.label}</span>
                {action.count !== undefined && (
                    <span style={{ fontWeight: 400, opacity: 0.8 }}>{action.count}</span>
                )}
            </button>
        )}
    </div>
);

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
                        <Text variant="display" color="primary">
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

                        {/* 2. Instagram 卡片 1x1 - 标准架构 */}
                        <BentoCard size="1x1" backgroundColor="#ffffff" clickable>
                            <PlatformCardContent
                                icon={<InstagramGradientIcon size={40} />}
                                title="Instagram"
                                action={{
                                    label: "Follow",
                                    color: "#4093ef",
                                    shape: "rounded",
                                    borderRadius: 8
                                }}
                            />
                        </BentoCard>

                        {/* 3. Twitter 卡片 1x1 - 标准架构 */}
                        <BentoCard size="1x1" clickable>
                            <PlatformCardContent
                                icon={<TwitterIcon size={24} color="#fff" />}
                                iconBg="#55ACEE"
                                title="Twitter"
                                subtitle="@biutyai"
                                action={{
                                    label: "Follow",
                                    color: "#4093ef",
                                    shape: "rounded",
                                    borderRadius: 8
                                }}
                            />
                        </BentoCard>

                        {/* TikTok 卡片 1x1 - 标准架构 */}
                        <BentoCard size="1x1" backgroundColor="#ffffff" clickable>
                            <PlatformCardContent
                                icon={<TikTokIcon size={24} />}
                                title="TikTok"
                                subtitle="@biuty.ai"
                                action={{
                                    label: "Follow",
                                    count: 8,
                                    color: "#ea435a",
                                    borderRadius: 4 // Figma 原产设计是较方圆角
                                }}
                            />
                        </BentoCard>






                        {/* 4. WhatsApp 链接卡片 2x1 - 标准架构 */}
                        <BentoCard size="2x1" backgroundColor="#ffffff" clickable href="https://chat.whatsapp.com" target="_blank">
                            <PlatformCardContent
                                is2x1
                                icon={<WhatsAppIcon size={24} color="#25d366" />}
                                title={`Join Biuty🌸\nCommunity`}
                                subtitle="chat.whatsapp.com"
                            />
                            {/* 2x1 卡片特有的右侧媒体 */}
                            <div style={{
                                position: 'absolute',
                                top: 24,
                                right: 24,
                                width: 178,
                                height: 127,
                                borderRadius: 16,
                                overflow: 'hidden',
                                pointerEvents: 'none',
                            }}>
                                <img
                                    src="http://localhost:3845/assets/fbb01462716d8c3c050e75f55746393567eb2e55.png"
                                    alt="WhatsApp hand"
                                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                                />
                            </div>
                        </BentoCard>

                        {/* 5. 地图卡片 2x2 - 精确复刻 Figma 25:1345 */}
                        <BentoCard
                            size="2x2"
                            backgroundImage="http://localhost:3845/assets/08a1f114b3b221fab78b6cc18d90533f69de7a1d.png"
                            clickable
                        >
                            {/* 中央定位点 */}
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
                                zIndex: 1,
                            }} />

                            {/* 扩散光晕 (Figma node I25:1345;19:93) */}
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
                            }} />

                            {/* "Where I live" 标签 (Figma 风格) */}
                            <div style={{
                                position: 'absolute',
                                bottom: 20,
                                left: 20,
                                height: 38, // 匹配 md 按钮高度
                                backgroundColor: 'rgba(255, 255, 255, 0.7)',
                                backdropFilter: 'blur(20px) saturate(160%)',
                                padding: '0 16px', // 匹配 md 按钮内边距
                                borderRadius: 12, // 非纯圆角 (pill)，匹配 buttonShapes.rounded / radii.lg
                                display: 'flex',
                                alignItems: 'center',
                                gap: 8, // 匹配 md 按钮 gap
                                border: '1px solid rgba(255, 255, 255, 0.4)',
                                boxShadow: '0 4px 12px rgba(0, 0, 0, 0.05), 0 1px 2px rgba(0, 0, 0, 0.05)',
                                pointerEvents: 'none',
                                zIndex: 2,
                            }}>
                                <span style={{ fontSize: 18, lineHeight: 1 }}>🏡</span>
                                <span style={{
                                    fontFamily: 'Inter, sans-serif',
                                    fontSize: 14, // 匹配 md 按钮
                                    fontWeight: 500,
                                    color: '#000',
                                    letterSpacing: '-0.01em'
                                }}>
                                    Where I live
                                </span>
                            </div>
                        </BentoCard>



                        {/* 6. Spotify 卡片 1x1 - 标准架构 (基于上传图片) */}
                        <BentoCard size="1x1" backgroundColor="#E6FBF0" clickable>
                            <PlatformCardContent
                                icon={<SpotifyIcon size={24} color="#fff" />}
                                iconBg="#1DB954"
                                title={`Spotify - Web\nPlayer: Music for\neveryone`}
                                subtitle="spotify.com"
                            />
                        </BentoCard>

                        {/* 7. YouTube 卡片 1x1 - 标准架构 */}
                        <BentoCard size="1x1" backgroundColor="#FFF5F5" clickable>
                            <PlatformCardContent
                                icon={<YouTubeIcon size={24} color="#fff" />}
                                iconBg="#FF0000"
                                title={`Сергей\nСерпиченко`}
                                action={{
                                    label: "Subscribe",
                                    count: 5,
                                    color: "#FF0000",
                                    shape: "pill"
                                }}
                            />
                        </BentoCard>

                        {/* 8. 个人品牌卡片 1x1 - 标准架构 (基于上传图片 Zihan) */}
                        <BentoCard size="1x1" backgroundColor="#ffffff" clickable>
                            <PlatformCardContent
                                icon={
                                    <div style={{ backgroundColor: '#FFD700', width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                        <img src="http://localhost:3845/assets/08a1f114b3b221fab78b6cc18d90533f69de7a1d.png" style={{ width: '100%', height: '100%', objectFit: 'cover' }} alt="Avatar" />
                                    </div>
                                }
                                title={`Zihan | Branding,\nDesigning &\nBeyond`}
                                subtitle="bravohenry.com"
                            />
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
        </ThemeProvider >
    )
}
