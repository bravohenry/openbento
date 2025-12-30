'use client'

/**
 * Editor Layout
 * 
 * No header - auto-save and auto-publish on edit
 */

import React, { useEffect } from 'react'
import { useUserStore, useBentoStore } from '@/stores'
import { AuthGuard } from '@/components'

export default function EditorLayout({
    children,
}: {
    children: React.ReactNode
}) {
    const { user, refreshUser } = useUserStore()
    const { loadLayout } = useBentoStore()

    // Refresh user session and load layout on mount
    useEffect(() => {
        refreshUser()
    }, [refreshUser])

    useEffect(() => {
        if (user) {
            loadLayout()
        }
    }, [user, loadLayout])

    return (
        <AuthGuard>
            {children}
        </AuthGuard>
    )
}
