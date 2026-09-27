const express = require("express");
const router = express.Router();

// Import controllers
const {
  sendMessage,
  getAllMessages,
  getMessageById,
  deleteMessage,
  getMessageStats,
} = require("../controllers/messageController");

// Import middleware
const { authenticate, authorize } = require("../middleware/auth");

// Import validations
const {
  validateSendMessage,
  validateMessageId,
  validateMessageFilters,
} = require("../validations/messageValidation");

// ==================
// PUBLIC ROUTES
// ==================

// @route   POST /api/message
// @desc    Send message from contact form
// @access  Public
router.post("/", validateSendMessage, sendMessage);

// ==================
// ADMIN ROUTES
// ==================

// @route   GET /api/message/stats
// @desc    Get message statistics
// @access  Private/Admin
router.get("/stats", authenticate, authorize("admin"), getMessageStats);

// @route   GET /api/message
// @desc    Get all messages with filters
// @access  Private/Admin
router.get(
  "/",
  authenticate,
  authorize("admin"),
  validateMessageFilters,
  getAllMessages
);

// @route   GET /api/message/:id
// @desc    Get message by ID
// @access  Private/Admin
router.get(
  "/:id",
  authenticate,
  authorize("admin"),
  validateMessageId,
  getMessageById
);

// @route   DELETE /api/message/:id
// @desc    Delete message
// @access  Private/Admin
router.delete(
  "/:id",
  authenticate,
  authorize("admin"),
  validateMessageId,
  deleteMessage
);

module.exports = router;
