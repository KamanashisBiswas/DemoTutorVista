const Tutor = require("../models/Tutor");
const asyncHandler = require("../utils/asyncHandler");
const multer = require("multer");
const { cloudinary } = require("../config/cloudinary");
const { sendTutorApplicationConfirmation } = require("../utils/smsService");

// Use memory storage for Vercel's read-only filesystem
const upload = multer({
  storage: multer.memoryStorage(),
  fileFilter: (req, file, cb) => {
    if (file.mimetype.startsWith("image/")) {
      cb(null, true);
    } else {
      cb(new Error("Only image files are allowed"), false);
    }
  },
  limits: {
    fileSize: 10 * 1024 * 1024, // 10MB limit
  },
});

// File upload middleware
const uploadFiles = upload.fields([
  { name: "profileImage", maxCount: 1 },
  { name: "educationDocument", maxCount: 1 },
  { name: "nidFront", maxCount: 1 },
  { name: "nidBack", maxCount: 1 },
  { name: "birthCertificate", maxCount: 1 },
]);

// Helper function to upload a buffer to Cloudinary
const uploadToCloudinaryFromBuffer = (buffer, options) => {
  return new Promise((resolve, reject) => {
    const uploadStream = cloudinary.uploader.upload_stream(
      options,
      (error, result) => {
        if (result) {
          resolve(result);
        } else {
          reject(error || new Error("Cloudinary upload failed"));
        }
      }
    );
    uploadStream.end(buffer);
  });
};

// @desc    Apply as tutor
// @route   POST /api/tutor/apply
// @access  Public
const applyAsTutor = asyncHandler(async (req, res) => {
  const {
    name,
    phone,
    email,
    gender,
    division,
    district,
    thana,
    area,
    suitableThana, // <-- add
    suitableArea, // <-- add
    preferredSubjects,
    educationSections,
    experience,
    specialSkills,
    documentType,
    agreeTerms,
  } = req.body;

  const existingTutor = await Tutor.findOne({ email });
  if (existingTutor) {
    return res.status(400).json({
      success: false,
      message: "Application already exists with this email",
    });
  }

  let parsedEducationSections, parsedPreferredSubjects, parsedSpecialSkills;
  try {
    if (educationSections)
      parsedEducationSections = JSON.parse(educationSections);
    if (preferredSubjects)
      parsedPreferredSubjects = JSON.parse(preferredSubjects);
    if (specialSkills) parsedSpecialSkills = JSON.parse(specialSkills); // This will be an array
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: "Invalid data format in JSON fields.",
    });
  }

  // Add this for suitableUpazilla and suitableArea:
  let parsedSuitableThana, parsedSuitableArea;
  if (suitableThana) {
    try {
      parsedSuitableThana =
        typeof suitableThana === "string"
          ? JSON.parse(suitableThana)
          : suitableThana;
    } catch {
      parsedSuitableThana = [suitableThana];
    }
  }
  if (suitableArea) {
    try {
      parsedSuitableArea =
        typeof suitableArea === "string"
          ? JSON.parse(suitableArea)
          : suitableArea;
    } catch {
      parsedSuitableArea = [suitableArea];
    }
  }

  const fileData = {};
  const uploadedPublicIds = [];

  try {
    if (req.files) {
      const uploadPromises = [];

      const processFile = (fieldName, file, options) => {
        if (file) {
          uploadPromises.push(
            uploadToCloudinaryFromBuffer(file.buffer, options).then(
              (result) => {
                fileData[fieldName] = {
                  url: result.secure_url,
                  publicId: result.public_id,
                  originalName: file.originalname,
                  size: file.size,
                };
                uploadedPublicIds.push(result.public_id);
              }
            )
          );
        }
      };

      processFile("profileImage", req.files.profileImage?.[0], {
        folder: "tutors/profiles",
      });
      processFile("educationDocument", req.files.educationDocument?.[0], {
        folder: "tutors/documents",
      });

      if (documentType === "nid") {
        processFile("nidFrontImage", req.files.nidFront?.[0], {
          folder: "tutors/nid",
        });
        processFile("nidBackImage", req.files.nidBack?.[0], {
          folder: "tutors/nid",
        });
      } else if (documentType === "birth_certificate") {
        processFile("birthCertificateImage", req.files.birthCertificate?.[0], {
          folder: "tutors/birth_certificates",
        });
      }

      await Promise.all(uploadPromises);
    }

    const tutorData = {
      name,
      phone,
      email,
      gender,
      division,
      district,
      thana,
      area,
      suitableThana: parsedSuitableThana,
      suitableArea: parsedSuitableArea,
      educationSections: parsedEducationSections,
      preferredSubjects: parsedPreferredSubjects,
      experience,
      documentType,
      agreeTerms: agreeTerms === "true" || agreeTerms === true,
      ...fileData,
      score: "", // Always empty string on apply
    };

    // Directly assign the array of special skills if it exists and is an array
    if (Array.isArray(parsedSpecialSkills) && parsedSpecialSkills.length > 0) {
      tutorData.specialSkills = parsedSpecialSkills;
    }

    const tutorApplication = await Tutor.create(tutorData);

    // Send automated confirmation SMS to tutor (non-blocking)
    if (tutorApplication && tutorApplication.phone) {
      sendTutorApplicationConfirmation({
        phone: tutorApplication.phone,
        name: tutorApplication.name,
      }).catch((err) => {
        console.error("[BulkSMS] Tutor application SMS error:", err.message);
      });
    }

    res.status(201).json({
      success: true,
      message: "Application submitted successfully",
      data: {
        application: { id: tutorApplication._id },
      },
    });
  } catch (error) {
    if (uploadedPublicIds.length > 0) {
      console.log(`Cleaning up ${uploadedPublicIds.length} files on error...`);
      await Promise.all(
        uploadedPublicIds.map((id) => cloudinary.uploader.destroy(id))
      );
    }
    // Re-throw error to be handled by global error handler
    throw error;
  }
});

