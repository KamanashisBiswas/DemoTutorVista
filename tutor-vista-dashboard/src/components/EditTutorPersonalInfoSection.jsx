import React, { memo } from "react";
import { User } from "lucide-react";

const MemoizedInput = memo(
  ({ label, type = "text", value, onChange, placeholder, error }) => (
    <div className="space-y-2">
      <label className="block text-sm font-medium text-gray-700">
        {label} <span className="text-red-500">*</span>
      </label>
      <input
        type={type}
        value={value || ""}
        onChange={onChange}
        placeholder={placeholder}
        className={`w-full px-4 py-3 border ${
          error ? "border-red-500" : "border-gray-200"
        } rounded-lg transition-all duration-200 hover:border-gray-300 ${
          error
            ? "focus:border-red-500 focus:ring-2 focus:ring-red-200"
            : "focus:border-gray-800 focus:ring-2 focus:ring-gray-300"
        }`}
      />
      {error && <p className="mt-1 text-sm text-red-600">{error}</p>}
    </div>
  )
);

const EditTutorPersonalInfoSection = ({
  user,
  personalInfo,
  handlePersonalInfoChange,
  score,
  setScore,
  isHired,
  setIsHired,
  fieldErrors,
}) => {
  return (
    <div>
      <div className="flex items-center justify-between gap-8 mb-6">
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 bg-gray-800 rounded-lg flex items-center justify-center">
            <User className="w-4 h-4 text-white" />
          </div>
          <h2 className="text-xl font-semibold text-gray-800">
            Personal Information
          </h2>
        </div>
        <div className="flex justify-end items-center flex-col">
          <div className="flex items-center">
            <label className="mr-2 text-base font-medium text-gray-700">
              Score:
            </label>
            {user?.role === "admin" ? (
              <input
                type="number"
                min="1"
                max="500"
                step="any"
                value={score}
                onChange={(e) => setScore(e.target.value)}
                className={`border ${
                  fieldErrors.score ? "border-red-500" : "border-gray-200"
                } rounded-lg px-3 py-1 w-24 text-right transition-all duration-200 hover:border-gray-300 focus:border-gray-800 focus:ring-2 focus:ring-gray-300`}
                placeholder="Score"
              />
            ) : (
              <span className="font-semibold text-gray-900">
                {score === "" ? "Not set" : score}
              </span>
            )}
          </div>
          {fieldErrors.score && (
            <p className="mt-1 text-sm text-red-600">{fieldErrors.score}</p>
          )}
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
        <MemoizedInput
          label="Name"
          value={personalInfo.name}
          onChange={(e) => handlePersonalInfoChange("name", e.target.value)}
          placeholder="Enter Your name"
          error={fieldErrors.name}
        />
        <MemoizedInput
          label="Phone No."
          value={personalInfo.phone}
          onChange={(e) => handlePersonalInfoChange("phone", e.target.value)}
          placeholder="Phone"
          error={fieldErrors.phone}
        />
        <div className="sm:col-span-2">
          <MemoizedInput
            label="Email"
            type="email"
            value={personalInfo.email}
            onChange={(e) => handlePersonalInfoChange("email", e.target.value)}
            placeholder="Email"
            error={fieldErrors.email}
          />
        </div>
      </div>
      <div className="mt-6">
        <label className="block text-sm font-medium text-gray-700 mb-3">
          Gender
        </label>
        <div className="flex space-x-6">
          {["Male", "Female", "Any"].map((gender) => (
            <label key={gender} className="flex items-center">
              <input
                type="radio"
                name="gender"
                value={gender}
                checked={personalInfo.gender === gender}
                onChange={(e) =>
                  handlePersonalInfoChange("gender", e.target.value)
                }
                className="w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500"
              />
              <span className="ml-2 text-gray-700">{gender}</span>
            </label>
          ))}
        </div>
      </div>
      {user?.role === "admin" && (
        <div className="mt-6">
          <label className="block text-sm font-medium text-gray-700 mb-3">
            Hired Status
          </label>
          <div className="flex items-center space-x-3">
            <span
              className={`text-sm font-medium ${
                !isHired ? "text-gray-900" : "text-gray-500"
              }`}
            >
              Not Hired
            </span>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={isHired}
                onChange={(e) => setIsHired(e.target.checked)}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-green-600"></div>
            </label>
            <span
              className={`text-sm font-medium ${
                isHired ? "text-gray-900" : "text-gray-500"
              }`}
            >
              Hired
            </span>
          </div>
          <div className="mt-2">
            <span
              className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                isHired
                  ? "bg-green-100 text-green-800"
                  : "bg-yellow-100 text-yellow-800"
              }`}
            >
              {isHired ? "Currently Hired" : "Available for Hire"}
            </span>
          </div>
        </div>
      )}
    </div>
  );
};

export default EditTutorPersonalInfoSection;
