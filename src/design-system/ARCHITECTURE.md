<!-- 🔄 UPDATE ME: When modules in /src/design-system change, update this document. -->

# Design System

> **OpenBento's design system. Provides design tokens, atomic components, and composite component patterns.**
> Follows Atomic Design principles: Tokens → Primitives → Patterns.

## Submodules

| Submodule | Layer | Purpose |
|-----------|-------|---------|
| `tokens/` | Foundation | Design tokens (colors, spacing, shadows, etc.) |
| `foundation/` | Foundation | Infrastructure (theme, grid) |
| `primitives/` | Atoms | Atomic components (Box, Flex, Text, Stack) |
| `patterns/` | Molecules | Composite components (Button, Card, Modal, etc.) |
| `utils/` | Utilities | Utility functions (cn, polymorphic) |

## Design Philosophy

```
tokens/  ──► foundation/  ──► primitives/  ──► patterns/
 (Data)      (Infra)         (Atoms)          (Molecules)
```

## Entry Point

`index.ts` — Re-exports all public APIs
