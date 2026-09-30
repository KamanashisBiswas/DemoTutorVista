import React, { useState, useEffect, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MapPinned } from "lucide-react";
import axios from "../lib/axios";
import locationData from "../assets/data/address.json";
import TuitionRequestHeader from "../components/TuitionRequest/TuitionRequestHeader";
import FilterControls from "../components/TuitionRequest/FilterControls";
import RequestGrid from "../components/TuitionRequest/RequestGrid";
import Pagination from "../components/TuitionRequest/Pagination";

const TuitionRequestPage = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showAdvancedFilters, setShowAdvancedFilters] = useState(false);

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
  const [curriculumFilter, setCurriculumFilter] = useState("");

  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalRequests, setTotalRequests] = useState(0);
  const requestsPerPage = 12;
  const [activeTab, setActiveTab] = useState("Dhaka");

  const divisions = useMemo(
    () => locationData.divisions.map((division) => division.division.name_en),
    []
  );
  const districts = useMemo(() => {
    if (!locationFilter.division) return [];

    const selectedDivision = locationData.divisions.find(
      (division) => division.division.name_en === locationFilter.division
    );

    return selectedDivision
      ? selectedDivision.districts.map((district) => district.name_en)
      : [];
  }, [locationFilter.division]);
  const thanas = useMemo(() => {
    if (!locationFilter.division || !locationFilter.district) return [];

    const selectedDivision = locationData.divisions.find(
      (division) => division.division.name_en === locationFilter.division
    );

    if (!selectedDivision) return [];

    const selectedDistrict = selectedDivision.districts.find(
      (district) => district.name_en === locationFilter.district
    );

    return selectedDistrict
      ? selectedDistrict.thanas.map((thana) => thana.name_en)
      : [];
  }, [locationFilter.division, locationFilter.district]);
  const areas = useMemo(() => {
    if (
      !locationFilter.division ||
      !locationFilter.district ||
      !locationFilter.thana
    )
      return [];

    const selectedDivision = locationData.divisions.find(
      (division) => division.division.name_en === locationFilter.division
    );

    if (!selectedDivision) return [];

    const selectedDistrict = selectedDivision.districts.find(
      (district) => district.name_en === locationFilter.district
    );

    if (!selectedDistrict) return [];

    const selectedThana = selectedDistrict.thanas.find(
      (thana) => thana.name_en === locationFilter.thana
    );

    return selectedThana ? selectedThana.areas.map((area) => area.name_en) : [];
  }, [locationFilter.division, locationFilter.district, locationFilter.thana]);

  const availableMediums = useMemo(
    () => [
      "Bangla Medium",
      "English Medium",
      "English Version (National Curriculum)",
      "Arabic Medium",
      "University Level",
      "Admission Preparation",
      "Skill Development",
      "Job Purpose",
    ],
    []
  );

  const getValidLevelsForMedium = (medium) => {
    const levelMap = {
      "Bangla Medium": [
        "Pre School",
        "Play",
        "Nursery",
        "KG1",
        "KG2",
        "Class 1",
        "Class 2",
        "Class 3",
        "Class 4",
        "Class 5",
        "Class 6",
        "Class 7",
        "Class 8",
        "Class 9",
        "Class 10",
        "HSC 1st Year",
        "HSC 2nd Year",
      ],
      "English Version (National Curriculum)": [
        "Pre School",
        "Play",
        "Nursery",
        "KG1",
        "KG2",
        "Class 1",
        "Class 2",
        "Class 3",
        "Class 4",
        "Class 5",
        "Class 6",
        "Class 7",
        "Class 8",
        "Class 9",
        "Class 10",
        "HSC 1st Year",
        "HSC 2nd Year",
      ],
      "Arabic Medium": [
        "Pre School",
        "Play",
        "Nursery",
        "KG1",
        "KG2",
        "Class 1",
        "Class 2",
        "Class 3",
        "Class 4",
        "Class 5",
        "Class 6",
        "Class 7",
        "Class 8",
        "Class 9",
        "Class 10",
        "HSC 1st Year",
        "HSC 2nd Year",
      ],
      "English Medium": [
        "Pre School",
        "Play",
        "Nursery",
        "Grade 1",
        "Grade 2",
        "Grade 3",
        "Grade 4",
        "Grade 5",
        "Grade 6",
        "Grade 7",
        "Grade 8",
        "Grade 9",
        "O Levels",
        "AS",
        "A2",
      ],
      "University Level": [
        "1st Year",
        "2nd Year",
        "3rd Year",
        "4th Year",
        "Masters",
        "PhD",
      ],
      "Admission Preparation": [
        "University Admission",
        "Medical Admission",
        "Engineering Admission",
        "BCS Preparation",
        "Job Preparation",
      ],
    };
    return levelMap[medium] || [];
  };

  const availableSubjects = useMemo(() => {
    const subjects = new Set();
    requests.forEach((req) =>
      req.subjects?.forEach((subject) => subjects.add(subject))
    );
    return Array.from(subjects).sort();
  }, [requests]);

  const availableGenders = useMemo(() => {
    const genders = new Set();
    requests.forEach((req) => {
      if (req.gender) genders.add(req.gender);
    });
    return Array.from(genders);
  }, [requests]);

  const curriculumOptions = useMemo(
    () => [
      { value: "Cambridge Curriculum", label: "Cambridge Curriculum" },
      { value: "Edexcel Curriculum", label: "Edexcel Curriculum" },
      { value: "Oxford Curriculum", label: "Oxford Curriculum" },
      { value: "IB Curriculum", label: "IB Curriculum" },
    ],
    []
  );

  const handleLocationFilterChange = (field, value) => {
    const newFilter = { ...locationFilter, [field]: value };
    if (field === "division")
      Object.assign(newFilter, { district: "", thana: "", area: "" });
    else if (field === "district")
      Object.assign(newFilter, { thana: "", area: "" });
    else if (field === "thana") Object.assign(newFilter, { area: "" });
    setLocationFilter(newFilter);
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
    setCurriculumFilter("");
    setCurrentPage(1);
  };

  const filtersActive = useMemo(
    () =>
      Object.values(locationFilter).some((v) => v) ||
      Object.values(mediumFilter).some((v) => v) ||
      subjectFilter ||
      genderFilter ||
      curriculumFilter,
    [
      locationFilter,
      mediumFilter,
      subjectFilter,
      genderFilter,
      curriculumFilter,
    ]
  );

  const fetchRequests = async () => {
    try {
      setLoading(true);
      const params = {
        page: currentPage,
        limit: requestsPerPage,
        isActive: true,
        // Set division based on active tab if no location filter is set
        division: locationFilter.division || activeTab,
        ...(locationFilter.district && { district: locationFilter.district }),
        ...(locationFilter.thana && { thana: locationFilter.thana }),
        ...(locationFilter.area && { area: locationFilter.area }),
        ...(mediumFilter.medium && { medium: mediumFilter.medium }),
        ...(mediumFilter.level && { level: mediumFilter.level }),
        ...(subjectFilter && { subjects: subjectFilter }),
        ...(genderFilter && { gender: genderFilter }),
        ...(curriculumFilter && { curriculum: curriculumFilter }),
      };

      const response = await axios.get("/api/request-tutor", { params });
      if (response.data.success) {
        const { data } = response.data;
        setRequests(data.requests || []);
        setTotalPages(data.pagination?.pages ?? data.totalPages ?? 1);
        setTotalRequests(data.pagination?.total ?? data.totalRequests ?? 0);
      }
    } catch (err) {
      console.error("Error fetching tuition requests:", err);
      setError("Failed to load tuition requests");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRequests();
  }, [currentPage, activeTab]);

  useEffect(() => {
    if (currentPage !== 1) {
      setCurrentPage(1);
    } else {
      fetchRequests();
    }
  }, [
    locationFilter,
    mediumFilter,
    subjectFilter,
    genderFilter,
    curriculumFilter,
  ]);

  const handlePageChange = (page) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="min-h-screen bg-[#F7F8FB] text-[#1A1D29]">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-10 font-sans">
        <TuitionRequestHeader />

        {/* Tabs for Dhaka, Chattogram, Khulna, and Sylhet */}
        <div className="flex justify-center mb-8 mt-8">
          <div className="inline-flex items-center gap-1 bg-white rounded-full p-1.5 shadow-sm border border-[#E4E6EE] relative">
            {["Dhaka", "Chattogram", "Khulna", "Sylhet"].map((city) => {
              const isActive = activeTab === city;
              const label = `${city} Tuitions`;

              return (
                <button
                  key={city}
                  type="button"
                  onClick={() => {
                    setActiveTab(city);
                    setCurrentPage(1);
                    clearAllFilters();
                  }}
                  className={`relative px-4 sm:px-6 py-2 rounded-full text-xs sm:text-sm font-semibold transition-all duration-200 cursor-pointer ${
                    isActive
                      ? "bg-[#3730E0] text-white shadow-xs"
                      : "text-[#5B5F73] hover:text-[#1A1D29] hover:bg-[#F7F8FB]"
                  }`}
                >
                  {/* Map Pin Icon Animation - Above Button */}
                  <AnimatePresence>
                    {isActive && (
                      <motion.div
                        className="absolute left-1/2 -translate-x-1/2 -top-7 z-20 pointer-events-none"
                        initial={{ y: 8, opacity: 0, scale: 0.6 }}
                        animate={{ y: 0, opacity: 1, scale: 1 }}
                        exit={{ y: 4, opacity: 0, scale: 0.6 }}
                        transition={{
                          type: "spring",
                          stiffness: 400,
                          damping: 25,
                        }}
                      >
                        <MapPinned
                          className="w-5 h-5 text-[#3730E0]"
                          fill="currentColor"
                          strokeWidth={0}
                        />
                      </motion.div>
                    )}
                  </AnimatePresence>

                  <span className="relative z-10">{label}</span>
                </button>
              );
            })}
          </div>
        </div>

        <FilterControls
          showAdvancedFilters={showAdvancedFilters}
          setShowAdvancedFilters={setShowAdvancedFilters}
          requestsCount={requests.length}
          totalRequests={totalRequests}
          filtersActive={filtersActive}
          clearAllFilters={clearAllFilters}
          locationFilter={locationFilter}
          handleLocationFilterChange={handleLocationFilterChange}
          divisions={divisions}
          districts={districts}
          thanas={thanas}
          areas={areas}
          mediumFilter={mediumFilter}
          handleMediumFilterChange={handleMediumFilterChange}
          availableMediums={availableMediums}
          getValidLevelsForMedium={getValidLevelsForMedium}
          subjectFilter={subjectFilter}
          setSubjectFilter={setSubjectFilter}
          availableSubjects={availableSubjects}
          genderFilter={genderFilter}
          setGenderFilter={setGenderFilter}
          availableGenders={availableGenders}
          curriculumFilter={curriculumFilter}
          setCurriculumFilter={setCurriculumFilter}
          curriculumOptions={curriculumOptions}
        />

        <RequestGrid
          loading={loading}
          error={error}
          requests={requests}
          fetchRequests={fetchRequests}
        />

        {!loading && !error && (
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
          />
        )}
      </div>
    </div>
  );
};

export default TuitionRequestPage;
