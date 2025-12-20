/**
 * OpenBento Design System - Theme Factory
 * 
 * 主题创建工厂函数
 */

import type { ThemeConfig, ThemeColors } from './types'
import { lightTheme } from './themes/light'
import { darkTheme } from './themes/dark'

type DeepPartial<T> = {
    [P in keyof T]?: T[P] extends object ? DeepPartial<T[P]> : T[P]
}

/**
 * 深度合并对象
 */
function deepMerge<T extends object>(target: T, source: DeepPartial<T>): T {
    const result = { ...target }

    for (const key in source) {
        const sourceValue = source[key as keyof typeof source]
        const targetValue = target[key as keyof T]

        if (
            sourceValue !== undefined &&
            typeof sourceValue === 'object' &&
            sourceValue !== null &&
            !Array.isArray(sourceValue) &&
            typeof targetValue === 'object' &&
            targetValue !== null
        ) {
            result[key as keyof T] = deepMerge(
                targetValue as object,
                sourceValue as DeepPartial<object>
            ) as T[keyof T]
        } else if (sourceValue !== undefined) {
            result[key as keyof T] = sourceValue as T[keyof T]
        }
    }

    return result
}

/**
 * 创建自定义主题
 * 
 * @param config - 主题配置 (可部分覆盖)
 * @param baseTheme - 基础主题 (默认根据 isDark 选择)
 * @returns 完整的主题配置
 * 
 * @example
 * ```ts
 * const myTheme = createTheme({
 *   name: 'My Custom Theme',
 *   id: 'my-theme',
 *   colors: {
 *     brand: {
 *       primary: '#ff6b35',
 *     },
 *   },
 * })
 * ```
 */
export function createTheme(
    config: DeepPartial<ThemeConfig> & { name: string; id: string },
    baseTheme?: ThemeConfig
): ThemeConfig {
    const isDark = config.isDark ?? baseTheme?.isDark ?? false
    const base = baseTheme ?? (isDark ? darkTheme : lightTheme)

    return deepMerge(base, config) as ThemeConfig
}

/**
 * 从颜色创建主题
 * 
 * @param primaryColor - 主要品牌色
 * @param options - 其他选项
 * @returns 完整的主题配置
 * 
 * @example
 * ```ts
 * const brandTheme = createThemeFromColor('#ff6b35', {
 *   name: 'Brand Theme',
 *   isDark: false,
 * })
 * ```
 */
export function createThemeFromColor(
    primaryColor: string,
    options: {
        name: string
        id?: string
        isDark?: boolean
        secondaryColor?: string
    }
): ThemeConfig {
    const { name, isDark = false, secondaryColor } = options
    const id = options.id ?? name.toLowerCase().replace(/\s+/g, '-')
    const secondary = secondaryColor ?? adjustColor(primaryColor, isDark ? 20 : -20)

    const baseTheme = isDark ? darkTheme : lightTheme

    return createTheme({
        name,
        id,
        isDark,
        colors: {
            brand: {
                primary: primaryColor,
                secondary,
                gradient: `linear-gradient(135deg, ${primaryColor} 0%, ${secondary} 100%)`,
            },
            border: {
                ...baseTheme.colors.border,
                focus: primaryColor,
            },
        },
    })
}

/**
 * 简单的颜色调整函数
 * 正值变亮，负值变暗
 */
function adjustColor(color: string, amount: number): string {
    // 移除 # 前缀
    const hex = color.replace('#', '')

    // 解析 RGB
    let r = parseInt(hex.substring(0, 2), 16)
    let g = parseInt(hex.substring(2, 4), 16)
    let b = parseInt(hex.substring(4, 6), 16)

    // 调整亮度
    r = Math.min(255, Math.max(0, r + amount))
    g = Math.min(255, Math.max(0, g + amount))
    b = Math.min(255, Math.max(0, b + amount))

    // 转回 hex
    return `#${r.toString(16).padStart(2, '0')}${g.toString(16).padStart(2, '0')}${b.toString(16).padStart(2, '0')}`
}

/**
 * 将主题颜色转换为 CSS 变量
 */
export function themeToCSSVariables(theme: ThemeConfig): Record<string, string> {
    const variables: Record<string, string> = {}

    // 背景色
    variables['--color-bg-primary'] = theme.colors.background.primary
    variables['--color-bg-secondary'] = theme.colors.background.secondary
    variables['--color-bg-tertiary'] = theme.colors.background.tertiary
    variables['--color-bg-overlay'] = theme.colors.background.overlay

    // 表面色
    variables['--color-surface'] = theme.colors.surface.default
    variables['--color-surface-hover'] = theme.colors.surface.hover
    variables['--color-surface-active'] = theme.colors.surface.active
    variables['--color-surface-elevated'] = theme.colors.surface.elevated

    // 文本色
    variables['--color-text-primary'] = theme.colors.text.primary
    variables['--color-text-secondary'] = theme.colors.text.secondary
    variables['--color-text-tertiary'] = theme.colors.text.tertiary
    variables['--color-text-inverse'] = theme.colors.text.inverse
    variables['--color-text-disabled'] = theme.colors.text.disabled

    // 边框色
    variables['--color-border'] = theme.colors.border.default
    variables['--color-border-hover'] = theme.colors.border.hover
    variables['--color-border-focus'] = theme.colors.border.focus
    variables['--color-border-divider'] = theme.colors.border.divider

    // 品牌色
    variables['--color-brand-primary'] = theme.colors.brand.primary
    variables['--color-brand-secondary'] = theme.colors.brand.secondary
    variables['--color-brand-gradient'] = theme.colors.brand.gradient

    // 语义色
    variables['--color-semantic-success'] = theme.colors.semantic.success
    variables['--color-semantic-warning'] = theme.colors.semantic.warning
    variables['--color-semantic-error'] = theme.colors.semantic.error
    variables['--color-semantic-info'] = theme.colors.semantic.info

    return variables
}
