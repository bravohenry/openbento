/**
 * OpenBento - Bento Size Map
 * 
 * 尺寸映射系统，定义 Bento 卡片的标准尺寸和间距
 * 基于 Figma 设计规格 (node-id: 25-1023)
 */

// ============ Base Units ============

/** 基础单元尺寸 (px) */
export const BENTO_UNIT = 175

/** 卡片间距 (px) */
export const BENTO_GAP = 40

/** 卡片圆角 (px) */
export const BENTO_RADIUS = 27

/** 卡片内边距 (px) */
export const BENTO_PADDING = 24

// ============ Size Types ============

export type BentoSize = '1x1' | '2x1' | '1x2' | '2x2' | '3x1' | '1x3' | '3x2' | '2x3' | '3x3'

export interface SizeConfig {
    /** 宽度 (px) */
    width: number
    /** 高度 (px) */
    height: number
    /** 占用的列数 */
    cols: number
    /** 占用的行数 */
    rows: number
    /** CSS Grid 区域 */
    gridArea: string
}

// ============ Size Calculations ============

/**
 * 计算卡片尺寸
 * 公式: cols * BENTO_UNIT + (cols - 1) * BENTO_GAP
 */
const calculateSize = (cols: number, rows: number): SizeConfig => {
    const width = cols * BENTO_UNIT + (cols - 1) * BENTO_GAP
    const height = rows * BENTO_UNIT + (rows - 1) * BENTO_GAP
    return {
        width,
        height,
        cols,
        rows,
        gridArea: `span ${rows} / span ${cols}`,
    }
}

// ============ Size Map ============

export const BENTO_SIZE_MAP: Record<BentoSize, SizeConfig> = {
    '1x1': calculateSize(1, 1), // 175 x 175
    '2x1': calculateSize(2, 1), // 390 x 175
    '1x2': calculateSize(1, 2), // 175 x 390
    '2x2': calculateSize(2, 2), // 390 x 390
    '3x1': calculateSize(3, 1), // 605 x 175
    '1x3': calculateSize(1, 3), // 175 x 605
    '3x2': calculateSize(3, 2), // 605 x 390
    '2x3': calculateSize(2, 3), // 390 x 605
    '3x3': calculateSize(3, 3), // 605 x 605
}

// ============ Helper Functions ============

/**
 * 获取卡片尺寸配置
 */
export const getBentoSize = (size: BentoSize): SizeConfig => {
    return BENTO_SIZE_MAP[size]
}

/**
 * 解析尺寸字符串为列数和行数
 */
export const parseBentoSize = (size: BentoSize): { cols: number; rows: number } => {
    const [cols, rows] = size.split('x').map(Number)
    return { cols, rows }
}

/**
 * 创建自定义尺寸
 */
export const createCustomSize = (cols: number, rows: number): SizeConfig => {
    if (cols < 1 || rows < 1) {
        throw new Error('Columns and rows must be at least 1')
    }
    return calculateSize(cols, rows)
}

/**
 * 获取响应式尺寸 (用于移动端适配)
 */
export const getResponsiveSize = (
    size: BentoSize,
    containerWidth: number,
    minUnit = 80
): SizeConfig => {
    const config = BENTO_SIZE_MAP[size]
    const maxUnit = Math.floor((containerWidth - (config.cols - 1) * BENTO_GAP) / config.cols)
    const responsiveUnit = Math.max(minUnit, Math.min(BENTO_UNIT, maxUnit))

    const gap = Math.min(BENTO_GAP, responsiveUnit * 0.23) // 比例缩放间距

    return {
        ...config,
        width: config.cols * responsiveUnit + (config.cols - 1) * gap,
        height: config.rows * responsiveUnit + (config.rows - 1) * gap,
    }
}

// ============ Grid Template Helpers ============

/**
 * 生成 CSS Grid 模板列
 */
export const generateGridColumns = (
    columns: number = 4,
    unit: number = BENTO_UNIT
): string => {
    return `repeat(${columns}, ${unit}px)`
}

/**
 * 生成 CSS Grid 模板行
 */
export const generateGridRows = (
    rows: number = 4,
    unit: number = BENTO_UNIT
): string => {
    return `repeat(${rows}, ${unit}px)`
}

// ============ Aspect Ratio Helpers ============

export const BENTO_ASPECT_RATIOS: Record<BentoSize, number> = {
    '1x1': 1,
    '2x1': 390 / 175,
    '1x2': 175 / 390,
    '2x2': 1,
    '3x1': 605 / 175,
    '1x3': 175 / 605,
    '3x2': 605 / 390,
    '2x3': 390 / 605,
    '3x3': 1,
}

/**
 * 获取卡片宽高比
 */
export const getAspectRatio = (size: BentoSize): number => {
    return BENTO_ASPECT_RATIOS[size]
}
