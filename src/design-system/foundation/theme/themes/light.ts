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
            focus: '#FF6B35',
            divider: 'rgba(0, 0, 0, 0.06)',
        },
        brand: {
            primary: '#FF6B35',
            secondary: '#FF9F1C',
            gradient: 'linear-gradient(135deg, #FF6B35 0%, #FF9F1C 100%)',
        },
        semantic: {
            success: '#10b981',
            warning: '#f59e0b',
            error: '#ef4444',
            info: '#3b82f6',
        },
    },
}
