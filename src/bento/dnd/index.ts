/**
 * [INPUT]: (GridDndProvider, @dnd-kit/core) - GridDndProvider, @dnd-kit/core
 * [OUTPUT]: (GridDndProvider, DraggableGridItem, swapItems, useGridDnd) - GridDndProvider, DraggableGridItem, swapItems, useGridDnd
 * [POS]: Located at /bento/dnd module entry, only exports swap-based grid drag-and-drop system.
 * 
 * [PROTOCOL]:
 * 1. Once this file's logic changes, this Header must be synchronized immediately.
 * 2. After update, must check upward whether /src/bento/dnd/.folder.md description is still accurate.
 */

// Grid-based swap DnD system (main system)
export { GridDndProvider, DraggableGridItem, swapItems, useGridDnd } from './GridDndProvider'
export type { GridItem } from './GridDndProvider'

// Re-export @dnd-kit common components (for external extension use)
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
