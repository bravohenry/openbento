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
    const { display_name, avatar_url, bio, username, email } = body

    // Update email in Supabase Auth if provided
    if (email !== undefined && email !== user.email) {
      const { error: emailError } = await supabase.auth.updateUser({
        email: email,
      })

      if (emailError) {
        return NextResponse.json(
          { error: emailError.message || 'Failed to update email' },
          { status: 400 }
        )
      }
    }

    // Update profile fields
    const updates: Record<string, unknown> = {}
    if (display_name !== undefined) updates.display_name = display_name
    if (avatar_url !== undefined) updates.avatar_url = avatar_url
    if (bio !== undefined) updates.bio = bio
    if (username !== undefined) {
      // Validate username uniqueness (excluding current user)
      const { data: existingProfile } = await supabase
        .from('profiles')
        .select('id')
        .eq('username', username.toLowerCase())
        .neq('id', user.id)
        .maybeSingle()

      if (existingProfile) {
        return NextResponse.json(
          { error: 'Username already taken' },
          { status: 409 }
        )
      }

      updates.username = username.toLowerCase()
    }

    // Check if profile exists, create if it doesn't
    let profile = null
    const { data: existingProfile } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', user.id)
      .maybeSingle()

    if (!existingProfile) {
      // Create profile if it doesn't exist
      const { data: newProfile, error: createError } = await supabase
        .from('profiles')
        .insert({
          id: user.id,
          username: username?.toLowerCase() || user.email?.split('@')[0] || '',
          display_name: display_name || user.email?.split('@')[0] || '',
          avatar_url: avatar_url || null,
          bio: bio || null,
        })
        .select()
        .single()

      if (createError) {
        console.error('Create profile error details:', {
          error: createError,
          code: createError.code,
          message: createError.message,
          details: createError.details,
          hint: createError.hint,
          userId: user.id,
        })
        return NextResponse.json(
          { error: `Failed to create profile: ${createError.message || 'Unknown error'}` },
          { status: 500 }
        )
      }

      profile = newProfile
    } else {
      // Update profile if there are updates
      if (Object.keys(updates).length > 0) {
        const { data: updatedProfile, error: profileError } = await supabase
          .from('profiles')
          .update(updates)
          .eq('id', user.id)
          .select()
          .single()

        if (profileError) {
          console.error('Update profile error details:', {
            error: profileError,
            code: profileError.code,
            message: profileError.message,
            details: profileError.details,
            hint: profileError.hint,
            userId: user.id,
            updates,
          })
          return NextResponse.json(
            { error: `Failed to update profile: ${profileError.message || 'Unknown error'}` },
            { status: 500 }
          )
        }

        profile = updatedProfile
      } else {
        profile = existingProfile
      }
    }

    // Get updated auth user to get latest email
    const { data: { user: updatedAuthUser } } = await supabase.auth.getUser()

    return NextResponse.json({
      success: true,
      user: {
        id: profile?.id || user.id,
        email: updatedAuthUser?.email || user.email,
        username: profile?.username || username?.toLowerCase() || user.email?.split('@')[0] || '',
        display_name: profile?.display_name || display_name,
        avatar_url: profile?.avatar_url || avatar_url,
        bio: profile?.bio || bio,
        handle: profile?.handle,
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
