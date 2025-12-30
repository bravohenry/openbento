import React, { forwardRef, useEffect, useCallback } from 'react'
import { createPortal } from 'react-dom'
import { X } from 'phosphor-react'
import { cn } from '../../utils/cn'
import { radii } from '../../tokens/radii'
import { shadows } from '../../tokens/shadows'
import { transitions } from '../../tokens/transitions'
import type { ModalProps, ModalSize, ModalHeaderProps, ModalBodyProps, ModalFooterProps } from './Modal.types'

// ============ 尺寸配置 ============

const modalSizes: Record<ModalSize, string> = {
    sm: '400px',
    md: '500px',
    lg: '680px',
    xl: '900px',
    full: 'calc(100vw - 48px)',
}

// ============ Modal Root ============

/**
 * Modal - 模态框组件
 * 
 * @example
 * ```tsx
 * const [isOpen, setIsOpen] = useState(false)
 * 
 * <Button onClick={() => setIsOpen(true)}>Open Modal</Button>
 * 
 * <Modal
 *   isOpen={isOpen}
 *   onClose={() => setIsOpen(false)}
 *   title="Edit Profile"
 * >
 *   <Modal.Body>
 *     <Input label="Name" placeholder="Your name" />
 *   </Modal.Body>
 *   <Modal.Footer>
 *     <Button variant="ghost" onClick={() => setIsOpen(false)}>Cancel</Button>
 *     <Button variant="primary">Save</Button>
 *   </Modal.Footer>
 * </Modal>
 * ```
 */
const ModalRoot = forwardRef<HTMLDivElement, ModalProps>((props, ref) => {
    const {
        isOpen,
        onClose,
        size = 'md',
        title,
        showCloseButton = true,
        closeOnOverlayClick = true,
        closeOnEsc = true,
        centered = true,
        className,
        style,
        children,
        footer,
        noPadding = false,
    } = props

    // ESC 键关闭
    const handleKeyDown = useCallback((e: KeyboardEvent) => {
        if (closeOnEsc && e.key === 'Escape') {
            onClose()
        }
    }, [closeOnEsc, onClose])

    useEffect(() => {
        if (isOpen) {
            document.addEventListener('keydown', handleKeyDown)
            document.body.style.overflow = 'hidden'
        }
        return () => {
            document.removeEventListener('keydown', handleKeyDown)
            document.body.style.overflow = ''
        }
    }, [isOpen, handleKeyDown])

    if (!isOpen) return null

    // 遮罩样式
    const overlayStyles: React.CSSProperties = {
        position: 'fixed',
        inset: 0,
        display: 'flex',
        alignItems: centered ? 'center' : 'flex-start',
        justifyContent: 'center',
        padding: centered ? '24px' : '48px 24px',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        backdropFilter: 'blur(4px)',
        zIndex: 1000,
        animation: 'fadeIn 0.2s ease-out',
    }

    // 内容容器样式
    const contentStyles: React.CSSProperties = {
        position: 'relative',
        display: 'flex',
        flexDirection: 'column',
        width: '100%',
        maxWidth: modalSizes[size],
        maxHeight: size === 'full' ? 'calc(100vh - 48px)' : '85vh',
        background: 'var(--color-surface)',
        borderRadius: radii['2xl'],
        boxShadow: shadows.xl,
        animation: 'slideUp 0.2s ease-out',
        overflow: 'hidden',
        ...style,
    }

    // 头部样式
    const headerStyles: React.CSSProperties = {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '20px 24px',
        borderBottom: '1px solid var(--color-border)',
        flexShrink: 0,
    }

    // 关闭按钮
    const CloseButton = () => (
        <button
            type="button"
            onClick={onClose}
            style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                width: 32,
                height: 32,
                padding: 0,
                background: 'transparent',
                border: 'none',
                borderRadius: radii.md,
                cursor: 'pointer',
                color: 'var(--color-text-tertiary)',
                transition: transitions.fast,
            }}
            aria-label="Close"
        >
            <X size={20} weight="regular" />
        </button>
    )

    const modalContent = (
        <div
            style={overlayStyles}
            onClick={(e) => {
                if (closeOnOverlayClick && e.target === e.currentTarget) {
                    onClose()
                }
            }}
        >
            <div
                ref={ref}
                className={cn('modal', className)}
                style={contentStyles}
                role="dialog"
                aria-modal="true"
                aria-labelledby={title ? 'modal-title' : undefined}
            >
                {/* Header */}
                {(title || showCloseButton) && (
                    <div style={headerStyles}>
                        {title && (
                            <h2
                                id="modal-title"
                                style={{
                                    margin: 0,
                                    fontSize: '18px',
                                    fontWeight: 600,
                                    color: 'var(--color-text-primary)',
                                }}
                            >
                                {title}
                            </h2>
                        )}
                        {!title && <div />}
                        {showCloseButton && <CloseButton />}
                    </div>
                )}

                {/* Body */}
                <div
                    style={{
                        flex: 1,
                        padding: noPadding ? 0 : '24px',
                        overflowY: 'auto',
                    }}
                >
                    {children}
                </div>

                {/* Footer */}
                {footer && (
                    <div
                        style={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'flex-end',
                            gap: '12px',
                            padding: '16px 24px',
                            borderTop: '1px solid var(--color-border)',
                            flexShrink: 0,
                        }}
                    >
                        {footer}
                    </div>
                )}
            </div>
        </div>
    )

    // 使用 Portal 渲染到 body
    if (typeof document !== 'undefined') {
        return createPortal(modalContent, document.body)
    }
    return null
})

ModalRoot.displayName = 'Modal'

// ============ Modal.Header ============

const ModalHeader = forwardRef<HTMLDivElement, ModalHeaderProps>((props, ref) => {
    const { className, style, children, ...restProps } = props

    return (
        <div
            ref={ref}
            className={cn('modal-header', className)}
            style={{
                padding: '20px 24px',
                borderBottom: '1px solid var(--color-border)',
                ...style,
            }}
            {...restProps}
        >
            {children}
        </div>
    )
})

ModalHeader.displayName = 'Modal.Header'

// ============ Modal.Body ============

const ModalBody = forwardRef<HTMLDivElement, ModalBodyProps>((props, ref) => {
    const { className, style, children, ...restProps } = props

    return (
        <div
            ref={ref}
            className={cn('modal-body', className)}
            style={{
                padding: '24px',
                ...style,
            }}
            {...restProps}
        >
            {children}
        </div>
    )
})

ModalBody.displayName = 'Modal.Body'

// ============ Modal.Footer ============

const ModalFooter = forwardRef<HTMLDivElement, ModalFooterProps>((props, ref) => {
    const { align = 'end', className, style, children, ...restProps } = props

    const alignMap = {
        start: 'flex-start',
        center: 'center',
        end: 'flex-end',
        between: 'space-between',
    }

    return (
        <div
            ref={ref}
            className={cn('modal-footer', className)}
            style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: alignMap[align],
                gap: '12px',
                padding: '16px 24px',
                borderTop: '1px solid var(--color-border)',
                ...style,
            }}
            {...restProps}
        >
            {children}
        </div>
    )
})

ModalFooter.displayName = 'Modal.Footer'

// ============ Compound Export ============

export const Modal = Object.assign(ModalRoot, {
    Header: ModalHeader,
    Body: ModalBody,
    Footer: ModalFooter,
})

// CSS Keyframes (add to globals.css):
// @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
// @keyframes slideUp { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }
