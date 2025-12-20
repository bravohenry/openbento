/**
 * OpenBento Design System - Dark Theme
 */

import type { ThemeConfig } from '../types'

export const darkTheme: ThemeConfig = {
    name: 'Dark',
    id: 'dark',
    isDark: true,
    colors: {
        background: {
            primary: '#0a0a0a',
            secondary: '#141414',
            tertiary: '#1a1a1a',
            overlay: 'rgba(0, 0, 0, 0.7)',
        },
        surface: {
            default: '#1a1a1a',
            hover: '#242424',
            active: '#2a2a2a',
            elevated: '#202020',
        },
        text: {
            primary: '#ffffff',
            secondary: '#a0a0a0',
            tertiary: '#666666',
            inverse: '#1a1a1a',
            disabled: 'rgba(255, 255, 255, 0.38)',
        },
        border: {
            default: 'rgba(255, 255, 255, 0.1)',
            hover: 'rgba(255, 255, 255, 0.15)',
            focus: '#818cf8',
            divider: 'rgba(255, 255, 255, 0.06)',
        },
        brand: {
            primary: '#818cf8',
            secondary: '#a78bfa',
            gradient: 'linear-gradient(135deg, #818cf8 0%, #a78bfa 100%)',
        },
        semantic: {
            success: '#34d399',
            warning: '#fbbf24',
            error: '#f87171',
            info: '#60a5fa',
        },
    },
}
