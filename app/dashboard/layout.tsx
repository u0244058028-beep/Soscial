'use client'

import { createClient } from '@/lib/supabase/client'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'
import Link from 'next/link'
import { LayoutDashboard, Instagram, Zap, Settings, LogOut } from 'lucide-react'

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const router = useRouter()
  const supabase = createClient()

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (!session) router.push('/auth')
    })
  }, [])

  const handleSignOut = async () => {
    await supabase.auth.signOut()
    router.push('/')
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="flex h-screen">
        {/* Sidebar */}
        <aside className="w-64 bg-white border-r border-gray-200 fixed h-full">
          <div className="p-6">
            <h1 className="text-xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
              MySocialBomb
            </h1>
          </div>
          <nav className="mt-6">
            <Link href="/dashboard" className="flex items-center gap-3 px-6 py-3 text-gray-700 hover:bg-purple-50 hover:text-purple-600 transition">
              <LayoutDashboard className="h-5 w-5" />
              Dashboard
            </Link>
            <Link href="/dashboard/connect" className="flex items-center gap-3 px-6 py-3 text-gray-700 hover:bg-purple-50 hover:text-purple-600 transition">
              <Instagram className="h-5 w-5" />
              Connect Accounts
            </Link>
            <Link href="/dashboard/generate" className="flex items-center gap-3 px-6 py-3 text-gray-700 hover:bg-purple-50 hover:text-purple-600 transition">
              <Zap className="h-5 w-5" />
              Generate Content
            </Link>
            <Link href="/dashboard/settings" className="flex items-center gap-3 px-6 py-3 text-gray-700 hover:bg-purple-50 hover:text-purple-600 transition">
              <Settings className="h-5 w-5" />
              Settings
            </Link>
          </nav>
          <div className="absolute bottom-0 w-64 p-6 border-t border-gray-200">
            <button
              onClick={handleSignOut}
              className="flex items-center gap-3 text-gray-700 hover:text-red-600 transition w-full"
            >
              <LogOut className="h-5 w-5" />
              Sign out
            </button>
          </div>
        </aside>

        {/* Main content */}
        <main className="ml-64 flex-1 p-8 overflow-y-auto">
          {children}
        </main>
      </div>
    </div>
  )
}