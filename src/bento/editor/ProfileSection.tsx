'use client'

/**
 * OpenBento - Profile Section Component
 * 
 * 左侧个人资料区域，包含头像、名称和描述
 * 基于 Bento.me 原版设计
 */

import React from 'react'

// ============ Types ============

interface ProfileSectionProps {
    /** 头像 URL */
    avatarUrl?: string
    /** 头像背景色 (当无图片时使用) */
    avatarBgColor?: string
    /** 名称/品牌名 */
    name: string
    /** 描述文字 */
    description: string | React.ReactNode
    /** 编辑模式 */
    isEditing?: boolean
}

// ============ Component ============

export const ProfileSection: React.FC<ProfileSectionProps> = ({
    avatarUrl,
    avatarBgColor = 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    name,
    description,
    isEditing = false,
}) => {
    return (
        <div className="flex flex-col items-start gap-6 w-[380px] shrink-0 fixed left-[76px] top-[96px]">
            {/* Avatar */}
            <div
                className="relative w-[120px] h-[120px] rounded-[32px] overflow-hidden shadow-lg"
                style={{
                    background: avatarUrl ? undefined : avatarBgColor,
                }}
            >
                {avatarUrl ? (
                    <img
                        src={avatarUrl}
                        alt={name}
                        className="w-full h-full object-cover"
                    />
                ) : (
                    /* Default Avatar - Gradient Circle Icon like Bento.me */
                    <div className="w-full h-full flex items-center justify-center">
                        <div
                            className="w-[90px] h-[90px] rounded-full"
                            style={{
                                background: 'linear-gradient(180deg, #7DD3FC 0%, #38BDF8 50%, #0EA5E9 100%)',
                                boxShadow: 'inset 0 -4px 12px rgba(0,0,0,0.1), 0 8px 24px rgba(14,165,233,0.3)',
                            }}
                        />
                    </div>
                )}
                {/* Subtle inner border */}
                <div
                    className="absolute inset-0 rounded-[32px] pointer-events-none"
                    style={{
                        boxShadow: 'inset 0 0 0 1px rgba(255,255,255,0.2)',
                    }}
                />
            </div>

            {/* Name */}
            <h1
                className="text-[36px] font-bold leading-[1.1] tracking-[-1px] text-black"
                style={{ fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, sans-serif' }}
            >
                {name}
            </h1>

            {/* Description */}
            <p
                className="text-[16px] leading-[1.5] text-[#565656] max-w-[320px]"
                style={{ fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, sans-serif' }}
            >
                {typeof description === 'string' ? (
                    description
                ) : (
                    description
                )}
            </p>
        </div>
    )
}

// ============ Editable Profile Section ============

interface EditableProfileSectionProps extends ProfileSectionProps {
    onNameChange?: (name: string) => void
    onDescriptionChange?: (description: string) => void
    onAvatarChange?: (url: string) => void
}

export const EditableProfileSection: React.FC<EditableProfileSectionProps> = ({
    avatarUrl,
    avatarBgColor,
    name,
    description,
    isEditing = false,
    onNameChange,
    onDescriptionChange,
    onAvatarChange,
}) => {
    if (!isEditing) {
        return (
            <ProfileSection
                avatarUrl={avatarUrl}
                avatarBgColor={avatarBgColor}
                name={name}
                description={description}
            />
        )
    }

    return (
        <div className="flex flex-col items-start gap-6 w-[380px] shrink-0 fixed left-[76px] top-[96px]">
            {/* Avatar with Edit Overlay */}
            <div className="relative group">
                <div
                    className="relative w-[120px] h-[120px] rounded-[32px] overflow-hidden shadow-lg cursor-pointer"
                    style={{
                        background: avatarUrl ? undefined : avatarBgColor || 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                    }}
                    onClick={() => {
                        // In a real implementation, open file picker
                        const newUrl = prompt('Enter image URL:', avatarUrl || '')
                        if (newUrl && onAvatarChange) {
                            onAvatarChange(newUrl)
                        }
                    }}
                >
                    {avatarUrl ? (
                        <img
                            src={avatarUrl}
                            alt={name}
                            className="w-full h-full object-cover"
                        />
                    ) : (
                        <div className="w-full h-full flex items-center justify-center">
                            <div
                                className="w-[90px] h-[90px] rounded-full"
                                style={{
                                    background: 'linear-gradient(180deg, #7DD3FC 0%, #38BDF8 50%, #0EA5E9 100%)',
                                    boxShadow: 'inset 0 -4px 12px rgba(0,0,0,0.1), 0 8px 24px rgba(14,165,233,0.3)',
                                }}
                            />
                        </div>
                    )}
                    {/* Edit overlay on hover */}
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                        <span className="text-white text-sm font-medium">Edit</span>
                    </div>
                </div>
            </div>

            {/* Editable Name */}
            <input
                type="text"
                value={name}
                onChange={(e) => onNameChange?.(e.target.value)}
                className="text-[36px] font-bold leading-[1.1] tracking-[-1px] text-black bg-transparent border-none outline-none w-full focus:ring-2 focus:ring-black/10 rounded-lg px-2 -mx-2"
                style={{ fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, sans-serif' }}
                placeholder="Your Name"
            />

            {/* Editable Description */}
            <textarea
                value={typeof description === 'string' ? description : ''}
                onChange={(e) => onDescriptionChange?.(e.target.value)}
                className="text-[16px] leading-[1.5] text-[#565656] max-w-[320px] bg-transparent border-none outline-none w-full resize-none focus:ring-2 focus:ring-black/10 rounded-lg px-2 -mx-2"
                style={{ fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, sans-serif' }}
                placeholder="Your description..."
                rows={3}
            />
        </div>
    )
}

export default ProfileSection
