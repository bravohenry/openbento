<!-- 🔄 UPDATE ME: When subfolders in this folder change, update this document. -->

# design-system/primitives

> **原子级组件。最基础的布局和文本组件，无业务逻辑。**
> 所有复合组件都由这些原子组合而成。

## Component Folders

| Folder | Component | Purpose |
|--------|-----------|---------|
| `Box/` | Box | 通用容器，支持 style props |
| `Flex/` | Flex | Flexbox 布局容器 |
| `Stack/` | Stack | 堆叠布局 (VStack/HStack) |
| `Text/` | Text | 文本渲染，支持 variant |

## Files

| File | Role | Purpose |
|------|------|---------|
| `index.ts` | Entry | 重新导出所有原子组件 |
