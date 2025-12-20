/**
 * OpenBento - Draggable Component
 * 
 * 可拖拽组件包装器
 */

import React, { useCallback, useRef, useState, useEffect } from 'react'
import type { DraggableProps, DraggableRenderProps, DragItem } from './dnd.types'
import { useDndContext } from './DndProvider'

// ============ Draggable Component ============

export const Draggable: React.FC<DraggableProps> = ({
    id,
    type = 'bento-card',
    size = '1x1',
    position = { col: 0, row: 0 },
    disabled = false,
    children,
    data,
    handle,
}) => {
    const { state, startDrag, updateDrag, endDrag } = useDndContext()
    const elementRef = useRef<HTMLDivElement>(null)
    const [isLocalDragging, setIsLocalDragging] = useState(false)

    // Check if this item is the one being dragged
    const isDragging = state.isDragging && state.activeItem?.id === id
    const isOver = state.activeDroppableId !== null && isDragging

    // Create drag item
    const createDragItem = useCallback((): DragItem => ({
        id,
        type,
        size,
        sourcePosition: position,
        data,
    }), [id, type, size, position, data])

    // Handle drag start
    const handleDragStart = useCallback((e: React.DragEvent) => {
        if (disabled) {
            e.preventDefault()
            return
        }

        // Check if drag started from handle
        if (handle && elementRef.current) {
            const handleElement = elementRef.current.querySelector(handle)
            if (handleElement && !handleElement.contains(e.target as Node)) {
                e.preventDefault()
                return
            }
        }

        setIsLocalDragging(true)

        // Set drag data
        e.dataTransfer.setData('application/json', JSON.stringify(createDragItem()))
        e.dataTransfer.effectAllowed = 'move'

        // Set custom drag image
        if (elementRef.current) {
            const rect = elementRef.current.getBoundingClientRect()
            const offsetX = e.clientX - rect.left
            const offsetY = e.clientY - rect.top
            e.dataTransfer.setDragImage(elementRef.current, offsetX, offsetY)
        }

        // Start drag in context
        startDrag(createDragItem(), { x: e.clientX, y: e.clientY })
    }, [disabled, handle, createDragItem, startDrag])

    // Handle drag
    const handleDrag = useCallback((e: React.DragEvent) => {
        // Ignore invalid coordinates (happens at drag end)
        if (e.clientX === 0 && e.clientY === 0) return

        updateDrag({ x: e.clientX, y: e.clientY })
    }, [updateDrag])

    // Handle drag end
    const handleDragEnd = useCallback((e: React.DragEvent) => {
        setIsLocalDragging(false)
        endDrag()
    }, [endDrag])

    // Drag handle props for render props pattern
    const dragHandleProps = {
        draggable: !disabled,
        onDragStart: handleDragStart,
        onDrag: handleDrag,
        onDragEnd: handleDragEnd,
    }

    // Computed styles
    const style: React.CSSProperties = {
        cursor: disabled ? 'default' : 'grab',
        opacity: isDragging ? 0.5 : 1,
        transition: isDragging ? 'none' : 'opacity 0.2s ease',
        touchAction: 'none', // Prevent touch scrolling during drag
    }

    // Render props
    const renderProps: DraggableRenderProps = {
        isDragging,
        isOver,
        dragHandleProps,
        style,
    }

    // Handle render props pattern
    if (typeof children === 'function') {
        return (
            <div ref={elementRef} {...dragHandleProps} style={style}>
                {children(renderProps)}
            </div>
        )
    }

    return (
        <div
            ref={elementRef}
            className={`draggable ${isDragging ? 'draggable--dragging' : ''} ${disabled ? 'draggable--disabled' : ''}`}
            {...dragHandleProps}
            style={style}
            data-draggable-id={id}
            data-dragging={isDragging}
        >
            {children}
        </div>
    )
}

// ============ useDraggable Hook ============

interface UseDraggableOptions {
    id: string
    type?: 'bento-card' | 'widget' | 'custom'
    size?: '1x1' | '2x1' | '1x2' | '2x2'
    position?: { col: number; row: number }
    disabled?: boolean
    data?: unknown
}

export const useDraggable = (options: UseDraggableOptions) => {
    const {
        id,
        type = 'bento-card',
        size = '1x1',
        position = { col: 0, row: 0 },
        disabled = false,
        data,
    } = options

    const { state, startDrag, updateDrag, endDrag } = useDndContext()
    const nodeRef = useRef<HTMLElement | null>(null)

    const isDragging = state.isDragging && state.activeItem?.id === id

    const createDragItem = useCallback((): DragItem => ({
        id,
        type,
        size,
        sourcePosition: position,
        data,
    }), [id, type, size, position, data])

    const setNodeRef = useCallback((node: HTMLElement | null) => {
        nodeRef.current = node
    }, [])

    const attributes = {
        'data-draggable-id': id,
        'data-dragging': isDragging,
        role: 'button',
        tabIndex: disabled ? -1 : 0,
        'aria-disabled': disabled,
        'aria-grabbed': isDragging,
    }

    const listeners = disabled ? {} : {
        onDragStart: (e: React.DragEvent) => {
            e.dataTransfer.setData('application/json', JSON.stringify(createDragItem()))
            e.dataTransfer.effectAllowed = 'move'
            startDrag(createDragItem(), { x: e.clientX, y: e.clientY })
        },
        onDrag: (e: React.DragEvent) => {
            if (e.clientX === 0 && e.clientY === 0) return
            updateDrag({ x: e.clientX, y: e.clientY })
        },
        onDragEnd: () => {
            endDrag()
        },
    }

    const style: React.CSSProperties = {
        cursor: disabled ? 'default' : isDragging ? 'grabbing' : 'grab',
        opacity: isDragging ? 0.5 : 1,
        touchAction: 'none',
    }

    return {
        setNodeRef,
        attributes,
        listeners,
        isDragging,
        style,
        active: state.activeItem,
    }
}
