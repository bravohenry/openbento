/**
 * OpenBento Design System - Avatar Types
 */

import type { HTMLAttributes, ReactNode } from 'react'

export type AvatarSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl'

export type AvatarShape = 'circle' | 'rounded' | 'square'

export interface AvatarProps extends HTMLAttributes<HTMLDivElement> {
    /** Image URL */
    src?: string
    /** Alt text */
    alt?: string
    /** Size */
    size?: AvatarSize
    /** Shape */
    shape?: AvatarShape
    /** Display name's first letter (when no image) */
    name?: string
    /** Custom fallback content */
    fallback?: ReactNode
    /** Border color */
    borderColor?: string
    /** Whether to show online status */
    showStatus?: boolean
    /** Online status */
    status?: 'online' | 'offline' | 'busy' | 'away'
    /** Image load error callback */
    onError?: () => void
}
