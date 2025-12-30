'use client'

import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { validateEmail } from '@/lib/validators'

export default function ForgotPasswordPage() {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [domLoaded, setDomLoaded] = useState(false)

  useEffect(() => {
    setDomLoaded(true)
  }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)
    setSuccess(false)

    // Validation
    const emailValidation = validateEmail(email)
    if (!emailValidation.valid) {
      setError(emailValidation.error || 'Please enter a valid email address')
      return
    }

    setIsLoading(true)

    try {
      const response = await fetch('/api/auth/forgot-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      })

      const data = await response.json()

      if (!response.ok) {
        setError(data.error || 'Failed to send reset email')
        setIsLoading(false)
        return
      }

      setSuccess(true)
      setIsLoading(false)
    } catch (error) {
      setError('Network error. Please try again.')
      setIsLoading(false)
    }
  }

  if (!domLoaded) return null

  return (
    <div className="w-full">
      <div className="mb-10">
        <h1 className="text-3xl font-extrabold text-black mb-2 tracking-tight">
          Reset Password
        </h1>
        <p className="text-gray-500 font-medium">
          Enter your email address and we&apos;ll send you a link to reset your password.
        </p>
      </div>

      {success ? (
        <div className="space-y-4">
          <div className="p-4 bg-green-50 text-green-700 rounded-lg text-sm font-medium border border-green-200">
            If an account exists with this email, a password reset link has been sent.
            Please check your inbox.
          </div>
          <Link
            href="/auth/login"
            className="block w-full h-14 bg-black hover:bg-gray-800 text-white rounded-xl font-bold text-lg flex items-center justify-center gap-3 transition-colors active:scale-[0.99]"
          >
            Back to Login
          </Link>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="group">
            <input
              id="email"
              type="email"
              placeholder="Email address"
              className={`w-full h-12 px-4 bg-[#F3F4F6] rounded-xl border-2 border-transparent focus:bg-white focus:border-blue-500 outline-none transition-all font-medium placeholder:text-gray-400 text-black ${
                error ? 'bg-red-50 border-red-200' : ''
              }`}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={isLoading}
            />
            {error && (
              <p className="mt-1 text-sm text-red-500 font-medium px-1">{error}</p>
            )}
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full h-14 bg-black hover:bg-gray-800 text-white rounded-xl font-bold text-lg flex items-center justify-center gap-3 transition-colors active:scale-[0.99] disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? 'Sending...' : 'Send Reset Link'}
          </button>
        </form>
      )}

      <div className="mt-8">
        <p className="text-sm text-gray-500">
          Remember your password?{' '}
          <Link href="/auth/login" className="text-gray-900 font-medium underline hover:text-black">
            Sign in
          </Link>
        </p>
      </div>
    </div>
  )
}
