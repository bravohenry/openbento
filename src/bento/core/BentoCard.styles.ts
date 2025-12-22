/**
 * OpenBento - BentoCard Styles
 * 
 * 基于 Figma 设计 (node-id: 25-1023)
 * Bento 风格卡片样式配置
 */

import type { BentoSize } from './BentoCard.types'

// ============ 设计常量 (from Figma 19:2332) ============

export const BENTO_UNIT = 175      // 基础单元尺寸
export const BENTO_GAP = 40        // 网格间距
export const BENTO_RADIUS = 27     // 圆角 (Bento.me: 27px)
export const BENTO_PADDING = 24    // 内边距

// ============ Figma 颜色令牌 ============
export const bentoColors = {
  // 背景色 (Bento.me: 白色)
  cardBackground: '#ffffff',
  // Twitter 蓝 (Picton Blue)
  twitterBlue: '#55ACEE',
  // 文本颜色
  textPrimary: '#000000',
  textSecondary: 'rgba(0, 0, 0, 0.6)',
}

// ============ 尺寸映射 (5 种主要变体 + 扩展) ============

export const bentoSizes: Record<BentoSize, { width: number; height: number; columns: number; rows: number }> = {
  // 5 种主要变体 (from Figma)
  '1x1': { width: 175, height: 175, columns: 1, rows: 1 },
  '2x1': { width: 390, height: 175, columns: 2, rows: 1 },  // 175*2 + 40
  '1x2': { width: 175, height: 390, columns: 1, rows: 2 },
  '2x2': { width: 390, height: 390, columns: 2, rows: 2 },
  'bar': { width: 390, height: 68, columns: 2, rows: 1 },   // 细横条 (390×68)
  // 扩展尺寸
  '2x3': { width: 390, height: 605, columns: 2, rows: 3 },  // 175*3 + 40*2
  '3x2': { width: 605, height: 390, columns: 3, rows: 2 },
  '4x2': { width: 820, height: 390, columns: 4, rows: 2 },  // 175*4 + 40*3
}


// ============ 边框样式 (from Figma 19:2332) ============

export const bentoBorder = {
  // 浅色模式 (Figma: 1px rgba(0,0,0,0.08) + inset rgba(255,255,255,0.22))
  light: {
    border: '1px solid rgba(0, 0, 0, 0.08)',
    boxShadow: 'inset 0 0 0 1px rgba(255, 255, 255, 0.22)',
  },
  // 深色模式
  dark: {
    border: '1px solid rgba(255, 255, 255, 0.15)',
    boxShadow: 'inset 0 0 0 1px rgba(255, 255, 255, 0.1)',
  },
}


// ============ 基础样式 ============

export const bentoCardBase: React.CSSProperties = {
  position: 'relative',
  display: 'flex',
  flexDirection: 'column',
  borderRadius: `${BENTO_RADIUS}px`,
  overflow: 'hidden',
  cursor: 'default',
  transition: 'transform 0.2s ease, box-shadow 0.2s ease',
  background: bentoColors.cardBackground,  // #ffffff (Bento.me)
}

// ============ Hover 样式 ============

// ============ Hover 样式 (Figma 原版: 仅叠加 15% 灰色涂层，无位移/阴影变化) ============

export const bentoCardHover: React.CSSProperties = {
  // 保持原有阴影和位置，只通过组件内部的 Overlay 实现颜色变化
}


// ============ 图标尺寸 ============

export const bentoIconSizes = {
  sm: { wrapper: 32, icon: 20 },
  md: { wrapper: 40, icon: 24 },
  lg: { wrapper: 48, icon: 28 },
}

// ============ 内边距配置 ============

export const bentoPadding = {
  none: 0,
  sm: 16,
  md: 24,  // 默认
  lg: 32,
}

// ============ 叠加层渐变 ============

export const bentoOverlayGradients = {
  top: 'linear-gradient(to bottom, rgba(0,0,0,0.6) 0%, transparent 100%)',
  bottom: 'linear-gradient(to top, rgba(0,0,0,0.6) 0%, transparent 100%)',
  left: 'linear-gradient(to right, rgba(0,0,0,0.6) 0%, transparent 100%)',
  right: 'linear-gradient(to left, rgba(0,0,0,0.6) 0%, transparent 100%)',
  none: 'transparent',
}

// ============ CSS 变量 ============

export const bentoCSSVariables = `
  --bento-unit: ${BENTO_UNIT}px;
  --bento-gap: ${BENTO_GAP}px;
  --bento-radius: ${BENTO_RADIUS}px;
  --bento-padding: ${BENTO_PADDING}px;
  --bento-border-light: rgba(0, 0, 0, 0.08);
  --bento-border-dark: rgba(255, 255, 255, 0.22);
  --bento-inner-glow: rgba(255, 255, 255, 0.22);
`
