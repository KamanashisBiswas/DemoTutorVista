import React from "react";
import { Clock } from "lucide-react";

const TuitionDetailsForm = ({
  formData,
  handleInputChange,
  fieldErrors,
  fieldRefs,
}) => {
  return (
    <div className="mb-8">
      <div className="flex items-center space-x-3 mb-6">
        <div className="w-8 h-8 bg-gray-800 rounded-lg flex items-center justify-center">
          <Clock className="w-4 h-4 text-white" />
        </div>
        <h2 className="text-xl sm:text-2xl font-semibold text-gray-800">
          Time & Offer
        </h2>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Salary you offer <span className="text-red-500">*</span>
          </label>
          <input
            ref={fieldRefs.salary}
            type="text"
            placeholder="e.g., 5000 BDT"
            value={formData.salary}
            onChange={(e) => handleInputChange("salary", e.target.value)}
            className={`w-full px-4 py-3 border ${
              fieldErrors.salary ? "border-red-500" : "border-gray-300"
            } rounded-lg transition-all duration-200 hover:border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200`}
          />
          {fieldErrors.salary && (
            <p className="mt-1 text-sm text-red-600">{fieldErrors.salary}</p>
          )}
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Days <span className="text-red-500">*</span>
          </label>
          <input
            ref={fieldRefs.days}
            type="text"
            placeholder="e.g., 3 days/week"
            value={formData.days}
            onChange={(e) => handleInputChange("days", e.target.value)}
            className={`w-full px-4 py-3 border ${
              fieldErrors.days ? "border-red-500" : "border-gray-300"
            } rounded-lg transition-all duration-200 hover:border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200`}
          />
          {fieldErrors.days && (
            <p className="mt-1 text-sm text-red-600">{fieldErrors.days}</p>
          )}
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Time <span className="text-red-500">*</span>
          </label>
          <input
            ref={fieldRefs.time}
            type="text"
            placeholder="e.g., 6:00 PM - 8:00 PM"
            value={formData.time}
            onChange={(e) => handleInputChange("time", e.target.value)}
            className={`w-full px-4 py-3 border ${
              fieldErrors.time ? "border-red-500" : "border-gray-300"
            } rounded-lg transition-all duration-200 hover:border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200`}
          />
          {fieldErrors.time && (
            <p className="mt-1 text-sm text-red-600">{fieldErrors.time}</p>
          )}
        </div>
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Special Requirements
        </label>
        <textarea
          rows={4}
          placeholder="Any specific requirements..."
          value={formData.requirement}
          onChange={(e) => handleInputChange("requirement", e.target.value)}
          className={`w-full px-4 py-3 border ${
            fieldErrors.requirement ? "border-red-500" : "border-gray-300"
          } rounded-lg transition-all duration-200 hover:border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 resize-vertical`}
        />
        {fieldErrors.requirement && (
          <p className="mt-1 text-sm text-red-600">{fieldErrors.requirement}</p>
        )}
      </div>
    </div>
  );
};

export default TuitionDetailsForm;
