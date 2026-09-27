import React from "react";
import { GraduationCap, BookOpen, Plus, X, Award, Briefcase, MapPin } from "lucide-react";
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
      {/* Educational Info */}
      <div className="mb-8 pb-8 border-b border-[#E4E6EE]">
        <div className="flex items-center space-x-3 mb-5">
          <div className="w-8 h-8 bg-[#EEEDFD] text-[#3730E0] rounded-sm flex items-center justify-center">
            <GraduationCap className="w-4 h-4" />
          </div>
          <h3 className="text-base sm:text-lg font-bold text-[#1A1D29]">
            Educational Qualifications
          </h3>
        </div>

        <div className="space-y-6">
          {educationSections.map((section, index) => {
            const sectionNames = [
              { name: "Secondary (SSC / O Level / Dakhil)", required: true },
              { name: "Higher Secondary (HSC / A Level / Alim)", required: true },
              { name: "Graduation (Honors / Bachelor)", required: false },
              { name: "Post Graduation (Masters)", required: false },
            ];
            const currentSection = sectionNames[index];
            return (
              <div
                key={section.id}
                className="p-4 sm:p-5 border border-[#E4E6EE] rounded-md bg-[#F7F8FB]/50"
              >
                <div className="flex items-center justify-between mb-4 pb-2 border-b border-[#E4E6EE]">
                  <h4 className="text-xs sm:text-sm font-bold text-[#1A1D29]">
                    {currentSection.name}{" "}
                    {currentSection.required ? (
                      <span className="text-[#DC2626]">*</span>
                    ) : (
                      <span className="text-xs font-normal text-[#5B5F73]">
                        (Optional)
                      </span>
                    )}
                  </h4>
                </div>

                <div className="grid grid-cols-1 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-[#1A1D29] mb-1.5">
                      Institution Name{" "}
                      {currentSection.required && (
                        <span className="text-[#DC2626]">*</span>
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
                      className={`w-full px-3.5 py-2.5 text-xs sm:text-sm border ${
                        fieldErrors[`education_${section.id}_institution`]
                          ? "border-[#DC2626]"
                          : "border-[#E4E6EE]"
                      } rounded-sm transition-all duration-150 text-[#1A1D29] placeholder-[#5B5F73]/50 ${
                        fieldErrors[`education_${section.id}_institution`]
                          ? "focus:border-[#DC2626] focus:ring-2 focus:ring-[#DC2626]/15"
                          : "focus:border-[#3730E0] focus:ring-2 focus:ring-[#3730E0]/15"
                      }`}
                    />
                    {fieldErrors[`education_${section.id}_institution`] && (
                      <p className="mt-1 text-xs text-[#DC2626]">
                        {fieldErrors[`education_${section.id}_institution`]}
                      </p>
                    )}
                  </div>

                  {(section.examination === "SSC/O Level/Dakhil" ||
                    section.examination === "HSC/A Levels/Alim") && (
                    <>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
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
                        {section.medium === "English Medium" ? (
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
                        ) : (
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
                        )}
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-xs font-semibold text-[#1A1D29] mb-1.5">
                            Board{" "}
                            {currentSection.required && (
                              <span className="text-[#DC2626]">*</span>
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
                            placeholder="e.g., Dhaka, Chattogram, Cambridge"
                            className={`w-full px-3.5 py-2.5 text-xs sm:text-sm border ${
                              fieldErrors[`education_${section.id}_board`]
                                ? "border-[#DC2626]"
                                : "border-[#E4E6EE]"
                            } rounded-sm transition-all duration-150 text-[#1A1D29] placeholder-[#5B5F73]/50 focus:border-[#3730E0] focus:ring-2 focus:ring-[#3730E0]/15`}
                          />
                          {fieldErrors[`education_${section.id}_board`] && (
                            <p className="mt-1 text-xs text-[#DC2626]">
                              {fieldErrors[`education_${section.id}_board`]}
                            </p>
                          )}
                        </div>

                        <div>
                          <label className="block text-xs font-semibold text-[#1A1D29] mb-1.5">
                            Group / Subject{" "}
                            {currentSection.required && (
                              <span className="text-[#DC2626]">*</span>
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
                            placeholder="e.g., Science, Business Studies, Humanities"
                            className={`w-full px-3.5 py-2.5 text-xs sm:text-sm border ${
                              fieldErrors[`education_${section.id}_groupSubject`]
                                ? "border-[#DC2626]"
                                : "border-[#E4E6EE]"
                            } rounded-sm transition-all duration-150 text-[#1A1D29] placeholder-[#5B5F73]/50 focus:border-[#3730E0] focus:ring-2 focus:ring-[#3730E0]/15`}
                          />
                          {fieldErrors[
                            `education_${section.id}_groupSubject`
                          ] && (
                            <p className="mt-1 text-xs text-[#DC2626]">
                              {
                                fieldErrors[
                                  `education_${section.id}_groupSubject`
                                ]
                              }
                            </p>
                          )}
                        </div>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        {section.medium !== "English Medium" && (
                          <div>
                            <label className="block text-xs font-semibold text-[#1A1D29] mb-1.5">
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
                              placeholder="e.g., 5.00 or Golden A+"
                              className={`w-full px-3.5 py-2.5 text-xs sm:text-sm border ${
                                fieldErrors[`education_${section.id}_gpa`]
                                  ? "border-[#DC2626]"
                                  : "border-[#E4E6EE]"
                              } rounded-sm transition-all duration-150 text-[#1A1D29] placeholder-[#5B5F73]/50 focus:border-[#3730E0] focus:ring-2 focus:ring-[#3730E0]/15`}
                            />
                            {fieldErrors[`education_${section.id}_gpa`] && (
                              <p className="mt-1 text-xs text-[#DC2626]">
                                {fieldErrors[`education_${section.id}_gpa`]}
                              </p>
                            )}
                          </div>
                        )}
                        {section.medium === "English Medium" && (
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
                        )}
                      </div>
                    </>
                  )}

                  {(section.examination === "Honours" ||
                    section.examination === "Masters") && (
                    <>
                      <div>
                        <label className="block text-xs font-semibold text-[#1A1D29] mb-1.5">
                          Department / Major
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
                          placeholder="e.g., Computer Science, Economics, BBA"
                          className="w-full px-3.5 py-2.5 text-xs sm:text-sm border border-[#E4E6EE] rounded-sm transition-all duration-150 text-[#1A1D29] placeholder-[#5B5F73]/50 focus:border-[#3730E0] focus:ring-2 focus:ring-[#3730E0]/15"
                        />
                      </div>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <SelectField
                          label="Year / Status"
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
                        <div>
                          <label className="block text-xs font-semibold text-[#1A1D29] mb-1.5">
                            CGPA (Optional)
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
                            placeholder="e.g., 3.80 out of 4.00"
                            className="w-full px-3.5 py-2.5 text-xs sm:text-sm border border-[#E4E6EE] rounded-sm transition-all duration-150 text-[#1A1D29] placeholder-[#5B5F73]/50 focus:border-[#3730E0] focus:ring-2 focus:ring-[#3730E0]/15"
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
      </div>

      {/* Special Skills */}
      <div className="mb-8 pb-8 border-b border-[#E4E6EE]">
        <div className="flex items-center space-x-3 mb-5">
          <div className="w-8 h-8 bg-[#EEEDFD] text-[#3730E0] rounded-sm flex items-center justify-center">
            <Award className="w-4 h-4" />
          </div>
          <h3 className="text-base sm:text-lg font-bold text-[#1A1D29]">
            Special Skills <span className="text-xs font-normal text-[#5B5F73]">(Optional)</span>
          </h3>
        </div>

        {specialSkills.length > 0 && (
          <div className="mb-4 flex flex-wrap gap-2">
            {specialSkills.map((skill, index) => (
              <div
                key={index}
                className="inline-flex items-center gap-1.5 bg-[#EEEDFD] text-[#3730E0] border border-[#3730E0]/15 px-3 py-1 rounded-full text-xs font-medium"
              >
                <span>
                  {skill.type}: <strong>{skill.value}</strong>
                </span>
                <button
                  type="button"
                  onClick={() => removeSkill(index)}
                  className="text-[#3730E0]/70 hover:text-[#DC2626] transition-colors cursor-pointer"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              </div>
            ))}
          </div>
        )}

        <div className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
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
            <div>
              <label className="block text-xs font-semibold text-[#1A1D29] mb-1.5">
                {skillInput.type === "Language" && "Language Name"}
                {skillInput.type === "IELTS" && "Band Score"}
                {skillInput.type === "PT" && "Score"}
                {skillInput.type === "Music Instrument" && "Instrument Name"}
                {skillInput.type &&
                  !["Language", "IELTS", "PT", "Music Instrument"].includes(
                    skillInput.type
                  ) &&
                  "Details"}
                {!skillInput.type && "Skill Detail"}
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
                    ? "e.g., German, French"
                    : skillInput.type === "IELTS"
                    ? "e.g., 7.5"
                    : skillInput.type === "PT"
                    ? "e.g., 550"
                    : skillInput.type === "Music Instrument"
                    ? "e.g., Guitar, Violin"
                    : "Enter details"
                }
                className="w-full px-3.5 py-2.5 text-xs sm:text-sm border border-[#E4E6EE] rounded-sm transition-all duration-150 text-[#1A1D29] placeholder-[#5B5F73]/50 focus:border-[#3730E0] focus:ring-2 focus:ring-[#3730E0]/15"
              />
            </div>
          </div>
          <div>
            <Button
              type="button"
              variant="secondary"
              size="sm"
              onClick={handleAddSkill}
              disabled={!skillInput.type || !skillInput.value.trim()}
              iconLeft={Plus}
            >
              Add Skill
            </Button>
          </div>
        </div>
      </div>

      {/* Teaching Experience */}
      <div className="mb-8 pb-8 border-b border-[#E4E6EE]">
        <div className="flex items-center space-x-3 mb-5">
          <div className="w-8 h-8 bg-[#EEEDFD] text-[#3730E0] rounded-sm flex items-center justify-center">
            <Briefcase className="w-4 h-4" />
          </div>
          <h3 className="text-base sm:text-lg font-bold text-[#1A1D29]">
            Teaching Experience
          </h3>
        </div>

        <div>
          <label className="block text-xs font-semibold text-[#1A1D29] mb-1.5">
            Describe Your Teaching Experience <span className="text-[#DC2626]">*</span>
          </label>
          <textarea
            value={otherData.experience}
            onChange={(e) =>
              handleOtherDataChange("experience", e.target.value)
            }
            placeholder="e.g., I have 3 years of tutoring experience in Mathematics and Physics for O Levels and HSC students..."
            rows={4}
            className={`w-full px-3.5 py-2.5 text-xs sm:text-sm border ${
              fieldErrors.experience ? "border-[#DC2626]" : "border-[#E4E6EE]"
            } rounded-sm transition-all duration-150 text-[#1A1D29] placeholder-[#5B5F73]/50 focus:border-[#3730E0] focus:ring-2 focus:ring-[#3730E0]/15 resize-vertical`}
            style={{ minHeight: "100px" }}
            ref={fieldRefs.experience}
          />
          {fieldErrors.experience && (
            <p className="mt-1 text-xs text-[#DC2626]">
              {fieldErrors.experience}
            </p>
          )}
        </div>
      </div>

      {/* Preferred Subjects */}
      <div className="mb-8 pb-8 border-b border-[#E4E6EE]">
        <div className="flex items-center space-x-3 mb-5">
          <div className="w-8 h-8 bg-[#EEEDFD] text-[#3730E0] rounded-sm flex items-center justify-center">
            <BookOpen className="w-4 h-4" />
          </div>
          <h3 className="text-base sm:text-lg font-bold text-[#1A1D29]">
            Preferred Subjects to Teach
          </h3>
        </div>

        <div>
          <label className="block text-xs font-semibold text-[#1A1D29] mb-1.5">
            Subjects (Type a subject and press Enter or +) <span className="text-[#DC2626]">*</span>
          </label>
          <div
            className={`w-full border rounded-sm bg-white px-3 py-2 min-h-[46px] flex flex-wrap gap-1.5 items-center transition-all duration-150 focus-within:border-[#3730E0] focus-within:ring-2 focus-within:ring-[#3730E0]/15 ${
              fieldErrors.preferredSubjects
                ? "border-[#DC2626]"
                : "border-[#E4E6EE]"
            }`}
            onClick={() => fieldRefs.preferredSubjects.current?.focus()}
          >
            {otherData.preferredSubjects.map((subject, index) => (
              <div
                key={index}
                className="inline-flex items-center gap-1 bg-[#EEEDFD] text-[#3730E0] border border-[#3730E0]/15 px-2.5 py-1 rounded-full text-xs font-medium"
              >
                <span>{subject}</span>
                <button
                  type="button"
                  onClick={() => removeSubject(subject)}
                  className="text-[#3730E0]/70 hover:text-[#DC2626] transition-colors cursor-pointer"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              </div>
            ))}
            <div className="relative flex-1 min-w-[150px] flex items-center">
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
                    ? "e.g., Mathematics, General Science"
                    : "Add another subject..."
                }
                className="w-full bg-transparent border-none focus:ring-0 outline-none text-xs sm:text-sm py-1 pr-9 text-[#1A1D29] placeholder-[#5B5F73]/50"
                ref={fieldRefs.preferredSubjects}
              />
              <button
                type="button"
                onClick={handleAddSubject}
                className="absolute right-0 top-1/2 -translate-y-1/2 flex h-7 w-7 items-center justify-center rounded-sm bg-[#3730E0] text-white hover:bg-[#2D24C4] transition-colors disabled:cursor-not-allowed disabled:bg-gray-300"
                disabled={
                  !subjectInput.trim() || subjectInput.trim().length < 2
                }
              >
                <Plus className="w-4 h-4" />
              </button>
            </div>
          </div>
          {fieldErrors.preferredSubjects && (
            <p className="mt-1 text-xs text-[#DC2626]">
              {fieldErrors.preferredSubjects}
            </p>
          )}
        </div>
      </div>

      {/* Suitable Locations to Teach */}
      <div className="mb-8 pb-8 border-b border-[#E4E6EE]">
        <div className="flex items-center space-x-3 mb-5">
          <div className="w-8 h-8 bg-[#EEEDFD] text-[#3730E0] rounded-sm flex items-center justify-center">
            <MapPin className="w-4 h-4" />
          </div>
          <h3 className="text-base sm:text-lg font-bold text-[#1A1D29]">
            Suitable Locations to Teach
          </h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div>
            <label className="block text-xs font-semibold text-[#1A1D29] mb-1.5">
              Suitable Thanas <span className="text-[#DC2626]">*</span>
            </label>
            <div
              className={`w-full border rounded-sm bg-white px-3 py-2 min-h-[44px] flex flex-wrap gap-1.5 items-center transition-all duration-150 ${
                fieldErrors.suitableThana
                  ? "border-[#DC2626] focus-within:border-[#DC2626] focus-within:ring-2 focus-within:ring-[#DC2626]/15"
                  : "border-[#E4E6EE] hover:border-[#CBD5E1] focus-within:border-[#3730E0] focus-within:ring-2 focus-within:ring-[#3730E0]/15"
              }`}
            >
              {suitableThana.map((item) => (
                <span
                  key={item}
                  className="inline-flex items-center gap-1 bg-[#EEEDFD] text-[#3730E0] border border-[#3730E0]/15 px-2.5 py-1 rounded-full text-xs font-medium"
                >
                  {item}
                  <button
                    type="button"
                    onClick={() =>
                      setSuitableThana((prev) => prev.filter((u) => u !== item))
                    }
                    className="text-[#3730E0]/70 hover:text-[#DC2626] transition-colors cursor-pointer"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                </span>
              ))}
              <select
                className="flex-1 min-w-[120px] border-none focus:ring-0 outline-none text-xs sm:text-sm py-1 bg-transparent text-[#1A1D29] cursor-pointer"
                value=""
                onChange={(e) => {
                  const val = e.target.value;
                  if (val && !suitableThana.includes(val))
                    setSuitableThana([...suitableThana, val]);
                }}
                multiple={false}
              >
                <option value="" disabled>
                  {thanas.length === 0 ? "Select Thana above first" : "+ Add Thana"}
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
              <p className="mt-1 text-xs text-[#DC2626]">
                {fieldErrors.suitableThana}
              </p>
            )}
          </div>

          <div>
            <label className="block text-xs font-semibold text-[#1A1D29] mb-1.5">
              Suitable Areas <span className="text-[#DC2626]">*</span>
            </label>
            <div
              className={`w-full border rounded-sm bg-white px-3 py-2 min-h-[44px] flex flex-wrap gap-1.5 items-center transition-all duration-150 ${
                fieldErrors.suitableArea
                  ? "border-[#DC2626] focus-within:border-[#DC2626] focus-within:ring-2 focus-within:ring-[#DC2626]/15"
                  : "border-[#E4E6EE] hover:border-[#CBD5E1] focus-within:border-[#3730E0] focus-within:ring-2 focus-within:ring-[#3730E0]/15"
              }`}
            >
              {suitableArea.map((area, idx) => (
                <span
                  key={area + idx}
                  className="inline-flex items-center gap-1 bg-[#EEEDFD] text-[#3730E0] border border-[#3730E0]/15 px-2.5 py-1 rounded-full text-xs font-medium"
                >
                  {area}
                  <button
                    type="button"
                    onClick={() => removeSuitableArea(area)}
                    className="text-[#3730E0]/70 hover:text-[#DC2626] transition-colors cursor-pointer"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                </span>
              ))}
              <select
                className="flex-1 min-w-[120px] border-none focus:ring-0 outline-none text-xs sm:text-sm py-1 bg-transparent text-[#1A1D29] cursor-pointer"
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
                    : "+ Add Area"}
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
              <p className="mt-1 text-xs text-[#DC2626]">
                {fieldErrors.suitableArea}
              </p>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default ProfessionalInfoForm;
