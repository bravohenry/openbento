/**
 * OpenBento - BentoGrid Types
 * 
 * 网格系统类型定义
 */

import type { BentoSize } from '../core/BentoSizeMap'
import type { ReactNode, CSSProperties } from 'react'

// ============ Grid Props ============

export interface BentoGridProps {
    /** 子元素 (BentoCell 或 BentoCard) */
    children: ReactNode
    /** 网格列数 */
    columns?: number
    /** 网格行数 (可选，自动计算) */
    rows?: number
    /** 网格间距 */
    gap?: number
    /** 基础单元尺寸 */
    unit?: number
    /** 容器最大宽度 */
    maxWidth?: number
    /** 是否居中 */
    centered?: boolean
    /** 是否显示网格线 (调试用) */
    showGridLines?: boolean
    /** 是否启用响应式 */
    responsive?: boolean
    /** 自定义样式 */
    style?: CSSProperties
    /** 自定义类名 */
    className?: string
    /** 容器 padding */
    padding?: number | string
}

// ============ Cell Props ============

export interface BentoCellProps {
    /** 子元素 */
    children: ReactNode
    /** 单元格尺寸 */
    size?: BentoSize
    /** 起始列 (1-indexed) */
    colStart?: number
    /** 起始行 (1-indexed) */
    rowStart?: number
    /** 跨列数 */
    colSpan?: number
    /** 跨行数 */
    rowSpan?: number
    /** 自定义 Grid Area */
    gridArea?: string
    /** 自定义样式 */
    style?: CSSProperties
    /** 自定义类名 */
    className?: string
}

// ============ Grid Context ============

export interface GridContextValue {
    /** 网格列数 */
    columns: number
    /** 网格行数 */
    rows: number
    /** 间距 */
    gap: number
    /** 基础单元尺寸 */
    unit: number
    /** 是否处于编辑模式 */
    isEditing: boolean
    /** 是否启用吸附 */
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
