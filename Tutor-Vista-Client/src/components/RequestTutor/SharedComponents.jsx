import React from "react";
import { ChevronDown } from "lucide-react";

export const SelectField = ({
  label,
  value,
  onChange,
  options,
  placeholder = "Select",
  disabled = false,
  name,
  error,
  required = false,
  fieldRefs,
}) => (
  <div>
    <label className="block text-xs font-semibold text-[#1A1D29] mb-1.5">
      {label} {required && <span className="text-[#DC2626]">*</span>}
    </label>
    <div className="relative">
      <select
        ref={name && fieldRefs ? fieldRefs[name] : null}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        disabled={disabled}
        className={`w-full px-3.5 py-2.5 text-xs sm:text-sm border ${
          error ? "border-[#DC2626]" : "border-[#E4E6EE]"
        } rounded-sm appearance-none bg-white text-[#1A1D29] transition-all duration-150 ${
          error
            ? "focus:border-[#DC2626] focus:ring-2 focus:ring-[#DC2626]/15"
            : "focus:border-[#3730E0] focus:ring-2 focus:ring-[#3730E0]/15"
        } ${
          disabled
            ? "bg-[#F7F8FB] cursor-not-allowed text-[#5B5F73]/60"
            : "hover:border-[#CBD5E1] cursor-pointer"
        }`}
      >
        <option value="">
          {disabled ? "Please select above first" : placeholder}
        </option>
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
      <ChevronDown className="absolute right-3.5 top-1/2 transform -translate-y-1/2 w-4 h-4 text-[#5B5F73] pointer-events-none" />
    </div>
    {error && <p className="mt-1 text-xs text-[#DC2626]">{error}</p>}
  </div>
);
