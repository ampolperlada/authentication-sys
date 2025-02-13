const jwt = require("jsonwebtoken");
const User = require("../models/user");

exports.register = async (req, res) => {
  const { name, email, password } = req.body;
  const existingUser = await User.findByEmail(email);
  if (existingUser) return res.status(400).json({ message: "User already exists" });

  const newUser = await User.createUser(name, email, password);
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
