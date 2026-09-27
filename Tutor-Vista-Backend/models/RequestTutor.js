// const mongoose = require("mongoose");

// const requestTutorSchema = new mongoose.Schema(
//   {
//     // Basic Info
//     studentName: {
//       type: String,
//       required: [true, "Student name is required"],
//       trim: true,
//       minlength: [2, "Student name must be at least 2 characters long"],
//       maxlength: [65, "Student name cannot exceed 65 characters"],
//     },
//     phoneNo: {
//       type: String,
//       required: [true, "Phone number is required"],
//       trim: true,
//       match: [
//         /^(\+88)?01[3-9]\d{8}$/,
//         "Please provide a valid Bangladeshi phone number",
//       ],
//     },
//     gender: {
//       type: String,
//       required: [true, "Gender is required"],
//       enum: {
//         values: ["Male", "Female", "Any"],
//         message: "Gender must be either Male, Female or Any",
//       },
//     },

//     // Educational Info
//     institution: {
//       type: String,
//       required: [true, "Institution is required"],
//       trim: true,
//       maxlength: [100, "Institution name cannot exceed 100 characters"],
//     },
//     medium: {
//       type: String,
//       required: [true, "Medium is required"],
//       enum: {
//         values: [
//           "Bangla Medium",
//           "English Medium",
//           "English Version (National Curriculum)",
//           "Arabic Medium",
//           "University Level",
//           "Admission Preparation",
//           "Skill Development",
//           "Job Purpose",
//         ],
//         message: "Please select a valid medium",
//       },
//     },
//     curriculum: {
//       type: String,
//       required: function () {
//         return this.medium === "English Medium";
//       },
//       enum: {
//         values: [
//           "",
//           "Cambridge Curriculum",
//           "Edexcel Curriculum",
//           "Oxford Curriculum",
//           "IB Curriculum",
//         ],
//         message: "Please select a valid curriculum for English Medium",
//       },
//     },
//     grade: {
//       type: String,
//       required: [true, "Grade/Class is required"],
//       trim: true,
//     },
//     subjects: {
//       type: [String],
//       required: [true, "At least one subject is required"],
//       validate: {
//         validator: function (v) {
//           return Array.isArray(v) && v.length > 0;
//         },
//         message: "Please add at least one subject",
//       },
//     },

//     // Time & Offer
//     salary: {
//       type: String,
//       required: [true, "Salary is required"],
//       trim: true,
//     },
//     days: {
//       type: String,
//       required: [true, "Days are required"],
//       trim: true,
//     },
//     time: {
//       type: String,
//       required: [true, "Time is required"],
//       trim: true,
//     },
//     requirement: {
//       type: String,
//       trim: true,
//       maxlength: [500, "Requirement description cannot exceed 500 characters"],
//     },

//     // Address
//     division: {
//       type: String,
//       required: [true, "Division is required"],
//       trim: true,
//     },
//     district: {
//       type: String,
//       required: [true, "District is required"],
//       trim: true,
//     },
//     thana: {
//       type: String,
//       required: [true, "Thana is required"],
//       trim: true,
//     },
//     area: {
//       type: String,
//       required: [true, "Area is required"],
//       trim: true,
//     },
//     address: {
//       type: String,
//       required: [true, "Detailed address is required"],
//       trim: true,
//       maxlength: [200, "Address cannot exceed 200 characters"],
//     },
//     adminDivision: {
//       type: String,
//       default: "",
//       trim: true,
//       maxlength: [100, "Admin Division cannot exceed 100 characters"],
//     },
//     adminArea: {
//       type: String,
//       default: "",
//       trim: true,
//       maxlength: [100, "Admin Area cannot exceed 100 characters"],
//     },

//     // Agreement and Status
//     agreeTerms: {
//       type: Boolean,
//       required: [true, "You must agree to terms and conditions"],
//       validate: {
//         validator: function (v) {
//           return v === true;
//         },
//         message: "You must agree to terms and conditions",
//       },
//     },
//     status: {
//       type: String,
//       enum: ["pending", "approved", "rejected", "assigned"],
//       default: "pending",
//     },
//     isAssignTutor: {
//       type: Boolean,
//       default: false,
//     },
//     assignedTutor: {
//       type: mongoose.Schema.Types.ObjectId,
//       ref: "Tutor",
//       default: null,
//     },
//     isActive: {
//       type: Boolean,
//       default: false,
//     },
//   },
//   {
//     timestamps: true,
//   }
// );

// // Create indexes for better query performance
// requestTutorSchema.index({ division: 1, district: 1 });
// requestTutorSchema.index({ medium: 1, grade: 1 });
// requestTutorSchema.index({ status: 1 });
// requestTutorSchema.index({ createdAt: -1 });

