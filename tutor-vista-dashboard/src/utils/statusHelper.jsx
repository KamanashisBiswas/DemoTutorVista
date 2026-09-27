import React from "react";
import { TUTOR_REQUEST_STATUS } from "./status";

export const getStatusBadgeInfo = (status, isActive) => {
  const normalized = status ? status.toLowerCase() : "";

  switch (normalized) {
    case TUTOR_REQUEST_STATUS.ACTIVE:
      return {
        label: "Active",
        className: "bg-green-100 text-green-700 border border-green-200"
      };
    case TUTOR_REQUEST_STATUS.REFERRED:
      return {
        label: "Referred",
        className: "bg-green-100 text-green-700 border border-green-200"
      };
    case TUTOR_REQUEST_STATUS.CONFIRMED:
      return {
        label: "Confirmed",
        className: "bg-purple-100 text-purple-700 border border-purple-200"
      };
    case TUTOR_REQUEST_STATUS.DEMO:
      return {
        label: "Demo",
        className: "bg-yellow-100 text-yellow-700 border border-yellow-200"
      };
    case TUTOR_REQUEST_STATUS.PROBLEM:
      return {
        label: "Problem",
        className: "bg-orange-100 text-orange-700 border border-orange-200"
      };
    case TUTOR_REQUEST_STATUS.CANCELLED:
      return {
        label: "Cancelled",
        className: "bg-red-100 text-red-700 border border-red-200"
      };
    case TUTOR_REQUEST_STATUS.PENDING:
      return {
        label: "Pending",
        className: "bg-gray-100 text-gray-700 border border-gray-200"
      };
    case TUTOR_REQUEST_STATUS.APPROVED:
      return {
        label: "Approved",
        className: "bg-blue-100 text-blue-700 border border-blue-200"
      };
    case TUTOR_REQUEST_STATUS.ASSIGNED:
      return {
        label: "Assigned",
        className: "bg-indigo-100 text-indigo-700 border border-indigo-200"
      };
    default:
      // Fallback using isActive
      if (isActive) {
        return {
          label: "Active",
          className: "bg-green-100 text-green-700 border border-green-200"
        };
      } else {
        return {
          label: "Inactive",
          className: "bg-gray-100 text-gray-700 border border-gray-200"
        };
      }
  }
};

export const StatusBadge = ({ status, isActive }) => {
  const { label, className } = getStatusBadgeInfo(status, isActive);
  return (
    <span className={`inline-block px-3 py-1 rounded-full text-xs font-semibold ${className}`}>
      {label}
    </span>
  );
};
