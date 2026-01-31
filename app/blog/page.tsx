'use client'

import { motion } from 'framer-motion'
import { Calendar, User, ArrowRight, Clock } from 'lucide-react'

export default function Blog() {
  const posts = [
    {
      title: 'Why Next.js is Better for SEO Than Traditional React',
      excerpt: 'Discover how Next.js server-side rendering and static generation give your website a massive SEO advantage over client-side React applications.',
      image: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=600&h=400&fit=crop',
      author: 'Sarah Chen',
      date: '2024-01-15',
      readTime: '8 min read',
      category: 'Development',
      featured: true
    },
    {
      title: 'How AI is Revolutionizing Web Design in 2024',
      excerpt: 'From automated layouts to intelligent user experiences, explore how artificial intelligence is transforming the way we design and build websites.',
      image: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=600&h=400&fit=crop',
      author: 'Marcus Johnson',
      date: '2024-01-10',
      readTime: '6 min read',
      category: 'Design',
      featured: false
    },
    {
      title: 'Building Lightning-Fast Websites in NYC: A Speed Guide',
      excerpt: 'Learn the performance optimization techniques we use to build websites that load in under 1 second, even in the competitive NYC market.',
      image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&h=400&fit=crop',
      author: 'Alex Rodriguez',
      date: '2024-01-05',
      readTime: '10 min read',
      category: 'Performance',
      featured: false
    },
    {
      title: 'The Future of E-commerce: Headless Commerce Explained',
      excerpt: 'Why headless commerce is becoming the go-to solution for enterprise e-commerce and how it can transform your online business.',
      image: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=600&h=400&fit=crop',
      author: 'Emily Watson',
      date: '2023-12-28',
      readTime: '7 min read',
      category: 'E-commerce',
      featured: false
    },
    {
      title: 'Glassmorphism vs Neumorphism: Design Trends 2024',
      excerpt: 'A deep dive into the latest UI design trends and how to implement them effectively in modern web applications.',
      image: 'https://images.unsplash.com/photo-1558655146-d09347e92766?w=600&h=400&fit=crop',
      author: 'Marcus Johnson',
      date: '2023-12-20',
      readTime: '5 min read',
      category: 'Design',
      featured: false
    },
    {
      title: 'Scaling Your Startup: When to Invest in Custom Development',
      excerpt: 'Learn when it makes sense to move from no-code solutions to custom development and how to make the transition smoothly.',
      image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&h=400&fit=crop',
      author: 'Alex Rodriguez',
      date: '2023-12-15',
      readTime: '9 min read',
      category: 'Business',
      featured: false
    }
  ]

  const categories = ['All', 'Development', 'Design', 'Performance', 'E-commerce', 'Business']

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-indigo-900 to-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-6 py-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <h1 className="text-6xl font-black text-white mb-6">Our Blog</h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Insights, tutorials, and industry trends from the team building NYC's fastest websites. 
            Stay ahead of the curve with our expert knowledge.
          </p>
        </motion.div>

        {/* Categories Filter */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="flex justify-center mb-16"
        >
          <div className="glass-card p-2 inline-flex rounded-2xl">
            {categories.map((category) => (
              <button
                key={category}
                className="px-6 py-3 rounded-xl font-semibold transition-all duration-300 text-gray-400 hover:text-white hover:bg-white/10"
              >
                {category}
              </button>
            ))}
          </div>
        </motion.div>

        {/* Featured Post */}
        {posts.filter(post => post.featured).map((post, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="glass-card p-8 mb-16 group hover:bg-white/10 transition-all duration-300"
          >
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <div className="inline-block px-4 py-2 bg-indigo-500/20 rounded-full border border-indigo-400/30 mb-6">
                  <span className="text-indigo-300 font-semibold text-sm">Featured Post</span>
                </div>
                <h2 className="text-4xl font-bold text-white mb-6 group-hover:text-cyan-400 transition-colors">
                  {post.title}
                </h2>
                <p className="text-gray-300 leading-relaxed mb-6 text-lg">{post.excerpt}</p>
                
                <div className="flex items-center space-x-6 text-sm text-gray-400 mb-8">
                  <div className="flex items-center">
                    <User className="w-4 h-4 mr-2" />
                    {post.author}
                  </div>
                  <div className="flex items-center">
                    <Calendar className="w-4 h-4 mr-2" />
                    {new Date(post.date).toLocaleDateString()}
                  </div>
                  <div className="flex items-center">
                    <Clock className="w-4 h-4 mr-2" />
                    {post.readTime}
                  </div>
                </div>

                <button className="btn-neon-primary group">
                  Read Full Article
                  <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
              
              <div className="relative">
                <img
                  src={post.image}
                  alt={post.title}
                  className="w-full h-80 object-cover rounded-2xl"
                />
                <div className="absolute top-4 right-4">
                  <span className="px-3 py-1 bg-indigo-500/80 rounded-full text-sm font-semibold text-white">
                    {post.category}
                  </span>
                </div>
              </div>
            </div>
          </motion.div>
        ))}

        {/* Blog Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {posts.filter(post => !post.featured).map((post, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1 * index }}
              className="glass-card overflow-hidden group hover:bg-white/10 transition-all duration-300"
            >
              <div className="relative">
                <img
                  src={post.image}
                  alt={post.title}
                  className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute top-4 right-4">
                  <span className="px-3 py-1 bg-indigo-500/80 rounded-full text-sm font-semibold text-white">
                    {post.category}
                  </span>
                </div>
              </div>
              
              <div className="p-6">
                <h3 className="text-xl font-bold text-white mb-3 group-hover:text-cyan-400 transition-colors line-clamp-2">
                  {post.title}
                </h3>
                <p className="text-gray-300 mb-4 line-clamp-3">{post.excerpt}</p>
                
                <div className="flex items-center justify-between text-sm text-gray-400 mb-4">
                  <div className="flex items-center">
                    <User className="w-4 h-4 mr-1" />
                    {post.author}
                  </div>
                  <div className="flex items-center">
                    <Clock className="w-4 h-4 mr-1" />
                    {post.readTime}
                  </div>
                </div>
                
                <div className="flex items-center justify-between">
                  <span className="text-gray-400 text-sm">
                    {new Date(post.date).toLocaleDateString()}
                  </span>
                  <button className="text-cyan-400 font-semibold hover:text-cyan-300 transition-colors flex items-center">
                    Read More
                    <ArrowRight className="ml-1 w-4 h-4" />
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Newsletter CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="text-center mt-20"
        >
          <div className="glass-card p-12">
            <h2 className="text-4xl font-bold text-white mb-6">Stay Updated</h2>
            <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
              Get the latest insights on web development, design trends, and digital marketing 
              delivered straight to your inbox.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-white placeholder-gray-400 focus:border-cyan-400 focus:outline-none"
              />
              <button className="btn-neon-primary">
                Subscribe
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  )
}