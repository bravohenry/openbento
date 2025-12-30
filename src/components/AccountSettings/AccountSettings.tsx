'use client'

/**
 * [INPUT]: triggerRef, onClose - Trigger button ref and close callback
 * [OUTPUT]: React component - Small popup window above button with account settings options and inline editing
 * [POS]: Account settings popup component used in EditorLayout, provides account management menu with inline editing
 * 
 * [PROTOCOL]:
 * 1. Once this file's logic changes, this Header must be synchronized immediately.
 * 2. After update, must check upward whether the parent folder's .folder.md description is still accurate.
 */

import React, { useState, useEffect, useRef, useCallback } from 'react'
import { createPortal } from 'react-dom'
import { useUserStore } from '@/stores'
import { Input } from '@/design-system/patterns'
import { validateEmail, validatePassword, validateUsername } from '@/lib/validators'
import { radii } from '@/design-system/tokens/radii'
import { shadows } from '@/design-system/tokens/shadows'
import { cn } from '@/design-system/utils/cn'

// ============ Types ============

type EditType = 'username' | 'email' | 'password' | null

interface AccountSettingsProps {
    triggerRef: React.RefObject<HTMLElement | null>
    isOpen: boolean
    onClose: () => void
}

// ============ AccountSettings Component ============

export const AccountSettings: React.FC<AccountSettingsProps> = ({ triggerRef, isOpen, onClose }) => {
    const { user, logout, updateProfile } = useUserStore()
    const [activeEdit, setActiveEdit] = useState<EditType>(null)
    const [editPosition, setEditPosition] = useState({ top: 0, left: 0 })
    const popupRef = useRef<HTMLDivElement>(null)
    const editPopupRef = useRef<HTMLDivElement>(null)
    const [position, setPosition] = useState({ top: 0, left: 0 })
    
    // Form states
    const [username, setUsername] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [showPassword, setShowPassword] = useState(false)
    const [errors, setErrors] = useState<Record<string, string>>({})
    const [isSaving, setIsSaving] = useState(false)
    const itemRefs = useRef<Record<string, HTMLDivElement | null>>({})

    // Calculate popup position above the button
    const updatePosition = useCallback(() => {
        if (triggerRef.current && popupRef.current) {
            const triggerRect = triggerRef.current.getBoundingClientRect()
            const popupRect = popupRef.current.getBoundingClientRect()
            
            // Position above the button
            const top = triggerRect.top - popupRect.height - 8
            const left = triggerRect.left
            
            setPosition({ top, left })
        }
    }, [triggerRef])

    // Calculate edit popup position next to the item
    const updateEditPosition = useCallback((itemKey: string) => {
        const itemElement = itemRefs.current[itemKey]
        if (itemElement && editPopupRef.current) {
            const itemRect = itemElement.getBoundingClientRect()
            const editRect = editPopupRef.current.getBoundingClientRect()
            
            // Position to the right of the item
            const top = itemRect.top
            const left = itemRect.right + 16
            
            // Check if it fits on the right, otherwise position on the left
            const fitsRight = left + editRect.width < window.innerWidth - 16
            const finalLeft = fitsRight ? left : itemRect.left - editRect.width - 16
            
            setEditPosition({ top: finalLeft < 0 ? itemRect.top : top, left: finalLeft < 0 ? itemRect.left - editRect.width - 16 : finalLeft })
        }
    }, [])

    // Update position when opened
    useEffect(() => {
        if (isOpen) {
            requestAnimationFrame(() => {
                updatePosition()
            })
            window.addEventListener('scroll', updatePosition, true)
            window.addEventListener('resize', updatePosition)
        }
        return () => {
            window.removeEventListener('scroll', updatePosition, true)
            window.removeEventListener('resize', updatePosition)
        }
    }, [isOpen, updatePosition])

    // Update edit position when active
    useEffect(() => {
        if (activeEdit) {
            requestAnimationFrame(() => {
                updateEditPosition(activeEdit)
            })
            window.addEventListener('scroll', updateEditPosition.bind(null, activeEdit), true)
            window.addEventListener('resize', updateEditPosition.bind(null, activeEdit))
        }
        return () => {
            if (activeEdit) {
                window.removeEventListener('scroll', updateEditPosition.bind(null, activeEdit), true)
                window.removeEventListener('resize', updateEditPosition.bind(null, activeEdit))
            }
        }
    }, [activeEdit, updateEditPosition])

    // Click outside to close
    useEffect(() => {
        if (!isOpen && !activeEdit) return

        const handleClickOutside = (e: MouseEvent) => {
            const clickedEditPopup = editPopupRef.current?.contains(e.target as Node)
            const clickedMainPopup = popupRef.current?.contains(e.target as Node)
            const clickedTrigger = triggerRef.current?.contains(e.target as Node)
            const clickedItem = Object.values(itemRefs.current).some(ref => ref?.contains(e.target as Node))

            if (!clickedEditPopup && !clickedMainPopup && !clickedTrigger && !clickedItem) {
                if (activeEdit) {
                    setActiveEdit(null)
                }
                if (isOpen) {
                    onClose()
                }
            }
        }

        document.addEventListener('mousedown', handleClickOutside)
        return () => {
            document.removeEventListener('mousedown', handleClickOutside)
        }
    }, [isOpen, activeEdit, onClose])

    // ESC key to close
    useEffect(() => {
        if (!isOpen && !activeEdit) return

        const handleEsc = (e: KeyboardEvent) => {
            if (e.key === 'Escape') {
                if (activeEdit) {
                    setActiveEdit(null)
                    setErrors({})
                } else if (isOpen) {
                    onClose()
                }
            }
        }

        document.addEventListener('keydown', handleEsc)
        return () => {
            document.removeEventListener('keydown', handleEsc)
        }
    }, [isOpen, activeEdit, onClose])

    // Open edit handlers
    const openEdit = (type: EditType, itemKey: string) => {
        if (type === 'username') {
            setUsername(user?.username || '')
        } else if (type === 'email') {
            setEmail(user?.email || '')
        } else if (type === 'password') {
            setPassword('')
            setShowPassword(false)
        }
        setErrors({})
        setActiveEdit(type)
        requestAnimationFrame(() => {
            updateEditPosition(itemKey)
        })
    }

    const closeEdit = () => {
        setActiveEdit(null)
        setErrors({})
        setUsername('')
        setEmail('')
        setPassword('')
        setShowPassword(false)
    }

    // Auto-save handlers (on blur or Enter)
    const handleUsernameSave = async () => {
        if (!username.trim()) {
            setErrors({ username: 'Username is required' })
            return
        }

        const validation = validateUsername(username)
        if (!validation.valid) {
            setErrors({ username: validation.error || 'Invalid username' })
            return
        }

        setIsSaving(true)
        setErrors({})
        
        try {
            await updateProfile({ username: username })
            setIsSaving(false)
            closeEdit()
        } catch (error) {
            setIsSaving(false)
            setErrors({ username: error instanceof Error ? error.message : 'Failed to update username' })
        }
    }

    const handleEmailSave = async () => {
        if (!email.trim()) {
            setErrors({ email: 'Email is required' })
            return
        }

        const validation = validateEmail(email)
        if (!validation.valid) {
            setErrors({ email: validation.error || 'Invalid email' })
            return
        }

        setIsSaving(true)
        setErrors({})
        
        try {
            await updateProfile({ email: email })
            setIsSaving(false)
            closeEdit()
        } catch (error) {
            setIsSaving(false)
            setErrors({ email: error instanceof Error ? error.message : 'Failed to update email' })
        }
    }

    const handlePasswordSave = async () => {
        if (!password.trim()) {
            setErrors({ password: 'Password is required' })
            return
        }

        const validation = validatePassword(password)
        if (!validation.valid) {
            setErrors({ password: validation.error || 'Invalid password' })
            return
        }

        setIsSaving(true)
        await new Promise(resolve => setTimeout(resolve, 300))
        
        // Note: In a real app, you'd update password via backend API
        setIsSaving(false)
        closeEdit()
    }

    const handleExportData = () => {
        const data = {
            user: user,
            exportedAt: new Date().toISOString(),
        }
        const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' })
        const url = URL.createObjectURL(blob)
        const a = document.createElement('a')
        a.href = url
        a.download = `bento-data-${user?.username || 'export'}.json`
        a.click()
        URL.revokeObjectURL(url)
        onClose()
    }

    const handleLogout = () => {
        logout()
        onClose()
        window.location.href = '/'
    }

    // Settings item component - matching Figma design
    const SettingsItem: React.FC<{
        title: string
        value: string
        itemKey: string
        editType: EditType
    }> = ({ title, value, itemKey, editType }) => {
        const [isHovered, setIsHovered] = useState(false)

        return (
            <div
                ref={(el) => { itemRefs.current[itemKey] = el }}
                onClick={() => openEdit(editType, itemKey)}
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
                style={{
                    padding: '12px',
                    cursor: 'pointer',
                    borderRadius: '10px',
                    backgroundColor: isHovered || activeEdit === editType ? '#F7F7F7' : 'transparent',
                    transition: 'background-color 0.2s',
                    width: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'flex-start',
                    overflow: 'hidden',
                }}
            >
                <div
                    style={{
                        fontSize: '12px',
                        fontWeight: 400,
                        fontFamily: 'Inter, sans-serif',
                        lineHeight: '16px',
                        color: '#000000',
                        marginBottom: 0,
                    }}
                >
                    {title}
                </div>
                <div
                    style={{
                        fontSize: '12px',
                        fontWeight: 400,
                        fontFamily: 'Inter, sans-serif',
                        lineHeight: '16px',
                        color: '#6C6C6C',
                        marginTop: 0,
                    }}
                >
                    {value}
                </div>
            </div>
        )
    }

    // Separator component - matching Figma design
    const Separator: React.FC = () => (
        <div
            style={{
                height: '1px',
                width: '170px',
                backgroundColor: '#EFEFEF',
                borderRadius: '2px',
                flexShrink: 0,
            }}
        />
    )

    // Action item component (Export Data, Log Out) - matching Figma design
    const ActionItem: React.FC<{
        text: string
        onClick: () => void
        isDanger?: boolean
    }> = ({ text, onClick, isDanger = false }) => {
        const [isHovered, setIsHovered] = useState(false)

        return (
            <div
                onClick={onClick}
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
                style={{
                    padding: '12px',
                    cursor: 'pointer',
                    borderRadius: '10px',
                    backgroundColor: isHovered ? '#F7F7F7' : 'transparent',
                    transition: 'background-color 0.2s',
                    width: '100%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'flex-start',
                    overflow: 'hidden',
                }}
            >
                <div
                    style={{
                        fontSize: '12px',
                        fontWeight: 400,
                        fontFamily: 'Inter, sans-serif',
                        lineHeight: '16px',
                        color: '#000000',
                    }}
                >
                    {text}
                </div>
            </div>
        )
    }

    // Popup styles - matching Figma design
    const popupStyles: React.CSSProperties = {
        position: 'fixed',
        top: position.top,
        left: position.left,
        minWidth: '210px',
        background: '#FFFFFF',
        borderRadius: '18px',
        // Complex multi-layer shadow from Figma design
        boxShadow: '0px 0px 0px 1px rgba(0,0,0,0.06), 0px 40px 54px 0px rgba(0,0,0,0.04), 0px 25.926px 31.625px 0px rgba(0,0,0,0.03), 0px 15.407px 17.2px 0px rgba(0,0,0,0.02), 0px 8px 8.775px 0px rgba(0,0,0,0.02), 0px 3.259px 4.4px 0px rgba(0,0,0,0.02), 0px 0.741px 2.125px 0px rgba(0,0,0,0.01)',
        zIndex: 1000,
        animation: 'dropdownFadeIn 0.15s ease-out',
        overflow: 'hidden',
        padding: '8px',
        display: 'flex',
        flexDirection: 'column',
        gap: '8px',
        alignItems: 'center',
    }

    // Edit popup styles
    const editPopupStyles: React.CSSProperties = {
        position: 'fixed',
        top: editPosition.top,
        left: editPosition.left,
        width: '320px',
        background: '#FFFFFF',
        borderRadius: radii.xl,
        boxShadow: '0px 0px 0px 1px rgba(0,0,0,0.06), 0px 40px 54px 0px rgba(0,0,0,0.04), 0px 25.926px 31.625px 0px rgba(0,0,0,0.03), 0px 15.407px 17.2px 0px rgba(0,0,0,0.02), 0px 8px 8.775px 0px rgba(0,0,0,0.02), 0px 3.259px 4.4px 0px rgba(0,0,0,0.02), 0px 0.741px 2.125px 0px rgba(0,0,0,0.01)',
        zIndex: 1001,
        padding: '16px',
        animation: 'dropdownFadeIn 0.15s ease-out',
    }

    const popup = isOpen && typeof document !== 'undefined' && (
        createPortal(
            <div
                ref={popupRef}
                className={cn('account-settings-popup')}
                style={popupStyles}
                role="menu"
            >
                {/* Settings Items */}
                <div style={{ width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
                    <SettingsItem
                        title="Change Username"
                        value={`/${user?.username || ''}`}
                        itemKey="username"
                        editType="username"
                    />
                    <SettingsItem
                        title="Change Email"
                        value={user?.email || ''}
                        itemKey="email"
                        editType="email"
                    />
                    <SettingsItem
                        title="Change Password"
                        value="• • • • • • •"
                        itemKey="password"
                        editType="password"
                    />
                </div>

                {/* Separator */}
                <Separator />

                {/* Export Data */}
                <ActionItem text="Export Data" onClick={handleExportData} />

                {/* Separator */}
                <Separator />

                {/* Log Out */}
                <ActionItem text="Log Out" onClick={handleLogout} />
            </div>,
            document.body
        )
    )

    // Edit popup for username
    const usernameEditPopup = activeEdit === 'username' && typeof document !== 'undefined' && (
        createPortal(
            <div
                ref={editPopupRef}
                className={cn('account-settings-edit-popup')}
                style={editPopupStyles}
            >
                <div
                    style={{
                        fontSize: '14px',
                        fontWeight: 500,
                        color: '#000000',
                        marginBottom: '8px',
                    }}
                >
                    Change Username
                </div>
                <Input
                    placeholder="Enter new username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    onBlur={handleUsernameSave}
                    onKeyDown={(e) => {
                        if (e.key === 'Enter') {
                            handleUsernameSave()
                        } else if (e.key === 'Escape') {
                            closeEdit()
                        }
                    }}
                    isError={!!errors.username}
                    errorText={errors.username}
                    leftAddon="bento.me/"
                    fullWidth
                    autoFocus
                    disabled={isSaving}
                />
            </div>,
            document.body
        )
    )

    // Edit popup for email
    const emailEditPopup = activeEdit === 'email' && typeof document !== 'undefined' && (
        createPortal(
            <div
                ref={editPopupRef}
                className={cn('account-settings-edit-popup')}
                style={editPopupStyles}
            >
                <div
                    style={{
                        fontSize: '14px',
                        fontWeight: 500,
                        color: '#000000',
                        marginBottom: '8px',
                    }}
                >
                    Change Email
                </div>
                <Input
                    type="email"
                    placeholder="New Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    onBlur={handleEmailSave}
                    onKeyDown={(e) => {
                        if (e.key === 'Enter') {
                            handleEmailSave()
                        } else if (e.key === 'Escape') {
                            closeEdit()
                        }
                    }}
                    isError={!!errors.email}
                    errorText={errors.email}
                    fullWidth
                    autoFocus
                    disabled={isSaving}
                />
            </div>,
            document.body
        )
    )

    // Edit popup for password
    const passwordEditPopup = activeEdit === 'password' && typeof document !== 'undefined' && (
        createPortal(
            <div
                ref={editPopupRef}
                className={cn('account-settings-edit-popup')}
                style={editPopupStyles}
            >
                <div
                    style={{
                        fontSize: '14px',
                        fontWeight: 500,
                        color: '#000000',
                        marginBottom: '8px',
                    }}
                >
                    Change Password
                </div>
                <Input
                    type={showPassword ? 'text' : 'password'}
                    placeholder="New Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    onBlur={handlePasswordSave}
                    onKeyDown={(e) => {
                        if (e.key === 'Enter') {
                            handlePasswordSave()
                        } else if (e.key === 'Escape') {
                            closeEdit()
                        }
                    }}
                    isError={!!errors.password}
                    errorText={errors.password}
                    rightElement={
                        <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            style={{
                                background: 'transparent',
                                border: 'none',
                                cursor: 'pointer',
                                color: 'var(--color-text-tertiary)',
                                fontSize: '13px',
                                padding: '4px 8px',
                            }}
                        >
                            {showPassword ? 'Hide' : 'Show'}
                        </button>
                    }
                    fullWidth
                    autoFocus
                    disabled={isSaving}
                />
            </div>,
            document.body
        )
    )

    return (
        <>
            {popup}
            {usernameEditPopup}
            {emailEditPopup}
            {passwordEditPopup}
        </>
    )
}
