/**
 * OpenBento Design System - Tooltip Types
 */

import type { ReactNode, CSSProperties } from 'react'

export type TooltipPlacement =
    | 'top'
    | 'top-start'
    | 'top-end'
    | 'bottom'
    | 'bottom-start'
    | 'bottom-end'
    | 'left'
    | 'left-start'
    | 'left-end'
    | 'right'
    | 'right-start'
    | 'right-end'

export interface TooltipProps {
    /** Tooltip content */
    content: ReactNode
    /** Trigger element */
    children: ReactNode
    /** Placement */
    placement?: TooltipPlacement
    /** Delay before showing (ms) */
    delay?: number
    /** Delay before hiding (ms) */
    hideDelay?: number
    /** Whether disabled */
    disabled?: boolean
    /** Whether to show arrow */
    hasArrow?: boolean
    /** Maximum width */
    maxWidth?: number | string
    /** Custom styles */
    style?: CSSProperties
    /** Custom className */
    className?: string
}
