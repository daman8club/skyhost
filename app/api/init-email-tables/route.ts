import { NextResponse } from 'next/server'
import { db } from '../../../lib/db'

export async function GET() {
  return NextResponse.json({ message: 'Use POST to create tables' })
}

export async function POST() {
  try {
    if (!db) {
      return NextResponse.json({ error: 'Database not available' }, { status: 500 })
    }

    await db.execute(`
      CREATE TABLE IF NOT EXISTS email_campaigns (
        id INT AUTO_INCREMENT PRIMARY KEY,
        campaign_id VARCHAR(255) UNIQUE NOT NULL,
        subject VARCHAR(500) NOT NULL,
        recipient_email VARCHAR(255) NOT NULL,
        sender_email VARCHAR(255) DEFAULT 'mail@skyhost.agency',
        sent_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        status ENUM('sent', 'delivered', 'opened', 'clicked') DEFAULT 'sent',
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `)

    await db.execute(`
      CREATE TABLE IF NOT EXISTS email_opens (
        id INT AUTO_INCREMENT PRIMARY KEY,
        campaign_id VARCHAR(255) NOT NULL,
        opened_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        ip_address VARCHAR(45),
        user_agent TEXT,
        INDEX idx_campaign_id (campaign_id)
      )
    `)

    await db.execute(`
      CREATE TABLE IF NOT EXISTS email_clicks (
        id INT AUTO_INCREMENT PRIMARY KEY,
        campaign_id VARCHAR(255) NOT NULL,
        clicked_url VARCHAR(1000) NOT NULL,
        clicked_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        ip_address VARCHAR(45),
        user_agent TEXT,
        INDEX idx_campaign_id (campaign_id)
      )
    `)

    await db.execute(`
      CREATE TABLE IF NOT EXISTS page_content (
        id INT AUTO_INCREMENT PRIMARY KEY,
        page_url VARCHAR(255) UNIQUE NOT NULL,
        title VARCHAR(500) NOT NULL,
        content LONGTEXT,
        meta_description TEXT,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
      )
    `)

    return NextResponse.json({ success: true, message: 'Email tracking tables created' })
  } catch (error) {
    console.error('Error creating tables:', error)
    return NextResponse.json({ error: error instanceof Error ? error.message : 'Unknown error' }, { status: 500 })
  }
}