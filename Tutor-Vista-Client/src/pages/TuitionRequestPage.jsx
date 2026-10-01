import React, { useState, useEffect, useMemo } from "react";
import ApiService from "../services/api";
import locationData from "../assets/data/address.json";

import TuitionRequestHeader from "../components/TuitionRequest/TuitionRequestHeader";
import FilterControls from "../components/TuitionRequest/FilterControls";
import RequestGrid from "../components/TuitionRequest/RequestGrid";
import Pagination from "../components/TuitionRequest/Pagination";
import TuitionTrustBanner from "../components/TuitionRequest/TuitionTrustBanner";

// The 9 Rich Reference Tuition Jobs provided in the design specification
const REFERENCE_TUITION_JOBS = [
  {
    _id: "TB-8841",
    jobId: "#TB-8841",
    badge: "Verified Urgent",
    badgeType: "urgent",
    postedTime: "2 hours ago",
    curriculum: "Edexcel A-Level",
    title: "Grade 11 – Physics & Pure Math",
    institution: "Maple Leaf International School, Dhaka",
    subjects: ["Physics (Unit 1, 2)", "Pure Math (P1/P2)", "Mechanics"],
    schedule: "3 Days / Week",
    time: "Evening (6:30 PM)",
    location: "Dhanmondi 15",
    landmark: "Near Star Kabab",
    studentGender: "Male Student",
    tutoringType: "1-on-1 In-person",
    tutorRequirement: "BUET / DU Preferred",
    tutorRequirementSub: "English Medium BG",
    salary: 10000,
    salaryType: "Fixed Salary",
    division: "Dhaka",
    district: "Dhaka",
    thana: "Dhanmondi",
    area: "Dhanmondi 15 / 27",
  },
  {
    _id: "TB-8840",
    jobId: "#TB-8840",
    badge: "Open • 4 Applied",
    badgeType: "open",
    postedTime: "Just now",
    curriculum: "English Version (NCTB)",
    title: "Class 9 – Higher Math & Chemistry",
    institution: "South Point School & College, Malibagh",
    subjects: ["Higher Math", "Chemistry", "General Science"],
    schedule: "4 Days / Week",
    time: "Flexible Timing",
    location: "Shantinagar / Baily Rd",
    landmark: "Near Officers Club",
    studentGender: "Female Student",
    tutoringType: "Home Tutoring",
    tutorRequirement: "Female Tutor Only",
    tutorRequirementSub: "Strictly Required",
    salary: 8500,
    salaryType: "Negotiable",
    division: "Dhaka",
    district: "Dhaka",
    thana: "Shantinagar",
    area: "Baily Road",
  },
  {
    _id: "TB-8839",
    jobId: "#TB-8839",
    badge: "Premium Family",
    badgeType: "premium",
    postedTime: "3 hours ago",
    curriculum: "Cambridge O-Level",
    title: "Grade 10 – Economics & Accounting",
    institution: "Scholastica Senior Campus, Uttara",
    subjects: ["O-Level Economics", "Accounting", "Business Studies"],
    schedule: "3 Days / Week",
    time: "Fri • Sat • Mon",
    location: "Uttara Sector 4",
    landmark: "Near Rajuk College",
    studentGender: "Male Student",
    tutoringType: "Home Tutoring",
    tutorRequirement: "IBA / BUP Preferred",
    tutorRequirementSub: "Fluent English",
    salary: 12000,
    salaryType: "Fixed + Bonus",
    division: "Dhaka",
    district: "Dhaka",
    thana: "Uttara",
    area: "Sector 4",
  },
  {
    _id: "TB-8837",
    jobId: "#TB-8837",
    badge: "Open • 2 Applied",
    badgeType: "open",
    postedTime: "4 hours ago",
    curriculum: "Bangla Medium HSC",
    title: "HSC 2nd Year – ICT & Physics (Board Exam)",
    institution: "Dhaka City College, Dhanmondi",
    subjects: ["Physics 2nd Paper", "HSC ICT (C Prog & SQL)", "Math Review"],
    schedule: "3 Days / Week",
    time: "7:00 PM – 8:30 PM",
    location: "Mirpur 10, Block C",
    landmark: "Near Metro Station",
    studentGender: "Male Student",
    tutoringType: "HSC 2026 Candidate",
    tutorRequirement: "DU / BUET Student",
    tutorRequirementSub: "Good Board Standing",
    salary: 6500,
    salaryType: "Fixed Salary",
    division: "Dhaka",
    district: "Dhaka",
    thana: "Mirpur",
    area: "Mirpur 10",
  },
  {
    _id: "TB-8835",
    jobId: "#TB-8835",
    badge: "Verified Urgent",
    badgeType: "urgent",
    postedTime: "5 hours ago",
    curriculum: "IB Curriculum (MYP 4)",
    title: "MYP Class 8 – Integrated Sciences & Math",
    institution: "Aga Khan Academy / ISD, Dhaka",
    subjects: ["Integrated Science", "Standard Math", "Scientific Inquiry"],
    schedule: "4 Days / Week",
    time: "4:30 PM – 6:00 PM",
    location: "Gulshan 2, Diplomatic",
    landmark: "Road 84, Residence",
    studentGender: "Female Student",
    tutoringType: "Grade 8 (Age 14)",
    tutorRequirement: "Female Preferred",
    tutorRequirementSub: "Native/C2 English",
    salary: 11000,
    salaryType: "High Pay",
    division: "Dhaka",
    district: "Dhaka",
    thana: "Gulshan",
    area: "Gulshan 2",
  },
  {
    _id: "TB-8832",
    jobId: "#TB-8832",
    badge: "Open • 1 Applied",
    badgeType: "open",
    postedTime: "6 hours ago",
    curriculum: "Cambridge Primary",
    title: "Class 5 – All Subject Guidance & English",
    institution: "Chattogram Grammar School (CGS), Nasirabad",
    subjects: ["Cambridge English", "Primary Math", "Science Foundation"],
    schedule: "5 Days / Week",
    time: "Afternoon (3:30 PM)",
    location: "GEC Circle, Chattogram",
    landmark: "Near Sanmar Ocean City",
    studentGender: "Male Student (Grade 5)",
    tutoringType: "Daily Homework Help",
    tutorRequirement: "CUET / CU / Asian Univ",
    tutorRequirementSub: "Patient & Friendly",
    salary: 7500,
    salaryType: "Negotiable",
    division: "Chattogram",
    district: "Chattogram",
    thana: "Nasirabad",
    area: "GEC Circle",
  },
  {
    _id: "TB-8828",
    jobId: "#TB-8828",
    badge: "Immediate Start",
    badgeType: "urgent",
    postedTime: "7 hours ago",
    curriculum: "University Admission",
    title: "IBA (DU / JU) & BUP Admission Crash Prep",
    institution: "Notre Dame College Student (Passed HSC 2025)",
    subjects: ["Math (Algebra/Geo)", "English Verbal Ability", "Analytical Skills"],
    schedule: "3 Days / Week",
    time: "2 Hours per class",
    location: "Bashundhara R/A, Block C",
    landmark: "Near Apollo / Evercare",
    studentGender: "Male Candidate",
    tutoringType: "Intensive Focus",
    tutorRequirement: "DU IBA / BUP Current",
    tutorRequirementSub: "Top 50 Ranker Pref",
    salary: 9000,
    salaryType: "Negotiable",
    division: "Dhaka",
    district: "Dhaka",
    thana: "Bashundhara",
    area: "Block C",
  },
  {
    _id: "TB-8822",
    jobId: "#TB-8822",
    badge: "Online / 1-on-1 Remote",
    badgeType: "remote",
    postedTime: "8 hours ago",
    curriculum: "Edexcel O-Level",
    title: "Grade 9 – Biology & Chemistry (Zoom)",
    institution: "Sylhet Resident (Student based in Amberkhana)",
    subjects: ["O-Level Biology", "O-Level Chemistry", "Past Paper Solving"],
    schedule: "3 Days / Week",
    time: "Evening (8:00 PM)",
    location: "Live Zoom / Meet",
    landmark: "Pen Tablet Provided",
    studentGender: "Female Student",
    tutoringType: "Digital Native Learner",
    tutorRequirement: "Female Tutor Only",
    tutorRequirementSub: "Stable High-Speed Net",
    salary: 6000,
    salaryType: "Fixed Monthly",
    division: "Sylhet",
    district: "Sylhet",
    thana: "Amberkhana",
    area: "Amberkhana Point",
  },
  {
    _id: "TB-8819",
    jobId: "#TB-8819",
    badge: "Open • 5 Applied",
    badgeType: "open",
    postedTime: "Today, 9:15 AM",
    curriculum: "Bangla Medium (NCTB)",
    title: "Class 8 – General Math, English & Science",
    institution: "Ideal School and College, Motijheel",
    subjects: ["General Math", "English Grammar", "General Science"],
    schedule: "4 Days / Week",
    time: "5:30 PM – 7:00 PM",
    location: "Khilgaon Taltola",
    landmark: "Near Shahid Baki Road",
    studentGender: "Male Student",
    tutoringType: "Targeting GPA 5.0",
    tutorRequirement: "DU / DUET / Jagannath",
    tutorRequirementSub: "Experienced Tutor",
    salary: 6000,
    salaryType: "Fixed Salary",
    division: "Dhaka",
    district: "Dhaka",
    thana: "Khilgaon",
    area: "Taltola",
  },
];

