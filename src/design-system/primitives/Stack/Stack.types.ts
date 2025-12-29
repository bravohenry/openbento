/**
 * OpenBento Design System - Stack Types
 */

import type { HTMLAttributes, ReactNode } from 'react'
import type { StyleProps } from '../../utils/styleProps'
import type { AlignItems, JustifyContent } from '../Flex/Flex.types'

export interface StackProps extends StyleProps, HTMLAttributes<HTMLDivElement> {
    /** Element type to render */
    as?: React.ElementType
    /** Gap (based on 4px grid, e.g., gap={4} = 16px) */
    gap?: number | string
    /** Alignment */
    align?: AlignItems
    /** Distribution */
    justify?: JustifyContent
    /** Divider */
    divider?: ReactNode
    /** Whether to wrap */
    wrap?: boolean
}

export type VStackProps = Omit<StackProps, 'direction'>
export type HStackProps = Omit<StackProps, 'direction'>
