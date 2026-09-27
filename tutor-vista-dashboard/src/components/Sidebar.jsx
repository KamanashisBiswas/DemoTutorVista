// src/components/Sidebar.jsx
import React from "react";
import {
  Home,
  MessageCircle,
  GraduationCap,
  LogOut,
  Mail,
  HelpCircle,
  Users,
} from "lucide-react";
import { useAuth } from "../context/AuthContext";
import Logo from "../assets/Logo.svg";

const Sidebar = ({ isCollapsed, onToggle, currentPath }) => {
  const { logout } = useAuth();

  const navigationItems = [
    { id: "dashboard", label: "Dashboard", icon: Home, path: "/" },
    {
      id: "tutor-requests",
      label: "Tutor Requests",
      icon: MessageCircle,
      path: "/tutor-requests",
    },
    {
      id: "tutors",
      label: "Tutors List",
      icon: GraduationCap,
      path: "/tutors",
    },
    {
      id: "applied-jobs",
      label: "Applied Jobs",
      icon: Users,
      path: "/applied-jobs",
    },
    { id: "messages", label: "Messages", icon: Mail, path: "/messages" },
    { id: "faqs", label: "FAQs", icon: HelpCircle, path: "/faqs" },
    { id: "users", label: "Users", icon: Users, path: "/users" },
  ];

  return (
    <>
      {/* Mobile Overlay - শুধু mobile এ show হবে যখন sidebar open */}
      {!isCollapsed && (
        <div
          className="lg:hidden fixed inset-0 bg-black bg-opacity-50 z-40"
          onClick={onToggle}
        />
      )}

      {/* Sidebar */}
      <div
        className={`fixed lg:static inset-y-0 left-0 z-50 bg-white shadow-xl transition-all duration-300 ease-in-out flex flex-col border-r border-gray-200 transform overflow-hidden
          ${
            isCollapsed
              ? "-translate-x-full lg:translate-x-0 lg:w-16"
              : "translate-x-0 lg:w-64"
          } w-64`}
      >
        {/* Logo Section */}
        <div className="flex items-center justify-center h-20 border-b border-gray-200 bg-gradient-to-r from-blue-300 to-purple-400 flex-shrink-0">
          {isCollapsed ? (
            // Collapsed: desktop icon-only; mobile hidden because sidebar is off-screen
            <div className="hidden lg:flex w-8 h-8 bg-white rounded-lg items-center justify-center">
              <Home className="w-5 h-5 text-blue-600" />
            </div>
          ) : (
            // Expanded: show full logo (mobile & desktop)
            <div className="flex items-center space-x-2">
              <img className="w-16 h-16" src={Logo} alt="Logo" />
              <h2 className="font-bold text-lg text-white">Tutor Vista</h2>
            </div>
          )}
        </div>

        {/* Navigation */}
        <nav className="flex-1 py-6 overflow-y-auto">
          <ul className="space-y-2 px-3">
            {navigationItems.map((item) => {
              const Icon = item.icon;
              const isActive = currentPath === item.path;

              return (
                <li key={item.id}>
                  <a
                    href={item.path}
                    onClick={() => {
                      // Mobile এ link click করলে sidebar close হবে
                      if (window.innerWidth < 1024) {
                        onToggle();
                      }
                    }}
                    className={`w-full flex items-center px-3 py-3 rounded-lg transition-all duration-200 group ${
                      isActive
                        ? "bg-gradient-to-r from-blue-500 to-purple-500 text-white shadow-lg"
                        : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"
                    }`}
                  >
                    <Icon
                      className={`w-5 h-5 flex-shrink-0 ${
                        isCollapsed ? "lg:mx-auto lg:mr-0" : "lg:mr-3"
                      } mr-3`}
                    />
                    <span
                      className={`font-medium ${
                        isCollapsed ? "lg:hidden" : ""
                      }`}
                    >
                      {item.label}
                    </span>
                  </a>
                </li>
              );
            })}
          </ul>
        </nav>

        {/* Logout Button */}
        <div className="p-3 border-t border-gray-200 flex-shrink-0">
          <button
            onClick={logout}
            className="w-full flex items-center px-3 py-3 rounded-lg text-red-600 hover:bg-red-50 transition-all duration-200 group"
          >
            <LogOut
              className={`w-5 h-5 flex-shrink-0 ${
                isCollapsed ? "lg:mx-auto lg:mr-0" : "lg:mr-3"
              } mr-3`}
            />
            <span className={`font-medium ${isCollapsed ? "lg:hidden" : ""}`}>
              Logout
            </span>
          </button>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
