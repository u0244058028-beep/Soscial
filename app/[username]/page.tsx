'use client'

import { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'
import { createClient } from '@/utils/supabase/client'
import ProfileHeader from '@/components/ProfileHeader'
import Feed from '@/components/Feed'

export default function UserProfile() {
  const params = useParams()
  const username = params.username?.toString().replace('@', '')
  
  const [profile, setProfile] = useState<any>(null)
  const [currentUser, setCurrentUser] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [isFollowing, setIsFollowing] = useState(false)
  
  const supabase = createClient()

  useEffect(() => {
    loadData()
  }, [username])

  const loadData = async () => {
    // Hent gjeldende bruker
    const { data: { user } } = await supabase.auth.getUser()
    setCurrentUser(user)

    // Hent profilen som vises
    const { data: profile } = await supabase
      .from('profiles')
      .select('*')
      .eq('username', username)
      .single()

    if (profile) {
      setProfile(profile)

      // Sjekk om vi følger denne brukeren
      if (user) {
        const { data } = await supabase
          .from('follows')
          .select('*')
          .eq('follower_id', user.id)
          .eq('following_id', profile.id)
          .single()

        setIsFollowing(!!data)
      }
    }

    setLoading(false)
  }

  const toggleFollow = async () => {
    if (!currentUser || !profile) return

    if (isFollowing) {
      await supabase
        .from('follows')
        .delete()
        .eq('follower_id', currentUser.id)
        .eq('following_id', profile.id)
    } else {
      await supabase
        .from('follows')
        .insert([{
          follower_id: currentUser.id,
          following_id: profile.id
        }])
    }

    setIsFollowing(!isFollowing)
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-indigo-600" />
      </div>
    )
  }

  if (!profile) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-2">User not found</h1>
          <p className="text-gray-600">@{username} doesn't exist</p>
        </div>
      </div>
    )
  }

  return (
    <main className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 py-8">
        <ProfileHeader 
          profile={profile} 
          isOwnProfile={currentUser?.id === profile.id}
          onUpdate={loadData}
        />

        {currentUser && currentUser.id !== profile.id && (
          <div className="px-8 mb-6">
            <button
              onClick={toggleFollow}
              className={`px-6 py-2 rounded-lg font-semibold transition ${
                isFollowing
                  ? 'bg-gray-200 text-gray-800 hover:bg-gray-300'
                  : 'bg-indigo-600 text-white hover:bg-indigo-700'
              }`}
            >
              {isFollowing ? 'Following' : 'Follow'}
            </button>
          </div>
        )}

        <div className="mt-8">
          <h2 className="text-xl font-bold mb-4 px-8">Posts</h2>
          <Feed userId={profile.id} />
        </div>
      </div>
    </main>
  )
}