// module.exports = mongoose.model("RequestTutor", requestTutorSchema);

const mongoose = require("mongoose");
const { TUTOR_REQUEST_STATUS } = require("../utils/constants");

const requestTutorSchema = new mongoose.Schema(
  {
    // Basic Info
    studentName: {
      type: String,
      required: [true, "Student name is required."],
      trim: true,
      minlength: 2,
      maxlength: 65,
    },
    phoneNo: {
      type: String,
      required: [true, "Phone number is required."],
      trim: true,
      match: [
        /^(\+88)?01[3-9]\d{8}$/,
        "Please provide a valid Bangladeshi phone number.",
      ],
    },
    gender: {
      type: String,
      enum: ["Male", "Female", "Any"],
      default: "Any",
    },

    // Educational Info (Student 1 - Required)
    institution: {
      type: String,
      required: [true, "Institution is required."],
      trim: true,
      maxlength: 100,
    },
    medium: {
      type: String,
      required: [true, "Medium is required."],
      enum: [
        "Bangla Medium",
        "English Medium",
        "English Version (National Curriculum)",
        "Arabic Medium",
        "University Level",
        "Admission Preparation",
        "Skill Development",
        "Job Purpose",
      ],
    },
    curriculum: {
      type: String,
      trim: true,
    },
    grade: {
      type: String,
      // Make grade required only if medium is not Skill Development or Job Purpose
      required: function () {
        return !["Skill Development", "Job Purpose"].includes(this.medium);
      },
      trim: true,
      maxlength: 50,
    },
    subjects: {
      type: [String],
      required: true,
      validate: [
        (val) => Array.isArray(val) && val.length > 0,
        "At least one subject is required.",
      ],
    },

    // Educational Info (Student 2 - Optional)
    institution2: {
      type: String,
      trim: true,
      maxlength: 100,
    },
    medium2: {
      type: String,
      enum: [
        "",
        "Bangla Medium",
        "English Medium",
        "English Version (National Curriculum)",
        "Arabic Medium",
        "University Level",
        "Admission Preparation",
        "Skill Development",
        "Job Purpose",
      ],
    },
    curriculum2: {
      type: String,
      trim: true,
    },
    grade2: {
      type: String,
      // Make grade2 required only if medium2 is not Skill Development or Job Purpose
      required: function () {
        return (
          this.multipleStudent &&
          this.medium2 &&
          !["Skill Development", "Job Purpose"].includes(this.medium2)
        );
      },
      trim: true,
      maxlength: 50,
    },
    subjects2: {
      type: [String],
    },

    multipleStudent: {
      type: Boolean,
      default: false,
    },

    // Time & Offer
    salary: {
      type: String,
      required: [true, "Salary is required."],
      trim: true,
      maxlength: 100,
    },
    days: {
      type: String,
      required: [true, "Days per week is required."],
      trim: true,
      maxlength: 50,
    },
    time: {
      type: String,
      required: [true, "Time is required."],
      trim: true,
      maxlength: 100,
    },
    requirement: {
      type: String,
      trim: true,
      maxlength: 500,
    },

    // Address
    division: {
      type: String,
      required: [true, "Division is required."],
      trim: true,
      maxlength: 50,
    },
    district: {
      type: String,
      required: [true, "District is required."],
      trim: true,
      maxlength: 50,
    },
    thana: {
      type: String,
      required: [true, "Thana is required."],
      trim: true,
      maxlength: 50,
    },
    area: {
      type: String,
      required: [true, "Area is required."],
      trim: true,
      maxlength: 50,
    },
    address: {
      type: String,
      required: [true, "Detailed address is required."],
      trim: true,
      minlength: 10,
      maxlength: 200,
    },

    // Admin fields
    adminDivision: {
      type: String,
      trim: true,
      maxlength: 100,
    },
    adminArea: {
      type: String,
      trim: true,
      maxlength: 100,
    },

    // Status and Assignment
    status: {
      type: String,
      enum: Object.values(TUTOR_REQUEST_STATUS),
      default: TUTOR_REQUEST_STATUS.PENDING,
    },
    isAssignTutor: {
      type: Boolean,
      default: false,
    },
    assignedTutor: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Tutor",
      default: null,
    },
    isActive: {
      type: Boolean,
      default: false,
    },
    comment: {
      type: String,
      default: "",
      maxlength: 1000,
    },
    zone: {
      type: String,
      default: "",
    },

    // Agreement
    agreeTerms: {
      type: Boolean,
      required: true,
      validate: {
        validator: (v) => v === true,
        message: "You must agree to the terms and conditions.",
      },
    },
  },
  {
    timestamps: true,
  }
);

const RequestTutor = mongoose.model("RequestTutor", requestTutorSchema);

module.exports = RequestTutor;
