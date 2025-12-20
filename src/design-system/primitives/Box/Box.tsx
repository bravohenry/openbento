import React, { forwardRef } from 'react'
import { cn } from '../../utils/cn'
import { parseStyleProps, extractStyleProps } from '../../utils/styleProps'
import { radii } from '../../tokens/radii'
import { shadows } from '../../tokens/shadows'
import type { BoxProps } from './Box.types'

/**
 * Box - 基础布局原语
 * 
 * 最基础的布局组件，可以渲染为任何 HTML 元素。
 * 支持 style props (m, p, gap, etc.) 和常用样式快捷属性。
 * 
 * @example
 * ```tsx
 * // 基础用法
 * <Box p={4} bg="var(--color-surface)">Content</Box>
 * 
 * // 多态用法
 * <Box as="section" p={6} rounded="lg">
 *   <h1>Title</h1>
 * </Box>
 * 
 * // 居中内容
 * <Box center h={200}>Centered Content</Box>
 * ```
 */
export const Box = forwardRef<HTMLDivElement, BoxProps>((props, ref) => {
    const {
        as,
        className,
        style,
        rounded,
        shadow,
        border,
        center,
        children,
        ...restProps
    } = props

    const [styleProps, otherProps] = extractStyleProps(restProps)
    const parsedStyles = parseStyleProps(styleProps)

    const Component = (as || 'div') as React.ElementType

    // 构建样式
    const combinedStyles: React.CSSProperties = {
        ...parsedStyles,
        ...style,
    }

    // 圆角
    if (rounded && rounded !== 'none') {
        combinedStyles.borderRadius = radii[rounded]
    }

    // 阴影
    if (shadow && shadow !== 'none') {
        combinedStyles.boxShadow = shadows[shadow]
    }

    // 边框
    if (border) {
        combinedStyles.border = '1px solid var(--color-border)'
    }

    // 居中
    if (center) {
        combinedStyles.display = 'flex'
        combinedStyles.alignItems = 'center'
        combinedStyles.justifyContent = 'center'
    }

    return (
        <Component
            ref={ref}
            className={cn('box', className)}
            style={combinedStyles}
            {...otherProps}
        >
            {children}
        </Component>
    )
})

Box.displayName = 'Box'
