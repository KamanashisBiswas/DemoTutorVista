const RequestTutor = require("../models/RequestTutor");
const asyncHandler = require("../utils/asyncHandler");
const { sendParentRequestConfirmation } = require("../utils/smsService");

// @desc    Create a new tutor request
// @route   POST /api/request-tutor
// @access  Public
const createRequest = asyncHandler(async (req, res) => {
  const { phoneNo } = req.body;

  // Check for existing request with same phone number (within last 24 hours)
  const existingRequest = await RequestTutor.findOne({
    phoneNo,
    createdAt: {
      $gte: new Date(Date.now() - 24 * 60 * 60 * 1000), // Last 24 hours
    },
  });

  if (existingRequest) {
    return res.status(400).json({
      success: false,
      message:
        "You have already submitted a request in the last 24 hours. Please wait before submitting another request.",
    });
  }

  // Create a new request with the payload from the body
  const requestTutor = await RequestTutor.create({
    ...req.body,
    status: "pending",
    isAssignTutor: false,
    assignedTutor: null,
    isActive: false,
  });

  // Send automated confirmation SMS to guardian (non-blocking)
  sendParentRequestConfirmation({
    phoneNo: requestTutor.phoneNo,
    studentName: requestTutor.studentName,
    requestId: requestTutor._id,
  }).catch((err) => {
    console.error("[BulkSMS] Parent confirmation SMS error:", err.message);
  });

  res.status(201).json({
    success: true,
    message:
      "Your tutor request has been submitted successfully. We will contact you within 24 hours.",
    data: {
      request: {
        id: requestTutor._id,
        studentName: requestTutor.studentName,
        phoneNo: requestTutor.phoneNo,
        status: requestTutor.status,
        createdAt: requestTutor.createdAt,
      },
    },
  });
});

// Public: Get only active requests
const getActiveRequests = asyncHandler(async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 12; // Default to 12 to match frontend
  const skip = (page - 1) * limit;

  const {
    division,
    district,
    thana,
    area,
    medium,
    level, // Mapped to 'grade' field
    subjects, // Mapped to 'subjects' array
    gender,
    status,
    zone,
  } = req.query;

  const filter = { isActive: true };

  // Add filters based on query parameters
  if (status) filter.status = status;
  if (division) filter.division = division;
  if (district) filter.district = district;
  if (thana) filter.thana = thana;
  if (area) filter.area = area;
  if (zone) filter.zone = zone;
  if (medium) {
    let targetMedium;
    if (medium === "English Version" || medium === "English Version (National Curriculum)") {
      targetMedium = "English Version (National Curriculum)";
    } else if (medium === "Madrasa" || medium === "Arabic Medium") {
      targetMedium = "Arabic Medium";
    } else {
      targetMedium = medium;
    }

    if (medium === "Others") {
      const standardMediums = ["Bangla Medium", "English Medium", "English Version (National Curriculum)", "Arabic Medium"];
      filter.$or = [
        { medium: { $nin: standardMediums } },
        { medium2: { $nin: standardMediums, $ne: "" } }
      ];
    } else {
      filter.$or = [
        { medium: targetMedium },
        { medium2: targetMedium }
      ];
    }
  }
  if (level) filter.grade = level; // Frontend 'level' maps to backend 'grade'
  if (subjects) filter.subjects = { $in: [subjects] }; // Check if subject is in the array
  if (gender) filter.gender = gender;

  const requests = await RequestTutor.find(filter)
    .populate("assignedTutor", "name email phone")
    .sort({ updatedAt: -1 })
    .skip(skip)
    .limit(limit);

  const total = await RequestTutor.countDocuments(filter);

  res.status(200).json({
    success: true,
    data: {
      requests,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit),
      },
    },
  });
});

// Admin: Get all requests (active + inactive) - WITHOUT PAGINATION
const getAllRequests = asyncHandler(async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 8;
  const skip = (page - 1) * limit;

  const filter = {};

  // Add filters based on query parameters if needed
  if (req.query.status) filter.status = req.query.status;
  if (req.query.medium) {
    const queryMedium = req.query.medium;
    let targetMedium;
    if (queryMedium === "English Version" || queryMedium === "English Version (National Curriculum)") {
      targetMedium = "English Version (National Curriculum)";
    } else if (queryMedium === "Madrasa" || queryMedium === "Arabic Medium") {
      targetMedium = "Arabic Medium";
    } else {
      targetMedium = queryMedium;
    }

    if (queryMedium === "Others") {
      const standardMediums = ["Bangla Medium", "English Medium", "English Version (National Curriculum)", "Arabic Medium"];
      filter.$or = [
        { medium: { $nin: standardMediums } },
        { medium2: { $nin: standardMediums, $ne: "" } }
      ];
    } else {
      filter.$or = [
        { medium: targetMedium },
        { medium2: targetMedium }
      ];
    }
  }
  if (req.query.division) filter.division = req.query.division;
  if (req.query.district) filter.district = req.query.district;
  if (req.query.area) filter.area = req.query.area;
  if (req.query.zone) filter.zone = req.query.zone;
  if (req.query.isActive !== undefined)
    filter.isActive = req.query.isActive === "true";
  if (req.query.search) {
    filter.$or = [
      { studentName: { $regex: req.query.search, $options: "i" } },
      { phoneNo: { $regex: req.query.search, $options: "i" } },
      { guardianPhone: { $regex: req.query.search, $options: "i" } },
      { area: { $regex: req.query.search, $options: "i" } },
      { district: { $regex: req.query.search, $options: "i" } },
    ];
  }

  if (req.query.startDate || req.query.endDate) {
    filter.updatedAt = {};
    if (req.query.startDate) {
      filter.updatedAt.$gte = new Date(req.query.startDate);
    }
    if (req.query.endDate) {
      filter.updatedAt.$lte = new Date(req.query.endDate);
    }
  }

  const total = await RequestTutor.countDocuments(filter);

  const requests = await RequestTutor.find(filter)
    .populate("assignedTutor", "name email phone")
    .sort({ updatedAt: -1 })
    .skip(skip)
    .limit(limit);

  res.status(200).json({
    success: true,
    data: {
      requests,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit),
      },
      message: `Retrieved ${requests.length} requests (page ${page})`,
    },
  });
});

