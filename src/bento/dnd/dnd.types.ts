/**
 * OpenBento - Drag and Drop Types
 * 
 * DnD 系统类型定义
 */

import type { BentoSize } from '../core/BentoSizeMap'
import type { ReactNode } from 'react'

// ============ Core Types ============

export type DragItemType = 'bento-card' | 'widget' | 'custom'

export interface DragItem {
    /** 拖拽项 ID */
    id: string
    /** 拖拽项类型 */
    type: DragItemType
    /** 卡片尺寸 */
    size: BentoSize
    /** 原始位置 */
    sourcePosition: { col: number; row: number }
    /** 任意附加数据 */
    data?: unknown
}

export interface DropResult {
    /** 目标位置 */
    targetPosition: { col: number; row: number }
    /** 是否成功放置 */
    success: boolean
    /** 放置区域 ID */
    droppableId?: string
}

// ============ State Types ============

export interface DndState {
    /** 是否正在拖拽 */
    isDragging: boolean
    /** 当前拖拽的项 */
    activeItem: DragItem | null
    /** 拖拽预览位置 (像素) */
    dragPosition: { x: number; y: number } | null
    /** 网格预览位置 */
    gridPreviewPosition: { col: number; row: number } | null
    /** 当前悬停的放置区域 */
    activeDroppableId: string | null
    /** 是否可以放置 */
    canDrop: boolean
}

// ============ Action Types ============

export type DndAction =
    | { type: 'DRAG_START'; payload: { item: DragItem; position: { x: number; y: number } } }
    | { type: 'DRAG_MOVE'; payload: { position: { x: number; y: number }; gridPosition?: { col: number; row: number } } }
    | { type: 'DRAG_END' }
    | { type: 'SET_ACTIVE_DROPPABLE'; payload: string | null }
    | { type: 'SET_CAN_DROP'; payload: boolean }
    | { type: 'RESET' }

// ============ Context Types ============

export interface DndContextValue {
    state: DndState
    dispatch: React.Dispatch<DndAction>
    // Helpers
    startDrag: (item: DragItem, position: { x: number; y: number }) => void
    updateDrag: (position: { x: number; y: number }, gridPosition?: { col: number; row: number }) => void
    endDrag: () => void
    setActiveDroppable: (id: string | null) => void
    setCanDrop: (canDrop: boolean) => void
}

// ============ Component Props ============

export interface DndProviderProps {
    children: ReactNode
    /** 放置时回调 */
    onDrop?: (item: DragItem, result: DropResult) => void
    /** 拖拽开始回调 */
    onDragStart?: (item: DragItem) => void
    /** 拖拽结束回调 */
    onDragEnd?: (item: DragItem | null) => void
    /** 是否启用键盘导航 */
    enableKeyboard?: boolean
    /** 是否启用触摸拖拽 */
    enableTouch?: boolean
}

export interface DraggableProps {
    /** 唯一 ID */
    id: string
    /** 拖拽项类型 */
    type?: DragItemType
    /** 卡片尺寸 */
    size?: BentoSize
    /** 网格位置 */
    position?: { col: number; row: number }
    /** 是否禁用 */
    disabled?: boolean
    /** 子元素 */
    children: ReactNode | ((props: DraggableRenderProps) => ReactNode)
    /** 附加数据 */
    data?: unknown
    /** 拖拽手柄选择器 */
    handle?: string
}

export interface DraggableRenderProps {
    isDragging: boolean
    isOver: boolean
    dragHandleProps: {
        draggable: boolean
        onDragStart: (e: React.DragEvent) => void
        onDrag: (e: React.DragEvent) => void
        onDragEnd: (e: React.DragEvent) => void
    }
    style: React.CSSProperties
}

export interface DroppableProps {
    /** 唯一 ID */
    id: string
    /** 接受的拖拽类型 */
    accepts?: DragItemType[]
    /** 是否禁用 */
    disabled?: boolean
    /** 子元素 */
    children: ReactNode | ((props: DroppableRenderProps) => ReactNode)
    /** 自定义放置验证 */
    canDropItem?: (item: DragItem) => boolean
    /** 放置时回调 */
    onDrop?: (item: DragItem) => void
}

export interface DroppableRenderProps {
    isOver: boolean
    canDrop: boolean
    activeItem: DragItem | null
}

export interface DragOverlayProps {
    /** 自定义渲染 */
    children?: ReactNode | ((item: DragItem) => ReactNode)
    /** 偏移量 */
    offset?: { x: number; y: number }
    /** 缩放 */
    scale?: number
    /** 透明度 */
    opacity?: number
    /** 是否显示阴影 */
    showShadow?: boolean
    /** 动画类型 */
    animation?: 'none' | 'spring' | 'smooth'
}

// ============ Sensor Types ============

export interface SensorOptions {
    /** 拖拽激活延迟 (ms) */
    activationDelay?: number
    /** 拖拽激活距离 (px) */
    activationDistance?: number
}

export interface PointerSensorOptions extends SensorOptions {
    /** 是否启用触摸 */
    enableTouch?: boolean
}

export interface KeyboardSensorOptions extends SensorOptions {
    /** 移动步长 */
    step?: number
}
