'use client'

import { useState } from 'react'
import Link from 'next/link'

interface PostCardProps {
  post: any
  currentUserId?: string
  onLike: () => void
}

export default function PostCard({ post, currentUserId, onLike }: PostCardProps) {
  const [showComments, setShowComments] = useState(false)
  const [comment, setComment] = useState('')

  const formatTime = (timestamp: string) => {
    const date = new Date(timestamp)
    const now = new Date()
    const diff = now.getTime() - date.getTime()
    
    const minutes = Math.floor(diff / 60000)
    const hours = Math.floor(minutes / 60)
    const days = Math.floor(hours / 24)

    if (minutes < 1) return 'just now'
    if (minutes < 60) return `${minutes}m`
    if (hours < 24) return `${hours}h`
    if (days < 7) return `${days}d`
    
    return date.toLocaleDateString()
  }

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition">
      {/* Header */}
      <div className="p-4 flex items-start gap-3">
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
          <div className="flex items-center gap-2 flex-wrap">
            <Link 
              href={`/@${post.profiles.username}`}
              className="font-semibold hover:underline"
            >
              {post.profiles.full_name || post.profiles.username}
            </Link>
            {post.profiles.full_name && (
              <span className="text-gray-500 text-sm">@{post.profiles.username}</span>
            )}
            <span className="text-gray-400 text-sm">·</span>
            <span className="text-gray-500 text-sm">{formatTime(post.created_at)}</span>
          </div>
          
          {/* Content */}
          <p className="text-gray-900 whitespace-pre-wrap mt-2">{post.content}</p>
        </div>
      </div>

      {/* Image */}
      {post.image_url && (
        <div className="border-y border-gray-200">
          <img 
            src={post.image_url} 
            alt="Post content" 
            className="w-full h-auto max-h-96 object-contain bg-black/5"
          />
        </div>
      )}

      {/* Stats */}
      <div className="px-4 py-3 border-b border-gray-100 flex gap-6 text-sm text-gray-500">
        <span className="font-medium">{post.likes_count} likes</span>
        <span className="font-medium">{post.comments_count} comments</span>
      </div>

      {/* Actions */}
      <div className="flex divide-x divide-gray-100">
        <button
          onClick={onLike}
          className={`flex-1 py-3 flex items-center justify-center gap-2 hover:bg-gray-50 transition ${
            post.user_liked ? 'text-red-500' : 'text-gray-500 hover:text-red-500'
          }`}
        >
          <svg className="w-5 h-5" fill={post.user_liked ? 'currentColor' : 'none'} stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
          </svg>
          <span className="font-medium">Like</span>
        </button>

        <button
          onClick={() => setShowComments(!showComments)}
          className="flex-1 py-3 flex items-center justify-center gap-2 text-gray-500 hover:text-blue-500 hover:bg-gray-50 transition"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
          </svg>
          <span className="font-medium">Comment</span>
        </button>

        <button className="flex-1 py-3 flex items-center justify-center gap-2 text-gray-500 hover:text-green-500 hover:bg-gray-50 transition">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
          </svg>
          <span className="font-medium">Share</span>
        </button>
      </div>

      {/* Comments section (kan utvides senere) */}
      {showComments && (
        <div className="p-4 bg-gray-50 border-t border-gray-200">
          <div className="flex gap-2">
            <input
              type="text"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder="Write a comment..."
              className="flex-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
            <button className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700">
              Post
            </button>
          </div>
        </div>
      )}
    </div>
  )
}