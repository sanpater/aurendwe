const { Pool } = require('pg');

// Setup the pool, handling missing environment variables gracefully
let pool;

if (!process.env.DATABASE_URL) {
  console.warn("WARNING: DATABASE_URL environment variable is not set. Database connections will fail.");
} else {
  pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: {
      rejectUnauthorized: false
    }
  });
}

module.exports = {
  query: async (text, params) => {
    if (!pool) {
      throw new Error("Database not configured. Please set DATABASE_URL environment variable in Vercel.");
    }
    return pool.query(text, params);
  },
};