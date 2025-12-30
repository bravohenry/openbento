/**
 * OpenBento Design System - Social Media Icons
 * 
 * SVG icons from public/icons/social/ directory - 社交媒体品牌图标
 * 设计灵感：Bento.me 卡片中的社交媒体图标
 */

import React from 'react'
import Image from 'next/image'
import { 
    LinkSimple, 
    MapPin, 
    ArrowSquareOut, 
    Play, 
    Pause, 
    MusicNote,
    type IconProps as PhosphorIconProps,
} from 'phosphor-react'

interface IconProps {
    size?: number | string
    color?: string
    className?: string
    weight?: 'thin' | 'light' | 'regular' | 'bold' | 'fill' | 'duotone'
}

// Map platform names to SVG file names in public/icons/social/
const PLATFORM_ICON_MAP: Record<string, string> = {
    twitter: 'twitter',
    instagram: 'instagram',
    tiktok: 'unknown', // No SVG available, fallback to unknown
    linkedin: 'linkedin',
    youtube: 'youtube',
    spotify: 'unknown', // No SVG available, fallback to unknown
    github: 'github',
    whatsapp: 'whatsapp',
    discord: 'discord',
}

// Create SVG icon component
const createSvgIcon = (iconName: string, displayName: string) => {
    const IconComponent: React.FC<IconProps> = ({ size = 24, className, ...props }) => {
        const sizeNum = typeof size === 'string' ? parseInt(size, 10) : size
        const iconPath = `/icons/social/${iconName}.svg`
        return (
            <Image
                src={iconPath}
                alt={iconName}
                width={sizeNum}
                height={sizeNum}
                className={className}
                style={{
                    width: sizeNum,
                    height: sizeNum,
                    objectFit: 'contain',
                }}
                {...props}
            />
        )
    }
    IconComponent.displayName = displayName
    return IconComponent
}

// ============ 社交媒体图标 (SVG Files) ============

export const TwitterIcon = createSvgIcon('twitter', 'TwitterIcon')

export const InstagramIcon = createSvgIcon('instagram', 'InstagramIcon')

// InstagramGradientIcon: 使用 SVG linearGradient 直接在图标内填充渐变色
export const InstagramGradientIcon: React.FC<Omit<IconProps, 'color'>> = ({ size = 24, className, ...props }) => {
    const sizeNum = typeof size === 'string' ? parseInt(size, 10) : size
    return (
        <svg
            width={sizeNum}
            height={sizeNum}
            viewBox="0 0 40 40"
            fill="none"
            className={className}
            {...(props as React.SVGProps<SVGSVGElement>)}
        >
            <defs>
                <linearGradient id="instagram-gradient" x1="0%" y1="100%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#f09433" />
                    <stop offset="25%" stopColor="#e6683c" />
                    <stop offset="50%" stopColor="#dc2743" />
                    <stop offset="75%" stopColor="#cc2366" />
                    <stop offset="100%" stopColor="#bc1888" />
                </linearGradient>
            </defs>
            <path d="M30 0H10C4.47715 0 0 4.47715 0 10V30C0 35.5228 4.47715 40 10 40H30C35.5228 40 40 35.5228 40 30V10C40 4.47715 35.5228 0 30 0Z" fill="url(#instagram-gradient)"/>
        </svg>
    )
}
InstagramGradientIcon.displayName = 'InstagramGradientIcon'

export const TikTokIcon = createSvgIcon('unknown', 'TikTokIcon') // Fallback

export const LinkedInIcon = createSvgIcon('linkedin', 'LinkedInIcon')

export const YouTubeIcon = createSvgIcon('youtube', 'YouTubeIcon')

export const SpotifyIcon = createSvgIcon('unknown', 'SpotifyIcon') // Fallback

export const GitHubIcon = createSvgIcon('github', 'GitHubIcon')

export const WhatsAppIcon = createSvgIcon('whatsapp', 'WhatsAppIcon')

export const DiscordIcon = createSvgIcon('discord', 'DiscordIcon')

// ============ 通用图标 (Phosphor Icons) ============

export const LinkIcon = React.forwardRef<SVGSVGElement, IconProps>(
    ({ size = 24, color = 'currentColor', weight = 'regular', ...props }, ref) => {
        const sizeNum = typeof size === 'string' ? parseInt(size, 10) : size
        return (
            <LinkSimple 
                ref={ref}
                size={sizeNum} 
                color={color}
                weight={weight}
                {...props}
            />
        )
    }
)
LinkIcon.displayName = 'LinkIcon'

export const MapPinIcon = React.forwardRef<SVGSVGElement, IconProps>(
    ({ size = 24, color = 'currentColor', weight = 'regular', ...props }, ref) => {
        const sizeNum = typeof size === 'string' ? parseInt(size, 10) : size
        return (
            <MapPin 
                ref={ref}
                size={sizeNum} 
                color={color}
                weight={weight}
                {...props}
            />
        )
    }
)
MapPinIcon.displayName = 'MapPinIcon'

export const ExternalLinkIcon = React.forwardRef<SVGSVGElement, IconProps>(
    ({ size = 24, color = 'currentColor', weight = 'regular', ...props }, ref) => {
        const sizeNum = typeof size === 'string' ? parseInt(size, 10) : size
        return (
            <ArrowSquareOut 
                ref={ref}
                size={sizeNum} 
                color={color}
                weight={weight}
                {...props}
            />
        )
    }
)
ExternalLinkIcon.displayName = 'ExternalLinkIcon'

export const PlayIcon = React.forwardRef<SVGSVGElement, IconProps>(
    ({ size = 24, color = 'currentColor', weight = 'regular', ...props }, ref) => {
        const sizeNum = typeof size === 'string' ? parseInt(size, 10) : size
        return (
            <Play 
                ref={ref}
                size={sizeNum} 
                color={color}
                weight={weight}
                {...props}
            />
        )
    }
)
PlayIcon.displayName = 'PlayIcon'

export const PauseIcon = React.forwardRef<SVGSVGElement, IconProps>(
    ({ size = 24, color = 'currentColor', weight = 'regular', ...props }, ref) => {
        const sizeNum = typeof size === 'string' ? parseInt(size, 10) : size
        return (
            <Pause 
                ref={ref}
                size={sizeNum} 
                color={color}
                weight={weight}
                {...props}
            />
        )
    }
)
PauseIcon.displayName = 'PauseIcon'

export const MusicIcon = React.forwardRef<SVGSVGElement, IconProps>(
    ({ size = 24, color = 'currentColor', weight = 'regular', ...props }, ref) => {
        const sizeNum = typeof size === 'string' ? parseInt(size, 10) : size
        return (
            <MusicNote 
                ref={ref}
                size={sizeNum} 
                color={color}
                weight={weight}
                {...props}
            />
        )
    }
)
MusicIcon.displayName = 'MusicIcon'

// 导出所有图标
export const Icons = {
    Twitter: TwitterIcon,
    Instagram: InstagramIcon,
    TikTok: TikTokIcon,
    LinkedIn: LinkedInIcon,
    YouTube: YouTubeIcon,
    Spotify: SpotifyIcon,
    GitHub: GitHubIcon,
    WhatsApp: WhatsAppIcon,
    Discord: DiscordIcon,
    Link: LinkIcon,
    MapPin: MapPinIcon,
    ExternalLink: ExternalLinkIcon,
    Play: PlayIcon,
    Pause: PauseIcon,
    Music: MusicIcon,
}

export type IconName = keyof typeof Icons
