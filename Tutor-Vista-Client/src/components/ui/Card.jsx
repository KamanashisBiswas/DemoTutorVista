import React from "react";

export const Card = ({
  children,
  className = "",
  hoverable = false,
  onClick,
  ...props
}) => {
  return (
    <div
      onClick={onClick}
      className={`bg-white border border-[#E4E6EE] rounded-md shadow-sm transition-all duration-200 ${
        hoverable ? "hover:shadow-md hover:border-[#CBD5E1] hover:-translate-y-0.5 cursor-pointer" : ""
      } ${className}`}
      {...props}
    >
      {children}
    </div>
  );
};

export const CardHeader = ({ children, className = "", ...props }) => {
  return (
    <div className={`p-5 border-b border-[#E4E6EE] ${className}`} {...props}>
      {children}
    </div>
  );
};

export const CardTitle = ({ children, className = "", ...props }) => {
  return (
    <h3
      className={`text-lg font-semibold text-[#1A1D29] tracking-tight ${className}`}
      {...props}
    >
      {children}
    </h3>
  );
};

export const CardDescription = ({ children, className = "", ...props }) => {
  return (
    <p className={`text-sm text-[#5B5F73] mt-1 ${className}`} {...props}>
      {children}
    </p>
  );
};

export const CardContent = ({ children, className = "", ...props }) => {
  return (
    <div className={`p-5 ${className}`} {...props}>
      {children}
    </div>
  );
};

export const CardFooter = ({ children, className = "", ...props }) => {
  return (
    <div
      className={`p-5 pt-0 border-t border-[#E4E6EE] mt-4 flex items-center justify-between ${className}`}
      {...props}
    >
      {children}
    </div>
  );
};

export default Card;
