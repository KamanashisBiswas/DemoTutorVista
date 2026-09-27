import React, { useRef, useState } from "react";
import { User, GraduationCap, Plus, X } from "lucide-react";
import { SelectField } from "./SharedComponents";

const SubjectInput = ({ subjects, onAdd, onRemove, error, fieldRef }) => {
  const [input, setInput] = useState("");
  const containerRef = useRef(null);

  const handleAddSubject = () => {
    const value = input.trim().replace(/,$/, "");
    if (value && !subjects.includes(value)) {
      onAdd(value);
      setInput("");
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleAddSubject();
    }
  };

  return (
    <div>
      <label className="block text-xs font-semibold text-[#1A1D29] mb-1.5">
        Subjects (Type a subject and click + to add){" "}
        <span className="text-[#DC2626]">*</span>
      </label>
      <div
        ref={containerRef}
        onClick={() => containerRef.current?.querySelector("input")?.focus()}
        className={`flex items-center border ${
          error ? "border-[#DC2626]" : "border-[#E4E6EE]"
        } rounded-sm bg-white focus-within:border-[#3730E0] focus-within:ring-2 focus-within:ring-[#3730E0]/15 transition-all duration-150 p-2 cursor-text`}
      >
        <div className="flex-1 flex flex-wrap items-center gap-1.5">
          {subjects.map((subject, index) => (
            <div
              key={index}
              className="inline-flex items-center gap-1 bg-[#EEEDFD] text-[#3730E0] border border-[#3730E0]/15 px-2.5 py-1 rounded-full text-xs font-medium"
            >
              <span>{subject}</span>
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  onRemove(subject);
                }}
                className="text-[#3730E0]/70 hover:text-[#DC2626] transition-colors"
              >
                <X className="w-3 h-3" />
              </button>
            </div>
          ))}
          <input
            ref={fieldRef}
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder={subjects.length === 0 ? "e.g., Mathematics, Physics" : ""}
            className="flex-grow min-w-[120px] border-none focus:ring-0 outline-none text-xs sm:text-sm py-1 bg-transparent text-[#1A1D29] placeholder-[#5B5F73]/50"
          />
        </div>
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            handleAddSubject();
          }}
          className="ml-2 flex-shrink-0 w-8 h-8 flex items-center justify-center rounded-sm bg-[#3730E0] text-white hover:bg-[#2D24C4] transition-colors"
        >
          <Plus className="w-4 h-4" />
        </button>
      </div>
      {error && <p className="mt-1 text-xs text-[#DC2626]">{error}</p>}
    </div>
  );
};

