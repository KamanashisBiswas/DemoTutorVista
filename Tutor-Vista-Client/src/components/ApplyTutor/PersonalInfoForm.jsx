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
      <div className="space-y-1.5">
        <label className="block text-xs font-semibold text-[#1A1D29]">
          {label} {required && <span className="text-[#DC2626]">*</span>}
        </label>
        <input
          ref={inputRef}
          type={type}
          value={value || ""}
          onChange={onChange}
          placeholder={placeholder}
          className={`w-full px-3.5 py-2.5 text-xs sm:text-sm border ${
            error ? "border-[#DC2626]" : "border-[#E4E6EE]"
          } rounded-sm transition-all duration-150 text-[#1A1D29] placeholder-[#5B5F73]/50 ${
            error
              ? "focus:border-[#DC2626] focus:ring-2 focus:ring-[#DC2626]/15"
              : "focus:border-[#3730E0] focus:ring-2 focus:ring-[#3730E0]/15"
          }`}
        />
        {error && <p className="mt-1 text-xs text-[#DC2626]">{error}</p>}
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
    <div className="space-y-1.5">
      <label className="block text-xs font-semibold text-[#1A1D29]">
        {label} {required && <span className="text-[#DC2626]">*</span>}
      </label>
      <div className="relative">
        <select
          ref={selectRef}
          value={value || ""}
          onChange={(e) => onChange(e.target.value)}
          disabled={disabled}
          className={`w-full px-3.5 py-2.5 text-xs sm:text-sm border ${
            error ? "border-[#DC2626]" : "border-[#E4E6EE]"
          } rounded-sm transition-all duration-150 text-[#1A1D29] ${
            error
              ? "focus:border-[#DC2626] focus:ring-2 focus:ring-[#DC2626]/15"
              : "focus:border-[#3730E0] focus:ring-2 focus:ring-[#3730E0]/15"
          } appearance-none bg-white disabled:bg-[#F7F8FB] disabled:text-[#5B5F73]/60 disabled:cursor-not-allowed`}
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
        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-[#5B5F73]">
          <ChevronDown className="w-4 h-4" />
        </div>
      </div>
      {error && <p className="mt-1 text-xs text-[#DC2626]">{error}</p>}
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
      {/* Personal Info */}
      <div className="mb-8 pb-8 border-b border-[#E4E6EE]">
        <div className="flex items-center space-x-3 mb-5">
          <div className="w-8 h-8 bg-[#EEEDFD] text-[#3730E0] rounded-sm flex items-center justify-center">
            <User className="w-4 h-4" />
          </div>
          <h3 className="text-base sm:text-lg font-bold text-[#1A1D29]">
            Personal Information
          </h3>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
          <MemoizedInput
            label="Full Name"
            value={personalInfo.name}
            onChange={(e) => handlePersonalInfoChange("name", e.target.value)}
            placeholder="e.g., Kamanashis Biswas"
            error={fieldErrors.name}
            inputRef={fieldRefs.name}
          />
          <MemoizedInput
            label="Phone Number"
            value={personalInfo.phone}
            onChange={(e) => handlePersonalInfoChange("phone", e.target.value)}
            placeholder="01700-000000"
            error={fieldErrors.phone}
            inputRef={fieldRefs.phone}
          />
          <div className="sm:col-span-2">
            <MemoizedInput
              label="Email Address"
              type="email"
              value={personalInfo.email}
              onChange={(e) =>
                handlePersonalInfoChange("email", e.target.value)
              }
              placeholder="e.g., tutor@example.com"
              error={fieldErrors.email}
              inputRef={fieldRefs.email}
            />
          </div>
        </div>
        <div className="mt-5">
          <label className="block text-xs font-semibold text-[#1A1D29] mb-2">
            Gender <span className="text-[#DC2626]">*</span>
          </label>
          <div className="flex gap-4 sm:gap-6">
            {["Male", "Female", "Any"].map((gender) => (
              <label key={gender} className="inline-flex items-center gap-2 cursor-pointer">
                <input
                  type="radio"
                  name="gender"
                  value={gender}
                  checked={personalInfo.gender === gender}
                  onChange={(e) =>
                    handlePersonalInfoChange("gender", e.target.value)
                  }
                  className="w-4 h-4 text-[#3730E0] border-[#E4E6EE] focus:ring-[#3730E0]"
                  required
                />
                <span className="text-xs sm:text-sm font-medium text-[#1A1D29]">{gender}</span>
              </label>
            ))}
          </div>
          {fieldErrors.gender && (
            <p className="mt-1 text-xs text-[#DC2626]">{fieldErrors.gender}</p>
          )}
        </div>
      </div>

      {/* Address Info */}
      <div className="mb-8 pb-8 border-b border-[#E4E6EE]">
        <div className="flex items-center space-x-3 mb-5">
          <div className="w-8 h-8 bg-[#EEEDFD] text-[#3730E0] rounded-sm flex items-center justify-center">
            <MapPin className="w-4 h-4" />
          </div>
          <h3 className="text-base sm:text-lg font-bold text-[#1A1D29]">
            Current Living Address
          </h3>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
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
            placeholder="Select Thana"
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
