'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { createClient } from '@/utils/supabase/client'

export default function SignUp() {
  const [loading, setLoading] = useState(true)
  const [isAdmin, setIsAdmin] = useState(false)
  const router = useRouter()
  const supabase = createClient()

  useEffect(() => {
    const checkAdmin = async () => {
      const { data: { user } } = await supabase.auth.getUser()
      
      // Sjekk om innlogget bruker er admin (din epost)
      if (user?.email === process.env.NEXT_PUBLIC_ADMIN_EMAIL) {
        setIsAdmin(true)
      } else {
        // Hvis ikke admin, send til forsiden
        router.push('/')
      }
      setLoading(false)
    }

    checkAdmin()
  }, [])

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600" />
      </div>
    )
  }

  if (!isAdmin) {
    return null // Vises aldri fordi router.push kjører
  }

  // Din eksisterende signup-kode (uendret)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [username, setUsername] = useState('')
  // ... resten av din signup-kode (samme som før)

  return (
    <main className="min-h-screen bg-gradient-to-b from-indigo-50 to-white">
      {/* Din eksisterende JSX, helt uendret */}
      <div className="max-w-md mx-auto px-4 py-20">
        {/* ... */}
      </div>
    </main>
  )
}