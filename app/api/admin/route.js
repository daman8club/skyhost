import { NextRequest, NextResponse } from 'next/server'
import { db } from '../../../lib/db.ts'

export async function GET() {
  try {
    if (!db) {
      return NextResponse.json({
        totalVisitors: 0,
        activeChats: 0,
        conversionRate: 0,
        pageViews: 0
      })
    }
    
    // Get leads count instead of analytics table
    const [leadsCount] = await db.execute('SELECT COUNT(*) as total FROM leads')
    const [newLeadsToday] = await db.execute('SELECT COUNT(*) as today FROM leads WHERE DATE(created_at) = CURDATE()')
    
    return NextResponse.json({
      totalVisitors: 1247, // Static data
      activeChats: 3,
      conversionRate: 12.5,
      projectsCompleted: 47,
      totalLeads: leadsCount[0]?.total || 0,
      newLeadsToday: newLeadsToday[0]?.today || 0
    })
  } catch (error) {
    console.error('Analytics error:', error)
    return NextResponse.json({
      totalVisitors: 0,
      activeChats: 0,
      conversionRate: 0,
      pageViews: 0,
      totalLeads: 0,
      newLeadsToday: 0
    })
  }
}