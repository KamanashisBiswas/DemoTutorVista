import React from "react";
import { Loader2 } from "lucide-react";

export const LoadingState = ({
  message = "Loading...",
  size = "md",
  fullPage = false,
  className = "",
}) => {
  const sizeClasses = {
    sm: "w-5 h-5",
    md: "w-8 h-8",
    lg: "w-12 h-12",
  };

  const content = (
    <div className={`flex flex-col items-center justify-center p-8 text-center ${className}`}>
      <Loader2
        className={`${sizeClasses[size] || sizeClasses.md} animate-spin text-[#3730E0] mb-3`}
      />
      {message && (
        <p className="text-sm font-medium text-[#5B5F73] animate-pulse">
          {message}
        </p>
      )}
    </div>
  );

  if (fullPage) {
    return (
      <div className="fixed inset-0 bg-white/80 backdrop-blur-xs z-50 flex items-center justify-center">
        {content}
      </div>
    );
  }

  return content;
};

export default LoadingState;
