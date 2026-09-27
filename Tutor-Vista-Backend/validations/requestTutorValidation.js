// const { body } = require("express-validator");

// const requestTutorValidation = [
//   // Basic Info
//   body("studentName")
//     .trim()
//     .notEmpty()
//     .withMessage("Student name is required.")
//     .isLength({ min: 2, max: 65 })
//     .withMessage("Student name must be between 2 and 65 characters."),

//   body("phoneNo")
//     .trim()
//     .notEmpty()
//     .withMessage("Phone number is required.")
//     .matches(/^(\+88)?01[3-9]\d{8}$/)
//     .withMessage("Please provide a valid Bangladeshi phone number."),

//   body("gender")
//     .isIn(["Male", "Female", "Any"])
//     .withMessage("Please select a valid gender."),

//   // --- Educational Info (Student 1 - Required) ---
//   body("institution")
//     .trim()
//     .notEmpty()
//     .withMessage("Institution is required.")
//     .isLength({ max: 100 })
//     .withMessage("Institution name cannot exceed 100 characters."),

//   body("medium")
//     .notEmpty()
//     .withMessage("Medium is required.")
//     .isIn([
//       "Bangla Medium",
//       "English Medium",
//       "English Version (National Curriculum)",
//       "Arabic Medium",
//       "University Level",
//       "Admission Preparation",
//     ])
//     .withMessage("Please select a valid medium."),

//   body("curriculum").custom((value, { req }) => {
//     if (req.body.medium === "English Medium" && (!value || value.trim() === "")) {
//       throw new Error("Curriculum is required for English Medium.");
//     }
//     return true;
//   }),

//   body("grade")
//     .trim()
//     .notEmpty()
//     .withMessage("Grade/Class is required.")
//     .isLength({ max: 50 })
//     .withMessage("Grade cannot exceed 50 characters."),

//   body("subjects")
//     .isArray({ min: 1 })
//     .withMessage("At least one subject is required.")
//     .isArray({ max: 10 })
//     .withMessage("Maximum 10 subjects are allowed."),
//   body("subjects.*")
//     .trim()
//     .notEmpty()
//     .withMessage("Subject cannot be empty.")
//     .isLength({ max: 50 })
//     .withMessage("Subject cannot exceed 50 characters."),

//   // --- multipleStudent Flag ---
//   body("multipleStudent")
//     .isBoolean()
//     .withMessage("multipleStudent flag must be a boolean."),

//   // --- Educational Info (Student 2 - Conditionally Required) ---
//   body("institution2")
//     .if(body("multipleStudent").equals("true"))
//     .trim()
//     .notEmpty()
//     .withMessage("Institution for student 2 is required."),

//   body("medium2")
//     .if(body("multipleStudent").equals("true"))
//     .notEmpty()
//     .withMessage("Medium for student 2 is required.")
//     .isIn([
//       "Bangla Medium",
//       "English Medium",
//       "English Version (National Curriculum)",
//       "Arabic Medium",
//       "University Level",
//       "Admission Preparation",
//     ])
//     .withMessage("Please select a valid medium for student 2."),

//   body("curriculum2").custom((value, { req }) => {
//     if (req.body.multipleStudent === true && req.body.medium2 === "English Medium") {
//       if (!value || value.trim() === "") {
//         throw new Error("Curriculum is required for student 2 with English Medium.");
//       }
//     }
//     return true;
//   }),

//   body("grade2")
//     .if(body("multipleStudent").equals("true"))
//     .trim()
//     .notEmpty()
//     .withMessage("Grade/Class for student 2 is required."),

//   body("subjects2")
//     .if(body("multipleStudent").equals("true"))
//     .isArray({ min: 1 })
//     .withMessage("At least one subject is required for student 2."),

//   // Time & Offer
//   body("salary")
//     .trim()
//     .notEmpty()
//     .withMessage("Please enter the expected salary.")
//     .isLength({ max: 100 })
//     .withMessage("Salary cannot exceed 100 characters."),

//   body("days")
//     .trim()
//     .notEmpty()
//     .withMessage("Please specify the number of days.")
//     .isLength({ max: 50 })
//     .withMessage("Days cannot exceed 50 characters."),

//   body("time")
//     .trim()
//     .notEmpty()
//     .withMessage("Please specify the preferred time.")
//     .isLength({ max: 100 })
//     .withMessage("Time cannot exceed 100 characters."),

//   body("requirement")
//     .optional()
//     .trim()
//     .isLength({ max: 500 })
//     .withMessage("Requirement description cannot exceed 500 characters."),

//   // Address
//   body("division").trim().notEmpty().withMessage("Division is required."),
//   body("district").trim().notEmpty().withMessage("District is required."),
//   body("thana").trim().notEmpty().withMessage("Thana is required."),
//   body("area").trim().notEmpty().withMessage("Area is required."),
//   body("address")
//     .trim()
//     .notEmpty()
//     .withMessage("Detailed address is required.")
//     .isLength({ min: 10, max: 200 })
//     .withMessage("Address must be between 10 and 200 characters."),

//   // Agreement
//   body("agreeTerms")
//     .isBoolean()
//     .withMessage("Agreement status must be boolean.")
//     .custom((value) => {
//       if (value !== true) {
//         throw new Error("You must agree to terms and conditions.");
//       }
//       return true;
//     }),
// ];

// module.exports = requestTutorValidation;

const { body } = require("express-validator");

const ALLOWED_DIVISIONS = ["dhaka", "chattogram", "khulna", "sylhet"];
const DIVISION_ALIASES = {
  chattagram: "chattogram",
  chittagong: "chattogram",
};

