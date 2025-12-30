/**
 * [INPUT]: GET request with ?handle=xxx query parameter
 * [OUTPUT]: JSON response with availability status
 * [POS]: /src/app/api/handles/check/route.ts - Check handle availability
 */

import { NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'
import { validateHandle } from '@/lib/validators'

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const handle = searchParams.get('handle')

    if (!handle) {
      return NextResponse.json(
        { error: 'Handle parameter is required' },
        { status: 400 }
      )
    }

    // Validate handle format
    const validation = validateHandle(handle.toLowerCase())
    if (!validation.valid) {
      return NextResponse.json(
        { available: false, error: validation.error },
        { status: 200 }
      )
    }

    const supabase = await createClient()

    // Check if handle exists
    const { data: existingClaim } = await supabase
      .from('handle_claims')
      .select('handle')
      .eq('handle', handle.toLowerCase())
      .single()

    return NextResponse.json({
      available: !existingClaim,
      handle: handle.toLowerCase(),
    })
  } catch (error) {
    console.error('Handle check error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
