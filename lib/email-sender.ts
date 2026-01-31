import { addTrackingPixel, addClickTracking, createEmailCampaign } from '../lib/email-tracking'

// Example usage for sending tracked emails
export async function sendTrackedEmail(to: string, subject: string, htmlContent: string) {
  // Create campaign
  const campaignId = await createEmailCampaign(subject, to)
  
  if (!campaignId) {
    throw new Error('Failed to create email campaign')
  }

  // Add tracking pixel and click tracking
  let trackedContent = addTrackingPixel(htmlContent, campaignId)
  trackedContent = addClickTracking(trackedContent, campaignId)

  // Your email sending logic here (using nodemailer, sendgrid, etc.)
  // Example with nodemailer:
  /*
  const nodemailer = require('nodemailer')
  
  const transporter = nodemailer.createTransporter({
    // Your SMTP config
  })

  await transporter.sendMail({
    from: 'mail@skyhost.agency',
    to: to,
    subject: subject,
    html: trackedContent
  })
  */

  return { campaignId, trackedContent }
}

// Example email template
export const emailTemplate = (clientName: string, message: string) => `
<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <title>Skyhost Digital</title>
</head>
<body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
    <div style="max-width: 600px; margin: 0 auto; padding: 20px;">
        <h1 style="color: #6366f1;">Hello ${clientName},</h1>
        <p>${message}</p>
        <p>Best regards,<br>Skyhost Digital Team</p>
        <a href="https://skyhost.agency" style="color: #6366f1;">Visit our website</a>
    </div>
</body>
</html>
`