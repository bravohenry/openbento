'use client'

/**
 * [INPUT]: (LinkWidgetConfig, onClick, isEditing) - Link configuration, click handler, edit mode flag
 * [OUTPUT]: (LinkWidget, PlatformCardContent, createLinkWidgetConfig) - Link card component and related utility functions
 * [POS]: Located at /bento/widgets/link Widget implementation, built on BentoCard, provides platform link display functionality.
 * 
 * [PROTOCOL]:
 * 1. Once this file's logic changes, this Header must be synchronized immediately.
 * 2. After update, must check upward whether /src/bento/widgets/.folder.md description is still accurate.
 */

import React from 'react'
import { BentoCard } from '@/bento/core'
import type { LinkWidgetConfig, WidgetProps, WidgetSize } from '../types'
import { PLATFORM_REGISTRY, extractPlatformInfo } from '../registry'
import {
    TwitterLogo,
    InstagramLogo,
    TiktokLogo,
    LinkedinLogo,
    YoutubeLogo,
    SpotifyLogo,
    GithubLogo,
    WhatsappLogo,
    DiscordLogo,
    TelegramLogo,
    TwitchLogo,
    BehanceLogo,
    DribbbleLogo,
    PinterestLogo,
    RedditLogo,
    MediumLogo,
    Coffee,
    GoogleLogo,
    LinkSimple,
    type IconProps as PhosphorIconProps,
} from 'phosphor-react'

// ============ Size-Responsive Platform Card Content ============

interface PlatformCardContentProps {
    icon: React.ReactNode
    iconBg?: string
    iconShadow?: string
    title: string
    subtitle?: string
    action?: {
        label: string
        count?: number | string
        color?: string
        textColor?: string
        shape?: 'rounded' | 'pill'
        borderRadius?: number
    }
    textColor?: string
    subtitleColor?: string
    widgetSize: WidgetSize // New: responsive size
}

// Get layout configuration based on size
function getSizeLayout(size: WidgetSize) {
    switch (size) {
        case '1x1':
            return {
                iconSize: 40,
                titleTop: 52,
                subtitleTop: 69,
                actionTop: 97,
                fontSize: 14,
                lineClamp: 3,
                horizontal: false,
                isBar: false,
            }
        case '2x1':
            return {
                iconSize: 40,
                titleTop: 52,
                subtitleTop: 69,
                actionTop: 97,
                fontSize: 14,
                lineClamp: 2,
                horizontal: true,
                rightContentWidth: '50%',
                isBar: false,
            }
        case '1x2':
            return {
                iconSize: 40,
                titleTop: 52,
                subtitleTop: 69,
                actionTop: 97,
                fontSize: 14,
                lineClamp: 6,
                horizontal: false,
                hasExtraContent: true,
                isBar: false,
            }
        case '2x2':
            return {
                iconSize: 56,
                titleTop: 72,
                subtitleTop: 94,
                actionTop: 120,
                fontSize: 18,
                lineClamp: 4,
                horizontal: false,
                hasExtraContent: true,
                isBar: false,
            }
        case 'bar':
            // 390×68 thin horizontal bar layout
            return {
                iconSize: 28,
                titleTop: 0,
                subtitleTop: 0,
                actionTop: 0,
                fontSize: 14,
                lineClamp: 1,
                horizontal: true,
                isBar: true, // Special compact layout
            }
        default:
            return {
                iconSize: 40,
                titleTop: 52,
                subtitleTop: 69,
                actionTop: 97,
                fontSize: 14,
                lineClamp: 3,
                horizontal: false,
                isBar: false,
            }
    }
}


