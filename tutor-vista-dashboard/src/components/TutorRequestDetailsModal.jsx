import React from "react";
import {
  X,
  User,
  MapPin,
  Clock,
  FileDown,
  FileText,
  GraduationCap,
  BookOpen,
  Info,
  Copy,
  Image,
} from "lucide-react";
import { StatusBadge } from "../utils/statusHelper";
import html2canvas from "html2canvas";
import { toast } from "react-toastify";
import Button from "./ui/Button";

const DetailItem = ({ label, value }) => (
  <div>
    <label className="text-xs font-semibold text-[#5B5F73] block mb-1">{label}</label>
    <p className="text-sm font-medium text-[#1A1D29]">{value || "N/A"}</p>
  </div>
);

const StudentInfoSection = ({
  title,
  institution,
  medium,
  curriculum,
  grade,
  subjects,
}) => (
  <div className="bg-white rounded-xl p-5 border border-[#E4E6EE] shadow-xs">
    <div className="flex items-center gap-2.5 mb-4 pb-3 border-b border-[#E4E6EE]">
      <div className="w-8 h-8 bg-[#EEF2FF] text-[#3730E0] rounded-lg flex items-center justify-center">
        <GraduationCap className="w-4 h-4" />
      </div>
      <h4 className="text-sm font-bold text-[#1A1D29]">{title}</h4>
    </div>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
      <DetailItem label="Institution" value={institution} />
      <DetailItem label="Medium" value={medium} />
      {curriculum && <DetailItem label="Curriculum" value={curriculum} />}
      {grade && <DetailItem label="Grade / Class" value={grade} />}
    </div>
    {subjects && subjects.length > 0 && (
      <div>
        <label className="text-xs font-semibold text-[#5B5F73] flex items-center gap-1.5 mb-2">
          <BookOpen className="w-3.5 h-3.5 text-[#3730E0]" /> Subjects
        </label>
        <div className="flex flex-wrap gap-1.5">
          {subjects.map((subject, index) => (
            <span
              key={index}
              className="bg-[#EEF2FF] text-[#3730E0] border border-[#E0E7FF] px-2.5 py-0.5 rounded-md text-xs font-medium"
            >
              {subject}
            </span>
          ))}
        </div>
      </div>
    )}
  </div>
);

