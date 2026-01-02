/**
 * [INPUT]: (WidgetConfig[], ProfileData, localStorage) - Widget configuration array, profile data, and local storage interface
 * [OUTPUT]: (EditorProvider, useEditor) - Editor context provider and hook with widget and profile management
 * [POS]: Located at /bento/editor state management layer, manages edit mode, selected Widget, Widgets CRUD operations, and Profile data persistence.
 * 
 * [PROTOCOL]:
 * 1. Once this file's logic changes, this Header must be synchronized immediately.
 * 2. After update, must check upward whether /src/bento/editor/.folder.md description is still accurate.
 */

import React, { createContext, useContext, useState, useEffect, useCallback, useRef, ReactNode } from 'react'
import type { WidgetConfig, WidgetSize } from '../widgets/types'
import { useUserStore } from '@/stores'

export type ViewMode = 'desktop' | 'mobile'

// ============ LocalStorage Key ============

const STORAGE_KEY = 'openbento-widgets'
const PROFILE_STORAGE_KEY = 'openbento-profile'
const STORAGE_VERSION = '1.1'

// ============ Storage Types ============

interface StoredLayout {
    widgets?: WidgetConfig[] // Legacy support
    desktopWidgets: WidgetConfig[]
    mobileWidgets: WidgetConfig[]
    layoutIndependent?: {
        desktop: boolean
        mobile: boolean
    }
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
    // Layout independence
    layoutIndependent: { desktop: boolean; mobile: boolean }
    markLayoutIndependent: (viewMode: ViewMode) => void
}

const EditorContext = createContext<EditorContextValue | undefined>(undefined)

// ============ Provider ============

// ============ Property Type Helpers ============

// Content properties that should sync across views
const CONTENT_PROPERTIES = [
    'category', 'type', 'content', 'url', 'title', 'description',
    'imageUrl', 'platform', 'subtitle', 'ctaLabel', 'customIcon', 'customColor',
    'address', 'lat', 'lng', 'location', 'zoom', 'style', 'variant', 'attribution', 'emoji'
] as const

// Layout properties that can be independent
const LAYOUT_PROPERTIES = ['size'] as const

// Check if a property is a content property
const isContentProperty = (key: string): boolean => {
    return CONTENT_PROPERTIES.includes(key as any)
}

// Check if a property is a layout property
const isLayoutProperty = (key: string): boolean => {
    return LAYOUT_PROPERTIES.includes(key as any)
}

// Extract content properties from widget (excluding layout properties)
const extractContentProperties = (widget: WidgetConfig): Omit<WidgetConfig, 'size'> & { size?: WidgetSize } => {
    const { size, ...rest } = widget
    return rest as Omit<WidgetConfig, 'size'> & { size?: WidgetSize }
}

