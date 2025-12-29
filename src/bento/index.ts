/**
 * [INPUT]: (core, grid, dnd submodules) - core, grid, dnd submodules
 * [OUTPUT]: (All Bento module public APIs) - All Bento module public APIs
 * [POS]: Located at /bento unified entry point of Bento system.
 * 
 * [PROTOCOL]:
 * 1. Once this file's logic changes, this Header must be synchronized immediately.
 * 2. After update, must check upward whether /src/bento/.folder.md description is still accurate.
 */

export * from './core'
export * from './grid'

// DnD: Exclude GridItem to avoid conflict with ./grid's GridItem
export {
    GridDndProvider,
    DraggableGridItem,
    swapItems,
    useGridDnd,
    // Re-exports from @dnd-kit
    DndContext,
    DragOverlay,
    closestCenter,
    closestCorners,
    rectIntersection,
    pointerWithin,
    SortableContext,
    useSortable,
    arrayMove,
    rectSortingStrategy,
    verticalListSortingStrategy,
    horizontalListSortingStrategy,
    CSS,
} from './dnd'

export type {
    GridItem as DndGridItem, // Renamed to avoid conflict
    DragStartEvent,
    DragEndEvent,
    DragMoveEvent,
    DragOverEvent,
    UniqueIdentifier,
} from './dnd'
