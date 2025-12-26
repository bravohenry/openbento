<!-- 🔄 UPDATE ME: When routes or pages in /src/app change, update this document. -->

# app/

> **Next.js routes and pages. Follows App Router conventions.**
> Each subfolder corresponds to a route, and page.tsx is the page component.

## Routes

| Route | Path | Purpose |
|-------|------|---------|
| `/` | `page.tsx` | Home page |
| `/bento` | `bento/page.tsx` | Bento showcase page |
| `/bento/editor` | `bento/editor/page.tsx` | Bento editor (main feature page) |
| `/showcase` | `showcase/page.tsx` | Showcase examples |

## Key Files

| File | Role | Purpose |
|------|------|---------|
| `layout.tsx` | Layout | Root layout, includes global styles and fonts |
| `globals.css` | Styles | Global CSS and Tailwind configuration |
| `favicon.ico` | Asset | Website icon |
