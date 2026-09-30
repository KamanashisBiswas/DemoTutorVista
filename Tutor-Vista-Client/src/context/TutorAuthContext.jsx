import React, { createContext, useContext, useState, useEffect } from "react";
import ApiService from "../services/api";
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
      const res = await ApiService.getTutorByPhone(cleanPhone);

      if (res?.success && res?.data) {
        const tutorData = res.data;
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
        err.message ||
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
      const res = await ApiService.getTutorByPhone(currentTutor.phone);
      if (res?.success && res?.data) {
        setCurrentTutor(res.data);
        localStorage.setItem("tutor_user", JSON.stringify(res.data));
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
