import { NextRequest, NextResponse } from 'next/server'
import { db } from '../../../lib/db'

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const pageUrl = searchParams.get('url')
    
    if (!db) {
      return NextResponse.json({ error: 'Database not available' }, { status: 500 })
    }
    
    if (pageUrl) {
      const [rows] = await db.execute('SELECT * FROM page_content WHERE page_url = ?', [pageUrl])
      return NextResponse.json({ page: (rows as any[])[0] || null })
    }
    
    const [pages] = await db.execute('SELECT * FROM page_content ORDER BY page_url')
    return NextResponse.json({ pages })
  } catch (error) {
    console.error('Pages fetch error:', error)
    return NextResponse.json({ pages: [] })
  }
}

export async function POST(request: NextRequest) {
  try {
    const { page_url, title, content, meta_description } = await request.json()
    
    if (!db) {
      return NextResponse.json({ error: 'Database not available' }, { status: 500 })
    }
    
    await db.execute(`
      INSERT INTO page_content (page_url, title, content, meta_description, updated_at) 
      VALUES (?, ?, ?, ?, NOW())
      ON DUPLICATE KEY UPDATE 
      title = VALUES(title), 
      content = VALUES(content), 
      meta_description = VALUES(meta_description),
      updated_at = NOW()
    `, [page_url, title, content, meta_description])
    
    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Page save error:', error)
    return NextResponse.json({ error: 'Failed to save page' }, { status: 500 })
  }
}