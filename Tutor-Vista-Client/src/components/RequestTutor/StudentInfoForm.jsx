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
      <label className="block text-sm font-medium text-gray-700 mb-2">
        Subjects (Type a subject and click + to add){" "}
        <span className="text-red-500">*</span>
      </label>
      <div
        ref={containerRef}
        onClick={() => containerRef.current?.querySelector("input")?.focus()}
        className={`flex items-center border ${
          error ? "border-red-500" : "border-gray-300"
        } rounded-lg bg-white focus-within:border-blue-500 focus-within:ring-2 focus-within:ring-blue-200 transition-all duration-200 p-2 cursor-text`}
      >
        <div className="flex-1 flex flex-wrap items-center gap-2">
          {subjects.map((subject, index) => (
            <div
              key={index}
              className="flex items-center bg-blue-100 text-blue-800 px-2.5 py-1 rounded-md text-sm"
            >
              <span>{subject}</span>
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  onRemove(subject);
                }}
                className="ml-2 text-blue-600 hover:text-blue-800"
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
            placeholder={subjects.length === 0 ? "Type a subject" : ""}
            className="flex-grow min-w-[100px] border-none focus:ring-0 outline-none text-sm py-1 bg-transparent"
          />
        </div>
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            handleAddSubject();
          }}
          className="ml-2 flex-shrink-0 w-8 h-8 flex items-center justify-center rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition-colors"
        >
          <Plus className="w-5 h-5" />
        </button>
      </div>
      {error && <p className="mt-1 text-sm text-red-600">{error}</p>}
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
      <div className="mb-8">
        <div className="flex items-center space-x-3 mb-6">
          <div className="w-8 h-8 bg-gray-800 rounded-lg flex items-center justify-center">
            <User className="w-4 h-4 text-white" />
          </div>
          <h2 className="text-xl sm:text-2xl font-semibold text-gray-800">
            Basic Info
          </h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Guardian/Student Name <span className="text-red-500">*</span>
            </label>
            <input
              ref={fieldRefs.studentName}
              type="text"
              placeholder="Enter name"
              value={formData.studentName}
              onChange={(e) => handleInputChange("studentName", e.target.value)}
              className={`w-full px-4 py-3 border ${
                fieldErrors.studentName ? "border-red-500" : "border-gray-300"
              } rounded-lg transition-all duration-200 hover:border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200`}
            />
            {fieldErrors.studentName && (
              <p className="mt-1 text-sm text-red-600">
                {fieldErrors.studentName}
              </p>
            )}
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Phone No. <span className="text-red-500">*</span>
            </label>
            <input
              ref={fieldRefs.phoneNo}
              type="tel"
              placeholder="Enter phone number"
              value={formData.phoneNo}
              onChange={(e) => handleInputChange("phoneNo", e.target.value)}
              className={`w-full px-4 py-3 border ${
                fieldErrors.phoneNo ? "border-red-500" : "border-gray-300"
              } rounded-lg transition-all duration-200 hover:border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200`}
            />
            {fieldErrors.phoneNo && (
              <p className="mt-1 text-sm text-red-600">{fieldErrors.phoneNo}</p>
            )}
          </div>
        </div>
        <div className="mt-6">
          <label className="block text-sm font-medium text-gray-700 mb-3">
            Preferred Tutor Gender
          </label>
          <div className="flex space-x-6">
            {["Male", "Female", "Any"].map((gender) => (
              <label key={gender} className="flex items-center">
                <input
                  type="radio"
                  name="gender"
                  value={gender}
                  checked={formData.gender === gender}
                  onChange={(e) => handleInputChange("gender", e.target.value)}
                  className="w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500"
                />
                <span className="ml-2 text-gray-700">{gender}</span>
              </label>
            ))}
          </div>
        </div>
      </div>

      <div className="mb-8">
        <div className="flex items-center space-x-3 mb-6">
          <div className="w-8 h-8 bg-gray-800 rounded-lg flex items-center justify-center">
            <GraduationCap className="w-4 h-4 text-white" />
          </div>
          <h2 className="text-xl sm:text-2xl font-semibold text-gray-800">
            Educational Info
          </h2>
        </div>
        <div className="mb-8 rounded-lg border border-gray-300 bg-white/50 p-4 sm:max-w-md">
          <div className="flex items-center justify-between">
            <label
              htmlFor="studentSwitch"
              className="block text-sm font-medium text-gray-800"
            >
              Add a Second Student?
            </label>
            <div className="flex items-center gap-3">
              <span className="text-sm text-gray-600">No</span>
              <button
                type="button"
                id="studentSwitch"
                onClick={handleToggleSecondStudent}
                className={`relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${
                  showSecondStudent ? "bg-blue-600" : "bg-gray-300"
                }`}
                role="switch"
                aria-checked={showSecondStudent}
              >
                <span
                  aria-hidden="true"
                  className={`inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${
                    showSecondStudent ? "translate-x-5" : "translate-x-0"
                  }`}
                />
              </button>
              <span className="text-sm text-gray-600">Yes</span>
            </div>
          </div>
        </div>

        <div className="space-y-8">
          {formData.educationalDetails.map((detail, index) => {
            const suffix = index === 0 ? "" : "2";
            return (
              <div
                key={index}
                className="p-5 border border-blue-200 rounded-xl bg-white/60 shadow-sm relative transition-all duration-300"
              >
                <div className="flex items-center gap-3 mb-5 border-b border-blue-100 pb-3">
                  <User className="w-5 h-5 text-blue-600" />
                  <h3 className="font-semibold text-gray-800 text-lg">
                    Student {index + 1} Details
                  </h3>
                </div>
                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Institution <span className="text-red-500">*</span>
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
                      className={`w-full px-4 py-3 border ${
                        fieldErrors[`institution${suffix}`]
                          ? "border-red-500"
                          : "border-gray-300"
                      } rounded-lg transition-all duration-200 hover:border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200`}
                    />
                    {fieldErrors[`institution${suffix}`] && (
                      <p className="mt-1 text-sm text-red-600">
                        {fieldErrors[`institution${suffix}`]}
                      </p>
                    )}
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
                  {getGradeOptions(detail.medium, detail.curriculum).length >
                    0 && (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
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
