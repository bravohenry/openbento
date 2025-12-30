'use client'

/**
 * Public Profile Page
 * 
 * Displays user's bento page in read-only mode
 * Dynamic route: /[username]
 */

import React, { useEffect, useState } from 'react'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { BentoCard, BENTO_GAP } from '@/bento/core'
import { ProfileSection } from '@/bento/editor'
import { getUserByHandle, useBentoStore, type User } from '@/stores'
import { ThemeProvider } from '@/design-system/foundation/theme'
import type { WidgetConfig, LinkWidgetConfig, ImageWidgetConfig, TextWidgetConfig, MapWidgetConfig } from '@/bento/widgets/types'

// ============ Widget Renderer (Read-only) ============

function WidgetRenderer({ widget }: { widget: WidgetConfig }) {
    switch (widget.type) {
        case 'link': {
            const linkWidget = widget as LinkWidgetConfig
            return (
                <BentoCard
                    size={widget.size}
                    backgroundColor={widget.style?.backgroundColor || '#ffffff'}
                    clickable
                    href={linkWidget.url}
                    target="_blank"
                >
                    <div style={{ padding: 24, height: '100%', display: 'flex', flexDirection: 'column' }}>
                        {linkWidget.favicon && (
                            <img
                                src={linkWidget.favicon}
                                alt=""
                                style={{ width: 40, height: 40, borderRadius: 10, marginBottom: 12 }}
                            />
                        )}
                        <span style={{ fontSize: 14, fontWeight: 500, color: '#000' }}>
                            {linkWidget.title || linkWidget.url}
                        </span>
                        {linkWidget.description && (
                            <span style={{ fontSize: 12, color: '#666', marginTop: 4 }}>
                                {linkWidget.description}
                            </span>
                        )}
                    </div>
                </BentoCard>
            )
        }

        case 'image': {
            const imageWidget = widget as ImageWidgetConfig
            return (
                <BentoCard size={widget.size} clickable>
                    <BentoCard.Image src={imageWidget.imageUrl} />
                    {imageWidget.title && (
                        <BentoCard.Overlay gradient="bottom">
                            <BentoCard.Title color="inverse">{imageWidget.title}</BentoCard.Title>
                        </BentoCard.Overlay>
                    )}
                </BentoCard>
            )
        }

        case 'text': {
            const textWidget = widget as TextWidgetConfig
            return (
                <BentoCard
                    size={widget.size}
                    backgroundColor={widget.style?.backgroundColor || '#ffffff'}
                >
                    <div style={{
                        padding: 24,
                        height: '100%',
                        display: 'flex',
                        alignItems: textWidget.alignment === 'center' ? 'center' : 'flex-start',
                        justifyContent: textWidget.alignment === 'center' ? 'center' : 'flex-start',
                    }}>
                        <span style={{
                            fontSize: textWidget.fontSize === 'lg' ? 18 : textWidget.fontSize === 'xl' ? 24 : 14,
                            fontWeight: textWidget.fontWeight === 'bold' ? 700 : 500,
                            color: widget.style?.textColor || '#000',
                        }}>
                            {textWidget.text}
                        </span>
                    </div>
                </BentoCard>
            )
        }

        case 'map': {
            const mapWidget = widget as MapWidgetConfig
            return (
                <BentoCard
                    size={widget.size}
                    backgroundImage={`https://api.mapbox.com/styles/v1/mapbox/light-v11/static/${mapWidget.longitude},${mapWidget.latitude},${mapWidget.zoom || 12},0/400x400?access_token=pk.placeholder`}
                    clickable
                >
                    <div style={{
                        position: 'absolute',
                        top: '50%',
                        left: '50%',
                        transform: 'translate(-50%, -50%)',
                        width: 26,
                        height: 26,
                        borderRadius: '50%',
                        backgroundColor: '#5871FF',
                        border: '3px solid white',
                        boxShadow: '0 4px 24px rgba(0,0,0,0.3)',
                    }} />

                    {mapWidget.label && (
                        <div style={{
                            position: 'absolute',
                            bottom: 20,
                            left: 20,
                            padding: '8px 16px',
                            background: 'rgba(255,255,255,0.9)',
                            borderRadius: 12,
                            fontSize: 14,
                            fontWeight: 500,
                        }}>
                            {mapWidget.label}
                        </div>
                    )}
                </BentoCard>
            )
        }

        default:
            return (
                <BentoCard
                    size={widget.size}
                    backgroundColor="#f0f0f0"
                >
                    <div style={{ padding: 24, color: '#666' }}>
                        {widget.type}
                    </div>
                </BentoCard>
            )
    }
}

// ============ Main Page ============

interface ProfilePageProps {
    params: Promise<{ username: string }>
}

