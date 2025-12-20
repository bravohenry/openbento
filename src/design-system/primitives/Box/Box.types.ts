/**
 * OpenBento Design System - Box Types
 */

import type { HTMLAttributes } from 'react'
import type { StyleProps } from '../../utils/styleProps'

export interface BoxProps extends StyleProps, HTMLAttributes<HTMLDivElement> {
    /** 渲染的元素类型 */
    as?: React.ElementType
    /** 应用圆角 */
    rounded?: 'none' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | 'full'
    /** 应用阴影 */
    shadow?: 'none' | 'sm' | 'md' | 'lg' | 'xl'
    /** 边框 */
    border?: boolean
    /** 居中内容 */
    center?: boolean
}
