import React from "react";

const Button = ({
  children,
  onClick,
  type = "button",
  className = "",
  disabled = false,
  variant = "primary", // Add variant prop
}) => {
  // Base classes for different variants
  const variantClasses = {
    primary:
      "bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500 hover:from-blue-600 hover:via-indigo-600 hover:to-purple-600 text-white",
    secondary: "bg-white text-gray-800 border border-gray-200 hover:bg-gray-50",
  };

  const baseClasses =
    "px-4 md:px-8 py-[6px] md:py-3 rounded-lg font-semibold text-base md:text-lg transition-all duration-300 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed";

  // Combine classes
  const combinedClasses = `${baseClasses} ${variantClasses[variant]} ${className}`;

  return (
    <button
      type={type}
      onClick={onClick}
      className={combinedClasses}
      disabled={disabled}
    >
      {children}
    </button>
  );
};

export default Button;
