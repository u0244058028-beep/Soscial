'use client'

import { useEffect, useState } from 'react'
import { createClient } from '@/utils/supabase/client'
import Image from 'next/image'
import Link from 'next/link'

interface Post {
  id: string
  content: string
  image_url: string | null
  created_at: string
  likes_count: number
  comments_count: number
  user_id: string
  profiles: {
    username: string
    avatar_url: string | null
  }
}

export default function Feed() {
  const [posts, setPosts] = useState<Post[]>([])
  const [loading, setLoading] = useState(true)
  const supabase = createClient()

  useEffect(() => {
    loadPosts()

    // Lytt på nye poster i sanntid
    const subscription = supabase
      .channel('posts')
      .on('postgres_changes', { 
        event: 'INSERT', 
        schema: 'public', 
        table: 'posts' 
      }, (payload) => {
        // Last inn hele posten med profil-data
        loadNewPost(payload.new.id)
      })
      .subscribe()

    return () => {
      subscription.unsubscribe()
    }
  }, [])

  const loadPosts = async () => {
    const { data } = await supabase
      .from('posts')
      .select(`
        *,
        profiles:user_id (
          username,
          avatar_url
        )
      `)
      .order('created_at', { ascending: false })
      .limit(50)

    if (data) {
      setPosts(data)
    }
    setLoading(false)
  }

  const loadNewPost = async (postId: string) => {
    const { data } = await supabase
      .from('posts')
      .select(`
        *,
        profiles:user_id (
          username,
          avatar_url
        )
      `)
      .eq('id', postId)
      .single()

    if (data) {
      setPosts(prev => [data, ...prev])
    }
  }

  const formatTime = (timestamp: string) => {
    const date = new Date(timestamp)
    const now = new Date()
    const diff = now.getTime() - date.getTime()
    
    const minutes = Math.floor(diff / 60000)
    const hours = Math.floor(minutes / 60)
    const days = Math.floor(hours / 24)

    if (minutes < 1) return 'now'
    if (minutes < 60) return `${minutes}m`
    if (hours < 24) return `${hours}h`
    if (days < 7) return `${days}d`
    
    return date.toLocaleDateString()
  }

  if (loading) {
    return (
      <div className="flex justify-center py-12">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600" />
      </div>
    )
  }

  return (
    <div className="space-y-4">
      {posts.map((post) => (
        <div key={post.id} className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-start gap-3">
            {/* Avatar */}
            <Link href={`/@${post.profiles.username}`}>
              <div className="w-10 h-10 rounded-full overflow-hidden bg-gradient-to-br from-indigo-400 to-purple-500 flex-shrink-0">
                {post.profiles.avatar_url ? (
                  <img 
                    src={post.profiles.avatar_url} 
                    alt={post.profiles.username}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-white font-bold">
                    {post.profiles.username[0]?.toUpperCase()}
                  </div>
                )}
              </div>
            </Link>

            <div className="flex-1 min-w-0">
              {/* Header */}
              <div className="flex items-center gap-2 mb-1">
                <Link 
                  href={`/@${post.profiles.username}`}
                  className="font-semibold hover:underline"
                >
                  @{post.profiles.username}
                </Link>
                <span className="text-gray-500 text-sm">·</span>
                <span className="text-gray-500 text-sm">{formatTime(post.created_at)}</span>
              </div>

              {/* Innhold */}
              <p className="text-gray-900 whitespace-pre-wrap mb-3">{post.content}</p>
              
              {/* Bilde */}
              {post.image_url && (
                <div className="rounded-xl overflow-hidden border border-gray-200 mb-3">
                  <img 
                    src={post.image_url} 
                    alt="Post image" 
                    className="w-full h-auto"
                  />
                </div>
              )}

              {/* Interaksjoner */}
              <div className="flex gap-6 text-gray-500">
                <button className="flex items-center gap-2 hover:text-red-500 transition">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                  </svg>
                  <span>{post.likes_count}</span>
                </button>
                
                <button className="flex items-center gap-2 hover:text-blue-500 transition">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                  </svg>
                  <span>{post.comments_count}</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      ))}

      {posts.length === 0 && (
        <div className="text-center py-12 text-gray-500">
          No posts yet. Be the first to post!
        </div>
      )}
    </div>
  )
}