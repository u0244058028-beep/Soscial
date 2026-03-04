'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { createClient } from '@/utils/supabase/client'

export default function WaitlistDashboard() {
  const [loading, setLoading] = useState(true)
  const [email, setEmail] = useState('')
  const [entry, setEntry] = useState<any>(null)
  const [referrals, setReferrals] = useState(0)
  const [inviteLink, setInviteLink] = useState('')
  const [estimatedEarnings, setEstimatedEarnings] = useState(0)
  const router = useRouter()
  const supabase = createClient()

  useEffect(() => {
    // Sjekk om bruker er "logget inn" via session
    const isLoggedIn = sessionStorage.getItem('waitlist_logged_in')
    const userEmail = sessionStorage.getItem('waitlist_user_email')
    
    if (!isLoggedIn || !userEmail) {
      router.push('/login/waitlist')
      return
    }

    setEmail(userEmail)
    loadData(userEmail)
  }, [])

  const loadData = async (userEmail: string) => {
    // Hent waitlist-entry
    const { data: entry } = await supabase
      .from('waitlist')
      .select('*')
      .eq('email', userEmail)
      .single()

    if (entry) {
      setEntry(entry)
      setInviteLink(`https://mysocialbomb.com/?ref=${entry.referral_code}`)
      
      // Hent antall vervinger
      const { count } = await supabase
        .from('waitlist')
        .select('*', { count: 'exact', head: true })
        .eq('referred_by', entry.referral_code)
      
      setReferrals(count || 0)
      setEstimatedEarnings((count || 0) * 4)
    }

    setLoading(false)
  }

  const handleLogout = () => {
    sessionStorage.removeItem('waitlist_logged_in')
    sessionStorage.removeItem('waitlist_user_email')
    router.push('/')
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600" />
      </div>
    )
  }

  if (!entry) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-xl font-bold mb-2">Not found</h2>
          <p className="text-gray-600 mb-4">No waitlist entry found for {email}</p>
          <Link href="/" className="text-indigo-600 hover:underline">
            Join the waitlist →
          </Link>
        </div>
      </div>
    )
  }

  return (
    <main className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 py-12">
        
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <Link href="/">
            <h1 className="text-2xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
              My Social Bomb
            </h1>
          </Link>
          <button
            onClick={handleLogout}
            className="text-gray-600 hover:text-gray-900"
          >
            Logout
          </button>
        </div>

        {/* Dashboard */}
        <div className="bg-gradient-to-r from-indigo-600 to-purple-600 rounded-2xl p-8 mb-8 text-white">
          <h2 className="text-2xl font-bold mb-2">💣 Your Waitlist Dashboard</h2>
          <p className="text-indigo-100 mb-6">{email}</p>
          
          <div className="grid md:grid-cols-3 gap-6 mb-6">
            <div className="bg-white/10 backdrop-blur p-6 rounded-xl">
              <div className="text-sm opacity-80 mb-1">Your referrals</div>
              <div className="text-3xl font-bold">{referrals}</div>
            </div>
            <div className="bg-white/10 backdrop-blur p-6 rounded-xl">
              <div className="text-sm opacity-80 mb-1">At launch you'll have</div>
              <div className="text-3xl font-bold">{referrals} followers</div>
            </div>
            <div className="bg-white/10 backdrop-blur p-6 rounded-xl">
              <div className="text-sm opacity-80 mb-1">Estimated monthly income</div>
              <div className="text-3xl font-bold">${estimatedEarnings}</div>
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
          </div>
        </div>

        {/* Launch info */}
        <div className="bg-white rounded-xl p-6 border border-gray-200">
          <h3 className="font-bold text-lg mb-3">🚀 On April 1st, 2026</h3>
          <p className="text-gray-600 mb-4">
            You'll be able to create your full account using <strong>{email}</strong>. 
            All {referrals} people who joined with your link will automatically become your first followers!
          </p>
          <div className="bg-indigo-50 p-4 rounded-lg">
            <p className="text-sm text-indigo-800">
              💡 <strong>Pro tip:</strong> The more people you refer now, the bigger your audience 
              (and income) from day one!
            </p>
          </div>
        </div>
      </div>
    </main>
  )
}