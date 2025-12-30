'use client'

/**
 * OpenBento - Editor Footer Component
 * 
 * 底部页脚，包含设置图标、Discord 链接和访问统计
 * 基于 Bento.me 原版设计
 */

import React from 'react'
import { Gear, Eye } from 'phosphor-react'

// ============ Icons ============

const SettingsIcon = () => (
    <Gear size={20} weight="regular" />
)

// Discord icon is a social media icon, keep as SVG
const DiscordIcon = () => (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M16.9308 4.33917C15.6561 3.74125 14.2892 3.29825 12.8599 3.04167C12.8339 3.03675 12.8073 3.04842 12.7929 3.07333C12.6145 3.39917 12.4161 3.82425 12.2759 4.15833C10.7366 3.91775 9.20574 3.91775 7.69991 4.15833C7.55974 3.81675 7.35407 3.39917 7.17491 3.07333C7.16057 3.04917 7.13407 3.0375 7.10807 3.04167C5.67957 3.2975 4.31274 3.74058 3.03724 4.33917C3.02541 4.34417 3.01524 4.35258 3.00841 4.36333C0.412574 8.23167 -0.246759 12.0017 0.0768076 15.7275C0.0784743 15.7467 0.0894909 15.7658 0.104574 15.7783C1.81741 17.0417 3.47724 17.8083 5.10607 18.3192C5.13207 18.3275 5.15941 18.3175 5.17624 18.2958C5.56907 17.7533 5.91824 17.1808 6.21574 16.5792C6.23341 16.5442 6.21657 16.5025 6.18007 16.4892C5.6177 16.2783 5.08091 16.0217 4.56474 15.7308C4.52407 15.7067 4.52074 15.6483 4.55824 15.62C4.66374 15.5408 4.76924 15.4583 4.87057 15.375C4.88907 15.3592 4.91424 15.3558 4.93607 15.3658C8.24074 16.8967 11.8049 16.8967 15.0699 15.3658C15.0916 15.355 15.1169 15.3583 15.1359 15.3742C15.2379 15.4575 15.3427 15.5408 15.4491 15.62C15.4866 15.6483 15.4841 15.7067 15.4434 15.7308C14.9274 16.0275 14.3906 16.2783 13.8274 16.4883C13.7909 16.5017 13.7749 16.5442 13.7926 16.5792C14.0967 17.18 14.4459 17.7525 14.8312 18.295C14.8472 18.3175 14.8754 18.3275 14.9014 18.3192C16.5386 17.8083 18.1984 17.0417 19.9113 15.7783C19.9271 15.7658 19.9372 15.7475 19.9389 15.7283C20.3256 11.4217 19.2173 7.68417 16.9599 4.36417C16.9539 4.3525 16.9437 4.34417 16.9308 4.33917ZM6.68457 13.3608C5.69741 13.3608 4.87974 12.4525 4.87974 11.3383C4.87974 10.2242 5.68074 9.31583 6.68457 9.31583C7.69674 9.31583 8.50607 10.2325 8.48941 11.3383C8.48941 12.4525 7.68841 13.3608 6.68457 13.3608ZM13.3479 13.3608C12.3607 13.3608 11.5431 12.4525 11.5431 11.3383C11.5431 10.2242 12.3441 9.31583 13.3479 9.31583C14.3601 9.31583 15.1694 10.2325 15.1527 11.3383C15.1527 12.4525 14.3601 13.3608 13.3479 13.3608Z" fill="currentColor" />
    </svg>
)

const EyeIcon = () => (
    <Eye size={16} weight="regular" />
)

// ============ Component ============

interface EditorFooterProps {
    viewCount?: number
    viewLabel?: string
}

export const EditorFooter: React.FC<EditorFooterProps> = ({
    viewCount = 1,
    viewLabel = 'View Yesterday',
}) => {
    return (
        <div
            className="fixed bottom-0 left-0 right-0 h-14 flex items-center justify-between px-6 bg-white/80 backdrop-blur-md border-t border-black/5 z-50"
            style={{ fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, sans-serif' }}
        >
            {/* Left: Settings & Social Icons */}
            <div className="flex items-center gap-4">
                <button
                    className="flex items-center justify-center w-9 h-9 rounded-lg text-black/40 hover:text-black/60 hover:bg-black/5 transition-colors"
                    aria-label="Settings"
                >
                    <SettingsIcon />
                </button>
                <button
                    className="flex items-center justify-center w-9 h-9 rounded-lg text-black/40 hover:text-black/60 hover:bg-black/5 transition-colors"
                    aria-label="Discord"
                >
                    <DiscordIcon />
                </button>
            </div>

            {/* Right: View Count */}
            <div className="flex items-center gap-2 text-[13px] text-black/40">
                <EyeIcon />
                <span>{viewCount} {viewLabel}</span>
            </div>
        </div>
    )
}

export default EditorFooter
