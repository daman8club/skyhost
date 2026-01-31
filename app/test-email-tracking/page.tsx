'use client'

import { useState } from 'react'
import '../globals.css'

export default function TestEmailTracking() {
  const [campaignId, setCampaignId] = useState('')
  const [result, setResult] = useState('')
  const [tablesCreated, setTablesCreated] = useState(false)

  const createTables = async () => {
    try {
      const response = await fetch('/api/init-email-tables', { 
        method: 'POST',
        headers: { 'Content-Type': 'application/json' }
      })
      const data = await response.json()
      console.log('Response:', data)
      if (data.success) {
        setTablesCreated(true)
        setResult('✅ Tables created successfully!')
      } else {
        setResult('❌ Error: ' + data.error)
      }
    } catch (error) {
      setResult('❌ Error: ' + error.message)
    }
  }

  const testTracking = async () => {
    const id = Date.now() + '-test'
    
    // 1. Create test campaign
    await fetch('/api/email', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        campaign_id: id,
        subject: 'Test Email',
        recipient_email: 'test@example.com'
      })
    })
    
    setCampaignId(id)
    
    // 2. Load tracking pixel
    const img = new Image()
    img.onload = () => setResult('✅ Tracking works! Check admin panel.')
    img.src = `/api/email/track?id=${id}`
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-space-black via-navy-dark to-space-black text-white p-8">
      <div className="max-w-xl mx-auto">
        <h1 className="text-3xl font-bold text-white mb-8">Test Email Tracking</h1>
        
        <div className="space-y-6">
          <div className="glass-card p-6">
            <h2 className="text-xl font-semibold text-white mb-4">Step 1: Initialize Database</h2>
            <button 
              onClick={createTables}
              className="btn-neon-primary px-6 py-3"
              disabled={tablesCreated}
            >
              {tablesCreated ? '✅ Tables Created' : 'Create Email Tables'}
            </button>
          </div>
          
          <div className="glass-card p-6">
            <h2 className="text-xl font-semibold text-white mb-4">Step 2: Test Tracking</h2>
            <button 
              onClick={testTracking}
              className="btn-neon-secondary px-6 py-3"
              disabled={!tablesCreated}
            >
              Test Tracking Pixel
            </button>
          </div>
        </div>
        
        {result && (
          <div className="mt-8 glass-card p-6">
            <h3 className="text-lg font-bold text-white mb-2">Result:</h3>
            <p className="text-green-400">{result}</p>
          </div>
        )}
        
        {campaignId && (
          <div className="mt-6 glass-card p-6">
            <h3 className="text-lg font-bold text-white mb-4">Test Details:</h3>
            <div className="space-y-3">
              <div>
                <span className="text-gray-400">Campaign ID:</span>
                <code className="ml-2 text-sm text-cyan-400">{campaignId}</code>
              </div>
              <div>
                <span className="text-gray-400">Tracking URL:</span>
                <code className="ml-2 text-sm text-cyan-400 break-all">
                  http://localhost:3000/api/email/track?id={campaignId}
                </code>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}