<!-- 🔄 UPDATE ME: When modules in /src/bento change, update this document. -->

# Bento Module

> **Bento 卡片系统的核心实现。提供卡片渲染、网格布局、拖拽交互和编辑器功能。**
> 这是 OpenBento 的心脏，所有用户可见的卡片功能都在这里。

## Submodules

| Submodule | Purpose | Key Exports |
|-----------|---------|-------------|
| `core/` | 卡片原子组件 | BentoCard, BentoContext, useBentoCard |
| `dnd/` | 拖拽交互系统 | DndProvider, Draggable, Droppable |
| `editor/` | 编辑器 UI | EditorContext, EditorToolbar, WidgetEditOverlay |
| `grid/` | 网格布局 | BentoGrid, BentoCell, useGridLayout |
| `widgets/` | 具体卡片类型 | LinkWidget, TextWidget, MapWidget... |

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

`index.ts` — 重新导出所有公开 API
