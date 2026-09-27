// const express = require("express");
// const cors = require("cors");
// require("dotenv").config();

// // Import configurations and middleware
// const connectDB = require("./config/database");
// const errorHandler = require("./middleware/errorHandler");

// // Import routes
// const authRoutes = require("./routes/auth");
// const userRoutes = require("./routes/user");
// const tutorRoutes = require("./routes/tutor");
// const requestTutorRoutes = require("./routes/requestTutor");
// const messageRoutes = require("./routes/message");
// const faqRoutes = require("./routes/faq"); // FAQ routes

// const app = express();

// // Connect to MongoDB
// connectDB();

// // Middleware
// app.use(
//   cors({
//     origin: "*",
//   })
// );
// app.use(express.json({ limit: "10mb" }));
// app.use(express.urlencoded({ extended: true }));

// // Routes
// app.use("/api/auth", authRoutes);
// app.use("/api/user", userRoutes);
// app.use("/api/tutor", tutorRoutes);
// app.use("/api/request-tutor", requestTutorRoutes);
// app.use("/api/message", messageRoutes);
// app.use("/api/faq", faqRoutes); // FAQ routes

// // Health check endpoint
// app.get("/api/health", (req, res) => {
//   res.status(200).json({
//     success: true,
//     message: "Server is running",
//     timestamp: new Date().toISOString(),
//   });
// });

// // Error handling middleware (should be last)
// app.use(errorHandler);

// const PORT = process.env.PORT || 3000;

// app.listen(PORT, () => {
//   console.log(`🚀 Server running on port ${PORT}`);
//   console.log(`🌍 Environment: ${process.env.NODE_ENV}`);
// });

// module.exports = app;

const dns = require("dns");
dns.setDefaultResultOrder("ipv4first");
dns.setServers(["8.8.8.8", "1.1.1.1"]);

const express = require("express");
const cors = require("cors");
require("dotenv").config();

// Import configurations and middleware
const connectDB = require("./config/database");
const errorHandler = require("./middleware/errorHandler");

// Import routes
const authRoutes = require("./routes/auth");
const userRoutes = require("./routes/user");
const tutorRoutes = require("./routes/tutor");
const requestTutorRoutes = require("./routes/requestTutor");
const messageRoutes = require("./routes/message");
const faqRoutes = require("./routes/faq"); // FAQ routes
const appliedJobRoutes = require("./routes/appliedJob"); // Applied Job routes

const app = express();

// Connect to MongoDB
connectDB();

// CORS Configuration - Updated to include multiple frontend ports
const allowedOrigins = [
  "http://www.tutorvistabd.com",
  "https://www.tutorvistabd.com",
  "http://tutorvistabd.com",
  "https://tutorvistabd.com",
  "http://www.admin.tutorvistabd.com",
  "https://www.admin.tutorvistabd.com",
  "http://admin.tutorvistabd.com",
  "https://admin.tutorvistabd.com",
  "http://localhost:5173",
  "http://localhost:5174",
  "https://fluffy-dasik-5aed6e.netlify.app",
  "https://celadon-torrone-4accf0.netlify.app",
];

const corsOptions = {
  origin: function (origin, callback) {
    if (!origin) return callback(null, true);
    if (allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS", "PATCH"],
  allowedHeaders: [
    "Content-Type",
    "Authorization",
    "X-Requested-With",
    "Accept",
    "Origin",
  ],
  optionsSuccessStatus: 200,
};

// Middleware
app.use(cors(corsOptions));
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ extended: true, limit: "50mb" }));

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/user", userRoutes);
app.use("/api/tutor", tutorRoutes);
app.use("/api/request-tutor", requestTutorRoutes);
app.use("/api/message", messageRoutes);
app.use("/api/faq", faqRoutes); // FAQ routes
app.use("/api/applied-job", appliedJobRoutes); // Applied Job routes

// Health check endpoint
app.get("/api/health", (req, res) => {
  res.status(200).json({
    success: true,
    message: "Server is running",
    timestamp: new Date().toISOString(),
  });
});

// Error handling middleware (should be last)
app.use(errorHandler);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
  console.log(`🌍 Environment: ${process.env.NODE_ENV}`);
  console.log(`✅ CORS enabled for development ports: 5000, 5173, 3000`);
});

module.exports = app;
