const FAQ = require("../models/FAQ");
const asyncHandler = require("../utils/asyncHandler");

// @desc    Get all FAQs
// @route   GET /api/faq
// @access  Public
const getAllFAQs = asyncHandler(async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10;
  const skip = (page - 1) * limit;

  const faqs = await FAQ.find({ isActive: true })
    .skip(skip)
    .limit(limit)
    .sort({ createdAt: -1 })
    .populate("createdBy", "name email")
    .populate("updatedBy", "name email");

  const total = await FAQ.countDocuments({ isActive: true });

  res.status(200).json({
    success: true,
    data: {
      faqs,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit),
      },
    },
  });
});

// @desc    Get single FAQ by ID
// @route   GET /api/faq/:id
// @access  Public
const getFAQById = asyncHandler(async (req, res) => {
  const faq = await FAQ.findById(req.params.id)
    .populate("createdBy", "name email")
    .populate("updatedBy", "name email");

  if (!faq) {
    return res.status(404).json({
      success: false,
      message: "FAQ not found",
    });
  }

  res.status(200).json({
    success: true,
    data: { faq },
  });
});

// @desc    Create new FAQ
// @route   POST /api/faq
// @access  Private/Admin
const createFAQ = asyncHandler(async (req, res) => {
  const { question, answer, isActive } = req.body;

  const faq = await FAQ.create({
    question,
    answer,
    isActive,
    createdBy: req.user.id,
  });

  // Populate the creator info
  await faq.populate("createdBy", "name email");

  res.status(201).json({
    success: true,
    message: "FAQ created successfully",
    data: { faq },
  });
});

// @desc    Update FAQ
// @route   PUT /api/faq/:id
// @access  Private/Admin
const updateFAQ = asyncHandler(async (req, res) => {
  const { question, answer, isActive } = req.body;

  const faq = await FAQ.findByIdAndUpdate(
    req.params.id,
    {
      ...(question && { question }),
      ...(answer && { answer }),
      ...(isActive !== undefined && { isActive }),
      updatedBy: req.user.id,
    },
    {
      new: true,
      runValidators: true,
    }
  )
    .populate("createdBy", "name email")
    .populate("updatedBy", "name email");

  if (!faq) {
    return res.status(404).json({
      success: false,
      message: "FAQ not found",
    });
  }

  res.status(200).json({
    success: true,
    message: "FAQ updated successfully",
    data: { faq },
  });
});

// @desc    Delete FAQ
// @route   DELETE /api/faq/:id
// @access  Private/Admin
const deleteFAQ = asyncHandler(async (req, res) => {
  const faq = await FAQ.findByIdAndDelete(req.params.id);

  if (!faq) {
    return res.status(404).json({
      success: false,
      message: "FAQ not found",
    });
  }

  res.status(200).json({
    success: true,
    message: "FAQ deleted successfully",
  });
});

// @desc    Get all FAQs for admin (including inactive)
// @route   GET /api/faq/admin/all
// @access  Private/Admin
const getAllFAQsAdmin = asyncHandler(async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10;
  const skip = (page - 1) * limit;

  const faqs = await FAQ.find()
    .skip(skip)
    .limit(limit)
    .sort({ createdAt: -1 })
    .populate("createdBy", "name email")
    .populate("updatedBy", "name email");

  const total = await FAQ.countDocuments();

  res.status(200).json({
    success: true,
    data: {
      faqs,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit),
      },
    },
  });
});

module.exports = {
  getAllFAQs,
  getFAQById,
  createFAQ,
  updateFAQ,
  deleteFAQ,
  getAllFAQsAdmin,
};
