/**
 * OpenBento Design System - Modal Types
 */

import type { HTMLAttributes, ReactNode } from 'react'

export type ModalSize = 'sm' | 'md' | 'lg' | 'xl' | 'full'

export interface ModalProps {
    /** 是否打开 */
    isOpen: boolean
    /** 关闭回调 */
    onClose: () => void
    /** 尺寸 */
    size?: ModalSize
    /** 标题 */
    title?: ReactNode
    /** 是否显示关闭按钮 */
    showCloseButton?: boolean
    /** 点击遮罩是否关闭 */
    closeOnOverlayClick?: boolean
    /** 按 ESC 是否关闭 */
    closeOnEsc?: boolean
    /** 是否居中 */
    centered?: boolean
    /** 自定义 className */
    className?: string
    /** 自定义样式 */
    style?: React.CSSProperties
    /** 子元素 */
    children?: ReactNode
    /** 页脚 */
    footer?: ReactNode
    /** 是否无内边距 */
    noPadding?: boolean
}

export interface ModalHeaderProps extends HTMLAttributes<HTMLDivElement> { }
export interface ModalBodyProps extends HTMLAttributes<HTMLDivElement> { }
export interface ModalFooterProps extends HTMLAttributes<HTMLDivElement> {
    align?: 'start' | 'center' | 'end' | 'between'
}
