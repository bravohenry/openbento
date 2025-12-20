'use client'

import React from 'react'
import { useEditor, ViewMode } from './EditorContext'
import {
    createLinkWidgetConfig,
    createImageWidgetConfig,
    createTextWidgetConfig,
    createMapWidgetConfig,
} from '@/bento/widgets'
import { cn } from '@/design-system/utils/cn'

// ============ Icons (Customized for Toolbar) ============

const ShareIcon = () => (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M12 10C11.2 10 10.5 10.3 10 10.8L5.9 8.3C6 8.1 6 7.9 6 7.7C6 7.5 6 7.3 5.9 7.1L10 4.6C10.5 5.1 11.2 5.4 12 5.4C13.7 5.4 15 4.1 15 2.4C15 0.7 13.7 -0.6 12 -0.6C10.3 -0.6 9 0.7 9 2.4C9 2.6 9 2.8 9.1 3L5 5.5C4.5 5 3.8 4.7 3 4.7C1.3 4.7 0 6 0 7.7C0 9.4 1.3 10.7 3 10.7C3.8 10.7 4.5 10.4 5 9.9L9.1 12.4C9 12.6 9 12.8 9 13C9 14.7 10.3 16 12 16C13.7 16 15 14.7 15 13C15 11.3 13.7 10 12 10Z" fill="currentColor" />
    </svg>
)

const LinkIcon = () => (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect width="20" height="20" rx="4" fill="white" />
        <rect x="0.5" y="0.5" width="19" height="19" rx="3.5" stroke="black" strokeOpacity="0.08" />
        <path d="M7.7 12.3C7.2 12.3 6.8 12.1 6.5 11.8C6.2 11.5 6 11.1 6 10.6C6 10.1 6.2 9.7 6.5 9.4L8.1 7.8C8.4 7.5 8.8 7.3 9.3 7.3C9.8 7.3 10.2 7.5 10.5 7.8C10.8 8.1 11 8.5 11 9C11 9.3 10.9 9.5 10.8 9.7L9.7 10.8C9.6 10.9 9.4 11 9.2 11C9 11 8.8 10.9 8.7 10.8C8.6 10.7 8.5 10.5 8.5 10.3C8.5 10.1 8.6 9.9 8.7 9.8L9.8 8.7C9.9 8.6 9.9 8.5 9.9 8.4C9.9 8.3 9.9 8.2 9.8 8.1C9.7 7.9 9.5 7.8 9.3 7.8C9.1 7.8 8.9 7.9 8.8 8.1L7.2 9.7C7.1 9.8 7 10 7 10.3C7 10.6 7.1 10.8 7.2 10.9C7.3 11.1 7.5 11.2 7.7 11.2C7.9 11.2 8.1 11.1 8.2 10.9L8.7 10.4C8.8 10.3 9 10.2 9.2 10.2C9.4 10.2 9.6 10.3 9.7 10.4C9.8 10.5 9.9 10.7 9.9 10.9C9.9 11.1 9.8 11.3 9.7 11.4L9.2 11.9C8.9 12.2 8.5 12.3 8.1 12.3H7.7ZM12.3 7.7C12.8 7.7 13.2 7.9 13.5 8.2C13.8 8.5 14 8.9 14 9.4C14 9.9 13.8 10.3 13.5 10.6L11.9 12.2C11.6 12.5 11.2 12.7 10.7 12.7C10.2 12.7 9.8 12.5 9.5 12.2C9.2 11.9 9 11.5 9 11C9 10.7 9.1 10.5 9.2 10.3L10.3 9.2C10.4 9.1 10.6 9 10.8 9C11 9 11.2 9.1 11.3 9.2C11.4 9.3 11.5 9.5 11.5 9.7C11.5 9.9 11.4 10.1 11.3 10.2L10.2 11.3C10.1 11.4 10.1 11.5 10.1 11.6C10.1 11.7 10.1 11.8 10.2 11.9C10.3 12.1 10.5 12.2 10.7 12.2C10.9 12.2 11.1 12.1 11.2 11.9L12.8 10.3C12.9 10.2 13 10 13 9.7C13 9.4 12.9 9.2 12.8 9.1C12.7 8.9 12.5 8.8 12.3 8.8C12.1 8.8 11.9 8.9 11.8 9.1L11.3 9.6C11.2 9.7 11 9.8 10.8 9.8C10.6 9.8 10.4 9.7 10.3 9.6C10.2 9.5 10.1 9.3 10.1 9.1C10.1 8.9 10.2 8.7 10.3 8.6L10.8 8.1C11.1 7.8 11.5 7.7 11.9 7.7H12.3V7.7Z" fill="black" />
    </svg>
)

const ImageIcon = () => (
    <div style={{ width: 24, height: 24, borderRadius: 6, overflow: 'hidden', position: 'relative' }}>
        <img src="http://localhost:3845/assets/235092dc5d751e5ec75e6e5917e439454dd1c217.png" alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
    </div>
)

