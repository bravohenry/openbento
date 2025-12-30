/**
 * [INPUT]: None - Browser-side Supabase client creation
 * [OUTPUT]: SupabaseClient - Configured Supabase client for browser usage
 * [POS]: /src/lib/supabase/client.ts - Browser-side Supabase client utility
 * 
 * [PROTOCOL]:
 * 1. Once Supabase configuration changes, update this file immediately.
 * 2. After update, verify environment variables are properly set.
 */

import { createBrowserClient } from '@supabase/ssr'

export function createClient() {
  return createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  )
}
