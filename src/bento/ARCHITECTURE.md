<!-- 🔄 UPDATE ME: When modules in /src/bento change, update this document. -->

# Bento Module

> **Core implementation of the Bento card system. Provides card rendering, grid layout, drag-and-drop interactions, and editor functionality.**
> This is the heart of OpenBento, where all user-visible card functionality resides.

## Submodules

| Submodule | Purpose | Key Exports |
|-----------|---------|-------------|
| `core/` | Atomic card components | BentoCard, BentoContext, useBentoCard |
| `dnd/` | Drag-and-drop interaction system | DndProvider, Draggable, Droppable |
| `editor/` | Editor UI | EditorContext, EditorToolbar, WidgetEditOverlay |
| `grid/` | Grid layout | BentoGrid, BentoCell, useGridLayout |
| `widgets/` | Specific card types | LinkWidget, TextWidget, MapWidget... |

## Dependency Flow

```
editor/ ──► widgets/
    │          │
    ▼          ▼
  dnd/ ◄──► grid/
    │          │
    └────► core/ ◄────┘
```

## Entry Point

`index.ts` — Re-exports all public APIs
