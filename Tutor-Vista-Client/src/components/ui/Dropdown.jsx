import React, { useState, useRef, useEffect } from "react";

export const Dropdown = ({
  trigger,
  children,
  align = "right",
  className = "",
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const alignClasses = {
    left: "left-0",
    right: "right-0",
    center: "left-1/2 -translate-x-1/2",
  };

  return (
    <div className="relative inline-block text-left" ref={dropdownRef}>
      <div onClick={() => setIsOpen((prev) => !prev)}>
        {trigger}
      </div>

      {isOpen && (
        <div
          className={`absolute ${alignClasses[align] || alignClasses.right} mt-2 w-56 bg-white rounded-md shadow-md border border-[#E4E6EE] py-1.5 z-40 animate-slide-up ${className}`}
        >
          {typeof children === "function" ? children({ close: () => setIsOpen(false) }) : children}
        </div>
      )}
    </div>
  );
};

export const DropdownItem = ({
  children,
  onClick,
  icon: Icon,
  danger = false,
  className = "",
}) => {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`w-full text-left px-3.5 py-2 text-xs flex items-center gap-2.5 transition-colors duration-150 ${
        danger
          ? "text-[#DC2626] hover:bg-[#FEE2E2]/50"
          : "text-[#1A1D29] hover:bg-[#F7F8FB] hover:text-[#3730E0]"
      } ${className}`}
    >
      {Icon && <Icon className="w-4 h-4 shrink-0" />}
      <span>{children}</span>
    </button>
  );
};

export const DropdownDivider = () => {
  return <div className="h-px bg-[#E4E6EE] my-1" />;
};

export default Dropdown;
