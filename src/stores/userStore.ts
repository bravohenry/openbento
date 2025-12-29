/**
 * @input  - User actions (login, register, logout)
 * @output - Authenticated user state, auth methods
 * @pos    - /src/stores/userStore.ts - Global auth state management
 * 
 * Uses localStorage for MVP persistence.
 * Replace with API calls for production.
 */

import { create } from 'zustand'
import { storage } from '@/lib/storage'

// ============ Types ============

export interface User {
    id: string
    username: string
    email: string
    displayName: string
    avatar?: string
    bio?: string
    createdAt: string
}

interface StoredUser extends User {
    passwordHash: string // Simple hash for demo (NOT secure for production)
}

interface UserState {
    user: User | null
    isAuthenticated: boolean
    isLoading: boolean
    error: string | null

    // Actions
    login: (email: string, password: string) => Promise<boolean>
    register: (username: string, email: string, password: string) => Promise<boolean>
    logout: () => void
    updateProfile: (updates: Partial<Pick<User, 'displayName' | 'avatar' | 'bio'>>) => void
    clearError: () => void

    // Hydration
    hydrate: () => void
}

// ============ Simple Hash (NOT cryptographically secure) ============

function simpleHash(str: string): string {
    let hash = 0
    for (let i = 0; i < str.length; i++) {
        const char = str.charCodeAt(i)
        hash = ((hash << 5) - hash) + char
        hash = hash & hash
    }
    return Math.abs(hash).toString(16)
}

function generateId(): string {
    return Date.now().toString(36) + Math.random().toString(36).substr(2)
}

// ============ Storage Keys ============

const USERS_KEY = 'users'
const CURRENT_USER_KEY = 'current-user'

// ============ Store ============

export const useUserStore = create<UserState>((set, get) => ({
    user: null,
    isAuthenticated: false,
    isLoading: false,
    error: null,

    hydrate: () => {
        const currentUserId = storage.get<string>(CURRENT_USER_KEY)
        if (currentUserId) {
            const users = storage.get<StoredUser[]>(USERS_KEY) || []
            const user = users.find(u => u.id === currentUserId)
            if (user) {
                // eslint-disable-next-line @typescript-eslint/no-unused-vars
                const { passwordHash, ...safeUser } = user
                set({ user: safeUser, isAuthenticated: true })
            }
        }
    },

    login: async (email: string, password: string): Promise<boolean> => {
        set({ isLoading: true, error: null })

        // Simulate network delay
        await new Promise(resolve => setTimeout(resolve, 300))

        const users = storage.get<StoredUser[]>(USERS_KEY) || []
        const user = users.find(u => u.email.toLowerCase() === email.toLowerCase())

        if (!user) {
            set({ isLoading: false, error: '邮箱或密码错误' })
            return false
        }

        if (user.passwordHash !== simpleHash(password)) {
            set({ isLoading: false, error: '邮箱或密码错误' })
            return false
        }

        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const { passwordHash, ...safeUser } = user
        storage.set(CURRENT_USER_KEY, user.id)
        set({ user: safeUser, isAuthenticated: true, isLoading: false })
        return true
    },

    register: async (username: string, email: string, password: string): Promise<boolean> => {
        set({ isLoading: true, error: null })

        // Simulate network delay
        await new Promise(resolve => setTimeout(resolve, 300))

        const users = storage.get<StoredUser[]>(USERS_KEY) || []

        // Check if username exists
        if (users.some(u => u.username.toLowerCase() === username.toLowerCase())) {
            set({ isLoading: false, error: '该用户名已被使用' })
            return false
        }

        // Check if email exists
        if (users.some(u => u.email.toLowerCase() === email.toLowerCase())) {
            set({ isLoading: false, error: '该邮箱已被注册' })
            return false
        }

        const newUser: StoredUser = {
            id: generateId(),
            username: username.toLowerCase(),
            email: email.toLowerCase(),
            displayName: username,
            passwordHash: simpleHash(password),
            createdAt: new Date().toISOString(),
        }

        users.push(newUser)
        storage.set(USERS_KEY, users)
        storage.set(CURRENT_USER_KEY, newUser.id)

        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const { passwordHash, ...safeUser } = newUser
        set({ user: safeUser, isAuthenticated: true, isLoading: false })
        return true
    },

    logout: () => {
        storage.remove(CURRENT_USER_KEY)
        set({ user: null, isAuthenticated: false, error: null })
    },

    updateProfile: (updates) => {
        const { user } = get()
        if (!user) return

        const updatedUser = { ...user, ...updates }
        set({ user: updatedUser })

        // Also update in storage
        const users = storage.get<StoredUser[]>(USERS_KEY) || []
        const index = users.findIndex(u => u.id === user.id)
        if (index !== -1) {
            users[index] = { ...users[index], ...updates }
            storage.set(USERS_KEY, users)
        }
    },

    clearError: () => set({ error: null }),
}))

// ============ Utility: Get user by username ============

export function getUserByUsername(username: string): User | null {
    const users = storage.get<StoredUser[]>(USERS_KEY) || []
    const user = users.find(u => u.username.toLowerCase() === username.toLowerCase())
    if (!user) return null
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { passwordHash, ...safeUser } = user
    return safeUser
}

export default useUserStore
