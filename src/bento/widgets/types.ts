/**
 * OpenBento - Widget Types
 * 
 * Widget 系统核心类型定义
 */

// ============ Widget 尺寸 (5 种变体 from Figma) ============

export type WidgetSize = '1x1' | '2x1' | '1x2' | '2x2' | 'bar'

export const WIDGET_SIZES = {
    '1x1': { cols: 1, rows: 1, width: 175, height: 175, label: 'Small' },
    '2x1': { cols: 2, rows: 1, width: 390, height: 175, label: 'Wide' },
    '1x2': { cols: 1, rows: 2, width: 175, height: 390, label: 'Tall' },
    '2x2': { cols: 2, rows: 2, width: 390, height: 390, label: 'Large' },
    'bar': { cols: 2, rows: 0.4, width: 390, height: 68, label: 'Bar' },
} as const

// Size variants array (for size picker UI)
export const SIZE_VARIANTS: WidgetSize[] = ['1x1', '2x1', '1x2', '2x2', 'bar']



// ============ Widget Categories ============

export type WidgetCategory = 'link' | 'image' | 'text' | 'map' | 'section'

// ============ Platform Types ============

export type SocialPlatform =
    | 'instagram'
    | 'twitter'
    | 'tiktok'
    | 'youtube'
    | 'spotify'
    | 'github'
    | 'linkedin'
    | 'facebook'
    | 'pinterest'
    | 'threads'
    | 'discord'
    | 'telegram'
    | 'twitch'
    | 'behance'
    | 'dribbble'
    | 'medium'
    | 'whatsapp'
    | 'reddit'
    | 'patreon'
    | 'buymeacoffee'
    | 'dev'
    | 'google'
    | 'appstore'
    | 'playstore'
    | 'generic' // Unrecognized link

// ============ Base Widget Config ============

export interface BaseWidgetConfig {
    id: string
    category: WidgetCategory
    size: WidgetSize
}

// ============ Link Widget ============

export interface LinkWidgetConfig extends BaseWidgetConfig {
    category: 'link'
    url: string
    platform: SocialPlatform
    title?: string
    subtitle?: string // handle, description
    ctaLabel?: string // Follow, Get, Listen, etc.
    customIcon?: string // URL or emoji
    customColor?: string // Custom background color
}

// ============ Image Widget ============

export interface ImageWidgetConfig extends BaseWidgetConfig {
    category: 'image'
    src: string
    alt?: string
    title?: string
    subtitle?: string
    objectFit?: 'cover' | 'contain'
}

// ============ Text Widget ============

export type TextWidgetVariant = 'quote' | 'note' | 'plain'

export interface TextWidgetConfig extends BaseWidgetConfig {
    category: 'text'
    variant: TextWidgetVariant
    content: string
    attribution?: string // Quote attribution
}

// ============ Map Widget ============

export interface MapWidgetConfig extends BaseWidgetConfig {
    category: 'map'
    title?: string
    location?: {
        lat: number
        lng: number
        label?: string
    }
    style?: 'light' | 'dark' | 'satellite'
}

// ============ Section Title Widget ============

export interface SectionTitleConfig extends BaseWidgetConfig {
    category: 'section'
    title: string
}

// ============ Union Type ============

export type WidgetConfig =
    | LinkWidgetConfig
    | ImageWidgetConfig
    | TextWidgetConfig
    | MapWidgetConfig
    | SectionTitleConfig

// ============ Widget Props ============

export interface WidgetProps<T extends WidgetConfig = WidgetConfig> {
    config: T
    isEditing?: boolean
    onConfigChange?: (config: Partial<T>) => void
    onClick?: () => void
}
