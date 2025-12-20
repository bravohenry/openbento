/**
 * OpenBento Design System - Style Props
 * 
 * 样式 Props 解析工具
 */

import { spacing } from '../tokens/spacing'
import { colors } from '../tokens/colors'
import type { CSSProperties } from 'react'

// ============ 类型定义 ============

export type SpacingValue = keyof typeof spacing | number | string

export interface SpacingProps {
    /** Margin */
    m?: SpacingValue
    mt?: SpacingValue
    mr?: SpacingValue
    mb?: SpacingValue
    ml?: SpacingValue
    mx?: SpacingValue
    my?: SpacingValue

    /** Padding */
    p?: SpacingValue
    pt?: SpacingValue
    pr?: SpacingValue
    pb?: SpacingValue
    pl?: SpacingValue
    px?: SpacingValue
    py?: SpacingValue

    /** Gap */
    gap?: SpacingValue
    rowGap?: SpacingValue
    columnGap?: SpacingValue
}

export interface LayoutProps {
    /** Width */
    w?: number | string
    minW?: number | string
    maxW?: number | string

    /** Height */
    h?: number | string
    minH?: number | string
    maxH?: number | string

    /** Display */
    display?: CSSProperties['display']

    /** Position */
    position?: CSSProperties['position']
    top?: number | string
    right?: number | string
    bottom?: number | string
    left?: number | string
    zIndex?: number

    /** Overflow */
    overflow?: CSSProperties['overflow']
    overflowX?: CSSProperties['overflowX']
    overflowY?: CSSProperties['overflowY']
}

export interface FlexProps {
    /** Flex Container */
    flexDirection?: CSSProperties['flexDirection']
    flexWrap?: CSSProperties['flexWrap']
    justifyContent?: CSSProperties['justifyContent']
    alignItems?: CSSProperties['alignItems']
    alignContent?: CSSProperties['alignContent']

    /** Flex Item */
    flex?: CSSProperties['flex']
    flexGrow?: CSSProperties['flexGrow']
    flexShrink?: CSSProperties['flexShrink']
    flexBasis?: CSSProperties['flexBasis']
    alignSelf?: CSSProperties['alignSelf']
    order?: CSSProperties['order']
}

export interface ColorProps {
    /** Background */
    bg?: string
    bgColor?: string

    /** Text */
    color?: string

    /** Border */
    borderColor?: string
}

export type StyleProps = SpacingProps & LayoutProps & FlexProps & ColorProps

// ============ 解析函数 ============

/**
 * 解析间距值
 */
function parseSpacingValue(value: SpacingValue | undefined): string | undefined {
    if (value === undefined) return undefined
    if (typeof value === 'number') return `${value}px`
    if (value in spacing) return spacing[value as keyof typeof spacing]
    return value
}

/**
 * 解析尺寸值
 */
function parseSizeValue(value: number | string | undefined): string | undefined {
    if (value === undefined) return undefined
    if (typeof value === 'number') return `${value}px`
    return value
}

/**
 * 将 Style Props 转换为 CSSProperties
 */
