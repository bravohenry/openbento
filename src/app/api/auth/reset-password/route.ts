/**
 * [INPUT]: POST request with { password }
 * [OUTPUT]: JSON response confirming password reset
 * [POS]: /src/app/api/auth/reset-password/route.ts - Reset password with token
 */

import { NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'
import { validatePassword } from '@/lib/validators'

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { password } = body

    // Validation
    const passwordValidation = validatePassword(password)
    if (!passwordValidation.valid) {
      return NextResponse.json(
        { error: passwordValidation.error },
        { status: 400 }
      )
    }

    const supabase = await createClient()

    // Check if user has a valid session (from email link)
    const { data: { user }, error: authError } = await supabase.auth.getUser()

    if (authError || !user) {
      return NextResponse.json(
        { error: 'Invalid or expired reset link' },
        { status: 401 }
      )
    }

    // Update password
    const { error } = await supabase.auth.updateUser({
      password: password,
    })

    if (error) {
      return NextResponse.json(
        { error: 'Failed to reset password' },
        { status: 500 }
      )
    }

    return NextResponse.json({
      success: true,
      message: 'Password has been reset successfully',
    })
  } catch (error) {
    console.error('Reset password error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
