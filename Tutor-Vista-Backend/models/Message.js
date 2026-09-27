// models/Message.js
const mongoose = require("mongoose");

const messageSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
      trim: true,
      minlength: [2, "Name must be at least 2 characters long"],
      maxlength: [50, "Name cannot exceed 50 characters"],
      match: [
        /^[\u0980-\u09FFa-zA-Z\s.'-]+$/,
        "Name can only contain Bengali/English letters, spaces, dots, apostrophes, and hyphens",
      ],
    },
    phoneNumber: {
      type: String,
      required: [true, "Phone number is required"],
      trim: true,
      match: [
        /^(\+88)?01[3-9]\d{8}$/,
        "Please provide a valid Bangladeshi phone number",
      ],
    },
    message: {
      type: String,
      required: [true, "Message is required"],
      trim: true,
      minlength: [10, "Message must be at least 10 characters long"],
      maxlength: [500, "Message cannot exceed 500 characters"],
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
    lastUpdated: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

// Index for better performance
messageSchema.index({ phoneNumber: 1 });
messageSchema.index({ createdAt: -1 });

// Update lastUpdated on save
messageSchema.pre("save", function (next) {
  this.lastUpdated = new Date();
  next();
});

// Static method to check recent messages (spam prevention)
messageSchema.statics.checkRecentMessage = function (
  phoneNumber,
  timeWindow = 5
) {
  const timeThreshold = new Date(Date.now() - timeWindow * 60 * 1000);
  return this.findOne({
    phoneNumber: phoneNumber,
    createdAt: { $gte: timeThreshold },
  });
};

module.exports = mongoose.model("Message", messageSchema);
