<!-- 🔄 UPDATE ME: When modules in /src change, update this document. -->

# OpenBento Source Architecture

> **Core source code directory. Contains all business logic, UI components, and design system.**
> Each submodule has its own `ARCHITECTURE.md`, following the fractal documentation structure.

## Modules

| Module | Purpose | Key Exports |
|--------|---------|-------------|
| `app/` | Next.js routes and pages | Pages, Layouts |
| `bento/` | Bento card core system | BentoCard, BentoGrid, DnD, Widgets |
| `design-system/` | Design system | Tokens, Primitives, Patterns |
| `components/` | Generic UI components | Shared components |
| `lib/` | Utility functions library | Utilities, Helpers |
| `stores/` | State management | Zustand stores |
| `styles/` | Global styles | CSS, Themes |
| `types/` | TypeScript type definitions | Shared types |

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

- `index.ts` — Module entry point, re-exports public API
- `*.types.ts` — Type definitions
- `*.styles.ts` — Style constants
- `*.test.ts` — Test files
