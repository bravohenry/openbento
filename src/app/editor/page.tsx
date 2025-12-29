'use client'

/**
 * [INPUT]: None - Main editor page component
 * [OUTPUT]: React component - Full-featured editor with drag-and-drop, responsive grid (4 columns desktop, 2 columns mobile), and widget management with desktop/mobile layout sync
 * [POS]: Main editor page at /editor route, provides complete editing experience with responsive grid layout that adapts to view mode (desktop: 4 columns, mobile: 2 columns)
 * 
 * [PROTOCOL]:
 * 1. Once this file's logic changes, this Header must be synchronized immediately.
 * 2. After update, must check upward whether the parent folder's .folder.md description is still accurate.
 */

import React, { useEffect, useRef, useMemo, useCallback } from 'react'
import { v4 as uuidv4 } from 'uuid'
import { motion } from 'framer-motion'

import { EditorProvider, EditorLayout, useEditor } from '@/bento/editor'
import { MIN_CANVAS_WIDTH } from '@/bento/editor/constants'
import { WidgetEditOverlay } from '@/bento/editor'
import { BentoGrid } from '@/bento/grid'
import { GridDndProvider, DraggableGridItem, swapItems, type GridItem } from '@/bento/dnd'
import {
    WidgetRenderer,
    createLinkWidgetConfig,
    createImageWidgetConfig,
    createTextWidgetConfig,
    createMapWidgetConfig,
} from '@/bento/widgets'
import { cn } from '@/design-system/utils/cn'
import type { WidgetConfig, WidgetSize } from '@/bento/widgets/types'

// ============ Widget Dimensions Map ============

const WIDGET_DIMENSIONS: Record<WidgetSize, { width: number; height: number }> = {
    '1x1': { width: 175, height: 175 },
    '2x1': { width: 390, height: 175 },
    '1x2': { width: 175, height: 390 },
    '2x2': { width: 390, height: 390 },
    'bar': { width: 390, height: 68 },
}

const parseWidgetSize = (size: WidgetSize): { cols: number; rows: number } => {
    if (size === 'bar') {
        return { cols: 2, rows: 1 }
    }
    const [cols, rows] = size.split('x').map(Number)
    return { cols, rows }
}

// ============ Editable Widget ============

interface EditableWidgetProps {
    widget: WidgetConfig
    isSelected: boolean
    onSelect: () => void
    onDelete: () => void
    onSizeChange: (size: WidgetSize) => void
    isEditing: boolean
    onUpdate: (updates: Partial<WidgetConfig>) => void
    onClose?: () => void
}

const EditableWidget: React.FC<EditableWidgetProps & { onUpdate: (updates: Partial<WidgetConfig>) => void }> = ({
    widget,
    isSelected,
    onSelect,
    onDelete,
    onSizeChange,
    isEditing,
    onUpdate,
    onClose,
}) => {
    const { cols, rows } = parseWidgetSize(widget.size)

    const content = (
        <div
            className="relative w-full h-full"
            onClick={(e) => {
                if (isEditing) {
                    e.stopPropagation()
                    onSelect()
                }
            }}
        >
            <WidgetRenderer config={widget} isEditing={isEditing} />
            {isEditing && isSelected && (
                <WidgetEditOverlay
                    widget={widget}
                    onDelete={onDelete}
                    onSizeChange={onSizeChange}
                    onUpdate={onUpdate}
                    onClose={onClose}
                />
            )}
        </div>
    )

    // Use Framer Motion for smooth layout animations with CSS Grid dense flow
    return (
        <motion.div
            layout
            layoutId={`widget-${widget.id}`}
            id={`widget-${widget.id}`}
            transition={{
                layout: {
                    type: 'spring',
                    stiffness: 400,
                    damping: 35,
                },
            }}
            style={{
                gridColumn: `span ${cols}`,
                gridRow: `span ${rows}`,
            }}
        >
            {isEditing ? (
                <DraggableGridItem id={widget.id}>
                    <motion.div layout className="w-full h-full">
                        {content}
                    </motion.div>
                </DraggableGridItem>
            ) : (
                <motion.div layout className="w-full h-full">
                    {content}
                </motion.div>
            )}
        </motion.div>
    )
}

// ============ Editor Content ============

