/**
 * OpenBento Design System - Border Radius Tokens
 * 
 * 圆角系统用于定义组件的圆角程度
 * Bento 风格偏向较大的圆角
 */

// ============ 基础圆角 ============

export const radii = {
    /** 无圆角 */
    none: '0',

    /** 2px - 极小圆角 */
    xs: '0.125rem',

    /** 4px - 小圆角 */
    sm: '0.25rem',

    /** 6px - 稍小圆角 */
    DEFAULT: '0.375rem',

    /** 8px - 默认圆角 */
    md: '0.5rem',

    /** 12px - 中等圆角 */
    lg: '0.75rem',

    /** 16px - 大圆角 */
    xl: '1rem',

    /** 24px - 超大圆角 */
    '2xl': '1.5rem',

    /** 32px - 特大圆角 */
    '3xl': '2rem',

    /** 完全圆角 */
    full: '9999px',
} as const

// ============ 语义化圆角 ============

export const semanticRadii = {
    // 按钮圆角
    button: {
        sm: radii.md,      // 8px
        md: radii.lg,      // 12px
        lg: radii.xl,      // 16px
        pill: radii.full,  // 圆角胶囊
    },

    // 输入框圆角
    input: {
        sm: radii.md,      // 8px
        md: radii.lg,      // 12px
        lg: radii.xl,      // 16px
    },

    // 卡片圆角 (Bento 风格 - 较大圆角)
    card: {
        sm: radii.lg,      // 12px
        md: radii.xl,      // 16px
        lg: radii['2xl'],  // 24px
    },

    // Widget 圆角
    widget: {
        sm: radii.xl,      // 16px
        md: radii['2xl'],  // 24px
        lg: radii['3xl'],  // 32px
    },

    // 头像圆角
    avatar: {
        sm: radii.md,      // 8px
        md: radii.lg,      // 12px
        lg: radii.full,    // 完全圆形
    },

    // 模态框圆角
    modal: radii['2xl'],  // 24px

    // 下拉菜单圆角
    dropdown: radii.xl,   // 16px

    // 工具提示圆角
    tooltip: radii.lg,    // 12px

    // 徽章圆角
    badge: radii.full,    // 圆角胶囊

    // 标签圆角
    tag: radii.md,        // 8px
} as const

// ============ 类型导出 ============

export type Radius = keyof typeof radii
export type SemanticRadius = keyof typeof semanticRadii
