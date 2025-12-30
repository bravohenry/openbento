/**
 * [INPUT]: GET request with handle in URL path
 * [OUTPUT]: JSON response with public layout data
 * [POS]: /src/app/api/bento/layout/public/[handle]/route.ts - Get public layout by handle
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

    // Find user by handle or username
    const { data: profile } = await supabase
      .from('profiles')
      .select('id')
      .or(`handle.eq.${handle.toLowerCase()},username.eq.${handle.toLowerCase()}`)
      .single()

    if (!profile) {
      return NextResponse.json(
        { error: 'User not found' },
        { status: 404 }
      )
    }

    // Get layout
    const { data: layout } = await supabase
      .from('bento_layouts')
      .select('widgets, desktop_layout, mobile_layout')
      .eq('user_id', profile.id)
      .single()

    return NextResponse.json({
      success: true,
      layout: layout || {
        widgets: [],
        desktop_layout: null,
        mobile_layout: null,
      },
    })
  } catch (error) {
    console.error('Get public layout error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
