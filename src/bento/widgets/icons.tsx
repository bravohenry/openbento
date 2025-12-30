/**
 * OpenBento - Social Platform Icons
 * 
 * SVG icons from public/icons/social/ directory
 */

import React from 'react'
import Image from 'next/image'

interface IconProps {
    size?: number
    color?: string
    className?: string
    weight?: 'thin' | 'light' | 'regular' | 'bold' | 'fill' | 'duotone'
}

// Map platform names to SVG file names in public/icons/social/
const PLATFORM_ICON_MAP: Record<string, string> = {
    instagram: 'instagram',
    twitter: 'twitter',
    tiktok: 'unknown', // No SVG available, fallback to unknown
    youtube: 'youtube',
    spotify: 'unknown', // No SVG available, fallback to unknown
    github: 'github',
    linkedin: 'linkedin',
    discord: 'discord',
    telegram: 'unknown', // No SVG available, fallback to unknown
    twitch: 'twitch',
    behance: 'behance',
    dribbble: 'dribbble',
    pinterest: 'pinterest',
    reddit: 'reddit',
    whatsapp: 'whatsapp',
    medium: 'medium',
    patreon: 'patreon',
    buymeacoffee: 'buymeacoffee',
    dev: 'dev',
    google: 'google',
    appstore: 'unknown', // No SVG available, fallback to unknown
    generic: 'unknown',
    link: 'unknown',
}

// Create icon component from SVG file
const createSvgIcon = (iconName: string) => {
    const IconComponent: React.FC<IconProps> = ({ size = 24, className }) => {
        const iconPath = `/icons/social/${iconName}.svg`
        return (
            <Image
                src={iconPath}
                alt={iconName}
                width={size}
                height={size}
                className={className}
                style={{
                    width: size,
                    height: size,
                    objectFit: 'contain',
                }}
            />
        )
    }
    return IconComponent
}

// ============ Social Media Icons ============

export const InstagramIcon = createSvgIcon('instagram')

export const TwitterIcon = createSvgIcon('twitter')

export const TikTokIcon = createSvgIcon('unknown') // Fallback

export const YouTubeIcon = createSvgIcon('youtube')

export const SpotifyIcon = createSvgIcon('unknown') // Fallback

export const GitHubIcon = createSvgIcon('github')

export const LinkedInIcon = createSvgIcon('linkedin')

export const TelegramIcon = createSvgIcon('unknown') // Fallback

export const AppStoreIcon = createSvgIcon('unknown') // Fallback

// ============ Generic Link ============

export const LinkIcon: React.FC<IconProps> = ({ size = 24, className }) => {
    return createSvgIcon('unknown')({ size, className })
}

// ============ Icon Map ============
export const PLATFORM_ICONS: Record<string, React.FC<IconProps>> = {
    instagram: InstagramIcon,
    twitter: TwitterIcon,
    tiktok: TikTokIcon,
    youtube: YouTubeIcon,
    spotify: SpotifyIcon,
    github: GitHubIcon,
    linkedin: LinkedInIcon,
    telegram: TelegramIcon,
    appstore: AppStoreIcon,
    generic: LinkIcon,
    link: LinkIcon,
}

export function getPlatformIcon(platform: string): React.FC<IconProps> {
    const iconName = PLATFORM_ICON_MAP[platform] || PLATFORM_ICON_MAP.generic
    return createSvgIcon(iconName)
}

export default PLATFORM_ICONS
