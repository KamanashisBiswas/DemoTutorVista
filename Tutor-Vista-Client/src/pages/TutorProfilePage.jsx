import React, { useState, useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import {
  getTutorProfile,
  SIMILAR_RECOMMENDED_TUTORS,
} from "../data/tutorsDetailData";
import femaleAvatar from "../assets/Avatar/FemaleAvatar.jpg";
import maleAvatar from "../assets/Avatar/MaleAvatar.jpg";

const TutorProfilePage = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  // Scroll to top when tutor ID changes
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [id]);

  const tutor = getTutorProfile(id);

  // Fallback image
  const fallbackImg = tutor.gender === "Female" ? femaleAvatar : maleAvatar;
  const avatarSrc = tutor.image || fallbackImg;

  // Interactive booking state
  const [weeklyCommitment, setWeeklyCommitment] = useState("4 Days/wk");
  const [tuitionMode, setTuitionMode] = useState("Home Tuition");
  const [classLevel, setClassLevel] = useState("Class 9 - 10 (O-Level / SSC)");
  const [guardianPhone, setGuardianPhone] = useState("");
  const [bookingSubmitted, setBookingSubmitted] = useState(false);

  // Bookmark & Share state
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [shareToast, setShareToast] = useState(false);

  const handleShare = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      setShareToast(true);
      setTimeout(() => setShareToast(false), 3000);
    }
  };

  const handleBookingSubmit = (e) => {
    e.preventDefault();
    setBookingSubmitted(true);
  };

  return (
    <div className="bg-[#fcfcff] text-slate-800 antialiased selection:bg-brand-500 selection:text-white pb-12">
      {/* Toast Notification for Link Copy */}
      {shareToast && (
        <div className="fixed bottom-6 right-6 z-50 bg-slate-900 text-white px-4 py-3 rounded-xl shadow-xl flex items-center gap-2 text-xs font-semibold animate-bounce">
          <span className="material-symbols-outlined text-emerald-400 text-[18px]">
            check_circle
          </span>
          Profile link copied to clipboard!
        </div>
      )}

      {/* SECTION: Breadcrumbs & Status Bar */}
      <section className="container mx-auto px-4 sm:px-6 lg:px-12 pt-6 pb-2">
        <div className="flex flex-wrap items-center justify-between gap-3 text-body-sm font-body-sm text-on-surface-variant">
          <div className="flex items-center gap-2 flex-wrap">
            <Link
              to="/"
              className="hover:text-primary transition-colors flex items-center gap-1 font-label-md text-slate-600 hover:text-brand-700"
            >
              <span className="material-symbols-outlined text-[16px]">home</span>
              Home
            </Link>
            <span className="text-slate-300">/</span>
            <Link
              to="/tutors"
              className="hover:text-primary transition-colors font-label-md text-slate-600 hover:text-brand-700"
            >
              {tutor.districtName || "Dhaka"} Tutors
            </Link>
            <span className="text-slate-300">/</span>
            <span className="text-slate-600 font-label-md hidden sm:inline">
              {tutor.subjectDisplay || "Mathematics & Economics"}
            </span>
            <span className="text-slate-300 hidden sm:inline">/</span>
            <span className="text-on-surface font-label-md font-bold text-slate-900">
              {tutor.name} ({tutor.tutorCode})
            </span>
          </div>

          <div className="flex items-center gap-3">
            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-secondary-container/40 text-on-secondary-container text-label-sm font-label-sm">
              <span className="w-1.5 h-1.5 rounded-full bg-secondary animate-pulse"></span>{" "}
              Profile Active Today
            </span>
            <span className="text-label-sm font-label-sm text-outline">
              ID: {tutor.tutorId}
            </span>
          </div>
        </div>
      </section>

      {/* SECTION: Master Profile Header Bento */}
      <section className="container mx-auto px-4 sm:px-6 lg:px-12 py-4">
        <div className="bg-surface-container-lowest rounded-3xl p-6 sm:p-8 shadow-sm relative overflow-hidden border border-slate-100">
          {/* Ambient indigo glow backdrop */}
          <div className="absolute -top-32 -right-24 w-96 h-96 rounded-full bg-primary-fixed/30 blur-3xl pointer-events-none"></div>

          <div className="relative z-10 flex flex-col lg:flex-row items-start gap-8 lg:gap-10">
            {/* Tutor Portrait Avatar & Key Status Badges */}
            <div className="flex flex-col items-center sm:items-start shrink-0">
              <div className="relative w-36 h-36 sm:w-44 sm:h-44 rounded-2xl overflow-hidden shadow-md border-2 border-white">
                <img
                  src={avatarSrc}
                  alt={`${tutor.name} - Senior Tutor`}
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = fallbackImg;
                  }}
                  className="w-full h-full object-cover"
                />
                <div className="absolute bottom-2 left-2 right-2 bg-inverse-surface/85 backdrop-blur-md rounded-lg py-1 px-2 flex items-center justify-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-secondary-container"></span>
                  <span className="text-on-primary text-label-sm font-label-sm uppercase tracking-wide">
                    Available Now
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-2 mt-3">
                <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-surface-container text-primary font-label-sm text-label-sm">
                  <span className="material-symbols-outlined text-[14px]">
                    verified_user
                  </span>{" "}
                  Vetted NID
                </span>
                <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-surface-container text-primary font-label-sm text-label-sm">
                  <span className="material-symbols-outlined text-[14px]">
                    school
                  </span>{" "}
                  Degree Verified
                </span>
              </div>
            </div>

            {/* Tutor Identity & Core Credentials */}
            <div className="flex-1 text-left min-w-0">
              <div className="flex flex-wrap items-center gap-2.5 mb-2">
                <span className="px-3 py-1 rounded-full bg-secondary-container text-on-secondary-container text-label-sm font-label-sm flex items-center gap-1 font-bold">
                  <span
                    className="material-symbols-outlined text-[15px]"
                    style={{ fontVariationSettings: "'FILL' 1" }}
                  >
                    verified
                  </span>{" "}
                  {tutor.badgeTier}
                </span>
                <span className="px-2.5 py-0.5 rounded-full bg-tertiary-fixed text-on-tertiary-fixed text-label-sm font-label-sm">
                  {tutor.rankBadge}
                </span>
                <span className="text-on-surface-variant text-body-sm font-body-sm">
                  {tutor.memberSince}
                </span>
              </div>

              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h1 className="text-headline-lg font-headline-lg text-on-surface tracking-tight flex items-center gap-2">
                    <span>{tutor.name}</span>
                    <span
                      className="material-symbols-outlined text-primary text-[28px]"
                      title="Government Verified"
                      style={{ fontVariationSettings: "'FILL' 1" }}
                    >
                      verified
                    </span>
                  </h1>
                  <p className="text-headline-sm font-headline-sm text-primary mt-1">
                    {tutor.headline}
                  </p>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  <button
                    type="button"
                    onClick={handleShare}
                    className="p-2.5 rounded-xl bg-surface-container-low text-on-surface-variant hover:text-primary hover:bg-surface-container transition-all cursor-pointer"
                    title="Share Profile"
                  >
                    <span className="material-symbols-outlined text-[20px]">
                      share
                    </span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setIsBookmarked(!isBookmarked)}
                    className={`p-2.5 rounded-xl transition-all cursor-pointer ${
                      isBookmarked
                        ? "bg-rose-50 text-rose-600"
                        : "bg-surface-container-low text-on-surface-variant hover:text-rose-600 hover:bg-rose-50"
                    }`}
                    title="Save Tutor"
                  >
                    <span
                      className="material-symbols-outlined text-[20px]"
                      style={{
                        fontVariationSettings: isBookmarked ? "'FILL' 1" : "'FILL' 0",
                      }}
                    >
                      bookmark
                    </span>
                  </button>
                </div>
              </div>

              {/* Academic Affiliations */}
              <div className="mt-3 flex flex-wrap items-center gap-y-2 gap-x-4 text-body-md font-body-md text-on-surface-variant">
                <div className="flex items-center gap-1.5 text-on-surface font-label-lg">
                  <span className="material-symbols-outlined text-primary text-[18px]">
                    account_balance
                  </span>
                  <span className="font-bold">{tutor.institution}</span>
                  <span className="text-outline-variant font-normal">
                    • {tutor.institutionDetail}
                  </span>
                </div>
                {tutor.college && (
                  <div className="flex items-center gap-1.5">
                    <span className="material-symbols-outlined text-outline text-[18px]">
                      workspace_premium
                    </span>
                    <span>{tutor.college}</span>
                  </div>
                )}
              </div>

              {/* Highlight Metric Badges */}
              <div className="mt-6 grid grid-cols-2 sm:grid-cols-4 gap-3">
                <div className="bg-surface-container-low rounded-2xl p-3 flex flex-col">
                  <div className="flex items-center gap-1 text-amber-600 font-bold text-headline-sm font-headline-sm">
                    <span
                      className="material-symbols-outlined text-[20px] text-amber-500"
                      style={{ fontVariationSettings: "'FILL' 1" }}
                    >
                      star
                    </span>
                    {tutor.rating}{" "}
                    <span className="text-body-sm font-body-sm text-on-surface-variant font-normal">
                      / 5.0
                    </span>
                  </div>
                  <span className="text-label-sm font-label-sm text-on-surface-variant mt-0.5">
                    {tutor.reviewsCount} Guardian Reviews
                  </span>
                </div>

                <div className="bg-surface-container-low rounded-2xl p-3 flex flex-col">
                  <div className="text-headline-sm font-headline-sm font-bold text-primary">
                    {tutor.experience}
                  </div>
                  <span className="text-label-sm font-label-sm text-on-surface-variant mt-0.5">
                    Active Teaching Exp.
                  </span>
                </div>

                <div className="bg-surface-container-low rounded-2xl p-3 flex flex-col">
                  <div className="text-headline-sm font-headline-sm font-bold text-secondary">
                    {tutor.studentsCount}
                  </div>
                  <span className="text-label-sm font-label-sm text-on-surface-variant mt-0.5">
                    {tutor.studentSuccess}
                  </span>
                </div>

                <div className="bg-surface-container-low rounded-2xl p-3 flex flex-col">
                  <div className="flex items-center gap-1 text-on-surface font-bold text-headline-sm font-headline-sm">
                    <span className="material-symbols-outlined text-secondary text-[20px]">
                      bolt
                    </span>
                    {tutor.responseTime}
                  </div>
                  <span className="text-label-sm font-label-sm text-on-surface-variant mt-0.5">
                    Average Response Time
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION: Dual-Column Layout (Credentials & Pedagogic Details + Sticky Booking Flow) */}
      <section className="container mx-auto px-4 sm:px-6 lg:px-12 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* LEFT COLUMN (Main Content, Credentials, Experience, Reviews) */}
          <div className="lg:col-span-8 space-y-8 min-w-0">
            {/* 1. Teaching Philosophy & Bio Card */}
            <div className="bg-surface-container-lowest rounded-3xl p-6 sm:p-8 shadow-sm border border-slate-100">
              <div className="flex items-center gap-2 mb-4">
                <span className="p-2 rounded-xl bg-surface-container text-primary">
                  <span className="material-symbols-outlined text-[20px]">
                    psychology
                  </span>
                </span>
                <h2 className="text-headline-md font-headline-md text-on-surface">
                  Teaching Philosophy &amp; Pedagogy
                </h2>
              </div>
              <p className="text-body-lg font-body-lg text-on-surface-variant leading-relaxed">
                {tutor.philosophy}
              </p>
              <div className="mt-6 grid grid-cols-1 sm:grid-cols-3 gap-4">
                {tutor.pedagogyCards.map((card, idx) => (
                  <div key={idx} className="p-4 rounded-2xl bg-surface-container-low">
                    <div className="flex items-center gap-2 text-primary font-label-lg font-label-lg mb-1">
                      <span className="material-symbols-outlined text-[18px]">
                        {card.icon}
                      </span>
                      <span>{card.title}</span>
                    </div>
                    <p className="text-body-sm font-body-sm text-on-surface-variant">
                      {card.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* 2. Subject Matrix & Curricula Capabilities */}
            <div className="bg-surface-container-lowest rounded-3xl p-6 sm:p-8 shadow-sm border border-slate-100">
              <div className="flex items-center justify-between gap-4 mb-6">
                <div className="flex items-center gap-2">
                  <span className="p-2 rounded-xl bg-surface-container text-primary">
                    <span className="material-symbols-outlined text-[20px]">
                      menu_book
                    </span>
                  </span>
                  <h2 className="text-headline-md font-headline-md text-on-surface">
                    Subject Specializations &amp; Levels
                  </h2>
                </div>
                <span className="text-label-sm font-label-sm px-3 py-1 rounded-full bg-secondary-container/50 text-on-secondary-container font-semibold">
                  {tutor.levelBadge}
                </span>
              </div>
              <div className="space-y-4">
                <div>
                  <span className="text-label-md font-label-md uppercase tracking-wider text-outline">
                    Primary Focus Subjects
                  </span>
                  <div className="flex flex-wrap gap-2 mt-2">
                    {tutor.primaryFocusSubjects.map((sub, idx) => (
                      <span
                        key={idx}
                        className={`px-3.5 py-1.5 rounded-xl font-label-md text-label-md shadow-xs ${
                          sub.highlighted
                            ? "bg-primary text-on-primary"
                            : "bg-surface-container text-primary"
                        }`}
                      >
                        {sub.name}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="pt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="p-4 rounded-2xl bg-surface-container-low">
                    <span className="text-label-md font-label-md uppercase tracking-wide text-primary font-bold">
                      Curricula Covered
                    </span>
                    <ul className="mt-2.5 space-y-1.5 text-body-sm font-body-sm text-on-surface-variant">
                      {tutor.curriculaCovered.map((curr, idx) => (
                        <li key={idx} className="flex items-center gap-2">
                          <span
                            className="material-symbols-outlined text-secondary text-[16px]"
                            style={{ fontVariationSettings: "'FILL' 1" }}
                          >
                            check_circle
                          </span>
                          <span>{curr}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="p-4 rounded-2xl bg-surface-container-low">
                    <span className="text-label-md font-label-md uppercase tracking-wide text-primary font-bold">
                      Teaching Medium &amp; Formats
                    </span>
                    <ul className="mt-2.5 space-y-1.5 text-body-sm font-body-sm text-on-surface-variant">
                      {tutor.teachingMediums.map((med, idx) => (
                        <li key={idx} className="flex items-center gap-2">
                          <span className="material-symbols-outlined text-primary text-[16px]">
                            {med.icon}
                          </span>
                          <span>{med.text}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            {/* 3. Verified Educational Journey Timeline */}
            <div className="bg-surface-container-lowest rounded-3xl p-6 sm:p-8 shadow-sm border border-slate-100">
              <div className="flex items-center justify-between gap-4 mb-6">
                <div className="flex items-center gap-2">
                  <span className="p-2 rounded-xl bg-surface-container text-primary">
                    <span className="material-symbols-outlined text-[20px]">
                      history_edu
                    </span>
                  </span>
                  <h2 className="text-headline-md font-headline-md text-on-surface">
                    Education &amp; Verification Trail
                  </h2>
                </div>
                <span className="inline-flex items-center gap-1 text-label-sm font-label-sm px-2.5 py-1 rounded-full bg-surface-container text-primary font-semibold">
                  <span className="material-symbols-outlined text-[14px]">
                    shield
                  </span>{" "}
                  All Records Vetted
                </span>
              </div>

              <div className="relative pl-6 space-y-6 before:content-[''] before:absolute before:left-2.5 before:top-2 before:bottom-2 before:w-0.5 before:bg-surface-container-highest">
                {tutor.educationTimeline.map((item, idx) => (
                  <div key={idx} className="relative">
                    <div
                      className={`absolute -left-[27px] top-1.5 w-3.5 h-3.5 rounded-full ${item.dotColor} ring-4 ring-surface-container-lowest`}
                    ></div>
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                      <h3 className="text-headline-sm font-headline-sm text-on-surface font-bold">
                        {item.institution}
                      </h3>
                      <span className="text-label-sm font-label-sm px-2 py-0.5 rounded-md bg-surface-container text-on-surface-variant font-medium">
                        {item.period}
                      </span>
                    </div>
                    <p className="text-body-md font-body-md text-primary font-medium mt-0.5">
                      {item.degree}
                    </p>
                    <p className="text-body-sm font-body-sm text-on-surface-variant mt-1 leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* 4. Student Success & Milestones Bento */}
            <div className="bg-surface-container-lowest rounded-3xl p-6 sm:p-8 shadow-sm border border-slate-100">
              <div className="flex items-center gap-2 mb-6">
                <span className="p-2 rounded-xl bg-surface-container text-primary">
                  <span className="material-symbols-outlined text-[20px]">
                    trophy
                  </span>
                </span>
                <h2 className="text-headline-md font-headline-md text-on-surface">
                  Student Track Record &amp; Achievements
                </h2>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {tutor.studentAchievements.map((item, idx) => (
                  <div
                    key={idx}
                    className="p-5 rounded-2xl bg-surface-container-low flex flex-col justify-between"
                  >
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <span
                          className={`text-label-sm font-label-sm px-2 py-0.5 rounded ${item.badgeStyle} font-semibold`}
                        >
                          {item.badge}
                        </span>
                        <span
                          className={`text-headline-md font-headline-md font-bold ${item.countColor}`}
                        >
                          {item.count}
                        </span>
                      </div>
                      <h4 className="text-label-lg font-label-lg text-on-surface font-bold">
                        {item.title}
                      </h4>
                      <p className="text-body-sm font-body-sm text-on-surface-variant mt-1 leading-relaxed">
                        {item.description}
                      </p>
                    </div>
                    <div className="mt-4 pt-3 border-t border-surface-container-high/60 flex items-center gap-2 text-label-sm font-label-sm text-on-surface-variant">
                      <span
                        className="material-symbols-outlined text-secondary text-[16px]"
                        style={{ fontVariationSettings: "'FILL' 1" }}
                      >
                        verified
                      </span>{" "}
                      {item.tag}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* 5. Guardian & Student Testimonials */}
            <div className="bg-surface-container-lowest rounded-3xl p-6 sm:p-8 shadow-sm border border-slate-100">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="p-2 rounded-xl bg-surface-container text-primary">
                      <span className="material-symbols-outlined text-[20px]">
                        rate_review
                      </span>
                    </span>
                    <h2 className="text-headline-md font-headline-md text-on-surface">
                      Verified Guardian Reviews
                    </h2>
                  </div>
                  <p className="text-body-sm font-body-sm text-on-surface-variant mt-1">
                    All reviews verified by TutorBridge parent coordinate audit
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-headline-sm font-headline-sm font-bold text-amber-600 flex items-center gap-1">
                    <span
                      className="material-symbols-outlined text-[22px] text-amber-500"
                      style={{ fontVariationSettings: "'FILL' 1" }}
                    >
                      star
                    </span>
                    {tutor.rating}
                  </span>
                  <span className="text-body-sm font-body-sm text-on-surface-variant">
                    ({tutor.reviewsCount} reviews)
                  </span>
                </div>
              </div>

              <div className="space-y-4">
                {tutor.guardianReviews.map((rev, idx) => (
                  <div
                    key={idx}
                    className="p-5 rounded-2xl bg-surface-container-low"
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-surface-container-highest flex items-center justify-center font-bold text-primary text-body-md font-body-md">
                          {rev.initials}
                        </div>
                        <div>
                          <h4 className="text-label-lg font-label-lg text-on-surface font-bold">
                            {rev.name}
                          </h4>
                          <p className="text-label-sm font-label-sm text-on-surface-variant">
                            {rev.designation}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center text-amber-500">
                        {Array.from({ length: rev.stars }).map((_, i) => (
                          <span
                            key={i}
                            className="material-symbols-outlined text-[18px]"
                            style={{ fontVariationSettings: "'FILL' 1" }}
                          >
                            star
                          </span>
                        ))}
                      </div>
                    </div>
                    <p className="text-body-md font-body-md text-on-surface-variant mt-3 leading-relaxed">
                      {rev.review}
                    </p>
                    <div className="mt-3 flex items-center gap-2 text-label-sm font-label-sm text-outline">
                      <span
                        className="material-symbols-outlined text-secondary text-[16px]"
                        style={{ fontVariationSettings: "'FILL' 1" }}
                      >
                        verified
                      </span>{" "}
                      {rev.verifiedTag}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* RIGHT COLUMN (Sticky Booking & Direct Hire Flow) */}
          <div className="lg:col-span-4 space-y-6 lg:sticky lg:top-24">
            {/* Primary Booking Card */}
            <div
              className="bg-surface-container-lowest rounded-3xl p-6 shadow-md relative overflow-hidden border border-slate-100"
              id="booking-widget"
            >
              <div className="flex items-center justify-between gap-2 pb-4 border-b border-surface-container-high/70">
                <div>
                  <span className="text-label-sm font-label-sm text-on-surface-variant uppercase tracking-wide">
                    Expected Remuneration
                  </span>
                  <div className="text-headline-md font-headline-md font-bold text-on-surface flex items-baseline gap-1 mt-0.5">
                    <span className="text-primary font-extrabold">
                      {tutor.expectedSalary}
                    </span>
                    <span className="text-body-sm font-body-sm text-on-surface-variant font-normal">
                      {tutor.salaryUnit}
                    </span>
                  </div>
                </div>
                <span className="px-2.5 py-1 rounded-full bg-surface-container text-on-surface font-label-sm text-label-sm">
                  {tutor.salaryRange}
                </span>
              </div>

              {bookingSubmitted ? (
                <div className="mt-5 p-6 rounded-2xl bg-emerald-50 border border-emerald-200 text-center space-y-3">
                  <div className="w-12 h-12 rounded-full bg-emerald-500 text-white flex items-center justify-center mx-auto shadow-md">
                    <span className="material-symbols-outlined text-[28px]">
                      check
                    </span>
                  </div>
                  <h3 className="text-base font-bold text-emerald-900">
                    Demo Request Submitted!
                  </h3>
                  <p className="text-xs text-emerald-700 leading-relaxed">
                    Our academic coordinator will call you within 15 minutes to
                    confirm the schedule with {tutor.name}.
                  </p>
                  <button
                    type="button"
                    onClick={() => setBookingSubmitted(false)}
                    className="text-xs text-brand-700 font-bold underline mt-2 inline-block cursor-pointer"
                  >
                    Submit another request
                  </button>
                </div>
              ) : (
                <form className="space-y-4 mt-5" onSubmit={handleBookingSubmit}>
                  {/* Weekly Commitment Selector */}
                  <div>
                    <label className="block text-label-md font-label-md text-on-surface font-semibold mb-2">
                      Weekly Commitment
                    </label>
                    <div className="grid grid-cols-3 gap-2">
                      {["3 Days/wk", "4 Days/wk", "5 Days/wk"].map((item) => (
                        <button
                          key={item}
                          type="button"
                          onClick={() => setWeeklyCommitment(item)}
                          className={`py-2 px-3 rounded-xl font-label-md text-label-md transition-all cursor-pointer ${
                            weeklyCommitment === item
                              ? "bg-primary text-on-primary shadow-xs"
                              : "bg-surface-container text-on-surface hover:bg-surface-container-high"
                          }`}
                        >
                          {item}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Mode Selector */}
                  <div>
                    <label className="block text-label-md font-label-md text-on-surface font-semibold mb-2">
                      Tuition Mode
                    </label>
                    <div className="grid grid-cols-2 gap-2">
                      {["Home Tuition", "Online 1-on-1"].map((mode) => (
                        <label
                          key={mode}
                          onClick={() => setTuitionMode(mode)}
                          className={`flex items-center justify-center gap-1.5 p-2.5 rounded-xl cursor-pointer transition-all border ${
                            tuitionMode === mode
                              ? "bg-indigo-50/80 border-brand-500 text-brand-700 font-bold"
                              : "bg-surface-container-low border-transparent text-on-surface hover:bg-surface-container"
                          }`}
                        >
                          <input
                            type="radio"
                            name="mode"
                            value={mode}
                            checked={tuitionMode === mode}
                            onChange={() => setTuitionMode(mode)}
                            className="text-primary focus:ring-primary h-4 w-4"
                          />
                          <span className="text-label-md font-label-md">
                            {mode}
                          </span>
                        </label>
                      ))}
                    </div>
                  </div>

                  {/* Class & Medium Selector */}
                  <div>
                    <label className="block text-label-md font-label-md text-on-surface font-semibold mb-1">
                      Student's Class Level
                    </label>
                    <div className="relative">
                      <select
                        value={classLevel}
                        onChange={(e) => setClassLevel(e.target.value)}
                        className="w-full pl-3.5 pr-8 py-2.5 rounded-xl bg-surface-container-low text-on-surface text-body-sm font-body-sm focus:outline-none focus:bg-surface-container-lowest shadow-xs cursor-pointer border border-transparent focus:border-brand-500"
                      >
                        <option>Class 9 - 10 (O-Level / SSC)</option>
                        <option>Class 11 - 12 (A-Level / HSC)</option>
                        <option>Class 7 - 8 (Junior High)</option>
                        <option>University Admission / IBA Prep</option>
                      </select>
                    </div>
                  </div>

                  {/* Parent Phone Number for Instant Match */}
                  <div>
                    <label className="block text-label-md font-label-md text-on-surface font-semibold mb-1">
                      Guardian Contact Number
                    </label>
                    <div className="relative">
                      <span className="absolute left-3.5 top-2.5 text-body-sm font-body-sm text-outline font-semibold">
                        +880
                      </span>
                      <input
                        type="tel"
                        required
                        value={guardianPhone}
                        onChange={(e) => setGuardianPhone(e.target.value)}
                        placeholder="017XX-XXXXXX"
                        className="w-full pl-16 pr-3.5 py-2.5 rounded-xl bg-surface-container-low text-on-surface text-body-sm font-body-sm focus:outline-none focus:bg-surface-container-lowest shadow-xs border border-transparent focus:border-brand-500"
                      />
                    </div>
                  </div>

                  {/* Action CTAs */}
                  <div className="space-y-2.5 pt-2">
                    <button
                      type="submit"
                      className="w-full py-3.5 px-4 rounded-xl bg-primary hover:bg-primary-container text-on-primary font-label-lg font-label-lg shadow-md flex items-center justify-center gap-2 transition-all cursor-pointer hover:scale-[1.01]"
                    >
                      <span className="material-symbols-outlined text-[18px]">
                        verified
                      </span>
                      Request 1-Day Free Trial Demo
                    </button>
                    <a
                      href="tel:+8809612888777"
                      className="w-full py-3 px-4 rounded-xl bg-surface-container text-primary hover:bg-surface-container-high font-label-lg font-label-lg flex items-center justify-center gap-2 transition-all"
                    >
                      <span className="material-symbols-outlined text-[18px]">
                        phone_in_talk
                      </span>
                      Direct Hire via Coordinator
                    </a>
                  </div>
                </form>
              )}

              {/* TutorBridge 100% Assurance Box */}
              <div className="mt-6 pt-5 border-t border-surface-container-high/70 space-y-2 text-label-sm font-label-sm text-on-surface-variant">
                <div className="flex items-center gap-2 text-secondary font-semibold">
                  <span
                    className="material-symbols-outlined text-[16px]"
                    style={{ fontVariationSettings: "'FILL' 1" }}
                  >
                    check_circle
                  </span>
                  <span>100% Free Demo Class • Zero Advance Fee</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-primary text-[16px]">
                    swap_horiz
                  </span>
                  <span>Hassle-Free Replacement if not 100% satisfied</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-primary text-[16px]">
                    verified_user
                  </span>
                  <span>Verified NID, University ID &amp; Address</span>
                </div>
              </div>
            </div>

            {/* Teaching Hubs & Weekly Availability Mini-Card */}
            <div className="bg-surface-container-lowest rounded-3xl p-6 shadow-sm space-y-4 border border-slate-100">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-primary text-[20px]">
                  location_on
                </span>
                <h3 className="text-headline-sm font-headline-sm text-on-surface">
                  Preferred Teaching Hubs
                </h3>
              </div>
              <div className="flex flex-wrap gap-2">
                {tutor.teachingHubs.map((hub, idx) => (
                  <span
                    key={idx}
                    className="px-2.5 py-1 rounded-lg bg-surface-container text-on-surface text-label-sm font-label-sm"
                  >
                    {hub}
                  </span>
                ))}
              </div>
              <div className="pt-3 border-t border-surface-container-high/70">
                <div className="flex items-center justify-between text-label-sm font-label-sm mb-2">
                  <span className="text-on-surface-variant font-medium">
                    Weekly Schedule Slots:
                  </span>
                  <span className="text-secondary font-bold">
                    {tutor.openSlotsCount}
                  </span>
                </div>
                <div className="grid grid-cols-7 gap-1 text-center">
                  {tutor.scheduleSlots.map((s, idx) => (
                    <div
                      key={idx}
                      className={`p-1 rounded font-label-sm text-[10px] ${
                        s.active
                          ? "bg-secondary-container/50 text-on-secondary-container"
                          : "bg-surface-container text-outline"
                      }`}
                    >
                      {s.day}
                      <br />
                      <span className={s.active ? "font-bold" : ""}>
                        {s.slot}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION: Similar Verified Tutors in Dhaka (Recommendation Grid) */}
      <section className="container mx-auto px-4 sm:px-6 lg:px-12 py-10">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
          <div>
            <h2 className="text-headline-md font-headline-md text-on-surface">
              Explore Other Verified Tutors in Nearby Areas
            </h2>
            <p className="text-body-sm font-body-sm text-on-surface-variant mt-0.5">
              Top-ranked scholars from BUET, DU, and Medical Colleges with
              immediate availability
            </p>
          </div>
          <Link
            to="/tutors"
            className="text-primary hover:text-primary-container font-label-md font-label-md flex items-center gap-1 font-bold text-brand-700"
          >
            Browse all 8,420+ Dhaka Tutors
            <span className="material-symbols-outlined text-[16px]">
              arrow_forward
            </span>
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {SIMILAR_RECOMMENDED_TUTORS.map((simTutor) => (
            <div
              key={simTutor.id}
              className="bg-surface-container-lowest rounded-3xl p-6 shadow-sm hover:shadow-md transition-all flex flex-col justify-between border border-slate-100 group"
            >
              <div>
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <div className="relative w-14 h-14 rounded-2xl bg-surface-container-highest overflow-hidden">
                      <img
                        src={simTutor.image}
                        alt={simTutor.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                      />
                      <span className="absolute bottom-1 right-1 w-2.5 h-2.5 rounded-full bg-secondary ring-2 ring-surface-container-lowest"></span>
                    </div>
                    <div>
                      <h3 className="text-headline-sm font-headline-sm text-on-surface flex items-center gap-1 font-bold">
                        <span>{simTutor.name}</span>
                        <span
                          className="material-symbols-outlined text-primary text-[18px]"
                          style={{ fontVariationSettings: "'FILL' 1" }}
                        >
                          verified
                        </span>
                      </h3>
                      <span className="text-label-sm font-label-sm text-primary font-semibold">
                        {simTutor.institution}
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center gap-1 text-amber-600 font-bold text-label-md font-label-md">
                    <span
                      className="material-symbols-outlined text-[16px] text-amber-500"
                      style={{ fontVariationSettings: "'FILL' 1" }}
                    >
                      star
                    </span>
                    {simTutor.rating}
                  </div>
                </div>

                <div className="flex flex-wrap gap-1.5 mt-4">
                  {simTutor.subjects.map((sub, sIdx) => (
                    <span
                      key={sIdx}
                      className="px-2 py-0.5 rounded-lg bg-surface-container text-on-surface text-label-sm font-label-sm"
                    >
                      {sub}
                    </span>
                  ))}
                </div>

                <p className="text-body-sm font-body-sm text-on-surface-variant mt-3 line-clamp-2 leading-relaxed">
                  {simTutor.description}
                </p>

                <div className="mt-4 pt-3 border-t border-surface-container-high/60 flex items-center justify-between text-label-sm font-label-sm text-on-surface-variant">
                  <span>{simTutor.area}</span>
                  <span className="font-bold text-on-surface text-slate-900">
                    {simTutor.salary}
                  </span>
                </div>
              </div>

              <button
                type="button"
                onClick={() => navigate(`/tutors/${simTutor.id}`)}
                className="mt-5 w-full py-2.5 rounded-xl bg-surface-container hover:bg-primary hover:text-on-primary text-primary font-label-md font-label-md transition-all cursor-pointer font-bold"
              >
                View Profile &amp; Demo
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* SECTION: AssistanceBannerSection */}
      <section
        className="container mx-auto px-4 sm:px-6 lg:px-12 py-10"
        data-purpose="lead-capture-banner"
      >
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-slate-900 via-brand-900 to-slate-900 text-white p-7 sm:p-10 lg:p-12 shadow-xl">
          {/* Background accent glow */}
          <div className="absolute -top-24 -right-24 w-80 h-80 rounded-full bg-brand-500/20 blur-3xl pointer-events-none"></div>

          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Content Side */}
            <div className="lg:col-span-8">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 border border-white/20 text-white text-xs font-semibold mb-4 backdrop-blur-sm">
                <svg
                  className="w-3.5 h-3.5 text-amber-300"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    clipRule="evenodd"
                    d="M11.3 1.046A1 1 0 0112 2v5h4a1 1 0 01.82 1.573l-7 10A1 1 0 018 18v-5H4a1 1 0 01-.82-1.573l7-10a1 1 0 011.12-.38z"
                    fillRule="evenodd"
                  ></path>
                </svg>
                Instant Custom Matching
              </div>

              <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white mb-3">
                Can't find the exact subject or schedule you need?
              </h2>

              <p className="text-slate-300 text-sm sm:text-base leading-relaxed mb-6">
                Don't spend hours searching through profiles. Tell us your
                curriculum, grade, and preferred area — our academic
                coordination team will handpick the top 3 verified educators
                for you within 24 hours.
              </p>

              {/* Trust Badges */}
              <div className="flex flex-wrap items-center gap-4 text-xs font-semibold text-emerald-300">
                <span className="flex items-center gap-1.5 bg-emerald-950/60 px-2.5 py-1 rounded-md border border-emerald-500/30">
                  <svg
                    className="w-3.5 h-3.5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      d="M5 13l4 4L19 7"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2.5"
                    ></path>
                  </svg>
                  0% Registration Fee
                </span>
                <span className="flex items-center gap-1.5 bg-emerald-950/60 px-2.5 py-1 rounded-md border border-emerald-500/30">
                  <svg
                    className="w-3.5 h-3.5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      d="M5 13l4 4L19 7"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2.5"
                    ></path>
                  </svg>
                  Free Demo Class Included
                </span>
                <span className="flex items-center gap-1.5 bg-emerald-950/60 px-2.5 py-1 rounded-md border border-emerald-500/30">
                  <svg
                    className="w-3.5 h-3.5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      d="M5 13l4 4L19 7"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2.5"
                    ></path>
                  </svg>
                  Free Teacher Replacement
                </span>
              </div>
            </div>

            {/* CTA Side */}
            <div className="lg:col-span-4 flex flex-col gap-3">
              <Link
                to="/request-tutor"
                className="w-full text-center px-6 py-3.5 rounded-xl bg-brand-600 hover:bg-brand-500 text-white font-bold text-sm shadow-lg shadow-brand-700/50 transition-all hover:scale-[1.02]"
              >
                Post Tuition Request (Free)
              </Link>
              <a
                href="tel:01700000000"
                className="w-full text-center px-6 py-3.5 rounded-xl bg-white/10 hover:bg-white/20 border border-white/20 text-white font-semibold text-sm backdrop-blur-md transition-colors flex items-center justify-center gap-2"
              >
                <svg
                  className="w-4 h-4 text-emerald-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                  ></path>
                </svg>
                Talk to Counselor (01700-000000)
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default TutorProfilePage;
