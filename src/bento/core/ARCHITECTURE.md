<!-- 🔄 UPDATE ME: When files in this folder change, update this document. -->

# bento/core

> **Bento 卡片的原子级实现。定义卡片的视觉结构、尺寸系统和组合模式。**
> 这是整个 Bento 系统的基础层，其他模块都依赖于此。

## Files

| File | Role | Purpose |
|------|------|---------|
| `index.ts` | Entry | 重新导出公开 API |
| `BentoCard.tsx` | Core | 卡片主组件，Compound Component 模式 |
| `BentoCard.types.ts` | Types | 卡片相关类型定义 |
| `BentoCard.styles.ts` | Styles | 卡片样式常量和 Tailwind 类 |
| `BentoContext.tsx` | Context | 卡片状态管理 Context |
| `BentoSizeMap.ts` | Config | 尺寸映射表 (1x1, 2x1, 2x2...) |
| `BentoSlots.tsx` | Slots | 卡片内容插槽组件 |
| `useBentoCard.ts` | Hook | 卡片交互逻辑 Hook |
