import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  MapPin,
  ChevronDown,
  RotateCcw,
  SlidersHorizontal,
  GraduationCap,
  BookOpen,
  User,
} from "lucide-react";

// Filter dropdown component
const FilterDropdown = ({
  value,
  onChange,
  options,
  placeholder = "Select",
  disabled = false,
  icon: Icon,
}) => (
  <div className="relative w-full">
    <select
      value={value}
      onChange={(e) => onChange(e.target.value)}
      disabled={disabled}
      className={`w-full px-3.5 py-2.5 pl-10 text-xs sm:text-sm border border-[#E4E6EE] rounded-sm appearance-none bg-white text-[#1A1D29] transition-all duration-150 focus:border-[#3730E0] focus:ring-2 focus:ring-[#3730E0]/15 focus:outline-none ${
        disabled
          ? "bg-[#F7F8FB] cursor-not-allowed text-[#5B5F73]/60"
          : "hover:border-[#CBD5E1] hover:shadow-xs cursor-pointer"
      }`}
    >
      <option value="">{disabled ? "Select above first" : placeholder}</option>
      {options.map((option) => {
        const val = typeof option === "object" ? option.value : option;
        const lbl = typeof option === "object" ? option.label : option;
        return (
          <option key={val} value={val}>
            {lbl}
          </option>
        );
      })}
    </select>
    {Icon && (
      <Icon className="absolute left-3.5 top-1/2 transform -translate-y-1/2 w-4 h-4 text-[#5B5F73] pointer-events-none" />
    )}
    <ChevronDown className="absolute right-3.5 top-1/2 transform -translate-y-1/2 w-4 h-4 text-[#5B5F73] pointer-events-none" />
  </div>
);

