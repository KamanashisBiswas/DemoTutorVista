import React, { useState, useMemo, useEffect, useRef, memo } from "react";
import {
  ChevronDown,
  X,
  Clock,
  MapPin,
  User,
  GraduationCap,
  Plus,
} from "lucide-react";
import ApiService from "../services/api";
import { toast } from "react-toastify";
import locationData from "../assets/data/address.json";
import { PREDEFINED_ZONES } from "../utils/zones";

// Memoized Input Component
// const MemoizedInput = memo(
//   ({
//     label,
//     type = "text",
//     value,
//     onChange,
//     placeholder,
//     required = true,
//     error,
//     inputRef,
//   }) => {
//     return (
//       <div className="space-y-2">
//         <label className="block text-sm font-medium text-gray-700">
//           {label} {required && <span className="text-red-500">*</span>}
//         </label>
//         <input
//           ref={inputRef}
//           type={type}
//           value={value || ""}
//           onChange={onChange}
//           placeholder={placeholder}
//           className={`w-full px-3 py-2 border ${
//             error ? "border-red-500" : "border-gray-200"
//           } rounded-lg transition-all duration-200 text-sm ${
//             error
//               ? "focus:border-red-500 focus:ring-2 focus:ring-red-200"
//               : "focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
//           }`}
//         />
//         {error && <p className="mt-1 text-sm text-red-600">{error}</p>}
//       </div>
//     );
//   }
// );

const MemoizedInput = memo(
  ({
    label,
    type = "text",
    value,
    onChange,
    placeholder,
    required = true,
    error,
    inputRef,
  }) => {
    return (
      <div className="space-y-2">
        <label className="block text-sm font-medium text-gray-700">
          {label} {required && <span className="text-red-500">*</span>}
        </label>
        <input
          ref={inputRef}
          type={type}
          value={value || ""}
          onChange={onChange}
          placeholder={placeholder}
          className={`w-full px-3 py-2 border  rounded-lg transition-all duration-200 text-sm focus:border-black focus:ring-1 focus:ring-black ${
            error ? "" : ""
          }`}
        />
        {error && <p className="mt-1 text-sm text-red-600">{error}</p>}
      </div>
    );
  },
);

