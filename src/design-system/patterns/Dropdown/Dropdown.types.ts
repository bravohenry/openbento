/**
 * OpenBento Design System - Dropdown Types
 */

import type { ReactNode, CSSProperties } from 'react'

export type DropdownPlacement = 'bottom-start' | 'bottom-end' | 'top-start' | 'top-end'

export interface DropdownItem {
    /** Unique identifier */
    key: string
    /** Display label */
    label: ReactNode
    /** Icon */
    icon?: ReactNode
    /** Whether disabled */
    disabled?: boolean
    /** Whether danger action */
    danger?: boolean
    /** Divider (show divider before this item) */
    divider?: boolean
    /** Submenu */
    children?: DropdownItem[]
}

export interface DropdownProps {
    /** Trigger element */
    trigger: ReactNode
    /** Menu items */
    items: DropdownItem[]
    /** Menu item click callback */
    onSelect?: (key: string) => void
    /** Placement */
    placement?: DropdownPlacement
    /** Trigger type */
    triggerType?: 'click' | 'hover'
    /** Whether disabled */
    disabled?: boolean
    /** Minimum width */
    minWidth?: number
    /** Custom styles */
    style?: CSSProperties
    /** Custom className */
    className?: string
}
