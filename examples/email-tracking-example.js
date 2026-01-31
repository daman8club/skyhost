// Simple email tracking implementation

// 1. Generate unique campaign ID
function generateCampaignId() {
  return Date.now() + '-' + Math.random().toString(36).substr(2, 9)
}

// 2. Add tracking pixel to your email HTML
function addTrackingPixel(emailHTML, campaignId) {
  const pixel = `<img src="https://yourdomain.com/api/email/track?id=${campaignId}" width="1" height="1" style="display:none;" alt="" />`
  
  // Add before closing body tag
  return emailHTML.replace('</body>', pixel + '</body>')
}

// 3. Example usage when sending email
async function sendEmail() {
  const campaignId = generateCampaignId()
  
  // Your email HTML content
  let emailHTML = `
    <html>
    <body>
      <h1>Hello Client!</h1>
      <p>Your project is ready.</p>
    </body>
    </html>
  `
  
  // Add tracking pixel
  emailHTML = addTrackingPixel(emailHTML, campaignId)
  
  // Save to database
  await fetch('/api/email', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      campaign_id: campaignId,
      subject: 'Your Project Update',
      recipient_email: 'client@example.com'
    })
  })
  
  // Send email using your email service (Gmail, SendGrid, etc.)
  // The tracking pixel will automatically trigger when email is opened
  
  return campaignId
}