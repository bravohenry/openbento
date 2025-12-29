/**
 * [INPUT]: (BentoGrid, BentoCell, useGridLayout) - Grid components and utilities
 * [OUTPUT]: (All grid-related components and tools) - All grid-related components and tools
 * [POS]: Located at /bento/grid module entry, exports all grid-related components and utilities.
 * 
 * [PROTOCOL]:
 * 1. Once this file's logic changes, this Header must be synchronized immediately.
 * 2. After update, must check upward whether /src/bento/grid/.folder.md description is still accurate.
 */

// Components
export { BentoGrid, ResponsiveBentoGrid, AutoLayoutGrid, useGridContext } from './BentoGrid'
export { BentoCell, PositionedCell, CellPlaceholder } from './BentoCell'

// Hooks
export { useGridLayout, doItemsOverlap, compactLayout } from './useGridLayout'

// Types
export type {
    BentoGridProps,
    BentoCellProps,
    GridContextValue,
    GridItem,
    GridLayout,
    ResponsiveGridConfig,
    GridDragEvent,
    GridResizeEvent,
    GridPosition,
    GridBounds,
} from './BentoGrid.types'
