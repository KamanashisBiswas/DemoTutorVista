const express = require("express");
const router = express.Router();

// Import controllers
const {
  createRequest,
  getAllRequests,
  getRequestById,
  updateRequestStatus,
  deleteRequest,
  getRequestStats,
  updateRequest,
  getActiveRequests,
} = require("../controllers/requestTutorController");

// Import middleware
const { authenticate, authorize } = require("../middleware/auth");
const { handleValidation } = require("../middleware/validation");

// Import validations
const requestTutorValidation = require("../validations/requestTutorValidation");

// --- Public Routes ---
router.post("/", requestTutorValidation, handleValidation, createRequest);
// Public: Only active requests
router.get("/", getActiveRequests); // <-- Only active requests

// --- Admin Routes ---
// All requests (active + inactive)
router.get("/all", authenticate, authorize("admin"), getAllRequests); // <-- All requests (admin only)

// STATS ROUTE MUST COME BEFORE :id ROUTE!
router.get("/stats", authenticate, authorize("admin"), getRequestStats);

router.get("/:id", getRequestById); // <-- Public GET single request

// Only admin can update, delete, or get stats
router.put("/:id", authenticate, authorize("admin"), updateRequest);
router.put(
  "/:id/status",
  authenticate,
  authorize("admin"),
  updateRequestStatus
);
router.delete("/:id", authenticate, authorize("admin"), deleteRequest);

module.exports = router;
