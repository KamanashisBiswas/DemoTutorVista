const express = require("express");
const router = express.Router();

// Import controllers
const {
  applyAsTutor,
  getAllApplications,
  getTutorById,
  getApprovedTutors,
  deleteTutorApplication,
  getTutorStats, // <-- Changed from getApplicationStats
  editTutor,
  uploadFiles,
  updateTutor,
  getTutorByPhone,
} = require("../controllers/tutorController");

// Import middleware
const { authenticate, authorize } = require("../middleware/auth");

// Import validations
const {
  validateTutorApplication,
  validateUpdateTutorStatus,
  validateTutorId,
  validateEditTutor, // Added edit tutor validation
} = require("../validations/tutorValidation");

// Tutor application routes
router.post("/apply", uploadFiles, validateTutorApplication, applyAsTutor);
router.get("/applications", getAllApplications);
router.get("/approved", getApprovedTutors);
router.get("/by-phone/:phone", getTutorByPhone); // Public route for phone search
router.get("/stats", authenticate, authorize("admin"), getTutorStats); // <-- FIX: Changed auth, admin to correct middleware
router.get("/:id", authenticate, authorize("admin"), getTutorById); // <-- FIX: Changed auth, admin to correct middleware
router.put(
  "/:id/edit",
  authenticate,
  authorize("admin"),
  uploadFiles,
  editTutor
);
router.delete("/:id", authenticate, authorize("admin"), deleteTutorApplication);

module.exports = router;
