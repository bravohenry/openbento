/**
 * [INPUT]: None - React hook for authentication
 * [OUTPUT]: Auth state and methods
 * [POS]: /src/hooks/useAuth.ts - Authentication hook using Supabase
 */

'use client'

import { useEffect, useState } from 'react'
import { createClient } from '@/lib/supabase/client'
import type { User } from '@supabase/supabase-js'

interface Profile {
  id: string
  username: string
  display_name: string | null
  avatar_url: string | null
  bio: string | null
  handle: string | null
  created_at: string
  updated_at: string
}

interface AuthState {
  user: (User & Profile) | null
  loading: boolean
  error: string | null
}

export function useAuth() {
  const [state, setState] = useState<AuthState>({
    user: null,
    loading: true,
    error: null,
  })

  const supabase = createClient()

  useEffect(() => {
    // Get initial session
    supabase.auth.getSession().then(({ data: { session } }: { data: { session: { user: { id: string } } | null } }) => {
      if (session?.user) {
        loadUserProfile(session.user.id)
      } else {
        setState({ user: null, loading: false, error: null })
      }
    })

    // Listen for auth changes
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(async (event: string, session: { user: { id: string } } | null) => {
      if (session?.user) {
        await loadUserProfile(session.user.id)
      } else {
        setState({ user: null, loading: false, error: null })
      }
    })

    return () => {
      subscription.unsubscribe()
    }
  }, [])

  const loadUserProfile = async (userId: string) => {
    try {
      const { data: profile, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', userId)
        .single()

      if (error) {
        setState({ user: null, loading: false, error: error.message })
        return
      }

      const { data: { user } } = await supabase.auth.getUser()

      if (user) {
        setState({
          user: { ...user, ...profile } as User & Profile,
          loading: false,
          error: null,
        })
      }
    } catch (error) {
      setState({
        user: null,
        loading: false,
        error: error instanceof Error ? error.message : 'Failed to load profile',
      })
    }
  }

  const signUp = async (email: string, password: string, username: string, displayName?: string) => {
    try {
      setState((prev) => ({ ...prev, loading: true, error: null }))

      const response = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password, username, displayName }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'Registration failed')
      }

      // Reload user profile
      if (data.user?.id) {
        await loadUserProfile(data.user.id)
      }

      return { success: true, user: data.user }
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Registration failed'
      setState((prev) => ({ ...prev, loading: false, error: errorMessage }))
      return { success: false, error: errorMessage }
    }
  }

  const signIn = async (email: string, password: string) => {
    try {
      setState((prev) => ({ ...prev, loading: true, error: null }))

      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'Login failed')
      }

      // Reload user profile
      if (data.user?.id) {
        await loadUserProfile(data.user.id)
      }

      return { success: true, user: data.user }
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Login failed'
      setState((prev) => ({ ...prev, loading: false, error: errorMessage }))
      return { success: false, error: errorMessage }
    }
  }

  const signOut = async () => {
    try {
      await fetch('/api/auth/logout', { method: 'POST' })
      await supabase.auth.signOut()
      setState({ user: null, loading: false, error: null })
      return { success: true }
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Logout failed'
      setState((prev) => ({ ...prev, error: errorMessage }))
      return { success: false, error: errorMessage }
    }
  }

  return {
    ...state,
    signUp,
    signIn,
    signOut,
  }
}
