/**
 * OpenBento Design System - Dropdown Types
 */

import type { ReactNode, CSSProperties } from 'react'

export type DropdownPlacement = 'bottom-start' | 'bottom-end' | 'top-start' | 'top-end'

export interface DropdownItem {
    /** 唯一标识 */
    key: string
    /** 显示标签 */
    label: ReactNode
    /** 图标 */
    icon?: ReactNode
    /** 是否禁用 */
    disabled?: boolean
    /** 是否危险操作 */
    danger?: boolean
    /** 分隔线 (在此项前显示分隔线) */
    divider?: boolean
    /** 子菜单 */
    children?: DropdownItem[]
}

export interface DropdownProps {
    /** 触发元素 */
    trigger: ReactNode
    /** 菜单项 */
    items: DropdownItem[]
    /** 点击菜单项回调 */
    onSelect?: (key: string) => void
    /** 位置 */
    placement?: DropdownPlacement
    /** 触发方式 */
    triggerType?: 'click' | 'hover'
    /** 是否禁用 */
    disabled?: boolean
    /** 最小宽度 */
    minWidth?: number
    /** 自定义样式 */
    style?: CSSProperties
    /** 自定义 className */
    className?: string
}
