import { createClient } from '@/lib/supabase/server'
import { NextResponse } from 'next/server'

export async function GET(request: Request) {
  const requestUrl = new URL(request.url)
  const code = requestUrl.searchParams.get('code')

  console.log('🔵 Callback route hit!', { code, url: request.url })

  if (code) {
    const supabase = createClient()
    const { data, error } = await supabase.auth.exchangeCodeForSession(code)
    
    console.log('🟢 Exchange result:', { data, error })
    
    if (data?.session) {
      // Create profile if it doesn't exist
      const { data: existingProfile } = await supabase
        .from('profiles')
        .select('id')
        .eq('id', data.session.user.id)
        .single()
      
      if (!existingProfile) {
        await supabase.from('profiles').insert({
          id: data.session.user.id,
          email: data.session.user.email,
          full_name: data.session.user.user_metadata?.full_name || data.session.user.email?.split('@')[0],
        })
        console.log('✅ Profile created')
      }
    }
  }

  // Redirect to dashboard after confirmation
  return NextResponse.redirect(new URL('/dashboard', request.url))
}