// @desc    Get all tutor applications
// @route   GET /api/tutor/applications
// @access  Public
const getAllApplications = asyncHandler(async (req, res) => {
  const {
    page = 1,
    limit = 8,
    search,
    isHired,
    division,
    district,
    thana,
    area,
    medium,
    level,
    preferredSubjects,
    gender,
    score,
    specialSkills,
    suitableArea,
    institution,
    department,
    sortByScore, // New parameter for sorting
  } = req.query;

  const skip = (parseInt(page) - 1) * parseInt(limit);

  // Build filter query
  const filter = {};

  if (search) {
    const searchRegex = { $regex: search, $options: "i" };
    filter.$or = [
      { name: searchRegex },
      { email: searchRegex },
      { phone: searchRegex },
    ];
  }

  if (isHired === "true") {
    filter.isHired = true;
  } else if (isHired === "false") {
    filter.isHired = false;
  }

  if (division) filter.division = division;
  if (district) filter.district = district;
  if (thana) filter.thana = thana;
  if (area) filter.area = area;

  // --- FIX START: Separate education filters to handle multiple conditions correctly ---
  const educationFilters = [];
  if (medium) {
    const mediumMatch = { medium: medium };
    if (level && medium === "English Medium") {
      mediumMatch.curriculum = level;
    }
    // Use $elemMatch on the educationSections array for the medium-specific object
    educationFilters.push({ educationSections: { $elemMatch: mediumMatch } });
  }

  if (institution) {
    // Use a separate $elemMatch for institution
    educationFilters.push({
      educationSections: {
        $elemMatch: { institution: { $regex: institution, $options: "i" } },
      },
    });
  }

  if (department) {
    // Use a separate $elemMatch for department
    educationFilters.push({
      educationSections: {
        $elemMatch: { department: { $regex: department, $options: "i" } },
      },
    });
  }

  // If there are any education filters, add them to the main filter using $and
  if (educationFilters.length > 0) {
    if (!filter.$and) {
      filter.$and = [];
    }
    filter.$and.push(...educationFilters);
  }
  // --- FIX END ---

  if (preferredSubjects) {
    filter.preferredSubjects = {
      $elemMatch: { $regex: preferredSubjects, $options: "i" },
    };
  }

  if (gender) filter.gender = gender;

  // Score filter will now use the numeric field in the pipeline
  if (score) {
    const scoreNum = parseFloat(score);
    if (!isNaN(scoreNum)) {
      filter.numericScore = { $gte: scoreNum }; // Filter scores greater than or equal to the input
    }
  }

  if (specialSkills) {
    const skillsArray = specialSkills.split(",").map((skill) => skill.trim());
    if (skillsArray.length > 0) {
      filter["specialSkills.type"] = { $all: skillsArray };
    }
  }

  // --- MODIFICATION START: Suitable Area Logic ---
  const areasArray = suitableArea
    ? suitableArea.split(",").map((area) => area.trim())
    : [];
  if (areasArray.length > 0) {
    // If filtering by suitableArea, we only want tutors who have at least one of the areas.
    filter.suitableArea = { $in: areasArray };
  }
  // --- MODIFICATION END ---

  // --- Aggregation Pipeline ---
  const pipeline = [
    // 1. Add a numeric field from the string score
    {
      $addFields: {
        numericScore: {
          $cond: {
            if: { $ne: ["$score", ""] },
            then: { $toDouble: "$score" },
            else: -1, // Default value for empty scores to sort them last
          },
        },
      },
    },
    // 2. Apply all filters
    { $match: filter },
  ];

  // --- MODIFICATION START: Add priority sorting for Suitable Area ---
  const sortStage = {};
  if (areasArray.length > 0) {
    pipeline.push({
      $addFields: {
        areaMatchPriority: {
          $cond: {
            if: { $setIsSubset: [areasArray, "$suitableArea"] },
            then: 1, // Highest priority: Tutor has ALL selected areas
            else: 2, // Lower priority: Tutor has SOME of the selected areas
          },
        },
      },
    });
    sortStage.areaMatchPriority = 1; // Sort by the new priority field first
  }
  // --- MODIFICATION END ---

  // 3. Add sorting stage if requested
  if (sortByScore === "asc") {
    sortStage.numericScore = 1;
  } else if (sortByScore === "desc") {
    sortStage.numericScore = -1;
  } else {
    sortStage.submittedAt = -1; // Default sort
  }
  pipeline.push({ $sort: sortStage });

  // 4. Use $facet for pagination and total count in one query
  const facetPipeline = [
    ...pipeline,
    {
      $facet: {
        applications: [{ $skip: skip }, { $limit: parseInt(limit) }],
        total: [{ $count: "count" }],
      },
    },
  ];

  const result = await Tutor.aggregate(facetPipeline);

  const applications = result[0].applications;
  const total = result[0].total[0] ? result[0].total[0].count : 0;

  res.status(200).json({
    success: true,
    data: {
      applications,
      pagination: {
        total,
        page: parseInt(page),
        limit: parseInt(limit),
        pages: Math.ceil(total / parseInt(limit)),
      },
    },
  });
});