// @desc    Get single tutor request
// @route   GET /api/request-tutor/:id
// @access  Private/Admin
const getRequestById = asyncHandler(async (req, res) => {
  const request = await RequestTutor.findById(req.params.id).populate(
    "assignedTutor",
    "name email phone profileImage"
  );

  if (!request) {
    return res.status(404).json({
      success: false,
      message: "Request not found",
    });
  }

  res.status(200).json({
    success: true,
    data: request,
  });
});

// @desc    Update request status
// @route   PUT /api/request-tutor/:id/status
// @access  Private/Admin
const updateRequestStatus = asyncHandler(async (req, res) => {
  const { status, assignedTutor } = req.body;

  const request = await RequestTutor.findById(req.params.id);

  if (!request) {
    return res.status(404).json({
      success: false,
      message: "Request not found",
    });
  }

  request.status = status;

  if (status === "assigned" && assignedTutor) {
    request.isAssignTutor = true;
    request.assignedTutor = assignedTutor;
  } else if (status !== "assigned") {
    request.isAssignTutor = false;
    request.assignedTutor = null;
  }

  await request.save();

  res.status(200).json({
    success: true,
    message: "Request status updated successfully",
    data: request,
  });
});

// @desc    Delete tutor request
// @route   DELETE /api/request-tutor/:id
// @access  Private/Admin
const deleteRequest = asyncHandler(async (req, res) => {
  const request = await RequestTutor.findById(req.params.id);

  if (!request) {
    return res.status(404).json({
      success: false,
      message: "Request not found",
    });
  }

  await RequestTutor.findByIdAndDelete(req.params.id);

  res.status(200).json({
    success: true,
    message: "Request deleted successfully",
  });
});

// @desc    Get request statistics
// @route   GET /api/request-tutor/stats
// @access  Private/Admin
const getRequestStats = asyncHandler(async (req, res) => {
  // এখানে কোনো find("stats") বা findById("stats") ব্যবহার করবেন না!
  // শুধুমাত্র countDocuments ব্যবহার করুন

  const totalRequests = await RequestTutor.countDocuments();
  const activeRequests = await RequestTutor.countDocuments({ status: "active" });
  const pendingRequests = await RequestTutor.countDocuments({ status: "pending" });
  const referredRequests = await RequestTutor.countDocuments({ status: "referred" });
  const confirmedRequests = await RequestTutor.countDocuments({ status: "confirmed" });
  const demoRequests = await RequestTutor.countDocuments({ status: "demo" });
  const problemRequests = await RequestTutor.countDocuments({ status: "problem" });
  const cancelledRequests = await RequestTutor.countDocuments({ status: "cancelled" });

  res.status(200).json({
    success: true,
    data: {
      stats: {
        total: totalRequests,
        active: activeRequests,
        pending: pendingRequests,
        referred: referredRequests,
        confirmed: confirmedRequests,
        demo: demoRequests,
        problem: problemRequests,
        cancelled: cancelledRequests,
      },
    },
  });
});

// @desc    Update a tutor request
// @route   PUT /api/request-tutor/:id
// @access  Private/Admin
const updateRequest = asyncHandler(async (req, res) => {
  const request = await RequestTutor.findById(req.params.id);

  if (!request) {
    return res.status(404).json({
      success: false,
      message: "Request not found",
    });
  }

  // Manually update fields from req.body
  Object.assign(request, req.body);

  // If the medium is one of these, ensure grade and curriculum are cleared
  if (["Skill Development", "Job Purpose"].includes(request.medium)) {
    request.curriculum = "";
    request.grade = "";
  }
  if (
    request.multipleStudent &&
    ["Skill Development", "Job Purpose"].includes(request.medium2)
  ) {
    request.curriculum2 = "";
    request.grade2 = "";
  }

  const updatedRequest = await request.save();

  res.status(200).json({
    success: true,
    message: "Request updated successfully",
    data: updatedRequest,
  });
});

module.exports = {
  createRequest,
  getActiveRequests,
  getAllRequests,
  getRequestById,
  updateRequestStatus,
  deleteRequest,
  getRequestStats,
  updateRequest,
};
