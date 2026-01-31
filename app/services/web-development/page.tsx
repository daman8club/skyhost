'use client'

import { motion } from 'framer-motion'
import { Rocket, ArrowLeft, Code, Globe, Zap } from 'lucide-react'
import Link from 'next/link'

export default function WebDevelopment() {
  return (
    <div className="min-h-screen pt-24 px-6">
      <div className="max-w-4xl mx-auto">
        <Link href="/" className="inline-flex items-center text-blue-400 hover:text-white mb-8 transition-colors">
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Home
        </Link>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="glass-card p-12"
        >
          <div className="text-center mb-12">
            <div className="w-20 h-20 bg-blue-400/20 rounded-2xl flex items-center justify-center mx-auto mb-6">
              <Rocket className="w-10 h-10 text-blue-400" />
            </div>
            <h1 className="text-5xl font-black text-white mb-6">Web Development</h1>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              Lightning-fast, responsive websites built with cutting-edge technology and optimized for performance
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            <div className="text-center">
              <Code className="w-8 h-8 text-blue-400 mx-auto mb-4" />
              <h3 className="text-xl font-bold text-white mb-2">Modern Tech Stack</h3>
              <p className="text-gray-400">Next.js, React, TypeScript</p>
            </div>
            <div className="text-center">
              <Globe className="w-8 h-8 text-blue-400 mx-auto mb-4" />
              <h3 className="text-xl font-bold text-white mb-2">Global CDN</h3>
              <p className="text-gray-400">Lightning-fast worldwide</p>
            </div>
            <div className="text-center">
              <Zap className="w-8 h-8 text-blue-400 mx-auto mb-4" />
              <h3 className="text-xl font-bold text-white mb-2">Performance</h3>
              <p className="text-gray-400">99.9% uptime guarantee</p>
            </div>
          </div>
          
          <div className="text-center">
            <button className="btn-neon-primary">
              Start Your Project
            </button>
          </div>
        </motion.div>
      </div>
    </div>
  )
}