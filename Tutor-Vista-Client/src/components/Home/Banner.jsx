import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import nusratImg from "../../assets/Home/stitch/hero-nusrat.jpg";
import social1 from "../../assets/Home/stitch/social-1.jpg";
import social2 from "../../assets/Home/stitch/social-2.jpg";
import social3 from "../../assets/Home/stitch/social-3.jpg";

const Banner = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("tutor"); // 'tutor' or 'jobs'
  const [location, setLocation] = useState("dhanmondi");
  const [grade, setGrade] = useState("class9-10");
  const [subject, setSubject] = useState("all");
  const [preference, setPreference] = useState("any");

  const handleSearch = (e) => {
    e.preventDefault();
    const params = new URLSearchParams();
    if (location) params.set("division", location);
    if (grade) params.set("class", grade);
    if (subject) params.set("subject", subject);
    if (preference) params.set("gender", preference);

    if (activeTab === "tutor") {
      navigate(`/tutors?${params.toString()}`);
    } else {
      navigate(`/tuition-jobs?${params.toString()}`);
    }
  };

  return (
    <section className="relative w-full overflow-hidden bg-gradient-to-b from-surface via-surface-container-low/40 to-surface pt-6 pb-12 lg:pt-10 lg:pb-16">
      {/* Ambient backdrops */}
      <div className="absolute top-0 right-1/4 w-96 h-96 rounded-full bg-primary-fixed-dim/20 blur-3xl pointer-events-none -z-10" />
      <div className="absolute top-1/3 left-[-5%] w-[420px] h-[420px] rounded-full bg-secondary-container/20 blur-3xl pointer-events-none -z-10" />

      <div className="container mx-auto px-4 sm:px-6 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          
          {/* Left Column: Value Proposition & Matching Engine */}
          <div className="lg:col-span-7 flex flex-col space-y-5">
            {/* Trust Kicker Pill */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-surface-container-highest/80 text-on-surface w-fit shadow-sm">
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-secondary opacity-75" />
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-secondary" />
              </span>
              <span className="font-label-md text-label-md font-semibold text-on-surface">
                #1 Vetted Tuition Marketplace in Bangladesh
              </span>
              <span className="text-outline-variant font-label-md">|</span>
              <span className="font-label-md text-label-md text-secondary font-bold flex items-center gap-1">
                <span
                  className="material-symbols-outlined text-[15px]"
                  style={{ fontVariationSettings: "'FILL' 1" }}
                >
                  check_circle
                </span>
                99.4% Match Rate
              </span>
            </div>

            {/* Main Hero H1 */}
            <div className="space-y-3">
              <h1 className="font-display-hero text-display-hero text-on-surface font-extrabold tracking-tight">
                Find Qualified &amp; Verified Tutors for{" "}
                <span className="bg-gradient-to-r from-primary to-primary-container bg-clip-text text-transparent underline decoration-secondary-container decoration-4 underline-offset-8">
                  Bangla &amp; English Medium
                </span>
              </h1>
              <p className="font-body-lg text-body-lg text-on-surface-variant max-w-2xl leading-relaxed">
                Connect with 10,000+ top-rated tutors from BUET, DU, DMC, BRAC &amp; NSU. Fast
                matching, zero commission for parents, and 100% background checked.
              </p>
            </div>

            {/* Trust Badges Row */}
            <div className="flex flex-wrap items-center gap-4 py-1">
              <div className="flex items-center gap-2 text-on-surface-variant font-label-md text-label-md">
                <span className="material-symbols-outlined text-secondary text-[18px]">
                  verified_user
                </span>
                <span>National ID &amp; Varsity Verified</span>
              </div>
              <div className="flex items-center gap-2 text-on-surface-variant font-label-md text-label-md">
                <span className="material-symbols-outlined text-secondary text-[18px]">
                  home_pin
                </span>
                <span>Safe In-Home or Online</span>
              </div>
              <div className="flex items-center gap-2 text-on-surface-variant font-label-md text-label-md">
                <span className="material-symbols-outlined text-secondary text-[18px]">
                  published_with_changes
                </span>
                <span>Free Replacement Guarantee</span>
              </div>
            </div>

            {/* Search Command Center Card */}
            <div className="bg-surface-container-lowest rounded-2xl shadow-xl p-5 sm:p-6 relative border border-slate-100">
              {/* Tabs */}
              <div className="flex items-center gap-2 p-1 bg-surface-container rounded-xl w-fit mb-5">
                <button
                  type="button"
                  onClick={() => setActiveTab("tutor")}
                  className={`px-5 py-2 rounded-lg font-label-lg text-label-lg transition-all cursor-pointer ${
                    activeTab === "tutor"
                      ? "bg-primary-container text-on-primary shadow-sm font-semibold"
                      : "text-on-surface-variant hover:text-on-surface"
                  }`}
                >
                  Find a Tutor
                </button>
                <button
                  type="button"
                  onClick={() => setActiveTab("jobs")}
                  className={`px-5 py-2 rounded-lg font-label-lg text-label-lg transition-all cursor-pointer ${
                    activeTab === "jobs"
                      ? "bg-primary-container text-on-primary shadow-sm font-semibold"
                      : "text-on-surface-variant hover:text-on-surface"
                  }`}
                >
                  Find Tuition Jobs
                </button>
              </div>

              {/* Search Inputs Grid */}
              <form onSubmit={handleSearch}>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                  {/* Field 1: Location */}
                  <div className="flex flex-col space-y-1.5 p-3 rounded-xl bg-surface-container-low hover:bg-surface-container transition-colors">
                    <label className="font-label-sm text-label-sm text-on-surface-variant flex items-center gap-1.5">
                      <span className="material-symbols-outlined text-primary text-[16px]">
                        location_on
                      </span>
                      Select Location
                    </label>
                    <div className="relative">
                      <select
                        value={location}
                        onChange={(e) => setLocation(e.target.value)}
                        className="w-full bg-transparent font-headline-sm text-headline-sm text-on-surface text-[14px] font-semibold focus:outline-none cursor-pointer appearance-none pr-6"
                      >
                        <option value="dhanmondi">Dhanmondi, Dhaka</option>
                        <option value="uttara">Uttara, Dhaka</option>
                        <option value="gulshan">Gulshan &amp; Banani, Dhaka</option>
                        <option value="mirpur">Mirpur (1-14), Dhaka</option>
                        <option value="chattogram">GEC &amp; Agrabad, Chattogram</option>
                        <option value="sylhet">Zindabazar, Sylhet</option>
                        <option value="online">Online / Anywhere in BD</option>
                      </select>
                      <span className="material-symbols-outlined absolute right-0 top-1 text-on-surface-variant text-[18px] pointer-events-none">
                        expand_more
                      </span>
                    </div>
                  </div>

                  {/* Field 2: Class & Medium */}
                  <div className="flex flex-col space-y-1.5 p-3 rounded-xl bg-surface-container-low hover:bg-surface-container transition-colors">
                    <label className="font-label-sm text-label-sm text-on-surface-variant flex items-center gap-1.5">
                      <span className="material-symbols-outlined text-primary text-[16px]">
                        school
                      </span>
                      Class &amp; Curriculum
                    </label>
                    <div className="relative">
                      <select
                        value={grade}
                        onChange={(e) => setGrade(e.target.value)}
                        className="w-full bg-transparent font-headline-sm text-headline-sm text-on-surface text-[14px] font-semibold focus:outline-none cursor-pointer appearance-none pr-6"
                      >
                        <option value="class9-10">Class 9-10 (SSC)</option>
                        <option value="hsc">HSC (Science / Commerce / Arts)</option>
                        <option value="olevel">O-Levels (Cambridge / Edexcel)</option>
                        <option value="alevel">A-Levels (Cambridge / Edexcel)</option>
                        <option value="class1-5">Class 1-5 (Primary Foundation)</option>
                        <option value="class6-8">Class 6-8 (Junior Secondary)</option>
                        <option value="admission">University Admission Prep</option>
                      </select>
                      <span className="material-symbols-outlined absolute right-0 top-1 text-on-surface-variant text-[18px] pointer-events-none">
                        expand_more
                      </span>
                    </div>
                  </div>

                  {/* Field 3: Subject */}
                  <div className="flex flex-col space-y-1.5 p-3 rounded-xl bg-surface-container-low hover:bg-surface-container transition-colors">
                    <label className="font-label-sm text-label-sm text-on-surface-variant flex items-center gap-1.5">
                      <span className="material-symbols-outlined text-primary text-[16px]">
                        menu_book
                      </span>
                      Subject of Interest
                    </label>
                    <div className="relative">
                      <select
                        value={subject}
                        onChange={(e) => setSubject(e.target.value)}
                        className="w-full bg-transparent font-headline-sm text-headline-sm text-on-surface text-[14px] font-semibold focus:outline-none cursor-pointer appearance-none pr-6"
                      >
                        <option value="all">All Subjects (General)</option>
                        <option value="higher-math">Higher Mathematics</option>
                        <option value="physics">Physics &amp; Chemistry</option>
                        <option value="biology">Biology</option>
                        <option value="english">English (Grammar &amp; Spoken)</option>
                        <option value="ict">ICT &amp; Computer Science</option>
                        <option value="accounting">Accounting &amp; Finance</option>
                      </select>
                      <span className="material-symbols-outlined absolute right-0 top-1 text-on-surface-variant text-[18px] pointer-events-none">
                        expand_more
                      </span>
                    </div>
                  </div>

                  {/* Field 4: Tutor Preference */}
                  <div className="flex flex-col space-y-1.5 p-3 rounded-xl bg-surface-container-low hover:bg-surface-container transition-colors">
                    <label className="font-label-sm text-label-sm text-on-surface-variant flex items-center gap-1.5">
                      <span className="material-symbols-outlined text-primary text-[16px]">
                        how_to_reg
                      </span>
                      Tutor Preference
                    </label>
                    <div className="relative">
                      <select
                        value={preference}
                        onChange={(e) => setPreference(e.target.value)}
                        className="w-full bg-transparent font-headline-sm text-headline-sm text-on-surface text-[14px] font-semibold focus:outline-none cursor-pointer appearance-none pr-6"
                      >
                        <option value="any">Any Qualified Tutor</option>
                        <option value="female">Female Tutor Preferred</option>
                        <option value="buet-du">BUET / DU / DMC Affiliated</option>
                        <option value="english-med">English Medium Background</option>
                        <option value="experienced">5+ Years Experienced</option>
                      </select>
                      <span className="material-symbols-outlined absolute right-0 top-1 text-on-surface-variant text-[18px] pointer-events-none">
                        expand_more
                      </span>
                    </div>
                  </div>
                </div>

                {/* Submit Search CTA */}
                <div className="mt-4 pt-1">
                  <button
                    type="submit"
                    className="w-full py-3.5 px-6 rounded-xl bg-primary-container hover:bg-tertiary-container text-on-primary font-headline-sm text-headline-sm text-[15px] font-bold shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-3 group cursor-pointer"
                  >
                    <span className="material-symbols-outlined text-[20px] group-hover:rotate-12 transition-transform">
                      search
                    </span>
                    <span>
                      {activeTab === "tutor"
                        ? "Search Verified Tutors (2,450+ Active)"
                        : "Search Tuition Jobs (350+ Live)"}
                    </span>
                    <span className="material-symbols-outlined text-[20px] group-hover:translate-x-1 transition-transform">
                      arrow_forward
                    </span>
                  </button>
                </div>
              </form>

              <div className="mt-3 flex items-center justify-between text-on-surface-variant font-label-sm text-label-sm px-1">
                <span className="flex items-center gap-1">
                  <span className="material-symbols-outlined text-secondary text-[14px]">bolt</span>
                  Average tutor match time: <strong>4 to 8 hours</strong>
                </span>
                <Link
                  to="/request-tutor"
                  className="text-primary-container font-semibold hover:underline"
                >
                  Post custom requirement →
                </Link>
              </div>
            </div>
          </div>

          {/* Right Column: Interactive Featured Verified Tutor Hero Card & Social Proof */}
          <div className="lg:col-span-5 relative flex flex-col items-center">
            {/* Top Floating Micro Badge */}
            <div className="w-full flex justify-end -mb-4 z-20 pr-4">
              <div className="px-3.5 py-1.5 rounded-full bg-secondary text-on-secondary font-label-sm text-label-sm tracking-wide font-bold flex items-center gap-1.5 shadow-md animate-bounce">
                <span className="material-symbols-outlined text-[16px]">stars</span>
                <span>Verified Top 1% Tutor</span>
              </div>
            </div>

            {/* Hero Profile Card */}
            <div className="w-full bg-surface-container-lowest rounded-3xl p-6 shadow-2xl relative overflow-hidden border border-slate-100">
              {/* Decorative Accent Gradient Bar */}
              <div className="h-2 w-full bg-gradient-to-r from-primary-container via-secondary to-secondary-container absolute top-0 left-0" />
              
              <div className="flex items-start gap-4 pt-3">
                <div className="relative shrink-0">
                  <img
                    src={nusratImg}
                    alt="Nusrat Jahan"
                    className="w-20 h-20 rounded-2xl object-cover shadow-md"
                  />
                  <span className="absolute -bottom-1.5 -right-1.5 bg-secondary text-on-secondary rounded-full p-1 shadow-sm flex items-center justify-center">
                    <span className="material-symbols-outlined text-[14px]">verified</span>
                  </span>
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <h3 className="font-headline-sm text-headline-sm text-on-surface font-bold truncate">
                      Nusrat Jahan
                    </h3>
                    <div className="flex items-center gap-1 px-2 py-0.5 rounded-md bg-surface-container font-label-sm text-label-sm font-bold text-on-surface">
                      <span
                        className="material-symbols-outlined text-amber-500 text-[16px]"
                        style={{ fontVariationSettings: "'FILL' 1" }}
                      >
                        star
                      </span>
                      <span>4.9</span>
                      <span className="text-on-surface-variant font-normal">(128)</span>
                    </div>
                  </div>

                  <p className="font-body-sm text-body-sm text-primary-container font-semibold mt-0.5">
                    MS in Applied Mathematics
                  </p>

                  <div className="flex items-center gap-2 mt-1">
                    <span className="px-2 py-0.5 rounded bg-surface-container-high text-on-surface-variant font-label-sm text-label-sm">
                      BRAC University
                    </span>
                    <span className="flex items-center gap-1 text-secondary font-label-sm text-label-sm font-semibold">
                      <span className="material-symbols-outlined text-[13px]">check_circle</span>
                      NID Checked
                    </span>
                  </div>
                </div>
              </div>

              {/* Tutor Subject Badges */}
              <div className="mt-5 flex flex-wrap gap-2">
                <span className="px-2.5 py-1 rounded-lg bg-surface-container-low text-on-surface font-label-md text-label-md">
                  Higher Mathematics
                </span>
                <span className="px-2.5 py-1 rounded-lg bg-surface-container-low text-on-surface font-label-md text-label-md">
                  Physics
                </span>
                <span className="px-2.5 py-1 rounded-lg bg-primary-fixed text-on-primary-fixed-variant font-label-md text-label-md font-semibold">
                  English &amp; Bangla Medium
                </span>
              </div>

              {/* Tutor Metrics Strip */}
              <div className="grid grid-cols-3 gap-2 mt-5 p-3 rounded-xl bg-surface-container-low text-center">
                <div>
                  <p className="font-headline-sm text-headline-sm text-on-surface font-bold">5+ Yrs</p>
                  <p className="font-body-sm text-body-sm text-on-surface-variant text-[11px]">
                    Experience
                  </p>
                </div>
                <div className="border-x border-outline-variant/30">
                  <p className="font-headline-sm text-headline-sm text-on-surface font-bold">120+</p>
                  <p className="font-body-sm text-body-sm text-on-surface-variant text-[11px]">
                    Students Taught
                  </p>
                </div>
                <div>
                  <p className="font-headline-sm text-headline-sm text-secondary font-bold">98%</p>
                  <p className="font-body-sm text-body-sm text-on-surface-variant text-[11px]">
                    GPA-5 Success
                  </p>
                </div>
              </div>

              {/* Price & Action Trigger */}
              <div className="mt-5 pt-4 border-t border-outline-variant/20 flex items-center justify-between gap-3">
                <div>
                  <span className="font-body-sm text-body-sm text-on-surface-variant block text-[12px]">
                    Tutoring Fee
                  </span>
                  <span className="font-headline-sm text-headline-sm text-on-surface font-bold">
                    ৳ 8,000{" "}
                    <span className="font-body-sm text-body-sm text-on-surface-variant font-normal">
                      / mo
                    </span>
                  </span>
                </div>
                <Link
                  to="/request-tutor"
                  className="px-4 py-2.5 rounded-xl bg-primary-container hover:bg-tertiary-container text-on-primary font-label-md text-label-md font-bold shadow-sm transition-all flex items-center gap-1.5 cursor-pointer"
                >
                  <span>Request Free Demo</span>
                  <span className="material-symbols-outlined text-[16px]">calendar_month</span>
                </Link>
              </div>
            </div>

            {/* Student & Guardian Testimonial Floating Micro-Card */}
            <div className="w-11/12 -mt-4 bg-surface-container-lowest/95 backdrop-blur-md rounded-2xl p-4 shadow-xl flex items-center gap-3 z-10 border border-outline-variant/20">
              <div className="flex -space-x-3 overflow-hidden shrink-0">
                <img
                  src={social1}
                  alt="Student"
                  className="inline-block h-9 w-9 rounded-full ring-2 ring-surface-container-lowest object-cover"
                />
                <img
                  src={social2}
                  alt="Student"
                  className="inline-block h-9 w-9 rounded-full ring-2 ring-surface-container-lowest object-cover"
                />
                <img
                  src={social3}
                  alt="Guardian"
                  className="inline-block h-9 w-9 rounded-full ring-2 ring-surface-container-lowest object-cover"
                />
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-headline-sm text-headline-sm text-on-surface font-bold text-[13px] leading-tight truncate">
                  15,000+ Happy Guardians
                </p>
                <p className="font-body-sm text-body-sm text-on-surface-variant text-[11px] truncate">
                  Dhaka, Chattogram, Sylhet &amp; Rajshahi
                </p>
              </div>
              <div className="flex flex-col items-end shrink-0">
                <span className="font-label-sm text-label-sm text-secondary font-bold whitespace-nowrap">
                  10k+ Matches
                </span>
                <span className="font-label-sm text-label-sm text-on-surface-variant text-[10px] whitespace-nowrap">
                  Verified Placements
                </span>
              </div>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
};

export default Banner;
