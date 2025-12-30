/**
 * @input  - User actions (login, register, logout)
 * @output - Authenticated user state, auth methods
 * @pos    - /src/stores/userStore.ts - Global auth state management
 * 
 * Uses Supabase Auth and API calls for persistence.
 */

import { create } from 'zustand'

// ============ Types ============

export interface User {
    id: string
    username: string
    email: string
    displayName: string
    avatar?: string
    bio?: string
    handle?: string | null
    createdAt: string
}

interface UserState {
    user: User | null
    isAuthenticated: boolean
    isLoading: boolean
    error: string | null

    // Actions
    login: (email: string, password: string) => Promise<boolean>
    register: (username: string, email: string, password: string, displayName?: string) => Promise<boolean>
    logout: () => Promise<void>
    updateProfile: (updates: Partial<Pick<User, 'displayName' | 'avatar' | 'bio' | 'username' | 'email'>>) => Promise<void>
    clearError: () => void
    refreshUser: () => Promise<void>
}

// ============ Store ============

export const useUserStore = create<UserState>((set, get) => ({
    user: null,
    isAuthenticated: false,
    isLoading: false,
    error: null,

    login: async (email: string, password: string): Promise<boolean> => {
        set({ isLoading: true, error: null })

        try {
            const response = await fetch('/api/auth/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                credentials: 'include', // Important: include cookies
                body: JSON.stringify({ email, password }),
            })

            const data = await response.json()

            if (!response.ok) {
                set({ isLoading: false, error: data.error || '登录失败' })
                return false
            }

            if (!data.user) {
                set({ isLoading: false, error: '登录失败，未获取到用户信息' })
                return false
            }

            const user: User = {
                id: data.user.id,
                email: data.user.email,
                username: data.user.username,
                displayName: data.user.display_name || data.user.username,
                avatar: data.user.avatar_url || undefined,
                bio: data.user.bio || undefined,
                handle: data.user.handle || undefined,
                createdAt: data.user.created_at,
            }

            set({ user, isAuthenticated: true, isLoading: false, error: null })
            
            // Wait a bit for cookies to be set, then verify session
            await new Promise(resolve => setTimeout(resolve, 100))
            const refreshed = await get().refreshUser()
            
            if (!refreshed) {
                // If refresh failed, still keep the user state from login response
                console.warn('Session refresh failed after login, but user data is available')
            }
            
            return true
        } catch (error) {
            console.error('Login error:', error)
            set({ isLoading: false, error: '网络错误，请稍后重试' })
            return false
        }
    },

    register: async (username: string, email: string, password: string, displayName?: string): Promise<boolean> => {
        set({ isLoading: true, error: null })

        try {
            const response = await fetch('/api/auth/register', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ username, email, password, displayName }),
            })

            const data = await response.json()

            if (!response.ok) {
                set({ isLoading: false, error: data.error || '注册失败' })
                return false
            }

            const user: User = {
                id: data.user.id,
                email: data.user.email,
                username: data.user.username,
                displayName: data.user.display_name || data.user.username,
                avatar: undefined,
                bio: undefined,
                handle: data.user.handle || undefined,
                createdAt: data.user.created_at || new Date().toISOString(),
            }

            set({ user, isAuthenticated: true, isLoading: false, error: null })
            return true
        } catch (error) {
            set({ isLoading: false, error: '网络错误，请稍后重试' })
            return false
        }
    },

    logout: async () => {
        try {
            await fetch('/api/auth/logout', { method: 'POST' })
        } catch (error) {
            console.error('Logout error:', error)
        }
        set({ user: null, isAuthenticated: false, error: null })
    },

    updateProfile: async (updates) => {
        const { user } = get()
        if (!user) {
            throw new Error('User not authenticated')
        }

        try {
            const response = await fetch('/api/users/me', {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                credentials: 'include', // Important: include cookies for auth
                body: JSON.stringify({
                    display_name: updates.displayName,
                    avatar_url: updates.avatar,
                    bio: updates.bio,
                    username: updates.username,
                    email: updates.email,
                }),
            })

            const data = await response.json()

            if (!response.ok) {
                const errorMessage = data.error || '更新失败'
                console.error('Update profile API error:', {
                    status: response.status,
                    statusText: response.statusText,
                    error: data.error,
                    updates,
                })
                set({ error: errorMessage })
                throw new Error(errorMessage)
            }

            const updatedUser: User = {
                ...user,
                displayName: data.user.display_name || user.displayName,
                avatar: data.user.avatar_url || user.avatar,
                bio: data.user.bio || user.bio,
                username: data.user.username || user.username,
                email: data.user.email || user.email,
            }

            set({ user: updatedUser, error: null })
        } catch (error) {
            const errorMessage = error instanceof Error ? error.message : '网络错误，请稍后重试'
            set({ error: errorMessage })
            throw error
        }
    },

    refreshUser: async () => {
        try {
            const response = await fetch('/api/users/me', {
                credentials: 'include', // Important: include cookies
            })
            const data = await response.json()

            if (response.ok && data.user) {
                const user: User = {
                    id: data.user.id,
                    email: data.user.email,
                    username: data.user.username,
                    displayName: data.user.display_name || data.user.username,
                    avatar: data.user.avatar_url || undefined,
                    bio: data.user.bio || undefined,
                    handle: data.user.handle || undefined,
                    createdAt: data.user.created_at,
                }
                set({ user, isAuthenticated: true })
                return true
            } else {
                set({ user: null, isAuthenticated: false })
                return false
            }
        } catch (error) {
            console.error('Refresh user error:', error)
            set({ user: null, isAuthenticated: false })
            return false
        }
    },

    clearError: () => set({ error: null }),
}))

// ============ Utility: Get user by handle/username ============

export async function getUserByHandle(handle: string): Promise<User | null> {
    try {
        const response = await fetch(`/api/users/${handle}`)
        const data = await response.json()

        if (!response.ok || !data.user) {
            return null
        }

        return {
            id: data.user.id,
            username: data.user.username,
            email: '', // Don't expose email for public profiles
            displayName: data.user.display_name || data.user.username,
            avatar: data.user.avatar_url || undefined,
            bio: data.user.bio || undefined,
            handle: data.user.handle || undefined,
            createdAt: data.user.created_at,
        }
    } catch (error) {
        console.error('Get user by handle error:', error)
        return null
    }
}

// Legacy function name for backward compatibility
export function getUserByUsername(username: string): User | null {
    // This is now async, but keeping sync signature for compatibility
    // Components should use getUserByHandle directly
    return null
}

export default useUserStore
