import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useTutorAuth } from "../context/TutorAuthContext";
import axios from "../lib/axios";
import {
  GraduationCap,
  Briefcase,
  MapPin,
  Clock,
  BookOpen,
  Calendar,
  ShieldCheck,
  CheckCircle2,
  AlertCircle,
  LogOut,
  RefreshCw,
  Search,
  ExternalLink,
  ChevronRight,
  User,
  Sparkles,
  Phone,
  Mail,
  Award,
} from "lucide-react";
import { Card } from "../components/ui/Card";
import { Button } from "../components/ui/Button";
import { Badge } from "../components/ui/Badge";
import { SkeletonCard } from "../components/ui/Skeleton";
import { EmptyState } from "../components/ui/EmptyState";
import { toast } from "react-toastify";

const TutorPortalPage = () => {
  const navigate = useNavigate();
  const { currentTutor, isLoggedIn, logout, refreshProfile } = useTutorAuth();

  const [activeTab, setActiveTab] = useState("applications");
  const [appliedJobs, setAppliedJobs] = useState([]);
  const [loadingJobs, setLoadingJobs] = useState(true);
  const [matchedJobs, setMatchedJobs] = useState([]);
  const [loadingMatches, setLoadingMatches] = useState(false);

  useEffect(() => {
    if (!isLoggedIn || !currentTutor) {
      navigate("/tutor-login");
      return;
    }
    fetchAppliedJobs();
    fetchMatchedJobs();
  }, [isLoggedIn, currentTutor, navigate]);

  const fetchAppliedJobs = async () => {
    if (!currentTutor?._id) return;
    setLoadingJobs(true);
    try {
      const res = await axios.get(`/api/applied-job/tutor/${currentTutor._id}`);
      if (res.data?.success) {
        setAppliedJobs(res.data.data || []);
      }
    } catch {
      // Fallback: fetch all and filter client side if backend route is not ready
      try {
        const allRes = await axios.get("/api/applied-job");
        if (allRes.data?.data) {
          const myJobs = allRes.data.data.filter(
            (j) =>
              j.tutorId?._id === currentTutor._id ||
              j.tutorId === currentTutor._id
          );
          setAppliedJobs(myJobs);
        }
      } catch (err) {
        console.error("Failed to load applied jobs:", err);
      }
    } finally {
      setLoadingJobs(false);
    }
  };

  const fetchMatchedJobs = async () => {
    if (!currentTutor?.division) return;
    setLoadingMatches(true);
    try {
      const res = await axios.get(
        `/api/request-tutor/approved?division=${currentTutor.division}&limit=6`
      );
      if (res.data?.success) {
        setMatchedJobs(res.data.data?.slice(0, 6) || []);
      }
    } catch (err) {
      console.error("Failed to load matched jobs:", err);
    } finally {
      setLoadingMatches(false);
    }
  };

  if (!isLoggedIn || !currentTutor) {
    return null;
  }

  // Calculate profile completion score
  const calculateProfileScore = () => {
    let score = 30; // base for registration
    if (currentTutor.profileImage?.url) score += 15;
    if (currentTutor.educationDocument?.url) score += 20;
    if (currentTutor.nidFrontImage?.url || currentTutor.birthCertificateImage?.url)
      score += 15;
    if (currentTutor.preferredSubjects?.length > 0) score += 10;
    if (currentTutor.educationSections?.length > 0) score += 10;
    return Math.min(score, 100);
  };

  const profileScore = calculateProfileScore();

  // Status badge helper
  const getStatusBadge = (status = "pending") => {
    switch (status.toLowerCase()) {
      case "shortlisted":
        return <Badge variant="success">Shortlisted for Interview</Badge>;
      case "selected":
        return <Badge variant="primary">Selected & Confirmed</Badge>;
      case "rejected":
        return <Badge variant="danger">Not Selected</Badge>;
      default:
        return <Badge variant="warning">Under Review</Badge>;
    }
  };

  return (
    <div className="min-h-screen bg-[#F7F8FB] py-10 font-sans">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        {/* Tutor Top Profile Header */}
        <div className="bg-white rounded-lg shadow-card border border-[#E4E6EE] p-6 sm:p-8">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            {/* Left: Avatar & Info */}
            <div className="flex items-start gap-4 sm:gap-5">
              <div className="relative shrink-0">
                <div className="w-18 h-18 sm:w-20 sm:h-20 rounded-full overflow-hidden border-2 border-[#3730E0] bg-[#EEEDFD] flex items-center justify-center text-[#3730E0]">
                  {currentTutor.profileImage?.url ? (
                    <img
                      src={currentTutor.profileImage.url}
                      alt={currentTutor.name}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <User className="w-10 h-10" />
                  )}
                </div>
                <div
                  className="absolute -bottom-1 -right-1 w-6 h-6 rounded-full bg-[#16A34A] text-white flex items-center justify-center border-2 border-white shadow-xs"
                  title="Verified Tutor Account"
                >
                  <ShieldCheck className="w-3.5 h-3.5" />
                </div>
              </div>

              <div className="space-y-1.5">
                <div className="flex flex-wrap items-center gap-2.5">
                  <h1 className="text-xl sm:text-2xl font-bold text-[#1A1D29]">
                    {currentTutor.name}
                  </h1>
                  <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-[#F0FDFA] text-[#0EA5A0] border border-[#CCFBF1]">
                    <ShieldCheck className="w-3 h-3" />
                    <span>Registered Tutor</span>
                  </span>
                </div>

                <div className="flex flex-wrap items-center gap-4 text-xs sm:text-sm text-[#5B5F73]">
                  <span className="flex items-center gap-1.5">
                    <Phone className="w-3.5 h-3.5 text-[#3730E0]" />
                    <span>{currentTutor.phone}</span>
                  </span>
                  <span className="flex items-center gap-1.5">
                    <Mail className="w-3.5 h-3.5 text-[#3730E0]" />
                    <span>{currentTutor.email}</span>
                  </span>
                  <span className="flex items-center gap-1.5">
                    <MapPin className="w-3.5 h-3.5 text-[#0EA5A0]" />
                    <span>
                      {currentTutor.thana}, {currentTutor.district}
                    </span>
                  </span>
                </div>
              </div>
            </div>

            {/* Right: Actions & Logout */}
            <div className="flex items-center gap-3">
              <Button
                variant="secondary"
                size="sm"
                onClick={fetchAppliedJobs}
                iconLeft={RefreshCw}
                className="text-xs"
              >
                Refresh
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={logout}
                iconLeft={LogOut}
                className="text-xs text-[#DC2626] border-[#DC2626]/30 hover:bg-[#FEF2F2]"
              >
                Logout
              </Button>
            </div>
          </div>

          {/* Profile Completion Bar */}
          <div className="mt-6 pt-6 border-t border-[#E4E6EE] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="space-y-1 flex-1">
              <div className="flex items-center justify-between text-xs font-semibold text-[#1A1D29]">
                <span>Profile Completion Score</span>
                <span className="text-[#3730E0]">{profileScore}%</span>
              </div>
              <div className="w-full bg-[#E4E6EE] h-2 rounded-full overflow-hidden">
                <div
                  className="bg-[#3730E0] h-full rounded-full transition-all duration-500"
                  style={{ width: `${profileScore}%` }}
                />
              </div>
            </div>
            <p className="text-[11px] text-[#5B5F73] shrink-0 sm:max-w-xs">
              Complete certificates & document uploads to rank higher in guardian searches.
            </p>
          </div>
        </div>

        {/* Metric Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
          <Card className="p-4 sm:p-5 bg-white border-[#E4E6EE]">
            <span className="text-[11px] font-bold text-[#5B5F73] uppercase tracking-wider">
              Total Applications
            </span>
            <div className="text-2xl sm:text-3xl font-extrabold text-[#1A1D29] mt-1">
              {appliedJobs.length}
            </div>
            <span className="text-[11px] text-[#5B5F73] mt-1 block">
              Tuition jobs applied
            </span>
          </Card>

          <Card className="p-4 sm:p-5 bg-white border-[#E4E6EE]">
            <span className="text-[11px] font-bold text-[#F5A524] uppercase tracking-wider">
              Under Review
            </span>
            <div className="text-2xl sm:text-3xl font-extrabold text-[#1A1D29] mt-1">
              {
                appliedJobs.filter(
                  (j) => !j.status || j.status.toLowerCase() === "pending"
                ).length
              }
            </div>
            <span className="text-[11px] text-[#5B5F73] mt-1 block">
              Awaiting admin match
            </span>
          </Card>

          <Card className="p-4 sm:p-5 bg-white border-[#E4E6EE]">
            <span className="text-[11px] font-bold text-[#16A34A] uppercase tracking-wider">
              Shortlisted
            </span>
            <div className="text-2xl sm:text-3xl font-extrabold text-[#16A34A] mt-1">
              {
                appliedJobs.filter(
                  (j) => j.status?.toLowerCase() === "shortlisted"
                ).length
              }
            </div>
            <span className="text-[11px] text-[#5B5F73] mt-1 block">
              Interview scheduled
            </span>
          </Card>

          <Card className="p-4 sm:p-5 bg-white border-[#E4E6EE]">
            <span className="text-[11px] font-bold text-[#3730E0] uppercase tracking-wider">
              Expected Salary
            </span>
            <div className="text-xl sm:text-2xl font-extrabold text-[#3730E0] mt-1 truncate">
              {currentTutor.expectedSalary
                ? `৳${currentTutor.expectedSalary}`
                : "Negotiable"}
            </div>
            <span className="text-[11px] text-[#5B5F73] mt-1 block">
              Monthly rate
            </span>
          </Card>
        </div>

        {/* Tab Navigation */}
        <div className="flex border-b border-[#E4E6EE] space-x-6 text-sm font-semibold">
          <button
            onClick={() => setActiveTab("applications")}
            className={`pb-3 border-b-2 transition-colors flex items-center gap-2 ${
              activeTab === "applications"
                ? "border-[#3730E0] text-[#3730E0]"
                : "border-transparent text-[#5B5F73] hover:text-[#1A1D29]"
            }`}
          >
            <Briefcase className="w-4 h-4" />
            <span>My Applications ({appliedJobs.length})</span>
          </button>

          <button
            onClick={() => setActiveTab("profile")}
            className={`pb-3 border-b-2 transition-colors flex items-center gap-2 ${
              activeTab === "profile"
                ? "border-[#3730E0] text-[#3730E0]"
                : "border-transparent text-[#5B5F73] hover:text-[#1A1D29]"
            }`}
          >
            <User className="w-4 h-4" />
            <span>Profile & Teaching Preferences</span>
          </button>

          <button
            onClick={() => setActiveTab("matches")}
            className={`pb-3 border-b-2 transition-colors flex items-center gap-2 ${
              activeTab === "matches"
                ? "border-[#3730E0] text-[#3730E0]"
                : "border-transparent text-[#5B5F73] hover:text-[#1A1D29]"
            }`}
          >
            <Sparkles className="w-4 h-4 text-[#F5A524]" />
            <span>Matched Tuitions ({matchedJobs.length})</span>
          </button>
        </div>

        {/* Tab 1: Applications */}
        {activeTab === "applications" && (
          <div className="space-y-4">
            {loadingJobs ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <SkeletonCard className="h-44" />
                <SkeletonCard className="h-44" />
              </div>
            ) : appliedJobs.length === 0 ? (
              <EmptyState
                icon={Briefcase}
                title="No Applications Submitted Yet"
                description="You haven't applied for any tuition jobs yet. Browse available tuition posts and submit your application."
                actionLabel="Explore Tuition Jobs"
                onAction={() => navigate("/tuition-jobs")}
              />
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                {appliedJobs.map((job) => {
                  const req = job.requestTutorId || {};
                  const edu = req.educationalDetails?.[0] || {};
                  return (
                    <Card
                      key={job._id}
                      className="p-5 bg-white border-[#E4E6EE] space-y-4 hover:shadow-card transition-all"
                    >
                      <div className="flex items-start justify-between gap-3">
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="text-xs font-bold text-[#3730E0] uppercase tracking-wider">
                              Tuition Request
                            </span>
                            <span className="text-xs text-[#5B5F73]">•</span>
                            <span className="text-xs text-[#5B5F73]">
                              Applied{" "}
                              {new Date(job.createdAt).toLocaleDateString()}
                            </span>
                          </div>
                          <h3 className="text-base font-bold text-[#1A1D29] mt-1">
                            {edu.grade ? `${edu.grade} Student` : "Academic Tuition"}
                            {edu.medium ? ` • ${edu.medium}` : ""}
                          </h3>
                        </div>
                        <div>{getStatusBadge(job.status)}</div>
                      </div>

                      {/* Subjects & Location */}
                      <div className="space-y-1.5 text-xs text-[#5B5F73]">
                        {edu.subjects?.length > 0 && (
                          <div className="flex items-center gap-1.5">
                            <BookOpen className="w-3.5 h-3.5 text-[#3730E0] shrink-0" />
                            <span className="font-medium text-[#1A1D29]">
                              Subjects:
                            </span>
                            <span>{edu.subjects.join(", ")}</span>
                          </div>
                        )}
                        <div className="flex items-center gap-1.5">
                          <MapPin className="w-3.5 h-3.5 text-[#0EA5A0] shrink-0" />
                          <span>
                            {[req.adminArea || req.area, req.adminDivision || req.division]
                              .filter(Boolean)
                              .join(", ") || "Bangladesh"}
                          </span>
                        </div>
                        {req.days && (
                          <div className="flex items-center gap-1.5">
                            <Calendar className="w-3.5 h-3.5 text-[#F5A524] shrink-0" />
                            <span>Schedule: {req.days}</span>
                          </div>
                        )}
                      </div>

                      {/* Salary Comparison Footer */}
                      <div className="pt-3 border-t border-[#E4E6EE] flex items-center justify-between text-xs">
                        <div>
                          <span className="text-[#5B5F73] block text-[10px]">
                            Offered Salary
                          </span>
                          <span className="font-bold text-[#1A1D29]">
                            ৳{req.salary || "N/A"}
                          </span>
                        </div>
                        <div className="text-right">
                          <span className="text-[#5B5F73] block text-[10px]">
                            Your Expected Salary
                          </span>
                          <span className="font-bold text-[#3730E0]">
                            ৳{job.expectedSalary}
                          </span>
                        </div>
                      </div>
                    </Card>
                  );
                })}
              </div>
            )}
          </div>
        )}

        {/* Tab 2: Profile Details */}
        {activeTab === "profile" && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Left 2 Cols: Details */}
            <div className="lg:col-span-2 space-y-6">
              {/* Educational History */}
              <Card className="p-6 bg-white border-[#E4E6EE] space-y-4">
                <div className="flex items-center gap-2 text-sm font-bold text-[#1A1D29]">
                  <GraduationCap className="w-4 h-4 text-[#3730E0]" />
                  <span>Educational Qualifications</span>
                </div>
                <div className="space-y-3">
                  {currentTutor.educationSections?.length > 0 ? (
                    currentTutor.educationSections.map((sec, idx) => (
                      <div
                        key={idx}
                        className="p-3.5 rounded-md bg-[#F7F8FB] border border-[#E4E6EE] text-xs space-y-1"
                      >
                        <div className="flex items-center justify-between">
                          <span className="font-bold text-[#1A1D29]">
                            {sec.examination}
                          </span>
                          <span className="text-[#3730E0] font-semibold">
                            {sec.passingYear || "Passed"}
                          </span>
                        </div>
                        <p className="text-[#5B5F73]">
                          Institution: {sec.institution || "N/A"}
                        </p>
                        {sec.groupSubject && (
                          <p className="text-[#5B5F73]">
                            Subject/Major: {sec.groupSubject}
                          </p>
                        )}
                        {sec.gpa && (
                          <p className="text-[#16A34A] font-medium">
                            Result / GPA: {sec.gpa}
                          </p>
                        )}
                      </div>
                    ))
                  ) : (
                    <p className="text-xs text-[#5B5F73]">
                      No education sections recorded.
                    </p>
                  )}
                </div>
              </Card>

              {/* Teaching Preferences */}
              <Card className="p-6 bg-white border-[#E4E6EE] space-y-4">
                <div className="flex items-center gap-2 text-sm font-bold text-[#1A1D29]">
                  <BookOpen className="w-4 h-4 text-[#3730E0]" />
                  <span>Preferred Subjects & Medium</span>
                </div>
                <div className="space-y-3 text-xs">
                  <div>
                    <span className="font-semibold text-[#1A1D29] block mb-1.5">
                      Expertise Subjects:
                    </span>
                    <div className="flex flex-wrap gap-1.5">
                      {(currentTutor.preferredSubjects || []).map((sub, i) => (
                        <span
                          key={i}
                          className="px-2.5 py-1 rounded bg-[#EEEDFD] text-[#3730E0] font-medium"
                        >
                          {sub}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div>
                    <span className="font-semibold text-[#1A1D29] block mb-1.5">
                      Target Classes / Grades:
                    </span>
                    <div className="flex flex-wrap gap-1.5">
                      {(currentTutor.preferredClasses || []).map((cls, i) => (
                        <span
                          key={i}
                          className="px-2.5 py-1 rounded bg-[#F7F8FB] border border-[#E4E6EE] text-[#1A1D29]"
                        >
                          {cls}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </Card>
            </div>

            {/* Right 1 Col: Location & Availability */}
            <div className="space-y-6">
              <Card className="p-6 bg-white border-[#E4E6EE] space-y-4">
                <div className="flex items-center gap-2 text-sm font-bold text-[#1A1D29]">
                  <MapPin className="w-4 h-4 text-[#0EA5A0]" />
                  <span>Location Preferences</span>
                </div>
                <div className="space-y-2 text-xs text-[#5B5F73]">
                  <p>
                    <strong className="text-[#1A1D29]">Primary Division:</strong>{" "}
                    {currentTutor.division}
                  </p>
                  <p>
                    <strong className="text-[#1A1D29]">District:</strong>{" "}
                    {currentTutor.district}
                  </p>
                  <p>
                    <strong className="text-[#1A1D29]">Thana / Upazila:</strong>{" "}
                    {currentTutor.thana}
                  </p>
                  {currentTutor.suitableArea?.length > 0 && (
                    <div>
                      <strong className="text-[#1A1D29] block mt-2 mb-1">
                        Suitable Areas:
                      </strong>
                      <div className="flex flex-wrap gap-1">
                        {currentTutor.suitableArea.map((ar, idx) => (
                          <span
                            key={idx}
                            className="px-2 py-0.5 rounded text-[11px] bg-[#F0FDFA] text-[#0EA5A0] border border-[#CCFBF1]"
                          >
                            {ar}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </Card>

              <Card className="p-6 bg-white border-[#E4E6EE] space-y-3">
                <div className="flex items-center gap-2 text-sm font-bold text-[#1A1D29]">
                  <Award className="w-4 h-4 text-[#F5A524]" />
                  <span>Need Profile Updates?</span>
                </div>
                <p className="text-xs text-[#5B5F73] leading-relaxed">
                  To update your phone number, educational certificates, or university credentials, contact TutorVista Support Helpline directly.
                </p>
                <Link to="/contact" className="block pt-1">
                  <Button variant="outline" size="sm" fullWidth className="text-xs">
                    Contact Support Team
                  </Button>
                </Link>
              </Card>
            </div>
          </div>
        )}

        {/* Tab 3: Matched Tuitions */}
        {activeTab === "matches" && (
          <div className="space-y-4">
            <div className="p-4 rounded-md bg-[#EEEDFD]/50 border border-[#DDD9FC] flex items-center justify-between text-xs text-[#1A1D29]">
              <span>
                Showing recent verified tuition jobs posted in <strong>{currentTutor.division}</strong>.
              </span>
              <Link
                to="/tuition-jobs"
                className="font-bold text-[#3730E0] hover:underline flex items-center gap-1"
              >
                <span>View All Jobs</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            {loadingMatches ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <SkeletonCard className="h-40" />
                <SkeletonCard className="h-40" />
              </div>
            ) : matchedJobs.length === 0 ? (
              <EmptyState
                icon={Search}
                title="No Current Openings in Your Area"
                description="We don't have new tuition requests in your division right now. Check back soon or explore all divisions."
                actionLabel="Explore All Tuitions"
                onAction={() => navigate("/tuition-jobs")}
              />
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                {matchedJobs.map((job) => {
                  const edu = job.educationalDetails?.[0] || {};
                  return (
                    <Card
                      key={job._id}
                      className="p-5 bg-white border-[#E4E6EE] space-y-3 hover:shadow-card transition-all"
                    >
                      <div className="flex items-start justify-between">
                        <div>
                          <span className="text-[10px] font-bold uppercase text-[#0EA5A0] tracking-wider">
                            Active Tuition Job
                          </span>
                          <h4 className="text-sm font-bold text-[#1A1D29]">
                            {edu.grade || "Class"} • {edu.medium || "Tuition"}
                          </h4>
                        </div>
                        <span className="text-sm font-extrabold text-[#3730E0]">
                          ৳{job.salary}/mo
                        </span>
                      </div>

                      <div className="text-xs text-[#5B5F73] space-y-1">
                        <p className="flex items-center gap-1.5">
                          <MapPin className="w-3.5 h-3.5 text-[#0EA5A0]" />
                          <span>
                            {[job.adminArea || job.area, job.adminDivision || job.division]
                              .filter(Boolean)
                              .join(", ")}
                          </span>
                        </p>
                        {edu.subjects?.length > 0 && (
                          <p className="flex items-center gap-1.5">
                            <BookOpen className="w-3.5 h-3.5 text-[#3730E0]" />
                            <span>Subjects: {edu.subjects.join(", ")}</span>
                          </p>
                        )}
                      </div>

                      <div className="pt-2 border-t border-[#E4E6EE] flex items-center justify-between">
                        <span className="text-[11px] text-[#5B5F73]">
                          Schedule: {job.days || "Negotiable"}
                        </span>
                        <Link to="/tuition-jobs">
                          <Button variant="primary" size="sm" className="text-xs">
                            Apply via Tuition Board
                          </Button>
                        </Link>
                      </div>
                    </Card>
                  );
                })}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default TutorPortalPage;
