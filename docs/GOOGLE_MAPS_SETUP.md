# Google Maps API 配置指南

## 概述

地图卡片的位置搜索功能需要 Google Maps API 支持。本指南将帮助你配置 Google Maps API。

## 步骤 1: 获取 API Key

1. 访问 [Google Cloud Console](https://console.cloud.google.com/)
2. 创建新项目或选择现有项目
3. 启用以下 API：
   - **Places API** (必需)
   - **Maps JavaScript API** (必需)
4. 在 "凭据" 页面创建 API Key
5. 配置 API Key 限制（推荐）：
   - 应用限制：HTTP 引荐来源网址
   - API 限制：仅限 Places API 和 Maps JavaScript API

## 步骤 2: 配置环境变量

在项目根目录创建 `.env.local` 文件（如果不存在）：

```bash
NEXT_PUBLIC_GOOGLE_MAPS_API_KEY=your_api_key_here
```

**重要提示：**
- 使用 `NEXT_PUBLIC_` 前缀，这样变量会在客户端可用
- 不要将 `.env.local` 提交到 Git（已在 `.gitignore` 中）
- 生产环境需要在部署平台（如 Vercel）配置环境变量

## 步骤 3: 验证配置

1. 启动开发服务器：`npm run dev`
2. 打开编辑器，添加地图卡片
3. 点击地图卡片，在尺寸选择器下方应该看到 "Search Location" 按钮
4. 点击搜索按钮，输入位置名称
5. 如果配置正确，应该能看到搜索结果

## 故障排除

### 问题：搜索功能不工作

**可能原因：**
- API Key 未配置或配置错误
- API 未启用
- API Key 限制配置错误

**解决方案：**
1. 检查浏览器控制台是否有错误信息
2. 验证 `.env.local` 文件中的 API Key 是否正确
3. 确认在 Google Cloud Console 中已启用 Places API 和 Maps JavaScript API
4. 检查 API Key 的限制设置

### 问题：看到 "Configure NEXT_PUBLIC_GOOGLE_MAPS_API_KEY" 提示

这表示环境变量未正确配置。请检查：
1. `.env.local` 文件是否存在
2. 环境变量名称是否正确（必须包含 `NEXT_PUBLIC_` 前缀）
3. 是否重启了开发服务器（修改环境变量后需要重启）

## 成本说明

Google Maps Platform 提供免费额度：
- **Places API (New)**: 每月 $200 免费额度
- **Maps JavaScript API**: 每月 $200 免费额度

对于个人项目和小型应用，通常不会超出免费额度。更多信息请参考 [Google Maps Platform 定价](https://mapsplatform.google.com/pricing/)。

## 安全建议

1. **限制 API Key**：在 Google Cloud Console 中配置 API Key 限制
2. **使用 HTTP 引荐来源限制**：限制只能从你的域名使用
3. **监控使用情况**：定期检查 API 使用量
4. **不要公开 API Key**：确保 `.env.local` 在 `.gitignore` 中

## 相关文件

- `src/bento/editor/LocationSearch.tsx` - 位置搜索组件
- `src/bento/editor/WidgetEditOverlay.tsx` - 编辑浮动框（包含搜索按钮）
- `src/types/google-maps.d.ts` - Google Maps API 类型定义
