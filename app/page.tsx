// app/page.tsx
'use client'

import { useState, useEffect } from 'react'
import { createClient } from '@/utils/supabase/client'
import Link from 'next/link'

export default function Home() {
  const [email, setEmail] = useState('')
  const [submitted, setSubmitted] = useState(false)
  const [count, setCount] = useState(0)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  
  const supabase = createClient()

  // Hent LIVE telling fra databasen
  useEffect(() => {
    const getLiveCount = async () => {
      const { count: liveCount, error } = await supabase
        .from('waitlist')
        .select('*', { count: 'exact', head: true })
      
      if (!error && liveCount !== null) {
        setCount(liveCount)
      }
    }
    
    getLiveCount()

    // Oppdater hvert 30. sekund (føles live)
    const interval = setInterval(getLiveCount, 30000)
    return () => clearInterval(interval)
  }, [supabase])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    
    // Valider epost
    if (!email.includes('@') || !email.includes('.')) {
      setError('Please enter a valid email')
      setLoading(false)
      return
    }
    
    // Lagre i Supabase
    const { error: insertError } = await supabase
      .from('waitlist')
      .insert([{ 
        email, 
        signed_up_at: new Date().toISOString() 
      }])

    if (insertError) {
      if (insertError.message.includes('duplicate')) {
        setError('This email is already on the list!')
      } else {
        setError('Something went wrong. Please try again.')
      }
      setLoading(false)
    } else {
      setSubmitted(true)
      setLoading(false)
      // Oppdater telleren umiddelbart
      setCount(prev => prev + 1)
    }
  }

  return (
    <main className="min-h-screen bg-gradient-to-b from-indigo-50 to-white">
      <div className="max-w-6xl mx-auto px-4 py-12">
        
        {/* Header med LIVE teller */}
        <div className="flex justify-between items-center mb-16">
          <div className="flex items-center gap-2">
            <span className="text-2xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
              My Social Bomb
            </span>
          </div>
          <div className="flex items-center gap-2 bg-indigo-50 px-4 py-2 rounded-full">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
            </span>
            <span className="text-sm font-medium text-indigo-800">
              {count.toLocaleString()} on waitlist
            </span>
          </div>
        </div>

        {/* Hero */}
        <div className="text-center mb-16">
          <div className="inline-block bg-indigo-100 text-indigo-800 text-sm px-4 py-2 rounded-full mb-6">
            ⚡️ The first social platform where followers pay you
          </div>
          
          <h1 className="text-5xl font-bold text-gray-900 mb-6">
            What if every follower
            <span className="block bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
              paid you $4/month?
            </span>
          </h1>
          
          <p className="text-xl text-gray-600 max-w-2xl mx-auto mb-10">
            No ads. No algorithms. Just real people choosing to support the creators they love.
          </p>

          {/* Epost-signup */}
          {!submitted ? (
            <div className="max-w-md mx-auto">
              <form onSubmit={handleSubmit} className="flex gap-2">
                <input
                  type="email"
                  placeholder="Your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="flex-1 px-4 py-3 border rounded-lg focus:ring-2 focus:ring-indigo-500"
                  disabled={loading}
                />
                <button
                  type="submit"
                  disabled={loading}
                  className="bg-indigo-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-indigo-700 disabled:opacity-50"
                >
                  {loading ? '...' : 'Join waitlist'}
                </button>
              </form>
              
              {error && (
                <p className="text-sm text-red-600 mt-2">{error}</p>
              )}
              
              <p className="text-sm text-gray-500 mt-3 flex items-center justify-center gap-1">
                <span className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse"></span>
                {count.toLocaleString()} people already joined. Be next.
              </p>
            </div>
          ) : (
            <div className="bg-green-50 p-6 rounded-xl max-w-md mx-auto">
              <div className="text-4xl mb-2">🎉</div>
              <p className="text-green-800 font-medium">You're #{count.toLocaleString()} on the list!</p>
              <p className="text-sm text-green-600 mt-1">We'll email you at launch.</p>
            </div>
          )}
        </div>

        {/* Hvordan det fungerer */}
        <div className="grid md:grid-cols-3 gap-6 mb-16">
          <div className="bg-white p-6 rounded-xl shadow-sm border">
            <div className="text-3xl mb-3">1️⃣</div>
            <h3 className="font-bold text-lg mb-2">Sign up & choose who to follow</h3>
            <p className="text-gray-600 text-sm">
              When you join, you pick someone to support with $4/month.
            </p>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-sm border">
            <div className="text-3xl mb-3">2️⃣</div>
            <h3 className="font-bold text-lg mb-2">Share your profile</h3>
            <p className="text-gray-600 text-sm">
              Post updates. When others follow you, they support you.
            </p>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-sm border">
            <div className="text-3xl mb-3">3️⃣</div>
            <h3 className="font-bold text-lg mb-2">Get paid monthly</h3>
            <p className="text-gray-600 text-sm">
              Every follower = $4/month. Direct deposit.
            </p>
          </div>
        </div>

        {/* Eksempel - to sider */}
        <div className="bg-gray-900 text-white rounded-2xl p-8 mb-16">
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <div className="flex items-center gap-2 text-indigo-300 text-sm mb-4">
                <span>👤</span> AS A FOLLOWER
              </div>
              <div className="bg-gray-800 p-6 rounded-xl">
                <p className="mb-3">"I follow 5 creators I love. It costs me $20/month – less than Netflix."</p>
                <p className="text-sm text-gray-400">— Maria, 28</p>
              </div>
            </div>
            <div>
              <div className="flex items-center gap-2 text-indigo-300 text-sm mb-4">
                <span>🎨</span> AS A CREATOR
              </div>
              <div className="bg-gray-800 p-6 rounded-xl">
                <p className="mb-3">"47 followers = $188/month for doing what I love."</p>
                <p className="text-sm text-gray-400">— Alex, 24</p>
              </div>
            </div>
          </div>
        </div>

        {/* Footer med epost */}
        <div className="text-center">
          {!submitted ? (
            <form onSubmit={handleSubmit} className="max-w-md mx-auto flex gap-2">
              <input
                type="email"
                placeholder="Your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="flex-1 px-4 py-3 border rounded-lg"
              />
              <button className="bg-indigo-600 text-white px-6 py-3 rounded-lg font-semibold">
                Join
              </button>
            </form>
          ) : (
            <p className="text-green-600">✓ You're #{count.toLocaleString()}! We'll email you.</p>
          )}
          
          {/* LIVE teller i footer også */}
          <div className="flex items-center justify-center gap-2 mt-4 text-sm text-gray-500">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
            </span>
            {count.toLocaleString()} people on the waitlist
          </div>
          
          <p className="text-xs text-gray-400 mt-6">© 2024 My Social Bomb · Built in Norway 🇳🇴</p>
        </div>
      </div>
    </main>
  )
}