const PlatformCardContent: React.FC<PlatformCardContentProps> = ({
    icon,
    iconBg = '#fff',
    iconShadow = '0px 0.6px 2px rgba(0, 0, 0, 0.16)',
    title,
    subtitle,
    action,
    textColor = '#1a1a1a',
    subtitleColor = 'rgba(0, 0, 0, 0.6)',
    widgetSize
}) => {
    const layout = getSizeLayout(widgetSize)
    const iconRadius = layout.iconSize >= 40 ? (layout.iconSize === 56 ? 12 : 10) : 8

    // Bar size: Special compact horizontal layout
    if (layout.isBar) {
        return (
            <div style={{
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                padding: '0 16px',
                display: 'flex',
                alignItems: 'center',
                gap: 12,
                pointerEvents: 'none',
            }}>
                {/* Icon */}
                <div style={{
                    width: layout.iconSize,
                    height: layout.iconSize,
                    borderRadius: iconRadius,
                    backgroundColor: iconBg,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    boxShadow: iconBg === 'transparent' ? 'none' : iconShadow,
                    overflow: 'hidden',
                    flexShrink: 0,
                }}>
                    {icon}
                </div>

                {/* Title */}
                <div style={{
                    flex: 1,
                    fontFamily: 'Inter, sans-serif',
                    fontSize: layout.fontSize,
                    fontWeight: 500,
                    lineHeight: '18px',
                    letterSpacing: '-0.01em',
                    color: textColor,
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    whiteSpace: 'nowrap',
                }}>
                    {title}
                </div>

                {/* Action Button (if exists) */}
                {action && (
                    <button style={{
                        height: 26,
                        paddingInline: 12,
                        borderRadius: action.borderRadius || 6,
                        backgroundColor: action.color || '#4093ef',
                        border: 'none',
                        cursor: 'pointer',
                        fontFamily: 'Inter, sans-serif',
                        fontSize: 11,
                        fontWeight: 600,
                        color: action.textColor || '#ffffff',
                        pointerEvents: 'auto',
                        flexShrink: 0,
                    }}>
                        {action.label}
                    </button>
                )}
            </div>
        )
    }

    // Standard layout (1x1, 2x1, 1x2, 2x2)
    return (
        <div style={{
            position: 'absolute',
            top: 24,
            left: 24,
            right: 24,
            bottom: 24,
            pointerEvents: 'none',
        }}>
            {/* Icon */}
            <div style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: layout.iconSize,
                height: layout.iconSize,
                borderRadius: iconRadius,
                backgroundColor: iconBg,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: iconBg === 'transparent' ? 'none' : iconShadow,
                overflow: 'hidden',
                // If transparent background (Full-bleed icon), no outer border visibility needed
                border: iconBg === 'transparent' ? 'none' : 'none',
            }}>
                {icon}
                {/* Only show inner border highlight on non-transparent background */}
                {iconBg !== 'transparent' && (
                    <div style={{
                        position: 'absolute',
                        inset: 0,
                        borderRadius: iconRadius,
                        boxShadow: 'inset 0 0 0 1px rgba(0, 0, 0, 0.06)',
                        pointerEvents: 'none',
                    }} />
                )}
            </div>


            {/* Title */}
            <div style={{
                position: 'absolute',
                top: layout.titleTop,
                left: 0,
                right: layout.horizontal ? layout.rightContentWidth : 0,
                fontFamily: 'Inter, sans-serif',
                fontSize: layout.fontSize,
                fontWeight: 500,
                lineHeight: layout.fontSize === 18 ? '22px' : '18px',
                letterSpacing: layout.fontSize === 18 ? '-0.02em' : '-0.01em',
                color: textColor,
                display: '-webkit-box',
                WebkitLineClamp: layout.lineClamp,
                WebkitBoxOrient: 'vertical',
                overflow: 'hidden',
                whiteSpace: 'pre-wrap',
            }}>
                {title}
            </div>

            {/* Subtitle */}
            {subtitle && (
                <div style={{
                    position: 'absolute',
                    top: layout.subtitleTop,
                    left: 0,
                    right: layout.horizontal ? layout.rightContentWidth : 0,
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

            {/* Action Button */}
            {action && (
                <button style={{
                    position: 'absolute',
                    top: layout.actionTop,
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
    )
}


// ============ Platform Icons (Phosphor Icons) ============

// Map platform names to Phosphor icon components
const PLATFORM_ICON_COMPONENTS: Record<string, React.ComponentType<PhosphorIconProps>> = {
    instagram: InstagramLogo,
    twitter: TwitterLogo,
    tiktok: TiktokLogo,
    youtube: YoutubeLogo,
    spotify: SpotifyLogo,
    github: GithubLogo,
    linkedin: LinkedinLogo,
    discord: DiscordLogo,
    telegram: TelegramLogo,
    twitch: TwitchLogo,
    behance: BehanceLogo,
    dribbble: DribbbleLogo,
    pinterest: PinterestLogo,
    reddit: RedditLogo,
    whatsapp: WhatsappLogo,
    medium: MediumLogo,
    patreon: LinkSimple, // PatreonLogo not available, using LinkSimple as fallback
    buymeacoffee: Coffee,
    dev: GithubLogo, // DevToLogo not available, using GithubLogo as fallback
    google: GoogleLogo,
    generic: LinkSimple,
}

function getPlatformIconComponent(platform: string, iconSize: number = 40) {
    const IconComponent = PLATFORM_ICON_COMPONENTS[platform] || PLATFORM_ICON_COMPONENTS.generic

    return (
        <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <IconComponent
                size={iconSize}
                weight="fill"
                color="currentColor"
            />
        </div>
    )
}


// ============ Platform Configs ============

const PLATFORM_ACTIONS: Record<string, PlatformCardContentProps['action']> = {
    instagram: { label: 'Follow', color: '#4093ef', borderRadius: 8 },
    twitter: { label: 'Follow', color: '#4093ef', borderRadius: 8 },
    tiktok: { label: 'Follow', color: '#ea435a', borderRadius: 4 },
    youtube: { label: 'Subscribe', color: '#FF0000', shape: 'pill' },
    spotify: undefined,
    github: { label: 'Follow', color: '#24292e', borderRadius: 8 },
    linkedin: { label: 'Connect', color: '#0A66C2', borderRadius: 8 },
}

const PLATFORM_BACKGROUNDS: Record<string, string> = {
    instagram: '#ffffff',
    twitter: '#ffffff',
    tiktok: '#ffffff',
    youtube: '#FFF5F5',
    spotify: '#E6FBF0',
    github: '#ffffff',
    linkedin: '#F0F5FF',
    generic: '#ffffff',
}

const PLATFORM_ICON_BACKGROUNDS: Record<string, string> = {
    instagram: 'transparent', // SVG includes background
    twitter: '#55ACEE',      // Logo is white on blue, but our SVG might include blue? Checked twitter.svg
    tiktok: '#ffffff',
    youtube: 'transparent',   // SVG includes background
    spotify: '#1DB954',
    github: 'transparent',    // SVG includes background
    linkedin: 'transparent',  // SVG includes background
    discord: 'transparent',   // SVG includes background
    twitch: 'transparent',
    behance: 'transparent',
    dribbble: 'transparent',
    pinterest: 'transparent',
    reddit: 'transparent',
    whatsapp: 'transparent',
    medium: 'transparent',
    patreon: 'transparent',
    buymeacoffee: 'transparent',
    generic: '#6B7280',
}


// ============ Link Widget Component ============

export const LinkWidget: React.FC<WidgetProps<LinkWidgetConfig>> = ({
    config,
    onClick,
    isEditing = false,
}) => {
    const { url, size, platform: configPlatform, title, subtitle, ctaLabel, customColor } = config

    // Auto-detect platform if not provided
    const platform = configPlatform || extractPlatformInfo(url).platform
    
    // Ensure platform exists in registry, fallback to generic
    const platformConfig = PLATFORM_REGISTRY[platform] || PLATFORM_REGISTRY.generic
    const displayTitle = title || platformConfig.name
    const displaySubtitle = subtitle
    const backgroundColor = customColor || PLATFORM_BACKGROUNDS[platform] || PLATFORM_BACKGROUNDS.generic || '#ffffff'
    const iconBg = PLATFORM_ICON_BACKGROUNDS[platform] || PLATFORM_ICON_BACKGROUNDS.generic || '#ffffff'

    // Get action config
    const defaultAction = PLATFORM_ACTIONS[platform]
    const action = ctaLabel
        ? { ...defaultAction, label: ctaLabel }
        : defaultAction

    // Get icon size based on widget size
    const layout = getSizeLayout(size)

    return (
        <BentoCard
            size={size}
            backgroundColor={backgroundColor}
            clickable={!isEditing}
            href={isEditing ? undefined : url}
            target={isEditing ? undefined : "_blank"}
        >
            <PlatformCardContent
                icon={getPlatformIconComponent(platform, layout.iconSize)}
                iconBg={iconBg}
                title={displayTitle}
                subtitle={displaySubtitle}
                action={action}
                widgetSize={size}
            />
        </BentoCard>
    )
}

// ============ Exports ============

export { PlatformCardContent, getSizeLayout }

export function createLinkWidgetConfig(
    url: string,
    size: LinkWidgetConfig['size'] = '1x1',
    overrides?: Partial<LinkWidgetConfig>
): LinkWidgetConfig {
    const info = extractPlatformInfo(url)

    return {
        id: `link-${Date.now()}`,
        category: 'link',
        size,
        url,
        platform: info.platform,
        title: info.title,
        subtitle: info.subtitle,
        ctaLabel: info.ctaLabel,
        ...overrides,
    }
}

export default LinkWidget