const TextIcon = () => (
    <div style={{ width: 24, height: 24, borderRadius: 6, overflow: 'hidden', position: 'relative' }}>
        <img src="http://localhost:3845/assets/cb0d5ae262b4dd3b1d7d588783349795cb472cdf.png" alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
    </div>
)

const MapIcon = () => (
    <div style={{ width: 24, height: 24, borderRadius: 6, overflow: 'hidden', position: 'relative' }}>
        <img src="http://localhost:3845/assets/5f25c660df3453f9f3fb4d7ed8f6658202cf860f.png" alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
    </div>
)

const WidgetsIcon = () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect width="24" height="24" rx="6" fill="white" />
        <rect x="0.5" y="0.5" width="23" height="23" rx="5.5" stroke="black" strokeOpacity="0.08" />
        <rect x="7" y="7" width="4" height="2" rx="1" fill="#71717A" />
        <rect x="7" y="11" width="4" height="4" rx="1" fill="#71717A" fillOpacity="0.3" />
        <rect x="13" y="11" width="4" height="4" rx="1" fill="#71717A" fillOpacity="0.3" />
    </svg>
)

const DesktopIcon = ({ active }: { active: boolean }) => (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M16 4H4C3.45 4 3 4.45 3 5V13C3 13.55 3.45 14 4 14H8V15H6V16H14V15H12V14H16C16.55 14 17 13.55 17 13V5C17 4.45 16.55 4 16 4ZM15.5 12.5H4.5V5.5H15.5V12.5Z" fill={active ? 'white' : 'black'} />
    </svg>
)

const MobileIcon = ({ active }: { active: boolean }) => (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M14 2H6C5.45 2 5 2.45 5 3V17C5 17.55 5.45 18 6 18H14C14.55 18 15 17.55 15 17V3C15 2.45 14.55 2 14 2ZM13.5 16.5H6.5V3.5H13.5V16.5Z" fill={active ? 'white' : 'black'} />
    </svg>
)

// ============ Component ============

export const EditorToolbar: React.FC = () => {
    const { viewMode, setViewMode, addWidget } = useEditor()

    const handleShare = () => {
        const url = window.location.href
        navigator.clipboard.writeText(url).then(() => {
            // Could add toast notification here
            console.log('Link copied to clipboard')
        })
    }

    const handleAddLink = () => {
        addWidget(createLinkWidgetConfig('', '1x1'))
    }

    const handleAddImage = () => {
        addWidget(createImageWidgetConfig('', '1x1'))
    }

    const handleAddText = () => {
        addWidget(createTextWidgetConfig('', 'note', '1x1'))
    }

    const handleAddMap = () => {
        addWidget(createMapWidgetConfig('', '2x2'))
    }

    return (
        <div className="fixed bottom-10 left-1/2 -translate-x-1/2 z-[1000]">
            <div className={cn(
                "flex items-center gap-2 p-2",
                "backdrop-blur-md bg-white/88 rounded-[16px]",
                "shadow-[0px_0px_0px_1px_rgba(0,0,0,0.04),0px_27px_54px_0px_rgba(0,0,0,0.04),0px_17.5px_31.625px_0px_rgba(0,0,0,0.03),0px_10.4px_17.2px_0px_rgba(0,0,0,0.02),0px_5.4px_8.775px_0px_rgba(0,0,0,0.02),0px_2.2px_4.4px_0px_rgba(0,0,0,0.02),0px_0.5px_2.125px_0px_rgba(0,0,0,0.01)]",
                "border border-white/40",
                "transition-all duration-300"
            )}>
                {/* Left: Share */}
                <button
                    onClick={handleShare}
                    className={cn(
                        "flex items-center justify-center h-[33px] px-[20px]",
                        "bg-[#4edd76] rounded-[6px]",
                        "shadow-[0px_2px_3px_0px_rgba(0,0,0,0.06)]",
                        "hover:opacity-90 active:scale-95",
                        "transition-all duration-200"
                    )}
                >
                    <span className="text-[14px] font-semibold text-white leading-[20px]">
                        Share my Bento
                    </span>
                </button>

                <div className="w-[2px] h-4 bg-black/12 rounded-full mx-1" />

                {/* Center: Add Widgets */}
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
                        icon={<WidgetsIcon />}
                        tooltip="More Widgets"
                    />
                </div>

                <div className="w-[2px] h-4 bg-black/12 rounded-full mx-1" />

                {/* Right: View Mode Toggle */}
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
            </div>
        </div>
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
        <div className="absolute -top-10 left-1/2 -translate-x-1/2 px-2 py-1 bg-black text-white text-[11px] rounded opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap z-50">
            {tooltip}
        </div>
    </button>
)
