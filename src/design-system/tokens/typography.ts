/**
 * OpenBento Design System - Typography Tokens
 * 
 * 字体系统设计采用模块化比例 (Modular Scale)
 * 基准字号: 16px, 比例: 1.25 (Major Third)
 */

// ============ 字体族 ============

export const fontFamily = {
    sans: "var(--font-sans, 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif)",
    mono: "var(--font-mono, 'JetBrains Mono', 'Fira Code', 'SF Mono', Consolas, monospace)",
    display: "var(--font-display, 'Cal Sans', 'Inter', sans-serif)",
} as const

// ============ 字号 ============

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

// ============ 字重 ============

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

// ============ 行高 ============

export const lineHeight = {
    /** 1 - 用于图标或单行紧凑文本 */
    none: '1',
    /** 1.25 - 紧凑行高，用于标题 */
    tight: '1.25',
    /** 1.375 - 稍紧凑 */
    snug: '1.375',
    /** 1.5 - 正常行高，用于正文 */
    normal: '1.5',
    /** 1.625 - 稍宽松 */
    relaxed: '1.625',
    /** 2 - 宽松行高 */
    loose: '2',
} as const

// ============ 字间距 ============

export const letterSpacing = {
    tighter: '-0.05em',
    tight: '-0.025em',
    normal: '0',
    wide: '0.025em',
    wider: '0.05em',
    widest: '0.1em',
} as const

// ============ 文本样式预设 ============

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
