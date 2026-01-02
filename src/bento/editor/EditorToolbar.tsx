'use client'

/**
 * [INPUT]: (EditorContext, useDeviceDetection) - Editor context providing viewMode, setViewMode, addWidget functions, and device detection hook
 * [OUTPUT]: React component - Fixed bottom toolbar with widget creation buttons (Link, Image, Text, Map, Section Title), view mode toggle, link/section title input modals, and conditional share button (desktop only)
 * [POS]: Located at /bento/editor, provides primary editing interface with widget creation, sharing (desktop only), and view mode switching, adapts UI based on device detection
 * 
 * [PROTOCOL]:
 * 1. Once this file's logic changes, this Header must be synchronized immediately.
 * 2. After update, must check upward whether the parent folder's .folder.md description is still accurate.
 */

import React, { useState, useRef, useEffect } from 'react'
import { 
    LinkSimple, 
    Image, 
    TextT, 
    TextH,
    MapPin, 
    GridFour,
    Share,
    Monitor,
    DeviceMobile
} from 'phosphor-react'
import { useEditor, ViewMode } from './EditorContext'
import {
    createLinkWidgetConfig,
    createImageWidgetConfig,
    createTextWidgetConfig,
    createMapWidgetConfig,
    createSectionTitleConfig,
} from '@/bento/widgets'
import { cn } from '@/design-system/utils/cn'
import { useClickOutside } from './hooks/useClickOutside'
import { useDeviceDetection } from './hooks/useDeviceDetection'

// ============ Icons (Phosphor Icons - Duotone Style with Dopamine Colors) ============

// Dopamine color palette - vibrant, high-contrast combinations
const DOPAMINE_COLORS = {
    // Pink (Link) - Passionate & Engaging
    linkPrimary: '#FF2E63',
    linkSecondary: '#FF87A3',
    // Blue (Image) - Clear & Trustworthy
    imagePrimary: '#007AFF',
    imageSecondary: '#6BB5FF',
    // Orange (Text) - Warm & Energetic
    textPrimary: '#FF9500',
    textSecondary: '#FFC46B',
    // Green (Map) - Fresh & Natural
    mapPrimary: '#00C853',
    mapSecondary: '#69EFAD',
    // Purple (Widgets) - Creative & Mysterious
    widgetsPrimary: '#6C5CE7',
    widgetsSecondary: '#A29BFE',
    // Indigo (View Mode)
    viewPrimary: '#5D3FD3',
    viewSecondary: '#8B78E6',
} as const

const ShareIcon = () => (
    <Share size={16} weight="fill" className="text-white" />
)

// Duotone icons with dopamine colors - direct implementation
const LinkIcon = () => (
    <LinkSimple 
        size={16} 
        weight="duotone" 
        color={DOPAMINE_COLORS.linkPrimary}
        style={{ 
            '--duotone-secondary': DOPAMINE_COLORS.linkSecondary 
        } as React.CSSProperties}
    />
)

const ImageIcon = () => (
    <Image 
        size={16} 
        weight="duotone" 
        color={DOPAMINE_COLORS.imagePrimary}
        style={{ 
            '--duotone-secondary': DOPAMINE_COLORS.imageSecondary 
        } as React.CSSProperties}
    />
)

const TextIcon = () => (
    <TextT 
        size={16} 
        weight="duotone" 
        color={DOPAMINE_COLORS.textPrimary}
        style={{ 
            '--duotone-secondary': DOPAMINE_COLORS.textSecondary 
        } as React.CSSProperties}
    />
)

const MapIcon = () => (
    <MapPin 
        size={16} 
        weight="duotone" 
        color={DOPAMINE_COLORS.mapPrimary}
        style={{ 
            '--duotone-secondary': DOPAMINE_COLORS.mapSecondary 
        } as React.CSSProperties}
    />
)

const WidgetsIcon = () => (
    <GridFour 
        size={16} 
        weight="duotone" 
        color={DOPAMINE_COLORS.widgetsPrimary}
        style={{ 
            '--duotone-secondary': DOPAMINE_COLORS.widgetsSecondary 
        } as React.CSSProperties}
    />
)

// Section Title Icon - using TextH to represent heading/title
const SectionTitleIcon = () => (
    <TextH 
        size={16} 
        weight="duotone" 
        color={DOPAMINE_COLORS.widgetsPrimary}
        style={{ 
            '--duotone-secondary': DOPAMINE_COLORS.widgetsSecondary 
        } as React.CSSProperties}
    />
)

