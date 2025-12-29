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
    /** Element type to render */
    as?: React.ElementType
    /** Preset text style */
    variant?: TextStyle
    /** Font size */
    size?: TextSize
    /** Font weight */
    weight?: TextWeight
    /** Line height */
    leading?: LineHeight
    /** Alignment */
    align?: TextAlign
    /** Transform */
    transform?: TextTransform
    /** Color */
    color?: 'primary' | 'secondary' | 'tertiary' | 'inverse' | 'inherit' | string
    /** Truncate */
    truncate?: boolean | number
    /** Gradient text */
    gradient?: string
    /** Monospace font */
    mono?: boolean
}
