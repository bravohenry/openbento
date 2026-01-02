# 位置搜索功能说明

## 概述

地图卡片的位置搜索功能使用 **OpenStreetMap Nominatim API**，这是一个完全免费且无需 API key 的地理编码服务。

## 特点

✅ **完全免费** - 无需 API key，无需注册  
✅ **无需配置** - 开箱即用  
✅ **全球覆盖** - 基于 OpenStreetMap 数据  
✅ **隐私友好** - 开源服务

## 使用限制

Nominatim API 有使用限制以保护服务器资源：
- **请求频率**：每秒最多 1 个请求（已通过 500ms debounce 处理）
- **用户代理**：必须设置合适的 User-Agent（已自动配置）
- **商业用途**：如需大量使用，建议使用自己的 Nominatim 实例

对于个人项目和小型应用，这些限制通常足够使用。

## 使用方法

1. 在编辑器中添加地图卡片
2. 点击地图卡片，在编辑浮动框中点击 "Search Location" 按钮
3. 输入位置名称（如 "San Francisco" 或 "北京"）
4. 从搜索结果中选择位置
5. 地图会自动更新到选定的位置

## 技术实现

- **服务**：OpenStreetMap Nominatim API
- **端点**：`https://nominatim.openstreetmap.org/search`
- **格式**：JSON
- **组件**：`src/bento/editor/LocationSearch.tsx`

## 故障排除

### 问题：搜索没有结果

**可能原因：**
- 网络连接问题
- 搜索词太模糊
- Nominatim 服务器暂时不可用

**解决方案：**
1. 检查网络连接
2. 尝试更具体的位置名称
3. 稍后重试

### 问题：搜索速度慢

这是正常的，因为：
- Nominatim 是免费服务，响应时间可能较长
- 已设置 500ms debounce 以减少请求频率
- 建议使用更具体的位置名称以提高准确性

## 相关文件

- `src/bento/editor/LocationSearch.tsx` - 位置搜索组件
- `src/bento/editor/WidgetEditOverlay.tsx` - 编辑浮动框（包含搜索按钮）

## 参考

- [Nominatim API 文档](https://nominatim.org/release-docs/develop/api/Overview/)
- [OpenStreetMap](https://www.openstreetmap.org/)
