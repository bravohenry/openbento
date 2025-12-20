/**
 * OpenBento Design System - Theme Types
 * 
 * 主题类型定义
 */

import type { ColorToken } from '../../tokens/colors'

// ============ 主题颜色配置 ============

export interface ThemeColors {
    // 背景色
    background: {
        primary: string
        secondary: string
        tertiary: string
        overlay: string
    }

    // 表面色
    surface: {
        default: string
        hover: string
        active: string
        elevated: string
    }

    // 文本色
    text: {
        primary: string
        secondary: string
        tertiary: string
        inverse: string
        disabled: string
    }

    // 边框色
    border: {
        default: string
        hover: string
        focus: string
        divider: string
    }

    // 品牌色
    brand: {
        primary: string
        secondary: string
        gradient: string
    }

    // 语义色
    semantic: {
        success: string
        warning: string
        error: string
        info: string
    }
}

// ============ 主题配置 ============

export interface ThemeConfig {
    /** 主题名称 */
    name: string
    /** 主题标识 */
    id: string
    /** 是否为暗色主题 */
    isDark: boolean
    /** 颜色配置 */
    colors: ThemeColors
}

// ============ 主题上下文值 ============

export interface ThemeContextValue {
    /** 当前主题 */
    theme: ThemeConfig
    /** 主题模式 */
    mode: 'light' | 'dark' | 'system'
    /** 实际解析后的模式 */
    resolvedMode: 'light' | 'dark'
    /** 设置主题模式 */
    setMode: (mode: 'light' | 'dark' | 'system') => void
    /** 切换主题 */
    toggleMode: () => void
    /** 设置自定义主题 */
    setTheme: (theme: ThemeConfig) => void
}

// ============ 主题提供者 Props ============

export interface ThemeProviderProps {
    children: React.ReactNode
    /** 默认主题模式 */
    defaultMode?: 'light' | 'dark' | 'system'
    /** 默认主题配置 */
    defaultTheme?: ThemeConfig
    /** 是否在 localStorage 中持久化 */
    storageKey?: string
    /** 是否禁用系统主题检测 */
    disableSystemTheme?: boolean
}

// ============ 预设主题类型 ============

export type PresetThemeId =
    | 'light'
    | 'dark'
    | 'midnight'
    | 'forest'
    | 'sunset'
    | 'ocean'
    | 'lavender'
    | 'rose'

export interface PresetTheme extends ThemeConfig {
    /** 预览渐变色 (用于主题选择器) */
    previewGradient: string
}
