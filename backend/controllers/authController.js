const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const { pool } = require("../config/db"); // ✅ Ensure you have a PostgreSQL connection

exports.register = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // ✅ Check if the user already exists
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

exports.login = async (req, res) => {
  try {
    console.log("🟢 Received Login Request:", req.body);
    const { email, password } = req.body;

    if (!email || !password) {
      console.log("❌ Missing email or password");
      return res.status(400).json({ message: "Email and password are required" });
    }

    // ✅ Find user by email in PostgreSQL
    const userQuery = "SELECT * FROM users WHERE email = $1";
    const userResult = await pool.query(userQuery, [email]);
    const user = userResult.rows[0];

    if (!user) {
      console.log("❌ User not found:", email);
      return res.status(400).json({ message: "Invalid credentials" });
    }

    // ✅ Compare entered password with stored hashed password
    const isMatch = await bcrypt.compare(password, user.password);
    console.log("🟢 Password Match:", isMatch);

    if (!isMatch) {
      console.log("❌ Incorrect Password");
      return res.status(400).json({ message: "Invalid credentials" });
    }

    // ✅ Generate JWT token
    const token = jwt.sign({ id: user.id, email: user.email }, process.env.JWT_SECRET, { expiresIn: "1h" });
    console.log("✅ Login Successful, Token Generated");

    res.json({ token });
  } catch (error) {
    console.error("❌ Error in Login:", error);
    res.status(500).json({ message: "Server Error" });
  }
};
