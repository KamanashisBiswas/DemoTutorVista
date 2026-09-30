// src/components/Sidebar.jsx
import React from "react";
import { Link } from "react-router-dom";
import {
  LayoutDashboard,
  ClipboardList,
  GraduationCap,
  Briefcase,
  Mail,
  HelpCircle,
  Users,
  LogOut,
  ChevronLeft,
  ChevronRight,
  Shield,
  UserCheck,
} from "lucide-react";
import { useAuth } from "../context/AuthContext";
import Logo from "../assets/Logo.svg";

const Sidebar = ({ isCollapsed, onToggle, currentPath }) => {
  const { logout, user } = useAuth();

  const navigationGroups = [
    {
      title: "Operations",
      items: [
        {
          id: "dashboard",
          label: "Dashboard",
          icon: LayoutDashboard,
          path: "/",
        },
        {
          id: "tutor-requests",
          label: "Tuition Requests",
          icon: ClipboardList,
          path: "/tutor-requests",
        },
        {
          id: "tutors",
          label: "Tutors Directory",
          icon: GraduationCap,
          path: "/tutors",
        },
        {
          id: "applied-jobs",
          label: "Job Applications",
          icon: Briefcase,
          path: "/applied-jobs",
        },
      ],
    },
    {
      title: "Communication & Content",
      items: [
        {
          id: "messages",
          label: "Inquiries & Inbox",
          icon: Mail,
          path: "/messages",
        },
        {
          id: "faqs",
          label: "FAQs & Knowledge",
          icon: HelpCircle,
          path: "/faqs",
        },
      ],
    },
    {
      title: "Administration",
      items: [
        {
          id: "users",
          label: "User Management",
          icon: Users,
          path: "/users",
        },
      ],
    },
  ];

  return (
    <>
      {/* Mobile Backdrop */}
      {!isCollapsed && (
        <div
          className="lg:hidden fixed inset-0 bg-black/40 backdrop-blur-xs z-40"
          onClick={onToggle}
        />
      )}

      {/* Main Sidebar */}
      <aside
        className={`fixed lg:static inset-y-0 left-0 z-50 bg-white border-r border-[#E4E6EE] shadow-sm transition-all duration-300 ease-in-out flex flex-col justify-between overflow-hidden ${
          isCollapsed
            ? "-translate-x-full lg:translate-x-0 lg:w-20"
            : "translate-x-0 lg:w-64"
        } w-64`}
      >
        <div>
          {/* Header Brand */}
          <div className="h-16 px-4 flex items-center justify-between border-b border-[#E4E6EE] bg-white">
            {isCollapsed ? (
              <div className="w-full flex items-center justify-center">
                <div className="w-10 h-10 rounded-xl bg-[#3730E0] text-white flex items-center justify-center font-bold text-sm shadow-xs">
                  TV
                </div>
              </div>
            ) : (
              <Link to="/" className="flex items-center gap-3">
                <img src={Logo} alt="TutorVista" className="h-8 w-auto" />
                <span className="text-[10px] font-bold uppercase tracking-wider text-[#3730E0] bg-[#EEEDFD] px-2 py-0.5 rounded-full border border-[#DDD9FC]">
                  Admin
                </span>
              </Link>
            )}

            <button
              onClick={onToggle}
              className="hidden lg:flex w-7 h-7 rounded-lg border border-[#E4E6EE] items-center justify-center text-[#5B5F73] hover:text-[#1A1D29] hover:bg-[#F7F8FB] transition-colors"
              title={isCollapsed ? "Expand Sidebar" : "Collapse Sidebar"}
            >
              {isCollapsed ? (
                <ChevronRight className="w-4 h-4" />
              ) : (
                <ChevronLeft className="w-4 h-4" />
              )}
            </button>
          </div>

          {/* Navigation Groups */}
          <nav className="p-3 space-y-6 overflow-y-auto max-h-[calc(100vh-140px)]">
            {navigationGroups.map((group, groupIdx) => (
              <div key={groupIdx} className="space-y-1">
                {!isCollapsed && (
                  <p className="px-3 text-[10px] font-bold text-[#5B5F73] uppercase tracking-wider mb-2">
                    {group.title}
                  </p>
                )}
                <ul className="space-y-1">
                  {group.items.map((item) => {
                    const Icon = item.icon;
                    const isActive =
                      currentPath === item.path ||
                      (item.path !== "/" && currentPath.startsWith(item.path));

                    return (
                      <li key={item.id}>
                        <Link
                          to={item.path}
                          onClick={() => {
                            if (window.innerWidth < 1024) {
                              onToggle();
                            }
                          }}
                          title={isCollapsed ? item.label : undefined}
                          className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all duration-150 ${
                            isActive
                              ? "bg-[#EEEDFD] text-[#3730E0] border border-[#DDD9FC] shadow-2xs"
                              : "text-[#5B5F73] hover:bg-[#F7F8FB] hover:text-[#1A1D29]"
                          } ${isCollapsed ? "justify-center" : ""}`}
                        >
                          <Icon
                            className={`w-4 h-4 shrink-0 ${
                              isActive ? "text-[#3730E0]" : "text-[#5B5F73]"
                            }`}
                          />
                          {!isCollapsed && <span>{item.label}</span>}
                        </Link>
                      </li>
                    );
                  })}
                </ul>
              </div>
            ))}
          </nav>
        </div>

        {/* Footer / Logout */}
        <div className="p-3 border-t border-[#E4E6EE] bg-white">
          <button
            onClick={logout}
            title={isCollapsed ? "Logout" : undefined}
            className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs sm:text-sm font-semibold text-[#DC2626] hover:bg-red-50 transition-colors ${
              isCollapsed ? "justify-center" : ""
            }`}
          >
            <LogOut className="w-4 h-4 shrink-0 text-[#DC2626]" />
            {!isCollapsed && <span>Log Out</span>}
          </button>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
