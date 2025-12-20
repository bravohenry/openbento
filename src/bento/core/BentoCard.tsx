/**
 * OpenBento - BentoCard Component
 * 
 * 基于 Figma 设计 (node-id: 25-1023)
 * Bento 风格卡片组件 - Compound Component 模式
 */

import React, { forwardRef, createContext, useContext, useState } from 'react'
import { cn } from '../../design-system/utils/cn'
import {
    bentoSizes,
    bentoBorder,
    bentoCardBase,
    bentoCardHover,
    bentoIconSizes,
    bentoPadding,
    bentoOverlayGradients,
    BENTO_RADIUS,
    BENTO_PADDING,
} from './BentoCard.styles'
import type {
    BentoCardProps,
    BentoCardIconProps,
    BentoCardTitleProps,
    BentoCardSubtitleProps,
    BentoCardImageProps,
    BentoCardOverlayProps,
    BentoCardActionProps,
    BentoCardContentProps,
} from './BentoCard.types'

// ============ Context ============

interface BentoCardContextValue {
    size: BentoCardProps['size']
    variant: BentoCardProps['variant']
    dark: boolean
}

const BentoCardContext = createContext<BentoCardContextValue>({
    size: '1x1',
    variant: 'default',
    dark: false,
})

const useBentoCard = () => useContext(BentoCardContext)

// ============ BentoCard Root ============

