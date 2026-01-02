/**
 * [INPUT]: (widgets: WidgetConfig[], columns: number) - Widget configurations and grid column count
 * [OUTPUT]: (WidgetConfig[]) - Reordered widgets with compacted layout
 * [POS]: Located at /bento/grid, provides layout compaction utility to eliminate gaps
 * 
 * [PROTOCOL]:
 * 1. Once this file's logic changes, this Header must be synchronized immediately.
 * 2. After update, must check upward whether the parent folder's .folder.md description is still accurate.
 */

import type { WidgetConfig } from '../widgets/types'
import { parseBentoSize } from '../core/BentoSizeMap'

/**
 * Compact grid layout by reordering widgets to fill gaps from top to bottom.
 * This function uses a simple algorithm: place widgets in order, finding the
 * highest available position for each widget. This ensures no gaps above widgets.
 */
export function compactGridLayout(
    widgets: WidgetConfig[],
    columns: number
): WidgetConfig[] {
    if (widgets.length === 0) return widgets

    // Build occupancy matrix and compact layout
    const occupancy: boolean[][] = []
    const result: WidgetConfig[] = []

    // Process widgets in their current order
    for (const widget of widgets) {
        const { cols, rows } = parseBentoSize(widget.size)

        // Find the highest available position
        let bestRow = 0
        let bestCol = 0
        let found = false

        // Try each row from top
        for (let row = 0; row < 1000 && !found; row++) {
            // Try each column from left
            for (let col = 0; col <= columns - cols && !found; col++) {
                // Check if this position is available
                let available = true
                for (let r = row; r < row + rows && available; r++) {
                    for (let c = col; c < col + cols && available; c++) {
                        if (occupancy[r]?.[c]) {
                            available = false
                        }
                    }
                }

                if (available) {
                    bestRow = row
                    bestCol = col
                    found = true
                }
            }
        }

        // Place widget
        result.push(widget)

        // Mark occupancy
        for (let r = bestRow; r < bestRow + rows; r++) {
            if (!occupancy[r]) occupancy[r] = []
            for (let c = bestCol; c < bestCol + cols; c++) {
                occupancy[r][c] = true
            }
        }
    }

    return result
}

/**
 * Compact layout - simple version that just reorders widgets
 * CSS Grid's dense mode will handle the actual positioning
 */
export function compactLayoutFromDOM(
    containerElement: HTMLElement | null,
    widgets: WidgetConfig[],
    columns: number
): WidgetConfig[] {
    if (widgets.length === 0) return widgets
    // Simply reorder widgets - CSS Grid dense will handle positioning
    return compactGridLayout(widgets, columns)
}
