/**
 * [INPUT]: GET/PATCH request
 * [OUTPUT]: JSON response with current user data
 * [POS]: /src/app/api/users/me/route.ts - Current user profile endpoint
 */

import { NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'

export async function GET() {
  try {
    const supabase = await createClient()

    const { data: { user }, error: authError } = await supabase.auth.getUser()
    if (authError || !user) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }

    const { data: profile, error } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', user.id)
      .maybeSingle()

    if (error) {
      console.error('Profile fetch error:', error)
      return NextResponse.json(
        { error: 'Failed to fetch profile' },
        { status: 500 }
      )
    }

    // If profile doesn't exist, return basic user info
    if (!profile) {
      return NextResponse.json({
        success: true,
        user: {
          id: user.id,
          email: user.email,
          username: user.email?.split('@')[0] || '',
          display_name: user.email?.split('@')[0] || '',
          avatar_url: null,
          bio: null,
          handle: null,
          created_at: user.created_at,
          updated_at: user.updated_at,
        },
      })
    }

    return NextResponse.json({
      success: true,
      user: {
        id: profile.id,
        email: user.email,
        username: profile.username,
        display_name: profile.display_name,
        avatar_url: profile.avatar_url,
        bio: profile.bio,
        handle: profile.handle,
        created_at: profile.created_at,
        updated_at: profile.updated_at,
      },
    })
  } catch (error) {
    console.error('Get current user error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

export async function PATCH(request: Request) {
  try {
    const supabase = await createClient()

    const { data: { user }, error: authError } = await supabase.auth.getUser()
    if (authError || !user) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }

    const body = await request.json()
    const { display_name, avatar_url, bio } = body

    const updates: Record<string, unknown> = {}
    if (display_name !== undefined) updates.display_name = display_name
    if (avatar_url !== undefined) updates.avatar_url = avatar_url
    if (bio !== undefined) updates.bio = bio

    const { data: profile, error } = await supabase
      .from('profiles')
      .update(updates)
      .eq('id', user.id)
      .select()
      .single()

    if (error) {
      return NextResponse.json(
        { error: 'Failed to update profile' },
        { status: 500 }
      )
    }

    return NextResponse.json({
      success: true,
      user: {
        id: profile.id,
        username: profile.username,
        display_name: profile.display_name,
        avatar_url: profile.avatar_url,
        bio: profile.bio,
        handle: profile.handle,
      },
    })
  } catch (error) {
    console.error('Update profile error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
