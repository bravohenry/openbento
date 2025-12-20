/**
 * OpenBento - Droppable Component
 * 
 * 可放置区域组件
 */

import React, { useCallback, useRef, useEffect } from 'react'
import type { DroppableProps, DroppableRenderProps, DragItem, DropResult } from './dnd.types'
import { useDndContext, registerDroppable } from './DndProvider'

// ============ Droppable Component ============

export const Droppable: React.FC<DroppableProps> = ({
    id,
    accepts = ['bento-card', 'widget', 'custom'],
    disabled = false,
    children,
    canDropItem,
    onDrop,
}) => {
    const { state, setActiveDroppable, setCanDrop } = useDndContext()
    const elementRef = useRef<HTMLDivElement>(null)

    // Check if this droppable is active
    const isOver = state.activeDroppableId === id
    const activeItem = state.activeItem

    // Check if can accept the dragged item
    const canAccept = useCallback((item: DragItem | null): boolean => {
        if (!item || disabled) return false
        if (!accepts.includes(item.type)) return false
        if (canDropItem && !canDropItem(item)) return false
        return true
    }, [disabled, accepts, canDropItem])

    const canDrop = isOver && canAccept(activeItem)

    // Register drop handler
    useEffect(() => {
        const handleDrop = (item: DragItem): DropResult => {
            if (canAccept(item)) {
                onDrop?.(item)
                return {
                    targetPosition: state.gridPreviewPosition || { col: 0, row: 0 },
                    success: true,
                    droppableId: id,
                }
            }
            return {
                targetPosition: { col: 0, row: 0 },
                success: false,
            }
        }

        const unregister = registerDroppable(id, handleDrop)
        return () => { unregister() }
    }, [id, canAccept, onDrop, state.gridPreviewPosition])

    // Handle drag enter
    const handleDragEnter = useCallback((e: React.DragEvent) => {
        e.preventDefault()
        e.stopPropagation()

        if (disabled) return

        setActiveDroppable(id)
        setCanDrop(canAccept(activeItem))
    }, [disabled, id, setActiveDroppable, setCanDrop, canAccept, activeItem])

    // Handle drag over
    const handleDragOver = useCallback((e: React.DragEvent) => {
        e.preventDefault()
        e.stopPropagation()

        if (disabled) return

        // Update can drop status
        if (state.activeDroppableId === id) {
            setCanDrop(canAccept(activeItem))
        }
    }, [disabled, state.activeDroppableId, id, setCanDrop, canAccept, activeItem])

    // Handle drag leave
    const handleDragLeave = useCallback((e: React.DragEvent) => {
        e.preventDefault()
        e.stopPropagation()

        // Only handle if leaving this droppable (not entering a child)
        const relatedTarget = e.relatedTarget as Node | null
        if (elementRef.current && relatedTarget && elementRef.current.contains(relatedTarget)) {
            return
        }

        if (state.activeDroppableId === id) {
            setActiveDroppable(null)
            setCanDrop(false)
        }
    }, [state.activeDroppableId, id, setActiveDroppable, setCanDrop])

    // Handle drop
    const handleDrop = useCallback((e: React.DragEvent) => {
        e.preventDefault()
        e.stopPropagation()

        // The actual drop logic is handled by DndProvider via endDrag
        // This handler is mainly for preventing default behavior
    }, [])

    // Render props
    const renderProps: DroppableRenderProps = {
        isOver,
        canDrop,
        activeItem,
    }

    // Computed styles
    const style: React.CSSProperties = {
        position: 'relative',
        outline: isOver ? (canDrop ? '2px dashed #4CAF50' : '2px dashed #f44336') : 'none',
        outlineOffset: -2,
        transition: 'outline 0.15s ease',
        backgroundColor: isOver ? (canDrop ? 'rgba(76, 175, 80, 0.05)' : 'rgba(244, 67, 54, 0.05)') : undefined,
    }

    // Handle render props pattern
    if (typeof children === 'function') {
        return (
            <div
                ref={elementRef}
                className={`droppable ${isOver ? 'droppable--over' : ''} ${canDrop ? 'droppable--can-drop' : ''}`}
                onDragEnter={handleDragEnter}
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
                style={style}
                data-droppable-id={id}
            >
                {children(renderProps)}
            </div>
        )
    }

    return (
        <div
            ref={elementRef}
            className={`droppable ${isOver ? 'droppable--over' : ''} ${canDrop ? 'droppable--can-drop' : ''}`}
            onDragEnter={handleDragEnter}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            style={style}
            data-droppable-id={id}
        >
            {children}
        </div>
    )
}

// ============ useDroppable Hook ============

interface UseDroppableOptions {
    id: string
    accepts?: ('bento-card' | 'widget' | 'custom')[]
    disabled?: boolean
    canDropItem?: (item: DragItem) => boolean
    onDrop?: (item: DragItem) => void
}

export const useDroppable = (options: UseDroppableOptions) => {
    const {
        id,
        accepts = ['bento-card', 'widget', 'custom'],
        disabled = false,
        canDropItem,
        onDrop,
    } = options

    const { state, setActiveDroppable, setCanDrop } = useDndContext()
    const nodeRef = useRef<HTMLElement | null>(null)

    const isOver = state.activeDroppableId === id
    const activeItem = state.activeItem

    const canAccept = useCallback((item: DragItem | null): boolean => {
        if (!item || disabled) return false
        if (!accepts.includes(item.type)) return false
        if (canDropItem && !canDropItem(item)) return false
        return true
    }, [disabled, accepts, canDropItem])

    const canDrop = isOver && canAccept(activeItem)

    // Register drop handler
    useEffect(() => {
        const handleDrop = (item: DragItem): DropResult => {
            if (canAccept(item)) {
                onDrop?.(item)
                return {
                    targetPosition: state.gridPreviewPosition || { col: 0, row: 0 },
                    success: true,
                    droppableId: id,
                }
            }
            return {
                targetPosition: { col: 0, row: 0 },
                success: false,
            }
        }

        const unregister = registerDroppable(id, handleDrop)
        return () => { unregister() }
    }, [id, canAccept, onDrop, state.gridPreviewPosition])

    const setNodeRef = useCallback((node: HTMLElement | null) => {
        nodeRef.current = node
    }, [])

    const attributes = {
        'data-droppable-id': id,
        'data-is-over': isOver,
        'data-can-drop': canDrop,
    }

    const listeners = {
        onDragEnter: (e: React.DragEvent) => {
            e.preventDefault()
            if (disabled) return
            setActiveDroppable(id)
            setCanDrop(canAccept(activeItem))
        },
        onDragOver: (e: React.DragEvent) => {
            e.preventDefault()
            if (disabled) return
            if (state.activeDroppableId === id) {
                setCanDrop(canAccept(activeItem))
            }
        },
        onDragLeave: (e: React.DragEvent) => {
            e.preventDefault()
            const relatedTarget = e.relatedTarget as Node | null
            if (nodeRef.current && relatedTarget && nodeRef.current.contains(relatedTarget)) {
                return
            }
            if (state.activeDroppableId === id) {
                setActiveDroppable(null)
                setCanDrop(false)
            }
        },
        onDrop: (e: React.DragEvent) => {
            e.preventDefault()
        },
    }

    const style: React.CSSProperties = {
        outline: isOver ? (canDrop ? '2px dashed #4CAF50' : '2px dashed #f44336') : 'none',
        outlineOffset: -2,
        transition: 'outline 0.15s ease',
    }

    return {
        setNodeRef,
        attributes,
        listeners,
        isOver,
        canDrop,
        style,
        activeItem,
    }
}
