<!-- 🔄 UPDATE ME: When files in this folder change, update this document. -->

# bento/editor

> **Bento editor UI. Provides toolbar, overlay, and user profile section in edit mode.**
> This is the main interface layer for users to interact with Bento pages.

## Files

| File | Role | Purpose |
|------|------|---------|
| `index.ts` | Entry | Re-exports public API |
| `EditorContext.tsx` | Context | Editor state management (isEditing, selectedWidget) |
| `EditorToolbar.tsx` | Component | Top toolbar (add card, view toggle) |
| `EditorFooter.tsx` | Component | Bottom footer (settings, social links) |
| `ProfileSection.tsx` | Component | Left user profile section |
| `WidgetEditOverlay.tsx` | Component | Floating edit layer for selected card (delete, size selection) |
