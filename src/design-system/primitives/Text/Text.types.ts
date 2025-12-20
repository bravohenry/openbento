/**
 * OpenBento Design System - Text Types
 */

import type { HTMLAttributes } from 'react'
import type { FontSize, FontWeight, LineHeight, TextStyle } from '../../tokens/typography'

export type TextSize = FontSize | 'inherit'
export type TextWeight = FontWeight | 'inherit'
export type TextAlign = 'left' | 'center' | 'right' | 'justify'
export type TextTransform = 'none' | 'uppercase' | 'lowercase' | 'capitalize'

export interface TextProps extends HTMLAttributes<HTMLSpanElement> {
    /** 渲染的元素类型 */
    as?: React.ElementType
    /** 预设文本样式 */
    variant?: TextStyle
    /** 字号 */
    size?: TextSize
    /** 字重 */
    weight?: TextWeight
    /** 行高 */
    leading?: LineHeight
    /** 对齐 */
    align?: TextAlign
    /** 转换 */
    transform?: TextTransform
    /** 颜色 */
    color?: 'primary' | 'secondary' | 'tertiary' | 'inverse' | 'inherit' | string
    /** 截断 */
    truncate?: boolean | number
    /** 渐变文本 */
    gradient?: string
    /** 单调字体 */
    mono?: boolean
}
