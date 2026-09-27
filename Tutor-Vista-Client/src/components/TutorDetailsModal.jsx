import React from "react";
import { Link } from "react-router-dom";
import {
  GraduationCap,
  BookOpen,
  MapPin,
  Calendar,
  Award,
  ShieldCheck,
  Star,
  CheckCircle2,
  DollarSign,
  User,
  ArrowRight,
} from "lucide-react";
import { Modal } from "./ui/Modal";
import { Button } from "./ui/Button";
import { Badge } from "./ui/Badge";
import MaleAvatar from "../assets/Avatar/MaleAvatar.jpg";
import FemaleAvatar from "../assets/Avatar/FemaleAvatar.jpg";

const TutorDetailsModal = ({ showModal, setShowModal, selectedTutor }) => {
  if (!showModal || !selectedTutor) return null;

  const validInstitutions = Array.isArray(selectedTutor.educationSections)
    ? selectedTutor.educationSections.filter(
        (ed) => ed.institution && ed.institution.trim() !== ""
      )
    : [];

  const topInstitution =
    validInstitutions.length > 0
      ? validInstitutions[validInstitutions.length - 1].institution
      : "Reputable Institution";

  const avatarSrc =
    selectedTutor.profileImage?.url ||
    (selectedTutor.gender && selectedTutor.gender.toLowerCase() === "female"
      ? FemaleAvatar
      : MaleAvatar);

  return (
    <Modal
      isOpen={showModal}
      onClose={() => setShowModal(false)}
      title="Verified Tutor Profile"
      subtitle="Complete educational credentials and tutoring preferences"
      maxWidth="max-w-2xl"
      footer={
        <div className="flex items-center justify-between w-full">
          <div>
            <span className="text-[11px] text-[#5B5F73]">Expected Remuneration</span>
            <p className="text-base font-bold text-[#1A1D29]">
              ৳{selectedTutor.expectedSalary || "Negotiable"}
              <span className="text-xs font-normal text-[#5B5F73]">/mo</span>
            </p>
          </div>
          <div className="flex items-center gap-2">
            <Button
              variant="secondary"
              size="md"
              onClick={() => setShowModal(false)}
            >
              Close
            </Button>
            <Link to="/request-tutor">
              <Button variant="primary" size="md" iconRight={ArrowRight}>
                Hire This Tutor
              </Button>
            </Link>
          </div>
        </div>
      }
    >
      <div className="space-y-6">
        {/* Tutor Identity Card */}
        <div className="flex flex-col sm:flex-row items-center sm:items-start gap-4 p-4 rounded-md bg-[#F7F8FB] border border-[#E4E6EE]">
          <div className="w-20 h-20 rounded-full overflow-hidden border-2 border-[#3730E0]/30 shrink-0 bg-white shadow-xs">
            <img
              src={avatarSrc}
              alt={selectedTutor.name}
              className="w-full h-full object-cover"
              onError={(e) => {
                e.target.onerror = null;
                e.target.src =
                  selectedTutor.gender && selectedTutor.gender.toLowerCase() === "female"
                    ? FemaleAvatar
                    : MaleAvatar;
              }}
            />
          </div>

          <div className="flex-1 text-center sm:text-left space-y-1">
            <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2">
              <h3 className="text-lg font-bold text-[#1A1D29]">
                {selectedTutor.name}
              </h3>
              <Badge variant="success" size="sm" icon={ShieldCheck}>
                Verified
              </Badge>
              <div className="flex items-center gap-1 text-xs font-bold text-[#D97706] bg-[#FEF3C7] px-2 py-0.5 rounded-full">
                <Star className="w-3 h-3 fill-current text-[#F5A524]" />
                <span>4.9 / 5.0</span>
              </div>
            </div>

            <p className="text-xs text-[#5B5F73] flex items-center justify-center sm:justify-start gap-1 font-medium">
              <GraduationCap className="w-4 h-4 text-[#3730E0] shrink-0" />
              <span>{topInstitution}</span>
            </p>

            <div className="flex flex-wrap items-center justify-center sm:justify-start gap-3 pt-1 text-xs text-[#5B5F73]">
              <span className="flex items-center gap-1">
                <User className="w-3.5 h-3.5 text-[#3730E0]" />
                {selectedTutor.gender || "Gender N/A"}
              </span>
              <span>•</span>
              <span className="flex items-center gap-1">
                <MapPin className="w-3.5 h-3.5 text-[#0EA5A0]" />
                {selectedTutor.district || selectedTutor.area || "Bangladesh"}
              </span>
            </div>
          </div>
        </div>

        {/* Educational Credentials */}
        {selectedTutor.educationSections && selectedTutor.educationSections.length > 0 && (
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#5B5F73] mb-2.5 flex items-center gap-1.5">
              <Award className="w-4 h-4 text-[#3730E0]" />
              <span>Educational Qualifications</span>
            </h4>
            <div className="border border-[#E4E6EE] rounded-md overflow-x-auto">
              <table className="w-full text-xs text-left">
                <thead className="bg-[#F7F8FB] border-b border-[#E4E6EE] text-[#5B5F73]">
                  <tr>
                    <th className="py-2.5 px-3 font-semibold">Degree / Level</th>
                    <th className="py-2.5 px-3 font-semibold">Institution</th>
                    <th className="py-2.5 px-3 font-semibold">Group / Subject</th>
                    <th className="py-2.5 px-3 font-semibold">Year</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#E4E6EE]">
                  {selectedTutor.educationSections.map((edu, idx) => (
                    <tr key={idx} className="hover:bg-[#F7F8FB]/50">
                      <td className="py-2.5 px-3 font-medium text-[#1A1D29]">
                        {edu.degree || edu.examTitle || `Education ${idx + 1}`}
                      </td>
                      <td className="py-2.5 px-3 text-[#5B5F73]">
                        {edu.institution || "N/A"}
                      </td>
                      <td className="py-2.5 px-3 text-[#5B5F73]">
                        {edu.groupSubject || edu.department || "N/A"}
                      </td>
                      <td className="py-2.5 px-3 text-[#5B5F73]">
                        {edu.passingYear || "N/A"}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Preferred Subjects */}
        <div>
          <h4 className="text-xs font-bold uppercase tracking-wider text-[#5B5F73] mb-2 flex items-center gap-1.5">
            <BookOpen className="w-4 h-4 text-[#3730E0]" />
            <span>Preferred Subjects</span>
          </h4>
          <div className="flex flex-wrap gap-1.5">
            {Array.isArray(selectedTutor.preferredSubjects) && selectedTutor.preferredSubjects.length > 0 ? (
              selectedTutor.preferredSubjects.map((sub, i) => (
                <span
                  key={i}
                  className="px-2.5 py-1 text-xs font-medium rounded-sm bg-[#EEEDFD] text-[#3730E0] border border-[#DDD9FC]"
                >
                  {sub}
                </span>
              ))
            ) : (
              <span className="text-xs text-[#5B5F73]">All general academic subjects</span>
            )}
          </div>
        </div>

        {/* Preferred Classes & Mediums */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="p-3.5 rounded-md bg-[#F7F8FB] border border-[#E4E6EE]">
            <span className="block text-[11px] font-bold text-[#5B5F73] uppercase mb-1">
              Preferred Classes
            </span>
            <p className="text-xs text-[#1A1D29] font-medium">
              {Array.isArray(selectedTutor.preferredClasses) && selectedTutor.preferredClasses.length > 0
                ? selectedTutor.preferredClasses.join(", ")
                : "Primary to Higher Secondary"}
            </p>
          </div>
          <div className="p-3.5 rounded-md bg-[#F7F8FB] border border-[#E4E6EE]">
            <span className="block text-[11px] font-bold text-[#5B5F73] uppercase mb-1">
              Preferred Medium
            </span>
            <p className="text-xs text-[#1A1D29] font-medium">
              {Array.isArray(selectedTutor.preferredMediums) && selectedTutor.preferredMediums.length > 0
                ? selectedTutor.preferredMediums.join(", ")
                : "Bangla & English Medium"}
            </p>
          </div>
        </div>

        {/* Experience & Bio */}
        {selectedTutor.experience && (
          <div className="p-3.5 rounded-md bg-white border border-[#E4E6EE]">
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#5B5F73] mb-1">
              Tutoring Experience & Methodology
            </h4>
            <p className="text-xs text-[#1A1D29] leading-relaxed whitespace-pre-line">
              {selectedTutor.experience}
            </p>
          </div>
        )}
      </div>
    </Modal>
  );
};

export default TutorDetailsModal;
