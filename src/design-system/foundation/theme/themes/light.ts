/**
 * OpenBento Design System - Light Theme
 */

import type { ThemeConfig } from '../types'

export const lightTheme: ThemeConfig = {
    name: 'Light',
    id: 'light',
    isDark: false,
    colors: {
        background: {
            primary: '#f5f5f7',
            secondary: '#ffffff',
            tertiary: '#fafafa',
            overlay: 'rgba(0, 0, 0, 0.5)',
        },
        surface: {
            default: '#ffffff',
            hover: '#f8f8fa',
            active: '#f0f0f2',
            elevated: '#ffffff',
        },
        text: {
            primary: '#1a1a1a',
            secondary: '#666666',
            tertiary: '#999999',
            inverse: '#ffffff',
            disabled: 'rgba(0, 0, 0, 0.38)',
        },
        border: {
            default: 'rgba(0, 0, 0, 0.08)',
            hover: 'rgba(0, 0, 0, 0.12)',
            focus: '#6366f1',
            divider: 'rgba(0, 0, 0, 0.06)',
        },
        brand: {
            primary: '#6366f1',
            secondary: '#8b5cf6',
            gradient: 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)',
        },
        semantic: {
            success: '#10b981',
            warning: '#f59e0b',
            error: '#ef4444',
            info: '#3b82f6',
        },
    },
}
