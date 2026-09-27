import React from "react";

const CommonSectionHeading = ({
  badge,
  title,
  highlight,
  subtitle,
  align = "center",
  className = "",
}) => {
  const alignClasses = {
    left: "text-left items-start",
    center: "text-center items-center mx-auto",
    right: "text-right items-end ml-auto",
  }[align] || "text-center items-center mx-auto";

  return (
    <div className={`flex flex-col ${alignClasses} max-w-3xl mb-8 sm:mb-12 ${className}`}>
      {badge && (
        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-[#EEEDFD] text-[#3730E0] border border-[#DDD9FC] mb-3">
          {badge}
        </span>
      )}
      <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-[#1A1D29] tracking-tight leading-tight">
        {title} {highlight && <span className="text-[#3730E0]">{highlight}</span>}
      </h2>
      {subtitle && (
        <p className="text-sm sm:text-base text-[#5B5F73] mt-2.5 leading-relaxed max-w-2xl">
          {subtitle}
        </p>
      )}
    </div>
  );
};

export default CommonSectionHeading;
