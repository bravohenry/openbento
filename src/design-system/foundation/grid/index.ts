/**
 * OpenBento Design System - Grid Module
 * 
 * 网格系统统一导出
 */

// 常量
export {
    DEFAULT_COLUMNS,
    DEFAULT_GAP,
    DEFAULT_CELL_SIZE,
    DEFAULT_MAX_WIDTH,
    WIDGET_SIZES,
    RESPONSIVE_GRID_CONFIG,
    SIZE_DOWNGRADE_MAP,
    type WidgetSize,
    type GridBreakpoint,
    type GridConfig,
} from './constants'

// 工具函数
export {
    calculateWidgetDimensions,
    getResponsiveSize,
    getBreakpointFromWidth,
    getGridConfigForBreakpoint,
    rectsOverlap,
    isWithinGrid,
    findNextAvailablePosition,
    generateGridContainerStyles,
    generateWidgetGridStyles,
    parseSize,
    formatSize,
    getAvailableSizes,
    type GridPosition,
    type GridRect,
} from './utils'

// 上下文
export {
    GridProvider,
    useGrid,
    useGridConfig,
    useBreakpoint,
    useIsEditing,
    useResponsive,
    type GridContextValue,
    type GridProviderProps,
} from './GridContext'
