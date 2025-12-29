'use client'

/**
 * [INPUT]: (avatarUrl, name, description, isEditing, callbacks, onShare, showShareButton) - Profile data, editing callbacks, and optional share functionality
 * [OUTPUT]: React component - Profile section with seamless inline editing using contentEditable and optional share button (mobile only)
 * [POS]: Profile display and editing component in EditorLayout, provides seamless editing experience without visible input boxes, conditionally shows share button on mobile devices
 * 
 * [PROTOCOL]:
 * 1. Once this file's logic changes, this Header must be synchronized immediately.
 * 2. After update, must check upward whether the parent folder's .folder.md description is still accurate.
 */

import React, { useRef, useState, useEffect } from 'react'
import ReactDOM from 'react-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { Upload, Trash } from 'phosphor-react'
import { useClickOutside } from './hooks/useClickOutside'
import { cn } from '@/design-system/utils/cn'

interface ProfileSectionProps {
    avatarUrl?: string
    avatarBgColor?: string
    name: string
    description: string | React.ReactNode
    isEditing?: boolean
    onNameChange?: (name: string) => void
    onDescriptionChange?: (description: string) => void
    onAvatarChange?: (url: string) => void
    onShare?: () => void
    showShareButton?: boolean
}

export const ProfileSection: React.FC<ProfileSectionProps> = ({
    avatarUrl,
    avatarBgColor,
    name,
    description,
    isEditing = false,
    onNameChange,
    onDescriptionChange,
    onAvatarChange,
    onShare,
    showShareButton = false,
}) => {
    // If editing, use EditableProfileSection
    if (isEditing) {
        return (
            <EditableProfileSection
                avatarUrl={avatarUrl}
                avatarBgColor={avatarBgColor}
                name={name}
                description={description}
                isEditing={true}
                onNameChange={onNameChange}
                onDescriptionChange={onDescriptionChange}
                onAvatarChange={onAvatarChange}
                onShare={onShare}
                showShareButton={showShareButton}
            />
        )
    }
    return (
        <div className="w-full flex flex-col items-start gap-6">
            {/* Avatar - Circular, no shadow */}
            <div className="relative w-40 h-40 rounded-full overflow-hidden">
                {avatarUrl ? (
                    <img src={avatarUrl} alt={name} className="w-full h-full object-cover" />
                ) : (
                    <div className="w-full h-full bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center relative">
                        {/* Blue outer ring */}
                        <div className="absolute inset-0 rounded-full border-4 border-blue-500" />
                        {/* Light blue crescent shape */}
                        <div className="absolute inset-0 rounded-full bg-blue-300/30" style={{
                            clipPath: 'ellipse(60% 40% at 30% 50%)',
                        }} />
                    </div>
                )}
            </div>

            {/* Content */}
            <div className="flex flex-col gap-3">
                <h1 className="text-3xl font-extrabold tracking-tight text-black leading-tight">
                    {name}
                </h1>
                <p className="text-base text-black leading-relaxed">
                    {description}
                </p>
            </div>
        </div>
    )
}

interface EditableProfileSectionProps extends ProfileSectionProps {
    onNameChange?: (name: string) => void
    onDescriptionChange?: (description: string) => void
    onAvatarChange?: (url: string) => void
    onShare?: () => void
    showShareButton?: boolean
}

