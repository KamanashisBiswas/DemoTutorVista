const express = require("express");
const router = express.Router();

// Import controllers
const {
  register,
  login,
  refreshToken,
  logout,
  getMe,
} = require("../controllers/authController");

// Import middleware
const { authenticate } = require("../middleware/auth");

// Import validations
const {
  validateRegister,
  validateLogin,
  validateRefreshToken,
} = require("../validations/authValidation");

// @route   POST /api/auth/register
// @desc    Register new user
// @access  Public
router.post("/register", validateRegister, register);

// @route   POST /api/auth/login
// @desc    Login user
// @access  Public
router.post("/login", validateLogin, login);

// @route   POST /api/auth/refresh
// @desc    Refresh access token
// @access  Public
router.post("/refresh", validateRefreshToken, refreshToken);

// @route   POST /api/auth/logout
// @desc    Logout user
// @access  Private
router.post("/logout", authenticate, logout);

// @route   GET /api/auth/me
// @desc    Get current user profile
// @access  Private
router.get("/me", authenticate, getMe);

module.exports = router;
