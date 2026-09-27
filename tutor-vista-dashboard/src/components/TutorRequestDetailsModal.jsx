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

const DetailItem = ({ label, value }) => (
  <div>
    <label className="text-sm font-medium text-gray-600">{label}</label>
    <p className="text-gray-800">{value || "N/A"}</p>
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
  <div className="bg-white rounded-lg p-4 border">
    <div className="flex items-center space-x-3 mb-4">
      <div className="w-6 h-6 bg-gray-800 rounded-lg flex items-center justify-center">
        <GraduationCap className="w-3 h-3 text-white" />
      </div>
      <h4 className="text-lg font-semibold text-gray-800">{title}</h4>
    </div>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
      <DetailItem label="Institution" value={institution} />
      <DetailItem label="Medium" value={medium} />
      {curriculum && <DetailItem label="Curriculum" value={curriculum} />}
      {grade && <DetailItem label="Grade/Class" value={grade} />}
    </div>
    {subjects && subjects.length > 0 && (
      <div>
        <label className="text-sm font-medium text-gray-600 flex items-center gap-2 mb-2">
          <BookOpen className="w-4 h-4" /> Subjects
        </label>
        <div className="flex flex-wrap gap-2">
          {subjects.map((subject, index) => (
            <span
              key={index}
              className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm"
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
      // Temporarily render block for html2canvas
      const el = templateRef.current;
      el.style.position = "fixed";
      el.style.left = "0px";
      el.style.top = "0px";
      el.style.zIndex = "-9999";
      el.style.display = "block";

      const canvas = await html2canvas(el, {
        useCORS: true,
        scale: 2, // high quality
        backgroundColor: null,
      });

      el.style.display = "none"; // Hide again

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
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl shadow-xl w-full max-w-4xl max-h-[90vh] flex flex-col overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-800">
            Request Details
          </h3>
          <div className="flex items-center space-x-3">
            <button
              onClick={onDownloadPdf}
              className="bg-green-600 text-white px-3 py-1.5 rounded-lg hover:bg-green-700 transition-colors duration-200 flex items-center space-x-2"
            >
              <FileDown className="w-4 h-4" />
              <span>Download PDF</span>
            </button>
            <button
              onClick={onDownloadDocx}
              className="bg-blue-600 text-white px-3 py-1.5 rounded-lg hover:bg-blue-700 transition-colors duration-200 flex items-center space-x-2"
            >
              <FileText className="w-4 h-4" />
              <span>Download DOCX</span>
            </button>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600 p-1 rounded"
            >
              <X className="w-6 h-6" />
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6 bg-gray-50">
          <div className="space-y-6">
            {/* Admin Actions Section */}
            <div className="bg-white rounded-lg p-4 border flex flex-wrap gap-3">
              <button
                onClick={handleCopyWithContact}
                className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition-colors duration-200 flex items-center space-x-2 font-medium text-sm"
              >
                <Copy className="w-4 h-4" />
                <span>Copy With Contact</span>
              </button>
              <button
                onClick={handleCopyWithoutContact}
                className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition-colors duration-200 flex items-center space-x-2 font-medium text-sm"
              >
                <Copy className="w-4 h-4" />
                <span>Copy Without Contact</span>
              </button>
              <button
                onClick={handleDownloadTemplate}
                className="bg-amber-600 text-white px-4 py-2 rounded-lg hover:bg-amber-700 transition-colors duration-200 flex items-center space-x-2 font-medium text-sm"
              >
                <Image className="w-4 h-4" />
                <span>Download Template</span>
              </button>
            </div>

            {/* Basic Info Section */}
            <div className="bg-white rounded-lg p-4 border">
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-6 h-6 bg-gray-800 rounded-lg flex items-center justify-center">
                  <User className="w-3 h-3 text-white" />
                </div>
                <h4 className="text-lg font-semibold text-gray-800">
                  Basic Info
                </h4>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <DetailItem label="Student Name" value={request.studentName} />
                <DetailItem label="Phone" value={request.phoneNo} />
                <DetailItem label="Gender" value={request.gender} />
              </div>
            </div>

            {/* Educational Info Section - Conditional Rendering */}
            {request.multipleStudent ? (
              <>
                <StudentInfoSection
                  title="Student 1 Details"
                  institution={request.institution}
                  medium={request.medium}
                  curriculum={request.curriculum}
                  grade={request.grade}
                  subjects={request.subjects}
                />
                <StudentInfoSection
                  title="Student 2 Details"
                  institution={request.institution2}
                  medium={request.medium2}
                  curriculum={request.curriculum2}
                  grade={request.grade2}
                  subjects={request.subjects2}
                />
              </>
            ) : (
              <StudentInfoSection
                title="Educational Info"
                institution={request.institution}
                medium={request.medium}
                curriculum={request.curriculum}
                grade={request.grade}
                subjects={request.subjects}
              />
            )}

            {/* Status Section */}
            <div className="bg-white rounded-lg p-4 border">
              <div className="flex items-center space-x-3 mb-3">
                <div className="w-6 h-6 bg-gray-800 rounded-lg flex items-center justify-center">
                  <Info className="w-3 h-3 text-white" />
                </div>
                <h4 className="text-lg font-semibold text-gray-800">Status</h4>
              </div>
              <div className="flex flex-col items-start">
                <StatusBadge status={request.status} isActive={request.isActive} />
              </div>
            </div>

            {/* Comment Section */}
            <div className="bg-white rounded-lg p-4 border">
              <div className="flex items-center space-x-3 mb-3">
                <div className="w-6 h-6 bg-gray-800 rounded-lg flex items-center justify-center">
                  <Info className="w-3 h-3 text-white" />
                </div>
                <h4 className="text-lg font-semibold text-gray-800">Comment</h4>
              </div>
              <div className="text-gray-800 text-sm leading-relaxed whitespace-pre-wrap">
                {request.comment && request.comment.trim() !== "" ? request.comment : "No comments available."}
              </div>
            </div>

            {/* Address Section */}
            <div className="bg-white rounded-lg p-4 border">
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-6 h-6 bg-gray-800 rounded-lg flex items-center justify-center">
                  <MapPin className="w-3 h-3 text-white" />
                </div>
                <h4 className="text-lg font-semibold text-gray-800">Address</h4>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <DetailItem label="Division" value={request.division} />
                <DetailItem label="District" value={request.district} />
                <DetailItem label="Thana" value={request.thana} />
                <DetailItem label="Area" value={request.area} />
                {request.zone && request.zone.trim() !== "" && (
                  <DetailItem label="Zone" value={request.zone} />
                )}
                {/* Admin Division */}
                <DetailItem
                  label="Admin Division"
                  value={
                    request.adminDivision && request.adminDivision.trim() !== ""
                      ? request.adminDivision
                      : "N/A"
                  }
                />
                {/* Admin Area */}
                <DetailItem
                  label="Admin Area"
                  value={
                    request.adminArea && request.adminArea.trim() !== ""
                      ? request.adminArea
                      : "N/A"
                  }
                />
              </div>
              <div className="mt-4">
                <DetailItem label="Full Address" value={request.address} />
              </div>
            </div>

            {/* Time & Offer Section */}
            <div className="bg-white rounded-lg p-4 border">
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-6 h-6 bg-gray-800 rounded-lg flex items-center justify-center">
                  <Clock className="w-3 h-3 text-white" />
                </div>
                <h4 className="text-lg font-semibold text-gray-800">
                  Time & Offer
                </h4>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <DetailItem label="Days" value={request.days} />
                <DetailItem label="Time" value={request.time} />
                <DetailItem label="Salary" value={request.salary} />
              </div>
              {request.requirement && (
                <div className="mt-4">
                  <label className="text-sm font-medium text-gray-600">
                    Requirements
                  </label>
                  <p className="text-gray-800 text-sm leading-relaxed">
                    {request.requirement}
                  </p>
                </div>
              )}
            </div>

            {/* Request Information Section */}
            <div className="bg-white rounded-lg p-4 border">
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-6 h-6 bg-gray-800 rounded-lg flex items-center justify-center">
                  <Info className="w-3 h-3 text-white" />
                </div>
                <h4 className="text-lg font-semibold text-gray-800">
                  Request Information
                </h4>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <DetailItem
                  label="Requested Date"
                  value={new Date(request.createdAt).toLocaleDateString()}
                />
                <DetailItem
                  label="Last Updated"
                  value={new Date(request.updatedAt).toLocaleDateString()}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="flex justify-end p-4 border-t border-gray-200 bg-white">
          <button
            type="button"
            onClick={onClose}
            className="px-6 py-2 bg-red-600 text-white rounded-lg font-semibold hover:bg-red-700 transition"
          >
            Close
          </button>
        </div>
      </div>

      {/* Hidden Download Template element for html2canvas rendering */}
      <div 
        ref={templateRef} 
        style={{ display: "none", width: "600px" }} 
        className="p-8 bg-gradient-to-br from-slate-950 via-indigo-950 to-purple-950 text-white font-sans rounded-2xl border border-indigo-500/30"
      >
        <div className="text-center mb-6">
          <h2 className="text-3xl font-extrabold tracking-wider text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">
            TUTOR WANTED
          </h2>
          <div className="h-1 w-24 bg-gradient-to-r from-blue-500 to-purple-500 mx-auto mt-2 rounded-full"></div>
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
                <span className="text-lg font-bold text-purple-200">{request.subjects.join(", ")}</span>
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
              <span className="font-bold text-green-400">{request.salary || "N/A"}</span>
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
                <span className="text-blue-400 text-xs font-semibold uppercase tracking-wider block">Specific Requirements</span>
                <p className="text-sm text-gray-300 leading-relaxed mt-1">{request.requirement}</p>
              </div>
            )}
          </div>

          {/* Comment - only render if not empty */}
          {request.comment && request.comment.trim() !== "" && (
            <div className="bg-purple-950/20 rounded-xl p-4 border border-purple-500/20">
              <span className="text-purple-400 text-xs font-semibold uppercase tracking-wider block">Internal Notes / Comment</span>
              <p className="text-sm text-purple-200 leading-relaxed mt-1 whitespace-pre-wrap">{request.comment}</p>
            </div>
          )}
        </div>

        <div className="text-center mt-8 pt-4 border-t border-white/10">
          <p className="text-xs text-gray-400 font-semibold tracking-widest uppercase">TUTOR VISTA BD</p>
          <p className="text-[10px] text-gray-500 mt-1">www.tutorvistabd.com</p>
        </div>
      </div>
    </div>
  );
};

export default TutorRequestDetailsModal;
