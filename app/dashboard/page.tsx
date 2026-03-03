'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { createClient } from '@/utils/supabase/client'
import ProfileHeader from '@/components/ProfileHeader'
import PostComposer from '@/components/PostComposer'
import SmartFeed from '@/components/SmartFeed'

export default function Dashboard() {
  const [user, setUser] = useState<any>(null)
  const [profile, setProfile] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [activeTab, setActiveTab] = useState('feed')
  const router = useRouter()
  const supabase = createClient()

  useEffect(() => {
    checkUser()
  }, [])

  const checkUser = async () => {
    try {
      console.log('Checking user session...')
      
      const { data: { user }, error: userError } = await supabase.auth.getUser()
      
      if (userError) {
        console.error('User error:', userError)
        throw userError
      }
      
      if (!user) {
        console.log('No user found, redirecting to login')
        router.push('/login')
        return
      }

      console.log('User found:', user.id)
      setUser(user)
      await loadProfile(user.id)
      
    } catch (err: any) {
      console.error('Error in checkUser:', err)
      setError(err.message)
      setLoading(false)
    }
  }

  const loadProfile = async (userId: string) => {
    try {
      console.log('Loading profile for:', userId)
      
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', userId)
        .single()

      if (error) {
        console.error('Profile error:', error)
        throw error
      }

      if (data) {
        console.log('Profile loaded:', data)
        setProfile(data)
      } else {
        console.log('No profile found, creating one...')
        
        // Hvis profilen mangler, opprett den
        const username = user?.email?.split('@')[0] || 'user_' + Math.random().toString(36).substring(2, 8)
        const inviteCode = Math.random().toString(36).substring(2, 10)
        
        const { data: newProfile, error: insertError } = await supabase
          .from('profiles')
          .insert([{
            id: userId,
            username,
            invite_code: inviteCode
          }])
          .select()
          .single()

        if (insertError) {
          console.error('Profile creation error:', insertError)
          throw insertError
        }
        
        console.log('New profile created:', newProfile)
        setProfile(newProfile)
      }
    } catch (err: any) {
      console.error('Error in loadProfile:', err)
      setError(err.message)
    } finally {
      setLoading(false)
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

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="bg-red-50 text-red-600 p-6 rounded-xl max-w-md">
          <h2 className="text-xl font-bold mb-2">Something went wrong</h2>
          <p className="mb-4">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700"
          >
            Try again
          </button>
        </div>
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
              <Link href="/">
                <h1 className="text-xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent cursor-pointer">
                  My Social Bomb
                </h1>
              </Link>
              
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
              <SmartFeed currentUserId={profile.id} />
            </div>
          </div>
        ) : (
          /* Feed */
          <div>
            <PostComposer 
              userId={profile.id} 
              onPostCreated={() => {}} 
            />
            <SmartFeed currentUserId={profile.id} />
          </div>
        )}
      </div>
    </main>
  )
}