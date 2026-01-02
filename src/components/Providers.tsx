'use client'

/**
 * [INPUT]: (children: ReactNode) - Application children components
 * [OUTPUT]: React component - Wrapper with all necessary providers
 * [POS]: Root-level provider wrapper, wraps application with ThemeProvider and other global providers
 * 
 * [PROTOCOL]:
 * 1. Once provider logic changes, update this file immediately.
 * 2. After update, verify all pages can access theme context.
 */

import React from 'react'
import { ThemeProvider } from '@/design-system/foundation/theme'

interface ProvidersProps {
    children: React.ReactNode
}

export function Providers({ children }: ProvidersProps) {
    return (
        <ThemeProvider defaultMode="system">
            {children}
        </ThemeProvider>
    )
}
