import { NextRequest, NextResponse } from 'next/server'
import fs from 'fs'
import path from 'path'

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const pageUrl = searchParams.get('url')
    
    if (!pageUrl) {
      return NextResponse.json({ error: 'Page URL required' }, { status: 400 })
    }

    // Map URLs to actual file paths
    const pageMap: Record<string, string> = {
      '/': 'app/page.tsx',
      '/contact': 'app/contact/page.tsx',
      '/services/web-development': 'app/services/web-development/page.tsx',
      '/services/mobile-apps': 'app/services/mobile-apps/page.tsx',
      '/services/seo-marketing': 'app/services/seo-marketing/page.tsx',
      '/services/ui-ux-design': 'app/services/ui-ux-design/page.tsx',
      '/services/ai-integration': 'app/services/ai-integration/page.tsx',
      '/services/cloud-solutions': 'app/services/cloud-solutions/page.tsx',
      '/company/about': 'app/company/about/page.tsx'
    }

    const filePath = pageMap[pageUrl]
    if (!filePath) {
      return NextResponse.json({ error: 'Page not found' }, { status: 404 })
    }

    const fullPath = path.join(process.cwd(), filePath)
    
    if (!fs.existsSync(fullPath)) {
      return NextResponse.json({ error: 'File not found' }, { status: 404 })
    }

    const content = fs.readFileSync(fullPath, 'utf-8')
    
    // Extract title from the content (basic extraction)
    const titleMatch = content.match(/<title>(.*?)<\/title>/i) || 
                      content.match(/title:\s*['"`](.*?)['"`]/i) ||
                      content.match(/<h1[^>]*>(.*?)<\/h1>/i)
    
    const title = titleMatch ? titleMatch[1] : getDefaultTitle(pageUrl)
    
    // Extract meta description
    const metaMatch = content.match(/description:\s*['"`](.*?)['"`]/i) ||
                     content.match(/<meta[^>]*name=['"`]description['"`][^>]*content=['"`](.*?)['"`]/i)
    
    const metaDescription = metaMatch ? metaMatch[1] : getDefaultDescription(pageUrl)

    return NextResponse.json({
      title,
      content: extractMainContent(content),
      meta_description: metaDescription,
      raw_content: content
    })
  } catch (error) {
    console.error('Error fetching page content:', error)
    return NextResponse.json({ error: 'Failed to fetch content' }, { status: 500 })
  }
}

function extractMainContent(content: string): string {
  // For homepage, extract only the visual HTML content
  if (content.includes('Building the Future of')) {
    return `<div class="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-gray-900 text-white">
  <section class="min-h-screen flex items-center justify-center px-6">
    <div class="max-w-7xl mx-auto">
      <div class="glass-card p-8 md:p-16">
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          <div class="text-left space-y-8">
            <div class="inline-flex items-center px-4 py-2 glass rounded-full text-sm font-medium text-cyan-400 border border-cyan-400/30">
              <span>Next-Gen Digital Solutions</span>
            </div>
            
            <h1 class="text-4xl md:text-6xl lg:text-7xl font-black leading-tight">
              <span class="block text-white">Building the Future of</span>
              <span class="block gradient-text">Digital Experiences.</span>
            </h1>
            
            <p class="text-lg md:text-xl text-gray-300 leading-relaxed max-w-2xl">
              Revolutionary web experiences that push boundaries and deliver exceptional results for forward-thinking businesses worldwide.
            </p>
            
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
            
            <div class="flex flex-col sm:flex-row gap-4 pt-4">
              <button class="btn-neon-primary">Start Your Project</button>
              <button class="btn-neon-secondary">Get Quote</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</div>`
  }
  
  // For other pages, try to extract clean HTML
  const htmlMatch = content.match(/<div[^>]*className[^>]*>([\s\S]*?)<\/div>/m)
  if (htmlMatch) {
    return htmlMatch[0]
      .replace(/className=/g, 'class=')
      .replace(/onClick={[^}]*}/g, '')
      .replace(/{[^}]*}/g, '')
      .replace(/\s+/g, ' ')
      .trim()
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

function getDefaultTitle(url: string): string {
  const titles: Record<string, string> = {
    '/': 'Skyhost Digital - Home',
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

function getDefaultDescription(url: string): string {
  return 'Professional web development and digital services by Skyhost Digital.'
}