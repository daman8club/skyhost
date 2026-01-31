'use client'

import { motion } from 'framer-motion'
import { TrendingUp, Users, Clock, DollarSign, ArrowRight } from 'lucide-react'

export default function CaseStudies() {
  const caseStudies = [
    {
      title: 'Rivers Cafe NYC',
      category: 'Restaurant & Hospitality',
      image: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800&h=500&fit=crop',
      challenge: 'Outdated website with slow loading times and poor mobile experience causing lost reservations.',
      solution: 'Complete redesign with Next.js, optimized images, and seamless reservation system integration.',
      results: [
        { metric: 'Online Reservations', value: '+200%', icon: TrendingUp },
        { metric: 'Page Load Time', value: '0.8s', icon: Clock },
        { metric: 'Mobile Traffic', value: '+150%', icon: Users },
        { metric: 'Revenue Growth', value: '+85%', icon: DollarSign }
      ],
      testimonial: 'Skyhost transformed our digital presence. We went from losing customers to booking out weeks in advance.',
      client: 'Maria Rodriguez, Owner'
    },
    {
      title: 'TechStart NYC',
      category: 'SaaS & Technology',
      image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=500&fit=crop',
      challenge: 'B2B SaaS startup needed a professional website to attract enterprise clients and investors.',
      solution: 'Modern, conversion-focused design with interactive demos and comprehensive analytics tracking.',
      results: [
        { metric: 'Lead Generation', value: '+340%', icon: TrendingUp },
        { metric: 'Demo Requests', value: '+280%', icon: Users },
        { metric: 'Conversion Rate', value: '12.5%', icon: DollarSign },
        { metric: 'Enterprise Deals', value: '+400%', icon: TrendingUp }
      ],
      testimonial: 'Our new website became our best sales tool. We closed $2M in funding within 3 months of launch.',
      client: 'David Chen, CEO'
    },
    {
      title: 'Brooklyn Law Firm',
      category: 'Legal Services',
      image: 'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=800&h=500&fit=crop',
      challenge: 'Traditional law firm struggling with online visibility and client acquisition in competitive NYC market.',
      solution: 'SEO-optimized website with local search focus, client portal, and content marketing strategy.',
      results: [
        { metric: 'Organic Traffic', value: '+450%', icon: TrendingUp },
        { metric: 'New Clients', value: '+180%', icon: Users },
        { metric: 'Search Rankings', value: 'Top 3', icon: TrendingUp },
        { metric: 'Case Value', value: '+120%', icon: DollarSign }
      ],
      testimonial: 'We went from invisible online to the top law firm in Brooklyn for our practice areas.',
      client: 'Sarah Mitchell, Partner'
    },
    {
      title: 'EcoShop Marketplace',
      category: 'E-commerce',
      image: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800&h=500&fit=crop',
      challenge: 'Sustainable products marketplace needed scalable platform to handle rapid growth and inventory.',
      solution: 'Custom e-commerce platform with advanced filtering, vendor management, and mobile-first design.',
      results: [
        { metric: 'Sales Growth', value: '+500%', icon: DollarSign },
        { metric: 'Active Users', value: '+320%', icon: Users },
        { metric: 'Mobile Sales', value: '+600%', icon: TrendingUp },
        { metric: 'Vendor Signups', value: '+250%', icon: Users }
      ],
      testimonial: 'Skyhost built us a platform that scales. We handle 10x the traffic with zero downtime.',
      client: 'Alex Green, Founder'
    }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-green-900 to-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-6 py-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <h1 className="text-6xl font-black text-white mb-6">Case Studies</h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Real results from real businesses. See how we've helped NYC companies achieve 
            extraordinary growth through strategic digital transformation.
          </p>
        </motion.div>

        <div className="space-y-20">
          {caseStudies.map((study, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: index * 0.1 }}
              className="glass-card p-8 lg:p-12"
            >
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                {/* Content */}
                <div className={index % 2 === 1 ? 'lg:order-2' : ''}>
                  <div className="inline-block px-4 py-2 bg-green-500/20 rounded-full border border-green-400/30 mb-6">
                    <span className="text-green-300 font-semibold text-sm">{study.category}</span>
                  </div>
                  
                  <h2 className="text-4xl font-bold text-white mb-6">{study.title}</h2>
                  
                  <div className="space-y-6 mb-8">
                    <div>
                      <h3 className="text-xl font-semibold text-red-400 mb-3">The Challenge</h3>
                      <p className="text-gray-300 leading-relaxed">{study.challenge}</p>
                    </div>
                    
                    <div>
                      <h3 className="text-xl font-semibold text-blue-400 mb-3">Our Solution</h3>
                      <p className="text-gray-300 leading-relaxed">{study.solution}</p>
                    </div>
                  </div>

                  {/* Results Grid */}
                  <div className="grid grid-cols-2 gap-4 mb-8">
                    {study.results.map((result, i) => (
                      <div key={i} className="bg-white/5 rounded-xl p-4 text-center">
                        <result.icon className="w-6 h-6 text-green-400 mx-auto mb-2" />
                        <div className="text-2xl font-bold text-white mb-1">{result.value}</div>
                        <div className="text-sm text-gray-400">{result.metric}</div>
                      </div>
                    ))}
                  </div>

                  {/* Testimonial */}
                  <div className="bg-gradient-to-r from-green-500/10 to-blue-500/10 rounded-xl p-6 border border-green-400/20">
                    <p className="text-gray-300 italic mb-4">"{study.testimonial}"</p>
                    <p className="text-green-400 font-semibold">— {study.client}</p>
                  </div>
                </div>

                {/* Image */}
                <div className={index % 2 === 1 ? 'lg:order-1' : ''}>
                  <div className="relative group">
                    <img
                      src={study.image}
                      alt={study.title}
                      className="w-full h-80 object-cover rounded-2xl"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <div className="absolute bottom-6 left-6 right-6">
                        <button className="w-full glass border border-green-400/30 text-green-400 py-3 px-6 rounded-xl font-semibold hover:bg-green-400/10 transition-all duration-300 flex items-center justify-center">
                          View Live Site
                          <ArrowRight className="ml-2 w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="text-center mt-20"
        >
          <div className="glass-card p-12">
            <h2 className="text-4xl font-bold text-white mb-6">Ready for Similar Results?</h2>
            <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
              Join the ranks of successful NYC businesses that have transformed their digital presence with Skyhost Digital.
            </p>
            <button className="btn-neon-primary">
              Start Your Success Story
            </button>
          </div>
        </motion.div>
      </div>
    </div>
  )
}