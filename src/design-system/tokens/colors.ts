/**
 * OpenBento Design System - Color Tokens
 * 
 * 采用语义化命名，支持 Light/Dark 主题
 * 颜色值通过 CSS 变量实现主题切换
 */

// ============ 核心颜色语义 ============

export const colors = {
    // 背景色
    background: {
        primary: 'var(--color-bg-primary)',
        secondary: 'var(--color-bg-secondary)',
        tertiary: 'var(--color-bg-tertiary)',
        overlay: 'var(--color-bg-overlay)',
    },

    // 表面色 (卡片、组件背景)
    surface: {
        default: 'var(--color-surface)',
        hover: 'var(--color-surface-hover)',
        active: 'var(--color-surface-active)',
        elevated: 'var(--color-surface-elevated, var(--color-surface))',
    },

    // 文本色
    text: {
        primary: 'var(--color-text-primary)',
        secondary: 'var(--color-text-secondary)',
        tertiary: 'var(--color-text-tertiary)',
        inverse: 'var(--color-text-inverse)',
        disabled: 'var(--color-text-disabled, rgba(0, 0, 0, 0.38))',
    },

    // 边框色
    border: {
        default: 'var(--color-border)',
        hover: 'var(--color-border-hover)',
        focus: 'var(--color-border-focus)',
        divider: 'var(--color-border-divider, var(--color-border))',
    },

    // 品牌色
    brand: {
        primary: 'var(--color-brand-primary)',
        secondary: 'var(--color-brand-secondary)',
        gradient: 'var(--color-brand-gradient)',
    },

    // 功能色 (语义色)
    semantic: {
        success: 'var(--color-semantic-success, #10b981)',
        warning: 'var(--color-semantic-warning, #f59e0b)',
        error: 'var(--color-semantic-error, #ef4444)',
        info: 'var(--color-semantic-info, #3b82f6)',
    },

    // 强调色
    accent: {
        blue: 'var(--color-accent-blue)',
        green: 'var(--color-accent-green)',
        red: 'var(--color-accent-red)',
        yellow: 'var(--color-accent-yellow)',
        pink: 'var(--color-accent-pink)',
        purple: 'var(--color-accent-purple)',
    },
} as const

// ============ 社交媒体品牌色 (固定值) ============

export const socialColors = {
    twitter: '#1DA1F2',
    x: '#000000',
    instagram: '#E4405F',
    instagramGradient: 'linear-gradient(45deg, #F58529, #DD2A7B, #8134AF, #515BD4)',
    facebook: '#1877F2',
    linkedin: '#0A66C2',
    youtube: '#FF0000',
    tiktok: '#000000',
    tiktokGradient: 'linear-gradient(135deg, #69C9D0, #EE1D52)',
    spotify: '#1DB954',
    github: '#333333',
    dribbble: '#EA4C89',
    figma: '#F24E1E',
    discord: '#5865F2',
    twitch: '#9146FF',
    pinterest: '#E60023',
    snapchat: '#FFFC00',
    reddit: '#FF4500',
    medium: '#000000',
    substack: '#FF6719',
    threads: '#000000',
} as const

// ============ 渐变预设 ============

export const gradients = {
    // 品牌渐变
    brand: 'linear-gradient(135deg, #FF6B35 0%, #FF9F1C 100%)',
    brandHover: 'linear-gradient(135deg, #F05A28 0%, #F7931E 100%)',

    // 彩虹渐变
    rainbow: 'linear-gradient(135deg, #f43f5e, #f97316, #eab308, #22c55e, #3b82f6, #0ea5e9)',

    // 温暖渐变
    warm: 'linear-gradient(135deg, #f97316 0%, #ec4899 100%)',
    sunset: 'linear-gradient(135deg, #f59e0b 0%, #ef4444 100%)',

    // 冷色渐变
    cool: 'linear-gradient(135deg, #3b82f6 0%, #0ea5e9 100%)',
    ocean: 'linear-gradient(135deg, #06b6d4 0%, #3b82f6 100%)',

    // 自然渐变
    forest: 'linear-gradient(135deg, #22c55e 0%, #14b8a6 100%)',
    mint: 'linear-gradient(135deg, #10b981 0%, #06b6d4 100%)',

    // 暗色渐变
    dark: 'linear-gradient(135deg, #1f2937 0%, #111827 100%)',
    midnight: 'linear-gradient(135deg, #0f172a 0%, #020617 100%)',

    // 光泽渐变 (用于 Glass 效果)
    glass: 'linear-gradient(135deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0.05) 100%)',
    glassDark: 'linear-gradient(135deg, rgba(0,0,0,0.1) 0%, rgba(0,0,0,0.05) 100%)',
} as const

// ============ 透明度预设 ============

export const opacity = {
    0: '0',
    5: '0.05',
    10: '0.1',
    20: '0.2',
    30: '0.3',
    40: '0.4',
    50: '0.5',
    60: '0.6',
    70: '0.7',
    80: '0.8',
    90: '0.9',
    100: '1',
} as const

// ============ 类型导出 ============

export type ColorToken = typeof colors
export type SocialColor = keyof typeof socialColors
export type GradientToken = keyof typeof gradients
export type OpacityToken = keyof typeof opacity
