// src/routes/PrivateRoute.jsx
import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import Logo from "../assets/Logo.svg";
import { Shield } from "lucide-react";

const PrivateRoute = ({ children }) => {
  const { isAuthenticated, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen bg-[#F7F8FB] flex flex-col items-center justify-center p-4">
        <div className="bg-white p-8 rounded-2xl border border-[#E4E6EE] shadow-md max-w-sm w-full text-center animate-fade-in">
          <div className="flex justify-center mb-5">
            <img src={Logo} alt="TutorVista" className="h-10 w-auto" />
          </div>

          <div className="relative w-12 h-12 mx-auto mb-4">
            <div className="w-12 h-12 rounded-full border-3 border-[#3730E0]/15 border-t-[#3730E0] animate-spin" />
            <div className="absolute inset-0 flex items-center justify-center text-[#3730E0]">
              <Shield className="w-5 h-5" />
            </div>
          </div>

          <h3 className="text-base font-bold text-[#1A1D29] mb-1">
            Verifying Session
          </h3>
          <p className="text-xs text-[#5B5F73]">
            Securing administrative access...
          </p>
        </div>
      </div>
    );
  }

  return isAuthenticated ? children : <Navigate to="/login" replace />;
};

export default PrivateRoute;
