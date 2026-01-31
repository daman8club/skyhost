'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Mail, Phone, MapPin, Send, CheckCircle } from 'lucide-react'
import { useLeadCapture } from '../../hooks/useLeadCapture'

export default function Contact() {
  const [leadForm, setLeadForm] = useState({ name: '', email: '', phone: '', message: '' })
  const { submitLead, isSubmitting } = useLeadCapture()
  const [success, setSuccess] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const result = await submitLead({ ...leadForm, source: 'contact_page' })
    if (result.success) {
      setSuccess(true)
      setLeadForm({ name: '', email: '', phone: '', message: '' })
      setTimeout(() => setSuccess(false), 5000)
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
          <h1 className="text-6xl font-black text-white mb-6">Get In Touch</h1>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Ready to transform your digital presence? Let's discuss your project and build something amazing together.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="glass-card p-8"
          >
            <h2 className="text-3xl font-bold mb-8 text-center">Send us a message</h2>
            
            {success && (
              <div className="mb-6 p-4 bg-green-500/20 border border-green-500/50 rounded-xl flex items-center space-x-3">
                <CheckCircle className="w-5 h-5 text-green-400" />
                <span className="text-green-300">Thank you! We'll contact you soon.</span>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input
                  type="text"
                  placeholder="Your Name"
                  value={leadForm.name}
                  onChange={(e) => setLeadForm({...leadForm, name: e.target.value})}
                  className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-4 text-white placeholder-gray-400 focus:border-cyan-400 focus:outline-none transition-colors"
                  required
                />
                <input
                  type="email"
                  placeholder="Your Email"
                  value={leadForm.email}
                  onChange={(e) => setLeadForm({...leadForm, email: e.target.value})}
                  className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-4 text-white placeholder-gray-400 focus:border-cyan-400 focus:outline-none transition-colors"
                  required
                />
              </div>
              
              <input
                type="tel"
                placeholder="Phone Number (Optional)"
                value={leadForm.phone}
                onChange={(e) => setLeadForm({...leadForm, phone: e.target.value})}
                className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-4 text-white placeholder-gray-400 focus:border-cyan-400 focus:outline-none transition-colors"
              />
              
              <textarea
                placeholder="Tell us about your project..."
                value={leadForm.message}
                onChange={(e) => setLeadForm({...leadForm, message: e.target.value})}
                rows={6}
                className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-4 text-white placeholder-gray-400 focus:border-cyan-400 focus:outline-none resize-none transition-colors"
                required
              />
              
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full btn-neon-primary disabled:opacity-50 flex items-center justify-center space-x-2"
              >
                <Send className="w-5 h-5" />
                <span>{isSubmitting ? 'Sending...' : 'Send Message'}</span>
              </button>
            </form>
          </motion.div>

          {/* Contact Info & Map */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-8"
          >
            {/* Contact Information */}
            <div className="glass-card p-8">
              <h2 className="text-2xl font-bold mb-6">Contact Information</h2>
              <div className="space-y-6">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-blue-500/20 rounded-xl flex items-center justify-center">
                    <Mail className="w-6 h-6 text-blue-400" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-white">Email</h3>
                    <p className="text-gray-300">mail@skyhost.agency</p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-green-500/20 rounded-xl flex items-center justify-center">
                    <Phone className="w-6 h-6 text-green-400" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-white">Phone</h3>
                    <p className="text-gray-300">++91 9024892525</p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-purple-500/20 rounded-xl flex items-center justify-center">
                    <MapPin className="w-6 h-6 text-purple-400" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-white">Location</h3>
                    <p className="text-gray-300">Cloud-Based Operations | Serving Globally</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Mock Google Maps */}
            <div className="glass-card p-8">
              <h3 className="text-xl font-bold mb-4">Our NYC Office</h3>
              <div className="w-full h-64 bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-xl flex items-center justify-center border border-white/10">
                <div className="text-center">
                  <MapPin className="w-12 h-12 text-cyan-400 mx-auto mb-4" />
                  <p className="text-gray-300">Interactive Map</p>
                  <p className="text-sm text-gray-400">Cloud-Based Operations | Serving Globally</p>
                </div>
              </div>
            </div>

            {/* Why Choose Us */}
            <div className="glass-card p-8">
              <h3 className="text-xl font-bold mb-4">Why Choose Us?</h3>
              <div className="space-y-3">
                {[
                  '24/7 Support & Maintenance',
                  '30-Day Launch Guarantee',
                  'NYC Local Team',
                  'Proven Track Record'
                ].map((benefit, index) => (
                  <div key={index} className="flex items-center space-x-3">
                    <CheckCircle className="w-5 h-5 text-green-400" />
                    <span className="text-gray-300">{benefit}</span>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  )
}