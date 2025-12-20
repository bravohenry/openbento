import React, { forwardRef, Children, cloneElement, isValidElement, type ElementType, type ForwardedRef, type ReactNode } from 'react'
import { cn } from '../../utils/cn'
import { parseStyleProps, extractStyleProps } from '../../utils/styleProps'
import type { StackProps, VStackProps, HStackProps } from './Stack.types'

// 映射值
const alignMap: Record<string, string> = {
    start: 'flex-start',
    end: 'flex-end',
    center: 'center',
    baseline: 'baseline',
    stretch: 'stretch',
}

const justifyMap: Record<string, string> = {
    start: 'flex-start',
    end: 'flex-end',
    center: 'center',
    between: 'space-between',
    around: 'space-around',
    evenly: 'space-evenly',
}

/**
 * 创建带分隔线的子元素
 */
function getChildrenWithDivider(children: ReactNode, divider: ReactNode): ReactNode[] {
    const childArray = Children.toArray(children).filter(isValidElement)

    if (!divider) return childArray as ReactNode[]

    return childArray.reduce<ReactNode[]>((acc, child, index) => {
        acc.push(child)
        if (index < childArray.length - 1) {
            acc.push(
                cloneElement(divider as React.ReactElement, {
                    key: `divider-${index}`,
                })
            )
        }
        return acc
    }, [])
}

interface StackBaseProps extends StackProps {
    direction: 'row' | 'column'
}

/**
 * Stack 基础实现
 */
const StackBase = forwardRef<HTMLDivElement, StackBaseProps>((props, ref) => {
    const {
        as,
        className,
        style,
        direction,
        gap = 0,
        align = 'stretch',
        justify = 'start',
        divider,
        wrap = false,
        children,
        ...restProps
    } = props

    const [styleProps, otherProps] = extractStyleProps(restProps)
    const parsedStyles = parseStyleProps(styleProps)

    const Component = (as || 'div') as React.ElementType

    const combinedStyles: React.CSSProperties = {
        display: 'flex',
        flexDirection: direction,
        flexWrap: wrap ? 'wrap' : 'nowrap',
        alignItems: alignMap[align as string] || align,
        justifyContent: justifyMap[justify as string] || justify,
        gap: typeof gap === 'number' ? `${gap * 4}px` : gap,
        ...parsedStyles,
        ...style,
    }

    const childrenWithDivider = divider
        ? getChildrenWithDivider(children, divider)
        : children

    return (
        <Component
            ref={ref}
            className={cn('stack', className)}
            style={combinedStyles}
            {...otherProps}
        >
            {childrenWithDivider}
        </Component>
    )
})

StackBase.displayName = 'StackBase'

/**
 * VStack - 垂直堆叠布局
 * 
 * @example
 * ```tsx
 * <VStack gap={4}>
 *   <Card>Item 1</Card>
 *   <Card>Item 2</Card>
 *   <Card>Item 3</Card>
 * </VStack>
 * ```
 */
export const VStack = forwardRef<HTMLDivElement, VStackProps>((props, ref) => {
    return <StackBase {...props} direction="column" ref={ref} />
})

VStack.displayName = 'VStack'

/**
 * HStack - 水平堆叠布局
 * 
 * @example
 * ```tsx
 * <HStack gap={4} align="center">
 *   <Avatar />
 *   <Text>Username</Text>
 *   <Badge>Pro</Badge>
 * </HStack>
 * ```
 */
export const HStack = forwardRef<HTMLDivElement, HStackProps>((props, ref) => {
    return <StackBase {...props} direction="row" ref={ref} />
})

HStack.displayName = 'HStack'

// 通用 Stack (需要指定 direction)
export const Stack = {
    Vertical: VStack,
    Horizontal: HStack,
}
