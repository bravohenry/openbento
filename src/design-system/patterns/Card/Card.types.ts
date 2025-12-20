/**
 * OpenBento Design System - Card Types
 * 
 * 卡片组件类型定义
 * 采用 Compound Component 模式
 */

import type { HTMLAttributes, ReactNode } from 'react'

// ============ 卡片变体 ============

export type CardVariant =
    | 'default'      // 默认白色背景
    | 'elevated'     // 带阴影浮起
    | 'outlined'     // 边框样式
    | 'filled'       // 填充背景
    | 'glass'        // 毛玻璃效果
    | 'gradient'     // 渐变背景

// ============ 卡片尺寸 (对应 Bento Grid) ============

export type CardSize = '1x1' | '2x1' | '1x2' | '2x2' | '3x1' | '4x1' | '4x2' | 'auto'

// ============ 卡片 Props ============

export interface CardProps extends HTMLAttributes<HTMLDivElement> {
    /** 变体 */
    variant?: CardVariant
    /** 尺寸 (Bento Grid) */
    size?: CardSize
    /** 是否可点击 */
    clickable?: boolean
    /** 是否选中 */
    selected?: boolean
    /** 自定义背景色 */
    bgColor?: string
    /** 背景图片 */
    bgImage?: string
    /** 背景渐变 */
    bgGradient?: string
    /** 边框颜色 */
    borderColor?: string
    /** 圆角大小 */
    rounded?: 'sm' | 'md' | 'lg' | 'xl' | '2xl'
    /** 内边距 */
    padding?: 'none' | 'sm' | 'md' | 'lg'
    /** 链接地址 */
    href?: string
    /** 链接打开方式 */
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
