'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { ArrowRight, Code, Smartphone, TrendingUp, Palette, Bot, Server } from 'lucide-react'

export default function Services() {
  const services = [
    {
      title: 'Web Development',
      description: 'Lightning-fast, responsive websites built with cutting-edge technology',
      icon: Code,
      link: '/services/web-development',
      features: ['Next.js', 'React', 'Performance Optimization']
    },
    {
      title: 'Mobile Apps',
      description: 'Native and cross-platform mobile applications that deliver exceptional UX',
      icon: Smartphone,
      link: '/services/mobile-apps',
      features: ['React Native', 'Flutter', 'iOS & Android']
    },
    {
      title: 'SEO & Marketing',
      description: 'Data-driven marketing strategies that boost your online presence',
      icon: TrendingUp,
      link: '/services/seo-marketing',
      features: ['SEO Optimization', 'PPC Campaigns', 'Analytics']
    },
    {
      title: 'UI/UX Design',
      description: 'Beautiful, intuitive designs that captivate users and enhance brand identity',
      icon: Palette,
      link: '/services/ui-ux-design',
      features: ['User Research', 'Prototyping', 'Design Systems']
    },
    {
      title: 'AI Integration',
      description: 'Cutting-edge AI solutions that automate processes and enhance experiences',
      icon: Bot,
      link: '/services/ai-integration',
      features: ['Machine Learning', 'Chatbots', 'Automation']
    },
    {
      title: 'Cloud Solutions',
      description: 'Scalable cloud infrastructure and deployment solutions for modern applications',
      icon: Server,
      link: '/services/cloud-solutions',
      features: ['AWS', 'DevOps', 'Scalability']
    }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-6 py-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-20"
        >
          <h1 className="text-6xl font-black text-white mb-6">Our Services</h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Comprehensive digital solutions designed to accelerate your business growth and establish your competitive advantage in the NYC market.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="glass-card p-8 group hover:bg-white/10 transition-all duration-300"
            >
              <div className="w-16 h-16 bg-purple-500/20 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-purple-500/30 transition-colors">
                <service.icon className="w-8 h-8 text-purple-400" />
              </div>
              <h3 className="text-2xl font-bold mb-4">{service.title}</h3>
              <p className="text-gray-300 mb-6">{service.description}</p>
              
              <div className="flex flex-wrap gap-2 mb-6">
                {service.features.map((feature, i) => (
                  <span key={i} className="px-3 py-1 bg-purple-500/20 rounded-full text-xs text-purple-300">
                    {feature}
                  </span>
                ))}
              </div>

              <Link href={service.link} className="text-cyan-400 font-semibold hover:text-cyan-300 transition-colors flex items-center group">
                Learn More
                <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  )
}