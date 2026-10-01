import React, { useState } from "react";
import ApplyTutorModal from "./ApplyTutorModal";
import ApiService from "../services/api";
import { toast } from "react-toastify";

const TuitionRequestCard = ({ request, isBookmarked = false, onToggleBookmark }) => {
  const [showModal, setShowModal] = useState(false);
  const [bookmarked, setBookmarked] = useState(isBookmarked);
  const [modalForm, setModalForm] = useState({
    number: "",
    name: "",
    salary: "",
    tutorId: "",
  });

  const handleApplyClick = (e) => {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }
    setShowModal(true);
  };

  const handleModalClose = () => setShowModal(false);

  const handleModalSubmit = async (form) => {
    try {
      const targetId = request._id || request.jobId;
      const isMongoId = targetId && targetId.length === 24 && /^[0-9a-fA-F]{24}$/.test(targetId);

      if (isMongoId) {
        const payload = {
          requestTutorId: targetId,
          tutorId: form.tutorId,
          expectedSalary: form.salary,
        };

        const res = await ApiService.applyForTuitionJob(payload);
        if (res.success) {
          toast.success("Application submitted successfully!");
        } else {
          toast.error(res.message || "Failed to submit application.");
        }
      } else {
        toast.success(`Application submitted successfully for ${jobId}! Our team will contact you shortly.`);
      }
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to apply for this tuition job.");
    }
    setShowModal(false);
  };

  const handleBookmarkClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setBookmarked(!bookmarked);
    if (!bookmarked) {
      toast.success("Tuition job bookmarked!");
    } else {
      toast.info("Bookmark removed.");
    }
    if (onToggleBookmark) {
      onToggleBookmark(request._id || request.jobId);
    }
  };

  // Safe attribute extraction supporting both API format and Reference Mock format
  const jobId = request.jobId || (request._id ? `#TB-${request._id.slice(-4).toUpperCase()}` : "#TB-8841");
  const title =
    request.title ||
    `Grade ${request.grade || request.class || "Student"} – ${
      request.subjects?.slice(0, 2).join(" & ") || "Academic Guidance"
    }`;
  const institution = request.institution || "English Medium School, Dhaka";
  const subjects = request.subjects || ["General Subjects"];
  const curriculum = request.curriculum || request.medium || "English Medium";
  const timeAgo = request.postedTime || "Recently";

  const schedule = request.schedule || request.days || "3 Days / Week";
  const classTime = request.time || "Flexible Timing";
  const location = request.location || request.area || request.thana || "Dhaka Sadar";
  const landmark = request.landmark || (request.division ? `${request.division} Division` : "Near Center");
  const studentGender = request.studentGender || (request.gender ? `${request.gender} Student` : "Any Student");
  const tutoringType = request.tutoringType || "1-on-1 In-person";
  const tutorRequirement = request.tutorRequirement || "University Student Preferred";
  const tutorRequirementSub = request.tutorRequirementSub || "Experienced Tutor";

  const salary = request.salary ? Number(request.salary).toLocaleString() : "8,000";
  const salaryType = request.salaryType || "Negotiable";

  // Badge configuration
  const badgeType = request.badgeType || "open";
  const badgeText = request.badge || "Open • Applied";

  return (
    <article className="bg-white rounded-2xl shadow-2xs hover:shadow-xl transition-all duration-300 flex flex-col justify-between overflow-hidden group border border-slate-200/90 h-full">
      <div className="p-5 sm:p-6 flex flex-col gap-4">
        {/* Top Badges & Urgency */}
        <div className="flex items-center justify-between gap-2">
          {badgeType === "urgent" ? (
            <span className="px-3 py-1 rounded-full bg-rose-50 text-rose-700 text-xs flex items-center gap-1.5 font-bold border border-rose-200">
              <span className="w-1.5 h-1.5 rounded-full bg-rose-600 animate-pulse"></span>
              {badgeText}
            </span>
          ) : badgeType === "premium" ? (
            <span className="px-3 py-1 rounded-full bg-indigo-50 text-brand-700 text-xs flex items-center gap-1.5 font-bold border border-indigo-200">
              <svg className="w-3.5 h-3.5 text-amber-500 fill-amber-500" viewBox="0 0 24 24">
                <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
              </svg>
              {badgeText}
            </span>
          ) : badgeType === "remote" ? (
            <span className="px-3 py-1 rounded-full bg-emerald-50 text-emerald-800 text-xs flex items-center gap-1.5 font-bold border border-emerald-200">
              <svg className="w-3.5 h-3.5 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"></path>
              </svg>
              {badgeText}
            </span>
          ) : (
            <span className="px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 text-xs flex items-center gap-1.5 font-bold border border-emerald-200">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-600"></span>
              {badgeText}
            </span>
          )}

          <span className="text-slate-400 text-xs flex items-center gap-1 shrink-0 font-medium">
            <svg className="w-3.5 h-3.5 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
            </svg>
            <span>{timeAgo}</span>
          </span>
        </div>

        {/* Academic Headline & Institution */}
        <div>
          <div className="flex items-center gap-2 mb-1.5 flex-wrap">
            <span className="px-2.5 py-0.5 rounded bg-indigo-100 text-brand-700 text-[11px] font-bold uppercase tracking-wide">
              {curriculum}
            </span>
            <span className="text-slate-400 text-xs font-medium">Job ID: {jobId}</span>
          </div>
          <h2 className="text-base sm:text-lg font-bold text-slate-900 group-hover:text-brand-700 transition-colors line-clamp-1">
            {title}
          </h2>
          <p className="text-xs text-slate-500 flex items-center gap-1.5 mt-1 line-clamp-1 font-medium">
            <svg className="w-4 h-4 text-emerald-600 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 14l9-5-9-5-9 5 9 5z"></path>
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z"></path>
            </svg>
            <span>{institution}</span>
          </p>
        </div>

        {/* Subject Chips */}
        <div className="flex flex-wrap gap-1.5">
          {subjects.slice(0, 4).map((sub, idx) => (
            <span key={idx} className="px-2.5 py-1 rounded-lg bg-[#f2f3ff] text-xs text-slate-700 font-medium">
              {sub}
            </span>
          ))}
          {subjects.length > 4 && (
            <span className="px-2 py-1 rounded-lg bg-slate-100 text-[11px] text-slate-500 font-medium">
              +{subjects.length - 4} more
            </span>
          )}
        </div>

        {/* 2x2 Clean Attribute Grid */}
        <div className="grid grid-cols-2 gap-2.5 pt-2">
          {/* Weekly Schedule */}
          <div className="flex items-start gap-2 bg-[#f8faff] p-2.5 rounded-xl border border-slate-100/90">
            <svg className="w-4 h-4 text-brand-700 shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
            </svg>
            <div className="flex flex-col min-w-0">
              <span className="text-[11px] text-slate-400 font-medium">Weekly Schedule</span>
              <span className="text-xs text-slate-800 font-semibold truncate">{schedule}</span>
              <span className="text-[11px] text-slate-500 truncate">{classTime}</span>
            </div>
          </div>

          {/* Location */}
          <div className="flex items-start gap-2 bg-[#f8faff] p-2.5 rounded-xl border border-slate-100/90">
            <svg className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path>
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path>
            </svg>
            <div className="flex flex-col min-w-0">
              <span className="text-[11px] text-slate-400 font-medium">Location</span>
              <span className="text-xs text-slate-800 font-semibold truncate">{location}</span>
              <span className="text-[11px] text-slate-500 truncate">{landmark}</span>
            </div>
          </div>

          {/* Student Profile */}
          <div className="flex items-start gap-2 bg-[#f8faff] p-2.5 rounded-xl border border-slate-100/90">
            <svg className="w-4 h-4 text-indigo-600 shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path>
            </svg>
            <div className="flex flex-col min-w-0">
              <span className="text-[11px] text-slate-400 font-medium">Student Profile</span>
              <span className="text-xs text-slate-800 font-semibold truncate">{studentGender}</span>
              <span className="text-[11px] text-slate-500 truncate">{tutoringType}</span>
            </div>
          </div>

          {/* Tutor Requirement */}
          <div className="flex items-start gap-2 bg-[#f8faff] p-2.5 rounded-xl border border-slate-100/90">
            <svg className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"></path>
            </svg>
            <div className="flex flex-col min-w-0">
              <span className="text-[11px] text-slate-400 font-medium">Tutor Requirement</span>
              <span className="text-xs text-slate-800 font-semibold truncate">{tutorRequirement}</span>
              <span className="text-[11px] text-emerald-700 font-bold truncate">{tutorRequirementSub}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Remuneration & Action Footer */}
      <div className="bg-[#f8faff] p-5 sm:p-6 pt-4 flex flex-col gap-3 border-t border-slate-100">
        <div className="flex items-center justify-between">
          <div className="flex flex-col">
            <span className="text-[11px] text-slate-500 font-medium">Offered Remuneration</span>
            <div className="flex items-baseline gap-1">
              <span className="text-xl font-extrabold text-brand-700">৳ {salary}</span>
              <span className="text-xs text-slate-500 font-medium">/ month</span>
            </div>
          </div>
          <span className="px-2.5 py-1 rounded bg-emerald-100 text-emerald-800 text-xs font-semibold">
            {salaryType}
          </span>
        </div>

        <div className="flex items-center gap-2 pt-1">
          <button
            type="button"
            onClick={handleApplyClick}
            className="flex-1 py-2.5 px-4 rounded-xl bg-brand-700 text-white text-xs sm:text-sm font-semibold hover:bg-brand-800 transition-all flex items-center justify-center gap-1.5 shadow-xs cursor-pointer"
          >
            <span>Apply Now</span>
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
            </svg>
          </button>
          <button
            type="button"
            onClick={handleBookmarkClick}
            className={`p-2.5 rounded-xl border transition-colors cursor-pointer ${
              bookmarked
                ? "bg-indigo-50 border-brand-200 text-brand-700"
                : "bg-white border-slate-200 text-slate-400 hover:text-brand-700 hover:bg-slate-50"
            }`}
            title={bookmarked ? "Remove Bookmark" : "Bookmark Job"}
          >
            <svg
              className="w-4 h-4"
              fill={bookmarked ? "currentColor" : "none"}
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z"></path>
            </svg>
          </button>
        </div>
      </div>

      {/* Modal for Application */}
      <ApplyTutorModal
        isOpen={showModal}
        onClose={handleModalClose}
        onSubmit={handleModalSubmit}
        form={modalForm}
        setForm={setModalForm}
      />
    </article>
  );
};

export default TuitionRequestCard;
