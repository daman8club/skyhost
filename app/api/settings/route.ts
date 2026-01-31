import { NextRequest, NextResponse } from 'next/server'
import { db } from '../../../lib/db'

export async function GET() {
  try {
    if (!db) {
      return NextResponse.json({ settings: {} })
    }
    
    const [rows] = await db.execute('SELECT setting_key, setting_value FROM settings')
    
    const settingsObj: Record<string, string> = {}
    if (Array.isArray(rows)) {
      rows.forEach((row: any) => {
        settingsObj[row.setting_key] = row.setting_value
      })
    }
    
    return NextResponse.json({ settings: settingsObj })
  } catch (error) {
    console.error('Settings fetch error:', error)
    return NextResponse.json({ settings: {} })
  }
}

export async function PUT(request: NextRequest) {
  try {
    const { key, value } = await request.json()
    
    if (!db) {
      return NextResponse.json({ error: 'Database not available' }, { status: 500 })
    }
    
    await db.execute(
      'INSERT INTO settings (setting_key, setting_value) VALUES (?, ?) ON DUPLICATE KEY UPDATE setting_value = ?',
      [key, value, value]
    )
    
    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Settings update error:', error)
    return NextResponse.json({ error: 'Server error' }, { status: 500 })
  }
}