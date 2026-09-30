// src/components/TutorsTable.jsx
import React from "react";
import {
  Eye,
  Edit,
  Trash2,
  Mail,
  Phone,
  School,
  GraduationCap,
  MapPin,
  CheckCircle2,
  ShieldCheck,
  Building,
} from "lucide-react";
import { SkeletonTable } from "./ui/Skeleton";
import { EmptyState } from "./ui/EmptyState";
import { Badge } from "./ui/Badge";

const TutorsTable = ({ tutors, loading, onEdit, onView, onDelete, user, onClearFilters }) => {
  if (loading && tutors.length === 0) {
    return <SkeletonTable rows={8} cols={5} />;
  }

  if (tutors.length === 0) {
    return (
      <EmptyState
        icon={GraduationCap}
        title="No Tutors Found"
        description="No tutor profiles match your current search or filter parameters. Try clearing your filters to see more results."
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
              <th className="py-3.5 px-4">Tutor Profile</th>
              <th className="py-3.5 px-4">Academic Background</th>
              <th className="py-3.5 px-4">Preferred Subjects</th>
              <th className="py-3.5 px-4">Placement Status</th>
              <th className="py-3.5 px-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#E4E6EE] text-xs sm:text-sm text-[#1A1D29]">
            {tutors.map((tutor) => {
              const validEducationSections = Array.isArray(tutor.educationSections)
                ? tutor.educationSections.filter(
                    (edu) => edu.institution && edu.institution.trim() !== ""
                  )
                : [];

              const ssc = validEducationSections[0] || null;
              const hsc = validEducationSections[1] || null;
              const honours = validEducationSections[2] || null;
              const masters = validEducationSections[3] || null;

              return (
                <tr
                  key={tutor._id}
                  className="hover:bg-[#F7F8FB]/60 transition-colors group"
                >
                  {/* Tutor Profile Column */}
                  <td className="py-3.5 px-4">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-xl overflow-hidden border border-[#E4E6EE] bg-[#F7F8FB] shrink-0 flex items-center justify-center shadow-2xs">
                        {tutor?.profileImage?.url ? (
                          <img
                            src={tutor.profileImage.url}
                            alt={tutor.name}
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <div className="w-full h-full bg-[#EEEDFD] text-[#3730E0] flex items-center justify-center font-bold text-sm">
                            {tutor.name?.charAt(0).toUpperCase() || "T"}
                          </div>
                        )}
                      </div>

                      <div className="min-w-0">
                        <div className="flex items-center gap-1.5">
                          <span className="font-bold text-[#1A1D29] truncate">
                            {tutor.name}
                          </span>
                          <span className="text-[10px] text-[#5B5F73] font-medium bg-[#F7F8FB] px-1.5 py-0.5 rounded border border-[#E4E6EE]">
                            {tutor.gender?.charAt(0).toUpperCase() || "M"}
                          </span>
                        </div>

                        <div className="space-y-0.5 mt-1 text-[11px] text-[#5B5F73]">
                          <div className="flex items-center gap-1 truncate">
                            <Mail className="w-3 h-3 text-[#3730E0] shrink-0" />
                            <span className="truncate">{tutor.email || "No email"}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Phone className="w-3 h-3 text-[#16A34A] shrink-0" />
                            <span>{tutor.phone}</span>
                          </div>
                          <div className="flex items-center gap-1 truncate">
                            <MapPin className="w-3 h-3 text-[#0EA5A0] shrink-0" />
                            <span className="truncate">
                              {tutor.area || tutor.district || "Bangladesh"}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </td>

                  {/* Academic Background Column */}
                  <td className="py-3.5 px-4 max-w-[280px]">
                    <div className="space-y-1.5 text-xs">
                      {masters && (
                        <div className="flex items-center gap-1.5 truncate">
                          <GraduationCap className="w-3.5 h-3.5 text-[#3730E0] shrink-0" />
                          <span className="font-semibold text-[#1A1D29] truncate">
                            Masters: {masters.institution}
                          </span>
                          {masters.cgpa && (
                            <span className="text-[10px] font-bold text-[#16A34A] bg-[#DCFCE7] px-1.5 py-0.2 rounded shrink-0">
                              {masters.cgpa}
                            </span>
                          )}
                        </div>
                      )}

                      {honours ? (
                        <div className="flex items-center gap-1.5 truncate">
                          <Building className="w-3.5 h-3.5 text-[#0EA5A0] shrink-0" />
                          <span className="font-semibold text-[#1A1D29] truncate">
                            Honours: {honours.institution}
                          </span>
                          {honours.cgpa && (
                            <span className="text-[10px] font-bold text-[#16A34A] bg-[#DCFCE7] px-1.5 py-0.2 rounded shrink-0">
                              {honours.cgpa}
                            </span>
                          )}
                        </div>
                      ) : (
                        <div className="text-[11px] text-[#5B5F73]/70 italic">
                          Honours: Not Specified
                        </div>
                      )}

                      {hsc && (
                        <div className="flex items-center gap-1.5 text-[11px] text-[#5B5F73] truncate">
                          <School className="w-3 h-3 text-[#5B5F73] shrink-0" />
                          <span className="truncate">
                            HSC: {hsc.institution} ({hsc.passingYear || "N/A"})
                          </span>
                        </div>
                      )}
                    </div>
                  </td>

                  {/* Preferred Subjects Column */}
                  <td className="py-3.5 px-4 max-w-[180px]">
                    <div className="flex flex-wrap gap-1">
                      {(tutor.preferredSubjects || []).slice(0, 3).map((sub, idx) => (
                        <span
                          key={idx}
                          className="px-2 py-0.5 rounded text-[11px] font-medium bg-[#F7F8FB] border border-[#E4E6EE] text-[#1A1D29]"
                        >
                          {sub}
                        </span>
                      ))}
                      {(tutor.preferredSubjects || []).length > 3 && (
                        <span className="text-[10px] font-semibold text-[#5B5F73] self-center">
                          +{tutor.preferredSubjects.length - 3}
                        </span>
                      )}
                    </div>
                  </td>

                  {/* Placement Status Column */}
                  <td className="py-3.5 px-4 whitespace-nowrap">
                    {tutor.isHired ? (
                      <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold bg-[#DCFCE7] text-[#16A34A]">
                        <CheckCircle2 className="w-3 h-3" />
                        <span>Hired</span>
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold bg-[#FFFBEB] text-[#D97706] border border-[#FDE68A]">
                        <span>Available</span>
                      </span>
                    )}
                  </td>

                  {/* Actions Column */}
                  <td className="py-3.5 px-4 text-right whitespace-nowrap">
                    <div className="flex items-center justify-end gap-1.5">
                      <button
                        onClick={() => onView(tutor)}
                        className="p-1.5 rounded-lg text-[#5B5F73] hover:text-[#3730E0] hover:bg-[#EEEDFD] transition-colors"
                        title="View Full Profile"
                      >
                        <Eye className="w-4 h-4" />
                      </button>
                      {user?.role !== "user" && (
                        <>
                          <button
                            onClick={() => onEdit(tutor)}
                            className="p-1.5 rounded-lg text-[#5B5F73] hover:text-[#16A34A] hover:bg-green-50 transition-colors"
                            title="Edit Tutor"
                          >
                            <Edit className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => onDelete(tutor._id, tutor.name)}
                            className="p-1.5 rounded-lg text-[#5B5F73] hover:text-[#DC2626] hover:bg-red-50 transition-colors"
                            title="Delete Tutor"
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

export default TutorsTable;
