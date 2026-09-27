// import React from "react";
// import {
//   User,
//   GraduationCap,
//   Calendar,
//   X,
//   Phone,
//   MapPin,
//   CircleDollarSign,
//   Briefcase,
//   Users,
//   Mail,
//   BookCopy,
//   Library,
//   Award,
//   Clock,
//   BookOpen,
// } from "lucide-react";

// const AppliedJobDetailsModal = ({ open, onClose, applications }) => {
//   // Return null if the modal is not open or there are no applications to show.
//   if (!open || !applications || applications.length === 0) {
//     return null;
//   }

//   // The student information is the same for all applications in the list.
//   // We can safely take it from the first item.
//   const student = applications[0].requestTutorId || {};

//   // Helper function to format address string.
//   const formatAddress = (person) => {
//     if (!person) return "Not available";
//     const addressParts = [
//       person.area,
//       person.upazila,
//       person.district,
//       person.division,
//     ];
//     // Filter out any null or undefined parts and join them with a comma.
//     return addressParts.filter(Boolean).join(", ") || "Not available";
//   };

//   return (
//     // The main container for the modal, covering the entire screen.
//     <div
//       className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 px-4 transition-opacity duration-300 ease-out"
//       onClick={onClose} // Close modal if backdrop is clicked
//     >
//       <div
//         className="bg-slate-100 rounded-2xl shadow-2xl w-full max-w-6xl max-h-[95vh] overflow-hidden flex flex-col transition-all transform duration-400 ease-out"
//         onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside the modal
//       >
//         {/* Modal Header */}
//         <header className="flex items-center justify-between px-8 py-4 border-b border-slate-200 flex-shrink-0 bg-white">
//           <div className="flex items-center gap-4">
//             <div className="p-3 bg-gradient-to-br from-indigo-100 to-purple-100 rounded-lg">
//               <Briefcase className="w-7 h-7 text-indigo-600" />
//             </div>
//             <div>
//               <h2 className="text-2xl font-bold text-slate-800">
//                 Application Details
//               </h2>
//               <p className="text-sm text-slate-500">
//                 Review applicants for the tuition request
//               </p>
//             </div>
//           </div>
//           <button
//             className="text-slate-400 hover:text-red-500 p-2 rounded-full transition-all duration-300 hover:bg-red-100/80"
//             onClick={onClose}
//             aria-label="Close"
//           >
//             <X className="w-6 h-6" />
//           </button>
//         </header>

