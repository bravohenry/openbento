/**
 * OpenBento - BentoGrid Types
 * 
 * Grid system type definitions
 */

import type { BentoSize } from '../core/BentoSizeMap'
import type { ReactNode, CSSProperties } from 'react'

// ============ Grid Props ============

export interface BentoGridProps {
    /** Children (BentoCell or BentoCard) */
    children: ReactNode
    /** Grid column count */
    columns?: number
    /** Grid row count (optional, auto-calculated) */
    rows?: number
    /** Grid gap */
    gap?: number
    /** Base unit size */
    unit?: number
    /** Container max width */
    maxWidth?: number
    /** Whether centered */
    centered?: boolean
    /** Whether to show grid lines (for debugging) */
    showGridLines?: boolean
    /** Whether to enable responsive */
    responsive?: boolean
    /** Custom styles */
    style?: CSSProperties
    /** Custom class name */
    className?: string
    /** Container padding */
    padding?: number | string
}

// ============ Cell Props ============

export interface BentoCellProps {
    /** Children */
    children: ReactNode
    /** Cell size */
    size?: BentoSize
    /** Start column (1-indexed) */
    colStart?: number
    /** Start row (1-indexed) */
    rowStart?: number
    /** Column span */
    colSpan?: number
    /** Row span */
    rowSpan?: number
    /** Custom Grid Area */
    gridArea?: string
    /** Custom styles */
    style?: CSSProperties
    /** Custom class name */
    className?: string
}

// ============ Grid Context ============

export interface GridContextValue {
    /** Grid column count */
    columns: number
    /** Grid row count */
    rows: number
    /** Gap */
    gap: number
    /** Base unit size */
    unit: number
    /** Whether in edit mode */
    isEditing: boolean
    /** Whether snap is enabled */
    snapEnabled: boolean
}

// ============ Grid Item ============

export interface GridItem {
    id: string
    size: BentoSize
    position: {
        col: number
        row: number
    }
    content: ReactNode
}

// ============ Grid Layout ============

export interface GridLayout {
    items: GridItem[]
    columns: number
    rows: number
}

// ============ Responsive Config ============

export interface ResponsiveGridConfig {
    /** 移动端 (< 640px) */
    sm?: Partial<BentoGridProps>
    /** 平板 (640-1024px) */
    md?: Partial<BentoGridProps>
    /** 桌面 (> 1024px) */
    lg?: Partial<BentoGridProps>
}

// ============ Grid Events ============

export interface GridDragEvent {
    itemId: string
    fromPosition: { col: number; row: number }
    toPosition: { col: number; row: number }
}

export interface GridResizeEvent {
    itemId: string
    fromSize: BentoSize
    toSize: BentoSize
}

// ============ Grid Helpers ============

export interface GridPosition {
    col: number
    row: number
}

export interface GridBounds {
    minCol: number
    maxCol: number
    minRow: number
    maxRow: number
}
