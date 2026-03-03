'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/utils/supabase/client'
import ProfileHeader from '@/components/ProfileHeader'
import PostComposer from '@/components/PostComposer'
import Feed from '@/components/Feed'

export default function Dashboard() {
  const [user, setUser] = useState<any>(null)
  const [profile, setProfile] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [activeTab, setActiveTab] = useState('feed')
  const router = useRouter()
  const supabase = createClient()

  useEffect(() => {
    loadUser()
  }, [])

  const loadUser = async () => {
    const { data: { user } } = await supabase.auth.getUser()
    
    if (!user) {
      router.push('/login')
      return
    }

    setUser(user)
    await loadProfile(user.id)
    setLoading(false)
  }

  const loadProfile = async (userId: string) => {
    const { data } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', userId)
      .single()

    if (data) {
      setProfile(data)
    }
  }

  const handleLogout = async () => {
    await supabase.auth.signOut()
    router.push('/')
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-indigo-600" />
      </div>
    )
  }

  return (
    <main className="min-h-screen bg-gray-50">
      {/* Topp navigasjon */}
      <nav className="bg-white border-b border-gray-200 sticky top-0 z-10 backdrop-blur-lg bg-white/80">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center gap-8">
              <h1 className="text-xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                My Social Bomb
              </h1>
              
              <div className="flex gap-1">
                <button
                  onClick={() => setActiveTab('feed')}
                  className={`px-4 py-2 rounded-lg transition ${
                    activeTab === 'feed' 
                      ? 'bg-indigo-50 text-indigo-600 font-medium' 
                      : 'text-gray-600 hover:bg-gray-100'
                  }`}
                >
                  Feed
                </button>
                <button
                  onClick={() => setActiveTab('profile')}
                  className={`px-4 py-2 rounded-lg transition ${
                    activeTab === 'profile' 
                      ? 'bg-indigo-50 text-indigo-600 font-medium' 
                      : 'text-gray-600 hover:bg-gray-100'
                  }`}
                >
                  Profile
                </button>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <div className="text-sm text-gray-600">
                💰 ${profile?.balance_cents ? profile.balance_cents / 100 : 0}
              </div>
              
              <button
                onClick={handleLogout}
                className="text-gray-600 hover:text-gray-900"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hovedinnhold */}
      <div className="max-w-4xl mx-auto px-4 py-8">
        {activeTab === 'profile' ? (
          /* Profilvisning */
          <div>
            <ProfileHeader 
              profile={profile} 
              isOwnProfile={true}
              onUpdate={() => loadProfile(user.id)}
            />
            
            <div className="mt-8">
              <h2 className="text-xl font-bold mb-4">Your posts</h2>
              <Feed userId={profile.id} />
            </div>
          </div>
        ) : (
          /* Feed */
          <div>
            <PostComposer 
              userId={profile.id} 
              onPostCreated={() => {}} 
            />
            <Feed />
          </div>
        )}
      </div>
    </main>
  )
}