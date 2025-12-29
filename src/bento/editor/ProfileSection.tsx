'use client'

import React from 'react'
import { motion } from 'framer-motion'

interface ProfileSectionProps {
    avatarUrl?: string
    avatarBgColor?: string
    name: string
    description: string | React.ReactNode
    isEditing?: boolean
}

export const ProfileSection: React.FC<ProfileSectionProps> = ({
    avatarUrl,
    avatarBgColor,
    name,
    description,
}) => {
    return (
        <div className="w-full flex flex-col items-start gap-6">
            {/* Avatar - Circular, no shadow */}
            <div className="relative w-40 h-40 rounded-full overflow-hidden">
                {avatarUrl ? (
                    <img src={avatarUrl} alt={name} className="w-full h-full object-cover" />
                ) : (
                    <div className="w-full h-full bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center relative">
                        {/* Blue outer ring */}
                        <div className="absolute inset-0 rounded-full border-4 border-blue-500" />
                        {/* Light blue crescent shape */}
                        <div className="absolute inset-0 rounded-full bg-blue-300/30" style={{
                            clipPath: 'ellipse(60% 40% at 30% 50%)',
                        }} />
                    </div>
                )}
            </div>

            {/* Content */}
            <div className="flex flex-col gap-3">
                <h1 className="text-3xl font-extrabold tracking-tight text-black leading-tight">
                    {name}
                </h1>
                <p className="text-base text-black leading-relaxed">
                    {description}
                </p>
            </div>
        </div>
    )
}

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
        return <ProfileSection avatarUrl={avatarUrl} avatarBgColor={avatarBgColor} name={name} description={description} />
    }

    return (
        <div className="w-full flex flex-col items-start gap-6">
            {/* Editable Avatar - Circular, no shadow */}
            <motion.div
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="relative group cursor-pointer"
                onClick={() => {
                    const newUrl = prompt('Enter image URL:', avatarUrl || '')
                    if (newUrl && onAvatarChange) onAvatarChange(newUrl)
                }}
            >
                <div className="relative w-40 h-40 rounded-full overflow-hidden">
                    {avatarUrl ? (
                        <img src={avatarUrl} alt={name} className="w-full h-full object-cover opacity-90 group-hover:opacity-100 transition-opacity" />
                    ) : (
                        <div className="w-full h-full bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center relative">
                            {/* Blue outer ring */}
                            <div className="absolute inset-0 rounded-full border-4 border-blue-500" />
                            {/* Light blue crescent shape */}
                            <div className="absolute inset-0 rounded-full bg-blue-300/30" style={{
                                clipPath: 'ellipse(60% 40% at 30% 50%)',
                            }} />
                        </div>
                    )}

                    {/* Floating Edit Icon */}
                    <div className="absolute inset-0 flex items-center justify-center bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity backdrop-blur-[2px] rounded-full">
                        <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-lg transform translate-y-2 group-hover:translate-y-0 transition-transform">
                            <span className="text-lg">🖊️</span>
                        </div>
                    </div>
                </div>
            </motion.div>

            {/* Editable Inputs */}
            <div className="w-full space-y-3">
                <div className="relative group">
                    <input
                        type="text"
                        value={name}
                        onChange={(e) => onNameChange?.(e.target.value)}
                        className="w-full text-3xl lg:text-4xl font-extrabold bg-transparent border-2 border-transparent hover:border-gray-200 focus:border-blue-500 rounded-xl px-3 py-1 -ml-3 transition-colors outline-none text-black placeholder:text-gray-300"
                        placeholder="Your Name"
                    />
                    <span className="absolute right-2 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 text-gray-300 pointer-events-none">✎</span>
                </div>

                <div className="relative group">
                    <textarea
                        value={typeof description === 'string' ? description : ''}
                        onChange={(e) => onDescriptionChange?.(e.target.value)}
                        className="w-full text-base lg:text-lg text-gray-500 bg-transparent border-2 border-transparent hover:border-gray-200 focus:border-blue-500 rounded-xl px-3 py-2 -ml-3 transition-colors outline-none resize-none placeholder:text-gray-300 leading-relaxed font-medium"
                        placeholder="Add a bio..."
                        rows={3}
                    />
                    <span className="absolute right-2 bottom-2 opacity-0 group-hover:opacity-100 text-gray-300 pointer-events-none">✎</span>
                </div>
            </div>
        </div>
    )
}
