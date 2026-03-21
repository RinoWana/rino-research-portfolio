'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase'

export default function LoginPage() {
  const router   = useRouter()
  const supabase = createClient()

  const [email,    setEmail]    = useState('')
  const [password, setPassword] = useState('')
  const [error,    setError]    = useState('')
  const [loading,  setLoading]  = useState(false)

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault()
    setError('')
    setLoading(true)

    const { error } = await supabase.auth.signInWithPassword({ email, password })

    if (error) {
      setError(error.message)
      setLoading(false)
    } else {
      router.push('/admin/dashboard')
      router.refresh()
    }
  }

  return (
    <div className="min-h-screen bg-[#0A0603] flex items-center justify-center px-4">
      <div className="w-full max-w-sm">

        {/* Logo */}
        <div className="text-center mb-12">
          <div className="font-serif text-2xl font-semibold text-[#F5EBD8] mb-1">
            Rino Riyadi Wana
          </div>
          <div className="text-[0.6rem] tracking-[0.3em] uppercase text-[#C9A84C]">
            Research — Admin
          </div>
        </div>

        <div className="border border-[#2E2018] bg-[#140D08] p-8">
          <p className="section-label mb-6 text-center">Sign In</p>

          <form onSubmit={handleLogin} className="space-y-5">
            <div>
              <label className="block text-[0.65rem] tracking-[0.15em] uppercase text-[#7A6050] mb-2">
                Email
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full bg-[#0D0905] border border-[#2E2018] text-[#F5EBD8] px-4 py-3 text-sm outline-none focus:border-[rgba(201,168,76,0.4)] transition-colors"
                placeholder="you@email.com"
              />
            </div>

            <div>
              <label className="block text-[0.65rem] tracking-[0.15em] uppercase text-[#7A6050] mb-2">
                Password
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full bg-[#0D0905] border border-[#2E2018] text-[#F5EBD8] px-4 py-3 text-sm outline-none focus:border-[rgba(201,168,76,0.4)] transition-colors"
                placeholder="••••••••"
              />
            </div>

            {error && (
              <p className="text-red-400 text-xs border border-red-400/20 bg-red-400/5 px-4 py-3">
                {error}
              </p>
            )}

            <button
              type="submit"
              disabled={loading}
              className="btn-gold w-full justify-center mt-2"
            >
              {loading ? 'Signing in…' : 'Sign In'}
            </button>
          </form>
        </div>

        <div className="mt-6 text-center">
          <a href="/" className="text-[#7A6050] text-xs hover:text-[#BFA888] transition-colors">
            ← Back to website
          </a>
        </div>
      </div>
    </div>
  )
}