export default function ProfilePage({ params }: ProfilePageProps) {
    const [user, setUser] = useState<User | null>(null)
    const [widgets, setWidgets] = useState<WidgetConfig[]>([])
    const [loading, setLoading] = useState(true)
    const [notFoundState, setNotFoundState] = useState(false)
    const { loadPublicLayout } = useBentoStore()

    useEffect(() => {
        async function loadProfile() {
            const { username } = await params

            try {
                // Get user data by handle/username
                const userData = await getUserByHandle(username)
                if (!userData) {
                    setNotFoundState(true)
                    setLoading(false)
                    return
                }

                setUser(userData)

                // Get user's layout
                const layout = await loadPublicLayout(username)
                setWidgets(layout || [])
                setLoading(false)
            } catch (error) {
                console.error('Load profile error:', error)
                setNotFoundState(true)
                setLoading(false)
            }
        }

        loadProfile()
    }, [params, loadPublicLayout])

    if (loading) {
        return (
            <div className="loading-container">
                <div className="loading-spinner" />
                <style jsx>{`
          .loading-container {
            min-height: 100vh;
            display: flex;
            align-items: center;
            justify-content: center;
            background: var(--color-bg-primary);
          }
          .loading-spinner {
            width: 40px;
            height: 40px;
            border: 3px solid var(--color-border);
            border-top-color: var(--color-brand-primary);
            border-radius: 50%;
            animation: spin 0.8s linear infinite;
          }
          @keyframes spin {
            to { transform: rotate(360deg); }
          }
        `}</style>
            </div>
        )
    }

    if (notFoundState) {
        return (
            <div className="not-found-container">
                <span className="not-found-emoji">🍱</span>
                <h1>Page Not Found</h1>
                <p>This Bento page doesn&apos;t exist yet.</p>
                <Link href="/" className="back-link">
                    Go Home
                </Link>
                <style jsx>{`
          .not-found-container {
            min-height: 100vh;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            background: var(--color-bg-primary);
            text-align: center;
            padding: 24px;
          }
          .not-found-emoji {
            font-size: 80px;
            margin-bottom: 24px;
          }
          h1 {
            font-size: 32px;
            font-weight: 700;
            color: var(--color-text-primary);
            margin: 0 0 12px;
          }
          p {
            color: var(--color-text-secondary);
            margin: 0 0 32px;
          }
          .back-link {
            padding: 12px 24px;
            background: var(--color-brand-gradient);
            color: white;
            border-radius: 12px;
            font-weight: 600;
            text-decoration: none;
            transition: transform 0.2s;
          }
          .back-link:hover {
            transform: translateY(-2px);
          }
        `}</style>
            </div>
        )
    }

    return (
        <ThemeProvider defaultMode="light">
            <div className="profile-page">
                {/* Header */}
                <header className="profile-header">
                    <Link href="/" className="header-logo">
                        🍱 OpenBento
                    </Link>
                </header>

                {/* Profile Section */}
                <ProfileSection
                    name={user?.displayName || 'User'}
                    description={user?.bio || ''}
                    avatarUrl={user?.avatar}
                />

                {/* Bento Grid */}
                <div className="profile-grid-container">
                    <div
                        className="profile-grid"
                        style={{
                            display: 'grid',
                            gridTemplateColumns: 'repeat(4, 175px)',
                            gap: BENTO_GAP,
                            justifyContent: 'center',
                        }}
                    >
                        {widgets.map((widget) => (
                            <WidgetRenderer key={widget.id} widget={widget} />
                        ))}

                        {widgets.length === 0 && (
                            <div className="empty-state">
                                <p>This page is empty</p>
                            </div>
                        )}
                    </div>
                </div>

                {/* Footer */}
                <footer className="profile-footer">
                    <span>Made with</span>
                    <Link href="/">🍱 OpenBento</Link>
                </footer>

                <style jsx>{`
          .profile-page {
            min-height: 100vh;
            background: var(--color-bg-primary);
            padding-bottom: 80px;
          }
          
          .profile-header {
            position: fixed;
            top: 0;
            left: 0;
            right: 0;
            padding: 16px 24px;
            z-index: 100;
          }
          
          .header-logo {
            font-size: 18px;
            font-weight: 700;
            color: var(--color-text-primary);
            text-decoration: none;
            opacity: 0.6;
            transition: opacity 0.2s;
          }
          
          .header-logo:hover {
            opacity: 1;
          }
          
          .profile-grid-container {
            margin-left: 480px;
            padding-top: 96px;
          }
          
          .empty-state {
            grid-column: span 4;
            padding: 80px 24px;
            text-align: center;
            color: var(--color-text-tertiary);
          }
          
          .profile-footer {
            position: fixed;
            bottom: 24px;
            left: 0;
            right: 0;
            display: flex;
            align-items: center;
            justify-content: center;
            gap: 8px;
            font-size: 14px;
            color: var(--color-text-tertiary);
          }
          
          .profile-footer a {
            color: var(--color-text-secondary);
            text-decoration: none;
            font-weight: 500;
          }
          
          .profile-footer a:hover {
            color: var(--color-text-primary);
          }
          
          @media (max-width: 1024px) {
            .profile-grid-container {
              margin-left: 0;
              padding: 24px;
              padding-top: 280px;
            }
            
            .profile-grid {
              grid-template-columns: repeat(2, 1fr) !important;
            }
          }
        `}</style>
            </div>
        </ThemeProvider>
    )
}
