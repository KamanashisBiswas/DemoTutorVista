import React from "react";

const TutorFilterControls = ({
  searchQuery = "",
  setSearchQuery,
  showAdvancedFilters = true,
  setShowAdvancedFilters,
  tutorsCount = 0,
  totalTutors = 15480,
  filtersActive = false,
  clearAllFilters,
  locationFilter = {},
  handleLocationFilterChange,
  divisions = [],
  districts = [],
  thanas = [],
  areas = [],
  mediumFilter = {},
  handleMediumFilterChange,
  availableMediums = [],
  getValidLevelsForMedium,
  subjectFilter = "",
  setSubjectFilter,
  availableSubjects = [],
  genderFilter = "",
  setGenderFilter,
  sortBy = "latest",
  setSortBy,
  viewMode = "grid",
  setViewMode,
}) => {
  const currentDivision = locationFilter?.division || "";
  const currentDistrict = locationFilter?.district || "";
  const currentThana = locationFilter?.thana || "";
  const currentArea = locationFilter?.area || "";
  const currentMedium = mediumFilter?.medium || "";
  const currentLevel = mediumFilter?.level || "";
  const currentSubject = subjectFilter || "";
  const currentGender = genderFilter || "";

  // Dynamic Active Tags List: only contains what the user has actually selected
  const activeTags = [];

  if (currentMedium) {
    activeTags.push({
      id: "medium",
      label: currentMedium,
      onRemove: () => handleMediumFilterChange && handleMediumFilterChange("medium", ""),
    });
  }

  if (currentLevel) {
    activeTags.push({
      id: "level",
      label: currentLevel,
      onRemove: () => handleMediumFilterChange && handleMediumFilterChange("level", ""),
    });
  }

  if (currentThana) {
    activeTags.push({
      id: "thana",
      label: currentThana,
      onRemove: () => handleLocationFilterChange && handleLocationFilterChange("thana", ""),
    });
  } else if (currentDistrict) {
    activeTags.push({
      id: "district",
      label: `${currentDistrict} District`,
      onRemove: () => handleLocationFilterChange && handleLocationFilterChange("district", ""),
    });
  } else if (currentDivision) {
    activeTags.push({
      id: "division",
      label: `${currentDivision} Division`,
      onRemove: () => handleLocationFilterChange && handleLocationFilterChange("division", ""),
    });
  }

  if (currentArea) {
    activeTags.push({
      id: "area",
      label: currentArea,
      onRemove: () => handleLocationFilterChange && handleLocationFilterChange("area", ""),
    });
  }

  if (searchQuery && searchQuery.trim()) {
    activeTags.push({
      id: "search",
      label: `"${searchQuery.trim()}"`,
      onRemove: () => setSearchQuery && setSearchQuery(""),
    });
  }

  if (currentSubject) {
    activeTags.push({
      id: "subject",
      label: currentSubject,
      onRemove: () => setSubjectFilter && setSubjectFilter(""),
    });
  }

  if (currentGender && currentGender !== "Tutor: Any Gender" && currentGender !== "Any") {
    activeTags.push({
      id: "gender",
      label: currentGender,
      onRemove: () => setGenderFilter && setGenderFilter(""),
    });
  }

  return (
    <section
      className="w-full container mx-auto px-4 sm:px-6 lg:px-12 pt-6 pb-6"
      data-purpose="advanced-filters"
    >
      <div className="bg-white rounded-2xl border border-slate-200/90 shadow-xs p-5 sm:p-6 flex flex-col gap-5">
        {/* Top Controls Row */}
        <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4 pb-2 border-b border-slate-100">
          {/* Search Input */}
          <div className="flex-1 relative flex items-center">
            <svg
              className="w-4 h-4 text-slate-400 absolute left-3.5 pointer-events-none"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
              ></path>
            </svg>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery && setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-9 py-2.5 rounded-xl bg-white border border-slate-200 text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:border-brand-700 focus:ring-2 focus:ring-brand-700/20 shadow-2xs transition-all"
              placeholder="Search by tutor name, subject, or university..."
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery && setSearchQuery("")}
                className="absolute right-3 text-slate-400 hover:text-slate-600 flex items-center cursor-pointer"
                title="Clear search"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    d="M6 18L18 6M6 6l12 12"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                  ></path>
                </svg>
              </button>
            )}
          </div>

          {/* Action Buttons: Hide Filters, Reset All, Showing Counter */}
          <div className="flex items-center gap-3 shrink-0 justify-between md:justify-end">
            <button
              type="button"
              onClick={() => setShowAdvancedFilters && setShowAdvancedFilters(!showAdvancedFilters)}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-brand-700 text-white text-xs sm:text-sm font-semibold hover:bg-brand-800 transition-all shadow-sm shadow-brand-700/20 cursor-pointer"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                ></path>
              </svg>
              <span>{showAdvancedFilters ? "Hide Filters" : "Show Filters"}</span>
              <svg
                className={`w-3.5 h-3.5 ml-0.5 transition-transform duration-200 ${
                  showAdvancedFilters ? "" : "rotate-180"
                }`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M5 15l7-7 7 7" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"></path>
              </svg>
            </button>

            <button
              type="button"
              onClick={clearAllFilters}
              className="text-rose-700 font-semibold text-xs sm:text-sm hover:underline px-2 py-1 cursor-pointer"
            >
              Reset All
            </button>

            <span className="text-slate-500 text-xs sm:text-sm hidden sm:inline ml-2">
              Showing <strong className="text-slate-900 font-bold">{tutorsCount || 0}</strong> of{" "}
              <strong className="text-slate-900 font-bold">
                {totalTutors ? totalTutors.toLocaleString() : "15,480"}
              </strong>{" "}
              verified tutors
            </span>
          </div>
        </div>

        {/* Cascading Filter Tiers */}
        {showAdvancedFilters && (
          <div className="space-y-4">
            {/* Tier 1: LOCATION HIERARCHY */}
            <div className="space-y-2">
              <div className="flex items-center gap-1.5 text-brand-700 text-xs font-bold uppercase tracking-wider">
                <svg className="w-4 h-4 text-brand-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                  ></path>
                  <path
                    d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                  ></path>
                </svg>
                <span>Location Hierarchy</span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                {/* Division Select */}
                <div className="relative">
                  <select
                    value={currentDivision}
                    onChange={(e) => handleLocationFilterChange("division", e.target.value)}
                    className="w-full appearance-none pl-3.5 pr-8 py-2.5 rounded-xl bg-white border border-slate-200 text-xs sm:text-sm font-semibold text-slate-700 focus:outline-none focus:border-brand-700 focus:ring-2 focus:ring-brand-700/20 shadow-2xs cursor-pointer"
                  >
                    <option value="">Select Division</option>
                    <option value="Dhaka">Dhaka Division</option>
                    <option value="Chattogram">Chattogram Division</option>
                    <option value="Sylhet">Sylhet Division</option>
                    <option value="Rajshahi">Rajshahi Division</option>
                    <option value="Khulna">Khulna Division</option>
                    <option value="Barishal">Barishal Division</option>
                    <option value="Rangpur">Rangpur Division</option>
                    <option value="Mymensingh">Mymensingh Division</option>
                  </select>
                  <svg
                    className="w-4 h-4 absolute right-2.5 top-3 text-slate-400 pointer-events-none"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M19 9l-7 7-7-7" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"></path>
                  </svg>
                </div>

                {/* District Select */}
                <div className="relative">
                  <select
                    value={
                      currentDistrict
                        ? currentDistrict.replace(/\s+Sadar$/i, "").trim()
                        : ""
                    }
                    onChange={(e) => handleLocationFilterChange("district", e.target.value)}
                    className="w-full appearance-none pl-3.5 pr-8 py-2.5 rounded-xl bg-white border border-slate-200 text-xs sm:text-sm font-semibold text-slate-700 focus:outline-none focus:border-brand-700 focus:ring-2 focus:ring-brand-700/20 shadow-2xs cursor-pointer"
                  >
                    <option value="">Select District</option>
                    {districts && districts.length > 0 ? (
                      districts.map((d) => {
                        const cleanVal = d.replace(/\s+Sadar$/i, "").trim();
                        return (
                          <option key={d} value={cleanVal}>
                            {d}
                          </option>
                        );
                      })
                    ) : (
                      <>
                        <option value="Dhaka">Dhaka District</option>
                        <option value="Gazipur">Gazipur</option>
                        <option value="Narayanganj">Narayanganj</option>
                        <option value="Chattogram">Chattogram</option>
                        <option value="Sylhet">Sylhet</option>
                        <option value="Khulna">Khulna</option>
                      </>
                    )}
                  </select>
                  <svg
                    className="w-4 h-4 absolute right-2.5 top-3 text-slate-400 pointer-events-none"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M19 9l-7 7-7-7" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"></path>
                  </svg>
                </div>

                {/* Thana Select */}
                <div className="relative">
                  <select
                    value={currentThana}
                    onChange={(e) => handleLocationFilterChange("thana", e.target.value)}
                    className="w-full appearance-none pl-3.5 pr-8 py-2.5 rounded-xl bg-white border border-slate-200 text-xs sm:text-sm font-semibold text-slate-700 focus:outline-none focus:border-brand-700 focus:ring-2 focus:ring-brand-700/20 shadow-2xs cursor-pointer"
                  >
                    <option value="">Select Thana</option>
                    <option value="Dhanmondi">Dhanmondi Thana</option>
                    <option value="Gulshan">Gulshan</option>
                    <option value="Uttara">Uttara</option>
                    <option value="Mirpur">Mirpur</option>
                    <option value="Mohammadpur">Mohammadpur</option>
                  </select>
                  <svg
                    className="w-4 h-4 absolute right-2.5 top-3 text-slate-400 pointer-events-none"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M19 9l-7 7-7-7" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"></path>
                  </svg>
                </div>

                {/* Area Select */}
                <div className="relative">
                  <select
                    value={currentArea}
                    onChange={(e) => handleLocationFilterChange("area", e.target.value)}
                    className="w-full appearance-none pl-3.5 pr-8 py-2.5 rounded-xl bg-white border border-slate-200 text-xs sm:text-sm font-semibold text-slate-700 focus:outline-none focus:border-brand-700 focus:ring-2 focus:ring-brand-700/20 shadow-2xs cursor-pointer"
                  >
                    <option value="">Select Area</option>
                    <option value="Dhanmondi 15 / 27">Dhanmondi 15 / 27</option>
                    <option value="All Areas in Thana">All Areas in Thana</option>
                    <option value="Satmasjid Road">Satmasjid Road</option>
                    <option value="Sobhanbag">Sobhanbag</option>
                  </select>
                  <svg
                    className="w-4 h-4 absolute right-2.5 top-3 text-slate-400 pointer-events-none"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M19 9l-7 7-7-7" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"></path>
                  </svg>
                </div>
              </div>
            </div>

            {/* Tier 2: TEACHING PREFERENCES */}
            <div className="space-y-2">
              <div className="flex items-center gap-1.5 text-brand-700 text-xs font-bold uppercase tracking-wider">
                <svg className="w-4 h-4 text-brand-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path d="M12 14l9-5-9-5-9 5 9 5z" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"></path>
                  <path
                    d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                  ></path>
                </svg>
                <span>Teaching Preferences</span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                {/* Medium Select (with left book icon) */}
                <div className="relative">
                  <svg
                    className="w-4 h-4 absolute left-3 top-3 text-slate-400 pointer-events-none"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                    ></path>
                  </svg>
                  <select
                    value={currentMedium}
                    onChange={(e) => handleMediumFilterChange("medium", e.target.value)}
                    className="w-full appearance-none pl-9 pr-8 py-2.5 rounded-xl bg-white border border-slate-200 text-xs sm:text-sm font-semibold text-slate-700 focus:outline-none focus:border-brand-700 focus:ring-2 focus:ring-brand-700/20 shadow-2xs cursor-pointer"
                  >
                    <option value="">Select Medium</option>
                    <option value="English Medium">English Medium</option>
                    <option value="Bangla Medium">Bangla Medium</option>
                    <option value="English Version (NCTB)">English Version (NCTB)</option>
                    <option value="IB Curriculum">IB Curriculum</option>
                    <option value="University Admission">University Admission</option>
                  </select>
                  <svg
                    className="w-4 h-4 absolute right-2.5 top-3 text-slate-400 pointer-events-none"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M19 9l-7 7-7-7" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"></path>
                  </svg>
                </div>

                {/* Class / Level Select */}
                <div className="relative">
                  <select
                    value={currentLevel}
                    onChange={(e) => handleMediumFilterChange("level", e.target.value)}
                    className="w-full appearance-none pl-3.5 pr-8 py-2.5 rounded-xl bg-white border border-slate-200 text-xs sm:text-sm font-semibold text-slate-700 focus:outline-none focus:border-brand-700 focus:ring-2 focus:ring-brand-700/20 shadow-2xs cursor-pointer"
                  >
                    <option value="">Class: All Classes</option>
                    <option value="Class 9 - 10 (SSC / O-Level)">Class 9 - 10 (SSC / O-Level)</option>
                    <option value="Class 11 - 12 (HSC / A-Level)">Class 11 - 12 (HSC / A-Level)</option>
                    <option value="Junior (Class 6 - 8)">Junior (Class 6 - 8)</option>
                    <option value="Primary (Class 1 - 5)">Primary (Class 1 - 5)</option>
                  </select>
                  <svg
                    className="w-4 h-4 absolute right-2.5 top-3 text-slate-400 pointer-events-none"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M19 9l-7 7-7-7" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"></path>
                  </svg>
                </div>

                {/* Subject Select */}
                <div className="relative">
                  <select
                    value={currentSubject}
                    onChange={(e) => setSubjectFilter && setSubjectFilter(e.target.value)}
                    className="w-full appearance-none pl-3.5 pr-8 py-2.5 rounded-xl bg-white border border-slate-200 text-xs sm:text-sm font-semibold text-slate-700 focus:outline-none focus:border-brand-700 focus:ring-2 focus:ring-brand-700/20 shadow-2xs cursor-pointer"
                  >
                    <option value="">All Subjects</option>
                    <option value="Science / Math Subjects">Science / Math Subjects</option>
                    <option value="Physics & Math">Physics & Math</option>
                    <option value="Chemistry & Biology">Chemistry & Biology</option>
                    <option value="Commerce / Accounting">Commerce / Accounting</option>
                  </select>
                  <svg
                    className="w-4 h-4 absolute right-2.5 top-3 text-slate-400 pointer-events-none"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M19 9l-7 7-7-7" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"></path>
                  </svg>
                </div>

                {/* Gender Select (with left user icon) */}
                <div className="relative">
                  <svg
                    className="w-4 h-4 absolute left-3 top-3 text-slate-400 pointer-events-none"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                    ></path>
                  </svg>
                  <select
                    value={currentGender}
                    onChange={(e) => setGenderFilter && setGenderFilter(e.target.value)}
                    className="w-full appearance-none pl-9 pr-8 py-2.5 rounded-xl bg-white border border-slate-200 text-xs sm:text-sm font-semibold text-slate-700 focus:outline-none focus:border-brand-700 focus:ring-2 focus:ring-brand-700/20 shadow-2xs cursor-pointer"
                  >
                    <option value="">Tutor: Any Gender</option>
                    <option value="Female Tutor Preferred">Female Tutor Preferred</option>
                    <option value="Male Tutor Preferred">Male Tutor Preferred</option>
                  </select>
                  <svg
                    className="w-4 h-4 absolute right-2.5 top-3 text-slate-400 pointer-events-none"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M19 9l-7 7-7-7" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"></path>
                  </svg>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Bottom Active Badges Strip & Sort/View Mode */}
        <div className="flex flex-wrap items-center justify-between gap-3 pt-3 border-t border-slate-100">
          {/* Dynamic Active Tags */}
          <div className="flex flex-wrap items-center gap-2">
            {activeTags.length > 0 ? (
              <>
                <span className="text-[11px] text-slate-400 font-bold uppercase tracking-wider mr-1">
                  Active:
                </span>
                {activeTags.map((tag) => (
                  <span
                    key={tag.id}
                    className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-brand-50 border border-brand-200 text-brand-700 text-xs font-semibold"
                  >
                    <span>{tag.label}</span>
                    <button
                      type="button"
                      onClick={tag.onRemove}
                      className="hover:text-rose-700 flex items-center ml-0.5 cursor-pointer text-xs font-bold leading-none"
                      title="Remove"
                    >
                      ✕
                    </button>
                  </span>
                ))}
                <button
                  type="button"
                  onClick={clearAllFilters}
                  className="text-slate-500 hover:text-brand-700 underline font-medium ml-1 text-xs cursor-pointer"
                >
                  Clear tags
                </button>
              </>
            ) : (
              <span className="text-xs text-slate-400 font-medium">
                No active filters applied. Use options above to filter tutors.
              </span>
            )}
          </div>

          {/* Right Sort By & View Mode Switcher */}
          <div className="flex items-center gap-4 ml-auto">
            <div className="flex items-center gap-2">
              <span className="text-xs text-slate-500">Sort by:</span>
              <div className="relative">
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy && setSortBy(e.target.value)}
                  className="appearance-none pl-3 pr-7 py-1.5 rounded-lg bg-white border border-slate-200 text-xs font-semibold text-slate-800 focus:outline-none focus:border-brand-700 focus:ring-2 focus:ring-brand-700/20 shadow-2xs cursor-pointer"
                >
                  <option value="latest">Latest Active (Default)</option>
                  <option value="rating">Highest Rated (5.0)</option>
                  <option value="experience">Experience (High to Low)</option>
                  <option value="distance">Nearest Distance</option>
                </select>
                <svg
                  className="w-3.5 h-3.5 absolute right-1.5 top-2 text-slate-400 pointer-events-none"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M19 9l-7 7-7-7" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"></path>
                </svg>
              </div>
            </div>

            <div className="flex items-center bg-slate-100 rounded-lg p-0.5">
              <button
                type="button"
                onClick={() => setViewMode && setViewMode("grid")}
                className={`p-1.5 rounded-md cursor-pointer transition-colors ${
                  viewMode === "grid" ? "bg-white text-brand-700 shadow-xs" : "text-slate-400 hover:text-slate-600"
                }`}
                title="Grid View"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                  ></path>
                </svg>
              </button>
              <button
                type="button"
                onClick={() => setViewMode && setViewMode("list")}
                className={`p-1.5 rounded-md cursor-pointer transition-colors ${
                  viewMode === "list" ? "bg-white text-brand-700 shadow-xs" : "text-slate-400 hover:text-slate-600"
                }`}
                title="List View"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path d="M4 6h16M4 12h16M4 18h16" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"></path>
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TutorFilterControls;
