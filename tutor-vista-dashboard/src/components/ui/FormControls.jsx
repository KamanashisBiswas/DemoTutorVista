import React from "react";
import { Check } from "lucide-react";

/**
 * Modern Checkbox Control
 */
export const Checkbox = React.forwardRef(
  (
    {
      label,
      description,
      checked,
      onChange,
      disabled = false,
      id,
      className = "",
      error,
      ...props
    },
    ref
  ) => {
    const inputId = id || (label ? label.toLowerCase().replace(/\s+/g, "-") : undefined);

    return (
      <div className={`flex items-start gap-2.5 ${className}`}>
        <div className="relative flex items-center justify-center mt-0.5">
          <input
            ref={ref}
            id={inputId}
            type="checkbox"
            checked={checked}
            onChange={onChange}
            disabled={disabled}
            className="peer sr-only"
            {...props}
          />
          <div
            onClick={() => !disabled && onChange && onChange({ target: { checked: !checked } })}
            className={`w-4 h-4 rounded-sm border transition-all duration-150 flex items-center justify-center cursor-pointer ${
              checked
                ? "bg-[#3730E0] border-[#3730E0] text-white"
                : error
                ? "border-[#DC2626] bg-white"
                : "border-[#E4E6EE] bg-white hover:border-[#CBD5E1]"
            } ${disabled ? "opacity-50 cursor-not-allowed bg-[#F7F8FB]" : ""}`}
          >
            {checked && <Check className="w-3 h-3 stroke-[3]" />}
          </div>
        </div>
        {(label || description) && (
          <label
            htmlFor={inputId}
            className={`cursor-pointer select-none ${disabled ? "opacity-50 cursor-not-allowed" : ""}`}
          >
            {label && (
              <span className="block text-xs font-semibold text-[#1A1D29]">
                {label}
              </span>
            )}
            {description && (
              <span className="block text-xs text-[#5B5F73] mt-0.5 leading-normal">
                {description}
              </span>
            )}
            {error && (
              <span className="block text-xs text-[#DC2626] mt-0.5">
                {error}
              </span>
            )}
          </label>
        )}
      </div>
    );
  }
);
Checkbox.displayName = "Checkbox";

/**
 * Modern Radio Control
 */
export const Radio = React.forwardRef(
  (
    {
      label,
      description,
      checked,
      onChange,
      name,
      value,
      disabled = false,
      id,
      className = "",
      ...props
    },
    ref
  ) => {
    const inputId = id || `${name}-${value}`;

    return (
      <div className={`flex items-start gap-2.5 ${className}`}>
        <div className="relative flex items-center justify-center mt-0.5">
          <input
            ref={ref}
            id={inputId}
            type="radio"
            name={name}
            value={value}
            checked={checked}
            onChange={onChange}
            disabled={disabled}
            className="peer sr-only"
            {...props}
          />
          <div
            onClick={() => !disabled && onChange && onChange({ target: { value, checked: true } })}
            className={`w-4 h-4 rounded-full border transition-all duration-150 flex items-center justify-center cursor-pointer ${
              checked
                ? "border-[#3730E0] bg-white"
                : "border-[#E4E6EE] bg-white hover:border-[#CBD5E1]"
            } ${disabled ? "opacity-50 cursor-not-allowed bg-[#F7F8FB]" : ""}`}
          >
            {checked && <div className="w-2 h-2 rounded-full bg-[#3730E0]" />}
          </div>
        </div>
        {(label || description) && (
          <label
            htmlFor={inputId}
            className={`cursor-pointer select-none ${disabled ? "opacity-50 cursor-not-allowed" : ""}`}
          >
            {label && (
              <span className="block text-xs font-semibold text-[#1A1D29]">
                {label}
              </span>
            )}
            {description && (
              <span className="block text-xs text-[#5B5F73] mt-0.5 leading-normal">
                {description}
              </span>
            )}
          </label>
        )}
      </div>
    );
  }
);
Radio.displayName = "Radio";

/**
 * Modern Textarea Control
 */
export const Textarea = React.forwardRef(
  (
    {
      label,
      error,
      helperText,
      className = "",
      containerClassName = "",
      id,
      rows = 4,
      required = false,
      disabled = false,
      ...props
    },
    ref
  ) => {
    const textareaId = id || (label ? label.toLowerCase().replace(/\s+/g, "-") : undefined);

    return (
      <div className={`w-full ${containerClassName}`}>
        {label && (
          <label
            htmlFor={textareaId}
            className="block text-xs font-semibold text-[#1A1D29] mb-1.5"
          >
            {label}
            {required && <span className="text-[#DC2626] ml-1">*</span>}
          </label>
        )}
        <textarea
          ref={ref}
          id={textareaId}
          rows={rows}
          disabled={disabled}
          required={required}
          className={`w-full p-3 bg-white text-[#1A1D29] text-sm placeholder-[#5B5F73]/60 rounded-md border transition-all duration-150 ${
            error
              ? "border-[#DC2626] focus:border-[#DC2626] focus:ring-2 focus:ring-[#DC2626]/20"
              : "border-[#E4E6EE] hover:border-[#CBD5E1] focus:border-[#3730E0] focus:ring-2 focus:ring-[#3730E0]/20"
          } ${disabled ? "bg-[#F7F8FB] text-[#5B5F73] cursor-not-allowed opacity-75" : ""} ${className}`}
          {...props}
        />
        {error ? (
          <p className="mt-1 text-xs text-[#DC2626] font-medium">{error}</p>
        ) : helperText ? (
          <p className="mt-1 text-xs text-[#5B5F73]">{helperText}</p>
        ) : null}
      </div>
    );
  }
);
Textarea.displayName = "Textarea";

/**
 * Modern Switch / Toggle Control
 */
export const Switch = ({
  checked,
  onChange,
  label,
  description,
  disabled = false,
  className = "",
}) => {
  return (
    <div className={`flex items-center justify-between gap-4 ${className}`}>
      {(label || description) && (
        <div className="select-none cursor-pointer" onClick={() => !disabled && onChange(!checked)}>
          {label && (
            <span className="block text-xs font-semibold text-[#1A1D29]">
              {label}
            </span>
          )}
          {description && (
            <span className="block text-xs text-[#5B5F73] mt-0.5">
              {description}
            </span>
          )}
        </div>
      )}
      <button
        type="button"
        role="switch"
        aria-checked={checked}
        disabled={disabled}
        onClick={() => !disabled && onChange(!checked)}
        className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus-visible:ring-2 focus-visible:ring-[#3730E0] ${
          checked ? "bg-[#3730E0]" : "bg-[#CBD5E1]"
        } ${disabled ? "opacity-50 cursor-not-allowed" : ""}`}
      >
        <span
          className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow-sm ring-0 transition duration-200 ease-in-out ${
            checked ? "translate-x-5" : "translate-x-0"
          }`}
        />
      </button>
    </div>
  );
};
