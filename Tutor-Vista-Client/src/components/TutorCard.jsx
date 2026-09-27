import React from "react";
import { motion } from "framer-motion";
import { MapPin } from "lucide-react";
import Button from "./Common/Button";
import MaleAvatar from "../assets/Avatar/MaleAvatar.jpg";
import FemaleAvatar from "../assets/Avatar/FemaleAvatar.jpg";

const TutorCard = ({ tutor, onDetailsClick, truncateText }) => {
  const cardVariants = {
    hidden: { opacity: 0, y: 50, scale: 0.9 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { type: "spring", stiffness: 100, damping: 15 },
    },
  };

  let subjectDisplay;
  if (
    Array.isArray(tutor.preferredSubjects) &&
    tutor.preferredSubjects.length > 0
  ) {
    subjectDisplay = tutor.preferredSubjects[0];
    if (tutor.preferredSubjects.length > 1) {
      subjectDisplay += " +more";
    }
  } else {
    subjectDisplay = tutor.educationSections?.[0]?.groupSubject || "Subject";
  }

  return (
    <motion.div
      variants={cardVariants}
      className="group relative w-full max-w-xs mx-auto"
    >
      <div className="relative pt-14">
        {/* Card Background */}
        <div className="bg-blue-100 rounded-2xl shadow-lg group-hover:shadow-xl transition-shadow duration-300 p-6 pt-20 text-center flex flex-col h-full">
          {/* Tutor Info */}
          <div className="flex-grow">
            <h3 className="text-xl font-bold text-gray-800 leading-tight">
              {tutor.name}
            </h3>
            <p className="text-sm text-gray-600 mt-1">
              {(() => {
                // Filter out empty or null institution values
                const validInstitutions = Array.isArray(tutor.educationSections)
                  ? tutor.educationSections.filter(
                      (ed) => ed.institution && ed.institution.trim() !== ""
                    )
                  : [];
                // Show the last valid institution if exists, otherwise fallback
                return truncateText(
                  validInstitutions.length > 0
                    ? validInstitutions[validInstitutions.length - 1]
                        .institution
                    : "University Name",
                  30
                );
              })()}
            </p>
            <p className="text-lg font-semibold text-blue-800 mt-1">
              {truncateText(subjectDisplay, 20)}
            </p>
          </div>

          {/* Location Section - Full Width with White BG */}
          <div className="bg-white rounded-lg py-2 px-4 mt-4 flex items-center justify-center w-full shadow-sm">
            <MapPin className="w-5 h-5 text-blue-600 mr-2" />
            <span className="text-base font-semibold text-blue-800">
              {tutor.district || "Location"}
            </span>
          </div>

          {/* Details Button */}
          <div className="mt-6">
            <Button onClick={() => onDetailsClick(tutor)}>Details</Button>
          </div>
        </div>

        {/* Profile Image - Overlapping */}
        <div className="absolute top-0 left-1/2 transform -translate-x-1/2">
          <div className="w-28 h-28 rounded-full shadow-lg border-4 border-blue-100 overflow-hidden transition-transform duration-300 group-hover:scale-110">
            <img
              src={
                tutor.profileImage?.url
                  ? tutor.profileImage.url
                  : tutor.gender && tutor.gender.toLowerCase() === "female"
                  ? FemaleAvatar
                  : MaleAvatar
              }
              alt={tutor.name}
              className="w-full h-full object-cover rounded-full"
              onError={(e) => {
                e.target.onerror = null;
                e.target.src =
                  tutor.gender && tutor.gender.toLowerCase() === "female"
                    ? FemaleAvatar
                    : MaleAvatar;
              }}
            />
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default TutorCard;
