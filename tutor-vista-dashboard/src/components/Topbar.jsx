// src/components/Topbar.jsx
import React, { useState } from "react";
import { useLocation, Link } from "react-router-dom";
import { Menu, Bell, User, Settings, LogOut, Shield, ChevronDown } from "lucide-react";
import { useAuth } from "../context/AuthContext";

const Topbar = ({ onToggleSidebar, isSidebarCollapsed }) => {
  const [showProfileDropdown, setShowProfileDropdown] = useState(false);
  const location = useLocation();
  const { user, logout } = useAuth();

  const userData = user || {
    name: "Admin User",
    email: "admin@tutorvista.com",
    role: "administrator",
  };

  const getPageInfo = () => {
    switch (location.pathname) {
      case "/":
        return { title: "Dashboard Overview", section: "Operations" };
      case "/tutor-requests":
        return { title: "Tuition Requests", section: "Operations" };
      case "/tutors":
        return { title: "Tutors Directory", section: "Operations" };
      case "/applied-jobs":
        return { title: "Job Applications", section: "Operations" };
      case "/messages":
        return { title: "Inquiries & Messages", section: "Communication" };
      case "/faqs":
        return { title: "FAQs & Knowledge", section: "Content" };
      case "/users":
        return { title: "User Management", section: "Administration" };
      case "/profile":
        return { title: "Admin Profile", section: "Settings" };
      default:
        return { title: "Administration", section: "Overview" };
    }
  };

  const handleLogout = async () => {
    try {
      await logout();
      setShowProfileDropdown(false);
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  const pageInfo = getPageInfo();

  return (
    <header className="bg-white border-b border-[#E4E6EE] h-16 flex items-center justify-between px-4 sm:px-6 relative z-40 shadow-xs">
      {/* Left: Sidebar Toggle & Breadcrumb */}
      <div className="flex items-center gap-3 sm:gap-4">
        <button
          onClick={onToggleSidebar}
          aria-label="Toggle Sidebar"
          className="p-2 rounded-xl border border-[#E4E6EE] hover:bg-[#F7F8FB] text-[#5B5F73] hover:text-[#1A1D29] transition-colors"
        >
          <Menu className="w-4 h-4" />
        </button>

        <div>
          <div className="flex items-center gap-1.5 text-[11px] text-[#5B5F73] font-medium hidden sm:flex">
            <span>TutorVista Admin</span>
            <span>/</span>
            <span className="text-[#3730E0]">{pageInfo.section}</span>
          </div>
          <h1 className="text-base sm:text-lg font-bold text-[#1A1D29] tracking-tight">
            {pageInfo.title}
          </h1>
        </div>
      </div>

      {/* Right: Quick Status, Notifications & Profile Menu */}
      <div className="flex items-center gap-2 sm:gap-4">
        {/* System Status Pill */}
        <div className="hidden md:flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[#F0FDFA] text-[#0EA5A0] border border-[#CCFBF1] text-xs font-semibold">
          <span className="w-1.5 h-1.5 rounded-full bg-[#0EA5A0] animate-pulse" />
          <span>System Live</span>
        </div>

        {/* Profile Dropdown */}
        <div className="relative">
          <button
            onClick={() => setShowProfileDropdown(!showProfileDropdown)}
            className="flex items-center gap-2.5 p-1.5 rounded-xl hover:bg-[#F7F8FB] border border-transparent hover:border-[#E4E6EE] transition-all"
          >
            <div className="w-8 h-8 rounded-lg bg-[#3730E0] text-white flex items-center justify-center font-bold text-xs shadow-xs">
              {userData.name?.charAt(0).toUpperCase()}
            </div>
            <div className="hidden sm:block text-left">
              <p className="text-xs font-bold text-[#1A1D29] leading-tight">
                {userData.name}
              </p>
              <p className="text-[10px] text-[#5B5F73] capitalize leading-none mt-0.5">
                {userData.role}
              </p>
            </div>
            <ChevronDown className="w-3.5 h-3.5 text-[#5B5F73] hidden sm:block" />
          </button>

          {/* Dropdown Menu */}
          {showProfileDropdown && (
            <>
              <div
                className="fixed inset-0 z-40"
                onClick={() => setShowProfileDropdown(false)}
              />
              <div className="absolute right-0 mt-2 w-60 bg-white rounded-2xl shadow-card border border-[#E4E6EE] p-2 z-50 animate-fade-in">
                {/* User Info Header */}
                <div className="px-3 py-2.5 bg-[#F7F8FB] rounded-xl mb-1 border border-[#E4E6EE]">
                  <p className="text-xs font-bold text-[#1A1D29]">{userData.name}</p>
                  <p className="text-[11px] text-[#5B5F73] truncate">{userData.email}</p>
                  <span className="inline-flex items-center gap-1 mt-1 text-[10px] font-bold text-[#3730E0] uppercase">
                    <Shield className="w-3 h-3" />
                    Verified Admin
                  </span>
                </div>

                {/* Profile Links */}
                <Link
                  to="/profile"
                  onClick={() => setShowProfileDropdown(false)}
                  className="flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-semibold text-[#1A1D29] hover:bg-[#F7F8FB] transition-colors"
                >
                  <User className="w-4 h-4 text-[#3730E0]" />
                  <span>Account Profile</span>
                </Link>

                <div className="my-1 border-t border-[#E4E6EE]" />

                {/* Logout Button */}
                <button
                  type="button"
                  onClick={handleLogout}
                  className="w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-semibold text-[#DC2626] hover:bg-red-50 transition-colors"
                >
                  <LogOut className="w-4 h-4 text-[#DC2626]" />
                  <span>Sign Out</span>
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </header>
  );
};

export default Topbar;
