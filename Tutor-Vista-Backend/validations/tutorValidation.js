const { body, param } = require("express-validator");
const { handleValidation } = require("../middleware/validation");

// Apply as tutor validation (for multipart/form-data)
const validateTutorApplication = [
  // Personal Information
  body("name")
    .trim()
    .isLength({ min: 2, max: 100 })
    .withMessage("Please enter your name (2-100 characters).")
    .matches(/^[a-zA-Z\s.'-]+$/)
    .withMessage(
      "Name can only contain letters, spaces, dots, apostrophes, and hyphens.",
    ),

  body("phone")
    .trim()
    .matches(/^01[3-9]\d{8}$/)
    .withMessage("Enter a valid Bangladeshi phone number (e.g. 01XXXXXXXXX)."),

  body("email")
    .isEmail()
    .normalizeEmail()
    .withMessage("Enter a valid email address."),

  body("gender")
    .isIn(["Male", "Female", "Any"])
    .withMessage("Please select your gender."),

  // Document Type Validation
  body("documentType")
    .isIn(["nid", "birth_certificate"])
    .withMessage("Select a valid document type: NID or Birth Certificate."),

  // Educational Information - Custom validation
  body("educationSections").custom((value) => {
    try {
      const sections = typeof value === "string" ? JSON.parse(value) : value;

      if (!Array.isArray(sections) || sections.length === 0) {
        throw new Error("At least one education section is required");
      }

      sections.forEach((section, index) => {
        // Examination type validation for all sections
        if (
          !section.examination ||
          ![
            "SSC/O Level/Dakhil",
            "HSC/A Levels/Alim",
            "Honours",
            "Masters",
          ].includes(section.examination)
        ) {
          throw new Error(`Invalid examination type`);
        }

        // ONLY validate SSC/HSC sections (first two sections)
        if (
          (section.examination === "SSC/O Level/Dakhil" ||
            section.examination === "HSC/A Levels/Alim") &&
          index < 2
        ) {
          // Institution is required for SSC/HSC (first two sections)
          if (!section.institution || section.institution.trim() === "") {
            throw new Error(`Institution name is required`);
          }

          // Medium validation for required sections
          if (
            !section.medium ||
            ![
              "Bangla Medium",
              "English Medium",
              "English Version (National Curriculum)",
              "Arabic Medium",
            ].includes(section.medium)
          ) {
            throw new Error(
              `Medium is required. Must be one of: Bangla Medium, English Medium, English Version (National Curriculum), Arabic Medium`,
            );
          }

          // Curriculum validation ONLY for English Medium in SSC/HSC sections
          if (section.medium === "English Medium") {
            if (
              !section.curriculum ||
              !["Cambridge", "Edexcel", "IB Curriculum"].includes(
                section.curriculum,
              )
            ) {
              throw new Error(
                `Curriculum is required for English Medium. Must be one of: Cambridge, Edexcel, IB Curriculum`,
              );
            }
          }

          // Board validation
          if (!section.board || section.board.trim() === "") {
            throw new Error(`Board is required`);
          }

          // Group/Subject validation
          if (!section.groupSubject || section.groupSubject.trim() === "") {
            throw new Error(`Group/Subject is required`);
          }

          // GPA validation (now optional, allows string/number, checks length)
          if (section.gpa && section.gpa.trim().length > 20) {
            throw new Error(`GPA/Grade cannot exceed 20 characters.`);
          }

          // Passing Year validation
          if (!section.passingYear) {
            throw new Error(`Passing year is required`);
          } else {
            const year = parseInt(section.passingYear);
            const currentYear = new Date().getFullYear();
            if (isNaN(year) || year < 2000 || year > currentYear) {
              throw new Error(
                `Invalid passing year. Must be between 2000 and ${currentYear}`,
              );
            }
          }
        }

        // For Honours/Masters sections - COMPLETELY SKIP ALL SSC/HSC FIELD VALIDATION
        if (
          (section.examination === "Honours" ||
            section.examination === "Masters") &&
          index >= 2
        ) {
          // Only validate Honours/Masters specific fields if they have content
          const hasContent =
            section.institution?.trim() ||
            section.department?.trim() ||
            section.year?.trim() ||
            section.cgpa?.trim();

          if (hasContent) {
            // CGPA validation (same as GPA: optional, allows string/number, checks length)
            if (section.cgpa && section.cgpa.trim().length > 20) {
              throw new Error(`CGPA cannot exceed 20 characters.`);
            }

            // Validate year if provided
            if (section.year && section.year.trim() !== "") {
              const validYears =
                section.examination === "Honours"
                  ? ["1st", "2nd", "3rd", "4th", "5th", "Passed"]
                  : ["1st", "Passed"];
              if (!validYears.includes(section.year)) {
                throw new Error(
                  `Invalid year. Must be one of: ${validYears.join(", ")}`,
                );
              }
            }
          }

          // COMPLETELY SKIP validation for:
          // - medium (will be empty string)
          // - curriculum (will be empty string)
          // - board (will be empty string)
          // - groupSubject (will be empty string)
          // - gpa (will be empty string)
          // - passingYear (will be empty string)
        }
      });

      return true;
    } catch (error) {
      throw new Error(
        error.message || "Please check your education information.",
      );
    }
  }),

  // Address Information
  body("division")
    .isIn(["Dhaka", "Chattogram", "Khulna", "Sylhet"])
    .withMessage("Please select your division."),

  body("district")
    .trim()
    .notEmpty()
    .withMessage("Please enter your district.")
    .isLength({ max: 100 })
    .withMessage("District name can't be more than 100 characters."),

  body("thana")
    .trim()
    .notEmpty()
    .withMessage("Please enter your thana.")
    .isLength({ max: 100 })
    .withMessage("Thana name can't be more than 100 characters."),

  body("area")
    .trim()
    .notEmpty()
    .withMessage("Please enter your area.")
    .isLength({ max: 100 })
    .withMessage("Area name can't be more than 100 characters."),

  // Suitable Upazila and Area
  body("suitableThana").custom((value) => {
    let arr = value;
    if (typeof value === "string") {
      try {
        arr = JSON.parse(value);
      } catch {
        arr = [value];
      }
    }
    if (!Array.isArray(arr) || arr.length === 0) {
      throw new Error("At least one suitable thana is required.");
    }
    arr.forEach((item, idx) => {
      if (typeof item !== "string" || item.trim() === "") {
        throw new Error(`Suitable thana at position ${idx + 1} is invalid.`);
      }
      if (item.length > 100) {
        throw new Error(
          `Suitable thana at position ${idx + 1} cannot exceed 100 characters.`,
        );
      }
    });
    return true;
  }),

  body("suitableArea").custom((value) => {
    let arr = value;
    if (typeof value === "string") {
      try {
        arr = JSON.parse(value);
      } catch {
        arr = [value];
      }
    }
    if (!Array.isArray(arr) || arr.length === 0) {
      throw new Error("At least one suitable area is required.");
    }
    arr.forEach((item, idx) => {
      if (typeof item !== "string" || item.trim() === "") {
        throw new Error(`Suitable area at position ${idx + 1} is invalid.`);
      }
      if (item.length > 100) {
        throw new Error(
          `Suitable area at position ${idx + 1} cannot exceed 100 characters.`,
        );
      }
    });
    return true;
  }),

  // Preferred Subjects - Custom validation
  body("preferredSubjects").custom((value) => {
    try {
      const parsed = typeof value === "string" ? JSON.parse(value) : value;
      if (!Array.isArray(parsed) || parsed.length === 0) {
        throw new Error("Please add at least one preferred subject.");
      }

      parsed.forEach((subject, index) => {
        if (!subject || subject.trim() === "") {
          throw new Error(`Subject ${index + 1} can't be empty.`);
        }
        if (subject.length > 50) {
          throw new Error(
            `Subject ${index + 1} can't be more than 50 characters.`,
          );
        }
      });

      return true;
    } catch (error) {
      throw new Error(error.message || "Please check your preferred subjects.");
    }
  }),

  // Special Skills - Optional validation for an array of skills
  body("specialSkills")
    .optional()
    .custom((value) => {
      try {
        if (!value) return true;
        const parsed = typeof value === "string" ? JSON.parse(value) : value;
        if (!Array.isArray(parsed)) {
          throw new Error("Special skills must be an array.");
        }
        parsed.forEach((skill, index) => {
          if (!skill.type || !skill.value) {
            throw new Error(
              `Each special skill must have a type and a value (skill #${
                index + 1
              }).`,
            );
          }
          const validTypes = [
            "Language",
            "Art",
            "IELTS",
            "SAT",
            "PT",
            "TOEFL",
            "Music Instrument",
            "Singing",
            "Dancing",
          ];
          if (!validTypes.includes(skill.type)) {
            throw new Error(
              `Invalid special skill type at skill #${index + 1}`,
            );
          }
          if (skill.value.length > 100) {
            throw new Error(
              `Special skill value cannot exceed 100 characters (skill #${
                index + 1
              }).`,
            );
          }
        });
        return true;
      } catch (error) {
        throw new Error(error.message || "Invalid special skills format");
      }
    }),

  // Terms Agreement
  body("agreeTerms").custom((value) => {
    const boolValue = value === "true" || value === true;
    if (!boolValue) {
      throw new Error("You must agree to the terms and conditions to apply.");
    }
    return true;
  }),

  // Custom validation to check for required files based on document type
  body().custom((value, { req }) => {
    const documentType = req.body.documentType;

    // Profile image is optional
    // if (!req.files || !req.files.profileImage) {
    //   throw new Error("Please upload your profile image.");
    // }

    if (!req.files || !req.files.educationDocument) {
      throw new Error("Please upload your education document.");
    }

    if (documentType === "nid") {
      if (!req.files.nidFront || !req.files.nidFront[0]) {
        throw new Error("Please upload your NID front image.");
      }
      if (!req.files.nidBack || !req.files.nidBack[0]) {
        throw new Error("Please upload your NID back image.");
      }
    } else if (documentType === "birth_certificate") {
      if (!req.files.birthCertificate || !req.files.birthCertificate[0]) {
        throw new Error("Please upload your birth certificate image.");
      }
    } else {
      throw new Error("Invalid document type selected.");
    }

    return true;
  }),

  // Experience Validation
  body("experience")
    .trim()
    .isLength({ min: 50, max: 2000 })
    .withMessage(
      "Please describe your teaching experience (50-2000 characters).",
    )
    .notEmpty()
    .withMessage("Teaching experience is required."),

  handleValidation,
];

// Edit tutor validation (for multipart/form-data) - Admin only
const validateEditTutor = [
  // Tutor ID validation
  param("id").isMongoId().withMessage("Invalid tutor ID format"),

  // Personal Information (all optional for edit)
  body("name")
    .optional()
    .trim()
    .isLength({ min: 2, max: 100 })
    .withMessage("Name must be between 2 and 100 characters")
    .matches(/^[a-zA-Z\s.'-]+$/)
    .withMessage(
      "Name can only contain letters, spaces, dots, apostrophes, and hyphens",
    ),

  body("phone")
    .optional()
    .trim()
    .matches(/^01[3-9]\d{8}$/)
    .withMessage("Please enter a valid Bangladeshi phone number (01XXXXXXXXX)"),

  body("email")
    .optional()
    .isEmail()
    .normalizeEmail()
    .withMessage("Please provide a valid email address"),

  body("gender")
    .optional()
    .isIn(["Male", "Female", "Any"])
    .withMessage("Gender must be Male, Female, or Any"),

  // Document Type Validation (optional for edit)
  body("documentType")
    .optional()
    .isIn(["nid", "birth_certificate"])
    .withMessage("Document type must be either 'nid' or 'birth_certificate'"),

  // Educational Information - Custom validation (optional for edit)
  body("educationSections")
    .optional()
    .custom((value) => {
      try {
        const parsed = typeof value === "string" ? JSON.parse(value) : value;
        if (!Array.isArray(parsed) || parsed.length === 0) {
          throw new Error("At least one education section is required");
        }

        // Similar validation as create but optional
        parsed.forEach((section, index) => {
          if (!section.institution || section.institution.trim() === "") {
            throw new Error(`Institution name is required`);
          }
        });

        return true;
      } catch (error) {
        throw new Error(error.message || "Invalid education sections format");
      }
    }),

  // Address Information (optional for edit)
  body("division")
    .optional()
    .isIn(["Dhaka", "Chattogram", "Khulna", "Sylhet"])
    .withMessage("Please select a valid division"),

  body("district")
    .optional()
    .trim()
    .notEmpty()
    .withMessage("District cannot be empty if provided")
    .isLength({ max: 100 })
    .withMessage("District name cannot exceed 100 characters"),

  body("thana")
    .optional()
    .trim()
    .notEmpty()
    .withMessage("Thana cannot be empty if provided")
    .isLength({ max: 100 })
    .withMessage("Thana name cannot exceed 100 characters"),

  body("area")
    .optional()
    .trim()
    .notEmpty()
    .withMessage("Area cannot be empty if provided")
    .isLength({ max: 100 })
    .withMessage("Area name cannot exceed 100 characters"),

  // Suitable Upazila and Area (optional for edit)
  body("suitableThana")
    .optional()
    .custom((value) => {
      let arr = value;
      if (typeof value === "string") {
        try {
          arr = JSON.parse(value);
        } catch {
          arr = [value];
        }
      }
      if (!Array.isArray(arr) || arr.length === 0) {
        throw new Error("At least one suitable thana is required.");
      }
      arr.forEach((item, idx) => {
        if (typeof item !== "string" || item.trim() === "") {
          throw new Error(`Suitable thana at position ${idx + 1} is invalid.`);
        }
        if (item.length > 100) {
          throw new Error(
            `Suitable thana at position ${
              idx + 1
            } cannot exceed 100 characters.`,
          );
        }
      });
      return true;
    }),

  body("suitableArea")
    .optional()
    .trim()
    .notEmpty()
    .withMessage("Suitable area cannot be empty if provided")
    .isLength({ max: 100 })
    .withMessage("Suitable area cannot exceed 100 characters"),

  // Preferred Subjects - Custom validation (optional for edit)
  body("preferredSubjects")
    .optional()
    .custom((value) => {
      try {
        const parsed = typeof value === "string" ? JSON.parse(value) : value;
        if (!Array.isArray(parsed) || parsed.length === 0) {
          throw new Error("At least one preferred subject is required");
        }

        parsed.forEach((subject, index) => {
          if (!subject || subject.trim() === "") {
            throw new Error(`Subject ${index + 1} cannot be empty`);
          }
          if (subject.length > 50) {
            throw new Error(
              `Subject ${index + 1} can't be more than 50 characters.`,
            );
          }
        });

        return true;
      } catch (error) {
        throw new Error(error.message || "Invalid preferred subjects format");
      }
    }),

  // Experience Validation (optional for edit)
  body("experience")
    .optional()
    .trim()
    .isLength({ min: 50, max: 2000 })
    .withMessage(
      "Experience description must be between 50 and 2000 characters",
    ),

  // Approval Status Validation (optional for edit)
  body("isHired")
    .optional()
    .isBoolean()
    .withMessage("Approval status must be a boolean value (true or false)"),

  handleValidation,
];

// Update tutor status validation
const validateUpdateTutorStatus = [
  param("id").isMongoId().withMessage("Invalid tutor ID format"),
  body("isHired")
    .exists()
    .withMessage("isHired field is required")
    .isBoolean()
    .withMessage("isHired must be a boolean value (true or false)"),
  handleValidation,
];

// Tutor ID validation
const validateTutorId = [
  param("id").isMongoId().withMessage("Invalid tutor ID format"),
  handleValidation,
];

module.exports = {
  validateTutorApplication,
  validateEditTutor,
  validateUpdateTutorStatus,
  validateTutorId,
};
