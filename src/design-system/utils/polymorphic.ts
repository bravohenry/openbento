/**
 * OpenBento Design System - Polymorphic Component Types
 * 
 * 多态组件类型工具，支持 as prop
 */

import type { ComponentPropsWithoutRef, ElementType, PropsWithChildren } from 'react'

/**
 * as prop 类型
 */
export type AsProp<C extends ElementType> = {
    as?: C
}

/**
 * 获取组件的 props 类型（排除自定义 props）
 */
export type PropsToOmit<C extends ElementType, P> = keyof (AsProp<C> & P)

/**
 * 多态组件 Props 类型
 * 
 * @example
 * ```tsx
 * type BoxProps<C extends ElementType> = PolymorphicComponentProps<C, {
 *   padding?: number
 * }>
 * 
 * function Box<C extends ElementType = 'div'>({
 *   as,
 *   padding,
 *   ...props
 * }: BoxProps<C>) {
 *   const Component = as || 'div'
 *   return <Component style={{ padding }} {...props} />
 * }
 * ```
 */
export type PolymorphicComponentProps<
    C extends ElementType,
    Props = {}
> = PropsWithChildren<Props & AsProp<C>> &
    Omit<ComponentPropsWithoutRef<C>, PropsToOmit<C, Props>>

/**
 * 多态组件 Ref 类型
 */
export type PolymorphicRef<C extends ElementType> = ComponentPropsWithoutRef<C>['ref']

/**
 * 带 Ref 的多态组件 Props 类型
 */
export type PolymorphicComponentPropsWithRef<
    C extends ElementType,
    Props = {}
> = PolymorphicComponentProps<C, Props> & { ref?: PolymorphicRef<C> }
