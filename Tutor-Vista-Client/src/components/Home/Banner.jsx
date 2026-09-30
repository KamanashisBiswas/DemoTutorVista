import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Search, ShieldCheck, CheckCircle2, Star, ArrowRight, Sparkles, MapPin, BookOpen, GraduationCap } from "lucide-react";
import { Typewriter } from "react-simple-typewriter";
import { Button } from "../ui/Button";

const Banner = () => {
  const navigate = useNavigate();
  const [selectedMedium, setSelectedMedium] = useState("");
  const [selectedClass, setSelectedClass] = useState("");
  const [searchLocation, setSearchLocation] = useState("");

  const handleHeroSearch = (e) => {
    e.preventDefault();
    const query = new URLSearchParams();
    if (selectedMedium) query.set("medium", selectedMedium);
    if (selectedClass) query.set("class", selectedClass);
    if (searchLocation) query.set("area", searchLocation);
    navigate(`/tutors?${query.toString()}`);
  };

  return (
    <section className="relative bg-gradient-to-b from-white via-[#EEEDFD]/30 to-[#F7F8FB] border-b border-[#E4E6EE] overflow-hidden">
      {/* Background Decorative Blobs */}
      <div className="absolute top-0 right-0 -mr-24 -mt-24 w-96 h-96 rounded-full bg-[#3730E0]/5 blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 -ml-24 -mb-24 w-96 h-96 rounded-full bg-[#0EA5A0]/5 blur-3xl pointer-events-none" />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 pt-12 pb-16 lg:pt-16 lg:pb-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Column: Headline, CTAs, Search Bar */}
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
            {/* Pill Trust Badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#EEEDFD] border border-[#DDD9FC] text-xs font-semibold text-[#3730E0]">
              <Sparkles className="w-3.5 h-3.5 text-[#F5A524]" />
              <span>Bangladesh’s Premier Tutoring Network</span>
            </div>

            {/* Main Headline */}
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#1A1D29] tracking-tight leading-[1.15]">
              Find Qualified & Verified Tutors for{" "}
              <span className="text-[#3730E0] inline-block min-w-[200px]">
                <Typewriter
                  words={[
                    "Bangla Medium",
                    "English Medium",
                    "Math & Science",
                    "Admission Prep",
                    "HSC & SSC Exams",
                  ]}
                  loop={true}
                  cursor
                  cursorStyle="|"
                  typeSpeed={70}
                  deleteSpeed={50}
                  delaySpeed={1500}
                />
              </span>
            </h1>

            {/* Subtitle */}
            <p className="text-base sm:text-lg text-[#5B5F73] max-w-2xl mx-auto lg:mx-0 leading-relaxed">
              Connect with vetted educators from top universities (DU, BUET, Medical colleges). Enjoy free demo sessions, customized schedules, and 100% background checks.
            </p>

            {/* Quick Hero Search Box */}
            <form
              onSubmit={handleHeroSearch}
              className="bg-white p-3 sm:p-4 rounded-lg border border-[#E4E6EE] shadow-md max-w-2xl mx-auto lg:mx-0 text-left"
            >
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-3">
                {/* Medium Select */}
                <div>
                  <label className="block text-xs font-semibold text-[#5B5F73] mb-1">
                    Medium / Version
                  </label>
                  <select
                    value={selectedMedium}
                    onChange={(e) => setSelectedMedium(e.target.value)}
                    className="w-full text-xs font-medium bg-[#F7F8FB] border border-[#E4E6EE] rounded-sm px-2.5 py-2 text-[#1A1D29] focus:outline-none focus:border-[#3730E0]"
                  >
                    <option value="">All Mediums</option>
                    <option value="Bangla Medium">Bangla Medium</option>
                    <option value="English Medium">English Medium</option>
                    <option value="English Version">English Version</option>
                    <option value="Religious / Quran">Religious / Quran</option>
                  </select>
                </div>

                {/* Class Select */}
                <div>
                  <label className="block text-xs font-semibold text-[#5B5F73] mb-1">
                    Class / Grade
                  </label>
                  <select
                    value={selectedClass}
                    onChange={(e) => setSelectedClass(e.target.value)}
                    className="w-full text-xs font-medium bg-[#F7F8FB] border border-[#E4E6EE] rounded-sm px-2.5 py-2 text-[#1A1D29] focus:outline-none focus:border-[#3730E0]"
                  >
                    <option value="">Any Class</option>
                    <option value="Class 1-5">Class 1 to 5</option>
                    <option value="Class 6-8">Class 6 to 8</option>
                    <option value="Class 9-10 (SSC)">Class 9–10 (SSC)</option>
                    <option value="HSC (Class 11-12)">HSC (Class 11–12)</option>
                    <option value="O/A Levels">O/A Levels</option>
                    <option value="University Admission">University Admission</option>
                  </select>
                </div>

                {/* Location Input */}
                <div>
                  <label className="block text-xs font-semibold text-[#5B5F73] mb-1">
                    Preferred Area
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      placeholder="e.g. Dhanmondi, GEC"
                      value={searchLocation}
                      onChange={(e) => setSearchLocation(e.target.value)}
                      className="w-full text-xs font-medium bg-[#F7F8FB] border border-[#E4E6EE] rounded-sm pl-7 pr-2.5 py-2 text-[#1A1D29] focus:outline-none focus:border-[#3730E0]"
                    />
                    <MapPin className="w-3.5 h-3.5 text-[#5B5F73] absolute left-2 top-2.5" />
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-1 border-t border-[#E4E6EE]">
                <div className="text-xs text-[#5B5F73] flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4 text-[#0EA5A0]" />
                  <span>Verified Tutors & Demo Class Included</span>
                </div>
                <Button
                  type="submit"
                  variant="primary"
                  size="md"
                  iconLeft={Search}
                  className="w-full sm:w-auto"
                >
                  Search Tutors
                </Button>
              </div>
            </form>

            {/* Quick Hero Features List */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 sm:gap-6 pt-2 text-xs font-medium text-[#5B5F73]">
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-[#16A34A]" />
                0% Commission for Guardians
              </span>
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-[#16A34A]" />
                Free Replacement Guarantee
              </span>
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-[#16A34A]" />
                Top University Instructors
              </span>
            </div>
          </div>

          {/* Right Column: Hero Visual Feature Showcase */}
          <div className="lg:col-span-5 relative flex justify-center">
            <div className="relative w-full max-w-md">
              {/* Main Card */}
              <div className="bg-white rounded-lg p-6 border border-[#E4E6EE] shadow-md relative z-10 space-y-5">
                <div className="flex items-center justify-between pb-4 border-b border-[#E4E6EE]">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-full bg-[#3730E0] text-white flex items-center justify-center font-bold text-lg">
                      TV
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-[#1A1D29]">Verified Tutor Profile</h4>
                      <p className="text-xs text-[#0EA5A0] font-medium flex items-center gap-1">
                        <GraduationCap className="w-3.5 h-3.5" />
                        BUET / DU Graduate
                      </p>
                    </div>
                  </div>
                  <span className="px-2.5 py-1 rounded-full text-xs font-semibold bg-[#DCFCE7] text-[#15803D]">
                    Available
                  </span>
                </div>

                {/* Specialties */}
                <div className="space-y-2">
                  <span className="text-xs font-semibold text-[#5B5F73] uppercase tracking-wider">
                    Subjects & Expertise
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {["Higher Mathematics", "Physics", "Chemistry", "ICT"].map((subj) => (
                      <span
                        key={subj}
                        className="px-2 py-0.5 rounded-sm bg-[#EEEDFD] text-[#3730E0] text-xs font-medium"
                      >
                        {subj}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Stats in card */}
                <div className="grid grid-cols-3 gap-2 p-3 bg-[#F7F8FB] rounded-md text-center">
                  <div>
                    <span className="block text-sm font-bold text-[#1A1D29]">4.9 / 5</span>
                    <span className="text-[11px] text-[#5B5F73]">Rating</span>
                  </div>
                  <div>
                    <span className="block text-sm font-bold text-[#1A1D29]">35+</span>
                    <span className="text-[11px] text-[#5B5F73]">Tuitions Done</span>
                  </div>
                  <div>
                    <span className="block text-sm font-bold text-[#1A1D29]">Verified</span>
                    <span className="text-[11px] text-[#16A34A] font-semibold">NID & ID</span>
                  </div>
                </div>

                {/* CTA inside card */}
                <div className="pt-2 flex items-center gap-2">
                  <Link to="/request-tutor" className="flex-1">
                    <Button variant="primary" size="sm" fullWidth>
                      Hire Similar Tutor
                    </Button>
                  </Link>
                  <Link to="/tutors" className="flex-1">
                    <Button variant="secondary" size="sm" fullWidth>
                      Browse All (5,000+)
                    </Button>
                  </Link>
                </div>
              </div>

              {/* Floating review badge */}
              <div className="absolute -bottom-6 -left-6 bg-white p-3.5 rounded-md border border-[#E4E6EE] shadow-lg z-20 flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-[#FEF3C7] text-[#D97706] flex items-center justify-center shrink-0">
                  <Star className="w-5 h-5 fill-current" />
                </div>
                <div>
                  <div className="flex items-center gap-1 text-[#F5A524] text-xs">
                    {"★".repeat(5)}
                  </div>
                  <p className="text-xs font-bold text-[#1A1D29] mt-0.5">
                    "Found our Math tutor in 2 hours!"
                  </p>
                  <span className="text-[10px] text-[#5B5F73]">Guardian, Dhanmondi</span>
                </div>
              </div>

              {/* Floating verified badge */}
              <div className="absolute -top-4 -right-4 bg-white px-3.5 py-2 rounded-full border border-[#E4E6EE] shadow-md z-20 flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-[#0EA5A0]" />
                <span className="text-xs font-bold text-[#1A1D29]">100% Safe & Verified</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Banner;
