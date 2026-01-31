const mysql = require('mysql2/promise')

async function initDatabase() {
  try {
    const connection = await mysql.createConnection({
      host: 'localhost',
      user: 'root',
      password: '',
      database: 'agency'
    })

    await connection.query(`CREATE DATABASE IF NOT EXISTS agency`)
    
    // Reconnect to the specific database
    await connection.end()
    const dbConnection = await mysql.createConnection({
      host: 'localhost',
      user: 'root',
      password: '',
      database: 'agency'
    })

    await dbConnection.execute(`
      CREATE TABLE IF NOT EXISTS leads (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        email VARCHAR(255) NOT NULL,
        phone VARCHAR(20) NULL,
        message TEXT NULL,
        source VARCHAR(100) DEFAULT 'website',
        status ENUM('new', 'contacted', 'qualified', 'converted', 'closed') DEFAULT 'new',
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
      )
    `)

    await dbConnection.execute(`
      CREATE TABLE IF NOT EXISTS settings (
        id INT AUTO_INCREMENT PRIMARY KEY,
        setting_key VARCHAR(255) UNIQUE NOT NULL,
        setting_value TEXT,
        setting_type ENUM('text', 'number', 'boolean', 'json') DEFAULT 'text',
        description TEXT,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
      )
    `)

    await dbConnection.execute(`
      CREATE TABLE IF NOT EXISTS analytics (
        id INT AUTO_INCREMENT PRIMARY KEY,
        total_visitors INT DEFAULT 0,
        active_chats INT DEFAULT 0,
        conversion_rate DECIMAL(5,2) DEFAULT 0.00,
        projects_completed INT DEFAULT 0,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
      )
    `)

    // Add page_views column if it doesn't exist
    await dbConnection.execute(`
      ALTER TABLE analytics ADD COLUMN IF NOT EXISTS page_views INT DEFAULT 0
    `).catch(() => {})

    await dbConnection.execute(`
      INSERT INTO settings (setting_key, setting_value, setting_type, description) VALUES 
      ('site_name', 'Skyhost Digital', 'text', 'Website name'),
      ('site_email', 'mail@skyhost.agency', 'text', 'Contact email'),
      ('tawk_property_id', '676b8b7e49e2fd8dfef6b8b8', 'text', 'Tawk.to Property ID'),
      ('tawk_widget_id', '1ig4rnhqj', 'text', 'Tawk.to Widget ID')
      ON DUPLICATE KEY UPDATE setting_key=setting_key
    `)

    await dbConnection.execute(`
      INSERT INTO analytics (total_visitors, active_chats, conversion_rate, projects_completed) VALUES 
      (1247, 3, 3.20, 47)
      ON DUPLICATE KEY UPDATE total_visitors=1247, active_chats=3, conversion_rate=3.20, projects_completed=47
    `)

    console.log('Database initialized successfully!')
    await dbConnection.end()
  } catch (error) {
    console.error('Database initialization failed:', error)
  }
}

initDatabase()