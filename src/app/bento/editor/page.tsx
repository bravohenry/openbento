'use client'

import React, { useEffect, useRef, useMemo } from 'react'
import { v4 as uuidv4 } from 'uuid'
import { motion } from 'framer-motion'
import { EditorProvider, EditorToolbar, useEditor } from '@/bento/editor'
import { WidgetEditOverlay } from '@/bento/editor'
import { BentoGrid } from '@/bento/grid'
import { BentoDndProvider, SortableCard, type BentoItem } from '@/bento/dnd'
import {
    WidgetRenderer,
    createLinkWidgetConfig,
    createImageWidgetConfig,
    createTextWidgetConfig,
    createMapWidgetConfig,
} from '@/bento/widgets'
import { cn } from '@/design-system/utils/cn'
import type { WidgetConfig, WidgetSize } from '@/bento/widgets/types'

// ============ Editor View Wrapper ============

const EditorView: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const { viewMode } = useEditor()

    return (
        <div className="min-h-screen bg-[#F5F5F7] pb-40 transition-colors duration-500">
            {/* Header / Nav Placeholder */}
            <div className="h-16 flex items-center justify-between px-8 bg-white border-b border-black/5">
                <div className="flex items-center gap-2">
                    <div className="w-8 h-8 bg-black rounded-lg" />
                    <span className="font-bold text-lg">OpenBento Editor</span>
                </div>
                <div className="flex items-center gap-4">
                    <button className="text-[14px] font-medium text-black/60">Help</button>
                    <button className="px-4 h-9 bg-black text-white text-[14px] font-medium rounded-full">Publish</button>
                </div>
            </div>

            {/* Main Content Area */}
            <div className="flex justify-center p-12 overflow-x-hidden">
                <div
                    className={cn(
                        "transition-all duration-700 ease-[cubic-bezier(0.23,1,0.32,1)]",
                        viewMode === 'mobile'
                            ? "w-[430px] bg-white rounded-[48px] shadow-[0_40px_100px_rgba(0,0,0,0.1)] ring-[12px] ring-black/5 p-4 min-h-[844px]"
                            : "w-full max-w-[1200px]"
                    )}
                >
                    {/* Viewport Label */}
                    <div className={cn(
                        "text-center mb-8 transition-opacity duration-300",
                        viewMode === 'mobile' ? "opacity-100" : "opacity-0 h-0 overflow-hidden"
                    )}>
                        <span className="text-[12px] font-semibold text-black/20 uppercase tracking-widest">Mobile View (iPhone 14 Pro)</span>
                    </div>

                    <div className={cn(
                        "transition-all duration-500",
                        viewMode === 'mobile' ? "scale-[0.9] origin-top" : "scale-100"
                    )}>
                        {children}
                    </div>
                </div>
            </div>

            <EditorToolbar />
        </div>
    )
}

// ============ Editable Widget Wrapper ============

interface EditableWidgetProps {
    widget: WidgetConfig
    isSelected: boolean
    onSelect: () => void
    onDelete: () => void
    onSizeChange: (size: WidgetSize) => void
    isEditing: boolean
}

// Helper to parse WidgetSize (subset of BentoSize)
const parseWidgetSize = (size: WidgetSize): { cols: number; rows: number } => {
    if (size === 'bar') {
        return { cols: 2, rows: 0.4 }
    }
    const [cols, rows] = size.split('x').map(Number)
    return { cols, rows }
}

const EditableWidget: React.FC<EditableWidgetProps & { isDragging?: boolean }> = ({
    widget,
    isSelected,
    onSelect,
    onDelete,
    onSizeChange,
    isEditing,
    isDragging = false,
}) => {
    const { cols, rows } = parseWidgetSize(widget.size)

    const widgetContent = (
        <div
            className="relative w-full h-full"
            onClick={(e) => {
                if (isEditing && !isDragging) {
                    e.stopPropagation()
                    onSelect()
                }
            }}
            style={{
                // Remove any extra borders/outlines in edit mode
                outline: 'none',
            }}
        >
            <WidgetRenderer
                config={widget}
                isEditing={isEditing}
            />
            {isEditing && isSelected && !isDragging && (
                <WidgetEditOverlay
                    widget={widget}
                    onDelete={onDelete}
                    onSizeChange={onSizeChange}
                />
            )}
        </div>
    )

    return (
        <motion.div
            className="relative"
            style={{
                gridColumn: `span ${cols}`,
                gridRow: `span ${rows}`,
                // Remove any extra borders/outlines
                outline: 'none',
                border: 'none',
            }}
            layout
            transition={{
                type: 'tween',
                duration: 0.3,
                ease: [0.32, 0.72, 0, 1], // Apple easing
            }}
        >
            {isEditing ? (
                <SortableCard id={widget.id}>
                    {({ isDragging: cardIsDragging }) => (
                        <div style={{ pointerEvents: cardIsDragging ? 'none' : 'auto' }}>
                            {widgetContent}
                        </div>
                    )}
                </SortableCard>
            ) : (
                widgetContent
            )}
        </motion.div>
    )
}

// ============ Editor Content ============

