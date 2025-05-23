const jwt = require("jsonwebtoken"); // Middleware function to validate JWT tokens
const ACCESS_TOKEN_SECRET = process.env.ACCESS_TOKEN_SECRET;
function validateToken(req, res, next) {
  const token = req.headers.authorization;
  if (!token) {
    return res.status(401).json({ message: "Unauthorized/No token provided" });
  }
  const splitToken = token.split(" ")[1];
  jwt.verify(splitToken, ACCESS_TOKEN_SECRET, (err, decoded) => {
    if (err) {
      return res.status(403).json({ message: "Token expired or invalid/Failed to authenticate token" });
    }
    // If the token is valid, save the decoded information for later use
    req.user = decoded;
    next();
  });
}

function requireRoles(roles) {
  return (req, res, next) => {
    const userRole = req.user.role; // Assuming you saved the user's role in req.user
    if (roles.includes(userRole)) {
      // User has one of the required roles, so allow access
      next();
    } else {
      // User does not have any of the required roles, so send a forbidden response
      res.status(403).json({ message: "Permission denied" });
    }
  };
}

module.exports = { validateToken, requireRoles };
