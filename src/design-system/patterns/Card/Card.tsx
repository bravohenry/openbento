import React, { forwardRef, createContext, useContext, useState } from 'react'
import { cn } from '../../utils/cn'
import {
    cardBaseStyles,
    cardVariants,
    cardSizes,
    cardRadii,
    cardPadding,
    cardHoverStyles,
    cardSelectedStyles,
} from './Card.styles'
import type {
    CardProps,
    CardHeaderProps,
    CardContentProps,
    CardFooterProps,
    CardMediaProps,
    CardOverlayProps,
} from './Card.types'

// ============ Card Context ============

interface CardContextValue {
    variant: CardProps['variant']
}

const CardContext = createContext<CardContextValue>({ variant: 'default' })

const useCardContext = () => useContext(CardContext)

// ============ Card Root ============

/**
 * Card - 卡片容器组件
 * 
 * 采用 Compound Component 模式，灵活组合使用。
 * 设计灵感来源于 Bento.me 卡片 - 大圆角、clean 设计、hover 动效。
 * 
 * @example
 * ```tsx
 * // 基础用法
 * <Card variant="elevated" rounded="lg">
 *   <Card.Header icon={<TwitterIcon />} title="Twitter" subtitle="@biutyai" />
 *   <Card.Content>
 *     <p>Tweet content...</p>
 *   </Card.Content>
 *   <Card.Footer>
 *     <Button variant="twitter" size="sm">Follow</Button>
 *   </Card.Footer>
 * </Card>
 * 
 * // 带背景图片
 * <Card bgImage="/image.jpg">
 *   <Card.Overlay gradient="bottom" />
 *   <Card.Content>
 *     <Text color="inverse">Overlay text</Text>
 *   </Card.Content>
 * </Card>
 * 
 * // 作为链接
 * <Card clickable href="https://example.com" target="_blank">
 *   <Card.Header icon={<LinkIcon />} title="My Website" />
 * </Card>
 * ```
 */
