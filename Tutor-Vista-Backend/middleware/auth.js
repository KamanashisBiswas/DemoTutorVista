const JWTUtil = require("../utils/jwt");
const User = require("../models/User");

// Authenticate user with JWT token
const authenticate = async (req, res, next) => {
  try {
    const authHeader = req.header("Authorization");
    const token = JWTUtil.extractBearerToken(authHeader);

    if (!token) {
      return res.status(401).json({
        success: false,
        message: "Access denied. No token provided.",
      });
    }

    // Verify token
    const decoded = JWTUtil.verifyToken(token);

    // Get user from database
    const user = await User.findById(decoded.id);
    if (!user) {
      return res.status(401).json({
        success: false,
        message: "Token is invalid. User not found.",
      });
    }

    // Add user info to request object
    req.user = {
      id: user._id,
      email: user.email,
      role: user.role,
      name: user.name,
    };

    next();
  } catch (error) {
    return res.status(401).json({
      success: false,
      message: "Token is invalid or expired.",
      error: error.message,
    });
  }
};

// Authorize specific roles
const authorize = (...roles) => {
  return (req, res, next) => {
    if (!req.user) {
      return res.status(401).json({
        success: false,
        message: "Access denied. Authentication required.",
      });
    }

    if (!roles.includes(req.user.role)) {
      return res.status(403).json({
        success: false,
        message: "Access denied. Insufficient permissions.",
      });
    }

    next();
  };
};

// Optional authentication (doesn't fail if no token)
const optionalAuth = async (req, res, next) => {
  try {
    const authHeader = req.header("Authorization");
    const token = JWTUtil.extractBearerToken(authHeader);

    if (token) {
      const decoded = JWTUtil.verifyToken(token);
      const user = await User.findById(decoded.id);

      if (user) {
        req.user = {
          id: user._id,
          email: user.email,
          role: user.role,
          name: user.name,
        };
      }
    }

    next();
  } catch (error) {
    // Continue without authentication if token is invalid
    next();
  }
};

module.exports = {
  authenticate,
  authorize,
  optionalAuth,
};
