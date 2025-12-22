<!-- 🔄 UPDATE ME: When modules in /src/design-system change, update this document. -->

# Design System

> **OpenBento 的设计系统。提供设计令牌、原子组件和复合组件模式。**
> 遵循 Atomic Design 原则：Tokens → Primitives → Patterns。

## Submodules

| Submodule | Layer | Purpose |
|-----------|-------|---------|
| `tokens/` | Foundation | 设计令牌 (颜色、间距、阴影等) |
| `foundation/` | Foundation | 基础设施 (主题、网格) |
| `primitives/` | Atoms | 原子组件 (Box, Flex, Text, Stack) |
| `patterns/` | Molecules | 复合组件 (Button, Card, Modal 等) |
| `utils/` | Utilities | 工具函数 (cn, polymorphic) |

## Design Philosophy

```
tokens/  ──► foundation/  ──► primitives/  ──► patterns/
 (Data)      (Infra)         (Atoms)          (Molecules)
```

## Entry Point

`index.ts` — 重新导出所有公开 API
