import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import MaleAvatar from "../assets/Avatar/MaleAvatar.jpg";
import FemaleAvatar from "../assets/Avatar/FemaleAvatar.jpg";
import {
  X,
  GraduationCap,
  BookOpen,
  MapPin,
  Calendar,
  Award,
} from "lucide-react";
import Button from "./Common/Button";

const TutorDetailsModal = ({ showModal, setShowModal, selectedTutor }) => {
  const modalVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { type: "spring", damping: 25, stiffness: 300 },
    },
    exit: {
      opacity: 0,
      scale: 0.8,
      transition: { duration: 0.2 },
    },
  };

  return (
    <AnimatePresence>
      {showModal && selectedTutor && (
        <div
          className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4 backdrop-blur-sm overflow-y-auto"
          onClick={() => setShowModal(false)}
        >
          <motion.div
            className="bg-white rounded-xl max-w-3xl w-full mx-auto overflow-hidden shadow-2xl my-8"
            variants={modalVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="bg-gradient-to-r from-blue-500 to-blue-700 py-4 px-6 flex justify-between items-center sticky top-0 z-10">
              <h3 className="text-white text-xl font-bold">Tutor Details</h3>
              <button
                onClick={() => setShowModal(false)}
                className="text-white hover:bg-white/20 rounded-full p-1 transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            <div className="max-h-[calc(100vh-200px)] overflow-y-auto">
              {/* Tutor Header */}
              <div className="bg-blue-50 px-6 py-8 flex flex-col sm:flex-row items-center gap-6">
                <div className="w-32 h-40 overflow-hidden border-4 border-white shadow-lg rounded-lg">
                  <img
                    src={
                      selectedTutor.profileImage?.url
                        ? selectedTutor.profileImage.url
                        : selectedTutor.gender &&
                          selectedTutor.gender.toLowerCase() === "female"
                        ? FemaleAvatar
                        : MaleAvatar
                    }
                    alt={selectedTutor.name}
                    className="w-full h-full object-cover aspect-[4/5] max-w-full max-h-full rounded-lg"
                    style={{ objectFit: "cover" }}
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src =
                        selectedTutor.gender &&
                        selectedTutor.gender.toLowerCase() === "female"
                          ? FemaleAvatar
                          : MaleAvatar;
                    }}
                  />
                </div>
                <div className="text-center sm:text-left">
                  <h2 className="text-2xl font-bold text-gray-900">
                    {selectedTutor.name}
                  </h2>
                  <div className="flex md:items-center justify-center mb-4 sm:justify-start mt-1 text-blue-700">
                    <GraduationCap className="w-5 h-5 mr-1.5" />
                    <span className="font-medium">
                      {(() => {
                        // Filter out empty/null institution values
                        // For Honours/Masters, only count if institution is not empty
                        const validInstitutions = Array.isArray(
                          selectedTutor.educationSections
                        )
                          ? selectedTutor.educationSections.filter(
                              (ed) =>
                                ed.institution && ed.institution.trim() !== ""
                            )
                          : [];
                        // Show the last valid institution if exists, otherwise fallback
                        return validInstitutions.length > 0
                          ? validInstitutions[validInstitutions.length - 1]
                              .institution
                          : "Not specified";
                      })()}
                    </span>
                  </div>
                  <div className="mt-2 flex flex-wrap items-center gap-2 justify-start">
                    {Array.isArray(selectedTutor.preferredSubjects) &&
                      selectedTutor.preferredSubjects.map((subject, index) => (
                        <span
                          key={index}
                          className="bg-blue-100  px-3 py-1 rounded-full text-sm font-medium"
                        >
                          {subject}
                        </span>
                      ))}
                  </div>
                </div>
              </div>

              {/* Details Content */}
              <div className="p-6 space-y-6">
                {/* Education Section - 2 Column Layout */}
                <div>
                  <h4 className="text-lg font-semibold text-gray-900 mb-3 flex items-center">
                    <GraduationCap className="w-5 h-5 mr-2 text-blue-600" />{" "}
                    Education
                  </h4>
                  <div className="bg-gray-50 rounded-lg p-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {selectedTutor.educationSections
                        ?.filter(
                          (edu) =>
                            edu.institution && edu.institution.trim() !== ""
                        )
                        .map((edu, index) => (
                          <div
                            key={index}
                            className="bg-white rounded-lg p-4 border border-gray-200 shadow-sm hover:shadow-lg hover:scale-105 transition-all duration-300"
                          >
                            {/* Institution - Colored */}
                            <div className="mb-3">
                              <h5 className="text-lg font-bold text-blue-700 hover:text-blue-800 transform transition-all duration-200 cursor-default">
                                🎓 {edu.institution}
                              </h5>
                            </div>

                            {/* Examination - Colored */}
                            <div className="mb-2">
                              <p className="text-base font-semibold text-green-700 hover:text-green-800 transform transition-all duration-200 cursor-default">
                                📚 {edu.examination}
                              </p>
                            </div>

                            {/* Medium - Black */}
                            {edu.medium && (
                              <div className="mb-3">
                                <p className="text-sm font-medium text-black">
                                  🌐 {edu.medium}
                                </p>
                              </div>
                            )}

                            {/* Curriculum - Black */}
                            {edu.curriculum && (
                              <div className="mb-3">
                                <p className="text-sm font-medium text-black">
                                  📖 {edu.curriculum}
                                </p>
                              </div>
                            )}

                            {/* Subject - Black */}
                            {edu.groupSubject && (
                              <div className="mb-3">
                                <div className="inline-flex items-center group">
                                  <BookOpen className="w-4 h-4 text-black mr-2" />
                                  <span className="text-md font-bold text-black transition-all duration-300 cursor-default">
                                    {edu.groupSubject}
                                  </span>
                                </div>
                              </div>
                            )}

                            {/* Department - Black */}
                            {edu.department && (
                              <div className="mb-3">
                                <p className="text-sm font-medium text-black">
                                  🏛️ {edu.department}
                                </p>
                              </div>
                            )}

                            {/* Board - Black */}
                            {edu.board && (
                              <div className="mb-3">
                                <p className="text-sm font-medium text-black">
                                  🏛️ Board: {edu.board}
                                </p>
                              </div>
                            )}

                            {/* Year, CGPA/GPA, and Passing Year - Black */}
                            <div className="flex flex-wrap gap-2 justify-between items-center">
                              {edu.year && (
                                <span className="text-sm font-medium text-black bg-gray-100 px-2 py-1 rounded">
                                  📅 {edu.year}
                                </span>
                              )}
                              {edu.passingYear && (
                                <span className="text-sm font-medium text-black bg-blue-100 px-2 py-1 rounded">
                                  🗓️ Passed: {edu.passingYear}
                                </span>
                              )}
                            </div>
                          </div>
                        ))}
                    </div>
                  </div>
                </div>

                {/* Location Section - Full Width */}
                <div>
                  <h4 className="text-lg font-semibold text-gray-900 mb-3 flex items-center">
                    <MapPin className="w-5 h-5 mr-2 text-blue-600" /> Location
                  </h4>
                  <div className="bg-gray-50 rounded-lg p-4">
                    <div className="grid grid-cols-1 sm:grid-cols-4 gap-3">
                      <div>
                        <p className="text-sm text-gray-500">Division</p>
                        <p className="font-medium text-gray-900">
                          {selectedTutor.division}
                        </p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">District</p>
                        <p className="font-medium text-gray-900">
                          {selectedTutor.district}
                        </p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">Thana</p>
                        <p className="font-medium text-gray-900">
                          {selectedTutor.thana}
                        </p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">Area</p>
                        <p className="font-medium text-gray-900">
                          {selectedTutor.area}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Special Skills Section - Updated for Array */}
                {Array.isArray(selectedTutor.specialSkills) &&
                  selectedTutor.specialSkills.length > 0 && (
                    <div>
                      <h4 className="text-lg font-semibold text-gray-900 mb-3 flex items-center">
                        <Award className="w-5 h-5 mr-2 text-blue-600 animate-pulse" />{" "}
                        Special Skills
                      </h4>
                      <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-lg p-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          {selectedTutor.specialSkills.map((skill, index) => (
                            <div
                              key={index}
                              className="bg-white rounded-lg p-4 shadow-sm hover:shadow-lg hover:scale-105 transition-all duration-300"
                            >
                              <div className="flex items-center justify-between">
                                <div className="flex items-center space-x-3">
                                  <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
                                    <Award className="w-6 h-6 text-purple-600" />
                                  </div>
                                  <div>
                                    <h5 className="text-lg font-bold text-purple-700">
                                      {skill.type}
                                    </h5>
                                    <p className="text-base font-medium text-gray-800">
                                      {skill.value}
                                    </p>
                                  </div>
                                </div>
                                <div className="hidden sm:block">
                                  <div className="w-16 h-16 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full flex items-center justify-center animate-pulse">
                                    <span className="text-white text-2xl font-bold">
                                      {skill.type === "IELTS"
                                        ? "📊"
                                        : skill.type === "PT"
                                        ? "📊"
                                        : skill.type === "Language"
                                        ? "🗣️"
                                        : skill.type === "Music Instrument"
                                        ? "🎵"
                                        : skill.type === "Dancing"
                                        ? "💃"
                                        : skill.type === "Singing"
                                        ? "🎤"
                                        : skill.type === "Art"
                                        ? "🎨"
                                        : "🏆"}
                                    </span>
                                  </div>
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}

                {/* Experience Section */}
                <div>
                  <h4 className="text-lg font-semibold text-gray-900 mb-3 flex items-center">
                    <Calendar className="w-5 h-5 mr-2 text-blue-600 animate-pulse" />{" "}
                    Experience
                  </h4>
                  <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg p-6 border-l-4 border-blue-500 hover:shadow-lg transition-shadow duration-300">
                    <div className="bg-white rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow duration-200">
                      <p className="text-gray-800 leading-relaxed text-justify text-base font-medium hover:text-gray-900 transition-colors duration-200">
                        {selectedTutor.experience ||
                          "No experience information provided."}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Footer */}
              <div className="bg-gray-50 px-6 py-4 flex justify-end border-t border-gray-200 sticky bottom-0 z-10">
                <Button variant="primary" onClick={() => setShowModal(false)}>
                  Close
                </Button>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default TutorDetailsModal;
