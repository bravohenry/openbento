/**
 * OpenBento - useBentoCard Hook
 * 
 * Custom Hook for managing a single BentoCard's state and interactions
 * Includes size, position, drag, selection state, etc.
 */

import { useState, useCallback, useRef, useEffect } from 'react'
import type { BentoSize } from './BentoSizeMap'
import { getBentoSize } from './BentoSizeMap'

// ============ Types ============

export interface UseBentoCardOptions {
    /** Card ID */
    id: string
    /** Initial size */
    size?: BentoSize
    /** Initial position */
    initialPosition?: { x: number; y: number }
    /** Whether draggable */
    draggable?: boolean
    /** Whether resizable */
    resizable?: boolean
    /** Whether selectable */
    selectable?: boolean
    /** Drag callbacks */
    onDragStart?: () => void
    onDragEnd?: (position: { x: number; y: number }) => void
    onDrag?: (position: { x: number; y: number }) => void
    /** 选中回调 */
    onSelect?: () => void
    onDeselect?: () => void
    /** 调整大小回调 */
    onResize?: (size: BentoSize) => void
}

export interface UseBentoCardReturn {
    // State
    size: BentoSize
    sizeConfig: ReturnType<typeof getBentoSize>
    position: { x: number; y: number }
    isHovered: boolean
    isSelected: boolean
    isDragging: boolean
    isResizing: boolean

    // Refs
    cardRef: React.RefObject<HTMLDivElement | null>

    // Handlers
    handleMouseEnter: () => void
    handleMouseLeave: () => void
    handleClick: (e: React.MouseEvent) => void
    handleDragStart: (e: React.DragEvent) => void
    handleDragEnd: (e: React.DragEvent) => void
    handleDrag: (e: React.DragEvent) => void

    // Actions
    setSize: (size: BentoSize) => void
    setPosition: (position: { x: number; y: number }) => void
    select: () => void
    deselect: () => void

    // Computed
    style: React.CSSProperties
}

// ============ Hook ============

