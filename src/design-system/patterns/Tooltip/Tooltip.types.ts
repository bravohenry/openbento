/**
 * OpenBento Design System - Tooltip Types
 */

import type { ReactNode, CSSProperties } from 'react'

export type TooltipPlacement =
    | 'top'
    | 'top-start'
    | 'top-end'
    | 'bottom'
    | 'bottom-start'
    | 'bottom-end'
    | 'left'
    | 'left-start'
    | 'left-end'
    | 'right'
    | 'right-start'
    | 'right-end'

export interface TooltipProps {
    /** 提示内容 */
    content: ReactNode
    /** 触发元素 */
    children: ReactNode
    /** 位置 */
    placement?: TooltipPlacement
    /** 延迟显示 (ms) */
    delay?: number
    /** 延迟隐藏 (ms) */
    hideDelay?: number
    /** 是否禁用 */
    disabled?: boolean
    /** 是否显示箭头 */
    hasArrow?: boolean
    /** 最大宽度 */
    maxWidth?: number | string
    /** 自定义样式 */
    style?: CSSProperties
    /** 自定义 className */
    className?: string
}
