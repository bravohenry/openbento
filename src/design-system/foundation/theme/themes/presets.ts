/**
 * OpenBento Design System - Preset Themes
 * 
 * 精选预设主题集合
 */

import type { PresetTheme } from '../types'
import { lightTheme } from './light'
import { darkTheme } from './dark'

// ============ 午夜主题 ============

export const midnightTheme: PresetTheme = {
    name: 'Midnight',
    id: 'midnight',
    isDark: true,
    previewGradient: 'linear-gradient(135deg, #1e1b4b 0%, #312e81 100%)',
    colors: {
        background: {
            primary: '#0f0d1a',
            secondary: '#1a1625',
            tertiary: '#231f33',
            overlay: 'rgba(0, 0, 0, 0.7)',
        },
        surface: {
            default: '#1a1625',
            hover: '#252136',
            active: '#2d2840',
            elevated: '#1f1a2e',
        },
        text: {
            primary: '#f8fafc',
            secondary: '#a5a3b8',
            tertiary: '#6b6880',
            inverse: '#0f0d1a',
            disabled: 'rgba(255, 255, 255, 0.38)',
        },
        border: {
            default: 'rgba(139, 92, 246, 0.2)',
            hover: 'rgba(139, 92, 246, 0.3)',
            focus: '#a78bfa',
            divider: 'rgba(139, 92, 246, 0.1)',
        },
        brand: {
            primary: '#a78bfa',
            secondary: '#c4b5fd',
            gradient: 'linear-gradient(135deg, #8b5cf6 0%, #a78bfa 100%)',
        },
        semantic: {
            success: '#34d399',
            warning: '#fbbf24',
            error: '#f87171',
            info: '#818cf8',
        },
    },
}

// ============ 森林主题 ============

export const forestTheme: PresetTheme = {
    name: 'Forest',
    id: 'forest',
    isDark: true,
    previewGradient: 'linear-gradient(135deg, #064e3b 0%, #065f46 100%)',
    colors: {
        background: {
            primary: '#022c22',
            secondary: '#064e3b',
            tertiary: '#065f46',
            overlay: 'rgba(0, 0, 0, 0.7)',
        },
        surface: {
            default: '#064e3b',
            hover: '#047857',
            active: '#059669',
            elevated: '#065f46',
        },
        text: {
            primary: '#ecfdf5',
            secondary: '#a7f3d0',
            tertiary: '#6ee7b7',
            inverse: '#022c22',
            disabled: 'rgba(255, 255, 255, 0.38)',
        },
        border: {
            default: 'rgba(16, 185, 129, 0.2)',
            hover: 'rgba(16, 185, 129, 0.3)',
            focus: '#34d399',
            divider: 'rgba(16, 185, 129, 0.1)',
        },
        brand: {
            primary: '#10b981',
            secondary: '#34d399',
            gradient: 'linear-gradient(135deg, #059669 0%, #10b981 100%)',
        },
        semantic: {
            success: '#34d399',
            warning: '#fbbf24',
            error: '#f87171',
            info: '#60a5fa',
        },
    },
}

// ============ 日落主题 ============

export const sunsetTheme: PresetTheme = {
    name: 'Sunset',
    id: 'sunset',
    isDark: false,
    previewGradient: 'linear-gradient(135deg, #fbbf24 0%, #f97316 50%, #dc2626 100%)',
    colors: {
        background: {
            primary: '#fffbeb',
            secondary: '#ffffff',
            tertiary: '#fef3c7',
            overlay: 'rgba(0, 0, 0, 0.5)',
        },
        surface: {
            default: '#ffffff',
            hover: '#fff7ed',
            active: '#ffedd5',
            elevated: '#ffffff',
        },
        text: {
            primary: '#78350f',
            secondary: '#92400e',
            tertiary: '#b45309',
            inverse: '#ffffff',
            disabled: 'rgba(0, 0, 0, 0.38)',
        },
        border: {
            default: 'rgba(251, 191, 36, 0.3)',
            hover: 'rgba(251, 191, 36, 0.5)',
            focus: '#f97316',
            divider: 'rgba(251, 191, 36, 0.2)',
        },
        brand: {
            primary: '#f97316',
            secondary: '#fb923c',
            gradient: 'linear-gradient(135deg, #fbbf24 0%, #f97316 100%)',
        },
        semantic: {
            success: '#16a34a',
            warning: '#d97706',
            error: '#dc2626',
            info: '#0284c7',
        },
    },
}

// ============ 海洋主题 ============

