require("dotenv").config();
const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const passport = require("passport");
const session = require("express-session");
require("./config/passport"); // Google OAuth config
const authRoutes = require("./routes/auth");
const protectedRoutes = require("./routes/protected");

const app = express();

// Middleware
app.use(express.json()); // Parse JSON requests
app.use(cors({ origin: "http://localhost:3000", credentials: true })); // Allow frontend requests
app.use(cookieParser()); // Handle cookies

// Session for Google OAuth
app.use(
  session({
    secret: process.env.SESSION_SECRET || "supersecretkey",
    resave: false,
    saveUninitialized: true,
  })
);

// Initialize Passport.js for Google OAuth
app.use(passport.initialize());
app.use(passport.session());

// Routes
app.use("/api/auth", authRoutes); // Register, Login, JWT Auth
app.use("/api", protectedRoutes); // Protected routes (dashboard)

// Home route (optional)
app.get("/", (req, res) => {
  res.send("Welcome to the Authentication System!");
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`✅ Server running on port ${PORT}`));