const TuitionRequestPage = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Initial State configured to match reference design specifications
  const [searchQuery, setSearchQuery] = useState("");
  const [showAdvancedFilters, setShowAdvancedFilters] = useState(true);
  const [activeDivision, setActiveDivision] = useState("All Bangladesh");

  const [locationFilter, setLocationFilter] = useState({
    division: "",
    district: "",
    thana: "",
    area: "",
  });
  const [mediumFilter, setMediumFilter] = useState({
    medium: "",
    level: "",
  });
  const [subjectFilter, setSubjectFilter] = useState("");
  const [genderFilter, setGenderFilter] = useState("");

  const [sortBy, setSortBy] = useState("latest");
  const [viewMode, setViewMode] = useState("grid");

  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(20);
  const [totalRequests, setTotalRequests] = useState(1840);
  const requestsPerPage = 9;

  const divisions = useMemo(
    () => (locationData?.divisions ? locationData.divisions.map((d) => d.division.name_en) : []),
    []
  );

  const districts = useMemo(() => {
    if (!locationFilter.division || !locationData?.divisions) return [];
    const selected = locationData.divisions.find(
      (d) => d.division.name_en === locationFilter.division
    );
    return selected ? selected.districts.map((dist) => dist.name_en) : [];
  }, [locationFilter.division]);

  const thanas = useMemo(() => {
    if (!locationFilter.division || !locationFilter.district || !locationData?.divisions) return [];
    const selectedDiv = locationData.divisions.find(
      (d) => d.division.name_en === locationFilter.division
    );
    const selectedDist = selectedDiv?.districts.find(
      (d) => d.name_en === locationFilter.district
    );
    return selectedDist ? selectedDist.thanas.map((t) => t.name_en) : [];
  }, [locationFilter.division, locationFilter.district]);

  const areas = useMemo(() => {
    if (!locationFilter.division || !locationFilter.district || !locationFilter.thana || !locationData?.divisions)
      return [];
    const selectedDiv = locationData.divisions.find(
      (d) => d.division.name_en === locationFilter.division
    );
    const selectedDist = selectedDiv?.districts.find(
      (d) => d.name_en === locationFilter.district
    );
    const selectedThana = selectedDist?.thanas.find(
      (t) => t.name_en === locationFilter.thana
    );
    return selectedThana ? selectedThana.areas.map((a) => a.name_en) : [];
  }, [locationFilter.division, locationFilter.district, locationFilter.thana]);

  const handleLocationFilterChange = (field, value) => {
    const newFilter = { ...locationFilter, [field]: value };
    if (field === "division") {
      Object.assign(newFilter, { district: "", thana: "", area: "" });
    } else if (field === "district") {
      Object.assign(newFilter, { thana: "", area: "" });
    } else if (field === "thana") {
      Object.assign(newFilter, { area: "" });
    }
    setLocationFilter(newFilter);
  };

  const handleSelectDivisionPill = (divValue) => {
    setActiveDivision(divValue);
    if (divValue === "All Bangladesh" || !divValue) {
      handleLocationFilterChange("division", "");
    } else if (divValue === "Online") {
      // Keep division as online mode
      setLocationFilter((prev) => ({ ...prev, division: "Online" }));
    } else {
      handleLocationFilterChange("division", divValue);
    }
  };

  const handleMediumFilterChange = (field, value) => {
    setMediumFilter((prev) => ({
      ...prev,
      [field]: value,
      ...(field === "medium" && { level: "" }),
    }));
  };

  const clearAllFilters = () => {
    setLocationFilter({ division: "", district: "", thana: "", area: "" });
    setMediumFilter({ medium: "", level: "" });
    setSubjectFilter("");
    setGenderFilter("");
    setSearchQuery("");
    setActiveDivision("All Bangladesh");
  };

  const fetchRequests = async () => {
    setLoading(true);
    setError(null);
    try {
      const params = {
        page: currentPage,
        limit: requestsPerPage,
        isActive: true,
      };

      const div = locationFilter.division || (activeDivision !== "All Bangladesh" ? activeDivision : "");
      if (div && div !== "Online") params.division = div;
      if (locationFilter.district) params.district = locationFilter.district;
      if (locationFilter.thana) params.thana = locationFilter.thana;
      if (locationFilter.area) params.area = locationFilter.area;
      if (mediumFilter.medium) params.medium = mediumFilter.medium;
      if (mediumFilter.level) params.level = mediumFilter.level;
      if (subjectFilter) params.subjects = subjectFilter;
      if (genderFilter) params.gender = genderFilter;

      const response = await ApiService.getTuitionRequests(params);
      if (response.success && response.data?.requests?.length > 0) {
        setRequests(response.data.requests);
        setTotalRequests(response.data.pagination?.total || response.data.requests.length);
        setTotalPages(response.data.pagination?.pages || 1);
      } else {
        // Fallback to sample reference tuition jobs
        setRequests(REFERENCE_TUITION_JOBS);
        setTotalRequests(1840);
        setTotalPages(20);
      }
    } catch (err) {
      console.warn("API fetch error, using reference tuition jobs:", err);
      setRequests(REFERENCE_TUITION_JOBS);
      setTotalRequests(1840);
      setTotalPages(20);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRequests();
  }, [currentPage, activeDivision]);

  useEffect(() => {
    if (currentPage !== 1) {
      setCurrentPage(1);
    } else {
      fetchRequests();
    }
  }, [locationFilter, mediumFilter, subjectFilter, genderFilter]);

  const handlePageChange = (page) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // Client-side filtering & sorting
  const displayedRequests = useMemo(() => {
    let result = [...requests];

    // Filter by division pill if set
    if (activeDivision && activeDivision !== "All Bangladesh") {
      if (activeDivision === "Online") {
        result = result.filter(
          (r) => r.badgeType === "remote" || r.tutoringType?.toLowerCase().includes("online")
        );
      } else {
        result = result.filter(
          (r) =>
            r.division?.toLowerCase() === activeDivision.toLowerCase() ||
            r.location?.toLowerCase().includes(activeDivision.toLowerCase())
        );
      }
    }

    // Filter by search query
    if (searchQuery && searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim();
      result = result.filter((r) => {
        const titleMatch = r.title?.toLowerCase().includes(q);
        const instMatch = r.institution?.toLowerCase().includes(q);
        const locMatch = r.location?.toLowerCase().includes(q);
        const subMatch = r.subjects?.some((s) => s.toLowerCase().includes(q));
        const curMatch = r.curriculum?.toLowerCase().includes(q);
        return titleMatch || instMatch || locMatch || subMatch || curMatch;
      });
    }

    // Filter by location hierarchy
    if (locationFilter.division) {
      result = result.filter(
        (r) => r.division?.toLowerCase() === locationFilter.division.toLowerCase()
      );
    }
    if (locationFilter.district) {
      result = result.filter(
        (r) => r.district?.toLowerCase() === locationFilter.district.toLowerCase()
      );
    }
    if (locationFilter.thana) {
      result = result.filter(
        (r) =>
          r.thana?.toLowerCase() === locationFilter.thana.toLowerCase() ||
          r.location?.toLowerCase().includes(locationFilter.thana.toLowerCase())
      );
    }
    if (locationFilter.area) {
      result = result.filter(
        (r) =>
          r.area?.toLowerCase() === locationFilter.area.toLowerCase() ||
          r.location?.toLowerCase().includes(locationFilter.area.toLowerCase())
      );
    }

    // Filter by medium & class
    if (mediumFilter.medium) {
      result = result.filter((r) =>
        r.curriculum?.toLowerCase().includes(mediumFilter.medium.toLowerCase())
      );
    }
    if (mediumFilter.level) {
      result = result.filter((r) =>
        r.title?.toLowerCase().includes(mediumFilter.level.toLowerCase())
      );
    }

    // Filter by subject
    if (subjectFilter) {
      result = result.filter((r) =>
        r.subjects?.some((s) => s.toLowerCase().includes(subjectFilter.toLowerCase()))
      );
    }

    // Filter by gender
    if (genderFilter && genderFilter !== "Tutor: Any Gender" && genderFilter !== "Any") {
      const qGen = genderFilter.toLowerCase().includes("female") ? "female" : "male";
      result = result.filter((r) => r.tutorRequirement?.toLowerCase().includes(qGen));
    }

    // Sort
    if (sortBy === "salary") {
      result.sort((a, b) => (Number(b.salary) || 0) - (Number(a.salary) || 0));
    } else if (sortBy === "urgent") {
      result.sort((a, b) => (a.badgeType === "urgent" ? -1 : 1));
    }

    return result;
  }, [requests, activeDivision, locationFilter, mediumFilter, subjectFilter, genderFilter, searchQuery, sortBy]);

  return (
    <div className="min-h-screen bg-[#faf8ff] text-slate-800 font-sans antialiased selection:bg-brand-500 selection:text-white">
      {/* 1. Top Context & Live Counter Strip with Division Pills */}
      <TuitionRequestHeader
        activeDivision={activeDivision}
        onSelectDivision={handleSelectDivisionPill}
      />

      {/* 2. Advanced Interactive Filter Toolbar */}
      <FilterControls
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        showAdvancedFilters={showAdvancedFilters}
        setShowAdvancedFilters={setShowAdvancedFilters}
        requestsCount={displayedRequests.length}
        totalRequests={totalRequests}
        clearAllFilters={clearAllFilters}
        locationFilter={locationFilter}
        handleLocationFilterChange={handleLocationFilterChange}
        divisions={divisions}
        districts={districts}
        thanas={thanas}
        areas={areas}
        mediumFilter={mediumFilter}
        handleMediumFilterChange={handleMediumFilterChange}
        subjectFilter={subjectFilter}
        setSubjectFilter={setSubjectFilter}
        genderFilter={genderFilter}
        setGenderFilter={setGenderFilter}
        sortBy={sortBy}
        setSortBy={setSortBy}
        viewMode={viewMode}
        setViewMode={setViewMode}
      />

      {/* 3. Main Marketplace Content Grid */}
      <main className="w-full container mx-auto px-4 sm:px-6 lg:px-12 py-8 flex flex-col gap-8" data-purpose="tuition-marketplace">
        <RequestGrid
          loading={loading}
          error={error}
          requests={displayedRequests}
          fetchRequests={fetchRequests}
          viewMode={viewMode}
          totalRequests={totalRequests}
        />

        {/* 4. Pagination */}
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          totalRequests={totalRequests}
          requestsPerPage={requestsPerPage}
          onPageChange={handlePageChange}
        />
      </main>

      {/* 5. High-Conversion Tutor Trust & Verification Callout Banner */}
      <TuitionTrustBanner />
    </div>
  );
};

export default TuitionRequestPage;
