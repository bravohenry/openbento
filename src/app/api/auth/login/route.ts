/**
 * [INPUT]: POST request with { email, password }
 * [OUTPUT]: JSON response with session data or error
 * [POS]: /src/app/api/auth/login/route.ts - User login endpoint
 * 
 * [PROTOCOL]:
 * 1. Once login logic changes, update this file immediately.
 * 2. After update, verify session creation.
 */

import { NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'
import { validateEmail } from '@/lib/validators'

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { email, password } = body

    // Validation
    const emailValidation = validateEmail(email)
    if (!emailValidation.valid) {
      return NextResponse.json(
        { error: emailValidation.error },
        { status: 400 }
      )
    }

    if (!password) {
      return NextResponse.json(
        { error: 'Password is required' },
        { status: 400 }
      )
    }

    const supabase = await createClient()

    // Sign in user
    const { data: authData, error: authError } = await supabase.auth.signInWithPassword({
      email,
      password,
    })

    if (authError) {
      console.error('Login auth error:', authError)
      return NextResponse.json(
        { error: authError.message || 'Invalid email or password' },
        { status: 401 }
      )
    }

    if (!authData.user || !authData.session) {
      return NextResponse.json(
        { error: 'Login failed - no session created' },
        { status: 500 }
      )
    }

    // Get user profile
    const { data: profile, error: profileError } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', authData.user.id)
      .single()

    if (profileError) {
      console.error('Profile fetch error:', profileError)
      // Still return success if profile doesn't exist yet
    }

    // Create response with user data
    const response = NextResponse.json({
      success: true,
      user: {
        id: authData.user.id,
        email: authData.user.email,
        username: profile?.username || authData.user.email?.split('@')[0] || '',
        display_name: profile?.display_name || authData.user.email?.split('@')[0] || '',
        avatar_url: profile?.avatar_url || null,
        bio: profile?.bio || null,
        handle: profile?.handle || null,
        created_at: profile?.created_at || authData.user.created_at,
      },
    })

    // Cookies are automatically set by Supabase SSR client
    return response
  } catch (error) {
    console.error('Login error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
