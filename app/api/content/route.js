import { NextResponse } from 'next/server'
import { db } from '../../../lib/db.ts'

export async function GET() {
  try {
    const [rows] = await db.execute('SELECT * FROM site_content')
    
    const content = {}
    rows.forEach(row => {
      if (!content[row.section]) content[row.section] = {}
      content[row.section][row.field] = row.value
    })
    
    return NextResponse.json(content)
  } catch (error) {
    console.error('Content fetch error:', error)
    return NextResponse.json({ error: 'Server error' }, { status: 500 })
  }
}

export async function PUT(request) {
  try {
    const { section, field, value } = await request.json()
    
    await db.execute(
      'INSERT INTO site_content (section, field, value) VALUES (?, ?, ?) ON DUPLICATE KEY UPDATE value = VALUES(value)',
      [section, field, value]
    )
    
    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Content update error:', error)
    return NextResponse.json({ error: 'Server error' }, { status: 500 })
  }
}