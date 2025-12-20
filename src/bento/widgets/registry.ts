/**
 * OpenBento - Platform Registry
 * 
 * 平台识别与配置注册表
 * 根据 URL 自动识别社交媒体平台
 */

import type { SocialPlatform } from './types'

// ============ Platform Config ============

export interface PlatformConfig {
    name: string
    icon: string // SVG path or emoji
    color: string // 品牌主色
    gradient?: string // 渐变色
    ctaLabel: string // 默认 CTA 按钮文字
    urlPatterns: RegExp[]
    extractInfo?: (url: string) => { title?: string; subtitle?: string }
}

// ============ Platform Registry ============

export const PLATFORM_REGISTRY: Record<SocialPlatform, PlatformConfig> = {
    instagram: {
        name: 'Instagram',
        icon: 'instagram',
        color: '#E4405F',
        gradient: 'linear-gradient(45deg, #f09433 0%, #e6683c 25%, #dc2743 50%, #cc2366 75%, #bc1888 100%)',
        ctaLabel: 'Follow',
        urlPatterns: [/instagram\.com\/([^/?]+)/i],
        extractInfo: (url) => {
            const match = url.match(/instagram\.com\/([^/?]+)/i)
            return { subtitle: match ? `@${match[1]}` : undefined }
        },
    },
    twitter: {
        name: 'Twitter',
        icon: 'twitter',
        color: '#1DA1F2',
        ctaLabel: 'Follow',
        urlPatterns: [/twitter\.com\/([^/?]+)/i, /x\.com\/([^/?]+)/i],
        extractInfo: (url) => {
            const match = url.match(/(?:twitter|x)\.com\/([^/?]+)/i)
            return { subtitle: match ? `@${match[1]}` : undefined }
        },
    },
    tiktok: {
        name: 'TikTok',
        icon: 'tiktok',
        color: '#000000',
        ctaLabel: 'Follow',
        urlPatterns: [/tiktok\.com\/@?([^/?]+)/i],
        extractInfo: (url) => {
            const match = url.match(/tiktok\.com\/@?([^/?]+)/i)
            return { subtitle: match ? `@${match[1]}` : undefined }
        },
    },
    youtube: {
        name: 'YouTube',
        icon: 'youtube',
        color: '#FF0000',
        ctaLabel: 'Subscribe',
        urlPatterns: [
            /youtube\.com\/(channel|c|user|@)\/([^/?]+)/i,
            /youtube\.com\/([^/?]+)/i,
            /youtu\.be\/([^/?]+)/i,
        ],
        extractInfo: (url) => {
            const match = url.match(/youtube\.com\/(?:channel|c|user|@)\/([^/?]+)/i)
            return { subtitle: match ? match[1] : undefined }
        },
    },
    spotify: {
        name: 'Spotify',
        icon: 'spotify',
        color: '#1DB954',
        ctaLabel: 'Listen',
        urlPatterns: [
            /spotify\.com\/(artist|album|track|playlist)\/([^/?]+)/i,
            /open\.spotify\.com/i,
        ],
    },
    github: {
        name: 'GitHub',
        icon: 'github',
        color: '#24292e',
        ctaLabel: 'Follow',
        urlPatterns: [/github\.com\/([^/?]+)(?:\/([^/?]+))?/i],
        extractInfo: (url) => {
            const match = url.match(/github\.com\/([^/?]+)(?:\/([^/?]+))?/i)
            if (match) {
                return {
                    title: match[2] || match[1],
                    subtitle: match[2] ? match[1] : undefined,
                }
            }
            return {}
        },
    },
    linkedin: {
        name: 'LinkedIn',
        icon: 'linkedin',
        color: '#0A66C2',
        ctaLabel: 'Connect',
        urlPatterns: [/linkedin\.com\/in\/([^/?]+)/i, /linkedin\.com\/company\/([^/?]+)/i],
    },
    facebook: {
        name: 'Facebook',
        icon: 'facebook',
        color: '#1877F2',
        ctaLabel: 'Follow',
        urlPatterns: [/facebook\.com\/([^/?]+)/i, /fb\.com\/([^/?]+)/i],
    },
    pinterest: {
        name: 'Pinterest',
        icon: 'pinterest',
        color: '#BD081C',
        ctaLabel: 'Follow',
        urlPatterns: [/pinterest\.com\/([^/?]+)/i],
    },
    threads: {
        name: 'Threads',
        icon: 'threads',
        color: '#000000',
        ctaLabel: 'Follow',
        urlPatterns: [/threads\.net\/@?([^/?]+)/i],
    },
    discord: {
        name: 'Discord',
        icon: 'discord',
        color: '#5865F2',
        ctaLabel: 'Join',
        urlPatterns: [/discord\.gg\/([^/?]+)/i, /discord\.com\/invite\/([^/?]+)/i],
    },
    twitch: {
        name: 'Twitch',
        icon: 'twitch',
        color: '#9146FF',
        ctaLabel: 'Follow',
        urlPatterns: [/twitch\.tv\/([^/?]+)/i],
    },
    behance: {
        name: 'Behance',
        icon: 'behance',
        color: '#1769FF',
        ctaLabel: 'Follow',
        urlPatterns: [/behance\.net\/([^/?]+)/i],
    },
    dribbble: {
        name: 'Dribbble',
        icon: 'dribbble',
        color: '#EA4C89',
        ctaLabel: 'Follow',
        urlPatterns: [/dribbble\.com\/([^/?]+)/i],
    },
    appstore: {
        name: 'App Store',
        icon: 'appstore',
        color: '#007AFF',
        ctaLabel: 'Get',
        urlPatterns: [/apps\.apple\.com\/([^/]+\/)?app\/([^/?]+)/i],
        extractInfo: (url) => {
            const match = url.match(/apps\.apple\.com\/(?:[^/]+\/)?app\/([^/?]+)/i)
            return { title: match ? match[1].replace(/-/g, ' ') : undefined }
        },
    },
    playstore: {
        name: 'Google Play',
        icon: 'playstore',
        color: '#34A853',
        ctaLabel: 'Install',
        urlPatterns: [/play\.google\.com\/store\/apps\/details/i],
    },
    generic: {
        name: 'Link',
        icon: 'link',
        color: '#6B7280',
        ctaLabel: 'Visit',
        urlPatterns: [],
    },
}

// ============ URL 平台检测 ============

export function detectPlatform(url: string): SocialPlatform {
    for (const [platform, config] of Object.entries(PLATFORM_REGISTRY)) {
        if (platform === 'generic') continue
        for (const pattern of config.urlPatterns) {
            if (pattern.test(url)) {
                return platform as SocialPlatform
            }
        }
    }
    return 'generic'
}

// ============ 从 URL 提取信息 ============

export function extractPlatformInfo(url: string): {
    platform: SocialPlatform
    title?: string
    subtitle?: string
    ctaLabel: string
    color: string
    gradient?: string
} {
    const platform = detectPlatform(url)
    const config = PLATFORM_REGISTRY[platform]
    const extracted = config.extractInfo?.(url) ?? {}

    return {
        platform,
        title: extracted.title ?? config.name,
        subtitle: extracted.subtitle,
        ctaLabel: config.ctaLabel,
        color: config.color,
        gradient: config.gradient,
    }
}

export default PLATFORM_REGISTRY
