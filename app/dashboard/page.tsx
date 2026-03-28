'use client'

import { useEffect, useState } from 'react'
import { createClient } from '@/lib/supabase/client'
import { Users, TrendingUp, Calendar, Sparkles } from 'lucide-react'

export default function Dashboard() {
  const [stats, setStats] = useState({
    accounts: 0,
    postsGenerated: 0,
    engagement: '+342%',
    postsScheduled: 12,
  })
  const [user, setUser] = useState<any>(null)

  useEffect(() => {
    const supabase = createClient()
    supabase.auth.getUser().then(({ data }) => {
      setUser(data.user)
    })
    
    // Fetch stats from Supabase
    const fetchStats = async () => {
      const { data: accounts } = await supabase
        .from('social_accounts')
        .select('*')
        .eq('user_id', user?.id)
      
      const { data: content } = await supabase
        .from('content_history')
        .select('*')
        .eq('user_id', user?.id)
      
      setStats({
        ...stats,
        accounts: accounts?.length || 0,
        postsGenerated: content?.length || 0,
      })
    }
    
    if (user) fetchStats()
  }, [user])

  return (
    <div>
      <h1 className="text-3xl font-bold mb-8">Welcome back, {user?.email?.split('@')[0]}!</h1>
      
      {/* Stats grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
          <div className="flex items-center justify-between mb-4">
            <Users className="h-8 w-8 text-purple-600" />
            <span className="text-2xl font-bold">{stats.accounts}</span>
          </div>
          <h3 className="text-gray-600">Connected Accounts</h3>
        </div>
        
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
          <div className="flex items-center justify-between mb-4">
            <Sparkles className="h-8 w-8 text-purple-600" />
            <span className="text-2xl font-bold">{stats.postsGenerated}</span>
          </div>
          <h3 className="text-gray-600">Posts Generated</h3>
        </div>
        
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
          <div className="flex items-center justify-between mb-4">
            <TrendingUp className="h-8 w-8 text-purple-600" />
            <span className="text-2xl font-bold">{stats.engagement}</span>
          </div>
          <h3 className="text-gray-600">Avg. Engagement</h3>
        </div>
        
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
          <div className="flex items-center justify-between mb-4">
            <Calendar className="h-8 w-8 text-purple-600" />
            <span className="text-2xl font-bold">{stats.postsScheduled}</span>
          </div>
          <h3 className="text-gray-600">Scheduled Posts</h3>
        </div>
      </div>
      
      {/* Quick action */}
      <div className="bg-gradient-to-r from-purple-600 to-blue-600 rounded-xl p-8 text-white">
        <h2 className="text-2xl font-bold mb-2">Ready to create viral content?</h2>
        <p className="mb-4 opacity-90">Generate AI-powered posts tailored to your audience</p>
        <button className="bg-white text-purple-600 px-6 py-2 rounded-lg font-semibold hover:shadow-lg transition">
          Generate Now →
        </button>
      </div>
    </div>
  )
}