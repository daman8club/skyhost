'use client'

import { useState } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { Menu, X, ChevronDown, ArrowRight } from 'lucide-react'

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null)

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 p-4">
      <div className="max-w-7xl mx-auto">
        <div className="navbar-container px-6 py-4 flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="text-2xl font-black text-white cursor-pointer">
            Skyhost<span className="gradient-text">Digital</span>
          </Link>
          
          {/* Desktop Menu */}
          <div className="hidden lg:flex items-center space-x-8">
            <div className="flex items-center space-x-6">
              <Link href="/services" className="nav-link">Services</Link>
              <Link href="/portfolio" className="nav-link">Portfolio</Link>
              
              {/* About Dropdown */}
              <div 
                className="relative"
                onMouseEnter={() => setActiveDropdown('about')}
                onMouseLeave={() => setActiveDropdown(null)}
              >
                <button className="nav-link flex items-center">
                  About <ChevronDown className="ml-1 w-4 h-4" />
                </button>
                <div className={`dropdown-menu ${activeDropdown === 'about' ? 'active' : ''}`}>
                  <Link href="/about" className="dropdown-item">About Us</Link>
                  <Link href="/team" className="dropdown-item">Our Team</Link>
                  <Link href="/careers" className="dropdown-item">Careers</Link>
                </div>
              </div>

              {/* Work Dropdown */}
              <div 
                className="relative"
                onMouseEnter={() => setActiveDropdown('work')}
                onMouseLeave={() => setActiveDropdown(null)}
              >
                <button className="nav-link flex items-center">
                  Work <ChevronDown className="ml-1 w-4 h-4" />
                </button>
                <div className={`dropdown-menu ${activeDropdown === 'work' ? 'active' : ''}`}>
                  <Link href="/case-studies" className="dropdown-item">Case Studies</Link>
                  <Link href="/blog" className="dropdown-item">Blog</Link>
                </div>
              </div>

              <Link href="/contact" className="nav-link">Contact</Link>
            </div>
            
            {/* CTA Button */}
            <Link href="/contact" className="btn-nav-cta group relative overflow-hidden">
              <div className="shimmer"></div>
              <span className="relative z-10 flex items-center">
                Get Started
                <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </span>
            </Link>
          </div>
          
          {/* Mobile Menu Button */}
          <button 
            className="lg:hidden mobile-menu-btn"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
        
        {/* Mobile Menu */}
        <div className={`mobile-menu ${isMenuOpen ? 'active' : ''}`}>
          <div className="mobile-menu-content">
            <div className="space-y-4">
              <Link href="/services" className="mobile-menu-item" onClick={() => setIsMenuOpen(false)}>
                Services
              </Link>
              <Link href="/portfolio" className="mobile-menu-item" onClick={() => setIsMenuOpen(false)}>
                Portfolio
              </Link>
              <Link href="/about" className="mobile-menu-item" onClick={() => setIsMenuOpen(false)}>
                About Us
              </Link>
              <Link href="/team" className="mobile-menu-item" onClick={() => setIsMenuOpen(false)}>
                Our Team
              </Link>
              <Link href="/careers" className="mobile-menu-item" onClick={() => setIsMenuOpen(false)}>
                Careers
              </Link>
              <Link href="/case-studies" className="mobile-menu-item" onClick={() => setIsMenuOpen(false)}>
                Case Studies
              </Link>
              <Link href="/blog" className="mobile-menu-item" onClick={() => setIsMenuOpen(false)}>
                Blog
              </Link>
              <Link href="/contact" className="mobile-menu-item" onClick={() => setIsMenuOpen(false)}>
                Contact
              </Link>
              
              <Link href="/contact" className="btn-nav-cta w-full mt-6" onClick={() => setIsMenuOpen(false)}>
                Get Started
                <ArrowRight className="ml-2 w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </nav>
  )
}