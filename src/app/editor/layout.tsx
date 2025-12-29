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
    const { hydrate, user } = useUserStore()
    const { loadLayout } = useBentoStore()

    // Hydrate and load layout on mount
    useEffect(() => {
        hydrate()
    }, [hydrate])

    useEffect(() => {
        if (user) {
            loadLayout(user.id)
        }
    }, [user, loadLayout])

    return (
        <AuthGuard>
            {children}
        </AuthGuard>
    )
}
