const cloudinary = require("cloudinary").v2;
const { CloudinaryStorage } = require("multer-storage-cloudinary");

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  secure: true,
  timeout: 30000, // 30 seconds timeout
});

// Configure Cloudinary storage for multer
const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: async (req, file) => {
    // Determine folder based on file field name
    let folder = "tutors/general";
    if (file.fieldname === "profileImage") {
      folder = "tutors/profiles";
    } else if (file.fieldname === "educationDocument") {
      folder = "tutors/documents";
    } else if (file.fieldname === "nidFront" || file.fieldname === "nidBack") {
      folder = "tutors/nid";
    } else if (file.fieldname === "birthCertificate") {
      folder = "tutors/birth_certificates";
    }

    return {
      folder: folder,
      allowed_formats: ["jpg", "jpeg", "png", "webp"],
      transformation: [
        {
          width: 800,
          height: 1000,
          crop: "limit",
          quality: "auto:low", // Lower quality for faster upload
          fetch_format: "auto",
        },
      ],
      timeout: 30000, // 30 seconds
      chunk_size: 500000, // 500KB chunks
    };
  },
});

module.exports = { storage, cloudinary };
