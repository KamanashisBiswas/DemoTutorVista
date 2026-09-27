import React, { useEffect, useState } from "react";
import { Eye, Trash2, Search } from "lucide-react";
import axios from "../lib/axios";
import DeleteConfirm from "../components/DeleteConfirm";
import AppliedJobDetailsModal from "../components/AppliedJobDetailsModal";

const AppliedJobPage = () => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedApplications, setSelectedApplications] = useState([]);
  const [showDetails, setShowDetails] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    fetchJobs();
  }, []);

  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm]);

  const fetchJobs = async () => {
    setLoading(true);
    try {
      const res = await axios.get("/api/applied-job");
      setJobs(res.data.data || []);
    } catch (err) {
      console.error("Failed to fetch jobs:", err);
    }
    setLoading(false);
  };

  const handleView = (clickedJob) => {
    // jobs তালিকা থেকে একই requestTutorId সহ সকল অ্যাপ্লিকেশন ফিল্টার করুন
    const relatedApplications = jobs.filter(
      (j) => j.requestTutorId?._id === clickedJob.requestTutorId?._id
    );
    setSelectedApplications(relatedApplications); // নতুন স্টেটে অ্যারে সেট করুন
    setShowDetails(true);
  };

  const handleDelete = (id) => {
    DeleteConfirm().handleDelete({
      onDelete: async () => {
        await axios.delete(`/api/applied-job/${id}`);
        setJobs((prev) => prev.filter((j) => j._id !== id));
      },
      itemName: "Applied Job",
      itemType: "applied job",
      customMessage: "Are you sure you want to delete this applied job?",
    });
  };

  // Sort jobs by createdAt DESCENDING (newest first)
  const sortedJobs = [...jobs].sort(
    (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
  );

  // Filter after sorting
  const filteredJobs = sortedJobs.filter(
    (job) =>
      job.requestTutorId?.studentName
        ?.toLowerCase()
        .includes(searchTerm.toLowerCase()) ||
      job.tutorId?.name?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentJobs = filteredJobs.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredJobs.length / itemsPerPage);

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-lg font-semibold text-gray-800">
            All Applied Jobs
          </h2>
          <div className="relative w-full max-w-xs">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-blue-500 focus:border-blue-500 sm:text-sm transition"
              placeholder="Search by student or tutor name..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full table-auto">
            <thead>
              <tr className="bg-gray-50">
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Student Name
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Student Phone
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Tutor Name
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Expected Salary
                </th>
                <th className="px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {loading ? (
                <tr>
                  <td colSpan={5} className="text-center py-8">
                    Loading...
                  </td>
                </tr>
              ) : filteredJobs.length === 0 ? (
                <tr>
                  <td colSpan={5} className="text-center py-8">
                    No applied jobs found.
                  </td>
                </tr>
              ) : (
                currentJobs.map((job) => (
                  <tr key={job._id} className="hover:bg-gray-50 transition">
                    <td className="px-6 py-4 whitespace-nowrap">
                      {job.requestTutorId?.studentName || "-"}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {job.requestTutorId?.phoneNo || "-"}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {job.tutorId?.name || "-"}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {job.expectedSalary || "-"} BDT
                    </td>
                    <td className="px-6 py-4 text-center whitespace-nowrap">
                      <div className="flex items-center justify-center gap-2">
                        <button
                          className="text-blue-600 hover:text-blue-800"
                          title="View"
                          onClick={() => handleView(job)}
                        >
                          <Eye size={18} />
                        </button>
                        <button
                          className="text-red-600 hover:text-red-800"
                          title="Delete"
                          onClick={() => handleDelete(job._id)}
                        >
                          <Trash2 size={18} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
        <AppliedJobDetailsModal
          open={showDetails}
          onClose={() => setShowDetails(false)}
          applications={selectedApplications}
        />

        {totalPages > 1 && (
          <div className="flex items-center justify-between px-6 py-4 bg-gradient-to-r from-gray-50 to-gray-100 border-t border-gray-200 rounded-b-xl">
            {/* Desktop Pagination */}
            <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
              <div className="flex items-center space-x-2">
                <div className="bg-blue-50 px-3 py-1 rounded-full">
                  <p className="text-sm font-medium text-blue-700">
                    Showing{" "}
                    <span className="font-bold">{indexOfFirstItem + 1}</span> to{" "}
                    <span className="font-bold">
                      {Math.min(indexOfLastItem, filteredJobs.length)}
                    </span>{" "}
                    of <span className="font-bold">{filteredJobs.length}</span>{" "}
                    results
                  </p>
                </div>
              </div>

              <div className="flex items-center space-x-2">
                <button
                  onClick={() =>
                    setCurrentPage((prev) => Math.max(prev - 1, 1))
                  }
                  disabled={currentPage === 1}
                  className={`relative inline-flex items-center px-4 py-2 text-sm font-medium rounded-lg border transition-all duration-200 ${
                    currentPage === 1
                      ? "text-gray-400 bg-gray-100 border-gray-200 cursor-not-allowed"
                      : "text-gray-700 bg-white border-gray-300 hover:bg-blue-50 hover:border-blue-300 hover:text-blue-700 hover:shadow-md"
                  }`}
                >
                  Previous
                </button>

                <div className="flex items-center space-x-1">
                  {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                    (page) => {
                      if (
                        page === 1 ||
                        page === totalPages ||
                        (page >= currentPage - 1 && page <= currentPage + 1)
                      ) {
                        return (
                          <button
                            key={page}
                            onClick={() => setCurrentPage(page)}
                            className={`relative inline-flex items-center px-4 py-2 text-sm font-medium rounded-lg border transition-all duration-200 ${
                              currentPage === page
                                ? "z-10 bg-blue-600 border-blue-600 text-white shadow-lg"
                                : "bg-white border-gray-300 text-gray-500 hover:bg-gray-50 hover:border-gray-400 hover:text-gray-700"
                            }`}
                          >
                            {page}
                          </button>
                        );
                      } else if (
                        page === currentPage - 2 ||
                        page === currentPage + 2
                      ) {
                        return (
                          <span key={page} className="px-2 py-2 text-gray-400">
                            ...
                          </span>
                        );
                      }
                      return null;
                    }
                  )}
                </div>

                <button
                  onClick={() =>
                    setCurrentPage((prev) => Math.min(prev + 1, totalPages))
                  }
                  disabled={currentPage === totalPages}
                  className={`relative inline-flex items-center px-4 py-2 text-sm font-medium rounded-lg border transition-all duration-200 ${
                    currentPage === totalPages
                      ? "text-gray-400 bg-gray-100 border-gray-200 cursor-not-allowed"
                      : "text-gray-700 bg-white border-gray-300 hover:bg-blue-50 hover:border-blue-300 hover:text-blue-700 hover:shadow-md"
                  }`}
                >
                  Next
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AppliedJobPage;
