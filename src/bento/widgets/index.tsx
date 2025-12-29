/**
 * [INPUT]: (Widget submodules, types) - Widget submodules (link, text, map, image, section), types
 * [OUTPUT]: (WidgetRenderer, all Widget components and factory functions) - WidgetRenderer, all Widget components and factory functions
 * [POS]: Located at /bento/widgets unified entry point of Widget system, dynamically dispatches and renders different types of cards.
 * 
 * [PROTOCOL]:
 * 1. Once this file's logic changes, this Header must be synchronized immediately.
 * 2. After update, must check upward whether /src/bento/widgets/.folder.md description is still accurate.
 */

// Types
export * from './types'

// Registry & Utils
export * from './registry'
export * from './icons'

// Link Widget
export { LinkWidget, createLinkWidgetConfig } from './link/LinkWidget'

// Text Widget
export { TextWidget, createTextWidgetConfig } from './text/TextWidget'

// Map Widget
export { MapWidget, createMapWidgetConfig } from './map/MapWidget'

// Image Widget
export { ImageWidget, createImageWidgetConfig } from './image/ImageWidget'

// Section Title Widget
export { SectionTitleWidget, createSectionTitleConfig } from './section/SectionTitleWidget'

// ============ Widget Renderer ============

import React from 'react'
import type { WidgetConfig, WidgetProps } from './types'
import { LinkWidget } from './link/LinkWidget'
import { TextWidget } from './text/TextWidget'
import { MapWidget } from './map/MapWidget'
import { ImageWidget } from './image/ImageWidget'
import { SectionTitleWidget } from './section/SectionTitleWidget'

export const WidgetRenderer: React.FC<WidgetProps<WidgetConfig>> = (props) => {
    const { config } = props

    switch (config.category) {
        case 'link':
            return <LinkWidget {...props as WidgetProps<typeof config>} />
        case 'text':
            return <TextWidget {...props as WidgetProps<typeof config>} />
        case 'map':
            return <MapWidget {...props as WidgetProps<typeof config>} />
        case 'image':
            return <ImageWidget {...props as WidgetProps<typeof config>} />
        case 'section':
            return <SectionTitleWidget {...props as WidgetProps<typeof config>} />
        default:
            return null
    }
}

export default WidgetRenderer
