import React, { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { Link } from "react-router-dom";

const LandingPopup = ({ isOpen, onClose }) => {
  const [dontShowToday, setDontShowToday] = useState(false);

  // Close on Escape key press
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") {
        handleClose();
      }
    };

    if (isOpen) {
      document.addEventListener("keydown", handleKeyDown);
      // Prevent background scrolling while modal is open
      document.body.style.overflow = "hidden";
    }

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  const handleClose = () => {
    if (dontShowToday) {
      localStorage.setItem(
        "tutorbridge_popup_dismissed_date",
        new Date().toDateString()
      );
    }
    onClose();
  };

  if (!isOpen) return null;

  const content = (
    <div
      className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-sm flex items-center justify-center p-3 sm:p-4 md:p-6 overflow-y-auto"
      onClick={handleClose}
      role="dialog"
      aria-modal="true"
    >
      <div
        className="relative w-full max-w-2xl bg-white rounded-3xl shadow-2xl border border-indigo-100 overflow-hidden my-auto transform transition-all animate-in fade-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Floating Close Button */}
        <button
          onClick={handleClose}
          className="absolute top-4 right-4 bg-white/10 hover:bg-white/20 text-white p-2 rounded-full backdrop-blur-md border border-white/20 transition-all z-20 cursor-pointer hover:scale-105 shadow-sm"
          aria-label="Close popup"
        >
          <svg
            className="w-5 h-5 text-white"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2.5"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>

        {/* 1. HERO BANNER HEADER */}
        <div className="bg-gradient-to-br from-slate-950 via-indigo-950 to-slate-900 text-white p-6 sm:p-8 relative overflow-hidden">
          {/* Ambient blur accents */}
          <div className="absolute -top-20 -right-20 w-64 h-64 bg-brand-500/25 rounded-full blur-3xl pointer-events-none"></div>
          <div className="absolute -bottom-20 -left-20 w-64 h-64 bg-emerald-500/15 rounded-full blur-3xl pointer-events-none"></div>

          <div className="relative z-10">
            {/* Top row: Brand & Live Count */}
            <div className="flex items-center justify-between gap-3 pr-10">
              <div className="flex items-center gap-2.5">
                <div className="w-10 h-10 rounded-xl bg-brand-700 text-white flex items-center justify-center shadow-md shadow-brand-700/30">
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      d="M12 14l9-5-9-5-9 5 9 5z"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                    />
                    <path
                      d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                    />
                  </svg>
                </div>
                <div>
                  <div className="flex items-center gap-1.5">
                    <span className="text-lg font-black tracking-tight text-white leading-none">
                      Tutor<span className="text-indigo-400">Bridge</span>
                    </span>
                    <span className="px-1.5 py-0.5 text-[9px] font-bold text-emerald-300 bg-emerald-500/20 border border-emerald-400/30 rounded leading-none">
                      BD
                    </span>
                  </div>
                  <span className="text-[10px] font-medium text-indigo-200 tracking-wider uppercase">
                    Premier Tuition Network
                  </span>
                </div>
              </div>

              <span className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
                15,480+ Verified Tutors
              </span>
            </div>

            {/* Campaign Headline */}
            <div className="mt-4">
              <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-amber-400/20 text-amber-300 border border-amber-400/30 mb-2">
                <span className="w-1.5 h-1.5 rounded-full bg-amber-400"></span>
                Academic Year 2026 Special
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight leading-tight">
                Find Bangladesh's Top Tutors from{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-300 via-purple-200 to-emerald-300">
                  BUET, DU &amp; Medical Colleges
                </span>
              </h2>
              <p className="text-indigo-100/90 text-xs sm:text-sm mt-2 leading-relaxed">
                Connect with verified mentors for English Medium, Bangla Medium
                &amp; English Version. Enjoy a{" "}
                <strong className="text-white font-bold">
                  1-Day 100% Free Trial Demo Class
                </strong>{" "}
                with zero advance fees.
              </p>
            </div>
          </div>
        </div>

        {/* 2. BODY CONTENT: 4 VALUE PILLARS & TRUST BADGES */}
        <div className="p-5 sm:p-7 space-y-5 bg-white">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {/* Pillar 1 */}
            <div className="flex items-start gap-3 p-3 rounded-2xl bg-slate-50 border border-slate-100 hover:border-indigo-100 transition-colors">
              <div className="w-9 h-9 rounded-xl bg-indigo-50 text-brand-700 flex items-center justify-center shrink-0">
                <span className="material-symbols-outlined text-[20px]">
                  school
                </span>
              </div>
              <div>
                <h4 className="text-xs font-bold text-slate-900">
                  Top 1% Varsity Scholars
                </h4>
                <p className="text-[11px] text-slate-600 mt-0.5 leading-snug">
                  BUET, DU, DMC, NSU, IBA &amp; leading public/private universities.
                </p>
              </div>
            </div>

            {/* Pillar 2 */}
            <div className="flex items-start gap-3 p-3 rounded-2xl bg-slate-50 border border-slate-100 hover:border-indigo-100 transition-colors">
              <div className="w-9 h-9 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center shrink-0">
                <span className="material-symbols-outlined text-[20px]">
                  verified_user
                </span>
              </div>
              <div>
                <h4 className="text-xs font-bold text-slate-900">
                  4-Step Verification
                </h4>
                <p className="text-[11px] text-slate-600 mt-0.5 leading-snug">
                  NID, varsity registration, certificates &amp; address audited.
                </p>
              </div>
            </div>

            {/* Pillar 3 */}
            <div className="flex items-start gap-3 p-3 rounded-2xl bg-slate-50 border border-slate-100 hover:border-indigo-100 transition-colors">
              <div className="w-9 h-9 rounded-xl bg-amber-50 text-amber-700 flex items-center justify-center shrink-0">
                <span className="material-symbols-outlined text-[20px]">
                  fact_check
                </span>
              </div>
              <div>
                <h4 className="text-xs font-bold text-slate-900">
                  1-Day Free Demo Class
                </h4>
                <p className="text-[11px] text-slate-600 mt-0.5 leading-snug">
                  Evaluate teaching quality in person or online before confirmation.
                </p>
              </div>
            </div>

            {/* Pillar 4 */}
            <div className="flex items-start gap-3 p-3 rounded-2xl bg-slate-50 border border-slate-100 hover:border-indigo-100 transition-colors">
              <div className="w-9 h-9 rounded-xl bg-blue-50 text-blue-700 flex items-center justify-center shrink-0">
                <span className="material-symbols-outlined text-[20px]">
                  sync_saved_locally
                </span>
              </div>
              <div>
                <h4 className="text-xs font-bold text-slate-900">
                  Zero Advance &amp; Free Replacement
                </h4>
                <p className="text-[11px] text-slate-600 mt-0.5 leading-snug">
                  0% parent registration fee and fast teacher replacement guarantee.
                </p>
              </div>
            </div>
          </div>

          {/* Special Benefit Strip */}
          <div className="p-3 rounded-xl bg-gradient-to-r from-indigo-50/80 via-purple-50/50 to-emerald-50/60 border border-indigo-100 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs">
            <div className="flex items-center gap-2 text-slate-700 font-semibold">
              <span className="text-brand-700 font-bold">🎁 Special Guarantee:</span>
              <span>100% Free Coordinator Support &amp; Safe Home Sessions</span>
            </div>
            <div className="flex items-center gap-1 text-amber-700 font-bold shrink-0 text-xs">
              <span
                className="material-symbols-outlined text-[16px] text-amber-500"
                style={{ fontVariationSettings: "'FILL' 1" }}
              >
                star
              </span>
              4.95/5.0 (27k+ Reviews)
            </div>
          </div>

          {/* 3. DUAL ACTION BUTTONS (Guardians & Tutors) */}
          <div className="flex flex-col sm:flex-row gap-3 pt-1">
            <Link
              to="/request-tutor"
              onClick={handleClose}
              className="flex-1 py-3 px-5 rounded-xl bg-brand-700 hover:bg-brand-800 text-white font-bold text-xs sm:text-sm text-center shadow-md shadow-brand-700/25 transition-all flex items-center justify-center gap-2 hover:scale-[1.01] cursor-pointer"
            >
              <span className="material-symbols-outlined text-[18px]">
                person_search
              </span>
              Request an Expert Tutor (Free)
            </Link>

            <Link
              to="/apply-tutor"
              onClick={handleClose}
              className="sm:w-auto py-3 px-5 rounded-xl bg-indigo-50 hover:bg-indigo-100 text-brand-700 font-bold text-xs sm:text-sm text-center border border-indigo-200 transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              <span className="material-symbols-outlined text-[18px]">
                school
              </span>
              Join as Tutor
            </Link>
          </div>

          {/* 4. FOOTER: HELPLINE & DISMISS SETTINGS */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-3 border-t border-slate-100 text-xs text-slate-500">
            <a
              href="tel:+8809612888777"
              className="inline-flex items-center gap-1.5 text-slate-700 hover:text-brand-700 font-semibold transition-colors"
            >
              <span className="material-symbols-outlined text-[16px] text-brand-700">
                call
              </span>
              <span>Helpline:</span>
              <span className="text-brand-700 font-bold">+880 9612 888 777</span>
            </a>

            <label className="flex items-center gap-2 cursor-pointer select-none text-slate-500 hover:text-slate-700 text-xs">
              <input
                type="checkbox"
                checked={dontShowToday}
                onChange={(e) => setDontShowToday(e.target.checked)}
                className="rounded border-slate-300 text-brand-700 focus:ring-brand-500 h-3.5 w-3.5 cursor-pointer"
              />
              <span>Don't show again today</span>
            </label>
          </div>
        </div>
      </div>
    </div>
  );

  return typeof document !== "undefined"
    ? createPortal(content, document.body)
    : null;
};

export default LandingPopup;
