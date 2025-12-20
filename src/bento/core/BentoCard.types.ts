/**
 * OpenBento - BentoCard Types
 * 
 * 基于 Figma 设计 (node-id: 25-1023)
 * Bento 风格卡片组件类型定义
 */

import type { HTMLAttributes, ReactNode, CSSProperties } from 'react'

// ============ 卡片尺寸 ============

/**
 * Bento Grid 尺寸
 * 基础单元: 175px, 间距: 40px
 * 
 * 1x1 = 175 x 175
 * 2x1 = 390 x 175 (175*2 + 40)
 * 1x2 = 175 x 390
 * 2x2 = 390 x 390
 */
export type BentoSize = '1x1' | '2x1' | '1x2' | '2x2' | '2x3' | '3x2' | '4x2'

// ============ 卡片变体 ============

export type BentoVariant =
    | 'default'     // 白色背景
    | 'image'       // 全尺寸图片
    | 'gradient'    // 渐变背景
    | 'transparent' // 透明

// ============ 卡片 Props ============

export interface BentoCardProps extends Omit<HTMLAttributes<HTMLDivElement>, 'title'> {
    /** 尺寸 */
    size?: BentoSize
    /** 变体 */
    variant?: BentoVariant
    /** 是否可点击 */
    clickable?: boolean
    /** 链接地址 */
    href?: string
    /** 链接打开方式 */
    target?: '_blank' | '_self'
    /** 背景图片 */
    backgroundImage?: string
    /** 背景颜色 */
    backgroundColor?: string
    /** 背景渐变 */
    backgroundGradient?: string
    /** 是否禁用 hover 效果 */
    disableHover?: boolean
    /** 暗色模式 (内部边框使用白色高光) */
    dark?: boolean
}

// ============ 图标 Props ============

export interface BentoCardIconProps extends HTMLAttributes<HTMLDivElement> {
    /** 图标源 (URL 或 ReactNode) */
    src?: string
    /** 图标组件 */
    icon?: ReactNode
    /** 尺寸 */
    size?: 'sm' | 'md' | 'lg'
    /** 背景色 */
    backgroundColor?: string
    /** 圆角 */
    rounded?: boolean
}

// ============ 标题 Props ============

export interface BentoCardTitleProps extends HTMLAttributes<HTMLDivElement> {
    /** 文本颜色 */
    color?: 'primary' | 'secondary' | 'inverse' | 'muted'
    /** 字体大小 */
    size?: 'sm' | 'md' | 'lg'
    /** 是否截断 */
    truncate?: boolean
    /** 最大行数 */
    maxLines?: number
}

// ============ 副标题 Props ============

export interface BentoCardSubtitleProps extends HTMLAttributes<HTMLDivElement> {
    /** 文本颜色 */
    color?: 'primary' | 'secondary' | 'tertiary' | 'inverse'
}

// ============ 图片 Props ============

export interface BentoCardImageProps extends HTMLAttributes<HTMLDivElement> {
    /** 图片 URL */
    src: string
    /** Alt 文本 */
    alt?: string
    /** 对象适应 */
    objectFit?: 'cover' | 'contain' | 'fill'
    /** 图片位置 */
    objectPosition?: string
}

// ============ 叠加层 Props ============

export interface BentoCardOverlayProps extends HTMLAttributes<HTMLDivElement> {
    /** 渐变方向 */
    gradient?: 'top' | 'bottom' | 'left' | 'right' | 'none'
    /** 透明度 */
    opacity?: number
}

// ============ 操作 Props ============

export interface BentoCardActionProps extends HTMLAttributes<HTMLDivElement> {
    /** 位置 */
    position?: 'bottom-left' | 'bottom-right' | 'top-left' | 'top-right'
}

// ============ 内容区 Props ============

export interface BentoCardContentProps extends HTMLAttributes<HTMLDivElement> {
    /** 对齐方式 */
    align?: 'start' | 'center' | 'end'
    /** 垂直对齐 */
    justify?: 'start' | 'center' | 'end' | 'between'
    /** 内边距 */
    padding?: 'none' | 'sm' | 'md' | 'lg'
}
