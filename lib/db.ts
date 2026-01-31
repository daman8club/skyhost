import mysql from 'mysql2/promise'

let db: mysql.Pool | null = null

try {
  const isTiDBCloud = process.env.DB_HOST?.includes('tidbcloud.com')
  
  const dbConfig: any = {
    host: process.env.DB_HOST || 'localhost',
    port: parseInt(process.env.DB_PORT || '3306'),
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || '',
    database: process.env.DB_NAME || 'agency',
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
  }
  
  // TiDB Cloud requires SSL/TLS connections
  if (isTiDBCloud) {
    dbConfig.ssl = {
      rejectUnauthorized: true
    }
  }
  
  console.log(`Connecting to database: ${dbConfig.host}:${dbConfig.port}/${dbConfig.database}${isTiDBCloud ? ' (SSL enabled)' : ''}`)
  db = mysql.createPool(dbConfig)
} catch (error) {
  console.error('Database connection failed:', error)
  db = null
}

export { db }

