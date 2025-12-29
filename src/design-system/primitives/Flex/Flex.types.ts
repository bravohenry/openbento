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
    /** Element type to render */
    as?: React.ElementType
    /** Flex direction */
    direction?: FlexDirection
    /** Wrap */
    wrap?: FlexWrap
    /** Main axis alignment */
    justify?: JustifyContent
    /** Cross axis alignment */
    align?: AlignItems
    /** Gap (shortcut property) */
    gap?: number | string
    /** Whether inline */
    inline?: boolean
    /** Apply border radius */
    rounded?: 'none' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | 'full'
}
