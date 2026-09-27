const mongoose = require("mongoose");

const educationSchema = new mongoose.Schema(
  {
    institution: {
      type: String,
      required: function () {
        // Only require institution for SSC/HSC sections (first two sections)
        // We'll handle this in validation instead since we can't access index here
        return false; // Remove required validation from model
      },
      trim: true,
    },
    examination: {
      type: String,
      required: [true, "Name of examination is required"],
      enum: ["SSC/O Level/Dakhil", "HSC/A Levels/Alim", "Honours", "Masters"],
    },
    // For SSC/HSC sections
    medium: {
      type: String,
      required: false, // Remove required validation from model, handle in validation
      // Remove enum validation from model since we're setting empty strings for Honours/Masters
      validate: {
        validator: function (v) {
          // Allow empty strings
          if (!v || v === "") return true;
          // Only validate enum for non-empty values
          return [
            "Bangla Medium",
            "English Medium",
            "English Version (National Curriculum)",
            "Arabic Medium",
          ].includes(v);
        },
        message: "Please select a valid medium",
      },
    },
    // Curriculum for English Medium only
    curriculum: {
      type: String,
      required: false, // Remove required validation from model
      validate: {
        validator: function (v) {
          // Allow empty strings
          if (!v || v === "") return true;
          // Only validate enum for non-empty values
          return ["Cambridge", "Edexcel", "IB Curriculum"].includes(v);
        },
        message: "Please select a valid curriculum",
      },
    },
    board: {
      type: String,
      required: false, // Remove required validation from model, handle in validation
      trim: true,
      maxlength: [100, "Board name cannot exceed 100 characters"],
    },
    groupSubject: {
      type: String,
      required: false, // Remove required validation from model, handle in validation
      trim: true,
      maxlength: [100, "Group/Subject cannot exceed 100 characters"],
    },
    gpa: {
      type: String,
      required: false, // Stays optional
      trim: true,
      maxlength: [20, "GPA/Grade cannot exceed 20 characters"], // Add a length limit
      // Remove the restrictive regex validation
    },
    passingYear: {
      type: String,
      required: false, // Remove required validation from model, handle in validation
      validate: {
        validator: function (v) {
          if (!v || v === "") return true; // Allow empty for optional fields
          const year = parseInt(v);
          const currentYear = new Date().getFullYear();
          return year >= 2000 && year <= currentYear;
        },
        message: "Invalid passing year",
      },
    },
    // For Honours/Masters sections
    department: {
      type: String,
      required: false, // Optional for Honours/Masters
      trim: true,
      maxlength: [100, "Department name cannot exceed 100 characters"],
    },
    year: {
      type: String,
      required: false, // Optional for Honours/Masters
      enum: {
        values: ["1st", "2nd", "3rd", "4th", "5th", "Passed", ""],
        message: "Please select a valid year",
      },
    },
    cgpa: {
      type: String,
      required: false,
      trim: true,
      maxlength: [20, "CGPA cannot exceed 20 characters"],
      // Remove the regex validator to allow any text
    },
  },
  { _id: false }
);

const tutorSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
      trim: true,
      maxlength: [100, "Name cannot exceed 100 characters"],
    },
    phone: {
      type: String,
      required: [true, "Phone number is required"],
      trim: true,
      validate: {
        validator: function (v) {
          return /^01[3-9]\d{8}$/.test(v);
        },
        message: "Please enter a valid Bangladeshi phone number",
      },
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      // unique: true, // <-- REMOVE THIS LINE
      lowercase: true,
      trim: true,
      validate: {
        validator: function (v) {
          return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
        },
        message: "Please enter a valid email address",
      },
    },
    gender: {
      type: String,
      required: [true, "Gender is required"],
      enum: ["Male", "Female", "Any"],
    },
    division: {
      type: String,
      required: [true, "Division is required"],
      trim: true,
    },
    district: {
      type: String,
      required: [true, "District is required"],
      trim: true,
    },
    thana: {
      type: String,
      required: [true, "Thana is required"],
      trim: true,
    },
    area: {
      type: String,
      required: [true, "Area is required"],
      trim: true,
    },
    suitableThana: {
      type: [String],
      required: [true, "Suitable thana is required"],
      validate: {
        validator: function (v) {
          return (
            Array.isArray(v) &&
            v.length > 0 &&
            v.every((item) => typeof item === "string" && item.trim() !== "")
          );
        },
        message:
          "At least one suitable thana is required and must be non-empty strings",
      },
    },
    suitableArea: {
      type: [String],
      required: [true, "Suitable area is required"],
      validate: {
        validator: function (v) {
          return (
            Array.isArray(v) &&
            v.length > 0 &&
            v.every((item) => typeof item === "string" && item.trim() !== "")
          );
        },
        message:
          "At least one suitable area is required and must be non-empty strings",
      },
    },
    educationSections: {
      type: [educationSchema],
      required: [true, "At least one education section is required"],
      validate: {
        validator: function (v) {
          return Array.isArray(v) && v.length > 0 && v.length <= 4;
        },
        message: "You can add between 1 to 4 education sections",
      },
    },
    preferredSubjects: {
      type: [String],
      required: [true, "Preferred subjects are required"],
      validate: {
        validator: function (v) {
          return Array.isArray(v) && v.length > 0;
        },
        message: "At least one preferred subject is required",
      },
    },
    // Profile Image - Optional
    profileImage: {
      url: { type: String, required: false },
      publicId: { type: String, required: false },
      originalName: { type: String },
      size: { type: Number },
    },
    educationDocument: {
      url: { type: String, required: [true, "Education document is required"] },
      publicId: { type: String, required: true },
      originalName: { type: String },
      size: { type: Number },
    },
    experience: {
      type: String,
      required: [true, "Teaching experience is required"],
      trim: true,
      minlength: [50, "Experience description must be at least 50 characters"],
      maxlength: [2000, "Experience description cannot exceed 2000 characters"],
    },
    // Special Skills - Array of objects
    specialSkills: [
      {
        type: {
          type: String,
          enum: [
            "Language",
            "Art",
            "IELTS",
            "SAT",
            "PT",
            "TOEFL",
            "Music Instrument",
            "Singing",
            "Dancing",
          ],
          required: true,
        },
        value: {
          type: String,
          required: true,
          trim: true,
          maxlength: [100, "Special skill value cannot exceed 100 characters"],
        },
      },
    ],
    // Document Type and Files
    documentType: {
      type: String,
      required: [true, "Document type is required"],
      enum: ["nid", "birth_certificate"],
      default: "nid",
    },
    // NID Images (conditional required)
    nidFrontImage: {
      url: {
        type: String,
        required: function () {
          return this.documentType === "nid";
        },
      },
      publicId: {
        type: String,
        required: function () {
          return this.documentType === "nid";
        },
      },
      originalName: { type: String },
      size: { type: Number },
    },
    nidBackImage: {
      url: {
        type: String,
        required: function () {
          return this.documentType === "nid";
        },
      },
      publicId: {
        type: String,
        required: function () {
          return this.documentType === "nid";
        },
      },
      originalName: { type: String },
      size: { type: Number },
    },
    // Birth Certificate Image (conditional required)
    birthCertificateImage: {
      url: {
        type: String,
        required: function () {
          return this.documentType === "birth_certificate";
        },
      },
      publicId: {
        type: String,
        required: function () {
          return this.documentType === "birth_certificate";
        },
      },
      originalName: { type: String },
      size: { type: Number },
    },
    isHired: {
      type: Boolean,
      default: false,
    },
    agreeTerms: {
      type: Boolean,
      required: [true, "You must agree to terms and conditions"],
      validate: {
        validator: function (v) {
          return v === true;
        },
        message: "You must agree to terms and conditions",
      },
    },
    submittedAt: {
      type: Date,
      default: Date.now,
    },
    score: {
      type: String, // or Number if you want, but String is more flexible for empty string
      default: "",
    },
  },
  {
    timestamps: true,
  }
);

// ADD THIS INDEX MANUALLY
tutorSchema.index({ email: 1 }, { unique: true });
tutorSchema.index({ division: 1, district: 1 });

module.exports = mongoose.model("Tutor", tutorSchema);
