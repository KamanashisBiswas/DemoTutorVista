import React, { useState, useMemo } from "react";
import {
  User,
  GraduationCap,
  Calendar,
  X,
  Phone,
  MapPin,
  Briefcase,
  Users,
  Award,
  Clock,
  BookOpen,
  ArrowUpDown,
} from "lucide-react";
import Badge from "./ui/Badge";
import Button from "./ui/Button";
import ApiService from "../services/api";

const AppliedJobDetailsModal = ({ open, onClose, applications }) => {
  const [sortOrder, setSortOrder] = useState("high-to-low");

  const sortedApplications = useMemo(() => {
    if (!applications) return [];
    const applicationsCopy = [...applications];

    applicationsCopy.sort((a, b) => {
      const scoreA = a.tutorId?.score ?? -1;
      const scoreB = b.tutorId?.score ?? -1;

      if (sortOrder === "high-to-low") {
        return scoreB - scoreA;
      } else {
        return scoreA - scoreB;
      }
    });

    return applicationsCopy;
  }, [applications, sortOrder]);

  if (!open || !applications || applications.length === 0) {
    return null;
  }

  const student = applications[0].requestTutorId || {};

  const formatAddress = (person) => {
    if (!person) return "Not available";
    if (person.address && person.address.trim() !== "") {
      return person.address;
    }
    return [person.area, person.upazila, person.district, person.division]
      .filter(Boolean)
      .join(", ") || "Location not specified";
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4 transition-opacity duration-300 ease-out"
      onClick={onClose}
    >
      <div
        className="bg-[#F7F8FB] rounded-2xl shadow-xl border border-[#E4E6EE] w-full max-w-6xl max-h-[92vh] overflow-hidden flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <header className="flex items-center justify-between px-6 py-4 border-b border-[#E4E6EE] flex-shrink-0 bg-white">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-[#EEF2FF] border border-[#E0E7FF] rounded-xl flex items-center justify-center text-[#3730E0]">
              <Briefcase className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base font-bold text-[#1A1D29]">
                Application Details & Candidates
              </h2>
              <p className="text-xs text-[#5B5F73]">
                Review tutor applicants for this tuition post
              </p>
            </div>
          </div>
          <button
            className="p-1.5 text-[#5B5F73] hover:text-[#1A1D29] hover:bg-[#F7F8FB] rounded-lg transition-colors"
            onClick={onClose}
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>
        </header>

        {/* Modal Body */}
        <main className="p-6 flex-grow grid grid-cols-1 lg:grid-cols-12 gap-6 overflow-hidden">
          {/* Left Column: Student Information */}
          <aside className="lg:col-span-5 xl:col-span-4 h-full">
            <div className="bg-white rounded-xl p-5 shadow-xs border border-[#E4E6EE] h-full flex flex-col">
              <div className="flex items-center gap-3 mb-4 pb-3 border-b border-[#E4E6EE]">
                <div className="w-9 h-9 rounded-lg bg-[#EEF2FF] text-[#3730E0] flex items-center justify-center">
                  <User className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-bold text-sm text-[#1A1D29]">
                    Student Profile
                  </h3>
                  <p className="text-[11px] text-[#5B5F73]">Tuition Request Data</p>
                </div>
              </div>

              <div className="space-y-3 text-xs text-[#1A1D29] flex-grow overflow-y-auto">
                <div className="flex gap-2">
                  <span className="font-semibold text-[#5B5F73] w-24">Student:</span>
                  <span className="font-medium text-[#1A1D29]">
                    {student.studentName || "N/A"}
                  </span>
                </div>
                <div className="flex gap-2">
                  <span className="font-semibold text-[#5B5F73] w-24">Phone:</span>
                  <span className="font-medium text-[#1A1D29]">
                    {student.phoneNo || "N/A"}
                  </span>
                </div>
                <div className="flex gap-2">
                  <span className="font-semibold text-[#5B5F73] w-24">Grade/Class:</span>
                  <span className="font-medium text-[#1A1D29]">
                    {student.grade || "N/A"}
                  </span>
                </div>
                <div className="flex gap-2">
                  <span className="font-semibold text-[#5B5F73] w-24">Location:</span>
                  <span className="font-medium text-[#1A1D29] leading-relaxed">
                    {formatAddress(student)}
                  </span>
                </div>
                <div className="flex flex-col gap-1.5 pt-2 border-t border-[#E4E6EE]">
                  <span className="font-semibold text-[#5B5F73]">Subjects:</span>
                  <div className="flex flex-wrap gap-1">
                    {student.subjects?.map((sub) => (
                      <span
                        key={sub}
                        className="px-2 py-0.5 bg-[#EEF2FF] text-[#3730E0] text-[11px] font-medium rounded-md border border-[#E0E7FF]"
                      >
                        {sub}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="pt-3 border-t border-[#E4E6EE] space-y-2">
                  <div className="flex gap-2">
                    <span className="font-semibold text-[#5B5F73] w-24">Schedule:</span>
                    <span>{student.days || "N/A"}</span>
                  </div>
                  <div className="flex gap-2">
                    <span className="font-semibold text-[#5B5F73] w-24">Time:</span>
                    <span>{student.time || "N/A"}</span>
                  </div>
                  <div className="flex gap-2">
                    <span className="font-semibold text-[#5B5F73] w-24">Gender:</span>
                    <span>{student.gender || "N/A"}</span>
                  </div>
                </div>
              </div>

              <div className="mt-auto pt-4 border-t border-[#E4E6EE]">
                <div className="flex justify-between items-center bg-[#F7F8FB] p-3 rounded-lg border border-[#E4E6EE]">
                  <span className="text-xs font-semibold text-[#5B5F73]">Offered Salary</span>
                  <span className="text-sm font-bold text-[#16A34A]">
                    {student.salary ? `${student.salary} BDT` : "Negotiable"}
                  </span>
                </div>
              </div>
            </div>
          </aside>

          {/* Right Column: Applied Tutors List */}
          <section className="lg:col-span-7 xl:col-span-8 flex flex-col min-h-0">
            <div className="flex items-center justify-between gap-4 mb-4 flex-shrink-0">
              <div className="flex items-center gap-2">
                <h3 className="font-bold text-sm text-[#1A1D29]">
                  Candidates Applied ({applications.length})
                </h3>
              </div>

              <div className="flex items-center gap-2">
                <span className="text-xs text-[#5B5F73]">Sort:</span>
                <select
                  id="sort-order"
                  value={sortOrder}
                  onChange={(e) => setSortOrder(e.target.value)}
                  className="bg-white border border-[#E4E6EE] rounded-lg px-2.5 py-1 text-xs text-[#1A1D29] focus:outline-none focus:border-[#3730E0] shadow-xs"
                >
                  <option value="high-to-low">Score: High to Low</option>
                  <option value="low-to-high">Score: Low to High</option>
                </select>
              </div>
            </div>

            <div className="flex-grow space-y-3 overflow-y-auto pr-1">
              {sortedApplications.map((app) => {
                const tutor = app.tutorId || {};
                return (
                  <div
                    key={app._id}
                    className="bg-white rounded-xl p-4 shadow-xs border border-[#E4E6EE] transition-all hover:border-[#3730E0]/40"
                  >
                    <div className="flex justify-between items-start mb-3">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-[#EEF2FF] border border-[#E0E7FF] text-[#3730E0] flex items-center justify-center font-bold text-sm">
                          {tutor.name?.charAt(0) || "T"}
                        </div>
                        <div>
                          <p className="font-bold text-sm text-[#1A1D29]">
                            {tutor.name || "N/A"}
                          </p>
                          <p className="text-xs text-[#5B5F73]">
                            {tutor.gender || "N/A"} • {tutor.phone || "N/A"}
                          </p>
                        </div>
                      </div>

                      <div className="text-right">
                        <div className="flex items-center gap-1.5 justify-end">
                          <span className="text-xs text-[#5B5F73]">Score:</span>
                          <span className="font-bold bg-[#1A1D29] text-white px-2 py-0.5 rounded text-xs">
                            {tutor.score === "" || tutor.score == null
                              ? "N/A"
                              : tutor.score}
                          </span>
                        </div>
                        <div className="mt-1 text-xs">
                          <span className="text-[#5B5F73]">Expects: </span>
                          <span className="font-bold text-[#F5A524]">
                            {app.expectedSalary ? `${app.expectedSalary} BDT` : "N/A"}
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-2 text-xs">
                      {tutor.preferredSubjects?.length > 0 && (
                        <div className="flex items-center gap-1.5 flex-wrap">
                          <span className="text-[#5B5F73] text-[11px] font-semibold">Subjects:</span>
                          {tutor.preferredSubjects.slice(0, 5).map((subject) => (
                            <span
                              key={subject}
                              className="px-2 py-0.5 bg-[#F7F8FB] text-[#5B5F73] text-[11px] rounded border border-[#E4E6EE]"
                            >
                              {subject}
                            </span>
                          ))}
                        </div>
                      )}

                      {tutor.educationSections?.filter(
                        (edu) => edu.examination?.trim() !== ""
                      ).length > 0 && (
                        <div className="pt-2 border-t border-[#E4E6EE] text-[11px] text-[#5B5F73]">
                          <span className="font-semibold text-[#1A1D29]">Education: </span>
                          {tutor.educationSections
                            .filter((e) => e.examination)
                            .slice(0, 1)
                            .map((e, idx) => (
                              <span key={idx}>
                                {e.examination} - {e.institution} ({e.groupSubject || e.department || "General"})
                              </span>
                            ))}
                        </div>
                      )}
                    </div>

                    <div className="flex flex-wrap justify-between items-center gap-2 mt-3 pt-2.5 border-t border-[#E4E6EE] text-[11px] text-[#5B5F73]">
                      <span>
                        Applied:{" "}
                        {app.createdAt
                          ? new Date(app.createdAt).toLocaleDateString("en-US", {
                              month: "short",
                              day: "numeric",
                              year: "numeric",
                            })
                          : "N/A"}
                      </span>
                      <div className="flex items-center gap-1.5">
                        <span className="text-[10px] font-semibold text-[#5B5F73]">Status:</span>
                        <select
                          value={app.status || "pending"}
                          onChange={async (e) => {
                            const newStatus = e.target.value;
                            try {
                              await ApiService.updateAppliedJobStatus(app._id, newStatus);
                              app.status = newStatus;
                              setSortOrder((prev) => (prev === "high-to-low" ? "high-to-low" : "low-to-high"));
                            } catch (err) {
                              console.error("Failed to update status:", err);
                            }
                          }}
                          className={`text-[11px] font-semibold px-2 py-0.5 rounded border focus:outline-none ${
                            app.status === "shortlisted"
                              ? "bg-[#F0FDF4] text-[#16A34A] border-[#BBF7D0]"
                              : app.status === "selected"
                              ? "bg-[#EEEDFD] text-[#3730E0] border-[#DDD9FC]"
                              : app.status === "rejected"
                              ? "bg-[#FEF2F2] text-[#DC2626] border-[#FECACA]"
                              : "bg-[#FFFBEB] text-[#D97706] border-[#FDE68A]"
                          }`}
                        >
                          <option value="pending">Under Review</option>
                          <option value="shortlisted">Shortlisted</option>
                          <option value="selected">Selected</option>
                          <option value="rejected">Rejected</option>
                        </select>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </section>
        </main>
      </div>
    </div>
  );
};

export default AppliedJobDetailsModal;
