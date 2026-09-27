import React, { memo } from "react";
import { GraduationCap, Plus, X, ChevronDown } from "lucide-react";

const MemoizedInput = memo(
  ({ label, type = "text", value, onChange, placeholder, required, error }) => (
    <div className="space-y-2">
      <label className="block text-sm font-medium text-gray-700">
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      <input
        type={type}
        value={value || ""}
        onChange={onChange}
        placeholder={placeholder}
        className={`w-full px-4 py-3 border ${
          error ? "border-red-500" : "border-gray-200"
        } rounded-lg transition-all duration-200 hover:border-gray-300 ${
          error
            ? "focus:border-red-500 focus:ring-2 focus:ring-red-200"
            : "focus:border-gray-800 focus:ring-2 focus:ring-gray-300"
        }`}
      />
      {error && <p className="mt-1 text-sm text-red-600">{error}</p>}
    </div>
  ),
);

const SelectField = ({
  label,
  value,
  onChange,
  options,
  placeholder,
  disabled = false,
  required = true,
  error,
}) => {
  return (
    <div className="space-y-2">
      <label className="block text-sm font-medium text-gray-700">
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      <div className="relative">
        <select
          value={value || ""}
          onChange={(e) => onChange(e.target.value)}
          disabled={disabled}
          className={`w-full px-4 py-3 border ${
            error ? "border-red-500" : "border-gray-200"
          } rounded-lg transition-all duration-200 hover:border-gray-300 ${
            error
              ? "focus:border-red-500 focus:ring-2 focus:ring-red-200"
              : "focus:border-gray-800 focus:ring-2 focus:ring-gray-300"
          } appearance-none bg-white disabled:bg-gray-100 disabled:cursor-not-allowed disabled:text-gray-500`}
        >
          <option value="">
            {disabled ? "Please select above first" : placeholder}
          </option>
          {options.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
        <ChevronDown className="absolute right-2 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
      </div>
      {error && <p className="mt-1 text-sm text-red-600">{error}</p>}
    </div>
  );
};

const EditTutorEducationInfoSection = ({
  educationSections,
  addEducationSection,
  removeEducationSection,
  updateEducationSection,
  getValidCurriculaForEnglishMedium,
  getYearOptionsForExamination,
  fieldErrors,
}) => {
  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 bg-gray-800 rounded-lg flex items-center justify-center">
            <GraduationCap className="w-4 h-4 text-white" />
          </div>
          <h2 className="text-xl font-semibold text-gray-800">
            Educational Info
          </h2>
        </div>
        <button
          type="button"
          onClick={addEducationSection}
          disabled={educationSections.length >= 4}
          className={`flex items-center space-x-2 transition-colors duration-200 px-3 py-2 rounded-lg ${
            educationSections.length >= 4
              ? "text-gray-400 bg-gray-100 cursor-not-allowed"
              : "text-blue-600 hover:text-blue-700 bg-blue-50 hover:bg-blue-100"
          }`}
        >
          <Plus className="w-4 h-4" />
          <span className="text-sm font-medium">
            {educationSections.length >= 4 ? "Maximum 4 Info" : "Add Info"}
          </span>
        </button>
      </div>
      {educationSections.map((section, index) => (
        <div
          key={section.id}
          className="mb-8 p-6 rounded-xl relative animate-fade-in"
        >
          {index >= 2 && (
            <button
              type="button"
              onClick={() => removeEducationSection(section.id)}
              className="absolute top-4 right-4 text-red-500 hover:text-red-700 transition-colors duration-200 bg-red-50 hover:bg-red-100 p-1 rounded-full"
            >
              <X className="w-5 h-5" />
            </button>
          )}
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-medium text-gray-700">
              {
                [
                  "SSC/O Levels/Dakhil",
                  "HSC/A Levels/Alim",
                  "Honors/Bachelor",
                  "Masters",
                ][index]
              }
              {index < 2 ? (
                <span className="text-red-500 ml-1">*</span>
              ) : (
                <span className="text-sm text-gray-500 ml-2">(Optional)</span>
              )}
            </h3>
          </div>
          <div className="grid grid-cols-1 gap-4 sm:gap-6">
            <MemoizedInput
              label="Institution"
              value={section.institution}
              onChange={(e) =>
                updateEducationSection(
                  section.id,
                  "institution",
                  e.target.value,
                )
              }
              placeholder="Institution Name"
              required={index < 2}
            />
            {section.examination === "SSC/O Level/Dakhil" ||
            section.examination === "HSC/A Levels/Alim" ? (
              <>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
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
                    required={index < 2}
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
                      required={index < 2}
                    />
                  )}
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                  <MemoizedInput
                    label="Board"
                    value={section.board}
                    onChange={(e) =>
                      updateEducationSection(
                        section.id,
                        "board",
                        e.target.value,
                      )
                    }
                    placeholder="Board"
                    required={index < 2}
                  />
                  <MemoizedInput
                    label="Group/Subject"
                    value={section.groupSubject}
                    onChange={(e) =>
                      updateEducationSection(
                        section.id,
                        "groupSubject",
                        e.target.value,
                      )
                    }
                    placeholder="Group/Subject"
                    required={index < 2}
                  />
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                  {section.medium !== "English Medium" && (
                    <MemoizedInput
                      label="GPA"
                      value={section.gpa}
                      onChange={(e) =>
                        updateEducationSection(
                          section.id,
                          "gpa",
                          e.target.value,
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
                      String(new Date().getFullYear() - i),
                    )}
                    placeholder="Select Year"
                    required={index < 2}
                    error={fieldErrors[`education_${section.id}_passingYear`]}
                  />
                </div>
              </>
            ) : (
              <>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                  <MemoizedInput
                    label="Department"
                    value={section.department}
                    onChange={(e) =>
                      updateEducationSection(
                        section.id,
                        "department",
                        e.target.value,
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
                    options={getYearOptionsForExamination(section.examination)}
                    placeholder="Select Year"
                    required={false}
                  />
                </div>
                <MemoizedInput
                  label="CGPA"
                  value={section.cgpa}
                  onChange={(e) =>
                    updateEducationSection(section.id, "cgpa", e.target.value)
                  }
                  placeholder="e.g., 3.75 or Running"
                  required={false}
                  error={fieldErrors[`education_${section.id}_cgpa`]}
                />
              </>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default EditTutorEducationInfoSection;
