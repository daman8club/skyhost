-- Database: agency

-- Create leads table
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
);

-- Create admin users table
CREATE TABLE IF NOT EXISTS admin_users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(100) UNIQUE NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    role ENUM('admin', 'manager', 'agent') DEFAULT 'agent',
    is_active BOOLEAN DEFAULT TRUE,
    last_login TIMESTAMP NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Create page_content table for dynamic content management
CREATE TABLE IF NOT EXISTS page_content (
    id INT AUTO_INCREMENT PRIMARY KEY,
    page_url VARCHAR(255) UNIQUE NOT NULL,
    title VARCHAR(500) NOT NULL,
    content LONGTEXT,
    meta_description TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Create settings table for Tawk.io and other configs
CREATE TABLE IF NOT EXISTS settings (
    id INT AUTO_INCREMENT PRIMARY KEY,
    setting_key VARCHAR(255) UNIQUE NOT NULL,
    setting_value TEXT,
    setting_type ENUM('text', 'number', 'boolean', 'json') DEFAULT 'text',
    description TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Insert default admin user (password: admin123)
INSERT INTO admin_users (username, email, password, role) VALUES 
('admin', 'admin@skyhostdigital.com', 'admin123', 'admin')
ON DUPLICATE KEY UPDATE username=username;

-- Insert default settings including Tawk.io
INSERT INTO settings (setting_key, setting_value, setting_type, description) VALUES 
('site_name', 'Skyhost Digital', 'text', 'Website name'),
('site_email', 'mail@skyhost.agency', 'text', 'Contact email'),
('tawk_property_id', '676b8b7e49e2fd8dfef6b8b8', 'text', 'Tawk.to Property ID'),
('tawk_widget_id', '1ig4rnhqj', 'text', 'Tawk.to Widget ID')
ON DUPLICATE KEY UPDATE setting_key=setting_key;

-- Insert default page content
INSERT INTO page_content (page_url, title, content, meta_description) VALUES 
('/', 'Skyhost Digital - Futuristic Web Agency NYC', '<div>Homepage content</div>', 'Websites that load before you blink. Premium web development for New York businesses.'),
('/contact', 'Contact Us - Skyhost Digital', '<div>Contact page content</div>', 'Get in touch with Skyhost Digital for your web development needs.')
ON DUPLICATE KEY UPDATE page_url=page_url;