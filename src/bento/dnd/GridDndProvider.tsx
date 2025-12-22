'use client'

/**
 * [INPUT]: (@dnd-kit/core, children, onSwap) - DndKit 库、子组件、交换回调
 * [OUTPUT]: (GridDndProvider, DraggableGridItem, swapItems, useGridDnd) - 拖拽提供者、可拖拽项、交换函数、拖拽 Hook
 * [POS]: 位于 /bento/dnd 的拖拽系统核心，基于交换逻辑而非列表排序，提供网格拖拽能力。
 * 
 * Features: Swap-based drag, Gray placeholder, Blue highlight, Smooth cursor following
 * 
 * [PROTOCOL]:
 * 1. 一旦本文件逻辑变更，必须同步更新此 Header。
 * 2. 更新后必须上浮检查 /src/bento/dnd/.folder.md 的描述是否依然准确。
 */

import React, { createContext, useContext, useState, useCallback, useRef } from 'react'
import {
    DndContext,
    DragOverlay,
    PointerSensor,
    useSensor,
    useSensors,
    DragStartEvent,
    DragEndEvent,
    DragOverEvent,
    closestCenter,
} from '@dnd-kit/core'
import { useDraggable, useDroppable } from '@dnd-kit/core'
import { snapCenterToCursor } from '@dnd-kit/modifiers'

// ============ Types ============

export interface GridItem {
    id: string
    size: '1x1' | '2x1' | '1x2' | '2x2' | 'bar'
    data?: unknown
}

interface GridDndContextValue {
    activeId: string | null
    overId: string | null
}

const GridDndContext = createContext<GridDndContextValue>({ activeId: null, overId: null })

export const useGridDnd = () => useContext(GridDndContext)

// ============ Provider ============

interface GridDndProviderProps {
    children: React.ReactNode
    items: GridItem[]
    onSwap?: (fromId: string, toId: string) => void
    onDragStart?: (id: string) => void
    onDragEnd?: () => void
    renderOverlay?: (item: GridItem) => React.ReactNode
}

export const GridDndProvider: React.FC<GridDndProviderProps> = ({
    children,
    items,
    onSwap,
    onDragStart,
    onDragEnd,
    renderOverlay,
}) => {
    const [activeId, setActiveId] = useState<string | null>(null)
    const [overId, setOverId] = useState<string | null>(null)

    const sensors = useSensors(
        useSensor(PointerSensor, {
            activationConstraint: {
                distance: 5, // Reduced to 5px for more responsive drag start
            },
        })
    )

    const activeItem = items.find(item => item.id === activeId)

    const handleDragStart = useCallback((event: DragStartEvent) => {
        const id = event.active.id as string
        setActiveId(id)
        onDragStart?.(id)
    }, [onDragStart])

    const handleDragOver = useCallback((event: DragOverEvent) => {
        const over = event.over
        setOverId(over?.id as string ?? null)
    }, [])

    const handleDragEnd = useCallback((event: DragEndEvent) => {
        const { active, over } = event

        if (over && active.id !== over.id) {
            onSwap?.(active.id as string, over.id as string)
        }

        setActiveId(null)
        setOverId(null)
        onDragEnd?.()
    }, [onSwap, onDragEnd])

    const handleDragCancel = useCallback(() => {
        setActiveId(null)
        setOverId(null)
    }, [])

    return (
        <DndContext
            sensors={sensors}
            collisionDetection={closestCenter}
            onDragStart={handleDragStart}
            onDragOver={handleDragOver}
            onDragEnd={handleDragEnd}
            onDragCancel={handleDragCancel}
        >
            <GridDndContext.Provider value={{ activeId, overId }}>
                {children}
            </GridDndContext.Provider>

            <DragOverlay
                dropAnimation={{
                    duration: 200,
                    easing: 'cubic-bezier(0.18, 0.67, 0.6, 1.22)',
                }}
                // Snap the dragged item center to cursor position
                modifiers={[snapCenterToCursor]}
            >
                {activeItem && renderOverlay ? (
                    <div style={{
                        cursor: 'grabbing',
                        transform: 'rotate(2deg) scale(1.03)',
                        boxShadow: '0 30px 60px -15px rgba(0, 0, 0, 0.3)',
                        borderRadius: '27px',
                    }}>
                        {renderOverlay(activeItem)}
                    </div>
                ) : null}
            </DragOverlay>
        </DndContext>
    )
}

// ============ Draggable Item ============

interface DraggableGridItemProps {
    id: string
    children: React.ReactNode
    disabled?: boolean
}

export const DraggableGridItem: React.FC<DraggableGridItemProps> = ({
    id,
    children,
    disabled = false,
}) => {
    const { activeId, overId } = useGridDnd()
    const isDragging = activeId === id
    const isDropTarget = overId === id && activeId !== id && activeId !== null

    const {
        attributes,
        listeners,
        setNodeRef: setDragRef,
    } = useDraggable({
        id,
        disabled,
    })

    const { setNodeRef: setDropRef } = useDroppable({
        id,
        disabled,
    })

    // Combine refs
    const setNodeRef = useCallback((node: HTMLElement | null) => {
        setDragRef(node)
        setDropRef(node)
    }, [setDragRef, setDropRef])

    return (
        <div
            ref={setNodeRef}
            style={{
                position: 'relative',
                cursor: disabled ? 'default' : 'grab',
                touchAction: 'none',
            }}
            {...attributes}
            {...listeners}
        >
            {/* Content - fades when dragging */}
            <div
                style={{
                    opacity: isDragging ? 0 : 1,
                    transition: 'opacity 150ms ease',
                }}
            >
                {children}
            </div>

            {/* Gray placeholder shown at ORIGINAL position when dragging this item */}
            {isDragging && (
                <div
                    style={{
                        position: 'absolute',
                        inset: 0,
                        backgroundColor: 'rgba(0, 0, 0, 0.06)',
                        borderRadius: '27px',
                        border: '2px dashed rgba(0, 0, 0, 0.15)',
                    }}
                />
            )}

            {/* Blue highlight shown when this is the DROP TARGET */}
            {isDropTarget && (
                <div
                    style={{
                        position: 'absolute',
                        inset: 0,
                        backgroundColor: 'rgba(0, 122, 255, 0.08)',
                        borderRadius: '27px',
                        border: '2px dashed rgba(0, 122, 255, 0.4)',
                        pointerEvents: 'none',
                        animation: 'pulse 1.5s ease-in-out infinite',
                    }}
                />
            )}
        </div>
    )
}

// ============ Helper: Swap items in array ============

export const swapItems = <T extends { id: string }>(
    items: T[],
    fromId: string,
    toId: string
): T[] => {
    const fromIndex = items.findIndex(item => item.id === fromId)
    const toIndex = items.findIndex(item => item.id === toId)

    if (fromIndex === -1 || toIndex === -1) {
        return items
    }

    const newItems = [...items]
    const temp = newItems[fromIndex]
    newItems[fromIndex] = newItems[toIndex]
    newItems[toIndex] = temp

    return newItems
}

export default GridDndProvider
