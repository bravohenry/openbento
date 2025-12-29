'use client'

import React from 'react'
import { 
    LinkSimple, 
    Image, 
    TextT, 
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
} from '@/bento/widgets'
import { cn } from '@/design-system/utils/cn'

// ============ Icons (Phosphor Icons) ============

const ShareIcon = () => (
    <Share size={16} weight="fill" className="text-white" />
)

const LinkIcon = () => (
    <LinkSimple size={16} weight="regular" className="text-black" />
)

const ImageIcon = () => (
    <Image size={16} weight="regular" className="text-black" />
)

const TextIcon = () => (
    <TextT size={16} weight="regular" className="text-black" />
)

const MapIcon = () => (
    <MapPin size={16} weight="regular" className="text-black" />
)

const WidgetsIcon = () => (
    <GridFour size={16} weight="regular" className="text-black" />
)

const DesktopIcon = ({ active }: { active: boolean }) => (
    <Monitor size={16} weight={active ? 'fill' : 'regular'} className={active ? 'text-white' : 'text-black'} />
)

const MobileIcon = ({ active }: { active: boolean }) => (
    <DeviceMobile size={16} weight={active ? 'fill' : 'regular'} className={active ? 'text-white' : 'text-black'} />
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
                "transition-all duration-300 transform hover:scale-[1.05]"
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
