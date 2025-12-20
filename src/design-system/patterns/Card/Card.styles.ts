/**
 * OpenBento Design System - Card Styles
 */

import { radii } from '../../tokens/radii'
import { shadows } from '../../tokens/shadows'
import { transitions } from '../../tokens/transitions'
import type { CardVariant, CardSize } from './Card.types'

// ============ 变体样式 ============

export const cardVariants: Record<CardVariant, React.CSSProperties> = {
    default: {
        background: 'var(--color-surface)',
        boxShadow: shadows.sm,
        border: '1px solid var(--color-border)',
    },
    elevated: {
        background: 'var(--color-surface)',
        boxShadow: shadows.lg,
        border: 'none',
    },
    outlined: {
        background: 'transparent',
        boxShadow: 'none',
        border: '1px solid var(--color-border)',
    },
    filled: {
        background: 'var(--color-surface-hover)',
        boxShadow: 'none',
        border: 'none',
    },
    glass: {
        background: 'rgba(255, 255, 255, 0.7)',
        backdropFilter: 'blur(20px)',
        WebkitBackdropFilter: 'blur(20px)',
        boxShadow: shadows.md,
        border: '1px solid rgba(255, 255, 255, 0.2)',
    },
    gradient: {
        background: 'var(--color-brand-gradient)',
        boxShadow: shadows.md,
        border: 'none',
    },
}

// ============ 尺寸配置 ============

export const cardSizes: Record<CardSize, { gridColumn: string; gridRow: string }> = {
    '1x1': { gridColumn: 'span 1', gridRow: 'span 1' },
    '2x1': { gridColumn: 'span 2', gridRow: 'span 1' },
    '1x2': { gridColumn: 'span 1', gridRow: 'span 2' },
    '2x2': { gridColumn: 'span 2', gridRow: 'span 2' },
    '3x1': { gridColumn: 'span 3', gridRow: 'span 1' },
    '4x1': { gridColumn: 'span 4', gridRow: 'span 1' },
    '4x2': { gridColumn: 'span 4', gridRow: 'span 2' },
    'auto': { gridColumn: 'auto', gridRow: 'auto' },
}

// ============ 圆角配置 ============

export const cardRadii = {
    sm: radii.lg,       // 12px
    md: radii.xl,       // 16px
    lg: radii['2xl'],   // 24px
    xl: radii['3xl'],   // 32px
    '2xl': '40px',
}

// ============ 内边距配置 ============

export const cardPadding = {
    none: '0',
    sm: '12px',
    md: '16px',
    lg: '24px',
}

// ============ 基础样式 ============

export const cardBaseStyles: React.CSSProperties = {
    position: 'relative',
    display: 'flex',
    flexDirection: 'column',
    overflow: 'hidden',
    transition: transitions.base,
}

// ============ Hover 样式 ============

export const cardHoverStyles: React.CSSProperties = {
    transform: 'translateY(-4px)',
    boxShadow: shadows.xl,
}

// ============ 选中样式 ============

export const cardSelectedStyles: React.CSSProperties = {
    outline: '2px solid var(--color-brand-primary)',
    outlineOffset: '2px',
}
