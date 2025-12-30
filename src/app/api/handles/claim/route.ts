/**
 * [INPUT]: POST request with { handle }
 * [OUTPUT]: JSON response confirming handle claim
 * [POS]: /src/app/api/handles/claim/route.ts - Claim handle endpoint
 */

import { NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'
import { validateHandle } from '@/lib/validators'

export async function POST(request: Request) {
  try {
    const supabase = await createClient()

    // Check authentication
    const { data: { user }, error: authError } = await supabase.auth.getUser()
    if (authError || !user) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }

    const body = await request.json()
    const { handle } = body

    if (!handle) {
      return NextResponse.json(
        { error: 'Handle is required' },
        { status: 400 }
      )
    }

    // Validate handle format
    const validation = validateHandle(handle.toLowerCase())
    if (!validation.valid) {
      return NextResponse.json(
        { error: validation.error },
        { status: 400 }
      )
    }

    const normalizedHandle = handle.toLowerCase()

    // Check if handle is available
    const { data: existingClaim } = await supabase
      .from('handle_claims')
      .select('handle, user_id')
      .eq('handle', normalizedHandle)
      .single()

    if (existingClaim) {
      if (existingClaim.user_id === user.id) {
        return NextResponse.json({
          success: true,
          message: 'You already own this handle',
          handle: normalizedHandle,
        })
      }
      return NextResponse.json(
        { error: 'Handle is already taken' },
        { status: 409 }
      )
    }

    // Get current user's handle
    const { data: currentProfile } = await supabase
      .from('profiles')
      .select('handle')
      .eq('id', user.id)
      .maybeSingle()

    // Release old handle if exists
    if (currentProfile?.handle) {
      await supabase
        .from('handle_claims')
        .delete()
        .eq('handle', currentProfile.handle)
    }

    // Claim new handle
    const { error: claimError } = await supabase
      .from('handle_claims')
      .insert({
        handle: normalizedHandle,
        user_id: user.id,
      })

    if (claimError) {
      return NextResponse.json(
        { error: 'Failed to claim handle' },
        { status: 500 }
      )
    }

    // Update profile with new handle
    const { error: updateError } = await supabase
      .from('profiles')
      .update({ handle: normalizedHandle })
      .eq('id', user.id)

    if (updateError) {
      // Rollback handle claim
      await supabase
        .from('handle_claims')
        .delete()
        .eq('handle', normalizedHandle)

      return NextResponse.json(
        { error: 'Failed to update profile' },
        { status: 500 }
      )
    }

    return NextResponse.json({
      success: true,
      handle: normalizedHandle,
      url: `${process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'}/${normalizedHandle}`,
    })
  } catch (error) {
    console.error('Handle claim error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
