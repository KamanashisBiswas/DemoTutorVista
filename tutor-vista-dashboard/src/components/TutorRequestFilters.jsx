import React from "react";
import { Search, Filter, ChevronDown, Calendar, MapPin, GraduationCap, RotateCcw } from "lucide-react";
import { PREDEFINED_ZONES } from "../utils/zones";

const TutorRequestFilters = ({
  searchTerm,
  setSearchTerm,
  statusFilter,
  setStatusFilter,
  workflowStatusFilter,
  setWorkflowStatusFilter,
  dateFilter,
  setDateFilter,
  customStartDate,
  setCustomStartDate,
  customEndDate,
  setCustomEndDate,
  zoneFilter,
  setZoneFilter,
  mediumFilter,
  setMediumFilter,
  onClearFilters,
}) => {
  return (
    <div className="mb-6 flex flex-col lg:flex-row flex-wrap gap-3 items-center w-full">
      {/* 1. Search Input */}
      <div className="relative flex-1 min-w-[200px] w-full">
        <Search className="absolute left-3.5 top-1/2 transform -translate-y-1/2 text-[#5B5F73] w-4 h-4 pointer-events-none" />
        <input
          type="text"
          placeholder="Search by student name, phone..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full pl-10 pr-4 py-2 text-sm bg-white border border-[#E4E6EE] rounded-lg text-[#1A1D29] placeholder-[#5B5F73] focus:outline-none focus:border-[#3730E0] focus:ring-2 focus:ring-[#3730E0]/15 transition-all shadow-xs"
        />
      </div>

      {/* 2. Status Filter */}
      <div className="relative w-full sm:w-44">
        <Filter className="absolute left-3.5 top-1/2 transform -translate-y-1/2 text-[#3730E0] w-4 h-4 pointer-events-none" />
        <select
          value={workflowStatusFilter}
          onChange={(e) => setWorkflowStatusFilter(e.target.value)}
          className="w-full pl-10 pr-8 py-2 text-sm bg-white border border-[#E4E6EE] rounded-lg text-[#1A1D29] appearance-none focus:outline-none focus:border-[#3730E0] focus:ring-2 focus:ring-[#3730E0]/15 transition-all shadow-xs cursor-pointer"
        >
          <option value="">All Status</option>
          <option value="active">Active</option>
          <option value="referred">Referred</option>
          <option value="confirmed">Confirmed</option>
          <option value="demo">Demo</option>
          <option value="problem">Problem</option>
          <option value="cancelled">Cancelled</option>
        </select>
        <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-[#5B5F73] w-3.5 h-3.5 pointer-events-none" />
      </div>

      {/* 3. Updated Date Filter */}
      <div className="relative w-full sm:w-44">
        <Calendar className="absolute left-3.5 top-1/2 transform -translate-y-1/2 text-[#0EA5A0] w-4 h-4 pointer-events-none" />
        <select
          value={dateFilter}
          onChange={(e) => setDateFilter(e.target.value)}
          className="w-full pl-10 pr-8 py-2 text-sm bg-white border border-[#E4E6EE] rounded-lg text-[#1A1D29] appearance-none focus:outline-none focus:border-[#3730E0] focus:ring-2 focus:ring-[#3730E0]/15 transition-all shadow-xs cursor-pointer"
        >
          <option value="">All Dates</option>
          <option value="today">Today</option>
          <option value="yesterday">Yesterday</option>
          <option value="last7">Last 7 Days</option>
          <option value="last30">Last 30 Days</option>
          <option value="thisMonth">This Month</option>
          <option value="custom">Custom Range</option>
        </select>
        <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-[#5B5F73] w-3.5 h-3.5 pointer-events-none" />
      </div>

      {/* 4. Zone Filter */}
      <div className="relative w-full sm:w-44">
        <MapPin className="absolute left-3.5 top-1/2 transform -translate-y-1/2 text-[#DC2626] w-4 h-4 pointer-events-none" />
        <select
          value={zoneFilter}
          onChange={(e) => setZoneFilter(e.target.value)}
          className="w-full pl-10 pr-8 py-2 text-sm bg-white border border-[#E4E6EE] rounded-lg text-[#1A1D29] appearance-none focus:outline-none focus:border-[#3730E0] focus:ring-2 focus:ring-[#3730E0]/15 transition-all shadow-xs cursor-pointer"
        >
          <option value="">All Zones</option>
          {Object.keys(PREDEFINED_ZONES).map((division) => (
            <optgroup key={division} label={division}>
              {PREDEFINED_ZONES[division].map((zone) => (
                <option key={zone} value={zone}>
                  {zone}
                </option>
              ))}
            </optgroup>
          ))}
        </select>
        <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-[#5B5F73] w-3.5 h-3.5 pointer-events-none" />
      </div>

      {/* 5. Education Medium Filter */}
      <div className="relative w-full sm:w-48">
        <GraduationCap className="absolute left-3.5 top-1/2 transform -translate-y-1/2 text-[#3730E0] w-4 h-4 pointer-events-none" />
        <select
          value={mediumFilter}
          onChange={(e) => setMediumFilter(e.target.value)}
          className="w-full pl-10 pr-8 py-2 text-sm bg-white border border-[#E4E6EE] rounded-lg text-[#1A1D29] appearance-none focus:outline-none focus:border-[#3730E0] focus:ring-2 focus:ring-[#3730E0]/15 transition-all shadow-xs cursor-pointer"
        >
          <option value="">All Mediums</option>
          <option value="Bangla Medium">Bangla Medium</option>
          <option value="English Medium">English Medium</option>
          <option value="English Version (National Curriculum)">English Version (National Curriculum)</option>
          <option value="Arabic Medium">Arabic Medium</option>
          <option value="University Level">University Level</option>
          <option value="Admission Preparation">Admission Preparation</option>
          <option value="Skill Development">Skill Development</option>
          <option value="Job Purpose">Job Purpose</option>
        </select>
        <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-[#5B5F73] w-3.5 h-3.5 pointer-events-none" />
      </div>

      {/* 6. Clear Filters Button */}
      <button
        onClick={onClearFilters}
        className="w-full sm:w-auto px-3.5 py-2 bg-white hover:bg-[#F7F8FB] text-[#5B5F73] hover:text-[#1A1D29] font-medium rounded-lg transition-colors text-xs flex items-center justify-center gap-1.5 border border-[#E4E6EE] shadow-xs"
        title="Reset all filters"
      >
        <RotateCcw className="w-3.5 h-3.5" />
        <span>Reset</span>
      </button>

      {/* Custom Date Picker Inputs */}
      {dateFilter === "custom" && (
        <div className="flex flex-row items-center gap-2 w-full sm:w-auto mt-2 lg:mt-0 lg:ml-2">
          <input
            type="date"
            value={customStartDate}
            onChange={(e) => setCustomStartDate(e.target.value)}
            className="w-full sm:w-36 px-3 py-1.5 border border-[#E4E6EE] rounded-lg focus:outline-none focus:border-[#3730E0] focus:ring-1 focus:ring-[#3730E0] text-xs text-[#1A1D29]"
          />
          <span className="text-[#5B5F73] text-xs font-medium">to</span>
          <input
            type="date"
            value={customEndDate}
            onChange={(e) => setCustomEndDate(e.target.value)}
            className="w-full sm:w-36 px-3 py-1.5 border border-[#E4E6EE] rounded-lg focus:outline-none focus:border-[#3730E0] focus:ring-1 focus:ring-[#3730E0] text-xs text-[#1A1D29]"
          />
        </div>
      )}
    </div>
  );
};

export default TutorRequestFilters;
