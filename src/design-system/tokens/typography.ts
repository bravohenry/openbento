/**
 * OpenBento Design System - Typography Tokens
 * 
 * Typography system uses modular scale
 * Base font size: 16px, ratio: 1.25 (Major Third)
 */

// ============ Font Families ============

export const fontFamily = {
    sans: "var(--font-sans, 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif)",
    mono: "var(--font-mono, 'JetBrains Mono', 'Fira Code', 'SF Mono', Consolas, monospace)",
    display: "var(--font-display, 'Cal Sans', 'Inter', sans-serif)",
} as const

// ============ Font Sizes ============

export const fontSize = {
    /** 10px */
    '2xs': '0.625rem',
    /** 12px */
    xs: '0.75rem',
    /** 14px */
    sm: '0.875rem',
    /** 16px - Base */
    base: '1rem',
    /** 18px */
    lg: '1.125rem',
    /** 20px */
    xl: '1.25rem',
    /** 24px */
    '2xl': '1.5rem',
    /** 30px */
    '3xl': '1.875rem',
    /** 36px */
    '4xl': '2.25rem',
    /** 48px */
    '5xl': '3rem',
    /** 60px */
    '6xl': '3.75rem',
    /** 72px */
    '7xl': '4.5rem',
    /** 96px */
    '8xl': '6rem',
} as const

// ============ Font Weights ============

export const fontWeight = {
    thin: '100',
    extralight: '200',
    light: '300',
    normal: '400',
    medium: '500',
    semibold: '600',
    bold: '700',
    extrabold: '800',
    black: '900',
} as const

// ============ Line Heights ============

export const lineHeight = {
    /** 1 - For icons or single-line compact text */
    none: '1',
    /** 1.25 - Tight line height, for headings */
    tight: '1.25',
    /** 1.375 - Slightly tight */
    snug: '1.375',
    /** 1.5 - Normal line height, for body text */
    normal: '1.5',
    /** 1.625 - Slightly relaxed */
    relaxed: '1.625',
    /** 2 - Loose line height */
    loose: '2',
} as const

// ============ Letter Spacing ============

export const letterSpacing = {
    tighter: '-0.05em',
    tight: '-0.025em',
    normal: '0',
    wide: '0.025em',
    wider: '0.05em',
    widest: '0.1em',
} as const

// ============ Text Style Presets ============

export const textStyles = {
    // 显示标题 (Hero, Banner)
    display: {
        fontSize: fontSize['5xl'],
        fontWeight: fontWeight.bold,
        lineHeight: lineHeight.tight,
        letterSpacing: letterSpacing.tight,
        fontFamily: fontFamily.display,
    },

    // 页面标题
    h1: {
        fontSize: fontSize['4xl'],
        fontWeight: fontWeight.bold,
        lineHeight: lineHeight.tight,
        letterSpacing: letterSpacing.tight,
    },

    h2: {
        fontSize: fontSize['3xl'],
        fontWeight: fontWeight.semibold,
        lineHeight: lineHeight.tight,
        letterSpacing: letterSpacing.tight,
    },

    h3: {
        fontSize: fontSize['2xl'],
        fontWeight: fontWeight.semibold,
        lineHeight: lineHeight.snug,
    },

    h4: {
        fontSize: fontSize.xl,
        fontWeight: fontWeight.semibold,
        lineHeight: lineHeight.snug,
    },

    h5: {
        fontSize: fontSize.lg,
        fontWeight: fontWeight.medium,
        lineHeight: lineHeight.normal,
    },

    h6: {
        fontSize: fontSize.base,
        fontWeight: fontWeight.medium,
        lineHeight: lineHeight.normal,
    },

    // 正文
    body: {
        fontSize: fontSize.base,
        fontWeight: fontWeight.normal,
        lineHeight: lineHeight.normal,
    },

    bodyLarge: {
        fontSize: fontSize.lg,
        fontWeight: fontWeight.normal,
        lineHeight: lineHeight.relaxed,
    },

    bodySmall: {
        fontSize: fontSize.sm,
        fontWeight: fontWeight.normal,
        lineHeight: lineHeight.normal,
    },

    // 辅助文本
    caption: {
        fontSize: fontSize.xs,
        fontWeight: fontWeight.normal,
        lineHeight: lineHeight.normal,
    },

    overline: {
        fontSize: fontSize.xs,
        fontWeight: fontWeight.semibold,
        lineHeight: lineHeight.normal,
        letterSpacing: letterSpacing.wider,
        textTransform: 'uppercase' as const,
    },

    // 代码
    code: {
        fontSize: fontSize.sm,
        fontWeight: fontWeight.normal,
        lineHeight: lineHeight.normal,
        fontFamily: fontFamily.mono,
    },

    // 标签/徽章
    label: {
        fontSize: fontSize.sm,
        fontWeight: fontWeight.medium,
        lineHeight: lineHeight.none,
    },

    labelSmall: {
        fontSize: fontSize.xs,
        fontWeight: fontWeight.medium,
        lineHeight: lineHeight.none,
    },

    // 按钮
    button: {
        fontSize: fontSize.sm,
        fontWeight: fontWeight.medium,
        lineHeight: lineHeight.none,
        letterSpacing: letterSpacing.wide,
    },

    buttonLarge: {
        fontSize: fontSize.base,
        fontWeight: fontWeight.medium,
        lineHeight: lineHeight.none,
        letterSpacing: letterSpacing.wide,
    },
} as const

// ============ 类型导出 ============

export type FontFamily = keyof typeof fontFamily
export type FontSize = keyof typeof fontSize
export type FontWeight = keyof typeof fontWeight
export type LineHeight = keyof typeof lineHeight
export type LetterSpacing = keyof typeof letterSpacing
export type TextStyle = keyof typeof textStyles
