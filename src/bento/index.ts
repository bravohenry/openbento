/**
 * 🔄 UPDATE ME: If this file changes, update this header AND /src/bento/ARCHITECTURE.md
 *
 * @input  - core, grid, dnd 子模块
 * @output - Bento 模块所有公开 API
 * @pos    - Bento 系统的统一入口点
 */

export * from './core'
export * from './grid'

// DnD: 排除 GridItem 以避免与 ./grid 的 GridItem 冲突
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
