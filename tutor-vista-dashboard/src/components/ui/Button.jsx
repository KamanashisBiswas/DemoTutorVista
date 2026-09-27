import React from "react";
import { Loader2 } from "lucide-react";

/**
 * Modern TutorVista Button Component (Dashboard)
 */
export const Button = React.forwardRef(
  (
    {
      children,
      variant = "primary",
      size = "md",
      iconLeft: IconLeft,
      iconRight: IconRight,
      loading = false,
      disabled = false,
      fullWidth = false,
      type = "button",
      className = "",
      onClick,
      ...props
    },
    ref
  ) => {
    const baseClasses =
      "inline-flex items-center justify-center font-medium transition-all duration-200 ease-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed select-none active:scale-[0.98]";

    const sizeClasses = {
      sm: "h-8 px-3 text-xs rounded-sm gap-1.5",
      md: "h-10 px-4 text-sm rounded-md gap-2",
      lg: "h-12 px-6 text-base rounded-md gap-2.5",
    };

    const variantClasses = {
      primary:
        "bg-[#3730E0] hover:bg-[#2D24C4] text-white shadow-sm hover:shadow-md focus-visible:ring-[#3730E0]",
      secondary:
        "bg-white hover:bg-[#F7F8FB] text-[#1A1D29] border border-[#E4E6EE] shadow-sm hover:border-[#CBD5E1] focus-visible:ring-[#3730E0]",
      outline:
        "bg-transparent hover:bg-[#EEEDFD] text-[#3730E0] border border-[#3730E0] focus-visible:ring-[#3730E0]",
      ghost:
        "bg-transparent hover:bg-[#F7F8FB] text-[#1A1D29] hover:text-[#3730E0] focus-visible:ring-[#3730E0]",
      danger:
        "bg-[#DC2626] hover:bg-[#B91C1C] text-white shadow-sm focus-visible:ring-[#DC2626]",
      success:
        "bg-[#16A34A] hover:bg-[#15803D] text-white shadow-sm focus-visible:ring-[#16A34A]",
      accent:
        "bg-[#F5A524] hover:bg-[#D97706] text-white shadow-sm focus-visible:ring-[#F5A524]",
    };

    const widthClass = fullWidth ? "w-full" : "";
    const isDisabled = disabled || loading;

    return (
      <button
        ref={ref}
        type={type}
        disabled={isDisabled}
        onClick={onClick}
        className={`${baseClasses} ${sizeClasses[size] || sizeClasses.md} ${
          variantClasses[variant] || variantClasses.primary
        } ${widthClass} ${className}`}
        {...props}
      >
        {loading ? (
          <Loader2 className="w-4 h-4 animate-spin text-current" />
        ) : IconLeft ? (
          <IconLeft className="w-4 h-4 shrink-0" />
        ) : null}
        <span>{children}</span>
        {!loading && IconRight ? (
          <IconRight className="w-4 h-4 shrink-0" />
        ) : null}
      </button>
    );
  }
);

Button.displayName = "Button";

export default Button;
