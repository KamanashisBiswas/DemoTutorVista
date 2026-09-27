import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ChevronDown,
  RotateCcw,
  Settings,
  MapPin,
  GraduationCap,
  BookOpen,
  User,
} from "lucide-react";

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
      {options.map((option) => (
        <option key={option} value={option}>
          {option}
        </option>
      ))}
    </select>
    {Icon && (
      <Icon className="absolute left-4 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-500 pointer-events-none" />
    )}
    <ChevronDown className="absolute right-4 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
  </div>
);

const TutorFilterControls = ({
  showAdvancedFilters,
  setShowAdvancedFilters,
  tutorsCount,
  totalTutors,
  filtersActive,
  clearAllFilters,
  filterType,
  handleFilterTypeChange,
  filterOptions,
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
}) => {
  return (
    <motion.div
      className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6 mb-8"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
    >
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
            {tutorsCount} of {totalTutors} tutors
            {filtersActive && (
              <>
                {" "}
                •{" "}
                <span className="text-blue-600 font-medium">
                  Filters Active
                </span>
              </>
            )}
          </div>
          {filtersActive && (
            <button
              onClick={clearAllFilters}
              className="flex items-center space-x-2 px-4 py-2 text-red-600 hover:text-red-700 hover:bg-red-50 rounded-lg transition-all duration-200"
            >
              <RotateCcw className="w-4 h-4" />
              <span className="text-sm font-medium">Reset All</span>
            </button>
          )}
        </div>
      </div>

      <AnimatePresence>
        {showAdvancedFilters && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="mt-6 pt-6 border-t border-gray-200"
          >
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-3">
                  Filter Category
                </label>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                  {filterOptions.map((option) => (
                    <button
                      key={option.value}
                      onClick={() => handleFilterTypeChange(option.value)}
                      className={`flex items-center space-x-3 px-4 py-3 rounded-xl border transition-all duration-200 ${
                        filterType === option.value
                          ? "bg-blue-50 border-blue-500 text-blue-700"
                          : "bg-white border-gray-300 text-gray-700 hover:border-gray-400 hover:shadow-sm"
                      }`}
                    >
                      <option.icon className="w-4 h-4" />
                      <span className="text-sm font-medium">
                        {option.label}
                      </span>
                    </button>
                  ))}
                </div>
              </div>

              <AnimatePresence mode="wait">
                {filterType === "location" && (
                  <motion.div
                    key="location"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.2 }}
                    className="bg-blue-50 rounded-xl p-6 space-y-4"
                  >
                    <h3 className="text-lg font-semibold text-blue-900 mb-4">
                      Filter by Location
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                      <FilterDropdown
                        value={locationFilter.division}
                        onChange={(value) =>
                          handleLocationFilterChange("division", value)
                        }
                        options={divisions}
                        placeholder="Select Division"
                        icon={MapPin}
                      />
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
                  </motion.div>
                )}

                {filterType === "medium" && (
                  <motion.div
                    key="medium"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.2 }}
                    className="bg-green-50 rounded-xl p-6 space-y-4"
                  >
                    <h3 className="text-lg font-semibold text-green-900 mb-4">
                      Filter by Medium
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <FilterDropdown
                        value={mediumFilter.medium}
                        onChange={(value) =>
                          handleMediumFilterChange("medium", value)
                        }
                        options={availableMediums}
                        placeholder="Select Medium"
                        icon={GraduationCap}
                      />
                      <FilterDropdown
                        value={mediumFilter.level}
                        onChange={(value) =>
                          handleMediumFilterChange("level", value)
                        }
                        options={getValidLevelsForMedium(mediumFilter.medium)}
                        placeholder="Select Level"
                        disabled={!mediumFilter.medium}
                        icon={GraduationCap}
                      />
                    </div>
                  </motion.div>
                )}

                {filterType === "subject" && (
                  <motion.div
                    key="subject"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.2 }}
                    className="bg-purple-50 rounded-xl p-6 space-y-4"
                  >
                    <h3 className="text-lg font-semibold text-purple-900 mb-4">
                      Filter by Subject
                    </h3>
                    <FilterDropdown
                      value={subjectFilter}
                      onChange={setSubjectFilter}
                      options={availableSubjects}
                      placeholder="Select Subject"
                      icon={BookOpen}
                    />
                  </motion.div>
                )}

                {filterType === "gender" && (
                  <motion.div
                    key="gender"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.2 }}
                    className="bg-pink-50 rounded-xl p-6 space-y-4"
                  >
                    <h3 className="text-lg font-semibold text-pink-900 mb-4">
                      Filter by Gender
                    </h3>
                    <FilterDropdown
                      value={genderFilter}
                      onChange={setGenderFilter}
                      options={availableGenders}
                      placeholder="Select Gender"
                      icon={User}
                    />
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default TutorFilterControls;
