import React from "react";
import { useNavigate } from "react-router-dom";
import femaleAvatar from "../assets/Avatar/FemaleAvatar.jpg";
import maleAvatar from "../assets/Avatar/MaleAvatar.jpg";

const TutorCard = ({
  tutor,
  onDetailsClick,
  truncateText = (t, l) => (t && t.length > l ? t.substring(0, l) + "..." : t),
}) => {
  const navigate = useNavigate();
  if (!tutor) return null;

  // Subjects
  const subjects = Array.isArray(tutor.preferredSubjects) && tutor.preferredSubjects.length > 0
    ? tutor.preferredSubjects
    : tutor.educationSections?.[0]?.groupSubject
    ? [tutor.educationSections[0].groupSubject]
    : ["Physics", "Math", "Chemistry"];

  // Education details
  const validInstitutions = Array.isArray(tutor.educationSections)
    ? tutor.educationSections.filter((ed) => ed.institution && ed.institution.trim() !== "")
    : [];

  const institution =
    validInstitutions.length > 0
      ? validInstitutions[validInstitutions.length - 1].institution
      : tutor.institution || "University";

  const degree =
    validInstitutions.length > 0
      ? validInstitutions[validInstitutions.length - 1].degree ||
        validInstitutions[validInstitutions.length - 1].examination ||
        "Graduated"
      : tutor.degree || "Higher Education";

  // Location / Area
  const areaDisplay =
    tutor.preferredLocations?.length > 0
      ? tutor.preferredLocations.slice(0, 3).join(", ")
      : tutor.district || tutor.division
      ? `${tutor.district || ""}${tutor.district && tutor.division ? ", " : ""}${tutor.division || ""}`
      : "Dhanmondi, Lalmatia, Kalabagan";

  // Reliable image source with bundled fallback
  const fallbackImg = tutor.gender === "Female" ? femaleAvatar : maleAvatar;
  const imgSrc = tutor.image || tutor.profileImage?.url || fallbackImg;

  // Rating & reviews
  const rating = tutor.rating ? Number(tutor.rating).toFixed(2) : "4.95";
  const reviewsCount = tutor.reviewsCount || Math.floor(20 + (tutor.name ? tutor.name.length * 2 : 15));

  // Schedule & student count
  const schedule = tutor.schedule || "3-4 Days/wk";
  const studentsCount = tutor.studentsCount || `${Math.floor(15 + (tutor.name ? tutor.name.length : 10))}+ Students`;

  // Salary display
  const salaryText = tutor.salaryText || tutor.expectedSalary || "৳10,000 - ৳15,000/mo";

  return (
    <article className="bg-white rounded-2xl border border-slate-200/90 shadow-xs hover:shadow-lg hover:border-brand-200 transition-all duration-200 flex flex-col justify-between p-4 group">
      <div>
        {/* Header: Avatar, Rating & Shield */}
        <div className="flex items-start justify-between gap-3 mb-3">
          <div className="relative shrink-0">
            <img
              src={imgSrc}
              alt={`${tutor.name} - Tutor`}
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = fallbackImg;
              }}
              className="w-14 h-14 rounded-2xl object-cover border-2 border-white shadow-xs ring-1 ring-slate-100 group-hover:scale-105 transition-transform duration-200"
            />
            <span
              className="absolute -bottom-1 -right-1 w-5 h-5 bg-emerald-500 rounded-full border-2 border-white flex items-center justify-center text-white shadow-2xs"
              title="Verified Background"
            >
              <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path d="M5 13l4 4L19 7" strokeLinecap="round" strokeLinejoin="round" strokeWidth="3"></path>
              </svg>
            </span>
          </div>

          <div className="flex flex-col items-end">
            <div className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-amber-50 border border-amber-200 text-amber-800 text-xs font-bold">
              <svg className="w-3.5 h-3.5 fill-amber-400 text-amber-400" viewBox="0 0 20 20">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
              </svg>
              <span>{rating}</span>
            </div>
            <span className="text-[11px] text-slate-400 font-medium mt-1">({reviewsCount} reviews)</span>
          </div>
        </div>

        {/* Tutor Name & Available Badge */}
        <div className="flex items-center justify-between gap-1">
          <h2 className="text-base font-bold text-slate-900 group-hover:text-brand-700 transition-colors flex items-center gap-1.5">
            <span>{tutor.name}</span>
            <svg className="w-4 h-4 text-emerald-600 shrink-0" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" clipRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"></path>
            </svg>
          </h2>
          <span className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded-full text-[10px] font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200 shrink-0">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
            Available
          </span>
        </div>

        {/* Academic Tag */}
        <div className="mt-1.5 inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-indigo-50 border border-indigo-100 text-brand-700 text-xs font-semibold w-full">
          <svg className="w-3.5 h-3.5 text-brand-700 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 14l9-5-9-5-9 5 9 5z"></path>
          </svg>
          <span className="truncate font-bold">{institution}</span>
          <span className="text-slate-400">•</span>
          <span className="truncate text-[11px] font-medium text-slate-600">{degree}</span>
        </div>

        {/* Subjects */}
        <div className="mt-3 pt-2.5 border-t border-slate-100">
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-1">
            Subjects
          </span>
          <div className="flex flex-wrap gap-1.5">
            {subjects.slice(0, 3).map((sub, idx) => (
              <span
                key={idx}
                className={`text-xs px-2.5 py-0.5 rounded-md font-medium ${
                  idx < 2
                    ? "bg-brand-50 text-brand-700 border border-brand-100"
                    : "bg-slate-100 text-slate-600"
                }`}
              >
                {sub}
              </span>
            ))}
          </div>
        </div>

        {/* Mode & Details Badges */}
        <div className="flex flex-wrap gap-1.5 mt-2.5 text-[11px]">
          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-emerald-50 text-emerald-700 font-medium border border-emerald-100">
            🏠 Home &amp; Online
          </span>
          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-blue-50 text-blue-700 font-medium border border-blue-200">
            📅 {schedule}
          </span>
          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-brand-50 text-brand-700 font-medium border border-brand-100/60">
            🎓 {studentsCount}
          </span>
        </div>

        {/* Preferred Location */}
        <div className="mt-2.5 text-xs text-slate-500 flex items-center gap-1.5 bg-slate-50 px-2.5 py-1.5 rounded-lg border border-slate-100">
          <svg className="w-3.5 h-3.5 text-slate-400 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"></path>
            <path d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"></path>
          </svg>
          <span className="truncate">{areaDisplay}</span>
        </div>
      </div>

      {/* Footer / Remuneration & Button (Demo removed per instruction) */}
      <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between">
        <div>
          <span className="block text-[10px] uppercase font-bold text-slate-400">Salary / Month</span>
          <span className="text-xs sm:text-sm font-extrabold text-brand-700">{salaryText}</span>
        </div>
        <button
          type="button"
          onClick={() => {
            if (onDetailsClick) {
              onDetailsClick(tutor);
            } else {
              const tutorId = tutor._id || tutor.id || "tutor-2";
              navigate(`/tutors/${tutorId}`);
            }
          }}
          className="inline-flex items-center gap-1.5 text-xs font-bold text-brand-700 hover:text-white hover:bg-brand-700 bg-brand-50 px-3.5 py-1.5 rounded-lg transition-colors border border-brand-200/80 cursor-pointer shadow-2xs hover:shadow-xs"
        >
          <span>Profile</span>
          <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path d="M9 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"></path>
          </svg>
        </button>
      </div>
    </article>
  );
};

export default TutorCard;