export const EditableProfileSection: React.FC<EditableProfileSectionProps> = ({
    avatarUrl,
    avatarBgColor,
    name,
    description,
    isEditing = false,
    onNameChange,
    onDescriptionChange,
    onAvatarChange,
    onShare,
    showShareButton = false,
}) => {
    const [isSelected, setIsSelected] = useState(false)
    const [rect, setRect] = useState<DOMRect | null>(null)
    const avatarRef = useRef<HTMLDivElement>(null)
    const fileInputRef = useRef<HTMLInputElement>(null)

    // Update position when selected, and close on any scroll/touch interaction
    useEffect(() => {
        if (!isSelected || !avatarRef.current) return

        let lastRect: DOMRect | null = null

        const updatePosition = () => {
            if (avatarRef.current) {
                const newRect = avatarRef.current.getBoundingClientRect()
                setRect(newRect)
                lastRect = newRect
            }
        }

        // Close overlay on any scroll/touch interaction (user requested this behavior)
        const handleClose = () => {
            setIsSelected(false)
        }

        updatePosition()
        
        // Listen to all possible scroll-related events to close overlay
        // Window scroll events
        window.addEventListener('scroll', handleClose, { passive: true, capture: true })
        window.addEventListener('wheel', handleClose, { passive: true, capture: true })
        window.addEventListener('touchmove', handleClose, { passive: true, capture: true })
        window.addEventListener('resize', updatePosition, { passive: true })
        
        // Also listen to scroll events on all scrollable parent containers
        let currentElement: HTMLElement | null = avatarRef.current.parentElement
        const scrollableParents: HTMLElement[] = []
        
        while (currentElement && currentElement !== document.body) {
            const overflow = window.getComputedStyle(currentElement).overflow
            const overflowY = window.getComputedStyle(currentElement).overflowY
            if (overflow === 'auto' || overflow === 'scroll' || overflow === 'overlay' ||
                overflowY === 'auto' || overflowY === 'scroll' || overflowY === 'overlay') {
                scrollableParents.push(currentElement)
                currentElement.addEventListener('scroll', handleClose, { passive: true })
                currentElement.addEventListener('wheel', handleClose, { passive: true })
                currentElement.addEventListener('touchmove', handleClose, { passive: true })
            }
            currentElement = currentElement.parentElement
        }

        // Also listen on document for global scroll detection
        document.addEventListener('scroll', handleClose, { passive: true, capture: true })
        document.addEventListener('wheel', handleClose, { passive: true, capture: true })
        document.addEventListener('touchmove', handleClose, { passive: true, capture: true })

        // Use requestAnimationFrame to detect position changes (catches all scroll types)
        let rafId: number | null = null
        const checkPosition = () => {
            if (avatarRef.current && lastRect) {
                const currentRect = avatarRef.current.getBoundingClientRect()
                // If position changed significantly (more than 1px), close overlay
                if (
                    Math.abs(currentRect.top - lastRect.top) > 1 ||
                    Math.abs(currentRect.left - lastRect.left) > 1
                ) {
                    setIsSelected(false)
                    return
                }
                lastRect = currentRect
            }
            rafId = requestAnimationFrame(checkPosition)
        }
        rafId = requestAnimationFrame(checkPosition)

        return () => {
            window.removeEventListener('scroll', handleClose, { capture: true })
            window.removeEventListener('wheel', handleClose, { capture: true })
            window.removeEventListener('touchmove', handleClose, { capture: true })
            window.removeEventListener('resize', updatePosition)
            document.removeEventListener('scroll', handleClose, { capture: true })
            document.removeEventListener('wheel', handleClose, { capture: true })
            document.removeEventListener('touchmove', handleClose, { capture: true })
            scrollableParents.forEach(parent => {
                parent.removeEventListener('scroll', handleClose)
                parent.removeEventListener('wheel', handleClose)
                parent.removeEventListener('touchmove', handleClose)
            })
            if (rafId !== null) {
                cancelAnimationFrame(rafId)
            }
        }
    }, [isSelected])

    // Click outside to deselect
    useClickOutside(avatarRef, () => {
        if (isSelected) {
            setIsSelected(false)
        }
    }, isSelected)

    const handleAvatarClick = () => {
        if (!isEditing) return
        
        if (!avatarUrl) {
            // If no avatar, trigger file upload
            fileInputRef.current?.click()
        } else {
            // If has avatar, toggle selection to show edit buttons
            setIsSelected(!isSelected)
        }
    }

    const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0]
        if (file && file.type.startsWith('image/') && onAvatarChange) {
            const reader = new FileReader()
            reader.onload = (event) => {
                const dataUrl = event.target?.result as string
                if (dataUrl) {
                    onAvatarChange(dataUrl)
                }
            }
            reader.readAsDataURL(file)
        }
        if (fileInputRef.current) {
            fileInputRef.current.value = ''
        }
    }

    const handleReplace = () => {
        fileInputRef.current?.click()
        setIsSelected(false)
    }

    const handleDelete = () => {
        if (onAvatarChange) {
            onAvatarChange('')
        }
        setIsSelected(false)
    }

    // Handle paste from clipboard
    useEffect(() => {
        if (!isEditing) return

        const handlePaste = (e: ClipboardEvent) => {
            const items = e.clipboardData?.items
            if (!items || !onAvatarChange) return

            for (let i = 0; i < items.length; i++) {
                const item = items[i]
                if (item.type.startsWith('image/')) {
                    e.preventDefault()
                    const file = item.getAsFile()
                    if (file) {
                        const reader = new FileReader()
                        reader.onload = (event) => {
                            const dataUrl = event.target?.result as string
                            if (dataUrl) {
                                onAvatarChange(dataUrl)
                            }
                        }
                        reader.readAsDataURL(file)
                    }
                    break
                }
            }
        }

        document.addEventListener('paste', handlePaste)
        return () => {
            document.removeEventListener('paste', handlePaste)
        }
    }, [isEditing, onAvatarChange])

    if (!isEditing) {
        return <ProfileSection avatarUrl={avatarUrl} avatarBgColor={avatarBgColor} name={name} description={description} />
    }

    return (
        <>
            {/* Hidden file input */}
            <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleFileSelect}
                className="hidden"
                aria-label="Upload avatar"
            />

            <div className="w-full flex flex-col items-start gap-6 relative">
                {/* Share Button - Top Right (only on mobile) */}
                {showShareButton && onShare && (
                    <button
                        onClick={(e) => {
                            e.stopPropagation()
                            e.preventDefault()
                            onShare()
                        }}
                        className={cn(
                            "absolute top-0 right-0",
                            "flex items-center justify-center px-[20px] py-[6.5px]",
                            "bg-[#ffe8ae] rounded-[6px]",
                            "shadow-[0px_2px_3px_0px_rgba(0,0,0,0.06)]",
                            "hover:opacity-90 active:scale-95",
                            "transition-all duration-200",
                            "z-[100]",
                            "w-fit min-w-[127px]"
                        )}
                    >
                        <span className="text-[12px] font-semibold text-[#333] leading-[20px] whitespace-nowrap">
                            Share my LinkCard
                        </span>
                    </button>
                )}

                {/* Editable Avatar - Circular, no shadow */}
                <div
                    ref={avatarRef}
                    className="relative cursor-pointer"
                    onClick={handleAvatarClick}
                >
                    <div className="relative w-40 h-40 rounded-full overflow-hidden">
                        {avatarUrl ? (
                            <img src={avatarUrl} alt={name} className="w-full h-full object-cover" />
                        ) : (
                            <div 
                                className="w-full h-full border-2 border-dashed rounded-full flex flex-col items-center justify-center"
                                style={{
                                    borderColor: 'var(--color-border)',
                                    backgroundColor: 'var(--color-bg-primary)',
                                }}
                            >
                                <Upload size={20} weight="regular" className="text-gray-400 mb-2" />
                                <span className="text-sm font-medium text-gray-600">Add Avatar</span>
                            </div>
                        )}
                    </div>
                </div>

                {/* Avatar Edit Overlay */}
                {isSelected && rect && avatarUrl && (
                    <AvatarEditOverlay
                        rect={rect}
                        onReplace={handleReplace}
                        onDelete={handleDelete}
                    />
                )}

            {/* Editable Content - Seamless editing without visible input boxes */}
            <div className="w-full space-y-3">
                <div className="relative group">
                    <h1
                        contentEditable={isEditing}
                        suppressContentEditableWarning={true}
                        onBlur={(e) => {
                            const newName = e.currentTarget.textContent || ''
                            if (newName !== name && onNameChange) {
                                onNameChange(newName)
                            }
                        }}
                        onKeyDown={(e) => {
                            if (e.key === 'Enter') {
                                e.preventDefault()
                                e.currentTarget.blur()
                            }
                        }}
                        className="w-full text-3xl lg:text-4xl font-extrabold tracking-tight text-black leading-tight outline-none cursor-text"
                        style={{
                            minHeight: '1.5em',
                            wordBreak: 'break-word',
                        }}
                        data-placeholder="Your Name"
                    >
                        {name || ''}
                    </h1>
                    {isEditing && (
                        <style jsx>{`
                            h1[contenteditable="true"]:empty:before {
                                content: attr(data-placeholder);
                                color: #d1d5db;
                                pointer-events: none;
                            }
                            h1[contenteditable="true"]:focus {
                                outline: none;
                            }
                            h1[contenteditable="true"]:hover {
                                background: rgba(0, 0, 0, 0.02);
                                border-radius: 8px;
                                padding: 4px 8px;
                                margin: -4px -8px;
                            }
                        `}</style>
                    )}
                </div>

                <div className="relative group">
                    <p
                        contentEditable={isEditing}
                        suppressContentEditableWarning={true}
                        onBlur={(e) => {
                            const newDescription = e.currentTarget.textContent || ''
                            const currentDescription = typeof description === 'string' ? description : ''
                            if (newDescription !== currentDescription && onDescriptionChange) {
                                onDescriptionChange(newDescription)
                            }
                        }}
                        className="w-full text-base lg:text-lg text-black leading-relaxed outline-none cursor-text"
                        style={{
                            minHeight: '1.5em',
                            wordBreak: 'break-word',
                        }}
                        data-placeholder="Add a bio..."
                    >
                        {typeof description === 'string' ? description : ''}
                    </p>
                    {isEditing && (
                        <style jsx>{`
                            p[contenteditable="true"]:empty:before {
                                content: attr(data-placeholder);
                                color: #d1d5db;
                                pointer-events: none;
                            }
                            p[contenteditable="true"]:focus {
                                outline: none;
                            }
                            p[contenteditable="true"]:hover {
                                background: rgba(0, 0, 0, 0.02);
                                border-radius: 8px;
                                padding: 4px 8px;
                                margin: -4px -8px;
                            }
                        `}</style>
                    )}
                </div>
            </div>
        </div>
        </>
    )
}

