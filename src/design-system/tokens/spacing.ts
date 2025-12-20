/**
 * OpenBento Design System - Spacing Tokens
 * 
 * 间距系统采用 4px 基准网格
 * 遵循 8-point grid 设计规范
 */

// ============ 基础间距 (4px 网格) ============

export const spacing = {
    /** 0px */
    0: '0',
    /** 1px - 用于细微调整 */
    px: '1px',
    /** 2px */
    0.5: '0.125rem',
    /** 4px */
    1: '0.25rem',
    /** 6px */
    1.5: '0.375rem',
    /** 8px */
    2: '0.5rem',
    /** 10px */
    2.5: '0.625rem',
    /** 12px */
    3: '0.75rem',
    /** 14px */
    3.5: '0.875rem',
    /** 16px */
    4: '1rem',
    /** 20px */
    5: '1.25rem',
    /** 24px */
    6: '1.5rem',
    /** 28px */
    7: '1.75rem',
    /** 32px */
    8: '2rem',
    /** 36px */
    9: '2.25rem',
    /** 40px */
    10: '2.5rem',
    /** 44px */
    11: '2.75rem',
    /** 48px */
    12: '3rem',
    /** 56px */
    14: '3.5rem',
    /** 64px */
    16: '4rem',
    /** 80px */
    20: '5rem',
    /** 96px */
    24: '6rem',
    /** 112px */
    28: '7rem',
    /** 128px */
    32: '8rem',
    /** 144px */
    36: '9rem',
    /** 160px */
    40: '10rem',
    /** 176px */
    44: '11rem',
    /** 192px */
    48: '12rem',
    /** 208px */
    52: '13rem',
    /** 224px */
    56: '14rem',
    /** 240px */
    60: '15rem',
    /** 256px */
    64: '16rem',
    /** 288px */
    72: '18rem',
    /** 320px */
    80: '20rem',
    /** 384px */
    96: '24rem',
} as const

// ============ 语义化间距 ============

export const semanticSpacing = {
    // 组件内部间距
    component: {
        /** 最小内间距 - 紧凑组件 */
        xs: spacing[1],    // 4px
        /** 小内间距 */
        sm: spacing[2],    // 8px
        /** 默认内间距 */
        md: spacing[3],    // 12px
        /** 大内间距 */
        lg: spacing[4],    // 16px
        /** 超大内间距 */
        xl: spacing[6],    // 24px
    },

    // 元素之间的间距
    gap: {
        /** 紧凑间距 */
        xs: spacing[1],    // 4px
        /** 小间距 */
        sm: spacing[2],    // 8px
        /** 默认间距 */
        md: spacing[4],    // 16px
        /** 大间距 */
        lg: spacing[6],    // 24px
        /** 超大间距 */
        xl: spacing[8],    // 32px
    },

    // 区块/容器间距
    section: {
        /** 紧凑区块间距 */
        sm: spacing[8],    // 32px
        /** 默认区块间距 */
        md: spacing[12],   // 48px
        /** 大区块间距 */
        lg: spacing[16],   // 64px
        /** 超大区块间距 */
        xl: spacing[24],   // 96px
    },

    // 内边距预设
    inset: {
        /** 紧凑内边距 */
        xs: spacing[2],    // 8px
        /** 小内边距 */
        sm: spacing[3],    // 12px
        /** 默认内边距 */
        md: spacing[4],    // 16px
        /** 大内边距 */
        lg: spacing[6],    // 24px
        /** 超大内边距 */
        xl: spacing[8],    // 32px
    },
} as const

// ============ 负间距 (用于偏移) ============

export const negativeSpacing = {
    '-px': '-1px',
    '-0.5': '-0.125rem',
    '-1': '-0.25rem',
    '-1.5': '-0.375rem',
    '-2': '-0.5rem',
    '-2.5': '-0.625rem',
    '-3': '-0.75rem',
    '-4': '-1rem',
    '-5': '-1.25rem',
    '-6': '-1.5rem',
    '-8': '-2rem',
    '-10': '-2.5rem',
    '-12': '-3rem',
    '-16': '-4rem',
} as const

// ============ 类型导出 ============

export type Spacing = keyof typeof spacing
export type NegativeSpacing = keyof typeof negativeSpacing
