// app/page.tsx
'use client'

import { useState } from 'react'
import { createClient } from '@/utils/supabase/client'

export default function Home() {
  const [email, setEmail] = useState('')
  const [submitted, setSubmitted] = useState(false)
  const supabase = createClient()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    // Lagre epost i Supabase (du må opprette tabellen først)
    const { error } = await supabase
      .from('waitlist')
      .insert([{ email, signed_up_at: new Date().toISOString() }])

    if (!error) {
      setSubmitted(true)
    }
  }

  return (
    <main className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      <div className="max-w-4xl mx-auto px-4 py-20">
        
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-6xl font-bold mb-4">
            Crew<span className="text-blue-600">.</span>
          </h1>
          <p className="text-2xl text-gray-600">
            The social platform where every follower pays you.
          </p>
        </div>

        {/* Value prop */}
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          <div className="bg-white p-6 rounded-xl shadow-sm">
            <div className="text-4xl mb-2">💰</div>
            <h3 className="font-bold text-lg">Get paid monthly</h3>
            <p className="text-gray-600">Every follower gives you $4/month. Simple.</p>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-sm">
            <div className="text-4xl mb-2">👵</div>
            <h3 className="font-bold text-lg">Designed for everyone</h3>
            <p className="text-gray-600">Your grandmother can use it. One button.</p>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-sm">
            <div className="text-4xl mb-2">🚀</div>
            <h3 className="font-bold text-lg">Viral by design</h3>
            <p className="text-gray-600">Invite friends. Build your crew. Earn more.</p>
          </div>
        </div>

        {/* Email signup form */}
        {!submitted ? (
          <div className="max-w-md mx-auto bg-white p-8 rounded-2xl shadow-md">
            <h2 className="text-2xl font-bold mb-4 text-center">
              Get early access
            </h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <input
                type="email"
                placeholder="Your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full px-4 py-3 border rounded-lg text-lg"
              />
              <button
                type="submit"
                className="w-full bg-blue-600 text-white py-3 rounded-lg text-lg font-semibold hover:bg-blue-700"
              >
                Notify me when we launch
              </button>
            </form>
            <p className="text-sm text-gray-500 text-center mt-4">
              ✅ Free to join. 1,847 already signed up.
            </p>
          </div>
        ) : (
          <div className="max-w-md mx-auto bg-green-50 p-8 rounded-2xl text-center">
            <div className="text-5xl mb-4">🎉</div>
            <h2 className="text-2xl font-bold text-green-700 mb-2">
              You're on the list!
            </h2>
            <p className="text-green-600">
              We'll notify you when we launch. Share with friends to move up!
            </p>
          </div>
        )}

        {/* Footer */}
        <footer className="text-center mt-20 text-gray-500">
          © 2024 Crew. Built for everyone. 🌍
        </footer>
      </div>
    </main>
  )
}