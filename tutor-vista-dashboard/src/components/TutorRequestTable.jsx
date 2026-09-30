// src/components/TutorRequestTable.jsx
import React from "react";
import { Eye, Edit, Trash2, Copy, Users, ClipboardList } from "lucide-react";
import { StatusBadge } from "../utils/statusHelper";
import { EmptyState } from "./ui/EmptyState";
import { SkeletonTable } from "./ui/Skeleton";

const formatUpdatedDate = (dateString) => {
  if (!dateString) return { date: "N/A", time: "" };
  const date = new Date(dateString);
  if (isNaN(date.getTime())) return { date: "N/A", time: "" };

  const day = String(date.getDate()).padStart(2, "0");
  const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  const month = months[date.getMonth()];
  const year = date.getFullYear();

  let hours = date.getHours();
  const minutes = String(date.getMinutes()).padStart(2, "0");
  const ampm = hours >= 12 ? "PM" : "AM";
  hours = hours % 12;
  hours = hours ? hours : 12;
  const formattedHours = String(hours).padStart(2, "0");

  return {
    date: `${day} ${month} ${year}`,
    time: `${formattedHours}:${minutes} ${ampm}`,
  };
};

const TutorRequestTable = ({
  requests,
  loading,
  onView,
  onEdit,
  onDelete,
  onCopy,
  user,
  onClearFilters,
}) => {
  if (loading) {
    return <SkeletonTable rows={8} cols={7} />;
  }

  if (requests.length === 0) {
    return (
      <EmptyState
        icon={ClipboardList}
        title="No Tuition Requests Found"
        description="We couldn't find any tuition requests matching your active filter criteria. Try adjusting or resetting your search filters."
        actionLabel={onClearFilters ? "Reset Filters" : undefined}
        onAction={onClearFilters}
      />
    );
  }

  return (
    <div className="bg-white rounded-2xl border border-[#E4E6EE] shadow-xs overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead className="bg-[#F7F8FB] border-b border-[#E4E6EE] text-[11px] font-bold uppercase tracking-wider text-[#5B5F73]">
            <tr>
              <th className="py-3.5 px-4">Student</th>
              <th className="py-3.5 px-4">Contact</th>
              <th className="py-3.5 px-4">Class & Medium</th>
              <th className="py-3.5 px-4">Subjects</th>
              <th className="py-3.5 px-4">Location</th>
              <th className="py-3.5 px-4">Status</th>
              <th className="py-3.5 px-4">Last Updated</th>
              <th className="py-3.5 px-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#E4E6EE] text-xs sm:text-sm text-[#1A1D29]">
            {requests.map((request) => {
              const { date, time } = formatUpdatedDate(request.updatedAt);

              return (
                <tr
                  key={request._id}
                  className="hover:bg-[#F7F8FB]/60 transition-colors group"
                >
                  {/* Student */}
                  <td className="py-3.5 px-4">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-xl bg-[#EEEDFD] text-[#3730E0] flex items-center justify-center font-bold text-xs shrink-0 border border-[#DDD9FC]">
                        {request.studentName?.charAt(0).toUpperCase() || "S"}
                      </div>
                      <div className="min-w-0">
                        <p className="font-bold text-[#1A1D29] truncate max-w-[150px]">
                          {request.studentName}
                        </p>
                        <p className="text-[11px] text-[#5B5F73]">
                          {request.gender || "Gender N/A"}
                        </p>
                      </div>
                    </div>
                  </td>

                  {/* Contact */}
                  <td className="py-3.5 px-4">
                    <p className="font-semibold text-[#1A1D29]">
                      {request.phoneNo || "N/A"}
                    </p>
                    {request.guardianPhone && (
                      <p className="text-[11px] text-[#5B5F73]">
                        G: {request.guardianPhone}
                      </p>
                    )}
                  </td>

                  {/* Class & Medium */}
                  <td className="py-3.5 px-4">
                    <p className="font-bold text-[#1A1D29]">
                      {request.grade || request.class || "N/A"}
                    </p>
                    <p className="text-[11px] text-[#5B5F73]">
                      {request.medium || "Medium N/A"}
                    </p>
                    {request.multipleStudent && request.grade2 && (
                      <span className="inline-flex items-center gap-1 mt-1 text-[10px] font-semibold text-[#0EA5A0] bg-[#F0FDFA] px-1.5 py-0.5 rounded border border-[#CCFBF1]">
                        <Users className="w-3 h-3" />
                        <span>2nd: {request.grade2}</span>
                      </span>
                    )}
                  </td>

                  {/* Subjects */}
                  <td className="py-3.5 px-4 max-w-[160px]">
                    <div className="flex flex-wrap gap-1">
                      {(request.subjects || []).slice(0, 2).map((sub, i) => (
                        <span
                          key={i}
                          className="px-2 py-0.5 rounded text-[11px] font-medium bg-[#F7F8FB] border border-[#E4E6EE] text-[#1A1D29]"
                        >
                          {sub}
                        </span>
                      ))}
                      {(request.subjects || []).length > 2 && (
                        <span className="text-[10px] font-semibold text-[#5B5F73] self-center">
                          +{request.subjects.length - 2}
                        </span>
                      )}
                    </div>
                  </td>

                  {/* Location */}
                  <td className="py-3.5 px-4">
                    <p className="font-medium text-[#1A1D29] truncate max-w-[140px]">
                      {request.area || "Area N/A"}
                    </p>
                    <p className="text-[11px] text-[#5B5F73]">
                      {request.district || request.division || "Bangladesh"}
                    </p>
                  </td>

                  {/* Status */}
                  <td className="py-3.5 px-4 whitespace-nowrap">
                    <StatusBadge
                      status={request.status}
                      isActive={request.isActive}
                    />
                  </td>

                  {/* Last Updated */}
                  <td className="py-3.5 px-4 whitespace-nowrap text-xs">
                    <p className="font-medium text-[#1A1D29]">{date}</p>
                    <p className="text-[10px] text-[#5B5F73]">{time}</p>
                  </td>

                  {/* Actions */}
                  <td className="py-3.5 px-4 text-right whitespace-nowrap">
                    <div className="flex items-center justify-end gap-1.5">
                      <button
                        onClick={() => onCopy && onCopy(request)}
                        className="p-1.5 rounded-lg text-[#5B5F73] hover:text-[#3730E0] hover:bg-[#EEEDFD] transition-colors"
                        title="Copy Request Summary"
                      >
                        <Copy className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => onView(request)}
                        className="p-1.5 rounded-lg text-[#5B5F73] hover:text-[#0EA5A0] hover:bg-[#F0FDFA] transition-colors"
                        title="View Full Details"
                      >
                        <Eye className="w-4 h-4" />
                      </button>
                      {user?.role !== "user" && (
                        <>
                          <button
                            onClick={() => onEdit(request)}
                            className="p-1.5 rounded-lg text-[#5B5F73] hover:text-[#16A34A] hover:bg-green-50 transition-colors"
                            title="Edit Request"
                          >
                            <Edit className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() =>
                              onDelete(request._id, request.studentName)
                            }
                            className="p-1.5 rounded-lg text-[#5B5F73] hover:text-[#DC2626] hover:bg-red-50 transition-colors"
                            title="Delete Request"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </>
                      )}
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TutorRequestTable;
