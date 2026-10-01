import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import heroMentorsImg from "../assets/About/hero-mentors.jpg";
import mentorshipActionImg from "../assets/About/mentorship-action.jpg";
import operationsHubImg from "../assets/About/operations-hub.jpg";

const AboutUsPage = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="w-full bg-surface text-on-surface font-body-md antialiased min-h-screen">
      <div className="flex flex-col w-full">
        {/* Subtle Breadcrumb & Hero Top Anchor */}
        <section
          className="relative bg-gradient-to-r from-slate-950 via-indigo-950 to-slate-900 border-b border-indigo-900/40 py-12 md:py-16 text-white overflow-hidden"
          data-purpose="hero-cover"
        >
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(99,102,241,0.22),rgba(255,255,255,0))] pointer-events-none"></div>
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#1f293710_1px,transparent_1px),linear-gradient(to_bottom,#1f293710_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] pointer-events-none opacity-40"></div>
          <div className="container mx-auto px-4 sm:px-6 lg:px-12 relative z-10">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-8">
              <div className="max-w-2xl">
                {/* Breadcrumbs & Accreditation badge */}
                <div className="flex items-center gap-2 mb-3 text-xs md:text-sm text-indigo-300">
                  <Link to="/" className="hover:text-white transition-colors">
                    Home
                  </Link>
                  <span>/</span>
                  <span className="text-white font-medium">About Us</span>
                  <span className="ml-2 inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span> Since 2021 • Govt. Registered EdTech
                  </span>
                </div>
                {/* Title */}
                <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white mb-4">
                  Pioneering Bangladesh's Most Trusted{" "}
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-purple-300 to-indigo-200">
                    Mentorship Ecosystem
                  </span>
                </h1>
                {/* Description */}
                <p className="text-base sm:text-lg text-indigo-100/80 mb-6 leading-relaxed">
                  Founded by alumni from BUET and Dhaka University, TutorBridge was created to eliminate educational inequity and unvetted tutoring networks with verified scholars and pedagogical safety.
                </p>
                {/* Action Buttons & Feature Chips */}
                <div className="flex flex-wrap items-center gap-3">
                  <a
                    href="#our-story"
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-sm shadow-lg shadow-indigo-600/30 transition-all"
                  >
                    Our Story &amp; Milestones ↓
                  </a>
                  <span className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg bg-white/5 border border-white/10 text-xs font-medium text-indigo-200 backdrop-blur-sm">
                    🛡️ 4-Tier Verification
                  </span>
                  <span className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg bg-white/5 border border-white/10 text-xs font-medium text-indigo-200 backdrop-blur-sm">
                    📍 All 64 Districts
                  </span>
                </div>
              </div>
              {/* Right Side Visual Showcase Card */}
              <div className="hidden lg:block w-full max-w-sm shrink-0">
                <div className="relative rounded-2xl overflow-hidden border border-white/15 bg-white/5 backdrop-blur-md p-2 shadow-2xl">
                  <img
                    src={heroMentorsImg}
                    alt="Bangladeshi University Mentors &amp; Students"
                    className="w-full h-52 object-cover rounded-xl"
                  />
                  <div className="p-3 flex items-center justify-between text-xs">
                    <div className="flex items-center gap-2">
                      <span className="flex h-2 w-2 rounded-full bg-emerald-400"></span>
                      <span className="font-medium text-white">24,000+ Vetted Mentors</span>
                    </div>
                    <span className="px-2 py-0.5 rounded bg-emerald-500/20 border border-emerald-400/30 text-emerald-300 font-semibold">
                      99.2% Satisfaction
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Section 1: Trust Badge & Key Impact Metrics Strip */}
        <section className="w-full relative overflow-hidden bg-gradient-to-b from-surface-container-low via-surface to-surface pb-12 pt-8">
          <div className="container mx-auto px-4 sm:px-6 lg:px-12 relative z-10">
            {/* Breadcrumb */}
            <nav className="flex items-center gap-2 font-label-md text-label-md text-on-surface-variant mb-6">
              <Link to="/" className="hover:text-primary transition-colors flex items-center gap-1">
                <span className="material-symbols-outlined text-[16px]">home</span>
                Home
              </Link>
              <span className="text-outline-variant">/</span>
              <span className="text-on-surface-variant">Company</span>
              <span className="text-outline-variant">/</span>
              <span className="text-primary font-bold">About TutorBridge</span>
            </nav>
            {/* Trust Badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-surface-container-lowest shadow-sm mb-6">
              <span className="w-2 h-2 rounded-full bg-secondary animate-pulse"></span>
              <span className="font-label-sm text-label-sm text-on-surface font-semibold flex items-center gap-1.5">
                <span className="material-symbols-outlined text-[16px] text-secondary">verified_user</span>
                Government Licensed (TRAD/DNCC/024881/2024) &amp; ISO 9001:2015 Certified EdTech Network
              </span>
            </div>
            {/* Main Headline & Subheadline Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start mb-12">
              <div className="lg:col-span-8 space-y-4">
                <h1 className="font-headline-lg text-headline-lg font-extrabold text-on-surface tracking-tight lg:leading-[52px]">
                  Democratizing Academic Excellence Through <span className="text-primary-container">Trusted 1-on-1 Mentorship</span>
                </h1>
                <p className="font-body-lg text-body-lg text-on-surface-variant max-w-3xl leading-relaxed">
                  At TutorBridge, we bridge the gap between ambitious students across Bangladesh and over 24,000+ thoroughly background-checked mentors from the nation's premier institutions. Founded in Dhaka, we are transforming home and online tutoring into a safe, transparent, and results-driven experience.
                </p>
              </div>
              <div className="lg:col-span-4 flex flex-col sm:flex-row lg:flex-col gap-3 justify-end items-stretch lg:pt-2">
                <Link
                  to="/tutors"
                  className="px-6 py-3.5 rounded-xl bg-primary-container text-on-primary font-label-lg text-label-lg hover:bg-tertiary-container transition-all shadow-md hover:shadow-lg flex items-center justify-center gap-2"
                >
                  <span>Find a Verified Tutor</span>
                  <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
                </Link>
                <Link
                  to="/apply-tutor"
                  className="px-6 py-3.5 rounded-xl bg-surface-container-lowest text-on-surface font-label-lg text-label-lg hover:bg-surface-container transition-all shadow-sm flex items-center justify-center gap-2"
                >
                  <span className="material-symbols-outlined text-[18px] text-primary">person_add</span>
                  <span>Join as an Educator</span>
                </Link>
              </div>
            </div>
            {/* Key Impact Metrics Strip (Level 1 Surface) */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-5 rounded-2xl bg-surface-container-lowest shadow-sm">
              <div className="flex items-center gap-3.5 p-3 rounded-xl bg-surface-container-low/60">
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary">
                  <span className="material-symbols-outlined text-[26px]">groups</span>
                </div>
                <div>
                  <div className="font-headline-md text-headline-md font-bold text-on-surface leading-tight">100,000+</div>
                  <div className="font-label-sm text-label-sm text-on-surface-variant font-medium">Students Guided</div>
                </div>
              </div>
              <div className="flex items-center gap-3.5 p-3 rounded-xl bg-surface-container-low/60">
                <div className="w-12 h-12 rounded-xl bg-secondary/10 flex items-center justify-center text-secondary">
                  <span className="material-symbols-outlined text-[26px]">verified</span>
                </div>
                <div>
                  <div className="font-headline-md text-headline-md font-bold text-on-surface leading-tight">24,000+</div>
                  <div className="font-label-sm text-label-sm text-on-surface-variant font-medium">Vetted Mentors</div>
                </div>
              </div>
              <div className="flex items-center gap-3.5 p-3 rounded-xl bg-surface-container-low/60">
                <div className="w-12 h-12 rounded-xl bg-tertiary-container/10 flex items-center justify-center text-tertiary-container">
                  <span className="material-symbols-outlined text-[26px]">map</span>
                </div>
                <div>
                  <div className="font-headline-md text-headline-md font-bold text-on-surface leading-tight">64 Districts</div>
                  <div className="font-label-sm text-label-sm text-on-surface-variant font-medium">Nationwide Reach</div>
                </div>
              </div>
              <div className="flex items-center gap-3.5 p-3 rounded-xl bg-surface-container-low/60">
                <div className="w-12 h-12 rounded-xl bg-secondary-container/30 flex items-center justify-center text-on-secondary-container">
                  <span className="material-symbols-outlined text-[26px]">star</span>
                </div>
                <div>
                  <div className="font-headline-md text-headline-md font-bold text-on-surface leading-tight">4.9 / 5.0</div>
                  <div className="font-label-sm text-label-sm text-on-surface-variant font-medium">Guardian Satisfaction</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Section 2: Our Story & Academic Rigor (Photo-Rich Visual Narrative) */}
        <section className="w-full py-16 bg-surface" id="our-story">
          <div className="container mx-auto px-4 sm:px-6 lg:px-12">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
              {/* Story Text */}
              <div className="lg:col-span-6 space-y-6">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary-fixed text-on-primary-fixed-variant font-label-sm text-label-sm">
                  <span className="material-symbols-outlined text-[14px]">auto_stories</span>
                  The TutorBridge Genesis
                </div>
                <h2 className="font-headline-lg text-headline-lg font-bold text-on-surface tracking-tight">
                  How University Scholars Reimagined Home &amp; Online Learning
                </h2>
                <div className="space-y-4 font-body-md text-body-md text-on-surface-variant">
                  <p>
                    In 2021, a group of university scholars from <strong>BUET</strong>, <strong>Dhaka University</strong>, and <strong>IBA</strong> observed a painful disconnect across residential neighborhoods: guardians desperately sought trustworthy, academically brilliant mentors, while top-tier undergraduate educators struggled against middleman syndicates offering little transparency.
                  </p>
                  <p>
                    We established TutorBridge with one foundational promise: total transparency, academic accountability, and uncompromising safety. What started with an initial cohort of 100 passionate engineering and science tutors in Dhaka has grown into Bangladesh's premier verified learning network, serving students from Playgroup to Higher Secondary and competitive University Admission batches.
                  </p>
                </div>
                {/* Compliance & Safety Callout */}
                <div className="p-5 rounded-2xl bg-surface-container-low space-y-2">
                  <div className="flex items-center gap-2 font-headline-sm text-headline-sm text-on-surface text-[16px]">
                    <span className="material-symbols-outlined text-secondary text-[20px]">gavel</span>
                    Government Compliance &amp; Safety First
                  </div>
                  <p className="font-body-sm text-body-sm text-on-surface-variant">
                    Every tutor undergoes a rigorous 4-stage credential screening: National ID verification, varsity enrollment confirmation, police record cross-referencing, and pedagogical mock demonstrations.
                  </p>
                </div>
                {/* Mission Quote Pill */}
                <div className="p-4 rounded-xl bg-surface-container-highest/60 flex items-start gap-3">
                  <span className="material-symbols-outlined text-primary text-[24px] shrink-0 mt-0.5">format_quote</span>
                  <span className="font-body-md text-body-md italic text-on-surface font-medium">
                    "Our commitment is simple: no student is left behind, and every tutor is treated as an empowered, respected educator."
                  </span>
                </div>
              </div>
              {/* Image Narrative Showcase */}
              <div className="lg:col-span-6 relative">
                <div className="relative rounded-3xl overflow-hidden shadow-xl bg-surface-container">
                  <img
                    alt="TutorBridge mentor helping a high school student with advanced calculus in a bright academic study library in Dhaka"
                    className="w-full h-[460px] object-cover hover:scale-105 transition-transform duration-700"
                    src={mentorshipActionImg}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
                  {/* Live Indicator Badge */}
                  <div className="absolute top-4 left-4 px-3 py-1.5 rounded-full bg-surface-container-lowest/90 backdrop-blur-md shadow-sm flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-secondary"></span>
                    <span className="font-label-sm text-label-sm text-on-surface font-semibold">1-on-1 Academic Tutoring in Action</span>
                  </div>
                  {/* Floating Overlay Card */}
                  <div className="absolute bottom-6 left-6 right-6 p-4 rounded-2xl bg-surface-container-lowest/95 backdrop-blur-xl shadow-lg flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-secondary-container flex items-center justify-center text-on-secondary-container">
                        <span className="material-symbols-outlined text-[22px]">thumb_up</span>
                      </div>
                      <div>
                        <div className="font-headline-sm text-headline-sm text-[16px] font-bold text-on-surface">99.2% Positive Parent Feedback</div>
                        <div className="font-label-sm text-label-sm text-on-surface-variant">Over 1,200,000+ tutoring hours safely delivered</div>
                      </div>
                    </div>
                    <div className="hidden sm:flex items-center gap-1 text-secondary font-label-md text-label-md font-bold">
                      <span className="material-symbols-outlined text-[18px]">verified</span>
                      Verified
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Section 3: Vision, Mission & Core Values (Bento Cards with Micro-Interactions) */}
        <section className="w-full py-16 bg-surface-container-low">
          <div className="container mx-auto px-4 sm:px-6 lg:px-12">
            <div className="text-center max-w-2xl mx-auto mb-12 space-y-3">
              <span className="px-3.5 py-1 rounded-full bg-surface-container-high text-primary font-label-sm text-label-sm">
                Guiding Principles
              </span>
              <h2 className="font-headline-lg text-headline-lg font-bold text-on-surface tracking-tight">
                Purpose-Driven Learning Framework
              </h2>
              <p className="font-body-md text-body-md text-on-surface-variant">
                Engineered to support students, reassure anxious parents, and reward dedicated student-teachers across Bangladesh.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Card 1: Vision */}
              <div className="p-8 rounded-3xl bg-surface-container-lowest shadow-sm hover:shadow-md transition-all duration-300 flex flex-col justify-between group">
                <div className="space-y-4">
                  <div className="w-14 h-14 rounded-2xl bg-primary-fixed flex items-center justify-center text-on-primary-fixed-variant group-hover:scale-110 transition-transform">
                    <span className="material-symbols-outlined text-[30px]">explore</span>
                  </div>
                  <div className="font-headline-md text-headline-md font-bold text-on-surface">Our Vision</div>
                  <p className="font-body-md text-body-md text-on-surface-variant leading-relaxed">
                    To be South Asia's benchmark personalized learning ecosystem where every student—regardless of geography or economic background—discovers world-class mentorship tailored to their unique academic ambitions.
                  </p>
                </div>
                <div className="pt-6 mt-6 border-t border-surface-container-high flex items-center gap-2 font-label-sm text-label-sm text-primary font-bold">
                  <span>Excellence Across 64 Districts</span>
                  <span className="material-symbols-outlined text-[16px]">arrow_right_alt</span>
                </div>
              </div>
              {/* Card 2: Mission */}
              <div className="p-8 rounded-3xl bg-surface-container-lowest shadow-sm hover:shadow-md transition-all duration-300 flex flex-col justify-between group">
                <div className="space-y-4">
                  <div className="w-14 h-14 rounded-2xl bg-secondary-container flex items-center justify-center text-on-secondary-container group-hover:scale-110 transition-transform">
                    <span className="material-symbols-outlined text-[30px]">rocket_launch</span>
                  </div>
                  <div className="font-headline-md text-headline-md font-bold text-on-surface">Our Mission</div>
                  <p className="font-body-md text-body-md text-on-surface-variant leading-relaxed">
                    Connecting eager students with thoroughly vetted tutors in under 24 hours while ensuring utmost safety, pedagogical excellence, and fair, transparent remuneration for university educators.
                  </p>
                </div>
                <div className="pt-6 mt-6 border-t border-surface-container-high flex items-center gap-2 font-label-sm text-label-sm text-secondary font-bold">
                  <span>Rapid 24-Hour Tutor Placement</span>
                  <span className="material-symbols-outlined text-[16px]">arrow_right_alt</span>
                </div>
              </div>
              {/* Card 3: Values */}
              <div className="p-8 rounded-3xl bg-surface-container-lowest shadow-sm hover:shadow-md transition-all duration-300 flex flex-col justify-between group">
                <div className="space-y-4">
                  <div className="w-14 h-14 rounded-2xl bg-surface-container-highest flex items-center justify-center text-primary-container group-hover:scale-110 transition-transform">
                    <span className="material-symbols-outlined text-[30px]">verified</span>
                  </div>
                  <div className="font-headline-md text-headline-md font-bold text-on-surface">Guiding Values</div>
                  <p className="font-body-md text-body-md text-on-surface-variant">
                    Every decision we make is governed by our non-negotiable operational values:
                  </p>
                  <div className="grid grid-cols-2 gap-2 pt-1">
                    <div className="px-2.5 py-2 rounded-xl bg-surface-container-low font-label-sm text-label-sm text-on-surface font-semibold flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-primary"></span>
                      Transparency
                    </div>
                    <div className="px-2.5 py-2 rounded-xl bg-surface-container-low font-label-sm text-label-sm text-on-surface font-semibold flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-secondary"></span>
                      Strict Verification
                    </div>
                    <div className="px-2.5 py-2 rounded-xl bg-surface-container-low font-label-sm text-label-sm text-on-surface font-semibold flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-tertiary-container"></span>
                      Pedagogy First
                    </div>
                    <div className="px-2.5 py-2 rounded-xl bg-surface-container-low font-label-sm text-label-sm text-on-surface font-semibold flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-secondary-container"></span>
                      Guardian Safety
                    </div>
                  </div>
                </div>
                <div className="pt-6 mt-6 border-t border-surface-container-high flex items-center gap-2 font-label-sm text-label-sm text-on-surface-variant font-bold">
                  <span>Built on Ethics &amp; Accountability</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Section 4: The TutorBridge Trust Standard (6-Feature Trust Matrix) */}
        <section className="w-full py-16 bg-surface">
          <div className="container mx-auto px-4 sm:px-6 lg:px-12">
            <div className="max-w-3xl mb-12 space-y-3">
              <span className="px-3.5 py-1 rounded-full bg-secondary-container text-on-secondary-container font-label-sm text-label-sm">
                Why Families Trust Us
              </span>
              <h2 className="font-headline-lg text-headline-lg font-bold text-on-surface tracking-tight">
                The TutorBridge Trust Standard
              </h2>
              <p className="font-body-md text-body-md text-on-surface-variant">
                Why over 100,000 families and university scholars trust our platform every academic term.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {/* Feature 1 */}
              <div className="p-6 rounded-2xl bg-surface-container-lowest shadow-sm hover:shadow-md transition-shadow">
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary mb-4">
                  <span className="material-symbols-outlined text-[24px]">verified_user</span>
                </div>
                <h3 className="font-headline-sm text-headline-sm text-on-surface mb-2">Government Registered &amp; Licensed</h3>
                <p className="font-body-sm text-body-sm text-on-surface-variant leading-relaxed">
                  Registered under City Corporation Trade License <strong>TRAD/DNCC/024881/2024</strong>. Full compliance with Bangladesh ICT education policies and ISO 9001:2015 standards.
                </p>
              </div>
              {/* Feature 2 */}
              <div className="p-6 rounded-2xl bg-surface-container-lowest shadow-sm hover:shadow-md transition-shadow">
                <div className="w-12 h-12 rounded-xl bg-secondary/10 flex items-center justify-center text-secondary mb-4">
                  <span className="material-symbols-outlined text-[24px]">shield</span>
                </div>
                <h3 className="font-headline-sm text-headline-sm text-on-surface mb-2">100% Background-Checked Tutors</h3>
                <p className="font-body-sm text-body-sm text-on-surface-variant leading-relaxed">
                  Mandatory 4-tier screening: NID verification, active university enrollment check (BUET, DU, DMC, NSU, BRAC), local police clearance check, and trial demo evaluation.
                </p>
              </div>
              {/* Feature 3 */}
              <div className="p-6 rounded-2xl bg-surface-container-lowest shadow-sm hover:shadow-md transition-shadow">
                <div className="w-12 h-12 rounded-xl bg-tertiary-container/10 flex items-center justify-center text-tertiary-container mb-4">
                  <span className="material-symbols-outlined text-[24px]">psychology</span>
                </div>
                <h3 className="font-headline-sm text-headline-sm text-on-surface mb-2">AI Proximity &amp; Syllabus Match</h3>
                <p className="font-body-sm text-body-sm text-on-surface-variant leading-relaxed">
                  Our match engine filters through NCTB Bangla Version, English Version, Cambridge IGCSE, Edexcel, and IB curriculums, matching students by commute radius and learning style.
                </p>
              </div>
              {/* Feature 4 */}
              <div className="p-6 rounded-2xl bg-surface-container-lowest shadow-sm hover:shadow-md transition-shadow">
                <div className="w-12 h-12 rounded-xl bg-secondary-container/40 flex items-center justify-center text-on-secondary-container mb-4">
                  <span className="material-symbols-outlined text-[24px]">payments</span>
                </div>
                <h3 className="font-headline-sm text-headline-sm text-on-surface mb-2">Zero Financial Risk</h3>
                <p className="font-body-sm text-body-sm text-on-surface-variant leading-relaxed">
                  No registration fees for students or guardians. 1-day free trial demo lecture before you commit. 100% fee escrow protection until you are completely satisfied.
                </p>
              </div>
              {/* Feature 5 */}
              <div className="p-6 rounded-2xl bg-surface-container-lowest shadow-sm hover:shadow-md transition-shadow">
                <div className="w-12 h-12 rounded-xl bg-primary-fixed flex items-center justify-center text-on-primary-fixed-variant mb-4">
                  <span className="material-symbols-outlined text-[24px]">corporate_fare</span>
                </div>
                <h3 className="font-headline-sm text-headline-sm text-on-surface mb-2">Physical Academic Centers</h3>
                <p className="font-body-sm text-body-sm text-on-surface-variant leading-relaxed">
                  Unlike anonymous classified sites, we operate real offices in Banani (Dhaka), Mirpur DOHS, and GEC Circle (Chattogram), where parents and tutors can visit in person.
                </p>
              </div>
              {/* Feature 6 */}
              <div className="p-6 rounded-2xl bg-surface-container-lowest shadow-sm hover:shadow-md transition-shadow">
                <div className="w-12 h-12 rounded-xl bg-surface-container-highest flex items-center justify-center text-primary mb-4">
                  <span className="material-symbols-outlined text-[24px]">support_agent</span>
                </div>
                <h3 className="font-headline-sm text-headline-sm text-on-surface mb-2">Guardian Safety &amp; Concierge</h3>
                <p className="font-body-sm text-body-sm text-on-surface-variant leading-relaxed">
                  Dedicated academic coordinators assist with monthly progress tests. For female students and female tutors, specialized check-in and safety protocols remain active 24/7.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Section 5: Leadership, Operations Hub & Physical Presence */}
        <section className="w-full py-16 bg-surface-container-low" id="leadership">
          <div className="container mx-auto px-4 sm:px-6 lg:px-12">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
              {/* HQ Image Showcase */}
              <div className="lg:col-span-6 relative order-2 lg:order-1">
                <div className="relative rounded-3xl overflow-hidden shadow-xl bg-surface-container">
                  <img
                    alt="TutorBridge corporate headquarters in Banani, Dhaka with academic operations team, counselors, and support staff"
                    className="w-full h-[440px] object-cover hover:scale-105 transition-transform duration-700"
                    src={operationsHubImg}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent"></div>
                  <div className="absolute top-4 left-4 px-3 py-1.5 rounded-full bg-surface-container-lowest/90 backdrop-blur-md shadow-sm flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-secondary"></span>
                    <span className="font-label-sm text-label-sm text-on-surface font-semibold">TutorBridge Academic Operations Hub</span>
                  </div>
                  <div className="absolute bottom-6 left-6 right-6 p-4 rounded-2xl bg-surface-container-lowest/95 backdrop-blur-xl shadow-lg">
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="font-headline-sm text-headline-sm text-[16px] font-bold text-on-surface">Banani HQ &amp; Mirpur Support Center</div>
                        <div className="font-label-sm text-label-sm text-on-surface-variant">Road 11, Block D, Banani, Dhaka-1213</div>
                      </div>
                      <div className="px-3 py-1 rounded-full bg-secondary-container text-on-secondary-container font-label-sm text-label-sm font-semibold">
                        Open 7 Days
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              {/* Leadership Narrative & Founder Card */}
              <div className="lg:col-span-6 space-y-6 order-1 lg:order-2">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary-fixed text-on-primary-fixed-variant font-label-sm text-label-sm">
                  <span className="material-symbols-outlined text-[14px]">psychology_alt</span>
                  Our People &amp; Leadership
                </div>
                <h2 className="font-headline-lg text-headline-lg font-bold text-on-surface tracking-tight">
                  Built by Educators, Engineered for Guardians
                </h2>
                <p className="font-body-md text-body-md text-on-surface-variant leading-relaxed">
                  Behind TutorBridge is a diverse team of 45+ full-time educators, former university lecturers, student-welfare officers, and software engineers. We don't operate merely as a matching directory; we continuously train our tutors on curriculum updates (NCTB 2024 reform, Cambridge syllabi revisions) and behavioral ethics.
                </p>
                {/* Founder's Message Spotlight Card */}
                <div className="p-6 rounded-2xl bg-surface-container-lowest shadow-sm flex flex-col sm:flex-row items-center gap-5">
                  <div className="w-16 h-16 rounded-full bg-primary-container text-on-primary flex items-center justify-center shrink-0 shadow-md">
                    <span className="material-symbols-outlined text-[32px]">record_voice_over</span>
                  </div>
                  <div className="space-y-1.5 flex-1 text-center sm:text-left">
                    <div className="font-headline-sm text-headline-sm text-[17px] font-bold text-on-surface">Read the Founder's Open Letter</div>
                    <p className="font-body-sm text-body-sm text-on-surface-variant">
                      "Why we reject the commercial coaching center model in favor of compassionate 1-on-1 human mentorship."
                    </p>
                    <Link
                      to="/founder-message"
                      className="inline-flex items-center gap-1.5 font-label-md text-label-md text-primary font-bold hover:underline pt-1"
                    >
                      <span>Explore Founder's Message</span>
                      <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Section 6: Impact & Milestones Timeline */}
        <section className="w-full py-16 bg-surface">
          <div className="container mx-auto px-4 sm:px-6 lg:px-12">
            <div className="text-center max-w-2xl mx-auto mb-14 space-y-3">
              <span className="px-3.5 py-1 rounded-full bg-surface-container-high text-primary font-label-sm text-label-sm">
                Our Journey
              </span>
              <h2 className="font-headline-lg text-headline-lg font-bold text-on-surface tracking-tight">
                Milestones in Personalized Education
              </h2>
              <p className="font-body-md text-body-md text-on-surface-variant">
                From a dorm-room initiative to Bangladesh's fastest growing institutional tuition network.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 relative">
              {/* Milestone 1 */}
              <div className="p-6 rounded-2xl bg-surface-container-lowest shadow-sm flex flex-col justify-between">
                <div>
                  <div className="font-headline-lg text-headline-lg text-primary font-extrabold mb-1">2021</div>
                  <div className="font-headline-sm text-headline-sm text-[16px] font-bold text-on-surface mb-2">Humble Beginnings</div>
                  <p className="font-body-sm text-body-sm text-on-surface-variant">
                    Founded by DU &amp; BUET graduates. First cohort of 100 tutors onboarded manually across Dhanmondi and Uttara.
                  </p>
                </div>
                <div className="mt-6 flex items-center gap-1 text-secondary font-label-sm text-label-sm font-semibold">
                  <span className="material-symbols-outlined text-[16px]">check_circle</span>
                  Foundation Laid
                </div>
              </div>
              {/* Milestone 2 */}
              <div className="p-6 rounded-2xl bg-surface-container-lowest shadow-sm flex flex-col justify-between">
                <div>
                  <div className="font-headline-lg text-headline-lg text-primary font-extrabold mb-1">2023</div>
                  <div className="font-headline-sm text-headline-sm text-[16px] font-bold text-on-surface mb-2">Regional Expansion</div>
                  <p className="font-body-sm text-body-sm text-on-surface-variant">
                    Opened hubs in Chattogram (GEC) &amp; Sylhet. Deployed automated tutor verification and guardian WhatsApp status alerts.
                  </p>
                </div>
                <div className="mt-6 flex items-center gap-1 text-secondary font-label-sm text-label-sm font-semibold">
                  <span className="material-symbols-outlined text-[16px]">check_circle</span>
                  3 Divisional Hubs
                </div>
              </div>
              {/* Milestone 3 */}
              <div className="p-6 rounded-2xl bg-surface-container-lowest shadow-sm flex flex-col justify-between">
                <div>
                  <div className="font-headline-lg text-headline-lg text-primary font-extrabold mb-1">2024</div>
                  <div className="font-headline-sm text-headline-sm text-[16px] font-bold text-on-surface mb-2">National Recognition</div>
                  <p className="font-body-sm text-body-sm text-on-surface-variant">
                    Awarded Best EdTech Innovation. Surpassed 50,000 satisfied students and implemented biometric background checks.
                  </p>
                </div>
                <div className="mt-6 flex items-center gap-1 text-secondary font-label-sm text-label-sm font-semibold">
                  <span className="material-symbols-outlined text-[16px]">check_circle</span>
                  50K Students
                </div>
              </div>
              {/* Milestone 4 */}
              <div className="p-6 rounded-2xl bg-surface-container-lowest shadow-sm flex flex-col justify-between">
                <div>
                  <div className="font-headline-lg text-headline-lg text-primary-container font-extrabold mb-1">2026</div>
                  <div className="font-headline-sm text-headline-sm text-[16px] font-bold text-on-surface mb-2">AI-Driven Matching</div>
                  <p className="font-body-sm text-body-sm text-on-surface-variant">
                    Over 24,000+ active educators, ৳4.8 Cr+ safely disbursed to student tutors, and instant AI-based curriculum matching.
                  </p>
                </div>
                <div className="mt-6 flex items-center gap-1 text-secondary font-label-sm text-label-sm font-semibold">
                  <span className="material-symbols-outlined text-[16px]">flag</span>
                  Current Benchmark
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Section 7: Dual-Audience Action Banner */}
        <section className="w-full py-16 bg-surface-container-low">
          <div className="container mx-auto px-4 sm:px-6 lg:px-12">
            <div className="p-8 lg:p-12 rounded-3xl bg-primary-container text-on-primary shadow-xl relative overflow-hidden">
              {/* Subtle Background Glows */}
              <div className="absolute -right-16 -top-16 w-80 h-80 rounded-full bg-tertiary-container/30 blur-3xl pointer-events-none"></div>
              <div className="absolute -left-16 -bottom-16 w-80 h-80 rounded-full bg-secondary-container/20 blur-3xl pointer-events-none"></div>
              <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                <div className="lg:col-span-7 space-y-4">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-surface-container-lowest/20 backdrop-blur-md font-label-sm text-label-sm text-on-primary">
                    <span className="material-symbols-outlined text-[16px] text-secondary-fixed">bolt</span>
                    Fastest Tutor Placement in Bangladesh
                  </div>
                  <h2 className="font-headline-lg text-headline-lg font-bold text-on-primary tracking-tight">
                    Ready to Experience Better Tuition?
                  </h2>
                  <p className="font-body-lg text-body-lg text-on-primary-container max-w-xl">
                    Whether you are a parent seeking an inspiring role model for your child, or a top university student eager to mentor future scholars, TutorBridge is your trusted partner.
                  </p>
                </div>
                <div className="lg:col-span-5 flex flex-col sm:flex-row lg:flex-col gap-4 justify-end">
                  {/* Guardian Trigger */}
                  <Link
                    to="/request-tutor"
                    className="p-4 rounded-2xl bg-surface-container-lowest text-on-surface hover:bg-surface-bright transition-all shadow-md flex items-center justify-between group"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-primary-fixed flex items-center justify-center text-primary">
                        <span className="material-symbols-outlined text-[22px]">family_restroom</span>
                      </div>
                      <div>
                        <div className="font-headline-sm text-headline-sm text-[16px] font-bold text-on-surface">For Parents &amp; Students</div>
                        <div className="font-label-sm text-label-sm text-on-surface-variant">Request Tutor (1-Day Free Trial)</div>
                      </div>
                    </div>
                    <span className="material-symbols-outlined text-primary group-hover:translate-x-1 transition-transform">arrow_forward</span>
                  </Link>
                  {/* Tutor Trigger */}
                  <Link
                    to="/apply-tutor"
                    className="p-4 rounded-2xl bg-primary-container/80 backdrop-blur-md text-on-primary hover:bg-primary-container transition-all flex items-center justify-between group"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-secondary-container flex items-center justify-center text-on-secondary-container">
                        <span className="material-symbols-outlined text-[22px]">school</span>
                      </div>
                      <div>
                        <div className="font-headline-sm text-headline-sm text-[16px] font-bold text-on-primary">For University Scholars</div>
                        <div className="font-label-sm text-label-sm text-on-primary-container">Apply as a Tutor (Free Sign-up)</div>
                      </div>
                    </div>
                    <span className="material-symbols-outlined text-on-primary group-hover:translate-x-1 transition-transform">arrow_forward</span>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default AboutUsPage;
