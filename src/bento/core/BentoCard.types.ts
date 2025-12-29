/**
 * OpenBento - BentoCard Types
 * 
 * Based on Figma design (node-id: 25-1023)
 * Bento-style card component type definitions
 */

import type { HTMLAttributes, ReactNode, CSSProperties } from 'react'

// ============ Card Sizes ============

/**
 * Bento Grid sizes
 * Base unit: 175px, Gap: 40px
 * 
 * 1x1 = 175 x 175
 * 2x1 = 390 x 175 (175*2 + 40)
 * 1x2 = 175 x 390
 * 2x2 = 390 x 390
 * bar = 390 x 68 (thin horizontal bar)
 */
export type BentoSize = '1x1' | '2x1' | '1x2' | '2x2' | 'bar' | '2x3' | '3x2' | '4x2'


// ============ Card Variants ============

export type BentoVariant =
    | 'default'     // White background
    | 'image'       // Full-size image
    | 'gradient'    // Gradient background
    | 'transparent' // Transparent

// ============ Card Props ============

export interface BentoCardProps extends Omit<HTMLAttributes<HTMLDivElement>, 'title'> {
    /** Size */
    size?: BentoSize
    /** Variant */
    variant?: BentoVariant
    /** Whether clickable */
    clickable?: boolean
    /** Link URL */
    href?: string
    /** Link target */
    target?: '_blank' | '_self'
    /** Background image */
    backgroundImage?: string
    /** Background color */
    backgroundColor?: string
    /** Background gradient */
    backgroundGradient?: string
    /** Whether to disable hover effect */
    disableHover?: boolean
    /** Dark mode (inner border uses white highlight) */
    dark?: boolean
}

// ============ Icon Props ============

export interface BentoCardIconProps extends HTMLAttributes<HTMLDivElement> {
    /** Icon source (URL or ReactNode) */
    src?: string
    /** Icon component */
    icon?: ReactNode
    /** Size */
    size?: 'sm' | 'md' | 'lg'
    /** Background color */
    backgroundColor?: string
    /** Rounded */
    rounded?: boolean
}

// ============ Title Props ============

export interface BentoCardTitleProps extends HTMLAttributes<HTMLDivElement> {
    /** Text color */
    color?: 'primary' | 'secondary' | 'inverse' | 'muted'
    /** Font size */
    size?: 'sm' | 'md' | 'lg'
    /** Whether to truncate */
    truncate?: boolean
    /** Maximum lines */
    maxLines?: number
}

// ============ Subtitle Props ============

export interface BentoCardSubtitleProps extends HTMLAttributes<HTMLDivElement> {
    /** Text color */
    color?: 'primary' | 'secondary' | 'tertiary' | 'inverse'
}

// ============ Image Props ============

export interface BentoCardImageProps extends HTMLAttributes<HTMLDivElement> {
    /** Image URL */
    src: string
    /** Alt text */
    alt?: string
    /** Object fit */
    objectFit?: 'cover' | 'contain' | 'fill'
    /** Image position */
    objectPosition?: string
}

// ============ Overlay Props ============

export interface BentoCardOverlayProps extends HTMLAttributes<HTMLDivElement> {
    /** Gradient direction */
    gradient?: 'top' | 'bottom' | 'left' | 'right' | 'none'
    /** Opacity */
    opacity?: number
}

// ============ Action Props ============

export interface BentoCardActionProps extends HTMLAttributes<HTMLDivElement> {
    /** Position */
    position?: 'bottom-left' | 'bottom-right' | 'top-left' | 'top-right'
}

// ============ Content Props ============

export interface BentoCardContentProps extends HTMLAttributes<HTMLDivElement> {
    /** Alignment */
    align?: 'start' | 'center' | 'end'
    /** Vertical alignment */
    justify?: 'start' | 'center' | 'end' | 'between'
    /** Padding */
    padding?: 'none' | 'sm' | 'md' | 'lg'
}
