'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Mail, Eye, Clock, TrendingUp, Users, BarChart3 } from 'lucide-react'

interface EmailCampaign {
  campaign_id: string
  subject: string
  recipient_email: string
  sent_at: string
  status: string
  open_count: number
  last_opened: string | null
}

interface EmailStats {
  total_emails: number
  opened_emails: number
  total_opens: number
}

export default function EmailTrackingDashboard() {
  const [campaigns, setCampaigns] = useState<EmailCampaign[]>([])
  const [stats, setStats] = useState<EmailStats>({ total_emails: 0, opened_emails: 0, total_opens: 0 })
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchEmailData()
  }, [])

  const fetchEmailData = async () => {
    try {
      const response = await fetch('/api/email')
      const data = await response.json()
      setCampaigns(data.campaigns || [])
      setStats(data.stats || { total_emails: 0, opened_emails: 0, total_opens: 0 })
    } catch (error) {
      console.error('Error fetching email data:', error)
    } finally {
      setLoading(false)
    }
  }

  const openRate = stats.total_emails > 0 ? ((stats.opened_emails / stats.total_emails) * 100).toFixed(1) : '0'

  if (loading) {
    return <div className="text-white">Loading email tracking data...</div>
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="space-y-8"
    >
      <div>
        <h2 className="text-3xl font-bold text-white mb-2">Email Tracking</h2>
        <p className="text-gray-400">Monitor email opens and engagement</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="glass-card p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-blue-400/20 rounded-xl flex items-center justify-center">
              <Mail className="w-6 h-6 text-blue-400" />
            </div>
          </div>
          <div className="text-2xl font-bold text-white mb-1">{stats.total_emails}</div>
          <div className="text-gray-400 text-sm">Total Emails Sent</div>
        </div>

        <div className="glass-card p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-green-400/20 rounded-xl flex items-center justify-center">
              <Eye className="w-6 h-6 text-green-400" />
            </div>
          </div>
          <div className="text-2xl font-bold text-white mb-1">{stats.opened_emails}</div>
          <div className="text-gray-400 text-sm">Emails Opened</div>
        </div>

        <div className="glass-card p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-purple-400/20 rounded-xl flex items-center justify-center">
              <TrendingUp className="w-6 h-6 text-purple-400" />
            </div>
          </div>
          <div className="text-2xl font-bold text-white mb-1">{openRate}%</div>
          <div className="text-gray-400 text-sm">Open Rate</div>
        </div>

        <div className="glass-card p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-orange-400/20 rounded-xl flex items-center justify-center">
              <BarChart3 className="w-6 h-6 text-orange-400" />
            </div>
          </div>
          <div className="text-2xl font-bold text-white mb-1">{stats.total_opens}</div>
          <div className="text-gray-400 text-sm">Total Opens</div>
        </div>
      </div>

      {/* Email Campaigns Table */}
      <div className="glass-card p-6">
        <h3 className="text-xl font-bold text-white mb-6">Email Campaigns</h3>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-white/10">
                <th className="text-left text-gray-300 pb-3">Subject</th>
                <th className="text-left text-gray-300 pb-3">Recipient</th>
                <th className="text-left text-gray-300 pb-3">Sent</th>
                <th className="text-left text-gray-300 pb-3">Opens</th>
                <th className="text-left text-gray-300 pb-3">Last Opened</th>
                <th className="text-left text-gray-300 pb-3">Status</th>
              </tr>
            </thead>
            <tbody>
              {campaigns.map((campaign) => (
                <tr key={campaign.campaign_id} className="border-b border-white/5">
                  <td className="py-3 text-white max-w-xs truncate">{campaign.subject}</td>
                  <td className="py-3 text-gray-300">{campaign.recipient_email}</td>
                  <td className="py-3 text-gray-300">
                    {new Date(campaign.sent_at).toLocaleDateString()}
                  </td>
                  <td className="py-3">
                    <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
                      campaign.open_count > 0 ? 'bg-green-500/20 text-green-400' : 'bg-gray-500/20 text-gray-400'
                    }`}>
                      {campaign.open_count}
                    </span>
                  </td>
                  <td className="py-3 text-gray-300">
                    {campaign.last_opened 
                      ? new Date(campaign.last_opened).toLocaleString()
                      : 'Never'
                    }
                  </td>
                  <td className="py-3">
                    <span className={`px-2 py-1 rounded-full text-xs ${
                      campaign.status === 'opened' ? 'bg-green-500/20 text-green-400' :
                      campaign.status === 'sent' ? 'bg-blue-500/20 text-blue-400' :
                      'bg-gray-500/20 text-gray-400'
                    }`}>
                      {campaign.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </motion.div>
  )
}