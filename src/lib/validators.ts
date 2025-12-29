/**
 * @input  - User input strings
 * @output - Validation results with error messages
 * @pos    - /src/lib/validators.ts - Form validation utilities
 */

export interface ValidationResult {
    valid: boolean
    error?: string
}

export function validateEmail(email: string): ValidationResult {
    if (!email) {
        return { valid: false, error: 'Please enter an email address' }
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
        return { valid: false, error: 'Please enter a valid email address' }
    }
    return { valid: true }
}

export function validateUsername(username: string): ValidationResult {
    if (!username) {
        return { valid: false, error: 'Please enter a username' }
    }
    if (username.length < 3) {
        return { valid: false, error: 'Username must be at least 3 characters' }
    }
    if (username.length > 20) {
        return { valid: false, error: 'Username must be at most 20 characters' }
    }
    const usernameRegex = /^[a-zA-Z0-9_-]+$/
    if (!usernameRegex.test(username)) {
        return { valid: false, error: 'Username can only contain letters, numbers, underscores, and hyphens' }
    }
    // Reserved usernames
    const reserved = ['admin', 'api', 'auth', 'login', 'register', 'editor', 'settings', 'bento', 'showcase']
    if (reserved.includes(username.toLowerCase())) {
        return { valid: false, error: 'This username is reserved' }
    }
    return { valid: true }
}

export function validatePassword(password: string): ValidationResult {
    if (!password) {
        return { valid: false, error: 'Please enter a password' }
    }
    if (password.length < 6) {
        return { valid: false, error: 'Password must be at least 6 characters' }
    }
    if (password.length > 100) {
        return { valid: false, error: 'Password is too long' }
    }
    return { valid: true }
}

export function validateDisplayName(name: string): ValidationResult {
    if (!name) {
        return { valid: false, error: 'Please enter a display name' }
    }
    if (name.length > 50) {
        return { valid: false, error: 'Display name must be at most 50 characters' }
    }
    return { valid: true }
}
