/**
 * OpenBento - useGridLayout Hook
 * 
 * 网格布局管理 Hook
 * 处理卡片位置计算、碰撞检测、自动排列等
 */

import { useState, useCallback, useMemo } from 'react'
import type { BentoSize } from '../core/BentoSizeMap'
import { parseBentoSize, BENTO_UNIT, BENTO_GAP } from '../core/BentoSizeMap'

// ============ Types ============

export interface GridItem {
    id: string
    size: BentoSize
    col: number
    row: number
    content?: unknown
}

export interface UseGridLayoutOptions {
    /** 网格列数 */
    columns?: number
    /** 网格行数 (可选，动态扩展) */
    maxRows?: number
    /** 初始项目 */
    initialItems?: GridItem[]
    /** 是否启用碰撞检测 */
    collisionDetection?: boolean
}

export interface UseGridLayoutReturn {
    /** 当前项目列表 */
    items: GridItem[]
    /** 网格列数 */
    columns: number
    /** 当前使用的行数 */
    usedRows: number
    /** 占用矩阵 */
    occupancyMatrix: boolean[][]

    // Actions
    addItem: (item: Omit<GridItem, 'col' | 'row'>) => GridItem | null
    removeItem: (id: string) => void
    moveItem: (id: string, toCol: number, toRow: number) => boolean
    resizeItem: (id: string, newSize: BentoSize) => boolean
    clearAll: () => void

    // Helpers
    canPlaceAt: (size: BentoSize, col: number, row: number, excludeId?: string) => boolean
    findNextAvailablePosition: (size: BentoSize) => { col: number; row: number } | null
    getItemAt: (col: number, row: number) => GridItem | undefined
    snapToGrid: (x: number, y: number) => { col: number; row: number }
}

// ============ Hook ============

export const useGridLayout = (options: UseGridLayoutOptions = {}): UseGridLayoutReturn => {
    const {
        columns = 4,
        maxRows = 100,
        initialItems = [],
        collisionDetection = true,
    } = options

    const [items, setItems] = useState<GridItem[]>(initialItems)

    // Calculate used rows
    const usedRows = useMemo(() => {
        if (items.length === 0) return 1
        return Math.max(
            ...items.map(item => {
                const { rows } = parseBentoSize(item.size)
                return item.row + rows
            })
        )
    }, [items])

    // Build occupancy matrix
    const occupancyMatrix = useMemo(() => {
        const matrix: boolean[][] = Array.from({ length: maxRows }, () =>
            Array.from({ length: columns }, () => false)
        )

        items.forEach(item => {
            const { cols, rows } = parseBentoSize(item.size)
            for (let r = item.row; r < item.row + rows && r < maxRows; r++) {
                for (let c = item.col; c < item.col + cols && c < columns; c++) {
                    matrix[r][c] = true
                }
            }
        })

        return matrix
    }, [items, columns, maxRows])

    // Check if a position is available
    const canPlaceAt = useCallback((
        size: BentoSize,
        col: number,
        row: number,
        excludeId?: string
    ): boolean => {
        const { cols, rows } = parseBentoSize(size)

        // Bounds check
        if (col < 0 || row < 0 || col + cols > columns || row + rows > maxRows) {
            return false
        }

        if (!collisionDetection) return true

        // Collision check
        for (const item of items) {
            if (excludeId && item.id === excludeId) continue

            const itemSize = parseBentoSize(item.size)
            const itemEndCol = item.col + itemSize.cols
            const itemEndRow = item.row + itemSize.rows
            const newEndCol = col + cols
            const newEndRow = row + rows

            // Check for overlap
            const overlapsX = col < itemEndCol && newEndCol > item.col
            const overlapsY = row < itemEndRow && newEndRow > item.row

            if (overlapsX && overlapsY) {
                return false
            }
        }

        return true
    }, [items, columns, maxRows, collisionDetection])

    // Find next available position
    const findNextAvailablePosition = useCallback((size: BentoSize): { col: number; row: number } | null => {
        const { cols, rows } = parseBentoSize(size)

        for (let row = 0; row < maxRows; row++) {
            for (let col = 0; col <= columns - cols; col++) {
                if (canPlaceAt(size, col, row)) {
                    return { col, row }
                }
            }
        }

        return null
    }, [columns, maxRows, canPlaceAt])

    // Add item
    const addItem = useCallback((item: Omit<GridItem, 'col' | 'row'>): GridItem | null => {
        const position = findNextAvailablePosition(item.size)
        if (!position) return null

        const newItem: GridItem = {
            ...item,
            col: position.col,
            row: position.row,
        }

        setItems(prev => [...prev, newItem])
        return newItem
    }, [findNextAvailablePosition])

    // Remove item
    const removeItem = useCallback((id: string) => {
        setItems(prev => prev.filter(item => item.id !== id))
    }, [])

    // Move item
    const moveItem = useCallback((id: string, toCol: number, toRow: number): boolean => {
        const item = items.find(i => i.id === id)
        if (!item) return false

        if (!canPlaceAt(item.size, toCol, toRow, id)) {
            return false
        }

        setItems(prev => prev.map(i =>
            i.id === id ? { ...i, col: toCol, row: toRow } : i
        ))

        return true
    }, [items, canPlaceAt])

    // Resize item
    const resizeItem = useCallback((id: string, newSize: BentoSize): boolean => {
        const item = items.find(i => i.id === id)
        if (!item) return false

        if (!canPlaceAt(newSize, item.col, item.row, id)) {
            return false
        }

        setItems(prev => prev.map(i =>
            i.id === id ? { ...i, size: newSize } : i
        ))

        return true
    }, [items, canPlaceAt])

    // Clear all
    const clearAll = useCallback(() => {
        setItems([])
    }, [])

    // Get item at position
    const getItemAt = useCallback((col: number, row: number): GridItem | undefined => {
        return items.find(item => {
            const { cols, rows } = parseBentoSize(item.size)
            return (
                col >= item.col &&
                col < item.col + cols &&
                row >= item.row &&
                row < item.row + rows
            )
        })
    }, [items])

    // Snap pixel coordinates to grid
    const snapToGrid = useCallback((x: number, y: number): { col: number; row: number } => {
        const cellWidth = BENTO_UNIT + BENTO_GAP
        const cellHeight = BENTO_UNIT + BENTO_GAP

        const col = Math.round(x / cellWidth)
        const row = Math.round(y / cellHeight)

        return {
            col: Math.max(0, Math.min(columns - 1, col)),
            row: Math.max(0, row),
        }
    }, [columns])

    return {
        items,
        columns,
        usedRows,
        occupancyMatrix,
        addItem,
        removeItem,
        moveItem,
        resizeItem,
        clearAll,
        canPlaceAt,
        findNextAvailablePosition,
        getItemAt,
        snapToGrid,
    }
}

