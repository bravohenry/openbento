/**
 * OpenBento Design System - Design Tokens
 * 
 * 统一导出所有设计令牌
 */

// ============ 颜色 ============
export {
    colors,
    socialColors,
    gradients,
    opacity,
    type ColorToken,
    type SocialColor,
    type GradientToken,
    type OpacityToken,
} from './colors'

// ============ 字体 ============
export {
    fontFamily,
    fontSize,
    fontWeight,
    lineHeight,
    letterSpacing,
    textStyles,
    type FontFamily,
    type FontSize,
    type FontWeight,
    type LineHeight,
    type LetterSpacing,
    type TextStyle,
} from './typography'

// ============ 间距 ============
export {
    spacing,
    semanticSpacing,
    negativeSpacing,
    type Spacing,
    type NegativeSpacing,
} from './spacing'

// ============ 阴影 ============
export {
    shadows,
    semanticShadows,
    glows,
    darkShadows,
    type Shadow,
    type SemanticShadow,
    type Glow,
} from './shadows'

// ============ 圆角 ============
export {
    radii,
    semanticRadii,
    type Radius,
    type SemanticRadius,
} from './radii'

// ============ 过渡动画 ============
export {
    duration,
    easing,
    transitions,
    semanticTransitions,
    keyframes,
    type Duration,
    type Easing,
    type Transition,
} from './transitions'

// ============ 层级 ============
export {
    zIndex,
    semanticZIndex,
    type ZIndex,
} from './z-index'

// ============ 断点 ============
export {
    breakpoints,
    mediaQueries,
    bentoGridBreakpoints,
    containerWidths,
    type Breakpoint,
    type MediaQuery,
    type BentoGridBreakpoint,
} from './breakpoints'

// ============ 聚合导出 ============

import { colors, socialColors, gradients, opacity } from './colors'
import { fontFamily, fontSize, fontWeight, lineHeight, letterSpacing, textStyles } from './typography'
import { spacing, semanticSpacing, negativeSpacing } from './spacing'
import { shadows, semanticShadows, glows, darkShadows } from './shadows'
import { radii, semanticRadii } from './radii'
import { duration, easing, transitions, semanticTransitions, keyframes } from './transitions'
import { zIndex, semanticZIndex } from './z-index'
import { breakpoints, mediaQueries, bentoGridBreakpoints, containerWidths } from './breakpoints'

/**
 * 所有设计令牌的聚合对象
 * 方便一次性导入使用
 */
export const tokens = {
    colors,
    socialColors,
    gradients,
    opacity,
    fontFamily,
    fontSize,
    fontWeight,
    lineHeight,
    letterSpacing,
    textStyles,
    spacing,
    semanticSpacing,
    negativeSpacing,
    shadows,
    semanticShadows,
    glows,
    darkShadows,
    radii,
    semanticRadii,
    duration,
    easing,
    transitions,
    semanticTransitions,
    keyframes,
    zIndex,
    semanticZIndex,
    breakpoints,
    mediaQueries,
    bentoGridBreakpoints,
    containerWidths,
} as const

export type Tokens = typeof tokens
