/**
 * OpenBento - Bento Slots System
 * 
 * 插槽系统用于管理 BentoCard 内部的可组合内容区域
 * 支持 Header, Content, Footer, Media 等预定义插槽
 */

import React, { createContext, useContext, ReactNode } from 'react'

// ============ Slot Types ============

export type SlotPosition = 'header' | 'content' | 'footer' | 'media' | 'overlay' | 'badge'

export interface SlotConfig {
    position: SlotPosition
    children: ReactNode
    style?: React.CSSProperties
    className?: string
}

export interface SlotsContextValue {
    slots: Map<SlotPosition, SlotConfig>
    registerSlot: (position: SlotPosition, config: Omit<SlotConfig, 'position'>) => void
    unregisterSlot: (position: SlotPosition) => void
    getSlot: (position: SlotPosition) => SlotConfig | undefined
}

// ============ Context ============

const SlotsContext = createContext<SlotsContextValue | null>(null)

export const useBentoSlots = () => {
    const context = useContext(SlotsContext)
    if (!context) {
        throw new Error('useBentoSlots must be used within a BentoSlotsProvider')
    }
    return context
}

// ============ Provider ============

interface BentoSlotsProviderProps {
    children: ReactNode
}

export const BentoSlotsProvider: React.FC<BentoSlotsProviderProps> = ({ children }) => {
    const [slots, setSlots] = React.useState<Map<SlotPosition, SlotConfig>>(new Map())

    const registerSlot = React.useCallback((position: SlotPosition, config: Omit<SlotConfig, 'position'>) => {
        setSlots(prev => {
            const next = new Map(prev)
            next.set(position, { ...config, position })
            return next
        })
    }, [])

    const unregisterSlot = React.useCallback((position: SlotPosition) => {
        setSlots(prev => {
            const next = new Map(prev)
            next.delete(position)
            return next
        })
    }, [])

    const getSlot = React.useCallback((position: SlotPosition) => {
        return slots.get(position)
    }, [slots])

    const value = React.useMemo(() => ({
        slots,
        registerSlot,
        unregisterSlot,
        getSlot,
    }), [slots, registerSlot, unregisterSlot, getSlot])

    return (
        <SlotsContext.Provider value={value}>
            {children}
        </SlotsContext.Provider>
    )
}

// ============ Slot Component ============

interface BentoSlotProps {
    position: SlotPosition
    children: ReactNode
    style?: React.CSSProperties
    className?: string
}

export const BentoSlot: React.FC<BentoSlotProps> = ({
    position,
    children,
    style,
    className
}) => {
    const { registerSlot, unregisterSlot } = useBentoSlots()

    React.useEffect(() => {
        registerSlot(position, { children, style, className })
        return () => unregisterSlot(position)
    }, [position, children, style, className, registerSlot, unregisterSlot])

    // Slots don't render directly - they register content for the parent to render
    return null
}

// ============ Slot Renderer ============

interface SlotRendererProps {
    position: SlotPosition
    fallback?: ReactNode
    wrapperStyle?: React.CSSProperties
    wrapperClassName?: string
}

export const SlotRenderer: React.FC<SlotRendererProps> = ({
    position,
    fallback = null,
    wrapperStyle,
    wrapperClassName,
}) => {
    const { getSlot } = useBentoSlots()
    const slot = getSlot(position)

    if (!slot) return <>{fallback}</>

    return (
        <div
            className={wrapperClassName || slot.className}
            style={{ ...wrapperStyle, ...slot.style }}
        >
            {slot.children}
        </div>
    )
}

// ============ Predefined Slot Positions ============

export const SLOT_POSITIONS = {
    HEADER: 'header' as const,
    CONTENT: 'content' as const,
    FOOTER: 'footer' as const,
    MEDIA: 'media' as const,
    OVERLAY: 'overlay' as const,
    BADGE: 'badge' as const,
}

// ============ Default Slot Styles ============

export const defaultSlotStyles: Record<SlotPosition, React.CSSProperties> = {
    header: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        padding: '24px 24px 0',
    },
    content: {
        position: 'absolute',
        top: '50%',
        left: 0,
        right: 0,
        transform: 'translateY(-50%)',
        padding: '0 24px',
    },
    footer: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        padding: '0 24px 24px',
    },
    media: {
        position: 'absolute',
        inset: 0,
        overflow: 'hidden',
    },
    overlay: {
        position: 'absolute',
        inset: 0,
        pointerEvents: 'none',
    },
    badge: {
        position: 'absolute',
        top: 12,
        right: 12,
        zIndex: 10,
    },
}
