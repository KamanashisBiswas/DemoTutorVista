import React, { memo } from "react";
import { User, MapPin, ChevronDown } from "lucide-react";

// Memoized Input Component
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
          className={`w-full px-4 py-3 border ${
            error ? "border-red-500" : "border-gray-200"
          } rounded-lg transition-all duration-200 hover:border-gray-300 ${
            error
              ? "focus:border-red-500 focus:ring-2 focus:ring-red-200"
              : "focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
          }`}
        />
        {error && <p className="mt-1 text-sm text-red-600">{error}</p>}
      </div>
    );
  }
);

// Select Field Component
const SelectField = ({
  label,
  value,
  onChange,
  options,
  placeholder,
  disabled = false,
  required = true,
  error,
  selectRef,
}) => {
  return (
    <div className="space-y-2">
      <label className="block text-sm font-medium text-gray-700">
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      <div className="relative">
        <select
          ref={selectRef}
          value={value || ""}
          onChange={(e) => onChange(e.target.value)}
          disabled={disabled}
          className={`w-full px-4 py-3 border ${
            error ? "border-red-500" : "border-gray-200"
          } rounded-lg transition-all duration-200 hover:border-gray-300 ${
            error
              ? "focus:border-red-500 focus:ring-2 focus:ring-red-200"
              : "focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
          } appearance-none bg-white disabled:bg-gray-100 disabled:cursor-not-allowed`}
        >
          {placeholder && (
            <option value="" disabled>
              {disabled ? "Please select above first" : placeholder}
            </option>
          )}
          {options.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-gray-500">
          <ChevronDown className="w-4 h-4" />
        </div>
      </div>
      {error && <p className="mt-1 text-sm text-red-600">{error}</p>}
    </div>
  );
};

const PersonalInfoForm = ({
  personalInfo,
  handlePersonalInfoChange,
  addressInfo,
  handleAddressChange,
  fieldErrors,
  fieldRefs,
  divisions,
  districts,
  thanas,
  areas,
}) => {
  return (
    <>
      <div className="mb-8 sm:mb-12">
        <div className="flex items-center space-x-3 mb-6">
          <div className="w-8 h-8 bg-gray-800 rounded-lg flex items-center justify-center">
            <User className="w-4 h-4 text-white" />
          </div>
          <h2 className="text-xl sm:text-2xl font-semibold text-gray-800">
            Personal Information
          </h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
          <MemoizedInput
            label="Name"
            value={personalInfo.name}
            onChange={(e) => handlePersonalInfoChange("name", e.target.value)}
            placeholder="Enter Your name"
            error={fieldErrors.name}
            inputRef={fieldRefs.name}
          />
          <MemoizedInput
            label="Phone No."
            value={personalInfo.phone}
            onChange={(e) => handlePersonalInfoChange("phone", e.target.value)}
            placeholder="Phone"
            error={fieldErrors.phone}
            inputRef={fieldRefs.phone}
          />
          <div className="sm:col-span-2">
            <MemoizedInput
              label="Email"
              type="email"
              value={personalInfo.email}
              onChange={(e) =>
                handlePersonalInfoChange("email", e.target.value)
              }
              placeholder="Email"
              error={fieldErrors.email}
              inputRef={fieldRefs.email}
            />
          </div>
        </div>
        <div className="mt-6">
          <label className="block text-sm font-medium text-gray-700 mb-3">
            Gender <span className="text-red-500">*</span>
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
                  required
                />
                <span className="ml-2 text-gray-700">{gender}</span>
              </label>
            ))}
          </div>
          {fieldErrors.gender && (
            <p className="mt-1 text-sm text-red-600">{fieldErrors.gender}</p>
          )}
        </div>
      </div>

      <div className="mb-8 sm:mb-12">
        <div className="flex items-center space-x-3 mb-6">
          <div className="w-8 h-8 bg-gray-800 rounded-lg flex items-center justify-center">
            <MapPin className="w-4 h-4 text-white" />
          </div>
          <h2 className="text-xl sm:text-2xl font-semibold text-gray-800">
            Address
          </h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
          <SelectField
            label="Division"
            value={addressInfo.division}
            onChange={(value) => handleAddressChange("division", value)}
            options={divisions}
            placeholder="Select Division"
            error={fieldErrors.division}
            selectRef={fieldRefs.division}
          />
          <SelectField
            label="District"
            value={addressInfo.district}
            onChange={(value) => handleAddressChange("district", value)}
            options={districts}
            placeholder="Select District"
            disabled={!addressInfo.division}
            error={fieldErrors.district}
            selectRef={fieldRefs.district}
          />
          <SelectField
            label="Thana"
            value={addressInfo.thanas}
            onChange={(value) => handleAddressChange("thanas", value)}
            options={thanas}
            placeholder="Select thanas"
            disabled={!addressInfo.district}
            error={fieldErrors.thanas}
            selectRef={fieldRefs.thanas}
          />
          <SelectField
            label="Area"
            value={addressInfo.area}
            onChange={(value) => handleAddressChange("area", value)}
            options={areas}
            placeholder="Select Area"
            disabled={!addressInfo.thanas}
            error={fieldErrors.area}
            selectRef={fieldRefs.area}
          />
        </div>
      </div>
    </>
  );
};

export default PersonalInfoForm;
export { MemoizedInput, SelectField };
