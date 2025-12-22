<!-- 🔄 UPDATE ME: When files in this folder change, update this document. -->

# design-system/utils

> **工具函数库。提供样式合并、多态组件等通用能力。**
> 被整个设计系统和业务代码广泛使用。

## Files

| File | Role | Purpose |
|------|------|---------|
| `index.ts` | Entry | 重新导出所有工具 |
| `cn.ts` | Utility | className 合并 (clsx + tailwind-merge) |
| `polymorphic.ts` | Utility | 多态组件类型工具 (as prop) |
| `styleProps.ts` | Utility | Style props 解析和转换 |
