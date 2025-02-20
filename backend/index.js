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

// ✅ Middleware (Make sure this is BEFORE your routes)
app.use(express.json()); // ✅ Fix for req.body undefined issue
app.use(cors({ origin: "http://127.0.0.1:5173", credentials: true })); // Allow frontend requests
app.use(cookieParser()); // Handle cookies
app.use("/api", protectedRoutes); // ✅ This ensures route is `/api/protected`

const cors = require('cors');
app.use(cors({
  methods: 'GET,POST',
  allowedHeaders: 'Content-Type,Authorization'
}));

// ✅ Session for Google OAuth
app.use(
  session({
    secret: process.env.SESSION_SECRET || "supersecretkey",
    resave: false,
    saveUninitialized: true,
  })
);

// ✅ Initialize Passport.js for Google OAuth
app.use(passport.initialize());
app.use(passport.session());

// ✅ Routes (Ensure they are defined only ONCE)
app.use("/api/auth", authRoutes); // Register, Login, JWT Auth
app.use("/api", protectedRoutes); // Protected routes (dashboard)

// ✅ Home route (optional)
app.get("/", (req, res) => {
  res.send("Welcome to the Authentication System!");
});

// ✅ Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`✅ Server running on port ${PORT}`));
