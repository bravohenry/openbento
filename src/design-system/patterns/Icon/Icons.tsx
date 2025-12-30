/**
 * OpenBento Design System - Social Media Icons
 * 
 * Phosphor Icons wrapper components - 社交媒体品牌图标
 * 设计灵感：Bento.me 卡片中的社交媒体图标
 */

import React from 'react'
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
    LinkSimple, 
    MapPin, 
    ArrowSquareOut, 
    Play, 
    Pause, 
    MusicNote,
    type IconProps as PhosphorIconProps,
} from 'phosphor-react'

interface IconProps extends Omit<PhosphorIconProps, 'size'> {
    size?: number | string
    color?: string
    weight?: 'thin' | 'light' | 'regular' | 'bold' | 'fill' | 'duotone'
}

// Wrapper component to handle size conversion
const createIconWrapper = (IconComponent: React.ComponentType<PhosphorIconProps>) => {
    const WrappedIcon: React.FC<IconProps> = ({ size = 24, color = 'currentColor', weight = 'regular', ...props }) => {
        const sizeNum = typeof size === 'string' ? parseInt(size, 10) : size
        return (
            <IconComponent
                size={sizeNum}
                color={color}
                weight={weight}
                {...(props as PhosphorIconProps)}
            />
        )
    }
    return WrappedIcon
}

// ============ 社交媒体图标 (Phosphor Icons) ============

export const TwitterIcon = createIconWrapper(TwitterLogo)
TwitterIcon.displayName = 'TwitterIcon'

export const InstagramIcon = createIconWrapper(InstagramLogo)
InstagramIcon.displayName = 'InstagramIcon'

// InstagramGradientIcon: 使用 SVG linearGradient 直接在图标内填充渐变色
export const InstagramGradientIcon: React.FC<Omit<IconProps, 'color'>> = ({ size = 24, weight = 'regular', ...props }) => {
    const sizeNum = typeof size === 'string' ? parseInt(size, 10) : size
    return (
        <svg
            width={sizeNum}
            height={sizeNum}
            viewBox="0 0 24 24"
            fill="none"
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
            <InstagramLogo
                size={sizeNum}
                weight={weight}
                fill="url(#instagram-gradient)"
            />
        </svg>
    )
}
InstagramGradientIcon.displayName = 'InstagramGradientIcon'

export const TikTokIcon = createIconWrapper(TiktokLogo)
TikTokIcon.displayName = 'TikTokIcon'

export const LinkedInIcon = createIconWrapper(LinkedinLogo)
LinkedInIcon.displayName = 'LinkedInIcon'

export const YouTubeIcon = createIconWrapper(YoutubeLogo)
YouTubeIcon.displayName = 'YouTubeIcon'

export const SpotifyIcon = createIconWrapper(SpotifyLogo)
SpotifyIcon.displayName = 'SpotifyIcon'

export const GitHubIcon = createIconWrapper(GithubLogo)
GitHubIcon.displayName = 'GitHubIcon'

export const WhatsAppIcon = createIconWrapper(WhatsappLogo)
WhatsAppIcon.displayName = 'WhatsAppIcon'

export const DiscordIcon = createIconWrapper(DiscordLogo)
DiscordIcon.displayName = 'DiscordIcon'

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
