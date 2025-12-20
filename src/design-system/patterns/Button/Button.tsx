import React, { forwardRef, useState } from 'react'
import { cn } from '../../utils/cn'
import {
    buttonBaseStyles,
    buttonSizes,
    buttonShapes,
    buttonVariants,
    buttonDisabledStyles,
    buttonLoadingStyles,
} from './Button.styles'
import type { ButtonProps } from './Button.types'

/**
 * Button - 按钮组件
 * 
 * 设计灵感来源于 Bento.me 的 Follow 按钮：
 * - 药丸形状 (pill) 作为默认
 * - 社交媒体品牌色变体
 * - 支持徽章 (如 TikTok 粉丝数)
 * - 流畅的 hover 过渡
 * 
 * @example
 * ```tsx
 * // 基础用法
 * <Button variant="primary">Get Started</Button>
 * 
 * // 社交媒体 Follow 按钮
 * <Button variant="twitter" shape="pill" size="sm">Follow</Button>
 * <Button variant="instagram" shape="pill" size="sm">Follow</Button>
 * <Button variant="tiktok" shape="pill" size="sm" badge={8}>Follow</Button>
 * 
 * // 带图标
 * <Button leftIcon={<SpotifyIcon />} variant="spotify">
 *   Listen on Spotify
 * </Button>
 * 
 * // 加载状态
 * <Button loading>Saving...</Button>
 * ```
 */
export const Button = forwardRef<HTMLButtonElement, ButtonProps>((props, ref) => {
    const {
        variant = 'primary',
        size = 'md',
        shape = 'pill',
        fullWidth = false,
        leftIcon,
        rightIcon,
        loading = false,
        badge,
        iconOnly = false,
        as = 'button',
        href,
        target,
        disabled,
        className,
        style,
        children,
        onMouseEnter,
        onMouseLeave,
        ...restProps
    } = props

    const [isHovered, setIsHovered] = useState(false)

    // 获取样式配置
    const sizeConfig = buttonSizes[size]
    const shapeRadius = buttonShapes[shape]
    const variantStyles = buttonVariants[variant]

    // 构建样式
    const combinedStyles: React.CSSProperties = {
        ...buttonBaseStyles,
        height: sizeConfig.height,
        padding: iconOnly ? '0' : sizeConfig.padding,
        fontSize: sizeConfig.fontSize,
        gap: sizeConfig.gap,
        borderRadius: shapeRadius,
        background: isHovered ? variantStyles.hoverBackground : variantStyles.background,
        color: variantStyles.color,
        border: isHovered && variantStyles.hoverBorder
            ? variantStyles.hoverBorder
            : variantStyles.border,
        boxShadow: variantStyles.boxShadow,
        width: fullWidth ? '100%' : (iconOnly ? sizeConfig.height : 'auto'),
        minWidth: iconOnly ? sizeConfig.height : undefined,
        ...(disabled && buttonDisabledStyles),
        ...(loading && buttonLoadingStyles),
        ...style,
    }

    // Hover 效果增强
    if (isHovered && !disabled && !loading) {
        combinedStyles.transform = 'translateY(-1px)'
        if (variantStyles.boxShadow) {
            combinedStyles.boxShadow = variantStyles.boxShadow.replace(/[\d.]+\)$/, (match) => {
                const opacity = parseFloat(match)
                return `${Math.min(opacity * 1.5, 0.5)})`
            })
        }
    }

    // 处理 hover 事件
    const handleMouseEnter = (e: React.MouseEvent<HTMLButtonElement>) => {
        setIsHovered(true)
        onMouseEnter?.(e)
    }

    const handleMouseLeave = (e: React.MouseEvent<HTMLButtonElement>) => {
        setIsHovered(false)
        onMouseLeave?.(e)
    }

    // 加载指示器
    const LoadingSpinner = () => (
        <svg
            className="button-spinner"
            width={sizeConfig.iconSize}
            height={sizeConfig.iconSize}
            viewBox="0 0 24 24"
            fill="none"
            style={{
                animation: 'spin 1s linear infinite',
            }}
        >
            <circle
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="3"
                strokeLinecap="round"
                strokeDasharray="31.4 31.4"
                opacity={0.25}
            />
            <circle
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="3"
                strokeLinecap="round"
                strokeDasharray="31.4 31.4"
                strokeDashoffset="23.55"
            />
        </svg>
    )

    // 徽章渲染 (如 TikTok 的粉丝数)
    const BadgeElement = badge !== undefined && (
        <span
            className="button-badge"
            style={{
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginLeft: '6px',
                padding: '2px 6px',
                fontSize: '11px',
                fontWeight: 600,
                borderRadius: '9999px',
                background: 'rgba(255, 255, 255, 0.25)',
                minWidth: '18px',
            }}
        >
            {badge}
        </span>
    )

    // 内容渲染
    const content = (
        <>
            {loading ? (
                <LoadingSpinner />
            ) : (
                <>
                    {leftIcon && (
                        <span
                            className="button-icon-left"
                            style={{
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                width: sizeConfig.iconSize,
                                height: sizeConfig.iconSize,
                            }}
                        >
                            {leftIcon}
                        </span>
                    )}
                    {!iconOnly && children}
                    {rightIcon && (
                        <span
                            className="button-icon-right"
                            style={{
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                width: sizeConfig.iconSize,
                                height: sizeConfig.iconSize,
                            }}
                        >
                            {rightIcon}
                        </span>
                    )}
                    {BadgeElement}
                </>
            )}
        </>
    )

    // 根据 as prop 渲染不同元素
    const Component = as as React.ElementType

    const commonProps = {
        ref,
        className: cn('btn', `btn-${variant}`, `btn-${size}`, className),
        style: combinedStyles,
        disabled: disabled || loading,
        onMouseEnter: handleMouseEnter,
        onMouseLeave: handleMouseLeave,
    }

    if (as === 'a') {
        return (
            <Component
                {...commonProps}
                href={href}
                target={target}
                rel={target === '_blank' ? 'noopener noreferrer' : undefined}
                {...restProps}
            >
                {content}
            </Component>
        )
    }

    return (
        <Component
            {...commonProps}
            type={as === 'button' ? 'button' : undefined}
            {...restProps}
        >
            {content}
        </Component>
    )
})

Button.displayName = 'Button'

// ============ CSS Keyframes (需要全局注入) ============
// 在 globals.css 中添加:
// @keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
