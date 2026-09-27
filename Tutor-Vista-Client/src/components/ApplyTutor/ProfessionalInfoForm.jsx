import React from "react";
import { GraduationCap, BookOpen, Plus, X } from "lucide-react";
import { SelectField } from "./PersonalInfoForm";
import Button from "../Common/Button";

const ProfessionalInfoForm = ({
  educationSections,
  updateEducationSection,
  fieldErrors,
  specialSkills,
  skillInput,
  setSkillInput,
  handleAddSkill,
  removeSkill,
  specialSkillOptions,
  otherData,
  handleOtherDataChange,
  fieldRefs,
  subjectInput,
  setSubjectInput,
  handleAddSubject,
  removeSubject,
  suitableThana,
  setSuitableThana,
  thanas,
  suitableArea,
  addSuitableArea,
  removeSuitableArea,
  suitableAreaOptions,
}) => {
  const getValidCurriculaForEnglishMedium = () => [
    "Cambridge",
    "Edexcel",
    "IB Curriculum",
  ];
  const getYearOptionsForExamination = (examination) => {
    if (examination === "Honours")
      return ["1st", "2nd", "3rd", "4th", "5th", "Passed"];
    if (examination === "Masters") return ["1st", "Passed"];
    return [];
  };

  return (
    <>
      <div className="mb-8 sm:mb-12">
        <div className="flex items-center mb-6">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-gray-800 rounded-lg flex items-center justify-center">
              <GraduationCap className="w-4 h-4 text-white" />
            </div>
            <h2 className="text-xl sm:text-2xl font-semibold text-gray-800">
              Educational Info
            </h2>
          </div>
        </div>
        {educationSections.map((section, index) => {
          const sectionNames = [
            { name: "Education (SSC/O Levels/Dakhil)", required: true },
            { name: "Education (HSC/A Levels/Alim)", required: true },
            { name: "Education (Honors/Bachelor)", required: false },
            { name: "Education (Masters)", required: false },
          ];
          const currentSection = sectionNames[index];
          return (
            <div
              key={section.id}
              className="mb-8 rounded-xl relative animate-fade-in"
            >
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-medium text-gray-700">
                  {currentSection.name}{" "}
                  {currentSection.required ? (
                    <span className="text-red-500">*</span>
                  ) : (
                    <span className="text-sm text-gray-500 ml-2">
                      (Optional)
                    </span>
                  )}
                </h3>
              </div>
              <div className="grid grid-cols-1 gap-4 sm:gap-6">
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700">
                    Institution{" "}
                    {currentSection.required && (
                      <span className="text-red-500">*</span>
                    )}
                  </label>
                  <input
                    type="text"
                    value={section.institution}
                    onChange={(e) =>
                      updateEducationSection(
                        section.id,
                        "institution",
                        e.target.value
                      )
                    }
                    placeholder={
                      currentSection.required
                        ? "Enter institution name"
                        : "Enter institution name (optional)"
                    }
                    className={`w-full px-4 py-3 border ${
                      fieldErrors[`education_${section.id}_institution`]
                        ? "border-red-500"
                        : "border-gray-200"
                    } rounded-lg transition-all duration-200 hover:border-gray-300 ${
                      fieldErrors[`education_${section.id}_institution`]
                        ? "focus:border-red-500 focus:ring-2 focus:ring-red-200"
                        : "focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
                    }`}
                  />
                  {fieldErrors[`education_${section.id}_institution`] && (
                    <p className="mt-1 text-sm text-red-600">
                      {fieldErrors[`education_${section.id}_institution`]}
                    </p>
                  )}
                </div>
                {(section.examination === "SSC/O Level/Dakhil" ||
                  section.examination === "HSC/A Levels/Alim") && (
                  <>
                    <SelectField
                      label="Medium"
                      value={section.medium}
                      onChange={(value) => {
                        updateEducationSection(section.id, "medium", value);
                        updateEducationSection(section.id, "curriculum", "");
                        if (value === "English Medium")
                          updateEducationSection(section.id, "gpa", "");
                      }}
                      options={[
                        "Bangla Medium",
                        "English Medium",
                        "English Version (National Curriculum)",
                        "Arabic Medium",
                      ]}
                      placeholder="Select Medium"
                      error={fieldErrors[`education_${section.id}_medium`]}
                      required={currentSection.required}
                    />
                    {section.medium === "English Medium" && (
                      <SelectField
                        label="Curriculum"
                        value={section.curriculum}
                        onChange={(value) =>
                          updateEducationSection(
                            section.id,
                            "curriculum",
                            value
                          )
                        }
                        options={getValidCurriculaForEnglishMedium()}
                        placeholder="Select Curriculum"
                        error={
                          fieldErrors[`education_${section.id}_curriculum`]
                        }
                        required={currentSection.required}
                      />
                    )}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                      <div className="space-y-2">
                        <label className="block text-sm font-medium text-gray-700">
                          Board{" "}
                          {currentSection.required && (
                            <span className="text-red-500">*</span>
                          )}
                        </label>
                        <input
                          type="text"
                          value={section.board}
                          onChange={(e) =>
                            updateEducationSection(
                              section.id,
                              "board",
                              e.target.value
                            )
                          }
                          placeholder="Enter board name (e.g., Dhaka, Chattogram, etc.)"
                          className={`w-full px-4 py-3 border ${
                            fieldErrors[`education_${section.id}_board`]
                              ? "border-red-500"
                              : "border-gray-200"
                          } rounded-lg transition-all duration-200 hover:border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200`}
                        />
                        {fieldErrors[`education_${section.id}_board`] && (
                          <p className="mt-1 text-sm text-red-600">
                            {fieldErrors[`education_${section.id}_board`]}
                          </p>
                        )}
                      </div>
                      <div className="space-y-2">
                        <label className="block text-sm font-medium text-gray-700">
                          Group/Subject{" "}
                          {currentSection.required && (
                            <span className="text-red-500">*</span>
                          )}
                        </label>
                        <input
                          type="text"
                          value={section.groupSubject}
                          onChange={(e) =>
                            updateEducationSection(
                              section.id,
                              "groupSubject",
                              e.target.value
                            )
                          }
                          placeholder="Enter group/subject (e.g., Science, Commerce, Arts)"
                          className={`w-full px-4 py-3 border ${
                            fieldErrors[`education_${section.id}_groupSubject`]
                              ? "border-red-500"
                              : "border-gray-200"
                          } rounded-lg transition-all duration-200 hover:border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200`}
                        />
                        {fieldErrors[
                          `education_${section.id}_groupSubject`
                        ] && (
                          <p className="mt-1 text-sm text-red-600">
                            {
                              fieldErrors[
                                `education_${section.id}_groupSubject`
                              ]
                            }
                          </p>
                        )}
                      </div>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                      {section.medium !== "English Medium" && (
                        <div className="space-y-2">
                          <label className="block text-sm font-medium text-gray-700">
                            GPA
                          </label>
                          <input
                            type="text"
                            value={section.gpa}
                            onChange={(e) =>
                              updateEducationSection(
                                section.id,
                                "gpa",
                                e.target.value
                              )
                            }
                            placeholder="e.g., 4.50 or Golden A+"
                            className={`w-full px-4 py-3 border ${
                              fieldErrors[`education_${section.id}_gpa`]
                                ? "border-red-500"
                                : "border-gray-200"
                            } rounded-lg transition-all duration-200 hover:border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200`}
                          />
                          {fieldErrors[`education_${section.id}_gpa`] && (
                            <p className="mt-1 text-sm text-red-600">
                              {fieldErrors[`education_${section.id}_gpa`]}
                            </p>
                          )}
                        </div>
                      )}
                      <SelectField
                        label="Passing Year"
                        value={section.passingYear}
                        onChange={(value) =>
                          updateEducationSection(
                            section.id,
                            "passingYear",
                            value
                          )
                        }
                        options={Array.from({ length: 40 }, (_, i) =>
                          String(new Date().getFullYear() - i)
                        )}
                        placeholder="Select Passing Year"
                        error={
                          fieldErrors[`education_${section.id}_passingYear`]
                        }
                        required={currentSection.required}
                      />
                    </div>
                  </>
                )}
                {(section.examination === "Honours" ||
                  section.examination === "Masters") && (
                  <>
                    <div className="space-y-2">
                      <label className="block text-sm font-medium text-gray-700">
                        Department
                      </label>
                      <input
                        type="text"
                        value={section.department}
                        onChange={(e) =>
                          updateEducationSection(
                            section.id,
                            "department",
                            e.target.value
                          )
                        }
                        placeholder="Enter department name (e.g., CSE, EEE, Business Administration)"
                        className="w-full px-4 py-3 border border-gray-200 rounded-lg transition-all duration-200 hover:border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
                      />
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                      <SelectField
                        label="Year"
                        value={section.year}
                        onChange={(value) =>
                          updateEducationSection(section.id, "year", value)
                        }
                        options={getYearOptionsForExamination(
                          section.examination
                        )}
                        placeholder="Select Year"
                        required={false}
                      />
                      <div className="space-y-2">
                        <label className="block text-sm font-medium text-gray-700">
                          CGPA
                        </label>
                        <input
                          type="text"
                          value={section.cgpa}
                          onChange={(e) =>
                            updateEducationSection(
                              section.id,
                              "cgpa",
                              e.target.value
                            )
                          }
                          placeholder="Enter CGPA (e.g., 3.75)"
                          className="w-full px-4 py-3 border border-gray-200 rounded-lg transition-all duration-200 hover:border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
                        />
                      </div>
                    </div>
                  </>
                )}
              </div>
            </div>
          );
        })}
      </div>

      <div className="mb-8 sm:mb-12">
        <div className="flex items-center space-x-3 mb-6">
          <div className="w-8 h-8 bg-gray-800 rounded-lg flex items-center justify-center">
            <BookOpen className="w-4 h-4 text-white" />
          </div>
          <h2 className="text-xl sm:text-2xl font-semibold text-gray-800">
            Special Skills{" "}
            <span className="text-sm text-gray-500 ml-2">(Optional)</span>
          </h2>
        </div>
        {specialSkills.length > 0 && (
          <div className="mb-4 flex flex-wrap gap-2">
            {specialSkills.map((skill, index) => (
              <div
                key={index}
                className="flex items-center bg-blue-100 text-blue-800 px-3 py-1.5 rounded-full text-sm font-medium animate-fade-in"
              >
                <span>
                  {skill.type}: {skill.value}
                </span>
                <button
                  type="button"
                  onClick={() => removeSkill(index)}
                  className="ml-2 text-blue-600 hover:text-blue-800"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
        )}
        <div className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
            <SelectField
              label="Skill Type"
              value={skillInput.type}
              onChange={(value) =>
                setSkillInput((prev) => ({ ...prev, type: value }))
              }
              options={specialSkillOptions}
              placeholder="Select Skill Type"
              required={false}
            />
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">
                {skillInput.type === "Language" && "Language Name"}
                {skillInput.type === "IELTS" && "Band Score"}
                {skillInput.type === "PT" && "Score"}
                {skillInput.type === "Music Instrument" && "Instrument Name"}
                {skillInput.type &&
                  !["Language", "IELTS", "PT", "Music Instrument"].includes(
                    skillInput.type
                  ) &&
                  "Details"}
                {!skillInput.type && "Value"}
              </label>
              <input
                type="text"
                value={skillInput.value}
                onChange={(e) =>
                  setSkillInput((prev) => ({ ...prev, value: e.target.value }))
                }
                onKeyPress={(e) => {
                  if (e.key === "Enter") {
                    e.preventDefault();
                    handleAddSkill();
                  }
                }}
                placeholder={
                  skillInput.type === "Language"
                    ? "e.g., Spanish, French"
                    : skillInput.type === "IELTS"
                    ? "e.g., 7.5"
                    : skillInput.type === "PT"
                    ? "e.g., 550"
                    : skillInput.type === "Music Instrument"
                    ? "e.g., Guitar, Piano"
                    : "Enter details"
                }
                className="w-full px-4 py-3 border border-gray-200 rounded-lg transition-all duration-200 hover:border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
              />
            </div>
          </div>
          <div className="flex justify-start">
            <Button
              type="button"
              onClick={handleAddSkill}
              disabled={!skillInput.type || !skillInput.value.trim()}
              className="!px-6 !py-2.5 !rounded-lg !text-sm flex items-center space-x-2 disabled:!bg-gray-300 disabled:!cursor-not-allowed"
            >
              <Plus className="w-5 h-5" />
              <span>Add Skill</span>
            </Button>
          </div>
        </div>
      </div>

      <div className="mb-8 sm:mb-12">
        <div className="flex items-center space-x-3 mb-6">
          <div className="w-8 h-8 bg-gray-800 rounded-lg flex items-center justify-center">
            <BookOpen className="w-4 h-4 text-white" />
          </div>
          <h2 className="text-xl sm:text-2xl font-semibold text-gray-800">
            Teaching Experience
          </h2>
        </div>
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">
            Describe Your Teaching Experience{" "}
            <span className="text-red-500">*</span>
          </label>
          <textarea
            value={otherData.experience}
            onChange={(e) =>
              handleOtherDataChange("experience", e.target.value)
            }
            placeholder="Example: I have 2 years of experience teaching Mathematics and Physics to high school students..."
            rows={6}
            className="w-full px-4 py-3 border focus:border-blue-500 border-gray-200 hover:border-gray-300 focus:ring-2 focus:ring-blue-200 rounded-lg transition-all duration-200 resize-vertical"
            style={{ minHeight: "120px" }}
            ref={fieldRefs.experience}
          />
          {fieldErrors.experience && (
            <p className="mt-1 text-sm text-red-600">
              {fieldErrors.experience}
            </p>
          )}
        </div>
      </div>

      <div className="mb-8 sm:mb-12">
        <div className="space-y-4">
          <div className="w-full">
            <div className="flex items-center space-x-2 mb-2">
              <BookOpen className="w-4 h-4 text-gray-600" />
              <label className="block text-sm font-medium text-gray-700">
                Prefer Subjects (Type a subject and click + sign to add)
                <span className="text-red-500">*</span>
              </label>
            </div>
            <div
              className={`w-full border rounded-lg bg-white px-3 py-2 min-h-[52px] flex flex-wrap gap-2 items-center transition-all duration-200 focus-within:border-blue-500 focus-within:ring-2 focus-within:ring-blue-200 ${
                fieldErrors.preferredSubjects
                  ? "border-red-500"
                  : "border-gray-200"
              }`}
              onClick={() => fieldRefs.preferredSubjects.current?.focus()}
            >
              {otherData.preferredSubjects.map((subject, index) => (
                <div
                  key={index}
                  className="flex items-center bg-blue-100 text-blue-800 px-3 py-1.5 rounded-full text-sm font-medium animate-fade-in"
                >
                  <span>{subject}</span>
                  <button
                    type="button"
                    onClick={() => removeSubject(subject)}
                    className="ml-2 text-blue-600 hover:text-blue-800"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              ))}
              <div className="relative flex-1 min-w-[150px]">
                <input
                  type="text"
                  value={subjectInput}
                  onChange={(e) => setSubjectInput(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      e.preventDefault();
                      handleAddSubject();
                    }
                  }}
                  placeholder={
                    otherData.preferredSubjects.length === 0
                      ? "Type a subject and click + sign to add"
                      : "Add another subject..."
                  }
                  className="w-full bg-transparent border-none focus:ring-0 outline-none py-1 pr-10"
                  ref={fieldRefs.preferredSubjects}
                />
                <button
                  type="button"
                  onClick={handleAddSubject}
                  className="absolute top-1/2 right-1 -translate-y-1/2 flex h-8 w-8 items-center justify-center rounded-lg bg-blue-500 text-white transition-all hover:bg-blue-600 disabled:cursor-not-allowed disabled:bg-blue-300"
                  disabled={
                    !subjectInput.trim() || subjectInput.trim().length < 2
                  }
                >
                  <Plus className="w-5 h-5" />
                </button>
              </div>
            </div>
            {fieldErrors.preferredSubjects && (
              <p className="mt-1 text-sm text-red-600">
                {fieldErrors.preferredSubjects}
              </p>
            )}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8 sm:mb-12">
        <div className="w-full">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Suitable Thana to Teach <span className="text-red-500">*</span>
          </label>
          <div
            className={`w-full border rounded-lg bg-white px-3 py-2 min-h-[48px] flex flex-wrap gap-2 items-center transition-all duration-200 ${
              fieldErrors.suitableThana
                ? "border-red-500 focus-within:border-red-500 focus-within:ring-2 focus-within:ring-red-200"
                : "border-gray-200 hover:border-gray-300 focus-within:border-blue-500 focus-within:ring-2 focus-within:ring-blue-200"
            }`}
          >
            {suitableThana.map((item) => (
              <span
                key={item}
                className="flex items-center bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm"
              >
                {item}
                <button
                  type="button"
                  onClick={() =>
                    setSuitableThana((prev) => prev.filter((u) => u !== item))
                  }
                  className="ml-2 text-blue-600 hover:text-blue-800"
                >
                  <X className="w-3 h-3" />
                </button>
              </span>
            ))}
            <select
              className="flex-1 min-w-[120px] border-none focus:ring-0 outline-none text-sm py-1 bg-transparent"
              value=""
              onChange={(e) => {
                const val = e.target.value;
                if (val && !suitableThana.includes(val))
                  setSuitableThana([...suitableThana, val]);
              }}
              multiple={false}
            >
              <option value="" disabled>
                {thanas.length === 0 ? "Select Thana above first" : "Add Thana"}
              </option>
              {thanas
                .filter((u) => !suitableThana.includes(u))
                .map((u) => (
                  <option key={u} value={u}>
                    {u}
                  </option>
                ))}
            </select>
          </div>
          {fieldErrors.suitableThana && (
            <p className="mt-1 text-sm text-red-600">
              {fieldErrors.suitableThana}
            </p>
          )}
        </div>
        <div className="w-full">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Suitable Area to Teach <span className="text-red-500">*</span>
          </label>
          <div
            className={`w-full border rounded-lg bg-white px-3 py-2 min-h-[48px] flex flex-wrap gap-2 items-center transition-all duration-200 ${
              fieldErrors.suitableArea
                ? "border-red-500 focus-within:border-red-500 focus-within:ring-2 focus-within:ring-red-200"
                : "border-gray-200 hover:border-gray-300 focus-within:border-blue-500 focus-within:ring-2 focus-within:ring-blue-200"
            }`}
          >
            {suitableArea.map((area, idx) => (
              <span
                key={area + idx}
                className="flex items-center bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm"
              >
                {area}
                <button
                  type="button"
                  onClick={() => removeSuitableArea(area)}
                  className="ml-2 text-blue-600 hover:text-blue-800"
                >
                  <X className="w-3 h-3" />
                </button>
              </span>
            ))}
            <select
              className="flex-1 min-w-[120px] border-none focus:ring-0 outline-none text-sm py-1 bg-transparent"
              value=""
              onChange={(e) => {
                const val = e.target.value;
                if (val) addSuitableArea(val);
              }}
              disabled={suitableThana.length === 0}
              multiple={false}
            >
              <option value="" disabled>
                {suitableThana.length === 0
                  ? "Select Thana(s) first"
                  : "Add Area"}
              </option>
              {suitableAreaOptions
                .filter((area) => !suitableArea.includes(area))
                .map((area) => (
                  <option key={area} value={area}>
                    {area}
                  </option>
                ))}
            </select>
          </div>
          {fieldErrors.suitableArea && (
            <p className="mt-1 text-sm text-red-600">
              {fieldErrors.suitableArea}
            </p>
          )}
        </div>
      </div>
    </>
  );
};

export default ProfessionalInfoForm;
