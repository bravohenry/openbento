/**
 * [INPUT]: (ref, handler, enabled) - React ref, close handler, enabled flag
 * [OUTPUT]: (void) - Sets up click outside detection
 * [POS]: Located at /bento/editor/hooks - Reusable hook for closing modals/overlays when clicking outside
 * 
 * [PROTOCOL]:
 * 1. Once this file's logic changes, this Header must be synchronized immediately.
 * 2. After update, must check upward whether /src/bento/editor/.folder.md description is still accurate.
 */

import { useEffect, RefObject } from 'react'

/**
 * Hook to detect clicks outside of a referenced element
 * Closes the element when clicking outside
 * 
 * @param ref - React ref to the element that should stay open when clicked inside
 * @param handler - Function to call when clicking outside
 * @param enabled - Whether the hook is enabled (default: true)
 */
export function useClickOutside<T extends HTMLElement = HTMLElement>(
    ref: RefObject<T | null> | RefObject<HTMLElement | null>,
    handler: (event: MouseEvent | TouchEvent) => void,
    enabled: boolean = true
) {
    useEffect(() => {
        if (!enabled) return

        const listener = (event: MouseEvent | TouchEvent) => {
            // Do nothing if clicking ref's element or descendent elements
            if (!ref.current || ref.current.contains(event.target as Node)) {
                return
            }

            handler(event)
        }

        // Use mousedown instead of click to catch clicks earlier
        document.addEventListener('mousedown', listener)
        document.addEventListener('touchstart', listener)

        return () => {
            document.removeEventListener('mousedown', listener)
            document.removeEventListener('touchstart', listener)
        }
    }, [ref, handler, enabled])
}
