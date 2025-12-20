import React, { forwardRef } from 'react'
import { cn } from '../../utils/cn'
import { radii } from '../../tokens/radii'
import type { BadgeProps, BadgeVariant, BadgeSize } from './Badge.types'

// ============ 尺寸配置 ============

const badgeSizes: Record<BadgeSize, { height: string; padding: string; fontSize: string; iconSize: string }> = {
    sm: { height: '18px', padding: '0 6px', fontSize: '10px', iconSize: '10px' },
    md: { height: '22px', padding: '0 8px', fontSize: '11px', iconSize: '12px' },
    lg: { height: '26px', padding: '0 10px', fontSize: '12px', iconSize: '14px' },
}

// ============ 变体样式 ============

const badgeVariants: Record<BadgeVariant, { bg: string; color: string; border?: string }> = {
    default: { bg: 'var(--color-surface-hover)', color: 'var(--color-text-secondary)' },
    primary: { bg: 'var(--color-brand-primary)', color: '#ffffff' },
    secondary: { bg: 'var(--color-surface-active)', color: 'var(--color-text-primary)' },
    success: { bg: '#dcfce7', color: '#166534' },
    warning: { bg: '#fef3c7', color: '#92400e' },
    danger: { bg: '#fee2e2', color: '#991b1b' },
    info: { bg: '#dbeafe', color: '#1e40af' },
    outline: { bg: 'transparent', color: 'var(--color-text-secondary)', border: '1px solid var(--color-border)' },
}

/**
 * Badge - 徽章组件
 * 
 * 用于显示状态、标签或数字指示器。
 * 
 * @example
 * ```tsx
 * // 基础用法
 * <Badge>New</Badge>
 * 
 * // 带颜色变体
 * <Badge variant="success">Active</Badge>
 * <Badge variant="danger">Expired</Badge>
 * 
 * // 圆形数字徽章 (如 TikTok 粉丝数)
 * <Badge rounded variant="primary">8</Badge>
 * 
 * // 可移除
 * <Badge removable onRemove={() => console.log('removed')}>
 *   Tag
 * </Badge>
 * ```
 */
export const Badge = forwardRef<HTMLSpanElement, BadgeProps>((props, ref) => {
    const {
        variant = 'default',
        size = 'md',
        rounded = false,
        icon,
        removable = false,
        onRemove,
        className,
        style,
        children,
        ...restProps
    } = props

    const sizeConfig = badgeSizes[size]
    const variantConfig = badgeVariants[variant]

    const combinedStyles: React.CSSProperties = {
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '4px',
        height: sizeConfig.height,
        padding: rounded ? '0' : sizeConfig.padding,
        minWidth: rounded ? sizeConfig.height : undefined,
        fontSize: sizeConfig.fontSize,
        fontWeight: 500,
        borderRadius: rounded ? radii.full : radii.md,
        backgroundColor: variantConfig.bg,
        color: variantConfig.color,
        border: variantConfig.border || 'none',
        whiteSpace: 'nowrap',
        lineHeight: 1,
        ...style,
    }

    return (
        <span
            ref={ref}
            className={cn('badge', `badge-${variant}`, className)}
            style={combinedStyles}
            {...restProps}
        >
            {icon && (
                <span
                    style={{
                        display: 'flex',
                        alignItems: 'center',
                        width: sizeConfig.iconSize,
                        height: sizeConfig.iconSize,
                    }}
                >
                    {icon}
                </span>
            )}
            {children}
            {removable && (
                <button
                    type="button"
                    onClick={(e) => {
                        e.stopPropagation()
                        onRemove?.()
                    }}
                    style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        padding: 0,
                        marginLeft: '2px',
                        background: 'none',
                        border: 'none',
                        cursor: 'pointer',
                        color: 'inherit',
                        opacity: 0.7,
                    }}
                    aria-label="Remove"
                >
                    <svg width={sizeConfig.iconSize} height={sizeConfig.iconSize} viewBox="0 0 16 16" fill="currentColor">
                        <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z" />
                    </svg>
                </button>
            )}
        </span>
    )
})

Badge.displayName = 'Badge'