export function parseStyleProps(props: StyleProps): CSSProperties {
    const styles: CSSProperties = {}

    // Margin
    if (props.m !== undefined) styles.margin = parseSpacingValue(props.m)
    if (props.mt !== undefined) styles.marginTop = parseSpacingValue(props.mt)
    if (props.mr !== undefined) styles.marginRight = parseSpacingValue(props.mr)
    if (props.mb !== undefined) styles.marginBottom = parseSpacingValue(props.mb)
    if (props.ml !== undefined) styles.marginLeft = parseSpacingValue(props.ml)
    if (props.mx !== undefined) {
        styles.marginLeft = parseSpacingValue(props.mx)
        styles.marginRight = parseSpacingValue(props.mx)
    }
    if (props.my !== undefined) {
        styles.marginTop = parseSpacingValue(props.my)
        styles.marginBottom = parseSpacingValue(props.my)
    }

    // Padding
    if (props.p !== undefined) styles.padding = parseSpacingValue(props.p)
    if (props.pt !== undefined) styles.paddingTop = parseSpacingValue(props.pt)
    if (props.pr !== undefined) styles.paddingRight = parseSpacingValue(props.pr)
    if (props.pb !== undefined) styles.paddingBottom = parseSpacingValue(props.pb)
    if (props.pl !== undefined) styles.paddingLeft = parseSpacingValue(props.pl)
    if (props.px !== undefined) {
        styles.paddingLeft = parseSpacingValue(props.px)
        styles.paddingRight = parseSpacingValue(props.px)
    }
    if (props.py !== undefined) {
        styles.paddingTop = parseSpacingValue(props.py)
        styles.paddingBottom = parseSpacingValue(props.py)
    }

    // Gap
    if (props.gap !== undefined) styles.gap = parseSpacingValue(props.gap)
    if (props.rowGap !== undefined) styles.rowGap = parseSpacingValue(props.rowGap)
    if (props.columnGap !== undefined) styles.columnGap = parseSpacingValue(props.columnGap)

    // Layout
    if (props.w !== undefined) styles.width = parseSizeValue(props.w)
    if (props.minW !== undefined) styles.minWidth = parseSizeValue(props.minW)
    if (props.maxW !== undefined) styles.maxWidth = parseSizeValue(props.maxW)
    if (props.h !== undefined) styles.height = parseSizeValue(props.h)
    if (props.minH !== undefined) styles.minHeight = parseSizeValue(props.minH)
    if (props.maxH !== undefined) styles.maxHeight = parseSizeValue(props.maxH)
    if (props.display !== undefined) styles.display = props.display
    if (props.position !== undefined) styles.position = props.position
    if (props.top !== undefined) styles.top = parseSizeValue(props.top)
    if (props.right !== undefined) styles.right = parseSizeValue(props.right)
    if (props.bottom !== undefined) styles.bottom = parseSizeValue(props.bottom)
    if (props.left !== undefined) styles.left = parseSizeValue(props.left)
    if (props.zIndex !== undefined) styles.zIndex = props.zIndex
    if (props.overflow !== undefined) styles.overflow = props.overflow
    if (props.overflowX !== undefined) styles.overflowX = props.overflowX
    if (props.overflowY !== undefined) styles.overflowY = props.overflowY

    // Flex
    if (props.flexDirection !== undefined) styles.flexDirection = props.flexDirection
    if (props.flexWrap !== undefined) styles.flexWrap = props.flexWrap
    if (props.justifyContent !== undefined) styles.justifyContent = props.justifyContent
    if (props.alignItems !== undefined) styles.alignItems = props.alignItems
    if (props.alignContent !== undefined) styles.alignContent = props.alignContent
    if (props.flex !== undefined) styles.flex = props.flex
    if (props.flexGrow !== undefined) styles.flexGrow = props.flexGrow
    if (props.flexShrink !== undefined) styles.flexShrink = props.flexShrink
    if (props.flexBasis !== undefined) styles.flexBasis = props.flexBasis
    if (props.alignSelf !== undefined) styles.alignSelf = props.alignSelf
    if (props.order !== undefined) styles.order = props.order

    // Colors
    if (props.bg !== undefined) styles.background = props.bg
    if (props.bgColor !== undefined) styles.backgroundColor = props.bgColor
    if (props.color !== undefined) styles.color = props.color
    if (props.borderColor !== undefined) styles.borderColor = props.borderColor

    return styles
}

/**
 * 从 props 中提取 style props
 */
export function extractStyleProps<T extends StyleProps>(
    props: T
): [StyleProps, Omit<T, keyof StyleProps>] {
    const {
        // Spacing
        m, mt, mr, mb, ml, mx, my,
        p, pt, pr, pb, pl, px, py,
        gap, rowGap, columnGap,
        // Layout
        w, minW, maxW, h, minH, maxH,
        display, position, top, right, bottom, left, zIndex,
        overflow, overflowX, overflowY,
        // Flex
        flexDirection, flexWrap, justifyContent, alignItems, alignContent,
        flex, flexGrow, flexShrink, flexBasis, alignSelf, order,
        // Colors
        bg, bgColor, color, borderColor,
        ...rest
    } = props

    const styleProps: StyleProps = {
        m, mt, mr, mb, ml, mx, my,
        p, pt, pr, pb, pl, px, py,
        gap, rowGap, columnGap,
        w, minW, maxW, h, minH, maxH,
        display, position, top, right, bottom, left, zIndex,
        overflow, overflowX, overflowY,
        flexDirection, flexWrap, justifyContent, alignItems, alignContent,
        flex, flexGrow, flexShrink, flexBasis, alignSelf, order,
        bg, bgColor, color, borderColor,
    }

    return [styleProps, rest as Omit<T, keyof StyleProps>]
}