const FilterControls = ({
  showAdvancedFilters,
  setShowAdvancedFilters,
  requestsCount,
  totalRequests,
  filtersActive,
  clearAllFilters,
  locationFilter,
  handleLocationFilterChange,
  divisions,
  districts,
  thanas,
  areas,
  mediumFilter,
  handleMediumFilterChange,
  availableMediums,
  getValidLevelsForMedium,
  subjectFilter,
  setSubjectFilter,
  availableSubjects,
  genderFilter,
  setGenderFilter,
  availableGenders,
  curriculumFilter,
  setCurriculumFilter,
  curriculumOptions,
}) => {
  return (
    <motion.div
      className="bg-white rounded-md shadow-card border border-[#E4E6EE] p-5 mb-8"
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.1 }}
    >
      {/* Header row */}
      <div className="flex flex-col sm:flex-row gap-3 items-start sm:items-center justify-between">
        <button
          type="button"
          onClick={() => setShowAdvancedFilters(!showAdvancedFilters)}
          className={`inline-flex items-center gap-2 px-4 py-2 rounded-sm text-xs sm:text-sm font-semibold transition-all duration-150 ${
            showAdvancedFilters
              ? "bg-[#3730E0] text-white shadow-xs"
              : "bg-[#F7F8FB] text-[#1A1D29] border border-[#E4E6EE] hover:bg-[#EEEDFD] hover:text-[#3730E0]"
          }`}
        >
          <SlidersHorizontal className="w-4 h-4" />
          <span>Advanced Filters</span>
          <ChevronDown
            className={`w-3.5 h-3.5 transition-transform duration-200 ${
              showAdvancedFilters ? "rotate-180" : ""
            }`}
          />
        </button>

        <div className="flex items-center gap-3 w-full sm:w-auto justify-between sm:justify-end">
          {filtersActive && (
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-[#EEEDFD] text-[#3730E0]">
              <span className="w-1.5 h-1.5 rounded-full bg-[#3730E0] animate-pulse"></span>
              Filters Active
            </span>
          )}

          <button
            type="button"
            onClick={clearAllFilters}
            disabled={!filtersActive}
            className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-sm text-xs font-semibold transition-all duration-150 ${
              filtersActive
                ? "text-[#DC2626] bg-[#FEF2F2] hover:bg-[#FEE2E2] cursor-pointer"
                : "text-[#5B5F73]/50 bg-gray-100 cursor-not-allowed"
            }`}
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reset All</span>
          </button>
        </div>
      </div>

      {/* Panel with all filters visible together */}
      <AnimatePresence>
        {showAdvancedFilters && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25 }}
            className="mt-5 pt-5 border-t border-[#E4E6EE]"
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {/* Location Filters */}
              <div>
                <label className="block text-xs font-semibold text-[#1A1D29] mb-1.5">
                  Division
                </label>
                <FilterDropdown
                  value={locationFilter.division}
                  onChange={(value) =>
                    handleLocationFilterChange("division", value)
                  }
                  options={divisions}
                  placeholder="Select Division"
                  icon={MapPin}
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-[#1A1D29] mb-1.5">
                  District
                </label>
                <FilterDropdown
                  value={locationFilter.district}
                  onChange={(value) =>
                    handleLocationFilterChange("district", value)
                  }
                  options={districts}
                  placeholder="Select District"
                  disabled={!locationFilter.division}
                  icon={MapPin}
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-[#1A1D29] mb-1.5">
                  Thana
                </label>
                <FilterDropdown
                  value={locationFilter.thana}
                  onChange={(value) =>
                    handleLocationFilterChange("thana", value)
                  }
                  options={thanas}
                  placeholder="Select Thana"
                  disabled={!locationFilter.district}
                  icon={MapPin}
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-[#1A1D29] mb-1.5">
                  Area
                </label>
                <FilterDropdown
                  value={locationFilter.area}
                  onChange={(value) =>
                    handleLocationFilterChange("area", value)
                  }
                  options={areas}
                  placeholder="Select Area"
                  disabled={!locationFilter.thana}
                  icon={MapPin}
                />
              </div>

              {/* Medium & Level Filters */}
              <div>
                <label className="block text-xs font-semibold text-[#1A1D29] mb-1.5">
                  Medium
                </label>
                <FilterDropdown
                  value={mediumFilter.medium}
                  onChange={(value) =>
                    handleMediumFilterChange("medium", value)
                  }
                  options={availableMediums}
                  placeholder="Select Medium"
                  icon={GraduationCap}
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-[#1A1D29] mb-1.5">
                  Level
                </label>
                <FilterDropdown
                  value={mediumFilter.level}
                  onChange={(value) => handleMediumFilterChange("level", value)}
                  options={getValidLevelsForMedium(mediumFilter.medium)}
                  placeholder="Select Level"
                  disabled={!mediumFilter.medium}
                  icon={GraduationCap}
                />
              </div>

              {/* Subject Filter */}
              <div>
                <label className="block text-xs font-semibold text-[#1A1D29] mb-1.5">
                  Subject
                </label>
                <FilterDropdown
                  value={subjectFilter}
                  onChange={setSubjectFilter}
                  options={availableSubjects}
                  placeholder="Select Subject"
                  icon={BookOpen}
                />
              </div>

              {/* Gender Filter */}
              <div>
                <label className="block text-xs font-semibold text-[#1A1D29] mb-1.5">
                  Tutor Gender
                </label>
                <FilterDropdown
                  value={genderFilter}
                  onChange={setGenderFilter}
                  options={availableGenders}
                  placeholder="Select Gender"
                  icon={User}
                />
              </div>

              {/* Curriculum Filter */}
              {mediumFilter.medium === "English Medium" && (
                <div>
                  <label className="block text-xs font-semibold text-[#1A1D29] mb-1.5">
                    Curriculum
                  </label>
                  <FilterDropdown
                    value={curriculumFilter}
                    onChange={setCurriculumFilter}
                    options={curriculumOptions}
                    placeholder="Select Curriculum"
                    icon={GraduationCap}
                  />
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default FilterControls;
