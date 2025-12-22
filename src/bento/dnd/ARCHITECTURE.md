<!-- 🔄 UPDATE ME: When files in this folder change, update this document. -->

# bento/dnd

> **拖拽系统。基于 @dnd-kit/core 实现卡片交换式拖放。**
> 使用 swap 逻辑而非列表排序，更适合 Bento 网格布局。

## Files

| File | Role | Purpose |
|------|------|---------|
| `index.ts` | Entry | 重新导出公开 API |
| `GridDndProvider.tsx` | Core | 网格拖拽上下文提供者 + DraggableGridItem |

## Exports

- `GridDndProvider` — DnD 上下文
- `DraggableGridItem` — 可拖拽网格项包装
- `swapItems` — 数组交换工具
- `useGridDnd` — 获取拖拽状态

## Removed (Cleanup)

以下文件已在架构优化中删除：
- ~~`DndProvider.tsx`~~ (自定义实现，未使用)
- ~~`BentoDndContext.tsx`~~ (基于 sortable，已被替代)
- ~~`Draggable.tsx`~~, ~~`Droppable.tsx`~~, ~~`DragOverlay.tsx`~~
- ~~`SortableCard.tsx`~~, ~~`velocityAwareCollision.ts`~~
- ~~`useDragAndDrop.ts`~~, ~~`dnd.types.ts`~~
