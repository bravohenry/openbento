/**
 * OpenBento Design System - Grid Utilities
 * 
 * 网格计算工具函数
 */

import {
    WIDGET_SIZES,
    RESPONSIVE_GRID_CONFIG,
    SIZE_DOWNGRADE_MAP,
    DEFAULT_COLUMNS,
    DEFAULT_GAP,
    DEFAULT_CELL_SIZE,
    type WidgetSize,
    type GridBreakpoint,
    type GridConfig,
} from './constants'

// ============ 尺寸计算 ============

/**
 * 计算 Widget 的实际像素尺寸
 */
export function calculateWidgetDimensions(
    size: WidgetSize,
    gridConfig: { cellSize?: number; gap?: number; columns?: number } = {}
): { width: number; height: number } {
    const { columns, rows } = WIDGET_SIZES[size]
    const gap = gridConfig.gap ?? DEFAULT_GAP
    const cellSize = gridConfig.cellSize ?? DEFAULT_CELL_SIZE

    // 计算宽度: (单元格数量 * 单元格尺寸) + ((单元格数量 - 1) * 间距)
    const width = columns * cellSize + (columns - 1) * gap
    const height = rows * cellSize + (rows - 1) * gap

    return { width, height }
}

/**
 * 根据当前断点获取降级后的尺寸
 */
export function getResponsiveSize(size: WidgetSize, breakpoint: GridBreakpoint): WidgetSize {
    const downgradeMap = SIZE_DOWNGRADE_MAP[breakpoint]
    return downgradeMap[size] ?? size
}

/**
 * 根据窗口宽度获取当前断点
 */
export function getBreakpointFromWidth(width: number): GridBreakpoint {
    if (width >= 1536) return 'wide'
    if (width >= 1024) return 'desktop'
    if (width >= 640) return 'tablet'
    return 'mobile'
}

/**
 * 获取当前断点的网格配置
 */
export function getGridConfigForBreakpoint(breakpoint: GridBreakpoint): GridConfig {
    return RESPONSIVE_GRID_CONFIG[breakpoint]
}

// ============ 网格位置计算 ============

export interface GridPosition {
    x: number
    y: number
}

export interface GridRect extends GridPosition {
    width: number
    height: number
}

/**
 * 检查两个网格区域是否重叠
 */
export function rectsOverlap(a: GridRect, b: GridRect): boolean {
    return !(
        a.x + a.width <= b.x ||
        b.x + b.width <= a.x ||
        a.y + a.height <= b.y ||
        b.y + b.height <= a.y
    )
}

/**
 * 检查一个位置是否在网格范围内
 */
export function isWithinGrid(
    position: GridPosition,
    size: WidgetSize,
    columns: number = DEFAULT_COLUMNS
): boolean {
    const { columns: widgetCols, rows: widgetRows } = WIDGET_SIZES[size]
    return (
        position.x >= 0 &&
        position.y >= 0 &&
        position.x + widgetCols <= columns
        // 行数通常不限制
    )
}

/**
 * 找到下一个可用位置
 */
export function findNextAvailablePosition(
    occupied: GridRect[],
    size: WidgetSize,
    columns: number = DEFAULT_COLUMNS
): GridPosition {
    const { columns: widgetCols, rows: widgetRows } = WIDGET_SIZES[size]

    // 从 (0, 0) 开始搜索
    for (let y = 0; ; y++) {
        for (let x = 0; x <= columns - widgetCols; x++) {
            const newRect: GridRect = {
                x,
                y,
                width: widgetCols,
                height: widgetRows,
            }

            // 检查是否与任何已占用区域重叠
            const hasOverlap = occupied.some((rect) => rectsOverlap(newRect, rect))

            if (!hasOverlap) {
                return { x, y }
            }
        }
    }
}

// ============ CSS 生成 ============

/**
 * 生成网格容器的 CSS 样式
 */
export function generateGridContainerStyles(config: Partial<GridConfig> = {}): React.CSSProperties {
    const columns = config.columns ?? DEFAULT_COLUMNS
    const gap = config.gap ?? DEFAULT_GAP
    const maxWidth = config.maxWidth ?? `${DEFAULT_COLUMNS * DEFAULT_CELL_SIZE + (DEFAULT_COLUMNS - 1) * gap}px`

    return {
        display: 'grid',
        gridTemplateColumns: `repeat(${columns}, 1fr)`,
        gap: `${gap}px`,
        maxWidth: typeof maxWidth === 'number' ? `${maxWidth}px` : maxWidth,
        width: '100%',
        margin: '0 auto',
    }
}

/**
 * 生成 Widget 的网格定位样式
 */
export function generateWidgetGridStyles(
    size: WidgetSize,
    position?: GridPosition
): React.CSSProperties {
    const { columns, rows } = WIDGET_SIZES[size]

    const styles: React.CSSProperties = {
        gridColumn: `span ${columns}`,
        gridRow: `span ${rows}`,
    }

    if (position) {
        styles.gridColumnStart = position.x + 1 // CSS grid 是 1-indexed
        styles.gridRowStart = position.y + 1
    }

    return styles
}

// ============ 辅助函数 ============

/**
 * 将尺寸字符串解析为列数和行数
 */
export function parseSize(size: WidgetSize): { columns: number; rows: number } {
    return WIDGET_SIZES[size]
}

/**
 * 从列数和行数生成尺寸字符串
 */
export function formatSize(columns: number, rows: number): WidgetSize | null {
    const sizeKey = `${columns}x${rows}` as WidgetSize
    if (sizeKey in WIDGET_SIZES) {
        return sizeKey
    }
    return null
}

/**
 * 获取所有可用的尺寸选项
 */
export function getAvailableSizes(maxColumns: number = DEFAULT_COLUMNS): WidgetSize[] {
    return (Object.keys(WIDGET_SIZES) as WidgetSize[]).filter((size) => {
        const { columns } = WIDGET_SIZES[size]
        return columns <= maxColumns
    })
}
