import { NextRequest, NextResponse } from 'next/server'
import { db } from '../../../lib/db'

export async function GET() {
  try {
    if (!db) {
      return NextResponse.json({ campaigns: [], stats: {} })
    }

    // Get all campaigns with open counts
    const [campaigns] = await db.execute(`
      SELECT 
        ec.campaign_id,
        ec.subject,
        ec.recipient_email,
        ec.sent_at,
        ec.status,
        COUNT(eo.id) as open_count,
        MAX(eo.opened_at) as last_opened
      FROM email_campaigns ec
      LEFT JOIN email_opens eo ON ec.campaign_id = eo.campaign_id
      GROUP BY ec.campaign_id
      ORDER BY ec.sent_at DESC
    `)

    // Get overall stats
    const [stats] = await db.execute(`
      SELECT 
        COUNT(DISTINCT ec.campaign_id) as total_emails,
        COUNT(DISTINCT CASE WHEN eo.id IS NOT NULL THEN ec.campaign_id END) as opened_emails,
        COUNT(eo.id) as total_opens
      FROM email_campaigns ec
      LEFT JOIN email_opens eo ON ec.campaign_id = eo.campaign_id
    `)

    return NextResponse.json({
      campaigns,
      stats: (stats as any[])[0] || { total_emails: 0, opened_emails: 0, total_opens: 0 }
    })
  } catch (error) {
    console.error('Email analytics error:', error)
    return NextResponse.json({ campaigns: [], stats: {} })
  }
}

export async function POST(request: NextRequest) {
  try {
    const { subject, recipient_email, campaign_id } = await request.json()
    
    if (!db) {
      return NextResponse.json({ error: 'Database not available' }, { status: 500 })
    }

    await db.execute(
      'INSERT INTO email_campaigns (campaign_id, subject, recipient_email) VALUES (?, ?, ?)',
      [campaign_id, subject, recipient_email]
    )

    return NextResponse.json({ success: true, campaign_id })
  } catch (error) {
    console.error('Email campaign creation error:', error)
    return NextResponse.json({ error: 'Failed to create campaign' }, { status: 500 })
  }
}