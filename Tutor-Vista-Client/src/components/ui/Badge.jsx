import React from "react";

export const Badge = ({
  children,
  variant = "primary",
  size = "md",
  icon: Icon,
  dot = false,
  className = "",
  ...props
}) => {
  const sizeClasses = {
    sm: "px-2 py-0.5 text-xs gap-1",
    md: "px-2.5 py-1 text-xs gap-1.5",
    lg: "px-3 py-1.5 text-sm gap-2",
  };

  const variantClasses = {
    primary: "bg-[#EEEDFD] text-[#3730E0] border border-[#DDD9FC]",
    secondary: "bg-[#F0FDFA] text-[#0EA5A0] border border-[#CCFBF1]",
    accent: "bg-[#FFFBEB] text-[#D97706] border border-[#FDE68A]",
    success: "bg-[#DCFCE7] text-[#15803D] border border-[#BBF7D0]",
    warning: "bg-[#FEF3C7] text-[#B45309] border border-[#FDE68A]",
    danger: "bg-[#FEE2E2] text-[#B91C1C] border border-[#FECACA]",
    neutral: "bg-[#F7F8FB] text-[#5B5F73] border border-[#E4E6EE]",
  };

  const dotClasses = {
    primary: "bg-[#3730E0]",
    secondary: "bg-[#0EA5A0]",
    accent: "bg-[#F5A524]",
    success: "bg-[#16A34A]",
    warning: "bg-[#D97706]",
    danger: "bg-[#DC2626]",
    neutral: "bg-[#5B5F73]",
  };

  return (
    <span
      className={`inline-flex items-center font-medium rounded-full ${
        sizeClasses[size] || sizeClasses.md
      } ${variantClasses[variant] || variantClasses.primary} ${className}`}
      {...props}
    >
      {dot && (
        <span
          className={`w-1.5 h-1.5 rounded-full shrink-0 ${
            dotClasses[variant] || dotClasses.primary
          }`}
        />
      )}
      {Icon && <Icon className="w-3.5 h-3.5 shrink-0" />}
      <span>{children}</span>
    </span>
  );
};

export default Badge;
