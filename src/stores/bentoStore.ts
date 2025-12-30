/**
 * @input  - Widget configs, user actions
 * @output - Per-user bento layouts, CRUD operations
 * @pos    - /src/stores/bentoStore.ts - Bento layout state management
 * 
 * Uses Supabase API for persistence.
 */

import { create } from 'zustand'
import type { WidgetConfig } from '@/bento/widgets/types'

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
    loadLayout: () => Promise<void>
    saveLayout: () => Promise<void>
    clearLayout: () => void

    // Public profile loading
    loadPublicLayout: (handle: string) => Promise<WidgetConfig[] | null>
}

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

    loadLayout: async () => {
        try {
            const response = await fetch('/api/bento/layout')
            const data = await response.json()

            if (response.ok && data.layout) {
                const widgets = Array.isArray(data.layout.widgets) ? data.layout.widgets : []
                set({ currentLayout: widgets, isDirty: false })
            } else {
                set({ currentLayout: [], isDirty: false })
            }
        } catch (error) {
            console.error('Load layout error:', error)
            set({ currentLayout: [], isDirty: false })
        }
    },

    saveLayout: async () => {
        const { currentLayout, viewMode } = get()

        try {
            const payload: {
                widgets: WidgetConfig[]
                desktop_layout?: unknown
                mobile_layout?: unknown
            } = {
                widgets: currentLayout,
            }

            // Save layout based on view mode
            if (viewMode === 'desktop') {
                payload.desktop_layout = currentLayout
            } else {
                payload.mobile_layout = currentLayout
            }

            const response = await fetch('/api/bento/layout', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload),
            })

            const data = await response.json()

            if (response.ok) {
                set({ isDirty: false })
            } else {
                console.error('Save layout error:', data.error)
            }
        } catch (error) {
            console.error('Save layout error:', error)
        }
    },

    clearLayout: () => {
        set({ currentLayout: [], selectedWidgetId: null, isDirty: false })
    },

    loadPublicLayout: async (handle: string): Promise<WidgetConfig[] | null> => {
        try {
            const response = await fetch(`/api/bento/layout/public/${handle}`)
            const data = await response.json()

            if (response.ok && data.layout) {
                return Array.isArray(data.layout.widgets) ? data.layout.widgets : []
            }
            return null
        } catch (error) {
            console.error('Load public layout error:', error)
            return null
        }
    },
}))

export default useBentoStore
