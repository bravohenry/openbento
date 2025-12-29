/**
 * OpenBento - BentoCard Styles
 * 
 * Based on Figma design (node-id: 25-1023)
 * Bento-style card style configuration
 */

import type { BentoSize } from './BentoCard.types'

// ============ Design Constants (from Figma 19:2332) ============

export const BENTO_UNIT = 175      // Base unit size
export const BENTO_GAP = 40        // Grid gap
export const BENTO_RADIUS = 27     // Border radius (Bento.me: 27px)
export const BENTO_PADDING = 24    // Padding

// ============ Figma Color Tokens ============
export const bentoColors = {
  // Background color (Bento.me: white)
  cardBackground: '#ffffff',
  // Twitter blue (Picton Blue)
  twitterBlue: '#55ACEE',
  // Text colors
  textPrimary: '#000000',
  textSecondary: 'rgba(0, 0, 0, 0.6)',
}

// ============ Size Mapping (5 main variants + extensions) ============

export const bentoSizes: Record<BentoSize, { width: number; height: number; columns: number; rows: number }> = {
  // 5 main variants (from Figma)
  '1x1': { width: 175, height: 175, columns: 1, rows: 1 },
  '2x1': { width: 390, height: 175, columns: 2, rows: 1 },  // 175*2 + 40
  '1x2': { width: 175, height: 390, columns: 1, rows: 2 },
  '2x2': { width: 390, height: 390, columns: 2, rows: 2 },
  'bar': { width: 390, height: 68, columns: 2, rows: 1 },   // Thin horizontal bar (390×68)
  // Extended sizes
  '2x3': { width: 390, height: 605, columns: 2, rows: 3 },  // 175*3 + 40*2
  '3x2': { width: 605, height: 390, columns: 3, rows: 2 },
  '4x2': { width: 820, height: 390, columns: 4, rows: 2 },  // 175*4 + 40*3
}


// ============ Border Styles (from Figma 19:2332) ============

export const bentoBorder = {
  // Light mode (Figma: 1px rgba(0,0,0,0.08) + inset rgba(255,255,255,0.22))
  light: {
    border: '1px solid rgba(0, 0, 0, 0.08)',
    boxShadow: 'inset 0 0 0 1px rgba(255, 255, 255, 0.22)',
  },
  // Dark mode
  dark: {
    border: '1px solid rgba(255, 255, 255, 0.15)',
    boxShadow: 'inset 0 0 0 1px rgba(255, 255, 255, 0.1)',
  },
}


// ============ Base Styles ============

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

// ============ Hover Styles ============

// ============ Hover Styles (Figma original: only overlay 15% gray coating, no displacement/shadow changes) ============

export const bentoCardHover: React.CSSProperties = {
  // Keep original shadow and position, only achieve color change through component internal Overlay
}


// ============ Icon Sizes ============

export const bentoIconSizes = {
  sm: { wrapper: 32, icon: 20 },
  md: { wrapper: 40, icon: 24 },
  lg: { wrapper: 48, icon: 28 },
}

// ============ Padding Configuration ============

export const bentoPadding = {
  none: 0,
  sm: 16,
  md: 24,  // Default
  lg: 32,
}

// ============ Overlay Gradients ============

export const bentoOverlayGradients = {
  top: 'linear-gradient(to bottom, rgba(0,0,0,0.6) 0%, transparent 100%)',
  bottom: 'linear-gradient(to top, rgba(0,0,0,0.6) 0%, transparent 100%)',
  left: 'linear-gradient(to right, rgba(0,0,0,0.6) 0%, transparent 100%)',
  right: 'linear-gradient(to left, rgba(0,0,0,0.6) 0%, transparent 100%)',
  none: 'transparent',
}

// ============ CSS Variables ============

export const bentoCSSVariables = `
  --bento-unit: ${BENTO_UNIT}px;
  --bento-gap: ${BENTO_GAP}px;
  --bento-radius: ${BENTO_RADIUS}px;
  --bento-padding: ${BENTO_PADDING}px;
  --bento-border-light: rgba(0, 0, 0, 0.08);
  --bento-border-dark: rgba(255, 255, 255, 0.22);
  --bento-inner-glow: rgba(255, 255, 255, 0.22);
`
