<!-- 🔄 UPDATE ME: When files in this folder change, update this document. -->

# bento/core

> **Atomic-level implementation of Bento cards. Defines the visual structure, size system, and composition patterns of cards.**
> This is the foundation layer of the entire Bento system, and all other modules depend on it.

## Files

| File | Role | Purpose |
|------|------|---------|
| `index.ts` | Entry | Re-exports public API |
| `BentoCard.tsx` | Core | Main card component, Compound Component pattern |
| `BentoCard.types.ts` | Types | Card-related type definitions |
| `BentoCard.styles.ts` | Styles | Card style constants and Tailwind classes |
| `BentoContext.tsx` | Context | Card state management Context |
| `BentoSizeMap.ts` | Config | Size mapping table (1x1, 2x1, 2x2...) |
| `BentoSlots.tsx` | Slots | Card content slot components |
| `useBentoCard.ts` | Hook | Card interaction logic Hook |
