'use client'

import { useState } from 'react'
import { createClient } from '@/lib/supabase/client'
import { Sparkles, Copy, Check, Instagram, Music2, Linkedin, Facebook } from 'lucide-react'

const platforms = [
  { id: 'instagram', name: 'Instagram', icon: Instagram },
  { id: 'tiktok', name: 'TikTok', icon: Music2 },
  { id: 'linkedin', name: 'LinkedIn', icon: Linkedin },
  { id: 'facebook', name: 'Facebook', icon: Facebook },
]

const contentTypes = [
  { id: 'post', name: 'Post' },
  { id: 'caption', name: 'Caption' },
  { id: 'story', name: 'Story' },
  { id: 'reel', name: 'Reel Script' },
]

const tones = [
  'Professional',
  'Casual',
  'Funny',
  'Inspirational',
  'Educational',
  'Controversial',
]

export default function GenerateContent() {
  const [platform, setPlatform] = useState('instagram')
  const [contentType, setContentType] = useState('post')
  const [tone, setTone] = useState('Casual')
  const [prompt, setPrompt] = useState('')
  const [loading, setLoading] = useState(false)
  const [generated, setGenerated] = useState('')
  const [copied, setCopied] = useState(false)
  
  const supabase = createClient()
  
  const handleGenerate = async () => {
    if (!prompt.trim()) {
      alert('Please enter a topic or idea')
      return
    }
    
    setLoading(true)
    
    const response = await fetch('/api/generate', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        prompt,
        platform,
        contentType,
        tone,
      }),
    })
    
    const data = await response.json()
    
    if (data.success) {
      setGenerated(data.content)
    } else {
      alert('Failed to generate content. Please try again.')
    }
    
    setLoading(false)
  }
  
  const copyToClipboard = () => {
    navigator.clipboard.writeText(generated)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }
  
  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-8">Generate AI Content</h1>
      
      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200 mb-8">
        {/* Platform selector */}
        <div className="mb-6">
          <label className="block text-sm font-medium mb-2">Platform</label>
          <div className="grid grid-cols-4 gap-2">
            {platforms.map((p) => (
              <button
                key={p.id}
                onClick={() => setPlatform(p.id)}
                className={`p-3 rounded-lg border transition-all ${
                  platform === p.id
                    ? 'border-purple-500 bg-purple-50 text-purple-600'
                    : 'border-gray-200 hover:border-purple-200'
                }`}
              >
                <p.icon className="h-5 w-5 mx-auto mb-1" />
                <span className="text-sm">{p.name}</span>
              </button>
            ))}
          </div>
        </div>
        
        {/* Content type */}
        <div className="mb-6">
          <label className="block text-sm font-medium mb-2">Content Type</label>
          <div className="flex gap-2">
            {contentTypes.map((type) => (
              <button
                key={type.id}
                onClick={() => setContentType(type.id)}
                className={`px-4 py-2 rounded-lg border transition-all ${
                  contentType === type.id
                    ? 'border-purple-500 bg-purple-50 text-purple-600'
                    : 'border-gray-200 hover:border-purple-200'
                }`}
              >
                {type.name}
              </button>
            ))}
          </div>
        </div>
        
        {/* Tone */}
        <div className="mb-6">
          <label className="block text-sm font-medium mb-2">Tone</label>
          <div className="flex flex-wrap gap-2">
            {tones.map((t) => (
              <button
                key={t}
                onClick={() => setTone(t)}
                className={`px-3 py-1 rounded-full text-sm transition-all ${
                  tone === t
                    ? 'bg-purple-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {t}
              </button>
            ))}
          </div>
        </div>
        
        {/* Prompt */}
        <div className="mb-6">
          <label className="block text-sm font-medium mb-2">
            What do you want to post about?
          </label>
          <textarea
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder="E.g., '5 tips for growing on Instagram', 'Our new product launch', 'Behind the scenes of our office'"
            rows={3}
            className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-500"
          />
        </div>
        
        {/* Generate button */}
        <button
          onClick={handleGenerate}
          disabled={loading}
          className="w-full py-3 bg-gradient-to-r from-purple-600 to-blue-600 text-white font-semibold rounded-xl flex items-center justify-center gap-2 hover:shadow-lg transition disabled:opacity-50"
        >
          {loading ? (
            'Generating...'
          ) : (
            <>
              <Sparkles className="h-5 w-5" />
              Generate Content
            </>
          )}
        </button>
      </div>
      
      {/* Generated content */}
      {generated && (
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold">Generated {contentType}</h2>
            <button
              onClick={copyToClipboard}
              className="flex items-center gap-2 text-purple-600 hover:text-purple-700"
            >
              {copied ? <Check className="h-5 w-5" /> : <Copy className="h-5 w-5" />}
              {copied ? 'Copied!' : 'Copy'}
            </button>
          </div>
          <div className="prose max-w-none">
            <p className="text-gray-700 whitespace-pre-wrap">{generated}</p>
          </div>
        </div>
      )}
    </div>
  )
}