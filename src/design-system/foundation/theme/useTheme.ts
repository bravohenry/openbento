'use client'

/**
 * OpenBento Design System - useTheme Hook
 * 
 * 主题使用 Hook
 */

import { useContext } from 'react'
import { ThemeContext } from './ThemeProvider'
import type { ThemeContextValue } from './types'

/**
 * 获取主题上下文
 * 
 * @returns 主题上下文值
 * @throws 如果在 ThemeProvider 外部使用
 * 
 * @example
 * ```tsx
 * function MyComponent() {
 *   const { theme, mode, toggleMode } = useTheme()
 *   
 *   return (
 *     <button onClick={toggleMode}>
 *       Current: {mode}
 *     </button>
 *   )
 * }
 * ```
 */
export function useTheme(): ThemeContextValue {
    const context = useContext(ThemeContext)

    if (!context) {
        throw new Error('useTheme must be used within a ThemeProvider')
    }

    return context
}

/**
 * 获取当前是否为暗色模式
 */
export function useIsDarkMode(): boolean {
    const { theme } = useTheme()
    return theme.isDark
}

/**
 * 获取主题颜色
 */
export function useThemeColors() {
    const { theme } = useTheme()
    return theme.colors
}

/**
 * 根据主题返回对应值
 */
export function useThemeValue<T>(lightValue: T, darkValue: T): T {
    const isDark = useIsDarkMode()
    return isDark ? darkValue : lightValue
}
