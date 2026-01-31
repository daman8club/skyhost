const mysql = require('mysql2/promise');
const path = require('path');
const fs = require('fs');

// Load environment variables from .env.local
const envPath = path.join(__dirname, '..', '.env.local');
if (fs.existsSync(envPath)) {
  const envContent = fs.readFileSync(envPath, 'utf-8');
  envContent.split('\n').forEach(line => {
    if (line && !line.startsWith('#')) {
      const [key, ...valueParts] = line.split('=');
      const value = valueParts.join('=').trim();
      if (key && value) {
        process.env[key.trim()] = value;
      }
    }
  });
}

async function initializeTiDBDatabase() {
  try {
    console.log('🔍 Environment variables loaded:');
    console.log(`   Host: ${process.env.DB_HOST}`);
    console.log(`   Port: ${process.env.DB_PORT}`);
    console.log(`   User: ${process.env.DB_USER}`);
    console.log(`   Database: ${process.env.DB_NAME}`);

    if (!process.env.DB_HOST || !process.env.DB_USER || !process.env.DB_PASSWORD) {
      throw new Error('Missing required environment variables: DB_HOST, DB_USER, or DB_PASSWORD');
    }

    // Create connection without specifying a database first
    const connection = await mysql.createConnection({
      host: process.env.DB_HOST,
      port: parseInt(process.env.DB_PORT || '4000'),
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      ssl: {
        rejectUnauthorized: true
      }
    });

    console.log('✅ Connected to TiDB Cloud');

    // Create leads table
    await connection.execute(`
      CREATE TABLE IF NOT EXISTS ${process.env.DB_NAME}.leads (
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
    `);
    console.log('✓ Created leads table');

    // Create admin_users table
    await connection.execute(`
      CREATE TABLE IF NOT EXISTS ${process.env.DB_NAME}.admin_users (
        id INT AUTO_INCREMENT PRIMARY KEY,
        username VARCHAR(100) UNIQUE NOT NULL,
        email VARCHAR(255) UNIQUE NOT NULL,
        password VARCHAR(255) NOT NULL,
        role ENUM('admin', 'manager', 'agent') DEFAULT 'agent',
        is_active BOOLEAN DEFAULT TRUE,
        last_login TIMESTAMP NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
      )
    `);
    console.log('✓ Created admin_users table');

    // Create settings table
    await connection.execute(`
      CREATE TABLE IF NOT EXISTS ${process.env.DB_NAME}.settings (
        id INT AUTO_INCREMENT PRIMARY KEY,
        setting_key VARCHAR(255) UNIQUE NOT NULL,
        setting_value TEXT,
        setting_type ENUM('text', 'number', 'boolean', 'json') DEFAULT 'text',
        description TEXT,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
      )
    `);
    console.log('✓ Created settings table');

    // Create page_content table
    await connection.execute(`
      CREATE TABLE IF NOT EXISTS ${process.env.DB_NAME}.page_content (
        id INT AUTO_INCREMENT PRIMARY KEY,
        page_url VARCHAR(255) UNIQUE NOT NULL,
        title VARCHAR(500) NOT NULL,
        content LONGTEXT,
        meta_description TEXT,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
      )
    `);
    console.log('✓ Created page_content table');

    // Insert default admin user
    await connection.execute(`
      INSERT INTO ${process.env.DB_NAME}.admin_users (username, email, password, role) 
      VALUES ('admin', 'admin@skyhostdigital.com', 'admin123', 'admin')
      ON DUPLICATE KEY UPDATE username=username
    `);
    console.log('✓ Inserted default admin user');

    // Insert default settings
    await connection.execute(`
      INSERT INTO ${process.env.DB_NAME}.settings (setting_key, setting_value, setting_type, description) 
      VALUES 
        ('site_name', 'Skyhost Digital', 'text', 'Website name'),
        ('site_email', 'mail@skyhost.agency', 'text', 'Contact email'),
        ('tawk_property_id', '676b8b7e49e2fd8dfef6b8b8', 'text', 'Tawk.to Property ID'),
        ('tawk_widget_id', '1ig4rnhqj', 'text', 'Tawk.to Widget ID')
      ON DUPLICATE KEY UPDATE setting_key=setting_key
    `);
    console.log('✓ Inserted default settings');

    // Insert default page content
    await connection.execute(`
      INSERT INTO ${process.env.DB_NAME}.page_content (page_url, title, content, meta_description) 
      VALUES 
        ('/', 'Skyhost Digital - Futuristic Web Agency NYC', '<div>Homepage content</div>', 'Websites that load before you blink. Premium web development for New York businesses.'),
        ('/contact', 'Contact Us - Skyhost Digital', '<div>Contact page content</div>', 'Get in touch with Skyhost Digital for your web development needs.')
      ON DUPLICATE KEY UPDATE page_url=page_url
    `);
    console.log('✓ Inserted default page content');

    await connection.end();
    console.log('\n✅ TiDB Cloud database initialized successfully!');
    process.exit(0);
  } catch (error) {
    console.error('❌ Error initializing database:', error.message);
    if (error.code) console.error('   Error Code:', error.code);
    if (error.sqlMessage) console.error('   SQL Message:', error.sqlMessage);
    process.exit(1);
  }
}

initializeTiDBDatabase();
