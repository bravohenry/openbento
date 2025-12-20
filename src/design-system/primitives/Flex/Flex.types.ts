/**
 * OpenBento Design System - Flex Types
 */

import type { HTMLAttributes } from 'react'
import type { StyleProps } from '../../utils/styleProps'

export type FlexDirection = 'row' | 'row-reverse' | 'column' | 'column-reverse'
export type FlexWrap = 'nowrap' | 'wrap' | 'wrap-reverse'
export type JustifyContent = 'start' | 'end' | 'center' | 'between' | 'around' | 'evenly'
export type AlignItems = 'start' | 'end' | 'center' | 'baseline' | 'stretch'

export interface FlexComponentProps extends StyleProps, HTMLAttributes<HTMLDivElement> {
    /** 渲染的元素类型 */
    as?: React.ElementType
    /** Flex 方向 */
    direction?: FlexDirection
    /** 换行 */
    wrap?: FlexWrap
    /** 主轴对齐 */
    justify?: JustifyContent
    /** 交叉轴对齐 */
    align?: AlignItems
    /** 间距 (快捷属性) */
    gap?: number | string
    /** 是否内联 */
    inline?: boolean
    /** 应用圆角 */
    rounded?: 'none' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | 'full'
}
