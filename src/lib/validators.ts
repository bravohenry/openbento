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

export function validateHandle(handle: string): ValidationResult {
    if (!handle) {
        return { valid: false, error: 'Please enter a handle' }
    }
    if (handle.length < 3) {
        return { valid: false, error: 'Handle must be at least 3 characters' }
    }
    if (handle.length > 50) {
        return { valid: false, error: 'Handle must be at most 50 characters' }
    }
    // Only lowercase letters, numbers, and hyphens
    const handleRegex = /^[a-z0-9-]+$/
    if (!handleRegex.test(handle)) {
        return { valid: false, error: 'Handle can only contain lowercase letters, numbers, and hyphens' }
    }
    // Cannot start or end with hyphen
    if (handle.startsWith('-') || handle.endsWith('-')) {
        return { valid: false, error: 'Handle cannot start or end with a hyphen' }
    }
    // Reserved handles
    const reserved = ['www', 'api', 'admin', 'app', 'mail', 'ftp', 'auth', 'login', 'register', 'editor', 'settings', 'bento', 'showcase']
    if (reserved.includes(handle.toLowerCase())) {
        return { valid: false, error: 'This handle is reserved' }
    }
    return { valid: true }
}
