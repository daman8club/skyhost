// Email tracking utilities

export function generateCampaignId(): string {
  return `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`
}

export function addTrackingPixel(htmlContent: string, campaignId: string): string {
  const trackingPixel = `<img src="${process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'}/api/email/track?id=${campaignId}" width="1" height="1" style="display:none;" alt="" />`
  
  // Add before closing body tag or at the end
  if (htmlContent.includes('</body>')) {
    return htmlContent.replace('</body>', `${trackingPixel}</body>`)
  } else {
    return htmlContent + trackingPixel
  }
}

export function addClickTracking(htmlContent: string, campaignId: string): string {
  // Replace all links with tracked versions
  return htmlContent.replace(
    /<a\s+([^>]*href=["']([^"']+)["'][^>]*)>/gi,
    (match, attributes, url) => {
      const trackedUrl = `${process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'}/api/email/click?id=${campaignId}&url=${encodeURIComponent(url)}`
      return `<a ${attributes.replace(/href=["'][^"']+["']/, `href="${trackedUrl}"`)}>`
    }
  )
}

export async function createEmailCampaign(subject: string, recipient: string) {
  const campaignId = generateCampaignId()
  
  try {
    await fetch('/api/email', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        campaign_id: campaignId,
        subject,
        recipient_email: recipient
      })
    })
    
    return campaignId
  } catch (error) {
    console.error('Failed to create email campaign:', error)
    return null
  }
}