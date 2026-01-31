'use client'

import { motion } from 'framer-motion'
import { Rocket, Code, Palette, TrendingUp, MapPin, Clock, DollarSign } from 'lucide-react'

export default function Careers() {
  const jobs = [
    {
      title: 'Senior Next.js Developer',
      department: 'Engineering',
      location: 'NYC / Remote',
      type: 'Full-time',
      salary: '$120k - $160k',
      description: 'Build lightning-fast web applications using Next.js, React, and cutting-edge technologies.',
      requirements: ['5+ years React/Next.js', 'TypeScript expert', 'Performance optimization', 'Team leadership'],
      icon: Code
    },
    {
      title: 'UI/UX Architect',
      department: 'Design',
      location: 'NYC',
      type: 'Full-time',
      salary: '$100k - $140k',
      description: 'Design beautiful, intuitive interfaces that convert visitors into customers.',
      requirements: ['Figma mastery', 'Design systems', 'User research', 'Prototyping'],
      icon: Palette
    },
    {
      title: 'Growth Marketing Manager',
      department: 'Marketing',
      location: 'NYC / Hybrid',
      type: 'Full-time',
      salary: '$90k - $120k',
      description: 'Drive explosive growth through data-driven marketing strategies and SEO optimization.',
      requirements: ['SEO expertise', 'Analytics pro', 'Content strategy', 'A/B testing'],
      icon: TrendingUp
    },
    {
      title: 'DevOps Engineer',
      department: 'Infrastructure',
      location: 'Remote',
      type: 'Full-time',
      salary: '$110k - $150k',
      description: 'Scale our infrastructure to handle millions of requests with zero downtime.',
      requirements: ['AWS/GCP expert', 'Docker/K8s', 'CI/CD pipelines', 'Monitoring'],
      icon: Rocket
    }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-6 py-20">
        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <div className="inline-flex items-center px-6 py-3 bg-purple-500/20 rounded-full border border-purple-400/30 mb-8">
            <Rocket className="w-5 h-5 text-purple-400 mr-2" />
            <span className="text-purple-300 font-semibold">Join the Future</span>
          </div>
          <h1 className="text-7xl font-black text-white mb-6">
            Build the <span className="gradient-text">Future</span> with Us
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Join NYC's fastest-growing digital agency. We're not just building websites—we're crafting 
            the digital experiences that will define tomorrow.
          </p>
        </motion.div>

        {/* Why Join Us */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="glass-card p-12 mb-20"
        >
          <h2 className="text-4xl font-bold text-center mb-12">Why Skyhost Digital?</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-cyan-500/20 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <Rocket className="w-8 h-8 text-cyan-400" />
              </div>
              <h3 className="text-xl font-bold mb-4">Cutting-Edge Tech</h3>
              <p className="text-gray-300">Work with the latest technologies and tools in a fast-paced, innovative environment.</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-purple-500/20 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <TrendingUp className="w-8 h-8 text-purple-400" />
              </div>
              <h3 className="text-xl font-bold mb-4">Rapid Growth</h3>
              <p className="text-gray-300">Join a company that's scaling fast with unlimited opportunities for career advancement.</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-green-500/20 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <DollarSign className="w-8 h-8 text-green-400" />
              </div>
              <h3 className="text-xl font-bold mb-4">Competitive Package</h3>
              <p className="text-gray-300">Top-tier salaries, equity, health benefits, and unlimited PTO in the heart of NYC.</p>
            </div>
          </div>
        </motion.div>

        {/* Open Positions */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          <h2 className="text-4xl font-bold text-center mb-12">Open Positions</h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {jobs.map((job, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 * index }}
                className="glass-card p-8 hover:bg-white/10 transition-all duration-300 group"
              >
                <div className="flex items-start justify-between mb-6">
                  <div className="flex items-center">
                    <div className="w-12 h-12 bg-cyan-500/20 rounded-xl flex items-center justify-center mr-4 group-hover:bg-cyan-500/30 transition-colors">
                      <job.icon className="w-6 h-6 text-cyan-400" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-white">{job.title}</h3>
                      <p className="text-cyan-400 font-semibold">{job.department}</p>
                    </div>
                  </div>
                </div>

                <p className="text-gray-300 mb-6 leading-relaxed">{job.description}</p>

                <div className="grid grid-cols-2 gap-4 mb-6 text-sm">
                  <div className="flex items-center text-gray-400">
                    <MapPin className="w-4 h-4 mr-2" />
                    {job.location}
                  </div>
                  <div className="flex items-center text-gray-400">
                    <Clock className="w-4 h-4 mr-2" />
                    {job.type}
                  </div>
                  <div className="flex items-center text-gray-400 col-span-2">
                    <DollarSign className="w-4 h-4 mr-2" />
                    {job.salary}
                  </div>
                </div>

                <div className="mb-6">
                  <h4 className="text-sm font-semibold text-gray-300 mb-3">Requirements:</h4>
                  <div className="flex flex-wrap gap-2">
                    {job.requirements.map((req, i) => (
                      <span key={i} className="px-3 py-1 bg-purple-500/20 rounded-full text-xs text-purple-300">
                        {req}
                      </span>
                    ))}
                  </div>
                </div>

                <button className="w-full glass border border-cyan-400/30 text-cyan-400 py-3 px-6 rounded-xl font-semibold hover:bg-cyan-400/10 hover:border-cyan-400/50 transition-all duration-300">
                  Apply Now
                </button>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="text-center mt-20"
        >
          <div className="glass-card p-12">
            <h2 className="text-4xl font-bold text-white mb-6">Don't See Your Role?</h2>
            <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
              We're always looking for exceptional talent. Send us your resume and let's talk about 
              how you can help shape the future of digital experiences.
            </p>
            <button className="btn-neon-primary">
              Send Your Resume
            </button>
          </div>
        </motion.div>
      </div>
    </div>
  )
}