//         {/* Modal Body */}
//         <main className="p-6 flex-grow grid grid-cols-1 lg:grid-cols-12 gap-6 overflow-hidden">
//           {/* Left Column: Student Information (Fixed) */}
//           <aside className="lg:col-span-5 xl:col-span-4 h-full">
//             <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-200/80 h-full flex flex-col">
//               <div className="flex items-center gap-4 mb-5">
//                 <div className="flex-shrink-0 bg-gradient-to-br from-sky-100 to-blue-100 rounded-lg p-3">
//                   <User className="w-8 h-8 text-sky-600" />
//                 </div>
//                 <div>
//                   <h3 className="font-bold text-xl text-sky-800">
//                     Student Information
//                   </h3>
//                   <p className="text-sm text-slate-500">Request Details</p>
//                 </div>
//               </div>
//               <div className="space-y-3 text-slate-700 text-sm flex-grow">
//                 <div className="flex gap-3">
//                   <User className="w-4 h-4 text-sky-500 flex-shrink-0 mt-0.5" />
//                   <span className="font-semibold w-24">Name/Offer:</span>
//                   <span className="text-slate-800">
//                     {student.studentName || "N/A"}
//                   </span>
//                 </div>
//                 <div className="flex gap-3">
//                   <Phone className="w-4 h-4 text-sky-500 flex-shrink-0 mt-0.5" />
//                   <span className="font-semibold w-24">Phone:</span>
//                   <span className="text-slate-800">
//                     {student.phoneNo || "N/A"}
//                   </span>
//                 </div>
//                 <div className="flex gap-3">
//                   <Award className="w-4 h-4 text-sky-500 flex-shrink-0 mt-0.5" />
//                   <span className="font-semibold w-24">Grade:</span>
//                   <span className="text-slate-800">
//                     {student.grade || "N/A"}
//                   </span>
//                 </div>
//                 <div className="flex gap-3">
//                   <MapPin className="w-4 h-4 text-sky-500 flex-shrink-0 mt-0.5" />
//                   <span className="font-semibold w-24">Address:</span>
//                   <span className="text-slate-800">
//                     {formatAddress(student)}
//                   </span>
//                 </div>
//                 <div className="flex items-start gap-3">
//                   <BookOpen className="w-4 h-4 text-sky-500 flex-shrink-0 mt-1" />
//                   <span className="font-semibold w-24">Subjects:</span>
//                   <div className="flex flex-wrap gap-1.5">
//                     {student.subjects?.map((sub) => (
//                       <span
//                         key={sub}
//                         className="px-2.5 py-1 bg-sky-100 text-sky-800 text-xs font-medium rounded-full"
//                       >
//                         {sub}
//                       </span>
//                     ))}
//                   </div>
//                 </div>
//                 <div className="pt-4 border-t border-slate-100 mt-4 space-y-3">
//                   <div className="flex gap-3">
//                     <Calendar className="w-4 h-4 text-sky-500 flex-shrink-0 mt-0.5" />
//                     <span className="font-semibold w-24">Schedule:</span>
//                     <span className="text-slate-800">
//                       {student.days || "N/A"}
//                     </span>
//                   </div>
//                   <div className="flex gap-3">
//                     <Clock className="w-4 h-4 text-sky-500 flex-shrink-0 mt-0.5" />
//                     <span className="font-semibold w-24">Time:</span>
//                     <span className="text-slate-800">
//                       {student.time || "N/A"}
//                     </span>
//                   </div>
//                   <div className="flex gap-3">
//                     <Users className="w-4 h-4 text-sky-500 flex-shrink-0 mt-0.5" />
//                     <span className="font-semibold w-24">Gender:</span>
//                     <span className="text-slate-800">
//                       {student.gender || "N/A"}
//                     </span>
//                   </div>
//                 </div>
//               </div>
//               <div className="mt-auto pt-4 border-t border-slate-200">
//                 <div className="flex justify-between items-center">
//                   <p className="font-semibold text-slate-600">Offered Salary</p>
//                   <p className="px-4 py-2 rounded-lg bg-green-100 text-green-800 font-bold text-lg">
//                     {student.salary ? `${student.salary} BDT` : "N/A"}
//                   </p>
//                 </div>
//               </div>
//             </div>
//           </aside>

//           {/* Right Column: Applied Tutors List (Scrollable) */}
//           <section className="lg:col-span-7 xl:col-span-8 flex flex-col min-h-0">
//             <div className="flex items-center gap-4 mb-5 flex-shrink-0">
//               <div className="p-3 bg-gradient-to-br from-purple-100 to-violet-100 rounded-lg">
//                 <Users className="w-7 h-7 text-purple-600" />
//               </div>
//               <h3 className="font-bold text-xl text-purple-800">
//                 Tutor Applicants ({applications.length})
//               </h3>
//             </div>
//             <div className="flex-grow space-y-4 overflow-y-auto pr-3 -mr-3">
//               {applications.map((app) => {
//                 const tutor = app.tutorId || {};
//                 return (
//                   <div
//                     key={app._id}
//                     className="bg-white rounded-xl p-5 shadow-sm border border-slate-200/80 transition-all duration-300 hover:shadow-lg hover:border-purple-300 hover:-translate-y-1"
//                   >
//                     <div className="flex justify-between items-start mb-4">
//                       <div className="flex items-center gap-4">
//                         <div className="p-3 bg-slate-100 rounded-full">
//                           <GraduationCap className="w-7 h-7 text-slate-600" />
//                         </div>
//                         <div>
//                           <p className="font-bold text-lg text-slate-800">
//                             {tutor.name || "N/A"}
//                           </p>
//                           <p className="text-sm text-slate-500">
//                             Tutor Applicant
//                           </p>
//                           <p className="text-sm text-slate-500">
//                             <span className="text-black font-bold">
//                               Gender:
//                             </span>{" "}
//                             {tutor.gender || "N/A"}
//                           </p>
//                           <p className="text-md text-slate-900">
//                             <span className="text-black font-bold">Phone:</span>{" "}
//                             {tutor.phone || "N/A"}
//                           </p>
//                         </div>
//                       </div>

