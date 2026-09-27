const { body, param } = require("express-validator");

const validateAppliedJob = [
  body("requestTutorId")
    .isMongoId()
    .withMessage("Valid requestTutorId is required"),
  body("tutorId").isMongoId().withMessage("Valid tutorId is required"),
  body("expectedSalary")
    .isNumeric()
    .withMessage("Expected salary must be a number"),
];

const validateAppliedJobId = [
  param("id").isMongoId().withMessage("Invalid applied job id"),
];

module.exports = {
  validateAppliedJob,
  validateAppliedJobId,
};
