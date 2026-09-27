import React from "react";
import { MapPin, GraduationCap, Star, ShieldCheck, ArrowRight, BookOpen } from "lucide-react";
import { Card } from "./ui/Card";
import { Button } from "./ui/Button";
import MaleAvatar from "../assets/Avatar/MaleAvatar.jpg";
import FemaleAvatar from "../assets/Avatar/FemaleAvatar.jpg";

const TutorCard = ({ tutor, onDetailsClick, truncateText = (t, l) => (t && t.length > l ? t.substring(0, l) + "..." : t) }) => {
  if (!tutor) return null;

  let subjectDisplay;
  if (
    Array.isArray(tutor.preferredSubjects) &&
    tutor.preferredSubjects.length > 0
  ) {
    subjectDisplay = tutor.preferredSubjects[0];
    if (tutor.preferredSubjects.length > 1) {
      subjectDisplay += ` +${tutor.preferredSubjects.length - 1} more`;
    }
  } else {
    subjectDisplay = tutor.educationSections?.[0]?.groupSubject || "General Academic";
  }

  const validInstitutions = Array.isArray(tutor.educationSections)
    ? tutor.educationSections.filter(
        (ed) => ed.institution && ed.institution.trim() !== ""
      )
    : [];

  const institution =
    validInstitutions.length > 0
      ? validInstitutions[validInstitutions.length - 1].institution
      : "Reputable University";

  const avatarSrc =
    tutor.profileImage?.url ||
    (tutor.gender && tutor.gender.toLowerCase() === "female"
      ? FemaleAvatar
      : MaleAvatar);

  return (
    <Card
      hoverable
      className="bg-white border-[#E4E6EE] p-5 flex flex-col justify-between h-full group transition-all duration-200"
    >
      <div>
        {/* Top Header: Avatar, Verified Badge, Rating */}
        <div className="flex items-start justify-between gap-3 mb-4">
          <div className="relative">
            <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-[#3730E0]/20 bg-[#F7F8FB] shadow-xs">
              <img
                src={avatarSrc}
                alt={tutor.name}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src =
                    tutor.gender && tutor.gender.toLowerCase() === "female"
                      ? FemaleAvatar
                      : MaleAvatar;
                }}
              />
            </div>
            {/* Verified icon badge */}
            <div className="absolute -bottom-1 -right-1 w-5 h-5 rounded-full bg-[#16A34A] text-white flex items-center justify-center border-2 border-white shadow-xs">
              <ShieldCheck className="w-3 h-3" />
            </div>
          </div>

          <div className="flex flex-col items-end">
            <div className="flex items-center gap-1 px-2 py-0.5 rounded-full bg-[#FFFBEB] text-[#D97706] border border-[#FDE68A] text-xs font-bold">
              <Star className="w-3 h-3 fill-current text-[#F5A524]" />
              <span>4.9</span>
            </div>
            <span className="text-[10px] text-[#0EA5A0] font-semibold mt-1">
              Verified Tutor
            </span>
          </div>
        </div>

        {/* Name & Academic Institution */}
        <div className="mb-3">
          <h4 className="text-base font-bold text-[#1A1D29] tracking-tight group-hover:text-[#3730E0] transition-colors truncate">
            {tutor.name}
          </h4>
          <p className="text-xs text-[#5B5F73] flex items-center gap-1.5 mt-0.5 truncate">
            <GraduationCap className="w-3.5 h-3.5 text-[#3730E0] shrink-0" />
            <span className="truncate">{truncateText(institution, 30)}</span>
          </p>
        </div>

        {/* Subjects Expertise */}
        <div className="mb-3">
          <div className="flex items-center gap-1 text-[11px] font-semibold text-[#5B5F73] uppercase tracking-wider mb-1">
            <BookOpen className="w-3 h-3 text-[#3730E0]" />
            <span>Expertise</span>
          </div>
          <p className="text-xs font-medium text-[#3730E0] bg-[#EEEDFD] px-2 py-1 rounded-sm truncate">
            {subjectDisplay}
          </p>
        </div>

        {/* Location Pin */}
        <div className="flex items-center gap-1 text-xs text-[#5B5F73] bg-[#F7F8FB] px-2.5 py-1.5 rounded-sm border border-[#E4E6EE] mb-4">
          <MapPin className="w-3.5 h-3.5 text-[#0EA5A0] shrink-0" />
          <span className="font-medium truncate">
            {tutor.district || tutor.area || "Bangladesh"}
          </span>
        </div>
      </div>

      {/* Action Footer */}
      <div className="pt-3 border-t border-[#E4E6EE]">
        <Button
          variant="secondary"
          size="sm"
          fullWidth
          onClick={() => onDetailsClick(tutor)}
          iconRight={ArrowRight}
        >
          View Full Profile
        </Button>
      </div>
    </Card>
  );
};

export default TutorCard;