//                       {/* === MODIFIED SECTION START === */}
//                       <div className="text-right">
//                         <div className="flex items-center gap-2 justify-end mb-2">
//                           <p className="text-md font-bold text-gray-900">
//                             Score
//                           </p>
//                           <p className="font-bold bg-gray-700 px-4 rounded-2xl text-base text-slate-50">
//                             {tutor.score === "" || tutor.score == null
//                               ? "N/A"
//                               : tutor.score}
//                           </p>
//                         </div>
//                         <div className="mt-1">
//                           <p className="text-xs text-slate-500">Expects</p>
//                           <p className="font-bold text-base text-amber-700">
//                             {app.expectedSalary
//                               ? `${app.expectedSalary} BDT`
//                               : "N/A"}
//                           </p>
//                         </div>
//                       </div>
//                       {/* === MODIFIED SECTION END === */}
//                     </div>

//                     <div className="space-y-4">
//                       {/* Preferred Subjects */}
//                       {tutor.preferredSubjects?.length > 0 && (
//                         <div className="pt-3 border-t border-slate-100">
//                           <h4 className="font-semibold text-slate-600 text-sm mb-2">
//                             Preferred Subjects
//                           </h4>
//                           <div className="flex flex-wrap gap-2">
//                             {tutor.preferredSubjects.map((subject) => (
//                               <span
//                                 key={subject}
//                                 className="px-3 py-1 bg-slate-100 text-slate-700 text-xs font-medium rounded-full"
//                               >
//                                 {subject}
//                               </span>
//                             ))}
//                           </div>
//                         </div>
//                       )}

//                       {/* Suitable Upazila/Thana */}
//                       <div className="pt-3 border-t border-slate-100">
//                         <h4 className="font-semibold text-slate-600 text-sm mb-2">
//                           Suitable Upazila/Thana
//                         </h4>
//                         <div className="flex flex-wrap gap-2">
//                           {Array.isArray(tutor.suitableUpazilla) &&
//                           tutor.suitableUpazilla.length > 0 ? (
//                             tutor.suitableUpazilla.map((item, idx) => (
//                               <span
//                                 key={item + idx}
//                                 className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-xs font-medium"
//                               >
//                                 {item}
//                               </span>
//                             ))
//                           ) : (
//                             <span className="text-gray-500 text-xs">N/A</span>
//                           )}
//                         </div>
//                       </div>

//                       {/* Suitable Area */}
//                       <div className="pt-3 border-t border-slate-100">
//                         <h4 className="font-semibold text-slate-600 text-sm mb-2">
//                           Suitable Area
//                         </h4>
//                         <div className="flex flex-wrap gap-2">
//                           {Array.isArray(tutor.suitableArea) &&
//                           tutor.suitableArea.length > 0 ? (
//                             tutor.suitableArea.map((item, idx) => (
//                               <span
//                                 key={item + idx}
//                                 className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-xs font-medium"
//                               >
//                                 {item}
//                               </span>
//                             ))
//                           ) : (
//                             <span className="text-gray-500 text-xs">N/A</span>
//                           )}
//                         </div>
//                       </div>

