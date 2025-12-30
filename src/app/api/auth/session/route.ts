/**
 * [INPUT]: GET request
 * [OUTPUT]: JSON response with current user session
 * [POS]: /src/app/api/auth/session/route.ts - Get current session endpoint
 */

import { NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'

export async function GET() {
  try {
    const supabase = await createClient()
    const { data: { user }, error: authError } = await supabase.auth.getUser()

    if (authError || !user) {
      return NextResponse.json(
        { user: null, session: null },
        { status: 200 }
      )
    }

    // Get session for response
    const { data: { session } } = await supabase.auth.getSession()

    // Get user profile (use maybeSingle to handle missing profile)
    const { data: profile } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', user.id)
      .maybeSingle()

    return NextResponse.json({
      user: {
        id: user.id,
        email: user.email,
        username: profile?.username || user.email?.split('@')[0] || '',
        display_name: profile?.display_name || user.email?.split('@')[0] || '',
        avatar_url: profile?.avatar_url || null,
        bio: profile?.bio || null,
        handle: profile?.handle || null,
        created_at: profile?.created_at || user.created_at,
        updated_at: profile?.updated_at || user.updated_at,
      },
      session,
    })
  } catch (error) {
    console.error('Session error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