const CardRoot = forwardRef<HTMLDivElement, CardProps>((props, ref) => {
    const {
        variant = 'default',
        size = 'auto',
        clickable = false,
        selected = false,
        bgColor,
        bgImage,
        bgGradient,
        borderColor,
        rounded = 'lg',
        padding = 'md',
        href,
        target,
        disableHover = false,
        className,
        style,
        children,
        onClick,
        ...restProps
    } = props

    const [isHovered, setIsHovered] = useState(false)

    // 获取样式
    const variantStyles = cardVariants[variant]
    const sizeStyles = cardSizes[size]
    const radiusValue = cardRadii[rounded]
    const paddingValue = cardPadding[padding]

    // 构建样式
    const combinedStyles: React.CSSProperties = {
        ...cardBaseStyles,
        ...variantStyles,
        ...sizeStyles,
        borderRadius: radiusValue,
        padding: paddingValue,
        cursor: clickable || href ? 'pointer' : 'default',
        ...(bgColor && { backgroundColor: bgColor }),
        ...(bgGradient && { background: bgGradient }),
        ...(bgImage && {
            backgroundImage: `url(${bgImage})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
        }),
        ...(borderColor && { borderColor }),
        ...(isHovered && !disableHover && clickable && cardHoverStyles),
        ...(selected && cardSelectedStyles),
        ...style,
    }

    // 处理点击
    const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
        if (href) {
            window.open(href, target || '_self')
        }
        onClick?.(e)
    }

    const element = (
        <div
            ref={ref}
            className={cn(
                'card',
                `card-${variant}`,
                clickable && 'card-clickable',
                selected && 'card-selected',
                className
            )}
            style={combinedStyles}
            onClick={clickable || href ? handleClick : onClick}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            role={clickable || href ? 'button' : undefined}
            tabIndex={clickable || href ? 0 : undefined}
            {...restProps}
        >
            {children}
        </div>
    )

    return (
        <CardContext.Provider value={{ variant }}>
            {element}
        </CardContext.Provider>
    )
})

CardRoot.displayName = 'Card'

// ============ Card.Header ============

const CardHeader = forwardRef<HTMLDivElement, CardHeaderProps>((props, ref) => {
    const { icon, title, subtitle, action, className, style, children, ...restProps } = props

    const combinedStyles: React.CSSProperties = {
        display: 'flex',
        alignItems: 'flex-start',
        gap: '12px',
        ...style,
    }

    return (
        <div ref={ref} className={cn('card-header', className)} style={combinedStyles} {...restProps}>
            {icon && (
                <div
                    className="card-header-icon"
                    style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        flexShrink: 0,
                    }}
                >
                    {icon}
                </div>
            )}
            {(title || subtitle) && (
                <div className="card-header-text" style={{ flex: 1, minWidth: 0 }}>
                    {title && (
                        <div
                            className="card-header-title"
                            style={{
                                fontSize: '15px',
                                fontWeight: 600,
                                color: 'var(--color-text-primary)',
                                lineHeight: 1.3,
                            }}
                        >
                            {title}
                        </div>
                    )}
                    {subtitle && (
                        <div
                            className="card-header-subtitle"
                            style={{
                                fontSize: '13px',
                                color: 'var(--color-text-secondary)',
                                marginTop: '2px',
                            }}
                        >
                            {subtitle}
                        </div>
                    )}
                </div>
            )}
            {action && (
                <div className="card-header-action" style={{ flexShrink: 0 }}>
                    {action}
                </div>
            )}
            {children}
        </div>
    )
})

CardHeader.displayName = 'Card.Header'

// ============ Card.Content ============

const CardContent = forwardRef<HTMLDivElement, CardContentProps>((props, ref) => {
    const { noPadding, className, style, children, ...restProps } = props

    const combinedStyles: React.CSSProperties = {
        flex: 1,
        ...style,
    }

    return (
        <div ref={ref} className={cn('card-content', className)} style={combinedStyles} {...restProps}>
            {children}
        </div>
    )
})

CardContent.displayName = 'Card.Content'

// ============ Card.Footer ============

const CardFooter = forwardRef<HTMLDivElement, CardFooterProps>((props, ref) => {
    const { align = 'start', className, style, children, ...restProps } = props

    const alignMap = {
        start: 'flex-start',
        center: 'center',
        end: 'flex-end',
        between: 'space-between',
    }

    const combinedStyles: React.CSSProperties = {
        display: 'flex',
        alignItems: 'center',
        justifyContent: alignMap[align],
        gap: '8px',
        marginTop: 'auto',
        ...style,
    }

    return (
        <div ref={ref} className={cn('card-footer', className)} style={combinedStyles} {...restProps}>
            {children}
        </div>
    )
})

CardFooter.displayName = 'Card.Footer'

// ============ Card.Media ============

const CardMedia = forwardRef<HTMLDivElement, CardMediaProps>((props, ref) => {
    const { src, alt, height = 160, position = 'top', objectFit = 'cover', className, style, ...restProps } = props

    const positionStyles: Record<string, React.CSSProperties> = {
        top: { marginTop: '-16px', marginLeft: '-16px', marginRight: '-16px', marginBottom: '16px' },
        bottom: { marginBottom: '-16px', marginLeft: '-16px', marginRight: '-16px', marginTop: '16px' },
        fill: { position: 'absolute', inset: 0, margin: 0 },
    }

    const combinedStyles: React.CSSProperties = {
        overflow: 'hidden',
        height: typeof height === 'number' ? `${height}px` : height,
        ...positionStyles[position],
        ...style,
    }

    return (
        <div ref={ref} className={cn('card-media', className)} style={combinedStyles} {...restProps}>
            <img
                src={src}
                alt={alt || ''}
                style={{
                    width: '100%',
                    height: '100%',
                    objectFit,
                }}
            />
        </div>
    )
})

CardMedia.displayName = 'Card.Media'

// ============ Card.Overlay ============

const CardOverlay = forwardRef<HTMLDivElement, CardOverlayProps>((props, ref) => {
    const { gradient = 'bottom', className, style, children, ...restProps } = props

    const gradientMap: Record<string, string> = {
        top: 'linear-gradient(to bottom, rgba(0,0,0,0.6) 0%, transparent 100%)',
        bottom: 'linear-gradient(to top, rgba(0,0,0,0.6) 0%, transparent 100%)',
        left: 'linear-gradient(to right, rgba(0,0,0,0.6) 0%, transparent 100%)',
        right: 'linear-gradient(to left, rgba(0,0,0,0.6) 0%, transparent 100%)',
        none: 'transparent',
    }

    const combinedStyles: React.CSSProperties = {
        position: 'absolute',
        inset: 0,
        background: gradientMap[gradient],
        display: 'flex',
        flexDirection: 'column',
        justifyContent: gradient === 'top' ? 'flex-start' : 'flex-end',
        padding: '16px',
        ...style,
    }

    return (
        <div ref={ref} className={cn('card-overlay', className)} style={combinedStyles} {...restProps}>
            {children}
        </div>
    )
})

CardOverlay.displayName = 'Card.Overlay'

// ============ Compound Export ============

export const Card = Object.assign(CardRoot, {
    Header: CardHeader,
    Content: CardContent,
    Footer: CardFooter,
    Media: CardMedia,
    Overlay: CardOverlay,
})
