/**
 * [INPUT]: POST request with { email, password, username, displayName }
 * [OUTPUT]: JSON response with user data or error
 * [POS]: /src/app/api/auth/register/route.ts - User registration endpoint
 * 
 * [PROTOCOL]:
 * 1. Once registration logic changes, update this file immediately.
 * 2. After update, verify profile creation and handle assignment.
 */

import { NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'
import { validateEmail, validatePassword, validateUsername } from '@/lib/validators'

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { email, password, username, displayName } = body

    // Validation
    const emailValidation = validateEmail(email)
    if (!emailValidation.valid) {
      return NextResponse.json(
        { error: emailValidation.error },
        { status: 400 }
      )
    }

    const passwordValidation = validatePassword(password)
    if (!passwordValidation.valid) {
      return NextResponse.json(
        { error: passwordValidation.error },
        { status: 400 }
      )
    }

    const usernameValidation = validateUsername(username)
    if (!usernameValidation.valid) {
      return NextResponse.json(
        { error: usernameValidation.error },
        { status: 400 }
      )
    }

    const supabase = await createClient()

    // Check if username already exists
    // Use try-catch to handle potential 406 errors gracefully
    try {
      const { data: profileData, error: profileError } = await supabase
        .from('profiles')
        .select('id')
        .eq('username', username.toLowerCase())
        .maybeSingle()
      
      if (profileError && profileError.code !== 'PGRST116') {
        // Log but don't fail - we'll catch duplicate username in trigger
        console.warn('Username check returned error (will check after signup):', profileError)
      } else if (profileData) {
        return NextResponse.json(
          { error: 'Username already taken' },
          { status: 409 }
        )
      }
    } catch (err) {
      console.warn('Username check failed (non-critical):', err)
    }

    // Create user in Supabase Auth
    // Profile, handle claim, and layout will be created automatically by database trigger
    const { data: authData, error: authError } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          username: username.toLowerCase(),
          display_name: displayName || username,
        },
      },
    })

    if (authError) {
      // Check if email already exists
      if (authError.message.includes('already registered') || authError.message.includes('already exists')) {
        return NextResponse.json(
          { error: 'Email already registered' },
          { status: 409 }
        )
      }
      return NextResponse.json(
        { error: authError.message },
        { status: 400 }
      )
    }

    if (!authData.user) {
      return NextResponse.json(
        { error: 'Failed to create user' },
        { status: 500 }
      )
    }

    const handle = username.toLowerCase()

    // Wait a bit for trigger to complete
    await new Promise(resolve => setTimeout(resolve, 500))

    // Verify profile was created by trigger, if not create manually
    const { data: createdProfile } = await supabase
      .from('profiles')
      .select('id')
      .eq('id', authData.user.id)
      .maybeSingle()

    if (!createdProfile) {
      // Trigger didn't create profile, create it manually
      console.warn('Trigger did not create profile, creating manually for user:', authData.user.id)
      
      const { error: profileError } = await supabase
        .from('profiles')
        .insert({
          id: authData.user.id,
          username: username.toLowerCase(),
          display_name: displayName || username,
          handle: handle,
        })

      if (profileError) {
        console.error('Failed to create profile:', profileError)
        // Continue anyway - user is created, profile can be created later
      } else {
        // Create handle claim
        await supabase
          .from('handle_claims')
          .insert({
            handle: handle,
            user_id: authData.user.id,
          })
          .catch(err => console.error('Handle claim creation error:', err))

        // Create initial layout
        await supabase
          .from('bento_layouts')
          .insert({
            user_id: authData.user.id,
            widgets: [],
            desktop_layout: null,
            mobile_layout: null,
          })
          .catch(err => console.error('Layout creation error:', err))
      }
    }

    return NextResponse.json({
      success: true,
      user: {
        id: authData.user.id,
        email: authData.user.email,
        username: username.toLowerCase(),
        display_name: displayName || username,
        handle: handle,
        created_at: authData.user.created_at,
      },
    })
  } catch (error) {
    console.error('Registration error:', error)
    const errorMessage = error instanceof Error ? error.message : 'Unknown error'
    return NextResponse.json(
      { error: `Internal server error: ${errorMessage}` },
      { status: 500 }
    )
  }
}
