<!-- 🔄 UPDATE ME: When modules in /src change, update this document. -->

# OpenBento Source Architecture

> **系统核心代码目录。包含所有业务逻辑、UI 组件和设计系统。**
> 每个子模块都有独立的 `ARCHITECTURE.md`，遵循分形文档结构。

## Modules

| Module | Purpose | Key Exports |
|--------|---------|-------------|
| `app/` | Next.js 路由和页面 | Pages, Layouts |
| `bento/` | Bento 卡片核心系统 | BentoCard, BentoGrid, DnD, Widgets |
| `design-system/` | 设计系统 | Tokens, Primitives, Patterns |
| `components/` | 通用 UI 组件 | Shared components |
| `lib/` | 工具函数库 | Utilities, Helpers |
| `stores/` | 状态管理 | Zustand stores |
| `styles/` | 全局样式 | CSS, Themes |
| `types/` | TypeScript 类型定义 | Shared types |

## Dependency Flow

```
app/ ──────────────┐
                   ▼
              bento/ ◄────── design-system/
                   │              │
                   ▼              ▼
              stores/ ◄────── lib/
```

## File Naming Conventions

- `index.ts` — 模块入口，重新导出公开 API
- `*.types.ts` — 类型定义
- `*.styles.ts` — 样式常量
- `*.test.ts` — 测试文件
