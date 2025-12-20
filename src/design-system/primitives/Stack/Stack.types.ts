/**
 * OpenBento Design System - Stack Types
 */

import type { HTMLAttributes, ReactNode } from 'react'
import type { StyleProps } from '../../utils/styleProps'
import type { AlignItems, JustifyContent } from '../Flex/Flex.types'

export interface StackProps extends StyleProps, HTMLAttributes<HTMLDivElement> {
    /** 渲染的元素类型 */
    as?: React.ElementType
    /** 间距 (基于 4px 网格, 如 gap={4} = 16px) */
    gap?: number | string
    /** 对齐方式 */
    align?: AlignItems
    /** 分布方式 */
    justify?: JustifyContent
    /** 分隔线 */
    divider?: ReactNode
    /** 是否换行 */
    wrap?: boolean
}

export type VStackProps = Omit<StackProps, 'direction'>
export type HStackProps = Omit<StackProps, 'direction'>
