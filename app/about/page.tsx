'use client'

import { motion } from 'framer-motion'
import { Rocket, Shield, Zap, Users } from 'lucide-react'

export default function About() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-6 py-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <h1 className="text-6xl font-black text-white mb-6">About Skyhost Digital</h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            We're digital architects building the future of NYC's online presence, one lightning-fast website at a time.
          </p>
        </motion.div>

        {/* Our Story */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="glass-card p-12 mb-20"
        >
          <h2 className="text-4xl font-bold text-center mb-8">Our Story</h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <p className="text-lg text-gray-300 leading-relaxed mb-6">
                Founded in NYC, Skyhost Digital emerged from a simple belief: every business deserves a website that loads before you blink.
              </p>
              <p className="text-lg text-gray-300 leading-relaxed mb-6">
                Our mission is to digitize NYC with our "Speed-First" philosophy. We craft digital experiences that drive real results.
              </p>
              <p className="text-lg text-gray-300 leading-relaxed">
                We've helped 500+ businesses achieve an average of 340% growth.
              </p>
            </div>
            <div className="flex justify-center">
              <div className="w-80 h-80 bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-full flex items-center justify-center">
                <Rocket className="w-32 h-32 text-cyan-400" />
              </div>
            </div>
          </div>
        </motion.div>

        {/* Our Values */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          <h2 className="text-4xl font-bold text-center mb-12">Our Values</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="glass-card p-8 text-center hover:bg-white/10 transition-all duration-300">
              <div className="w-16 h-16 bg-blue-500/20 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <Zap className="w-8 h-8 text-blue-400" />
              </div>
              <h3 className="text-2xl font-bold mb-4">Speed-First</h3>
              <p className="text-gray-300 leading-relaxed">
                Every millisecond matters. We build websites that load instantly and perform flawlessly.
              </p>
            </div>

            <div className="glass-card p-8 text-center hover:bg-white/10 transition-all duration-300">
              <div className="w-16 h-16 bg-purple-500/20 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <Shield className="w-8 h-8 text-purple-400" />
              </div>
              <h3 className="text-2xl font-bold mb-4">Quality Craftsmanship</h3>
              <p className="text-gray-300 leading-relaxed">
                Every line of code is crafted with precision and tested for perfection.
              </p>
            </div>

            <div className="glass-card p-8 text-center hover:bg-white/10 transition-all duration-300">
              <div className="w-16 h-16 bg-cyan-500/20 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <Users className="w-8 h-8 text-cyan-400" />
              </div>
              <h3 className="text-2xl font-bold mb-4">Client Success</h3>
              <p className="text-gray-300 leading-relaxed">
                Your success is our success. We're not satisfied until your business is thriving online.
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  )
}