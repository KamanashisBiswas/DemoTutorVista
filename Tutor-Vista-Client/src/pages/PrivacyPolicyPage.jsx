import React, { useState, useEffect } from "react";

const PrivacyPolicyPage = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [audienceTab, setAudienceTab] = useState("guardians"); // "guardians" | "tutors"

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const scrollToSection = (e, targetId) => {
    e.preventDefault();
    const element = document.getElementById(targetId);
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

  const sections = [
    { id: "section-1", num: "1", title: "Consent & Scope of Policy", keywords: "consent scope agreement terms applicability immediate" },
    { id: "section-2", num: "2", title: "Information We Collect", keywords: "collect information data guardian student tutor nid contact identification academic" },
    { id: "section-3", num: "3", title: "How We Use & Match Data", keywords: "use match process verification proximity algorithm interview fraud" },
    { id: "section-4", num: "4", title: "NID & Credential Vaults", keywords: "nid credential vault certificate exposure encryption aes-256" },
    { id: "section-5", num: "5", title: "Child Protection & Minor Safety", keywords: "child minor protection safety under 18 presence guardian" },
    { id: "section-6", num: "6", title: "Log Files & Device Metadata", keywords: "log files device metadata ip address browser timestamp click" },
    { id: "section-7", num: "7", title: "Cookies & Tracker Preferences", keywords: "cookies trackers preference browser session token" },
    { id: "section-8", num: "8", title: "Your Rights (GDPR & Local Law)", keywords: "rights gdpr law access rectification erasure restrict forgotten" },
    { id: "section-9", num: "9", title: "Data Retention & Erasure", keywords: "retention erasure schedules purge archive active records" },
    { id: "section-10", num: "10", title: "Contact DPO & Redressal", keywords: "contact dpo redressal data protection officer banani helpline email" },
  ];

  const matchesSearch = (sectionId) => {
    if (!searchQuery.trim()) return true;
    const q = searchQuery.toLowerCase();
    const found = sections.find((s) => s.id === sectionId);
    if (!found) return true;
    return (
      found.title.toLowerCase().includes(q) ||
      found.keywords.toLowerCase().includes(q)
    );
  };

  return (
    <div className="w-full bg-surface">
      {/* PAGE HERO COVER */}
      <section
        className="relative bg-gradient-to-r from-slate-950 via-indigo-950 to-slate-900 border-b border-indigo-900/40 py-12 md:py-16 text-white overflow-hidden"
        data-purpose="hero-cover"
      >
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(99,102,241,0.22),rgba(255,255,255,0))] pointer-events-none"></div>
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#1f293710_1px,transparent_1px),linear-gradient(to_bottom,#1f293710_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] pointer-events-none opacity-40"></div>

        <div className="container mx-auto px-4 sm:px-6 lg:px-12 relative z-10">
          {/* Breadcrumb & Trust Badge */}
          <div className="flex flex-wrap items-center gap-3 mb-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 backdrop-blur-md text-on-primary text-label-sm font-label-sm">
              <span className="material-symbols-outlined text-secondary-fixed text-[16px]">
                verified_user
              </span>
              <span>TRUST &amp; DATA GOVERNANCE</span>
            </div>
            <span className="text-white/40 text-label-sm">•</span>
            <span className="text-white/70 font-label-sm text-label-sm">
              Compliance ID: TB-BD-PRIV-2026
            </span>
          </div>

          {/* Main Headline & Subtitle */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-8 space-y-4">
              <h1 className="font-headline-lg text-headline-lg font-bold tracking-tight text-white">
                Privacy Policy &amp;{" "}
                <span className="bg-gradient-to-r from-secondary-fixed via-primary-fixed to-white bg-clip-text text-transparent">
                  Student Data Protection
                </span>
              </h1>
              <p className="font-body-lg text-body-lg text-white/80 leading-relaxed">
                Your privacy, academic safety, and personal integrity matter most. Learn how TutorBridge collects, verifies, and rigorously secures guardian, student, and educator information across Bangladesh.
              </p>

              {/* Regulatory / Compliance Pills */}
              <div className="flex flex-wrap items-center gap-2.5 pt-2">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/5 border-none text-white/90 text-label-md font-label-md backdrop-blur-sm">
                  <span className="material-symbols-outlined text-[15px] text-secondary-fixed">
                    calendar_today
                  </span>
                  Effective: January 1, 2026
                </span>
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/5 border-none text-white/90 text-label-md font-label-md backdrop-blur-sm">
                  <span className="material-symbols-outlined text-[15px] text-primary-fixed">
                    tune
                  </span>
                  Policy Version 3.2
                </span>
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-secondary-container/20 text-secondary-fixed text-label-md font-label-md backdrop-blur-sm">
                  <span className="material-symbols-outlined text-[15px]">security</span>
                  GDPR &amp; Bangladesh Cyber Protection Act
                </span>
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 text-white text-label-md font-label-md">
                  <span className="material-symbols-outlined text-[15px] text-amber-300">
                    award_star
                  </span>
                  ISO/IEC 27001 Certified Vault
                </span>
              </div>
            </div>

            {/* Quick Summary Mini-Card / Graphic */}
            <div className="lg:col-span-4 flex justify-center lg:justify-end">
              <div className="w-full rounded-xl bg-white/10 backdrop-blur-xl p-5 shadow-2xl space-y-4">
                <div className="flex items-center justify-between pb-3">
                  <div className="flex items-center gap-2.5">
                    <div className="w-9 h-9 rounded-lg bg-secondary-container text-on-secondary-container flex items-center justify-center font-bold">
                      <span className="material-symbols-outlined text-[20px]">policy</span>
                    </div>
                    <div>
                      <h4 className="font-headline-sm text-headline-sm text-white text-[15px] font-bold">
                        Security Digest
                      </h4>
                      <p className="font-body-sm text-body-sm text-white/60">Updated Weekly</p>
                    </div>
                  </div>
                  <span className="px-2 py-0.5 rounded-full bg-secondary text-white font-label-sm text-label-sm">
                    Active Audit
                  </span>
                </div>

                <div className="space-y-2 text-white/80 font-body-sm text-body-sm">
                  <div className="flex items-center justify-between py-1.5 px-2.5 rounded-lg bg-white/5">
                    <span>Data Subject Requests</span>
                    <strong className="text-white font-semibold">100% Resolved</strong>
                  </div>
                  <div className="flex items-center justify-between py-1.5 px-2.5 rounded-lg bg-white/5">
                    <span>Avg. Response Time</span>
                    <strong className="text-secondary-fixed font-semibold">&lt; 4 Hours</strong>
                  </div>
                  <div className="flex items-center justify-between py-1.5 px-2.5 rounded-lg bg-white/5">
                    <span>Third-Party Trackers</span>
                    <strong className="text-white font-semibold">Zero</strong>
                  </div>
                </div>

                <a
                  className="w-full block text-center py-2.5 px-3 rounded-lg bg-secondary-container text-on-secondary-container font-label-lg text-label-lg hover:bg-secondary-fixed transition-all font-semibold shadow-sm cursor-pointer"
                  href="#dpo-contact"
                  onClick={(e) => scrollToSection(e, "dpo-contact")}
                >
                  Contact Compliance Officer
                </a>
              </div>
            </div>
          </div>

          {/* 3 Key Assurance Metric Cards across bottom of hero */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mt-10">
            <div className="rounded-xl bg-white/10 backdrop-blur-md p-5 flex items-start gap-4 hover:bg-white/15 transition-all">
              <div className="w-12 h-12 rounded-xl bg-secondary-container/20 text-secondary-fixed flex items-center justify-center flex-shrink-0">
                <span className="material-symbols-outlined text-[26px]">block</span>
              </div>
              <div className="space-y-1">
                <h3 className="font-headline-sm text-headline-sm text-white text-[16px] font-bold">
                  Zero Data Selling
                </h3>
                <p className="font-body-sm text-body-sm text-white/70">
                  We never sell, rent, or trade guardian phone numbers or tutor dossiers to advertisers or lead aggregators.
                </p>
              </div>
            </div>

            <div className="rounded-xl bg-white/10 backdrop-blur-md p-5 flex items-start gap-4 hover:bg-white/15 transition-all">
              <div className="w-12 h-12 rounded-xl bg-primary-fixed/20 text-primary-fixed flex items-center justify-center flex-shrink-0">
                <span className="material-symbols-outlined text-[26px]">lock</span>
              </div>
              <div className="space-y-1">
                <h3 className="font-headline-sm text-headline-sm text-white text-[16px] font-bold">
                  256-Bit SSL Encryption
                </h3>
                <p className="font-body-sm text-body-sm text-white/70">
                  End-to-end cryptographic hashing protects National IDs (NID), HSC/SSC marks, and university student IDs.
                </p>
              </div>
            </div>

            <div className="rounded-xl bg-white/10 backdrop-blur-md p-5 flex items-start gap-4 hover:bg-white/15 transition-all">
              <div className="w-12 h-12 rounded-xl bg-amber-400/20 text-amber-300 flex items-center justify-center flex-shrink-0">
                <span className="material-symbols-outlined text-[26px]">account_circle</span>
              </div>
              <div className="space-y-1">
                <h3 className="font-headline-sm text-headline-sm text-white text-[16px] font-bold">
                  Strict Consent &amp; Access
                </h3>
                <p className="font-body-sm text-body-sm text-white/70">
                  Full autonomy over your academic profile. Request full data logs, modify tuition credentials, or erase your account anytime.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* INTERACTIVE CONTENT WRAPPER */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-12 py-10">
        {/* Notice Alert Bar */}
        <div className="rounded-xl bg-surface-container-high p-4 mb-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 shadow-sm">
          <div className="flex items-center gap-3">
            <span className="material-symbols-outlined text-primary-container text-[24px] flex-shrink-0">
              info
            </span>
            <p className="font-body-md text-body-md text-on-surface">
              Have an immediate inquiry regarding your verified tutor background check or guardian contact data?
            </p>
          </div>
          <a
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-surface-container-lowest text-primary font-label-md text-label-md font-bold shadow-sm hover:shadow transition-all flex-shrink-0"
            href="mailto:privacy@tutorbridgebd.com"
          >
            <span className="material-symbols-outlined text-[16px]">mail</span>
            <span>privacy@tutorbridgebd.com</span>
          </a>
        </div>

        {/* MAIN TWO-COLUMN SPLIT */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* STICKY TABLE OF CONTENTS SIDEBAR (4 COLUMNS) */}
          <aside className="lg:col-span-4 lg:sticky lg:top-24 space-y-6">
            <div className="rounded-xl bg-surface-container-lowest p-6 shadow-md space-y-5">
              {/* Policy Search Bar */}
              <div className="space-y-2">
                <label
                  className="font-headline-sm text-headline-sm text-on-surface text-[15px] font-bold flex items-center justify-between"
                  htmlFor="policy-search-input"
                >
                  <span>Contents &amp; Search</span>
                  <span className="font-label-sm text-label-sm text-on-surface-variant font-normal">
                    10 Sections
                  </span>
                </label>
                <div className="relative flex items-center">
                  <span className="material-symbols-outlined absolute left-3 text-outline text-[18px] pointer-events-none">
                    search
                  </span>
                  <input
                    className="w-full pl-9 pr-3 py-2 text-body-sm font-body-sm rounded-lg bg-surface-container-low text-on-surface outline-none focus:bg-surface-container-lowest focus:ring-2 focus:ring-primary-container transition-all"
                    id="policy-search-input"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search privacy terms..."
                    type="text"
                  />
                  {searchQuery && (
                    <button
                      onClick={() => setSearchQuery("")}
                      className="absolute right-2.5 text-on-surface-variant hover:text-on-surface text-xs"
                      title="Clear search"
                    >
                      ✕
                    </button>
                  )}
                </div>
              </div>

              {/* Quick Navigation Links with Icons */}
              <nav className="space-y-1 max-h-[460px] overflow-y-auto pr-1">
                {sections.map((sec) => {
                  const isVisible = matchesSearch(sec.id);
                  return (
                    <a
                      key={sec.id}
                      className={`flex items-center gap-2.5 p-2 rounded-lg hover:bg-surface-container text-on-surface-variant hover:text-on-surface font-body-sm text-body-sm transition-all cursor-pointer ${
                        !isVisible ? "opacity-30" : "opacity-100"
                      }`}
                      href={`#${sec.id}`}
                      onClick={(e) => scrollToSection(e, sec.id)}
                    >
                      <span className="w-6 h-6 rounded-md bg-surface-container-high text-primary flex items-center justify-center font-bold text-label-sm flex-shrink-0">
                        {sec.num}
                      </span>
                      <span className="truncate">{sec.title}</span>
                    </a>
                  );
                })}
              </nav>
            </div>

            {/* Need Help Sidebar Card */}
            <div className="rounded-xl bg-gradient-to-br from-surface-container-highest to-surface-container p-6 shadow-sm space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-primary-container text-on-primary flex items-center justify-center">
                  <span className="material-symbols-outlined text-[20px]">support_agent</span>
                </div>
                <div>
                  <h4 className="font-headline-sm text-headline-sm text-on-surface text-[15px] font-bold">
                    Have Privacy Concerns?
                  </h4>
                  <p className="font-body-sm text-body-sm text-on-surface-variant">
                    Direct liaison with our Data Officer
                  </p>
                </div>
              </div>
              <p className="font-body-sm text-body-sm text-on-surface-variant leading-relaxed">
                Our Dhaka Data Security Desk operates Sunday through Thursday, 9 AM to 7 PM BST for formal privacy requests.
              </p>
              <div className="pt-2 space-y-2">
                <a
                  className="w-full flex items-center justify-center gap-2 py-2 px-3 rounded-lg bg-surface-container-lowest text-on-surface font-label-md text-label-md hover:bg-white shadow-sm font-semibold transition-all"
                  href="tel:+8809612888777"
                >
                  <span className="material-symbols-outlined text-secondary text-[16px]">call</span>
                  <span>+880 9612 888 777</span>
                </a>
                <a
                  className="w-full flex items-center justify-center gap-2 py-2 px-3 rounded-lg bg-primary-container text-on-primary font-label-md text-label-md hover:bg-tertiary-container shadow-sm font-semibold transition-all cursor-pointer"
                  href="#dpo-contact"
                  onClick={(e) => scrollToSection(e, "dpo-contact")}
                >
                  <span className="material-symbols-outlined text-[16px]">mail</span>
                  <span>Submit Formal Privacy Notice</span>
                </a>
              </div>
            </div>
          </aside>

          {/* MAIN POLICY CONTENT BODY (8 COLUMNS) */}
          <main className="lg:col-span-8 space-y-10">
            {/* SECTION 1: CONSENT & SCOPE */}
            <article
              className={`rounded-xl bg-surface-container-lowest p-6 sm:p-8 shadow-sm space-y-4 transition-all ${
                !matchesSearch("section-1") ? "hidden" : "block"
              }`}
              id="section-1"
            >
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-primary-container/10 text-primary-container flex items-center justify-center font-bold text-label-lg">
                  01
                </div>
                <h2 className="font-headline-md text-headline-md font-bold text-on-surface">
                  Consent &amp; Scope of Policy
                </h2>
              </div>
              <p className="font-body-lg text-body-lg text-on-surface leading-relaxed">
                At <strong>TutorBridge BD</strong> (accessible via tutorbridgebd.com and its affiliated student-tutor portals), one of our primary commitments is ensuring absolute transparency regarding user identity, student location privacy, and guardian peace of mind.
              </p>
              <p className="font-body-md text-body-md text-on-surface-variant leading-relaxed">
                This comprehensive Privacy Policy document outlines the types of personal, academic, and geographical information collected, audited, and processed by TutorBridge BD, and details how our administrative team safeguards your data rights under the laws of the People's Republic of Bangladesh and international benchmarks including GDPR.
              </p>
              <div className="rounded-xl bg-surface-container-low p-4 flex items-start gap-3">
                <span className="material-symbols-outlined text-secondary text-[22px] flex-shrink-0 mt-0.5">
                  verified
                </span>
                <div className="font-body-sm text-body-sm text-on-surface-variant space-y-1">
                  <strong className="text-on-surface block font-semibold">Immediate Applicability</strong>
                  By registering as a private tutor, posting a tuition demand notice as a guardian, booking a demo class, or simply browsing our academic directories, you hereby express your unequivocal consent to our Privacy Policy terms.
                </div>
              </div>
            </article>

            {/* SECTION 2: INFORMATION WE COLLECT */}
            <article
              className={`rounded-xl bg-surface-container-lowest p-6 sm:p-8 shadow-sm space-y-6 transition-all ${
                !matchesSearch("section-2") ? "hidden" : "block"
              }`}
              id="section-2"
            >
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-primary-container/10 text-primary-container flex items-center justify-center font-bold text-label-lg">
                  02
                </div>
                <h2 className="font-headline-md text-headline-md font-bold text-on-surface">
                  Information We Collect
                </h2>
              </div>
              <p className="font-body-md text-body-md text-on-surface-variant leading-relaxed">
                To maintain Bangladesh's most reliable, fraud-free tutor matching network, we collect distinct categories of information tailored to user roles. Toggle below to review what we collect from each party:
              </p>

              {/* Role Toggle Selector */}
              <div className="flex items-center p-1 rounded-xl bg-surface-container">
                <button
                  type="button"
                  className={`flex-1 py-2 px-3 rounded-lg text-label-md font-label-md font-bold transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
                    audienceTab === "guardians"
                      ? "bg-primary-container text-on-primary shadow-sm"
                      : "text-on-surface-variant bg-transparent hover:text-on-surface"
                  }`}
                  onClick={() => setAudienceTab("guardians")}
                >
                  <span className="material-symbols-outlined text-[16px]">family_restroom</span>
                  <span>Guardians &amp; Students</span>
                </button>
                <button
                  type="button"
                  className={`flex-1 py-2 px-3 rounded-lg text-label-md font-label-md font-bold transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
                    audienceTab === "tutors"
                      ? "bg-primary-container text-on-primary shadow-sm"
                      : "text-on-surface-variant bg-transparent hover:text-on-surface"
                  }`}
                  onClick={() => setAudienceTab("tutors")}
                >
                  <span className="material-symbols-outlined text-[16px]">school</span>
                  <span>Verified Tutors</span>
                </button>
              </div>

              {/* Guardians Data Tab */}
              {audienceTab === "guardians" && (
                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="p-4 rounded-xl bg-surface-container-low space-y-2">
                      <div className="flex items-center gap-2 text-primary font-bold text-label-lg font-label-lg">
                        <span className="material-symbols-outlined text-[18px]">badge</span>
                        <span>Contact &amp; Identification</span>
                      </div>
                      <p className="font-body-sm text-body-sm text-on-surface-variant">
                        Parent/Guardian full name, active WhatsApp or mobile phone number, residential address or nearest landmark (e.g., Banani Road 11, Uttara Sector 7, or Panchlaish Chattogram).
                      </p>
                    </div>

                    <div className="p-4 rounded-xl bg-surface-container-low space-y-2">
                      <div className="flex items-center gap-2 text-primary font-bold text-label-lg font-label-lg">
                        <span className="material-symbols-outlined text-[18px]">auto_stories</span>
                        <span>Academic Demands</span>
                      </div>
                      <p className="font-body-sm text-body-sm text-on-surface-variant">
                        Student grade/standard, curriculum stream (Bangla Medium, English Version, Cambridge/Edexcel O/A Levels), preferred days per week, and monthly budget allocation.
                      </p>
                    </div>

                    <div className="p-4 rounded-xl bg-surface-container-low space-y-2">
                      <div className="flex items-center gap-2 text-primary font-bold text-label-lg font-label-lg">
                        <span className="material-symbols-outlined text-[18px]">room_preferences</span>
                        <span>Safety &amp; Preference Criteria</span>
                      </div>
                      <p className="font-body-sm text-body-sm text-on-surface-variant">
                        Gender preference for home instructors (e.g., female tutor preference for adolescent female students), mode (in-person physical visit or interactive online live session).
                      </p>
                    </div>

                    <div className="p-4 rounded-xl bg-surface-container-low space-y-2">
                      <div className="flex items-center gap-2 text-secondary font-bold text-label-lg font-label-lg">
                        <span className="material-symbols-outlined text-[18px]">format_image_left</span>
                        <span>Strict Guardian Anonymity</span>
                      </div>
                      <p className="font-body-sm text-body-sm text-on-surface-variant">
                        Exact house numbers and flat apartments are NEVER shown publicly on the Tuition Jobs feed. Only general neighborhoods are displayed.
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {/* Tutors Data Tab */}
              {audienceTab === "tutors" && (
                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="p-4 rounded-xl bg-surface-container-low space-y-2">
                      <div className="flex items-center gap-2 text-primary font-bold text-label-lg font-label-lg">
                        <span className="material-symbols-outlined text-[18px]">assignment_ind</span>
                        <span>NID &amp; Identity Records</span>
                      </div>
                      <p className="font-body-sm text-body-sm text-on-surface-variant">
                        Smart National ID card photocopy, university Student ID card, recent digital portrait photograph, and permanent home address.
                      </p>
                    </div>

                    <div className="p-4 rounded-xl bg-surface-container-low space-y-2">
                      <div className="flex items-center gap-2 text-primary font-bold text-label-lg font-label-lg">
                        <span className="material-symbols-outlined text-[18px]">school</span>
                        <span>Academic Certifications</span>
                      </div>
                      <p className="font-body-sm text-body-sm text-on-surface-variant">
                        SSC &amp; HSC transcripts, university matriculation records (BUET, DU, DMC, NSU, BRAC, etc.), verified major/department, and tutoring awards.
                      </p>
                    </div>

                    <div className="p-4 rounded-xl bg-surface-container-low space-y-2">
                      <div className="flex items-center gap-2 text-primary font-bold text-label-lg font-label-lg">
                        <span className="material-symbols-outlined text-[18px]">payments</span>
                        <span>Disbursement &amp; Payouts</span>
                      </div>
                      <p className="font-body-sm text-body-sm text-on-surface-variant">
                        Designated bKash/Nagad personal wallet or commercial bank account details strictly reserved for monthly commission settlements and guarantee deposits.
                      </p>
                    </div>

                    <div className="p-4 rounded-xl bg-surface-container-low space-y-2">
                      <div className="flex items-center gap-2 text-secondary font-bold text-label-lg font-label-lg">
                        <span className="material-symbols-outlined text-[18px]">lock</span>
                        <span>Restricted Access Storage</span>
                      </div>
                      <p className="font-body-sm text-body-sm text-on-surface-variant">
                        Tutor NID and raw certificates are encrypted in offline cold storage vaults accessible solely to senior compliance verifiers.
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </article>

            {/* SECTION 3: HOW WE USE & VERIFY DATA */}
            <article
              className={`policy-section rounded-xl bg-surface-container-lowest p-6 sm:p-8 shadow-sm space-y-6 transition-all ${
                !matchesSearch("section-3") ? "hidden" : "block"
              }`}
              id="section-3"
            >
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-primary-container/10 text-primary-container flex items-center justify-center font-bold text-label-lg">
                  03
                </div>
                <h2 className="font-headline-md text-headline-md font-bold text-on-surface">
                  How We Use &amp; Process Data
                </h2>
              </div>
              <p className="font-body-md text-body-md text-on-surface-variant leading-relaxed">
                Data collected by TutorBridge BD is strictly utilized to operate and elevate our national educational ecosystem. We deploy personal details for the following exact purposes:
              </p>
              <div className="space-y-3">
                <div className="flex items-start gap-3.5 p-3.5 rounded-xl bg-surface-container-low">
                  <span className="material-symbols-outlined text-secondary text-[22px] flex-shrink-0 mt-0.5">
                    check_circle
                  </span>
                  <div>
                    <h4 className="font-headline-sm text-headline-sm text-on-surface text-[15px] font-bold">
                      Rigorous Background Verification
                    </h4>
                    <p className="font-body-sm text-body-sm text-on-surface-variant">
                      Validating university enrollment authenticity and residential permanence of tutors before dispatching them into guardians' households.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3.5 p-3.5 rounded-xl bg-surface-container-low">
                  <span className="material-symbols-outlined text-secondary text-[22px] flex-shrink-0 mt-0.5">
                    check_circle
                  </span>
                  <div>
                    <h4 className="font-headline-sm text-headline-sm text-on-surface text-[15px] font-bold">
                      Proximity &amp; Subject Algorithmic Matching
                    </h4>
                    <p className="font-body-sm text-body-sm text-on-surface-variant">
                      Pairing students with tutors residing within a 3–5 kilometer radius in Dhaka and Chattogram to minimize tutor commute cancellations.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3.5 p-3.5 rounded-xl bg-surface-container-low">
                  <span className="material-symbols-outlined text-secondary text-[22px] flex-shrink-0 mt-0.5">
                    check_circle
                  </span>
                  <div>
                    <h4 className="font-headline-sm text-headline-sm text-on-surface text-[15px] font-bold">
                      Demo Class &amp; Interview Logistics
                    </h4>
                    <p className="font-body-sm text-body-sm text-on-surface-variant">
                      Transmitting approved contact numbers exclusively after reciprocal confirmation between tutor and guardian for the scheduled trial session.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3.5 p-3.5 rounded-xl bg-surface-container-low">
                  <span className="material-symbols-outlined text-secondary text-[22px] flex-shrink-0 mt-0.5">
                    check_circle
                  </span>
                  <div>
                    <h4 className="font-headline-sm text-headline-sm text-on-surface text-[15px] font-bold">
                      Fraud Suppression &amp; Identity Protection
                    </h4>
                    <p className="font-body-sm text-body-sm text-on-surface-variant">
                      Detecting duplicate accounts, fake degree certificates, and malicious solicitations through encrypted digital checksums.
                    </p>
                  </div>
                </div>
              </div>
            </article>

            {/* SECTION 4: NID & CERTIFICATE HANDLING */}
            <article
              className={`policy-section rounded-xl bg-surface-container-lowest p-6 sm:p-8 shadow-sm space-y-4 transition-all ${
                !matchesSearch("section-4") ? "hidden" : "block"
              }`}
              id="section-4"
            >
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-primary-container/10 text-primary-container flex items-center justify-center font-bold text-label-lg">
                  04
                </div>
                <h2 className="font-headline-md text-headline-md font-bold text-on-surface">
                  NID &amp; Academic Certificate Handling
                </h2>
              </div>
              <p className="font-body-md text-body-md text-on-surface-variant leading-relaxed">
                National Identification Documents (NID/Smart Cards) and University Grade Sheets submitted during the tutor onboarding procedure constitute restricted confidential assets.
              </p>
              <div className="rounded-xl bg-[#1e1b4b] text-on-primary p-6 space-y-4">
                <div className="flex items-center gap-3">
                  <span className="material-symbols-outlined text-secondary-fixed text-[26px]">
                    enhanced_encryption
                  </span>
                  <h3 className="font-headline-sm text-headline-sm text-white font-bold">
                    Zero Public Exposure Protocol
                  </h3>
                </div>
                <p className="font-body-sm text-body-sm text-white/80 leading-relaxed">
                  At no point during public tutor listing or matchmaking are full NID digits, residential building addresses, or high-resolution degree certificates made viewable to public website users or search engine indexers. Only the verified badge ('NID Verified') and audited university name appear on the public tutor profile.
                </p>
                <div className="flex flex-wrap gap-4 pt-2 font-label-sm text-label-sm text-white/90">
                  <span className="inline-flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-secondary-fixed" />
                    AES-256 Encrypted At Rest
                  </span>
                  <span className="inline-flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-secondary-fixed" />
                    Strict Multi-Factor Internal Admin Access
                  </span>
                  <span className="inline-flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-secondary-fixed" />
                    Automatic 30-Day Purge for Rejected Tutors
                  </span>
                </div>
              </div>
            </article>

            {/* SECTION 5: CHILD PROTECTION & MINOR SAFETY */}
            <article
              className={`policy-section rounded-xl bg-surface-container-lowest p-6 sm:p-8 shadow-sm space-y-4 transition-all ${
                !matchesSearch("section-5") ? "hidden" : "block"
              }`}
              id="section-5"
            >
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-primary-container/10 text-primary-container flex items-center justify-center font-bold text-label-lg">
                  05
                </div>
                <h2 className="font-headline-md text-headline-md font-bold text-on-surface">
                  Child Protection &amp; Minor Safety (Under 18)
                </h2>
              </div>
              <p className="font-body-md text-body-md text-on-surface-variant leading-relaxed">
                Protecting school-going children and minors across primary, secondary, and higher secondary grades is TutorBridge BD's highest ethical priority.
              </p>
              <div className="space-y-3 font-body-md text-body-md text-on-surface-variant">
                <div className="p-4 rounded-xl bg-surface-container-low border-l-4 border-primary-container space-y-1">
                  <strong className="text-on-surface block font-semibold">
                    1. Guardian Sole Point-of-Contact
                  </strong>
                  <p className="text-body-sm font-body-sm">
                    Students under 18 years of age are strictly prohibited from creating unsupervised accounts. All tuition requests, compensation agreements, and home entry authorizations must be executed by legal parents or adult guardians.
                  </p>
                </div>
                <div className="p-4 rounded-xl bg-surface-container-low border-l-4 border-secondary space-y-1">
                  <strong className="text-on-surface block font-semibold">
                    2. Mandatory In-Person Presence Policy
                  </strong>
                  <p className="text-body-sm font-body-sm">
                    For in-person home tuitions, an adult family member must be physically present inside the residence during the entire instructional period.
                  </p>
                </div>
              </div>
            </article>

            {/* SECTION 6: LOG FILES & DEVICE METADATA */}
            <article
              className={`policy-section rounded-xl bg-surface-container-lowest p-6 sm:p-8 shadow-sm space-y-4 transition-all ${
                !matchesSearch("section-6") ? "hidden" : "block"
              }`}
              id="section-6"
            >
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-primary-container/10 text-primary-container flex items-center justify-center font-bold text-label-lg">
                  06
                </div>
                <h2 className="font-headline-md text-headline-md font-bold text-on-surface">
                  Log Files &amp; Technical Metadata
                </h2>
              </div>
              <p className="font-body-md text-body-md text-on-surface-variant leading-relaxed">
                TutorBridge BD follows standard enterprise procedure for maintaining secure system logs. These records chronicle visitors when they navigate the web application. Information logged includes:
              </p>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-center">
                <div className="p-3 rounded-lg bg-surface-container">
                  <span className="material-symbols-outlined text-primary text-[20px]">lan</span>
                  <p className="font-label-sm text-label-sm text-on-surface-variant mt-1">IP Addresses</p>
                </div>
                <div className="p-3 rounded-lg bg-surface-container">
                  <span className="material-symbols-outlined text-primary text-[20px]">devices</span>
                  <p className="font-label-sm text-label-sm text-on-surface-variant mt-1">Browser Engine</p>
                </div>
                <div className="p-3 rounded-lg bg-surface-container">
                  <span className="material-symbols-outlined text-primary text-[20px]">schedule</span>
                  <p className="font-label-sm text-label-sm text-on-surface-variant mt-1">Timestamp Logs</p>
                </div>
                <div className="p-3 rounded-lg bg-surface-container">
                  <span className="material-symbols-outlined text-primary text-[20px]">touch_app</span>
                  <p className="font-label-sm text-label-sm text-on-surface-variant mt-1">Click Streams</p>
                </div>
              </div>
              <p className="font-body-sm text-body-sm text-on-surface-variant">
                These technical records are decoupled from personally identifiable credentials and are deployed strictly to analyze server health, thwart DDoS disruptions, and benchmark regional platform velocity.
              </p>
            </article>

            {/* SECTION 7: COOKIES & TRACKING */}
            <article
              className={`policy-section rounded-xl bg-surface-container-lowest p-6 sm:p-8 shadow-sm space-y-4 transition-all ${
                !matchesSearch("section-7") ? "hidden" : "block"
              }`}
              id="section-7"
            >
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-primary-container/10 text-primary-container flex items-center justify-center font-bold text-label-lg">
                  07
                </div>
                <h2 className="font-headline-md text-headline-md font-bold text-on-surface">
                  Cookies &amp; Tracking Preferences
                </h2>
              </div>
              <p className="font-body-md text-body-md text-on-surface-variant leading-relaxed">
                Similar to contemporary digital applications, TutorBridge BD uses 'cookies' to remember authentication session tokens, regional Dhaka/Chattogram localization preferences, and tuition filter states.
              </p>
              <div className="rounded-xl bg-surface-container-low p-5 space-y-3">
                <h4 className="font-headline-sm text-headline-sm text-on-surface text-[15px] font-bold">
                  Managing Browser Cookies
                </h4>
                <p className="font-body-sm text-body-sm text-on-surface-variant leading-relaxed">
                  You can choose to disable cookies through your personal browser settings (Chrome, Safari, Firefox, Edge). Please note that turning off essential cookies may disable your tutor login session state or tuition application forms.
                </p>
              </div>
            </article>

            {/* SECTION 8: DATA SUBJECT RIGHTS (GDPR & LOCAL COMPLIANCE) */}
            <article
              className={`policy-section rounded-xl bg-surface-container-lowest p-6 sm:p-8 shadow-sm space-y-6 transition-all ${
                !matchesSearch("section-8") ? "hidden" : "block"
              }`}
              id="section-8"
            >
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-primary-container/10 text-primary-container flex items-center justify-center font-bold text-label-lg">
                  08
                </div>
                <h2 className="font-headline-md text-headline-md font-bold text-on-surface">
                  Your Data Rights (GDPR &amp; Local Law)
                </h2>
              </div>
              <p className="font-body-md text-body-md text-on-surface-variant leading-relaxed">
                Every guardian, student, and registered tutor is entitled to complete control over their recorded personal and academic dossier.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-5 rounded-xl bg-surface-container-low space-y-2">
                  <div className="w-8 h-8 rounded-lg bg-primary-container text-on-primary flex items-center justify-center font-bold">
                    <span className="material-symbols-outlined text-[18px]">download</span>
                  </div>
                  <h4 className="font-headline-sm text-headline-sm text-on-surface text-[15px] font-bold">
                    1. Right to Access &amp; Portability
                  </h4>
                  <p className="font-body-sm text-body-sm text-on-surface-variant">
                    Request a portable, machine-readable JSON/PDF extract of all verification audits, tuition records, and communication logs stored under your phone number.
                  </p>
                </div>

                <div className="p-5 rounded-xl bg-surface-container-low space-y-2">
                  <div className="w-8 h-8 rounded-lg bg-secondary text-on-secondary flex items-center justify-center font-bold">
                    <span className="material-symbols-outlined text-[18px]">edit_document</span>
                  </div>
                  <h4 className="font-headline-sm text-headline-sm text-on-surface text-[15px] font-bold">
                    2. Right to Rectification
                  </h4>
                  <p className="font-body-sm text-body-sm text-on-surface-variant">
                    Promptly rectify outdated university degrees, phone numbers, or updated residential areas if your tuition availability changes.
                  </p>
                </div>

                <div className="p-5 rounded-xl bg-surface-container-low space-y-2">
                  <div className="w-8 h-8 rounded-lg bg-error text-on-error flex items-center justify-center font-bold">
                    <span className="material-symbols-outlined text-[18px]">delete_forever</span>
                  </div>
                  <h4 className="font-headline-sm text-headline-sm text-on-surface text-[15px] font-bold">
                    3. Right to Erasure ('Forgotten')
                  </h4>
                  <p className="font-body-sm text-body-sm text-on-surface-variant">
                    Instruct our system engineers to permanently purge your profile, NID copies, and academic files upon tuition job completion or service termination.
                  </p>
                </div>

                <div className="p-5 rounded-xl bg-surface-container-low space-y-2">
                  <div className="w-8 h-8 rounded-lg bg-surface-container-highest text-primary flex items-center justify-center font-bold">
                    <span className="material-symbols-outlined text-[18px]">rule</span>
                  </div>
                  <h4 className="font-headline-sm text-headline-sm text-on-surface text-[15px] font-bold">
                    4. Right to Restrict Processing
                  </h4>
                  <p className="font-body-sm text-body-sm text-on-surface-variant">
                    Opt-out of automated SMS match alerts or promotional newsletters with a single click, without compromising your active tuition status.
                  </p>
                </div>
              </div>
              <div className="p-4 rounded-xl bg-secondary-container/30 flex items-center gap-3">
                <span className="material-symbols-outlined text-secondary text-[22px] flex-shrink-0">
                  timer
                </span>
                <p className="font-body-sm text-body-sm text-on-secondary-container font-semibold">
                  Statutory Resolution Timeline: All formal data requests submitted to privacy@tutorbridgebd.com are acknowledged within 24 hours and fulfilled within 7 business days.
                </p>
              </div>
            </article>

            {/* SECTION 9: DATA RETENTION */}
            <article
              className={`policy-section rounded-xl bg-surface-container-lowest p-6 sm:p-8 shadow-sm space-y-4 transition-all ${
                !matchesSearch("section-9") ? "hidden" : "block"
              }`}
              id="section-9"
            >
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-primary-container/10 text-primary-container flex items-center justify-center font-bold text-label-lg">
                  09
                </div>
                <h2 className="font-headline-md text-headline-md font-bold text-on-surface">
                  Data Retention &amp; Erasure Schedules
                </h2>
              </div>
              <p className="font-body-md text-body-md text-on-surface-variant leading-relaxed">
                We retain personal data only for as long as necessary to fulfill the educational matchmaking purposes described in this policy, unless a prolonged statutory retention is prescribed by Bangladesh national fiscal or civil compliance:
              </p>
              <div className="space-y-2">
                <div className="flex items-center justify-between p-3 rounded-lg bg-surface-container-low">
                  <span className="font-body-sm text-body-sm text-on-surface">
                    Active Tutor Records &amp; Verified Badges
                  </span>
                  <span className="font-label-md text-label-md text-primary font-bold">
                    Retained while account remains active
                  </span>
                </div>
                <div className="flex items-center justify-between p-3 rounded-lg bg-surface-container-low">
                  <span className="font-body-sm text-body-sm text-on-surface">
                    Tuition Job Posts by Guardians (Closed/Fulfilled)
                  </span>
                  <span className="font-label-md text-label-md text-on-surface-variant font-semibold">
                    Archived after 60 days
                  </span>
                </div>
                <div className="flex items-center justify-between p-3 rounded-lg bg-surface-container-low">
                  <span className="font-body-sm text-body-sm text-on-surface">
                    Rejected / Disqualified Tutor Uploads
                  </span>
                  <span className="font-label-md text-label-md text-error font-semibold">
                    Purged permanently in 30 days
                  </span>
                </div>
              </div>
            </article>

            {/* SECTION 10: DPO CONTACT CARD (ROYAL INDIGO BOX) */}
            <article
              className={`policy-section rounded-2xl bg-gradient-to-br from-[#1b1557] via-[#241a78] to-[#140f44] text-white p-6 sm:p-8 shadow-xl space-y-6 transition-all ${
                !matchesSearch("section-10") ? "hidden" : "block"
              }`}
              id="dpo-contact"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4">
                <div className="flex items-center gap-3.5">
                  <div className="w-12 h-12 rounded-xl bg-secondary-container text-on-secondary-container flex items-center justify-center font-bold shadow-md">
                    <span className="material-symbols-outlined text-[26px]">gavel</span>
                  </div>
                  <div>
                    <span className="font-label-sm text-label-sm text-secondary-fixed tracking-wider uppercase">
                      Official Governance
                    </span>
                    <h3 className="font-headline-md text-headline-md font-bold text-white">
                      Data Protection Officer (DPO)
                    </h3>
                  </div>
                </div>
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 text-white font-label-md text-label-md self-start sm:self-auto">
                  <span className="material-symbols-outlined text-[16px] text-secondary-fixed">
                    lock_clock
                  </span>
                  Direct Redressal Desk
                </span>
              </div>
              <p className="font-body-md text-body-md text-white/80 leading-relaxed">
                For escalations, formal compliance notifications, or concerns regarding the safeguarding of student documents, please address correspondence directly to our designated Data Protection Officer:
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 rounded-xl bg-white/10 backdrop-blur-sm space-y-2">
                  <span className="text-white/60 font-label-sm text-label-sm uppercase">
                    Electronic Inquiries
                  </span>
                  <div className="flex items-center gap-2">
                    <span className="material-symbols-outlined text-secondary-fixed text-[18px]">
                      alternate_email
                    </span>
                    <a
                      className="font-label-lg text-label-lg font-bold text-white hover:text-secondary-fixed transition-colors"
                      href="mailto:privacy@tutorbridgebd.com"
                    >
                      privacy@tutorbridgebd.com
                    </a>
                  </div>
                  <p className="font-body-sm text-body-sm text-white/70">
                    PGP Key ID: 0x94B82F10 (Available upon request)
                  </p>
                </div>
                <div className="p-4 rounded-xl bg-white/10 backdrop-blur-sm space-y-2">
                  <span className="text-white/60 font-label-sm text-label-sm uppercase">
                    Physical Office &amp; Verification Desk
                  </span>
                  <div className="flex items-start gap-2">
                    <span className="material-symbols-outlined text-secondary-fixed text-[18px] mt-0.5">
                      location_on
                    </span>
                    <span className="font-body-sm text-body-sm text-white/90">
                      Level 5, Concord Tower, Road 11, Block D, Banani, Dhaka-1213, Bangladesh
                    </span>
                  </div>
                  <p className="font-body-sm text-body-sm text-white/70">
                    Corporate Helpline: +880 9612 888 777
                  </p>
                </div>
              </div>

              {/* Direct Form Action Button */}
              <div className="pt-2 flex flex-col sm:flex-row items-center gap-3">
                <a
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-secondary-container text-on-secondary-container font-label-lg text-label-lg font-bold hover:bg-secondary-fixed shadow-md hover:shadow-lg transition-all"
                  href="mailto:privacy@tutorbridgebd.com?subject=Privacy%20Data%20Request"
                >
                  <span className="material-symbols-outlined text-[18px]">outgoing_mail</span>
                  <span>Draft Official Privacy Request</span>
                </a>
                <span className="text-white/60 font-body-sm text-body-sm text-center sm:text-left">
                  Expected response within 24 business hours.
                </span>
              </div>
            </article>
          </main>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicyPage;
