/**
 * OpenBento Design System - Avatar Types
 */

import type { HTMLAttributes, ReactNode } from 'react'

export type AvatarSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl'

export type AvatarShape = 'circle' | 'rounded' | 'square'

export interface AvatarProps extends HTMLAttributes<HTMLDivElement> {
    /** 图片 URL */
    src?: string
    /** 替代文本 */
    alt?: string
    /** 尺寸 */
    size?: AvatarSize
    /** 形状 */
    shape?: AvatarShape
    /** 显示名称的首字母 (当无图片时) */
    name?: string
    /** 自定义回退内容 */
    fallback?: ReactNode
    /** 边框颜色 */
    borderColor?: string
    /** 是否显示在线状态 */
    showStatus?: boolean
    /** 在线状态 */
    status?: 'online' | 'offline' | 'busy' | 'away'
    /** 图片加载失败回调 */
    onError?: () => void
}
