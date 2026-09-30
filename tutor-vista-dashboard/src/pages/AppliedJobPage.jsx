// src/pages/AppliedJobPage.jsx
import React, { useEffect, useState } from "react";
import { Eye, Trash2, Search, Briefcase, User, Phone, CheckCircle2 } from "lucide-react";
import ApiService from "../services/api";
import DeleteConfirm from "../components/DeleteConfirm";
import AppliedJobDetailsModal from "../components/AppliedJobDetailsModal";
import { SkeletonTable } from "../components/ui/Skeleton";
import { EmptyState } from "../components/ui/EmptyState";
import { Pagination } from "../components/ui/Pagination";
import { Badge } from "../components/ui/Badge";

const AppliedJobPage = () => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedApplications, setSelectedApplications] = useState([]);
  const [showDetails, setShowDetails] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    fetchJobs();
  }, []);

  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm]);

  const fetchJobs = async () => {
    setLoading(true);
    try {
      const res = await ApiService.getAllAppliedJobs();
      setJobs(res.data || []);
    } catch (err) {
      console.error("Failed to fetch jobs:", err);
    }
    setLoading(false);
  };

  const handleView = (clickedJob) => {
    const relatedApplications = jobs.filter(
      (j) => j.requestTutorId?._id === clickedJob.requestTutorId?._id
    );
    setSelectedApplications(relatedApplications);
    setShowDetails(true);
  };

  const handleDelete = (id) => {
    DeleteConfirm().handleDelete({
      onDelete: async () => {
        await ApiService.deleteAppliedJob(id);
        setJobs((prev) => prev.filter((j) => j._id !== id));
      },
      itemName: "Applied Job",
      itemType: "applied job",
      customMessage: "Are you sure you want to remove this job application?",
    });
  };

  const sortedJobs = [...jobs].sort(
    (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
  );

  const filteredJobs = sortedJobs.filter(
    (job) =>
      job.requestTutorId?.studentName
        ?.toLowerCase()
        .includes(searchTerm.toLowerCase()) ||
      job.tutorId?.name?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const itemsPerPage = 8;
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentJobs = filteredJobs.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredJobs.length / itemsPerPage);

  return (
    <div className="space-y-6">
      {/* Header and Search Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-xl sm:text-2xl font-extrabold text-[#1A1D29] tracking-tight">
              Tutor Job Applications
            </h2>
            <span className="text-[11px] font-bold text-[#3730E0] bg-[#EEEDFD] px-2.5 py-0.5 rounded-full border border-[#DDD9FC]">
              {jobs.length} Applied
            </span>
          </div>
          <p className="text-xs sm:text-sm text-[#5B5F73] mt-0.5">
            Monitor educator submissions for open tuition positions.
          </p>
        </div>

        <div className="relative w-full sm:w-72">
          <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-[#5B5F73]">
            <Search className="w-4 h-4" />
          </div>
          <input
            type="text"
            className="w-full pl-10 pr-4 py-2 bg-white border border-[#E4E6EE] rounded-xl text-xs sm:text-sm text-[#1A1D29] placeholder:text-[#5B5F73]/60 focus:outline-none focus:border-[#3730E0] focus:ring-2 focus:ring-[#3730E0]/15 transition-all shadow-xs"
            placeholder="Search by student or tutor..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      {/* Main Table */}
      {loading ? (
        <SkeletonTable rows={6} cols={5} />
      ) : filteredJobs.length === 0 ? (
        <EmptyState
          icon={Briefcase}
          title="No Job Applications Found"
          description={
            searchTerm
              ? `No applications matched "${searchTerm}". Try searching with another name.`
              : "No tutors have applied to tuition jobs yet."
          }
          actionLabel={searchTerm ? "Clear Search" : undefined}
          onAction={() => setSearchTerm("")}
        />
      ) : (
        <div className="bg-white rounded-2xl border border-[#E4E6EE] shadow-xs overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead className="bg-[#F7F8FB] border-b border-[#E4E6EE] text-[11px] font-bold uppercase tracking-wider text-[#5B5F73]">
                <tr>
                  <th className="py-3.5 px-4">Tuition / Student</th>
                  <th className="py-3.5 px-4">Student Contact</th>
                  <th className="py-3.5 px-4">Applicant Tutor</th>
                  <th className="py-3.5 px-4">Expected Salary</th>
                  <th className="py-3.5 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#E4E6EE] text-xs sm:text-sm text-[#1A1D29]">
                {currentJobs.map((job) => (
                  <tr
                    key={job._id}
                    className="hover:bg-[#F7F8FB]/60 transition-colors group"
                  >
                    {/* Student Column */}
                    <td className="py-3.5 px-4">
                      <div className="flex items-center gap-2.5">
                        <div className="w-8 h-8 rounded-lg bg-[#EEEDFD] text-[#3730E0] flex items-center justify-center font-bold text-xs shrink-0">
                          {(job.requestTutorId?.studentName || "S").charAt(0).toUpperCase()}
                        </div>
                        <div className="min-w-0">
                          <p className="font-bold text-[#1A1D29] truncate">
                            {job.requestTutorId?.studentName || "Student Request"}
                          </p>
                          <p className="text-[11px] text-[#5B5F73]">
                            {job.requestTutorId?.grade || job.requestTutorId?.class || "General"}
                          </p>
                        </div>
                      </div>
                    </td>

                    {/* Student Phone */}
                    <td className="py-3.5 px-4">
                      <p className="font-semibold text-[#1A1D29]">
                        {job.requestTutorId?.phoneNo || "N/A"}
                      </p>
                    </td>

                    {/* Tutor Column */}
                    <td className="py-3.5 px-4">
                      <div className="flex items-center gap-2.5">
                        <div className="w-8 h-8 rounded-lg bg-[#0EA5A0]/10 text-[#0EA5A0] flex items-center justify-center font-bold text-xs shrink-0">
                          {(job.tutorId?.name || "T").charAt(0).toUpperCase()}
                        </div>
                        <div className="min-w-0">
                          <p className="font-bold text-[#1A1D29] truncate">
                            {job.tutorId?.name || "Applicant Tutor"}
                          </p>
                          <p className="text-[11px] text-[#5B5F73]">
                            {job.tutorId?.phone || "Phone N/A"}
                          </p>
                        </div>
                      </div>
                    </td>

                    {/* Expected Salary */}
                    <td className="py-3.5 px-4">
                      <span className="inline-flex items-center px-2.5 py-1 rounded-md text-xs font-bold bg-[#F0FDFA] text-[#0EA5A0] border border-[#CCFBF1]">
                        ৳{job.expectedSalary || "Negotiable"} /mo
                      </span>
                    </td>

                    {/* Actions */}
                    <td className="py-3.5 px-4 text-right whitespace-nowrap">
                      <div className="flex items-center justify-end gap-1.5">
                        <button
                          onClick={() => handleView(job)}
                          className="p-1.5 rounded-lg text-[#5B5F73] hover:text-[#3730E0] hover:bg-[#EEEDFD] transition-colors"
                          title="View Application Details"
                        >
                          <Eye className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleDelete(job._id)}
                          className="p-1.5 rounded-lg text-[#5B5F73] hover:text-[#DC2626] hover:bg-red-50 transition-colors"
                          title="Delete Application"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {totalPages > 1 && (
            <div className="p-4 border-t border-[#E4E6EE] flex items-center justify-between">
              <span className="text-xs text-[#5B5F73]">
                Showing {indexOfFirstItem + 1} to {Math.min(indexOfLastItem, filteredJobs.length)} of {filteredJobs.length} applications
              </span>
              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={(p) => setCurrentPage(p)}
              />
            </div>
          )}
        </div>
      )}

      <AppliedJobDetailsModal
        open={showDetails}
        onClose={() => setShowDetails(false)}
        applications={selectedApplications}
      />
    </div>
  );
};

export default AppliedJobPage;
