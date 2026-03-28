'use client'

import { useState, useEffect } from 'react'
import { createClient } from '@/lib/supabase/client'
import { Instagram, Music2, Linkedin, Facebook, Plus, Trash2 } from 'lucide-react'

const platforms = [
  { id: 'instagram', name: 'Instagram', icon: Instagram, color: 'bg-pink-500' },
  { id: 'tiktok', name: 'TikTok', icon: Music2, color: 'bg-black' },
  { id: 'linkedin', name: 'LinkedIn', icon: Linkedin, color: 'bg-blue-600' },
  { id: 'facebook', name: 'Facebook', icon: Facebook, color: 'bg-blue-500' },
]

export default function ConnectAccounts() {
  const [connectedAccounts, setConnectedAccounts] = useState<any[]>([])
  const [loading, setLoading] = useState(false)
  const supabase = createClient()

  useEffect(() => {
    fetchAccounts()
  }, [])

  const fetchAccounts = async () => {
    const { data: user } = await supabase.auth.getUser()
    if (user.user) {
      const { data } = await supabase
        .from('social_accounts')
        .select('*')
        .eq('user_id', user.user.id)
      setConnectedAccounts(data || [])
    }
  }

  const connectAccount = async (platform: string) => {
    setLoading(true)
    // Her kobler du til OAuth for hver plattform
    // Dette er en placeholder – du må implementere OAuth flow for hver plattform
    const username = prompt(`Enter your ${platform} username:`)
    
    if (username) {
      const { data: user } = await supabase.auth.getUser()
      if (user.user) {
        const { error } = await supabase.from('social_accounts').insert({
          user_id: user.user.id,
          platform,
          username,
          is_connected: true,
        })
        
        if (!error) {
          fetchAccounts()
        } else {
          alert('Failed to connect account')
        }
      }
    }
    setLoading(false)
  }

  const disconnectAccount = async (id: string) => {
    const { error } = await supabase
      .from('social_accounts')
      .delete()
      .eq('id', id)
    
    if (!error) {
      fetchAccounts()
    }
  }

  return (
    <div>
      <h1 className="text-3xl font-bold mb-8">Connect Social Media Accounts</h1>
      
      {/* Connected accounts */}
      <div className="mb-12">
        <h2 className="text-xl font-semibold mb-4">Connected Accounts</h2>
        {connectedAccounts.length === 0 ? (
          <div className="bg-white rounded-xl p-8 text-center border border-gray-200">
            <p className="text-gray-500">No accounts connected yet</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {connectedAccounts.map((account) => {
              const PlatformIcon = platforms.find(p => p.id === account.platform)?.icon
              return (
                <div key={account.id} className="bg-white rounded-xl p-4 border border-gray-200 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    {PlatformIcon && <PlatformIcon className="h-8 w-8 text-gray-600" />}
                    <div>
                      <p className="font-semibold capitalize">{account.platform}</p>
                      <p className="text-sm text-gray-500">@{account.username}</p>
                    </div>
                  </div>
                  <button
                    onClick={() => disconnectAccount(account.id)}
                    className="text-red-500 hover:text-red-600"
                  >
                    <Trash2 className="h-5 w-5" />
                  </button>
                </div>
              )
            })}
          </div>
        )}
      </div>
      
      {/* Available platforms */}
      <div>
        <h2 className="text-xl font-semibold mb-4">Connect New Account</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {platforms.map((platform) => {
            const isConnected = connectedAccounts.some(a => a.platform === platform.id)
            const Icon = platform.icon
            
            return (
              <button
                key={platform.id}
                onClick={() => connectAccount(platform.id)}
                disabled={isConnected || loading}
                className={`p-4 rounded-xl border-2 transition-all ${
                  isConnected
                    ? 'border-green-200 bg-green-50 cursor-not-allowed'
                    : 'border-gray-200 hover:border-purple-300 hover:shadow-md'
                }`}
              >
                <div className={`${platform.color} w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3`}>
                  <Icon className="h-6 w-6 text-white" />
                </div>
                <p className="font-semibold">{platform.name}</p>
                {isConnected && (
                  <p className="text-xs text-green-600 mt-1">Connected</p>
                )}
              </button>
            )
          })}
        </div>
      </div>
    </div>
  )
}