const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const { pool } = require("../config/db"); // ✅ Ensure correct import

exports.register = async (req, res) => {
  try {
    console.log("🟢 Register Request Received:", req.body);
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // ✅ Check if user already exists
    const existingUserQuery = "SELECT * FROM users WHERE email = $1";
    const existingUserResult = await pool.query(existingUserQuery, [email]);

    if (existingUserResult.rows.length > 0) {
      return res.status(400).json({ message: "User already exists" });
    }

    // ✅ Hash the password before saving
    const hashedPassword = await bcrypt.hash(password, 10);

    // ✅ Insert the new user into PostgreSQL
    const insertUserQuery = "INSERT INTO users (name, email, password) VALUES ($1, $2, $3) RETURNING id";
    const newUserResult = await pool.query(insertUserQuery, [name, email, hashedPassword]);

    res.status(201).json({ message: "User registered successfully", userId: newUserResult.rows[0].id });
  } catch (error) {
    console.error("❌ Error in Register:", error);
    res.status(500).json({ message: "Server Error" });
  }
};
