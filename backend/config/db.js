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
