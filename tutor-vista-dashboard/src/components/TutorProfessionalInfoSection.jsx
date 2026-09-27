import React, { useState } from "react";
import { MapPin, BookOpen, X, ChevronDown, Plus } from "lucide-react";

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
  selectRef,
}) => (
  <div className="space-y-2">
    <label className="block text-sm font-medium text-gray-700">
      {label} {required && <span className="text-red-500">*</span>}
    </label>
    <div className="relative">
      <select
        ref={selectRef}
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

const TutorProfessionalInfoSection = ({
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
  suitableThana,
  setSuitableThana,
  suitableArea,
  setSuitableArea,
  suitableAreaOptions,
  fieldErrors,
  fieldRefs,
}) => {
  const [subjectInput, setSubjectInput] = useState("");
  return (
    <>
      {/* Address */}
      <div className="p-4 border rounded-lg">
        <h3 className="text-lg font-semibold mb-4 flex items-center">
          <MapPin className="mr-2" />
          Address
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <SelectField
            label="Division"
            value={addressInfo.division}
            onChange={(v) => handleAddressChange("division", v)}
            options={divisions}
            placeholder="Select Division"
            error={fieldErrors.division}
            selectRef={fieldRefs.division}
          />
          <SelectField
            label="District"
            value={addressInfo.district}
            onChange={(v) => handleAddressChange("district", v)}
            options={districts}
            placeholder="Select District"
            disabled={!addressInfo.division}
            error={fieldErrors.district}
            selectRef={fieldRefs.district}
          />
          <SelectField
            label="Thana"
            value={addressInfo.thana}
            onChange={(v) => handleAddressChange("thana", v)}
            options={thanas}
            placeholder="Select Thana"
            disabled={!addressInfo.district}
            error={fieldErrors.thana}
            selectRef={fieldRefs.thana}
          />
          <SelectField
            label="Area"
            value={addressInfo.area}
            onChange={(v) => handleAddressChange("area", v)}
            options={areas}
            placeholder="Select Area"
            disabled={!addressInfo.thana}
            error={fieldErrors.area}
            selectRef={fieldRefs.area}
          />
        </div>
      </div>

      {/* Experience & Subjects */}
      <div className="p-4 border rounded-lg">
        <h3 className="text-lg font-semibold mb-4 flex items-center">
          <BookOpen className="mr-2" />
          Experience & Subjects
        </h3>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Teaching Experience <span className="text-red-500">*</span>
          </label>
          <textarea
            value={otherData.experience}
            onChange={(e) =>
              handleOtherDataChange("experience", e.target.value)
            }
            placeholder="Describe teaching experience (min 50 characters)"
            rows={4}
            className={`w-full mt-1 px-4 py-3 border ${
              fieldErrors.experience ? "border-red-500" : "border-gray-200"
            } rounded-lg`}
            ref={fieldRefs.experience}
          ></textarea>
          {fieldErrors.experience && (
            <p className="mt-1 text-sm text-red-600">
              {fieldErrors.experience}
            </p>
          )}
        </div>
        <div className="mt-4">
          <label className="block text-sm font-medium text-gray-700">
            Preferred Subjects (Type a subject and click + to add){" "}
            <span className="text-red-500">*</span>
          </label>
          <div
            className={`flex items-center border rounded-lg bg-white focus-within:border-blue-500 focus-within:ring-2 focus-within:ring-blue-200 transition-all duration-200 p-2 mt-1 ${
              fieldErrors.preferredSubjects
                ? "border-red-500"
                : "border-gray-300"
            }`}
          >
            <div className="flex-1 flex flex-wrap items-center gap-2">
              {otherData.preferredSubjects.map((subject, index) => (
                <div
                  key={index}
                  className="flex items-center bg-blue-100 text-blue-800 px-2.5 py-1 rounded-md text-sm"
                >
                  <span>{subject}</span>
                  <button
                    type="button"
                    onClick={() => removeSubject(subject)}
                    className="ml-2 text-blue-600 hover:text-blue-800"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </div>
              ))}
              <input
                type="text"
                value={subjectInput}
                onChange={(e) => setSubjectInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" && subjectInput.trim()) {
                    e.preventDefault();
                    addSubject(subjectInput.trim());
                    setSubjectInput("");
                  }
                }}
                placeholder={
                  otherData.preferredSubjects.length === 0
                    ? "Type a subject"
                    : ""
                }
                className="flex-grow min-w-[100px] border-none focus:ring-0 outline-none text-sm py-1 bg-transparent"
                ref={fieldRefs.preferredSubjects}
              />
            </div>
            <button
              type="button"
              onClick={() => {
                if (subjectInput.trim()) {
                  addSubject(subjectInput.trim());
                  setSubjectInput("");
                }
              }}
              className="ml-2 flex-shrink-0 w-8 h-8 flex items-center justify-center rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition-colors"
            >
              <Plus className="w-5 h-5" />
            </button>
          </div>
          {fieldErrors.preferredSubjects && (
            <p className="mt-1 text-sm text-red-600">
              {fieldErrors.preferredSubjects}
            </p>
          )}
        </div>
      </div>

      {/* Suitable Locations */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <div className="w-full">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Suitable Thana <span className="text-red-500">*</span>
          </label>
          <div
            className={`w-full border rounded-lg bg-white px-3 py-2 min-h-[48px] flex flex-wrap gap-2 items-center transition-all duration-200 ${
              fieldErrors.suitableThana
                ? "border-red-500 focus-within:border-red-500 focus-within:ring-2 focus-within:ring-red-200"
                : "border-gray-200 hover:border-gray-300 focus-within:border-black focus-within:ring-1 focus-within:ring-black"
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
            Suitable Area <span className="text-red-500">*</span>
          </label>
          <div
            className={`w-full border rounded-lg bg-white px-3 py-2 min-h-[48px] flex flex-wrap gap-2 items-center transition-all duration-200 ${
              fieldErrors.suitableArea
                ? "border-red-500 focus-within:border-red-500 focus-within:ring-2 focus-within:ring-red-200"
                : "border-gray-200 hover:border-gray-300 focus-within:border-black focus-within:ring-1 focus-within:ring-black"
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
    </>
  );
};

export default TutorProfessionalInfoSection;
