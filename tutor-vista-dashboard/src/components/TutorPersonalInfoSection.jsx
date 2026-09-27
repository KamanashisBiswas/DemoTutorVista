import React, { memo } from "react";
import { User } from "lucide-react";

// Memoized Input Component to prevent re-renders
const MemoizedInput = memo(
  ({
    label,
    type = "text",
    value,
    onChange,
    placeholder,
    required = true,
    error,
    inputRef,
  }) => {
    return (
      <div className="space-y-2">
        <label className="block text-sm font-medium text-gray-700">
          {label} {required && <span className="text-red-500">*</span>}
        </label>
        <input
          ref={inputRef}
          type={type}
          value={value || ""}
          onChange={onChange}
          placeholder={placeholder}
          className={`w-full px-4 py-3 border rounded-lg transition-all duration-200 text-sm focus:border-black focus:ring-1 focus:ring-black ${
            error ? "" : ""
          }`}
        />
        {error && <p className="mt-1 text-sm text-red-600">{error}</p>}
      </div>
    );
  }
);

const TutorPersonalInfoSection = ({
  personalInfo,
  otherData,
  handlePersonalInfoChange,
  handleOtherDataChange,
  fieldErrors,
  fieldRefs,
}) => {
  return (
    <div className="p-4 border rounded-lg">
      <h3 className="text-lg font-semibold mb-4 flex items-center">
        <User className="mr-2" />
        Personal Information
      </h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <MemoizedInput
          label="Name"
          value={personalInfo.name}
          onChange={(e) => handlePersonalInfoChange("name", e.target.value)}
          placeholder="Enter Name"
          error={fieldErrors.name}
          inputRef={fieldRefs.name}
        />
        <MemoizedInput
          label="Phone No."
          value={personalInfo.phone}
          onChange={(e) => handlePersonalInfoChange("phone", e.target.value)}
          placeholder="Enter Phone"
          error={fieldErrors.phone}
          inputRef={fieldRefs.phone}
        />
        <div className="md:col-span-2">
          <MemoizedInput
            label="Email"
            type="email"
            value={personalInfo.email}
            onChange={(e) => handlePersonalInfoChange("email", e.target.value)}
            placeholder="Enter Email"
            error={fieldErrors.email}
            inputRef={fieldRefs.email}
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Gender <span className="text-red-500">*</span>
          </label>
          <div className="flex space-x-4">
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
                  className="w-4 h-4"
                  required
                />
                <span className="ml-2">{gender}</span>
              </label>
            ))}
          </div>
          {fieldErrors.gender && (
            <p className="mt-1 text-sm text-red-600">{fieldErrors.gender}</p>
          )}
        </div>
        <div className="md:col-span-2">
          <MemoizedInput
            label="Score (Optional)"
            type="number"
            value={otherData.score}
            onChange={(e) => handleOtherDataChange("score", e.target.value)}
            placeholder="Enter score (1-500)"
            required={false}
            error={fieldErrors.score}
          />
        </div>
      </div>
    </div>
  );
};

export default TutorPersonalInfoSection;
