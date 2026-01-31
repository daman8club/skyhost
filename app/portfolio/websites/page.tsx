'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Globe, ArrowRight, Star } from 'lucide-react'
import { useLeadCapture } from '../../../hooks/useLeadCapture'

export default function Websites() {
  const [showLeadForm, setShowLeadForm] = useState(false)
  const [leadForm, setLeadForm] = useState({ name: '', email: '', phone: '', message: '' })
  const { submitLead, isSubmitting } = useLeadCapture()

  const handleGetStarted = () => setShowLeadForm(true)

  const handleLeadSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const result = await submitLead({ ...leadForm, source: 'websites_portfolio' })
    if (result.success) {
      setShowLeadForm(false)
      setLeadForm({ name: '', email: '', phone: '', message: '' })
      alert('Thank you! We\'ll contact you soon.')
    }
  }

  const projects = [
    {
      title: 'Rivers Cafe NYC',
      image: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=600&h=400&fit=crop',
      tech: ['Next.js', 'Tailwind', 'Vercel'],
      rating: 4.9
    },
    {
      title: 'FinanceFlow Dashboard',
      image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&h=400&fit=crop',
      tech: ['React', 'D3.js', 'Node.js'],
      rating: 4.8
    },
    {
      title: 'MedTech Solutions',
      image: 'https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=600&h=400&fit=crop',
      tech: ['Vue.js', 'Laravel', 'MySQL'],
      rating: 4.7
    }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-6 py-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <div className="w-20 h-20 bg-blue-500/20 rounded-2xl flex items-center justify-center mx-auto mb-8">
            <Globe className="w-10 h-10 text-blue-400" />
          </div>
          <h1 className="text-5xl font-black text-white mb-6">Website Portfolio</h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Stunning websites that deliver exceptional user experiences and drive business growth
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {projects.map((project, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-gray-800/50 rounded-2xl overflow-hidden hover:bg-gray-800/70 transition-colors"
            >
              <img src={project.image} alt={project.title} className="w-full h-48 object-cover" />
              <div className="p-6">
                <h3 className="text-xl font-bold text-white mb-2">{project.title}</h3>
                <div className="flex items-center space-x-2 mb-4">
                  <Star className="w-4 h-4 text-yellow-400 fill-current" />
                  <span className="text-gray-300">{project.rating}</span>
                </div>
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.tech.map((tech) => (
                    <span key={tech} className="px-3 py-1 bg-blue-500/20 rounded-full text-xs text-blue-400">
                      {tech}
                    </span>
                  ))}
                </div>
                <button onClick={handleGetStarted} className="w-full bg-gradient-to-r from-blue-500 to-purple-600 text-white py-2 px-4 rounded-xl font-semibold hover:from-blue-600 hover:to-purple-700 transition-all duration-300">
                  Get Similar Website
                </button>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="text-center">
          <button onClick={handleGetStarted} className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-8 py-4 rounded-xl font-semibold hover:from-blue-600 hover:to-purple-700 transition-all duration-300">
            Start Your Website Project
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
              <textarea placeholder="Describe your website needs" value={leadForm.message} onChange={(e) => setLeadForm({...leadForm, message: e.target.value})} rows={3} className="w-full bg-gray-800 border border-gray-600 rounded-xl px-4 py-3 text-white placeholder-gray-400 focus:border-blue-400 focus:outline-none resize-none" />
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