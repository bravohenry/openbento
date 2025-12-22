# 卡片细节对比分析

## 📐 1. 图标 (Icon) 细节

### 当前实现
```typescript
// LinkWidget.tsx
const iconRadius = layout.iconSize >= 40 
  ? (layout.iconSize === 56 ? 12 : 10) 
  : 8

// 图标容器
width: layout.iconSize,  // 40px (1x1), 56px (2x2)
height: layout.iconSize,
borderRadius: iconRadius,  // 10px (40px), 12px (56px)
backgroundColor: iconBg,
boxShadow: '0px 1px 2px rgba(0, 0, 0, 0.1)'

// 内边框高光
boxShadow: 'inset 0 0 0 1px rgba(0, 0, 0, 0.06)'
```

### 需要检查的细节

#### ✅ 图标尺寸
- `1x1`: 40px ✅
- `2x2`: 56px ✅
- `bar`: 28px ✅

#### ⚠️ 图标圆角
- 40px 图标: `10px` - 需要确认 Bento.me 是否一致
- 56px 图标: `12px` - 需要确认
- 28px 图标: `8px` - 需要确认

#### ⚠️ 图标阴影
- 当前: `0px 1px 2px rgba(0, 0, 0, 0.1)`
- 需要检查 Bento.me 的实际阴影值

#### ⚠️ 内边框高光
- 当前: `inset 0 0 0 1px rgba(0, 0, 0, 0.06)`
- 需要确认透明度是否一致

---

## 📝 2. 文字 (Typography) 细节

### 标题 (Title)

#### 当前实现
```typescript
// 1x1, 2x1, 1x2
fontSize: 14,
fontWeight: 500,
lineHeight: '1.2',
color: '#000000',
fontFamily: 'Inter, sans-serif',

// 2x2
fontSize: 18,
fontWeight: 500,
lineHeight: '1.2',
```

#### 需要检查的细节

| 尺寸 | 字体大小 | 字重 | 行高 | 字间距 | 颜色 |
|------|---------|------|------|--------|------|
| 1x1 | 14px | 500 | 1.2 | ? | #000000 |
| 2x1 | 14px | 500 | 1.2 | ? | #000000 |
| 1x2 | 14px | 500 | 1.2 | ? | #000000 |
| 2x2 | 18px | 500 | 1.2 | ? | #000000 |

**需要确认**:
- ⚠️ 字间距 (letter-spacing): 当前未设置，Bento.me 可能有 `-0.01em` 或类似
- ⚠️ 行高: `1.2` 可能需要调整为更精确的值（如 `18px` for 14px font）

### 副标题 (Subtitle)

#### 当前实现
```typescript
fontSize: 12,
fontWeight: 400,
lineHeight: '16px',
color: 'rgba(0, 0, 0, 0.6)',
fontFamily: 'Inter, sans-serif',
```

#### 需要检查
- ⚠️ 颜色: `rgba(0, 0, 0, 0.6)` - 需要确认是否与 Bento.me 一致
- ⚠️ 行高: `16px` for 12px font = 1.33 - 可能需要调整

---

## 🔘 3. 按钮 (Action Button) 细节

### 当前实现
```typescript
// 标准按钮
height: 30,
minWidth: 66,  // 或 70 (pill shape)
borderRadius: 8,  // 或 23 (pill)
fontSize: 12,
fontWeight: 600,
padding: '0 12px',
gap: 4,

// Bar 按钮
height: 26,
paddingInline: 12,
borderRadius: 6,
fontSize: 11,
fontWeight: 600,
```

### 需要检查的细节

| 属性 | 标准按钮 | Bar 按钮 | Bento.me |
|------|---------|---------|----------|
| 高度 | 30px | 26px | ? |
| 内边距 | `0 12px` | `0 12px` | ? |
| 圆角 | 8px | 6px | ? |
| 字体大小 | 12px | 11px | ? |
| 字重 | 600 | 600 | ? |
| 最小宽度 | 66px | - | ? |

**需要确认**:
- ⚠️ 按钮高度是否一致
- ⚠️ 圆角值是否匹配
- ⚠️ 字体大小是否一致
- ⚠️ 按钮颜色值（已配置，但需要确认）

---

## 📏 4. 间距 (Spacing) 细节

### 内容区域边距

#### 当前实现
```typescript
// 标准布局
position: 'absolute',
top: 24,
left: 24,
right: 24,
bottom: 24,
```

**状态**: ✅ 24px 内边距已正确

### 元素间距

#### 当前实现
```typescript
// 1x1 布局
iconSize: 40,
titleTop: 52,      // 图标 40px + 间距 12px = 52px ✅
subtitleTop: 69,   // titleTop 52 + titleHeight ~17 = 69px ✅
actionTop: 97,     // subtitleTop 69 + subtitleHeight 16 + 间距 12 = 97px ✅
```

**计算验证**:
- 图标: 0px (top)
- 标题: 52px = 40px (icon) + 12px (gap) ✅
- 副标题: 69px = 52px + 17px (title height) ✅
- 按钮: 97px = 69px + 16px (subtitle) + 12px (gap) ✅

#### 2x2 布局
```typescript
iconSize: 56,
titleTop: 72,      // 56px + 16px = 72px ✅
subtitleTop: 94,   // 72px + 22px = 94px ✅
actionTop: 120,    // 94px + 16px + 10px = 120px ✅
```

**状态**: ✅ 间距计算看起来合理

---

