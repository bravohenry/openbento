/**
 * OpenBento Design System - Card Types
 * 
 * Card component type definitions
 * Uses Compound Component pattern
 */

import type { HTMLAttributes, ReactNode } from 'react'

// ============ Card Variants ============

export type CardVariant =
    | 'default'      // Default white background
    | 'elevated'     // Elevated with shadow
    | 'outlined'     // Border style
    | 'filled'       // Filled background
    | 'glass'        // Glass morphism effect
    | 'gradient'     // Gradient background

// ============ Card Sizes (corresponding to Bento Grid) ============

export type CardSize = '1x1' | '2x1' | '1x2' | '2x2' | '3x1' | '4x1' | '4x2' | 'auto'

// ============ Card Props ============

export interface CardProps extends HTMLAttributes<HTMLDivElement> {
    /** Variant */
    variant?: CardVariant
    /** Size (Bento Grid) */
    size?: CardSize
    /** Whether clickable */
    clickable?: boolean
    /** Whether selected */
    selected?: boolean
    /** Custom background color */
    bgColor?: string
    /** Background image */
    bgImage?: string
    /** Background gradient */
    bgGradient?: string
    /** Border color */
    borderColor?: string
    /** Border radius size */
    rounded?: 'sm' | 'md' | 'lg' | 'xl' | '2xl'
    /** Padding */
    padding?: 'none' | 'sm' | 'md' | 'lg'
    /** Link URL */
    href?: string
    /** Link target */
    target?: '_blank' | '_self'
    /** 是否禁用 hover 效果 */
    disableHover?: boolean
}

// ============ 子组件 Props ============

export interface CardHeaderProps extends Omit<HTMLAttributes<HTMLDivElement>, 'title'> {
    /** 图标 */
    icon?: ReactNode
    /** 标题 */
    title?: ReactNode
    /** 副标题 */
    subtitle?: ReactNode
    /** 右侧操作区 */
    action?: ReactNode
}

export interface CardContentProps extends HTMLAttributes<HTMLDivElement> {
    /** 是否无内边距 */
    noPadding?: boolean
}

export interface CardFooterProps extends HTMLAttributes<HTMLDivElement> {
    /** 对齐方式 */
    align?: 'start' | 'center' | 'end' | 'between'
}

export interface CardMediaProps extends HTMLAttributes<HTMLDivElement> {
    /** 图片 URL */
    src: string
    /** 替代文本 */
    alt?: string
    /** 高度 */
    height?: number | string
    /** 图片位置 */
    position?: 'top' | 'bottom' | 'fill'
    /** 对象适应 */
    objectFit?: 'cover' | 'contain' | 'fill'
}

export interface CardOverlayProps extends HTMLAttributes<HTMLDivElement> {
    /** 渐变方向 */
    gradient?: 'top' | 'bottom' | 'left' | 'right' | 'none'
}
