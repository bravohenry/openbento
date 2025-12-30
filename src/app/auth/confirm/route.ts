/**
 * [INPUT]: GET request with token_hash and type query parameters
 * [OUTPUT]: Redirect to appropriate page after token verification
 * [POS]: /src/app/auth/confirm/route.ts - Email token verification endpoint
 * 
 * Handles email confirmation links (signup, password reset, etc.)
 */

import { type EmailOtpType } from '@supabase/supabase-js'
import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const token_hash = searchParams.get('token_hash')
  const type = searchParams.get('type') as EmailOtpType | null
  const next = searchParams.get('next') ?? '/auth/reset-password'

  if (!token_hash || !type) {
    return NextResponse.redirect(
      new URL('/auth/login?error=invalid_token', request.url)
    )
  }

  const supabase = await createClient()

  // Verify the OTP token
  const { error } = await supabase.auth.verifyOtp({
    type,
    token_hash,
  })

  if (error) {
    return NextResponse.redirect(
      new URL('/auth/login?error=token_expired', request.url)
    )
  }

  // Redirect to the specified next URL (defaults to reset-password page)
  const redirectTo = new URL(next, request.url)
  redirectTo.searchParams.delete('token_hash')
  redirectTo.searchParams.delete('type')
  redirectTo.searchParams.delete('next')

  return NextResponse.redirect(redirectTo)
}
