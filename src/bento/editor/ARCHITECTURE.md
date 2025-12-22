<!-- 🔄 UPDATE ME: When files in this folder change, update this document. -->

# bento/editor

> **Bento 编辑器 UI。提供编辑模式下的工具栏、覆盖层和用户资料区。**
> 这是用户与 Bento 页面交互的主要界面层。

## Files

| File | Role | Purpose |
|------|------|---------|
| `index.ts` | Entry | 重新导出公开 API |
| `EditorContext.tsx` | Context | 编辑器状态管理 (isEditing, selectedWidget) |
| `EditorToolbar.tsx` | Component | 顶部工具栏 (添加卡片、视图切换) |
| `EditorFooter.tsx` | Component | 底部页脚 (设置、社交链接) |
| `ProfileSection.tsx` | Component | 左侧用户资料区 |
| `WidgetEditOverlay.tsx` | Component | 选中卡片的浮动编辑层 (删除、尺寸选择) |
