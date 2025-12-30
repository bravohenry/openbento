'use client'

import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import { useRouter, useSearchParams } from 'next/navigation'
import { validatePassword } from '@/lib/validators'

export default function ResetPasswordPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [isValidating, setIsValidating] = useState(true)
  const [domLoaded, setDomLoaded] = useState(false)

  useEffect(() => {
    setDomLoaded(true)
    // Check if we have a valid reset token
    checkResetToken()
  }, [])

  const checkResetToken = async () => {
    try {
      // Check if user has a valid session from the reset link
      const response = await fetch('/api/auth/session')
      const data = await response.json()

      if (!data.user) {
        setError('Invalid or expired reset link. Please request a new one.')
        setIsValidating(false)
        return
      }

      setIsValidating(false)
    } catch (error) {
      setError('Failed to validate reset link')
      setIsValidating(false)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)
    setSuccess(false)

    // Validation
    if (!password) {
      setError('Password is required')
      return
    }

    const passwordValidation = validatePassword(password)
    if (!passwordValidation.valid) {
      setError(passwordValidation.error || 'Invalid password')
      return
    }

    if (password !== confirmPassword) {
      setError('Passwords do not match')
      return
    }

    setIsLoading(true)

    try {
      const response = await fetch('/api/auth/reset-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password }),
      })

      const data = await response.json()

      if (!response.ok) {
        setError(data.error || 'Failed to reset password')
        setIsLoading(false)
        return
      }

      setSuccess(true)
      setIsLoading(false)

      // Redirect to login after 2 seconds
      setTimeout(() => {
        router.push('/auth/login')
      }, 2000)
    } catch (error) {
      setError('Network error. Please try again.')
      setIsLoading(false)
    }
  }

  if (!domLoaded || isValidating) {
    return (
      <div className="w-full flex items-center justify-center min-h-[400px]">
        <div className="text-gray-500">Validating reset link...</div>
      </div>
    )
  }

  if (error && !password) {
    return (
      <div className="w-full">
        <div className="mb-10">
          <h1 className="text-3xl font-extrabold text-black mb-2 tracking-tight">
            Reset Password
          </h1>
        </div>
        <div className="p-4 bg-red-50 text-red-700 rounded-lg text-sm font-medium border border-red-200 mb-4">
          {error}
        </div>
        <Link
          href="/auth/forgot-password"
          className="block w-full h-14 bg-black hover:bg-gray-800 text-white rounded-xl font-bold text-lg flex items-center justify-center gap-3 transition-colors active:scale-[0.99]"
        >
          Request New Reset Link
        </Link>
      </div>
    )
  }

  if (success) {
    return (
      <div className="w-full">
        <div className="mb-10">
          <h1 className="text-3xl font-extrabold text-black mb-2 tracking-tight">
            Password Reset Successful
          </h1>
          <p className="text-gray-500 font-medium">
            Your password has been reset. Redirecting to login...
          </p>
        </div>
        <div className="p-4 bg-green-50 text-green-700 rounded-lg text-sm font-medium border border-green-200">
          Password has been reset successfully!
        </div>
      </div>
    )
  }

  return (
    <div className="w-full">
      <div className="mb-10">
        <h1 className="text-3xl font-extrabold text-black mb-2 tracking-tight">
          Reset Password
        </h1>
        <p className="text-gray-500 font-medium">
          Enter your new password below.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="group">
          <input
            id="password"
            type="password"
            placeholder="New password"
            className={`w-full h-12 px-4 bg-[#F3F4F6] rounded-xl border-2 border-transparent focus:bg-white focus:border-blue-500 outline-none transition-all font-medium placeholder:text-gray-400 text-black ${
              error ? 'bg-red-50 border-red-200' : ''
            }`}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            disabled={isLoading}
          />
        </div>

        <div className="group">
          <input
            id="confirmPassword"
            type="password"
            placeholder="Confirm new password"
            className={`w-full h-12 px-4 bg-[#F3F4F6] rounded-xl border-2 border-transparent focus:bg-white focus:border-blue-500 outline-none transition-all font-medium placeholder:text-gray-400 text-black ${
              error ? 'bg-red-50 border-red-200' : ''
            }`}
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
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
          {isLoading ? 'Resetting...' : 'Reset Password'}
        </button>
      </form>

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
