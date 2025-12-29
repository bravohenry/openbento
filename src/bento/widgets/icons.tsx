/**
 * OpenBento - Social Platform Icons
 * 
 * 高保真社交媒体品牌图标
 */

import React from 'react'

interface IconProps {
    size?: number
    color?: string
    className?: string
}

// ============ Instagram ============
export const InstagramIcon: React.FC<IconProps> = ({ size = 24, color = 'currentColor' }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
        <defs>
            <radialGradient id="instagram-gradient" cx="30%" cy="107%" r="150%">
                <stop offset="0%" stopColor="#fdf497" />
                <stop offset="5%" stopColor="#fdf497" />
                <stop offset="45%" stopColor="#fd5949" />
                <stop offset="60%" stopColor="#d6249f" />
                <stop offset="90%" stopColor="#285AEB" />
            </radialGradient>
        </defs>
        <rect width="24" height="24" rx="6" fill={color === 'gradient' ? 'url(#instagram-gradient)' : color} />
        <circle cx="12" cy="12" r="4" stroke="white" strokeWidth="1.5" fill="none" />
        <circle cx="17.5" cy="6.5" r="1.25" fill="white" />
    </svg>
)

// ============ Twitter / X ============
export const TwitterIcon: React.FC<IconProps> = ({ size = 24, color = '#1DA1F2' }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
        <rect width="24" height="24" rx="6" fill={color} />
        <path d="M7 17L12 12M12 12L17 7M12 12L7 7M12 12L17 17" stroke="white" strokeWidth="2" strokeLinecap="round" />
    </svg>
)

// ============ TikTok ============
export const TikTokIcon: React.FC<IconProps> = ({ size = 24, color = '#000000' }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
        <rect width="24" height="24" rx="6" fill={color} />
        <path d="M16.5 8.5C15.5 8.5 14.5 7.5 14.5 6.5V6H12V14.5C12 15.5 11 16.5 10 16.5C9 16.5 8 15.5 8 14.5C8 13.5 9 12.5 10 12.5" stroke="white" strokeWidth="1.5" fill="none" />
    </svg>
)

// ============ YouTube ============
export const YouTubeIcon: React.FC<IconProps> = ({ size = 24, color = '#FF0000' }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
        <rect width="24" height="24" rx="6" fill={color} />
        <path d="M10 15V9L15 12L10 15Z" fill="white" />
    </svg>
)

// ============ Spotify ============
export const SpotifyIcon: React.FC<IconProps> = ({ size = 24, color = '#1DB954' }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
        <rect width="24" height="24" rx="6" fill={color} />
        <path d="M7 10.5C10 10 14 10 17 11.5M7.5 13.5C9.5 13 13 13 15.5 14M8 16.5C10 16 12.5 16 14 17" stroke="white" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
)

// ============ GitHub ============
export const GitHubIcon: React.FC<IconProps> = ({ size = 24, color = '#24292e' }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
        <rect width="24" height="24" rx="6" fill={color} />
        <path fillRule="evenodd" clipRule="evenodd" d="M12 5C8.13 5 5 8.13 5 12C5 15.1 7.13 17.7 10 18.5V16.5C9 16.8 8.5 16.3 8 15.7C7.8 15.4 7.5 15 7 15L7.5 14.5C8.2 14.5 8.5 15.2 8.8 15.5C9.3 16.2 10 16 10.5 15.8C10.6 15.3 10.8 15 11 14.8C9 14.5 7.5 13.8 7.5 11.5C7.5 10.6 7.8 9.9 8.4 9.3C8.3 9 8.2 8.3 8.5 7.5C8.5 7.5 9.2 7.3 10.5 8.2C11.2 8 11.9 8 12.5 8C13.1 8 13.8 8 14.5 8.2C15.8 7.3 16.5 7.5 16.5 7.5C16.8 8.3 16.7 9 16.6 9.3C17.2 9.9 17.5 10.6 17.5 11.5C17.5 13.8 16 14.5 14 14.8C14.2 15 14.5 15.4 14.5 16V18.5C17.4 17.7 19.5 15.1 19.5 12C19.5 8.13 16.4 5 12.5 5H12Z" fill="white" />
    </svg>
)

// ============ LinkedIn ============
export const LinkedInIcon: React.FC<IconProps> = ({ size = 24, color = '#0A66C2' }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
        <rect width="24" height="24" rx="6" fill={color} />
        <path d="M7 10V17H9.5V10H7ZM8.25 9C7.55 9 7 8.45 7 7.75C7 7.05 7.55 6.5 8.25 6.5C8.95 6.5 9.5 7.05 9.5 7.75C9.5 8.45 8.95 9 8.25 9ZM17 17H14.5V13.5C14.5 12.5 14 12 13 12C12 12 11.5 12.7 11.5 13.5V17H9V10H11.5V11C11.8 10.5 12.5 10 13.5 10C15.5 10 17 11 17 13.5V17Z" fill="white" />
    </svg>
)

// ============ App Store ============
export const AppStoreIcon: React.FC<IconProps> = ({ size = 24, color = '#007AFF' }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
        <rect width="24" height="24" rx="6" fill={color} />
        <path d="M12 7L8 15H10.5L12 12L13.5 15H16L12 7Z" fill="white" />
        <path d="M7 17H17" stroke="white" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
)

// ============ Telegram ============
export const TelegramIcon: React.FC<IconProps> = ({ size = 24, color = '#0088cc' }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
        <rect width="24" height="24" rx="6" fill={color} />
        <path d="M9.5 15.5L8.5 19.5C8.5 19.5 8.2 20.2 9 20.5C9.8 20.8 10.5 20.2 10.5 20.2L15.5 15.5L19.5 17.5C19.5 17.5 20.5 18 20.5 17.5C20.5 17 19.5 16.5 19.5 16.5L6.5 9.5C6.5 9.5 5.5 9 5.5 9.5C5.5 10 6.5 10.5 6.5 10.5L9.5 15.5Z" fill="white" />
    </svg>
)

// ============ Generic Link ============
export const LinkIcon: React.FC<IconProps> = ({ size = 24, color = '#6B7280' }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
        <rect width="24" height="24" rx="6" fill={color} />
        <path d="M10 14L14 10M9 11L7.5 12.5C6.5 13.5 6.5 15 7.5 16C8.5 17 10 17 11 16L12.5 14.5M14.5 9.5L16 8C17 7 17 5.5 16 4.5C15 3.5 13.5 3.5 12.5 4.5L11 6" stroke="white" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
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