const BentoCardRoot = forwardRef<HTMLDivElement, BentoCardProps>((props, ref) => {
    const {
        size = '1x1',
        variant = 'default',
        clickable = false,
        href,
        target,
        backgroundImage,
        backgroundColor,
        backgroundGradient,
        disableHover = false,
        dark = false,
        className,
        style,
        children,
        onClick,
        ...restProps
    } = props

    const [isHovered, setIsHovered] = useState(false)
    const sizeConfig = bentoSizes[size]
    const borderConfig = dark ? bentoBorder.dark : bentoBorder.light

    // 构建样式
    const cardStyles: React.CSSProperties = {
        ...bentoCardBase,
        width: sizeConfig.width,
        height: sizeConfig.height,
        ...borderConfig,
        cursor: clickable || href ? 'pointer' : 'default',
        transition: 'none', // Figma 原版没有位移/旋转/缩放动画
        ...(backgroundColor && { background: backgroundColor }),
        ...(backgroundGradient && { background: backgroundGradient }),
        ...(backgroundImage && {
            backgroundImage: `url(${backgroundImage})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
        }),
        ...style,
    }

    // 点击处理
    const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
        if (href) {
            window.open(href, target || '_self')
        }
        onClick?.(e)
    }

    // Grid 样式 (用于 CSS Grid 布局)
    const gridStyles = {
        gridColumn: `span ${sizeConfig.columns}`,
        gridRow: `span ${sizeConfig.rows}`,
    }

    return (
        <BentoCardContext.Provider value={{ size, variant, dark }}>
            <div
                ref={ref}
                className={cn('bento-card', `bento-${size}`, className)}
                style={{ ...cardStyles, ...gridStyles }}
                onClick={clickable || href ? handleClick : onClick}
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
                role={clickable || href ? 'button' : undefined}
                tabIndex={clickable || href ? 0 : undefined}
                {...restProps}
            >
                {/* 悬停叠加层 (Figma: 15% 灰色涂层) */}
                {clickable && (
                    <div
                        className="bento-card-hover-overlay"
                        style={{
                            position: 'absolute',
                            inset: 0,
                            backgroundColor: 'rgba(0, 0, 0, 0.03)', 
                            opacity: isHovered ? 1 : 0,
                            transition: 'opacity 0.2s ease',
                            pointerEvents: 'none',
                            zIndex: 0,
                        }}
                    />
                )}

                {children}

                {/* 内边框高光 (Figma Mask Border 效果) */}
                <div
                    className="bento-card-border"
                    style={{
                        position: 'absolute',
                        inset: 0,
                        borderRadius: `${BENTO_RADIUS}px`,
                        pointerEvents: 'none',
                        boxShadow: dark
                            ? 'inset 0 0 0 1px rgba(255, 255, 255, 0.32)'
                            : 'inset 0 0 0 1px rgba(255, 255, 255, 0.18)',
                        zIndex: 2, // 确保边框在最上层
                    }}
                />
            </div>
        </BentoCardContext.Provider>
    )

})

BentoCardRoot.displayName = 'BentoCard'

// ============ BentoCard.Icon ============

const BentoCardIcon = forwardRef<HTMLDivElement, BentoCardIconProps>((props, ref) => {
    const {
        src,
        icon,
        size = 'md',
        backgroundColor,
        rounded = true,
        className,
        style,
        ...restProps
    } = props

    const sizeConfig = bentoIconSizes[size]

    const iconStyles: React.CSSProperties = {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: sizeConfig.wrapper,
        height: sizeConfig.wrapper,
        borderRadius: rounded ? '13px' : '50%',
        backgroundColor: backgroundColor || 'var(--color-surface-hover)',
        overflow: 'hidden',
        flexShrink: 0,
        ...style,
    }

    return (
        <div ref={ref} className={cn('bento-card-icon', className)} style={iconStyles} {...restProps}>
            {src ? (
                <img
                    src={src}
                    alt=""
                    style={{
                        width: sizeConfig.icon,
                        height: sizeConfig.icon,
                        objectFit: 'contain',
                    }}
                />
            ) : (
                icon
            )}
        </div>
    )
})

BentoCardIcon.displayName = 'BentoCard.Icon'

// ============ BentoCard.Title ============

const BentoCardTitle = forwardRef<HTMLDivElement, BentoCardTitleProps>((props, ref) => {
    const {
        color = 'primary',
        size = 'md',
        truncate = false,
        maxLines,
        className,
        style,
        children,
        ...restProps
    } = props

    const colorMap = {
        primary: 'var(--color-text-primary)',
        secondary: 'var(--color-text-secondary)',
        inverse: '#ffffff',
        muted: 'rgba(0, 0, 0, 0.3)',
    }

    const sizeMap = {
        sm: { fontSize: '13px', lineHeight: '18px', fontWeight: 400 },
        md: { fontSize: '14px', lineHeight: '18px', fontWeight: 500, letterSpacing: '-0.01em' },
        lg: { fontSize: '18px', lineHeight: '24px', fontWeight: 600, letterSpacing: '-0.02em' },
    }

    const titleStyles: React.CSSProperties = {
        fontFamily: "'Inter', sans-serif",
        color: colorMap[color],
        ...sizeMap[size],
        margin: 0,
        ...(truncate && {
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            whiteSpace: 'nowrap',
        }),
        ...(maxLines && {
            display: '-webkit-box',
            WebkitLineClamp: maxLines,
            WebkitBoxOrient: 'vertical',
            overflow: 'hidden',
        }),
        ...style,
    }

    return (
        <div ref={ref} className={cn('bento-card-title', className)} style={titleStyles} {...restProps}>
            {children}
        </div>
    )
})

BentoCardTitle.displayName = 'BentoCard.Title'

// ============ BentoCard.Subtitle ============

const BentoCardSubtitle = forwardRef<HTMLDivElement, BentoCardSubtitleProps>((props, ref) => {
    const { color = 'secondary', className, style, children, ...restProps } = props

    const colorMap = {
        primary: 'var(--color-text-primary)',
        secondary: 'var(--color-text-secondary)',
        tertiary: 'var(--color-text-tertiary)',
        inverse: 'rgba(255, 255, 255, 0.7)',
    }

    const subtitleStyles: React.CSSProperties = {
        fontFamily: "'Inter', sans-serif",
        fontSize: '12px',
        lineHeight: '16px',
        fontWeight: 400,
        color: colorMap[color],
        margin: 0,
        ...style,
    }

    return (
        <div ref={ref} className={cn('bento-card-subtitle', className)} style={subtitleStyles} {...restProps}>
            {children}
        </div>
    )
})

BentoCardSubtitle.displayName = 'BentoCard.Subtitle'

// ============ BentoCard.Image ============

const BentoCardImage = forwardRef<HTMLDivElement, BentoCardImageProps>((props, ref) => {
    const {
        src,
        alt = '',
        objectFit = 'cover',
        objectPosition = 'center',
        className,
        style,
        ...restProps
    } = props

    const imageStyles: React.CSSProperties = {
        position: 'absolute',
        inset: 0,
        width: '100%',
        height: '100%',
        ...style,
    }

    return (
        <div ref={ref} className={cn('bento-card-image', className)} style={imageStyles} {...restProps}>
            <img
                src={src}
                alt={alt}
                style={{
                    width: '100%',
                    height: '100%',
                    objectFit,
                    objectPosition,
                }}
            />
        </div>
    )
})

BentoCardImage.displayName = 'BentoCard.Image'

// ============ BentoCard.Overlay ============

const BentoCardOverlay = forwardRef<HTMLDivElement, BentoCardOverlayProps>((props, ref) => {
    const {
        gradient = 'bottom',
        opacity = 1,
        className,
        style,
        children,
        ...restProps
    } = props

    const overlayStyles: React.CSSProperties = {
        position: 'absolute',
        inset: 0,
        background: bentoOverlayGradients[gradient],
        opacity,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: gradient === 'top' ? 'flex-start' : 'flex-end',
        padding: `${BENTO_PADDING}px`,
        zIndex: 1,
        ...style,
    }

    return (
        <div ref={ref} className={cn('bento-card-overlay', className)} style={overlayStyles} {...restProps}>
            {children}
        </div>
    )
})

BentoCardOverlay.displayName = 'BentoCard.Overlay'

// ============ BentoCard.Action ============

const BentoCardAction = forwardRef<HTMLDivElement, BentoCardActionProps>((props, ref) => {
    const {
        position = 'bottom-right',
        className,
        style,
        children,
        ...restProps
    } = props

    const positionStyles: Record<string, React.CSSProperties> = {
        'bottom-left': { bottom: BENTO_PADDING, left: BENTO_PADDING },
        'bottom-right': { bottom: BENTO_PADDING, right: BENTO_PADDING },
        'top-left': { top: BENTO_PADDING, left: BENTO_PADDING },
        'top-right': { top: BENTO_PADDING, right: BENTO_PADDING },
    }

    const actionStyles: React.CSSProperties = {
        position: 'absolute',
        zIndex: 2,
        ...positionStyles[position],
        ...style,
    }

    return (
        <div ref={ref} className={cn('bento-card-action', className)} style={actionStyles} {...restProps}>
            {children}
        </div>
    )
})

BentoCardAction.displayName = 'BentoCard.Action'

// ============ BentoCard.Footer ============

const BentoCardFooter = forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>((props, ref) => {
    const { className, style, children, ...restProps } = props

    const footerStyles: React.CSSProperties = {
        display: 'flex',
        alignItems: 'flex-end',
        justifyContent: 'space-between',
        width: '100%',
        marginTop: 'auto',
        gap: '12px',
        ...style,
    }

    return (
        <div ref={ref} className={cn('bento-card-footer', className)} style={footerStyles} {...restProps}>
            {children}
        </div>
    )
})

BentoCardFooter.displayName = 'BentoCard.Footer'

// ============ BentoCard.Content ============

const BentoCardContent = forwardRef<HTMLDivElement, BentoCardContentProps>((props, ref) => {
    const {
        align = 'start',
        justify = 'start',
        padding = 'md',
        className,
        style,
        children,
        ...restProps
    } = props

    const alignMap = {
        start: 'flex-start',
        center: 'center',
        end: 'flex-end',
    }

    const justifyMap = {
        start: 'flex-start',
        center: 'center',
        end: 'flex-end',
        between: 'space-between',
    }

    const contentStyles: React.CSSProperties = {
        display: 'flex',
        flexDirection: 'column',
        alignItems: alignMap[align],
        justifyContent: justifyMap[justify],
        padding: bentoPadding[padding],
        flex: 1,
        gap: '4px',
        position: 'relative',
        zIndex: 1,
        ...style,
    }

    return (
        <div ref={ref} className={cn('bento-card-content', className)} style={contentStyles} {...restProps}>
            {children}
        </div>
    )
})

BentoCardContent.displayName = 'BentoCard.Content'

// ============ Compound Export ============

export const BentoCard = Object.assign(BentoCardRoot, {
    Icon: BentoCardIcon,
    Title: BentoCardTitle,
    Subtitle: BentoCardSubtitle,
    Image: BentoCardImage,
    Overlay: BentoCardOverlay,
    Action: BentoCardAction,
    Footer: BentoCardFooter,
    Content: BentoCardContent,
})

export { useBentoCard }
