'use client'

import { useEffect } from 'react'

declare global {
  interface Window {
    Tawk_API?: any
    Tawk_LoadStart?: Date
  }
}

export default function TawkChat() {
  useEffect(() => {
    // Prevent multiple loads
    if (window.Tawk_API) return
    
    // Initialize Tawk_API
    window.Tawk_API = window.Tawk_API || {}
    window.Tawk_LoadStart = new Date()
    
    // Create and load script
    const script = document.createElement('script')
    script.async = true
    script.src = 'https://embed.tawk.to/676b8b7e49e2fd8dfef6b8b8/1ig4rnhqj'
    script.charset = 'UTF-8'
    script.setAttribute('crossorigin', '*')
    
    // Force load
    script.onload = () => {
      console.log('Tawk.to loaded successfully')
    }
    
    script.onerror = () => {
      console.error('Failed to load Tawk.to')
    }
    
    // Insert script into head
    document.head.appendChild(script)
  }, [])

  return null
}