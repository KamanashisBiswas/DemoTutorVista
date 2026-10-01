import React from "react";
import { Link } from "react-router-dom";

const TutorPageHeader = ({ activeDivision = "All Bangladesh", onSelectDivision }) => {
  const divisionPills = [
    { label: "All Bangladesh", value: "All Bangladesh", count: "15,480" },
    { label: "Dhaka Tutors", value: "Dhaka", count: "8,420" },
    { label: "Chattogram", value: "Chattogram", count: "2,850" },
    { label: "Sylhet", value: "Sylhet", count: "1,120" },
    { label: "Rajshahi", value: "Rajshahi", count: "980" },
    { label: "Khulna", value: "Khulna", count: "820" },
    { label: "Online / Remote", value: "Online", count: "1,290" },
  ];

  return (
    <section className="w-full bg-[#f2f3ff] py-6 shadow-2xs border-b border-slate-100" data-purpose="tutor-header-strip">
      <div className="container mx-auto px-4 sm:px-6 lg:px-12 flex flex-col gap-6">
        {/* Breadcrumb Navigation & Live Badges */}
        <div className="flex flex-wrap items-center justify-between gap-4">
          <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-xs sm:text-sm text-slate-500">
            <Link to="/" className="hover:text-brand-700 transition-colors flex items-center gap-1 font-medium">
              <svg className="w-4 h-4 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"></path>
              </svg>
              <span>Home</span>
            </Link>
            <span className="text-slate-300">/</span>
            <Link to="/tutors" className="hover:text-brand-700 transition-colors">
              Tutor Directory
            </Link>
            <span className="text-slate-300">/</span>
            <span className="text-slate-900 font-bold">Browse Verified Tutors</span>
          </nav>

          <div className="flex items-center gap-3">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-100 text-emerald-800 text-xs font-semibold shadow-2xs">
              <span className="w-2 h-2 rounded-full bg-emerald-600 animate-pulse"></span>
              <span>1,250+ New Verified Tutors Today</span>
            </div>
            <div className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-indigo-100 text-brand-700 text-xs font-semibold">
              <svg className="w-4 h-4 text-brand-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path>
              </svg>
              <span>Instant Tutor Match Active</span>
            </div>
          </div>
        </div>

        {/* Hero Header & High Impact Copy */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-2">
          <div className="space-y-2 max-w-3xl">
            <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-md bg-indigo-100 text-brand-700 text-xs font-bold tracking-wider uppercase">
              Bangladesh's Premier Tutor Marketplace
            </div>
            <h1 className="text-3xl sm:text-4xl lg:text-[44px] font-extrabold text-slate-900 tracking-tight leading-tight font-sans">
              Browse Verified <span className="text-brand-700">Tutors</span>
            </h1>
            <p className="text-sm sm:text-base text-slate-600 leading-relaxed font-sans">
              Browse <span className="font-bold text-slate-900">15,480+ verified background-checked tutors</span> from top universities across Dhaka, Chattogram, Sylhet, and nationwide. Connect directly or request custom matching.
            </p>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center gap-3 self-start md:self-auto shrink-0">
            <Link
              to="/request-tutor"
              className="px-4 py-2.5 rounded-xl bg-white border border-slate-200 text-slate-800 text-xs sm:text-sm font-semibold hover:bg-slate-50 transition-all flex items-center gap-2 shadow-xs cursor-pointer"
            >
              <svg className="w-4 h-4 text-brand-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4"></path>
              </svg>
              <span>Post a Tuition Need</span>
            </Link>
            <Link
              to="/apply-tutor"
              className="px-4 py-2.5 rounded-xl bg-brand-700 hover:bg-brand-800 text-white text-xs sm:text-sm font-semibold transition-all flex items-center gap-2 shadow-sm shadow-brand-700/20 cursor-pointer"
            >
              <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                ></path>
              </svg>
              <span>Become a Tutor</span>
            </Link>
          </div>
        </div>

        {/* Quick Division Geographic Filter Bar */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 no-scrollbar" data-purpose="division-pills">
          {divisionPills.map((pill) => {
            const isSelected =
              activeDivision === pill.value ||
              (!activeDivision && pill.value === "All Bangladesh") ||
              (activeDivision === "" && pill.value === "All Bangladesh");

            return (
              <button
                key={pill.label}
                type="button"
                onClick={() => onSelectDivision && onSelectDivision(pill.value)}
                className={`px-4 py-2 rounded-full text-xs sm:text-sm font-semibold flex items-center gap-2 shrink-0 transition-all cursor-pointer ${
                  isSelected
                    ? "bg-brand-700 text-white shadow-xs"
                    : "bg-white border border-slate-200 hover:bg-slate-50 text-slate-700"
                }`}
              >
                <span>{pill.label}</span>
                <span
                  className={`px-1.5 py-0.5 rounded-full text-[10px] ${
                    isSelected ? "bg-white/20 font-bold text-white" : "bg-slate-100 font-semibold text-slate-600"
                  }`}
                >
                  {pill.count}
                </span>
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default TutorPageHeader;
