// app/page.tsx
'use client'

import { useState, useEffect } from 'react'
import { createClient } from '@/utils/supabase/client'
import Link from 'next/link'

export default function Home() {
  const [email, setEmail] = useState('')
  const [submitted, setSubmitted] = useState(false)
  const [count, setCount] = useState(1247)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  
  const supabase = createClient()

  useEffect(() => {
    const getCount = async () => {
      const { count } = await supabase
        .from('waitlist')
        .select('*', { count: 'exact', head: true })
      if (count) setCount(count)
    }
    getCount()
  }, [])

  return (
    <main className="min-h-screen bg-gradient-to-b from-indigo-50 to-white">
      <div className="max-w-6xl mx-auto px-4 py-12">
        
        {/* Header */}
        <div className="flex justify-between items-center mb-16">
          <div className="flex items-center gap-2">
            <span className="text-2xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
              My Social Bomb
            </span>
          </div>
          <div className="text-sm text-gray-500">
            💣 {count.toLocaleString()} on waitlist
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
              <form onSubmit={async (e) => {
                e.preventDefault()
                setLoading(true)
                const { error } = await supabase
                  .from('waitlist')
                  .insert([{ email }])
                if (!error) {
                  setSubmitted(true)
                  setCount(prev => prev + 1)
                }
                setLoading(false)
              }} className="flex gap-2">
                <input
                  type="email"
                  placeholder="Your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="flex-1 px-4 py-3 border rounded-lg focus:ring-2 focus:ring-indigo-500"
                />
                <button
                  type="submit"
                  disabled={loading}
                  className="bg-indigo-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-indigo-700"
                >
                  {loading ? '...' : 'Join waitlist'}
                </button>
              </form>
              <p className="text-sm text-gray-500 mt-3">
                ✅ Free to join. We'll notify you at launch.
              </p>
            </div>
          ) : (
            <div className="bg-green-50 p-6 rounded-xl max-w-md mx-auto">
              <div className="text-4xl mb-2">🎉</div>
              <p className="text-green-800 font-medium">You're on the list!</p>
              <p className="text-sm text-green-600 mt-1">We'll email you when we launch.</p>
            </div>
          )}
        </div>

        {/* Hvordan det fungerer - MED DEN UNIKE MEKANIKKEN */}
        <div className="grid md:grid-cols-3 gap-6 mb-16">
          <div className="bg-white p-6 rounded-xl shadow-sm border">
            <div className="text-3xl mb-3">1️⃣</div>
            <h3 className="font-bold text-lg mb-2">Sign up & choose who to follow</h3>
            <p className="text-gray-600 text-sm">
              When you join, you pick someone to follow. Your $4/month supports them directly.
            </p>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-sm border">
            <div className="text-3xl mb-3">2️⃣</div>
            <h3 className="font-bold text-lg mb-2">Share your profile</h3>
            <p className="text-gray-600 text-sm">
              Post updates, photos, and connect. When others follow you, they support you.
            </p>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-sm border">
            <div className="text-3xl mb-3">3️⃣</div>
            <h3 className="font-bold text-lg mb-2">Get paid monthly</h3>
            <p className="text-gray-600 text-sm">
              Every follower = $4/month. Direct deposit. No middlemen.
            </p>
          </div>
        </div>

        {/* Eksempel - viser begge sider */}
        <div className="bg-gray-900 text-white rounded-2xl p-8 mb-16">
          <div className="grid md:grid-cols-2 gap-8">
            {/* Som følger */}
            <div>
              <div className="flex items-center gap-2 text-indigo-300 text-sm mb-4">
                <span>👤</span> AS A FOLLOWER
              </div>
              <div className="bg-gray-800 p-6 rounded-xl">
                <p className="mb-3">"I follow 5 creators I love. It costs me $20/month – less than Netflix. They get $16."</p>
                <p className="text-sm text-gray-400">— Maria, 28</p>
              </div>
            </div>
            {/* Som skaper */}
            <div>
              <div className="flex items-center gap-2 text-indigo-300 text-sm mb-4">
                <span>🎨</span> AS A CREATOR
              </div>
              <div className="bg-gray-800 p-6 rounded-xl">
                <p className="mb-3">"I have 47 followers. That's $188/month for doing what I love."</p>
                <p className="text-sm text-gray-400">— Alex, 24, student</p>
              </div>
            </div>
          </div>
        </div>

        {/* Enkel FAQ */}
        <div className="max-w-2xl mx-auto mb-12">
          <h3 className="text-xl font-bold text-center mb-6">Quick questions</h3>
          <div className="space-y-4">
            <div className="bg-white p-4 rounded-lg border">
              <p className="font-medium mb-1">💵 How do I get paid?</p>
              <p className="text-sm text-gray-600">Your followers pay $6/month. You receive $4, platform fees are $2.</p>
            </div>
            <div className="bg-white p-4 rounded-lg border">
              <p className="font-medium mb-1">🤔 Do I have to pay to join?</p>
              <p className="text-sm text-gray-600">No! It's free. You only pay when you choose to follow someone.</p>
            </div>
            <div className="bg-white p-4 rounded-lg border">
              <p className="font-medium mb-1">📅 When do you launch?</p>
              <p className="text-sm text-gray-600">Soon. Join the waitlist and we'll email you.</p>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="text-center">
          {!submitted ? (
            <form onSubmit={async (e) => {
              e.preventDefault()
              setLoading(true)
              const { error } = await supabase
                .from('waitlist')
                .insert([{ email }])
              if (!error) {
                setSubmitted(true)
                setCount(prev => prev + 1)
              }
              setLoading(false)
            }} className="max-w-md mx-auto flex gap-2">
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
            <p className="text-green-600">✓ You're on the list! We'll be in touch.</p>
          )}
          <p className="text-xs text-gray-400 mt-6">© 2024 My Social Bomb · Built in Norway 🇳🇴</p>
        </div>
      </div>
    </main>
  )
}