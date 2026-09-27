import React from "react";

export const Input = React.forwardRef(
  (
    {
      label,
      error,
      helperText,
      iconLeft: IconLeft,
      iconRight: IconRight,
      className = "",
      containerClassName = "",
      id,
      type = "text",
      required = false,
      disabled = false,
      size = "md",
      ...props
    },
    ref
  ) => {
    const inputId = id || (label ? label.toLowerCase().replace(/\s+/g, "-") : undefined);

    const sizeClasses = {
      sm: "h-8 px-2.5 text-xs rounded-sm",
      md: "h-10 px-3.5 text-sm rounded-md",
      lg: "h-12 px-4 text-base rounded-md",
    };

    return (
      <div className={`w-full ${containerClassName}`}>
        {label && (
          <label
            htmlFor={inputId}
            className="block text-xs font-semibold text-[#1A1D29] mb-1.5"
          >
            {label}
            {required && <span className="text-[#DC2626] ml-1">*</span>}
          </label>
        )}
        <div className="relative flex items-center">
          {IconLeft && (
            <div className="absolute left-3 text-[#5B5F73] pointer-events-none flex items-center">
              <IconLeft className="w-4 h-4" />
            </div>
          )}
          <input
            ref={ref}
            id={inputId}
            type={type}
            disabled={disabled}
            required={required}
            className={`w-full bg-white text-[#1A1D29] placeholder-[#5B5F73]/60 border transition-all duration-150 ${
              error
                ? "border-[#DC2626] focus:border-[#DC2626] focus:ring-2 focus:ring-[#DC2626]/20"
                : "border-[#E4E6EE] hover:border-[#CBD5E1] focus:border-[#3730E0] focus:ring-2 focus:ring-[#3730E0]/20"
            } ${disabled ? "bg-[#F7F8FB] text-[#5B5F73] cursor-not-allowed opacity-75" : ""} ${
              IconLeft ? "pl-9" : ""
            } ${IconRight ? "pr-9" : ""} ${sizeClasses[size] || sizeClasses.md} ${className}`}
            {...props}
          />
          {IconRight && (
            <div className="absolute right-3 text-[#5B5F73] flex items-center">
              {typeof IconRight === "function" ? <IconRight className="w-4 h-4" /> : IconRight}
            </div>
          )}
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

Input.displayName = "Input";

export default Input;
