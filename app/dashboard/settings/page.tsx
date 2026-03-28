'use client'

import { useEffect, useState } from 'react'
import { createClient } from '@/lib/supabase/client'
import { Save } from 'lucide-react'

export default function Settings() {
  const [brandVoice, setBrandVoice] = useState('')
  const [targetAudience, setTargetAudience] = useState('')
  const [saving, setSaving] = useState(false)
  const supabase = createClient()

  useEffect(() => {
    loadSettings()
  }, [])

  const loadSettings = async () => {
    const { data: user } = await supabase.auth.getUser()
    if (user.user) {
      const { data } = await supabase
        .from('user_settings')
        .select('*')
        .eq('user_id', user.user.id)
        .single()
      
      if (data) {
        setBrandVoice(data.brand_voice || '')
        setTargetAudience(data.target_audience || '')
      }
    }
  }

  const saveSettings = async () => {
    setSaving(true)
    const { data: user } = await supabase.auth.getUser()
    
    if (user.user) {
      const { error } = await supabase
        .from('user_settings')
        .upsert({
          user_id: user.user.id,
          brand_voice: brandVoice,
          target_audience: targetAudience,
          updated_at: new Date().toISOString(),
        })
      
      if (!error) {
        alert('Settings saved!')
      } else {
        alert('Failed to save settings')
      }
    }
    setSaving(false)
  }

  return (
    <div className="max-w-2xl mx-auto">
      <h1 className="text-3xl font-bold mb-8">Settings</h1>
      
      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200 space-y-6">
        <div>
          <label className="block text-sm font-medium mb-2">
            Brand Voice
          </label>
          <textarea
            value={brandVoice}
            onChange={(e) => setBrandVoice(e.target.value)}
            placeholder="Describe your brand's voice. E.g., 'Professional yet approachable, uses humor, focuses on tech innovation'"
            rows={3}
            className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-500"
          />
          <p className="text-xs text-gray-500 mt-1">
            This helps our AI write content that sounds like you
          </p>
        </div>
        
        <div>
          <label className="block text-sm font-medium mb-2">
            Target Audience
          </label>
          <textarea
            value={targetAudience}
            onChange={(e) => setTargetAudience(e.target.value)}
            placeholder="Describe your target audience. E.g., 'Small business owners aged 25-40 interested in marketing'"
            rows={3}
            className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-500"
          />
          <p className="text-xs text-gray-500 mt-1">
            We'll tailor content to resonate with your audience
          </p>
        </div>
        
        <button
          onClick={saveSettings}
          disabled={saving}
          className="flex items-center gap-2 px-6 py-3 bg-purple-600 hover:bg-purple-700 text-white rounded-xl font-semibold transition disabled:opacity-50"
        >
          <Save className="h-4 w-4" />
          {saving ? 'Saving...' : 'Save Settings'}
        </button>
      </div>
    </div>
  )
}