const EditorContent: React.FC = () => {
    const {
        widgets,
        selectedWidgetId,
        setSelectedWidgetId,
        isEditing,
        removeWidget,
        updateWidget,
        addWidget,
        reorderWidgets,
    } = useEditor()
    const containerRef = useRef<HTMLDivElement>(null)
    const hasInitialized = useRef(false)

    // Initialize with example data if empty
    useEffect(() => {
        if (!hasInitialized.current && widgets.length === 0) {
            hasInitialized.current = true
            
            // Add example widgets matching the target design
            const exampleWidgets: WidgetConfig[] = [
                // WhatsApp LinkWidget (2x1)
                { ...createLinkWidgetConfig('https://chat.whatsapp.com/I9T0thvByFK84LILHNczp7', '2x1'), id: uuidv4() },
                // LinkedIn LinkWidget (2x2)
                { ...createLinkWidgetConfig('https://linkedin.com/company/biutyai', '2x2'), id: uuidv4() },
                // Instagram LinkWidget (1x1)
                { ...createLinkWidgetConfig('https://instagram.com/biuty.ai', '1x1'), id: uuidv4() },
                // Twitter LinkWidget (1x1)
                { ...createLinkWidgetConfig('https://twitter.com/biutyai', '1x1'), id: uuidv4() },
                // TikTok LinkWidget (1x1)
                { ...createLinkWidgetConfig('https://tiktok.com/@biuty.ai', '1x1'), id: uuidv4() },
                // Biuty LinkWidget (1x2)
                { ...createLinkWidgetConfig('https://biuty.ai', '1x2'), id: uuidv4() },
                // TextWidget (1x1, "Add note...")
                { ...createTextWidgetConfig('', 'note', '1x1'), id: uuidv4() },
                // MapWidget (2x2, Berlin)
                { ...createMapWidgetConfig('Berlin, Germany', '2x2', { lat: 52.52, lng: 13.405, label: 'Berlin' }), id: uuidv4() },
                // ImageWidget (1x1) - placeholder
                { ...createImageWidgetConfig('https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop', '1x1'), id: uuidv4() },
            ]

            exampleWidgets.forEach((widget) => addWidget(widget))
        }
    }, [widgets.length, addWidget])

    // Click outside to deselect
    useEffect(() => {
        if (!isEditing) return

        const handleClickOutside = (e: MouseEvent) => {
            if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
                setSelectedWidgetId(null)
            }
        }

        document.addEventListener('mousedown', handleClickOutside)
        return () => document.removeEventListener('mousedown', handleClickOutside)
    }, [isEditing, setSelectedWidgetId])

    const handleSizeChange = (widgetId: string, newSize: WidgetSize) => {
        updateWidget(widgetId, { size: newSize })
    }

    // Convert WidgetConfig to BentoItem for drag and drop
    const bentoItems: BentoItem[] = useMemo(() => {
        return widgets.map((widget) => ({
            id: widget.id,
            size: widget.size === 'bar' ? '2x1' : widget.size, // Map 'bar' to '2x1' for compatibility
            content: null,
            data: widget,
        }))
    }, [widgets])

    // Internal state for drag preview (to avoid infinite loops)
    const [dragPreviewItems, setDragPreviewItems] = React.useState<BentoItem[]>(bentoItems)
    const isDraggingRef = React.useRef(false)

    // Sync preview items when widgets change (but not during drag)
    React.useEffect(() => {
        if (!isDraggingRef.current) {
            setDragPreviewItems(bentoItems)
        }
    }, [bentoItems])

    // Handle drag and drop reordering - update preview only
    const handleItemsChange = React.useCallback((newItems: BentoItem[]) => {
        // Update preview state only, not the actual widgets
        setDragPreviewItems(newItems)
    }, [])

    // Handle drag start
    const handleDragStart = React.useCallback(() => {
        isDraggingRef.current = true
    }, [])

    // Handle final reorder on drag end
    const handleDragEnd = React.useCallback((item: BentoItem, fromIndex: number, toIndex: number) => {
        isDraggingRef.current = false
        
        // Use the final preview order to update actual widgets
        const finalOrder = dragPreviewItems
            .map((item) => widgets.find((w) => w.id === item.id))
            .filter((w): w is WidgetConfig => w !== undefined)
        
        if (finalOrder.length === widgets.length) {
            reorderWidgets(finalOrder)
        }
    }, [dragPreviewItems, widgets, reorderWidgets])

    const gridContent = (
        <BentoGrid columns={4} centered>
            {widgets.map((widget) => (
                <EditableWidget
                    key={widget.id}
                    widget={widget}
                    isSelected={selectedWidgetId === widget.id}
                    onSelect={() => setSelectedWidgetId(widget.id)}
                    onDelete={() => removeWidget(widget.id)}
                    onSizeChange={(size) => handleSizeChange(widget.id, size)}
                    isEditing={isEditing}
                />
            ))}
        </BentoGrid>
    )

    return (
        <div className="flex flex-col gap-12" ref={containerRef}>
            {/* Hero Section */}
            <div className="flex flex-col items-center text-center gap-4">
                <h1 className="text-[44px] font-bold leading-[52.8px] tracking-[-2px] text-black">
                    Biuty AI
                </h1>
                <p className="text-[20px] leading-[28px] text-[#565656] max-w-[500px]">
                    Don't waste another dollar on products that don't work.{' '}
                    <span className="font-bold">Let AI analyze your skin.</span>
                </p>
            </div>

            {/* Bento Grid with DnD */}
            {isEditing ? (
                <BentoDndProvider
                    items={dragPreviewItems}
                    onItemsChange={handleItemsChange}
                    onDragStart={handleDragStart}
                    onDragEnd={handleDragEnd}
                    renderOverlay={(item) => {
                        const widget = item.data as WidgetConfig
                        return (
                            <div className="opacity-90">
                                <WidgetRenderer config={widget} isEditing={isEditing} />
                            </div>
                        )
                    }}
                >
                    {gridContent}
                </BentoDndProvider>
            ) : (
                gridContent
            )}
        </div>
    )
}

// ============ Page ============

export default function EditorPage() {
    return (
        <EditorProvider>
            <EditorView>
                <EditorContent />
            </EditorView>
        </EditorProvider>
    )
}
