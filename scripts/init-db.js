const mysql = require('mysql2/promise')

async function initDatabase() {
  try {
    const connection = await mysql.createConnection({
      host: 'localhost',
      user: 'root',
      password: '',
    })

    // Create database if it doesn't exist
    await connection.execute(`CREATE DATABASE IF NOT EXISTS agency`)
    await connection.execute(`USE agency`))

    // Create tables
    await connection.execute(`
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

    await connection.execute(`
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

    // Insert default settings
    await connection.execute(`
      INSERT INTO settings (setting_key, setting_value, setting_type, description) VALUES 
      ('site_name', 'Skyhost Digital', 'text', 'Website name'),
      ('site_email', 'mail@skyhost.agency', 'text', 'Contact email'),
      ('tawk_property_id', '676b8b7e49e2fd8dfef6b8b8', 'text', 'Tawk.to Property ID'),
      ('tawk_widget_id', '1ig4rnhqj', 'text', 'Tawk.to Widget ID')
      ON DUPLICATE KEY UPDATE setting_key=setting_key
    `)

    console.log('Database initialized successfully!')
    await connection.end()
  } catch (error) {
    console.error('Database initialization failed:', error)
  }
}

initDatabase()