export const useBentoCard = (options: UseBentoCardOptions): UseBentoCardReturn => {
    const {
        id,
        size: initialSize = '1x1',
        initialPosition = { x: 0, y: 0 },
        draggable = false,
        resizable = false,
        selectable = true,
        onDragStart,
        onDragEnd,
        onDrag,
        onSelect,
        onDeselect,
        onResize,
    } = options

    // State
    const [size, setSize] = useState<BentoSize>(initialSize)
    const [position, setPosition] = useState(initialPosition)
    const [isHovered, setIsHovered] = useState(false)
    const [isSelected, setIsSelected] = useState(false)
    const [isDragging, setIsDragging] = useState(false)
    const [isResizing, setIsResizing] = useState(false)

    // Refs
    const cardRef = useRef<HTMLDivElement>(null)
    const dragStartPosition = useRef<{ x: number; y: number } | null>(null)

    // Size config
    const sizeConfig = getBentoSize(size)

    // Handlers
    const handleMouseEnter = useCallback(() => {
        setIsHovered(true)
    }, [])

    const handleMouseLeave = useCallback(() => {
        setIsHovered(false)
    }, [])

    const handleClick = useCallback((e: React.MouseEvent) => {
        if (!selectable) return

        e.stopPropagation()

        if (!isSelected) {
            setIsSelected(true)
            onSelect?.()
        }
    }, [selectable, isSelected, onSelect])

    const handleDragStart = useCallback((e: React.DragEvent) => {
        if (!draggable) return

        setIsDragging(true)
        dragStartPosition.current = { x: e.clientX, y: e.clientY }

        // Set drag image
        if (cardRef.current) {
            e.dataTransfer.setDragImage(cardRef.current, 0, 0)
        }

        e.dataTransfer.setData('text/plain', id)
        e.dataTransfer.effectAllowed = 'move'

        onDragStart?.()
    }, [draggable, id, onDragStart])

    const handleDragEnd = useCallback((e: React.DragEvent) => {
        if (!draggable) return

        setIsDragging(false)

        if (dragStartPosition.current) {
            const deltaX = e.clientX - dragStartPosition.current.x
            const deltaY = e.clientY - dragStartPosition.current.y
            const newPosition = {
                x: position.x + deltaX,
                y: position.y + deltaY,
            }
            setPosition(newPosition)
            onDragEnd?.(newPosition)
        }

        dragStartPosition.current = null
    }, [draggable, position, onDragEnd])

    const handleDrag = useCallback((e: React.DragEvent) => {
        if (!draggable || !dragStartPosition.current) return
        if (e.clientX === 0 && e.clientY === 0) return // Ignore invalid drag events

        const deltaX = e.clientX - dragStartPosition.current.x
        const deltaY = e.clientY - dragStartPosition.current.y
        const newPosition = {
            x: position.x + deltaX,
            y: position.y + deltaY,
        }

        onDrag?.(newPosition)
    }, [draggable, position, onDrag])

    const select = useCallback(() => {
        if (selectable && !isSelected) {
            setIsSelected(true)
            onSelect?.()
        }
    }, [selectable, isSelected, onSelect])

    const deselect = useCallback(() => {
        if (isSelected) {
            setIsSelected(false)
            onDeselect?.()
        }
    }, [isSelected, onDeselect])

    const handleSetSize = useCallback((newSize: BentoSize) => {
        setSize(newSize)
        onResize?.(newSize)
    }, [onResize])

    // Click outside to deselect
    useEffect(() => {
        if (!isSelected) return

        const handleClickOutside = (e: MouseEvent) => {
            if (cardRef.current && !cardRef.current.contains(e.target as Node)) {
                deselect()
            }
        }

        document.addEventListener('mousedown', handleClickOutside)
        return () => document.removeEventListener('mousedown', handleClickOutside)
    }, [isSelected, deselect])

    // Computed style
    const style: React.CSSProperties = {
        width: sizeConfig.width,
        height: sizeConfig.height,
        transform: `translate(${position.x}px, ${position.y}px)`,
        cursor: draggable ? (isDragging ? 'grabbing' : 'grab') : 'pointer',
        transition: isDragging ? 'none' : 'transform 0.2s ease-out',
        opacity: isDragging ? 0.8 : 1,
        zIndex: isDragging ? 1000 : isSelected ? 10 : 1,
        outline: isSelected ? '2px solid var(--color-brand-primary, #FF6B35)' : 'none',
        outlineOffset: 2,
    }

    return {
        // State
        size,
        sizeConfig,
        position,
        isHovered,
        isSelected,
        isDragging,
        isResizing,

        // Refs
        cardRef,

        // Handlers
        handleMouseEnter,
        handleMouseLeave,
        handleClick,
        handleDragStart,
        handleDragEnd,
        handleDrag,

        // Actions
        setSize: handleSetSize,
        setPosition,
        select,
        deselect,

        // Computed
        style,
    }
}

// ============ Additional Hooks ============

/**
 * Hook for card resize functionality
 */
export const useBentoCardResize = (
    currentSize: BentoSize,
    onResize: (size: BentoSize) => void
) => {
    const [isResizing, setIsResizing] = useState(false)
    const [resizePreview, setResizePreview] = useState<BentoSize | null>(null)

    const availableSizes: BentoSize[] = ['1x1', '2x1', '1x2', '2x2', '3x1', '3x2']

    const startResize = useCallback(() => {
        setIsResizing(true)
        setResizePreview(currentSize)
    }, [currentSize])

    const updateResizePreview = useCallback((size: BentoSize) => {
        setResizePreview(size)
    }, [])

    const confirmResize = useCallback(() => {
        if (resizePreview && resizePreview !== currentSize) {
            onResize(resizePreview)
        }
        setIsResizing(false)
        setResizePreview(null)
    }, [resizePreview, currentSize, onResize])

    const cancelResize = useCallback(() => {
        setIsResizing(false)
        setResizePreview(null)
    }, [])

    return {
        isResizing,
        resizePreview,
        availableSizes,
        startResize,
        updateResizePreview,
        confirmResize,
        cancelResize,
    }
}
