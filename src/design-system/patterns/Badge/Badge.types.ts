/**
 * OpenBento Design System - Badge Types
 */

import type { HTMLAttributes, ReactNode } from 'react'

export type BadgeVariant =
    | 'default'
    | 'primary'
    | 'secondary'
    | 'success'
    | 'warning'
    | 'danger'
    | 'info'
    | 'outline'

export type BadgeSize = 'sm' | 'md' | 'lg'

export interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
    /** 变体 */
    variant?: BadgeVariant
    /** 尺寸 */
    size?: BadgeSize
    /** 圆形徽章 (用于数字) */
    rounded?: boolean
    /** 左侧图标 */
    icon?: ReactNode
    /** 可移除 */
    removable?: boolean
    /** 移除回调 */
    onRemove?: () => void
}
