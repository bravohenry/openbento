/**
 * OpenBento Design System - Input Types
 */

import type { InputHTMLAttributes, ReactNode } from 'react'

export type InputSize = 'sm' | 'md' | 'lg'

export type InputVariant = 'default' | 'filled' | 'flushed' | 'unstyled'

export interface InputProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'size'> {
    /** 变体 */
    variant?: InputVariant
    /** 尺寸 */
    size?: InputSize
    /** 左侧图标/元素 */
    leftElement?: ReactNode
    /** 右侧图标/元素 */
    rightElement?: ReactNode
    /** 左侧插件 */
    leftAddon?: ReactNode
    /** 右侧插件 */
    rightAddon?: ReactNode
    /** 标签 */
    label?: string
    /** 帮助文本 */
    helperText?: string
    /** 错误文本 */
    errorText?: string
    /** 是否错误状态 */
    isError?: boolean
    /** 是否成功状态 */
    isSuccess?: boolean
    /** 是否全宽 */
    fullWidth?: boolean
}
