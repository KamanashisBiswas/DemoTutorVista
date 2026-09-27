import React, { useState, useEffect, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import axios from "../lib/axios";
import locationData from "../assets/data/address.json";

import TutorPageHeader from "../components/Tutor/TutorPageHeader";
import TutorFilterControls from "../components/Tutor/TutorFilterControls";
import TutorGrid from "../components/Tutor/TutorGrid";
import TutorPagination from "../components/Tutor/TutorPagination";
import TutorDetailsModal from "../components/TutorDetailsModal";

import {
  X,
  MapPin,
  MapPinned,
  BookOpen,
  GraduationCap,
  User,
} from "lucide-react";

const TutorPage = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const [tutors, setTutors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [hoveredCard, setHoveredCard] = useState(null);
  const [selectedTutor, setSelectedTutor] = useState(null);
  const [showExperienceModal, setShowExperienceModal] = useState(false);
  const [showTutorDetailsModal, setShowTutorDetailsModal] = useState(false);

  const [showAdvancedFilters, setShowAdvancedFilters] = useState(false);
  const [filterType, setFilterType] = useState("");
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

  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalTutors, setTotalTutors] = useState(0);
  const tutorsPerPage = 12;
  const [activeTab, setActiveTab] = useState("Dhaka");

  const divisions = useMemo(
    () => locationData.divisions.map((d) => d.division.name_en),
    [],
  );
  const districts = useMemo(() => {
    if (!locationFilter.division) return [];
    const selected = locationData.divisions.find(
      (d) => d.division.name_en === locationFilter.division,
    );
    return selected ? selected.districts.map((dist) => dist.name_en) : [];
  }, [locationFilter.division]);
  const thanas = useMemo(() => {
    if (!locationFilter.division || !locationFilter.district) return [];
    const selectedDiv = locationData.divisions.find(
      (d) => d.division.name_en === locationFilter.division,
    );
    const selectedDist = selectedDiv?.districts.find(
      (d) => d.name_en === locationFilter.district,
    );
    return selectedDist ? selectedDist.thanas.map((t) => t.name_en) : [];
  }, [locationFilter.division, locationFilter.district]);
  const areas = useMemo(() => {
    if (
      !locationFilter.division ||
      !locationFilter.district ||
      !locationFilter.thana
    )
      return [];
    const selectedDiv = locationData.divisions.find(
      (d) => d.division.name_en === locationFilter.division,
    );
    const selectedDist = selectedDiv?.districts.find(
      (d) => d.name_en === locationFilter.district,
    );
    const selectedThana = selectedDist?.thanas.find(
      (t) => t.name_en === locationFilter.thana,
    );
    return selectedThana ? selectedThana.areas.map((a) => a.name_en) : [];
  }, [locationFilter.division, locationFilter.district, locationFilter.thana]);

  const availableMediums = useMemo(() => {
    const mediums = new Set();
    tutors.forEach((tutor) =>
      tutor.educationSections?.forEach(
        (edu) => edu.medium && mediums.add(edu.medium),
      ),
    );
    return Array.from(mediums);
  }, [tutors]);

  const getValidLevelsForMedium = (medium) => {
    const validLevels = {
      "National Curriculum": ["National Level"],
      "Bangla Medium": ["Bangla Level"],
      "English Medium": ["Cambridge", "Edexcel", "IB Curriculum"],
      "Arabic Medium": ["Arabic Level"],
    };
    return validLevels[medium] || [];
  };

  const availableSubjects = useMemo(() => {
    const subjects = new Set();
    tutors.forEach((tutor) =>
      tutor.preferredSubjects?.forEach((subject) => subjects.add(subject)),
    );
    return Array.from(subjects).sort();
  }, [tutors]);

  const availableGenders = useMemo(() => {
    const genders = new Set();
    tutors.forEach((tutor) => tutor.gender && genders.add(tutor.gender));
    return Array.from(genders);
  }, [tutors]);

  const handleFilterTypeChange = (type) => {
    setFilterType(type);
    setLocationFilter({ division: "", district: "", thana: "", area: "" });
    setMediumFilter({ medium: "", level: "" });
    setSubjectFilter("");
    setGenderFilter("");
  };

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
    setFilterType("");
    setLocationFilter({ division: "", district: "", thana: "", area: "" });
    setMediumFilter({ medium: "", level: "" });
    setSubjectFilter("");
    setGenderFilter("");
  };

  const filtersActive = useMemo(
    () =>
      Object.values(locationFilter).some((v) => v) ||
      Object.values(mediumFilter).some((v) => v) ||
      subjectFilter ||
      genderFilter,
    [locationFilter, mediumFilter, subjectFilter, genderFilter],
  );

  const fetchTutors = async () => {
    setLoading(true);
    setError(null);
    try {
      const params = { page: currentPage, limit: tutorsPerPage };

      // Set division filter based on active tab (only if no manual location filter is applied)
      if (!locationFilter.division) {
        params.division = activeTab;
      }

      if (locationFilter.division) params.division = locationFilter.division;
      if (locationFilter.district) params.district = locationFilter.district;
      if (locationFilter.thana) params.thana = locationFilter.thana;
      if (locationFilter.area) params.area = locationFilter.area;
      if (mediumFilter.medium) params.medium = mediumFilter.medium;
      if (mediumFilter.level) params.level = mediumFilter.level;
      if (subjectFilter) params.preferredSubjects = subjectFilter;
      if (genderFilter) params.gender = genderFilter;

      const response = await axios.get("/api/tutor/applications", { params });
      if (response.data.success) {
        const { applications, pagination } = response.data.data;
        setTutors(applications);
        setTotalTutors(pagination.total);
        setTotalPages(pagination.pages);
      } else {
        throw new Error("Failed to fetch tutors from API.");
      }
    } catch (err) {
      console.error("Error fetching tutors:", err);
      setError("Failed to load tutors. Please try again later.");
      setTutors([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTutors();
  }, [currentPage, activeTab]);

  useEffect(() => {
    if (currentPage !== 1) {
      setCurrentPage(1);
    } else {
      fetchTutors();
    }
  }, [locationFilter, mediumFilter, subjectFilter, genderFilter]);

  const handlePageChange = (page) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const truncateText = (text, maxLength) => {
    if (!text) return "";
    return text.length <= maxLength
      ? text
      : text.substring(0, maxLength) + "...";
  };

  const handleExperienceClick = (tutor) => {
    setSelectedTutor(tutor);
    setShowExperienceModal(true);
  };

  const handleDetailsClick = (tutor) => {
    setSelectedTutor(tutor);
    setShowTutorDetailsModal(true);
  };

  const filterOptions = [
    { value: "location", label: "Location", icon: MapPin },
    { value: "medium", label: "Medium", icon: GraduationCap },
    { value: "subject", label: "Subject", icon: BookOpen },
    { value: "gender", label: "Gender", icon: User },
  ];

  const modalVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { type: "spring", damping: 25, stiffness: 300 },
    },
    exit: { opacity: 0, scale: 0.8, transition: { duration: 0.2 } },
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <div className="w-full mx-auto px-4 sm:px-6 lg:px-8 xl:px-12 2xl:px-16 font-dmsans py-12">
        <TutorPageHeader />

        {/* Tabs for Dhaka and Chattogram */}
        <div className="flex justify-center mb-8 mt-12">
          <div className="inline-flex items-center gap-1 bg-white rounded-full p-1.5 sm:p-2 shadow-lg border-2 border-gray-200 relative">
            {["Dhaka", "Chattogram", "Khulna", "Sylhet"].map((city) => {
              const isActive = activeTab === city;
              const label = `${city} Tutors`;

              return (
                <motion.button
                  key={city}
                  onClick={() => {
                    setActiveTab(city);
                    setCurrentPage(1);
                    clearAllFilters();
                  }}
                  className={`relative px-3 py-2 sm:px-6 sm:py-3 rounded-full text-xs sm:text-sm font-semibold transition-all duration-300 min-w-[70px] sm:min-w-[120px] ${
                    isActive
                      ? "bg-blue-600 text-white shadow-lg"
                      : "text-gray-600 hover:text-gray-900 hover:bg-gray-50"
                  }`}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  {/* Map Pin Icon Animation - Above Button */}
                  <AnimatePresence>
                    {isActive && (
                      <motion.div
                        className="absolute left-[40%] -translate-x-1/2 -translate-y-1/2 -top-9"
                        initial={{ y: 30, opacity: 0, scale: 0.3 }}
                        animate={{ y: 0, opacity: 1, scale: 1 }}
                        exit={{ y: 20, opacity: 0, scale: 0.3 }}
                        transition={{
                          type: "spring",
                          stiffness: 500,
                          damping: 25,
                        }}
                      >
                        <MapPinned
                          className="w-6 h-6 sm:w-8 sm:h-8 text-blue-600"
                          fill="currentColor"
                          strokeWidth={0}
                        />
                      </motion.div>
                    )}
                  </AnimatePresence>

                  <span className="relative z-10">{label}</span>
                </motion.button>
              );
            })}
          </div>
        </div>

        {/* <TutorFilterControls
          showAdvancedFilters={showAdvancedFilters}
          setShowAdvancedFilters={setShowAdvancedFilters}
          tutorsCount={tutors.length}
          totalTutors={totalTutors}
          filtersActive={filtersActive}
          clearAllFilters={clearAllFilters}
          filterType={filterType}
          handleFilterTypeChange={handleFilterTypeChange}
          filterOptions={filterOptions}
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
        /> */}

        <TutorGrid
          loading={loading}
          error={error}
          tutors={tutors}
          fetchTutors={fetchTutors}
          hoveredCard={hoveredCard}
          setHoveredCard={setHoveredCard}
          onExperienceClick={handleExperienceClick}
          onDetailsClick={handleDetailsClick}
          truncateText={truncateText}
        />

        {!loading && !error && (
          <TutorPagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
          />
        )}
      </div>

      <AnimatePresence>
        {showExperienceModal && selectedTutor && (
          <div
            className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
            onClick={() => setShowExperienceModal(false)}
          >
            <motion.div
              className="bg-white rounded-xl max-w-md w-full mx-4 overflow-hidden shadow-2xl"
              variants={modalVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="bg-gradient-to-r from-blue-500 to-indigo-600 py-4 px-6 flex justify-between items-center">
                <h3 className="text-white text-xl font-bold">
                  Teaching Experience
                </h3>
                <button
                  onClick={() => setShowExperienceModal(false)}
                  className="text-white hover:bg-white/20 rounded-full p-1 transition-colors"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>
              <div className="p-6">
                <h4 className="text-2xl font-bold text-black mb-3">
                  {selectedTutor.name}'s Experience
                </h4>
                <p className="text-lg text-gray-700 leading-relaxed">
                  {selectedTutor.experience ||
                    "3+ years teaching students from various backgrounds and helping them excel in competitive exams and achieve academic excellence."}
                </p>
                <div className="mt-6 text-center">
                  <button
                    onClick={() => setShowExperienceModal(false)}
                    className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg text-base font-semibold transition-colors"
                  >
                    Close
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      <TutorDetailsModal
        showModal={showTutorDetailsModal}
        setShowModal={setShowTutorDetailsModal}
        selectedTutor={selectedTutor}
      />
    </div>
  );
};

export default TutorPage;
