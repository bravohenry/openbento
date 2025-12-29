/**
 * OpenBento Design System - Input Types
 */

import type { InputHTMLAttributes, ReactNode } from 'react'

export type InputSize = 'sm' | 'md' | 'lg'

export type InputVariant = 'default' | 'filled' | 'flushed' | 'unstyled'

export interface InputProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'size'> {
    /** Variant */
    variant?: InputVariant
    /** Size */
    size?: InputSize
    /** Left icon/element */
    leftElement?: ReactNode
    /** Right icon/element */
    rightElement?: ReactNode
    /** Left addon */
    leftAddon?: ReactNode
    /** Right addon */
    rightAddon?: ReactNode
    /** Label */
    label?: string
    /** Helper text */
    helperText?: string
    /** Error text */
    errorText?: string
    /** Whether in error state */
    isError?: boolean
    /** Whether in success state */
    isSuccess?: boolean
    /** Whether full width */
    fullWidth?: boolean
}
