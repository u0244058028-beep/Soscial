'use client'

import { useEffect, useState } from 'react'
import { createClient } from '@/utils/supabase/client'
import Link from 'next/link'
import PostCard from './PostCard'

interface Post {
  id: string
  content: string
  image_url: string | null
  created_at: string
  likes_count: number
  comments_count: number
  shares_count: number
  engagement_score: number
  profile_id: string
  profiles: {
    username: string
    avatar_url: string | null
    full_name: string | null
  }
  is_following?: boolean
  user_liked?: boolean
}

interface SmartFeedProps {
  currentUserId?: string
}

export default function SmartFeed({ currentUserId }: SmartFeedProps) {
  const [posts, setPosts] = useState<Post[]>([])
  const [loading, setLoading] = useState(true)
  const [feedType, setFeedType] = useState<'following' | 'popular' | 'recommended'>('following')
  const supabase = createClient()

  useEffect(() => {
    loadFeed()
  }, [feedType, currentUserId])

  const loadFeed = async () => {
    setLoading(true)
    
    let query = supabase
      .from('posts')
      .select(`
        *,
        profiles:profile_id (
          username,
          avatar_url,
          full_name
        )
      `)

    // Forskjellige feed-typer
    if (feedType === 'following' && currentUserId) {
      // Hent IDene til folk du følger
      const { data: following } = await supabase
        .from('follows')
        .select('following_id')
        .eq('follower_id', currentUserId)

      const followingIds = following?.map(f => f.following_id) || []
      
      if (followingIds.length > 0) {
        query = query.in('profile_id', followingIds)
      } else {
        // Hvis du ikke følger noen, vis populære i stedet
        setFeedType('popular')
        return
      }
    } else if (feedType === 'popular') {
      // Populære: høy engagement_score siste 24t
      query = query
        .gt('engagement_score', 5)
        .order('engagement_score', { ascending: false })
    } else if (feedType === 'recommended' && currentUserId) {
      // Anbefalte: basert på dine likes
      const { data: likedPosts } = await supabase
        .from('engagements')
        .select('post_id')
        .eq('user_id', currentUserId)
        .eq('type', 'like')
        .limit(50)

      const likedPostIds = likedPosts?.map(l => l.post_id) || []
      
      if (likedPostIds.length > 0) {
        // Finn brukere du liker poster fra
        const { data: likedProfiles } = await supabase
          .from('posts')
          .select('profile_id')
          .in('id', likedPostIds)

        // FIX: Bruk filter for å fjerne duplikater i stedet for Set + spread
        const profileIdArray = likedProfiles?.map(p => p.profile_id) || []
        const profileIds: string[] = []
        
        // Manuell fjerning av duplikater (fungerer i alle TypeScript-versjoner)
        profileIdArray.forEach(id => {
          if (!profileIds.includes(id)) {
            profileIds.push(id)
          }
        })
        
        if (profileIds.length > 0) {
          query = query
            .in('profile_id', profileIds)
            .order('created_at', { ascending: false })
        }
      }
    }

    // Begrens til 20 poster
    const { data, error } = await query.limit(20)

    if (data) {
      // Sjekk om current user har likt hver post
      if (currentUserId) {
        const { data: likes } = await supabase
          .from('engagements')
          .select('post_id')
          .eq('user_id', currentUserId)
          .eq('type', 'like')

        // FIX: Bruk filter i stedet for Set
        const likedPostIdsArray = likes?.map(l => l.post_id) || []
        
        const postsWithMeta = data.map(post => ({
          ...post,
          user_liked: likedPostIdsArray.includes(post.id)
        }))

        setPosts(postsWithMeta)
      } else {
        setPosts(data)
      }
    }

    setLoading(false)
  }

  const handleLike = async (postId: string, currentlyLiked: boolean) => {
    if (!currentUserId) return

    if (currentlyLiked) {
      // Unlike
      await supabase
        .from('engagements')
        .delete()
        .eq('user_id', currentUserId)
        .eq('post_id', postId)
        .eq('type', 'like')

      // Oppdater UI
      setPosts(prev => prev.map(p => 
        p.id === postId 
          ? { ...p, likes_count: p.likes_count - 1, user_liked: false }
          : p
      ))
    } else {
      // Like
      await supabase
        .from('engagements')
        .insert([{
          user_id: currentUserId,
          post_id: postId,
          type: 'like'
        }])

      // Oppdater UI
      setPosts(prev => prev.map(p => 
        p.id === postId 
          ? { ...p, likes_count: p.likes_count + 1, user_liked: true }
          : p
      ))
    }
  }

  if (loading) {
    return (
      <div className="flex justify-center py-12">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600" />
      </div>
    )
  }

  return (
    <div>
      {/* Feed-type velger */}
      <div className="flex gap-2 mb-6 bg-white p-2 rounded-xl shadow-sm border border-gray-200">
        <button
          onClick={() => setFeedType('following')}
          className={`flex-1 py-3 rounded-lg font-medium transition ${
            feedType === 'following' 
              ? 'bg-indigo-600 text-white' 
              : 'text-gray-600 hover:bg-gray-100'
          }`}
        >
          Following
        </button>
        <button
          onClick={() => setFeedType('popular')}
          className={`flex-1 py-3 rounded-lg font-medium transition ${
            feedType === 'popular' 
              ? 'bg-indigo-600 text-white' 
              : 'text-gray-600 hover:bg-gray-100'
          }`}
        >
          Popular
        </button>
        <button
          onClick={() => setFeedType('recommended')}
          className={`flex-1 py-3 rounded-lg font-medium transition ${
            feedType === 'recommended' 
              ? 'bg-indigo-600 text-white' 
              : 'text-gray-600 hover:bg-gray-100'
          }`}
        >
          For You
        </button>
      </div>

      {/* Posts */}
      <div className="space-y-4">
        {posts.map((post) => (
          <PostCard
            key={post.id}
            post={post}
            currentUserId={currentUserId}
            onLike={() => handleLike(post.id, post.user_liked || false)}
          />
        ))}

        {posts.length === 0 && (
          <div className="text-center py-12 bg-white rounded-xl border border-gray-200">
            <div className="text-5xl mb-4">📭</div>
            <h3 className="text-xl font-bold text-gray-700 mb-2">No posts yet</h3>
            <p className="text-gray-500">
              {feedType === 'following' 
                ? 'Follow some people to see their posts here!' 
                : 'Check back later for more content'}
            </p>
          </div>
        )}
      </div>
    </div>
  )
}