'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { createClient } from '@/utils/supabase/client'

export default function WaitlistLogin() {
  const [email, setEmail] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [code, setCode] = useState('')
  const [step, setStep] = useState<'email' | 'code'>('email')
  const router = useRouter()
  const supabase = createClient()

  const handleSendCode = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    const { data, error: fetchError } = await supabase
      .from('waitlist')
      .select('*')
      .eq('email', email)
      .single()

    if (fetchError || !data) {
      setError('Email not found on waitlist. Join first!')
      setLoading(false)
      return
    }

    // Generer 6-sifret kode
    const tempCode = Math.floor(100000 + Math.random() * 900000).toString()
    
    // I produksjon: send kode på epost
    console.log('Login code for', email, ':', tempCode)
    
    // For demo: vis koden (fjern i produksjon!)
    alert(`Din midlertidige kode: ${tempCode}`)
    
    // Lagre kode og epost (i produksjon, bruk database med TTL)
    sessionStorage.setItem('waitlist_login_code', tempCode)
    sessionStorage.setItem('waitlist_email', email)
    
    setStep('code')
    setLoading(false)
  }

  const handleVerifyCode = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    const storedCode = sessionStorage.getItem('waitlist_login_code')
    const storedEmail = sessionStorage.getItem('waitlist_email')
    
    if (code === storedCode && email === storedEmail) {
      sessionStorage.setItem('waitlist_logged_in', 'true')
      sessionStorage.setItem('waitlist_user_email', email)
      router.push('/dashboard/waitlist')
    } else {
      setError('Invalid code')
      setLoading(false)
    }
  }

  return (
    <main className="min-h-screen bg-gradient-to-b from-indigo-50 to-white">
      <div className="max-w-md mx-auto px-4 py-20">
        <div className="text-center mb-8">
          <Link href="/">
            <h1 className="text-4xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent cursor-pointer">
              My Social Bomb
            </h1>
          </Link>
          <p className="text-gray-600 mt-2">Access your referral dashboard</p>
        </div>

        <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-200">
          {step === 'email' ? (
            <form onSubmit={handleSendCode} className="space-y-5">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Your waitlist email
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-indigo-500"
                  placeholder="you@example.com"
                />
              </div>

              {error && (
                <div className="bg-red-50 text-red-600 p-3 rounded-lg text-sm">
                  ⚠️ {error}
                </div>
              )}

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-indigo-600 text-white py-3 rounded-lg font-semibold hover:bg-indigo-700 disabled:opacity-50"
              >
                {loading ? 'Sending...' : 'Send login code'}
              </button>

              <p className="text-xs text-gray-500 text-center mt-4">
                We'll send a 6-digit code to your email
              </p>
            </form>
          ) : (
            <form onSubmit={handleVerifyCode} className="space-y-5">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Enter the 6-digit code
                </label>
                <input
                  type="text"
                  value={code}
                  onChange={(e) => setCode(e.target.value.replace(/\D/g, '').slice(0, 6))}
                  required
                  maxLength={6}
                  className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-indigo-500 text-center text-2xl tracking-widest"
                  placeholder="••••••"
                />
                <p className="text-xs text-gray-500 mt-2">
                  Code sent to {email}
                </p>
              </div>

              {error && (
                <div className="bg-red-50 text-red-600 p-3 rounded-lg text-sm">
                  ⚠️ {error}
                </div>
              )}

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-indigo-600 text-white py-3 rounded-lg font-semibold hover:bg-indigo-700 disabled:opacity-50"
              >
                {loading ? 'Verifying...' : 'Access dashboard'}
              </button>

              <button
                type="button"
                onClick={() => setStep('email')}
                className="w-full text-sm text-gray-500 hover:text-gray-700"
              >
                ← Use different email
              </button>
            </form>
          )}
        </div>
      </div>
    </main>
  )
}