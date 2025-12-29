/**
 * OpenBento Design System - Button Types
 * 
 * Button component type definitions
 * Inspiration: Bento.me's Follow button design
 */

import type { ButtonHTMLAttributes, ReactNode } from 'react'

// ============ Button Variants ============

export type ButtonVariant =
    | 'primary'      // Primary action - brand gradient
    | 'secondary'    // Secondary action - light background
    | 'outline'      // Outline button
    | 'ghost'        // Ghost button - no background
    | 'danger'       // Danger action
    | 'success'      // Success action
    // Social media brand buttons
    | 'twitter'
    | 'instagram'
    | 'tiktok'
    | 'linkedin'
    | 'youtube'
    | 'spotify'
    | 'github'
    | 'discord'
    | 'whatsapp'

// ============ Button Sizes ============

export type ButtonSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl'

// ============ Button Shapes ============

export type ButtonShape = 'rounded' | 'pill' | 'square'

// ============ Button Props ============

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    /** Button variant */
    variant?: ButtonVariant
    /** Button size */
    size?: ButtonSize
    /** Button shape */
    shape?: ButtonShape
    /** Whether to take full width */
    fullWidth?: boolean
    /** Left icon */
    leftIcon?: ReactNode
    /** Right icon */
    rightIcon?: ReactNode
    /** Loading state */
    loading?: boolean
    /** Badge content (e.g., TikTok follower count) */
    badge?: ReactNode
    /** Whether to show icon only */
    iconOnly?: boolean
    /** Render as other element (e.g., <a>) */
    as?: 'button' | 'a' | 'div'
    /** Link URL (when as="a") */
    href?: string
    /** Link target */
    target?: '_blank' | '_self' | '_parent' | '_top'
}
