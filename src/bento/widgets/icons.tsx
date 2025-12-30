/**
 * OpenBento - Social Platform Icons
 * 
 * Phosphor Icons wrapper for social platform icons
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
    TelegramLogo,
    AppStoreLogo,
    LinkSimple,
    type IconProps as PhosphorIconProps,
} from 'phosphor-react'

interface IconProps {
    size?: number
    color?: string
    className?: string
    weight?: 'thin' | 'light' | 'regular' | 'bold' | 'fill' | 'duotone'
}

// Wrapper component to handle size conversion
const createIconWrapper = (IconComponent: React.ComponentType<PhosphorIconProps>) => {
    const WrappedIcon: React.FC<IconProps> = ({ size = 24, color = 'currentColor', weight = 'regular', className }) => {
        return (
            <IconComponent
                size={size}
                color={color}
                weight={weight}
                className={className}
            />
        )
    }
    return WrappedIcon
}

// ============ Social Media Icons ============

export const InstagramIcon = createIconWrapper(InstagramLogo)

export const TwitterIcon = createIconWrapper(TwitterLogo)

export const TikTokIcon = createIconWrapper(TiktokLogo)

export const YouTubeIcon = createIconWrapper(YoutubeLogo)

export const SpotifyIcon = createIconWrapper(SpotifyLogo)

export const GitHubIcon = createIconWrapper(GithubLogo)

export const LinkedInIcon = createIconWrapper(LinkedinLogo)

export const TelegramIcon = createIconWrapper(TelegramLogo)

export const AppStoreIcon = createIconWrapper(AppStoreLogo)

// ============ Generic Link ============

export const LinkIcon: React.FC<IconProps> = ({ size = 24, color = '#6B7280', className }) => (
    <LinkSimple size={size} color={color} weight="regular" className={className} />
)

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
    return PLATFORM_ICONS[platform] || LinkIcon
}

export default PLATFORM_ICONS
