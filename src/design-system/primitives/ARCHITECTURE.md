<!-- 🔄 UPDATE ME: When subfolders in this folder change, update this document. -->

# design-system/primitives

> **Atomic-level components. Most basic layout and text components, no business logic.**
> All composite components are composed of these atoms.

## Component Folders

| Folder | Component | Purpose |
|--------|-----------|---------|
| `Box/` | Box | Generic container, supports style props |
| `Flex/` | Flex | Flexbox layout container |
| `Stack/` | Stack | Stack layout (VStack/HStack) |
| `Text/` | Text | Text rendering, supports variant |

## Files

| File | Role | Purpose |
|------|------|---------|
| `index.ts` | Entry | Re-exports all atomic components |
