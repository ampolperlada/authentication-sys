const pool = require("../config/db");  // ✅ This connects to db.js
const bcrypt = require("bcryptjs");

const User = {
  findByEmail: async (email) => {
    const result = await pool.query("SELECT * FROM users WHERE email = $1", [email]);
    return result.rows[0];
  },

  createUser: async (name, email, password) => {
    const hashedPassword = await bcrypt.hash(password, 10);
    const result = await pool.query(
      "INSERT INTO users (name, email, password) VALUES ($1, $2, $3) RETURNING *",
      [name, email, hashedPassword]
    );
    return result.rows[0];
  }
};

module.exports = User;
