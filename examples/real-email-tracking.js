// Real email composition with tracking

function composeTrackedEmail(recipientEmail, subject, content) {
  // 1. Generate unique campaign ID
  const campaignId = Date.now() + '-' + Math.random().toString(36).substr(2, 9)
  
  // 2. Create email HTML with tracking pixel
  const emailHTML = `
<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <title>${subject}</title>
</head>
<body style="font-family: Arial, sans-serif; margin: 0; padding: 20px;">
    <div style="max-width: 600px; margin: 0 auto;">
        <!-- Your email content -->
        ${content}
        
        <!-- Tracking pixel (invisible) -->
        <img src="https://skyhost.agency/api/email/track?id=${campaignId}" 
             width="1" height="1" style="display:none;" alt="" />
    </div>
</body>
</html>
  `
  
  return { campaignId, emailHTML }
}

// Example usage
const { campaignId, emailHTML } = composeTrackedEmail(
  'client@example.com',
  'Your Project Update',
  `
    <h1>Hello John!</h1>
    <p>Your website project is ready for review.</p>
    <a href="https://skyhost.agency/preview">View Preview</a>
    <p>Best regards,<br>Skyhost Digital Team</p>
  `
)

// Save to database before sending
fetch('/api/email', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    campaign_id: campaignId,
    subject: 'Your Project Update',
    recipient_email: 'client@example.com'
  })
})

// Send email using your email service
// The tracking pixel will automatically record opens