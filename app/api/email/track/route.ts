import { NextRequest, NextResponse } from 'next/server'
import { db } from '../../../../lib/db'

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const campaignId = searchParams.get('id')
    
    if (!campaignId) {
      return new NextResponse('Missing campaign ID', { status: 400 })
    }

    if (db) {
      // Record the email open
      await db.execute(
        'INSERT INTO email_opens (campaign_id, ip_address, user_agent) VALUES (?, ?, ?)',
        [
          campaignId,
          request.headers.get('x-forwarded-for') || request.headers.get('x-real-ip') || 'unknown',
          request.headers.get('user-agent') || 'unknown'
        ]
      )

      // Update campaign status
      await db.execute(
        'UPDATE email_campaigns SET status = "opened" WHERE campaign_id = ?',
        [campaignId]
      )
    }

    // Return 1x1 transparent pixel
    const pixel = Buffer.from(
      'iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNkYPhfDwAChwGA60e6kgAAAABJRU5ErkJggg==',
      'base64'
    )

    return new NextResponse(pixel, {
      status: 200,
      headers: {
        'Content-Type': 'image/png',
        'Cache-Control': 'no-cache, no-store, must-revalidate',
        'Pragma': 'no-cache',
        'Expires': '0'
      }
    })
  } catch (error) {
    console.error('Email tracking error:', error)
    return new NextResponse('Error', { status: 500 })
  }
}