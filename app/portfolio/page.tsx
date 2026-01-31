'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { ArrowRight, Globe, Smartphone, TrendingUp } from 'lucide-react'

export default function Portfolio() {
  const categories = [
    {
      title: 'Websites',
      description: 'Lightning-fast, responsive websites that convert visitors into customers',
      icon: Globe,
      link: '/portfolio/websites',
      count: '50+ Projects'
    },
    {
      title: 'Mobile Apps',
      description: 'Native and cross-platform mobile applications with exceptional UX',
      icon: Smartphone,
      link: '/portfolio/mobile-apps',
      count: '25+ Apps'
    },
    {
      title: 'SEO Results',
      description: 'Proven SEO strategies that drive organic traffic and rankings',
      icon: TrendingUp,
      link: '/portfolio/seo-results',
      count: '100+ Campaigns'
    }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-6 py-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-20"
        >
          <h1 className="text-6xl font-black text-white mb-6">Our Portfolio</h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Explore our work across websites, mobile apps, and digital marketing campaigns that have driven real results for NYC businesses.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {categories.map((category, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="glass-card p-8 text-center group hover:bg-white/10 transition-all duration-300"
            >
              <div className="w-20 h-20 bg-blue-500/20 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:bg-blue-500/30 transition-colors">
                <category.icon className="w-10 h-10 text-blue-400" />
              </div>
              <h3 className="text-2xl font-bold mb-4">{category.title}</h3>
              <p className="text-gray-300 mb-6">{category.description}</p>
              <div className="text-cyan-400 font-semibold mb-6">{category.count}</div>
              <Link href={category.link} className="btn-neon-primary group">
                View Projects
                <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  )
}