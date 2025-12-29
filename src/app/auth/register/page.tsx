'use client'

import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useUserStore } from '@/stores'
import { validateEmail, validatePassword, validateUsername } from '@/lib/validators'

export default function RegisterPage() {
  const router = useRouter()
  const { register, error: authError, clearError, isLoading: authLoading } = useUserStore()

  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: ''
  })
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [domLoaded, setDomLoaded] = useState(false)

  // Prevent hydration mismatch
  useEffect(() => {
    setDomLoaded(true)
    clearError()
  }, [clearError])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setErrors({})
    clearError()

    // Validation
    const newErrors: Record<string, string> = {}
    if (!validateUsername(formData.username)) {
      newErrors.username = 'Username must be 3-20 characters, alphanumeric'
    }
    if (!validateEmail(formData.email)) {
      newErrors.email = 'Please enter a valid email address'
    }
    if (!validatePassword(formData.password)) {
      newErrors.password = 'Password must be at least 8 chars with 1 number'
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors)
      return
    }

    setIsLoading(true)

    // Simulate API delay
    setTimeout(() => {
      const success = register(formData.email, formData.password, formData.username)
      setIsLoading(false)
      if (success) {
        router.push('/editor')
      }
    }, 800)
  }

  if (!domLoaded) return null

  return (
    <div className="w-full">
      <div className="mb-10">
        <h1 className="text-3xl font-extrabold text-black mb-2 tracking-tight">
          Create your BENTO
        </h1>
        <p className="text-gray-500 font-medium">Claim your unique link-in-bio page.</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Username Input */}
        <div className="group relative">
          <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 font-medium">
            linkcard.ai/
          </div>
          <input
            id="username"
            type="text"
            placeholder="username"
            className={`w-full h-12 pl-28 pr-4 bg-[#F3F4F6] rounded-xl border-2 border-transparent focus:bg-white focus:border-blue-500 outline-none transition-all font-medium placeholder:text-gray-400 text-black ${errors.username ? 'bg-red-50 border-red-200' : ''
              }`}
            value={formData.username}
            onChange={(e) => setFormData(prev => ({ ...prev, username: e.target.value.toLowerCase().replace(/[^a-z0-9_-]/g, '') }))}
            disabled={isLoading || authLoading}
          />
          {errors.username && (
            <p className="mt-1 text-sm text-red-500 font-medium px-1">{errors.username}</p>
          )}
        </div>

        {/* Email Input */}
        <div className="group">
          <input
            id="email"
            type="email"
            placeholder="Email address"
            className={`w-full h-12 px-4 bg-[#F3F4F6] rounded-xl border-2 border-transparent focus:bg-white focus:border-blue-500 outline-none transition-all font-medium placeholder:text-gray-400 text-black ${errors.email ? 'bg-red-50 border-red-200' : ''
              }`}
            value={formData.email}
            onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
            disabled={isLoading || authLoading}
          />
          {errors.email && (
            <p className="mt-1 text-sm text-red-500 font-medium px-1">{errors.email}</p>
          )}
        </div>

        {/* Password Input */}
        <div className="group relative">
          <input
            id="password"
            type={showPassword ? "text" : "password"}
            placeholder="Password"
            className={`w-full h-12 px-4 bg-[#F3F4F6] rounded-xl border-2 border-transparent focus:bg-white focus:border-blue-500 outline-none transition-all font-medium placeholder:text-gray-400 text-black pr-20 ${errors.password ? 'bg-red-50 border-red-200' : ''
              }`}
            value={formData.password}
            onChange={(e) => setFormData(prev => ({ ...prev, password: e.target.value }))}
            disabled={isLoading || authLoading}
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-1/2 -translate-y-1/2 px-3 py-1 bg-white hover:bg-gray-100 rounded-lg text-xs font-bold text-black border border-gray-200 transition-colors"
          >
            {showPassword ? 'Hide' : 'Show'}
          </button>

          {errors.password && (
            <p className="mt-1 text-sm text-red-500 font-medium px-1">{errors.password}</p>
          )}
        </div>

        {authError && (
          <div className="p-3 bg-red-50 text-red-600 rounded-lg text-sm font-medium border border-red-100">
            {authError}
          </div>
        )}

        <button
          type="submit"
          disabled={isLoading || authLoading}
          className="w-full h-12 bg-black hover:bg-gray-800 text-white rounded-xl font-bold flex items-center justify-center gap-2 transition-all active:scale-[0.99] disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isLoading || authLoading ? 'Creating account...' : 'Create Account'}
        </button>

        <div className="pt-2">
          <p className="text-xs font-bold text-black uppercase tracking-wider mb-3">OR</p>

          <button
            type="button"
            className="w-full h-12 bg-[#1A9CF0] hover:bg-[#168AD4] text-white rounded-xl font-bold flex items-center justify-center gap-3 transition-colors active:scale-[0.99]"
          >
            <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24"><path d="M7 11v2.4h3.97c-.16 1.029-1.2 3.02-3.97 3.02-2.39 0-4.34-1.979-4.34-4.42 0-2.44 1.95-4.42 4.34-4.42 1.36 0 2.27.58 2.79 1.08l1.9-1.83c-1.22-1.14-2.8-1.83-4.69-1.83-3.87 0-7 3.13-7 7s3.13 7 7 7c4.04 0 6.721-2.84 6.721-6.84 0-.46-.051-.81-.111-1.16h-6.61z" /></svg>
            Sign up with Google
          </button>
        </div>
      </form>

      <div className="mt-8">
        <p className="text-sm text-gray-500">
          Already have an account? <Link href="/auth/login" className="text-gray-900 font-medium underline hover:text-black">Log in</Link>
        </p>
      </div>
    </div>
  )
}
