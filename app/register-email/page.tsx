'use client'

import { useState } from 'react'
import '../globals.css'

export default function EmailRegistration() {
  const [formData, setFormData] = useState({
    campaignId: '',
    subject: '',
    recipientEmail: ''
  })
  const [result, setResult] = useState('')

  const generateId = () => {
    const id = Date.now() + '-' + Math.random().toString(36).substr(2, 9)
    setFormData({...formData, campaignId: id})
  }

  const registerEmail = async (e: React.FormEvent) => {
    e.preventDefault()
    
    try {
      const response = await fetch('/api/email', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          campaign_id: formData.campaignId,
          subject: formData.subject,
          recipient_email: formData.recipientEmail
        })
      })
      
      if (response.ok) {
        setResult(`✅ Email registered! Use this tracking pixel in your email:
        
<img src="https://skyhost.agency/api/email/track?id=${formData.campaignId}" width="1" height="1" style="display:none;" alt="" />

For localhost testing:
<img src="http://localhost:3000/api/email/track?id=${formData.campaignId}" width="1" height="1" style="display:none;" alt="" />`)
      } else {
        setResult('❌ Error registering email')
      }
    } catch (error) {
      setResult('❌ Error: ' + (error instanceof Error ? error.message : 'Unknown error'))
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-space-black via-navy-dark to-space-black text-white p-8">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold text-white mb-8">Register Email for Tracking</h1>
        
        <div className="bg-red-900/20 border border-red-500/50 rounded-xl p-4 mb-6">
          <p className="text-red-300 text-sm">
            ⚠️ <strong>Important:</strong> Use your public domain (skyhost.agency) in emails, not localhost. 
            Recipients can't access localhost:3000.
          </p>
        </div>
        
        <form onSubmit={registerEmail} className="space-y-6">
          <div className="glass-card p-6">
            <label className="block text-sm font-medium text-gray-300 mb-2">Campaign ID</label>
            <div className="flex gap-2">
              <input
                type="text"
                value={formData.campaignId}
                onChange={(e) => setFormData({...formData, campaignId: e.target.value})}
                className="flex-1 bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-purple-400/50 focus:outline-none transition-colors"
                placeholder="Auto-generated ID"
                required
              />
              <button
                type="button"
                onClick={generateId}
                className="btn-neon-secondary px-6 py-3"
              >
                Generate
              </button>
            </div>
          </div>

          <div className="glass-card p-6">
            <label className="block text-sm font-medium text-gray-300 mb-2">Email Subject</label>
            <input
              type="text"
              value={formData.subject}
              onChange={(e) => setFormData({...formData, subject: e.target.value})}
              className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-purple-400/50 focus:outline-none transition-colors"
              placeholder="Your Project Update"
              required
            />
          </div>

          <div className="glass-card p-6">
            <label className="block text-sm font-medium text-gray-300 mb-2">Recipient Email</label>
            <input
              type="email"
              value={formData.recipientEmail}
              onChange={(e) => setFormData({...formData, recipientEmail: e.target.value})}
              className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-purple-400/50 focus:outline-none transition-colors"
              placeholder="client@example.com"
              required
            />
          </div>

          <button
            type="submit"
            className="btn-neon-primary w-full py-4 text-lg font-semibold"
          >
            Register Email
          </button>
        </form>

        {result && (
          <div className="mt-8 glass-card p-6">
            <h3 className="text-lg font-bold text-white mb-4">Tracking Code:</h3>
            <pre className="text-sm text-gray-300 whitespace-pre-wrap bg-black/30 p-4 rounded-xl overflow-x-auto">{result}</pre>
          </div>
        )}
      </div>
    </div>
  )
}