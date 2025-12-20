/**
 * OpenBento Design System - Button Styles
 * 
 * 按钮样式配置
 * 设计灵感：Bento.me Follow 按钮 - 药丸形状、品牌色、紧凑设计
 */

import { socialColors } from '../../tokens/colors'
import { radii } from '../../tokens/radii'
import { shadows } from '../../tokens/shadows'
import { transitions } from '../../tokens/transitions'
import type { ButtonVariant, ButtonSize, ButtonShape } from './Button.types'

// ============ 尺寸配置 ============

export const buttonSizes: Record<ButtonSize, {
    height: string
    padding: string
    fontSize: string
    iconSize: string
    gap: string
}> = {
    xs: {
        height: '28px',
        padding: '0 10px',
        fontSize: '12px',
        iconSize: '14px',
        gap: '4px',
    },
    sm: {
        height: '32px',
        padding: '0 12px',
        fontSize: '13px',
        iconSize: '16px',
        gap: '6px',
    },
    md: {
        height: '38px',
        padding: '0 16px',
        fontSize: '14px',
        iconSize: '18px',
        gap: '8px',
    },
    lg: {
        height: '44px',
        padding: '0 20px',
        fontSize: '15px',
        iconSize: '20px',
        gap: '8px',
    },
    xl: {
        height: '52px',
        padding: '0 28px',
        fontSize: '16px',
        iconSize: '22px',
        gap: '10px',
    },
}

// ============ 形状配置 ============

export const buttonShapes: Record<ButtonShape, string> = {
    rounded: radii.lg,       // 12px
    pill: radii.full,        // 9999px - 药丸形状 (Bento 风格)
    square: radii.md,        // 8px
}

// ============ 变体样式 ============

export interface VariantStyles {
    background: string
    color: string
    border: string
    hoverBackground: string
    hoverBorder?: string
    activeBackground?: string
    boxShadow?: string
}

export const buttonVariants: Record<ButtonVariant, VariantStyles> = {
    // 主要按钮 - 品牌渐变
    primary: {
        background: 'var(--color-brand-gradient)',
        color: '#ffffff',
        border: 'none',
        hoverBackground: 'linear-gradient(135deg, #4f46e5 0%, #7c3aed 100%)',
        boxShadow: '0 2px 8px rgba(99, 102, 241, 0.25)',
    },

    // 次要按钮 - 浅色背景
    secondary: {
        background: 'var(--color-surface-hover)',
        color: 'var(--color-text-primary)',
        border: '1px solid var(--color-border)',
        hoverBackground: 'var(--color-surface-active)',
        hoverBorder: '1px solid var(--color-border-hover)',
    },

    // 边框按钮
    outline: {
        background: 'transparent',
        color: 'var(--color-text-primary)',
        border: '1px solid var(--color-border)',
        hoverBackground: 'var(--color-surface-hover)',
        hoverBorder: '1px solid var(--color-border-hover)',
    },

    // 幽灵按钮
    ghost: {
        background: 'transparent',
        color: 'var(--color-text-secondary)',
        border: 'none',
        hoverBackground: 'var(--color-surface-hover)',
    },

    // 危险按钮
    danger: {
        background: '#ef4444',
        color: '#ffffff',
        border: 'none',
        hoverBackground: '#dc2626',
        boxShadow: '0 2px 8px rgba(239, 68, 68, 0.25)',
    },

    // 成功按钮
    success: {
        background: '#10b981',
        color: '#ffffff',
        border: 'none',
        hoverBackground: '#059669',
        boxShadow: '0 2px 8px rgba(16, 185, 129, 0.25)',
    },

    // ============ 社交媒体品牌按钮 ============

    // Twitter / X - 蓝鸟蓝
    twitter: {
        background: socialColors.twitter,
        color: '#ffffff',
        border: 'none',
        hoverBackground: '#1a8cd8',
        boxShadow: `0 2px 8px ${socialColors.twitter}40`,
    },

    // Instagram - 黑色 (简洁风格，如截图所示)
    instagram: {
        background: '#262626',
        color: '#ffffff',
        border: 'none',
        hoverBackground: '#404040',
    },

    // TikTok - 红色 (如截图所示)
    tiktok: {
        background: '#fe2c55',
        color: '#ffffff',
        border: 'none',
        hoverBackground: '#e6284d',
        boxShadow: '0 2px 8px rgba(254, 44, 85, 0.3)',
    },

    // LinkedIn - LinkedIn 蓝
    linkedin: {
        background: socialColors.linkedin,
        color: '#ffffff',
        border: 'none',
        hoverBackground: '#0958a8',
        boxShadow: `0 2px 8px ${socialColors.linkedin}40`,
    },

    // YouTube - 红色
    youtube: {
        background: socialColors.youtube,
        color: '#ffffff',
        border: 'none',
        hoverBackground: '#cc0000',
        boxShadow: `0 2px 8px ${socialColors.youtube}40`,
    },

    // Spotify - 绿色
    spotify: {
        background: socialColors.spotify,
        color: '#ffffff',
        border: 'none',
        hoverBackground: '#1aa34a',
        boxShadow: `0 2px 8px ${socialColors.spotify}40`,
    },

    // GitHub - 深色
    github: {
        background: '#24292f',
        color: '#ffffff',
        border: 'none',
        hoverBackground: '#32383f',
    },

    // Discord - 紫色
    discord: {
        background: socialColors.discord,
        color: '#ffffff',
        border: 'none',
        hoverBackground: '#4752c4',
        boxShadow: `0 2px 8px ${socialColors.discord}40`,
    },

    // WhatsApp - 绿色
    whatsapp: {
        background: '#25d366',
        color: '#ffffff',
        border: 'none',
        hoverBackground: '#20bd5a',
        boxShadow: '0 2px 8px rgba(37, 211, 102, 0.3)',
    },
}

// ============ 基础样式 ============

export const buttonBaseStyles: React.CSSProperties = {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontWeight: 500,
    cursor: 'pointer',
    userSelect: 'none',
    whiteSpace: 'nowrap',
    textDecoration: 'none',
    transition: transitions.fast,
    outline: 'none',
    position: 'relative',
    overflow: 'hidden',
}

// ============ 禁用样式 ============

export const buttonDisabledStyles: React.CSSProperties = {
    opacity: 0.5,
    cursor: 'not-allowed',
    pointerEvents: 'none',
}

// ============ 加载样式 ============

export const buttonLoadingStyles: React.CSSProperties = {
    cursor: 'wait',
    pointerEvents: 'none',
}
