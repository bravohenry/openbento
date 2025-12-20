/**
 * OpenBento Design System - Class Name Utility
 * 
 * 用于合并 className 的工具函数
 */

import { clsx, type ClassValue } from 'clsx'

/**
 * 合并多个 className
 * 支持条件类名、数组、对象等多种格式
 * 
 * @example
 * ```ts
 * cn('base-class', isActive && 'active', { 'disabled': isDisabled })
 * // => 'base-class active' (如果 isActive 为 true, isDisabled 为 false)
 * ```
 */
export function cn(...inputs: ClassValue[]): string {
    return clsx(inputs)
}
