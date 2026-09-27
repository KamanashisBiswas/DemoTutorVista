const { body, param } = require("express-validator");
const { handleValidation } = require("../middleware/validation");

// Create FAQ validation rules
const validateCreateFAQ = [
  body("question")
    .notEmpty()
    .withMessage("Question is required")
    .trim()
    .isLength({ max: 500 })
    .withMessage("Question cannot exceed 500 characters"),

  body("answer")
    .notEmpty()
    .withMessage("Answer is required")
    .trim()
    .isLength({ max: 2000 })
    .withMessage("Answer cannot exceed 2000 characters"),

  body("isActive")
    .optional()
    .isBoolean()
    .withMessage("isActive must be a boolean value"),

  handleValidation,
];

// Update FAQ validation rules
const validateUpdateFAQ = [
  body("question")
    .optional()
    .trim()
    .isLength({ max: 500 })
    .withMessage("Question cannot exceed 500 characters"),

  body("answer")
    .optional()
    .trim()
    .isLength({ max: 2000 })
    .withMessage("Answer cannot exceed 2000 characters"),

  body("isActive")
    .optional()
    .isBoolean()
    .withMessage("isActive must be a boolean value"),

  handleValidation,
];

// FAQ ID validation
const validateFAQId = [
  param("id").isMongoId().withMessage("Invalid FAQ ID format"),

  handleValidation,
];

module.exports = {
  validateCreateFAQ,
  validateUpdateFAQ,
  validateFAQId,
};