// ============ Grid Utilities ============

/**
 * 计算两个项目是否重叠
 */
export const doItemsOverlap = (a: GridItem, b: GridItem): boolean => {
    const aSize = parseBentoSize(a.size)
    const bSize = parseBentoSize(b.size)

    const aEndCol = a.col + aSize.cols
    const aEndRow = a.row + aSize.rows
    const bEndCol = b.col + bSize.cols
    const bEndRow = b.row + bSize.rows

    return (
        a.col < bEndCol &&
        aEndCol > b.col &&
        a.row < bEndRow &&
        aEndRow > b.row
    )
}

/**
 * 自动压缩布局 (移除空白行)
 */
export const compactLayout = (items: GridItem[], columns: number): GridItem[] => {
    const sorted = [...items].sort((a, b) => {
        if (a.row !== b.row) return a.row - b.row
        return a.col - b.col
    })

    const result: GridItem[] = []
    const occupancy: boolean[][] = []

    for (const item of sorted) {
        const { cols, rows } = parseBentoSize(item.size)

        // Find the highest available position
        let bestRow = 0
        outer: for (let row = 0; row < 1000; row++) {
            if (item.col + cols > columns) continue

            for (let r = row; r < row + rows; r++) {
                for (let c = item.col; c < item.col + cols; c++) {
                    if (occupancy[r]?.[c]) {
                        continue outer
                    }
                }
            }

            bestRow = row
            break
        }

        // Place item
        const newItem = { ...item, row: bestRow }
        result.push(newItem)

        // Mark occupancy
        for (let r = bestRow; r < bestRow + rows; r++) {
            if (!occupancy[r]) occupancy[r] = []
            for (let c = item.col; c < item.col + cols; c++) {
                occupancy[r][c] = true
            }
        }
    }

    return result
}
