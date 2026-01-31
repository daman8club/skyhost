import { NextRequest, NextResponse } from 'next/server'
import { db } from '../../../lib/db'

export async function GET() {
  try {
    if (!db) {
      return NextResponse.json({ leads: [], total: 0, newToday: 0 })
    }
    
    const [leads] = await db.execute('SELECT * FROM leads ORDER BY created_at DESC')
    const [totalCount] = await db.execute('SELECT COUNT(*) as count FROM leads')
    const [newTodayCount] = await db.execute('SELECT COUNT(*) as count FROM leads WHERE DATE(created_at) = CURDATE()')
    
    return NextResponse.json({
      leads,
      total: (totalCount as any)[0]?.count || 0,
      newToday: (newTodayCount as any)[0]?.count || 0
    })
  } catch (error) {
    console.error('Leads fetch error:', error)
    return NextResponse.json({ leads: [], total: 0, newToday: 0 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const { name, email, phone, message, source } = await request.json()
    
    if (!db) {
      return NextResponse.json({ error: 'Database not available' }, { status: 500 })
    }
    
    const result = await db.execute(
      'INSERT INTO leads (name, email, phone, message, source, created_at) VALUES (?, ?, ?, ?, ?, NOW())',
      [name, email, phone || null, message || null, source || 'website']
    )
    
    return NextResponse.json({ success: true, id: (result as any)[0]?.insertId })
  } catch (error) {
    console.error('Lead submission error:', error)
    return NextResponse.json({ error: 'Failed to submit lead' }, { status: 500 })
  }
}