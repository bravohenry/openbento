/**
 * OpenBento Design System - Breakpoint Tokens
 * 
 * 响应式断点系统
 * 采用 Mobile First 设计理念
 */

// ============ 断点值 ============

export const breakpoints = {
    /** 超小屏幕 - 小型手机 */
    xs: 375,
    /** 小屏幕 - 大型手机 */
    sm: 640,
    /** 中等屏幕 - 平板竖屏 */
    md: 768,
    /** 大屏幕 - 平板横屏/小笔记本 */
    lg: 1024,
    /** 超大屏幕 - 桌面显示器 */
    xl: 1280,
    /** 最大屏幕 - 大型显示器 */
    '2xl': 1536,
} as const

// ============ 媒体查询 ============

export const mediaQueries = {
    xs: `(min-width: ${breakpoints.xs}px)`,
    sm: `(min-width: ${breakpoints.sm}px)`,
    md: `(min-width: ${breakpoints.md}px)`,
    lg: `(min-width: ${breakpoints.lg}px)`,
    xl: `(min-width: ${breakpoints.xl}px)`,
    '2xl': `(min-width: ${breakpoints['2xl']}px)`,

    // 特殊查询
    touch: '(hover: none) and (pointer: coarse)',
    hover: '(hover: hover) and (pointer: fine)',
    dark: '(prefers-color-scheme: dark)',
    light: '(prefers-color-scheme: light)',
    reducedMotion: '(prefers-reduced-motion: reduce)',
    highContrast: '(prefers-contrast: high)',

    // 方向
    portrait: '(orientation: portrait)',
    landscape: '(orientation: landscape)',
} as const

// ============ Bento Grid 断点配置 ============

export const bentoGridBreakpoints = {
    // 手机 - 2列
    mobile: {
        breakpoint: 0,
        maxBreakpoint: breakpoints.sm - 1,
        columns: 2,
        gap: 12,
        maxWidth: '100%',
        padding: 16,
    },

    // 平板 - 3列
    tablet: {
        breakpoint: breakpoints.sm,
        maxBreakpoint: breakpoints.lg - 1,
        columns: 3,
        gap: 16,
        maxWidth: 600,
        padding: 24,
    },

    // 桌面 - 4列
    desktop: {
        breakpoint: breakpoints.lg,
        maxBreakpoint: breakpoints['2xl'] - 1,
        columns: 4,
        gap: 16,
        maxWidth: 800,
        padding: 32,
    },

    // 大屏 - 4列 (更大内容区)
    wide: {
        breakpoint: breakpoints['2xl'],
        maxBreakpoint: Infinity,
        columns: 4,
        gap: 20,
        maxWidth: 960,
        padding: 48,
    },
} as const

// ============ 容器宽度 ============

export const containerWidths = {
    xs: 320,
    sm: 540,
    md: 720,
    lg: 960,
    xl: 1140,
    '2xl': 1320,
    fluid: '100%',
} as const

// ============ 类型导出 ============

export type Breakpoint = keyof typeof breakpoints
export type MediaQuery = keyof typeof mediaQueries
export type BentoGridBreakpoint = keyof typeof bentoGridBreakpoints
