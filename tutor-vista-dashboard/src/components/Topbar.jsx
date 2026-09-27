// src/components/Topbar.jsx
import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import { Menu, Bell } from "lucide-react";
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

  const getPageTitle = () => {
    switch (location.pathname) {
      case "/":
        return "Dashboard";
      case "/tutor-requests":
        return "Tutor Requests";
      case "/tutors":
        return "Tutors";
      case "/messages":
        return "Messages";
      case "/faqs":
        return "FAQs";
      case "/users":
        return "Users";
      case "/profile":
        return "Profile";
      default:
        return "Dashboard";
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

  return (
    <>
      <header className="bg-white shadow-sm border-b border-gray-200 h-16 flex items-center justify-between px-6 relative z-50">
        {/* Left - Menu + Page Title */}
        <div className="flex items-center space-x-4">
          <button
            onClick={onToggleSidebar}
            className="p-2 rounded-lg hover:bg-gray-100 transition-colors duration-200"
          >
            <Menu className="w-5 h-5 text-gray-600" />
          </button>
          <div className="hidden md:block">
            <h2 className="text-xl font-semibold text-gray-800">
              {getPageTitle()}
            </h2>
          </div>
        </div>

        {/* Right - Notifications & Profile */}
        <div className="flex items-center space-x-4">
          <div className="relative">
            <button
              onClick={() => setShowProfileDropdown(!showProfileDropdown)}
              className="flex items-center space-x-3 p-2 rounded-lg hover:bg-gray-100 transition-colors duration-200"
            >
              <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white font-semibold">
                {userData.name?.charAt(0).toUpperCase()}
              </div>
              <span className="hidden md:block font-medium text-gray-700">
                {userData.name}
              </span>
            </button>

            {/* Dropdown */}
            {showProfileDropdown && (
              <>
                <div className="absolute right-0 mt-2 w-64 bg-white rounded-xl shadow-lg border border-gray-200 py-2 z-[60]">
                  {/* User Info */}
                  <div className="px-4 py-3 border-b border-gray-100">
                    <div className="flex items-center space-x-3">
                      <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white font-bold">
                        {userData.name?.charAt(0).toUpperCase()}
                      </div>
                      <div>
                        <p className="font-semibold text-gray-800">
                          {userData.name}
                        </p>
                        <p className="text-sm text-gray-600">
                          {userData.email}
                        </p>
                        <p className="text-xs text-blue-600 font-medium capitalize">
                          {userData.role}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Logout */}
                  <div className="py-2">
                    <button
                      onClick={handleLogout}
                      type="button"
                      className="w-full text-left px-4 py-2 hover:bg-red-50 flex items-center space-x-3 text-red-600 transition-colors duration-200"
                    >
                      <svg
                        className="w-4 h-4"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                        />
                      </svg>
                      <span className="font-medium">Logout</span>
                    </button>
                  </div>
                </div>

                {/* Overlay */}
                <div
                  className="fixed inset-0 z-40"
                  onClick={() => setShowProfileDropdown(false)}
                />
              </>
            )}
          </div>
        </div>
      </header>
    </>
  );
};

export default Topbar;
