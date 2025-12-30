/**
 * [INPUT]: GET/POST request
 * [OUTPUT]: JSON response with layout data
 * [POS]: /src/app/api/bento/layout/route.ts - Bento layout management endpoint
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

    const { data: layout, error } = await supabase
      .from('bento_layouts')
      .select('*')
      .eq('user_id', user.id)
      .single()

    if (error) {
      if (error.code === 'PGRST116') {
        // Layout doesn't exist, create default
        const { data: newLayout } = await supabase
          .from('bento_layouts')
          .insert({
            user_id: user.id,
            widgets: [],
            desktop_layout: null,
            mobile_layout: null,
          })
          .select()
          .single()

        return NextResponse.json({
          success: true,
          layout: newLayout || {
            widgets: [],
            desktop_layout: null,
            mobile_layout: null,
          },
        })
      }
      return NextResponse.json(
        { error: 'Failed to load layout' },
        { status: 500 }
      )
    }

    return NextResponse.json({
      success: true,
      layout: {
        widgets: layout.widgets || [],
        desktop_layout: layout.desktop_layout,
        mobile_layout: layout.mobile_layout,
        updated_at: layout.updated_at,
      },
    })
  } catch (error) {
    console.error('Get layout error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

export async function POST(request: Request) {
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
    const { widgets, desktop_layout, mobile_layout } = body

    // Validate widgets is an array
    if (widgets !== undefined && !Array.isArray(widgets)) {
      return NextResponse.json(
        { error: 'Widgets must be an array' },
        { status: 400 }
      )
    }

    // Upsert layout
    const { data: layout, error } = await supabase
      .from('bento_layouts')
      .upsert({
        user_id: user.id,
        widgets: widgets || [],
        desktop_layout: desktop_layout || null,
        mobile_layout: mobile_layout || null,
      })
      .select()
      .single()

    if (error) {
      return NextResponse.json(
        { error: 'Failed to save layout' },
        { status: 500 }
      )
    }

    return NextResponse.json({
      success: true,
      layout: {
        widgets: layout.widgets || [],
        desktop_layout: layout.desktop_layout,
        mobile_layout: layout.mobile_layout,
        updated_at: layout.updated_at,
      },
    })
  } catch (error) {
    console.error('Save layout error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