const AddTutorRequestModal = ({ isOpen, onClose, onSuccess }) => {
  const initialEducationalDetail = {
    institution: "",
    medium: "",
    curriculum: "",
    grade: "",
    subjects: [],
    subjectInput: "", // Each student gets their own subject input state
  };

  const getInitialFormData = () => ({
    studentName: "",
    phoneNo: "",
    gender: "Male",
    educationalDetails: [initialEducationalDetail],
    salary: "",
    days: "",
    time: "",
    requirement: "",
    division: "",
    district: "",
    thana: "",
    area: "",
    zone: "",
    address: "",
    agreeTerms: true,
    adminDivision: "",
    adminArea: "",
  });

  const [formData, setFormData] = useState(getInitialFormData());
  const [showSecondStudent, setShowSecondStudent] = useState(false);
  const [fieldErrors, setFieldErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const fieldRefs = {
    studentName: useRef(null),
    phoneNo: useRef(null),
    salary: useRef(null),
    days: useRef(null),
    time: useRef(null),
    division: useRef(null),
    district: useRef(null),
    thana: useRef(null),
    area: useRef(null),
    zone: useRef(null),
    address: useRef(null),
    // Refs for dynamic fields can be handled differently if needed
  };

  const mediumOptions = [
    "Bangla Medium",
    "English Medium",
    "English Version (National Curriculum)",
    "Arabic Medium",
    "University Level",
    "Admission Preparation",
    "Skill Development",
    "Job Purpose",
  ];

  const curriculumOptions = [
    "Cambridge Curriculum",
    "Edexcel Curriculum",
    "Oxford Curriculum",
    "IB Curriculum",
  ];

  const getGradeOptions = (medium, curriculum) => {
    if (medium === "English Medium" && curriculum) {
      return [
        "Pre School",
        "Play",
        "Nursery",
        "Grade 1",
        "Grade 2",
        "Grade 3",
        "Grade 4",
        "Grade 5",
        "Grade 6",
        "Grade 7",
        "Grade 8",
        "Grade 9",
        "O Levels",
        "A2",
        "AS",
      ];
    }
    if (
      [
        "Bangla Medium",
        "English Version (National Curriculum)",
        "Arabic Medium",
      ].includes(medium)
    ) {
      return [
        "Pre School",
        "Play",
        "Nursery",
        "KG1",
        "KG2",
        "Class 1",
        "Class 2",
        "Class 3",
        "Class 4",
        "Class 5",
        "Class 6",
        "Class 7",
        "Class 8",
        "Class 9",
        "Class 10",
        "HSC 1st Year",
        "HSC 2nd Year",
      ];
    }
    if (medium === "University Level") {
      return ["1st Year", "2nd Year", "3rd Year", "4th Year", "Masters", "PhD"];
    }
    if (medium === "Admission Preparation") {
      return [
        "University Admission",
        "Medical Admission",
        "Engineering Admission",
        "BCS Preparation",
        "Job Preparation",
      ];
    }
    return [];
  };

  const handleInputChange = (field, value) => {
    setFieldErrors((prev) => ({ ...prev, [field]: undefined }));
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleEducationalDetailChange = (index, field, value) => {
    const newEducationalDetails = [...formData.educationalDetails];
    newEducationalDetails[index][field] = value;

    if (field === "medium") {
      newEducationalDetails[index].curriculum = "";
      newEducationalDetails[index].grade = "";
    } else if (field === "curriculum") {
      newEducationalDetails[index].grade = "";
    }

    setFormData((prev) => ({
      ...prev,
      educationalDetails: newEducationalDetails,
    }));

    // Clear errors for the specific field
    setFieldErrors((prev) => {
      const newErrors = { ...prev };
      const errorKey = index === 0 ? field : `${field.replace("2", "")}2`;
      delete newErrors[errorKey];
      return newErrors;
    });
  };

  const handleAddressChange = (field, value) => {
    setFieldErrors((prev) => ({ ...prev, [field]: undefined }));
    const newFormData = { ...formData, [field]: value };

    if (field === "division") {
      newFormData.district = "";
      newFormData.thana = "";
      newFormData.area = "";
    } else if (field === "district") {
      newFormData.thana = "";
      newFormData.area = "";
    } else if (field === "thana") {
      newFormData.area = "";
    }
    setFormData(newFormData);
  };

  const removeSubject = (studentIndex, subject) => {
    const newEducationalDetails = [...formData.educationalDetails];
    newEducationalDetails[studentIndex].subjects = newEducationalDetails[
      studentIndex
    ].subjects.filter((s) => s !== subject);
    setFormData((prev) => ({
      ...prev,
      educationalDetails: newEducationalDetails,
    }));
  };

  const addSubject = (studentIndex, subject) => {
    const newEducationalDetails = [...formData.educationalDetails];
    const subjects = newEducationalDetails[studentIndex].subjects;
    if (subject && !subjects.includes(subject)) {
      newEducationalDetails[studentIndex].subjects = [...subjects, subject];
      newEducationalDetails[studentIndex].subjectInput = ""; // Clear input
      setFormData((prev) => ({
        ...prev,
        educationalDetails: newEducationalDetails,
      }));
    }
  };

  const handleToggleSecondStudent = () => {
    const isShowing = !showSecondStudent;
    setShowSecondStudent(isShowing);

    if (isShowing) {
      setFormData((prev) => ({
        ...prev,
        educationalDetails: [
          ...prev.educationalDetails,
          initialEducationalDetail,
        ],
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        educationalDetails: prev.educationalDetails.slice(0, 1),
      }));
      // Clear errors for the second student
      setFieldErrors((prev) => {
        const newErrors = { ...prev };
        Object.keys(newErrors).forEach((key) => {
          if (key.endsWith("2")) {
            delete newErrors[key];
          }
        });
        return newErrors;
      });
    }
  };

  const resetForm = () => {
    setFormData(getInitialFormData());
    setShowSecondStudent(false);
    setFieldErrors({});
  };

  const SelectField = ({
    label,
    value,
    onChange,
    options,
    placeholder = "Select",
    disabled = false,
    name,
    error,
    required = true,
  }) => (
    <div className="space-y-2">
      <label className="block text-sm font-medium text-gray-700">
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      <div className="relative">
        <select
          ref={name ? fieldRefs[name] : null}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          disabled={disabled}
          className={`w-full px-3 py-2 border ${
            error ? "border-red-500" : "border-gray-200"
          } rounded-lg appearance-none bg-white transition-all duration-200 text-sm ${
            error
              ? "focus:border-red-500 focus:ring-2 focus:ring-red-200"
              : "focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
          } ${
            disabled
              ? "bg-gray-100 cursor-not-allowed text-gray-500"
              : "hover:border-gray-300"
          }`}
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
        <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
      </div>
      {error && <p className="mt-1 text-sm text-red-600">{error}</p>}
    </div>
  );

  const divisions = useMemo(
    () => locationData.divisions.map((d) => d.division.name_en),
    [],
  );
  const districts = useMemo(() => {
    if (!formData.division) return [];
    const selected = locationData.divisions.find(
      (d) => d.division.name_en === formData.division,
    );
    return selected ? selected.districts.map((dist) => dist.name_en) : [];
  }, [formData.division]);
  const thanas = useMemo(() => {
    if (!formData.district) return [];
    const selectedDiv = locationData.divisions.find(
      (d) => d.division.name_en === formData.division,
    );
    const selectedDist = selectedDiv?.districts.find(
      (d) => d.name_en === formData.district,
    );
    return selectedDist ? selectedDist.thanas.map((u) => u.name_en) : [];
  }, [formData.division, formData.district]);
  const areas = useMemo(() => {
    if (!formData.thana) return [];
    const selectedDiv = locationData.divisions.find(
      (d) => d.division.name_en === formData.division,
    );
    const selectedDist = selectedDiv?.districts.find(
      (d) => d.name_en === formData.district,
    );
    const selectedThana = selectedDist?.thanas.find(
      (u) => u.name_en === formData.thana,
    );
    return selectedThana ? selectedThana.areas.map((area) => area.name_en) : [];
  }, [formData.division, formData.district, formData.thana]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFieldErrors({});
    let hasError = false;
    const errors = {};

    // --- Basic and common fields validation ---
    const requiredFields = {
      studentName: "Offer Code",
      phoneNo: "Phone number",
      salary: "Salary",
      days: "Days",
      time: "Time",
      division: "Division",
      district: "District",
      thana: "Thana",
      area: "Area",
      address: "Address",
    };

    for (const field in requiredFields) {
      if (!formData[field] || !formData[field].trim()) {
        errors[field] = `${requiredFields[field]} is required`;
        hasError = true;
      }
    }

    // --- Educational details validation ---
    formData.educationalDetails.forEach((detail, index) => {
      const suffix = index === 0 ? "" : "2";
      const studentLabel = `Student ${index + 1}`;

      if (!detail.institution.trim()) {
        errors[`institution${suffix}`] =
          `Institution for ${studentLabel} is required`;
        hasError = true;
      }
      if (!detail.medium) {
        errors[`medium${suffix}`] = `Medium for ${studentLabel} is required`;
        hasError = true;
      }
      if (detail.medium === "English Medium" && !detail.curriculum) {
        errors[`curriculum${suffix}`] =
          `Curriculum for ${studentLabel} is required`;
        hasError = true;
      }
      // Only validate grade if it's not a special medium
      if (
        !["Skill Development", "Job Purpose"].includes(detail.medium) &&
        !detail.grade
      ) {
        errors[`grade${suffix}`] =
          `Grade/Class for ${studentLabel} is required`;
        hasError = true;
      }
      if (detail.subjects.length === 0) {
        errors[`subjects${suffix}`] =
          `At least one subject for ${studentLabel} is required`;
        hasError = true;
      }
    });

    if (hasError) {
      setFieldErrors(errors);
      toast.error("Please fill all required fields.");
      // Focus logic can be improved to find the first error field ref
      return;
    }

    setLoading(true);

    // --- DATA TRANSFORMATION ---
    const payload = {
      ...formData,
      multipleStudent: showSecondStudent,
      // Map first student
      institution: formData.educationalDetails[0]?.institution || "",
      medium: formData.educationalDetails[0]?.medium || "",
      curriculum: formData.educationalDetails[0]?.curriculum || "",
      grade: formData.educationalDetails[0]?.grade || "",
      subjects: formData.educationalDetails[0]?.subjects || [],
    };

    if (showSecondStudent && formData.educationalDetails[1]) {
      payload.institution2 = formData.educationalDetails[1].institution || "";
      payload.medium2 = formData.educationalDetails[1].medium || "";
      payload.curriculum2 = formData.educationalDetails[1].curriculum || "";
      payload.grade2 = formData.educationalDetails[1].grade || "";
      payload.subjects2 = formData.educationalDetails[1].subjects || [];
    }
    delete payload.educationalDetails; // Clean up

    try {
      const res = await ApiService.createTutorRequest(payload);
      toast.success(res.message || "Request added successfully!");
      resetForm();
      onSuccess();
      onClose();
    } catch (error) {
      const apiErrors = error.response?.data?.errors;
      if (apiErrors && apiErrors.length > 0) {
        const newErrors = {};
        apiErrors.forEach((err) => {
          newErrors[err.field] = err.message;
        });
        setFieldErrors(newErrors);
        // Show only the first field error message in toast
        toast.error(apiErrors[0].message);
      } else {
        toast.error(
          error.response?.data?.message ||
            "Submission failed. Please try again.",
        );
      }
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-xs flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-xl border border-[#E4E6EE] w-full max-w-4xl max-h-[90vh] overflow-hidden flex flex-col">
        <div className="flex items-center justify-between p-5 border-b border-[#E4E6EE] bg-white">
          <h3 className="text-base font-bold text-[#1A1D29]">
            Add New Tutor Request
          </h3>
          <button
            onClick={() => {
              resetForm();
              onClose();
            }}
            className="text-gray-400 hover:text-gray-600 p-1 rounded"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="p-6 overflow-y-auto max-h-[calc(90vh-160px)]">
          <div className="space-y-8">
            {/* Basic Info Section */}
            <div>
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-6 h-6 bg-gray-800 rounded-lg flex items-center justify-center">
                  <User className="w-3 h-3 text-white" />
                </div>
                <h4 className="text-lg font-semibold text-gray-800">
                  Basic Info
                </h4>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <MemoizedInput
                  label="Offer Code"
                  value={formData.studentName}
                  onChange={(e) =>
                    handleInputChange("studentName", e.target.value)
                  }
                  placeholder="Enter Offer Code"
                  error={fieldErrors.studentName}
                  inputRef={fieldRefs.studentName}
                />
                <MemoizedInput
                  label="Phone No."
                  value={formData.phoneNo}
                  onChange={(e) => handleInputChange("phoneNo", e.target.value)}
                  placeholder="Phone number"
                  error={fieldErrors.phoneNo}
                  inputRef={fieldRefs.phoneNo}
                />
              </div>

              {/* Gender field */}
              <div className="mt-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Gender
                </label>
                <div className="flex space-x-4">
                  {["Male", "Female", "Any"].map((gender) => (
                    <label key={gender} className="flex items-center">
                      <input
                        type="radio"
                        name="gender"
                        value={gender}
                        checked={formData.gender === gender}
                        onChange={(e) =>
                          handleInputChange("gender", e.target.value)
                        }
                        className="w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500"
                      />
                      <span className="ml-2 text-sm text-gray-700">
                        {gender}
                      </span>
                    </label>
                  ))}
                </div>
                {fieldErrors.gender && (
                  <p className="mt-1 text-sm text-red-600">
                    {fieldErrors.gender}
                  </p>
                )}
              </div>
            </div>

            {/* Educational Info Section */}
            <div>
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-6 h-6 bg-gray-800 rounded-lg flex items-center justify-center">
                  <GraduationCap className="w-3 h-3 text-white" />
                </div>
                <h4 className="text-lg font-semibold text-gray-800">
                  Educational Info
                </h4>
              </div>

              {/* --- Add a Second Student Switch --- */}
              <div className="mb-6 rounded-lg border border-gray-200 bg-gray-50 p-3">
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

              <div className="space-y-6">
                {formData.educationalDetails.map((detail, index) => {
                  const suffix = index === 0 ? "" : "2";
                  return (
                    <div
                      key={index}
                      className="p-4 border border-blue-200 rounded-xl bg-white/60 shadow-sm relative"
                    >
                      <div className="flex items-center gap-3 mb-4 border-b border-blue-100 pb-3">
                        <User className="w-4 h-4 text-blue-600" />
                        <h3 className="font-semibold text-gray-700">
                          Student {index + 1} Details
                        </h3>
                      </div>
                      <div className="space-y-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Institution <span className="text-red-500">*</span>
                          </label>
                          <input
                            type="text"
                            placeholder="School / College / Others"
                            value={detail.institution}
                            onChange={(e) =>
                              handleEducationalDetailChange(
                                index,
                                "institution",
                                e.target.value,
                              )
                            }
                            className={`w-full px-3 py-2 border rounded-lg focus:border-black focus:ring-1 focus:ring-black text-sm ${
                              fieldErrors[`institution${suffix}`]
                                ? "border-red-500"
                                : "border-gray-200"
                            }`}
                          />
                          {fieldErrors[`institution${suffix}`] && (
                            <p className="mt-1 text-sm text-red-600">
                              {fieldErrors[`institution${suffix}`]}
                            </p>
                          )}
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          <SelectField
                            label="Medium"
                            value={detail.medium}
                            onChange={(v) =>
                              handleEducationalDetailChange(index, "medium", v)
                            }
                            options={mediumOptions}
                            placeholder="Select Medium"
                            error={fieldErrors[`medium${suffix}`]}
                          />
                          {detail.medium === "English Medium" && (
                            <SelectField
                              label="Curriculum"
                              value={detail.curriculum}
                              onChange={(v) =>
                                handleEducationalDetailChange(
                                  index,
                                  "curriculum",
                                  v,
                                )
                              }
                              options={curriculumOptions}
                              placeholder="Select Curriculum"
                              error={fieldErrors[`curriculum${suffix}`]}
                            />
                          )}
                          {/* Show SubjectInput for specific mediums */}
                          {["Skill Development", "Job Purpose"].includes(
                            detail.medium,
                          ) && (
                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-2">
                                Subjects (Type a subject and click + to add){" "}
                                <span className="text-red-500">*</span>
                              </label>
                              <div
                                className={`flex items-center border rounded-lg bg-white focus-within:border-blue-500 focus-within:ring-2 focus-within:ring-blue-200 transition-all duration-200 p-2 ${
                                  fieldErrors[`subjects${suffix}`]
                                    ? "border-red-500"
                                    : "border-gray-300"
                                }`}
                              >
                                <div className="flex-1 flex flex-wrap items-center gap-2">
                                  {detail.subjects.map((s, i) => (
                                    <div
                                      key={i}
                                      className="flex items-center bg-blue-100 text-blue-800 px-2.5 py-1 rounded-md text-sm"
                                    >
                                      <span>{s}</span>
                                      <button
                                        type="button"
                                        onClick={() => removeSubject(index, s)}
                                        className="ml-2 text-blue-600 hover:text-blue-800"
                                      >
                                        <X className="w-3 h-3" />
                                      </button>
                                    </div>
                                  ))}
                                  <input
                                    type="text"
                                    value={detail.subjectInput}
                                    onChange={(e) =>
                                      handleEducationalDetailChange(
                                        index,
                                        "subjectInput",
                                        e.target.value,
                                      )
                                    }
                                    onKeyDown={(e) => {
                                      if (
                                        e.key === "Enter" &&
                                        detail.subjectInput.trim()
                                      ) {
                                        e.preventDefault();
                                        addSubject(
                                          index,
                                          detail.subjectInput.trim(),
                                        );
                                      }
                                    }}
                                    placeholder={
                                      detail.subjects.length === 0
                                        ? "Type a subject"
                                        : ""
                                    }
                                    className="flex-grow min-w-[100px] border-none focus:ring-0 outline-none text-sm py-1 bg-transparent"
                                  />
                                </div>
                                <button
                                  type="button"
                                  onClick={() => {
                                    if (detail.subjectInput.trim()) {
                                      addSubject(
                                        index,
                                        detail.subjectInput.trim(),
                                      );
                                    }
                                  }}
                                  className="ml-2 flex-shrink-0 w-8 h-8 flex items-center justify-center rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition-colors"
                                >
                                  <Plus className="w-5 h-5" />
                                </button>
                              </div>
                              {fieldErrors[`subjects${suffix}`] && (
                                <p className="mt-1 text-sm text-red-600">
                                  {fieldErrors[`subjects${suffix}`]}
                                </p>
                              )}
                            </div>
                          )}
                        </div>
                        {getGradeOptions(detail.medium, detail.curriculum)
                          .length > 0 && (
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <SelectField
                              label="Grade/Class"
                              value={detail.grade}
                              onChange={(v) =>
                                handleEducationalDetailChange(index, "grade", v)
                              }
                              options={getGradeOptions(
                                detail.medium,
                                detail.curriculum,
                              )}
                              placeholder="Select Grade/Class"
                              error={fieldErrors[`grade${suffix}`]}
                            />
                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-2">
                                Subjects (Type a subject and click + to add){" "}
                                <span className="text-red-500">*</span>
                              </label>
                              <div
                                className={`flex items-center border rounded-lg bg-white focus-within:border-blue-500 focus-within:ring-2 focus-within:ring-blue-200 transition-all duration-200 p-2 ${
                                  fieldErrors[`subjects${suffix}`]
                                    ? "border-red-500"
                                    : "border-gray-300"
                                }`}
                              >
                                <div className="flex-1 flex flex-wrap items-center gap-2">
                                  {detail.subjects.map((s, i) => (
                                    <div
                                      key={i}
                                      className="flex items-center bg-blue-100 text-blue-800 px-2.5 py-1 rounded-md text-sm"
                                    >
                                      <span>{s}</span>
                                      <button
                                        type="button"
                                        onClick={() => removeSubject(index, s)}
                                        className="ml-2 text-blue-600 hover:text-blue-800"
                                      >
                                        <X className="w-3 h-3" />
                                      </button>
                                    </div>
                                  ))}
                                  <input
                                    type="text"
                                    value={detail.subjectInput}
                                    onChange={(e) =>
                                      handleEducationalDetailChange(
                                        index,
                                        "subjectInput",
                                        e.target.value,
                                      )
                                    }
                                    onKeyDown={(e) => {
                                      if (
                                        e.key === "Enter" &&
                                        detail.subjectInput.trim()
                                      ) {
                                        e.preventDefault();
                                        addSubject(
                                          index,
                                          detail.subjectInput.trim(),
                                        );
                                      }
                                    }}
                                    placeholder={
                                      detail.subjects.length === 0
                                        ? "Type a subject"
                                        : ""
                                    }
                                    className="flex-grow min-w-[100px] border-none focus:ring-0 outline-none text-sm py-1 bg-transparent"
                                  />
                                </div>
                                <button
                                  type="button"
                                  onClick={() => {
                                    if (detail.subjectInput.trim()) {
                                      addSubject(
                                        index,
                                        detail.subjectInput.trim(),
                                      );
                                    }
                                  }}
                                  className="ml-2 flex-shrink-0 w-8 h-8 flex items-center justify-center rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition-colors"
                                >
                                  <Plus className="w-5 h-5" />
                                </button>
                              </div>
                              {fieldErrors[`subjects${suffix}`] && (
                                <p className="mt-1 text-sm text-red-600">
                                  {fieldErrors[`subjects${suffix}`]}
                                </p>
                              )}
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Time & Offer Section */}
            <div>
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-6 h-6 bg-gray-800 rounded-lg flex items-center justify-center">
                  <Clock className="w-3 h-3 text-white" />
                </div>
                <h4 className="text-lg font-semibold text-gray-800">
                  Time & Offer
                </h4>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-4">
                <MemoizedInput
                  label="Salary Offer"
                  value={formData.salary}
                  onChange={(e) => handleInputChange("salary", e.target.value)}
                  placeholder="e.g. 5000 BDT"
                  error={fieldErrors.salary}
                  inputRef={fieldRefs.salary}
                />
                <MemoizedInput
                  label="Days"
                  value={formData.days}
                  onChange={(e) => handleInputChange("days", e.target.value)}
                  placeholder="e.g. 3 days/week"
                  error={fieldErrors.days}
                  inputRef={fieldRefs.days}
                />
                <MemoizedInput
                  label="Time"
                  value={formData.time}
                  onChange={(e) => handleInputChange("time", e.target.value)}
                  placeholder="6.00 pm - 8.00 pm"
                  error={fieldErrors.time}
                  inputRef={fieldRefs.time}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Requirements
                </label>
                <textarea
                  rows={3}
                  value={formData.requirement}
                  onChange={(e) =>
                    handleInputChange("requirement", e.target.value)
                  }
                  placeholder="Any specific requirements..."
                  className={`w-full px-3 py-2 border ${
                    fieldErrors.requirement
                      ? "border-red-500"
                      : "border-gray-200"
                  } rounded-lg`}
                />
                {fieldErrors.requirement && (
                  <p className="mt-1 text-sm text-red-600">
                    {fieldErrors.requirement}
                  </p>
                )}
              </div>
            </div>

            {/* Address Section */}
            <div>
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-6 h-6 bg-gray-800 rounded-lg flex items-center justify-center">
                  <MapPin className="w-3 h-3 text-white" />
                </div>
                <h4 className="text-lg font-semibold text-gray-800">Address</h4>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                <SelectField
                  label="Division"
                  value={formData.division}
                  onChange={(v) => handleAddressChange("division", v)}
                  options={divisions}
                  placeholder="Select Division"
                  name="division"
                  error={fieldErrors.division}
                />
                <SelectField
                  label="District"
                  value={formData.district}
                  onChange={(v) => handleAddressChange("district", v)}
                  options={districts}
                  placeholder="Select District"
                  disabled={!formData.division}
                  name="district"
                  error={fieldErrors.district}
                />
                <SelectField
                  label="Thana"
                  value={formData.thana}
                  onChange={(v) => handleAddressChange("thana", v)}
                  options={thanas}
                  placeholder="Select thana"
                  disabled={!formData.district}
                  name="thana"
                  error={fieldErrors.thana}
                />
                <SelectField
                  label="Area"
                  value={formData.area}
                  onChange={(v) => handleAddressChange("area", v)}
                  options={areas}
                  placeholder="Select Area"
                  disabled={!formData.thana}
                  name="area"
                  error={fieldErrors.area}
                />
                <SelectField
                  label="Zone (optional)"
                  value={formData.zone || ""}
                  onChange={(v) => handleInputChange("zone", v)}
                  options={["Dhaka", "Sylhet", "Khulna", "Chattogram"].includes(formData.division) ? PREDEFINED_ZONES[formData.division] : []}
                  placeholder={
                    !formData.division
                      ? "Select Division first"
                      : !["Dhaka", "Sylhet", "Khulna", "Chattogram"].includes(formData.division)
                      ? "Not applicable for this division"
                      : "Select Zone"
                  }
                  disabled={!["Dhaka", "Sylhet", "Khulna", "Chattogram"].includes(formData.division)}
                  name="zone"
                  required={false}
                  error={fieldErrors.zone}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Full Address <span className="text-red-500">*</span>
                </label>
                <textarea
                  ref={fieldRefs.address}
                  rows={3}
                  value={formData.address}
                  onChange={(e) => handleInputChange("address", e.target.value)}
                  placeholder="Enter complete address..."
                  className={`w-full px-3 py-2 border ${
                    fieldErrors.address ? "border-red-500" : "border-gray-200"
                  } rounded-lg`}
                />
                {fieldErrors.address && (
                  <p className="mt-1 text-sm text-red-600">
                    {fieldErrors.address}
                  </p>
                )}
              </div>

              {/* --- Admin Division & Admin Area (Optional) --- */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
                <MemoizedInput
                  label="Admin District, Division"
                  value={formData.adminDivision || ""}
                  onChange={(e) =>
                    handleInputChange("adminDivision", e.target.value)
                  }
                  placeholder="Admin District, Division (optional)"
                  required={false}
                  error={fieldErrors.adminDivision}
                  inputRef={fieldRefs.adminDivision}
                />
                <MemoizedInput
                  label="Admin Area"
                  value={formData.adminArea || ""}
                  onChange={(e) =>
                    handleInputChange("adminArea", e.target.value)
                  }
                  placeholder="Admin Area (optional)"
                  required={false}
                  error={fieldErrors.adminArea}
                  inputRef={fieldRefs.adminArea}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="flex justify-end space-x-3 p-5 border-t border-[#E4E6EE] bg-white">
          <button
            type="button"
            onClick={() => {
              resetForm();
              onClose();
            }}
            className="px-5 py-2.5 bg-white text-[#1A1D29] hover:bg-[#F7F8FB] border border-[#E4E6EE] rounded-lg text-xs font-semibold shadow-xs transition-colors"
          >
            Cancel
          </button>
          <button
            type="button"
            disabled={loading}
            onClick={handleSubmit}
            className="px-5 py-2.5 bg-[#3730E0] text-white hover:bg-[#2D24C4] font-semibold text-xs rounded-lg shadow-xs disabled:bg-[#EEF2FF] disabled:text-[#94A3B8] disabled:border disabled:border-[#E0E7FF] transition-all"
          >
            {loading ? "Adding..." : "Add Request"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddTutorRequestModal;
