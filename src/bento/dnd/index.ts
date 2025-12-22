/**
 * 🔄 UPDATE ME: If this file changes, update this header AND /src/bento/dnd/ARCHITECTURE.md
 *
 * @input  - GridDndProvider, @dnd-kit/core
 * @output - GridDndProvider, DraggableGridItem, swapItems, useGridDnd
 * @pos    - DnD 模块入口，只导出基于 swap 的网格拖拽系统
 */

// Grid-based swap DnD system (主力系统)
export { GridDndProvider, DraggableGridItem, swapItems, useGridDnd } from './GridDndProvider'
export type { GridItem } from './GridDndProvider'

// 重新导出 @dnd-kit 常用组件 (供外部扩展使用)
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
