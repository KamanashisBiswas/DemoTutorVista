const { body, param } = require("express-validator");
const { handleValidation } = require("../middleware/validation");

// Update profile validation rules
const validateUpdateProfile = [
  body("name")
    .optional()
    .trim()
    .isLength({ min: 2, max: 50 })
    .withMessage("Name must be between 2 and 50 characters")
    .matches(/^[a-zA-Z\s]+$/)
    .withMessage("Name can only contain letters and spaces"),

  body("email")
    .optional()
    .isEmail()
    .normalizeEmail()
    .withMessage("Please provide a valid email address"),

  body("avatar").optional().isURL().withMessage("Avatar must be a valid URL"),

  handleValidation,
];

// Change password validation rules
const validateChangePassword = [
  body("currentPassword")
    .notEmpty()
    .withMessage("Current password is required"),

  body("newPassword")
    .isLength({ min: 6 })
    .withMessage("New password must be at least 6 characters long")
    .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/)
    .withMessage(
      "New password must contain at least one uppercase letter, one lowercase letter, and one number"
    ),

  body("confirmPassword").custom((value, { req }) => {
    if (value !== req.body.newPassword) {
      throw new Error("Password confirmation does not match new password");
    }
    return true;
  }),

  handleValidation,
];

// User ID validation for admin routes
const validateUserId = [
  param("id").isMongoId().withMessage("Invalid user ID format"),

  handleValidation,
];

// Update user role validation (admin only)
const validateUpdateRole = [
  param("id").isMongoId().withMessage("Invalid user ID format"),

  body("role")
    .isIn(["user", "admin"])
    .withMessage("Role must be either user or admin"),

  handleValidation,
];

module.exports = {
  validateUpdateProfile,
  validateChangePassword,
  validateUserId,
  validateUpdateRole,
};
