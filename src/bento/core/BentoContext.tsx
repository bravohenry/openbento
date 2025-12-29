/**
 * [INPUT]: (initialCards, defaultTheme) - Initial card state and theme configuration
 * [OUTPUT]: (BentoProvider, useBentoContext, useBentoCard, useSelectedCard, useIsEditing) - Context provider and related Hooks
 * [POS]: Located at /bento/core state management layer, serves as the state hub of the entire Bento system, managing edit mode, card state, grid configuration, etc.
 * 
 * [PROTOCOL]:
 * 1. Once this file's logic changes, this Header must be synchronized immediately.
 * 2. After update, must check upward whether /src/bento/core/.folder.md description is still accurate.
 */

import React, { createContext, useContext, useReducer, useCallback, ReactNode } from 'react'
import type { BentoSize } from './BentoSizeMap'

// ============ State Types ============

export interface BentoCardState {
    id: string
    size: BentoSize
    position: { x: number; y: number }
    content: unknown
    isSelected: boolean
    isHovered: boolean
    isDragging: boolean
}

export interface BentoState {
    /** Edit mode */
    isEditing: boolean
    /** Currently selected card ID */
    selectedCardId: string | null
    /** All card states */
    cards: Map<string, BentoCardState>
    /** Grid column count */
    gridColumns: number
    /** Whether to show grid guides */
    showGrid: boolean
    /** Whether to enable snap to grid */
    snapToGrid: boolean
    /** Zoom level */
    zoom: number
    /** Theme mode */
    theme: 'light' | 'dark' | 'system'
}

// ============ Action Types ============

export type BentoAction =
    | { type: 'SET_EDITING'; payload: boolean }
    | { type: 'SELECT_CARD'; payload: string | null }
    | { type: 'ADD_CARD'; payload: Omit<BentoCardState, 'isSelected' | 'isHovered' | 'isDragging'> }
    | { type: 'REMOVE_CARD'; payload: string }
    | { type: 'UPDATE_CARD'; payload: { id: string; updates: Partial<BentoCardState> } }
    | { type: 'MOVE_CARD'; payload: { id: string; position: { x: number; y: number } } }
    | { type: 'RESIZE_CARD'; payload: { id: string; size: BentoSize } }
    | { type: 'SET_CARD_HOVER'; payload: { id: string; isHovered: boolean } }
    | { type: 'SET_CARD_DRAGGING'; payload: { id: string; isDragging: boolean } }
    | { type: 'SET_GRID_COLUMNS'; payload: number }
    | { type: 'TOGGLE_GRID'; payload?: boolean }
    | { type: 'TOGGLE_SNAP'; payload?: boolean }
    | { type: 'SET_ZOOM'; payload: number }
    | { type: 'SET_THEME'; payload: 'light' | 'dark' | 'system' }
    | { type: 'RESET' }

// ============ Initial State ============

const initialState: BentoState = {
    isEditing: false,
    selectedCardId: null,
    cards: new Map(),
    gridColumns: 4,
    showGrid: false,
    snapToGrid: true,
    zoom: 1,
    theme: 'light',
}

// ============ Reducer ============

const bentoReducer = (state: BentoState, action: BentoAction): BentoState => {
    switch (action.type) {
        case 'SET_EDITING':
            return { ...state, isEditing: action.payload }

        case 'SELECT_CARD': {
            const cards = new Map(state.cards)
            // Deselect all cards first
            cards.forEach((card, id) => {
                cards.set(id, { ...card, isSelected: id === action.payload })
            })
            return { ...state, selectedCardId: action.payload, cards }
        }

        case 'ADD_CARD': {
            const cards = new Map(state.cards)
            cards.set(action.payload.id, {
                ...action.payload,
                isSelected: false,
                isHovered: false,
                isDragging: false,
            })
            return { ...state, cards }
        }

        case 'REMOVE_CARD': {
            const cards = new Map(state.cards)
            cards.delete(action.payload)
            return {
                ...state,
                cards,
                selectedCardId: state.selectedCardId === action.payload ? null : state.selectedCardId,
            }
        }

        case 'UPDATE_CARD': {
            const cards = new Map(state.cards)
            const existing = cards.get(action.payload.id)
            if (existing) {
                cards.set(action.payload.id, { ...existing, ...action.payload.updates })
            }
            return { ...state, cards }
        }

        case 'MOVE_CARD': {
            const cards = new Map(state.cards)
            const existing = cards.get(action.payload.id)
            if (existing) {
                cards.set(action.payload.id, { ...existing, position: action.payload.position })
            }
            return { ...state, cards }
        }

        case 'RESIZE_CARD': {
            const cards = new Map(state.cards)
            const existing = cards.get(action.payload.id)
            if (existing) {
                cards.set(action.payload.id, { ...existing, size: action.payload.size })
            }
            return { ...state, cards }
        }

        case 'SET_CARD_HOVER': {
            const cards = new Map(state.cards)
            const existing = cards.get(action.payload.id)
            if (existing) {
                cards.set(action.payload.id, { ...existing, isHovered: action.payload.isHovered })
            }
            return { ...state, cards }
        }

        case 'SET_CARD_DRAGGING': {
            const cards = new Map(state.cards)
            const existing = cards.get(action.payload.id)
            if (existing) {
                cards.set(action.payload.id, { ...existing, isDragging: action.payload.isDragging })
            }
            return { ...state, cards }
        }

        case 'SET_GRID_COLUMNS':
            return { ...state, gridColumns: action.payload }

        case 'TOGGLE_GRID':
            return { ...state, showGrid: action.payload ?? !state.showGrid }

        case 'TOGGLE_SNAP':
            return { ...state, snapToGrid: action.payload ?? !state.snapToGrid }

        case 'SET_ZOOM':
            return { ...state, zoom: Math.max(0.25, Math.min(2, action.payload)) }

        case 'SET_THEME':
            return { ...state, theme: action.payload }

        case 'RESET':
            return initialState

        default:
            return state
    }
}

