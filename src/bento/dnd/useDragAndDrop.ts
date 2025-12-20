/**
 * OpenBento - useDragAndDrop Hook
 * 
 * 综合拖放 Hook，提供完整的 DnD 功能
 */

import { useState, useCallback, useRef, useEffect } from 'react'
import type { BentoSize } from '../core/BentoSizeMap'
import { parseBentoSize, BENTO_UNIT, BENTO_GAP } from '../core/BentoSizeMap'

// ============ Types ============

export interface DragAndDropItem {
    id: string
    size: BentoSize
    position: { col: number; row: number }
    content?: unknown
}

export interface UseDragAndDropOptions {
    /** 网格列数 */
    columns?: number
    /** 最大行数 */
    maxRows?: number
    /** 初始项目 */
    initialItems?: DragAndDropItem[]
    /** 是否启用碰撞检测 */
    collisionDetection?: boolean
    /** 拖拽结束回调 */
    onDragEnd?: (item: DragAndDropItem, newPosition: { col: number; row: number }) => void
    /** 项目移动回调 */
    onItemMove?: (itemId: string, from: { col: number; row: number }, to: { col: number; row: number }) => void
    /** 项目调整大小回调 */
    onItemResize?: (itemId: string, newSize: BentoSize) => void
}

export interface UseDragAndDropReturn {
    // State
    items: DragAndDropItem[]
    isDragging: boolean
    draggedItem: DragAndDropItem | null
    previewPosition: { col: number; row: number } | null

    // Grid info
    columns: number

    // Actions
    startDrag: (itemId: string, startPosition: { x: number; y: number }) => void
    updateDrag: (currentPosition: { x: number; y: number }) => void
    endDrag: () => void
    cancelDrag: () => void

    // Item operations
    addItem: (item: Omit<DragAndDropItem, 'position'>) => DragAndDropItem | null
    removeItem: (itemId: string) => void
    moveItem: (itemId: string, newPosition: { col: number; row: number }) => boolean
    resizeItem: (itemId: string, newSize: BentoSize) => boolean

    // Utilities
    canPlaceAt: (size: BentoSize, col: number, row: number, excludeId?: string) => boolean
    pixelToGrid: (x: number, y: number, containerRect?: DOMRect) => { col: number; row: number }
    gridToPixel: (col: number, row: number) => { x: number; y: number }
}

// ============ Hook Implementation ============

