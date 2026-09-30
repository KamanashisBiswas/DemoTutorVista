import React, { createContext, useContext, useState, useEffect } from "react";
import axios from "../lib/axios";
import { toast } from "react-toastify";

const TutorAuthContext = createContext(null);

export const TutorAuthProvider = ({ children }) => {
  const [currentTutor, setCurrentTutor] = useState(() => {
    try {
      const saved = localStorage.getItem("tutor_user");
      return saved ? JSON.parse(saved) : null;
    } catch {
      return null;
    }
  });
  const [loading, setLoading] = useState(false);

  const loginWithPhone = async (phone) => {
    setLoading(true);
    try {
      const cleanPhone = phone.trim();
      const res = await axios.get(`/api/tutor/by-phone/${cleanPhone}`);

      if (res.data?.success && res.data?.data) {
        const tutorData = res.data.data;
        setCurrentTutor(tutorData);
        localStorage.setItem("tutor_user", JSON.stringify(tutorData));
        toast.success(`Welcome back, ${tutorData.name}!`);
        return { success: true, tutor: tutorData };
      } else {
        toast.error("No registered tutor account found with this phone number.");
        return { success: false, message: "Tutor not found" };
      }
    } catch (err) {
      const msg =
        err.response?.data?.message ||
        "No registered tutor account found with this phone number.";
      toast.error(msg);
      return { success: false, message: msg };
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    setCurrentTutor(null);
    localStorage.removeItem("tutor_user");
    toast.info("Logged out from Tutor Portal.");
  };

  const refreshProfile = async () => {
    if (!currentTutor?.phone) return;
    try {
      const res = await axios.get(`/api/tutor/by-phone/${currentTutor.phone}`);
      if (res.data?.success && res.data?.data) {
        setCurrentTutor(res.data.data);
        localStorage.setItem("tutor_user", JSON.stringify(res.data.data));
      }
    } catch (err) {
      console.error("Failed to refresh tutor profile:", err);
    }
  };

  return (
    <TutorAuthContext.Provider
      value={{
        currentTutor,
        isLoggedIn: !!currentTutor,
        loading,
        loginWithPhone,
        logout,
        refreshProfile,
      }}
    >
      {children}
    </TutorAuthContext.Provider>
  );
};

export const useTutorAuth = () => {
  const context = useContext(TutorAuthContext);
  if (!context) {
    throw new Error("useTutorAuth must be used within a TutorAuthProvider");
  }
  return context;
};
