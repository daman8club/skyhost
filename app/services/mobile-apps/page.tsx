'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Smartphone, ArrowRight, CheckCircle, Star } from 'lucide-react'
import { useLeadCapture } from '../../../hooks/useLeadCapture'

export default function MobileApps() {
  const [showLeadForm, setShowLeadForm] = useState(false)
  const [leadForm, setLeadForm] = useState({ name: '', email: '', phone: '', message: '' })
  const { submitLead, isSubmitting } = useLeadCapture()

  const handleGetStarted = () => setShowLeadForm(true)

  const handleLeadSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const result = await submitLead({ ...leadForm, source: 'mobile_apps_page' })
    if (result.success) {
      setShowLeadForm(false)
      setLeadForm({ name: '', email: '', phone: '', message: '' })
      alert('Thank you! We\'ll contact you soon.')
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-6 py-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <div className="w-20 h-20 bg-purple-500/20 rounded-2xl flex items-center justify-center mx-auto mb-8">
            <Smartphone className="w-10 h-10 text-purple-400" />
          </div>
          <h1 className="text-5xl font-black text-white mb-6">Mobile App Development</h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Native and cross-platform mobile applications that deliver exceptional user experiences
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
          <div className="space-y-8">
            <h2 className="text-3xl font-bold">What We Offer</h2>
            <div className="space-y-4">
              {[
                'Native iOS & Android Development',
                'Cross-Platform Solutions (React Native, Flutter)',
                'UI/UX Design for Mobile',
                'App Store Optimization',
                'Backend Integration',
                'Push Notifications & Analytics'
              ].map((feature, index) => (
                <div key={index} className="flex items-center space-x-3">
                  <CheckCircle className="w-5 h-5 text-green-400" />
                  <span className="text-gray-300">{feature}</span>
                </div>
              ))}
            </div>
            <button onClick={handleGetStarted} className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-8 py-4 rounded-xl font-semibold hover:from-purple-600 hover:to-pink-600 transition-all duration-300">
              Start Your App Project
              <ArrowRight className="ml-2 w-5 h-5 inline" />
            </button>
          </div>
          
          <div className="bg-gray-800/50 rounded-2xl p-8">
            <h3 className="text-2xl font-bold mb-6">Recent Projects</h3>
            <div className="space-y-6">
              {[
                { name: 'FitTracker Pro', rating: 4.8, downloads: '50K+' },
                { name: 'EcoShop Mobile', rating: 4.9, downloads: '100K+' },
                { name: 'FinanceFlow App', rating: 4.7, downloads: '25K+' }
              ].map((project, index) => (
                <div key={index} className="flex justify-between items-center p-4 bg-gray-700/50 rounded-xl">
                  <div>
                    <h4 className="font-semibold">{project.name}</h4>
                    <div className="flex items-center space-x-2 text-sm text-gray-400">
                      <Star className="w-4 h-4 text-yellow-400 fill-current" />
                      <span>{project.rating}</span>
                      <span>•</span>
                      <span>{project.downloads} downloads</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {showLeadForm && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4">
          <div className="bg-gray-900 rounded-2xl p-8 w-full max-w-md border border-gray-700">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-2xl font-bold text-white">Get Started</h3>
              <button onClick={() => setShowLeadForm(false)} className="text-gray-400 hover:text-white">
                ×
              </button>
            </div>
            
            <form onSubmit={handleLeadSubmit} className="space-y-4">
              <input
                type="text"
                placeholder="Your Name"
                value={leadForm.name}
                onChange={(e) => setLeadForm({...leadForm, name: e.target.value})}
                className="w-full bg-gray-800 border border-gray-600 rounded-xl px-4 py-3 text-white placeholder-gray-400 focus:border-purple-400 focus:outline-none"
                required
              />
              <input
                type="email"
                placeholder="Your Email"
                value={leadForm.email}
                onChange={(e) => setLeadForm({...leadForm, email: e.target.value})}
                className="w-full bg-gray-800 border border-gray-600 rounded-xl px-4 py-3 text-white placeholder-gray-400 focus:border-purple-400 focus:outline-none"
                required
              />
              <textarea
                placeholder="Tell us about your app idea"
                value={leadForm.message}
                onChange={(e) => setLeadForm({...leadForm, message: e.target.value})}
                rows={3}
                className="w-full bg-gray-800 border border-gray-600 rounded-xl px-4 py-3 text-white placeholder-gray-400 focus:border-purple-400 focus:outline-none resize-none"
              />
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-gradient-to-r from-purple-500 to-pink-500 text-white py-3 px-6 rounded-xl font-semibold hover:from-purple-600 hover:to-pink-600 transition-all duration-300 disabled:opacity-50"
              >
                {isSubmitting ? 'Submitting...' : 'Send Message'}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}