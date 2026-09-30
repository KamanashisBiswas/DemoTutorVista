import React from "react";
import { Search, Filter, ChevronDown } from "lucide-react";

const TutorSearchFilters = ({
  searchTerm,
  setSearchTerm,
  hiredFilter,
  setHiredFilter,
}) => {
  return (
    <div className="flex flex-col md:flex-row gap-3">
      <div className="relative flex-1">
        <Search className="absolute left-3.5 top-1/2 transform -translate-y-1/2 text-[#5B5F73] w-4 h-4 pointer-events-none" />
        <input
          type="text"
          placeholder="Search by name, email, or phone..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full pl-10 pr-4 py-2 text-sm bg-white border border-[#E4E6EE] rounded-lg text-[#1A1D29] placeholder-[#5B5F73] focus:outline-none focus:border-[#3730E0] focus:ring-2 focus:ring-[#3730E0]/15 transition-all shadow-xs"
        />
      </div>
      <div className="relative w-full md:w-44">
        <Filter className="absolute left-3.5 top-1/2 transform -translate-y-1/2 text-[#3730E0] w-4 h-4 pointer-events-none" />
        <select
          value={hiredFilter}
          onChange={(e) => setHiredFilter(e.target.value)}
          className="w-full pl-10 pr-8 py-2 text-sm bg-white border border-[#E4E6EE] rounded-lg text-[#1A1D29] appearance-none focus:outline-none focus:border-[#3730E0] focus:ring-2 focus:ring-[#3730E0]/15 transition-all shadow-xs cursor-pointer"
        >
          <option value="">All Status</option>
          <option value="hired">Hired</option>
          <option value="not_hired">Not Hired</option>
        </select>
        <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-[#5B5F73] w-3.5 h-3.5 pointer-events-none" />
      </div>
    </div>
  );
};

export default TutorSearchFilters;
