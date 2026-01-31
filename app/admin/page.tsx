'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import { 
  Users, 
  MessageSquare, 
  BarChart3, 
  Settings, 
  Edit3, 
  Save, 
  Plus,
  Bell,
  Filter,
  Download,
  Upload,
  Zap,
  Award,
  Shield,
  LogOut,
  Mail
} from 'lucide-react'
import EmailTrackingDashboard from '../../components/EmailTrackingDashboard'
import PageEditor from '../../components/PageEditor'

export default function AdminPanel() {
  const [activeTab, setActiveTab] = useState('dashboard')
  const [loading, setLoading] = useState(true)
  const [analytics, setAnalytics] = useState({ totalLeads: 0, newLeads: 0, totalVisitors: 0, conversionRate: 0, activeChats: 0, projectsCompleted: 0 })
  const [leads, setLeads] = useState<any[]>([])
  const [settings, setSettings] = useState<any>({})
  const [mounted, setMounted] = useState(false)
  const [editingPage, setEditingPage] = useState<string | null>(null)
  const router = useRouter()

  const fetchData = async () => {
    try {
      const [leadsRes, settingsRes, analyticsRes] = await Promise.all([
        fetch('/api/leads'),
        fetch('/api/settings'),
        fetch('/api/admin')
      ])
      
      const leadsData = await leadsRes.json()
      const settingsData = await settingsRes.json()
      const analyticsData = await analyticsRes.json()
      
      setLeads(leadsData.leads || [])
      setAnalytics({
        totalLeads: leadsData.total || 0,
        newLeads: leadsData.newToday || 0,
        totalVisitors: analyticsData.totalVisitors || 0,
        activeChats: analyticsData.activeChats || 0,
        conversionRate: analyticsData.conversionRate || 0,
        projectsCompleted: analyticsData.projectsCompleted || 0
      })
      setSettings(settingsData.settings || {})
    } catch (error) {
      console.error('Error fetching data:', error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    setMounted(true)
    // Check if user is logged in
    const isLoggedIn = localStorage.getItem('admin-logged-in') === 'true'
    if (!isLoggedIn) {
      router.push('/admin/login')
      return
    }
    fetchData()
  }, [])

  if (!mounted) {
    return null
  }

  const updateSettings = async (key: string, value: any) => {
    try {
      await fetch('/api/settings', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ key, value })
      })
      
      setSettings((prev: any) => ({ ...prev, [key]: value }))
    } catch (error) {
      console.error('Error updating settings:', error)
    }
  }

  const handleLogout = async () => {
    try {
      await fetch('/api/auth/logout', { method: 'POST' })
      localStorage.removeItem('admin-logged-in')
      router.push('/admin/login')
    } catch (error) {
      console.error('Logout error:', error)
      localStorage.removeItem('admin-logged-in')
      router.push('/admin/login')
    }
  }

  const tabs = [
    { id: 'dashboard', label: 'Dashboard', icon: BarChart3 },
    { id: 'leads', label: 'Leads', icon: Users },
    { id: 'email-tracking', label: 'Email Tracking', icon: Mail },
    { id: 'pages', label: 'Pages', icon: Edit3 },
    { id: 'analytics', label: 'Analytics', icon: BarChart3 },
    { id: 'settings', label: 'Settings', icon: Settings }
  ]

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-space-black via-navy-dark to-space-black flex items-center justify-center">
        <div className="text-white">Loading...</div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-space-black via-navy-dark to-space-black">
      {/* Admin Header */}
      <header className="glass-strong border-b border-white/10 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="p-2 glass rounded-xl">
                <Zap className="h-6 w-6 text-purple-400" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-white">Skyhost Digital</h1>
                <p className="text-sm text-gray-400">Admin Panel</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <button className="relative p-2 glass rounded-xl hover:bg-white/10 transition-colors">
                <Bell className="w-5 h-5 text-gray-300" />
                <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full"></span>
              </button>
              <button 
                onClick={handleLogout}
                className="p-2 glass rounded-xl hover:bg-white/10 transition-colors"
              >
                <LogOut className="w-5 h-5 text-gray-300" />
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <nav className="glass-card p-6">
              <div className="space-y-2">
                {tabs.map((tab) => {
                  const Icon = tab.icon
                  return (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl transition-all duration-200 ${
                        activeTab === tab.id
                          ? 'bg-gradient-to-r from-purple-400/20 to-pink-400/20 text-white border border-purple-400/30'
                          : 'text-gray-400 hover:text-white hover:bg-white/5'
                      }`}
                    >
                      <Icon className="w-5 h-5" />
                      <span className="font-medium">{tab.label}</span>
                    </button>
                  )
                })}
              </div>
            </nav>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            {/* Dashboard Tab */}
            {activeTab === 'dashboard' && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="space-y-8"
              >
                <div>
                  <h2 className="text-3xl font-bold text-white mb-2">Dashboard</h2>
                  <p className="text-gray-400">Overview of your agency performance</p>
                </div>

                {/* Stats Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  <div className="glass-card p-6">
                    <div className="flex items-center justify-between mb-4">
                      <div className="w-12 h-12 bg-blue-400/20 rounded-xl flex items-center justify-center">
                        <Users className="w-6 h-6 text-blue-400" />
                      </div>
                      <span className="text-green-400 text-sm font-semibold">+12%</span>
                    </div>
                    <div className="text-2xl font-bold text-white mb-1">{analytics.totalVisitors}</div>
                    <div className="text-gray-400 text-sm">Total Visitors</div>
                  </div>

                  <div className="glass-card p-6">
                    <div className="flex items-center justify-between mb-4">
                      <div className="w-12 h-12 bg-green-400/20 rounded-xl flex items-center justify-center">
                        <MessageSquare className="w-6 h-6 text-green-400" />
                      </div>
                      <span className="text-green-400 text-sm font-semibold">Live</span>
                    </div>
                    <div className="text-2xl font-bold text-white mb-1">{analytics.activeChats || 0}</div>
                    <div className="text-gray-400 text-sm">Active Chats</div>
                  </div>

                  <div className="glass-card p-6">
                    <div className="flex items-center justify-between mb-4">
                      <div className="w-12 h-12 bg-purple-400/20 rounded-xl flex items-center justify-center">
                        <BarChart3 className="w-6 h-6 text-purple-400" />
                      </div>
                      <span className="text-green-400 text-sm font-semibold">+0.8%</span>
                    </div>
                    <div className="text-2xl font-bold text-white mb-1">{analytics.conversionRate}%</div>
                    <div className="text-gray-400 text-sm">Conversion Rate</div>
                  </div>

                  <div className="glass-card p-6">
                    <div className="flex items-center justify-between mb-4">
                      <div className="w-12 h-12 bg-orange-400/20 rounded-xl flex items-center justify-center">
                        <Award className="w-6 h-6 text-orange-400" />
                      </div>
                      <span className="text-green-400 text-sm font-semibold">+5</span>
                    </div>
                    <div className="text-2xl font-bold text-white mb-1">{analytics.projectsCompleted || 47}</div>
                    <div className="text-gray-400 text-sm">Projects Completed</div>
                  </div>
                </div>
              </motion.div>
            )}

            {/* Leads Tab */}
            {activeTab === 'leads' && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="space-y-6"
              >
                <div>
                  <h2 className="text-3xl font-bold text-white mb-2">Leads Management</h2>
                  <p className="text-gray-400">Manage and track your leads</p>
                </div>

                <div className="glass-card p-6">
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr className="border-b border-white/10">
                          <th className="text-left text-gray-300 pb-3">Name</th>
                          <th className="text-left text-gray-300 pb-3">Email</th>
                          <th className="text-left text-gray-300 pb-3">Phone</th>
                          <th className="text-left text-gray-300 pb-3">Message</th>
                          <th className="text-left text-gray-300 pb-3">Status</th>
                          <th className="text-left text-gray-300 pb-3">Date</th>
                        </tr>
                      </thead>
                      <tbody>
                        {leads.map((lead) => (
                          <tr key={lead.id} className="border-b border-white/5">
                            <td className="py-3 text-white">{lead.name}</td>
                            <td className="py-3 text-gray-300">{lead.email}</td>
                            <td className="py-3 text-gray-300">{lead.phone || 'N/A'}</td>
                            <td className="py-3 text-gray-300 max-w-xs truncate">{lead.message || 'No message'}</td>
                            <td className="py-3">
                              <span className={`px-2 py-1 rounded-full text-xs ${
                                lead.status === 'new' ? 'bg-blue-500/20 text-blue-400' :
                                lead.status === 'contacted' ? 'bg-yellow-500/20 text-yellow-400' :
                                lead.status === 'qualified' ? 'bg-purple-500/20 text-purple-400' :
                                lead.status === 'converted' ? 'bg-green-500/20 text-green-400' :
                                'bg-gray-500/20 text-gray-400'
                              }`}>
                                {lead.status}
                              </span>
                            </td>
                            <td className="py-3 text-gray-300">
                              {new Date(lead.created_at).toLocaleDateString()}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </motion.div>
            )}

            {/* Pages Tab */}
            {activeTab === 'pages' && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="space-y-6"
              >
                <div>
                  <h2 className="text-3xl font-bold text-white mb-2">Pages Management</h2>
                  <p className="text-gray-400">Access all website pages</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {[
                    { name: 'Homepage', url: '/', icon: '🏠' },
                    { name: 'Contact', url: '/contact', icon: '📧' },
                    { name: 'Web Development', url: '/services/web-development', icon: '💻' },
                    { name: 'Mobile Apps', url: '/services/mobile-apps', icon: '📱' },
                    { name: 'SEO Marketing', url: '/services/seo-marketing', icon: '📈' },
                    { name: 'UI/UX Design', url: '/services/ui-ux-design', icon: '🎨' },
                    { name: 'AI Integration', url: '/services/ai-integration', icon: '🤖' },
                    { name: 'Cloud Solutions', url: '/services/cloud-solutions', icon: '☁️' },
                    { name: 'About Us', url: '/company/about', icon: '👥' }
                  ].map((page, index) => (
                    <div key={index} className="glass-card p-6 hover:bg-white/5 transition-colors">
                      <div className="flex items-center space-x-4 mb-4">
                        <span className="text-2xl">{page.icon}</span>
                        <div>
                          <h3 className="text-lg font-semibold text-white">{page.name}</h3>
                          <p className="text-sm text-gray-400">{page.url}</p>
                        </div>
                      </div>
                      <div className="flex space-x-2">
                        <a href={page.url} target="_blank" className="btn-neon-secondary text-sm px-3 py-2">
                          View Page
                        </a>
                        <button 
                          onClick={() => setEditingPage(page.url)}
                          className="btn-neon-primary text-sm px-3 py-2"
                        >
                          Edit
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}

            {/* Analytics Tab */}
            {activeTab === 'analytics' && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="space-y-6"
              >
                <div>
                  <h2 className="text-3xl font-bold text-white mb-2">Analytics</h2>
                  <p className="text-gray-400">Website performance metrics</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="glass-card p-6">
                    <h3 className="text-xl font-bold text-white mb-4">Lead Sources</h3>
                    <div className="space-y-3">
                      {[
                        { source: 'Homepage CTA', count: 45, percentage: 35 },
                        { source: 'Contact Page', count: 32, percentage: 25 },
                        { source: 'Service Pages', count: 28, percentage: 22 },
                        { source: 'Newsletter', count: 23, percentage: 18 }
                      ].map((item, index) => (
                        <div key={index} className="flex justify-between items-center">
                          <span className="text-gray-300">{item.source}</span>
                          <div className="flex items-center space-x-2">
                            <span className="text-white font-semibold">{item.count}</span>
                            <span className="text-sm text-gray-400">({item.percentage}%)</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="glass-card p-6">
                    <h3 className="text-xl font-bold text-white mb-4">Page Views</h3>
                    <div className="space-y-3">
                      {[
                        { page: 'Homepage', views: 1247 },
                        { page: 'Services', views: 892 },
                        { page: 'Contact', views: 456 },
                        { page: 'About', views: 234 }
                      ].map((item, index) => (
                        <div key={index} className="flex justify-between items-center">
                          <span className="text-gray-300">{item.page}</span>
                          <span className="text-white font-semibold">{item.views}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {/* Email Tracking Tab */}
            {activeTab === 'email-tracking' && (
              <EmailTrackingDashboard />
            )}

            {/* Settings Tab */}
            {activeTab === 'settings' && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="space-y-6"
              >
                <div>
                  <h2 className="text-3xl font-bold text-white mb-2">Settings</h2>
                  <p className="text-gray-400">Configure your website settings</p>
                </div>

                <div className="space-y-6">
                  {/* Tawk.io Settings */}
                  <div className="glass-card p-6">
                    <h3 className="text-xl font-bold text-white mb-6">Tawk.io Live Chat</h3>
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">Property ID</label>
                        <input
                          type="text"
                          value={settings.tawk_property_id || ''}
                          onChange={(e) => updateSettings('tawk_property_id', e.target.value)}
                          placeholder="your-tawk-property-id"
                          className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-purple-400/50 focus:outline-none transition-colors"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">Widget ID</label>
                        <input
                          type="text"
                          value={settings.tawk_widget_id || ''}
                          onChange={(e) => updateSettings('tawk_widget_id', e.target.value)}
                          placeholder="your-tawk-widget-id"
                          className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-purple-400/50 focus:outline-none transition-colors"
                        />
                      </div>
                      <button className="btn-neon-primary">
                        <Save className="w-4 h-4 mr-2" />
                        Save Tawk.io Settings
                      </button>
                    </div>
                  </div>

                  {/* Leads Management */}
                  <div className="glass-card p-6">
                    <h3 className="text-xl font-bold text-white mb-6">Leads Management</h3>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <span className="text-gray-300">Total Leads</span>
                        <span className="text-2xl font-bold text-white">{analytics.totalLeads}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-gray-300">New Leads (Today)</span>
                        <span className="text-2xl font-bold text-green-400">{analytics.newLeads}</span>
                      </div>
                      <button className="btn-neon-secondary w-full">
                        <Download className="w-4 h-4 mr-2" />
                        Export Leads CSV
                      </button>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </div>
        </div>
      </div>
      
      {/* Page Editor Modal */}
      {editingPage && (
        <PageEditor 
          pageUrl={editingPage} 
          onClose={() => setEditingPage(null)} 
        />
      )}
    </div>
  )
}