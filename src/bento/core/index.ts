/**
 * OpenBento - Bento Core Exports
 */

// Main Card Component
export { BentoCard, useBentoCard as useBentoCardContext } from './BentoCard'
export type {
    BentoCardProps,
    BentoCardIconProps,
    BentoCardTitleProps,
    BentoCardSubtitleProps,
    BentoCardImageProps,
    BentoCardOverlayProps,
    BentoCardActionProps,
    BentoCardContentProps,
    BentoSize,
    BentoVariant,
} from './BentoCard.types'
export {
    bentoSizes,
    bentoBorder,
    bentoCardBase,
    bentoIconSizes,
    bentoPadding,
    bentoOverlayGradients,
    bentoColors,
    BENTO_UNIT,
    BENTO_GAP,
    BENTO_RADIUS,
    BENTO_PADDING,
} from './BentoCard.styles'

// Slots System
export {
    BentoSlotsProvider,
    BentoSlot,
    SlotRenderer,
    useBentoSlots,
    SLOT_POSITIONS,
    defaultSlotStyles,
} from './BentoSlots'
export type { SlotPosition, SlotConfig, SlotsContextValue } from './BentoSlots'

// Size Map
export {
    BENTO_SIZE_MAP,
    getBentoSize,
    parseBentoSize,
    createCustomSize,
    getResponsiveSize,
    generateGridColumns,
    generateGridRows,
    getAspectRatio,
    BENTO_ASPECT_RATIOS,
} from './BentoSizeMap'

// Context & State Management
export {
    BentoProvider,
    useBentoContext,
    useBentoCard,
    useSelectedCard,
    useIsEditing,
} from './BentoContext'
export type {
    BentoCardState,
    BentoState,
    BentoAction,
} from './BentoContext'

// Card Hook
export {
    useBentoCard as useBentoCardInteraction,
    useBentoCardResize,
} from './useBentoCard'
export type {
    UseBentoCardOptions,
    UseBentoCardReturn,
} from './useBentoCard'
