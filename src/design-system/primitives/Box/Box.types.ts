/**
 * OpenBento Design System - Box Types
 */

import type { HTMLAttributes } from 'react'
import type { StyleProps } from '../../utils/styleProps'

export interface BoxProps extends StyleProps, HTMLAttributes<HTMLDivElement> {
    /** Element type to render */
    as?: React.ElementType
    /** Apply border radius */
    rounded?: 'none' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | 'full'
    /** Apply shadow */
    shadow?: 'none' | 'sm' | 'md' | 'lg' | 'xl'
    /** Border */
    border?: boolean
    /** Center content */
    center?: boolean
}
