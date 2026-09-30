import axios from "axios";

// Determine the centralized API base URL
const getBaseURL = () => {
  const envUrl = import.meta.env.VITE_API_URL;
  if (envUrl && typeof envUrl === "string" && envUrl.trim() !== "") {
    const clean = envUrl.trim().replace(/\/+$/, "");
    return clean.endsWith("/api") ? clean : `${clean}/api`;
  }
  // Default to localhost:3000 in dev, or deployed backend in production
  return import.meta.env.DEV
    ? "http://localhost:3000/api"
    : "https://tutor-vista-backend-phi.vercel.app/api";
};

const API = axios.create({
  baseURL: getBaseURL(),
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
