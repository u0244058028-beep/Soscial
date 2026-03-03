'use client'

import { useState } from 'react'
import Image from 'next/image'
import { createClient } from '@/utils/supabase/client'
import { uploadFile } from './utils/upload'

interface ProfileHeaderProps {
  profile: any
  isOwnProfile: boolean
  onUpdate: () => void
}

export default function ProfileHeader({ profile, isOwnProfile, onUpdate }: ProfileHeaderProps) {
  const [uploading, setUploading] = useState(false)
  const [editing, setEditing] = useState(false)
  const [bio, setBio] = useState(profile.bio || '')
  const supabase = createClient()

  const handleAvatarUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    setUploading(true)
    const url = await uploadFile(file, 'avatars', profile.id)
    
    if (url) {
      await supabase
        .from('profiles')
        .update({ avatar_url: url })
        .eq('id', profile.id)
      
      onUpdate()
    }
    setUploading(false)
  }

  const handleBannerUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    setUploading(true)
    const url = await uploadFile(file, 'banners', profile.id)
    
    if (url) {
      await supabase
        .from('profiles')
        .update({ banner_url: url })
        .eq('id', profile.id)
      
      onUpdate()
    }
    setUploading(false)
  }

  const saveBio = async () => {
    await supabase
      .from('profiles')
      .update({ bio })
      .eq('id', profile.id)
    
    setEditing(false)
    onUpdate()
  }

  return (
    <div className="relative mb-8">
      {/* Banner */}
      <div className="h-48 md:h-64 rounded-xl overflow-hidden bg-gradient-to-r from-indigo-500 to-purple-600 relative">
        {profile.banner_url ? (
          <img 
            src={profile.banner_url} 
            alt="Banner" 
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full bg-gradient-to-r from-indigo-500 to-purple-600" />
        )}
        
        {isOwnProfile && (
          <label className="absolute bottom-4 right-4 bg-black/50 text-white px-4 py-2 rounded-lg cursor-pointer hover:bg-black/70 transition backdrop-blur-sm">
            <input
              type="file"
              accept="image/*"
              onChange={handleBannerUpload}
              className="hidden"
              disabled={uploading}
            />
            {uploading ? 'Uploading...' : 'Change banner'}
          </label>
        )}
      </div>

      {/* Profilbilde */}
      <div className="flex items-end gap-6 px-8 -mt-16">
        <div className="relative">
          <div className="w-32 h-32 rounded-full border-4 border-white overflow-hidden bg-white shadow-xl">
            {profile.avatar_url ? (
              <img 
                src={profile.avatar_url} 
                alt={profile.username} 
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full bg-gradient-to-br from-indigo-400 to-purple-500 flex items-center justify-center text-white text-4xl font-bold">
                {profile.username?.[0]?.toUpperCase()}
              </div>
            )}
          </div>
          
          {isOwnProfile && (
            <label className="absolute bottom-0 right-0 bg-indigo-600 text-white p-2 rounded-full cursor-pointer hover:bg-indigo-700 shadow-lg">
              <input
                type="file"
                accept="image/*"
                onChange={handleAvatarUpload}
                className="hidden"
                disabled={uploading}
              />
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
            </label>
          )}
        </div>

        <div className="flex-1 mb-2">
          <div className="flex items-center gap-3">
            <h1 className="text-3xl font-bold">@{profile.username}</h1>
            {profile.full_name && (
              <span className="text-gray-600 text-xl">· {profile.full_name}</span>
            )}
          </div>
          
          {editing ? (
            <div className="mt-3">
              <textarea
                value={bio}
                onChange={(e) => setBio(e.target.value)}
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                rows={3}
                placeholder="Write something about yourself..."
              />
              <div className="flex gap-2 mt-2">
                <button
                  onClick={saveBio}
                  className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700"
                >
                  Save
                </button>
                <button
                  onClick={() => setEditing(false)}
                  className="bg-gray-200 px-4 py-2 rounded-lg hover:bg-gray-300"
                >
                  Cancel
                </button>
              </div>
            </div>
          ) : (
            <div className="mt-3 text-gray-700">
              {profile.bio || (isOwnProfile && 'Add a bio...')}
              {isOwnProfile && !profile.bio && (
                <button
                  onClick={() => setEditing(true)}
                  className="ml-2 text-indigo-600 hover:underline"
                >
                  Add
                </button>
              )}
              {isOwnProfile && profile.bio && (
                <button
                  onClick={() => setEditing(true)}
                  className="ml-2 text-indigo-600 hover:underline text-sm"
                >
                  Edit
                </button>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Stats */}
      <div className="flex gap-8 mt-6 px-8">
        <div>
          <span className="font-bold text-xl">0</span>{' '}
          <span className="text-gray-600">following</span>
        </div>
        <div>
          <span className="font-bold text-xl">0</span>{' '}
          <span className="text-gray-600">followers</span>
        </div>
        <div>
          <span className="font-bold text-xl">0</span>{' '}
          <span className="text-gray-600">posts</span>
        </div>
      </div>
    </div>
  )
}