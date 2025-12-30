'use client'

import React from 'react'
import { motion } from 'framer-motion'

/**
 * Auth Layout - Redesigned
 * Split screen: Left (Content/Form) | Right (Visuals)
 */

export default function AuthLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <div className="min-h-screen w-full flex bg-white selection:bg-blue-100 selection:text-blue-900">

            {/* Left Side - Form Container */}
            <div className="w-full lg:w-[45%] flex flex-col justify-center px-8 sm:px-12 lg:px-20 xl:px-24 py-12 relative z-10">
                <div className="w-full max-w-[440px] mx-auto">
                    {children}
                </div>
            </div>

            {/* Right Side - Visuals (Hidden on mobile) */}
            <div className="hidden lg:flex w-[55%] bg-[var(--color-white)] relative overflow-hidden items-center justify-center">
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    className="relative w-full max-w-[600px] aspect-square"
                >
                    {/* Floating Widget Pile */}

                    {/* Center - Blue Twitter/X Card */}
                    <motion.div
                        animate={{ y: [0, -10, 0] }}
                        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                        className="absolute top-[20%] left-[10%] w-40 h-64 bg-[#4A9DFF] rounded-[32px] shadow-2xl flex items-center justify-center -rotate-12 z-10"
                    >
                        <i className="fab fa-twitter text-white text-5xl"></i>
                        {/* Simple bird icon simulation if font awesome not loaded */}
                        <svg viewBox="0 0 24 24" className="w-16 h-16 fill-white" aria-hidden="true"><path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.84 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z" /></svg>
                    </motion.div>

                    {/* Top Right - Red YouTube */}
                    <motion.div
                        animate={{ y: [0, 15, 0] }}
                        transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                        className="absolute top-[10%] right-[15%] w-32 h-32 bg-[#FF0000] rounded-[28px] shadow-xl flex items-center justify-center rotate-6 z-20"
                    >
                        <div className="w-12 h-8 bg-white rounded-lg flex items-center justify-center">
                            <div className="border-t-[6px] border-b-[6px] border-l-[10px] border-transparent border-l-red-600 ml-1"></div>
                        </div>
                    </motion.div>

                    {/* Middle Right - Pink Dribbble/Instagram */}
                    <motion.div
                        animate={{ y: [0, -12, 0] }}
                        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
                        className="absolute top-[35%] right-[5%] w-64 h-32 bg-[#FF9FD2] rounded-[32px] shadow-xl flex items-center justify-center rotate-3 z-10"
                    >
                        <svg viewBox="0 0 24 24" className="w-12 h-12 fill-white opacity-80" aria-hidden="true"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z" /></svg>
                    </motion.div>

                    {/* Bottom Right - Yellow Coffee */}
                    <motion.div
                        animate={{ y: [0, 10, 0] }}
                        transition={{ duration: 6.5, repeat: Infinity, ease: "easeInOut", delay: 1.5 }}
                        className="absolute bottom-[10%] right-[10%] w-32 h-32 bg-[#FFD600] rounded-[28px] shadow-lg flex items-center justify-center -rotate-6 z-30"
                    >
                        <span className="text-4xl">☕️</span>
                    </motion.div>

                    {/* Center Large - Orange Bookmark/Content */}
                    <motion.div
                        animate={{ scale: [1, 1.02, 1] }}
                        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
                        className="absolute top-[40%] left-[25%] w-60 h-60 bg-[#FF6B35] rounded-[40px] shadow-2xl flex items-center justify-center -rotate-3 z-20"
                    >
                        <svg className="w-20 h-20 text-white" fill="currentColor" viewBox="0 0 24 24"><path d="M17 3H7c-1.1 0-1.99.9-1.99 2L5 21l7-3 7 3V5c0-1.1-.9-2-2-2z" /></svg>
                    </motion.div>

                    {/* Right Floating - Black GitHub */}
                    <motion.div
                        animate={{ y: [0, -8, 0] }}
                        transition={{ duration: 5.5, repeat: Infinity, ease: "easeInOut", delay: 2 }}
                        className="absolute top-[45%] right-[15%] w-24 h-24 bg-black rounded-[24px] shadow-xl flex items-center justify-center rotate-12 z-40"
                    >
                        <svg className="w-12 h-12 fill-white" viewBox="0 0 24 24"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" /></svg>
                    </motion.div>

                </motion.div>
            </div>

        </div>
    )
}
