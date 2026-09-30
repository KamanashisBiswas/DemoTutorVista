import React from "react";
import { FolderOpen } from "lucide-react";
import { Button } from "./Button";

export const EmptyState = ({
  icon: Icon = FolderOpen,
  title = "No data found",
  description = "There are no items to display at this moment.",
  actionLabel,
  onAction,
  actionButton,
  className = "",
}) => {
  const renderIcon = () => {
    if (React.isValidElement(Icon)) {
      return Icon;
    }
    if (typeof Icon === "function" || typeof Icon === "object") {
      const Component = Icon;
      return <Component className="w-7 h-7" />;
    }
    return <FolderOpen className="w-7 h-7" />;
  };

  return (
    <div
      className={`flex flex-col items-center justify-center p-8 sm:p-12 text-center rounded-xl border border-dashed border-[#E4E6EE] bg-white ${className}`}
    >
      <div className="w-14 h-14 rounded-full bg-[#EEEDFD] flex items-center justify-center text-[#3730E0] mb-4">
        {renderIcon()}
      </div>
      <h4 className="text-base font-bold text-[#1A1D29] tracking-tight mb-1">
        {title}
      </h4>
      <p className="text-xs text-[#5B5F73] max-w-sm mb-5 leading-relaxed">
        {description}
      </p>
      {actionButton ? (
        actionButton
      ) : actionLabel && onAction ? (
        <Button variant="primary" size="md" onClick={onAction}>
          {actionLabel}
        </Button>
      ) : null}
    </div>
  );
};

export default EmptyState;
