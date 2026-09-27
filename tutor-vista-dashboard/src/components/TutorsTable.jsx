import React from "react";
import {
  Eye,
  Edit,
  Trash2,
  Mail,
  Phone,
  School,
  GraduationCap,
  Landmark,
  MapPin,
} from "lucide-react";

const TutorsTable = ({ tutors, loading, onEdit, onView, onDelete, user }) => {
  if (loading && tutors.length === 0) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="overflow-x-auto">
      <table className="w-full table-auto">
        <thead>
          <tr className="bg-gray-50">
            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Tutor
            </th>

            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Education Details
            </th>
            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Subjects
            </th>
            {/* <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Location
            </th> */}
            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Hired Status
            </th>
            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Actions
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {tutors.map((tutor) => {
            const validEducationSections = Array.isArray(
              tutor.educationSections
            )
              ? tutor.educationSections.filter(
                  (edu) => edu.institution && edu.institution.trim() !== ""
                )
              : [];

            // const lastEducationWithResult = [...validEducationSections]
            //   .reverse()
            //   .find((edu) => edu.gpa || edu.cgpa);

            // const lastEducation =
            //   lastEducationWithResult ||
            //   (validEducationSections.length > 0
            //     ? validEducationSections[validEducationSections.length - 1]
            //     : tutor.educationSections?.[
            //         tutor.educationSections.length - 1
            //       ]);

            const firstEducation =
              validEducationSections.length > 0
                ? validEducationSections[0]
                : null;

            const secondEducation =
              validEducationSections.length > 1
                ? validEducationSections[1]
                : null;

            const thirdEducation =
              validEducationSections.length > 2
                ? validEducationSections[2]
                : null;

            const fourthEducation =
              validEducationSections.length > 3
                ? validEducationSections[3]
                : null;

            return (
              <tr key={tutor._id} className="hover:bg-gray-50">
                <td className="px-4 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <div className="w-14 h-14  rounded-lg flex items-center justify-center border-2">
                      {tutor?.profileImage?.url ? (
                        <img
                          className="w-full h-full object-cover rounded-lg"
                          src={tutor?.profileImage?.url}
                          alt="Profile Image"
                        />
                      ) : (
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="35"
                          height="35"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className="lucide lucide-user-round-icon lucide-user-round"
                        >
                          <circle cx="12" cy="8" r="5" />
                          <path d="M20 21a8 8 0 0 0-16 0" />
                        </svg>
                      )}
                    </div>
                    <div className="ml-3">
                      <div className="text-sm font-medium text-gray-900 flex gap-1">
                        <span>{tutor.name}</span>
                        <span className="text-sm font-light text-gray-500">
                          ({tutor.gender.charAt(0).toUpperCase()})
                        </span>
                      </div>
                      <div>
                        <div className="text-sm text-gray-500 flex gap-1 items-center">
                          <Mail className="w-4" />
                          {tutor.email}
                        </div>
                        <div className="text-sm text-gray-700 flex gap-1 items-center">
                          <Phone className="w-4" />
                          {tutor.phone}
                        </div>
                        <div className="text-sm text-gray-700 flex gap-1 items-center">
                          <MapPin className="w-4" />
                          <span>{tutor.area}</span>
                          {", "}
                          <span>{tutor.thana}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </td>

                <td className="px-4 py-4 whitespace-nowrap space-y-2">
                  {fourthEducation ? (
                    <>
                      <div className="text-sm text-gray-900 flex items-center gap-1">
                        <GraduationCap className="w-4 text-teal-500" />
                        {fourthEducation.institution || "N/A"}{" "}
                        <span className="text-gray-700 font-sm">
                          ({fourthEducation.examination || "N/A"})
                        </span>
                      </div>
                      <div className="text-sm text-gray-700 flex items-center gap-1">
                        {fourthEducation.department || "N/A"}
                        <span className="text-green-500">
                          ({fourthEducation.year || "N/A"})
                        </span>
                        <span className="text-red-500">
                          [{fourthEducation.cgpa || "N/A"}]
                        </span>
                      </div>
                    </>
                  ) : (
                    <div className="text-sm text-slate-900 flex items-center gap-2">
                      <GraduationCap className="w-4 text-teal-500" />
                      <span className="font-semibold">Masters:</span>
                      <span className="text-sm text-red-500">N/A</span>
                    </div>
                  )}

                  {thirdEducation ? (
                    <>
                      <div className="text-sm text-gray-900 flex items-center gap-1">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="15"
                          height="15"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className="lucide lucide-university-icon text-orange-500"
                        >
                          <path d="M14 21v-3a2 2 0 0 0-4 0v3" />
                          <path d="M18 12h.01" />
                          <path d="M18 16h.01" />
                          <path d="M22 7a1 1 0 0 0-1-1h-2a2 2 0 0 1-1.143-.359L13.143 2.36a2 2 0 0 0-2.286-.001L6.143 5.64A2 2 0 0 1 5 6H3a1 1 0 0 0-1 1v12a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2z" />
                          <path d="M6 12h.01" />
                          <path d="M6 16h.01" />
                          <circle cx="12" cy="10" r="2" />
                        </svg>
                        {thirdEducation.institution || "N/A"}{" "}
                        <span className="text-gray-700 font-sm">
                          ({thirdEducation.examination || "N/A"})
                        </span>
                      </div>
                      <div className="text-sm text-gray-700 flex items-center gap-1">
                        {thirdEducation.department || "N/A"}
                        <span className="text-green-500">
                          ({thirdEducation.year || "N/A"})
                        </span>
                        <span className="text-red-500">
                          [{thirdEducation.cgpa || "N/A"}]
                        </span>
                      </div>
                    </>
                  ) : (
                    <div className="text-sm text-slate-900 flex items-center gap-2">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="15"
                        height="15"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="lucide lucide-university-icon text-orange-500"
                      >
                        <path d="M14 21v-3a2 2 0 0 0-4 0v3" />
                        <path d="M18 12h.01" />
                        <path d="M18 16h.01" />
                        <path d="M22 7a1 1 0 0 0-1-1h-2a2 2 0 0 1-1.143-.359L13.143 2.36a2 2 0 0 0-2.286-.001L6.143 5.64A2 2 0 0 1 5 6H3a1 1 0 0 0-1 1v12a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2z" />
                        <path d="M6 12h.01" />
                        <path d="M6 16h.01" />
                        <circle cx="12" cy="10" r="2" />
                      </svg>
                      <span className="font-semibold">Honours:</span>
                      <span className="text-sm text-red-500">N/A</span>
                    </div>
                  )}

                  {secondEducation ? (
                    <>
                      <div className="text-sm text-gray-900 flex items-center gap-1">
                        <Landmark className="w-4 text-purple-500" />
                        {secondEducation.institution || "N/A"}{" "}
                        <span className="text-gray-700 font-sm">
                          ({secondEducation.examination || "N/A"})
                        </span>
                      </div>
                      <div className="text-sm text-gray-700 flex items-center gap-1">
                        {secondEducation.medium || "N/A"}
                        <span className="text-green-500">
                          ({secondEducation.groupSubject || "N/A"}-
                          {secondEducation.passingYear || "N/A"})
                        </span>
                        <span className="text-red-500">
                          [{secondEducation.gpa || "N/A"}]
                        </span>
                      </div>
                    </>
                  ) : (
                    <div className="text-sm text-slate-900 flex items-center gap-2">
                      <Landmark className="w-4 text-purple-500" />
                      <span className="font-semibold">HSC:</span>
                      <span className="text-sm text-red-500">N/A</span>
                    </div>
                  )}

                  {firstEducation ? (
                    <>
                      <div className="text-sm text-gray-900 flex items-center gap-1">
                        <School className="w-4 text-blue-500" />
                        {firstEducation.institution || "N/A"}{" "}
                        <span className="text-gray-700 font-sm">
                          ({firstEducation.examination || "N/A"})
                        </span>
                      </div>
                      <div className="text-sm text-gray-700 flex items-center gap-1">
                        {firstEducation.medium || "N/A"}
                        <span className="text-green-500">
                          ({firstEducation.groupSubject || "N/A"}-
                          {firstEducation.passingYear || "N/A"})
                        </span>
                        <span className="text-red-500">
                          [{firstEducation.gpa || "N/A"}]
                        </span>
                      </div>
                    </>
                  ) : (
                    <div className="text-sm text-slate-900 flex items-center gap-2">
                      <School className="w-4 text-blue-500" />
                      <span className="font-semibold">SSC:</span>
                      <span className="text-sm text-red-500">N/A</span>
                    </div>
                  )}
                </td>
                <td className="px-4 py-4">
                  <div className="text-sm text-gray-900">
                    {tutor.preferredSubjects?.slice(0, 3).join(", ")}
                    {tutor.preferredSubjects?.length > 3 &&
                      ` +${tutor.preferredSubjects.length - 3} more`}
                  </div>
                </td>
                {/* <td className="px-4 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900">{tutor.area}</div>
                  <div className="text-sm text-gray-500">{tutor.district}</div>
                </td> */}
                <td className="px-4 py-4 whitespace-nowrap">
                  {tutor.isHired ? (
                    <span className="inline-block px-3 py-1 bg-green-100 text-green-800 rounded-full text-xs font-semibold">
                      Hired
                    </span>
                  ) : (
                    <span className="inline-block px-3 py-1 bg-yellow-100 text-yellow-800 rounded-full text-xs font-semibold">
                      Not Hired
                    </span>
                  )}
                </td>
                <td className="px-4 py-4 whitespace-nowrap text-sm font-medium">
                  <div className="flex space-x-2">
                    <button
                      onClick={() => onView(tutor)}
                      className="text-blue-600 hover:text-blue-900 p-1 rounded"
                      title="View Details"
                    >
                      <Eye className="w-4 h-4" />
                    </button>
                    {user?.role !== "user" && (
                      <>
                        <button
                          onClick={() => onEdit(tutor)}
                          className="text-green-600 hover:text-green-900 p-1 rounded"
                          title="Edit Tutor"
                        >
                          <Edit className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => onDelete(tutor._id, tutor.name)}
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
            );
          })}
        </tbody>
      </table>
      {tutors.length === 0 && !loading && (
        <div className="text-center py-8 text-gray-500">
          No tutor applications found with the current filters.
        </div>
      )}
    </div>
  );
};

export default TutorsTable;
