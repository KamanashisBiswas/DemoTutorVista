const Message = require("../models/Message");
const asyncHandler = require("../utils/asyncHandler");

// @desc    Send message from contact form
// @route   POST /api/message
// @access  Public
const sendMessage = asyncHandler(async (req, res) => {
  const { name, phoneNumber, message, agreeTerms } = req.body;

  // Check for recent messages (spam prevention)
  const recentMessage = await Message.checkRecentMessage(phoneNumber, 5);
  if (recentMessage) {
    return res.status(429).json({
      success: false,
      message: "Please wait at least 5 minutes before sending another message.",
    });
  }

  try {
    const newMessage = await Message.create({
      name,
      phoneNumber,
      message,
      agreeTerms: agreeTerms === "true" || agreeTerms === true,
    });

    res.status(201).json({
      success: true,
      message: "Message submitted successfully!",
      data: {
        id: newMessage._id,
        name: newMessage.name,
        submittedAt: newMessage.submittedAt,
      },
    });
  } catch (error) {
    // Handle validation errors
    if (error.name === "ValidationError") {
      const errors = Object.values(error.errors).map((err) => ({
        field: err.path,
        message: err.message,
        value: err.value,
      }));

      return res.status(400).json({
        success: false,
        message: "Validation failed",
        errors,
      });
    }
    throw error;
  }
});

// @desc    Get all messages (Admin only)
// @route   GET /api/message
// @access  Private/Admin
const getAllMessages = asyncHandler(async (req, res) => {
  const {
    phoneNumber,
    name,
    sortBy = "createdAt",
    sortOrder = "desc",
  } = req.query;

  // Build filter
  const filter = {};
  if (phoneNumber) filter.phoneNumber = new RegExp(phoneNumber, "i");
  if (name) filter.name = new RegExp(name, "i");

  // Build sort
  const sort = { [sortBy]: sortOrder === "asc" ? 1 : -1 };

  // No limit, get all messages
  const messages = await Message.find(filter).select("-__v").sort(sort);

  const total = await Message.countDocuments(filter);

  res.status(200).json({
    success: true,
    data: {
      messages,
      total,
    },
  });
});

// @desc    Get message by ID (Admin only)
// @route   GET /api/message/:id
// @access  Private/Admin
const getMessageById = asyncHandler(async (req, res) => {
  const message = await Message.findById(req.params.id);

  if (!message) {
    return res.status(404).json({
      success: false,
      message: "Message not found",
    });
  }

  res.status(200).json({
    success: true,
    data: { message },
  });
});

// @desc    Delete message (Admin only)
// @route   DELETE /api/message/:id
// @access  Private/Admin
const deleteMessage = asyncHandler(async (req, res) => {
  const message = await Message.findByIdAndDelete(req.params.id);

  if (!message) {
    return res.status(404).json({
      success: false,
      message: "Message not found",
    });
  }

  res.status(200).json({
    success: true,
    message: "Message deleted successfully",
  });
});

// @desc    Get message statistics (Admin only)
// @route   GET /api/message/stats
// @access  Private/Admin
const getMessageStats = asyncHandler(async (req, res) => {
  const [totalMessages, todayMessages, recentMessages] = await Promise.all([
    Message.countDocuments(),
    Message.countDocuments({
      createdAt: {
        $gte: new Date(new Date().setHours(0, 0, 0, 0)),
      },
    }),
    Message.find()
      .select("name phoneNumber message createdAt")
      .sort({ createdAt: -1 })
      .limit(5),
  ]);

  res.status(200).json({
    success: true,
    data: {
      totalMessages,
      todayMessages,
      recentMessages,
    },
  });
});

module.exports = {
  sendMessage,
  getAllMessages,
  getMessageById,
  deleteMessage,
  getMessageStats,
};