## 🎨 5. 颜色细节

### 文字颜色

#### 当前实现
```typescript
textColor: '#000000',           // 标题
subtitleColor: 'rgba(0, 0, 0, 0.6)',  // 副标题
```

**需要确认**:
- ⚠️ 标题颜色: `#000000` vs `#1a1a1a` (更柔和的黑色)
- ⚠️ 副标题透明度: `0.6` vs `0.5` 或 `0.65`

### 按钮颜色

#### 当前实现
```typescript
instagram: '#4093ef',
twitter: '#4093ef',
tiktok: '#ea435a',
youtube: '#FF0000',
github: '#24292e',
linkedin: '#0A66C2',
```

**需要确认**: 这些颜色值是否与 Bento.me 完全一致

---

## 🔍 6. 阴影细节

### 图标阴影

#### 当前实现
```typescript
boxShadow: '0px 1px 2px rgba(0, 0, 0, 0.1)'
```

**需要检查**:
- ⚠️ 阴影值可能需要调整为更精确的值
- 可能的 Bento.me 值: `0px 0.6px 2px rgba(0, 0, 0, 0.16)` (从代码中看到)

### 卡片阴影

#### 当前实现
```typescript
// Edit mode hover
boxShadow: '0 4px 12px rgba(0,0,0,0.08)'
```

**状态**: ✅ 已实现

---

## 📐 7. 布局位置细节

### 图标位置

#### 当前实现
```typescript
position: 'absolute',
top: 0,    // 相对于内容区域 (24px from card edge)
left: 0,
```

**状态**: ✅ 左上角，正确

### 标题位置

#### 当前实现
```typescript
// 1x1: titleTop: 52
// 2x2: titleTop: 72
```

**计算**:
- 1x1: 图标 40px + 间距 12px = 52px ✅
- 2x2: 图标 56px + 间距 16px = 72px ✅

**状态**: ✅ 位置计算正确

---

## 🎯 8. 需要重点检查的细节

### 高优先级

1. **字间距 (Letter Spacing)**
   - 当前: 未设置
   - Bento.me 可能使用: `-0.01em` 或 `-0.02em`
   - **需要添加**

2. **标题行高**
   - 当前: `1.2` (相对值)
   - 可能需要: `18px` (for 14px font) 或 `22px` (for 18px font)
   - **需要确认**

3. **图标阴影**
   - 当前: `0px 1px 2px rgba(0, 0, 0, 0.1)`
   - 代码中有: `0px 0.6px 2px rgba(0, 0, 0, 0.16)`
   - **需要确认使用哪个**

4. **文字颜色**
   - 标题: `#000000` vs `#1a1a1a`
   - 副标题: `rgba(0, 0, 0, 0.6)` vs 其他值
   - **需要确认**

### 中优先级

5. **按钮细节**
   - 高度、圆角、字体大小需要最终确认
   - 按钮颜色值需要验证

6. **图标圆角**
   - 当前逻辑看起来合理，但需要最终确认

---

## 📋 检查清单

### 图标
- [ ] 图标尺寸 (40px, 56px, 28px)
- [ ] 图标圆角 (10px, 12px, 8px)
- [ ] 图标阴影值
- [ ] 图标内边框高光透明度

### 文字
- [ ] 标题字体大小 (14px, 18px)
- [ ] 标题字重 (500)
- [ ] 标题行高 (1.2 vs 固定值)
- [ ] 标题字间距 (需要添加)
- [ ] 副标题字体大小 (12px)
- [ ] 副标题颜色透明度 (0.6)

### 按钮
- [ ] 按钮高度 (30px, 26px)
- [ ] 按钮圆角 (8px, 6px, 23px)
- [ ] 按钮字体大小 (12px, 11px)
- [ ] 按钮内边距
- [ ] 按钮颜色值

### 间距
- [ ] 内容区域边距 (24px) ✅
- [ ] 图标到标题间距 (12px, 16px)
- [ ] 标题到副标题间距
- [ ] 副标题到按钮间距

---

## 🔧 建议的修改

### 1. 添加字间距
```typescript
// Title
letterSpacing: '-0.01em',  // 或 '-0.02em' for larger text
```

### 2. 调整行高为固定值
```typescript
// 14px font
lineHeight: '18px',  // 而不是 '1.2'

// 18px font  
lineHeight: '22px',  // 而不是 '1.2'
```

### 3. 确认图标阴影
```typescript
// 可能需要改为
boxShadow: '0px 0.6px 2px rgba(0, 0, 0, 0.16)'
```

### 4. 调整文字颜色
```typescript
// 标题
color: '#1a1a1a',  // 更柔和的黑色

// 副标题
color: 'rgba(0, 0, 0, 0.55)',  // 可能需要微调
```

---

## 📊 对比总结

| 类别 | 当前实现 | 需要确认 | 优先级 |
|------|---------|---------|--------|
| 图标尺寸 | ✅ 正确 | - | - |
| 图标圆角 | ✅ 合理 | 最终值 | 中 |
| 图标阴影 | ⚠️ 可能需调整 | 精确值 | 高 |
| 标题字体 | ✅ 正确 | 字间距 | 高 |
| 标题行高 | ⚠️ 相对值 | 固定值 | 中 |
| 副标题 | ✅ 基本正确 | 颜色微调 | 中 |
| 按钮 | ✅ 基本正确 | 细节确认 | 中 |
| 间距 | ✅ 计算正确 | - | - |

