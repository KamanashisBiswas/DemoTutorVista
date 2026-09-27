import React, { memo, useState } from "react";
import { MapPin, BookOpen, X, ChevronDown, Plus } from "lucide-react";

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

const EditTutorProfessionalInfoSection = ({
  user,
  addressInfo,
  handleAddressChange,
  divisions,
  districts,
  thanas,
  areas,
  otherData,
  handleOtherDataChange,
  addSubject,
  removeSubject,
  currentSkill,
  setCurrentSkill,
  specialSkillOptions,
  suitableThana,
  setSuitableThana,
  suitableArea,
  setSuitableArea,
  suitableAreaOptions,
  fieldErrors,
}) => {
  const [subjectInput, setSubjectInput] = useState("");

  const handleAddSubject = () => {
    const trimmedValue = subjectInput.trim();
    if (trimmedValue && trimmedValue.length >= 2) {
      addSubject(trimmedValue);
      setSubjectInput("");
    }
  };

  return (
    <>
      {/* Address */}
      <div>
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-gray-800 rounded-lg flex items-center justify-center">
              <MapPin className="w-4 h-4 text-white" />
            </div>
            <h2 className="text-xl font-semibold text-gray-800">Address</h2>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <SelectField
            label="Division"
            value={addressInfo.division}
            onChange={(v) => handleAddressChange("division", v)}
            options={divisions}
            placeholder="Select Division"
            error={fieldErrors.division}
          />
          <SelectField
            label="District"
            value={addressInfo.district}
            onChange={(v) => handleAddressChange("district", v)}
            options={districts}
            placeholder={
              !addressInfo.division
                ? "Select Division first"
                : "Select District"
            }
            disabled={!addressInfo.division}
            error={fieldErrors.district}
          />
          <SelectField
            label="Thana"
            value={addressInfo.thana}
            onChange={(v) => handleAddressChange("thana", v)}
            options={thanas}
            placeholder={
              !addressInfo.district ? "Select District first" : "Select Thana"
            }
            disabled={!addressInfo.district}
            error={fieldErrors.thana}
          />
          <SelectField
            label="Area"
            value={addressInfo.area}
            onChange={(v) => handleAddressChange("area", v)}
            options={areas}
            placeholder={
              !addressInfo.thana ? "Select thana first" : "Select Area"
            }
            disabled={!addressInfo.thana}
            error={fieldErrors.area}
          />
        </div>
      </div>

      {/* Experience */}
      <div>
        <div className="flex items-center space-x-3 mb-6">
          <div className="w-8 h-8 bg-gray-800 rounded-lg flex items-center justify-center">
            <BookOpen className="w-4 h-4 text-white" />
          </div>
          <h2 className="text-xl font-semibold text-gray-800">
            Teaching Experience
          </h2>
        </div>
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">
            Describe Your Teaching Experience{" "}
            <span className="text-red-500">*</span>
          </label>
          <p className="text-xs text-gray-500 mb-3">
            Please describe your teaching experience, including subjects taught,
            duration, and any relevant achievements or qualifications.
          </p>
          <textarea
            value={otherData.experience}
            onChange={(e) =>
              handleOtherDataChange("experience", e.target.value)
            }
            placeholder="Example: I have 2 years of experience teaching Mathematics and Physics..."
            rows={6}
            className={`w-full px-4 py-3 border ${
              fieldErrors.experience ? "border-red-500" : "border-gray-200"
            } rounded-lg transition-all duration-200 hover:border-gray-300 ${
              fieldErrors.experience
                ? "focus:border-red-500 focus:ring-2 focus:ring-red-200"
                : "focus:border-gray-800 focus:ring-2 focus:ring-gray-300"
            } resize-vertical`}
            style={{ minHeight: "120px" }}
          />
          {fieldErrors.experience && (
            <p className="mt-1 text-sm text-red-600">
              {fieldErrors.experience}
            </p>
          )}
          <div className="flex justify-between items-center text-xs text-gray-500">
            <span>Minimum 50 characters required</span>
            <span
              className={`${
                otherData.experience.length < 50
                  ? "text-red-500"
                  : "text-green-500"
              }`}
            >
              {otherData.experience.length} characters
            </span>
          </div>
        </div>
      </div>

      {/* Subjects */}
      <div>
        <div className="space-y-4">
          <div className="w-full">
            <div className="flex items-center space-x-2 mb-2">
              <BookOpen className="w-4 h-4 text-gray-600" />
              <label className="block text-sm font-medium text-gray-700">
                Prefer Subjects (Type a subject and click + to add){" "}
                <span className="text-red-500">*</span>
              </label>
            </div>
            <div
              className={`w-full border rounded-lg bg-white px-3 py-2 min-h-[52px] flex flex-wrap gap-2 items-center transition-all duration-200 focus-within:border-blue-500 focus-within:ring-2 focus-within:ring-blue-200 ${
                fieldErrors.preferredSubjects
                  ? "border-red-500"
                  : "border-gray-200"
              }`}
            >
              {otherData.preferredSubjects.map((subject, index) => (
                <div
                  key={index}
                  className="flex items-center bg-blue-100 text-blue-800 px-3 py-1.5 rounded-full text-sm font-medium"
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
                      ? "Type a subject and click + to add"
                      : "Add another subject..."
                  }
                  className="w-full bg-transparent border-none focus:ring-0 outline-none py-1 pr-10"
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

      {/* Special Skills */}
      <div>
        <div className="flex items-center space-x-3 mb-6">
          <div className="w-8 h-8 bg-gray-800 rounded-lg flex items-center justify-center">
            <BookOpen className="w-4 h-4 text-white" />
          </div>
          <h2 className="text-xl font-semibold text-gray-800">
            Special Skills{" "}
            <span className="text-sm text-gray-500 ml-2">(Optional)</span>
          </h2>
        </div>
        <div className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
            <SelectField
              label="Skill Type"
              value={currentSkill.type}
              onChange={(value) =>
                setCurrentSkill((prev) => ({ ...prev, type: value, value: "" }))
              }
              options={specialSkillOptions}
              placeholder="Select Skill Type"
              required={false}
            />
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">
                {currentSkill.type === "Language" && "Language Name"}
                {currentSkill.type === "IELTS" && "Band Score"}
                {currentSkill.type === "PT" && "Score"}
                {currentSkill.type === "Music Instrument" && "Instrument Name"}
                {currentSkill.type &&
                  !["Language", "IELTS", "PT", "Music Instrument"].includes(
                    currentSkill.type,
                  ) &&
                  "Details"}
                {!currentSkill.type && "Value"}
              </label>
              <input
                type="text"
                value={currentSkill.value}
                onChange={(e) =>
                  setCurrentSkill((prev) => ({
                    ...prev,
                    value: e.target.value,
                  }))
                }
                placeholder={
                  currentSkill.type === "Language"
                    ? "e.g., Spanish, French"
                    : currentSkill.type === "IELTS"
                      ? "e.g., 7.5"
                      : currentSkill.type === "PT"
                        ? "e.g., 550"
                        : currentSkill.type === "Music Instrument"
                          ? "e.g., Guitar, Piano"
                          : "Enter details"
                }
                className="w-full px-4 py-3 border border-gray-200 rounded-lg transition-all duration-200 hover:border-gray-300 focus:border-gray-800 focus:ring-2 focus:ring-gray-300"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Suitable Locations */}
      {user?.role === "admin" && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <div className="w-full">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Suitable Thana <span className="text-red-500">*</span>
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
                  if (val && !suitableThana.includes(val)) {
                    setSuitableThana([...suitableThana, val]);
                  }
                }}
                multiple={false}
              >
                <option value="" disabled>
                  {thanas.length === 0
                    ? "Select Thana above first"
                    : "Add Thana"}
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
              Suitable Area <span className="text-red-500">*</span>
            </label>
            <div
              className={`flex flex-wrap gap-2 p-3 border rounded-lg bg-white min-h-[48px] transition-all duration-200 ${
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
                    onClick={() =>
                      setSuitableArea((prev) => prev.filter((a) => a !== area))
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
                  if (val && !suitableArea.includes(val)) {
                    setSuitableArea((prev) => [...prev, val]);
                  }
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
      )}
    </>
  );
};

export default EditTutorProfessionalInfoSection;
