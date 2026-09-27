import React, { memo } from "react";
import { GraduationCap, BookOpen, ChevronDown, Plus, X } from "lucide-react";

// Memoized Input Component
const MemoizedInput = memo(
  ({
    label,
    type = "text",
    value,
    onChange,
    placeholder,
    required = true,
    error,
  }) => (
    <div className="space-y-2">
      <label className="block text-sm font-medium text-gray-700">
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      <input
        type={type}
        value={value || ""}
        onChange={onChange}
        placeholder={placeholder}
        className={`w-full px-4 py-3 border rounded-lg transition-all duration-200 text-sm focus:border-black focus:ring-1 focus:ring-black ${
          error ? "" : ""
        }`}
      />
      {error && <p className="mt-1 text-sm text-red-600">{error}</p>}
    </div>
  )
);

// Select Field Component
const SelectField = ({
  label,
  value,
  onChange,
  options,
  placeholder,
  disabled = false,
  required = true,
  error,
}) => (
  <div className="space-y-2">
    <label className="block text-sm font-medium text-gray-700">
      {label} {required && <span className="text-red-500">*</span>}
    </label>
    <div className="relative">
      <select
        value={value || ""}
        onChange={(e) => onChange(e.target.value)}
        disabled={disabled}
        className={`w-full px-4 py-3 border rounded-lg transition-all duration-200 text-sm focus:border-black focus:ring-1 focus:ring-black appearance-none bg-white disabled:bg-gray-100 disabled:cursor-not-allowed ${
          error ? "" : ""
        }`}
      >
        {placeholder && (
          <option value="" disabled>
            {disabled ? "Please select above first" : placeholder}
          </option>
        )}
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
      <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-gray-500">
        <ChevronDown className="w-4 h-4" />
      </div>
    </div>
    {error && <p className="mt-1 text-sm text-red-600">{error}</p>}
  </div>
);

