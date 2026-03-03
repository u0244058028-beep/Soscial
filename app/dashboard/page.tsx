'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/utils/supabase/client'

export default function Dashboard() {
  const [user, setUser] = useState<any>(null)
  const [profile, setProfile] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [copied, setCopied] = useState(false)
  const router = useRouter()
  const supabase = createClient()

  useEffect(() => {
    const getUser = async () => {
      const { data: { user } } = await supabase.auth.getUser()
      
      if (!user) {
        router.push('/login')
        return
      }

      setUser(user)

      // Hent profil fra databasen
      const { data: profile } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', user.id)
        .single()

      setProfile(profile)
      setLoading(false)
    }

    getUser()
  }, [router, supabase])

  const handleLogout = async () => {
    await supabase.auth.signOut()
    router.push('/')
  }

  const inviteLink = profile ? `https://mysocialbomb.com/@${profile.username}` : ''

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-xl">Loading...</div>
      </div>
    )
  }

  return (
    <main className="min-h-screen bg-gradient-to-b from-indigo-50 to-white">
      <div className="max-w-4xl mx-auto px-4 py-12">
        
        {/* Header */}
        <div className="flex justify-between items-center mb-12">
          <h1 className="text-3xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
            My Social Bomb
          </h1>
          <button
            onClick={handleLogout}
            className="px-4 py-2 text-gray-600 hover:text-gray-900"
          >
            Logout
          </button>
        </div>

        {/* Welcome */}
        <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-200 mb-8">
          <h2 className="text-2xl font-bold mb-2">
            Welcome, @{profile.username}! 👋
          </h2>
          <p className="text-gray-600">
            Your bomb is ready. Share your link and watch it explode.
          </p>
        </div>

        {/* Invite Link */}
        <div className="bg-gradient-to-r from-indigo-600 to-purple-600 p-8 rounded-2xl text-white mb-8">
          <h3 className="text-xl font-semibold mb-4">💣 Your bomb fuse</h3>
          <div className="flex flex-col sm:flex-row gap-3">
            <input
              type="text"
              value={inviteLink}
              readOnly
              className="flex-1 px-4 py-3 rounded-lg text-gray-900 bg-white"
            />
            <button
              onClick={() => {
                navigator.clipboard.writeText(inviteLink)
                setCopied(true)
                setTimeout(() => setCopied(false), 2000)
              }}
              className="bg-white text-indigo-600 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100"
            >
              {copied ? 'Copied! ✅' : 'Copy link'}
            </button>
          </div>
          <p className="text-indigo-200 mt-4 text-sm">
            Share this link with friends. When they join, they follow you automatically.
          </p>
        </div>

        {/* Stats */}
        <div className="grid md:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
            <div className="text-3xl mb-2">0</div>
            <div className="text-gray-600">Direct followers</div>
            <div className="text-sm text-gray-400 mt-1">$0/month</div>
          </div>
          
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
            <div className="text-3xl mb-2">0</div>
            <div className="text-gray-600">Team members</div>
            <div className="text-sm text-gray-400 mt-1">$0/month bonus</div>
          </div>
          
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
            <div className="text-3xl mb-2">$0</div>
            <div className="text-gray-600">Total earnings</div>
            <div className="text-sm text-gray-400 mt-1">This month</div>
          </div>
        </div>

        {/* Next steps */}
        <div className="mt-12 bg-gray-50 p-6 rounded-xl">
          <h3 className="font-bold text-lg mb-3">🚀 Next steps</h3>
          <ul className="space-y-2 text-gray-600">
            <li>1. Share your link on social media</li>
            <li>2. Invite friends directly via SMS/WhatsApp</li>
            <li>3. Help your friends invite more people (you earn bonus)</li>
          </ul>
        </div>
      </div>
    </main>
  )
}