const normalizeDivision = (value) => {
  if (value === undefined || value === null) return "";
  const normalized = String(value)
    .trim()
    .replace(/^['\"]+|['\"]+$/g, "")
    .toLowerCase();
  return DIVISION_ALIASES[normalized] || normalized;
};

const requestTutorValidation = [
  // Basic Info
  body("studentName")
    .trim()
    .notEmpty()
    .withMessage("Student name is required.")
    .isLength({ min: 2, max: 65 })
    .withMessage("Student name must be between 2 and 65 characters."),

  body("phoneNo")
    .trim()
    .notEmpty()
    .withMessage("Phone number is required.")
    .matches(/^(\+88)?01[3-9]\d{8}$/)
    .withMessage("Please provide a valid Bangladeshi phone number."),

  body("gender")
    .isIn(["Male", "Female", "Any"])
    .withMessage("Please select a valid gender."),

  // --- Educational Info (Student 1) ---
  body("institution")
    .trim()
    .notEmpty()
    .withMessage("Institution is required.")
    .isLength({ max: 100 })
    .withMessage("Institution name cannot exceed 100 characters."),

  body("medium")
    .notEmpty()
    .withMessage("Medium is required.")
    .isIn([
      "Bangla Medium",
      "English Medium",
      "English Version (National Curriculum)",
      "Arabic Medium",
      "University Level",
      "Admission Preparation",
      "Skill Development",
      "Job Purpose",
    ])
    .withMessage("Please select a valid medium."),

  body("curriculum").custom((value, { req }) => {
    if (
      req.body.medium === "English Medium" &&
      (!value || value.trim() === "")
    ) {
      throw new Error("Curriculum is required for English Medium.");
    }
    return true;
  }),

  body("grade")
    .if(body("medium").not().isIn(["Skill Development", "Job Purpose"]))
    .trim()
    .notEmpty()
    .withMessage("Grade/Class is required.")
    .isLength({ max: 50 })
    .withMessage("Grade cannot exceed 50 characters."),

  // Subjects for Student 1 (Always required)
  body("subjects")
    .isArray({ min: 1 })
    .withMessage("At least one subject is required.")
    .isArray({ max: 10 })
    .withMessage("Maximum 10 subjects are allowed."),
  body("subjects.*")
    .trim()
    .notEmpty()
    .withMessage("Subject cannot be empty.")
    .isLength({ max: 50 })
    .withMessage("Subject cannot exceed 50 characters."),

  // --- multipleStudent Flag ---
  body("multipleStudent")
    .isBoolean()
    .withMessage("multipleStudent flag must be a boolean."),

  // --- Educational Info (Student 2 - Conditionally Required) ---
  body("institution2")
    .if(body("multipleStudent").equals("true"))
    .trim()
    .notEmpty()
    .withMessage("Institution for student 2 is required."),

  body("medium2")
    .if(body("multipleStudent").equals("true"))
    .notEmpty()
    .withMessage("Medium for student 2 is required.")
    .isIn([
      "Bangla Medium",
      "English Medium",
      "English Version (National Curriculum)",
      "Arabic Medium",
      "University Level",
      "Admission Preparation",
      "Skill Development",
      "Job Purpose",
    ])
    .withMessage("Please select a valid medium for student 2."),

  body("curriculum2").custom((value, { req }) => {
    if (
      req.body.multipleStudent === true &&
      req.body.medium2 === "English Medium"
    ) {
      if (!value || value.trim() === "") {
        throw new Error(
          "Curriculum is required for student 2 with English Medium.",
        );
      }
    }
    return true;
  }),

  body("grade2")
    .if(body("multipleStudent").equals("true"))
    .if(body("medium2").not().isIn(["Skill Development", "Job Purpose"]))
    .trim()
    .notEmpty()
    .withMessage("Grade/Class for student 2 is required."),

  // Subjects for Student 2 (Conditional)
  body("subjects2")
    .if(body("multipleStudent").equals("true"))
    .isArray({ min: 1 })
    .withMessage("At least one subject is required for student 2.")
    .isArray({ max: 10 })
    .withMessage("Maximum 10 subjects are allowed for student 2."),
  body("subjects2.*")
    .if(body("multipleStudent").equals("true"))
    .trim()
    .notEmpty()
    .withMessage("Subject name for student 2 cannot be empty."),

  // Time & Offer
  body("salary")
    .trim()
    .notEmpty()
    .withMessage("Please enter the expected salary."),

  body("days")
    .trim()
    .notEmpty()
    .withMessage("Please specify the number of days."),

  body("time")
    .trim()
    .notEmpty()
    .withMessage("Please specify the preferred time."),

  // Address
  body("division")
    .trim()
    .notEmpty()
    .withMessage("Division is required.")
    .custom((value) => ALLOWED_DIVISIONS.includes(normalizeDivision(value)))
    .withMessage("Please select your division."),
  body("district").trim().notEmpty().withMessage("District is required."),
  body("thana").trim().notEmpty().withMessage("Thana is required."),
  body("area").trim().notEmpty().withMessage("Area is required."),
  body("address")
    .trim()
    .notEmpty()
    .withMessage("Detailed address is required.")
    .isLength({ min: 10, max: 200 })
    .withMessage("Address must be between 10 and 200 characters."),

  // Agreement
  body("agreeTerms")
    .equals("true")
    .withMessage("You must agree to terms and conditions."),
];

module.exports = requestTutorValidation;
