'use client'

import { motion } from 'framer-motion'
import { Linkedin, Twitter, Github, Mail } from 'lucide-react'

export default function Team() {
  const team = [
    {
      name: 'Alex Rodriguez',
      role: 'Founder & CEO',
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=face',
      bio: 'Visionary leader with 10+ years in digital transformation. Former Google engineer turned entrepreneur.',
      social: {
        linkedin: '#',
        twitter: '#',
        github: '#',
        email: 'alex@skyhostdigital.com'
      }
    },
    {
      name: 'Sarah Chen',
      role: 'Lead Developer',
      image: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=400&h=400&fit=crop&crop=face',
      bio: 'Full-stack wizard specializing in Next.js and performance optimization. Built 200+ lightning-fast websites.',
      social: {
        linkedin: '#',
        twitter: '#',
        github: '#',
        email: 'sarah@skyhostdigital.com'
      }
    },
    {
      name: 'Marcus Johnson',
      role: 'UI/UX Designer',
      image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop&crop=face',
      bio: 'Creative genius who turns complex ideas into beautiful, intuitive interfaces. Award-winning designer.',
      social: {
        linkedin: '#',
        twitter: '#',
        github: '#',
        email: 'marcus@skyhostdigital.com'
      }
    },
    {
      name: 'Emily Watson',
      role: 'Growth Strategist',
      image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop&crop=face',
      bio: 'Data-driven marketer who has helped clients achieve 500%+ growth. SEO and conversion expert.',
      social: {
        linkedin: '#',
        twitter: '#',
        github: '#',
        email: 'emily@skyhostdigital.com'
      }
    }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-6 py-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <h1 className="text-6xl font-black text-white mb-6">Meet Our Team</h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            The brilliant minds behind NYC's fastest websites. We're not just colleagues—we're digital architects 
            building the future together.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {team.map((member, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: index * 0.1 }}
              className="glass-card p-6 text-center group hover:bg-white/10 transition-all duration-300"
            >
              <div className="relative mb-6">
                <img
                  src={member.image}
                  alt={member.name}
                  className="w-32 h-32 rounded-full mx-auto object-cover border-4 border-cyan-400/30 group-hover:border-cyan-400/60 transition-all duration-300"
                />
                <div className="absolute inset-0 rounded-full bg-gradient-to-br from-cyan-400/20 to-purple-400/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </div>
              
              <h3 className="text-xl font-bold text-white mb-2">{member.name}</h3>
              <p className="text-cyan-400 font-semibold mb-4">{member.role}</p>
              <p className="text-gray-300 text-sm leading-relaxed mb-6">{member.bio}</p>
              
              <div className="flex justify-center space-x-3 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0">
                <a href={member.social.linkedin} className="w-10 h-10 bg-blue-600/20 rounded-lg flex items-center justify-center hover:bg-blue-600/40 transition-colors">
                  <Linkedin className="w-5 h-5 text-blue-400" />
                </a>
                <a href={member.social.twitter} className="w-10 h-10 bg-sky-500/20 rounded-lg flex items-center justify-center hover:bg-sky-500/40 transition-colors">
                  <Twitter className="w-5 h-5 text-sky-400" />
                </a>
                <a href={member.social.github} className="w-10 h-10 bg-gray-600/20 rounded-lg flex items-center justify-center hover:bg-gray-600/40 transition-colors">
                  <Github className="w-5 h-5 text-gray-400" />
                </a>
                <a href={`mailto:${member.social.email}`} className="w-10 h-10 bg-green-600/20 rounded-lg flex items-center justify-center hover:bg-green-600/40 transition-colors">
                  <Mail className="w-5 h-5 text-green-400" />
                </a>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Join Us CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="text-center mt-20"
        >
          <div className="glass-card p-12">
            <h2 className="text-4xl font-bold text-white mb-6">Want to Join Our Team?</h2>
            <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
              We're always looking for talented individuals who share our passion for speed, quality, and innovation.
            </p>
            <a href="/careers" className="btn-neon-primary inline-flex items-center">
              View Open Positions
            </a>
          </div>
        </motion.div>
      </div>
    </div>
  )
}