const TutorRequestDetailsModal = ({
  open,
  onClose,
  request,
  onDownloadPdf,
  onDownloadDocx,
}) => {
  const templateRef = React.useRef(null);

  if (!open || !request) return null;

  const handleCopyWithContact = () => {
    const text = [
      `Tutor Request Details`,
      `---------------------------------`,
      `Student Name: ${request.studentName || "N/A"}`,
      `Contact Phone: ${request.phoneNo || "N/A"}`,
      `Gender: ${request.gender || "N/A"}`,
      `Institution: ${request.institution || "N/A"}`,
      `Medium: ${request.medium || "N/A"}`,
      request.curriculum ? `Curriculum: ${request.curriculum}` : null,
      request.grade ? `Grade/Class: ${request.grade}` : null,
      request.subjects && request.subjects.length > 0 ? `Subjects: ${request.subjects.join(", ")}` : null,
      `---------------------------------`,
      `Division: ${request.division || "N/A"}`,
      `District: ${request.district || "N/A"}`,
      `Thana: ${request.thana || "N/A"}`,
      `Area: ${request.area || "N/A"}`,
      request.zone && request.zone.trim() !== "" ? `Zone: ${request.zone}` : null,
      `Full Address: ${request.address || "N/A"}`,
      `---------------------------------`,
      `Days per Week: ${request.days || "N/A"}`,
      `Preferred Time: ${request.time || "N/A"}`,
      `Salary: ${request.salary || "N/A"}`,
      request.requirement ? `Requirements: ${request.requirement}` : null,
      request.comment && request.comment.trim() !== "" ? `Comment: ${request.comment.trim()}` : null,
    ].filter(Boolean).join("\n");

    navigator.clipboard.writeText(text)
      .then(() => toast.success("Copied with contact numbers successfully!"))
      .catch((err) => {
        console.error("Copy failed", err);
        toast.error("Failed to copy details.");
      });
  };

  const handleCopyWithoutContact = () => {
    const text = [
      `Tutor Request (Public Details)`,
      `---------------------------------`,
      `Gender: ${request.gender || "N/A"}`,
      `Institution: ${request.institution || "N/A"}`,
      `Medium: ${request.medium || "N/A"}`,
      request.curriculum ? `Curriculum: ${request.curriculum}` : null,
      request.grade ? `Grade/Class: ${request.grade}` : null,
      request.subjects && request.subjects.length > 0 ? `Subjects: ${request.subjects.join(", ")}` : null,
      `---------------------------------`,
      `Division: ${request.division || "N/A"}`,
      `District: ${request.district || "N/A"}`,
      `Thana: ${request.thana || "N/A"}`,
      `Area: ${request.area || "N/A"}`,
      request.zone && request.zone.trim() !== "" ? `Zone: ${request.zone}` : null,
      `---------------------------------`,
      `Days per Week: ${request.days || "N/A"}`,
      `Preferred Time: ${request.time || "N/A"}`,
      `Salary: ${request.salary || "N/A"}`,
      request.requirement ? `Requirements: ${request.requirement}` : null,
      request.comment && request.comment.trim() !== "" ? `Comment: ${request.comment.trim()}` : null,
    ].filter(Boolean).join("\n");

    navigator.clipboard.writeText(text)
      .then(() => toast.success("Copied without contact numbers successfully!"))
      .catch((err) => {
        console.error("Copy failed", err);
        toast.error("Failed to copy details.");
      });
  };

  const handleDownloadTemplate = async () => {
    if (!templateRef.current) return;
    try {
      const el = templateRef.current;
      el.style.position = "fixed";
      el.style.left = "0px";
      el.style.top = "0px";
      el.style.zIndex = "-9999";
      el.style.display = "block";

      const canvas = await html2canvas(el, {
        useCORS: true,
        scale: 2,
        backgroundColor: null,
      });

      el.style.display = "none";

      const link = document.createElement("a");
      link.download = `TutorRequest_Template_${request.studentName?.replace(/\s+/g, "_")}.png`;
      link.href = canvas.toDataURL("image/png");
      link.click();
      toast.success("Job template image downloaded successfully!");
    } catch (err) {
      console.error("Failed to generate image template", err);
      toast.error("Failed to download template image.");
    }
  };

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-xs flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-xl border border-[#E4E6EE] w-full max-w-4xl max-h-[90vh] flex flex-col overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-5 border-b border-[#E4E6EE] bg-white">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#EEF2FF] text-[#3730E0] flex items-center justify-center">
              <User className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-[#1A1D29]">
                Tuition Request Overview
              </h3>
              <p className="text-xs text-[#5B5F73]">
                ID: {request._id}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={onDownloadPdf}
              className="px-3 py-1.5 rounded-lg text-xs font-semibold bg-[#16A34A] text-white hover:bg-[#15803D] transition-colors flex items-center gap-1.5 shadow-xs"
            >
              <FileDown className="w-3.5 h-3.5" />
              <span>PDF</span>
            </button>
            <button
              onClick={onDownloadDocx}
              className="px-3 py-1.5 rounded-lg text-xs font-semibold bg-[#3730E0] text-white hover:bg-[#2D24C4] transition-colors flex items-center gap-1.5 shadow-xs"
            >
              <FileText className="w-3.5 h-3.5" />
              <span>DOCX</span>
            </button>
            <button
              onClick={onClose}
              className="p-1.5 text-[#5B5F73] hover:text-[#1A1D29] hover:bg-[#F7F8FB] rounded-lg transition-colors ml-1"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6 bg-[#F7F8FB]">
          <div className="space-y-5">
            {/* Quick Actions Bar */}
            <div className="bg-white rounded-xl p-4 border border-[#E4E6EE] flex flex-wrap gap-2.5 shadow-xs">
              <button
                onClick={handleCopyWithContact}
                className="px-3 py-2 bg-[#F7F8FB] hover:bg-[#EEF2FF] hover:text-[#3730E0] text-[#1A1D29] rounded-lg transition-colors border border-[#E4E6EE] flex items-center gap-2 text-xs font-semibold shadow-xs"
              >
                <Copy className="w-3.5 h-3.5" />
                <span>Copy Full (With Phone)</span>
              </button>
              <button
                onClick={handleCopyWithoutContact}
                className="px-3 py-2 bg-[#F7F8FB] hover:bg-[#EEF2FF] hover:text-[#3730E0] text-[#1A1D29] rounded-lg transition-colors border border-[#E4E6EE] flex items-center gap-2 text-xs font-semibold shadow-xs"
              >
                <Copy className="w-3.5 h-3.5" />
                <span>Copy Public Info</span>
              </button>
              <button
                onClick={handleDownloadTemplate}
                className="px-3 py-2 bg-[#F7F8FB] hover:bg-[#FEF3C7] hover:text-[#D97706] text-[#1A1D29] rounded-lg transition-colors border border-[#E4E6EE] flex items-center gap-2 text-xs font-semibold shadow-xs"
              >
                <Image className="w-3.5 h-3.5 text-[#F5A524]" />
                <span>Download Job Card Image</span>
              </button>
            </div>

            {/* Basic Info Section */}
            <div className="bg-white rounded-xl p-5 border border-[#E4E6EE] shadow-xs">
              <div className="flex items-center gap-2 mb-4 pb-3 border-b border-[#E4E6EE]">
                <User className="w-4 h-4 text-[#3730E0]" />
                <h4 className="text-sm font-bold text-[#1A1D29]">Basic Information</h4>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <DetailItem label="Student Name" value={request.studentName} />
                <DetailItem label="Phone Number" value={request.phoneNo} />
                <DetailItem label="Student Gender" value={request.gender} />
              </div>
            </div>

            {/* Educational Info Section */}
            {request.multipleStudent ? (
              <>
                <StudentInfoSection
                  title="Student 1 Academic Details"
                  institution={request.institution}
                  medium={request.medium}
                  curriculum={request.curriculum}
                  grade={request.grade}
                  subjects={request.subjects}
                />
                <StudentInfoSection
                  title="Student 2 Academic Details"
                  institution={request.institution2}
                  medium={request.medium2}
                  curriculum={request.curriculum2}
                  grade={request.grade2}
                  subjects={request.subjects2}
                />
              </>
            ) : (
              <StudentInfoSection
                title="Academic Information"
                institution={request.institution}
                medium={request.medium}
                curriculum={request.curriculum}
                grade={request.grade}
                subjects={request.subjects}
              />
            )}

            {/* Status & Notes Section */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-white rounded-xl p-5 border border-[#E4E6EE] shadow-xs">
                <div className="flex items-center gap-2 mb-3 pb-2 border-b border-[#E4E6EE]">
                  <Info className="w-4 h-4 text-[#3730E0]" />
                  <h4 className="text-sm font-bold text-[#1A1D29]">Workflow Status</h4>
                </div>
                <div className="pt-1">
                  <StatusBadge status={request.status} isActive={request.isActive} />
                </div>
              </div>

              <div className="bg-white rounded-xl p-5 border border-[#E4E6EE] shadow-xs">
                <div className="flex items-center gap-2 mb-3 pb-2 border-b border-[#E4E6EE]">
                  <Info className="w-4 h-4 text-[#3730E0]" />
                  <h4 className="text-sm font-bold text-[#1A1D29]">Admin Notes</h4>
                </div>
                <div className="text-[#1A1D29] text-xs leading-relaxed whitespace-pre-wrap">
                  {request.comment && request.comment.trim() !== "" ? request.comment : "No internal notes recorded."}
                </div>
              </div>
            </div>

            {/* Address Section */}
            <div className="bg-white rounded-xl p-5 border border-[#E4E6EE] shadow-xs">
              <div className="flex items-center gap-2 mb-4 pb-3 border-b border-[#E4E6EE]">
                <MapPin className="w-4 h-4 text-[#3730E0]" />
                <h4 className="text-sm font-bold text-[#1A1D29]">Tuition Location</h4>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <DetailItem label="Division" value={request.division} />
                <DetailItem label="District" value={request.district} />
                <DetailItem label="Thana" value={request.thana} />
                <DetailItem label="Area" value={request.area} />
                {request.zone && request.zone.trim() !== "" && (
                  <DetailItem label="Zone" value={request.zone} />
                )}
                {request.adminDivision && (
                  <DetailItem label="Admin Division" value={request.adminDivision} />
                )}
                {request.adminArea && (
                  <DetailItem label="Admin Area" value={request.adminArea} />
                )}
              </div>
              <div className="mt-4 pt-3 border-t border-[#E4E6EE]">
                <DetailItem label="Full Address / Landmark" value={request.address} />
              </div>
            </div>

            {/* Schedule & Compensation Section */}
            <div className="bg-white rounded-xl p-5 border border-[#E4E6EE] shadow-xs">
              <div className="flex items-center gap-2 mb-4 pb-3 border-b border-[#E4E6EE]">
                <Clock className="w-4 h-4 text-[#3730E0]" />
                <h4 className="text-sm font-bold text-[#1A1D29]">Schedule & Compensation</h4>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <DetailItem label="Days per Week" value={request.days} />
                <DetailItem label="Preferred Timing" value={request.time} />
                <DetailItem label="Offered Salary" value={request.salary ? `${request.salary} BDT` : "Negotiable"} />
              </div>
              {request.requirement && (
                <div className="mt-4 pt-3 border-t border-[#E4E6EE]">
                  <DetailItem label="Tutor Requirements" value={request.requirement} />
                </div>
              )}
            </div>

            {/* Audit Dates */}
            <div className="bg-white rounded-xl p-4 border border-[#E4E6EE] shadow-xs flex flex-wrap justify-between text-xs text-[#5B5F73]">
              <span>Requested: {new Date(request.createdAt).toLocaleDateString()}</span>
              <span>Updated: {new Date(request.updatedAt).toLocaleDateString()}</span>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="flex justify-end p-4 border-t border-[#E4E6EE] bg-white">
          <Button variant="secondary" onClick={onClose}>
            Close
          </Button>
        </div>
      </div>

      {/* Hidden Download Template element for html2canvas */}
      <div 
        ref={templateRef} 
        style={{ display: "none", width: "600px" }} 
        className="p-8 bg-gradient-to-br from-[#0F172A] via-[#1E1B4B] to-[#311042] text-white font-sans rounded-2xl border border-indigo-500/30"
      >
        <div className="text-center mb-6">
          <h2 className="text-3xl font-extrabold tracking-wider text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-300">
            TUTOR WANTED
          </h2>
          <div className="h-1 w-24 bg-gradient-to-r from-[#3730E0] to-[#0EA5A0] mx-auto mt-2 rounded-full"></div>
        </div>

        <div className="space-y-4">
          <div className="bg-white/5 rounded-xl p-4 border border-white/10 space-y-3">
            <div>
              <span className="text-blue-400 text-xs font-semibold uppercase tracking-wider block">Class & Medium</span>
              <span className="text-lg font-bold">{request.grade || "N/A"} ({request.medium || "N/A"})</span>
            </div>
            {request.subjects && request.subjects.length > 0 && (
              <div>
                <span className="text-blue-400 text-xs font-semibold uppercase tracking-wider block">Subjects</span>
                <span className="text-lg font-bold text-indigo-200">{request.subjects.join(", ")}</span>
              </div>
            )}
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="bg-white/5 rounded-xl p-4 border border-white/10">
              <span className="text-blue-400 text-xs font-semibold uppercase tracking-wider block">Weekly Schedule</span>
              <span className="font-bold">{request.days || "N/A"}</span>
            </div>
            <div className="bg-white/5 rounded-xl p-4 border border-white/10">
              <span className="text-blue-400 text-xs font-semibold uppercase tracking-wider block">Salary Offer</span>
              <span className="font-bold text-[#16A34A]">{request.salary ? `${request.salary} BDT` : "Negotiable"}</span>
            </div>
          </div>

          <div className="bg-white/5 rounded-xl p-4 border border-white/10 space-y-2">
            <div>
              <span className="text-blue-400 text-xs font-semibold uppercase tracking-wider block">Location</span>
              <span className="font-bold">
                {request.zone && request.zone.trim() !== "" ? `${request.zone} (Zone), ` : ""}
                {request.area || "N/A"}, {request.thana || "N/A"}, {request.district || "N/A"}
              </span>
            </div>
            {request.requirement && (
              <div>
                <span className="text-blue-400 text-xs font-semibold uppercase tracking-wider block">Requirements</span>
                <p className="text-sm text-gray-300 leading-relaxed mt-1">{request.requirement}</p>
              </div>
            )}
          </div>
        </div>

        <div className="text-center mt-8 pt-4 border-t border-white/10">
          <p className="text-xs text-gray-300 font-semibold tracking-widest uppercase">TUTORVISTA</p>
          <p className="text-[10px] text-gray-400 mt-1">support@tutorvista.com</p>
        </div>
      </div>
    </div>
  );
};

export default TutorRequestDetailsModal;
