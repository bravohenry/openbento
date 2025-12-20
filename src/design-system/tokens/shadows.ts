/**
 * OpenBento Design System - Shadow Tokens
 * 
 * 阴影系统用于创建层级感和深度
 * 采用多层阴影实现更自然的效果
 */

// ============ 基础阴影 ============

export const shadows = {
    /** 无阴影 */
    none: 'none',

    /** 极小阴影 - 用于微妙的边界感 */
    xs: '0 1px 2px rgba(0, 0, 0, 0.05)',

    /** 小阴影 - 用于卡片、按钮 */
    sm: '0 1px 3px rgba(0, 0, 0, 0.1), 0 1px 2px rgba(0, 0, 0, 0.06)',

    /** 默认阴影 - 用于悬浮元素 */
    md: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',

    /** 大阴影 - 用于模态框、下拉菜单 */
    lg: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',

    /** 超大阴影 - 用于弹出层 */
    xl: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',

    /** 最大阴影 - 用于拖拽元素 */
    '2xl': '0 25px 50px -12px rgba(0, 0, 0, 0.25)',

    /** 内阴影 */
    inner: 'inset 0 2px 4px 0 rgba(0, 0, 0, 0.06)',

    /** 轮廓阴影 (用于 focus 状态) */
    outline: '0 0 0 3px rgba(99, 102, 241, 0.3)',
} as const

// ============ 语义化阴影 ============

export const semanticShadows = {
    // Widget/卡片阴影
    widget: {
        default: '0 2px 8px rgba(0, 0, 0, 0.08), 0 0 0 1px rgba(0, 0, 0, 0.04)',
        hover: '0 8px 24px rgba(0, 0, 0, 0.12), 0 0 0 1px rgba(0, 0, 0, 0.06)',
        active: '0 4px 12px rgba(0, 0, 0, 0.08), 0 0 0 1px rgba(0, 0, 0, 0.04)',
        dragging: '0 20px 40px rgba(0, 0, 0, 0.2), 0 0 0 1px rgba(0, 0, 0, 0.08)',
    },

    // 按钮阴影
    button: {
        default: '0 1px 2px rgba(0, 0, 0, 0.05)',
        hover: '0 4px 8px rgba(0, 0, 0, 0.1)',
        active: '0 1px 1px rgba(0, 0, 0, 0.05)',
    },

    // 输入框阴影
    input: {
        default: 'none',
        focus: '0 0 0 3px rgba(99, 102, 241, 0.15)',
        error: '0 0 0 3px rgba(239, 68, 68, 0.15)',
        success: '0 0 0 3px rgba(16, 185, 129, 0.15)',
    },

    // 模态框阴影
    modal: {
        backdrop: '0 0 0 9999px rgba(0, 0, 0, 0.5)',
        content: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
    },

    // 下拉菜单阴影
    dropdown: '0 10px 40px rgba(0, 0, 0, 0.15), 0 0 0 1px rgba(0, 0, 0, 0.05)',

    // 提示框阴影
    tooltip: '0 4px 12px rgba(0, 0, 0, 0.15)',

    // Toast 阴影
    toast: '0 10px 40px rgba(0, 0, 0, 0.12), 0 0 0 1px rgba(0, 0, 0, 0.05)',
} as const

// ============ 发光效果 ============

export const glows = {
    /** 品牌色发光 */
    brand: '0 0 40px rgba(99, 102, 241, 0.15)',
    brandStrong: '0 0 60px rgba(99, 102, 241, 0.25)',

    /** 成功状态发光 */
    success: '0 0 20px rgba(16, 185, 129, 0.3)',

    /** 警告状态发光 */
    warning: '0 0 20px rgba(245, 158, 11, 0.3)',

    /** 错误状态发光 */
    error: '0 0 20px rgba(239, 68, 68, 0.3)',

    /** 社交媒体发光 */
    social: {
        twitter: '0 0 30px rgba(29, 161, 242, 0.3)',
        spotify: '0 0 30px rgba(29, 185, 84, 0.3)',
        instagram: '0 0 30px rgba(228, 64, 95, 0.3)',
        youtube: '0 0 30px rgba(255, 0, 0, 0.3)',
        github: '0 0 30px rgba(51, 51, 51, 0.3)',
        linkedin: '0 0 30px rgba(10, 102, 194, 0.3)',
    },
} as const

// ============ 暗色模式阴影 ============

export const darkShadows = {
    xs: '0 1px 2px rgba(0, 0, 0, 0.2)',
    sm: '0 1px 3px rgba(0, 0, 0, 0.3), 0 1px 2px rgba(0, 0, 0, 0.2)',
    md: '0 4px 6px -1px rgba(0, 0, 0, 0.3), 0 2px 4px -1px rgba(0, 0, 0, 0.2)',
    lg: '0 10px 15px -3px rgba(0, 0, 0, 0.3), 0 4px 6px -2px rgba(0, 0, 0, 0.2)',
    xl: '0 20px 25px -5px rgba(0, 0, 0, 0.4), 0 10px 10px -5px rgba(0, 0, 0, 0.2)',
    '2xl': '0 25px 50px -12px rgba(0, 0, 0, 0.5)',

    widget: {
        default: '0 2px 8px rgba(0, 0, 0, 0.3), 0 0 0 1px rgba(255, 255, 255, 0.05)',
        hover: '0 8px 24px rgba(0, 0, 0, 0.4), 0 0 0 1px rgba(255, 255, 255, 0.1)',
        active: '0 4px 12px rgba(0, 0, 0, 0.3), 0 0 0 1px rgba(255, 255, 255, 0.05)',
        dragging: '0 20px 40px rgba(0, 0, 0, 0.5), 0 0 0 1px rgba(255, 255, 255, 0.1)',
    },
} as const

// ============ 类型导出 ============

export type Shadow = keyof typeof shadows
export type SemanticShadow = keyof typeof semanticShadows
export type Glow = keyof typeof glows
