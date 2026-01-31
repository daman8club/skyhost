'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import { Zap, Lock, User } from 'lucide-react'

export default function AdminLogin() {
  const [credentials, setCredentials] = useState({ username: '', password: '' })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [mounted, setMounted] = useState(false)
  const router = useRouter()

  useEffect(() => {
    setMounted(true)
  }, [])

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(credentials)
      })

      if (response.ok) {
        localStorage.setItem('admin-logged-in', 'true')
        window.location.href = '/admin'
      } else {
        const errorData = await response.json()
        setError(errorData.message || 'Invalid credentials')
      }
    } catch (error) {
      setError('Login failed. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  if (!mounted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-space-black via-navy-dark to-space-black flex items-center justify-center px-6">
        <div className="text-white">Loading...</div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-gray-900 flex items-center justify-center px-6">
      <div className="bg-gray-800/90 backdrop-blur-lg border border-gray-700 rounded-2xl p-8 w-full max-w-md shadow-2xl">
        <div className="text-center mb-8">
          <div className="p-3 bg-blue-500/20 rounded-xl w-fit mx-auto mb-4">
            <Zap className="h-8 w-8 text-blue-400" />
          </div>
          <h1 className="text-2xl font-bold text-white mb-2">Admin Login</h1>
          <p className="text-gray-400">Access Skyhost Digital Admin Panel</p>
        </div>

        <form onSubmit={handleLogin} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Username</label>
            <div className="relative">
              <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                value={credentials.username}
                onChange={(e) => setCredentials({...credentials, username: e.target.value})}
                className="w-full bg-gray-700 border border-gray-600 rounded-xl pl-10 pr-4 py-3 text-white placeholder-gray-400 focus:border-blue-500 focus:outline-none transition-colors"
                placeholder="Enter username"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Password</label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="password"
                value={credentials.password}
                onChange={(e) => setCredentials({...credentials, password: e.target.value})}
                className="w-full bg-gray-700 border border-gray-600 rounded-xl pl-10 pr-4 py-3 text-white placeholder-gray-400 focus:border-blue-500 focus:outline-none transition-colors"
                placeholder="Enter password"
                required
              />
            </div>
          </div>

          {error && (
            <div className="bg-red-500/20 border border-red-500/50 rounded-xl p-3 text-red-300 text-sm">
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-gradient-to-r from-blue-500 to-purple-600 text-white py-3 px-6 rounded-xl font-semibold hover:from-blue-600 hover:to-purple-700 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed transform hover:scale-105"
          >
            {loading ? 'Logging in...' : 'Login'}
          </button>
        </form>

        <div className="mt-6 text-center text-sm text-gray-400">
          Default: admin / admin123
        </div>
      </div>
    </div>
  )
}