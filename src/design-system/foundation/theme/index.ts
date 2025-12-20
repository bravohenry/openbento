/**
 * OpenBento Design System - Theme Module
 * 
 * 主题系统统一导出
 */

// 类型
export type {
    ThemeColors,
    ThemeConfig,
    ThemeContextValue,
    ThemeProviderProps,
    PresetThemeId,
    PresetTheme,
} from './types'

// 组件
export { ThemeProvider, ThemeContext } from './ThemeProvider'

// Hooks
export {
    useTheme,
    useIsDarkMode,
    useThemeColors,
    useThemeValue,
} from './useTheme'

// 主题配置
export { lightTheme } from './themes/light'
export { darkTheme } from './themes/dark'
export {
    midnightTheme,
    forestTheme,
    sunsetTheme,
    oceanTheme,
    lavenderTheme,
    roseTheme,
    presetThemes,
    presetThemeList,
} from './themes/presets'

// 工厂函数
export {
    createTheme,
    createThemeFromColor,
    themeToCSSVariables,
} from './createTheme'
