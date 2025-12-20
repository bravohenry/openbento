'use client'

/**
 * OpenBento - Bento DnD Context
 * 
 * 基于 @dnd-kit 的拖放上下文，提供游戏引擎级别的流畅体验
 * 支持实时预移动效果 - 拖动时其他卡片即时让位
 * 支持速度感知碰撞检测 - 快速拖动时更早触发让位
 */

import React, { useState, useMemo, useCallback, createContext, useContext } from 'react'
import {
    DndContext,
    DragOverlay,
    KeyboardSensor,
    PointerSensor,
    useSensor,
    useSensors,
    DragStartEvent,
    DragEndEvent,
    DragMoveEvent,
    DragOverEvent,
    UniqueIdentifier,
} from '@dnd-kit/core'
import {
    SortableContext,
    sortableKeyboardCoordinates,
    rectSortingStrategy,
    arrayMove,
} from '@dnd-kit/sortable'
import { velocityAwareCollision, updateVelocity, resetVelocity } from './velocityAwareCollision'

// ============ Types ============

export interface BentoItem {
    id: string
    size: '1x1' | '2x1' | '1x2' | '2x2'
    content: React.ReactNode
    data?: unknown
}

export interface BentoDndContextValue {
    items: BentoItem[]
    activeId: UniqueIdentifier | null
    activeItem: BentoItem | null
    isDragging: boolean
    overId: UniqueIdentifier | null
}

// ============ Context ============

const BentoDndStateContext = createContext<BentoDndContextValue | null>(null)

export const useBentoDndState = () => {
    const context = useContext(BentoDndStateContext)
    if (!context) {
        throw new Error('useBentoDndState must be used within BentoDndProvider')
    }
    return context
}

// ============ Provider Props ============

export interface BentoDndProviderProps {
    children: React.ReactNode
    items: BentoItem[]
    onItemsChange?: (items: BentoItem[]) => void
    onDragStart?: (item: BentoItem) => void
    onDragEnd?: (item: BentoItem, fromIndex: number, toIndex: number) => void
    renderOverlay?: (item: BentoItem) => React.ReactNode
    disabled?: boolean
}

// ============ Provider Component ============

export const BentoDndProvider: React.FC<BentoDndProviderProps> = ({
    children,
    items,
    onItemsChange,
    onDragStart,
    onDragEnd,
    renderOverlay,
    disabled = false,
}) => {
    const [activeId, setActiveId] = useState<UniqueIdentifier | null>(null)
    const [overId, setOverId] = useState<UniqueIdentifier | null>(null)
    const [dragStartIndex, setDragStartIndex] = useState<number>(-1)

    // 配置传感器
    const sensors = useSensors(
        useSensor(PointerSensor, {
            activationConstraint: {
                distance: 5,
            },
        }),
        useSensor(KeyboardSensor, {
            coordinateGetter: sortableKeyboardCoordinates,
        })
    )

    // 获取当前拖拽的项目
    const activeItem = useMemo(() => {
        if (!activeId) return null
        return items.find(item => item.id === activeId) ?? null
    }, [activeId, items])

    // 拖拽开始
    const handleDragStart = useCallback((event: DragStartEvent) => {
        const { active } = event
        setActiveId(active.id)
        resetVelocity() // 重置速度追踪

        const index = items.findIndex(i => i.id === active.id)
        setDragStartIndex(index)

        const item = items.find(i => i.id === active.id)
        if (item) {
            onDragStart?.(item)
        }
    }, [items, onDragStart])

    // 🔥 拖拽移动 - 追踪速度
    const handleDragMove = useCallback((event: DragMoveEvent) => {
        const { activatorEvent, delta } = event

        // 获取当前指针位置
        if (activatorEvent && 'clientX' in activatorEvent) {
            const pointerEvent = activatorEvent as PointerEvent
            updateVelocity(
                pointerEvent.clientX + delta.x,
                pointerEvent.clientY + delta.y
            )
        }
    }, [])

    // 🔥 拖拽过程中的实时预移动效果
    const handleDragOver = useCallback((event: DragOverEvent) => {
        const { active, over } = event

        setOverId(over?.id ?? null)

        if (!over || active.id === over.id) {
            return
        }

        const oldIndex = items.findIndex(item => item.id === active.id)
        const newIndex = items.findIndex(item => item.id === over.id)

        if (oldIndex !== -1 && newIndex !== -1 && oldIndex !== newIndex) {
            const newItems = arrayMove(items, oldIndex, newIndex)
            onItemsChange?.(newItems)
        }
    }, [items, onItemsChange])

    // 拖拽结束
    const handleDragEnd = useCallback((event: DragEndEvent) => {
        const { active } = event

        const currentIndex = items.findIndex(item => item.id === active.id)

        if (dragStartIndex !== -1 && currentIndex !== -1 && dragStartIndex !== currentIndex) {
            const item = items.find(i => i.id === active.id)
            if (item) {
                onDragEnd?.(item, dragStartIndex, currentIndex)
            }
        }

        setActiveId(null)
        setOverId(null)
        setDragStartIndex(-1)
        resetVelocity()
    }, [items, dragStartIndex, onDragEnd])

    // 拖拽取消
    const handleDragCancel = useCallback(() => {
        setActiveId(null)
        setOverId(null)
        setDragStartIndex(-1)
        resetVelocity()
    }, [])

    // Item IDs for SortableContext
    const itemIds = useMemo(() => items.map(item => item.id), [items])

    // Context value
    const contextValue: BentoDndContextValue = {
        items,
        activeId,
        activeItem,
        isDragging: activeId !== null,
        overId,
    }

    if (disabled) {
        return (
            <BentoDndStateContext.Provider value={contextValue}>
                {children}
            </BentoDndStateContext.Provider>
        )
    }

    return (
        <DndContext
            sensors={sensors}
            collisionDetection={velocityAwareCollision} // 🔥 速度感知碰撞检测
            onDragStart={handleDragStart}
            onDragMove={handleDragMove} // 🔥 追踪速度
            onDragOver={handleDragOver}
            onDragEnd={handleDragEnd}
            onDragCancel={handleDragCancel}
        >
            <BentoDndStateContext.Provider value={contextValue}>
                <SortableContext items={itemIds} strategy={rectSortingStrategy}>
                    {children}
                </SortableContext>

                <DragOverlay
                    adjustScale={false}
                    dropAnimation={{
                        duration: 300,
                        easing: 'cubic-bezier(0.32, 0.72, 0, 1)', // Apple easing
                    }}
                    style={{
                        cursor: 'grabbing',
                    }}
                >
                    {activeItem && renderOverlay ? (
                        <div style={{ opacity: 0.95 }}>
                            {renderOverlay(activeItem)}
                        </div>
                    ) : null}
                </DragOverlay>
            </BentoDndStateContext.Provider>
        </DndContext>
    )
}

export default BentoDndProvider