export const useDragAndDrop = (options: UseDragAndDropOptions = {}): UseDragAndDropReturn => {
    const {
        columns = 4,
        maxRows = 100,
        initialItems = [],
        collisionDetection = true,
        onDragEnd,
        onItemMove,
        onItemResize,
    } = options

    // State
    const [items, setItems] = useState<DragAndDropItem[]>(initialItems)
    const [isDragging, setIsDragging] = useState(false)
    const [draggedItemId, setDraggedItemId] = useState<string | null>(null)
    const [previewPosition, setPreviewPosition] = useState<{ col: number; row: number } | null>(null)

    // Refs
    const dragStartPos = useRef<{ x: number; y: number } | null>(null)
    const originalPosition = useRef<{ col: number; row: number } | null>(null)

    // Get dragged item
    const draggedItem = draggedItemId ? items.find(item => item.id === draggedItemId) ?? null : null

    // ============ Grid Utilities ============

    // Convert pixel coordinates to grid position
    const pixelToGrid = useCallback((x: number, y: number, containerRect?: DOMRect): { col: number; row: number } => {
        const cellSize = BENTO_UNIT + BENTO_GAP
        const offsetX = containerRect?.left ?? 0
        const offsetY = containerRect?.top ?? 0

        const col = Math.floor((x - offsetX) / cellSize)
        const row = Math.floor((y - offsetY) / cellSize)

        return {
            col: Math.max(0, Math.min(columns - 1, col)),
            row: Math.max(0, row),
        }
    }, [columns])

    // Convert grid position to pixel coordinates
    const gridToPixel = useCallback((col: number, row: number): { x: number; y: number } => {
        const cellSize = BENTO_UNIT + BENTO_GAP
        return {
            x: col * cellSize,
            y: row * cellSize,
        }
    }, [])

    // Check if position is valid
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
            const itemEndCol = item.position.col + itemSize.cols
            const itemEndRow = item.position.row + itemSize.rows
            const newEndCol = col + cols
            const newEndRow = row + rows

            const overlapsX = col < itemEndCol && newEndCol > item.position.col
            const overlapsY = row < itemEndRow && newEndRow > item.position.row

            if (overlapsX && overlapsY) {
                return false
            }
        }

        return true
    }, [items, columns, maxRows, collisionDetection])

    // ============ Drag Operations ============

    const startDrag = useCallback((itemId: string, startPosition: { x: number; y: number }) => {
        const item = items.find(i => i.id === itemId)
        if (!item) return

        setIsDragging(true)
        setDraggedItemId(itemId)
        setPreviewPosition(item.position)
        dragStartPos.current = startPosition
        originalPosition.current = item.position
    }, [items])

    const updateDrag = useCallback((currentPosition: { x: number; y: number }) => {
        if (!isDragging || !draggedItem || !dragStartPos.current) return

        const gridPos = pixelToGrid(currentPosition.x, currentPosition.y)

        // Only update preview if position is valid
        if (canPlaceAt(draggedItem.size, gridPos.col, gridPos.row, draggedItem.id)) {
            setPreviewPosition(gridPos)
        }
    }, [isDragging, draggedItem, pixelToGrid, canPlaceAt])

    const endDrag = useCallback(() => {
        if (!isDragging || !draggedItem || !previewPosition) {
            cancelDrag()
            return
        }

        const oldPosition = originalPosition.current
        const newPosition = previewPosition

        // Move item if position changed
        if (oldPosition && (oldPosition.col !== newPosition.col || oldPosition.row !== newPosition.row)) {
            setItems(prev => prev.map(item =>
                item.id === draggedItem.id
                    ? { ...item, position: newPosition }
                    : item
            ))

            onDragEnd?.(draggedItem, newPosition)
            onItemMove?.(draggedItem.id, oldPosition, newPosition)
        }

        // Reset drag state
        setIsDragging(false)
        setDraggedItemId(null)
        setPreviewPosition(null)
        dragStartPos.current = null
        originalPosition.current = null
    }, [isDragging, draggedItem, previewPosition, onDragEnd, onItemMove])

    const cancelDrag = useCallback(() => {
        setIsDragging(false)
        setDraggedItemId(null)
        setPreviewPosition(null)
        dragStartPos.current = null
        originalPosition.current = null
    }, [])

    // ============ Item Operations ============

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

    const addItem = useCallback((item: Omit<DragAndDropItem, 'position'>): DragAndDropItem | null => {
        const position = findNextAvailablePosition(item.size)
        if (!position) return null

        const newItem: DragAndDropItem = {
            ...item,
            position,
        }

        setItems(prev => [...prev, newItem])
        return newItem
    }, [findNextAvailablePosition])

    const removeItem = useCallback((itemId: string) => {
        setItems(prev => prev.filter(item => item.id !== itemId))
    }, [])

    const moveItem = useCallback((itemId: string, newPosition: { col: number; row: number }): boolean => {
        const item = items.find(i => i.id === itemId)
        if (!item) return false

        if (!canPlaceAt(item.size, newPosition.col, newPosition.row, itemId)) {
            return false
        }

        const oldPosition = item.position
        setItems(prev => prev.map(i =>
            i.id === itemId ? { ...i, position: newPosition } : i
        ))

        onItemMove?.(itemId, oldPosition, newPosition)
        return true
    }, [items, canPlaceAt, onItemMove])

    const resizeItem = useCallback((itemId: string, newSize: BentoSize): boolean => {
        const item = items.find(i => i.id === itemId)
        if (!item) return false

        if (!canPlaceAt(newSize, item.position.col, item.position.row, itemId)) {
            return false
        }

        setItems(prev => prev.map(i =>
            i.id === itemId ? { ...i, size: newSize } : i
        ))

        onItemResize?.(itemId, newSize)
        return true
    }, [items, canPlaceAt, onItemResize])

    // ============ Keyboard Support ============

    useEffect(() => {
        if (!isDragging) return

        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === 'Escape') {
                cancelDrag()
            }
        }

        window.addEventListener('keydown', handleKeyDown)
        return () => window.removeEventListener('keydown', handleKeyDown)
    }, [isDragging, cancelDrag])

    return {
        // State
        items,
        isDragging,
        draggedItem,
        previewPosition,

        // Grid info
        columns,

        // Actions
        startDrag,
        updateDrag,
        endDrag,
        cancelDrag,

        // Item operations
        addItem,
        removeItem,
        moveItem,
        resizeItem,

        // Utilities
        canPlaceAt,
        pixelToGrid,
        gridToPixel,
    }
}

// ============ Utility Functions ============

/**
 * 计算自动排列后的项目位置
 */
export const autoArrangeItems = (
    items: DragAndDropItem[],
    columns: number
): DragAndDropItem[] => {
    const sorted = [...items].sort((a, b) => {
        if (a.position.row !== b.position.row) return a.position.row - b.position.row
        return a.position.col - b.position.col
    })

    const result: DragAndDropItem[] = []
    const occupancy: boolean[][] = []

    for (const item of sorted) {
        const { cols, rows } = parseBentoSize(item.size)

        // Find first available position
        let placed = false
        for (let row = 0; row < 1000 && !placed; row++) {
            for (let col = 0; col <= columns - cols && !placed; col++) {
                let canPlace = true

                for (let r = row; r < row + rows && canPlace; r++) {
                    for (let c = col; c < col + cols && canPlace; c++) {
                        if (occupancy[r]?.[c]) {
                            canPlace = false
                        }
                    }
                }

                if (canPlace) {
                    // Place item
                    const newItem = { ...item, position: { col, row } }
                    result.push(newItem)

                    // Mark occupancy
                    for (let r = row; r < row + rows; r++) {
                        if (!occupancy[r]) occupancy[r] = []
                        for (let c = col; c < col + cols; c++) {
                            occupancy[r][c] = true
                        }
                    }

                    placed = true
                }
            }
        }
    }

    return result
}
