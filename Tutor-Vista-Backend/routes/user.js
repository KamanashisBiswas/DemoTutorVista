const express = require("express");
const router = express.Router();

// Import controllers
const {
  updateProfile,
  changePassword,
  deleteAccount,
  getAllUsers,
  getUserById,
  updateUserRole,
  deleteUser,
} = require("../controllers/userController");

// Import middleware
const { authenticate, authorize } = require("../middleware/auth");

// Import validations
const {
  validateUpdateProfile,
  validateChangePassword,
  validateUserId,
  validateUpdateRole,
} = require("../validations/userValidation");

// @route   PUT /api/user/profile
// @desc    Update user profile
// @access  Private
router.put("/profile", authenticate, validateUpdateProfile, updateProfile);

// @route   PUT /api/user/change-password
// @desc    Change password
// @access  Private
router.put(
  "/change-password",
  authenticate,
  validateChangePassword,
  changePassword
);

// @route   DELETE /api/user/account
// @desc    Delete user account
// @access  Private
router.delete("/account", authenticate, deleteAccount);

// Admin routes
// @route   GET /api/user/all
// @desc    Get all users
// @access  Private/Admin
router.get("/all", authenticate, authorize("admin"), getAllUsers);

// @route   GET /api/user/:id
// @desc    Get user by ID
// @access  Private/Admin
router.get(
  "/:id",
  authenticate,
  authorize("admin"),
  validateUserId,
  getUserById
);

// @route   PUT /api/user/:id/role
// @desc    Update user role
// @access  Private/Admin
router.put(
  "/:id/role",
  authenticate,
  authorize("admin"),
  validateUpdateRole,
  updateUserRole
);

// @route   DELETE /api/user/:id
// @desc    Delete user
// @access  Private/Admin
router.delete(
  "/:id",
  authenticate,
  authorize("admin"),
  validateUserId,
  deleteUser
);

module.exports = router;
