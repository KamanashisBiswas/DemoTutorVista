import React from "react";
import {
  ChevronDown,
  RotateCcw,
  SlidersHorizontal,
  MapPin,
  GraduationCap,
  BookOpen,
  User,
  Search,
} from "lucide-react";
import { Card } from "../ui/Card";
import { Button } from "../ui/Button";

const FilterSelect = ({
  value,
  onChange,
  options = [],
  placeholder = "Select",
  disabled = false,
  icon: Icon,
}) => (
  <div className="relative w-full">
    {Icon && (
      <Icon className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#5B5F73] pointer-events-none" />
    )}
    <select
      value={value}
      onChange={(e) => onChange(e.target.value)}
      disabled={disabled}
      className={`w-full h-10 text-xs sm:text-sm border rounded-md appearance-none bg-white transition-all duration-150 pr-8 text-[#1A1D29] ${
        Icon ? "pl-9" : "pl-3"
      } ${
        disabled
          ? "bg-[#F7F8FB] border-[#E4E6EE] text-[#5B5F73] cursor-not-allowed opacity-60"
          : "border-[#E4E6EE] hover:border-[#CBD5E1] focus:outline-none focus:border-[#3730E0] focus:ring-2 focus:ring-[#3730E0]/20"
      }`}
    >
      <option value="">{disabled ? "Select prior option" : placeholder}</option>
      {options.map((opt) => (
        <option key={opt} value={opt}>
          {opt}
        </option>
      ))}
    </select>
    <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#5B5F73] pointer-events-none" />
  </div>
);

const TutorFilterControls = ({
  showAdvancedFilters,
  setShowAdvancedFilters,
  tutorsCount,
  totalTutors,
  filtersActive,
  clearAllFilters,
  locationFilter,
  handleLocationFilterChange,
  divisions = [],
  districts = [],
  thanas = [],
  areas = [],
  mediumFilter,
  handleMediumFilterChange,
  availableMediums = [],
  getValidLevelsForMedium,
  subjectFilter,
  setSubjectFilter,
  availableSubjects = [],
  genderFilter,
  setGenderFilter,
  availableGenders = [],
}) => {
  return (
    <Card className="bg-white border-[#E4E6EE] p-5 mb-8 shadow-sm">
      {/* Top Filter Bar: Filter Toggle & Counter */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-4 border-b border-[#E4E6EE]">
        <div className="flex items-center gap-3">
          <Button
            variant={showAdvancedFilters ? "primary" : "secondary"}
            size="sm"
            onClick={() => setShowAdvancedFilters(!showAdvancedFilters)}
            iconLeft={SlidersHorizontal}
            iconRight={ChevronDown}
          >
            <span>{showAdvancedFilters ? "Hide Filters" : "Filter Tutors"}</span>
          </Button>

          {filtersActive && (
            <Button
              variant="ghost"
              size="sm"
              onClick={clearAllFilters}
              iconLeft={RotateCcw}
              className="text-[#DC2626] hover:bg-[#FEF2F2]"
            >
              Reset Filters
            </Button>
          )}
        </div>

        <div className="text-xs text-[#5B5F73]">
          Showing <span className="font-bold text-[#1A1D29]">{tutorsCount}</span> of{" "}
          <span className="font-bold text-[#1A1D29]">{totalTutors}</span> verified tutors
        </div>
      </div>

      {/* Advanced Filter Controls Drawer */}
      {showAdvancedFilters && (
        <div className="pt-5 space-y-4 animate-slide-up">
          {/* Location Filters Row */}
          <div>
            <span className="block text-xs font-bold text-[#1A1D29] uppercase tracking-wider mb-2 flex items-center gap-1.5">
              <MapPin className="w-3.5 h-3.5 text-[#3730E0]" />
              <span>Location Hierarchy</span>
            </span>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
              <FilterSelect
                value={locationFilter.division}
                onChange={(val) => handleLocationFilterChange("division", val)}
                options={divisions}
                placeholder="Division"
              />
              <FilterSelect
                value={locationFilter.district}
                onChange={(val) => handleLocationFilterChange("district", val)}
                options={districts}
                placeholder="District"
                disabled={!locationFilter.division}
              />
              <FilterSelect
                value={locationFilter.thana}
                onChange={(val) => handleLocationFilterChange("thana", val)}
                options={thanas}
                placeholder="Thana / Upazila"
                disabled={!locationFilter.district}
              />
              <FilterSelect
                value={locationFilter.area}
                onChange={(val) => handleLocationFilterChange("area", val)}
                options={areas}
                placeholder="Specific Area"
                disabled={!locationFilter.thana}
              />
            </div>
          </div>

          {/* Academic Criteria Row */}
          <div className="pt-2">
            <span className="block text-xs font-bold text-[#1A1D29] uppercase tracking-wider mb-2 flex items-center gap-1.5">
              <GraduationCap className="w-3.5 h-3.5 text-[#3730E0]" />
              <span>Teaching Preferences</span>
            </span>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
              <FilterSelect
                value={mediumFilter.medium}
                onChange={(val) => handleMediumFilterChange("medium", val)}
                options={Array.from(availableMediums)}
                placeholder="Medium"
                icon={BookOpen}
              />
              <FilterSelect
                value={mediumFilter.level}
                onChange={(val) => handleMediumFilterChange("level", val)}
                options={getValidLevelsForMedium ? getValidLevelsForMedium(mediumFilter.medium) : []}
                placeholder="Class / Grade"
                disabled={!mediumFilter.medium}
              />
              <FilterSelect
                value={subjectFilter}
                onChange={(val) => setSubjectFilter(val)}
                options={Array.from(availableSubjects)}
                placeholder="Subject"
              />
              <FilterSelect
                value={genderFilter}
                onChange={(val) => setGenderFilter(val)}
                options={Array.from(availableGenders)}
                placeholder="Tutor Gender"
                icon={User}
              />
            </div>
          </div>
        </div>
      )}
    </Card>
  );
};

export default TutorFilterControls;
