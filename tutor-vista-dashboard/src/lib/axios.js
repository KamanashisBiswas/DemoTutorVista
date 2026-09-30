import axios from "axios";

// =========================================================================
// 🌐 API BASE URL (Local / Live Server Toggle)
// যেটি ব্যবহার করতে চান সেটির কমেন্ট আনকমেন্ট করুন (No .env needed):
// =========================================================================
// const BASE_URL = "http://localhost:3000/api"; // 💻 Local Server
const BASE_URL = "https://tutor-vista-backend-phi.vercel.app/api"; // 🚀 Live Server
// =========================================================================

const getBaseURL = () => BASE_URL;

const API = axios.create({
  baseURL: BASE_URL,
  timeout: 60000,
});

// Request interceptor - automatically add token and handle URL deduplication
API.interceptors.request.use(
  (config) => {
    // If baseURL ends with /api and config.url starts with /api/, strip leading /api
    if (config.url && config.baseURL && config.baseURL.endsWith("/api")) {
      if (config.url.startsWith("/api/")) {
        config.url = config.url.replace(/^\/api/, "");
      } else if (config.url === "/api") {
        config.url = "/";
      }
    }

    const token = localStorage.getItem("authToken");
    if (token) {
      config.headers = config.headers || {};
      config.headers.Authorization = `Bearer ${token}`;
    }

    // Allow multipart/form-data when data is FormData
    if (config.data instanceof FormData) {
      delete config.headers["Content-Type"];
    } else if (!config.headers["Content-Type"]) {
      config.headers["Content-Type"] = "application/json";
    }

    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor - handle unauthorized (401)
API.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem("authToken");
    }
    return Promise.reject(error);
  }
);

export default API;
export { getBaseURL };
