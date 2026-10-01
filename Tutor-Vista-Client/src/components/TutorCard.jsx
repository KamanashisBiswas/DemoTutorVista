import React from "react";

const TutorCard = ({
  tutor,
  onDetailsClick,
  truncateText = (t, l) => (t && t.length > l ? t.substring(0, l) + "..." : t),
}) => {
  if (!tutor) return null;

  // Primary subject and count
  const subjects = Array.isArray(tutor.preferredSubjects) && tutor.preferredSubjects.length > 0
    ? tutor.preferredSubjects
    : tutor.educationSections?.[0]?.groupSubject
    ? [tutor.educationSections[0].groupSubject]
    : ["General Academic"];

  const primarySubject = subjects[0];
  const moreSubjectsCount = subjects.length > 1 ? subjects.length - 1 : 0;

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
      ? tutor.preferredLocations.slice(0, 2).join(", ")
      : tutor.district || tutor.division
      ? `${tutor.district || ""}${tutor.district && tutor.division ? ", " : ""}${tutor.division || ""}`
      : "Dhaka, Bangladesh";

  // Clean short experience tag (avoid paragraph blowup)
  let expDisplay = "Experienced";
  if (tutor.experienceYears) {
    expDisplay = `${tutor.experienceYears}+ Yrs Exp`;
  } else if (typeof tutor.experience === "string") {
    const match = tutor.experience.match(/(\d+(?:\.\d+)?)\s*(?:years?|yrs?)/i);
    if (match) {
      expDisplay = `${Math.round(parseFloat(match[1]))}+ Yrs Exp`;
    } else if (tutor.experience.length <= 15) {
      expDisplay = tutor.experience;
    } else {
      expDisplay = "Experienced";
    }
  }

  // Initials for fallback avatar
  const initials = tutor.name
    ? tutor.name
        .split(" ")
        .map((n) => n[0])
        .filter(Boolean)
        .slice(0, 2)
        .join("")
        .toUpperCase()
    : "TB";

  // Soft palette variations for initials badge
  const initialColors = [
    "bg-brand-50 text-brand-700 border-brand-100",
    "bg-indigo-50 text-brand-700 border-indigo-100",
    "bg-purple-50 text-purple-700 border-purple-100",
    "bg-blue-50 text-blue-700 border-blue-100",
    "bg-cyan-50 text-cyan-700 border-cyan-100",
    "bg-amber-50 text-amber-700 border-amber-100",
    "bg-rose-50 text-rose-700 border-rose-100",
    "bg-teal-50 text-teal-700 border-teal-100",
  ];
  const colorIndex = (tutor.name ? tutor.name.charCodeAt(0) : 0) % initialColors.length;
  const avatarBg = initialColors[colorIndex];

  return (
    <article className="bg-white rounded-2xl border border-slate-200/90 shadow-sm hover:shadow-md hover:border-brand-200 transition-all duration-200 flex flex-col justify-between p-4 group">
      <div>
        {/* Header: Avatar, Rating & Shield */}
        <div className="flex items-start justify-between gap-3 mb-3">
          <div className="relative">
            {tutor.profileImage?.url ? (
              <div className="w-14 h-14 rounded-2xl overflow-hidden border border-brand-100 shadow-inner bg-slate-50">
                <img
                  src={tutor.profileImage.url}
                  alt={tutor.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-200"
                />
              </div>
            ) : (
              <div className={`w-14 h-14 rounded-2xl border flex items-center justify-center font-bold text-lg shadow-inner ${avatarBg}`}>
                {initials}
              </div>
            )}
            <span
              className="absolute -bottom-1 -right-1 w-5 h-5 bg-emerald-500 rounded-full border-2 border-white flex items-center justify-center text-white"
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
              <span>{tutor.rating ? Number(tutor.rating).toFixed(1) : "4.9"}</span>
            </div>
            <span className="text-[11px] text-emerald-600 font-semibold mt-1 flex items-center gap-0.5">
              <svg className="w-3 h-3 text-emerald-600" fill="currentColor" viewBox="0 0 20 20">
                <path
                  clipRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                  fillRule="evenodd"
                ></path>
              </svg>
              <span>Verified</span>
            </span>
          </div>
        </div>

        {/* Name & Academic Credential */}
        <h2 className="text-base font-bold text-slate-900 group-hover:text-brand-700 transition-colors">
          {tutor.name}
        </h2>
        <p className="text-xs text-slate-600 flex items-center gap-1.5 mt-0.5">
          <svg className="w-3.5 h-3.5 text-slate-400 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"></path>
          </svg>
          <span className="truncate">{institution}</span>
        </p>
        <span className="inline-block text-[11px] text-slate-400 font-medium truncate max-w-full">
          {degree}
        </span>

        {/* Subjects Container */}
        <div className="mt-3 pt-2.5 border-t border-slate-100">
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-1">
            Subjects
          </span>
          <div className="flex flex-wrap gap-1.5">
            <span className="text-xs px-2.5 py-0.5 rounded bg-brand-50 text-brand-700 font-medium">
              {primarySubject}
            </span>
            {moreSubjectsCount > 0 && (
              <span className="text-xs px-2 py-0.5 rounded bg-slate-100 text-slate-600 font-medium">
                +{moreSubjectsCount} more
              </span>
            )}
          </div>
        </div>

        {/* Mode & Experience Badges */}
        <div className="flex flex-wrap gap-1.5 mt-2.5 text-[11px]">
          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-emerald-50 text-emerald-700 font-medium">
            🏠 Home &amp; Online
          </span>
          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-slate-100 text-slate-700 font-medium">
            ⏱ {expDisplay}
          </span>
        </div>

        {/* Preferred Area */}
        <div className="mt-2.5 text-xs text-slate-500 flex items-center gap-1 bg-slate-50 px-2 py-1 rounded-md">
          <svg className="w-3.5 h-3.5 text-slate-400 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path>
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path>
          </svg>
          <span className="truncate">{areaDisplay}</span>
        </div>
      </div>

      {/* Footer / Remuneration & Button */}
      <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between">
        <div>
          <span className="block text-[10px] uppercase font-bold text-slate-400">
            Remuneration
          </span>
          <span className="text-xs font-bold text-slate-800">
            {tutor.expectedSalary ? `৳ ${tutor.expectedSalary}` : "Negotiable"}
          </span>
        </div>
        <button
          type="button"
          onClick={() => onDetailsClick && onDetailsClick(tutor)}
          className="inline-flex items-center gap-1 text-xs font-bold text-brand-700 hover:text-brand-800 bg-brand-50 hover:bg-brand-100 px-3 py-1.5 rounded-lg transition-colors cursor-pointer"
        >
          <span>View Profile</span>
          <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path>
          </svg>
        </button>
      </div>
    </article>
  );
};

export default TutorCard;
