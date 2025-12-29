import React, { forwardRef, useId } from 'react'
import { cn } from '../../utils/cn'
import { radii } from '../../tokens/radii'
import { transitions } from '../../tokens/transitions'
import type { InputProps, InputSize, InputVariant } from './Input.types'

// ============ 尺寸配置 ============

const inputSizes: Record<InputSize, { height: string; padding: string; fontSize: string }> = {
    sm: { height: '32px', padding: '0 10px', fontSize: '13px' },
    md: { height: '40px', padding: '0 12px', fontSize: '14px' },
    lg: { height: '48px', padding: '0 16px', fontSize: '15px' },
}

// ============ 变体样式 ============

const inputVariants: Record<InputVariant, React.CSSProperties> = {
    default: {
        background: 'var(--color-surface)',
        border: '1px solid var(--color-border)',
        borderRadius: radii.lg,
    },
    filled: {
        background: 'var(--color-surface-hover)',
        border: '1px solid transparent',
        borderRadius: radii.lg,
    },
    flushed: {
        background: 'transparent',
        border: 'none',
        borderBottom: '1px solid var(--color-border)',
        borderRadius: 0,
    },
    unstyled: {
        background: 'transparent',
        border: 'none',
        borderRadius: 0,
        padding: 0,
    },
}

/**
 * Input - 输入框组件
 * 
 * @example
 * ```tsx
 * // 基础用法
 * <Input placeholder="Enter your email" />
 * 
 * // 带标签和帮助文本
 * <Input
 *   label="Email"
 *   placeholder="you@example.com"
 *   helperText="We'll never share your email"
 * />
 * 
 * // 带图标
 * <Input
 *   leftElement={<SearchIcon />}
 *   placeholder="Search..."
 * />
 * 
 * // 错误状态
 * <Input
 *   isError
 *   errorText="Email is required"
 *   placeholder="Email"
 * />
 * ```
 */
export const Input = forwardRef<HTMLInputElement, InputProps>((props, ref) => {
    const {
        variant = 'default',
        size = 'md',
        leftElement,
        rightElement,
        leftAddon,
        rightAddon,
        label,
        helperText,
        errorText,
        isError = false,
        isSuccess = false,
        fullWidth = false,
        disabled,
        className,
        style,
        id,
        ...restProps
    } = props

    const generatedId = useId()
    const inputId = id || generatedId
    const sizeConfig = inputSizes[size]
    const variantStyles = inputVariants[variant]

    // 边框颜色
    const getBorderColor = () => {
        if (isError) return '#ef4444'
        if (isSuccess) return '#10b981'
        return undefined
    }

    // 处理边框样式：将简写 border 拆分为独立属性，避免与 borderColor 冲突
    const borderColor = getBorderColor()
    const { border, ...variantStylesWithoutBorder } = variantStyles
    
    // 如果 variantStyles 使用了 border 简写，拆分为独立属性
    let borderWidth = '1px'
    let borderStyle = 'solid'
    let defaultBorderColor = 'var(--color-border)'
    
    if (border && typeof border === 'string') {
        const borderParts = border.split(' ')
        borderWidth = borderParts[0] || '1px'
        borderStyle = borderParts[1] || 'solid'
        defaultBorderColor = borderParts[2] || 'var(--color-border)'
    } else {
        // 如果 variantStyles 已经使用了独立属性
        borderWidth = (variantStyles.borderWidth as string) || '1px'
        borderStyle = (variantStyles.borderStyle as string) || 'solid'
        defaultBorderColor = (variantStyles.borderColor as string) || 'var(--color-border)'
    }

    // 输入框样式
    const inputStyles: React.CSSProperties = {
        ...variantStylesWithoutBorder,
        borderWidth,
        borderStyle,
        borderColor: borderColor || defaultBorderColor,
        height: sizeConfig.height,
        padding: sizeConfig.padding,
        fontSize: sizeConfig.fontSize,
        width: '100%',
        color: 'var(--color-text-primary)',
        outline: 'none',
        transition: transitions.fast,
        ...(leftElement && { paddingLeft: `calc(${sizeConfig.height} - 4px)` }),
        ...(rightElement && { paddingRight: `calc(${sizeConfig.height} - 4px)` }),
        ...(disabled && { opacity: 0.5, cursor: 'not-allowed' }),
    }

    // 容器样式
    const containerStyles: React.CSSProperties = {
        display: 'flex',
        flexDirection: 'column',
        gap: '6px',
        width: fullWidth ? '100%' : 'auto',
        ...style,
    }

    // 输入框包装样式
    const wrapperStyles: React.CSSProperties = {
        display: 'flex',
        alignItems: 'stretch',
        position: 'relative',
        width: '100%',
    }

    // 元素样式
    const elementStyles: React.CSSProperties = {
        position: 'absolute',
        top: 0,
        bottom: 0,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: `calc(${sizeConfig.height} - 4px)`,
        color: 'var(--color-text-tertiary)',
        pointerEvents: 'none',
    }

    // Addon 样式
    const addonStyles: React.CSSProperties = {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: sizeConfig.padding,
        fontSize: sizeConfig.fontSize,
        background: 'var(--color-surface-hover)',
        border: '1px solid var(--color-border)',
        color: 'var(--color-text-secondary)',
        whiteSpace: 'nowrap',
    }

    return (
        <div className={cn('input-container', className)} style={containerStyles}>
            {label && (
                <label
                    htmlFor={inputId}
                    style={{
                        fontSize: '13px',
                        fontWeight: 500,
                        color: 'var(--color-text-primary)',
                    }}
                >
                    {label}
                </label>
            )}

            <div style={wrapperStyles}>
                {leftAddon && (
                    <span
                        style={{
                            ...addonStyles,
                            borderRight: 'none',
                            borderRadius: `${radii.lg} 0 0 ${radii.lg}`,
                        }}
                    >
                        {leftAddon}
                    </span>
                )}

                <div style={{ position: 'relative', flex: 1 }}>
                    {leftElement && (
                        <span style={{ ...elementStyles, left: 0 }}>
                            {leftElement}
                        </span>
                    )}

                    <input
                        ref={ref}
                        id={inputId}
                        disabled={disabled}
                        style={{
                            ...inputStyles,
                            ...(leftAddon && { borderTopLeftRadius: 0, borderBottomLeftRadius: 0 }),
                            ...(rightAddon && { borderTopRightRadius: 0, borderBottomRightRadius: 0 }),
                        }}
                        {...restProps}
                    />

                    {rightElement && (
                        <span style={{ ...elementStyles, right: 0 }}>
                            {rightElement}
                        </span>
                    )}
                </div>

                {rightAddon && (
                    <span
                        style={{
                            ...addonStyles,
                            borderLeft: 'none',
                            borderRadius: `0 ${radii.lg} ${radii.lg} 0`,
                        }}
                    >
                        {rightAddon}
                    </span>
                )}
            </div>

            {(helperText || errorText) && (
                <span
                    style={{
                        fontSize: '12px',
                        color: isError ? '#ef4444' : 'var(--color-text-tertiary)',
                    }}
                >
                    {isError ? errorText : helperText}
                </span>
            )}
        </div>
    )
})

Input.displayName = 'Input'
