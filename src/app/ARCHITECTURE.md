<!-- 🔄 UPDATE ME: When routes or pages in /src/app change, update this document. -->

# app/

> **Next.js 路由和页面。遵循 App Router 约定。**
> 每个子文件夹对应一个路由，page.tsx 是页面组件。

## Routes

| Route | Path | Purpose |
|-------|------|---------|
| `/` | `page.tsx` | 首页 |
| `/bento` | `bento/page.tsx` | Bento 展示页 |
| `/bento/editor` | `bento/editor/page.tsx` | Bento 编辑器（主功能页） |
| `/showcase` | `showcase/page.tsx` | 案例展示 |

## Key Files

| File | Role | Purpose |
|------|------|---------|
| `layout.tsx` | Layout | 根布局，包含全局样式和字体 |
| `globals.css` | Styles | 全局 CSS 和 Tailwind 配置 |
| `favicon.ico` | Asset | 网站图标 |