const EditorContent: React.FC = () => {
    const {
        widgets,
        viewMode: currentViewMode,
        selectedWidgetId,
        setSelectedWidgetId,
        isEditing,
        removeWidget,
        updateWidget,
        addWidget,
        reorderWidgets,
        desktopWidgets,
        mobileWidgets,
    } = useEditor()
    const containerRef = useRef<HTMLDivElement>(null)
    const hasInitialized = useRef(false)

    // Initialize with example data if empty
    useEffect(() => {
        if (!hasInitialized.current && widgets.length === 0) {
            hasInitialized.current = true

            const exampleWidgets: WidgetConfig[] = [
                { ...createLinkWidgetConfig('https://linkcard.ai', '1x1'), id: uuidv4() },
                { ...createLinkWidgetConfig('https://twitter.com/linkcardai', '1x1'), id: uuidv4() },
                { ...createLinkWidgetConfig('https://instagram.com/linkcardai', '1x1'), id: uuidv4() },
                { ...createLinkWidgetConfig('https://linkedin.com/company/linkcard', '1x1'), id: uuidv4() },
                { ...createTextWidgetConfig('Designed for the moment you meet.', 'note', '1x1'), id: uuidv4() },
                { ...createImageWidgetConfig('https://images.unsplash.com/photo-1551650975-87deedd944c3?w=400&h=400&fit=crop', '1x1'), id: uuidv4() },
                { ...createLinkWidgetConfig('https://linkcard.ai/features', '2x2'), id: uuidv4() },
                { ...createMapWidgetConfig('San Francisco, CA', '2x2', { lat: 37.7749, lng: -122.4194, label: 'San Francisco, CA' }), id: uuidv4() },
            ]

            exampleWidgets.forEach((widget) => addWidget(widget))
        }
    }, [widgets.length, addWidget])

    // Click outside to deselect (but not when clicking on overlay elements or widgets)
    useEffect(() => {
        if (!isEditing) return

        const handleClickOutside = (e: MouseEvent) => {
            const target = e.target as Element | null
            if (!target) return

            // Don't deselect if clicking on overlay elements (portal elements)
            if (target.closest('[data-widget-overlay]')) {
                return
            }

            // Check if clicking on any widget element
            // Widgets have id="widget-{id}" on the motion.div wrapper
            let currentElement: Element | null = target
            while (currentElement) {
                // Check if this element or any parent has widget id
                if (currentElement.id && currentElement.id.startsWith('widget-')) {
                    return // Clicked on a widget, don't deselect
                }
                // Check if inside a widget container (bento-card or widget wrapper)
                if (currentElement.classList.contains('bento-card') || 
                    currentElement.closest('[id^="widget-"]')) {
                    return // Clicked inside a widget, don't deselect
                }
                currentElement = currentElement.parentElement
            }

            // If we get here, clicked on empty space - deselect
            setSelectedWidgetId(null)
        }

        document.addEventListener('mousedown', handleClickOutside)
        return () => document.removeEventListener('mousedown', handleClickOutside)
    }, [isEditing, setSelectedWidgetId])

    const handleSizeChange = useCallback((widgetId: string, newSize: WidgetSize) => {
        updateWidget(widgetId, { size: newSize })
    }, [updateWidget])

    // Convert to GridItem for DnD
    const gridItems: GridItem[] = useMemo(() => {
        return widgets.map((widget) => ({
            id: widget.id,
            size: widget.size,
            data: widget,
        }))
    }, [widgets])

    // Handle swap - exchange positions of two widgets
    const handleSwap = useCallback((fromId: string, toId: string) => {
        const newWidgets = swapItems(widgets, fromId, toId)
        reorderWidgets(newWidgets)
    }, [widgets, reorderWidgets])

    // Determine grid columns based on view mode
    const gridColumns = currentViewMode === 'mobile' ? 2 : 4

    const gridContent = (
        <BentoGrid columns={gridColumns} centered>
            {widgets.map((widget) => (
                        <EditableWidget
                            key={widget.id}
                            widget={widget}
                            isSelected={selectedWidgetId === widget.id}
                            onSelect={() => setSelectedWidgetId(widget.id)}
                            onDelete={() => removeWidget(widget.id)}
                            onSizeChange={(size) => handleSizeChange(widget.id, size)}
                            isEditing={isEditing}
                            onUpdate={(updates) => updateWidget(widget.id, updates)}
                            onClose={() => setSelectedWidgetId(null)}
                        />
            ))}
        </BentoGrid>
    )

    return (
        <EditorLayout>
            {/* Desktop: Full width container, no max-width constraint */}
            {/* Mobile: Container is handled by EditorLayout, no extra wrapper needed */}
            {currentViewMode === 'desktop' ? (
                <div className="w-full h-full flex items-start justify-center py-12" ref={containerRef} style={{ overflowX: 'hidden' }}>
                    <div style={{ width: `${MIN_CANVAS_WIDTH}px`, minWidth: `${MIN_CANVAS_WIDTH}px` }}>
                        {isEditing ? (
                            <GridDndProvider
                                items={gridItems}
                                onSwap={handleSwap}
                                renderOverlay={(item) => {
                                    const widget = item.data as WidgetConfig
                                    const dims = WIDGET_DIMENSIONS[widget.size] || WIDGET_DIMENSIONS['1x1']
                                    return (
                                        <div style={{
                                            width: dims.width,
                                            height: dims.height,
                                            borderRadius: '27px',
                                            overflow: 'hidden',
                                        }}>
                                            <WidgetRenderer config={widget} isEditing={false} />
                                        </div>
                                    )
                                }}
                            >
                                {gridContent}
                            </GridDndProvider>
                        ) : (
                            gridContent
                        )}
                    </div>
                </div>
            ) : (
                // Mobile: Content is already wrapped by EditorLayout's container
                <div ref={containerRef}>
                    {isEditing ? (
                        <GridDndProvider
                            items={gridItems}
                            onSwap={handleSwap}
                            renderOverlay={(item) => {
                                const widget = item.data as WidgetConfig
                                const dims = WIDGET_DIMENSIONS[widget.size] || WIDGET_DIMENSIONS['1x1']
                                return (
                                    <div style={{
                                        width: dims.width,
                                        height: dims.height,
                                        borderRadius: '27px',
                                        overflow: 'hidden',
                                    }}>
                                        <WidgetRenderer config={widget} isEditing={false} />
                                    </div>
                                )
                            }}
                        >
                            {gridContent}
                        </GridDndProvider>
                    ) : (
                        gridContent
                    )}
                </div>
            )}
        </EditorLayout>
    )
}

// ============ Page ============

export default function EditorPage() {
    return (
        <EditorProvider>
            <EditorContent />
        </EditorProvider>
    )
}
