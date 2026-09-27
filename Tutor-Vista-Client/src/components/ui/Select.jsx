import React from "react";
import { ChevronDown } from "lucide-react";

export const Select = React.forwardRef(
  (
    {
      label,
      error,
      helperText,
      options = [],
      placeholder = "Select an option",
      className = "",
      containerClassName = "",
      id,
      required = false,
      disabled = false,
      size = "md",
      children,
      ...props
    },
    ref
  ) => {
    const selectId = id || (label ? label.toLowerCase().replace(/\s+/g, "-") : undefined);

    const sizeClasses = {
      sm: "h-8 px-2.5 pr-8 text-xs rounded-sm",
      md: "h-10 px-3.5 pr-10 text-sm rounded-md",
      lg: "h-12 px-4 pr-12 text-base rounded-md",
    };

    return (
      <div className={`w-full ${containerClassName}`}>
        {label && (
          <label
            htmlFor={selectId}
            className="block text-xs font-semibold text-[#1A1D29] mb-1.5"
          >
            {label}
            {required && <span className="text-[#DC2626] ml-1">*</span>}
          </label>
        )}
        <div className="relative flex items-center">
          <select
            ref={ref}
            id={selectId}
            disabled={disabled}
            required={required}
            className={`w-full appearance-none bg-white text-[#1A1D29] border transition-all duration-150 cursor-pointer ${
              error
                ? "border-[#DC2626] focus:border-[#DC2626] focus:ring-2 focus:ring-[#DC2626]/20"
                : "border-[#E4E6EE] hover:border-[#CBD5E1] focus:border-[#3730E0] focus:ring-2 focus:ring-[#3730E0]/20"
            } ${disabled ? "bg-[#F7F8FB] text-[#5B5F73] cursor-not-allowed opacity-75" : ""} ${
              sizeClasses[size] || sizeClasses.md
            } ${className}`}
            {...props}
          >
            {placeholder && (
              <option value="" disabled className="text-[#5B5F73]">
                {placeholder}
              </option>
            )}
            {options.length > 0
              ? options.map((opt, idx) => {
                  const val = typeof opt === "object" ? opt.value : opt;
                  const lbl = typeof opt === "object" ? opt.label : opt;
                  return (
                    <option key={idx} value={val}>
                      {lbl}
                    </option>
                  );
                })
              : children}
          </select>
          <div className="absolute right-3 pointer-events-none text-[#5B5F73]">
            <ChevronDown className="w-4 h-4" />
          </div>
        </div>
        {error ? (
          <p className="mt-1 text-xs text-[#DC2626] font-medium">{error}</p>
        ) : helperText ? (
          <p className="mt-1 text-xs text-[#5B5F73]">{helperText}</p>
        ) : null}
      </div>
    );
  }
);

Select.displayName = "Select";

export default Select;
