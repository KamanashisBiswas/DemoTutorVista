import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  MapPin,
  ChevronDown,
  RotateCcw,
  Settings,
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
      className={`w-full px-4 py-3 pl-12 text-sm border border-gray-300 rounded-xl appearance-none bg-white transition-all duration-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 focus:outline-none ${
        disabled
          ? "bg-gray-100 cursor-not-allowed text-gray-500"
          : "hover:border-gray-400 hover:shadow-sm"
      }`}
    >
      <option value="">{disabled ? "Select above first" : placeholder}</option>
      {options.map((option) => {
        const value = typeof option === "object" ? option.value : option;
        const label = typeof option === "object" ? option.label : option;
        return (
          <option key={value} value={value}>
            {label}
          </option>
        );
      })}
    </select>
    {Icon && (
      <Icon className="absolute left-4 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-500 pointer-events-none" />
    )}
    <ChevronDown className="absolute right-4 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
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
      className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6 mb-8"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
    >
      {/* Header row */}
      <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
        <button
          onClick={() => setShowAdvancedFilters(!showAdvancedFilters)}
          className={`flex items-center space-x-2 px-6 py-3 rounded-xl font-medium transition-all duration-200 ${
            showAdvancedFilters
              ? "bg-blue-500 text-white shadow-lg"
              : "bg-gray-100 text-gray-700 hover:bg-gray-200"
          }`}
        >
          <Settings className="w-4 h-4" />
          <span>Advanced Filters</span>
          <ChevronDown
            className={`w-4 h-4 transition-transform duration-200 ${
              showAdvancedFilters ? "rotate-180" : ""
            }`}
          />
        </button>

        <div className="flex items-center gap-4">
          <div className="text-sm text-gray-600">
            {filtersActive && (
              <span className="text-blue-600 font-medium">Filters Active</span>
            )}
          </div>
          <button
            onClick={clearAllFilters}
            disabled={!filtersActive}
            className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-all duration-200 ${
              filtersActive
                ? "text-red-600 hover:text-red-700 hover:bg-red-50"
                : "text-gray-400 bg-gray-100 cursor-not-allowed"
            }`}
          >
            <RotateCcw className="w-4 h-4" />
            <span className="text-sm font-medium">Reset All</span>
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
            transition={{ duration: 0.3 }}
            className="mt-6 pt-6 border-t border-gray-200"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {/* Location Filters */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
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
                <label className="block text-sm font-medium text-gray-700 mb-2">
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
                <label className="block text-sm font-medium text-gray-700 mb-2">
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
                <label className="block text-sm font-medium text-gray-700 mb-2">
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
                <label className="block text-sm font-medium text-gray-700 mb-2">
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
                <label className="block text-sm font-medium text-gray-700 mb-2">
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
                <label className="block text-sm font-medium text-gray-700 mb-2">
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
                <label className="block text-sm font-medium text-gray-700 mb-2">
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
                  <label className="block text-sm font-medium text-gray-700 mb-2">
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

            {/* Mobile-friendly reset inside panel */}
            <div className="mt-4 sm:hidden flex justify-end">
              <button
                onClick={clearAllFilters}
                disabled={!filtersActive}
                className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-all duration-200 ${
                  filtersActive
                    ? "text-red-600 hover:text-red-700 hover:bg-red-50"
                    : "text-gray-400 bg-gray-100 cursor-not-allowed"
                }`}
              >
                <RotateCcw className="w-4 h-4" />
                <span className="text-sm font-medium">Reset All</span>
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default FilterControls;
