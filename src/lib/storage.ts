/**
 * @input  - key, value
 * @output - Type-safe localStorage wrapper
 * @pos    - /src/lib/storage.ts - Core persistence utility
 */

const PREFIX = 'openbento-'

export const storage = {
    get<T>(key: string): T | null {
        if (typeof window === 'undefined') return null
        try {
            const item = localStorage.getItem(PREFIX + key)
            return item ? JSON.parse(item) : null
        } catch (error) {
            console.error(`[storage] Failed to get ${key}:`, error)
            return null
        }
    },

    set<T>(key: string, value: T): void {
        if (typeof window === 'undefined') return
        try {
            localStorage.setItem(PREFIX + key, JSON.stringify(value))
        } catch (error) {
            console.error(`[storage] Failed to set ${key}:`, error)
        }
    },

    remove(key: string): void {
        if (typeof window === 'undefined') return
        localStorage.removeItem(PREFIX + key)
    },

    clear(): void {
        if (typeof window === 'undefined') return
        Object.keys(localStorage)
            .filter(k => k.startsWith(PREFIX))
            .forEach(k => localStorage.removeItem(k))
    }
}

export default storage
