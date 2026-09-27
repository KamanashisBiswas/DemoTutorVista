import React from "react";

export const Tabs = ({
  tabs = [],
  activeTab,
  onChange,
  variant = "pills", // "pills" or "underline"
  className = "",
}) => {
  return (
    <div
      className={`flex items-center gap-1.5 overflow-x-auto p-1 ${
        variant === "underline"
          ? "border-b border-[#E4E6EE] gap-6"
          : "bg-[#F7F8FB] rounded-md p-1 border border-[#E4E6EE]"
      } ${className}`}
      role="tablist"
    >
      {tabs.map((tab) => {
        const isActive = activeTab === tab.id;
        const Icon = tab.icon;

        if (variant === "underline") {
          return (
            <button
              key={tab.id}
              role="tab"
              aria-selected={isActive}
              type="button"
              onClick={() => onChange(tab.id)}
              className={`flex items-center gap-2 pb-3 pt-1 text-sm font-medium border-b-2 transition-all duration-200 whitespace-nowrap ${
                isActive
                  ? "border-[#3730E0] text-[#3730E0]"
                  : "border-transparent text-[#5B5F73] hover:text-[#1A1D29] hover:border-[#CBD5E1]"
              }`}
            >
              {Icon && <Icon className="w-4 h-4 shrink-0" />}
              <span>{tab.label}</span>
              {tab.count !== undefined && (
                <span
                  className={`px-1.5 py-0.5 text-xs rounded-full ${
                    isActive ? "bg-[#EEEDFD] text-[#3730E0]" : "bg-[#E4E6EE] text-[#5B5F73]"
                  }`}
                >
                  {tab.count}
                </span>
              )}
            </button>
          );
        }

        return (
          <button
            key={tab.id}
            role="tab"
            aria-selected={isActive}
            type="button"
            onClick={() => onChange(tab.id)}
            className={`flex items-center gap-2 px-3.5 py-1.5 text-xs font-semibold rounded-sm transition-all duration-200 whitespace-nowrap ${
              isActive
                ? "bg-white text-[#3730E0] shadow-sm"
                : "text-[#5B5F73] hover:text-[#1A1D29] hover:bg-white/50"
            }`}
          >
            {Icon && <Icon className="w-3.5 h-3.5 shrink-0" />}
            <span>{tab.label}</span>
            {tab.count !== undefined && (
              <span
                className={`px-1.5 py-0.2 text-[11px] rounded-full ${
                  isActive ? "bg-[#EEEDFD] text-[#3730E0]" : "bg-white text-[#5B5F73]"
                }`}
              >
                {tab.count}
              </span>
            )}
          </button>
        );
      })}
    </div>
  );
};

export default Tabs;
