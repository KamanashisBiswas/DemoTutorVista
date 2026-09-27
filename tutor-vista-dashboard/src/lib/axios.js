import axios from "axios";

const API = axios.create({
  // baseURL: "https://tutor-vista-backend.vercel.app",
  // baseURL: "https://tutor-vista-backend-phi.vercel.app",
  baseURL: "http://localhost:3000",
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

// Request interceptor - automatically add token to all requests
API.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("authToken");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

// Response interceptor - handle auth errors
API.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response?.status === 401) {
      // Remove invalid token
      localStorage.removeItem("authToken");
      // Optionally redirect to login
      // window.location.href = "/login";
    }
    return Promise.reject(error);
  },
);

export default API;
