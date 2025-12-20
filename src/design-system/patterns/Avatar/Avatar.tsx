import React, { forwardRef, useState } from 'react'
import { cn } from '../../utils/cn'
import { radii } from '../../tokens/radii'
import { colors } from '../../tokens/colors'
import type { AvatarProps, AvatarSize, AvatarShape } from './Avatar.types'

// ============ 尺寸配置 ============

const avatarSizes: Record<AvatarSize, { size: string; fontSize: string; statusSize: string }> = {
    xs: { size: '24px', fontSize: '10px', statusSize: '6px' },
    sm: { size: '32px', fontSize: '12px', statusSize: '8px' },
    md: { size: '40px', fontSize: '14px', statusSize: '10px' },
    lg: { size: '48px', fontSize: '16px', statusSize: '12px' },
    xl: { size: '64px', fontSize: '20px', statusSize: '14px' },
    '2xl': { size: '96px', fontSize: '28px', statusSize: '18px' },
}

// ============ 形状配置 ============

const avatarShapes: Record<AvatarShape, string> = {
    circle: radii.full,
    rounded: radii.xl,
    square: radii.md,
}

// ============ 状态颜色 ============

const statusColors = {
    online: '#10b981',
    offline: '#9ca3af',
    busy: '#ef4444',
    away: '#f59e0b',
}

// ============ 获取首字母 ============

function getInitials(name: string): string {
    const parts = name.trim().split(/\s+/)
    if (parts.length === 1) {
        return parts[0].charAt(0).toUpperCase()
    }
    return (parts[0].charAt(0) + parts[parts.length - 1].charAt(0)).toUpperCase()
}

// ============ 生成颜色 (基于名称) ============

function getColorFromName(name: string): string {
    const colors = [
        '#6366f1', '#8b5cf6', '#ec4899', '#f43f5e',
        '#f97316', '#eab308', '#22c55e', '#14b8a6',
        '#06b6d4', '#3b82f6', '#a855f7', '#d946ef',
    ]
    let hash = 0
    for (let i = 0; i < name.length; i++) {
        hash = name.charCodeAt(i) + ((hash << 5) - hash)
    }
    return colors[Math.abs(hash) % colors.length]
}

/**
 * Avatar - 头像组件
 * 
 * 用于显示用户头像，支持图片、首字母回退和状态指示器。
 * 
 * @example
 * ```tsx
 * // 图片头像
 * <Avatar src="/avatar.jpg" alt="John Doe" />
 * 
 * // 首字母回退
 * <Avatar name="John Doe" size="lg" />
 * 
 * // 带状态
 * <Avatar src="/avatar.jpg" showStatus status="online" />
 * 
 * // 不同形状
 * <Avatar name="Jane" shape="rounded" />
 * ```
 */
export const Avatar = forwardRef<HTMLDivElement, AvatarProps>((props, ref) => {
    const {
        src,
        alt,
        size = 'md',
        shape = 'circle',
        name,
        fallback,
        borderColor,
        showStatus = false,
        status = 'offline',
        onError,
        className,
        style,
        ...restProps
    } = props

    const [imageError, setImageError] = useState(false)
    const sizeConfig = avatarSizes[size]
    const shapeRadius = avatarShapes[shape]

    // 处理图片加载失败
    const handleError = () => {
        setImageError(true)
        onError?.()
    }

    // 判断是否显示图片
    const showImage = src && !imageError

    // 回退内容
    const renderFallback = () => {
        if (fallback) return fallback
        if (name) {
            return (
                <span
                    style={{
                        fontSize: sizeConfig.fontSize,
                        fontWeight: 600,
                        color: '#ffffff',
                    }}
                >
                    {getInitials(name)}
                </span>
            )
        }
        // 默认用户图标
        return (
            <svg
                width="60%"
                height="60%"
                viewBox="0 0 24 24"
                fill="currentColor"
                style={{ color: 'rgba(255,255,255,0.7)' }}
            >
                <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
            </svg>
        )
    }

    const containerStyles: React.CSSProperties = {
        position: 'relative',
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: sizeConfig.size,
        height: sizeConfig.size,
        borderRadius: shapeRadius,
        overflow: 'hidden',
        backgroundColor: showImage ? 'var(--color-surface-hover)' : (name ? getColorFromName(name) : '#9ca3af'),
        border: borderColor ? `2px solid ${borderColor}` : 'none',
        flexShrink: 0,
        ...style,
    }

    return (
        <div
            ref={ref}
            className={cn('avatar', `avatar-${size}`, className)}
            style={containerStyles}
            {...restProps}
        >
            {showImage ? (
                <img
                    src={src}
                    alt={alt || name || 'Avatar'}
                    onError={handleError}
                    style={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover',
                    }}
                />
            ) : (
                renderFallback()
            )}

            {/* 状态指示器 */}
            {showStatus && (
                <span
                    className="avatar-status"
                    style={{
                        position: 'absolute',
                        bottom: shape === 'circle' ? '2px' : '0',
                        right: shape === 'circle' ? '2px' : '0',
                        width: sizeConfig.statusSize,
                        height: sizeConfig.statusSize,
                        borderRadius: '50%',
                        backgroundColor: statusColors[status],
                        border: '2px solid var(--color-surface)',
                    }}
                />
            )}
        </div>
    )
})

Avatar.displayName = 'Avatar'
