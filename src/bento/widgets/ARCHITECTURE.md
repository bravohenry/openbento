<!-- 🔄 UPDATE ME: When files or subfolders in this folder change, update this document. -->

# bento/widgets

> **具体卡片类型实现。每种 Widget 对应一种社交平台或内容类型。**
> 可扩展的 Widget 注册表模式，添加新平台只需新建子文件夹。

## Files

| File | Role | Purpose |
|------|------|---------|
| `index.tsx` | Entry | WidgetRenderer 动态渲染器 |
| `types.ts` | Types | Widget 通用类型 (WidgetConfig, WidgetSize) |
| `registry.ts` | Registry | 平台注册表 (图标、颜色、CTA 检测) |
| `icons.tsx` | Icons | 通用图标组件 |

## Widget Subfolders

| Folder | Platform | Key Component |
|--------|----------|---------------|
| `link/` | 通用链接 | LinkWidget |
| `text/` | 文本卡片 | TextWidget |
| `image/` | 图片卡片 | ImageWidget |
| `map/` | 地图卡片 | MapWidget |
| `github/` | GitHub | GitHubWidget |
| `spotify/` | Spotify | SpotifyWidget |
| `section/` | 分区标题 | SectionWidget |
