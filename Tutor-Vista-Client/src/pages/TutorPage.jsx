import React, { useState, useEffect, useMemo } from "react";
import axios from "../lib/axios";
import locationData from "../assets/data/address.json";

import TutorPageHeader from "../components/Tutor/TutorPageHeader";
import TutorFilterControls from "../components/Tutor/TutorFilterControls";
import TutorGrid from "../components/Tutor/TutorGrid";
import TutorPagination from "../components/Tutor/TutorPagination";
import TutorDetailsModal from "../components/TutorDetailsModal";
import { MapPin } from "lucide-react";

const TutorPage = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const [tutors, setTutors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedTutor, setSelectedTutor] = useState(null);
  const [showTutorDetailsModal, setShowTutorDetailsModal] = useState(false);

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

  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalTutors, setTotalTutors] = useState(0);
  const tutorsPerPage = 12;
  const [activeTab, setActiveTab] = useState("Dhaka");

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

  const availableMediums = useMemo(() => {
    const mediums = new Set(["Bangla Medium", "English Medium", "English Version", "Religious / Arabic"]);
    tutors.forEach((tutor) =>
      tutor.educationSections?.forEach(
        (edu) => edu.medium && mediums.add(edu.medium)
      )
    );
    return Array.from(mediums);
  }, [tutors]);

  const getValidLevelsForMedium = (medium) => {
    const validLevels = {
      "National Curriculum": ["Primary", "Secondary (SSC)", "Higher Secondary (HSC)"],
      "Bangla Medium": ["Class 1-5", "Class 6-8", "Class 9-10 (SSC)", "Class 11-12 (HSC)"],
      "English Medium": ["Primary Checkpoint", "IGCSE / O Level", "IAL / A Level", "IB"],
      "English Version": ["Class 1-5", "Class 6-8", "Class 9-10", "Class 11-12"],
    };
    return validLevels[medium] || ["Primary", "Secondary", "Higher Secondary"];
  };

  const availableSubjects = useMemo(() => {
    const subjects = new Set([
      "Mathematics",
      "Physics",
      "Chemistry",
      "Biology",
      "English",
      "Bangla",
      "ICT",
      "Accounting",
      "Economics",
      "Higher Mathematics",
    ]);
    tutors.forEach((tutor) =>
      tutor.preferredSubjects?.forEach((subject) => subjects.add(subject))
    );
    return Array.from(subjects).sort();
  }, [tutors]);

  const availableGenders = ["Male", "Female"];

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
  };

  const filtersActive = useMemo(
    () =>
      Boolean(
        locationFilter.division ||
        locationFilter.district ||
        locationFilter.thana ||
        locationFilter.area ||
        mediumFilter.medium ||
        mediumFilter.level ||
        subjectFilter ||
        genderFilter
      ),
    [locationFilter, mediumFilter, subjectFilter, genderFilter]
  );

  const fetchTutors = async () => {
    setLoading(true);
    setError(null);
    try {
      const params = { page: currentPage, limit: tutorsPerPage };

      if (!locationFilter.division) {
        params.division = activeTab;
      } else {
        params.division = locationFilter.division;
      }

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
        setTutors(applications || []);
        setTotalTutors(pagination?.total || applications?.length || 0);
        setTotalPages(pagination?.pages || 1);
      } else {
        throw new Error("Failed to fetch tutors.");
      }
    } catch (err) {
      console.error("Error fetching tutors:", err);
      setError("Unable to load tutors at the moment. Please verify your connection or try again.");
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
    return text.length <= maxLength ? text : text.substring(0, maxLength) + "...";
  };

  const handleDetailsClick = (tutor) => {
    setSelectedTutor(tutor);
    setShowTutorDetailsModal(true);
  };

  const cities = ["Dhaka", "Chattogram", "Khulna", "Sylhet"];

  return (
    <div className="min-h-screen bg-[#F7F8FB] py-10 sm:py-14">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <TutorPageHeader totalTutors={totalTutors} />

        {/* Division Selector Tabs */}
        <div className="flex items-center justify-center mb-8">
          <div className="inline-flex items-center gap-1.5 p-1 bg-white border border-[#E4E6EE] rounded-full shadow-xs">
            {cities.map((city) => {
              const isActive = activeTab === city;
              return (
                <button
                  key={city}
                  type="button"
                  onClick={() => {
                    setActiveTab(city);
                    setCurrentPage(1);
                    clearAllFilters();
                  }}
                  className={`flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-semibold transition-all duration-150 ${
                    isActive
                      ? "bg-[#3730E0] text-white shadow-sm"
                      : "text-[#5B5F73] hover:text-[#1A1D29] hover:bg-[#F7F8FB]"
                  }`}
                >
                  <MapPin className="w-3.5 h-3.5" />
                  <span>{city} Tutors</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Filter Controls Component */}
        <TutorFilterControls
          showAdvancedFilters={showAdvancedFilters}
          setShowAdvancedFilters={setShowAdvancedFilters}
          tutorsCount={tutors.length}
          totalTutors={totalTutors}
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
        />

        {/* Tutor Grid */}
        <TutorGrid
          loading={loading}
          error={error}
          tutors={tutors}
          fetchTutors={fetchTutors}
          onDetailsClick={handleDetailsClick}
          truncateText={truncateText}
          onClearFilters={clearAllFilters}
        />

        {/* Pagination */}
        {!loading && !error && (
          <TutorPagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
          />
        )}
      </div>

      <TutorDetailsModal
        showModal={showTutorDetailsModal}
        setShowModal={setShowTutorDetailsModal}
        selectedTutor={selectedTutor}
      />
    </div>
  );
};

export default TutorPage;
