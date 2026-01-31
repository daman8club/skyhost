'use client'

import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { Twitter, Linkedin, Github, Send, MapPin, Mail, Instagram, Facebook } from 'lucide-react'

export default function Footer() {
  const router = useRouter()

  const handleNavigation = (href: string) => {
    router.push(href)
  }

  return (
    <footer className="relative py-20 px-6 border-t border-white/10 bg-gradient-to-br from-gray-900 via-blue-900 to-gray-900">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          {/* Brand Column */}
          <div className="lg:col-span-1">
            <Link href="/" className="text-3xl font-black text-white mb-6 block">
              Skyhost<span className="gradient-text">Digital</span>
            </Link>
            <p className="text-gray-400 mb-6 leading-relaxed">
              Transforming NYC businesses with cutting-edge digital solutions. From startups to enterprises, we deliver results that matter.
            </p>
            <div className="flex space-x-4">
              <a href="https://twitter.com/" target="_blank" className="social-icon group">
                <Twitter className="w-5 h-5 group-hover:text-blue-400 transition-colors" />
              </a>
              <a href="https://www.linkedin.com/in/skyhost-digital-solutions/" target="_blank" className="social-icon group">
                <Linkedin className="w-5 h-5 group-hover:text-blue-600 transition-colors" />
              </a>
              <a href="https://www.instagram.com/skyhost_digital/" target="_blank" className="social-icon group">
                <Instagram className="w-5 h-5 group-hover:text-pink-500 transition-colors" />
              </a>
              <a href="https://facebook.com/skyhostdigital" target="_blank" className="social-icon group">
                <Facebook className="w-5 h-5 group-hover:text-blue-500 transition-colors" />
              </a>
              <a href="https://github.com/daman8club" target="_blank" className="social-icon group">
                <Github className="w-5 h-5 group-hover:text-gray-300 transition-colors" />
              </a>
            </div>
          </div>
          
          {/* Company Column */}
          <div>
            <h4 className="text-white font-bold text-lg mb-6">Company</h4>
            <ul className="space-y-3">
              <li><Link href="/about" className="text-gray-400 hover:text-white transition-colors">About Us</Link></li>
              <li><Link href="/team" className="text-gray-400 hover:text-white transition-colors">Our Team</Link></li>
              <li><Link href="/careers" className="text-gray-400 hover:text-white transition-colors">Careers</Link></li>
              <li><Link href="/contact" className="text-gray-400 hover:text-white transition-colors">Contact</Link></li>
            </ul>
          </div>
          
          {/* Work Column */}
          <div>
            <h4 className="text-white font-bold text-lg mb-6">Work</h4>
            <ul className="space-y-3">
              <li><Link href="/portfolio" className="text-gray-400 hover:text-white transition-colors">Portfolio</Link></li>
              <li><Link href="/case-studies" className="text-gray-400 hover:text-white transition-colors">Case Studies</Link></li>
              <li><Link href="/blog" className="text-gray-400 hover:text-white transition-colors">Blog</Link></li>
              <li><Link href="/services" className="text-gray-400 hover:text-white transition-colors">Services</Link></li>
            </ul>
          </div>
          
          {/* Support Column */}
          <div>
            <h4 className="text-white font-bold text-lg mb-6">Support</h4>
            <ul className="space-y-3 mb-6">
              <li><Link href="/contact" className="text-gray-400 hover:text-white transition-colors">Contact</Link></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Privacy Policy</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Terms of Service</a></li>
            </ul>
            
            {/* Newsletter */}
            <div>
              <h5 className="text-white font-semibold mb-3">Stay Updated</h5>
              <div className="newsletter-form mb-4">
                <input 
                  type="email" 
                  placeholder="Enter your email"
                  className="newsletter-input"
                />
                <button className="newsletter-btn">
                  <Send className="w-4 h-4" />
                </button>
              </div>
              <div className="text-xs text-gray-500">
                Join 2,000+ NYC business owners
              </div>
            </div>
          </div>
        </div>
        
        {/* Bottom Section */}
        <div className="border-t border-white/10 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="text-gray-400 text-sm mb-4 md:mb-0">
              <p className="mb-2">
                <strong className="text-white">Proudly serving NYC businesses</strong> since 2020
              </p>
              <p>
                © 2024 Skyhost Digital. All rights reserved.
              </p>
            </div>
            <div className="flex items-center space-x-6 text-sm text-gray-400">
              <div className="flex items-center">
                <MapPin className="w-4 h-4 mr-2 text-blue-400" />
                <span>Cloud-Based Operations | Serving Globally</span>
              </div>
              <div className="flex items-center">
                <Mail className="w-4 h-4 mr-2 text-green-400" />
                <span>mail@skyhost.agency</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}