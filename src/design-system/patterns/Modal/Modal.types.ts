/**
 * OpenBento Design System - Modal Types
 */

import type { HTMLAttributes, ReactNode } from 'react'

export type ModalSize = 'sm' | 'md' | 'lg' | 'xl' | 'full'

export interface ModalProps {
    /** Whether open */
    isOpen: boolean
    /** Close callback */
    onClose: () => void
    /** Size */
    size?: ModalSize
    /** Title */
    title?: ReactNode
    /** Whether to show close button */
    showCloseButton?: boolean
    /** Whether to close on overlay click */
    closeOnOverlayClick?: boolean
    /** Whether to close on ESC key */
    closeOnEsc?: boolean
    /** Whether centered */
    centered?: boolean
    /** Custom className */
    className?: string
    /** Custom styles */
    style?: React.CSSProperties
    /** Children */
    children?: ReactNode
    /** Footer */
    footer?: ReactNode
    /** Whether no padding */
    noPadding?: boolean
}

export interface ModalHeaderProps extends HTMLAttributes<HTMLDivElement> { }
export interface ModalBodyProps extends HTMLAttributes<HTMLDivElement> { }
export interface ModalFooterProps extends HTMLAttributes<HTMLDivElement> {
    align?: 'start' | 'center' | 'end' | 'between'
}
