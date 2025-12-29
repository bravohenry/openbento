/**
 * [INPUT]: (WidgetConfig[], ProfileData, localStorage) - Widget configuration array, profile data, and local storage interface
 * [OUTPUT]: (EditorProvider, useEditor) - Editor context provider and hook with widget and profile management
 * [POS]: Located at /bento/editor state management layer, manages edit mode, selected Widget, Widgets CRUD operations, and Profile data persistence.
 * 
 * [PROTOCOL]:
 * 1. Once this file's logic changes, this Header must be synchronized immediately.
 * 2. After update, must check upward whether /src/bento/editor/.folder.md description is still accurate.
 */

import React, { createContext, useContext, useState, useEffect, useCallback, ReactNode } from 'react'
import type { WidgetConfig } from '../widgets/types'

export type ViewMode = 'desktop' | 'mobile'

// ============ LocalStorage Key ============

const STORAGE_KEY = 'openbento-widgets'
const PROFILE_STORAGE_KEY = 'openbento-profile'
const STORAGE_VERSION = '1.0'

// ============ Storage Types ============

interface StoredLayout {
    widgets?: WidgetConfig[] // Legacy support
    desktopWidgets: WidgetConfig[]
    mobileWidgets: WidgetConfig[]
    version: string
}

export interface ProfileData {
    name: string
    description: string
    avatarUrl?: string
}

// ============ Context Value ============

interface EditorContextValue {
    isEditing: boolean
    setIsEditing: (value: boolean) => void
    viewMode: ViewMode
    setViewMode: (mode: ViewMode) => void
    selectedWidgetId: string | null
    setSelectedWidgetId: (id: string | null) => void
    // Widget management - current view mode widgets
    widgets: WidgetConfig[]
    // Desktop widgets
    desktopWidgets: WidgetConfig[]
    addDesktopWidget: (widget: WidgetConfig) => void
    removeDesktopWidget: (id: string) => void
    updateDesktopWidget: (id: string, updates: Partial<WidgetConfig>) => void
    reorderDesktopWidgets: (newOrder: WidgetConfig[]) => void
    // Mobile widgets
    mobileWidgets: WidgetConfig[]
    addMobileWidget: (widget: WidgetConfig) => void
    removeMobileWidget: (id: string) => void
    updateMobileWidget: (id: string, updates: Partial<WidgetConfig>) => void
    reorderMobileWidgets: (newOrder: WidgetConfig[]) => void
    // Unified widget operations (operate on current view mode)
    addWidget: (widget: WidgetConfig) => void
    removeWidget: (id: string) => void
    updateWidget: (id: string, updates: Partial<WidgetConfig>) => void
    reorderWidgets: (newOrder: WidgetConfig[]) => void
    // Profile management
    profile: ProfileData
    updateProfile: (updates: Partial<ProfileData>) => void
    // Persistence
    loadLayout: () => WidgetConfig[] | null
    clearLayout: () => void
    // Layout sync
    syncDesktopToMobile: () => void
}

const EditorContext = createContext<EditorContextValue | undefined>(undefined)

// ============ Provider ============

