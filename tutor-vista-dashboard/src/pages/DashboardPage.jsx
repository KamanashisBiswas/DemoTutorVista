// src/pages/DashboardPage.jsx
import React, { useState, useEffect } from "react";
import {
  Users,
  GraduationCap,
  ClipboardList,
  Mail,
  ArrowRight,
  TrendingUp,
  Clock,
  CheckCircle2,
  Sparkles,
  ShieldCheck,
  PlusCircle,
  Search,
} from "lucide-react";
import { useNavigate, Link } from "react-router-dom";
import ApiService from "../services/api";
import MaintenanceWarningModal from "../components/MaintenanceWarningModal";
import { Card } from "../components/ui/Card";
import { Button } from "../components/ui/Button";
import { Badge } from "../components/ui/Badge";
import { SkeletonCard } from "../components/ui/Skeleton";

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
          ApiService.getTutorRequestStats().catch(() => ({ data: null, stats: {} })),
          ApiService.getTutorStats().catch(() => ({ data: null, stats: {} })),
          ApiService.getMessageStats().catch(() => ({ data: null, stats: {} })),
          ApiService.getAllUsers().catch(() => ({ data: null, users: [] })),
        ]);

      const [recentRequests, recentTutors, recentMessages] = await Promise.all([
        ApiService.getTutorRequests({ limit: 5 }).catch(() => ({ data: null, requests: [] })),
        ApiService.getTutorApplications({ limit: 5 }).catch(() => ({ data: null, applications: [] })),
        ApiService.getMessages({ limit: 5 }).catch(() => ({ data: null, messages: [] })),
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
          (Array.isArray(recentMessages?.data?.messages) ? recentMessages.data.messages.length : 0) ||
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

  const statCards = [
    {
      title: "Active Tutors",
      value: stats.tutors,
      subtitle: "Verified educators in roster",
      icon: GraduationCap,
      color: "text-[#3730E0]",
      bg: "bg-[#EEEDFD]",
      route: "/tutors",
    },
    {
      title: "Tuition Requests",
      value: stats.tutorRequests,
      subtitle: `${stats.pendingRequests} pending assignment`,
      icon: ClipboardList,
      color: "text-[#0EA5A0]",
      bg: "bg-[#F0FDFA]",
      route: "/tutor-requests",
      badge: stats.pendingRequests > 0 ? `${stats.pendingRequests} Pending` : null,
    },
    {
      title: "Total Registered Users",
      value: stats.users,
      subtitle: "Platform accounts active",
      icon: Users,
      color: "text-[#16A34A]",
      bg: "bg-[#DCFCE7]",
      route: "/users",
    },
    {
      title: "Inbox Inquiries",
      value: stats.messages,
      subtitle: "Direct user messages",
      icon: Mail,
      color: "text-[#F5A524]",
      bg: "bg-[#FFFBEB]",
      route: "/messages",
    },
  ];

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
          {Array.from({ length: 4 }).map((_, i) => (
            <SkeletonCard key={i} className="h-32" />
          ))}
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <SkeletonCard className="h-72" />
          <SkeletonCard className="h-72" />
        </div>
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

      {/* Welcome Hero Banner */}
      <div className="bg-white rounded-2xl border border-[#E4E6EE] p-6 sm:p-8 shadow-xs relative overflow-hidden flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="relative z-10 max-w-xl">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#EEEDFD] text-[#3730E0] text-xs font-bold mb-3 border border-[#DDD9FC]">
            <Sparkles className="w-3.5 h-3.5" />
            <span>TutorVista Management Portal</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-extrabold text-[#1A1D29] tracking-tight">
            Administrative Control Center
          </h2>
          <p className="text-xs sm:text-sm text-[#5B5F73] mt-1 leading-relaxed">
            Monitor real-time tutor verification, dispatch tuition matches, and govern platform inquiries from one unified dashboard.
          </p>
        </div>

        <div className="relative z-10 flex flex-wrap gap-2.5">
          <Button
            variant="secondary"
            size="sm"
            onClick={() => navigate("/tutor-requests")}
            iconLeft={ClipboardList}
          >
            Review Requests
          </Button>
          <Button
            variant="primary"
            size="sm"
            onClick={() => navigate("/tutors")}
            iconLeft={GraduationCap}
          >
            Manage Tutors
          </Button>
        </div>
      </div>

      {/* KPI Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {statCards.map((card, idx) => {
          const Icon = card.icon;
          return (
            <div
              key={idx}
              onClick={() => navigate(card.route)}
              className="bg-white rounded-2xl border border-[#E4E6EE] p-5 shadow-xs hover:shadow-card hover:border-[#3730E0]/30 transition-all cursor-pointer group flex flex-col justify-between"
            >
              <div className="flex items-start justify-between">
                <div>
                  <span className="text-xs font-semibold text-[#5B5F73]">
                    {card.title}
                  </span>
                  <div className="text-2xl sm:text-3xl font-extrabold text-[#1A1D29] mt-1.5 tracking-tight group-hover:text-[#3730E0] transition-colors">
                    {card.value}
                  </div>
                </div>
                <div className={`w-11 h-11 rounded-xl ${card.bg} ${card.color} flex items-center justify-center shrink-0 shadow-2xs`}>
                  <Icon className="w-5 h-5" />
                </div>
              </div>

              <div className="mt-4 pt-3 border-t border-[#E4E6EE] flex items-center justify-between text-xs">
                <span className="text-[#5B5F73] truncate">{card.subtitle}</span>
                <ArrowRight className="w-3.5 h-3.5 text-[#5B5F73] group-hover:text-[#3730E0] group-hover:translate-x-0.5 transition-all" />
              </div>
            </div>
          );
        })}
      </div>

      {/* Operational Highlights / Activity Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Tuition Requests */}
        <div className="bg-white rounded-2xl border border-[#E4E6EE] shadow-xs p-6 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pb-4 border-b border-[#E4E6EE] mb-4">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-[#0EA5A0]/10 text-[#0EA5A0] flex items-center justify-center">
                  <ClipboardList className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-sm sm:text-base font-bold text-[#1A1D29]">
                    Recent Tuition Requests
                  </h3>
                  <p className="text-[11px] text-[#5B5F73]">Latest student tuition applications</p>
                </div>
              </div>
              <Link
                to="/tutor-requests"
                className="text-xs font-bold text-[#3730E0] hover:underline flex items-center gap-1"
              >
                <span>View All</span>
                <ArrowRight className="w-3 h-3" />
              </Link>
            </div>

            <div className="space-y-3">
              {recentData.requests.slice(0, 5).map((req, i) => (
                <div
                  key={req._id || i}
                  onClick={() => navigate("/tutor-requests")}
                  className="flex items-center justify-between p-3 rounded-xl bg-[#F7F8FB] border border-[#E4E6EE] hover:border-[#3730E0]/30 hover:bg-white transition-all cursor-pointer"
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <div className="w-8 h-8 rounded-lg bg-[#3730E0]/10 text-[#3730E0] flex items-center justify-center font-bold text-xs shrink-0">
                      {(req.studentName || "S").charAt(0).toUpperCase()}
                    </div>
                    <div className="min-w-0">
                      <p className="text-xs font-bold text-[#1A1D29] truncate">
                        {req.studentName || "Student Request"}
                      </p>
                      <p className="text-[11px] text-[#5B5F73] truncate">
                        {req.grade || req.class || "General"} • {req.district || req.area || "Location N/A"}
                      </p>
                    </div>
                  </div>

                  <span className="text-[11px] font-semibold text-[#3730E0] bg-[#EEEDFD] px-2.5 py-1 rounded-md shrink-0">
                    ৳{req.salary || "N/A"}
                  </span>
                </div>
              ))}

              {recentData.requests.length === 0 && (
                <div className="text-center py-8 text-xs text-[#5B5F73]">
                  No recent tuition requests found.
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Recent Inquiries & Messages */}
        <div className="bg-white rounded-2xl border border-[#E4E6EE] shadow-xs p-6 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pb-4 border-b border-[#E4E6EE] mb-4">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-[#F5A524]/10 text-[#F5A524] flex items-center justify-center">
                  <Mail className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-sm sm:text-base font-bold text-[#1A1D29]">
                    Recent Inquiries
                  </h3>
                  <p className="text-[11px] text-[#5B5F73]">Contact form submissions</p>
                </div>
              </div>
              <Link
                to="/messages"
                className="text-xs font-bold text-[#3730E0] hover:underline flex items-center gap-1"
              >
                <span>Go to Inbox</span>
                <ArrowRight className="w-3 h-3" />
              </Link>
            </div>

            <div className="space-y-3">
              {recentData.messages.slice(0, 5).map((msg, i) => (
                <div
                  key={msg._id || i}
                  onClick={() => navigate("/messages")}
                  className="flex items-center justify-between p-3 rounded-xl bg-[#F7F8FB] border border-[#E4E6EE] hover:border-[#3730E0]/30 hover:bg-white transition-all cursor-pointer"
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <div className="w-8 h-8 rounded-lg bg-[#16A34A]/10 text-[#16A34A] flex items-center justify-center font-bold text-xs shrink-0">
                      {(msg.name || "U").charAt(0).toUpperCase()}
                    </div>
                    <div className="min-w-0">
                      <p className="text-xs font-bold text-[#1A1D29] truncate">
                        {msg.name || "Anonymous"}
                      </p>
                      <p className="text-[11px] text-[#5B5F73] truncate">
                        {msg.message || "No content"}
                      </p>
                    </div>
                  </div>

                  <span className="text-[10px] text-[#5B5F73] shrink-0">
                    {msg.createdAt
                      ? new Date(msg.createdAt).toLocaleDateString("en-GB", {
                          day: "numeric",
                          month: "short",
                        })
                      : "Recently"}
                  </span>
                </div>
              ))}

              {recentData.messages.length === 0 && (
                <div className="text-center py-8 text-xs text-[#5B5F73]">
                  No recent messages in inbox.
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
