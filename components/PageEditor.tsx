'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Save, X, Eye, Code, Image, Type, Palette, Bold, Italic, Underline, AlignLeft, AlignCenter, AlignRight } from 'lucide-react'

interface PageEditorProps {
  pageUrl: string
  onClose: () => void
}

export default function PageEditor({ pageUrl, onClose }: PageEditorProps) {
  const [pageData, setPageData] = useState({
    title: '',
    content: '',
    meta_description: ''
  })
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [activeTab, setActiveTab] = useState('content')
  const [isCodeView, setIsCodeView] = useState(false)

  useEffect(() => {
    fetchPageData()
  }, [pageUrl])

  const fetchPageData = async () => {
    try {
      // First try to get saved content from database
      const dbResponse = await fetch(`/api/pages?url=${encodeURIComponent(pageUrl)}`)
      const dbData = await dbResponse.json()
      
      if (dbData.page && dbData.page.content) {
        // Use saved content from database
        setPageData({
          title: dbData.page.title || '',
          content: dbData.page.content || '',
          meta_description: dbData.page.meta_description || ''
        })
      } else {
        // Fetch existing content from actual page files
        const contentResponse = await fetch(`/api/page-content?url=${encodeURIComponent(pageUrl)}`)
        const contentData = await contentResponse.json()
        
        if (contentData.title) {
          setPageData({
            title: contentData.title,
            content: contentData.content || contentData.raw_content || '',
            meta_description: contentData.meta_description || ''
          })
        } else {
          // Fallback to default content
          setPageData({
            title: getDefaultTitle(pageUrl),
            content: getDefaultContent(pageUrl),
            meta_description: getDefaultDescription(pageUrl)
          })
        }
      }
    } catch (error) {
      console.error('Error fetching page data:', error)
      // Fallback to default content
      setPageData({
        title: getDefaultTitle(pageUrl),
        content: getDefaultContent(pageUrl),
        meta_description: getDefaultDescription(pageUrl)
      })
    } finally {
      setLoading(false)
    }
  }

  const getDefaultTitle = (url: string) => {
    const titles: Record<string, string> = {
      '/': 'Skyhost Digital - Futuristic Web Agency NYC',
      '/contact': 'Contact Us - Skyhost Digital',
      '/services/web-development': 'Web Development Services',
      '/services/mobile-apps': 'Mobile App Development',
      '/services/seo-marketing': 'SEO & Marketing Services',
      '/services/ui-ux-design': 'UI/UX Design Services',
      '/services/ai-integration': 'AI Integration Services',
      '/services/cloud-solutions': 'Cloud Solutions',
      '/company/about': 'About Us - Skyhost Digital'
    }
    return titles[url] || 'Page Title'
  }

  const getDefaultContent = (url: string) => {
    if (url === '/') {
      // Return actual homepage sections for editing
      return `<div class="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-gray-900 text-white">
  <!-- Hero Section -->
  <section class="min-h-screen flex items-center justify-center px-6 relative overflow-hidden">
    <div class="max-w-7xl mx-auto relative z-10 w-full">
      <div class="glass-card p-8 md:p-16 relative overflow-hidden">
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center relative z-10">
          <!-- Left Content -->
          <div class="text-left space-y-8">
            <!-- Badge -->
            <div class="inline-flex items-center px-4 py-2 glass rounded-full text-sm font-medium text-cyan-400 border border-cyan-400/30">
              <span>⚡ Next-Gen Digital Solutions</span>
            </div>
            
            <!-- Main Heading -->
            <div class="space-y-4">
              <h1 class="text-4xl md:text-6xl lg:text-7xl font-black leading-tight">
                <span class="block text-white">Building the Future of</span>
                <span class="block gradient-text">Digital Experiences.</span>
              </h1>
            </div>
            
            <!-- Subtitle -->
            <p class="text-lg md:text-xl text-gray-300 leading-relaxed max-w-2xl">
              Revolutionary web experiences that push boundaries and deliver exceptional results for forward-thinking businesses worldwide.
            </p>
            
            <!-- Stats Row -->
            <div class="flex flex-wrap gap-8 py-6">
              <div class="text-center">
                <div class="text-2xl md:text-3xl font-black text-white mb-1">500+</div>
                <div class="text-sm text-gray-400">Happy Clients</div>
              </div>
              <div class="text-center">
                <div class="text-2xl md:text-3xl font-black text-white mb-1">99.9%</div>
                <div class="text-sm text-gray-400">Uptime</div>
              </div>
              <div class="text-center">
                <div class="text-2xl md:text-3xl font-black text-white mb-1">340%</div>
                <div class="text-sm text-gray-400">Avg Growth</div>
              </div>
            </div>
            
            <!-- CTA Buttons -->
            <div class="flex flex-col sm:flex-row gap-4 pt-4">
              <button class="btn-neon-primary">Start Your Project</button>
              <button class="btn-neon-secondary">Get Quote</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>

  <!-- Services Section -->
  <section class="py-32 px-6">
    <div class="max-w-7xl mx-auto">
      <div class="text-center mb-20">
        <h2 class="text-5xl font-black text-white mb-6">Premium Services</h2>
        <p class="text-xl text-gray-400 max-w-2xl mx-auto">Cutting-edge solutions designed for the digital future</p>
      </div>
      
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <div class="premium-service-card group">
          <div class="w-16 h-16 glass rounded-2xl flex items-center justify-center mb-6">
            <span class="text-2xl">🚀</span>
          </div>
          <h3 class="text-2xl font-bold text-white mb-4">Web Development</h3>
          <p class="text-gray-300 leading-relaxed mb-6">Lightning-fast, responsive websites built with cutting-edge technology and optimized for performance</p>
        </div>
        
        <div class="premium-service-card group">
          <div class="w-16 h-16 glass rounded-2xl flex items-center justify-center mb-6">
            <span class="text-2xl">📱</span>
          </div>
          <h3 class="text-2xl font-bold text-white mb-4">Mobile Apps</h3>
          <p class="text-gray-300 leading-relaxed mb-6">Native and cross-platform mobile applications that deliver exceptional user experiences</p>
        </div>
        
        <div class="premium-service-card group">
          <div class="w-16 h-16 glass rounded-2xl flex items-center justify-center mb-6">
            <span class="text-2xl">📈</span>
          </div>
          <h3 class="text-2xl font-bold text-white mb-4">SEO & Marketing</h3>
          <p class="text-gray-300 leading-relaxed mb-6">Data-driven marketing strategies that boost your online presence and drive conversions</p>
        </div>
      </div>
    </div>
  </section>

  <!-- Portfolio Section -->
  <section class="py-32 px-6">
    <div class="max-w-7xl mx-auto">
      <div class="text-center mb-20">
        <h2 class="text-5xl font-black text-white mb-6">Our Masterpieces</h2>
        <p class="text-xl text-gray-400 max-w-2xl mx-auto">Showcasing our latest work and success stories</p>
      </div>
      
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <div class="portfolio-card group">
          <div class="relative overflow-hidden rounded-2xl mb-6">
            <img src="https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=600&h=400&fit=crop" alt="Rivers Cafe NYC" class="w-full h-64 object-cover">
          </div>
          <h3 class="text-xl font-bold text-white mb-2">Rivers Cafe NYC</h3>
          <p class="text-gray-400 mb-3 text-sm leading-relaxed">Premium restaurant website with elegant design, online reservations, and seamless user experience for NYC's finest dining establishment.</p>
          <a href="https://rivers-cafe.vercel.app/" target="_blank" class="text-cyan-400 font-semibold">View Live →</a>
        </div>
        
        <div class="portfolio-card group">
          <div class="relative overflow-hidden rounded-2xl mb-6">
            <img src="https://images.unsplash.com/photo-1544787219-7f47ccb76574?w=600&h=400&fit=crop" alt="Swing The Teapot" class="w-full h-64 object-cover">
          </div>
          <h3 class="text-xl font-bold text-white mb-2">Swing The Teapot</h3>
          <p class="text-gray-400 mb-3 text-sm leading-relaxed">Modern tea house website featuring interactive menu, brewing guides, and e-commerce functionality for tea enthusiasts.</p>
          <a href="https://swingtheteapot.vercel.app/" target="_blank" class="text-cyan-400 font-semibold">View Live →</a>
        </div>
        
        <div class="portfolio-card group">
          <div class="relative overflow-hidden rounded-2xl mb-6">
            <img src="https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=600&h=400&fit=crop" alt="Dubai Luxury Portal" class="w-full h-64 object-cover">
          </div>
          <h3 class="text-xl font-bold text-white mb-2">Dubai Luxury Portal</h3>
          <p class="text-gray-400 mb-3 text-sm leading-relaxed">Sophisticated Dubai-themed website showcasing luxury services with stunning visuals and premium user interface design.</p>
          <a href="https://dubai-cyan.vercel.app/" target="_blank" class="text-cyan-400 font-semibold">View Live →</a>
        </div>
        
        <div class="portfolio-card group">
          <div class="relative overflow-hidden rounded-2xl mb-6">
            <img src="https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=600&h=400&fit=crop" alt="Floral Park Diner" class="w-full h-64 object-cover">
          </div>
          <h3 class="text-xl font-bold text-white mb-2">Floral Park Diner</h3>
          <p class="text-gray-400 mb-3 text-sm leading-relaxed">Classic American diner website with online ordering, menu showcase, and local community engagement features.</p>
          <a href="https://floral-park-diner.vercel.app/" target="_blank" class="text-cyan-400 font-semibold">View Live →</a>
        </div>
      </div>
    </div>
  </section>

  <!-- CTA Section -->
  <section class="py-32 px-6 relative">
    <div class="max-w-5xl mx-auto text-center">
      <div class="cta-glow-card relative overflow-hidden">
        <div class="relative z-10">
          <h2 class="text-5xl md:text-6xl font-black text-white mb-6">
            Ready to <span class="gradient-text">Launch?</span>
          </h2>
          <p class="text-xl md:text-2xl text-gray-300 mb-4 leading-relaxed max-w-3xl mx-auto">
            Join 500+ NYC businesses that have transformed their digital presence
          </p>
          <p class="text-lg text-gray-400 max-w-2xl mx-auto mb-8">
            From concept to launch in just 30 days. Premium quality, guaranteed results.
          </p>
          
          <div class="flex flex-col sm:flex-row gap-6 justify-center">
            <button class="btn-neon-primary">Start Your Project</button>
            <button class="btn-neon-secondary">Free Consultation</button>
          </div>
        </div>
      </div>
    </div>
  </section>
</div>`
    }
    
    return `<div class="container mx-auto px-6 py-20">
  <h1 class="text-4xl font-bold text-white mb-6">Page Content</h1>
  <p class="text-gray-300 text-lg mb-8">Edit this content in the admin panel.</p>
  
  <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
    <div class="glass-card p-6">
      <h2 class="text-2xl font-bold text-white mb-4">Section 1</h2>
      <p class="text-gray-300">Your content here...</p>
    </div>
    
    <div class="glass-card p-6">
      <h2 class="text-2xl font-bold text-white mb-4">Section 2</h2>
      <p class="text-gray-300">Your content here...</p>
    </div>
  </div>
</div>`
  }

  const getDefaultDescription = (url: string) => {
    const descriptions: Record<string, string> = {
      '/': 'Websites that load before you blink. Premium web development for New York businesses.',
      '/contact': 'Get in touch with Skyhost Digital for your web development needs.',
      '/services/web-development': 'Professional web development services with cutting-edge technology.',
      '/services/mobile-apps': 'Native and cross-platform mobile app development services.',
      '/services/seo-marketing': 'Data-driven SEO and marketing strategies that drive results.',
      '/services/ui-ux-design': 'Beautiful, intuitive UI/UX design that captivates users.',
      '/services/ai-integration': 'Cutting-edge AI solutions for modern businesses.',
      '/services/cloud-solutions': 'Scalable cloud infrastructure and deployment solutions.',
      '/company/about': 'Learn about Skyhost Digital and our mission to transform businesses.'
    }
    return descriptions[url] || 'Professional web development and digital services by Skyhost Digital.'
  }

  const handleSave = async () => {
    setSaving(true)
    try {
      const response = await fetch('/api/pages', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          page_url: pageUrl,
          ...pageData
        })
      })

      if (response.ok) {
        alert('Page saved successfully!')
        onClose()
      } else {
        alert('Error saving page')
      }
    } catch (error) {
      console.error('Error saving page:', error)
      alert('Error saving page')
    } finally {
      setSaving(false)
    }
  }

  if (loading) {
    return (
      <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50">
        <div className="text-white">Loading...</div>
      </div>
    )
  }

  const convertToEditableContent = (htmlContent: string) => {
    // Convert HTML classes to inline styles for better editing
    return htmlContent
      .replace(/class="text-4xl[^"]*"/g, 'style="font-size: 2.25rem; font-weight: bold; color: #1f2937; margin-bottom: 1.5rem;"')
      .replace(/class="text-3xl[^"]*"/g, 'style="font-size: 1.875rem; font-weight: bold; color: #1f2937; margin-bottom: 1rem;"')
      .replace(/class="text-2xl[^"]*"/g, 'style="font-size: 1.5rem; font-weight: bold; color: #1f2937; margin-bottom: 1rem;"')
      .replace(/class="text-xl[^"]*"/g, 'style="font-size: 1.25rem; color: #374151; margin-bottom: 0.5rem;"')
      .replace(/class="text-lg[^"]*"/g, 'style="font-size: 1.125rem; color: #374151; margin-bottom: 0.5rem;"')
      .replace(/class="text-white[^"]*"/g, 'style="color: #1f2937;"')
      .replace(/class="text-gray-300[^"]*"/g, 'style="color: #6b7280;"')
      .replace(/class="text-gray-400[^"]*"/g, 'style="color: #9ca3af;"')
      .replace(/class="gradient-text[^"]*"/g, 'style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); -webkit-background-clip: text; -webkit-text-fill-color: transparent; font-weight: bold;"')
      .replace(/class="[^"]*"/g, '')
      .replace(/<div[^>]*>/g, '<div style="margin-bottom: 1rem;">')
      .replace(/<section[^>]*>/g, '<section style="margin-bottom: 2rem; padding: 1rem;">')
      .replace(/<button[^>]*>([^<]*)<\/button>/g, '<span style="background: #3b82f6; color: white; padding: 0.5rem 1rem; border-radius: 0.5rem; display: inline-block; margin: 0.25rem;">$1</span>')
  }

  const convertToHtml = (editableContent: string) => {
    // Convert back to HTML with classes
    return editableContent
      .replace(/style="[^"]*font-size: 2\.25rem[^"]*"/g, 'class="text-4xl font-bold text-white mb-6"')
      .replace(/style="[^"]*font-size: 1\.875rem[^"]*"/g, 'class="text-3xl font-bold text-white mb-4"')
      .replace(/style="[^"]*font-size: 1\.5rem[^"]*"/g, 'class="text-2xl font-bold text-white mb-4"')
      .replace(/style="[^"]*font-size: 1\.25rem[^"]*"/g, 'class="text-xl text-gray-300 mb-2"')
      .replace(/style="[^"]*font-size: 1\.125rem[^"]*"/g, 'class="text-lg text-gray-300 mb-2"')
      .replace(/style="color: #1f2937;"/g, 'class="text-white"')
      .replace(/style="color: #6b7280;"/g, 'class="text-gray-300"')
      .replace(/style="color: #9ca3af;"/g, 'class="text-gray-400"')
      .replace(/style="[^"]*background: linear-gradient[^"]*"/g, 'class="gradient-text"')
      .replace(/style="[^"]*"/g, '')
      .replace(/<span style="background: #3b82f6[^"]*">([^<]*)<\/span>/g, '<button class="btn-neon-primary">$1</button>')
  }

  return (
    <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-gray-900 rounded-2xl w-full max-w-6xl h-[90vh] flex flex-col border border-gray-700"
      >
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-700">
          <div>
            <h2 className="text-2xl font-bold text-white">Edit Page</h2>
            <p className="text-gray-400">{pageUrl}</p>
          </div>
          <div className="flex items-center space-x-4">
            <button
              onClick={handleSave}
              disabled={saving}
              className="btn-neon-primary px-6 py-2 flex items-center"
            >
              <Save className="w-4 h-4 mr-2" />
              {saving ? 'Saving...' : 'Save'}
            </button>
            <button
              onClick={onClose}
              className="p-2 text-gray-400 hover:text-white"
            >
              <X className="w-6 h-6" />
            </button>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex border-b border-gray-700">
          {[
            { id: 'content', label: 'Content', icon: Code },
            { id: 'settings', label: 'Settings', icon: Type }
          ].map((tab) => {
            const Icon = tab.icon
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center px-6 py-3 border-b-2 transition-colors ${
                  activeTab === tab.id
                    ? 'border-purple-400 text-white'
                    : 'border-transparent text-gray-400 hover:text-white'
                }`}
              >
                <Icon className="w-4 h-4 mr-2" />
                {tab.label}
              </button>
            )
          })}
        </div>

        {/* Content */}
        <div className="flex-1 overflow-hidden">
          {activeTab === 'content' && (
            <div className="h-full flex flex-col">
              {/* Editor Toolbar */}
              <div className="flex items-center justify-between p-4 border-b border-gray-700 bg-gray-800">
                <div className="flex items-center space-x-2">
                  <button className="p-2 text-gray-400 hover:text-white hover:bg-gray-700 rounded">
                    <Bold className="w-4 h-4" />
                  </button>
                  <button className="p-2 text-gray-400 hover:text-white hover:bg-gray-700 rounded">
                    <Italic className="w-4 h-4" />
                  </button>
                  <button className="p-2 text-gray-400 hover:text-white hover:bg-gray-700 rounded">
                    <Underline className="w-4 h-4" />
                  </button>
                  <div className="w-px h-6 bg-gray-600 mx-2"></div>
                  <button className="p-2 text-gray-400 hover:text-white hover:bg-gray-700 rounded">
                    <AlignLeft className="w-4 h-4" />
                  </button>
                  <button className="p-2 text-gray-400 hover:text-white hover:bg-gray-700 rounded">
                    <AlignCenter className="w-4 h-4" />
                  </button>
                  <button className="p-2 text-gray-400 hover:text-white hover:bg-gray-700 rounded">
                    <AlignRight className="w-4 h-4" />
                  </button>
                </div>
                <button
                  onClick={() => setIsCodeView(!isCodeView)}
                  className={`px-3 py-1 rounded text-sm ${
                    isCodeView ? 'bg-purple-600 text-white' : 'bg-gray-700 text-gray-300'
                  }`}
                >
                  {isCodeView ? 'Visual' : 'Code'}
                </button>
              </div>

              {/* Editor Content */}
              <div className="flex-1 p-6">
                {isCodeView ? (
                  <textarea
                    value={pageData.content}
                    onChange={(e) => setPageData({ ...pageData, content: e.target.value })}
                    className="w-full h-full bg-gray-800 border border-gray-600 rounded-xl p-4 text-white font-mono text-sm resize-none focus:border-purple-400 focus:outline-none"
                    placeholder="Enter HTML content..."
                  />
                ) : (
                  <div 
                    contentEditable
                    suppressContentEditableWarning={true}
                    dangerouslySetInnerHTML={{ __html: convertToEditableContent(pageData.content) }}
                    onInput={(e) => {
                      const target = e.target as HTMLElement
                      setPageData({ ...pageData, content: convertToHtml(target.innerHTML) })
                    }}
                    className="w-full h-full bg-white rounded-xl p-6 text-gray-900 focus:outline-none overflow-y-auto"
                    style={{ height: 'calc(100vh - 300px)', maxHeight: '500px' }}
                  />
                )}
              </div>
            </div>
          )}

          {activeTab === 'settings' && (
            <div className="p-6 space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Page Title</label>
                <input
                  type="text"
                  value={pageData.title}
                  onChange={(e) => setPageData({ ...pageData, title: e.target.value })}
                  className="w-full bg-gray-800 border border-gray-600 rounded-xl px-4 py-3 text-white focus:border-purple-400 focus:outline-none"
                  placeholder="Page title..."
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Meta Description</label>
                <textarea
                  value={pageData.meta_description}
                  onChange={(e) => setPageData({ ...pageData, meta_description: e.target.value })}
                  rows={3}
                  className="w-full bg-gray-800 border border-gray-600 rounded-xl px-4 py-3 text-white focus:border-purple-400 focus:outline-none resize-none"
                  placeholder="Meta description for SEO..."
                />
              </div>
            </div>
          )}
        </div>
      </motion.div>
    </div>
  )
}