// @desc    Get tutor application by ID
// @route   GET /api/tutor/:id
// @access  Private/Admin
const getTutorById = asyncHandler(async (req, res) => {
  const tutor = await Tutor.findById(req.params.id);

  if (!tutor) {
    return res.status(404).json({
      success: false,
      message: "Tutor application not found",
    });
  }

  res.status(200).json({
    success: true,
    data: { tutor },
  });
});

// @desc    Get approved tutors
// @route   GET /api/tutor/approved
// @access  Public
const getApprovedTutors = asyncHandler(async (req, res) => {
  const division = req.query.division;
  const district = req.query.district;
  const subjects = req.query.subjects ? req.query.subjects.split(",") : null;

  // Build filter query
  const filter = {};
  if (division) filter.division = division;
  if (district) filter.district = district;
  if (subjects && subjects.length > 0) {
    filter.preferredSubjects = { $in: subjects };
  }

  // No limit, get all approved tutors
  const tutors = await Tutor.find(filter).sort({ createdAt: -1 });

  const total = await Tutor.countDocuments(filter);

  res.status(200).json({
    success: true,
    data: {
      tutors,
      total,
    },
  });
});

// @desc    Get application statistics
// @route   GET /api/tutor/stats
// @access  Private/Admin
const getTutorStats = asyncHandler(async (req, res) => {
  // --- UPDATED to be like getRequestStats ---

  const totalApplications = await Tutor.countDocuments();
  const hiredTutors = await Tutor.countDocuments({ isHired: true });
  const notHiredTutors = await Tutor.countDocuments({ isHired: false });

  const recentApplications = await Tutor.find()
    .sort({ submittedAt: -1 })
    .limit(5)
    .select("name email phone isHired submittedAt"); // Select relevant fields

  const stats = {
    total: totalApplications,
    hired: hiredTutors,
    notHired: notHiredTutors,
  };

  res.status(200).json({
    success: true,
    data: {
      stats,
      recentApplications,
    },
  });
});

