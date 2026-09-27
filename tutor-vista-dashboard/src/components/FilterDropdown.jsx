import React from "react";

const FilterDropdown = ({
  value,
  onChange,
  options,
  placeholder,
  disabled = false,
}) => {
  return (
    <select
      value={value}
      onChange={(e) => onChange(e.target.value)}
      disabled={disabled}
      className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg bg-white transition-all duration-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 disabled:bg-gray-100 disabled:cursor-not-allowed"
    >
      {placeholder && (
        <option value="" disabled>
          {placeholder}
        </option>
      )}
      {options.map((option, index) => {
        // Check if option is an object with value/label or just a string
        const optionValue = typeof option === "object" ? option.value : option;
        const optionLabel = typeof option === "object" ? option.label : option;

        // Use a combination of value and index for a guaranteed unique key
        const uniqueKey = `${optionValue}-${index}`;

        return (
          <option key={uniqueKey} value={optionValue}>
            {optionLabel}
          </option>
        );
      })}
    </select>
  );
};

export default FilterDropdown;
