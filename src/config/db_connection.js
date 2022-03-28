const db = {
  connectionString: process.env.DATABASE_URL,
  ssl: true
}

module.exports = db;