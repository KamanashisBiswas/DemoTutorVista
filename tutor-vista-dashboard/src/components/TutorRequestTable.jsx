import React from "react";
import { Eye, Edit, Trash2, Copy, Users } from "lucide-react";
import { StatusBadge } from "../utils/statusHelper";

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
  hours = hours ? hours : 12; // 0 should be 12
  const formattedHours = String(hours).padStart(2, "0");

  return {
    date: `${day} ${month} ${year}`,
    time: `${formattedHours}:${minutes} ${ampm}`
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
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (requests.length === 0) {
    return (
      <div className="text-center py-12 bg-white rounded-xl border border-gray-200 p-8 flex flex-col items-center justify-center col-span-full">
        <p className="text-gray-500 mb-4 font-medium">No tutor requests found.</p>
        <button
          onClick={onClearFilters}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition font-semibold text-sm"
        >
          Clear Filters
        </button>
      </div>
    );
  }

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
              Student
            </th>
            <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
              Contact
            </th>
            <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
              Class & Medium
            </th>
            <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
              Subjects
            </th>
            <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
              Location
            </th>
            <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
              Status
            </th>
            <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
              Updated Date
            </th>
            <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
              Comment
            </th>
            <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
              Actions
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {requests.map((request) => (
            <tr key={request._id} className="hover:bg-gray-50">
              <td className="px-4 py-4 whitespace-nowrap">
                <div className="flex items-center">
                  <div className="flex-shrink-0 h-10 w-10 bg-blue-100 text-blue-800 rounded-full flex items-center justify-center font-bold text-lg mr-3">
                    {request.studentName?.charAt(0)}
                  </div>
                  <div>
                    <div className="text-sm font-semibold text-gray-900">
                      {request.studentName}
                    </div>
                    <div className="text-xs text-gray-500">
                      {request.gender}
                    </div>
                  </div>
                </div>
              </td>
              <td className="px-4 py-4 whitespace-nowrap">
                <div className="text-sm text-gray-900">{request.phoneNo}</div>
                {request.guardianPhone && (
                  <div className="text-xs text-gray-500">
                    {request.guardianPhone}
                  </div>
                )}
              </td>
              <td className="px-4 py-4">
                <div className="text-sm text-gray-900 font-semibold">
                  {request.grade || request.class || "N/A"} ({request.medium || "N/A"})
                </div>
                {request.multipleStudent && request.grade2 && (
                  <div className="text-sm text-gray-500 mt-1 flex items-center gap-1 font-medium">
                    <Users className="w-3.5 h-3.5 text-blue-500 shrink-0" />
                    <span>{request.grade2} ({request.medium2 || "N/A"})</span>
                  </div>
                )}
              </td>
              <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500">
                {request.subjects?.slice(0, 2).join(", ")}
                {request.subjects?.length > 2 &&
                  ` +${request.subjects.length - 2} more`}
              </td>
              <td className="px-4 py-4 whitespace-nowrap">
                <div className="text-sm text-gray-900">{request.area}</div>
                <div className="text-sm text-gray-500">{request.district}</div>
              </td>
              <td className="px-4 py-4 whitespace-nowrap">
                <StatusBadge status={request.status} isActive={request.isActive} />
              </td>
              <td className="px-4 py-4 whitespace-nowrap text-sm font-medium">
                {(() => {
                  const { date, time } = formatUpdatedDate(request.updatedAt);
                  return (
                    <div className="flex flex-col">
                      <span className="text-gray-900">{date}</span>
                      <span className="text-xs text-gray-400 font-normal mt-0.5">{time}</span>
                    </div>
                  );
                })()}
              </td>
              <td className="px-4 py-4 text-sm text-gray-500 max-w-[200px] truncate" title={request.comment || ""}>
                {request.comment && request.comment.trim() !== "" ? (
                  request.comment.length > 40 ? `${request.comment.slice(0, 40)}...` : request.comment
                ) : (
                  "-"
                )}
              </td>
              <td className="px-4 py-4 whitespace-nowrap text-sm font-medium">
                <div className="flex space-x-2">
                  <button
                    onClick={() => onCopy && onCopy(request)}
                    className="text-indigo-600 hover:text-indigo-900 p-1 rounded"
                    title="Copy (With Contact Number)"
                  >
                    <Copy className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => onView(request)}
                    className="text-blue-600 hover:text-blue-900 p-1 rounded"
                    title="View Details"
                  >
                    <Eye className="w-4 h-4" />
                  </button>
                  {user?.role !== "user" && (
                    <>
                      <button
                        onClick={() => onEdit(request)}
                        className="text-green-600 hover:text-green-900 p-1 rounded"
                        title="Edit"
                      >
                        <Edit className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() =>
                          onDelete(request._id, request.studentName)
                        }
                        className="text-red-600 hover:text-red-900 p-1 rounded"
                        title="Delete"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </>
                  )}
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TutorRequestTable;
