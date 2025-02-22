const express = require("express");
const { register, login } = require("../controllers/authController");
const { protect } = require("../middleware/authMiddleware"); // ✅ Ensure correct import

const router = express.Router();

// ✅ Register User
router.post("/register", register);

// ✅ Login User
router.post("/login", login);

// ✅ Protected Dashboard Route (Requires JWT)
router.get("/dashboard", protect, (req, res) => {
  res.json({
    message: "Welcome to the protected dashboard!",
    user: req.user, // ✅ User data from token
  });
});

module.exports = router;
