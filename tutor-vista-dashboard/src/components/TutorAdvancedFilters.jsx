import React from "react";
import { Filter, RotateCcw, Search } from "lucide-react";
import FilterDropdown from "./FilterDropdown";
import MultiSelectFilter from "./MultiSelectFilter";

const TutorAdvancedFilters = ({
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
  inputSubject,
  setInputSubject,
  genderFilter,
  setGenderFilter,
  availableGenders,
  inputScore,
  setInputScore,
  specialSkillsFilter,
  setSpecialSkillsFilter,
  availableSpecialSkills,
  suitableAreaFilter,
  setSuitableAreaFilter,
  availableSuitableAreas,
  inputInstitution,
  setInputInstitution,
  inputDepartment,
  setInputDepartment,
  handleApplyTextFilter,
  sortByScore, // Add this prop
  setSortByScore, // Add this prop
}) => {
  return (
    <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center space-x-2">
          <Filter className="w-4 h-4 text-gray-600" />
          <span className="text-sm font-medium text-gray-700">
            Advanced Filters
          </span>
        </div>
        <button
          onClick={clearAllFilters}
          className="flex items-center space-x-1 text-sm text-red-600 hover:text-red-700 transition-colors"
        >
          <RotateCcw className="w-4 h-4" />
          <span>Reset All</span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Location Filters */}
        <div className="space-y-1">
          <label className="block text-xs font-medium text-gray-600">
            Division
          </label>
          <FilterDropdown
            value={locationFilter.division}
            onChange={(value) => handleLocationFilterChange("division", value)}
            options={divisions}
            placeholder="Select Division"
          />
        </div>
        <div className="space-y-1">
          <label className="block text-xs font-medium text-gray-600">
            District
          </label>
          <FilterDropdown
            value={locationFilter.district}
            onChange={(value) => handleLocationFilterChange("district", value)}
            options={districts}
            placeholder="Select District"
            disabled={!locationFilter.division}
          />
        </div>
        <div className="space-y-1">
          <label className="block text-xs font-medium text-gray-600">
            Thana
          </label>
          <FilterDropdown
            value={locationFilter.thana}
            onChange={(value) => handleLocationFilterChange("thana", value)}
            options={thanas}
            placeholder="Select Thana"
            disabled={!locationFilter.district}
          />
        </div>
        <div className="space-y-1">
          <label className="block text-xs font-medium text-gray-600">
            Area
          </label>
          <FilterDropdown
            value={locationFilter.area}
            onChange={(value) => handleLocationFilterChange("area", value)}
            options={areas}
            placeholder="Select Area"
            disabled={!locationFilter.thana}
          />
        </div>

        {/* Medium Filters */}
        <div className="space-y-1">
          <label className="block text-xs font-medium text-gray-600">
            Medium
          </label>
          <FilterDropdown
            value={mediumFilter.medium}
            onChange={(value) => handleMediumFilterChange("medium", value)}
            options={availableMediums}
            placeholder="Select Medium"
          />
        </div>
        <div className="space-y-1">
          <label className="block text-xs font-medium text-gray-600">
            Level
          </label>
          <FilterDropdown
            value={mediumFilter.level}
            onChange={(value) => handleMediumFilterChange("level", value)}
            options={getValidLevelsForMedium(mediumFilter.medium)}
            placeholder="Select Level"
            disabled={!mediumFilter.medium}
          />
        </div>

        {/* Preferred Subjects Filter */}
        <div className="space-y-1">
          <label className="block text-xs font-medium text-gray-600">
            Preferred Subject
          </label>
          <div className="relative w-full">
            <input
              type="text"
              placeholder="Type subject name..."
              value={inputSubject}
              onChange={(e) => setInputSubject(e.target.value)}
              className="w-full pl-3 pr-10 py-2 text-sm border border-gray-300 rounded-lg bg-white transition-all duration-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
            />
            <Search
              onClick={() => handleApplyTextFilter("subject")}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4 cursor-pointer hover:text-blue-600"
            />
          </div>
        </div>

        {/* Gender Filter */}
        <div className="space-y-1">
          <label className="block text-xs font-medium text-gray-600">
            Gender
          </label>
          <FilterDropdown
            value={genderFilter}
            onChange={setGenderFilter}
            options={availableGenders}
            placeholder="Select Gender"
          />
        </div>

        {/* Score Filter */}
        <div className="space-y-1">
          <label className="block text-xs font-medium text-gray-600">
            Minimum Score (0-100)
          </label>
          <div className="relative w-full">
            <input
              type="number"
              step="0.1"
              placeholder="e.g. 50"
              value={inputScore}
              onChange={(e) => setInputScore(e.target.value)}
              className="w-full pl-3 pr-10 py-2 text-sm border border-gray-300 rounded-lg bg-white transition-all duration-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
            />
            <Search
              onClick={() => handleApplyTextFilter("score")}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4 cursor-pointer hover:text-blue-600"
            />
          </div>
        </div>

        {/* Sort by Score */}
        <div className="space-y-1">
          <label className="block text-xs font-medium text-gray-600">
            Sort by Score
          </label>
          <FilterDropdown
            value={sortByScore}
            onChange={setSortByScore}
            options={[
              { value: "", label: "Default" },
              { value: "desc", label: "Highest First" },
              { value: "asc", label: "Lowest First" },
            ]}
            placeholder="Select Sort Order"
          />
        </div>

        {/* Special Skills Filter */}
        <MultiSelectFilter
          label="Special Skill"
          options={availableSpecialSkills}
          selected={specialSkillsFilter}
          onChange={setSpecialSkillsFilter}
          placeholder="Add Skill"
        />

        {/* Suitable Area Filter */}
        <MultiSelectFilter
          label="Suitable Area"
          options={availableSuitableAreas}
          selected={suitableAreaFilter}
          onChange={setSuitableAreaFilter}
          placeholder="Add Suitable Area"
        />

        {/* Institution Filter */}
        <div className="space-y-1">
          <label className="block text-xs font-medium text-gray-600">
            Institution
          </label>
          <div className="relative w-full">
            <input
              type="text"
              placeholder="Type institution name..."
              value={inputInstitution}
              onChange={(e) => setInputInstitution(e.target.value)}
              className="w-full pl-3 pr-10 py-2 text-sm border border-gray-300 rounded-lg bg-white transition-all duration-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
            />
            <Search
              onClick={() => handleApplyTextFilter("institution")}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4 cursor-pointer hover:text-blue-600"
            />
          </div>
        </div>

        {/* Department Filter */}
        <div className="space-y-1">
          <label className="block text-xs font-medium text-gray-600">
            Department
          </label>
          <div className="relative w-full">
            <input
              type="text"
              placeholder="Type department name..."
              value={inputDepartment}
              onChange={(e) => setInputDepartment(e.target.value)}
              className="w-full pl-3 pr-10 py-2 text-sm border border-gray-300 rounded-lg bg-white transition-all duration-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
            />
            <Search
              onClick={() => handleApplyTextFilter("department")}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4 cursor-pointer hover:text-blue-600"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default TutorAdvancedFilters;
