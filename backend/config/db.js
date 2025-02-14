const { Pool } = require("pg");
require("dotenv").config();

const pool = new Pool({
  user: process.env.DB_USER,      // ✅ PostgreSQL username
  host: process.env.DB_HOST,      // ✅ Usually 'localhost'
  database: process.env.DB_NAME,  // ✅ Database name
  password: process.env.DB_PASS,  // ✅ PostgreSQL password (as a string)
  port: Number(process.env.DB_PORT) || 5432  // ✅ Convert port to number
});

module.exports = pool;
