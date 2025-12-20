import React, { useState, useRef, useEffect, cloneElement, isValidElement, useCallback } from 'react'
import { createPortal } from 'react-dom'
import { cn } from '../../utils/cn'
import { radii } from '../../tokens/radii'
import { shadows } from '../../tokens/shadows'
import { transitions } from '../../tokens/transitions'
import type { DropdownProps, DropdownItem, DropdownPlacement } from './Dropdown.types'

// ============ 位置计算 ============

interface Position {
    top: number
    left: number
}

function calculatePosition(
    triggerRect: DOMRect,
    menuRect: DOMRect,
    placement: DropdownPlacement,
    offset: number = 4
): Position {
    // 使用 fixed 定位，直接使用 getBoundingClientRect 返回的值（相对于视口）
    let top = 0
    let left = 0

    switch (placement) {
        case 'bottom-start':
            top = triggerRect.bottom + offset
            left = triggerRect.left
            break
        case 'bottom-end':
            top = triggerRect.bottom + offset
            left = triggerRect.right - menuRect.width
            break
        case 'top-start':
            top = triggerRect.top - menuRect.height - offset
            left = triggerRect.left
            break
        case 'top-end':
            top = triggerRect.top - menuRect.height - offset
            left = triggerRect.right - menuRect.width
            break
    }

    // 边界检测
    if (left < 8) left = 8
    if (left + menuRect.width > window.innerWidth - 8) {
        left = window.innerWidth - menuRect.width - 8
    }

    return { top, left }
}

// ============ 独立的菜单项组件 ============

interface DropdownMenuItemProps {
    item: DropdownItem
    onSelect: (item: DropdownItem) => void
}

function DropdownMenuItem({ item, onSelect }: DropdownMenuItemProps) {
    const [isHovered, setIsHovered] = useState(false)

    const itemStyle: React.CSSProperties = {
        display: 'flex',
        alignItems: 'center',
        gap: '10px',
        padding: '10px 12px',
        fontSize: '14px',
        color: item.danger
            ? '#ef4444'
            : (item.disabled ? 'var(--color-text-tertiary)' : 'var(--color-text-primary)'),
        background: isHovered && !item.disabled ? 'var(--color-surface-hover)' : 'transparent',
        borderRadius: radii.lg,
        cursor: item.disabled ? 'not-allowed' : 'pointer',
        transition: transitions.fast,
        userSelect: 'none',
    }

    return (
        <React.Fragment>
            {item.divider && (
                <div
                    style={{
                        height: 1,
                        background: 'var(--color-border)',
                        margin: '6px 0',
                    }}
                />
            )}
            <div
                style={itemStyle}
                onClick={() => onSelect(item)}
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
                role="menuitem"
                aria-disabled={item.disabled}
            >
                {item.icon && (
                    <span style={{ display: 'flex', width: 18, height: 18, flexShrink: 0 }}>
                        {item.icon}
                    </span>
                )}
                <span style={{ flex: 1 }}>{item.label}</span>
            </div>
        </React.Fragment>
    )
}

/**
 * Dropdown - 下拉菜单组件
 * 
 * @example
 * ```tsx
 * <Dropdown
 *   trigger={<Button variant="secondary">Options</Button>}
 *   items={[
 *     { key: 'edit', label: 'Edit', icon: <EditIcon /> },
 *     { key: 'duplicate', label: 'Duplicate', icon: <CopyIcon /> },
 *     { key: 'delete', label: 'Delete', icon: <TrashIcon />, danger: true, divider: true },
 *   ]}
 *   onSelect={(key) => console.log('Selected:', key)}
 * />
 * ```
 */
