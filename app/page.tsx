'use client'

import { useState, useMemo, useEffect } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { Rocket, Shield, Code, Zap, ArrowRight, Star, CheckCircle, Globe, Users, Award, Clock, DollarSign, Quote, Smartphone, TrendingUp, Palette, Bot, Server, Twitter, Linkedin, Github, Send, MapPin, Mail, Phone, Menu, X, ChevronDown, Instagram, Facebook } from 'lucide-react'
import { useLeadCapture } from '../hooks/useLeadCapture'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'

export default function Home() {
  const [activeFilter, setActiveFilter] = useState('All')
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null)
  const [showLeadForm, setShowLeadForm] = useState(false)
  const [leadForm, setLeadForm] = useState({ name: '', email: '', phone: '', message: '' })
  const { submitLead, isSubmitting } = useLeadCapture()
  
  // Load Tawk.io chat widget
  useEffect(() => {
    window.Tawk_API = window.Tawk_API || {}
    window.Tawk_LoadStart = new Date()
    
    const script = document.createElement('script')
    script.async = true
    script.src = 'https://embed.tawk.to/6960b03d1636e8197eee77b5/1jegr0so1'
    script.charset = 'UTF-8'
    script.setAttribute('crossorigin', '*')
    document.head.appendChild(script)
    
    return () => {
      const existingScript = document.querySelector('script[src*="tawk.to"]')
      if (existingScript) {
        existingScript.remove()
      }
    }
  }, [])
  
  const handleGetStarted = () => {
    setShowLeadForm(true)
  }
  
  const handleLeadSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const result = await submitLead({ ...leadForm, source: 'homepage_cta' })
    if (result.success) {
      setShowLeadForm(false)
      setLeadForm({ name: '', email: '', phone: '', message: '' })
      alert('Thank you! We\'ll contact you soon.')
    }
  }
  
  const projects = [
    {
      id: 1,
      title: 'Rivers Cafe NYC',
      category: 'Websites',
      image: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=600&h=400&fit=crop',
      techStack: ['Next.js', 'Tailwind', 'Vercel'],
      url: 'https://rivers-cafe.vercel.app/',
      description: 'Premium restaurant website with elegant design, online reservations, and seamless user experience for NYC\'s finest dining establishment.'
    },
    {
      id: 2,
      title: 'Swing The Teapot',
      category: 'Websites',
      image: 'https://images.unsplash.com/photo-1544787219-7f47ccb76574?w=600&h=400&fit=crop',
      techStack: ['Next.js', 'React', 'Vercel'],
      url: 'https://swingtheteapot.vercel.app/',
      description: 'Modern tea house website featuring interactive menu, brewing guides, and e-commerce functionality for tea enthusiasts.'
    },
    {
      id: 3,
      title: 'Dubai Luxury Portal',
      category: 'Websites',
      image: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=600&h=400&fit=crop',
      techStack: ['Next.js', 'TypeScript', 'Vercel'],
      url: 'https://dubai-cyan.vercel.app/',
      description: 'Sophisticated Dubai-themed website showcasing luxury services with stunning visuals and premium user interface design.'
    },
    {
      id: 4,
      title: 'Floral Park Diner',
      category: 'Websites',
      image: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=600&h=400&fit=crop',
      techStack: ['Next.js', 'Tailwind', 'Vercel'],
      url: 'https://floral-park-diner.vercel.app/',
      description: 'Classic American diner website with online ordering, menu showcase, and local community engagement features.'
    }
  ]
  
  const filteredProjects = useMemo(() => {
    if (activeFilter === 'All') return projects
    return projects.filter(project => project.category === activeFilter)
  }, [activeFilter])
  
  const testimonials = [
    {
      id: 1,
      name: 'Marta Rodriguez',
      business: 'Rivers Cafe',
      avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face',
      review: 'Skyhost doubled our online orders in one week! The new website is absolutely stunning and the customer experience is flawless.'
    },
    {
      id: 2,
      name: 'David Chen',
      business: 'TechStart NYC',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
      review: 'Best investment we made this year. Our conversion rate increased by 340% and the ROI exceeded all expectations.'
    },
    {
      id: 3,
      name: 'Sarah Johnson',
      business: 'EcoShop',
      avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face',
      review: 'The mobile app they built transformed our business. Sales increased 500% in the first month alone.'
    },
    {
      id: 4,
      name: 'Michael Torres',
      business: 'FinanceFlow',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
      review: 'Incredible attention to detail and cutting-edge technology. Our clients love the new dashboard interface.'
    },
    {
      id: 5,
      name: 'Emily Watson',
      business: 'MedTech Solutions',
      avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&h=150&fit=crop&crop=face',
      review: 'Professional, innovative, and results-driven. They delivered beyond our wildest expectations.'
    }
  ]

  return (
    <div className="min-h-screen" style={{background: 'linear-gradient(135deg, #0f0f23 0%, #1a1a2e 25%, #16213e 50%, #0f1419 75%, #0a0a0f 100%)', color: 'white'}}>
      {/* Enhanced Navbar */}
      <nav className="fixed top-0 left-0 right-0 z-50 p-4">
        <div className="max-w-7xl mx-auto">
          <div className="navbar-container px-6 py-4 flex items-center justify-between">
            {/* Logo */}
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="text-2xl font-black text-white cursor-pointer"
            >
              Skyhost<span className="gradient-text">Digital</span>
            </motion.div>
            
            {/* Desktop Menu */}
            <div className="hidden lg:flex items-center space-x-8">
              <div className="flex items-center space-x-6">
                <a href="#services" className="nav-link">Services</a>
                <a href="#portfolio" className="nav-link">Portfolio</a>
                <a href="#about" className="nav-link">About</a>
                <a href="#contact" className="nav-link">Contact</a>
              </div>
              
              {/* CTA Button */}
              <button 
                onClick={handleGetStarted}
                className="btn-nav-cta group relative overflow-hidden"
              >
                <div className="shimmer"></div>
                <span className="relative z-10 flex items-center">
                  Get Started
                  <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </span>
              </button>
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
                <a href="#services" className="mobile-menu-item" onClick={() => setIsMenuOpen(false)}>
                  <Rocket className="w-4 h-4" />
                  <span>Services</span>
                </a>
                <a href="#portfolio" className="mobile-menu-item" onClick={() => setIsMenuOpen(false)}>
                  <Globe className="w-4 h-4" />
                  <span>Portfolio</span>
                </a>
                <a href="#about" className="mobile-menu-item" onClick={() => setIsMenuOpen(false)}>
                  <Users className="w-4 h-4" />
                  <span>About</span>
                </a>
                <a href="#contact" className="mobile-menu-item" onClick={() => setIsMenuOpen(false)}>
                  <Mail className="w-4 h-4" />
                  <span>Contact</span>
                </a>
                
                <button onClick={handleGetStarted} className="btn-nav-cta w-full mt-6">
                  Get Started
                  <ArrowRight className="ml-2 w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="min-h-screen flex items-center justify-center px-6 relative overflow-hidden">
        {/* Animated Background */}
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-20"
          style={{ backgroundImage: 'url("/bg.jpg")' }}
        />
        
        {/* Grid Overlay */}
        <div className="absolute inset-0 opacity-30">
          <div className="absolute inset-0 bg-gradient-to-br from-purple-400/5 via-transparent to-cyan-400/5"></div>
        </div>
        
        <div className="max-w-7xl mx-auto relative z-10 w-full">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, ease: "easeOut" }}
            className="glass-card p-8 md:p-16 relative overflow-hidden"
          >
            {/* Card Glow Effect */}
            <div className="absolute inset-0 bg-gradient-to-br from-purple-400/10 via-transparent to-cyan-400/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center relative z-10">
              {/* Left Content */}
              <div className="text-left space-y-8">
                {/* Badge */}
                <motion.div
                  initial={{ opacity: 0, x: -30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.8, delay: 0.3 }}
                  className="inline-flex items-center px-4 py-2 glass rounded-full text-sm font-medium text-cyan-400 border border-cyan-400/30"
                >
                  <Zap className="w-4 h-4 mr-2" />
                  <span>Next-Gen Digital Solutions</span>
                </motion.div>
                
                {/* Main Heading with Typewriter Animation */}
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 1, delay: 0.5 }}
                  className="space-y-4"
                >
                  <h1 className="text-4xl md:text-6xl lg:text-7xl font-black leading-tight">
                    <span className="block text-white typewriter-line" data-text="Building the Future of">
                      Building the Future of
                    </span>
                    <span className="block gradient-text typewriter-glow text-shadow-neon">
                      Digital Experiences.
                    </span>
                  </h1>
                </motion.div>
                
                {/* Subtitle */}
                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.8 }}
                  className="text-lg md:text-xl text-gray-300 leading-relaxed max-w-2xl"
                >
                  Revolutionary web experiences that push boundaries and deliver exceptional results for forward-thinking businesses worldwide.
                </motion.p>
                
                {/* Stats Row */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 1 }}
                  className="flex flex-wrap gap-8 py-6"
                >
                  <div className="text-center">
                    <div className="text-2xl md:text-3xl font-black text-white mb-1">500+</div>
                    <div className="text-sm text-gray-400">Happy Clients</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl md:text-3xl font-black text-white mb-1">99.9%</div>
                    <div className="text-sm text-gray-400">Uptime</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl md:text-3xl font-black text-white mb-1">340%</div>
                    <div className="text-sm text-gray-400">Avg Growth</div>
                  </div>
                </motion.div>
                
                {/* CTA Buttons */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 1.2 }}
                  className="flex flex-col sm:flex-row gap-4 pt-4"
                >
                  <button onClick={handleGetStarted} className="btn-neon-primary group relative overflow-hidden">
                    <div className="shimmer"></div>
                    <span className="relative z-10 flex items-center justify-center">
                      Start Your Project
                      <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                    </span>
                  </button>
                  <button onClick={handleGetStarted} className="btn-neon-secondary group relative overflow-hidden">
                    <div className="shimmer"></div>
                    <span className="relative z-10 flex items-center justify-center">
                      <Globe className="mr-2 w-5 h-5" />
                      Get Quote
                    </span>
                  </button>
                </motion.div>
              </div>
              
              {/* Right Visual - Enhanced 3D Wireframe Globe */}
              <div className="flex justify-center lg:justify-end">
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 1.5, delay: 0.8, ease: "easeOut" }}
                  className="globe-container-enhanced relative"
                >
                  <div className="wireframe-globe-3d">
                    {/* Core Sphere */}
                    <div className="globe-core-enhanced"></div>
                    
                    {/* Wireframe Rings */}
                    <div className="globe-ring-enhanced ring-horizontal-1"></div>
                    <div className="globe-ring-enhanced ring-horizontal-2"></div>
                    <div className="globe-ring-enhanced ring-vertical-1"></div>
                    <div className="globe-ring-enhanced ring-vertical-2"></div>
                    <div className="globe-ring-enhanced ring-diagonal-1"></div>
                    <div className="globe-ring-enhanced ring-diagonal-2"></div>
                    
                    {/* Floating Particles */}
                    <div className="globe-particle particle-1"></div>
                    <div className="globe-particle particle-2"></div>
                    <div className="globe-particle particle-3"></div>
                    <div className="globe-particle particle-4"></div>
                    
                    {/* Outer Glow */}
                    <div className="globe-outer-glow"></div>
                  </div>
                </motion.div>
              </div>
            </div>
          </motion.div>
        </div>
        
        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 2 }}
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        >
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center"
          >
            <motion.div
              animate={{ y: [0, 12, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              className="w-1 h-3 bg-gradient-to-b from-purple-400 to-cyan-400 rounded-full mt-2"
            />
          </motion.div>
        </motion.div>
      </section>

      {/* Bento Grid Stats Section */}
      <section className="py-32 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20">
            <h2 className="text-5xl font-black text-white mb-6">Proven Results</h2>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">Numbers that speak for themselves</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="bento-card group"
            >
              <div className="flex items-center justify-between mb-6">
                <div className="w-12 h-12 bg-blue-400/20 rounded-xl flex items-center justify-center">
                  <Users className="w-6 h-6 text-blue-400" />
                </div>
                <span className="text-green-400 text-sm font-semibold">+23%</span>
              </div>
              <div className="text-3xl font-black text-white mb-2">500+</div>
              <div className="text-gray-400">Happy Clients</div>
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="bento-card group"
            >
              <div className="flex items-center justify-between mb-6">
                <div className="w-12 h-12 bg-purple-400/20 rounded-xl flex items-center justify-center">
                  <Award className="w-6 h-6 text-purple-400" />
                </div>
                <span className="text-green-400 text-sm font-semibold">+15</span>
              </div>
              <div className="text-3xl font-black text-white mb-2">150+</div>
              <div className="text-gray-400">Projects Delivered</div>
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="bento-card group"
            >
              <div className="flex items-center justify-between mb-6">
                <div className="w-12 h-12 bg-cyan-400/20 rounded-xl flex items-center justify-center">
                  <Clock className="w-6 h-6 text-cyan-400" />
                </div>
                <span className="text-green-400 text-sm font-semibold">24/7</span>
              </div>
              <div className="text-3xl font-black text-white mb-2">99.9%</div>
              <div className="text-gray-400">Uptime Guarantee</div>
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="bento-card group"
            >
              <div className="flex items-center justify-between mb-6">
                <div className="w-12 h-12 bg-green-400/20 rounded-xl flex items-center justify-center">
                  <TrendingUp className="w-6 h-6 text-green-400" />
                </div>
                <span className="text-green-400 text-sm font-semibold">ROI</span>
              </div>
              <div className="text-3xl font-black text-white mb-2">340%</div>
              <div className="text-gray-400">Average Growth</div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Premium Services Section */}
      <section id="services" className="py-32 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20">
            <h2 className="text-5xl font-black text-white mb-6">Premium Services</h2>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">Cutting-edge solutions designed for the digital future</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="premium-service-card group"
            >
              <div className="w-16 h-16 glass rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                <Rocket className="w-8 h-8 text-blue-400" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-4">Web Development</h3>
              <p className="text-gray-300 leading-relaxed mb-6">Lightning-fast, responsive websites built with cutting-edge technology and optimized for performance</p>
              <div className="flex items-center text-cyan-400 font-semibold">
                <span>Learn More</span>
                <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </div>
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="premium-service-card group"
            >
              <div className="w-16 h-16 glass rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                <Smartphone className="w-8 h-8 text-purple-400" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-4">Mobile Apps</h3>
              <p className="text-gray-300 leading-relaxed mb-6">Native and cross-platform mobile applications that deliver exceptional user experiences</p>
              <div className="flex items-center text-cyan-400 font-semibold">
                <span>Learn More</span>
                <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </div>
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="premium-service-card group"
            >
              <div className="w-16 h-16 glass rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                <TrendingUp className="w-8 h-8 text-green-400" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-4">SEO & Marketing</h3>
              <p className="text-gray-300 leading-relaxed mb-6">Data-driven marketing strategies that boost your online presence and drive conversions</p>
              <div className="flex items-center text-cyan-400 font-semibold">
                <span>Learn More</span>
                <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </div>
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="premium-service-card group"
            >
              <div className="w-16 h-16 glass rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                <Palette className="w-8 h-8 text-pink-400" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-4">UI/UX Design</h3>
              <p className="text-gray-300 leading-relaxed mb-6">Beautiful, intuitive designs that captivate users and enhance brand identity</p>
              <div className="flex items-center text-cyan-400 font-semibold">
                <span>Learn More</span>
                <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </div>
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="premium-service-card group"
            >
              <div className="w-16 h-16 glass rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                <Bot className="w-8 h-8 text-orange-400" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-4">AI Integration</h3>
              <p className="text-gray-300 leading-relaxed mb-6">Cutting-edge AI solutions that automate processes and enhance user experiences</p>
              <div className="flex items-center text-cyan-400 font-semibold">
                <span>Learn More</span>
                <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </div>
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="premium-service-card group"
            >
              <div className="w-16 h-16 glass rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                <Server className="w-8 h-8 text-cyan-400" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-4">Cloud Solutions</h3>
              <p className="text-gray-300 leading-relaxed mb-6">Scalable cloud infrastructure and deployment solutions for modern applications</p>
              <div className="flex items-center text-cyan-400 font-semibold">
                <span>Learn More</span>
                <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Portfolio Section */}
      <section id="portfolio" className="py-32 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20">
            <h2 className="text-5xl font-black text-white mb-6">Our Masterpieces</h2>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">Showcasing our latest work and success stories</p>
          </div>
          
          {/* Filter Tabs */}
          <div className="flex justify-center mb-16">
            <div className="glass-card p-2 inline-flex rounded-2xl">
              {['All', 'Websites', 'Mobile Apps', 'SEO Results'].map((filter) => (
                <button
                  key={filter}
                  onClick={() => setActiveFilter(filter)}
                  className={`px-6 py-3 rounded-xl font-semibold transition-all duration-300 ${
                    activeFilter === filter
                      ? 'bg-gradient-to-r from-purple-400/30 to-pink-400/30 text-white border border-purple-400/50'
                      : 'text-gray-400 hover:text-white hover:bg-white/5'
                  }`}
                >
                  {filter}
                </button>
              ))}
            </div>
          </div>
          
          {/* Projects Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProjects.map((project, index) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="portfolio-card group"
              >
                <div className="relative overflow-hidden rounded-2xl mb-6">
                  <img 
                    src={project.image} 
                    alt={project.title}
                    className="w-full h-64 object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="absolute bottom-4 left-4 right-4">
                      <div className="flex flex-wrap gap-2 mb-3">
                        {project.techStack.map((tech) => (
                          <span key={tech} className="px-3 py-1 bg-white/20 rounded-full text-xs text-white font-medium">
                            {tech}
                          </span>
                        ))}
                      </div>
                      <a 
                        href={project.url} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white text-sm font-semibold rounded-lg hover:from-purple-600 hover:to-pink-600 transition-all duration-300"
                      >
                        <Globe className="w-4 h-4 mr-2" />
                        Live Demo
                      </a>
                    </div>
                  </div>
                </div>
                <h3 className="text-xl font-bold text-white mb-2">{project.title}</h3>
                <p className="text-gray-400 mb-3 text-sm leading-relaxed">{project.description}</p>
                <div className="flex items-center justify-between">
                  <span className="text-cyan-400 text-sm font-medium">{project.category}</span>
                  <a 
                    href={project.url} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="flex items-center text-cyan-400 font-semibold hover:text-white transition-colors"
                  >
                    <span>View Live</span>
                    <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </a>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-32 px-6 overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20">
            <h2 className="text-5xl font-black text-white mb-6">Client Success Stories</h2>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">Real results from real businesses</p>
          </div>
          
          <div className="relative">
            <div className="testimonial-marquee">
              <div className="testimonial-track">
                {[...testimonials, ...testimonials].map((testimonial, index) => (
                  <div key={`${testimonial.id}-${index}`} className="testimonial-card">
                    <div className="flex items-center mb-6">
                      <img 
                        src={testimonial.avatar} 
                        alt={testimonial.name}
                        className="w-16 h-16 rounded-full object-cover mr-4"
                      />
                      <div>
                        <h4 className="text-white font-bold">{testimonial.name}</h4>
                        <p className="text-gray-400 text-sm">{testimonial.business}</p>
                      </div>
                    </div>
                    <div className="flex mb-4">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                      ))}
                    </div>
                    <p className="text-gray-300 leading-relaxed">
                      "{testimonial.review}"
                    </p>
                  </div>
                ))}
              </div>
            </div>
            
            {/* Gradient Overlays */}
            <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-black to-transparent pointer-events-none z-10"></div>
            <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-black to-transparent pointer-events-none z-10"></div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-32 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20">
            <h2 className="text-5xl font-black text-white mb-6">About Skyhost Digital</h2>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">Transforming NYC businesses with cutting-edge digital solutions since 2020</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="bento-card group text-center"
            >
              <div className="w-16 h-16 bg-blue-400/20 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <Users className="w-8 h-8 text-blue-400" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-4">Our Mission</h3>
              <p className="text-gray-300 leading-relaxed">Empowering NYC businesses through innovative technology and exceptional digital experiences that drive real results.</p>
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="bento-card group text-center"
            >
              <div className="w-16 h-16 bg-purple-400/20 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <Award className="w-8 h-8 text-purple-400" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-4">Our Vision</h3>
              <p className="text-gray-300 leading-relaxed">To be the leading digital transformation partner for businesses across New York City and beyond.</p>
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="bento-card group text-center"
            >
              <div className="w-16 h-16 bg-cyan-400/20 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <CheckCircle className="w-8 h-8 text-cyan-400" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-4">Our Values</h3>
              <p className="text-gray-300 leading-relaxed">Quality craftsmanship, innovative solutions, and unwavering commitment to client success in every project.</p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Enhanced CTA Section */}
      <section className="py-32 px-6 relative">
        <div className="max-w-5xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="cta-glow-card relative overflow-hidden"
          >
            {/* Animated Particles Background */}
            <div className="absolute inset-0 overflow-hidden">
              <div className="cta-particle particle-1"></div>
              <div className="cta-particle particle-2"></div>
              <div className="cta-particle particle-3"></div>
              <div className="cta-particle particle-4"></div>
              <div className="cta-particle particle-5"></div>
              <div className="cta-particle particle-6"></div>
            </div>
            
            {/* Content */}
            <div className="relative z-10">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="mb-8"
              >
                <h2 className="text-5xl md:text-6xl font-black text-white mb-6">
                  Ready to <span className="gradient-text">Launch?</span>
                </h2>
                <p className="text-xl md:text-2xl text-gray-300 mb-4 leading-relaxed max-w-3xl mx-auto">
                  Join 500+ NYC businesses that have transformed their digital presence
                </p>
                <p className="text-lg text-gray-400 max-w-2xl mx-auto">
                  From concept to launch in just 30 days. Premium quality, guaranteed results.
                </p>
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="flex flex-col sm:flex-row gap-6 justify-center mb-8"
              >
                <button onClick={handleGetStarted} className="btn-neon-primary group relative overflow-hidden px-8 py-4">
                  <div className="shimmer"></div>
                  <span className="relative z-10 flex items-center justify-center text-lg font-bold">
                    Start Your Project
                    <ArrowRight className="ml-3 w-6 h-6 group-hover:translate-x-1 transition-transform" />
                  </span>
                </button>
                <button onClick={handleGetStarted} className="btn-neon-secondary group relative overflow-hidden px-8 py-4">
                  <div className="shimmer"></div>
                  <span className="relative z-10 flex items-center justify-center text-lg font-semibold">
                    <Phone className="mr-3 w-5 h-5" />
                    Free Consultation
                  </span>
                </button>
              </motion.div>
              
              {/* Trust Indicators */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.6 }}
                className="flex flex-wrap justify-center items-center gap-8 text-sm text-gray-400"
              >
                <div className="flex items-center">
                  <CheckCircle className="w-4 h-4 text-green-400 mr-2" />
                  <span>30-Day Launch Guarantee</span>
                </div>
                <div className="flex items-center">
                  <CheckCircle className="w-4 h-4 text-green-400 mr-2" />
                  <span>NYC Local Team</span>
                </div>
                <div className="flex items-center">
                  <CheckCircle className="w-4 h-4 text-green-400 mr-2" />
                  <span>24/7 Support</span>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>


      
      {/* Lead Form Modal */}
      {showLeadForm && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4">
          <div className="bg-gray-900 rounded-2xl p-8 w-full max-w-md border border-gray-700">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-2xl font-bold text-white">Get Started</h3>
              <button onClick={() => setShowLeadForm(false)} className="text-gray-400 hover:text-white">
                <X className="w-6 h-6" />
              </button>
            </div>
            
            <form onSubmit={handleLeadSubmit} className="space-y-4">
              <input
                type="text"
                placeholder="Your Name"
                value={leadForm.name}
                onChange={(e) => setLeadForm({...leadForm, name: e.target.value})}
                className="w-full bg-gray-800 border border-gray-600 rounded-xl px-4 py-3 text-white placeholder-gray-400 focus:border-purple-400 focus:outline-none"
                required
              />
              <input
                type="email"
                placeholder="Your Email"
                value={leadForm.email}
                onChange={(e) => setLeadForm({...leadForm, email: e.target.value})}
                className="w-full bg-gray-800 border border-gray-600 rounded-xl px-4 py-3 text-white placeholder-gray-400 focus:border-purple-400 focus:outline-none"
                required
              />
              <input
                type="tel"
                placeholder="Phone (Optional)"
                value={leadForm.phone}
                onChange={(e) => setLeadForm({...leadForm, phone: e.target.value})}
                className="w-full bg-gray-800 border border-gray-600 rounded-xl px-4 py-3 text-white placeholder-gray-400 focus:border-purple-400 focus:outline-none"
              />
              <textarea
                placeholder="Tell us about your project"
                value={leadForm.message}
                onChange={(e) => setLeadForm({...leadForm, message: e.target.value})}
                rows={3}
                className="w-full bg-gray-800 border border-gray-600 rounded-xl px-4 py-3 text-white placeholder-gray-400 focus:border-purple-400 focus:outline-none resize-none"
              />
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-gradient-to-r from-purple-500 to-pink-500 text-white py-3 px-6 rounded-xl font-semibold hover:from-purple-600 hover:to-pink-600 transition-all duration-300 disabled:opacity-50"
              >
                {isSubmitting ? 'Submitting...' : 'Send Message'}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}