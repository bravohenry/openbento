/**
 * OpenBento Design System - Button Types
 * 
 * 按钮组件类型定义
 * 灵感来源：Bento.me 的 Follow 按钮设计
 */

import type { ButtonHTMLAttributes, ReactNode } from 'react'

// ============ 按钮变体 ============

export type ButtonVariant =
    | 'primary'      // 主要操作 - 品牌渐变
    | 'secondary'    // 次要操作 - 浅色背景
    | 'outline'      // 边框按钮
    | 'ghost'        // 幽灵按钮 - 无背景
    | 'danger'       // 危险操作
    | 'success'      // 成功操作
    // 社交媒体品牌按钮
    | 'twitter'
    | 'instagram'
    | 'tiktok'
    | 'linkedin'
    | 'youtube'
    | 'spotify'
    | 'github'
    | 'discord'
    | 'whatsapp'

// ============ 按钮尺寸 ============

export type ButtonSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl'

// ============ 按钮形状 ============

export type ButtonShape = 'rounded' | 'pill' | 'square'

// ============ 按钮 Props ============

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    /** 按钮变体 */
    variant?: ButtonVariant
    /** 按钮尺寸 */
    size?: ButtonSize
    /** 按钮形状 */
    shape?: ButtonShape
    /** 是否占满宽度 */
    fullWidth?: boolean
    /** 左侧图标 */
    leftIcon?: ReactNode
    /** 右侧图标 */
    rightIcon?: ReactNode
    /** 加载状态 */
    loading?: boolean
    /** 徽章内容 (如 TikTok 的粉丝数) */
    badge?: ReactNode
    /** 是否只显示图标 */
    iconOnly?: boolean
    /** 渲染为其他元素 (如 <a>) */
    as?: 'button' | 'a' | 'div'
    /** 链接地址 (当 as="a" 时) */
    href?: string
    /** 链接打开方式 */
    target?: '_blank' | '_self' | '_parent' | '_top'
}
