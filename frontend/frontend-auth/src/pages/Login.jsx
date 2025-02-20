exports.login = async (req, res) => {
  const { email, password } = req.body;
  console.log("🟢 Login Attempt:", email, password);

  const user = await User.findByEmail(email);
  if (!user) {
    console.log("❌ User not found");
    return res.status(400).json({ message: "Invalid credentials" });
  }

  console.log("🟢 Stored Hashed Password:", user.password);
  
  const isMatch = await bcrypt.compare(password, user.password);
  console.log("🟢 Password Match:", isMatch);

  if (!isMatch) {
    console.log("❌ Incorrect Password");
    return res.status(400).json({ message: "Invalid credentials" });
  }

  const token = jwt.sign({ id: user.id, email: user.email }, process.env.JWT_SECRET, { expiresIn: "1h" });
  console.log("✅ Login Successful, Token Generated");
  
  res.json({ token });
};

export default Login;
