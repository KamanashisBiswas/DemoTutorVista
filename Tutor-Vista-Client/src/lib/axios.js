import axios from "axios";

// =========================================================================
// 🌐 API BASE URL (Local / Live Server Toggle)
// যেটি ব্যবহার করতে চান সেটির কমেন্ট আনকমেন্ট করুন:
// =========================================================================
// const BASE_URL = "http://localhost:3000"; // 💻 Local Server
const BASE_URL = "https://tutor-vista-backend-phi.vercel.app"; // 🚀 Live Server
// =========================================================================

const instance = axios.create({
  baseURL: BASE_URL,
  timeout: 60000,
});

// Request interceptor: handle URL deduplication and auto-detect FormData
instance.interceptors.request.use(
  (config) => {
    // If baseURL ends with /api and config.url starts with /api/, strip duplicate /api
    if (config.url && config.baseURL && config.baseURL.endsWith("/api")) {
      if (config.url.startsWith("/api/")) {
        config.url = config.url.replace(/^\/api/, "");
      }
    }

    // Do NOT enforce application/json when sending FormData (allows browser to set multipart boundary)
    if (config.data instanceof FormData) {
      if (config.headers) {
        delete config.headers["Content-Type"];
      }
    } else {
      config.headers = config.headers || {};
      if (!config.headers["Content-Type"]) {
        config.headers["Content-Type"] = "application/json";
      }
    }

    return config;
  },
  (error) => Promise.reject(error)
);

export default instance;
