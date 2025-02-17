//✅ This allows only authenticated users to access /api/dashboard.

const express = require("express");
const { protect } = require("../middleware/authMiddleware");
const router = express.Router();

// ✅ Protected Route (Make sure the path is correct)
router.get("/protected", protect, (req, res) => {
  res.json({
    message: "Welcome to the protected dashboard!",
    user: req.user,
  });
});

module.exports = router;
