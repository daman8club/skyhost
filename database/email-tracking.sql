-- Email tracking tables

CREATE TABLE IF NOT EXISTS email_campaigns (
    id INT AUTO_INCREMENT PRIMARY KEY,
    campaign_id VARCHAR(255) UNIQUE NOT NULL,
    subject VARCHAR(500) NOT NULL,
    recipient_email VARCHAR(255) NOT NULL,
    sender_email VARCHAR(255) DEFAULT 'mail@skyhost.agency',
    sent_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    status ENUM('sent', 'delivered', 'opened', 'clicked') DEFAULT 'sent',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS email_opens (
    id INT AUTO_INCREMENT PRIMARY KEY,
    campaign_id VARCHAR(255) NOT NULL,
    opened_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    ip_address VARCHAR(45),
    user_agent TEXT,
    FOREIGN KEY (campaign_id) REFERENCES email_campaigns(campaign_id)
);

CREATE TABLE IF NOT EXISTS email_clicks (
    id INT AUTO_INCREMENT PRIMARY KEY,
    campaign_id VARCHAR(255) NOT NULL,
    clicked_url VARCHAR(1000) NOT NULL,
    clicked_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    ip_address VARCHAR(45),
    user_agent TEXT,
    FOREIGN KEY (campaign_id) REFERENCES email_campaigns(campaign_id)
);