const TutorEducationInfoSection = ({
  educationSections,
  updateEducationSection,
  fieldErrors,
  skillInput,
  setSkillInput,
  specialSkills,
  handleAddSkill,
  removeSkill,
  specialSkillOptions,
  getValidCurriculaForEnglishMedium,
  getYearOptionsForExamination,
}) => {
  return (
    <>
      {/* Educational Info */}
      <div className="p-4 border rounded-lg">
        <h3 className="text-lg font-semibold mb-4 flex items-center">
          <GraduationCap className="mr-2" />
          Educational Info
        </h3>
        {educationSections.map((section, index) => {
          const sectionNames = [
            "SSC/O Levels/Dakhil",
            "HSC/A Levels/Alim",
            "Honors/Bachelor",
            "Masters",
          ];
          const isRequired = index < 2;
          return (
            <div
              key={section.id}
              className="mb-6 p-4 border rounded-md relative"
            >
              <h4 className="font-medium text-gray-800 mb-2">
                {sectionNames[index]}{" "}
                {isRequired ? (
                  <span className="text-red-500">*</span>
                ) : (
                  <span className="text-sm text-gray-500">(Optional)</span>
                )}
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <MemoizedInput
                  label="Institution"
                  value={section.institution}
                  onChange={(e) =>
                    updateEducationSection(
                      section.id,
                      "institution",
                      e.target.value
                    )
                  }
                  placeholder="Institution Name"
                  required={isRequired}
                  error={fieldErrors[`education_${section.id}_institution`]}
                />
                {section.examination === "SSC/O Level/Dakhil" ||
                section.examination === "HSC/A Levels/Alim" ? (
                  <>
                    <SelectField
                      label="Medium"
                      value={section.medium}
                      onChange={(v) => {
                        updateEducationSection(section.id, "medium", v);
                        updateEducationSection(section.id, "curriculum", "");
                        if (v === "English Medium") {
                          updateEducationSection(section.id, "gpa", "");
                        }
                      }}
                      options={[
                        "Bangla Medium",
                        "English Medium",
                        "English Version (National Curriculum)",
                        "Arabic Medium",
                      ]}
                      placeholder="Select Medium"
                      required={isRequired}
                      error={fieldErrors[`education_${section.id}_medium`]}
                    />
                    {section.medium === "English Medium" && (
                      <SelectField
                        label="Curriculum"
                        value={section.curriculum}
                        onChange={(v) =>
                          updateEducationSection(section.id, "curriculum", v)
                        }
                        options={getValidCurriculaForEnglishMedium()}
                        placeholder="Select Curriculum"
                        required={isRequired}
                        error={
                          fieldErrors[`education_${section.id}_curriculum`]
                        }
                      />
                    )}
                    <MemoizedInput
                      label="Board"
                      value={section.board}
                      onChange={(e) =>
                        updateEducationSection(
                          section.id,
                          "board",
                          e.target.value
                        )
                      }
                      placeholder="Board"
                      required={isRequired}
                      error={fieldErrors[`education_${section.id}_board`]}
                    />
                    <MemoizedInput
                      label="Group/Subject"
                      value={section.groupSubject}
                      onChange={(e) =>
                        updateEducationSection(
                          section.id,
                          "groupSubject",
                          e.target.value
                        )
                      }
                      placeholder="Group/Subject"
                      required={isRequired}
                      error={
                        fieldErrors[`education_${section.id}_groupSubject`]
                      }
                    />
                    {section.medium !== "English Medium" && (
                      <MemoizedInput
                        label="GPA"
                        value={section.gpa}
                        onChange={(e) =>
                          updateEducationSection(
                            section.id,
                            "gpa",
                            e.target.value
                          )
                        }
                        placeholder="e.g., 4.50 or Golden A+"
                        required={false}
                        error={fieldErrors[`education_${section.id}_gpa`]}
                      />
                    )}
                    <SelectField
                      label="Passing Year"
                      value={section.passingYear}
                      onChange={(v) =>
                        updateEducationSection(section.id, "passingYear", v)
                      }
                      options={Array.from({ length: 40 }, (_, i) =>
                        String(new Date().getFullYear() - i)
                      )}
                      placeholder="Select Year"
                      required={isRequired}
                      error={fieldErrors[`education_${section.id}_passingYear`]}
                    />
                  </>
                ) : (
                  <>
                    <MemoizedInput
                      label="Department"
                      value={section.department}
                      onChange={(e) =>
                        updateEducationSection(
                          section.id,
                          "department",
                          e.target.value
                        )
                      }
                      placeholder="Department"
                      required={false}
                    />
                    <SelectField
                      label="Year"
                      value={section.year}
                      onChange={(v) =>
                        updateEducationSection(section.id, "year", v)
                      }
                      options={getYearOptionsForExamination(
                        section.examination
                      )}
                      placeholder="Select Year"
                      required={false}
                    />
                    <MemoizedInput
                      label="CGPA"
                      value={section.cgpa}
                      onChange={(e) =>
                        updateEducationSection(
                          section.id,
                          "cgpa",
                          e.target.value
                        )
                      }
                      placeholder="CGPA (out of 4.00)"
                      required={false}
                      error={fieldErrors[`education_${section.id}_cgpa`]}
                    />
                  </>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Special Skills */}
      <div className="p-4 border rounded-lg">
        <h3 className="text-lg font-semibold mb-4 flex items-center">
          <BookOpen className="mr-2" />
          Special Skills{" "}
          <span className="text-sm text-gray-500 ml-2">(Optional)</span>
        </h3>

        {specialSkills.length > 0 && (
          <div className="mb-4 space-y-2">
            <label className="block text-sm font-medium text-gray-700">
              Added Skills
            </label>
            <div className="flex flex-wrap gap-2 p-2 border border-gray-200 rounded-lg">
              {specialSkills.map((skill, index) => (
                <div
                  key={index}
                  className="flex items-center bg-green-100 text-green-800 px-3 py-1.5 rounded-full text-sm"
                >
                  <span className="font-semibold">{skill.type}:</span>
                  <span className="ml-1.5">{skill.value}</span>
                  <button
                    type="button"
                    onClick={() => removeSkill(index)}
                    className="ml-2 text-green-600 hover:text-green-800"
                  >
                    <X size={14} />
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        <div className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 items-end">
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
                  setSkillInput((prev) => ({
                    ...prev,
                    value: e.target.value,
                  }))
                }
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
                className="w-full px-4 py-3 border border-gray-200 rounded-lg transition-all duration-200 hover:border-gray-300 focus:border-black focus:ring-1 focus:ring-black"
              />
            </div>
          </div>
          <div className="flex justify-end mt-2">
            <button
              type="button"
              onClick={handleAddSkill}
              className="flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              <Plus size={16} className="mr-2" />
              Add Skill
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default TutorEducationInfoSection;