//                       {/* Education Section */}
//                       {tutor.educationSections?.filter(
//                         (edu) => edu.examination?.trim() !== ""
//                       ).length > 0 && (
//                         <div className="pt-3 border-t border-slate-100">
//                           <h4 className="font-semibold text-slate-600 text-sm mb-2">
//                             Educational Qualifications
//                           </h4>
//                           <ul className="space-y-2 text-xs">
//                             {tutor.educationSections
//                               .filter(
//                                 (edu) =>
//                                   edu.examination &&
//                                   edu.examination.trim() !== ""
//                               )
//                               .map((edu, index) => (
//                                 <li
//                                   key={index}
//                                   className="p-2.5 bg-slate-50 rounded-md"
//                                 >
//                                   <p className="font-bold text-slate-700">
//                                     {edu.examination}
//                                   </p>
//                                   <p className="text-slate-600">
//                                     {edu.institution}
//                                   </p>
//                                   <div className="flex justify-between text-slate-500 mt-1">
//                                     <span>
//                                       {edu.groupSubject || edu.department}
//                                     </span>
//                                     <span className="font-medium">
//                                       {edu.gpa && `GPA: ${edu.gpa}`}
//                                       {edu.cgpa && `CGPA: ${edu.cgpa}`}
//                                     </span>
//                                   </div>
//                                 </li>
//                               ))}
//                           </ul>
//                         </div>
//                       )}
//                     </div>

//                     <div className="flex justify-between items-center mt-5 pt-4 border-t border-slate-200">
//                       <div className="flex items-center gap-2 text-xs text-slate-500">
//                         <Calendar className="w-3 h-3" />
//                         <span>Applied on:</span>
//                         <span className="font-medium">
//                           {app.createdAt
//                             ? new Date(app.createdAt).toLocaleDateString(
//                                 "en-GB",
//                                 {
//                                   day: "numeric",
//                                   month: "short",
//                                   year: "numeric",
//                                 }
//                               )
//                             : "N/A"}
//                         </span>
//                       </div>
//                     </div>
//                   </div>
//                 );
//               })}
//             </div>
//           </section>
//         </main>
//       </div>
//     </div>
//   );
// };

// export default AppliedJobDetailsModal;

import React, { useState, useMemo } from "react";
import {
  User,
  GraduationCap,
  Calendar,
  X,
  Phone,
  MapPin,
  CircleDollarSign,
  Briefcase,
  Users,
  Mail,
  BookCopy,
  Library,
  Award,
  Clock,
  BookOpen,
} from "lucide-react";