export const EditorProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const { user, updateProfile: updateUserProfile } = useUserStore()
    const [isEditing, setIsEditing] = useState(true) // Default to edit mode for development convenience
    const [viewMode, setViewMode] = useState<ViewMode>('desktop')
    const [selectedWidgetId, setSelectedWidgetId] = useState<string | null>(null)
    const [desktopWidgets, setDesktopWidgets] = useState<WidgetConfig[]>([])
    const [mobileWidgets, setMobileWidgets] = useState<WidgetConfig[]>([])
    const [layoutIndependent, setLayoutIndependent] = useState<{ desktop: boolean; mobile: boolean }>({
        desktop: false,
        mobile: false,
    })
    const [profile, setProfile] = useState<ProfileData>({
        name: 'LinkCard',
        description: "The first context-aware identity OS. Create a dynamic Link Card that lives natively in Apple Wallet. Features AI agents, offline sync, and zero-app sharing.",
        avatarUrl: undefined,
    })

    // Current widgets based on view mode
    const widgets = viewMode === 'desktop' ? desktopWidgets : mobileWidgets

    // ============ Sync content properties when switching view modes ============
    
    // Track previous viewMode to detect changes
    const prevViewModeRef = useRef<ViewMode>(viewMode)
    
    // When switching view modes, sync content properties from source to target
    useEffect(() => {
        // Only sync if viewMode actually changed
        if (prevViewModeRef.current === viewMode) return
        prevViewModeRef.current = viewMode

        // Skip if either layout is empty
        if (desktopWidgets.length === 0 && mobileWidgets.length === 0) return

        if (viewMode === 'desktop') {
            // Switching to desktop: sync content from mobile to desktop
            desktopWidgets.forEach(desktopWidget => {
                const mobileWidget = mobileWidgets.find(w => w.id === desktopWidget.id)
                if (mobileWidget) {
                    // Extract content properties from mobile widget
                    const contentProps = extractContentProperties(mobileWidget)
                    // Only update if content differs
                    const hasContentDiff = Object.keys(contentProps).some(key => {
                        const desktopValue = (desktopWidget as any)[key]
                        const mobileValue = (contentProps as any)[key]
                        return JSON.stringify(desktopValue) !== JSON.stringify(mobileValue)
                    })
                    if (hasContentDiff) {
                        setDesktopWidgets(prev => prev.map(w => 
                            w.id === desktopWidget.id ? { ...w, ...contentProps } as WidgetConfig : w
                        ))
                    }
                }
            })
        } else {
            // Switching to mobile: sync content from desktop to mobile
            mobileWidgets.forEach(mobileWidget => {
                const desktopWidget = desktopWidgets.find(w => w.id === mobileWidget.id)
                if (desktopWidget) {
                    // Extract content properties from desktop widget
                    const contentProps = extractContentProperties(desktopWidget)
                    // Only update if content differs
                    const hasContentDiff = Object.keys(contentProps).some(key => {
                        const mobileValue = (mobileWidget as any)[key]
                        const desktopValue = (contentProps as any)[key]
                        return JSON.stringify(mobileValue) !== JSON.stringify(desktopValue)
                    })
                    if (hasContentDiff) {
                        setMobileWidgets(prev => prev.map(w => 
                            w.id === mobileWidget.id ? { ...w, ...contentProps } as WidgetConfig : w
                        ))
                    }
                }
            })
        }
    }, [viewMode, desktopWidgets, mobileWidgets])

    // ============ Load from localStorage on mount ============

    useEffect(() => {
        // Only load from localStorage if user is not logged in yet
        // If user is logged in, we'll load from Supabase instead
        if (!user) {
            const stored = localStorage.getItem(STORAGE_KEY)
            if (stored) {
                try {
                    const data: StoredLayout = JSON.parse(stored)
                    // Support both old and new versions
                    if (data.version === STORAGE_VERSION || data.version === '1.0') {
                        // Support legacy format (single widgets array)
                        if (data.widgets && !data.desktopWidgets) {
                            setDesktopWidgets(data.widgets)
                            setMobileWidgets([]) // Mobile layout will be synced on first switch
                            setLayoutIndependent({ desktop: false, mobile: false })
                        } else {
                            // New format with separate desktop and mobile layouts
                            if (Array.isArray(data.desktopWidgets)) {
                                setDesktopWidgets(data.desktopWidgets)
                            }
                            if (Array.isArray(data.mobileWidgets)) {
                                setMobileWidgets(data.mobileWidgets)
                            }
                            // Load layout independence state
                            if (data.layoutIndependent) {
                                setLayoutIndependent(data.layoutIndependent)
                            } else {
                                setLayoutIndependent({ desktop: false, mobile: false })
                            }
                        }
                    }
                } catch (error) {
                    console.error('Failed to load layout from localStorage:', error)
                }
            }

            const storedProfile = localStorage.getItem(PROFILE_STORAGE_KEY)
            if (storedProfile) {
                try {
                    const profileData: ProfileData = JSON.parse(storedProfile)
                    // Only use localStorage data if it's not the default values
                    const isDefaultProfile = profileData.name === 'LinkCard' && 
                        profileData.description === "The first context-aware identity OS. Create a dynamic Link Card that lives natively in Apple Wallet. Features AI agents, offline sync, and zero-app sharing."
                    if (!isDefaultProfile) {
                        setProfile(profileData)
                    }
                } catch (error) {
                    console.error('Failed to load profile from localStorage:', error)
                }
            }
        }
    }, [user])

    // ============ Load profile and layout from Supabase when user logs in ============

    const hasLoadedFromSupabase = React.useRef<string | null>(null)

    useEffect(() => {
        if (user) {
            // Use user.id as the key to track if we've loaded for this specific user
            // This ensures we reload when switching users or after refresh
            const userId = user.id
            
            if (hasLoadedFromSupabase.current !== userId) {
                // Load from Supabase for this user
                hasLoadedFromSupabase.current = userId
                
                const loadFromSupabase = async () => {
                    try {
                        // Load profile data
                        const profileData: ProfileData = {
                            name: user.displayName || user.username || 'LinkCard',
                            description: user.bio || "The first context-aware identity OS. Create a dynamic Link Card that lives natively in Apple Wallet. Features AI agents, offline sync, and zero-app sharing.",
                            avatarUrl: user.avatar,
                        }
                        
                        // Create profile key for comparison
                        const profileKey = JSON.stringify({
                            name: profileData.name,
                            description: profileData.description,
                            avatarUrl: profileData.avatarUrl,
                        })
                        
                        // Update last saved reference to prevent auto-save from triggering
                        lastSavedProfileRef.current = profileKey
                        
                        setProfile(profileData)
                        // Also update localStorage for offline access
                        localStorage.setItem(PROFILE_STORAGE_KEY, JSON.stringify(profileData))
                        console.log('Profile loaded from Supabase for user:', userId, profileData)

                        // Load layout data from Supabase
                        const layoutResponse = await fetch('/api/bento/layout', {
                            credentials: 'include',
                        })
                        const layoutData = await layoutResponse.json()

                        if (layoutResponse.ok && layoutData.layout) {
                            const layout = layoutData.layout
                            
                            // Load desktop layout
                            if (layout.desktop_layout && Array.isArray(layout.desktop_layout)) {
                                setDesktopWidgets(layout.desktop_layout)
                                console.log('Desktop layout loaded from Supabase:', layout.desktop_layout.length, 'widgets')
                            } else if (layout.widgets && Array.isArray(layout.widgets)) {
                                // Fallback to widgets array if desktop_layout is not available
                                setDesktopWidgets(layout.widgets)
                                console.log('Desktop layout loaded from Supabase (fallback to widgets):', layout.widgets.length, 'widgets')
                            }
                            
                            // Load mobile layout
                            if (layout.mobile_layout && Array.isArray(layout.mobile_layout)) {
                                setMobileWidgets(layout.mobile_layout)
                                console.log('Mobile layout loaded from Supabase:', layout.mobile_layout.length, 'widgets')
                            } else if (layout.widgets && Array.isArray(layout.widgets)) {
                                // Fallback to widgets array if mobile_layout is not available
                                setMobileWidgets(layout.widgets)
                                console.log('Mobile layout loaded from Supabase (fallback to widgets):', layout.widgets.length, 'widgets')
                            }
                            
                            // Update localStorage with loaded data
                            const storedLayout: StoredLayout = {
                                desktopWidgets: layout.desktop_layout || layout.widgets || [],
                                mobileWidgets: layout.mobile_layout || layout.widgets || [],
                                layoutIndependent: {
                                    desktop: !!layout.desktop_layout,
                                    mobile: !!layout.mobile_layout,
                                },
                                version: STORAGE_VERSION,
                            }
                            localStorage.setItem(STORAGE_KEY, JSON.stringify(storedLayout))
                        } else {
                            console.warn('Failed to load layout from Supabase, using localStorage fallback')
                            // Fallback to localStorage if Supabase load fails
                            const stored = localStorage.getItem(STORAGE_KEY)
                            if (stored) {
                                try {
                                    const data: StoredLayout = JSON.parse(stored)
                                    if (data.version === STORAGE_VERSION || data.version === '1.0') {
                                        if (data.widgets && !data.desktopWidgets) {
                                            setDesktopWidgets(data.widgets)
                                            setMobileWidgets([])
                                        } else {
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
                        }
                    } catch (error) {
                        console.error('Failed to load from Supabase:', error)
                        // Fallback to localStorage if Supabase load fails
                        const storedProfile = localStorage.getItem(PROFILE_STORAGE_KEY)
                        if (storedProfile) {
                            try {
                                const profileData: ProfileData = JSON.parse(storedProfile)
                                const profileKey = JSON.stringify({
                                    name: profileData.name,
                                    description: profileData.description,
                                    avatarUrl: profileData.avatarUrl,
                                })
                                lastSavedProfileRef.current = profileKey
                                setProfile(profileData)
                            } catch (parseError) {
                                console.error('Failed to parse stored profile:', parseError)
                            }
                        }
                    }
                }
                loadFromSupabase()
            }
        } else if (!user) {
            // Reset flag when user logs out
            hasLoadedFromSupabase.current = null
            lastSavedProfileRef.current = ''
        }
    }, [user])

    // ============ Auto-save to localStorage and Supabase ============

    useEffect(() => {
        if (desktopWidgets.length > 0 || mobileWidgets.length > 0 || localStorage.getItem(STORAGE_KEY)) {
            const data: StoredLayout = {
                desktopWidgets,
                mobileWidgets,
                layoutIndependent,
                version: STORAGE_VERSION,
            }
            localStorage.setItem(STORAGE_KEY, JSON.stringify(data))
            
            // Auto-save to Supabase if user is authenticated
            if (user) {
                const saveLayout = async () => {
                    try {
                        // Always save both desktop and mobile layouts
                        const payload: {
                            widgets: WidgetConfig[]
                            desktop_layout: WidgetConfig[]
                            mobile_layout: WidgetConfig[]
                        } = {
                            widgets: desktopWidgets, // Use desktop as primary widgets
                            desktop_layout: desktopWidgets,
                            mobile_layout: mobileWidgets,
                        }
                        
                        const response = await fetch('/api/bento/layout', {
                            method: 'POST',
                            headers: { 'Content-Type': 'application/json' },
                            credentials: 'include',
                            body: JSON.stringify(payload),
                        })
                        
                        if (!response.ok) {
                            const data = await response.json()
                            console.error('Auto-save layout error:', data.error)
                        } else {
                            console.log('Layout saved to Supabase:', {
                                desktop: desktopWidgets.length,
                                mobile: mobileWidgets.length,
                            })
                        }
                    } catch (error) {
                        console.error('Auto-save layout error:', error)
                    }
                }
                
                // Debounce auto-save to avoid too many API calls
                const timer = setTimeout(saveLayout, 2000)
                return () => clearTimeout(timer)
            }
        }
    }, [desktopWidgets, mobileWidgets, layoutIndependent, viewMode, user])

    // Track last saved profile to avoid unnecessary saves
    const lastSavedProfileRef = React.useRef<string>('')

    // Auto-save profile data to localStorage and Supabase
    useEffect(() => {
        // Always save to localStorage for offline access
        localStorage.setItem(PROFILE_STORAGE_KEY, JSON.stringify(profile))
        
        // Create a stable key for comparison (only include fields that matter)
        const profileKey = JSON.stringify({
            name: profile.name,
            description: profile.description,
            avatarUrl: profile.avatarUrl,
        })
        
        // Skip if profile hasn't actually changed
        if (profileKey === lastSavedProfileRef.current) {
            return
        }
        
        // Auto-save to Supabase if user is authenticated
        // Only save if profile has meaningful data (not just default values)
        if (user && (profile.name || profile.description || profile.avatarUrl)) {
            const saveProfile = async () => {
                try {
                    const profileUpdates: {
                        displayName?: string
                        bio?: string
                        avatar?: string
                    } = {}
                    
                    if (profile.name) {
                        profileUpdates.displayName = profile.name
                    }
                    if (profile.description) {
                        profileUpdates.bio = profile.description
                    }
                    if (profile.avatarUrl) {
                        profileUpdates.avatar = profile.avatarUrl
                    }
                    
                    // Only call API if there are actual updates
                    if (Object.keys(profileUpdates).length > 0) {
                        await updateUserProfile(profileUpdates)
                        // Update last saved reference after successful save
                        lastSavedProfileRef.current = profileKey
                        console.log('Profile saved to Supabase:', profileUpdates)
                    }
                } catch (error) {
                    console.error('Auto-save profile error:', error)
                    // Optionally show error to user or revert changes
                }
            }
            
            // Debounce auto-save to avoid too many API calls (1 second delay)
            const timer = setTimeout(saveProfile, 1000)
            return () => clearTimeout(timer)
        }
    }, [profile, user, updateUserProfile])

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

    // ============ Mark Layout Independent ============

    const markLayoutIndependent = useCallback((mode: ViewMode) => {
        setLayoutIndependent((prev) => ({
            ...prev,
            [mode]: true,
        }))
    }, [])

    // ============ Unified Widget Operations (operate on current view mode) ============

    const addWidget = useCallback((widget: WidgetConfig) => {
        if (viewMode === 'desktop') {
            addDesktopWidget(widget)
            // Sync to mobile if mobile layout is not independent
            if (!layoutIndependent.mobile) {
                // Add same widget to mobile with same content and layout
                addMobileWidget(widget)
            } else {
                // Add same widget to mobile with same content but default size
                const contentProps = extractContentProperties(widget)
                const mobileWidget: WidgetConfig = {
                    ...contentProps,
                    size: '1x1', // Default size for independent mobile layout
                } as WidgetConfig
                addMobileWidget(mobileWidget)
            }
        } else {
            addMobileWidget(widget)
            // Sync to desktop if desktop layout is not independent
            if (!layoutIndependent.desktop) {
                // Add same widget to desktop with same content and layout
                addDesktopWidget(widget)
            } else {
                // Add same widget to desktop with same content but default size
                const contentProps = extractContentProperties(widget)
                const desktopWidget: WidgetConfig = {
                    ...contentProps,
                    size: '1x1', // Default size for independent desktop layout
                } as WidgetConfig
                addDesktopWidget(desktopWidget)
            }
        }
    }, [viewMode, addDesktopWidget, addMobileWidget, layoutIndependent])

    const removeWidget = useCallback((id: string) => {
        // Always sync removal across both views
        removeDesktopWidget(id)
        removeMobileWidget(id)
    }, [removeDesktopWidget, removeMobileWidget])

    const updateWidget = useCallback((id: string, updates: Partial<WidgetConfig>) => {
        // Separate content and layout updates
        const contentUpdates: Partial<WidgetConfig> = {}
        const layoutUpdates: Partial<WidgetConfig> = {}
        let hasLayoutUpdates = false

        Object.keys(updates).forEach((key) => {
            const value = (updates as any)[key]
            if (isLayoutProperty(key)) {
                ;(layoutUpdates as any)[key] = value
                hasLayoutUpdates = true
            } else if (isContentProperty(key) || key === 'id' || key === 'category') {
                ;(contentUpdates as any)[key] = value
            }
        })

        // Update current view
        if (viewMode === 'desktop') {
            // Apply all updates to desktop
            updateDesktopWidget(id, updates)
            // If layout was updated, mark desktop as independent
            if (hasLayoutUpdates) {
                markLayoutIndependent('desktop')
            }
            // Sync content updates to mobile (if mobile has this widget)
            if (Object.keys(contentUpdates).length > 0) {
                const mobileWidget = mobileWidgets.find((w) => w.id === id)
                if (mobileWidget) {
                    updateMobileWidget(id, contentUpdates)
                }
            }
        } else {
            // Apply all updates to mobile
            updateMobileWidget(id, updates)
            // If layout was updated, mark mobile as independent
            if (hasLayoutUpdates) {
                markLayoutIndependent('mobile')
            }
            // Sync content updates to desktop (if desktop has this widget)
            if (Object.keys(contentUpdates).length > 0) {
                const desktopWidget = desktopWidgets.find((w) => w.id === id)
                if (desktopWidget) {
                    updateDesktopWidget(id, contentUpdates)
                }
            }
        }
    }, [viewMode, updateDesktopWidget, updateMobileWidget, desktopWidgets, mobileWidgets, markLayoutIndependent])

    const reorderWidgets = useCallback((newOrder: WidgetConfig[]) => {
        // Reordering changes layout, so mark current view as independent
        markLayoutIndependent(viewMode)
        if (viewMode === 'desktop') {
            reorderDesktopWidgets(newOrder)
        } else {
            reorderMobileWidgets(newOrder)
        }
    }, [viewMode, reorderDesktopWidgets, reorderMobileWidgets, markLayoutIndependent])

    // ============ Layout Sync ============

    const syncDesktopToMobile = useCallback(() => {
        // Deep clone desktop widgets to mobile
        setMobileWidgets(JSON.parse(JSON.stringify(desktopWidgets)))
    }, [desktopWidgets])

    // ============ Profile Management ============

    const updateProfile = useCallback((updates: Partial<ProfileData>) => {
        // Update local state immediately for UI responsiveness
        // The actual save to Supabase will be handled by the auto-save useEffect below
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
                layoutIndependent,
                markLayoutIndependent,
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
