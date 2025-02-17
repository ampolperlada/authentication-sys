const { Pool } = require("pg");
require("dotenv").config();

const pool = new Pool({
  user: process.env.DB_USER,      // PostgreSQL username
  host: process.env.DB_HOST,      // Usually 'localhost'
  database: process.env.DB_NAME,  // Database name
  password: process.env.DB_PASS,  // PostgreSQL password
  port: 5432                      // Default PostgreSQL port
});

module.exports = pool;


/*

name → Stores the user's name.
email → Stores the user's email (must be unique).
password → Stores the user's hashed password (for JWT auth).
google_id → Stores Google OAuth ID (for Google login).
role → Assigns user roles (e.g., "admin" or "user").

*/