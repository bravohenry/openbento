/**
 * [INPUT]: GET request with handle in URL path
 * [OUTPUT]: JSON response with user profile and layout
 * [POS]: /src/app/api/users/[handle]/route.ts - Get user by handle
 */

import { NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'

export async function GET(
  request: Request,
  { params }: { params: Promise<{ handle: string }> }
) {
  try {
    const { handle } = await params
    const supabase = await createClient()

    // Try to find user by handle first, then by username
    let profile = null
    let query = supabase
      .from('profiles')
      .select('*')
      .eq('handle', handle.toLowerCase())
      .single()

    const { data: handleProfile } = await query

    if (!handleProfile) {
      // Try username as fallback
      const { data: usernameProfile } = await supabase
        .from('profiles')
        .select('*')
        .eq('username', handle.toLowerCase())
        .single()

      if (!usernameProfile) {
        return NextResponse.json(
          { error: 'User not found' },
          { status: 404 }
        )
      }
      profile = usernameProfile
    } else {
      profile = handleProfile
    }

    // Get user's bento layout
    const { data: layout } = await supabase
      .from('bento_layouts')
      .select('widgets, desktop_layout, mobile_layout')
      .eq('user_id', profile.id)
      .single()

    return NextResponse.json({
      success: true,
      user: {
        id: profile.id,
        username: profile.username,
        display_name: profile.display_name,
        avatar_url: profile.avatar_url,
        bio: profile.bio,
        handle: profile.handle,
        created_at: profile.created_at,
      },
      layout: layout || {
        widgets: [],
        desktop_layout: null,
        mobile_layout: null,
      },
    })
  } catch (error) {
    console.error('Get user error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
