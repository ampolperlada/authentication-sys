//Protects routes & handles user roles
const jwt = require("jsonwebtoken");

exports.protect = (req, res, next) => {
  // ✅ Get token from headers
  const token = req.headers.authorization;

  // ❌ If no token is found, return Unauthorized
  if (!token) return res.status(401).json({ message: "Unauthorized" });

  try {
    // ✅ Verify token (Remove 'Bearer ' from token string)
    const decoded = jwt.verify(token.split(" ")[1], process.env.JWT_SECRET);

    // ✅ Attach decoded user to request object
    req.user = decoded;
    next();
  } catch (err) {
    return res.status(401).json({ message: "Invalid token" });
  }
};

//✅ This middleware protects API routes. Users must be logged in to access protected data.

