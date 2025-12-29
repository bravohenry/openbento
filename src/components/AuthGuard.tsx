'use client'

/**
 * AuthGuard - Protected route wrapper
 * 
 * Redirects unauthenticated users to login page.
 * Shows loading state during hydration.
 */

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { useUserStore } from '@/stores'

interface AuthGuardProps {
    children: React.ReactNode
    fallback?: React.ReactNode
}

export function AuthGuard({ children, fallback }: AuthGuardProps) {
    const router = useRouter()
    const { isAuthenticated, hydrate } = useUserStore()
    const [isHydrated, setIsHydrated] = useState(false)

    // Hydrate user state from localStorage
    useEffect(() => {
        hydrate()
        setIsHydrated(true)
    }, [hydrate])

    // Redirect if not authenticated after hydration
    useEffect(() => {
        if (isHydrated && !isAuthenticated) {
            router.push('/auth/login')
        }
    }, [isHydrated, isAuthenticated, router])

    // Show loading during hydration
    if (!isHydrated) {
        return fallback || <LoadingSpinner />
    }

    // Show loading if redirecting
    if (!isAuthenticated) {
        return fallback || <LoadingSpinner />
    }

    return <>{children}</>
}

function LoadingSpinner() {
    return (
        <div style={{
            minHeight: '100vh',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            background: 'var(--color-bg-primary)',
        }}>
            <div style={{
                width: 40,
                height: 40,
                border: '3px solid var(--color-border)',
                borderTopColor: 'var(--color-brand-primary)',
                borderRadius: '50%',
                animation: 'spin 0.8s linear infinite',
            }} />
            <style jsx>{`
        @keyframes spin {
          to { transform: rotate(360deg); }
        }
      `}</style>
        </div>
    )
}

export default AuthGuard
