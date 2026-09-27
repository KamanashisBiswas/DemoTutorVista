const mongoose = require("mongoose");

const appliedJobSchema = new mongoose.Schema(
  {
    requestTutorId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "RequestTutor",
      required: true,
    },
    tutorId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Tutor",
      required: true,
    },
    expectedSalary: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("AppliedJob", appliedJobSchema);
