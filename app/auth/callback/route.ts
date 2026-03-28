import { createClient } from '@/lib/supabase/server'
import { NextResponse } from 'next/server'

export async function GET(request: Request) {
  const requestUrl = new URL(request.url)
  const code = requestUrl.searchParams.get('code')

  if (code) {
    const supabase = createClient()
    await supabase.auth.exchangeCodeForSession(code)
    
    // Create user profile after successful confirmation
    const { data: { session } } = await supabase.auth.getSession()
    if (session) {
      // Check if profile exists
      const { data: existingProfile } = await supabase
        .from('profiles')
        .select('id')
        .eq('id', session.user.id)
        .single()
      
      if (!existingProfile) {
        // Create profile
        await supabase
          .from('profiles')
          .insert({
            id: session.user.id,
            email: session.user.email,
            full_name: session.user.user_metadata?.full_name || session.user.email?.split('@')[0],
          })
        
        // Create default settings
        await supabase
          .from('user_settings')
          .insert({
            user_id: session.user.id,
            brand_voice: 'Professional yet friendly and engaging',
            target_audience: 'Social media users interested in growth and marketing',
            content_preferences: { platforms: ['instagram', 'tiktok'] },
          })
      }
    }
  }

  // Redirect to dashboard after confirmation
  return NextResponse.redirect(new URL('/dashboard', request.url))
}