const DesktopIcon = ({ active }: { active: boolean }) => (
    <Monitor 
        size={16} 
        weight="duotone" 
        color={active ? '#ffffff' : '#999999'}
        style={{ 
            '--duotone-secondary': active ? '#e0e0e0' : '#cccccc'
        } as React.CSSProperties}
    />
)

const MobileIcon = ({ active }: { active: boolean }) => (
    <DeviceMobile 
        size={16} 
        weight="duotone" 
        color={active ? '#ffffff' : '#999999'}
        style={{ 
            '--duotone-secondary': active ? '#e0e0e0' : '#cccccc'
        } as React.CSSProperties}
    />
)

// ============ Component ============

export const EditorToolbar: React.FC = () => {
    const { viewMode, setViewMode, addWidget } = useEditor()
    const isMobileDevice = useDeviceDetection()
    const [showLinkModal, setShowLinkModal] = useState(false)
    const [linkUrl, setLinkUrl] = useState('')
    const linkInputRef = useRef<HTMLInputElement>(null)
    const linkModalRef = useRef<HTMLFormElement>(null)

    // Focus input when modal opens
    useEffect(() => {
        if (showLinkModal && linkInputRef.current) {
            linkInputRef.current.focus()
        }
    }, [showLinkModal])

    const handleShare = () => {
        const url = window.location.href
        navigator.clipboard.writeText(url).then(() => {
            // Could add toast notification here
            console.log('Link copied to clipboard')
        })
    }

    const handleAddLink = () => {
        setShowLinkModal(true)
        setLinkUrl('')
    }

    const handleLinkSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        if (linkUrl.trim()) {
            await handleAddLinkWithMetadata(linkUrl.trim())
        }
    }

    const handleAddLinkWithMetadata = async (url: string) => {
        // Normalize URL
        let normalizedUrl = url.trim()
        if (!normalizedUrl.startsWith('http://') && !normalizedUrl.startsWith('https://')) {
            normalizedUrl = `https://${normalizedUrl}`
        }

        // Check if it's a generic link (not a known platform)
        const { detectPlatform } = await import('@/bento/widgets/registry')
        const platform = detectPlatform(normalizedUrl)

        // If it's a generic link, fetch metadata
        if (platform === 'generic') {
            try {
                const response = await fetch(`/api/link/metadata?url=${encodeURIComponent(normalizedUrl)}`)
                if (response.ok) {
                    const metadata = await response.json()
                    if (metadata.success) {
                        // Create widget with metadata
                        addWidget(createLinkWidgetConfig(normalizedUrl, '1x1', {
                            title: metadata.title,
                            customIcon: metadata.favicon,
                            subtitle: metadata.description,
                        }))
                        setShowLinkModal(false)
                        setLinkUrl('')
                        return
                    }
                }
            } catch (error) {
                console.error('Failed to fetch metadata:', error)
                // Fall through to default behavior
            }
        }

        // Default: Create widget without metadata (or if metadata fetch failed)
        addWidget(createLinkWidgetConfig(normalizedUrl, '1x1'))
        setShowLinkModal(false)
        setLinkUrl('')
    }

    const handleLinkModalClose = () => {
        setShowLinkModal(false)
        setLinkUrl('')
    }

    // Auto-detect and add link when valid URL is detected
    useEffect(() => {
        if (!showLinkModal || !linkUrl.trim()) return

        const trimmedUrl = linkUrl.trim()
        
        // Check if it looks like a URL (contains domain-like structure)
        // Pattern: has a dot and looks like a domain (e.g., github.com, instagram.com/user)
        const urlPattern = /^(https?:\/\/)?([a-zA-Z0-9]([a-zA-Z0-9\-]{0,61}[a-zA-Z0-9])?\.)+[a-zA-Z]{2,}(\/.*)?$/
        const looksLikeUrl = urlPattern.test(trimmedUrl) || 
                            trimmedUrl.includes('http://') || 
                            trimmedUrl.includes('https://') ||
                            trimmedUrl.includes('www.')

        if (looksLikeUrl) {
            // Normalize URL (add https:// if missing)
            let normalizedUrl = trimmedUrl
            if (!trimmedUrl.startsWith('http://') && !trimmedUrl.startsWith('https://')) {
                normalizedUrl = `https://${trimmedUrl}`
            }

            // Validate URL using URL constructor
            try {
                new URL(normalizedUrl)
                
                // Small delay to ensure user finished typing/pasting
                const timer = setTimeout(async () => {
                    // Double-check the URL hasn't changed
                    if (linkUrl.trim() === trimmedUrl && showLinkModal) {
                        await handleAddLinkWithMetadata(normalizedUrl)
                    }
                }, 300) // 300ms debounce - enough time for paste to complete

                return () => clearTimeout(timer)
            } catch (_) {
                // Invalid URL, do nothing
            }
        }
    }, [linkUrl, showLinkModal, addWidget])

    // Close modal on Escape key
    useEffect(() => {
        if (!showLinkModal) return
        
        const handleEscape = (e: KeyboardEvent) => {
            if (e.key === 'Escape') {
                handleLinkModalClose()
            }
        }
        window.addEventListener('keydown', handleEscape)
        return () => window.removeEventListener('keydown', handleEscape)
    }, [showLinkModal])

    // Close modal when clicking outside
    useClickOutside(linkModalRef, () => {
        if (showLinkModal) {
            handleLinkModalClose()
        }
    }, showLinkModal)

    const fileInputRef = useRef<HTMLInputElement>(null)

    const handleAddImage = () => {
        // Trigger file input click
        fileInputRef.current?.click()
    }

    const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0]
        if (file && file.type.startsWith('image/')) {
            // Convert file to data URL
            const reader = new FileReader()
            reader.onload = (event) => {
                const dataUrl = event.target?.result as string
                if (dataUrl) {
                    addWidget(createImageWidgetConfig(dataUrl, '1x1'))
                }
            }
            reader.readAsDataURL(file)
        }
        // Reset input so same file can be selected again
        if (fileInputRef.current) {
            fileInputRef.current.value = ''
        }
    }

    // Handle paste from clipboard
    useEffect(() => {
        const handlePaste = (e: ClipboardEvent) => {
            const items = e.clipboardData?.items
            if (!items) return

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
                                addWidget(createImageWidgetConfig(dataUrl, '1x1'))
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
    }, [addWidget])

    const handleAddText = () => {
        addWidget(createTextWidgetConfig('', 'note', '1x1'))
    }

    const handleAddMap = () => {
        addWidget(createMapWidgetConfig('', '2x2'))
    }

    const handleAddSectionTitle = () => {
        addWidget(createSectionTitleConfig('', 'bar'))
    }

    return (
        <>
            {/* Hidden file input for image upload */}
            <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleFileSelect}
                className="hidden"
                aria-label="Upload image"
            />

            {/* Link Input Modal - Positioned above toolbar */}
            {showLinkModal && (
                <div className="fixed bottom-[120px] left-1/2 -translate-x-1/2 z-[2000]">
                    <form 
                        ref={linkModalRef}
                        onSubmit={handleLinkSubmit}
                        className="bg-white rounded-[12px] shadow-[0px_2px_8px_0px_rgba(0,0,0,0.08)] border border-black/8 flex items-center overflow-hidden min-w-[400px]"
                    >
                        <input
                            ref={linkInputRef}
                            type="url"
                            value={linkUrl}
                            onChange={(e) => setLinkUrl(e.target.value)}
                            placeholder="Enter Link"
                            className={cn(
                                "flex-1 px-4 py-3",
                                "text-[14px] text-black placeholder:text-black/40",
                                "focus:outline-none",
                                "bg-transparent"
                            )}
                            autoComplete="off"
                        />
                        <button
                            type="button"
                            onClick={async () => {
                                try {
                                    const text = await navigator.clipboard.readText()
                                    setLinkUrl(text)
                                } catch (err) {
                                    console.error('Failed to read clipboard:', err)
                                }
                            }}
                            className={cn(
                                "px-4 py-3",
                                "text-[14px] font-medium text-black",
                                "hover:bg-black/5 active:bg-black/10",
                                "transition-colors duration-150",
                                "border-l border-black/8"
                            )}
                        >
                            Paste
                        </button>
                    </form>
                </div>
            )}


            <div className="fixed bottom-10 left-1/2 -translate-x-1/2 z-[1000]">
                <div className={cn(
                    "flex items-center gap-2 p-2",
                    "backdrop-blur-md bg-white/88 rounded-[16px]",
                    "shadow-[0px_0px_0px_1px_rgba(0,0,0,0.04),0px_27px_54px_0px_rgba(0,0,0,0.04),0px_17.5px_31.625px_0px_rgba(0,0,0,0.03),0px_10.4px_17.2px_0px_rgba(0,0,0,0.02),0px_5.4px_8.775px_0px_rgba(0,0,0,0.02),0px_2.2px_4.4px_0px_rgba(0,0,0,0.02),0px_0.5px_2.125px_0px_rgba(0,0,0,0.01)]",
                    "border border-white/40",
                    "transition-all duration-300 transform hover:scale-[1.05]"
                )}>
                    {/* Desktop: Full toolbar with Share and View Toggle */}
                    {!isMobileDevice && (
                        <>
                            {/* Left: Share */}
                            <button
                                onClick={handleShare}
                                className={cn(
                                    "flex items-center justify-center px-[20px] py-[6.5px]",
                                    "bg-[#ffe8ae] rounded-[6px]",
                                    "shadow-[0px_2px_3px_0px_rgba(0,0,0,0.06)]",
                                    "hover:opacity-90 active:scale-95",
                                    "transition-all duration-200",
                                    "w-[127px]"
                                )}
                            >
                                <span className="text-[12px] font-semibold text-[#333] leading-[20px] whitespace-nowrap">
                                    Share my LinkCard
                                </span>
                            </button>

                            <div className="w-[2px] h-4 bg-black/12 rounded-full mx-1" />
                        </>
                    )}

                    {/* Center: Add Widgets (always visible) */}
                    <div className="flex items-center gap-1">
                        <ToolbarButton
                            icon={<LinkIcon />}
                            tooltip="Add Link"
                            onClick={handleAddLink}
                        />
                        <ToolbarButton
                            icon={<ImageIcon />}
                            tooltip="Add Image"
                            onClick={handleAddImage}
                        />
                        <ToolbarButton
                            icon={<TextIcon />}
                            tooltip="Add Text"
                            onClick={handleAddText}
                        />
                        <ToolbarButton
                            icon={<MapIcon />}
                            tooltip="Add Map"
                            onClick={handleAddMap}
                        />
                        <ToolbarButton
                            icon={<SectionTitleIcon />}
                            tooltip="Add Section Title"
                            onClick={handleAddSectionTitle}
                        />
                    </div>

                    {/* Desktop: View Mode Toggle */}
                    {!isMobileDevice && (
                        <>
                            <div className="w-[2px] h-4 bg-black/12 rounded-full mx-1" />
                            <div className="flex items-center gap-1">
                                <button
                                    onClick={() => setViewMode('desktop')}
                                    className={cn(
                                        "flex items-center justify-center",
                                        "h-[33px] w-[50px] rounded-[6px]",
                                        "transition-all duration-200",
                                        viewMode === 'desktop'
                                            ? "bg-black shadow-[0px_3px_2px_0px_rgba(0,0,0,0.06)]"
                                            : "hover:bg-black/5"
                                    )}
                                >
                                    <DesktopIcon active={viewMode === 'desktop'} />
                                </button>
                                <div className="w-[4px]" />
                                <button
                                    onClick={() => setViewMode('mobile')}
                                    className={cn(
                                        "flex items-center justify-center",
                                        "h-[33px] w-[50px] rounded-[6px]",
                                        "transition-all duration-200",
                                        viewMode === 'mobile'
                                            ? "bg-black shadow-[0px_3px_2px_0px_rgba(0,0,0,0.06)]"
                                            : "hover:bg-black/5"
                                    )}
                                >
                                    <MobileIcon active={viewMode === 'mobile'} />
                                </button>
                            </div>
                        </>
                    )}
                </div>
            </div>
        </>
    )
}

const ToolbarButton: React.FC<{
    icon: React.ReactNode
    tooltip: string
    onClick?: () => void
}> = ({ icon, tooltip, onClick }) => (
    <button
        onClick={onClick}
        className={cn(
            "relative group flex items-center justify-center",
            "size-[32px] rounded-[10px]",
            "transition-all duration-200",
            "hover:scale-110 active:scale-95"
        )}
        aria-label={tooltip}
    >
        <div className={cn(
            "bg-white rounded-[7px] size-[24px]",
            "shadow-[0px_0.6px_2px_0px_rgba(0,0,0,0.16)]",
            "flex items-center justify-center",
            "border border-black/12"
        )}>
            {icon}
        </div>
        {/* Tooltip */}
        <div 
            className="absolute -top-10 left-1/2 -translate-x-1/2 px-2 py-1 text-black text-[10px] font-normal rounded opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap z-50"
            style={{
                background: '#fafafa', // 1% gray background
                boxShadow: 'none' // no shadow
            }}
        >
            {tooltip}
        </div>
    </button>
)
