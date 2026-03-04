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
  const [userId, setUserId] = useState<string | null>(null)
  const [inviteLink, setInviteLink] = useState('')
  const [referrals, setReferrals] = useState(0)
  const [estimatedEarnings, setEstimatedEarnings] = useState(0)
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  })
  
  const supabase = createClient()
  const LAUNCH_DATE = new Date('2025-04-01T10:00:00Z') // 1. april 2025 kl 10:00 UTC

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
    const interval = setInterval(getLiveCount, 30000)
    return () => clearInterval(interval)
  }, [supabase])

  // Countdown timer
  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date().getTime()
      const distance = LAUNCH_DATE.getTime() - now

      if (distance < 0) {
        clearInterval(timer)
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 })
      } else {
        setTimeLeft({
          days: Math.floor(distance / (1000 * 60 * 60 * 24)),
          hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((distance % (1000 * 60)) / 1000)
        })
      }
    }, 1000)

    return () => clearInterval(timer)
  }, [])

  // Sjekk om bruker er logget inn (har vervingslenke)
  useEffect(() => {
    const checkUser = async () => {
      const { data: { user } } = await supabase.auth.getUser()
      if (user) {
        setUserId(user.id)
        
        // Hent brukerens invite code
        const { data: profile } = await supabase
          .from('profiles')
          .select('invite_code, username')
          .eq('id', user.id)
          .single()
        
        if (profile) {
          setInviteLink(`https://mysocialbomb.com/signup?ref=${profile.invite_code}`)
          
          // Hent antall vervinger
          const { count: referralCount } = await supabase
            .from('waitlist')
            .select('*', { count: 'exact', head: true })
            .eq('referred_by', profile.invite_code)
          
          setReferrals(referralCount || 0)
          setEstimatedEarnings((referralCount || 0) * 4) // $4 per følger ved launch
        }
      }
    }
    
    checkUser()
  }, [supabase])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    
    if (!email.includes('@') || !email.includes('.')) {
      setError('Please enter a valid email')
      setLoading(false)
      return
    }
    
    // Generer referral code
    const referralCode = Math.random().toString(36).substring(2, 10)
    
    // Lagre i Supabase
    const { data, error: insertError } = await supabase
      .from('waitlist')
      .insert([{ 
        email, 
        signed_up_at: new Date().toISOString(),
        referral_code: referralCode,
        referred_by: new URLSearchParams(window.location.search).get('ref') || null
      }])
      .select()
      .single()

    if (insertError) {
      if (insertError.message.includes('duplicate')) {
        setError('This email is already on the list!')
      } else {
        setError('Something went wrong. Please try again.')
      }
      setLoading(false)
    } else {
      // Send bekreftelsesepost med referral link
      try {
        await fetch('/api/send-confirmation', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ 
            email, 
            position: data.id,
            referralLink: `https://mysocialbomb.com/signup?ref=${referralCode}`
          })
        })
      } catch (err) {
        console.error('Failed to send email:', err)
      }
      
      setSubmitted(true)
      setLoading(false)
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

        {/* Hero med COUNTDOWN */}
        <div className="text-center mb-16">
          <div className="inline-block bg-indigo-100 text-indigo-800 text-sm px-4 py-2 rounded-full mb-6">
            ⚡️ Launching April 1st, 2025
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

          {/* COUNTDOWN */}
          <div className="flex justify-center gap-4 mb-10">
            <div className="bg-white p-4 rounded-xl shadow-sm min-w-[80px]">
              <div className="text-3xl font-bold text-indigo-600">{timeLeft.days}</div>
              <div className="text-xs text-gray-500">DAYS</div>
            </div>
            <div className="bg-white p-4 rounded-xl shadow-sm min-w-[80px]">
              <div className="text-3xl font-bold text-indigo-600">{timeLeft.hours}</div>
              <div className="text-xs text-gray-500">HOURS</div>
            </div>
            <div className="bg-white p-4 rounded-xl shadow-sm min-w-[80px]">
              <div className="text-3xl font-bold text-indigo-600">{timeLeft.minutes}</div>
              <div className="text-xs text-gray-500">MINUTES</div>
            </div>
            <div className="bg-white p-4 rounded-xl shadow-sm min-w-[80px]">
              <div className="text-3xl font-bold text-indigo-600">{timeLeft.seconds}</div>
              <div className="text-xs text-gray-500">SECONDS</div>
            </div>
          </div>

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
                {count.toLocaleString()} people already joined. Get your referral link.
              </p>
            </div>
          ) : (
            <div className="bg-green-50 p-6 rounded-xl max-w-md mx-auto">
              <div className="text-4xl mb-2">🎉</div>
              <p className="text-green-800 font-medium">You're #{count.toLocaleString()} on the list!</p>
              <p className="text-sm text-green-600 mt-1">Check your email for your personal referral link.</p>
            </div>
          )}
        </div>

        {/* REFERRAL DASHBOARD (vises kun når logget inn) */}
        {userId && (
          <div className="bg-gradient-to-r from-indigo-600 to-purple-600 rounded-2xl p-8 mb-16 text-white">
            <h2 className="text-2xl font-bold mb-4">💣 Your Referral Dashboard</h2>
            
            <div className="grid md:grid-cols-3 gap-6 mb-6">
              <div className="bg-white/10 backdrop-blur p-6 rounded-xl">
                <div className="text-sm opacity-80 mb-1">Your referrals</div>
                <div className="text-3xl font-bold">{referrals}</div>
              </div>
              <div className="bg-white/10 backdrop-blur p-6 rounded-xl">
                <div className="text-sm opacity-80 mb-1">Estimated earnings at launch</div>
                <div className="text-3xl font-bold">${estimatedEarnings}/month</div>
              </div>
              <div className="bg-white/10 backdrop-blur p-6 rounded-xl">
                <div className="text-sm opacity-80 mb-1">Waitlist position</div>
                <div className="text-3xl font-bold">#{count - referrals + 1}</div>
              </div>
            </div>
            
            <div className="bg-white/10 backdrop-blur p-6 rounded-xl">
              <p className="text-sm opacity-80 mb-2">Your personal referral link:</p>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={inviteLink}
                  readOnly
                  className="flex-1 px-4 py-3 rounded-lg text-gray-900 bg-white"
                />
                <button
                  onClick={() => {
                    navigator.clipboard.writeText(inviteLink)
                    alert('Copied!')
                  }}
                  className="bg-white text-indigo-600 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100"
                >
                  Copy
                </button>
              </div>
              <p className="text-sm opacity-80 mt-3">
                ⚡️ For each friend who joins, you move up the waitlist and earn $4/month after launch!
              </p>
            </div>
          </div>
        )}

        {/* Hvordan det fungerer */}
        <div className="grid md:grid-cols-3 gap-6 mb-16">
          <div className="bg-white p-6 rounded-xl shadow-sm border">
            <div className="text-3xl mb-3">1️⃣</div>
            <h3 className="font-bold text-lg mb-2">Join the waitlist</h3>
            <p className="text-gray-600 text-sm">
              Get your personal referral link. Share it with friends.
            </p>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-sm border">
            <div className="text-3xl mb-3">2️⃣</div>
            <h3 className="font-bold text-lg mb-2">They follow you</h3>
            <p className="text-gray-600 text-sm">
              When friends join with your link, they automatically follow you at launch.
            </p>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-sm border">
            <div className="text-3xl mb-3">3️⃣</div>
            <h3 className="font-bold text-lg mb-2">Earn $4/month each</h3>
            <p className="text-gray-600 text-sm">
              Every follower = $4/month. Paid forever. Simple.
            </p>
          </div>
        </div>

        {/* Eksempel - viser potensial */}
        <div className="bg-gray-900 text-white rounded-2xl p-8 mb-16">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div>
              <div className="text-indigo-300 text-sm mb-2">📈 EXAMPLE</div>
              <h3 className="text-2xl font-bold mb-4">From 0 to $400/month</h3>
              <p className="text-gray-300 mb-6">
                Sarah joined the waitlist in week 1. She shared her link and got 47 friends to join. 
                At launch, she starts with 47 followers = $188/month.
              </p>
              <div className="space-y-3">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-400">47 followers × $4:</span>
                  <span className="font-medium">$188/month</span>
                </div>
                <div className="h-2 bg-gray-700 rounded-full overflow-hidden">
                  <div className="h-full w-3/4 bg-gradient-to-r from-indigo-500 to-purple-500"></div>
                </div>
                <p className="text-xs text-gray-500">
                  The earlier you join and share, the more followers you'll have at launch.
                </p>
              </div>
            </div>
            <div className="bg-gray-800 p-6 rounded-xl text-center">
              <div className="text-5xl mb-2">👤</div>
              <div className="font-medium">@sarah_creates</div>
              <div className="text-sm text-gray-400">47 followers at launch</div>
              <div className="text-2xl font-bold text-green-400 mt-2">$188/mo</div>
            </div>
          </div>
        </div>

        {/* Login-knapp for å se dashboard */}
        {!userId && (
          <div className="text-center mb-12">
            <p className="text-gray-600 mb-3">Already on the waitlist?</p>
            <Link 
              href="/login" 
              className="bg-white text-indigo-600 px-6 py-3 rounded-lg font-semibold border border-indigo-200 hover:bg-indigo-50"
            >
              Log in to see your referrals →
            </Link>
          </div>
        )}

        {/* Footer */}
        <div className="text-center">
          <div className="flex items-center justify-center gap-2 text-sm text-gray-500">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
            </span>
            {count.toLocaleString()} people on the waitlist · Launching April 1st
          </div>
          <p className="text-xs text-gray-400 mt-6">© 2025 My Social Bomb · Built in Norway 🇳🇴</p>
        </div>
      </div>
    </main>
  )
}