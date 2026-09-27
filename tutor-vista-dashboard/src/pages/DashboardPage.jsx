// src/pages/DashboardPage.jsx
import React, { useState, useEffect } from "react";
import {
  User,
  MessageCircle,
  GraduationCap,
  Bell,
  TrendingUp,
  Clock,
  CheckCircle,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import ApiService from "../services/api";
import MaintenanceWarningModal from "../components/MaintenanceWarningModal";

const API_URL = "https://website-management-backend.vercel.app/api/websites";
const WEBSITE_ID = "tutorvista-001";

const DashboardPage = () => {
  const navigate = useNavigate();

  const [stats, setStats] = useState({
    users: 0,
    tutorRequests: 0,
    tutors: 0,
    messages: 0,
    pendingRequests: 0,
  });
  const [loading, setLoading] = useState(true);
  const [recentData, setRecentData] = useState({
    requests: [],
    tutors: [],
    messages: [],
  });
  const [showModal, setShowModal] = useState(false);
  const [website, setWebsite] = useState(null);

  useEffect(() => {
    checkBackendConnection();
    fetchDashboardData();
    checkMaintenanceStatus();
  }, []);

  const checkMaintenanceStatus = () => {
    fetch(`${API_URL}/public/${WEBSITE_ID}`)
      .then((res) => res.json())
      .then((data) => {
        // যদি backend থেকে showWarning: false আসে, তাহলে dismiss flag sessionStorage থেকে মুছে ফেলো
        if (!data.data?.showWarning) {
          sessionStorage.removeItem(`maintenance_dismissed_${WEBSITE_ID}`);
        }
        const dismissed = sessionStorage.getItem(
          `maintenance_dismissed_${WEBSITE_ID}`
        );
        if (data.data?.showWarning && !dismissed) {
          setShowModal(true);
          setWebsite(data.data);
        }
      })
      .catch(() => {});
  };

  const handleModalClose = () => {
    setShowModal(false);
    // Mark as dismissed in sessionStorage
    sessionStorage.setItem(`maintenance_dismissed_${WEBSITE_ID}`, "1");
  };

  const checkBackendConnection = async () => {
    try {
      await ApiService.healthCheck();
      console.log("✅ Backend connection successful");
    } catch (error) {
      console.warn("❌ Backend connection failed - Using demo mode");
    }
  };

  const fetchDashboardData = async () => {
    try {
      const [tutorRequestsData, tutorsData, messagesData, usersData] =
        await Promise.all([
          ApiService.getTutorRequestStats().catch((err) => {
            console.log("TutorRequestStats error:", err);
            return { data: null, stats: {} };
          }),
          ApiService.getTutorStats().catch((err) => {
            console.log("TutorStats error:", err);
            return { data: null, stats: {} };
          }),
          ApiService.getMessageStats().catch((err) => {
            console.log("MessageStats error:", err);
            return { data: null, stats: {} };
          }),
          ApiService.getAllUsers().catch((err) => {
            console.log("Users error:", err);
            return { data: null, users: [] };
          }),
        ]);

      const [recentRequests, recentTutors, recentMessages] = await Promise.all([
        ApiService.getTutorRequests({ limit: 5 }).catch((err) => {
          console.log("Recent requests error:", err);
          return { data: null, requests: [] };
        }),
        ApiService.getTutorApplications({ limit: 5 }).catch((err) => {
          console.log("Recent tutors error:", err);
          return { data: null, applications: [] };
        }),
        ApiService.getMessages({ limit: 5 }).catch((err) => {
          console.log("Recent messages error:", err);
          return { data: null, messages: [] };
        }),
      ]);

      const [allRequests, allTutors, allMessages] = await Promise.all([
        ApiService.getTutorRequests().catch(() => ({
          data: null,
          requests: [],
        })),
        ApiService.getTutorApplications().catch(() => ({
          data: null,
          applications: [],
        })),
        ApiService.getMessages().catch(() => ({ data: null, messages: [] })),
      ]);

      const calculatedStats = {
        users:
          usersData?.data?.users?.length ||
          usersData?.users?.length ||
          (Array.isArray(usersData?.data) ? usersData.data.length : 0) ||
          0,

        tutorRequests:
          tutorRequestsData?.data?.stats?.total ||
          tutorRequestsData?.stats?.total ||
          0,

        tutors: tutorsData?.data?.stats?.total || tutorsData?.stats?.total || 0,

        messages:
          messagesData?.stats?.total ||
          messagesData?.data?.total ||
          allMessages?.data?.messages?.length ||
          allMessages?.messages?.length ||
          (Array.isArray(allMessages?.data) ? allMessages.data.length : 0) ||
          0,

        pendingRequests:
          tutorRequestsData?.data?.stats?.pending ||
          tutorRequestsData?.stats?.pending ||
          0,
      };

      setStats(calculatedStats);
      setRecentData({
        requests:
          recentRequests?.data?.requests ||
          recentRequests?.requests ||
          (Array.isArray(recentRequests?.data) ? recentRequests.data : []) ||
          [],
        tutors:
          recentTutors?.data?.applications ||
          recentTutors?.applications ||
          (Array.isArray(recentTutors?.data) ? recentTutors.data : []) ||
          [],
        messages:
          recentMessages?.data?.messages ||
          recentMessages?.messages ||
          (Array.isArray(recentMessages?.data) ? recentMessages.data : []) ||
          [],
      });
    } catch (error) {
      console.error("Error fetching dashboard data:", error);
    } finally {
      setLoading(false);
    }
  };

  // Card route mapping
  const cardRoutes = ["/tutors", "/tutor-requests", "/users", "/messages"];

  const statsData = [
    {
      title: "Total Tutors",
      value: stats.tutors.toString(),
      color: "bg-purple-500",
      icon: GraduationCap,
      route: "/tutors",
    },
    {
      title: "Tutor Requests",
      value: stats.tutorRequests.toString(),
      color: "bg-green-500",
      icon: MessageCircle,
      route: "/tutor-requests",
    },
    {
      title: "Total Users",
      value: stats.users.toString(),
      color: "bg-blue-500",
      icon: User,
      route: "/users",
    },
    {
      title: "Messages",
      value: stats.messages.toString(),
      color: "bg-orange-500",
      icon: Bell,
      route: "/messages",
    },
  ];

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <MaintenanceWarningModal
        open={showModal}
        onClose={handleModalClose}
        website={website}
      />

      {/* Main Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {statsData.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <div
              key={index}
              className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-all duration-200 cursor-pointer"
              onClick={() => navigate(stat.route)}
              tabIndex={0}
              role="button"
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") navigate(stat.route);
              }}
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 font-medium">
                    {stat.title}
                  </p>
                  <div className="flex items-center mt-2">
                    <p className="text-3xl font-bold text-gray-800">
                      {stat.value}
                    </p>
                  </div>
                </div>
                <div className={`${stat.color} p-3 rounded-lg`}>
                  <Icon className="w-6 h-6 text-white" />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Tutor Requests */}
        <div
          className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 cursor-pointer"
          onClick={() => navigate("/tutor-requests")}
          tabIndex={0}
          role="button"
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") navigate("/tutor-requests");
          }}
        >
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-800">
              Recent Tutor Requests
            </h3>
            <TrendingUp className="w-5 h-5 text-blue-500" />
          </div>
          <div className="space-y-3">
            {recentData.requests.slice(0, 5).map((request, index) => (
              <div
                key={request.id || index}
                className="flex items-center p-3 bg-gray-50 rounded-lg"
              >
                <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-white text-sm font-semibold mr-3">
                  {(request.studentName || request.name || "N")?.charAt(0)}
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-900">
                    {request.studentName || request.name || "Unknown"}
                  </p>
                  <p className="text-xs text-gray-500">
                    {request.subjects?.slice(0, 2).join(", ") ||
                      request.subject ||
                      "No subjects listed"}
                  </p>
                </div>
              </div>
            ))}
            {recentData.requests.length === 0 && (
              <p className="text-gray-500 text-center py-4">
                No recent requests
              </p>
            )}
          </div>
        </div>

        {/* Recent Messages */}
        <div
          className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 cursor-pointer"
          onClick={() => navigate("/messages")}
          tabIndex={0}
          role="button"
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") navigate("/messages");
          }}
        >
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-800">
              Recent Messages
            </h3>
            <MessageCircle className="w-5 h-5 text-green-500" />
          </div>
          <div className="space-y-3">
            {recentData.messages.slice(0, 5).map((message, index) => (
              <div
                key={message.id || index}
                className="flex items-center p-3 bg-gray-50 rounded-lg"
              >
                <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center text-white text-sm font-semibold mr-3">
                  {(message.name || "N")?.charAt(0)}
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-900">
                    {message.name || "Unknown"}
                  </p>
                  <p className="text-xs text-gray-500 truncate">
                    {message.message?.substring(0, 50) || "No message content"}
                    ...
                  </p>
                </div>
                <span className="text-xs text-gray-400">
                  {message.createdAt
                    ? new Date(message.createdAt).toLocaleDateString()
                    : "Today"}
                </span>
              </div>
            ))}
            {recentData.messages.length === 0 && (
              <p className="text-gray-500 text-center py-4">
                No recent messages
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