// ============ Context ============

interface BentoContextValue {
    state: BentoState
    dispatch: React.Dispatch<BentoAction>
    // Helper methods
    selectCard: (id: string | null) => void
    addCard: (card: Omit<BentoCardState, 'isSelected' | 'isHovered' | 'isDragging'>) => void
    removeCard: (id: string) => void
    updateCard: (id: string, updates: Partial<BentoCardState>) => void
    moveCard: (id: string, position: { x: number; y: number }) => void
    resizeCard: (id: string, size: BentoSize) => void
    setEditing: (editing: boolean) => void
    setTheme: (theme: 'light' | 'dark' | 'system') => void
}

const BentoContext = createContext<BentoContextValue | null>(null)

// ============ Provider ============

interface BentoProviderProps {
    children: ReactNode
    initialCards?: BentoCardState[]
    defaultTheme?: 'light' | 'dark' | 'system'
}

export const BentoProvider: React.FC<BentoProviderProps> = ({
    children,
    initialCards = [],
    defaultTheme = 'light',
}) => {
    const [state, dispatch] = useReducer(bentoReducer, {
        ...initialState,
        theme: defaultTheme,
        cards: new Map(initialCards.map(card => [card.id, card])),
    })

    const selectCard = useCallback((id: string | null) => {
        dispatch({ type: 'SELECT_CARD', payload: id })
    }, [])

    const addCard = useCallback((card: Omit<BentoCardState, 'isSelected' | 'isHovered' | 'isDragging'>) => {
        dispatch({ type: 'ADD_CARD', payload: card })
    }, [])

    const removeCard = useCallback((id: string) => {
        dispatch({ type: 'REMOVE_CARD', payload: id })
    }, [])

    const updateCard = useCallback((id: string, updates: Partial<BentoCardState>) => {
        dispatch({ type: 'UPDATE_CARD', payload: { id, updates } })
    }, [])

    const moveCard = useCallback((id: string, position: { x: number; y: number }) => {
        dispatch({ type: 'MOVE_CARD', payload: { id, position } })
    }, [])

    const resizeCard = useCallback((id: string, size: BentoSize) => {
        dispatch({ type: 'RESIZE_CARD', payload: { id, size } })
    }, [])

    const setEditing = useCallback((editing: boolean) => {
        dispatch({ type: 'SET_EDITING', payload: editing })
    }, [])

    const setTheme = useCallback((theme: 'light' | 'dark' | 'system') => {
        dispatch({ type: 'SET_THEME', payload: theme })
    }, [])

    const value: BentoContextValue = {
        state,
        dispatch,
        selectCard,
        addCard,
        removeCard,
        updateCard,
        moveCard,
        resizeCard,
        setEditing,
        setTheme,
    }

    return (
        <BentoContext.Provider value={value}>
            {children}
        </BentoContext.Provider>
    )
}

// ============ Hook ============

export const useBentoContext = (): BentoContextValue => {
    const context = useContext(BentoContext)
    if (!context) {
        throw new Error('useBentoContext must be used within a BentoProvider')
    }
    return context
}

// ============ Selector Hooks ============

export const useBentoCard = (cardId: string) => {
    const { state, updateCard, moveCard, resizeCard, removeCard, selectCard } = useBentoContext()
    const card = state.cards.get(cardId)

    return {
        card,
        isSelected: card?.isSelected ?? false,
        isHovered: card?.isHovered ?? false,
        isDragging: card?.isDragging ?? false,
        update: (updates: Partial<BentoCardState>) => updateCard(cardId, updates),
        move: (position: { x: number; y: number }) => moveCard(cardId, position),
        resize: (size: BentoSize) => resizeCard(cardId, size),
        remove: () => removeCard(cardId),
        select: () => selectCard(cardId),
        deselect: () => selectCard(null),
    }
}

export const useSelectedCard = () => {
    const { state } = useBentoContext()
    if (!state.selectedCardId) return null
    return state.cards.get(state.selectedCardId) ?? null
}

export const useIsEditing = () => {
    const { state, setEditing } = useBentoContext()
    return [state.isEditing, setEditing] as const
}
