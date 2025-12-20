/**
 * OpenBento - Drag and Drop Module
 * 
 * 基于 @dnd-kit + Framer Motion 的专业拖放系统
 */

// 新系统 - 基于 @dnd-kit
export { BentoDndProvider, useBentoDndState } from './BentoDndContext'
export type { BentoItem, BentoDndContextValue, BentoDndProviderProps } from './BentoDndContext'

export { SortableCard, CardOverlay, DragHandle } from './SortableCard'
export type { SortableCardProps, CardOverlayProps, DragHandleProps } from './SortableCard'

// 速度感知碰撞检测
export {
    velocityAwareCollision,
    createVelocityAwareCollision,
    updateVelocity,
    resetVelocity,
    getVelocity,
} from './velocityAwareCollision'

// 重新导出 @dnd-kit 常用组件
export {
    DndContext,
    DragOverlay,
    closestCenter,
    closestCorners,
    rectIntersection,
    pointerWithin,
} from '@dnd-kit/core'

export {
    SortableContext,
    useSortable,
    arrayMove,
    rectSortingStrategy,
    verticalListSortingStrategy,
    horizontalListSortingStrategy,
} from '@dnd-kit/sortable'

export { CSS } from '@dnd-kit/utilities'

export type {
    DragStartEvent,
    DragEndEvent,
    DragMoveEvent,
    DragOverEvent,
    UniqueIdentifier,
} from '@dnd-kit/core'