export const oceanTheme: PresetTheme = {
    name: 'Ocean',
    id: 'ocean',
    isDark: true,
    previewGradient: 'linear-gradient(135deg, #0c4a6e 0%, #0369a1 100%)',
    colors: {
        background: {
            primary: '#082f49',
            secondary: '#0c4a6e',
            tertiary: '#075985',
            overlay: 'rgba(0, 0, 0, 0.7)',
        },
        surface: {
            default: '#0c4a6e',
            hover: '#0369a1',
            active: '#0284c7',
            elevated: '#075985',
        },
        text: {
            primary: '#f0f9ff',
            secondary: '#bae6fd',
            tertiary: '#7dd3fc',
            inverse: '#082f49',
            disabled: 'rgba(255, 255, 255, 0.38)',
        },
        border: {
            default: 'rgba(14, 165, 233, 0.2)',
            hover: 'rgba(14, 165, 233, 0.3)',
            focus: '#38bdf8',
            divider: 'rgba(14, 165, 233, 0.1)',
        },
        brand: {
            primary: '#0ea5e9',
            secondary: '#38bdf8',
            gradient: 'linear-gradient(135deg, #0284c7 0%, #0ea5e9 100%)',
        },
        semantic: {
            success: '#34d399',
            warning: '#fbbf24',
            error: '#f87171',
            info: '#38bdf8',
        },
    },
}

// ============ 薰衣草主题 ============

export const lavenderTheme: PresetTheme = {
    name: 'Lavender',
    id: 'lavender',
    isDark: false,
    previewGradient: 'linear-gradient(135deg, #c4b5fd 0%, #a78bfa 100%)',
    colors: {
        background: {
            primary: '#faf5ff',
            secondary: '#ffffff',
            tertiary: '#f3e8ff',
            overlay: 'rgba(0, 0, 0, 0.5)',
        },
        surface: {
            default: '#ffffff',
            hover: '#faf5ff',
            active: '#f3e8ff',
            elevated: '#ffffff',
        },
        text: {
            primary: '#581c87',
            secondary: '#6b21a8',
            tertiary: '#7e22ce',
            inverse: '#ffffff',
            disabled: 'rgba(0, 0, 0, 0.38)',
        },
        border: {
            default: 'rgba(167, 139, 250, 0.3)',
            hover: 'rgba(167, 139, 250, 0.5)',
            focus: '#a78bfa',
            divider: 'rgba(167, 139, 250, 0.2)',
        },
        brand: {
            primary: '#8b5cf6',
            secondary: '#a78bfa',
            gradient: 'linear-gradient(135deg, #8b5cf6 0%, #a78bfa 100%)',
        },
        semantic: {
            success: '#16a34a',
            warning: '#d97706',
            error: '#dc2626',
            info: '#0284c7',
        },
    },
}

// ============ 玫瑰主题 ============

export const roseTheme: PresetTheme = {
    name: 'Rose',
    id: 'rose',
    isDark: false,
    previewGradient: 'linear-gradient(135deg, #fda4af 0%, #fb7185 100%)',
    colors: {
        background: {
            primary: '#fff1f2',
            secondary: '#ffffff',
            tertiary: '#ffe4e6',
            overlay: 'rgba(0, 0, 0, 0.5)',
        },
        surface: {
            default: '#ffffff',
            hover: '#fff1f2',
            active: '#ffe4e6',
            elevated: '#ffffff',
        },
        text: {
            primary: '#881337',
            secondary: '#9f1239',
            tertiary: '#be123c',
            inverse: '#ffffff',
            disabled: 'rgba(0, 0, 0, 0.38)',
        },
        border: {
            default: 'rgba(251, 113, 133, 0.3)',
            hover: 'rgba(251, 113, 133, 0.5)',
            focus: '#fb7185',
            divider: 'rgba(251, 113, 133, 0.2)',
        },
        brand: {
            primary: '#f43f5e',
            secondary: '#fb7185',
            gradient: 'linear-gradient(135deg, #f43f5e 0%, #fb7185 100%)',
        },
        semantic: {
            success: '#16a34a',
            warning: '#d97706',
            error: '#dc2626',
            info: '#0284c7',
        },
    },
}

// ============ 预设主题集合 ============

export const presetThemes: Record<string, PresetTheme> = {
    light: {
        ...lightTheme,
        previewGradient: 'linear-gradient(135deg, #f5f5f7 0%, #ffffff 100%)',
    } as PresetTheme,
    dark: {
        ...darkTheme,
        previewGradient: 'linear-gradient(135deg, #0a0a0a 0%, #1a1a1a 100%)',
    } as PresetTheme,
    midnight: midnightTheme,
    forest: forestTheme,
    sunset: sunsetTheme,
    ocean: oceanTheme,
    lavender: lavenderTheme,
    rose: roseTheme,
}

export const presetThemeList = Object.values(presetThemes)
