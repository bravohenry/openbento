/**
 * OpenBento - BentoCell Component
 * 
 * 网格单元格组件，用于在 BentoGrid 中定位子元素
 */

import React, { forwardRef, useMemo } from 'react'
import type { BentoCellProps } from './BentoGrid.types'
import { useGridContext } from './BentoGrid'
import { parseBentoSize, getBentoSize } from '../core/BentoSizeMap'
import { cn } from '../../design-system/utils/cn'

// ============ BentoCell Component ============

export const BentoCell = forwardRef<HTMLDivElement, BentoCellProps>((props, ref) => {
    const {
        children,
        size = '1x1',
        colStart,
        rowStart,
        colSpan,
        rowSpan,
        gridArea,
        style,
        className,
    } = props

    const gridContext = useGridContext()

    // Calculate span from size if not explicitly provided
    const { cols, rows } = useMemo(() => {
        if (colSpan !== undefined && rowSpan !== undefined) {
            return { cols: colSpan, rows: rowSpan }
        }
        return parseBentoSize(size)
    }, [size, colSpan, rowSpan])

    // Get size config for dimensions
    const sizeConfig = useMemo(() => getBentoSize(size), [size])

    // Cell styles
    const cellStyles: React.CSSProperties = useMemo(() => {
        const baseStyles: React.CSSProperties = {
            position: 'relative',
            width: '100%',
            height: '100%',
        }

        // Use explicit gridArea if provided
        if (gridArea) {
            return {
                ...baseStyles,
                gridArea,
                ...style,
            }
        }

        // Otherwise use column/row positioning
        return {
            ...baseStyles,
            gridColumn: colStart
                ? `${colStart} / span ${cols}`
                : `span ${cols}`,
            gridRow: rowStart
                ? `${rowStart} / span ${rows}`
                : `span ${rows}`,
            ...style,
        }
    }, [gridArea, colStart, rowStart, cols, rows, style])

    return (
        <div
            ref={ref}
            className={cn('bento-cell', className)}
            style={cellStyles}
            data-size={size}
            data-col-span={cols}
            data-row-span={rows}
        >
            {children}
        </div>
    )
})

BentoCell.displayName = 'BentoCell'

// ============ Positioned Cell ============

interface PositionedCellProps extends BentoCellProps {
    /** 绝对定位 (覆盖 grid 布局) */
    absolute?: boolean
    /** 绝对定位时的 x 坐标 */
    x?: number
    /** 绝对定位时的 y 坐标 */
    y?: number
}

export const PositionedCell = forwardRef<HTMLDivElement, PositionedCellProps>((props, ref) => {
    const {
        children,
        absolute = false,
        x = 0,
        y = 0,
        size = '1x1',
        style,
        className,
        ...rest
    } = props

    const sizeConfig = getBentoSize(size)

    if (absolute) {
        return (
            <div
                ref={ref}
                className={cn('bento-cell bento-cell--positioned', className)}
                style={{
                    position: 'absolute',
                    left: x,
                    top: y,
                    width: sizeConfig.width,
                    height: sizeConfig.height,
                    ...style,
                }}
                data-size={size}
            >
                {children}
            </div>
        )
    }

    return (
        <BentoCell
            ref={ref}
            size={size}
            className={className}
            style={style}
            {...rest}
        >
            {children}
        </BentoCell>
    )
})

PositionedCell.displayName = 'PositionedCell'

// ============ Cell Placeholder ============

interface CellPlaceholderProps {
    size?: '1x1' | '2x1' | '1x2' | '2x2'
    label?: string
    dashed?: boolean
}

export const CellPlaceholder: React.FC<CellPlaceholderProps> = ({
    size = '1x1',
    label,
    dashed = true,
}) => {
    const sizeConfig = getBentoSize(size)

    return (
        <BentoCell size={size}>
            <div
                style={{
                    width: '100%',
                    height: '100%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    border: dashed
                        ? '2px dashed rgba(0, 0, 0, 0.12)'
                        : '1px solid rgba(0, 0, 0, 0.08)',
                    borderRadius: 27,
                    backgroundColor: 'rgba(0, 0, 0, 0.02)',
                    color: 'rgba(0, 0, 0, 0.3)',
                    fontSize: 14,
                    fontWeight: 500,
                }}
            >
                {label || size}
            </div>
        </BentoCell>
    )
}
