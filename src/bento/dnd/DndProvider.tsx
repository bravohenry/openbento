/**
 * OpenBento - DnD Provider
 * 
 * 拖放系统的顶层 Provider，管理全局拖拽状态
 */

import React, { createContext, useContext, useReducer, useCallback, useEffect, ReactNode } from 'react'
import type {
    DndState,
    DndAction,
    DndContextValue,
    DndProviderProps,
    DragItem,
    DropResult,
} from './dnd.types'

// ============ Initial State ============

const initialState: DndState = {
    isDragging: false,
    activeItem: null,
    dragPosition: null,
    gridPreviewPosition: null,
    activeDroppableId: null,
    canDrop: false,
}

// ============ Reducer ============

const dndReducer = (state: DndState, action: DndAction): DndState => {
    switch (action.type) {
        case 'DRAG_START':
            return {
                ...state,
                isDragging: true,
                activeItem: action.payload.item,
                dragPosition: action.payload.position,
            }

        case 'DRAG_MOVE':
            return {
                ...state,
                dragPosition: action.payload.position,
                gridPreviewPosition: action.payload.gridPosition ?? state.gridPreviewPosition,
            }

        case 'DRAG_END':
            return {
                ...state,
                isDragging: false,
                activeItem: null,
                dragPosition: null,
                gridPreviewPosition: null,
                activeDroppableId: null,
                canDrop: false,
            }

        case 'SET_ACTIVE_DROPPABLE':
            return {
                ...state,
                activeDroppableId: action.payload,
            }

        case 'SET_CAN_DROP':
            return {
                ...state,
                canDrop: action.payload,
            }

        case 'RESET':
            return initialState

        default:
            return state
    }
}

// ============ Context ============

const DndContext = createContext<DndContextValue | null>(null)

export const useDndContext = (): DndContextValue => {
    const context = useContext(DndContext)
    if (!context) {
        throw new Error('useDndContext must be used within a DndProvider')
    }
    return context
}

// ============ Drop Registry ============

type DropHandler = (item: DragItem) => DropResult | void

const dropRegistry = new Map<string, DropHandler>()

export const registerDroppable = (id: string, handler: DropHandler) => {
    dropRegistry.set(id, handler)
    return () => dropRegistry.delete(id)
}

export const getDropHandler = (id: string) => dropRegistry.get(id)

// ============ Provider Component ============

export const DndProvider: React.FC<DndProviderProps> = ({
    children,
    onDrop,
    onDragStart,
    onDragEnd,
    enableKeyboard = true,
    enableTouch = true,
}) => {
    const [state, dispatch] = useReducer(dndReducer, initialState)

    // Start drag
    const startDrag = useCallback((item: DragItem, position: { x: number; y: number }) => {
        dispatch({ type: 'DRAG_START', payload: { item, position } })
        onDragStart?.(item)
    }, [onDragStart])

    // Update drag position
    const updateDrag = useCallback((position: { x: number; y: number }, gridPosition?: { col: number; row: number }) => {
        dispatch({ type: 'DRAG_MOVE', payload: { position, gridPosition } })
    }, [])

    // End drag
    const endDrag = useCallback(() => {
        const { activeItem, activeDroppableId, canDrop } = state

        if (activeItem && activeDroppableId && canDrop) {
            const handler = getDropHandler(activeDroppableId)
            if (handler) {
                const result = handler(activeItem)
                onDrop?.(activeItem, result || {
                    targetPosition: state.gridPreviewPosition || { col: 0, row: 0 },
                    success: true,
                    droppableId: activeDroppableId,
                })
            }
        }

        onDragEnd?.(activeItem)
        dispatch({ type: 'DRAG_END' })
    }, [state, onDrop, onDragEnd])

    // Set active droppable
    const setActiveDroppable = useCallback((id: string | null) => {
        dispatch({ type: 'SET_ACTIVE_DROPPABLE', payload: id })
    }, [])

    // Set can drop
    const setCanDrop = useCallback((canDrop: boolean) => {
        dispatch({ type: 'SET_CAN_DROP', payload: canDrop })
    }, [])

    // Global keyboard handler
    useEffect(() => {
        if (!enableKeyboard || !state.isDragging) return

        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === 'Escape') {
                dispatch({ type: 'DRAG_END' })
                onDragEnd?.(null)
            }
        }

        window.addEventListener('keydown', handleKeyDown)
        return () => window.removeEventListener('keydown', handleKeyDown)
    }, [enableKeyboard, state.isDragging, onDragEnd])

    // Prevent default drag behavior
    useEffect(() => {
        const handleDragOver = (e: DragEvent) => {
            e.preventDefault()
        }

        window.addEventListener('dragover', handleDragOver)
        return () => window.removeEventListener('dragover', handleDragOver)
    }, [])

    const value: DndContextValue = {
        state,
        dispatch,
        startDrag,
        updateDrag,
        endDrag,
        setActiveDroppable,
        setCanDrop,
    }

    return (
        <DndContext.Provider value={value}>
            <div
                className="dnd-container"
                style={{
                    position: 'relative',
                    // Disable text selection during drag
                    userSelect: state.isDragging ? 'none' : undefined,
                }}
            >
                {children}
            </div>
        </DndContext.Provider>
    )
}

// ============ Convenience Hooks ============

export const useIsDragging = () => {
    const { state } = useDndContext()
    return state.isDragging
}

export const useActiveItem = () => {
    const { state } = useDndContext()
    return state.activeItem
}

export const useDragPosition = () => {
    const { state } = useDndContext()
    return state.dragPosition
}

export const useGridPreviewPosition = () => {
    const { state } = useDndContext()
    return state.gridPreviewPosition
}
