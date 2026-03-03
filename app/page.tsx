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
        
        {/* Enkel header */}
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

        {/* Hero - 3 sekunder forståelse */}
        <div className="text-center mb-16">
          <div className="inline-block bg-indigo-100 text-indigo-800 text-sm px-4 py-2 rounded-full mb-6">
            ⚡️ Launching soon
          </div>
          
          <h1 className="text-5xl font-bold text-gray-900 mb-6">
            What if every follower
            <span className="block bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
              paid you $4/month?
            </span>
          </h1>
          
          <p className="text-xl text-gray-600 max-w-2xl mx-auto mb-10">
            Not ads. No algorithms. Just real people paying real people.
          </p>

          {/* Enkel epost-signup */}
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
                  {loading ? '...' : 'Get early access'}
                </button>
              </form>
              <p className="text-sm text-gray-500 mt-3">
                ✅ Free forever. No spam.
              </p>
            </div>
          ) : (
            <div className="bg-green-50 p-6 rounded-xl max-w-md mx-auto">
              <div className="text-4xl mb-2">🎉</div>
              <p className="text-green-800 font-medium">You're on the list!</p>
              <p className="text-sm text-green-600 mt-1">We'll notify you at launch.</p>
            </div>
          )}
        </div>

        {/* 3-punkts forklaring - KJERNEN */}
        <div className="grid md:grid-cols-3 gap-6 mb-16">
          <div className="bg-white p-6 rounded-xl shadow-sm border">
            <div className="text-3xl mb-3">1️⃣</div>
            <h3 className="font-bold text-lg mb-2">Get your link</h3>
            <p className="text-gray-600 text-sm">Sign up free. Get a unique invite link.</p>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-sm border">
            <div className="text-3xl mb-3">2️⃣</div>
            <h3 className="font-bold text-lg mb-2">Invite friends</h3>
            <p className="text-gray-600 text-sm">They join using your link → they follow you.</p>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-sm border">
            <div className="text-3xl mb-3">3️⃣</div>
            <h3 className="font-bold text-lg mb-2">Earn monthly</h3>
            <p className="text-gray-600 text-sm">$4/month per follower. Paid forever.</p>
          </div>
        </div>

        {/* Eksempel - viser at det funker */}
        <div className="bg-gray-900 text-white rounded-2xl p-8 mb-16">
          <div className="flex items-center gap-2 text-indigo-300 text-sm mb-4">
            <span>📈</span> REAL EXAMPLE
          </div>
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div>
              <h3 className="text-2xl font-bold mb-4">From $0 → $188/month</h3>
              <p className="text-gray-300 mb-4">Alex invited 32 friends. They invited more. Now 600 people in his network.</p>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-400">Direct followers:</span>
                  <span className="font-medium">32 × $4 = $128</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Team bonus:</span>
                  <span className="font-medium">+$47</span>
                </div>
                <div className="flex justify-between text-lg font-bold border-t border-gray-700 pt-2 mt-2">
                  <span>Total monthly:</span>
                  <span className="text-green-400">$188</span>
                </div>
              </div>
            </div>
            <div className="bg-gray-800 p-6 rounded-xl">
              <div className="text-4xl text-center mb-2">💣</div>
              <div className="text-center text-sm text-gray-400">Alex's network: 600 people</div>
            </div>
          </div>
        </div>

        {/* FAQ - kort og presist */}
        <div className="max-w-2xl mx-auto mb-12">
          <h3 className="text-xl font-bold text-center mb-6">Quick answers</h3>
          <div className="space-y-4">
            <div className="bg-white p-4 rounded-lg border">
              <p className="font-medium mb-1">💸 How do I get paid?</p>
              <p className="text-sm text-gray-600">Followers pay $6/month. You get $4, we take $1, fees $1.</p>
            </div>
            <div className="bg-white p-4 rounded-lg border">
              <p className="font-medium mb-1">🚫 Is this a pyramid scheme?</p>
              <p className="text-sm text-gray-600">No. You pay nothing. You earn from people who follow you.</p>
            </div>
            <div className="bg-white p-4 rounded-lg border">
              <p className="font-medium mb-1">📅 When do you launch?</p>
              <p className="text-sm text-gray-600">Soon. Join the waitlist, we'll email you.</p>
            </div>
          </div>
        </div>

        {/* Footer med bare epost-felt */}
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