// @desc    Edit tutor information
// @route   PUT /api/tutor/:id/edit
// @access  Private/Admin
const editTutor = asyncHandler(async (req, res) => {
  const {
    name,
    phone,
    email,
    gender,
    educationSections,
    division,
    district,
    thana,
    area,
    preferredSubjects,
    experience,
    specialSkills,
    documentType,
    isHired,
    suitableThana,
    suitableArea,
  } = req.body;

  // Find the tutor by ID
  const tutor = await Tutor.findById(req.params.id);

  if (!tutor) {
    return res.status(404).json({
      success: false,
      message: "Tutor application not found",
    });
  }

  // Check if another tutor exists with same email (excluding current tutor)
  if (email) {
    const existingTutor = await Tutor.findOne({
      $and: [{ _id: { $ne: req.params.id } }, { email }],
    });

    if (existingTutor) {
      return res.status(400).json({
        success: false,
        message: "Another tutor application already exists with this email",
      });
    }
  }

  // Parse JSON data
  let parsedEducationSections, parsedPreferredSubjects, parsedSpecialSkills;

  if (educationSections) {
    try {
      parsedEducationSections =
        typeof educationSections === "string"
          ? JSON.parse(educationSections)
          : educationSections;
    } catch (error) {
      return res.status(400).json({
        success: false,
        message: "Invalid education sections format",
      });
    }
  }

  if (preferredSubjects) {
    try {
      parsedPreferredSubjects =
        typeof preferredSubjects === "string"
          ? JSON.parse(preferredSubjects)
          : preferredSubjects;
    } catch (error) {
      return res.status(400).json({
        success: false,
        message: "Invalid preferred subjects format",
      });
    }
  }

  if (specialSkills) {
    try {
      parsedSpecialSkills =
        typeof specialSkills === "string"
          ? JSON.parse(specialSkills)
          : specialSkills;
    } catch (error) {
      return res.status(400).json({
        success: false,
        message: "Invalid special skills format",
      });
    }
  }

  // Add this for suitableUpazilla and suitableArea:
  let parsedSuitableThana, parsedSuitableArea;
  if (suitableThana) {
    try {
      parsedSuitableThana =
        typeof suitableThana === "string"
          ? JSON.parse(suitableThana)
          : suitableThana;
    } catch {
      parsedSuitableThana = [suitableThana];
    }
  }
  if (suitableArea) {
    try {
      parsedSuitableArea =
        typeof suitableArea === "string"
          ? JSON.parse(suitableArea)
          : suitableArea;
    } catch {
      parsedSuitableArea = [suitableArea];
    }
  }

  // Handle file uploads with improved logic
  const fileData = {};
  const oldFilesToDelete = [];
  const newUploadedFiles = [];

  // Profile image remove detection (must be after fileData/oldFilesToDelete define)
  if (
    Object.prototype.hasOwnProperty.call(req.body, "profileImage") &&
    req.body.profileImage === "" &&
    tutor.profileImage?.publicId
  ) {
    oldFilesToDelete.push(tutor.profileImage.publicId);
    fileData.profileImage = null; // Mark for $unset in DB
  }

  try {
    // Handle document type switching first
    if (documentType && documentType !== tutor.documentType) {
      if (
        tutor.documentType === "nid" &&
        documentType === "birth_certificate"
      ) {
        if (tutor.nidFrontImage?.publicId) {
          oldFilesToDelete.push(tutor.nidFrontImage.publicId);
          fileData.nidFrontImage = undefined;
        }
        if (tutor.nidBackImage?.publicId) {
          oldFilesToDelete.push(tutor.nidBackImage.publicId);
          fileData.nidBackImage = undefined;
        }
      } else if (
        tutor.documentType === "birth_certificate" &&
        documentType === "nid"
      ) {
        if (tutor.birthCertificateImage?.publicId) {
          oldFilesToDelete.push(tutor.birthCertificateImage.publicId);
          fileData.birthCertificateImage = undefined;
        }
      }
    }

    if (req.files) {
      // Sequential file uploads to prevent race conditions
      const uploadTasks = [];

      // Profile Image
      if (req.files.profileImage?.[0]) {
        if (tutor.profileImage?.publicId) {
          oldFilesToDelete.push(tutor.profileImage.publicId);
        }
        uploadTasks.push({
          field: "profileImage",
          file: req.files.profileImage[0],
          options: { folder: "tutors/profiles" },
        });
      }

      // Education Document
      if (req.files.educationDocument?.[0]) {
        if (tutor.educationDocument?.publicId) {
          oldFilesToDelete.push(tutor.educationDocument.publicId);
        }
        uploadTasks.push({
          field: "educationDocument",
          file: req.files.educationDocument[0],
          options: { folder: "tutors/documents" },
        });
      }

      // Document type specific uploads
      const currentDocumentType = documentType || tutor.documentType;

      if (currentDocumentType === "nid") {
        if (req.files.nidFront?.[0]) {
          if (tutor.nidFrontImage?.publicId) {
            oldFilesToDelete.push(tutor.nidFrontImage.publicId);
          }
          uploadTasks.push({
            field: "nidFrontImage",
            file: req.files.nidFront[0],
            options: { folder: "tutors/nid" },
          });
        }

        if (req.files.nidBack?.[0]) {
          if (tutor.nidBackImage?.publicId) {
            oldFilesToDelete.push(tutor.nidBackImage.publicId);
          }
          uploadTasks.push({
            field: "nidBackImage",
            file: req.files.nidBack[0],
            options: { folder: "tutors/nid" },
          });
        }
      } else if (currentDocumentType === "birth_certificate") {
        if (req.files.birthCertificate?.[0]) {
          if (tutor.birthCertificateImage?.publicId) {
            oldFilesToDelete.push(tutor.birthCertificateImage.publicId);
          }
          uploadTasks.push({
            field: "birthCertificateImage",
            file: req.files.birthCertificate[0],
            options: { folder: "tutors/birth_certificates" },
          });
        }
      }

      // Execute uploads sequentially
      for (const task of uploadTasks) {
        try {
          console.log(`Uploading ${task.field} for tutor update...`);
          const result = await uploadToCloudinaryFromBuffer(
            task.file.buffer,
            task.options
          );

          fileData[task.field] = {
            url: result.secure_url,
            publicId: result.public_id,
            originalName: task.file.originalname,
            size: task.file.size,
          };

          newUploadedFiles.push(result.public_id);
          console.log(`✅ Updated ${task.field}: ${result.public_id}`);
        } catch (uploadError) {
          console.error(
            `❌ Failed to update ${task.field}:`,
            uploadError.message
          );
          throw uploadError;
        }
      }
    }

    // Update tutor information
    const updatedFields = {
      ...(name && { name }),
      ...(phone && { phone }),
      ...(email && { email }),
      ...(gender && { gender }),
      ...(parsedEducationSections && {
        educationSections: parsedEducationSections,
      }),
      ...(division && { division }),
      ...(district && { district }),
      ...(thana && { thana }),
      ...(area && { area }),
      ...(parsedPreferredSubjects && {
        preferredSubjects: parsedPreferredSubjects,
      }),
      ...(experience && { experience }),
      ...(documentType && { documentType }),
      ...(req.body.score !== undefined && { score: req.body.score }),
      ...fileData,
      ...(parsedSuitableThana && {
        suitableThana: parsedSuitableThana,
      }),
      ...(parsedSuitableArea && { suitableArea: parsedSuitableArea }),
    };

    // Only add profileImage to updatedFields if it's a new upload
    if (fileData.profileImage) {
      updatedFields.profileImage = fileData.profileImage;
    }

    // Special skills handling - Array of objects
    if (parsedSpecialSkills) {
      if (Array.isArray(parsedSpecialSkills)) {
        // Filter out invalid skills (empty type or value)
        const validSkills = parsedSpecialSkills.filter(
          (skill) =>
            skill.type &&
            skill.type.trim() !== "" &&
            skill.value &&
            skill.value.trim() !== ""
        );
        updatedFields.specialSkills = validSkills;
      } else {
        // If not array, set empty array
        updatedFields.specialSkills = [];
      }
    }

    // Only allow admin to update isHired
    if (
      typeof isHired !== "undefined" &&
      req.user &&
      req.user.role === "admin"
    ) {
      updatedFields.isHired = isHired;
    }

    // Handle document type switching - explicitly unset fields
    const unsetFields = {};
    if (documentType && documentType !== tutor.documentType) {
      if (
        tutor.documentType === "nid" &&
        documentType === "birth_certificate"
      ) {
        unsetFields.nidFrontImage = "";
        unsetFields.nidBackImage = "";
      } else if (
        tutor.documentType === "birth_certificate" &&
        documentType === "nid"
      ) {
        unsetFields.birthCertificateImage = "";
      }
    }
    if (fileData.profileImage === null) {
      unsetFields.profileImage = "";
    }

    const updateQuery = {
      $set: updatedFields,
      ...(Object.keys(unsetFields).length > 0 && { $unset: unsetFields }),
    };

    const updatedTutor = await Tutor.findByIdAndUpdate(
      req.params.id,
      updateQuery,
      {
        new: true,
        runValidators: true,
      }
    );

    // Delete old files from Cloudinary after successful update
    if (oldFilesToDelete.length > 0) {
      await Promise.all(
        oldFilesToDelete.map(async (publicId) => {
          try {
            await cloudinary.uploader.destroy(publicId);
            console.log(
              `Successfully deleted file from Cloudinary: ${publicId}`
            );
          } catch (deleteError) {
            console.error(
              "Error deleting old file from Cloudinary:",
              deleteError
            );
          }
        })
      );
    }

    res.status(200).json({
      success: true,
      message: "Tutor information updated successfully",
      data: {
        tutor: updatedTutor,
      },
    });
  } catch (error) {
    // Cleanup newly uploaded files on error
    if (newUploadedFiles.length > 0) {
      console.log(
        `🧹 Cleaning up ${newUploadedFiles.length} files due to error...`
      );
      await Promise.allSettled(
        newUploadedFiles.map(async (publicId) => {
          try {
            await cloudinary.uploader.destroy(publicId);
            console.log(`🗑️ Cleaned up: ${publicId}`);
          } catch (deleteError) {
            console.error(
              `❌ Cleanup failed for ${publicId}:`,
              deleteError.message
            );
          }
        })
      );
    }

    // Handle mongoose validation errors
    if (error.name === "ValidationError") {
      const errors = Object.values(error.errors).map((err) => ({
        field: err.path,
        message: err.message,
        value: err.value,
      }));

      return res.status(400).json({
        success: false,
        message: "Validation failed",
        errors,
      });
    }

    // Handle other errors
    throw error;
  }
});

