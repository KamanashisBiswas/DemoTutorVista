const AppliedJob = require("../models/AppliedJob");
const asyncHandler = require("../utils/asyncHandler");

// Add Applied Job
const addAppliedJob = asyncHandler(async (req, res) => {
  const { requestTutorId, tutorId, expectedSalary } = req.body;

  // Check if already applied
  const alreadyApplied = await AppliedJob.findOne({ requestTutorId, tutorId });
  if (alreadyApplied) {
    return res.status(400).json({
      success: false,
      message: "You have already applied for this job.",
    });
  }

  const appliedJob = await AppliedJob.create({
    requestTutorId,
    tutorId,
    expectedSalary,
  });

  // Populate tutor and requestTutor info
  const populatedJob = await AppliedJob.findById(appliedJob._id)
    .populate("requestTutorId")
    .populate("tutorId");

  res.status(201).json({ success: true, data: populatedJob });
});

// Edit Applied Job
const editAppliedJob = asyncHandler(async (req, res) => {
  const { requestTutorId, tutorId, expectedSalary } = req.body;
  const appliedJob = await AppliedJob.findByIdAndUpdate(
    req.params.id,
    { requestTutorId, tutorId, expectedSalary },
    { new: true, runValidators: true }
  );
  if (!appliedJob) {
    return res
      .status(404)
      .json({ success: false, message: "Applied job not found" });
  }
  res.status(200).json({ success: true, data: appliedJob });
});

// Delete Applied Job
const deleteAppliedJob = asyncHandler(async (req, res) => {
  const appliedJob = await AppliedJob.findByIdAndDelete(req.params.id);
  if (!appliedJob) {
    return res
      .status(404)
      .json({ success: false, message: "Applied job not found" });
  }
  res.status(200).json({ success: true, message: "Applied job deleted" });
});

// Get All Applied Jobs
const getAllAppliedJobs = asyncHandler(async (req, res) => {
  const jobs = await AppliedJob.find()
    .populate("requestTutorId")
    .populate("tutorId");
  res.status(200).json({ success: true, data: jobs });
});

// Get Applied Job by ID
const getAppliedJobById = asyncHandler(async (req, res) => {
  const job = await AppliedJob.findById(req.params.id).populate(
    "requestTutorId tutorId"
  );
  if (!job) {
    return res
      .status(404)
      .json({ success: false, message: "Applied job not found" });
  }
  res.status(200).json({ success: true, data: job });
});

// Get Applied Jobs by Tutor ID
const getAppliedJobsByTutorId = asyncHandler(async (req, res) => {
  const { tutorId } = req.params;
  const jobs = await AppliedJob.find({ tutorId })
    .populate("requestTutorId")
    .sort({ createdAt: -1 });

  res.status(200).json({ success: true, data: jobs });
});

// Update Applied Job Status
const updateAppliedJobStatus = asyncHandler(async (req, res) => {
  const { status } = req.body;
  const appliedJob = await AppliedJob.findByIdAndUpdate(
    req.params.id,
    { status },
    { new: true }
  ).populate("requestTutorId tutorId");

  if (!appliedJob) {
    return res
      .status(404)
      .json({ success: false, message: "Applied job not found" });
  }

  res.status(200).json({ success: true, data: appliedJob });
});

module.exports = {
  addAppliedJob,
  editAppliedJob,
  deleteAppliedJob,
  getAllAppliedJobs,
  getAppliedJobById,
  getAppliedJobsByTutorId,
  updateAppliedJobStatus,
};
