const express = require("express");
const router = express.Router();

const {
  addAppliedJob,
  editAppliedJob,
  deleteAppliedJob,
  getAllAppliedJobs,
  getAppliedJobById,
} = require("../controllers/appliedJobController");

const {
  validateAppliedJob,
  validateAppliedJobId,
} = require("../validations/appliedJobValidation");

const { handleValidation } = require("../middleware/validation");

// Add Applied Job
router.post("/", validateAppliedJob, handleValidation, addAppliedJob);

// Edit Applied Job
router.put(
  "/:id",
  validateAppliedJobId,
  validateAppliedJob,
  handleValidation,
  editAppliedJob
);

// Delete Applied Job
router.delete("/:id", validateAppliedJobId, handleValidation, deleteAppliedJob);

// Get All Applied Jobs
router.get("/", getAllAppliedJobs);

// Get Applied Job by ID
router.get("/:id", validateAppliedJobId, handleValidation, getAppliedJobById);

module.exports = router;
