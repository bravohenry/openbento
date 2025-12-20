import React, { forwardRef } from 'react'
import { cn } from '../../utils/cn'
import { fontSize, fontWeight, lineHeight, textStyles, fontFamily } from '../../tokens/typography'
import { colors } from '../../tokens/colors'
import type { TextProps } from './Text.types'

// 颜色映射
const colorMap: Record<string, string> = {
    primary: colors.text.primary,
    secondary: colors.text.secondary,
    tertiary: colors.text.tertiary,
    inverse: colors.text.inverse,
    inherit: 'inherit',
}

/**
 * Text - 文本原语
 * 
 * 用于渲染文本内容的基础组件，支持预设样式变体和自定义属性。
 * 
 * @example
 * ```tsx
 * // 使用预设样式
 * <Text variant="h1">Heading</Text>
 * <Text variant="body">Body text</Text>
 * 
 * // 自定义样式
 * <Text size="lg" weight="bold" color="primary">
 *   Custom text
 * </Text>
 * 
 * // 截断文本
 * <Text truncate>Very long text that will be truncated...</Text>
 * 
 * // 渐变文本
 * <Text gradient="linear-gradient(135deg, #6366f1, #8b5cf6)">
 *   Gradient text
 * </Text>
 * ```
 */
export const Text = forwardRef<HTMLSpanElement, TextProps>((props, ref) => {
    const {
        as,
        className,
        style,
        variant,
        size,
        weight,
        leading,
        align,
        transform,
        color = 'primary',
        truncate,
        gradient,
        mono,
        children,
        ...restProps
    } = props

    // 根据 variant 选择默认元素
    const getDefaultElement = (): React.ElementType => {
        if (as) return as
        switch (variant) {
            case 'display':
            case 'h1':
                return 'h1'
            case 'h2':
                return 'h2'
            case 'h3':
                return 'h3'
            case 'h4':
                return 'h4'
            case 'h5':
                return 'h5'
            case 'h6':
                return 'h6'
            case 'body':
            case 'bodyLarge':
            case 'bodySmall':
                return 'p'
            case 'code':
                return 'code'
            case 'caption':
            case 'overline':
            case 'label':
            case 'labelSmall':
            default:
                return 'span'
        }
    }

    const Component = getDefaultElement()

    // 构建样式
    const combinedStyles: React.CSSProperties = {}

    // 应用预设样式
    if (variant && textStyles[variant]) {
        const preset = textStyles[variant]
        combinedStyles.fontSize = preset.fontSize
        combinedStyles.fontWeight = preset.fontWeight
        combinedStyles.lineHeight = preset.lineHeight
        if ('letterSpacing' in preset) {
            combinedStyles.letterSpacing = preset.letterSpacing
        }
        if ('textTransform' in preset) {
            combinedStyles.textTransform = preset.textTransform
        }
        if ('fontFamily' in preset) {
            combinedStyles.fontFamily = preset.fontFamily
        }
    }

    // 覆盖样式
    if (size && size !== 'inherit') {
        combinedStyles.fontSize = fontSize[size as keyof typeof fontSize]
    }
    if (weight && weight !== 'inherit') {
        combinedStyles.fontWeight = fontWeight[weight as keyof typeof fontWeight]
    }
    if (leading) {
        combinedStyles.lineHeight = lineHeight[leading]
    }
    if (align) {
        combinedStyles.textAlign = align
    }
    if (transform && transform !== 'none') {
        combinedStyles.textTransform = transform
    }

    // 颜色
    if (color) {
        combinedStyles.color = colorMap[color] || color
    }

    // 单调字体
    if (mono) {
        combinedStyles.fontFamily = fontFamily.mono
    }

    // 截断
    if (truncate) {
        if (typeof truncate === 'number') {
            // 多行截断
            Object.assign(combinedStyles, {
                display: '-webkit-box',
                WebkitLineClamp: truncate,
                WebkitBoxOrient: 'vertical',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
            })
        } else {
            // 单行截断
            Object.assign(combinedStyles, {
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                whiteSpace: 'nowrap',
            })
        }
    }

    // 渐变文本
    if (gradient) {
        Object.assign(combinedStyles, {
            background: gradient,
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
        })
    }

    // 合并用户样式
    Object.assign(combinedStyles, style)

    return (
        <Component
            ref={ref}
            className={cn('text', className)}
            style={combinedStyles}
            {...restProps}
        >
            {children}
        </Component>
    )
})

Text.displayName = 'Text'
