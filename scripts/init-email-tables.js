const mysql = require('mysql2/promise')

async function initEmailTables() {
  try {
    const connection = await mysql.createConnection({
      host: process.env.DB_HOST || 'localhost',
      port: parseInt(process.env.DB_PORT || '3306'),
      user: process.env.DB_USER || 'root',
      password: process.env.DB_PASSWORD || '',
      database: process.env.DB_NAME || 'agency'
    })

    console.log('Creating email tracking tables...')

    await connection.execute(`
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

    await connection.execute(`
      CREATE TABLE IF NOT EXISTS email_opens (
        id INT AUTO_INCREMENT PRIMARY KEY,
        campaign_id VARCHAR(255) NOT NULL,
        opened_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        ip_address VARCHAR(45),
        user_agent TEXT,
        INDEX idx_campaign_id (campaign_id)
      )
    `)

    await connection.execute(`
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

    console.log('✅ Email tracking tables created successfully!')
    await connection.end()
  } catch (error) {
    console.error('❌ Error creating tables:', error)
  }
}

initEmailTables()