// @desc    Delete tutor application
// @route   DELETE /api/tutor/:id
// @access  Private/Admin
const deleteTutorApplication = asyncHandler(async (req, res) => {
  const tutor = await Tutor.findById(req.params.id);

  if (!tutor) {
    return res.status(404).json({
      success: false,
      message: "Tutor application not found",
    });
  }

  // Delete associated images from Cloudinary
  const filesToDelete = [];
  const fileFields = [
    "profileImage",
    "educationDocument",
    "nidFrontImage",
    "nidBackImage",
    "birthCertificateImage",
  ];

  fileFields.forEach((field) => {
    if (tutor[field] && tutor[field].publicId) {
      filesToDelete.push(tutor[field].publicId);
    }
  });

  // Delete files from Cloudinary
  if (filesToDelete.length > 0) {
    try {
      await Promise.all(
        filesToDelete.map(async (publicId) => {
          try {
            await cloudinary.uploader.destroy(publicId);
          } catch (deleteError) {
            console.error(`Error deleting file ${publicId}:`, deleteError);
          }
        })
      );
    } catch (error) {
      console.error("Fatal error during Cloudinary deletions:", error);
    }
  }

  // Delete the tutor from the database
  await Tutor.findByIdAndDelete(req.params.id);

  res.status(200).json({
    success: true,
    message: "Tutor application deleted successfully",
  });
});

// @desc    Update tutor
// @route   PUT /api/tutor/:id
// @access  Private/Admin
const updateTutor = asyncHandler(async (req, res) => {
  const updateFields = { ...req.body };

  // Only admin can update isHired
  if (!req.user || req.user.role !== "admin") {
    delete updateFields.isHired;
  }

  const tutor = await Tutor.findByIdAndUpdate(req.params.id, updateFields, {
    new: true,
    runValidators: true,
  });

  if (!tutor) {
    return res.status(404).json({ success: false, message: "Tutor not found" });
  }

  res.status(200).json({ success: true, data: tutor });
});

// @desc    Get tutor info by phone number (public)
// @route   GET /api/tutor/by-phone/:phone
// @access  Public
const getTutorByPhone = asyncHandler(async (req, res) => {
  const phone = req.params.phone;
  const tutor = await Tutor.findOne({ phone });

  if (!tutor) {
    return res.status(404).json({
      success: false,
      message: "Tutor not found with this phone number",
    });
  }

  res.status(200).json({
    success: true,
    data: tutor,
  });
});

module.exports = {
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
};
