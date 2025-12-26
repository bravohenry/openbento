<!-- 🔄 UPDATE ME: When files in this folder change, update this document. -->

# bento/dnd

> **Drag-and-drop system. Implements card swap-style drag-and-drop based on @dnd-kit/core.**
> Uses swap logic instead of list sorting, more suitable for Bento grid layout.

## Files

| File | Role | Purpose |
|------|------|---------|
| `index.ts` | Entry | Re-exports public API |
| `GridDndProvider.tsx` | Core | Grid drag-and-drop context provider + DraggableGridItem |

## Exports

- `GridDndProvider` — DnD context
- `DraggableGridItem` — Draggable grid item wrapper
- `swapItems` — Array swap utility
- `useGridDnd` — Get drag-and-drop state

## Removed (Cleanup)

The following files have been removed during architecture optimization:
- ~~`DndProvider.tsx`~~ (Custom implementation, unused)
- ~~`BentoDndContext.tsx`~~ (Based on sortable, replaced)
- ~~`Draggable.tsx`~~, ~~`Droppable.tsx`~~, ~~`DragOverlay.tsx`~~
- ~~`SortableCard.tsx`~~, ~~`velocityAwareCollision.ts`~~
- ~~`useDragAndDrop.ts`~~, ~~`dnd.types.ts`~~
