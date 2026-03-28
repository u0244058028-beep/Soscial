import { createClient } from '@/lib/supabase/server'
import { NextResponse } from 'next/server'
import OpenAI from 'openai'

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
})

export async function POST(request: Request) {
  try {
    const supabase = createClient()
    const { data: { session } } = await supabase.auth.getSession()
    
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }
    
    const { prompt, platform, contentType, tone } = await request.json()
    
    // Fetch user's brand voice from settings
    const { data: settings } = await supabase
      .from('user_settings')
      .select('brand_voice')
      .eq('user_id', session.user.id)
      .single()
    
    // Generate content with OpenAI
    const completion = await openai.chat.completions.create({
      model: 'gpt-4',
      messages: [
        {
          role: 'system',
          content: `You are an expert social media content creator for ${platform}. 
          Create ${contentType} content that is engaging, viral-worthy, and optimized for ${platform}.
          Brand voice: ${settings?.brand_voice || 'Professional yet friendly'}
          Tone: ${tone || 'Engaging and authentic'}`
        },
        {
          role: 'user',
          content: prompt
        }
      ],
      temperature: 0.8,
      max_tokens: 500,
    })
    
    const generatedContent = completion.choices[0].message.content
    
    // Save to history
    const { data: saved } = await supabase
      .from('content_history')
      .insert({
        user_id: session.user.id,
        platform,
        content_type: contentType,
        original_prompt: prompt,
        generated_content: generatedContent,
      })
      .select()
      .single()
    
    return NextResponse.json({ 
      success: true, 
      content: generatedContent,
      id: saved.id 
    })
    
  } catch (error) {
    console.error('Generation error:', error)
    return NextResponse.json(
      { error: 'Failed to generate content' },
      { status: 500 }
    )
  }
}