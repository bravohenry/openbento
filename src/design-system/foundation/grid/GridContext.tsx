'use client'

/**
 * OpenBento Design System - Grid Context
 * 
 * 网格系统上下文
 */

import React, { createContext, useContext, useMemo, useState, useCallback, useEffect } from 'react'
import {
    RESPONSIVE_GRID_CONFIG,
    DEFAULT_COLUMNS,
    DEFAULT_GAP,
    type GridConfig,
    type GridBreakpoint,
    type WidgetSize,
} from './constants'
import { getBreakpointFromWidth, getGridConfigForBreakpoint, getResponsiveSize } from './utils'

// ============ 类型定义 ============

export interface GridContextValue {
    /** 当前网格配置 */
    config: GridConfig
    /** 当前断点 */
    breakpoint: GridBreakpoint
    /** 是否为编辑模式 */
    isEditing: boolean
    /** 设置编辑模式 */
    setIsEditing: (editing: boolean) => void
    /** 获取响应式尺寸 */
    getResponsiveSize: (size: WidgetSize) => WidgetSize
    /** 窗口宽度 */
    windowWidth: number
}

export interface GridProviderProps {
    children: React.ReactNode
    /** 初始编辑模式 */
    initialEditing?: boolean
    /** 自定义网格配置 (覆盖默认) */
    customConfig?: Partial<GridConfig>
}

// ============ 上下文创建 ============

const GridContext = createContext<GridContextValue | null>(null)

// ============ 网格提供者组件 ============

export function GridProvider({
    children,
    initialEditing = false,
    customConfig,
}: GridProviderProps) {
    const [isEditing, setIsEditing] = useState(initialEditing)
    const [windowWidth, setWindowWidth] = useState(() => {
        if (typeof window === 'undefined') return 1024 // SSR 默认值
        return window.innerWidth
    })

    // 监听窗口大小变化
    useEffect(() => {
        const handleResize = () => {
            setWindowWidth(window.innerWidth)
        }

        window.addEventListener('resize', handleResize)
        return () => window.removeEventListener('resize', handleResize)
    }, [])

    // 计算当前断点
    const breakpoint = useMemo(() => {
        return getBreakpointFromWidth(windowWidth)
    }, [windowWidth])

    // 计算当前网格配置
    const config = useMemo<GridConfig>(() => {
        const baseConfig = getGridConfigForBreakpoint(breakpoint)
        if (customConfig) {
            return { ...baseConfig, ...customConfig }
        }
        return baseConfig
    }, [breakpoint, customConfig])

    // 获取响应式尺寸
    const getResponsiveSizeCallback = useCallback(
        (size: WidgetSize) => getResponsiveSize(size, breakpoint),
        [breakpoint]
    )

    // 上下文值
    const contextValue = useMemo<GridContextValue>(() => ({
        config,
        breakpoint,
        isEditing,
        setIsEditing,
        getResponsiveSize: getResponsiveSizeCallback,
        windowWidth,
    }), [config, breakpoint, isEditing, getResponsiveSizeCallback, windowWidth])

    return (
        <GridContext.Provider value={contextValue}>
            {children}
        </GridContext.Provider>
    )
}

// ============ Hooks ============

/**
 * 获取网格上下文
 */
export function useGrid(): GridContextValue {
    const context = useContext(GridContext)

    if (!context) {
        throw new Error('useGrid must be used within a GridProvider')
    }

    return context
}

/**
 * 获取当前网格配置
 */
export function useGridConfig(): GridConfig {
    const { config } = useGrid()
    return config
}

/**
 * 获取当前断点
 */
export function useBreakpoint(): GridBreakpoint {
    const { breakpoint } = useGrid()
    return breakpoint
}

/**
 * 获取是否为编辑模式
 */
export function useIsEditing(): [boolean, (editing: boolean) => void] {
    const { isEditing, setIsEditing } = useGrid()
    return [isEditing, setIsEditing]
}

/**
 * 简化的响应式断点判断
 */
export function useResponsive() {
    const { breakpoint, windowWidth } = useGrid()

    return {
        isMobile: breakpoint === 'mobile',
        isTablet: breakpoint === 'tablet',
        isDesktop: breakpoint === 'desktop' || breakpoint === 'wide',
        isWide: breakpoint === 'wide',
        breakpoint,
        windowWidth,
    }
}
