import axios from "axios";

const instance = axios.create({
  // baseURL: "http://localhost:3000",
  baseURL: "tutor-vista-backend-phi.vercel.app",
  timeout: 60000,
  headers: { "Content-Type": "application/json" },
});

export default instance;
