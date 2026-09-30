// src/layouts/DashboardLayout.jsx
import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import Topbar from "../components/Topbar";

const DashboardLayout = ({ children }) => {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(
    window.innerWidth < 1024
  );
  const location = useLocation();

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 1024) {
        setIsSidebarCollapsed(true);
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const toggleSidebar = () => {
    setIsSidebarCollapsed(!isSidebarCollapsed);
  };

  return (
    <div className="flex h-screen bg-[#F7F8FB] text-[#1A1D29] font-sans antialiased overflow-hidden">
      <Sidebar
        isCollapsed={isSidebarCollapsed}
        onToggle={toggleSidebar}
        currentPath={location.pathname}
      />

      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        <Topbar
          onToggleSidebar={toggleSidebar}
          isSidebarCollapsed={isSidebarCollapsed}
        />

        <main className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8">
          <div className="container mx-auto w-full">{children}</div>
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
