/**
 * 🔄 UPDATE ME: If this file changes, update this header AND /src/bento/widgets/ARCHITECTURE.md
 *
 * @input  - 各 Widget 子模块 (link, text, map, image, section), types
 * @output - WidgetRenderer, 所有 Widget 组件和工厂函数
 * @pos    - Widget 系统的统一入口，动态分发渲染不同类型的卡片
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
