'use client'

import { useState } from 'react'
import { createClient } from '@/utils/supabase/client'
import { uploadFile } from './utils/upload'

interface PostComposerProps {
  userId: string
  onPostCreated: () => void
}

export default function PostComposer({ userId, onPostCreated }: PostComposerProps) {
  const [content, setContent] = useState('')
  const [image, setImage] = useState<File | null>(null)
  const [imagePreview, setImagePreview] = useState<string | null>(null)
  const [posting, setPosting] = useState(false)
  const supabase = createClient()

  const handleImageSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setImage(file)
      setImagePreview(URL.createObjectURL(file))
    }
  }

  const handlePost = async () => {
    if (!content.trim() && !image) return
    
    setPosting(true)
    
    let imageUrl = null
    if (image) {
      imageUrl = await uploadFile(image, 'post-images', userId)
    }

    const { error } = await supabase
      .from('posts')
      .insert([{
        user_id: userId,
        content: content.trim(),
        image_url: imageUrl
      }])

    if (!error) {
      setContent('')
      setImage(null)
      setImagePreview(null)
      onPostCreated()
    }
    
    setPosting(false)
  }

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 mb-6">
      <textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="What's happening?"
        className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 min-h-[100px]"
      />

      {imagePreview && (
        <div className="relative mt-3">
          <img 
            src={imagePreview} 
            alt="Preview" 
            className="max-h-60 rounded-lg object-cover"
          />
          <button
            onClick={() => {
              setImage(null)
              setImagePreview(null)
            }}
            className="absolute top-2 right-2 bg-black/50 text-white p-1 rounded-full hover:bg-black/70"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
      )}

      <div className="flex justify-between items-center mt-3">
        <label className="cursor-pointer text-gray-500 hover:text-indigo-600">
          <input
            type="file"
            accept="image/*"
            onChange={handleImageSelect}
            className="hidden"
          />
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
        </label>

        <button
          onClick={handlePost}
          disabled={posting || (!content.trim() && !image)}
          className="bg-indigo-600 text-white px-6 py-2 rounded-lg font-semibold hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {posting ? 'Posting...' : 'Post'}
        </button>
      </div>
    </div>
  )
}