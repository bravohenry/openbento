<!-- 🔄 UPDATE ME: When files in this folder change, update this document. -->

# bento/grid

> **网格布局系统。实现 CSS Grid 布局、响应式断点和单元格管理。**
> 负责将卡片正确放置在网格中，处理不同尺寸卡片的占位。

## Files

| File | Role | Purpose |
|------|------|---------|
| `index.ts` | Entry | 重新导出公开 API |
| `BentoGrid.tsx` | Core | 网格容器组件 |
| `BentoGrid.types.ts` | Types | 网格相关类型定义 |
| `BentoCell.tsx` | Component | 单元格组件 |
| `useGridLayout.ts` | Hook | 网格布局计算逻辑 |
