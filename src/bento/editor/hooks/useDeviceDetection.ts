/**
 * [INPUT]: None - Device detection hook
 * [OUTPUT]: (isMobile) - Boolean indicating if device is mobile
 * [POS]: Located at /bento/editor/hooks - Detects mobile devices for responsive behavior
 * 
 * [PROTOCOL]:
 * 1. Once this file's logic changes, this Header must be synchronized immediately.
 * 2. After update, must check upward whether /src/bento/editor/.folder.md description is still accurate.
 */

import { useState, useEffect } from 'react'

/**
 * Hook to detect if the current device is a mobile device
 * Uses both media query and user agent for accurate detection
 */
export function useDeviceDetection(): boolean {
    const [isMobile, setIsMobile] = useState(false)

    useEffect(() => {
        // Check media query first (more reliable)
        const mediaQuery = window.matchMedia('(max-width: 768px)')
        const checkMobile = () => {
            // Check media query
            if (mediaQuery.matches) {
                setIsMobile(true)
                return
            }
            
            // Check user agent as fallback
            const userAgent = navigator.userAgent || navigator.vendor || (window as any).opera
            const mobileRegex = /android|webos|iphone|ipad|ipod|blackberry|iemobile|opera mini/i
            setIsMobile(mobileRegex.test(userAgent.toLowerCase()))
        }

        checkMobile()
        mediaQuery.addEventListener('change', checkMobile)

        return () => {
            mediaQuery.removeEventListener('change', checkMobile)
        }
    }, [])

    return isMobile
}
