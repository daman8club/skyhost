'use client'

import { useState } from 'react'
import { Palette, ArrowRight, CheckCircle } from 'lucide-react'
import { useLeadCapture } from '../../../hooks/useLeadCapture'

export default function UIUXDesign() {
  const [showLeadForm, setShowLeadForm] = useState(false)
  const [leadForm, setLeadForm] = useState({ name: '', email: '', phone: '', message: '' })
  const { submitLead, isSubmitting } = useLeadCapture()

  const handleGetStarted = () => setShowLeadForm(true)

  const handleLeadSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const result = await submitLead({ ...leadForm, source: 'uiux_design_page' })
    if (result.success) {
      setShowLeadForm(false)
      setLeadForm({ name: '', email: '', phone: '', message: '' })
      alert('Thank you! We\'ll contact you soon.')
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-pink-900 to-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-6 py-20">
        <div className="text-center mb-16">
          <div className="w-20 h-20 bg-pink-500/20 rounded-2xl flex items-center justify-center mx-auto mb-8">
            <Palette className="w-10 h-10 text-pink-400" />
          </div>
          <h1 className="text-5xl font-black text-white mb-6">UI/UX Design</h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Beautiful, intuitive designs that captivate users and enhance brand identity
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div className="space-y-8">
            <h2 className="text-3xl font-bold">Design Services</h2>
            <div className="space-y-4">
              {[
                'User Experience (UX) Research',
                'User Interface (UI) Design',
                'Wireframing & Prototyping',
                'Brand Identity Design',
                'Design Systems & Style Guides',
                'Usability Testing'
              ].map((service, index) => (
                <div key={index} className="flex items-center space-x-3">
                  <CheckCircle className="w-5 h-5 text-pink-400" />
                  <span className="text-gray-300">{service}</span>
                </div>
              ))}
            </div>
            <button onClick={handleGetStarted} className="bg-gradient-to-r from-pink-500 to-purple-500 text-white px-8 py-4 rounded-xl font-semibold hover:from-pink-600 hover:to-purple-600 transition-all duration-300">
              Start Design Project
              <ArrowRight className="ml-2 w-5 h-5 inline" />
            </button>
          </div>
        </div>
      </div>

      {showLeadForm && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4">
          <div className="bg-gray-900 rounded-2xl p-8 w-full max-w-md border border-gray-700">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-2xl font-bold text-white">Get Started</h3>
              <button onClick={() => setShowLeadForm(false)} className="text-gray-400 hover:text-white">×</button>
            </div>
            <form onSubmit={handleLeadSubmit} className="space-y-4">
              <input type="text" placeholder="Your Name" value={leadForm.name} onChange={(e) => setLeadForm({...leadForm, name: e.target.value})} className="w-full bg-gray-800 border border-gray-600 rounded-xl px-4 py-3 text-white placeholder-gray-400 focus:border-pink-400 focus:outline-none" required />
              <input type="email" placeholder="Your Email" value={leadForm.email} onChange={(e) => setLeadForm({...leadForm, email: e.target.value})} className="w-full bg-gray-800 border border-gray-600 rounded-xl px-4 py-3 text-white placeholder-gray-400 focus:border-pink-400 focus:outline-none" required />
              <textarea placeholder="Tell us about your design needs" value={leadForm.message} onChange={(e) => setLeadForm({...leadForm, message: e.target.value})} rows={3} className="w-full bg-gray-800 border border-gray-600 rounded-xl px-4 py-3 text-white placeholder-gray-400 focus:border-pink-400 focus:outline-none resize-none" />
              <button type="submit" disabled={isSubmitting} className="w-full bg-gradient-to-r from-pink-500 to-purple-500 text-white py-3 px-6 rounded-xl font-semibold hover:from-pink-600 hover:to-purple-600 transition-all duration-300 disabled:opacity-50">
                {isSubmitting ? 'Submitting...' : 'Send Message'}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}