// ============ Avatar Edit Overlay ============

interface AvatarEditOverlayProps {
    rect: DOMRect
    onReplace: () => void
    onDelete: () => void
}

const AvatarEditOverlay: React.FC<AvatarEditOverlayProps> = ({ rect, onReplace, onDelete }) => {
    // Calculate button positions on bottom of the circle
    // Circle center and radius
    const circleCenterX = rect.left + rect.width / 2
    const circleCenterY = rect.top + rect.height / 2
    const circleRadius = rect.width / 2 // 80px for w-40 (160px)
    const buttonRadius = 17 // 34px / 2
    const buttonSize = buttonRadius * 2 // 34px
    
    // Button center should be above the bottom edge of the circle
    // Move button up by button radius to position it above the circle
    const buttonCenterY = rect.bottom - buttonRadius
    
    // Calculate button positions at angles from bottom
    // For left button (upload): position at bottom-left (225° = 5π/4)
    // For right button (delete): position at bottom-right (315° = 7π/4 or -45° = -π/4)
    // This creates a 90-degree angle between the two buttons
    const leftAngle = (5 * Math.PI) / 4 // 225 degrees (bottom-left, 45° from bottom)
    const rightAngle = (7 * Math.PI) / 4 // 315 degrees (bottom-right, 45° from bottom)
    
    // Calculate positions on circle's bottom edge
    const leftButtonCenterX = circleCenterX + circleRadius * Math.cos(leftAngle)
    const rightButtonCenterX = circleCenterX + circleRadius * Math.cos(rightAngle)
    
    // Adjust to button top-left corner (subtract button radius)
    const leftButtonX = leftButtonCenterX - buttonRadius
    const rightButtonX = rightButtonCenterX - buttonRadius
    
    const overlayContent = (
        <div
            data-avatar-overlay
            onPointerDown={(e) => e.stopPropagation()}
            onClick={(e) => e.stopPropagation()}
            onMouseDown={(e) => e.stopPropagation()}
        >
            {/* Replace Button - Bottom Left */}
            <motion.button
                onClick={(e) => {
                    e.stopPropagation()
                    e.preventDefault()
                    onReplace()
                }}
                onPointerDown={(e) => e.stopPropagation()}
                className={cn(
                    'fixed rounded-full shadow-lg',
                    'size-[34px] flex items-center justify-center',
                    'z-[9999]'
                )}
                style={{
                    left: leftButtonX,
                    top: buttonCenterY - buttonRadius,
                    backgroundColor: 'white',
                    cursor: 'pointer',
                }}
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0, opacity: 0 }}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                transition={{
                    type: 'spring',
                    stiffness: 500,
                    damping: 30,
                }}
            >
                <Upload size={18} weight="regular" className="text-black" />
            </motion.button>

            {/* Delete Button - Bottom Right */}
            <motion.button
                onClick={(e) => {
                    e.stopPropagation()
                    e.preventDefault()
                    onDelete()
                }}
                onPointerDown={(e) => e.stopPropagation()}
                className={cn(
                    'fixed rounded-full shadow-lg',
                    'size-[34px] flex items-center justify-center',
                    'z-[9999]'
                )}
                style={{
                    left: rightButtonX,
                    top: buttonCenterY - buttonRadius,
                    backgroundColor: 'white',
                    cursor: 'pointer',
                }}
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0, opacity: 0 }}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                transition={{
                    type: 'spring',
                    stiffness: 500,
                    damping: 30,
                }}
            >
                <Trash size={18} weight="regular" className="text-black" />
            </motion.button>
        </div>
    )

    if (typeof document === 'undefined') return null
    return ReactDOM.createPortal(overlayContent, document.body)
}
