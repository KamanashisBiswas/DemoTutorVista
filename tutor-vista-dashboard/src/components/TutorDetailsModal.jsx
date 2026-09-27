import React from "react";
import {
  X,
  FileDown,
  FileText,
  User,
  GraduationCap,
  MapPin,
  ExternalLink,
  Download,
  BookOpen,
  Shield,
  CreditCard,
  Award,
  Calendar,
  Copy,
  Check,
} from "lucide-react";
import { toast } from "react-toastify";

const TutorDetailsModal = ({
  open,
  onClose,
  tutor,
  onDownloadPdf,
  onDownloadDocx,
  downloadFile,
}) => {
  const [copied, setCopied] = React.useState(false);

  if (!open || !tutor) return null;

  // Copy tutor details to clipboard (simple & clean format)
  const copyToClipboard = () => {
    const findValidSection = (examType) =>
      tutor.educationSections?.find(
        (edu) =>
          edu.examination === examType &&
          edu.institution &&
          edu.institution.trim() !== ""
      );

    const sscInfo = findValidSection("SSC/O Level/Dakhil");
    const hscInfo = findValidSection("HSC/A Levels/Alim");
    const honsInfo = findValidSection("Honours");
    const mastersInfo = findValidSection("Masters");

    const sections = {
      personal: [
        tutor.name && `• Name: ${tutor.name}`,
        tutor.phone && `• Contact: ${tutor.phone}`,
        tutor.email && `• Email: ${tutor.email}`,
        tutor.gender && `• Gender: ${tutor.gender}`,
        tutor.score && `• Score: ${tutor.score}`,
      ],
      ssc: sscInfo
        ? [
            `\n[SSC/O-Level]`,
            `• Institution: ${sscInfo.institution}`,
            sscInfo.medium && `• Medium: ${sscInfo.medium}`,
            sscInfo.curriculum && `• Curriculum: ${sscInfo.curriculum}`,
            sscInfo.groupSubject && `• Group: ${sscInfo.groupSubject}`,
            sscInfo.gpa && `• Result: ${sscInfo.gpa}`,
            sscInfo.passingYear && `• Passing Year: ${sscInfo.passingYear}`,
          ]
        : [],
      hsc: hscInfo
        ? [
            `\n[HSC/A-Level]`,
            `• Institution: ${hscInfo.institution}`,
            hscInfo.medium && `• Medium: ${hscInfo.medium}`,
            hscInfo.curriculum && `• Curriculum: ${hscInfo.curriculum}`,
            hscInfo.groupSubject && `• Group: ${hscInfo.groupSubject}`,
            hscInfo.gpa && `• Result: ${hscInfo.gpa}`,
            hscInfo.passingYear && `• Passing Year: ${hscInfo.passingYear}`,
          ]
        : [],
      honours: honsInfo
        ? [
            `\n[Honours]`,
            `• Institution: ${honsInfo.institution}`,
            honsInfo.department && `• Department: ${honsInfo.department}`,
            honsInfo.year && `• Year/Semester: ${honsInfo.year}`,
            honsInfo.cgpa && `• CGPA: ${honsInfo.cgpa}`,
          ]
        : [],
      masters: mastersInfo
        ? [
            `\n[Masters]`,
            `• Institution: ${mastersInfo.institution}`,
            mastersInfo.department && `• Department: ${mastersInfo.department}`,
            mastersInfo.year && `• Year/Semester: ${mastersInfo.year}`,
            mastersInfo.cgpa && `• CGPA: ${mastersInfo.cgpa}`,
          ]
        : [],
      preferences: [
        tutor.preferredSubjects?.length > 0 &&
          `• Subjects: ${tutor.preferredSubjects.join(", ")}`,
        tutor.suitableArea?.length > 0 &&
          `• Preferred Areas: ${tutor.suitableArea.join(", ")}`,
      ],
    };

    const buildSection = (title, content) => {
      const filteredContent = content.flat().filter(Boolean);
      if (filteredContent.length === 0) return "";
      return `${title}\n---------------------------------\n${filteredContent.join(
        "\n"
      )}\n`;
    };

    const details = [
      "- - - - - - TUTOR PROFILE - - - - - -\n",
      buildSection("👤 PERSONAL DETAILS", sections.personal),
      buildSection("🎓 ACADEMIC BACKGROUND", [
        sections.ssc,
        sections.hsc,
        sections.honours,
        sections.masters,
      ]),
      buildSection("📚 TEACHING PREFERENCES", sections.preferences),
      tutor.experience
        ? `💼 EXPERIENCE\n---------------------------------\n${tutor.experience}\n`
        : "",
      "---------------------------------\nFor more information, please visit our website:\nhttps://www.tutorvistabd.com\n\nThank you for choosing Tutor Vista!",
    ]
      .filter(Boolean)
      .join("\n");

    navigator.clipboard
      .writeText(details)
      .then(() => {
        setCopied(true);
        toast.success("Tutor details copied to clipboard!");
        setTimeout(() => setCopied(false), 2000);
      })
      .catch((err) => {
        console.error("Failed to copy:", err);
        toast.error("Failed to copy details");
      });
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl shadow-xl w-full max-w-4xl max-h-[90vh] overflow-hidden">
        {/* Modal header - শুধু Download buttons */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-800">Tutor Details</h3>
          <div className="flex items-center space-x-3">
            <button
              onClick={onDownloadPdf}
              className="bg-green-600 text-white px-3 py-1.5 rounded-lg hover:bg-green-700 transition-colors duration-200 flex items-center space-x-2"
            >
              <FileDown className="w-4 h-4" />
              <span>Download PDF</span>
            </button>
            <button
              onClick={onDownloadDocx}
              className="bg-blue-600 text-white px-3 py-1.5 rounded-lg hover:bg-blue-700 transition-colors duration-200 flex items-center space-x-2"
            >
              <FileText className="w-4 h-4" />
              <span>Download DOCX</span>
            </button>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600 p-1 rounded"
            >
              <X className="w-6 h-6" />
            </button>
          </div>
        </div>

        <div className="p-6 overflow-y-auto max-h-[calc(90vh-120px)]">
          <div className="space-y-6">
            {/* Personal Information with Copy button on same line */}
            <div className="bg-gray-50 rounded-lg p-4">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <div className="w-6 h-6 bg-gray-800 rounded-lg flex items-center justify-center">
                    <User className="w-3 h-3 text-white" />
                  </div>
                  <h4 className="text-lg font-semibold text-gray-800">
                    Personal Information
                  </h4>
                </div>
                {/* Copy button on same line */}
                <button
                  onClick={copyToClipboard}
                  className={`${
                    copied ? "bg-green-600" : "bg-lime-500"
                  } text-black px-4 py-1.5 rounded-lg hover:bg-lime-600 transition-colors duration-200 flex items-center space-x-2`}
                >
                  {copied ? (
                    <>
                      <Check className="w-4 h-4" />
                      <span className="text-sm font-medium">Copied!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-4 h-4" />
                      <span className="text-sm font-medium">Copy</span>
                    </>
                  )}
                </button>
              </div>

              {/* Personal info grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium text-gray-600">
                    Tutor Name
                  </label>
                  <p className="text-gray-800">{tutor.name}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-600">
                    Email
                  </label>
                  <p className="text-gray-800">{tutor.email}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-600">
                    Phone
                  </label>
                  <p className="text-gray-800">{tutor.phone}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-600">
                    Gender
                  </label>
                  <p className="text-gray-800">{tutor.gender}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-600">
                    Hired Status
                  </label>
                  <div>
                    {tutor.isHired ? (
                      <span className="inline-block px-3 py-1 bg-green-100 text-green-800 rounded-full font-semibold">
                        Hired
                      </span>
                    ) : (
                      <span className="inline-block px-3 py-1 bg-yellow-100 text-yellow-800 rounded-full text-xs font-semibold">
                        Not Hired
                      </span>
                    )}
                  </div>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-600">
                    Terms Agreement
                  </label>
                  <div>
                    {tutor.agreeTerms ? (
                      <span className="inline-block px-3 py-1 bg-green-100 text-green-800 rounded-full text-xs font-semibold">
                        Agreed
                      </span>
                    ) : (
                      <span className="inline-block px-3 py-1 bg-red-100 text-red-800 rounded-full text-xs font-semibold">
                        Not Agreed
                      </span>
                    )}
                  </div>
                </div>
                {/* Score display */}
                <div className="flex items-center space-x-2">
                  <p className="text-md font-bold text-gray-900">Score</p>
                  <div>
                    <p className="inline-block px-3 py-1 bg-gray-700 text-slate-50 rounded-full text-md font-semibold">
                      {tutor.score === "" ? "Not set" : tutor.score}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Educational Info */}
            <div className="bg-gray-50 rounded-lg p-4">
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-6 h-6 bg-gray-800 rounded-lg flex items-center justify-center">
                  <GraduationCap className="w-3 h-3 text-white" />
                </div>
                <h4 className="text-lg font-semibold text-gray-800">
                  Educational Information
                </h4>
              </div>
              {tutor.educationSections?.map((edu, index) => (
                <div
                  key={index}
                  className="mb-4 p-4 bg-white rounded-lg border border-gray-200 shadow-sm"
                >
                  {/* Education Header */}
                  <div className="mb-4 pb-2 border-b border-gray-100">
                    <h5 className="text-lg font-bold text-blue-700">
                      {edu.examination}
                    </h5>
                    <p className="text-base font-semibold text-gray-800">
                      {edu.institution}
                    </p>
                  </div>

                  {/* Education Details Grid */}
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {/* Medium - Only show if exists */}
                    {edu.medium && edu.medium.trim() !== "" && (
                      <div>
                        <label className="text-sm font-medium text-gray-600">
                          Medium
                        </label>
                        <p className="text-gray-800 font-medium">
                          {edu.medium}
                        </p>
                      </div>
                    )}

                    {/* Curriculum - Only show if exists */}
                    {edu.curriculum && edu.curriculum.trim() !== "" && (
                      <div>
                        <label className="text-sm font-medium text-gray-600">
                          Curriculum
                        </label>
                        <p className="text-gray-800 font-medium">
                          {edu.curriculum}
                        </p>
                      </div>
                    )}

                    {/* Board - Only show if exists */}
                    {edu.board && edu.board.trim() !== "" && (
                      <div>
                        <label className="text-sm font-medium text-gray-600">
                          Board
                        </label>
                        <p className="text-gray-800 font-medium">{edu.board}</p>
                      </div>
                    )}

                    {/* Group/Subject - Only show if exists */}
                    {edu.groupSubject && edu.groupSubject.trim() !== "" && (
                      <div>
                        <label className="text-sm font-medium text-gray-600">
                          Group/Subject
                        </label>
                        <p className="text-gray-800 font-medium">
                          {edu.groupSubject}
                        </p>
                      </div>
                    )}

                    {/* Department - Only show if exists */}
                    {edu.department && edu.department.trim() !== "" && (
                      <div>
                        <label className="text-sm font-medium text-gray-600">
                          Department
                        </label>
                        <p className="text-gray-800 font-medium">
                          {edu.department}
                        </p>
                      </div>
                    )}

                    {/* Year - Only show if exists */}
                    {edu.year && edu.year.trim() !== "" && (
                      <div>
                        <label className="text-sm font-medium text-gray-600">
                          Year
                        </label>
                        <p className="text-gray-800 font-medium">{edu.year}</p>
                      </div>
                    )}

                    {/* GPA - Only show if exists */}
                    {edu.gpa && edu.gpa.trim() !== "" && (
                      <div>
                        <label className="text-sm font-medium text-gray-600">
                          GPA
                        </label>
                        <p className="text-gray-800 font-bold text-lg ">
                          {edu.gpa}
                        </p>
                      </div>
                    )}

                    {/* CGPA - Only show if exists */}
                    {edu.cgpa && edu.cgpa.trim() !== "" && (
                      <div>
                        <label className="text-sm font-medium text-gray-600">
                          CGPA
                        </label>
                        <p className="text-gray-800 font-bold text-lg ">
                          {edu.cgpa}
                        </p>
                      </div>
                    )}

                    {/* Passing Year - Only show if exists */}
                    {edu.passingYear && edu.passingYear.trim() !== "" && (
                      <div>
                        <label className="text-sm font-medium text-gray-600">
                          Passing Year
                        </label>
                        <p className="text-gray-800 font-medium">
                          {edu.passingYear}
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>

            {/* Preferred Subjects */}
            <div className="bg-gray-50 rounded-lg p-4">
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-6 h-6 bg-gray-800 rounded-lg flex items-center justify-center">
                  <BookOpen className="w-3 h-3 text-white" />
                </div>
                <h4 className="text-lg font-semibold text-gray-800">
                  Preferred Subjects
                </h4>
              </div>
              <div className="flex flex-wrap gap-2">
                {tutor.preferredSubjects?.length > 0 ? (
                  tutor.preferredSubjects.map((subject, index) => (
                    <span
                      key={index}
                      className="bg-purple-100 text-purple-800 px-3 py-1 rounded-full text-sm font-medium"
                    >
                      {subject}
                    </span>
                  ))
                ) : (
                  <span className="text-gray-500">N/A</span>
                )}
              </div>
            </div>

            {/* Suitable Thana & Suitable Area */}
            <div className="bg-gray-50 rounded-lg p-4">
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-6 h-6 bg-gray-800 rounded-lg flex items-center justify-center">
                  <MapPin className="w-3 h-3 text-white" />
                </div>
                <h4 className="text-lg font-semibold text-gray-800">
                  Suitable Thana
                </h4>
              </div>
              <div className="flex flex-wrap gap-2 mt-1">
                {Array.isArray(tutor.suitableThana) &&
                tutor.suitableThana.length > 0 ? (
                  tutor.suitableThana.map((item, idx) => (
                    <span
                      key={item + idx}
                      className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium"
                    >
                      {item}
                    </span>
                  ))
                ) : (
                  <span className="text-gray-500">N/A</span>
                )}
              </div>
            </div>
            <div className="bg-gray-50 rounded-lg p-4">
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-6 h-6 bg-gray-800 rounded-lg flex items-center justify-center">
                  <MapPin className="w-3 h-3 text-white" />
                </div>
                <h4 className="text-lg font-semibold text-gray-800">
                  Suitable Area
                </h4>
              </div>
              <div className="flex flex-wrap gap-2 mt-1">
                {Array.isArray(tutor.suitableArea) &&
                tutor.suitableArea.length > 0 ? (
                  tutor.suitableArea.map((item, idx) => (
                    <span
                      key={item + idx}
                      className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium"
                    >
                      {item}
                    </span>
                  ))
                ) : (
                  <span className="text-gray-500">N/A</span>
                )}
              </div>
            </div>

            {/* Special Skills - Updated for Array */}
            {Array.isArray(tutor.specialSkills) &&
              tutor.specialSkills.length > 0 && (
                <div className="bg-gray-50 rounded-lg p-4">
                  <div className="flex items-center space-x-3 mb-4">
                    <div className="w-6 h-6 bg-gray-800 rounded-lg flex items-center justify-center">
                      <Award className="w-3 h-3 text-white" />
                    </div>
                    <h4 className="text-lg font-semibold text-gray-800">
                      Special Skills
                    </h4>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {tutor.specialSkills.map((skill, index) => (
                      <div
                        key={index}
                        className="bg-white rounded-lg p-4 border border-gray-200 shadow-sm"
                      >
                        <div>
                          <label className="text-sm font-medium text-gray-600">
                            {skill.type}
                          </label>
                          <p className="text-gray-800 font-semibold text-lg">
                            {skill.value}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

            {/* Address */}
            <div className="bg-gray-50 rounded-lg p-4">
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-6 h-6 bg-gray-800 rounded-lg flex items-center justify-center">
                  <MapPin className="w-3 h-3 text-white" />
                </div>
                <h4 className="text-lg font-semibold text-gray-800">Address</h4>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium text-gray-600">
                    Division
                  </label>
                  <p className="text-gray-800">{tutor.division}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-600">
                    District
                  </label>
                  <p className="text-gray-800">{tutor.district}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-600">
                    Thana
                  </label>
                  <p className="text-gray-800">{tutor.thana}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-600">
                    Area
                  </label>
                  <p className="text-gray-800">{tutor.area}</p>
                </div>
              </div>
            </div>

            {/* Profile Image */}
            {tutor.profileImage && tutor.profileImage.url && (
              <div className="bg-gray-50 rounded-lg p-4">
                <h4 className="font-semibold text-gray-800 mb-3 flex items-center">
                  <User className="w-5 h-5 mr-2" />
                  Profile Picture
                </h4>
                <div className="flex items-center space-x-4">
                  <img
                    src={tutor.profileImage.url}
                    alt="Profile"
                    className="w-20 h-20 rounded-full object-cover border-2 border-gray-200"
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src =
                        "https://ui-avatars.com/api/?name=" +
                        encodeURIComponent(tutor.name || "Tutor");
                    }}
                  />
                  <div className="flex space-x-2">
                    <button
                      onClick={() =>
                        window.open(tutor.profileImage.url, "_blank")
                      }
                      className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors duration-200 flex items-center space-x-2"
                    >
                      <ExternalLink className="w-4 h-4" />
                      <span>View Full</span>
                    </button>
                    <button
                      onClick={() =>
                        downloadFile(
                          tutor.profileImage.url,
                          tutor.profileImage.originalName || "profile_image.jpg"
                        )
                      }
                      className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors duration-200 flex items-center space-x-2"
                    >
                      <Download className="w-4 h-4" />
                      <span>Download</span>
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* Education Document */}
            {tutor.educationDocument && tutor.educationDocument.url && (
              <div className="bg-gray-50 rounded-lg p-4">
                <h4 className="font-semibold text-gray-800 mb-3 flex items-center">
                  <GraduationCap className="w-5 h-5 mr-2" />
                  Education Document
                </h4>
                <div className="flex items-center space-x-4">
                  <img
                    src={tutor.educationDocument.url}
                    alt="Education Document"
                    className="w-32 h-32 object-cover border-2 border-gray-200 rounded"
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src =
                        "https://ui-avatars.com/api/?name=Document";
                    }}
                  />
                  <div className="flex space-x-2">
                    <button
                      onClick={() =>
                        window.open(tutor.educationDocument.url, "_blank")
                      }
                      className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors duration-200 flex items-center space-x-2"
                    >
                      <ExternalLink className="w-4 h-4" />
                      <span>View Document</span>
                    </button>
                    <button
                      onClick={() =>
                        downloadFile(
                          tutor.educationDocument.url,
                          tutor.educationDocument.originalName ||
                            "education_document.jpg"
                        )
                      }
                      className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors duration-200 flex items-center space-x-2"
                    >
                      <Download className="w-4 h-4" />
                      <span>Download</span>
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* Identity Verification */}
            <div className="bg-gray-50 rounded-lg p-4">
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-6 h-6 bg-gray-800 rounded-lg flex items-center justify-center">
                  <Shield className="w-3 h-3 text-white" />
                </div>
                <h4 className="text-lg font-semibold text-gray-800">
                  Identity Verification
                </h4>
              </div>
              <div className="mb-4 p-3 bg-blue-50 border border-blue-200 rounded-lg">
                <div className="flex items-center space-x-2">
                  <Shield className="w-4 h-4 text-blue-600" />
                  <span className="text-sm font-medium text-blue-800">
                    Document Type:{" "}
                    {tutor.documentType === "nid"
                      ? "National ID Card"
                      : "Birth Certificate"}
                  </span>
                </div>
              </div>
              {tutor.documentType === "nid" ? (
                <>
                  {(tutor.nidFrontImage?.url || tutor.nidBackImage?.url) && (
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                      {tutor.nidFrontImage?.url && (
                        <div className="bg-white rounded-lg p-4 border">
                          <div className="flex items-center space-x-2 mb-3">
                            <CreditCard className="w-4 h-4 text-blue-600" />
                            <h5 className="font-medium text-gray-800">
                              NID Front Side
                            </h5>
                          </div>
                          <div className="space-y-3">
                            <img
                              src={tutor.nidFrontImage.url}
                              alt="NID Front"
                              className="w-full h-48 object-cover border border-gray-200 rounded"
                              onError={(e) => {
                                e.target.onerror = null;
                                e.target.src =
                                  "https://ui-avatars.com/api/?name=NID+Front";
                              }}
                            />
                            <div className="flex space-x-2">
                              <button
                                onClick={() =>
                                  window.open(tutor.nidFrontImage.url, "_blank")
                                }
                                className="flex-1 bg-blue-600 text-white px-3 py-2 rounded-lg hover:bg-blue-700 transition-colors duration-200 flex items-center justify-center space-x-2 text-sm"
                              >
                                <ExternalLink className="w-4 h-4" />
                                <span>View</span>
                              </button>
                              <button
                                onClick={() =>
                                  downloadFile(
                                    tutor.nidFrontImage.url,
                                    tutor.nidFrontImage.originalName ||
                                      "nid_front.jpg"
                                  )
                                }
                                className="flex-1 bg-green-600 text-white px-3 py-2 rounded-lg hover:bg-green-700 transition-colors duration-200 flex items-center justify-center space-x-2 text-sm"
                              >
                                <Download className="w-4 h-4" />
                                <span>Download</span>
                              </button>
                            </div>
                          </div>
                        </div>
                      )}
                      {tutor.nidBackImage?.url && (
                        <div className="bg-white rounded-lg p-4 border">
                          <div className="flex items-center space-x-2 mb-3">
                            <CreditCard className="w-4 h-4 text-blue-600" />
                            <h5 className="font-medium text-gray-800">
                              NID Back Side
                            </h5>
                          </div>
                          <div className="space-y-3">
                            <img
                              src={tutor.nidBackImage.url}
                              alt="NID Back"
                              className="w-full h-48 object-cover border border-gray-200 rounded"
                              onError={(e) => {
                                e.target.onerror = null;
                                e.target.src =
                                  "https://ui-avatars.com/api/?name=NID+Back";
                              }}
                            />
                            <div className="flex space-x-2">
                              <button
                                onClick={() =>
                                  window.open(tutor.nidBackImage.url, "_blank")
                                }
                                className="flex-1 bg-blue-600 text-white px-3 py-2 rounded-lg hover:bg-blue-700 transition-colors duration-200 flex items-center justify-center space-x-2 text-sm"
                              >
                                <ExternalLink className="w-4 h-4" />
                                <span>View</span>
                              </button>
                              <button
                                onClick={() =>
                                  downloadFile(
                                    tutor.nidBackImage.url,
                                    tutor.nidBackImage.originalName ||
                                      "nid_back.jpg"
                                  )
                                }
                                className="flex-1 bg-green-600 text-white px-3 py-2 rounded-lg hover:bg-green-700 transition-colors duration-200 flex items-center justify-center space-x-2 text-sm"
                              >
                                <Download className="w-4 h-4" />
                                <span>Download</span>
                              </button>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  )}
                </>
              ) : (
                <>
                  {tutor.birthCertificateImage?.url && (
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                      <div className="bg-white rounded-lg p-4 border">
                        <div className="flex items-center space-x-2 mb-3">
                          <CreditCard className="w-4 h-4 text-green-600" />
                          <h5 className="font-medium text-gray-800">
                            Birth Certificate
                          </h5>
                        </div>
                        <div className="space-y-3">
                          <img
                            src={tutor.birthCertificateImage.url}
                            alt="Birth Certificate"
                            className="w-full h-48 object-cover border border-gray-200 rounded"
                            onError={(e) => {
                              e.target.onerror = null;
                              e.target.src =
                                "https://ui-avatars.com/api/?name=Birth+Certificate";
                            }}
                          />
                          <div className="flex space-x-2">
                            <button
                              onClick={() =>
                                window.open(
                                  tutor.birthCertificateImage.url,
                                  "_blank"
                                )
                              }
                              className="flex-1 bg-blue-600 text-white px-3 py-2 rounded-lg hover:bg-blue-700 transition-colors duration-200 flex items-center justify-center space-x-2 text-sm"
                            >
                              <ExternalLink className="w-4 h-4" />
                              <span>View</span>
                            </button>
                            <button
                              onClick={() =>
                                downloadFile(
                                  tutor.birthCertificateImage.url,
                                  tutor.birthCertificateImage.originalName ||
                                    "birth_certificate.jpg"
                                )
                              }
                              className="flex-1 bg-green-600 text-white px-3 py-2 rounded-lg hover:bg-green-700 transition-colors duration-200 flex items-center justify-center space-x-2 text-sm"
                            >
                              <Download className="w-4 h-4" />
                              <span>Download</span>
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </>
              )}
            </div>

            {/* Teaching Experience */}
            {tutor.experience && (
              <div className="bg-gray-50 rounded-lg p-4">
                <div className="flex items-center space-x-3 mb-4">
                  <div className="w-6 h-6 bg-gray-800 rounded-lg flex items-center justify-center">
                    <BookOpen className="w-3 h-3 text-white" />
                  </div>
                  <h4 className="text-lg font-semibold text-gray-800">
                    Teaching Experience
                  </h4>
                </div>
                <div className="bg-white rounded-lg p-4 border">
                  <p className="text-gray-700 leading-relaxed whitespace-pre-wrap">
                    {tutor.experience}
                  </p>
                </div>
              </div>
            )}

            {/* Application Information */}
            <div className="bg-gray-50 rounded-lg p-4">
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-6 h-6 bg-gray-800 rounded-lg flex items-center justify-center">
                  <Calendar className="w-3 h-3 text-white" />
                </div>
                <h4 className="text-lg font-semibold text-gray-800">
                  Application Information
                </h4>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium text-gray-600">
                    Submitted At
                  </label>
                  <p className="text-gray-800">
                    {new Date(tutor.submittedAt).toLocaleDateString()}
                  </p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-600">
                    Last Updated
                  </label>
                  <p className="text-gray-800">
                    {new Date(tutor.updatedAt).toLocaleDateString()}
                  </p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-600">
                    Created At
                  </label>
                  <p className="text-gray-800">
                    {new Date(tutor.createdAt).toLocaleDateString()}
                  </p>
                </div>
              </div>
            </div>

            {/* Footer with Close button only */}
            <div className="flex justify-end pt-4 px-6 pb-6 border-t">
              <button
                onClick={onClose}
                className="px-6 py-2 bg-red-600 text-white rounded-lg font-semibold hover:bg-red-700 transition"
              >
                <span>Close</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TutorDetailsModal;
