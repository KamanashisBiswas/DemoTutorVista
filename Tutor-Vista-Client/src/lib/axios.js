import axios from "axios";

const instance = axios.create({
  // baseURL: "https://tutor-vista-backend.vercel.app",
  // baseURL: "https://tutor-vista-backend-phi.vercel.app",
  baseURL: "http://localhost:3000",
  timeout: 60000,
  headers: { "Content-Type": "application/json" },
});

export default instance;
