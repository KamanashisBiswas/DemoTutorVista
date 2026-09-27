import React from "react";
import { AlertCircle, RefreshCw } from "lucide-react";
import { Button } from "./Button";

export const ErrorState = ({
  title = "Something went wrong",
  message = "We encountered an issue loading this information. Please try again.",
  onRetry,
  retryLabel = "Try Again",
  className = "",
}) => {
  return (
    <div
      className={`flex flex-col items-center justify-center p-8 sm:p-12 text-center rounded-md border border-[#FEE2E2] bg-[#FEF2F2]/40 ${className}`}
    >
      <div className="w-14 h-14 rounded-full bg-[#FEE2E2] flex items-center justify-center text-[#DC2626] mb-4">
        <AlertCircle className="w-7 h-7" />
      </div>
      <h4 className="text-lg font-bold text-[#1A1D29] tracking-tight mb-1.5">
        {title}
      </h4>
      <p className="text-sm text-[#5B5F73] max-w-sm mb-6 leading-relaxed">
        {message}
      </p>
      {onRetry && (
        <Button
          variant="secondary"
          size="md"
          iconLeft={RefreshCw}
          onClick={onRetry}
        >
          {retryLabel}
        </Button>
      )}
    </div>
  );
};

export default ErrorState;
