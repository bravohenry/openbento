/**
 * @input  - Widget configs, user actions
 * @output - Per-user bento layouts, CRUD operations
 * @pos    - /src/stores/bentoStore.ts - Bento layout state management
 * 
 * Stores layouts per-user in localStorage.
 * Migrated from EditorContext.tsx localStorage logic.
 */

import { create } from 'zustand'
import { storage } from '@/lib/storage'
import type { WidgetConfig } from '@/bento/widgets/types'

// ============ Types ============

interface LayoutData {
    widgets: WidgetConfig[]
    updatedAt: string
}

interface BentoState {
    // Current editing state
    currentLayout: WidgetConfig[]
    isEditing: boolean
    selectedWidgetId: string | null
    viewMode: 'desktop' | 'mobile'
    isDirty: boolean

    // Actions
    setWidgets: (widgets: WidgetConfig[]) => void
    addWidget: (widget: WidgetConfig) => void
    removeWidget: (id: string) => void
    updateWidget: (id: string, updates: Partial<WidgetConfig>) => void
    reorderWidgets: (widgets: WidgetConfig[]) => void

    // Selection
    selectWidget: (id: string | null) => void

    // Editing mode
    setEditing: (editing: boolean) => void
    setViewMode: (mode: 'desktop' | 'mobile') => void

    // Persistence
    loadLayout: (userId: string) => void
    saveLayout: (userId: string) => void
    clearLayout: () => void

    // Public profile loading
    loadPublicLayout: (username: string) => WidgetConfig[] | null
}

// ============ Storage Keys ============

const LAYOUTS_KEY = 'layouts' // { [userId]: LayoutData }

// ============ Store ============

export const useBentoStore = create<BentoState>((set, get) => ({
    currentLayout: [],
    isEditing: true,
    selectedWidgetId: null,
    viewMode: 'desktop',
    isDirty: false,

    setWidgets: (widgets) => {
        set({ currentLayout: widgets, isDirty: true })
    },

    addWidget: (widget) => {
        set((state) => ({
            currentLayout: [...state.currentLayout, widget],
            selectedWidgetId: widget.id,
            isDirty: true,
        }))
    },

    removeWidget: (id) => {
        set((state) => ({
            currentLayout: state.currentLayout.filter(w => w.id !== id),
            selectedWidgetId: state.selectedWidgetId === id ? null : state.selectedWidgetId,
            isDirty: true,
        }))
    },

    updateWidget: (id, updates) => {
        set((state) => ({
            currentLayout: state.currentLayout.map(w =>
                w.id === id ? { ...w, ...updates } as WidgetConfig : w
            ),
            isDirty: true,
        }))
    },

    reorderWidgets: (widgets) => {
        set({ currentLayout: widgets, isDirty: true })
    },

    selectWidget: (id) => {
        set({ selectedWidgetId: id })
    },

    setEditing: (editing) => {
        set({ isEditing: editing, selectedWidgetId: editing ? null : null })
    },

    setViewMode: (mode) => {
        set({ viewMode: mode })
    },

    loadLayout: (userId) => {
        const layouts = storage.get<Record<string, LayoutData>>(LAYOUTS_KEY) || {}
        const userLayout = layouts[userId]

        if (userLayout && Array.isArray(userLayout.widgets)) {
            set({ currentLayout: userLayout.widgets, isDirty: false })
        } else {
            set({ currentLayout: [], isDirty: false })
        }
    },

    saveLayout: (userId) => {
        const { currentLayout } = get()
        const layouts = storage.get<Record<string, LayoutData>>(LAYOUTS_KEY) || {}

        layouts[userId] = {
            widgets: currentLayout,
            updatedAt: new Date().toISOString(),
        }

        storage.set(LAYOUTS_KEY, layouts)
        set({ isDirty: false })
    },

    clearLayout: () => {
        set({ currentLayout: [], selectedWidgetId: null, isDirty: false })
    },

    loadPublicLayout: (username) => {
        // First need to find userId by username
        const users = storage.get<Array<{ id: string; username: string }>>('users') || []
        const user = users.find(u => u.username.toLowerCase() === username.toLowerCase())

        if (!user) return null

        const layouts = storage.get<Record<string, LayoutData>>(LAYOUTS_KEY) || {}
        const userLayout = layouts[user.id]

        return userLayout?.widgets || null
    },
}))

export default useBentoStore