export const EditorProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [isEditing, setIsEditing] = useState(true) // Default to edit mode for development convenience
    const [viewMode, setViewMode] = useState<ViewMode>('desktop')
    const [selectedWidgetId, setSelectedWidgetId] = useState<string | null>(null)
    const [desktopWidgets, setDesktopWidgets] = useState<WidgetConfig[]>([])
    const [mobileWidgets, setMobileWidgets] = useState<WidgetConfig[]>([])
    const [profile, setProfile] = useState<ProfileData>({
        name: 'Biuty AI',
        description: "Don't waste another dollar on products that don't work. Let AI analyze your skin.",
        avatarUrl: undefined,
    })

    // Current widgets based on view mode
    const widgets = viewMode === 'desktop' ? desktopWidgets : mobileWidgets

    // ============ Load from localStorage on mount ============

    useEffect(() => {
        const stored = localStorage.getItem(STORAGE_KEY)
        if (stored) {
            try {
                const data: StoredLayout = JSON.parse(stored)
                if (data.version === STORAGE_VERSION) {
                    // Support legacy format (single widgets array)
                    if (data.widgets && !data.desktopWidgets) {
                        setDesktopWidgets(data.widgets)
                        setMobileWidgets([]) // Mobile layout will be synced on first switch
                    } else {
                        // New format with separate desktop and mobile layouts
                        if (Array.isArray(data.desktopWidgets)) {
                            setDesktopWidgets(data.desktopWidgets)
                        }
                        if (Array.isArray(data.mobileWidgets)) {
                            setMobileWidgets(data.mobileWidgets)
                        }
                    }
                }
            } catch (error) {
                console.error('Failed to load layout from localStorage:', error)
            }
        }

        // Load profile data
        const storedProfile = localStorage.getItem(PROFILE_STORAGE_KEY)
        if (storedProfile) {
            try {
                const profileData: ProfileData = JSON.parse(storedProfile)
                setProfile(profileData)
            } catch (error) {
                console.error('Failed to load profile from localStorage:', error)
            }
        }
    }, [])

    // ============ Auto-save to localStorage ============

    useEffect(() => {
        if (desktopWidgets.length > 0 || mobileWidgets.length > 0 || localStorage.getItem(STORAGE_KEY)) {
            const data: StoredLayout = {
                desktopWidgets,
                mobileWidgets,
                version: STORAGE_VERSION,
            }
            localStorage.setItem(STORAGE_KEY, JSON.stringify(data))
        }
    }, [desktopWidgets, mobileWidgets])

    // Auto-save profile data
    useEffect(() => {
        localStorage.setItem(PROFILE_STORAGE_KEY, JSON.stringify(profile))
    }, [profile])

    // ============ Desktop Widget CRUD Operations ============

    const addDesktopWidget = useCallback((widget: WidgetConfig) => {
        setDesktopWidgets((prev) => [...prev, widget])
        if (viewMode === 'desktop') {
            setSelectedWidgetId(widget.id)
        }
    }, [viewMode])

    const removeDesktopWidget = useCallback((id: string) => {
        setDesktopWidgets((prev) => prev.filter((w) => w.id !== id))
        if (viewMode === 'desktop') {
            setSelectedWidgetId((prev) => (prev === id ? null : prev))
        }
    }, [viewMode])

    const updateDesktopWidget = useCallback((id: string, updates: Partial<WidgetConfig>) => {
        setDesktopWidgets((prev) =>
            prev.map((w) => (w.id === id ? { ...w, ...updates } as WidgetConfig : w))
        )
    }, [])

    const reorderDesktopWidgets = useCallback((newOrder: WidgetConfig[]) => {
        setDesktopWidgets(newOrder)
    }, [])

    // ============ Mobile Widget CRUD Operations ============

    const addMobileWidget = useCallback((widget: WidgetConfig) => {
        setMobileWidgets((prev) => [...prev, widget])
        if (viewMode === 'mobile') {
            setSelectedWidgetId(widget.id)
        }
    }, [viewMode])

    const removeMobileWidget = useCallback((id: string) => {
        setMobileWidgets((prev) => prev.filter((w) => w.id !== id))
        if (viewMode === 'mobile') {
            setSelectedWidgetId((prev) => (prev === id ? null : prev))
        }
    }, [viewMode])

    const updateMobileWidget = useCallback((id: string, updates: Partial<WidgetConfig>) => {
        setMobileWidgets((prev) =>
            prev.map((w) => (w.id === id ? { ...w, ...updates } as WidgetConfig : w))
        )
    }, [])

    const reorderMobileWidgets = useCallback((newOrder: WidgetConfig[]) => {
        setMobileWidgets(newOrder)
    }, [])

    // ============ Unified Widget Operations (operate on current view mode) ============

    const addWidget = useCallback((widget: WidgetConfig) => {
        if (viewMode === 'desktop') {
            addDesktopWidget(widget)
        } else {
            addMobileWidget(widget)
        }
    }, [viewMode, addDesktopWidget, addMobileWidget])

    const removeWidget = useCallback((id: string) => {
        if (viewMode === 'desktop') {
            removeDesktopWidget(id)
        } else {
            removeMobileWidget(id)
        }
    }, [viewMode, removeDesktopWidget, removeMobileWidget])

    const updateWidget = useCallback((id: string, updates: Partial<WidgetConfig>) => {
        if (viewMode === 'desktop') {
            updateDesktopWidget(id, updates)
        } else {
            updateMobileWidget(id, updates)
        }
    }, [viewMode, updateDesktopWidget, updateMobileWidget])

    const reorderWidgets = useCallback((newOrder: WidgetConfig[]) => {
        if (viewMode === 'desktop') {
            reorderDesktopWidgets(newOrder)
        } else {
            reorderMobileWidgets(newOrder)
        }
    }, [viewMode, reorderDesktopWidgets, reorderMobileWidgets])

    // ============ Layout Sync ============

    const syncDesktopToMobile = useCallback(() => {
        // Deep clone desktop widgets to mobile
        setMobileWidgets(JSON.parse(JSON.stringify(desktopWidgets)))
    }, [desktopWidgets])

    // ============ Profile Management ============

    const updateProfile = useCallback((updates: Partial<ProfileData>) => {
        setProfile((prev) => ({ ...prev, ...updates }))
    }, [])

    // ============ Persistence Helpers ============

    const loadLayout = useCallback((): WidgetConfig[] | null => {
        const stored = localStorage.getItem(STORAGE_KEY)
        if (stored) {
            try {
                const data: StoredLayout = JSON.parse(stored)
                if (data.version === STORAGE_VERSION) {
                    // Return widgets for current view mode
                    if (viewMode === 'desktop' && Array.isArray(data.desktopWidgets)) {
                        return data.desktopWidgets
                    }
                    if (viewMode === 'mobile' && Array.isArray(data.mobileWidgets)) {
                        return data.mobileWidgets
                    }
                    // Legacy support
                    if (data.widgets && Array.isArray(data.widgets)) {
                        return data.widgets
                    }
                }
            } catch (error) {
                console.error('Failed to load layout:', error)
            }
        }
        return null
    }, [viewMode])

    const clearLayout = useCallback(() => {
        localStorage.removeItem(STORAGE_KEY)
        setDesktopWidgets([])
        setMobileWidgets([])
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
                desktopWidgets,
                addDesktopWidget,
                removeDesktopWidget,
                updateDesktopWidget,
                reorderDesktopWidgets,
                mobileWidgets,
                addMobileWidget,
                removeMobileWidget,
                updateMobileWidget,
                reorderMobileWidgets,
                addWidget,
                removeWidget,
                updateWidget,
                reorderWidgets,
                profile,
                updateProfile,
                loadLayout,
                clearLayout,
                syncDesktopToMobile,
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