export function Dropdown(props: DropdownProps) {
    const {
        trigger,
        items,
        onSelect,
        placement = 'bottom-start',
        triggerType = 'click',
        disabled = false,
        minWidth = 180,
        style,
        className,
    } = props

    const [isOpen, setIsOpen] = useState(false)
    const [position, setPosition] = useState<Position>({ top: 0, left: 0 })
    const triggerRef = useRef<HTMLElement>(null)
    const menuRef = useRef<HTMLDivElement>(null)

    // 计算位置
    const updatePosition = useCallback(() => {
        if (triggerRef.current && menuRef.current) {
            const triggerRect = triggerRef.current.getBoundingClientRect()
            const menuRect = menuRef.current.getBoundingClientRect()
            const newPosition = calculatePosition(triggerRect, menuRect, placement)
            setPosition(newPosition)
        }
    }, [placement])

    // 打开时更新位置
    useEffect(() => {
        if (isOpen) {
            requestAnimationFrame(updatePosition)
            window.addEventListener('scroll', updatePosition, true)
            window.addEventListener('resize', updatePosition)
        }
        return () => {
            window.removeEventListener('scroll', updatePosition, true)
            window.removeEventListener('resize', updatePosition)
        }
    }, [isOpen, updatePosition])

    // 点击外部关闭
    useEffect(() => {
        const handleClickOutside = (e: MouseEvent) => {
            if (
                menuRef.current &&
                !menuRef.current.contains(e.target as Node) &&
                triggerRef.current &&
                !triggerRef.current.contains(e.target as Node)
            ) {
                setIsOpen(false)
            }
        }

        if (isOpen) {
            document.addEventListener('mousedown', handleClickOutside)
        }
        return () => {
            document.removeEventListener('mousedown', handleClickOutside)
        }
    }, [isOpen])

    // ESC 关闭
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === 'Escape') {
                setIsOpen(false)
            }
        }
        if (isOpen) {
            document.addEventListener('keydown', handleKeyDown)
        }
        return () => {
            document.removeEventListener('keydown', handleKeyDown)
        }
    }, [isOpen])

    // 处理选择
    const handleSelect = (item: DropdownItem) => {
        if (item.disabled) return
        onSelect?.(item.key)
        setIsOpen(false)
    }

    // 触发器事件
    const triggerProps: any = {
        ref: triggerRef,
        'aria-haspopup': 'menu',
        'aria-expanded': isOpen,
    }

    if (triggerType === 'click') {
        triggerProps.onClick = (e: React.MouseEvent) => {
            if (disabled) return
            e.stopPropagation()
            setIsOpen(!isOpen)
                ; (trigger as React.ReactElement<any>).props.onClick?.(e)
        }
    } else {
        triggerProps.onMouseEnter = () => !disabled && setIsOpen(true)
        triggerProps.onMouseLeave = () => setIsOpen(false)
    }

    const triggerElement = isValidElement(trigger)
        ? cloneElement(trigger as React.ReactElement<any>, triggerProps)
        : trigger

    // 菜单样式
    const menuStyles: React.CSSProperties = {
        position: 'fixed',
        top: position.top,
        left: position.left,
        minWidth,
        padding: '6px',
        background: 'var(--color-surface)',
        borderRadius: radii.xl,
        boxShadow: shadows.xl,
        border: '1px solid var(--color-border)',
        zIndex: 9999,
        animation: 'dropdownFadeIn 0.15s ease-out',
        ...style,
    }

    // Portal 渲染菜单
    const menu = isOpen && typeof document !== 'undefined' && (
        createPortal(
            <div
                ref={menuRef}
                className={cn('dropdown-menu', className)}
                style={menuStyles}
                role="menu"
                onMouseEnter={triggerType === 'hover' ? () => setIsOpen(true) : undefined}
                onMouseLeave={triggerType === 'hover' ? () => setIsOpen(false) : undefined}
            >
                {items.map((item) => (
                    <DropdownMenuItem
                        key={item.key}
                        item={item}
                        onSelect={handleSelect}
                    />
                ))}
            </div>,
            document.body
        )
    )

    return (
        <>
            {triggerElement}
            {menu}
        </>
    )
}

Dropdown.displayName = 'Dropdown'
