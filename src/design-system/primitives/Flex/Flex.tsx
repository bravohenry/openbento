import React, { forwardRef } from 'react'
import { cn } from '../../utils/cn'
import { parseStyleProps, extractStyleProps } from '../../utils/styleProps'
import { radii } from '../../tokens/radii'
import type { FlexComponentProps, JustifyContent, AlignItems } from './Flex.types'

// 映射 justify 值到 CSS
const justifyMap: Record<JustifyContent, string> = {
    start: 'flex-start',
    end: 'flex-end',
    center: 'center',
    between: 'space-between',
    around: 'space-around',
    evenly: 'space-evenly',
}

// 映射 align 值到 CSS
const alignMap: Record<AlignItems, string> = {
    start: 'flex-start',
    end: 'flex-end',
    center: 'center',
    baseline: 'baseline',
    stretch: 'stretch',
}

/**
 * Flex - Flexbox 布局原语
 * 
 * 基于 Flexbox 的布局组件，提供便捷的 flex 属性快捷方式。
 * 
 * @example
 * ```tsx
 * // 水平居中
 * <Flex justify="center" align="center" gap={4}>
 *   <div>Item 1</div>
 *   <div>Item 2</div>
 * </Flex>
 * 
 * // 垂直列表
 * <Flex direction="column" gap={2}>
 *   <div>Item 1</div>
 *   <div>Item 2</div>
 * </Flex>
 * 
 * // 响应式布局
 * <Flex wrap="wrap" gap={4} justify="between">
 *   {items.map(item => <Card key={item.id} />)}
 * </Flex>
 * ```
 */
export const Flex = forwardRef<HTMLDivElement, FlexComponentProps>((props, ref) => {
    const {
        as,
        className,
        style,
        direction = 'row',
        wrap = 'nowrap',
        justify = 'start',
        align = 'stretch',
        gap,
        inline = false,
        rounded,
        children,
        ...restProps
    } = props

    const [styleProps, otherProps] = extractStyleProps(restProps)
    const parsedStyles = parseStyleProps(styleProps)

    const Component = (as || 'div') as React.ElementType

    // 构建样式
    const combinedStyles: React.CSSProperties = {
        display: inline ? 'inline-flex' : 'flex',
        flexDirection: direction,
        flexWrap: wrap,
        justifyContent: justifyMap[justify],
        alignItems: alignMap[align],
        ...parsedStyles,
        ...style,
    }

    // Gap
    if (gap !== undefined) {
        combinedStyles.gap = typeof gap === 'number' ? `${gap * 4}px` : gap
    }

    // 圆角
    if (rounded && rounded !== 'none') {
        combinedStyles.borderRadius = radii[rounded]
    }

    return (
        <Component
            ref={ref}
            className={cn('flex', className)}
            style={combinedStyles}
            {...otherProps}
        >
            {children}
        </Component>
    )
})

Flex.displayName = 'Flex'
