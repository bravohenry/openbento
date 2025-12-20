/**
 * OpenBento - Drag and Drop Module
 * 
 * 导出所有拖放相关组件和工具
 */

// Provider
export { DndProvider, useDndContext, useIsDragging, useActiveItem, useDragPosition, useGridPreviewPosition, registerDroppable } from './DndProvider'

// Components
export { Draggable, useDraggable } from './Draggable'
export { Droppable, useDroppable } from './Droppable'
export { DragOverlay, GridPreviewOverlay, DropIndicator } from './DragOverlay'

// Hooks
export { useDragAndDrop, autoArrangeItems } from './useDragAndDrop'

// Types
export type {
    DragItemType,
    DragItem,
    DropResult,
    DndState,
    DndAction,
    DndContextValue,
    DndProviderProps,
    DraggableProps,
    DraggableRenderProps,
    DroppableProps,
    DroppableRenderProps,
    DragOverlayProps,
    SensorOptions,
    PointerSensorOptions,
    KeyboardSensorOptions,
} from './dnd.types'

export type { DragAndDropItem, UseDragAndDropOptions, UseDragAndDropReturn } from './useDragAndDrop'
