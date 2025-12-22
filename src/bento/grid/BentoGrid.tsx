/**
 * 🔄 UPDATE ME: If this file changes, update this header AND /src/bento/grid/ARCHITECTURE.md
 *
 * @input  - BentoGrid.types (类型), BentoSizeMap (尺寸常量), cn (样式工具)
 * @output - BentoGrid, ResponsiveBentoGrid, AutoLayoutGrid, useGridContext
 * @pos    - 网格布局系统核心，提供 CSS Grid 容器和响应式支持
 */

import React, { createContext, useContext, forwardRef, useMemo } from 'react'
import type { BentoGridProps, GridContextValue } from './BentoGrid.types'
import { BENTO_UNIT, BENTO_GAP } from '../core/BentoSizeMap'
import { cn } from '../../design-system/utils/cn'

// ============ Context ============

const GridContext = createContext<GridContextValue>({
    columns: 4,
    rows: 4,
    gap: BENTO_GAP,
    unit: BENTO_UNIT,
    isEditing: false,
    snapEnabled: true,
})

export const useGridContext = () => useContext(GridContext)

// ============ BentoGrid Component ============

export const BentoGrid = forwardRef<HTMLDivElement, BentoGridProps>((props, ref) => {
    const {
        children,
        columns = 4,
        rows,
        gap = BENTO_GAP,
        unit = BENTO_UNIT,
        maxWidth,
        centered = true,
        showGridLines = false,
        responsive = true,
        style,
        className,
        padding = 0,
    } = props

    // Calculate grid dimensions
    const gridWidth = useMemo(() => {
        return columns * unit + (columns - 1) * gap
    }, [columns, unit, gap])

    // Context value
    const contextValue: GridContextValue = useMemo(() => ({
        columns,
        rows: rows ?? columns,
        gap,
        unit,
        isEditing: false,
        snapEnabled: true,
    }), [columns, rows, gap, unit])

    // Grid styles
    const gridStyles: React.CSSProperties = {
        display: 'grid',
        gridTemplateColumns: `repeat(${columns}, ${unit}px)`,
        gridTemplateRows: rows ? `repeat(${rows}, ${unit}px)` : 'auto',
        gridAutoFlow: 'dense', // Auto-fill gaps - items flow to fill empty spaces
        gap: `${gap}px`,
        width: 'fit-content',
        maxWidth: maxWidth ?? 'none',
        margin: centered ? '0 auto' : undefined,
        padding: typeof padding === 'number' ? `${padding}px` : padding,
        position: 'relative',
        ...style,
    }

    // Grid lines overlay (for debugging)
    const gridLinesOverlay = showGridLines && (
        <div
            style={{
                position: 'absolute',
                inset: 0,
                pointerEvents: 'none',
                zIndex: 1000,
                backgroundImage: `
                    linear-gradient(to right, rgba(0, 0, 0, 0.05) 1px, transparent 1px),
                    linear-gradient(to bottom, rgba(0, 0, 0, 0.05) 1px, transparent 1px)
                `,
                backgroundSize: `${unit + gap}px ${unit + gap}px`,
                backgroundPosition: `${unit}px ${unit}px`,
            }}
        />
    )

    return (
        <GridContext.Provider value={contextValue}>
            <div
                ref={ref}
                className={cn('bento-grid', className)}
                style={gridStyles}
                data-columns={columns}
                data-rows={rows}
                data-gap={gap}
            >
                {gridLinesOverlay}
                {children}
            </div>
        </GridContext.Provider>
    )
})

BentoGrid.displayName = 'BentoGrid'

// ============ Responsive Grid Wrapper ============

interface ResponsiveBentoGridProps extends BentoGridProps {
    /** 移动端列数 (默认: 2) */
    mobileColumns?: number
    /** 平板列数 (默认: 3) */
    tabletColumns?: number
    /** 断点 */
    breakpoints?: {
        mobile: number
        tablet: number
    }
}

export const ResponsiveBentoGrid = forwardRef<HTMLDivElement, ResponsiveBentoGridProps>((props, ref) => {
    const {
        mobileColumns = 2,
        tabletColumns = 3,
        columns = 4,
        breakpoints = { mobile: 640, tablet: 1024 },
        ...rest
    } = props

    // In a real implementation, you'd use a resize observer or media queries
    // For now, this is a simplified version
    const [currentColumns, setCurrentColumns] = React.useState(columns)

    React.useEffect(() => {
        const handleResize = () => {
            const width = window.innerWidth
            if (width < breakpoints.mobile) {
                setCurrentColumns(mobileColumns)
            } else if (width < breakpoints.tablet) {
                setCurrentColumns(tabletColumns)
            } else {
                setCurrentColumns(columns)
            }
        }

        handleResize()
        window.addEventListener('resize', handleResize)
        return () => window.removeEventListener('resize', handleResize)
    }, [columns, mobileColumns, tabletColumns, breakpoints])

    return <BentoGrid ref={ref} columns={currentColumns} {...rest} />
})

ResponsiveBentoGrid.displayName = 'ResponsiveBentoGrid'

// ============ Grid Layout Helper ============

interface GridLayoutProps {
    items: Array<{
        id: string
        size: string
        element: React.ReactNode
    }>
    columns?: number
    gap?: number
}

/**
 * 自动布局组件 - 根据卡片尺寸自动排列
 */
export const AutoLayoutGrid: React.FC<GridLayoutProps> = ({
    items,
    columns = 4,
    gap = BENTO_GAP,
}) => {
    return (
        <BentoGrid columns={columns} gap={gap}>
            {items.map(item => (
                <div
                    key={item.id}
                    style={{
                        gridColumn: `span ${item.size.split('x')[0]}`,
                        gridRow: `span ${item.size.split('x')[1]}`,
                    }}
                >
                    {item.element}
                </div>
            ))}
        </BentoGrid>
    )
}
