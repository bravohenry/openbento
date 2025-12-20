'use client'

/**
 * OpenBento Design System - Theme Provider
 * 
 * 主题上下文提供者
 */

import React, { createContext, useCallback, useEffect, useMemo, useState } from 'react'
import type { ThemeConfig, ThemeContextValue, ThemeProviderProps } from './types'
import { lightTheme } from './themes/light'
import { darkTheme } from './themes/dark'
import { themeToCSSVariables } from './createTheme'

// ============ 上下文创建 ============

export const ThemeContext = createContext<ThemeContextValue | null>(null)

// ============ 系统主题检测 ============

function getSystemTheme(): 'light' | 'dark' {
    if (typeof window === 'undefined') return 'light'
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
}

// ============ 主题提供者组件 ============

export function ThemeProvider({
    children,
    defaultMode = 'system',
    defaultTheme,
    storageKey = 'openbento-theme-mode',
    disableSystemTheme = false,
}: ThemeProviderProps) {
    // 主题模式状态
    const [mode, setModeState] = useState<'light' | 'dark' | 'system'>(() => {
        if (typeof window === 'undefined') return defaultMode
        const stored = localStorage.getItem(storageKey)
        if (stored === 'light' || stored === 'dark' || stored === 'system') {
            return stored
        }
        return defaultMode
    })

    // 解析后的实际模式
    const [resolvedMode, setResolvedMode] = useState<'light' | 'dark'>(() => {
        if (mode === 'system') {
            return disableSystemTheme ? 'light' : getSystemTheme()
        }
        return mode
    })

    // 当前主题配置
    const [customTheme, setCustomTheme] = useState<ThemeConfig | undefined>(defaultTheme)

    // 监听系统主题变化
    useEffect(() => {
        if (mode !== 'system' || disableSystemTheme) return

        const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)')

        const handleChange = (e: MediaQueryListEvent) => {
            setResolvedMode(e.matches ? 'dark' : 'light')
        }

        mediaQuery.addEventListener('change', handleChange)
        return () => mediaQuery.removeEventListener('change', handleChange)
    }, [mode, disableSystemTheme])

    // 更新解析后的模式
    useEffect(() => {
        if (mode === 'system') {
            setResolvedMode(disableSystemTheme ? 'light' : getSystemTheme())
        } else {
            setResolvedMode(mode)
        }
    }, [mode, disableSystemTheme])

    // 计算当前主题
    const theme = useMemo<ThemeConfig>(() => {
        if (customTheme) return customTheme
        return resolvedMode === 'dark' ? darkTheme : lightTheme
    }, [customTheme, resolvedMode])

    // 应用 CSS 变量到文档
    useEffect(() => {
        const variables = themeToCSSVariables(theme)
        const root = document.documentElement

        // 设置 CSS 变量
        Object.entries(variables).forEach(([key, value]) => {
            root.style.setProperty(key, value)
        })

        // 设置 dark 类
        if (theme.isDark) {
            root.classList.add('dark')
        } else {
            root.classList.remove('dark')
        }

        // 设置 color-scheme
        root.style.colorScheme = theme.isDark ? 'dark' : 'light'
    }, [theme])

    // 设置模式
    const setMode = useCallback((newMode: 'light' | 'dark' | 'system') => {
        setModeState(newMode)
        if (typeof window !== 'undefined') {
            localStorage.setItem(storageKey, newMode)
        }
    }, [storageKey])

    // 切换模式
    const toggleMode = useCallback(() => {
        setMode(resolvedMode === 'dark' ? 'light' : 'dark')
    }, [resolvedMode, setMode])

    // 设置自定义主题
    const setTheme = useCallback((newTheme: ThemeConfig) => {
        setCustomTheme(newTheme)
    }, [])

    // 上下文值
    const contextValue = useMemo<ThemeContextValue>(() => ({
        theme,
        mode,
        resolvedMode,
        setMode,
        toggleMode,
        setTheme,
    }), [theme, mode, resolvedMode, setMode, toggleMode, setTheme])

    return (
        <ThemeContext.Provider value={contextValue}>
            {children}
        </ThemeContext.Provider>
    )
}
