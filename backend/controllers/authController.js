//Logic for Register, Login, Google OAuth
const jwt = require("jsonwebtoken");
const User = require("../models/user");
const bcrypt = require("bcryptjs"); // ✅ Add this line



exports.register = async (req, res) => {
  const { name, email, password } = req.body;

  // ✅ Check if user already exists
  const existingUser = await User.findByEmail(email);
  if (existingUser) {
    return res.status(400).json({ message: "User already exists" });
  }

  // ✅ Hash the password before saving
  const hashedPassword = await bcrypt.hash(password, 10);

  // ✅ Save user with hashed password
  const newUser = await User.createUser(name, email, hashedPassword);

  res.status(201).json({ message: "User registered successfully" });
};

exports.login = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findByEmail(email);
  if (!user) return res.status(400).json({ message: "Invalid credentials" });

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) return res.status(400).json({ message: "Invalid credentials" });

  const token = jwt.sign({ id: user.id, email: user.email }, process.env.JWT_SECRET, { expiresIn: "1h" });
  res.json({ token });
};

//✅ Now, users can register & log in using JWT authentication

/* Explanation:

const { name, email, password } = req.body; → Extracts the values from the Postman request body.
await User.findByEmail(email); → Checks if the user exists in the database.
await User.createUser(name, email, password); → Creates a new user in the database.
bcrypt.compare(password, user.password); → Compares the entered password with the hashed one.
jwt.sign({ id: user.id, email: user.email }, process.env.JWT_SECRET, { expiresIn: "1h" }); → Generates a token for authentication.

*/
