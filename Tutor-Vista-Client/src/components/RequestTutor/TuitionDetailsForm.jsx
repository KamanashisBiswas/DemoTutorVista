import React from "react";
import { Clock } from "lucide-react";

const TuitionDetailsForm = ({
  formData,
  handleInputChange,
  fieldErrors,
  fieldRefs,
}) => {
  return (
    <div className="mb-8 pb-8 border-b border-[#E4E6EE]">
      <div className="flex items-center space-x-3 mb-5">
        <div className="w-8 h-8 bg-[#EEEDFD] text-[#3730E0] rounded-sm flex items-center justify-center">
          <Clock className="w-4 h-4" />
        </div>
        <h3 className="text-base sm:text-lg font-bold text-[#1A1D29]">
          Schedule & Remuneration
        </h3>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-5">
        <div>
          <label className="block text-xs font-semibold text-[#1A1D29] mb-1.5">
            Salary You Offer <span className="text-[#DC2626]">*</span>
          </label>
          <input
            ref={fieldRefs.salary}
            type="text"
            placeholder="e.g., 5000 BDT"
            value={formData.salary}
            onChange={(e) => handleInputChange("salary", e.target.value)}
            className={`w-full px-3.5 py-2.5 text-xs sm:text-sm border ${
              fieldErrors.salary ? "border-[#DC2626]" : "border-[#E4E6EE]"
            } rounded-sm transition-all duration-150 text-[#1A1D29] placeholder-[#5B5F73]/50 focus:border-[#3730E0] focus:ring-2 focus:ring-[#3730E0]/15`}
          />
          {fieldErrors.salary && (
            <p className="mt-1 text-xs text-[#DC2626]">{fieldErrors.salary}</p>
          )}
        </div>

        <div>
          <label className="block text-xs font-semibold text-[#1A1D29] mb-1.5">
            Days per Week <span className="text-[#DC2626]">*</span>
          </label>
          <input
            ref={fieldRefs.days}
            type="text"
            placeholder="e.g., 3 days/week"
            value={formData.days}
            onChange={(e) => handleInputChange("days", e.target.value)}
            className={`w-full px-3.5 py-2.5 text-xs sm:text-sm border ${
              fieldErrors.days ? "border-[#DC2626]" : "border-[#E4E6EE]"
            } rounded-sm transition-all duration-150 text-[#1A1D29] placeholder-[#5B5F73]/50 focus:border-[#3730E0] focus:ring-2 focus:ring-[#3730E0]/15`}
          />
          {fieldErrors.days && (
            <p className="mt-1 text-xs text-[#DC2626]">{fieldErrors.days}</p>
          )}
        </div>

        <div>
          <label className="block text-xs font-semibold text-[#1A1D29] mb-1.5">
            Preferred Time <span className="text-[#DC2626]">*</span>
          </label>
          <input
            ref={fieldRefs.time}
            type="text"
            placeholder="e.g., 6:00 PM - 8:00 PM"
            value={formData.time}
            onChange={(e) => handleInputChange("time", e.target.value)}
            className={`w-full px-3.5 py-2.5 text-xs sm:text-sm border ${
              fieldErrors.time ? "border-[#DC2626]" : "border-[#E4E6EE]"
            } rounded-sm transition-all duration-150 text-[#1A1D29] placeholder-[#5B5F73]/50 focus:border-[#3730E0] focus:ring-2 focus:ring-[#3730E0]/15`}
          />
          {fieldErrors.time && (
            <p className="mt-1 text-xs text-[#DC2626]">{fieldErrors.time}</p>
          )}
        </div>
      </div>

      <div>
        <label className="block text-xs font-semibold text-[#1A1D29] mb-1.5">
          Special Requirements (Optional)
        </label>
        <textarea
          rows={3}
          placeholder="Any specific instructions, topics to focus on, or teacher preferences..."
          value={formData.requirement}
          onChange={(e) => handleInputChange("requirement", e.target.value)}
          className={`w-full px-3.5 py-2.5 text-xs sm:text-sm border ${
            fieldErrors.requirement ? "border-[#DC2626]" : "border-[#E4E6EE]"
          } rounded-sm transition-all duration-150 text-[#1A1D29] placeholder-[#5B5F73]/50 focus:border-[#3730E0] focus:ring-2 focus:ring-[#3730E0]/15 resize-vertical`}
        />
        {fieldErrors.requirement && (
          <p className="mt-1 text-xs text-[#DC2626]">{fieldErrors.requirement}</p>
        )}
      </div>
    </div>
  );
};

export default TuitionDetailsForm;
