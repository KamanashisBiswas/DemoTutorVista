import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import router from "./routes/Routes.jsx";
import { RouterProvider } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { TutorAuthProvider } from "./context/TutorAuthContext";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <TutorAuthProvider>
      <RouterProvider router={router} />
      <ToastContainer position="top-right" autoClose={1000} />
    </TutorAuthProvider>
  </StrictMode>
);
