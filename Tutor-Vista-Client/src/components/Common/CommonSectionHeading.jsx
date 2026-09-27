import React from "react";

const CommonSectionHeading = ({ title, highlight, className = "" }) => (
  <h2
    className={`text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold text-gray-900 mb-4 sm:mb-6 ${className}`}
  >
    {title} <span className="text-blue-500">{highlight}</span>
  </h2>
);

export default CommonSectionHeading;
