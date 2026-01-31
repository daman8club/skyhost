'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Users, Award, CheckCircle, ArrowRight } from 'lucide-react'
import { useLeadCapture } from '../../../hooks/useLeadCapture'

export default function About() {
  const [showLeadForm, setShowLeadForm] = useState(false)
  const [leadForm, setLeadForm] = useState({ name: '', email: '', phone: '', message: '' })
  const { submitLead, isSubmitting } = useLeadCapture()

  const handleGetStarted = () => setShowLeadForm(true)

  const handleLeadSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const result = await submitLead({ ...leadForm, source: 'about_page' })
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
          <h1 className="text-5xl font-black text-white mb-6">About Skyhost Digital</h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Transforming NYC businesses with cutting-edge digital solutions since 2020
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="bg-gray-800/50 rounded-2xl p-8 text-center"
          >
            <div className="w-16 h-16 bg-blue-400/20 rounded-2xl flex items-center justify-center mx-auto mb-6">
              <Users className="w-8 h-8 text-blue-400" />
            </div>
            <h3 className="text-2xl font-bold text-white mb-4">Our Mission</h3>
            <p className="text-gray-300 leading-relaxed">Empowering NYC businesses through innovative technology and exceptional digital experiences that drive real results.</p>
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-gray-800/50 rounded-2xl p-8 text-center"
          >
            <div className="w-16 h-16 bg-purple-400/20 rounded-2xl flex items-center justify-center mx-auto mb-6">
              <Award className="w-8 h-8 text-purple-400" />
            </div>
            <h3 className="text-2xl font-bold text-white mb-4">Our Vision</h3>
            <p className="text-gray-300 leading-relaxed">To be the leading digital transformation partner for businesses across New York City and beyond.</p>
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-gray-800/50 rounded-2xl p-8 text-center"
          >
            <div className="w-16 h-16 bg-cyan-400/20 rounded-2xl flex items-center justify-center mx-auto mb-6">
              <CheckCircle className="w-8 h-8 text-cyan-400" />
            </div>
            <h3 className="text-2xl font-bold text-white mb-4">Our Values</h3>
            <p className="text-gray-300 leading-relaxed">Quality craftsmanship, innovative solutions, and unwavering commitment to client success in every project.</p>
          </motion.div>
        </div>

        <div className="text-center">
          <button onClick={handleGetStarted} className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-8 py-4 rounded-xl font-semibold hover:from-blue-600 hover:to-purple-700 transition-all duration-300">
            Work With Us
            <ArrowRight className="ml-2 w-5 h-5 inline" />
          </button>
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
              <input type="text" placeholder="Your Name" value={leadForm.name} onChange={(e) => setLeadForm({...leadForm, name: e.target.value})} className="w-full bg-gray-800 border border-gray-600 rounded-xl px-4 py-3 text-white placeholder-gray-400 focus:border-blue-400 focus:outline-none" required />
              <input type="email" placeholder="Your Email" value={leadForm.email} onChange={(e) => setLeadForm({...leadForm, email: e.target.value})} className="w-full bg-gray-800 border border-gray-600 rounded-xl px-4 py-3 text-white placeholder-gray-400 focus:border-blue-400 focus:outline-none" required />
              <textarea placeholder="Tell us about your project" value={leadForm.message} onChange={(e) => setLeadForm({...leadForm, message: e.target.value})} rows={3} className="w-full bg-gray-800 border border-gray-600 rounded-xl px-4 py-3 text-white placeholder-gray-400 focus:border-blue-400 focus:outline-none resize-none" />
              <button type="submit" disabled={isSubmitting} className="w-full bg-gradient-to-r from-blue-500 to-purple-600 text-white py-3 px-6 rounded-xl font-semibold hover:from-blue-600 hover:to-purple-700 transition-all duration-300 disabled:opacity-50">
                {isSubmitting ? 'Submitting...' : 'Send Message'}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}