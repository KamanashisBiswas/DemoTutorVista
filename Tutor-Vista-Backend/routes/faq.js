const express = require("express");
const router = express.Router();

// Import controllers
const {
  getAllFAQs,
  getFAQById,
  createFAQ,
  updateFAQ,
  deleteFAQ,
  getAllFAQsAdmin,
  // toggleFAQStatus, // Uncomment if you have this controller
  // bulkUpdateOrder, // Uncomment if you have this controller
} = require("../controllers/faqController");

// Import middleware
const { authenticate, authorize } = require("../middleware/auth");

// Import validations
const {
  validateCreateFAQ,
  validateUpdateFAQ,
  validateFAQId,
  // validateObjectId, // Uncomment if you have this validation
} = require("../validations/faqValidation");

// @route   GET /api/faq
// @desc    Get all active FAQs
// @access  Public
router.get("/", getAllFAQs);

// @route   GET /api/faq/admin/all
// @desc    Get all FAQs (including inactive) for admin
// @access  Private/Admin
router.get("/admin/all", authenticate, authorize("admin"), getAllFAQsAdmin);

// @route   POST /api/faq
// @desc    Create new FAQ
// @access  Private/Admin
router.post(
  "/",
  authenticate,
  authorize("admin"),
  validateCreateFAQ,
  createFAQ
);

// @route   GET /api/faq/:id
// @desc    Get single FAQ by ID
// @access  Public
router.get("/:id", validateFAQId, getFAQById);

// @route   PUT /api/faq/:id
// @desc    Update FAQ
// @access  Private/Admin
router.put(
  "/:id",
  authenticate,
  authorize("admin"),
  validateFAQId,
  validateUpdateFAQ,
  updateFAQ
);

// @route   DELETE /api/faq/:id
// @desc    Delete FAQ
// @access  Private/Admin
router.delete(
  "/:id",
  authenticate,
  authorize("admin"),
  validateFAQId,
  deleteFAQ
);

// If you have toggleFAQStatus or bulkUpdateOrder, add them here before export
// router.patch("/:id/toggle", authenticate, authorize("admin"), validateFAQId, toggleFAQStatus);
// router.patch("/bulk-order", authenticate, authorize("admin"), bulkUpdateOrder);

module.exports = router;