const AppliedJobDetailsModal = ({ open, onClose, applications }) => {
  const [sortOrder, setSortOrder] = useState("high-to-low"); // Default sort order

  // Memoize sorted applications to avoid re-sorting on every render
  const sortedApplications = useMemo(() => {
    if (!applications) return [];
    // Create a mutable copy for sorting
    const applicationsCopy = [...applications];

    applicationsCopy.sort((a, b) => {
      // Handle cases where score might be null, undefined, or not a number
      const scoreA = a.tutorId?.score ?? -1;
      const scoreB = b.tutorId?.score ?? -1;

      if (sortOrder === "high-to-low") {
        return scoreB - scoreA; // Sort descending
      } else {
        return scoreA - scoreB; // Sort ascending
      }
    });

    return applicationsCopy;
  }, [applications, sortOrder]);

  // Return null if the modal is not open or there are no applications to show.
  if (!open || !applications || applications.length === 0) {
    return null;
  }

  // The student information is the same for all applications in the list.
  // We can safely take it from the first item.
  const student = applications[0].requestTutorId || {};

  // Helper function to format address string.
  const formatAddress = (person) => {
    if (!person) return "Not available";

    // Check if address field exists and is not empty
    if (person.address && person.address.trim() !== "") {
      return person.address;
    }

    // If address is not available, return admin message
    return "Admin not set address";
  };

  return (
    // The main container for the modal, covering the entire screen.
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 px-4 transition-opacity duration-300 ease-out"
      onClick={onClose} // Close modal if backdrop is clicked
    >
      <div
        className="bg-slate-100 rounded-2xl shadow-2xl w-full max-w-6xl max-h-[95vh] overflow-hidden flex flex-col transition-all transform duration-400 ease-out"
        onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside the modal
      >
        {/* Modal Header */}
        <header className="flex items-center justify-between px-8 py-4 border-b border-slate-200 flex-shrink-0 bg-white">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-gradient-to-br from-indigo-100 to-purple-100 rounded-lg">
              <Briefcase className="w-7 h-7 text-indigo-600" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-slate-800">
                Application Details
              </h2>
              <p className="text-sm text-slate-500">
                Review applicants for the tuition request
              </p>
            </div>
          </div>
          <button
            className="text-slate-400 hover:text-red-500 p-2 rounded-full transition-all duration-300 hover:bg-red-100/80"
            onClick={onClose}
            aria-label="Close"
          >
            <X className="w-6 h-6" />
          </button>
        </header>

        {/* Modal Body */}
        <main className="p-6 flex-grow grid grid-cols-1 lg:grid-cols-12 gap-6 overflow-hidden">
          {/* Left Column: Student Information (Fixed) */}
          <aside className="lg:col-span-5 xl:col-span-4 h-full">
            <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-200/80 h-full flex flex-col">
              <div className="flex items-center gap-4 mb-5">
                <div className="flex-shrink-0 bg-gradient-to-br from-sky-100 to-blue-100 rounded-lg p-3">
                  <User className="w-8 h-8 text-sky-600" />
                </div>
                <div>
                  <h3 className="font-bold text-xl text-sky-800">
                    Student Information
                  </h3>
                  <p className="text-sm text-slate-500">Request Details</p>
                </div>
              </div>
              <div className="space-y-3 text-slate-700 text-sm flex-grow">
                <div className="flex gap-3">
                  <User className="w-4 h-4 text-sky-500 flex-shrink-0 mt-0.5" />
                  <span className="font-semibold w-24">Name/Offer:</span>
                  <span className="text-slate-800">
                    {student.studentName || "N/A"}
                  </span>
                </div>
                <div className="flex gap-3">
                  <Phone className="w-4 h-4 text-sky-500 flex-shrink-0 mt-0.5" />
                  <span className="font-semibold w-24">Phone:</span>
                  <span className="text-slate-800">
                    {student.phoneNo || "N/A"}
                  </span>
                </div>
                <div className="flex gap-3">
                  <Award className="w-4 h-4 text-sky-500 flex-shrink-0 mt-0.5" />
                  <span className="font-semibold w-24">Grade:</span>
                  <span className="text-slate-800">
                    {student.grade || "N/A"}
                  </span>
                </div>
                <div className="flex gap-3">
                  <MapPin className="w-4 h-4 text-sky-500 flex-shrink-0 mt-0.5" />
                  <span className="font-semibold w-24">Address:</span>
                  <span className="text-slate-800">
                    {formatAddress(student)}
                  </span>
                </div>
                <div className="flex items-start gap-3">
                  <BookOpen className="w-4 h-4 text-sky-500 flex-shrink-0 mt-1" />
                  <span className="font-semibold w-24">Subjects:</span>
                  <div className="flex flex-wrap gap-1.5">
                    {student.subjects?.map((sub) => (
                      <span
                        key={sub}
                        className="px-2.5 py-1 bg-sky-100 text-sky-800 text-xs font-medium rounded-full"
                      >
                        {sub}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="pt-4 border-t border-slate-100 mt-4 space-y-3">
                  <div className="flex gap-3">
                    <Calendar className="w-4 h-4 text-sky-500 flex-shrink-0 mt-0.5" />
                    <span className="font-semibold w-24">Schedule:</span>
                    <span className="text-slate-800">
                      {student.days || "N/A"}
                    </span>
                  </div>
                  <div className="flex gap-3">
                    <Clock className="w-4 h-4 text-sky-500 flex-shrink-0 mt-0.5" />
                    <span className="font-semibold w-24">Time:</span>
                    <span className="text-slate-800">
                      {student.time || "N/A"}
                    </span>
                  </div>
                  <div className="flex gap-3">
                    <Users className="w-4 h-4 text-sky-500 flex-shrink-0 mt-0.5" />
                    <span className="font-semibold w-24">Gender:</span>
                    <span className="text-slate-800">
                      {student.gender || "N/A"}
                    </span>
                  </div>
                </div>
              </div>
              <div className="mt-auto pt-4 border-t border-slate-200">
                <div className="flex justify-between items-center">
                  <p className="font-semibold text-slate-600">Offered Salary</p>
                  <p className="px-4 py-2 rounded-lg bg-green-100 text-green-800 font-bold text-lg">
                    {student.salary ? `${student.salary} BDT` : "N/A"}
                  </p>
                </div>
              </div>
            </div>
          </aside>

          {/* Right Column: Applied Tutors List (Scrollable) */}
          <section className="lg:col-span-7 xl:col-span-8 flex flex-col min-h-0">
            <div className="flex items-center justify-between gap-4 mb-5 flex-shrink-0">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-gradient-to-br from-purple-100 to-violet-100 rounded-lg">
                  <Users className="w-7 h-7 text-purple-600" />
                </div>
                <h3 className="font-bold text-xl text-purple-800">
                  Tutor Applicants ({applications.length})
                </h3>
              </div>

              {/* === SORTING DROPDOWN ADDED HERE === */}
              <div className="flex items-center gap-2">
                <label
                  htmlFor="sort-order"
                  className="text-sm font-medium text-slate-600"
                >
                  Sort by Score:
                </label>
                <select
                  id="sort-order"
                  value={sortOrder}
                  onChange={(e) => setSortOrder(e.target.value)}
                  className="bg-white border border-slate-300 rounded-md shadow-sm px-3 py-1 text-sm focus:ring-indigo-500 focus:border-indigo-500"
                >
                  <option value="high-to-low">High to Low</option>
                  <option value="low-to-high">Low to High</option>
                </select>
              </div>
            </div>
            <div className="flex-grow space-y-4 overflow-y-auto pr-3 -mr-3">
              {sortedApplications.map((app) => {
                const tutor = app.tutorId || {};
                return (
                  <div
                    key={app._id}
                    className="bg-white rounded-xl p-5 shadow-sm border border-slate-200/80 transition-all duration-300 hover:shadow-lg hover:border-purple-300 hover:-translate-y-1"
                  >
                    <div className="flex justify-between items-start mb-4">
                      <div className="flex items-center gap-4">
                        <div className="p-3 bg-slate-100 rounded-full">
                          <GraduationCap className="w-7 h-7 text-slate-600" />
                        </div>
                        <div>
                          <p className="font-bold text-lg text-slate-800">
                            {tutor.name || "N/A"}
                          </p>
                          <p className="text-sm text-slate-500">
                            Tutor Applicant
                          </p>
                          <p className="text-sm text-slate-500">
                            <span className="text-black font-bold">
                              Gender:
                            </span>{" "}
                            {tutor.gender || "N/A"}
                          </p>
                          <p className="text-md text-slate-900">
                            <span className="text-black font-bold">Phone:</span>{" "}
                            {tutor.phone || "N/A"}
                          </p>
                        </div>
                      </div>

                      {/* === MODIFIED SECTION START === */}
                      <div className="text-right">
                        <div className="flex items-center gap-2 justify-end mb-2">
                          <p className="text-md font-bold text-gray-900">
                            Score
                          </p>
                          <p className="font-bold bg-gray-700 px-4 rounded-2xl text-base text-slate-50">
                            {tutor.score === "" || tutor.score == null
                              ? "N/A"
                              : tutor.score}
                          </p>
                        </div>
                        <div className="mt-1">
                          <p className="text-xs text-slate-500">Expects</p>
                          <p className="font-bold text-base text-amber-700">
                            {app.expectedSalary
                              ? `${app.expectedSalary} BDT`
                              : "N/A"}
                          </p>
                        </div>
                      </div>
                      {/* === MODIFIED SECTION END === */}
                    </div>

                    <div className="space-y-4">
                      {/* Preferred Subjects */}
                      {tutor.preferredSubjects?.length > 0 && (
                        <div className="pt-3 border-t border-slate-100">
                          <h4 className="font-semibold text-slate-600 text-sm mb-2">
                            Preferred Subjects
                          </h4>
                          <div className="flex flex-wrap gap-2">
                            {tutor.preferredSubjects.map((subject) => (
                              <span
                                key={subject}
                                className="px-3 py-1 bg-slate-100 text-slate-700 text-xs font-medium rounded-full"
                              >
                                {subject}
                              </span>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* Suitable Upazila/Thana */}
                      <div className="pt-3 border-t border-slate-100">
                        <h4 className="font-semibold text-slate-600 text-sm mb-2">
                          Suitable Upazila/Thana
                        </h4>
                        <div className="flex flex-wrap gap-2">
                          {Array.isArray(tutor.suitableUpazilla) &&
                          tutor.suitableUpazilla.length > 0 ? (
                            tutor.suitableUpazilla.map((item, idx) => (
                              <span
                                key={item + idx}
                                className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-xs font-medium"
                              >
                                {item}
                              </span>
                            ))
                          ) : (
                            <span className="text-gray-500 text-xs">N/A</span>
                          )}
                        </div>
                      </div>

                      {/* Suitable Area */}
                      <div className="pt-3 border-t border-slate-100">
                        <h4 className="font-semibold text-slate-600 text-sm mb-2">
                          Suitable Area
                        </h4>
                        <div className="flex flex-wrap gap-2">
                          {Array.isArray(tutor.suitableArea) &&
                          tutor.suitableArea.length > 0 ? (
                            tutor.suitableArea.map((item, idx) => (
                              <span
                                key={item + idx}
                                className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-xs font-medium"
                              >
                                {item}
                              </span>
                            ))
                          ) : (
                            <span className="text-gray-500 text-xs">N/A</span>
                          )}
                        </div>
                      </div>

                      {/* Education Section */}
                      {tutor.educationSections?.filter(
                        (edu) => edu.examination?.trim() !== ""
                      ).length > 0 && (
                        <div className="pt-3 border-t border-slate-100">
                          <h4 className="font-semibold text-slate-600 text-sm mb-2">
                            Educational Qualifications
                          </h4>
                          <ul className="space-y-2 text-xs">
                            {tutor.educationSections
                              .filter(
                                (edu) =>
                                  edu.examination &&
                                  edu.examination.trim() !== ""
                              )
                              .map((edu, index) => (
                                <li
                                  key={index}
                                  className="p-2.5 bg-slate-50 rounded-md"
                                >
                                  <p className="font-bold text-slate-700">
                                    {edu.examination}
                                  </p>
                                  <p className="text-slate-600">
                                    {edu.institution}
                                  </p>
                                  <div className="flex justify-between text-slate-500 mt-1">
                                    <span>
                                      {edu.groupSubject || edu.department}
                                    </span>
                                    <span className="font-medium">
                                      {edu.gpa && `GPA: ${edu.gpa}`}
                                      {edu.cgpa && `CGPA: ${edu.cgpa}`}
                                    </span>
                                  </div>
                                </li>
                              ))}
                          </ul>
                        </div>
                      )}
                    </div>

                    <div className="flex justify-between items-center mt-5 pt-4 border-t border-slate-200">
                      <div className="flex items-center gap-2 text-xs text-slate-500">
                        <Calendar className="w-3 h-3" />
                        <span>Applied on:</span>
                        <span className="font-medium">
                          {app.createdAt
                            ? new Date(app.createdAt).toLocaleDateString(
                                "en-GB",
                                {
                                  day: "numeric",
                                  month: "short",
                                  year: "numeric",
                                }
                              )
                            : "N/A"}
                        </span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </section>
        </main>
      </div>
    </div>
  );
};

export default AppliedJobDetailsModal;
