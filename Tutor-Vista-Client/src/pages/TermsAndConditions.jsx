import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const TermsAndConditions = () => {
  const navigate = useNavigate();
  const [agreed, setAgreed] = useState(true);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const scrollToClause = (e, id) => {
    e.preventDefault();
    const element = document.getElementById(id);
    if (element) {
      const headerOffset = 90;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
    }
  };

  const handleConfirmAgreement = () => {
    if (!agreed) {
      toast.warning("Please accept the agreement checkbox first.");
      return;
    }
    toast.success("Tutor Accord acknowledged! Redirecting to Tutor Portal...");
    setTimeout(() => {
      navigate("/tutor-portal");
    }, 800);
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="w-full bg-[#faf8ff] text-slate-800 antialiased selection:bg-indigo-600 selection:text-white flex flex-col min-h-screen">
      {/* BEGIN: HeroCoverHeader */}
      <section
        className="relative bg-gradient-to-r from-slate-950 via-indigo-950 to-slate-900 border-b border-indigo-900/40 py-12 md:py-16 text-white overflow-hidden"
        data-purpose="hero-cover"
      >
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(99,102,241,0.22),rgba(255,255,255,0))] pointer-events-none"></div>
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#1f293710_1px,transparent_1px),linear-gradient(to_bottom,#1f293710_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] pointer-events-none opacity-40"></div>
        <div className="container mx-auto px-4 sm:px-6 lg:px-12 relative z-10">
          {/* Breadcrumbs */}
          <nav className="flex items-center gap-2 text-xs text-indigo-300/80 mb-6 font-medium">
            <Link to="/" className="hover:text-white transition-colors">
              Home
            </Link>
            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path d="M9 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
            </svg>
            <span className="text-indigo-200">Legal &amp; Governance</span>
            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path d="M9 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
            </svg>
            <span className="text-white font-semibold">Tutor Guidelines &amp; Accord</span>
          </nav>

          {/* Main Title Block */}
          <div>
            <div className="inline-flex items-center gap-2.5 px-3 py-1 rounded-full bg-indigo-800/60 border border-indigo-600/40 text-indigo-200 text-xs font-semibold mb-4 backdrop-blur-md">
              <svg className="w-4 h-4 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                />
              </svg>
              Tutor Code of Conduct &amp; Service Terms 2026
            </div>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-white mb-4 leading-tight">
              Terms of Service &amp;{" "}
              <span className="bg-gradient-to-r from-indigo-300 via-indigo-100 to-white bg-clip-text text-transparent">
                Tutor Guidelines
              </span>
            </h1>
            <p className="text-base sm:text-lg text-indigo-200/90 font-normal leading-relaxed mb-8">
              Institutional standards, mutual dignity, transparent matching fees, and verified student-tutor safety protocols across Bangladesh. All verified tutors operate under this binding ethical framework.
            </p>
          </div>

          {/* Trust Badges & Metadata Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 pt-4 border-t border-indigo-900/80">
            <div className="bg-white/5 backdrop-blur-sm rounded-xl p-3 border border-white/10">
              <div className="text-[11px] uppercase tracking-wider text-indigo-300 font-semibold">
                Effective Cycle
              </div>
              <div className="text-sm sm:text-base font-bold text-white mt-0.5">January 2026</div>
            </div>
            <div className="bg-white/5 backdrop-blur-sm rounded-xl p-3 border border-white/10">
              <div className="text-[11px] uppercase tracking-wider text-indigo-300 font-semibold">
                Quality Standard
              </div>
              <div className="text-sm sm:text-base font-bold text-emerald-400 mt-0.5">ISO 9001:2015</div>
            </div>
            <div className="bg-white/5 backdrop-blur-sm rounded-xl p-3 border border-white/10">
              <div className="text-[11px] uppercase tracking-wider text-indigo-300 font-semibold">
                Entity Registry
              </div>
              <div className="text-sm sm:text-base font-bold text-white mt-0.5">TRAD/DNCC/024881</div>
            </div>
            <div className="bg-white/5 backdrop-blur-sm rounded-xl p-3 border border-white/10">
              <div className="text-[11px] uppercase tracking-wider text-indigo-300 font-semibold">
                Legal Jurisdiction
              </div>
              <div className="text-sm sm:text-base font-bold text-white mt-0.5">Govt of Bangladesh</div>
            </div>
          </div>

          {/* Jump Navigation Tabs */}
          <div className="mt-8 flex flex-wrap items-center gap-2 pt-4">
            <span className="text-xs text-indigo-300 font-semibold uppercase mr-2">Quick Jump:</span>
            <a
              className="text-xs px-3 py-1.5 rounded-lg bg-indigo-900/70 hover:bg-indigo-800 text-indigo-200 hover:text-white transition-all border border-indigo-700/50 cursor-pointer"
              href="#clause-1"
              onClick={(e) => scrollToClause(e, "clause-1")}
            >
              1. Conduct
            </a>
            <a
              className="text-xs px-3 py-1.5 rounded-lg bg-indigo-900/70 hover:bg-indigo-800 text-indigo-200 hover:text-white transition-all border border-indigo-700/50 cursor-pointer"
              href="#clause-2"
              onClick={(e) => scrollToClause(e, "clause-2")}
            >
              2. Service Charges
            </a>
            <a
              className="text-xs px-3 py-1.5 rounded-lg bg-indigo-900/70 hover:bg-indigo-800 text-indigo-200 hover:text-white transition-all border border-indigo-700/50 cursor-pointer"
              href="#clause-3"
              onClick={(e) => scrollToClause(e, "clause-3")}
            >
              3. Demo Sessions
            </a>
            <a
              className="text-xs px-3 py-1.5 rounded-lg bg-indigo-900/70 hover:bg-indigo-800 text-indigo-200 hover:text-white transition-all border border-indigo-700/50 cursor-pointer"
              href="#clause-4"
              onClick={(e) => scrollToClause(e, "clause-4")}
            >
              4. Female Tutor Safety
            </a>
            <a
              className="text-xs px-3 py-1.5 rounded-lg bg-indigo-900/70 hover:bg-indigo-800 text-indigo-200 hover:text-white transition-all border border-indigo-700/50 cursor-pointer"
              href="#clause-5"
              onClick={(e) => scrollToClause(e, "clause-5")}
            >
              5. Schedule Variations
            </a>
            <a
              className="text-xs px-3 py-1.5 rounded-lg bg-indigo-900/70 hover:bg-indigo-800 text-indigo-200 hover:text-white transition-all border border-indigo-700/50 cursor-pointer"
              href="#clause-6"
              onClick={(e) => scrollToClause(e, "clause-6")}
            >
              6. Payment Gateways
            </a>
            <a
              className="text-xs px-3 py-1.5 rounded-lg bg-indigo-900/70 hover:bg-indigo-800 text-indigo-200 hover:text-white transition-all border border-indigo-700/50 cursor-pointer"
              href="#clause-7"
              onClick={(e) => scrollToClause(e, "clause-7")}
            >
              7. Legal Integrity
            </a>
          </div>
        </div>
      </section>
      {/* END: HeroCoverHeader */}

      {/* BEGIN: MainContentContainer */}
      <main className="flex-grow container mx-auto px-4 sm:px-6 lg:px-12 py-12" id="clauses">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* BEGIN: StickySidebarRail */}
          <aside className="lg:col-span-4 space-y-6 lg:sticky lg:top-28" data-purpose="sidebar-rail">
            {/* Table of Contents Card */}
            <nav
              aria-label="Table of Contents"
              className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-sm"
            >
              <div className="flex items-center justify-between pb-4 border-b border-slate-100 mb-4">
                <h2 className="text-sm font-bold uppercase tracking-wider text-slate-800 flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-indigo-600 animate-pulse" />
                  Document Clauses
                </h2>
                <span className="text-xs text-slate-400 font-medium">7 Articles</span>
              </div>
              <ol className="space-y-1.5 text-xs font-semibold">
                <li>
                  <a
                    className="flex items-center gap-3 p-2.5 rounded-xl hover:bg-indigo-50/70 text-slate-700 hover:text-indigo-700 transition-colors group cursor-pointer"
                    href="#clause-1"
                    onClick={(e) => scrollToClause(e, "clause-1")}
                  >
                    <span className="w-6 h-6 rounded-lg bg-indigo-100 text-indigo-700 flex items-center justify-center text-xs font-bold shrink-0">
                      1
                    </span>
                    <span>Academic Punctuality &amp; Standards</span>
                  </a>
                </li>
                <li>
                  <a
                    className="flex items-center gap-3 p-2.5 rounded-xl hover:bg-indigo-50/70 text-slate-700 hover:text-indigo-700 transition-colors group cursor-pointer"
                    href="#clause-2"
                    onClick={(e) => scrollToClause(e, "clause-2")}
                  >
                    <span className="w-6 h-6 rounded-lg bg-indigo-100 text-indigo-700 flex items-center justify-center text-xs font-bold shrink-0">
                      2
                    </span>
                    <span>Transparent Service Charge (50%)</span>
                  </a>
                </li>
                <li>
                  <a
                    className="flex items-center gap-3 p-2.5 rounded-xl hover:bg-indigo-50/70 text-slate-700 hover:text-indigo-700 transition-colors group cursor-pointer"
                    href="#clause-3"
                    onClick={(e) => scrollToClause(e, "clause-3")}
                  >
                    <span className="w-6 h-6 rounded-lg bg-indigo-100 text-indigo-700 flex items-center justify-center text-xs font-bold shrink-0">
                      3
                    </span>
                    <span>Demo Classes &amp; Salary Accounting</span>
                  </a>
                </li>
                <li>
                  <a
                    className="flex items-center gap-3 p-2.5 rounded-xl hover:bg-indigo-50/70 text-slate-700 hover:text-indigo-700 transition-colors group cursor-pointer"
                    href="#clause-4"
                    onClick={(e) => scrollToClause(e, "clause-4")}
                  >
                    <span className="w-6 h-6 rounded-lg bg-indigo-100 text-indigo-700 flex items-center justify-center text-xs font-bold shrink-0">
                      4
                    </span>
                    <span>Female Tutor Safety &amp; Dignity</span>
                  </a>
                </li>
                <li>
                  <a
                    className="flex items-center gap-3 p-2.5 rounded-xl hover:bg-indigo-50/70 text-slate-700 hover:text-indigo-700 transition-colors group cursor-pointer"
                    href="#clause-5"
                    onClick={(e) => scrollToClause(e, "clause-5")}
                  >
                    <span className="w-6 h-6 rounded-lg bg-indigo-100 text-indigo-700 flex items-center justify-center text-xs font-bold shrink-0">
                      5
                    </span>
                    <span>Tuition Variations &amp; Exam Leaves</span>
                  </a>
                </li>
                <li>
                  <a
                    className="flex items-center gap-3 p-2.5 rounded-xl hover:bg-indigo-50/70 text-slate-700 hover:text-indigo-700 transition-colors group cursor-pointer"
                    href="#clause-6"
                    onClick={(e) => scrollToClause(e, "clause-6")}
                  >
                    <span className="w-6 h-6 rounded-lg bg-indigo-100 text-indigo-700 flex items-center justify-center text-xs font-bold shrink-0">
                      6
                    </span>
                    <span>Authorized Merchant Gateways</span>
                  </a>
                </li>
                <li>
                  <a
                    className="flex items-center gap-3 p-2.5 rounded-xl hover:bg-indigo-50/70 text-slate-700 hover:text-indigo-700 transition-colors group cursor-pointer"
                    href="#clause-7"
                    onClick={(e) => scrollToClause(e, "clause-7")}
                  >
                    <span className="w-6 h-6 rounded-lg bg-indigo-100 text-indigo-700 flex items-center justify-center text-xs font-bold shrink-0">
                      7
                    </span>
                    <span>Legal Integrity &amp; Civil Dispute Recourse</span>
                  </a>
                </li>
              </ol>
            </nav>

            {/* Tutor Concierge & Support Card */}
            <div className="bg-gradient-to-br from-indigo-900 to-indigo-950 rounded-2xl p-6 text-white shadow-md border border-indigo-800/80">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-xl bg-white/10 backdrop-blur-md flex items-center justify-center text-indigo-300">
                  <svg className="w-5 h-5 text-indigo-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                    />
                  </svg>
                </div>
                <div>
                  <h3 className="text-sm font-bold text-white">Tutor Concierge Desk</h3>
                  <p className="text-xs text-indigo-200">24/7 Dedicated Coordinator</p>
                </div>
              </div>
              <p className="text-xs text-indigo-200/90 leading-relaxed mb-4">
                Have questions regarding parent meetings, compensation structures, or safety queries? Speak directly with our arbitration desk.
              </p>
              <div className="space-y-2.5">
                <a
                  className="flex items-center justify-between p-3 rounded-xl bg-white/10 hover:bg-white/15 transition-all text-xs font-semibold"
                  href="tel:+8809612888777"
                >
                  <span className="flex items-center gap-2">
                    <svg className="w-4 h-4 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path
                        d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                      />
                    </svg>
                    Emergency Support Line
                  </span>
                  <span className="text-emerald-300 font-mono">09612-888777</span>
                </a>
                <a
                  className="flex items-center justify-between p-3 rounded-xl bg-emerald-600/30 hover:bg-emerald-600/40 border border-emerald-500/40 transition-all text-xs font-semibold text-emerald-200"
                  href="https://wa.me/8809612888777"
                  rel="noopener noreferrer"
                  target="_blank"
                >
                  <span className="flex items-center gap-2">
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.582 2.128 2.182-.573c.978.58 1.911.928 3.145.929 3.178 0 5.767-2.587 5.768-5.766.001-3.187-2.575-5.77-5.764-5.771zm3.392 8.244c-.144.405-.837.774-1.17.824-.299.045-.677.063-1.092-.069-.252-.08-.575-.187-.988-.365-1.739-.751-2.874-2.502-2.961-2.617-.087-.116-.708-.94-.708-1.793s.448-1.273.607-1.446c.159-.173.346-.217.462-.217l.332.007c.106.005.249-.04.39.299.144.347.491 1.2.534 1.287.043.087.072.188.014.303-.058.116-.087.188-.173.289l-.26.302c-.087.087-.179.182-.077.357.101.174.449.741.963 1.2 1.341 1.196 2.476 1.566 2.823 1.74.347.174.55.145.752-.087.202-.232.868-1.013.998-1.36.13-.347.26-.289.448-.217.188.072 1.185.559 1.388.66.202.101.332.159.376.246.043.087.043.506-.101.911z" />
                    </svg>
                    WhatsApp SOS Desk
                  </span>
                  <span className="text-white">Active</span>
                </a>
              </div>
            </div>

            {/* Official Accreditation Card */}
            <div className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-sm">
              <div className="flex items-center gap-2 mb-3 text-xs font-bold text-slate-800">
                <span className="w-2 h-2 rounded-full bg-emerald-500" />
                Verified EdTech Institutional Status
              </div>
              <p className="text-xs text-slate-500 leading-relaxed">
                Registered entity under Dhaka North City Corporation. Certified under national EdTech consumer safety guidelines.
              </p>
              <div className="mt-3 pt-3 border-t border-slate-100 flex items-center justify-between text-[11px] font-mono text-slate-600">
                <span>Trade License:</span>
                <span className="font-bold text-slate-900">TRAD/DNCC/024881/2024</span>
              </div>
            </div>
          </aside>
          {/* END: StickySidebarRail */}

          {/* BEGIN: LegalClausesContainer */}
          <article className="lg:col-span-8 space-y-8" data-purpose="legal-clauses">
            {/* Header banner explaining ethics */}
            <div className="bg-gradient-to-r from-indigo-50 via-white to-indigo-50 border border-indigo-100 rounded-2xl p-6 sm:p-7 shadow-xs">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-indigo-600 text-white flex items-center justify-center shrink-0 shadow-md shadow-indigo-600/20">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                    />
                  </svg>
                </div>
                <div>
                  <h2 className="text-lg font-bold text-slate-900">
                    Tutor Code of Conduct &amp; Service Agreement
                  </h2>
                  <p className="text-xs sm:text-sm text-slate-600 mt-1 leading-relaxed">
                    By receiving tuition referrals, attending student interviews, or conducting sessions arranged via TutorBridge BD, you agree to uphold our institutional honor code designed to safeguard tutors and students equally.
                  </p>
                </div>
              </div>
            </div>

            {/* CLAUSE 01: Professional Conduct */}
            <section
              className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200/80 shadow-sm scroll-mt-28"
              id="clause-1"
            >
              <div className="flex items-center gap-3.5 mb-5">
                <span className="w-9 h-9 rounded-xl bg-indigo-600 text-white font-black text-sm flex items-center justify-center shadow-md shadow-indigo-600/20">
                  01
                </span>
                <div>
                  <span className="text-[11px] font-bold text-indigo-600 uppercase tracking-widest">
                    Article 1.0
                  </span>
                  <h3 className="text-lg sm:text-xl font-bold text-slate-900">
                    Academic Punctuality &amp; Professional Demeanor
                  </h3>
                </div>
              </div>
              <div className="space-y-4 text-xs sm:text-sm text-slate-600 leading-relaxed">
                <p>
                  Tutors representing the TutorBridge BD banner are expected to exemplify academic excellence and punctuality at all times:
                </p>
                <ul className="space-y-2.5">
                  <li className="flex items-start gap-3">
                    <svg className="w-5 h-5 text-indigo-600 shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path d="M5 13l4 4L19 7" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
                    </svg>
                    <span>
                      <strong>Arrival &amp; Verification:</strong> Arrive 5 to 10 minutes prior to the confirmed schedule. Always carry your physical University Student ID card and NID for initial parent verification.
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <svg className="w-5 h-5 text-indigo-600 shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path d="M5 13l4 4L19 7" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
                    </svg>
                    <span>
                      <strong>Preparation:</strong> Adhere to the designated national (Bangla/English Version NCTB) or international curriculum (Cambridge/Edexcel) as finalized with the guardian.
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <svg className="w-5 h-5 text-indigo-600 shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path d="M5 13l4 4L19 7" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
                    </svg>
                    <span>
                      <strong>Emergency Reporting:</strong> If unforeseen delays or varsity examinations prevent attendance, inform both the student guardian and your TutorBridge Coordinator at least <strong>4 hours</strong> prior.
                    </span>
                  </li>
                </ul>
              </div>
            </section>

            {/* CLAUSE 02: Transparent Service Charge */}
            <section
              className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200/80 shadow-sm scroll-mt-28"
              id="clause-2"
            >
              <div className="flex items-center gap-3.5 mb-5">
                <span className="w-9 h-9 rounded-xl bg-indigo-600 text-white font-black text-sm flex items-center justify-center shadow-md shadow-indigo-600/20">
                  02
                </span>
                <div>
                  <span className="text-[11px] font-bold text-indigo-600 uppercase tracking-widest">
                    Article 2.0
                  </span>
                  <h3 className="text-lg sm:text-xl font-bold text-slate-900">
                    Platform Matching Service Charge &amp; Settlement
                  </h3>
                </div>
              </div>
              <div className="space-y-4 text-xs sm:text-sm text-slate-600 leading-relaxed">
                <p>
                  TutorBridge operates on a transparent, single-instance placement fee model with complete parity. No upfront deposits or advance registration charges are ever demanded.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-4">
                  {/* Regular Fee Card */}
                  <div className="p-4 rounded-xl bg-indigo-50/70 border border-indigo-100">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xs font-bold text-indigo-900">
                        Standard Match (First Month)
                      </span>
                      <span className="text-base font-extrabold text-indigo-700">50% Flat</span>
                    </div>
                    <p className="text-xs text-slate-600">
                      A one-time service fee of 50% is payable <strong>only after</strong> you successfully complete your first month and receive your remuneration from the parent. Subsequent months are 100% yours.
                    </p>
                  </div>
                  {/* Early Termination Protection Card */}
                  <div className="p-4 rounded-xl bg-amber-50/70 border border-amber-200/70">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xs font-bold text-amber-900">
                        Prorated Cancellation Clause
                      </span>
                      <span className="text-base font-extrabold text-amber-700">30% Cap</span>
                    </div>
                    <p className="text-xs text-slate-600">
                      If the placement is discontinued within 30 days due to parent relocation or schedule conflict, the fee is adjusted to 30% of the actual prorated sum earned.
                    </p>
                  </div>
                </div>
                <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 flex items-center gap-3">
                  <svg className="w-5 h-5 text-indigo-600 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                    />
                  </svg>
                  <span className="text-xs text-slate-700">
                    A standard <strong>5-day settlement window</strong> is provided after receiving your remuneration to verify calculations and submit the platform fee.
                  </span>
                </div>
              </div>
            </section>

            {/* CLAUSE 03: Demo Sessions & Remuneration */}
            <section
              className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200/80 shadow-sm scroll-mt-28"
              id="clause-3"
            >
              <div className="flex items-center gap-3.5 mb-5">
                <span className="w-9 h-9 rounded-xl bg-indigo-600 text-white font-black text-sm flex items-center justify-center shadow-md shadow-indigo-600/20">
                  03
                </span>
                <div>
                  <span className="text-[11px] font-bold text-indigo-600 uppercase tracking-widest">
                    Article 3.0
                  </span>
                  <h3 className="text-lg sm:text-xl font-bold text-slate-900">
                    Demo Class Protocol &amp; Salary Accounting
                  </h3>
                </div>
              </div>
              <div className="space-y-4 text-xs sm:text-sm text-slate-600 leading-relaxed">
                <p>
                  To ensure mutual compatibility, parents are entitled to preview sessions before full commitment:
                </p>
                <div className="space-y-3">
                  <div className="flex items-start gap-3.5 p-3.5 rounded-xl bg-slate-50 border border-slate-200/70">
                    <span className="w-6 h-6 rounded-full bg-indigo-700 text-white flex items-center justify-center text-xs font-bold shrink-0">
                      A
                    </span>
                    <div>
                      <h4 className="text-xs font-bold text-slate-900">
                        Maximum of 2 Trial / Demo Sessions
                      </h4>
                      <p className="text-xs text-slate-600 mt-0.5">
                        Tutors will deliver up to 2 trial sessions to demonstrate pedagogical capability and evaluate syllabus needs.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3.5 p-3.5 rounded-xl bg-slate-50 border border-slate-200/70">
                    <span className="w-6 h-6 rounded-full bg-indigo-700 text-white flex items-center justify-center text-xs font-bold shrink-0">
                      B
                    </span>
                    <div>
                      <h4 className="text-xs font-bold text-slate-900">Session Accounting Policy</h4>
                      <p className="text-xs text-slate-600 mt-0.5">
                        Upon tuition confirmation, monthly remuneration begins counting from the <strong>3rd class</strong> onwards. If the guardian confirms from class 1 with full mutual agreement, demo sessions may be remunerated as per the guardian's discretion.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* CLAUSE 04: Female Tutor Safety & Guardian Etiquette */}
            <section
              className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200/80 shadow-sm scroll-mt-28"
              id="clause-4"
            >
              <div className="flex items-center gap-3.5 mb-5">
                <span className="w-9 h-9 rounded-xl bg-indigo-600 text-white font-black text-sm flex items-center justify-center shadow-md shadow-indigo-600/20">
                  04
                </span>
                <div>
                  <span className="text-[11px] font-bold text-indigo-600 uppercase tracking-widest">
                    Article 4.0
                  </span>
                  <h3 className="text-lg sm:text-xl font-bold text-slate-900">
                    Female Tutor Safety Protocol &amp; Physical Accompaniment
                  </h3>
                </div>
              </div>
              <div className="space-y-4 text-xs sm:text-sm text-slate-600 leading-relaxed">
                <p>
                  TutorBridge BD maintains strict zero-compromise security protocols, particularly for our esteemed female educators:
                </p>
                <div className="bg-indigo-50/70 border border-indigo-200/60 rounded-xl p-4.5 space-y-3">
                  <div className="flex items-center gap-2 font-bold text-indigo-950 text-xs sm:text-sm">
                    <svg className="w-5 h-5 text-indigo-600 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path
                        d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                      />
                    </svg>
                    Physical Accompaniment Rights (Introductory Meeting)
                  </div>
                  <p className="text-xs text-slate-700 leading-relaxed">
                    Female tutors are <strong>explicitly advised and entitled</strong> to bring an escort (parent, sibling, guardian, or varsity colleague) to the initial residential meeting. The student guardian is formally briefed to welcome this escort with full hospitality and respect.
                  </p>
                </div>
                <ul className="space-y-2 text-xs text-slate-600">
                  <li className="flex items-center gap-2.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                    <span>
                      All residential locations are verified via National ID records and digital geo-tagging prior to dispatch.
                    </span>
                  </li>
                  <li className="flex items-center gap-2.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                    <span>
                      Any breach of decorum or inappropriate conduct by guardians results in instant blacklisting and legal escalation.
                    </span>
                  </li>
                </ul>
              </div>
            </section>

            {/* CLAUSE 05: Academic Changes & Mediation */}
            <section
              className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200/80 shadow-sm scroll-mt-28"
              id="clause-5"
            >
              <div className="flex items-center gap-3.5 mb-5">
                <span className="w-9 h-9 rounded-xl bg-indigo-600 text-white font-black text-sm flex items-center justify-center shadow-md shadow-indigo-600/20">
                  05
                </span>
                <div>
                  <span className="text-[11px] font-bold text-indigo-600 uppercase tracking-widest">
                    Article 5.0
                  </span>
                  <h3 className="text-lg sm:text-xl font-bold text-slate-900">
                    Schedule Variations, Exam Leave &amp; Mediation
                  </h3>
                </div>
              </div>
              <div className="space-y-3.5 text-xs sm:text-sm text-slate-600 leading-relaxed">
                <p>
                  University students regularly encounter semester finals and midterms. Transparent coordination ensures unbroken student progress:
                </p>
                <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/80 space-y-2">
                  <div className="text-xs font-bold text-slate-900">7-Day Advance Notice Policy</div>
                  <p className="text-xs text-slate-600">
                    Whenever you foresee study breaks for varsity examinations, provide a minimum of 7 calendar days notice to the student guardian and notify your TutorBridge liaison. Classes must be rescheduled cooperatively rather than dropped abruptly.
                  </p>
                </div>
              </div>
            </section>

            {/* CLAUSE 06: Verified Merchant Payment Channels */}
            <section
              className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200/80 shadow-sm scroll-mt-28"
              id="clause-6"
            >
              <div className="flex items-center gap-3.5 mb-5">
                <span className="w-9 h-9 rounded-xl bg-indigo-600 text-white font-black text-sm flex items-center justify-center shadow-md shadow-indigo-600/20">
                  06
                </span>
                <div>
                  <span className="text-[11px] font-bold text-indigo-600 uppercase tracking-widest">
                    Article 6.0
                  </span>
                  <h3 className="text-lg sm:text-xl font-bold text-slate-900">
                    Authorized Merchant Channels &amp; Anti-Fraud Warning
                  </h3>
                </div>
              </div>
              <div className="space-y-4 text-xs sm:text-sm text-slate-600 leading-relaxed">
                <p>
                  To protect tutors from digital fraud and impersonation, platform matching payments must <strong>ONLY</strong> be processed through authorized TutorBridge corporate merchant channels:
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* bKash Merchant */}
                  <div className="p-4 rounded-xl border border-pink-200 bg-pink-50/40 flex flex-col justify-between">
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-xs font-bold text-pink-700">bKash Merchant Pay</span>
                        <span className="text-[10px] px-2 py-0.5 rounded bg-pink-100 text-pink-800 font-bold">
                          Official
                        </span>
                      </div>
                      <div className="font-mono text-base font-extrabold text-slate-900 tracking-wider">
                        01700-000000
                      </div>
                      <p className="text-[11px] text-slate-500 mt-1">
                        Select "Make Payment" in bKash App (No Personal Send Money)
                      </p>
                    </div>
                  </div>
                  {/* Nagad Merchant */}
                  <div className="p-4 rounded-xl border border-orange-200 bg-orange-50/40 flex flex-col justify-between">
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-xs font-bold text-orange-700">Nagad Merchant Pay</span>
                        <span className="text-[10px] px-2 py-0.5 rounded bg-orange-100 text-orange-800 font-bold">
                          Official
                        </span>
                      </div>
                      <div className="font-mono text-base font-extrabold text-slate-900 tracking-wider">
                        01700-000000
                      </div>
                      <p className="text-[11px] text-slate-500 mt-1">
                        Select "Merchant Pay" option with your Tutor ID as reference
                      </p>
                    </div>
                  </div>
                </div>
                {/* Caution Banner */}
                <div className="p-4 rounded-xl bg-amber-50/80 border border-amber-300/80 text-amber-950 flex items-start gap-3">
                  <svg className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                    />
                  </svg>
                  <div className="text-xs leading-relaxed">
                    <strong>Mandatory Anti-Fraud Safeguard:</strong> Never send service charges to personal bKash/Nagad accounts. Always verify the number with our 24/7 Helpline (<code>09612-888777</code>) prior to completing any financial transaction.
                  </div>
                </div>
              </div>
            </section>

            {/* CLAUSE 07: Legal Integrity & Fair Dispute Arbitration */}
            <section
              className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200/80 shadow-sm scroll-mt-28"
              id="clause-7"
            >
              <div className="flex items-center gap-3.5 mb-5">
                <span className="w-9 h-9 rounded-xl bg-indigo-600 text-white font-black text-sm flex items-center justify-center shadow-md shadow-indigo-600/20">
                  07
                </span>
                <div>
                  <span className="text-[11px] font-bold text-indigo-600 uppercase tracking-widest">
                    Article 7.0
                  </span>
                  <h3 className="text-lg sm:text-xl font-bold text-slate-900">
                    Legal Integrity, Fair Arbitration &amp; Defamation Defense
                  </h3>
                </div>
              </div>
              <div className="space-y-4 text-xs sm:text-sm text-slate-600 leading-relaxed">
                <p>
                  TutorBridge BD operates as a registered corporate entity adhering to the Laws of Bangladesh. Both tutors and guardians are entitled to civil due process:
                </p>
                <ul className="space-y-2.5">
                  <li className="flex items-start gap-3">
                    <svg className="w-5 h-5 text-indigo-600 shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path d="M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16H9m3 0h3" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
                    </svg>
                    <span>
                      <strong>Institutional Dispute Resolution:</strong> Any payment dispute or misunderstanding will first be evaluated by our Formal Arbitration Committee within 72 business hours.
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <svg className="w-5 h-5 text-indigo-600 shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
                    </svg>
                    <span>
                      <strong>Protection Against Defamation:</strong> We strictly prohibit unsanctioned public smear campaigns or social media slander. Disputes are resolved strictly through official corporate arbitration and the Cyber Security Act 2023.
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <svg className="w-5 h-5 text-indigo-600 shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
                    </svg>
                    <span>
                      <strong>Authentic Credentials:</strong> Submission of forged varsity identity cards, altered grade sheets, or counterfeit documents results in immediate permanent ban and referral to law enforcement.
                    </span>
                  </li>
                </ul>
              </div>
            </section>

            {/* BEGIN: DigitallySignedAccordBox */}
            <section
              className="bg-gradient-to-br from-indigo-950 via-slate-900 to-indigo-900 text-white rounded-3xl p-8 sm:p-10 shadow-md border border-indigo-800/60 relative overflow-hidden"
              data-purpose="tutor-accord-box"
            >
              <div className="absolute right-0 top-0 w-80 h-80 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />
              <div className="relative z-10 text-center space-y-6">
                <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-emerald-500/20 text-emerald-400 border border-emerald-400/30 mx-auto">
                  <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                    />
                  </svg>
                </div>
                <div>
                  <h3 className="text-xl sm:text-2xl font-bold tracking-tight text-white">
                    Digital Tutor Accord &amp; Confirmation
                  </h3>
                  <p className="text-xs sm:text-sm text-indigo-200/90 mt-2 leading-relaxed">
                    By maintaining an active tutor profile on TutorBridge BD, you solemnly acknowledge that you have reviewed, understood, and agreed to all 7 clauses of these Guidelines.
                  </p>
                </div>
                {/* Agreement Checkbox */}
                <div className="bg-white/5 border border-white/10 rounded-xl p-4 text-left">
                  <label className="flex items-start gap-3 cursor-pointer select-none">
                    <input
                      checked={agreed}
                      onChange={(e) => setAgreed(e.target.checked)}
                      className="rounded border-indigo-400 text-indigo-600 focus:ring-indigo-500 mt-1 h-4 w-4 bg-white/20 cursor-pointer"
                      type="checkbox"
                    />
                    <span className="text-xs text-indigo-100 leading-snug">
                      I solemnly pledge to honor the Tutor Code of Conduct, respect student premises, provide 2 demo sessions, and fulfill the 50% single matching charge within the stipulated grace period.
                    </span>
                  </label>
                </div>
                <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
                  <button
                    onClick={handleConfirmAgreement}
                    className="w-full sm:w-auto px-6 py-3 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs shadow-lg shadow-indigo-600/30 transition-all flex items-center justify-center gap-2 cursor-pointer"
                    type="button"
                  >
                    <svg className="w-4 h-4 text-emerald-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path d="M5 13l4 4L19 7" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
                    </svg>
                    Confirm Agreement &amp; Access Dashboard
                  </button>
                  <button
                    onClick={handlePrint}
                    className="w-full sm:w-auto px-5 py-3 rounded-xl bg-white/10 hover:bg-white/15 text-white font-semibold text-xs border border-white/20 transition-all flex items-center justify-center gap-2 cursor-pointer"
                    type="button"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
                    </svg>
                    Print / Save Legal Copy
                  </button>
                </div>
                <p className="text-[11px] text-indigo-300/80">
                  Logged securely with IP timestamp &amp; Varsity NID hash.
                </p>
              </div>
            </section>
            {/* END: DigitallySignedAccordBox */}
          </article>
          {/* END: LegalClausesContainer */}
        </div>
      </main>
      {/* END: MainContentContainer */}
    </div>
  );
};

export default TermsAndConditions;
