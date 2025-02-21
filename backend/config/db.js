const { Pool } = require("pg");
require("dotenv").config(); // ✅ Load environment variables

const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT || 5432, // Default PostgreSQL port
});

pool.connect()
  .then(() => console.log("✅ PostgreSQL Connected"))
  .catch((err) => console.error("❌ PostgreSQL Connection Error:", err));

module.exports = { pool }; // ✅ Ensure pool is exported


/*

name → Stores the user's name.
email → Stores the user's email (must be unique).
password → Stores the user's hashed password (for JWT auth).
google_id → Stores Google OAuth ID (for Google login).
role → Assigns user roles (e.g., "admin" or "user").

*/