/**
 * OpenBento Design System - Grid Constants
 * 
 * Bento 网格系统常量
 */

// ============ 网格基础配置 ============

/** 默认网格列数 */
export const DEFAULT_COLUMNS = 4

/** 默认网格间距 (px) */
export const DEFAULT_GAP = 16

/** 默认单元格尺寸 (px) */
export const DEFAULT_CELL_SIZE = 100

/** 默认最大宽度 (px) */
export const DEFAULT_MAX_WIDTH = 800

// ============ Widget 尺寸定义 ============

export const WIDGET_SIZES = {
    '1x1': { columns: 1, rows: 1 },
    '2x1': { columns: 2, rows: 1 },
    '1x2': { columns: 1, rows: 2 },
    '2x2': { columns: 2, rows: 2 },
    '3x1': { columns: 3, rows: 1 },
    '3x2': { columns: 3, rows: 2 },
    '4x1': { columns: 4, rows: 1 },
    '4x2': { columns: 4, rows: 2 },
} as const

export type WidgetSize = keyof typeof WIDGET_SIZES

// ============ 响应式网格配置 ============

export const RESPONSIVE_GRID_CONFIG = {
    /** 手机 (< 640px) */
    mobile: {
        columns: 2,
        gap: 12,
        maxWidth: '100%',
        padding: 16,
        cellMinHeight: 80,
    },
    /** 平板 (640px - 1024px) */
    tablet: {
        columns: 3,
        gap: 16,
        maxWidth: 600,
        padding: 24,
        cellMinHeight: 100,
    },
    /** 桌面 (>= 1024px) */
    desktop: {
        columns: 4,
        gap: 16,
        maxWidth: 800,
        padding: 32,
        cellMinHeight: 100,
    },
    /** 大屏 (>= 1536px) */
    wide: {
        columns: 4,
        gap: 20,
        maxWidth: 960,
        padding: 48,
        cellMinHeight: 120,
    },
} as const

export type GridBreakpoint = keyof typeof RESPONSIVE_GRID_CONFIG

// ============ 尺寸响应式映射 ============

/**
 * 不同断点下 Widget 尺寸的降级映射
 * 例如：4x1 在手机上会降级为 2x1
 */
export const SIZE_DOWNGRADE_MAP: Record<GridBreakpoint, Partial<Record<WidgetSize, WidgetSize>>> = {
    mobile: {
        '3x1': '2x1',
        '3x2': '2x2',
        '4x1': '2x1',
        '4x2': '2x2',
    },
    tablet: {
        '4x1': '3x1',
        '4x2': '3x2',
    },
    desktop: {},
    wide: {},
}

// ============ 网格类型 ============

export interface GridConfig {
    columns: number
    gap: number
    maxWidth: number | string
    padding: number
    cellMinHeight: number
}
