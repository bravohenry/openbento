/**
 * [INPUT]: (BENTO_UNIT, BENTO_GAP) - Base unit and gap from BentoSizeMap
 * [OUTPUT]: (MIN_CANVAS_WIDTH, MIN_PROFILE_WIDTH, MOBILE_BREAKPOINT, MOBILE_CONTAINER_MAX_WIDTH) - Layout dimension constants for responsive editor layout
 * [POS]: Located at /bento/editor - Defines responsive layout breakpoints, minimum widths for desktop layout, and mobile container constraints
 * 
 * [PROTOCOL]:
 * 1. Once this file's logic changes, this Header must be synchronized immediately.
 * 2. After update, must check upward whether /src/bento/editor/.folder.md description is still accurate.
 */

import { BENTO_UNIT, BENTO_GAP } from '../core/BentoSizeMap'

// ============ Layout Constants ============

/** 最小 Canvas 宽度：4个1x1 widget 并列的宽度 */
export const MIN_CANVAS_WIDTH = 4 * BENTO_UNIT + 3 * BENTO_GAP // 820px

/** 左侧 Profile 最小宽度 */
export const MIN_PROFILE_WIDTH = 380

/** 移动端断点：当窗口宽度小于此值时自动切换到手机版布局 */
export const MOBILE_BREAKPOINT = MIN_CANVAS_WIDTH + MIN_PROFILE_WIDTH // ~1200px

/** 手机版容器最大宽度 */
export const MOBILE_CONTAINER_MAX_WIDTH = 430