const StudentInfoForm = ({
  formData,
  handleInputChange,
  fieldErrors,
  fieldRefs,
  showSecondStudent,
  handleToggleSecondStudent,
  handleEducationalDetailChange,
  handleSubjectChange,
  mediumOptions,
  curriculumOptions,
  getGradeOptions,
}) => {
  return (
    <>
      {/* Basic Info Section */}
      <div className="mb-8 pb-8 border-b border-[#E4E6EE]">
        <div className="flex items-center space-x-3 mb-5">
          <div className="w-8 h-8 bg-[#EEEDFD] text-[#3730E0] rounded-sm flex items-center justify-center">
            <User className="w-4 h-4" />
          </div>
          <h3 className="text-base sm:text-lg font-bold text-[#1A1D29]">
            Basic Information
          </h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div>
            <label className="block text-xs font-semibold text-[#1A1D29] mb-1.5">
              Guardian / Student Name <span className="text-[#DC2626]">*</span>
            </label>
            <input
              ref={fieldRefs.studentName}
              type="text"
              placeholder="Full Name"
              value={formData.studentName}
              onChange={(e) => handleInputChange("studentName", e.target.value)}
              className={`w-full px-3.5 py-2.5 text-xs sm:text-sm border ${
                fieldErrors.studentName ? "border-[#DC2626]" : "border-[#E4E6EE]"
              } rounded-sm transition-all duration-150 text-[#1A1D29] placeholder-[#5B5F73]/50 focus:border-[#3730E0] focus:ring-2 focus:ring-[#3730E0]/15`}
            />
            {fieldErrors.studentName && (
              <p className="mt-1 text-xs text-[#DC2626]">
                {fieldErrors.studentName}
              </p>
            )}
          </div>
          <div>
            <label className="block text-xs font-semibold text-[#1A1D29] mb-1.5">
              Phone Number <span className="text-[#DC2626]">*</span>
            </label>
            <input
              ref={fieldRefs.phoneNo}
              type="tel"
              placeholder="01700-000000"
              value={formData.phoneNo}
              onChange={(e) => handleInputChange("phoneNo", e.target.value)}
              className={`w-full px-3.5 py-2.5 text-xs sm:text-sm border ${
                fieldErrors.phoneNo ? "border-[#DC2626]" : "border-[#E4E6EE]"
              } rounded-sm transition-all duration-150 text-[#1A1D29] placeholder-[#5B5F73]/50 focus:border-[#3730E0] focus:ring-2 focus:ring-[#3730E0]/15`}
            />
            {fieldErrors.phoneNo && (
              <p className="mt-1 text-xs text-[#DC2626]">{fieldErrors.phoneNo}</p>
            )}
          </div>
        </div>

        <div className="mt-5">
          <label className="block text-xs font-semibold text-[#1A1D29] mb-2">
            Preferred Tutor Gender
          </label>
          <div className="flex gap-4 sm:gap-6">
            {["Male", "Female", "Any"].map((gender) => (
              <label key={gender} className="inline-flex items-center gap-2 cursor-pointer">
                <input
                  type="radio"
                  name="gender"
                  value={gender}
                  checked={formData.gender === gender}
                  onChange={(e) => handleInputChange("gender", e.target.value)}
                  className="w-4 h-4 text-[#3730E0] border-[#E4E6EE] focus:ring-[#3730E0]"
                />
                <span className="text-xs sm:text-sm font-medium text-[#1A1D29]">{gender}</span>
              </label>
            ))}
          </div>
        </div>
      </div>

      {/* Educational Info Section */}
      <div className="mb-8 pb-8 border-b border-[#E4E6EE]">
        <div className="flex items-center space-x-3 mb-5">
          <div className="w-8 h-8 bg-[#EEEDFD] text-[#3730E0] rounded-sm flex items-center justify-center">
            <GraduationCap className="w-4 h-4" />
          </div>
          <h3 className="text-base sm:text-lg font-bold text-[#1A1D29]">
            Educational Information
          </h3>
        </div>

        {/* Second student switch */}
        <div className="mb-6 rounded-md border border-[#E4E6EE] bg-[#F7F8FB] p-3.5 sm:max-w-md">
          <div className="flex items-center justify-between">
            <label
              htmlFor="studentSwitch"
              className="text-xs sm:text-sm font-semibold text-[#1A1D29]"
            >
              Add a Second Student?
            </label>
            <div className="flex items-center gap-2.5">
              <span className="text-xs text-[#5B5F73]">No</span>
              <button
                type="button"
                id="studentSwitch"
                onClick={handleToggleSecondStudent}
                className={`relative inline-flex h-5 w-10 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${
                  showSecondStudent ? "bg-[#3730E0]" : "bg-gray-300"
                }`}
                role="switch"
                aria-checked={showSecondStudent}
              >
                <span
                  aria-hidden="true"
                  className={`inline-block h-4 w-4 transform rounded-full bg-white shadow-xs transition duration-200 ease-in-out ${
                    showSecondStudent ? "translate-x-5" : "translate-x-0"
                  }`}
                />
              </button>
              <span className="text-xs text-[#5B5F73]">Yes</span>
            </div>
          </div>
        </div>

        <div className="space-y-6">
          {formData.educationalDetails.map((detail, index) => {
            const suffix = index === 0 ? "" : "2";
            return (
              <div
                key={index}
                className="p-5 border border-[#E4E6EE] rounded-md bg-white shadow-xs relative"
              >
                <div className="flex items-center gap-2 mb-4 pb-2.5 border-b border-[#E4E6EE]">
                  <span className="w-6 h-6 rounded-full bg-[#EEEDFD] text-[#3730E0] text-xs font-bold flex items-center justify-center">
                    {index + 1}
                  </span>
                  <h4 className="font-bold text-[#1A1D29] text-sm">
                    Student {index + 1} Details
                  </h4>
                </div>

                <div className="space-y-5">
                  <div>
                    <label className="block text-xs font-semibold text-[#1A1D29] mb-1.5">
                      Institution <span className="text-[#DC2626]">*</span>
                    </label>
                    <input
                      type="text"
                      placeholder="School / College / University"
                      value={detail.institution}
                      onChange={(e) =>
                        handleEducationalDetailChange(
                          index,
                          "institution",
                          e.target.value
                        )
                      }
                      className={`w-full px-3.5 py-2.5 text-xs sm:text-sm border ${
                        fieldErrors[`institution${suffix}`]
                          ? "border-[#DC2626]"
                          : "border-[#E4E6EE]"
                      } rounded-sm transition-all duration-150 text-[#1A1D29] placeholder-[#5B5F73]/50 focus:border-[#3730E0] focus:ring-2 focus:ring-[#3730E0]/15`}
                    />
                    {fieldErrors[`institution${suffix}`] && (
                      <p className="mt-1 text-xs text-[#DC2626]">
                        {fieldErrors[`institution${suffix}`]}
                      </p>
                    )}
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <SelectField
                      label="Medium"
                      value={detail.medium}
                      onChange={(value) =>
                        handleEducationalDetailChange(index, "medium", value)
                      }
                      options={mediumOptions}
                      placeholder="Select Medium"
                      error={fieldErrors[`medium${suffix}`]}
                      required={true}
                    />
                    {detail.medium === "English Medium" && (
                      <SelectField
                        label="Curriculum"
                        value={detail.curriculum}
                        onChange={(value) =>
                          handleEducationalDetailChange(
                            index,
                            "curriculum",
                            value
                          )
                        }
                        options={curriculumOptions}
                        placeholder="Select Curriculum"
                        error={fieldErrors[`curriculum${suffix}`]}
                        required={true}
                      />
                    )}
                    {["Skill Development", "Job Purpose"].includes(
                      detail.medium
                    ) && (
                      <SubjectInput
                        subjects={detail.subjects}
                        onAdd={(subject) => {
                          const newSubjects = [...detail.subjects, subject];
                          handleSubjectChange(index, newSubjects);
                        }}
                        onRemove={(subjectToRemove) => {
                          const newSubjects = detail.subjects.filter(
                            (s) => s !== subjectToRemove
                          );
                          handleSubjectChange(index, newSubjects);
                        }}
                        error={fieldErrors[`subjects${suffix}`]}
                        fieldRef={fieldRefs[`subjects${suffix}`]}
                      />
                    )}
                  </div>

                  {getGradeOptions(detail.medium, detail.curriculum).length > 0 && (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-start">
                      <SelectField
                        label="Grade/Class"
                        value={detail.grade}
                        onChange={(v) =>
                          handleEducationalDetailChange(index, "grade", v)
                        }
                        options={getGradeOptions(
                          detail.medium,
                          detail.curriculum
                        )}
                        placeholder="Select Grade/Class"
                        name={`grade${suffix}`}
                        error={fieldErrors[`grade${suffix}`]}
                        required
                      />
                      <SubjectInput
                        subjects={detail.subjects}
                        onAdd={(subject) => {
                          const newSubjects = [...detail.subjects, subject];
                          handleSubjectChange(index, newSubjects);
                        }}
                        onRemove={(subjectToRemove) => {
                          const newSubjects = detail.subjects.filter(
                            (s) => s !== subjectToRemove
                          );
                          handleSubjectChange(index, newSubjects);
                        }}
                        error={fieldErrors[`subjects${suffix}`]}
                        fieldRef={fieldRefs[`subjects${suffix}`]}
                      />
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default StudentInfoForm;
