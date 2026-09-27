const { body, param, query } = require("express-validator");
const { handleValidation } = require("../middleware/validation");

// Send message validation
const validateSendMessage = [
  body("name")
    .trim()
    .isLength({ min: 2, max: 50 })
    .withMessage("Name must be between 2 and 50 characters")
    .matches(/^[\u0980-\u09FFa-zA-Z\s.'-]+$/)
    .withMessage(
      "Name can only contain Bengali/English letters, spaces, dots, apostrophes, and hyphens"
    ),

  body("phoneNumber")
    .trim()
    .matches(/^(\+88)?01[3-9]\d{8}$/)
    .withMessage("Please provide a valid Bangladeshi phone number"),

  body("message")
    .trim()
    .isLength({ min: 10, max: 500 })
    .withMessage("Message must be between 10 and 500 characters"),

  body("agreeTerms").custom((value) => {
    const boolValue = value === "true" || value === true;
    if (!boolValue) {
      throw new Error("You must agree to terms and conditions");
    }
    return true;
  }),

  handleValidation,
];

// Message ID validation
const validateMessageId = [
  param("id").isMongoId().withMessage("Invalid message ID format"),
  handleValidation,
];

// Query filters validation
const validateMessageFilters = [
  query("page")
    .optional()
    .isInt({ min: 1 })
    .withMessage("Page must be a positive integer"),

  query("limit")
    .optional()
    .isInt({ min: 1, max: 100 })
    .withMessage("Limit must be between 1 and 100"),

  query("phoneNumber")
    .optional()
    .trim()
    .isLength({ max: 20 })
    .withMessage("Phone number filter too long"),

  query("name")
    .optional()
    .trim()
    .isLength({ max: 50 })
    .withMessage("Name filter too long"),

  query("sortBy")
    .optional()
    .isIn(["createdAt", "updatedAt", "name", "phoneNumber"])
    .withMessage("Invalid sortBy value"),

  query("sortOrder")
    .optional()
    .isIn(["asc", "desc"])
    .withMessage("SortOrder must be asc or desc"),

  handleValidation,
];

module.exports = {
  validateSendMessage,
  validateMessageId,
  validateMessageFilters,
};
