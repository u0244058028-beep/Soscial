// app/page.tsx
'use client'

import { useState, useEffect } from 'react'
import { createClient } from '@/utils/supabase/client'
import Link from 'next/link'

export default function Home() {
  const [email, setEmail] = useState('')
  const [submitted, setSubmitted] = useState(false)
  const [count, setCount] = useState(1847) // Startverdi
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  
  const supabase = createClient()

  // Hent faktisk antall fra databasen
  useEffect(() => {
    const getCount = async () => {
      const { count: actualCount, error } = await supabase
        .from('waitlist')
        .select('*', { count: 'exact', head: true })
      
      if (!error && actualCount) {
        setCount(actualCount)
      }
    }
    
    getCount()

    // Oppdater telleren hvert 30. sekund
    const interval = setInterval(getCount, 30000)
    return () => clearInterval(interval)
  }, [supabase])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    
    // Sjekk at epost er gyldig
    if (!email.includes('@') || !email.includes('.')) {
      setError('Please enter a valid email address')
      setLoading(false)
      return
    }
    
    // Lagre epost i Supabase
    const { error: insertError } = await supabase
      .from('waitlist')
      .insert([{ 
        email, 
        signed_up_at: new Date().toISOString(),
        referral_code: Math.random().toString(36).substring(2, 8) // Generer enkel kode
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
    <main className="min-h-screen bg-gradient-to-b from-indigo-50 via-white to-white">
      {/* Header */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 lg:py-20">
        
        {/* Logo og navigasjon */}
        <nav className="flex justify-between items-center mb-16">
          <div className="flex items-center gap-2">
            <span className="text-3xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
              My Social Bomb
            </span>
            <span className="text-xs font-medium bg-indigo-100 text-indigo-800 px-2 py-1 rounded-full">
              Beta
            </span>
          </div>
          
          <div className="flex items-center gap-4">
            <div className="text-sm text-gray-500 hidden sm:block">
              💣 {count.toLocaleString()} joined
            </div>
            <Link 
              href="/login" 
              className="text-gray-600 hover:text-gray-900 px-3 py-2 text-sm font-medium"
            >
              Log in
            </Link>
            <Link 
              href="/signup" 
              className="bg-indigo-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-indigo-700 transition"
            >
              Sign up
            </Link>
          </div>
        </nav>

        {/* Hero Section */}
        <div className="text-center mb-16 lg:mb-24">
          <div className="inline-block mb-6">
            <span className="bg-indigo-100 text-indigo-800 text-sm font-medium px-4 py-2 rounded-full">
              💣 The social platform where every follower pays you
            </span>
          </div>
          
          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-gray-900 mb-8 leading-tight">
            What if your followers
            <span className="block bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
              paid you every month?
            </span>
          </h1>
          
          <p className="text-xl sm:text-2xl text-gray-600 max-w-3xl mx-auto mb-12">
            Not ads. Not algorithms. Just real people, paying real people, 
            every single month. Designed so everyone can win.
          </p>

          {/* Email signup form */}
          {!submitted ? (
            <div className="max-w-md mx-auto">
              <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3">
                <input
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="flex-1 px-5 py-4 text-lg border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent bg-white shadow-sm"
                  disabled={loading}
                />
                <button
                  type="submit"
                  disabled={loading}
                  className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-8 py-4 rounded-xl text-lg font-semibold hover:from-indigo-700 hover:to-purple-700 transition-all transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg"
                >
                  {loading ? 'Adding...' : 'Get Early Access →'}
                </button>
              </form>
              
              {error && (
                <p className="mt-3 text-sm text-red-600 bg-red-50 p-3 rounded-lg">
                  ⚠️ {error}
                </p>
              )}
              
              <p className="mt-6 text-sm text-gray-500 flex items-center justify-center gap-2">
                <span className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse"></span>
                <span className="font-medium text-gray-700">{count.toLocaleString()} people</span>
                have already joined. Be one of them.
              </p>
            </div>
          ) : (
            <div className="max-w-md mx-auto bg-gradient-to-r from-green-50 to-emerald-50 p-8 rounded-2xl border border-green-100">
              <div className="text-5xl mb-4 animate-bounce">🎉</div>
              <h2 className="text-2xl font-bold text-green-800 mb-2">
                You're on the list!
              </h2>
              <p className="text-green-700 mb-6">
                We'll notify you when we launch. Your spot: #{count.toLocaleString()}
              </p>
              <div className="bg-white p-4 rounded-xl">
                <p className="text-sm text-gray-600 mb-2">
                  Share this link to move up the list:
                </p>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={`mysocialbomb.com/?ref=${Math.random().toString(36).substring(2, 8)}`}
                    readOnly
                    className="flex-1 px-3 py-2 bg-gray-50 rounded-lg text-sm"
                  />
                  <button
                    onClick={() => navigator.clipboard.writeText(`mysocialbomb.com/?ref=${Math.random().toString(36).substring(2, 8)}`)}
                    className="bg-gray-200 px-4 py-2 rounded-lg text-sm hover:bg-gray-300"
                  >
                    Copy
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* 3 enkle steg */}
        <div className="grid md:grid-cols-3 gap-8 mb-24">
          <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition">
            <div className="w-14 h-14 bg-indigo-100 rounded-xl flex items-center justify-center text-3xl mb-6">
              1️⃣
            </div>
            <h3 className="text-xl font-bold mb-3">Plant the bomb</h3>
            <p className="text-gray-600">
              Sign up for free. Get your unique invite link in seconds.
            </p>
          </div>
          
          <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition">
            <div className="w-14 h-14 bg-indigo-100 rounded-xl flex items-center justify-center text-3xl mb-6">
              2️⃣
            </div>
            <h3 className="text-xl font-bold mb-3">Light the fuse</h3>
            <p className="text-gray-600">
              Share your link. Friends & family join and follow you.
            </p>
          </div>
          
          <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition">
            <div className="w-14 h-14 bg-indigo-100 rounded-xl flex items-center justify-center text-3xl mb-6">
              3️⃣
            </div>
            <h3 className="text-xl font-bold mb-3">Watch it explode</h3>
            <p className="text-gray-600">
              Get paid $4/month for every follower. Plus team bonuses.
            </p>
          </div>
        </div>

        {/* Eksempel på inntekt */}
        <div className="bg-gradient-to-br from-gray-900 to-gray-800 text-white rounded-3xl p-8 lg:p-12 mb-24">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-block bg-indigo-500 text-white text-sm font-medium px-4 py-2 rounded-full mb-6">
                📈 REAL EXAMPLE
              </div>
              <h2 className="text-3xl lg:text-4xl font-bold mb-6">
                From $0 to $400+ per month
              </h2>
              <p className="text-gray-300 text-lg mb-8">
                Alex, 24, invited his classmates. They invited their friends. 
                Now his network pays him every month.
              </p>
              
              <div className="space-y-4">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 bg-indigo-500/20 rounded-full flex items-center justify-center">
                    👥
                  </div>
                  <div>
                    <div className="font-medium">Direct followers</div>
                    <div className="text-gray-400">32 people × $4 = $128/month</div>
                  </div>
                </div>
                
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 bg-purple-500/20 rounded-full flex items-center justify-center">
                    🌟
                  </div>
                  <div>
                    <div className="font-medium">Team bonus</div>
                    <div className="text-gray-400">5% of network = $47/month</div>
                  </div>
                </div>
                
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 bg-pink-500/20 rounded-full flex items-center justify-center">
                    💰
                  </div>
                  <div>
                    <div className="font-medium">Total monthly</div>
                    <div className="text-2xl font-bold text-green-400">$188/month</div>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="bg-gray-800 p-8 rounded-2xl border border-gray-700">
              <div className="text-center mb-6">
                <div className="text-5xl mb-2">💣</div>
                <div className="text-xl font-bold">Alex's Network</div>
                <div className="text-gray-400">600 people in his network</div>
              </div>
              <div className="space-y-3">
                <div className="h-3 bg-gray-700 rounded-full overflow-hidden">
                  <div className="h-full w-3/4 bg-gradient-to-r from-indigo-500 to-purple-500"></div>
                </div>
                <div className="flex justify-between text-sm text-gray-400">
                  <span>Level 1: 32</span>
                  <span>Level 2: 156</span>
                  <span>Level 3: 412</span>
                </div>
              </div>
              <p className="text-center text-sm text-gray-500 mt-6">
                The bigger your network, the more you earn.
              </p>
            </div>
          </div>
        </div>

        {/* FAQ */}
        <div className="max-w-3xl mx-auto mb-24">
          <h2 className="text-3xl lg:text-4xl font-bold text-center mb-12">
            ❓ Frequently asked
          </h2>
          
          <div className="space-y-6">
            <div className="bg-white p-6 rounded-xl border border-gray-200">
              <h3 className="font-bold text-lg mb-2">Do I have to pay to join?</h3>
              <p className="text-gray-600">No! It's completely free. You only earn money.</p>
            </div>
            
            <div className="bg-white p-6 rounded-xl border border-gray-200">
              <h3 className="font-bold text-lg mb-2">How do my followers pay me?</h3>
              <p className="text-gray-600">Each follower pays $6/month. You get $4, platform takes $1, fees are $1. Simple.</p>
            </div>
            
            <div className="bg-white p-6 rounded-xl border border-gray-200">
              <h3 className="font-bold text-lg mb-2">Is this a pyramid scheme?</h3>
              <p className="text-gray-600">Absolutely not. You pay nothing. You earn from people who follow you. It's social media, but you get paid.</p>
            </div>
            
            <div className="bg-white p-6 rounded-xl border border-gray-200">
              <h3 className="font-bold text-lg mb-2">When do I get paid?</h3>
              <p className="text-gray-600">Every month, directly to your bank account or PayPal.</p>
            </div>
          </div>
        </div>

        {/* Bunn-seksjon med ny signup */}
        <div className="text-center bg-gradient-to-r from-indigo-600 to-purple-600 rounded-3xl p-12">
          <h2 className="text-3xl lg:text-4xl font-bold text-white mb-4">
            Ready to explode?
          </h2>
          <p className="text-indigo-100 text-xl mb-8">
            Join the waitlist. Get early access + founder perks.
          </p>
          
          {!submitted ? (
            <form onSubmit={handleSubmit} className="max-w-md mx-auto flex flex-col sm:flex-row gap-3">
              <input
                type="email"
                placeholder="Your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="flex-1 px-5 py-4 rounded-xl text-lg bg-white/90 backdrop-blur border-0 focus:ring-2 focus:ring-white"
              />
              <button
                type="submit"
                disabled={loading}
                className="bg-white text-indigo-600 px-8 py-4 rounded-xl text-lg font-semibold hover:bg-gray-100 transition"
              >
                → Join
              </button>
            </form>
          ) : (
            <div className="text-white text-xl">
              🎉 You're on the list! Check your email for updates.
            </div>
          )}
          
          <p className="text-indigo-200 text-sm mt-6">
            💣 {count.toLocaleString()} already joined. Free forever.
          </p>
        </div>

        {/* Footer */}
        <footer className="text-center mt-16 text-gray-500 text-sm">
          <div className="flex justify-center gap-8 mb-4">
            <span>💣 Built for everyone</span>
            <span>•</span>
            <span>🇳🇴 Made in Norway</span>
            <span>•</span>
            <span>🚀 Launching soon</span>
          </div>
          <p>© 2024 My Social Bomb. All rights reserved.</p>
        </footer>
      </div>
    </main>
  )
}