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
    const { refreshUser } = useUserStore()
    const { loadLayout } = useBentoStore()

    // Refresh user session and load layout on mount
    useEffect(() => {
        async function initialize() {
            await refreshUser()
            // After refreshUser completes, get the latest user state from store
            // and load layout if user exists
            const currentUser = useUserStore.getState().user
            if (currentUser) {
                loadLayout()
            }
        }
        initialize()
    }, [refreshUser, loadLayout])

    return (
        <AuthGuard>
            {children}
        </AuthGuard>
    )
}
