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
    <label className="block text-sm font-medium text-gray-700 mb-2">
      {label} {required && <span className="text-red-500">*</span>}
    </label>
    <div className="relative">
      <select
        ref={name && fieldRefs ? fieldRefs[name] : null}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        disabled={disabled}
        className={`w-full px-4 py-3 border ${
          error ? "border-red-500" : "border-gray-300"
        } rounded-lg appearance-none bg-white transition-all duration-200 ${
          error
            ? "focus:border-red-500 focus:ring-2 focus:ring-red-200"
            : "focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
        } ${
          disabled
            ? "bg-gray-100 cursor-not-allowed text-gray-500"
            : "hover:border-gray-300"
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
      <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
    </div>
    {error && <p className="mt-1 text-sm text-red-600">{error}</p>}
  </div>
);
