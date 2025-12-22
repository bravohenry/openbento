/**
 * [INPUT]: (WidgetConfig[], localStorage) - Widget 配置数组和本地存储接口
 * [OUTPUT]: (EditorProvider, useEditor, useSelectedWidget, useWidgets) - 编辑器上下文提供者和相关 Hooks
 * [POS]: 位于 /bento/editor 的状态管理层，管理编辑模式、选中 Widget、Widgets CRUD 操作。
 * 
 * [PROTOCOL]:
 * 1. 一旦本文件逻辑变更，必须同步更新此 Header。
 * 2. 更新后必须上浮检查 /src/bento/editor/.folder.md 的描述是否依然准确。
 */

import React, { createContext, useContext, useState, useEffect, useCallback, ReactNode } from 'react'
import type { WidgetConfig } from '../widgets/types'

export type ViewMode = 'desktop' | 'mobile'

// ============ LocalStorage Key ============

const STORAGE_KEY = 'openbento-widgets'
const STORAGE_VERSION = '1.0'

// ============ Storage Types ============

interface StoredLayout {
    widgets: WidgetConfig[]
    version: string
}

// ============ Context Value ============

interface EditorContextValue {
    isEditing: boolean
    setIsEditing: (value: boolean) => void
    viewMode: ViewMode
    setViewMode: (mode: ViewMode) => void
    selectedWidgetId: string | null
    setSelectedWidgetId: (id: string | null) => void
    // Widget management
    widgets: WidgetConfig[]
    addWidget: (widget: WidgetConfig) => void
    removeWidget: (id: string) => void
    updateWidget: (id: string, updates: Partial<WidgetConfig>) => void
    reorderWidgets: (newOrder: WidgetConfig[]) => void
    // Persistence
    loadLayout: () => WidgetConfig[] | null
    clearLayout: () => void
}

const EditorContext = createContext<EditorContextValue | undefined>(undefined)

// ============ Provider ============

export const EditorProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [isEditing, setIsEditing] = useState(true) // 默认开启编辑模式方便开发
    const [viewMode, setViewMode] = useState<ViewMode>('desktop')
    const [selectedWidgetId, setSelectedWidgetId] = useState<string | null>(null)
    const [widgets, setWidgets] = useState<WidgetConfig[]>([])

    // ============ Load from localStorage on mount ============

    useEffect(() => {
        const stored = localStorage.getItem(STORAGE_KEY)
        if (stored) {
            try {
                const data: StoredLayout = JSON.parse(stored)
                if (data.version === STORAGE_VERSION && Array.isArray(data.widgets)) {
                    setWidgets(data.widgets)
                }
            } catch (error) {
                console.error('Failed to load layout from localStorage:', error)
            }
        }
    }, [])

    // ============ Auto-save to localStorage ============

    useEffect(() => {
        if (widgets.length > 0 || localStorage.getItem(STORAGE_KEY)) {
            const data: StoredLayout = {
                widgets,
                version: STORAGE_VERSION,
            }
            localStorage.setItem(STORAGE_KEY, JSON.stringify(data))
        }
    }, [widgets])

    // ============ Widget CRUD Operations ============

    const addWidget = useCallback((widget: WidgetConfig) => {
        setWidgets((prev) => [...prev, widget])
        setSelectedWidgetId(widget.id)
    }, [])

    const removeWidget = useCallback((id: string) => {
        setWidgets((prev) => prev.filter((w) => w.id !== id))
        setSelectedWidgetId((prev) => (prev === id ? null : prev))
    }, [])

    const updateWidget = useCallback((id: string, updates: Partial<WidgetConfig>) => {
        setWidgets((prev) =>
            prev.map((w) => (w.id === id ? { ...w, ...updates } as WidgetConfig : w))
        )
    }, [])

    const reorderWidgets = useCallback((newOrder: WidgetConfig[]) => {
        setWidgets(newOrder)
    }, [])

    // ============ Persistence Helpers ============

    const loadLayout = useCallback((): WidgetConfig[] | null => {
        const stored = localStorage.getItem(STORAGE_KEY)
        if (stored) {
            try {
                const data: StoredLayout = JSON.parse(stored)
                if (data.version === STORAGE_VERSION && Array.isArray(data.widgets)) {
                    return data.widgets
                }
            } catch (error) {
                console.error('Failed to load layout:', error)
            }
        }
        return null
    }, [])

    const clearLayout = useCallback(() => {
        localStorage.removeItem(STORAGE_KEY)
        setWidgets([])
        setSelectedWidgetId(null)
    }, [])

    return (
        <EditorContext.Provider
            value={{
                isEditing,
                setIsEditing,
                viewMode,
                setViewMode,
                selectedWidgetId,
                setSelectedWidgetId,
                widgets,
                addWidget,
                removeWidget,
                updateWidget,
                reorderWidgets,
                loadLayout,
                clearLayout,
            }}
        >
            {children}
        </EditorContext.Provider>
    )
}

export const useEditor = () => {
    const context = useContext(EditorContext)
    if (context === undefined) {
        throw new Error('useEditor must be used within an EditorProvider')
    }
    return context
}
