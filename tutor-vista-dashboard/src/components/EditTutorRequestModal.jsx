import React, { useState, useEffect, memo, useRef, useMemo } from "react";
import {
  ChevronDown,
  X,
  User,
  GraduationCap,
  MapPin,
  Clock,
  Plus,
} from "lucide-react";
import axios from "../lib/axios";
import { toast } from "react-toastify";
import locationData from "../assets/data/address.json";
import { PREDEFINED_ZONES } from "../utils/zones";
import { useAuth } from "../context/AuthContext";
import { TUTOR_REQUEST_STATUS } from "../utils/status";
import { getStatusBadgeInfo, StatusBadge } from "../utils/statusHelper";

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
        className={`w-full px-3 py-2 border rounded-lg focus:ring-1 focus:ring-blue-500 focus:border-transparent transition-all duration-200 hover:border-gray-300 text-sm ${
          error ? "border-red-500" : "border-gray-200"
        }`}
      />
      {error && <p className="mt-1 text-sm text-red-600">{error}</p>}
    </div>
  ),
);

const EditTutorRequestModal = ({ isOpen, onClose, onSuccess, request }) => {
  const initialEducationalDetail = {
    institution: "",
    medium: "",
    curriculum: "",
    grade: "",
    subjects: [],
    subjectInput: "",
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
    adminDivision: "",
    adminArea: "",
    agreeTerms: true,
  });

  const { user } = useAuth();
  const [formData, setFormData] = useState(getInitialFormData());
  const [showSecondStudent, setShowSecondStudent] = useState(false);
  const [loading, setLoading] = useState(false);
  const [isActive, setIsActive] = useState(false);
  const [status, setStatus] = useState("");
  const [comment, setComment] = useState("");
  const [fieldErrors, setFieldErrors] = useState({});
  const initialStateRef = useRef(null);

  // Location data
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

  // Educational Options
  const mediumOptions = useMemo(
    () => [
      "Bangla Medium",
      "English Medium",
      "English Version (National Curriculum)",
      "Arabic Medium",
      "University Level",
      "Admission Preparation",
      "Skill Development",
      "Job Purpose",
    ],
    [],
  );

  const curriculumOptions = useMemo(
    () => [
      "Cambridge Curriculum",
      "Edexcel Curriculum",
      "Oxford Curriculum",
      "IB Curriculum",
    ],
    [],
  );

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

  // Load existing request data
  useEffect(() => {
    if (isOpen && request) {
      const educationalDetails = [
        {
          institution: request.institution || "",
          medium: request.medium || "",
          curriculum: request.curriculum || "",
          grade: request.grade || request.class || "",
          subjects: request.subjects || [],
          subjectInput: "",
        },
      ];

      if (request.multipleStudent) {
        educationalDetails.push({
          institution: request.institution2 || "",
          medium: request.medium2 || "",
          curriculum: request.curriculum2 || "",
          grade: request.grade2 || "",
          subjects: request.subjects2 || [],
          subjectInput: "",
        });
      }

      const initial = {
        ...getInitialFormData(),
        ...request,
        educationalDetails,
      };

      delete initial.class;
      delete initial.institution;
      delete initial.medium;
      delete initial.curriculum;
      delete initial.grade;
      delete initial.subjects;
      delete initial.institution2;
      delete initial.medium2;
      delete initial.curriculum2;
      delete initial.grade2;
      delete initial.subjects2;

      setFormData(initial);
      setShowSecondStudent(!!request.multipleStudent);
      setIsActive(!!request.isActive);
      setStatus(request.status || "pending");
      setComment(request.comment || "");

      // Fix: deep copy educationalDetails
      initialStateRef.current = {
        ...initial,
        isActive: !!request.isActive,
        status: request.status || "pending",
        comment: request.comment || "",
        showSecondStudent: !!request.multipleStudent,
        educationalDetails: JSON.parse(JSON.stringify(educationalDetails)),
      };
    }
  }, [isOpen, request]);

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
  };

  const handleAddressChange = (field, value) => {
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
    if (subject) {
      const newEducationalDetails = [...formData.educationalDetails];
      const subjects = newEducationalDetails[studentIndex].subjects;
      if (!subjects.includes(subject)) {
        newEducationalDetails[studentIndex].subjects = [...subjects, subject];
        newEducationalDetails[studentIndex].subjectInput = "";
        setFormData((prev) => ({
          ...prev,
          educationalDetails: newEducationalDetails,
        }));
      }
    }
  };

  const handleToggleSecondStudent = () => {
    const isShowing = !showSecondStudent;
    setShowSecondStudent(isShowing);

    if (isShowing) {
      // If turning on, add a new empty student detail object
      setFormData((prev) => ({
        ...prev,
        educationalDetails: [
          ...prev.educationalDetails,
          initialEducationalDetail,
        ],
      }));
    } else {
      // If turning off, remove the second student's details
      setFormData((prev) => ({
        ...prev,
        educationalDetails: prev.educationalDetails.slice(0, 1),
      }));
    }
  };

  const SelectField = ({
    label,
    value,
    onChange,
    options,
    placeholder = "Select",
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
          value={value}
          onChange={(e) => onChange(e.target.value)}
          disabled={disabled}
          className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none bg-white transition-all duration-200 text-sm ${
            disabled
              ? "bg-gray-100 cursor-not-allowed text-gray-500"
              : "hover:border-gray-300"
          } ${error ? "border-red-500" : "border-gray-200"}`}
        >
          <option value="">{placeholder}</option>
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const payload = {
      ...formData,
      isActive,
      status,
      comment: comment ? comment.trim() : "",
      multipleStudent: showSecondStudent,
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
    } else {
      // Explicitly clear second student data if the switch is off
      payload.institution2 = "";
      payload.medium2 = "";
      payload.curriculum2 = "";
      payload.grade2 = "";
      payload.subjects2 = [];
    }
    delete payload.educationalDetails;

    try {
      await axios.put(`/api/request-tutor/${request._id}`, payload);
      toast.success("Request updated successfully!");
      onSuccess();
      onClose();
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Update failed. Please try again.",
      );
    } finally {
      setLoading(false);
    }
  };

  const handleActiveToggle = () => setIsActive((prev) => !prev);

  const isEdited = useMemo(() => {
    if (!initialStateRef.current) return false;

    const current = {
      ...formData,
      isActive,
      status,
      comment,
      showSecondStudent,
    };

    // Deep compare educationalDetails
    if (
      current.educationalDetails.length !==
      initialStateRef.current.educationalDetails.length
    ) {
      return true;
    }

    for (let i = 0; i < current.educationalDetails.length; i++) {
      if (
        JSON.stringify(current.educationalDetails[i]) !==
        JSON.stringify(initialStateRef.current.educationalDetails[i])
      ) {
        return true;
      }
    }

    // Compare other fields
    const fieldsToCompare = [
      "studentName",
      "phoneNo",
      "gender",
      "salary",
      "days",
      "time",
      "requirement",
      "division",
      "district",
      "thana",
      "area",
      "zone",
      "address",
      "adminDivision",
      "adminArea",
      "isActive",
      "status",
      "comment",
      "showSecondStudent",
    ];

    for (const field of fieldsToCompare) {
      if (current[field] !== initialStateRef.current[field]) {
        return true;
      }
    }

    return false;
  }, [formData, isActive, status, comment, showSecondStudent]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-xs flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-xl border border-[#E4E6EE] w-full max-w-4xl max-h-[90vh] overflow-hidden flex flex-col">
        <div className="flex items-center justify-between p-5 border-b border-[#E4E6EE] bg-white">
          <h3 className="text-base font-bold text-[#1A1D29]">
            Edit Tutor Request
          </h3>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 p-1 rounded"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto p-6">
          <div className="space-y-8">
            {/* Basic Info */}
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
                />
                <MemoizedInput
                  label="Phone No."
                  value={formData.phoneNo}
                  onChange={(e) => handleInputChange("phoneNo", e.target.value)}
                  placeholder="Phone number"
                  error={fieldErrors.phoneNo}
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
              </div>
            </div>

            {/* Educational Info */}
            <div>
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-6 h-6 bg-gray-800 rounded-lg flex items-center justify-center">
                  <GraduationCap className="w-3 h-3 text-white" />
                </div>
                <h4 className="text-lg font-semibold text-gray-800">
                  Educational Info
                </h4>
              </div>

              {/* <div className="mb-6 rounded-lg border border-gray-200 bg-gray-50 p-3">
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
              </div> */}

              <div className="space-y-6">
                {formData.educationalDetails.map((detail, index) => {
                  const suffix = index === 0 ? "" : "2";
                  return (
                    <div
                      key={index}
                      className="p-4 border border-blue-200 rounded-xl bg-white/60 shadow-sm"
                    >
                      <div className="flex items-center gap-3 mb-4 border-b border-blue-100 pb-3">
                        <User className="w-4 h-4 text-blue-600" />
                        <h3 className="font-semibold text-gray-700">
                          Student {index + 1} Details
                        </h3>
                      </div>
                      <div className="space-y-4">
                        <MemoizedInput
                          label="Institution"
                          value={detail.institution}
                          onChange={(e) =>
                            handleEducationalDetailChange(
                              index,
                              "institution",
                              e.target.value,
                            )
                          }
                          placeholder="School / College / Others"
                          error={fieldErrors[`institution${suffix}`]}
                        />
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
                        {/* Show Grade/Class and Subjects for other mediums */}
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
                              disabled={
                                getGradeOptions(
                                  detail.medium,
                                  detail.curriculum,
                                ).length === 0
                              }
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

            {/* Time & Offer */}
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
                />
                <MemoizedInput
                  label="Days"
                  value={formData.days}
                  onChange={(e) => handleInputChange("days", e.target.value)}
                  placeholder="e.g. 3 days/week"
                  error={fieldErrors.days}
                />
                <MemoizedInput
                  label="Time"
                  value={formData.time}
                  onChange={(e) => handleInputChange("time", e.target.value)}
                  placeholder="e.g. 2 hours"
                  error={fieldErrors.time}
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
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 text-sm"
                />
              </div>
            </div>

            {/* Address */}
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
                  error={fieldErrors.division}
                />
                <SelectField
                  label="District"
                  value={formData.district}
                  onChange={(v) => handleAddressChange("district", v)}
                  options={districts}
                  placeholder={
                    !formData.division
                      ? "Select Division first"
                      : "Select District"
                  }
                  disabled={!formData.division}
                  error={fieldErrors.district}
                />
                <SelectField
                  label="Thana"
                  value={formData.thana}
                  onChange={(v) => handleAddressChange("thana", v)}
                  options={thanas}
                  placeholder={
                    !formData.district
                      ? "Select District first"
                      : "Select Thana"
                  }
                  disabled={!formData.district}
                  error={fieldErrors.thana}
                />
                <SelectField
                  label="Area"
                  value={formData.area}
                  onChange={(v) => handleAddressChange("area", v)}
                  options={areas}
                  placeholder={
                    !formData.thana ? "Select thana first" : "Select Area"
                  }
                  disabled={!formData.thana}
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
                  rows={3}
                  value={formData.address}
                  onChange={(e) => handleInputChange("address", e.target.value)}
                  placeholder="Enter complete address..."
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 text-sm"
                />
              </div>

              {/* --- Admin Division & Admin Area (Optional) --- */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
                <MemoizedInput
                  label="Admin Division"
                  value={formData.adminDivision || ""}
                  onChange={(e) =>
                    handleInputChange("adminDivision", e.target.value)
                  }
                  placeholder="Admin Division (optional)"
                  required={false}
                />
                <MemoizedInput
                  label="Admin Area"
                  value={formData.adminArea || ""}
                  onChange={(e) =>
                    handleInputChange("adminArea", e.target.value)
                  }
                  placeholder="Admin Area (optional)"
                  required={false}
                />
              </div>
            </div>

            {/* Status Select (Admin Only) */}
            {user?.role === "admin" && (
              <div className="mb-8 space-y-3">
                <label className="block text-sm font-medium text-gray-700">
                  Status
                </label>
                <div className="relative w-full sm:w-64">
                  <select
                    value={status}
                    onChange={(e) => {
                      const newStatus = e.target.value;
                      setStatus(newStatus);
                      // Update isActive based on the selected status:
                      if (newStatus === TUTOR_REQUEST_STATUS.CANCELLED) {
                        setIsActive(false);
                      } else if ([
                        TUTOR_REQUEST_STATUS.ACTIVE,
                        TUTOR_REQUEST_STATUS.REFERRED,
                        TUTOR_REQUEST_STATUS.CONFIRMED,
                        TUTOR_REQUEST_STATUS.DEMO,
                        TUTOR_REQUEST_STATUS.PROBLEM
                      ].includes(newStatus)) {
                        setIsActive(true);
                      }
                      // For other legacy statuses, keep isActive unchanged.
                    }}
                    className="w-full pl-3 pr-10 py-2 border border-gray-300 rounded-lg appearance-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white text-gray-900 font-medium"
                  >
                    {status === TUTOR_REQUEST_STATUS.PENDING && (
                      <option value={status}>Pending (current value only)</option>
                    )}
                    {status === TUTOR_REQUEST_STATUS.APPROVED && (
                      <option value={status}>Approved</option>
                    )}
                    {status === TUTOR_REQUEST_STATUS.ASSIGNED && (
                      <option value={status}>Assigned</option>
                    )}
                    {/* Active workflow statuses */}
                    <option value={TUTOR_REQUEST_STATUS.ACTIVE}>Active</option>
                    <option value={TUTOR_REQUEST_STATUS.REFERRED}>Referred</option>
                    <option value={TUTOR_REQUEST_STATUS.CONFIRMED}>Confirmed</option>
                    <option value={TUTOR_REQUEST_STATUS.DEMO}>Demo</option>
                    <option value={TUTOR_REQUEST_STATUS.PROBLEM}>Problem</option>
                    <option value={TUTOR_REQUEST_STATUS.CANCELLED}>Cancelled</option>
                  </select>
                  <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4 pointer-events-none" />
                </div>
                <div className="mt-2 flex items-center space-x-2">
                  <span className="text-xs text-gray-500 font-medium">Selected Status:</span>
                  <StatusBadge status={status} isActive={isActive} />
                </div>
                {/* Comment Textarea (Admin Only) */}
                <div className="pt-4 border-t border-gray-100">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Comment
                  </label>
                  <textarea
                    value={comment}
                    onChange={(e) => setComment(e.target.value.slice(0, 1000))}
                    placeholder="Write internal notes about this tutor request..."
                    rows={4}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white text-gray-900 font-medium text-sm leading-relaxed"
                  />
                  <div className="text-xs text-gray-500 flex justify-end mt-1">
                    {comment.length} / 1000
                  </div>
                </div>
              </div>
            )}

            {/* ...rest of the form... */}
          </div>
        </form>

        <div className="flex justify-end space-x-3 p-5 border-t border-[#E4E6EE] bg-white">
          <button
            type="button"
            onClick={onClose}
            className="px-5 py-2.5 bg-white text-[#1A1D29] hover:bg-[#F7F8FB] border border-[#E4E6EE] rounded-lg text-xs font-semibold shadow-xs transition-colors"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={handleSubmit}
            disabled={loading || !isEdited}
            className={`px-5 py-2.5 rounded-lg text-xs font-semibold shadow-xs transition-all duration-200 flex items-center justify-center ${
              loading || !isEdited
                ? "bg-[#EEF2FF] text-[#94A3B8] border border-[#E0E7FF] cursor-not-allowed"
                : "bg-[#3730E0] text-white hover:bg-[#2D24C4]"
            }`}
          >
            {loading ? "Updating..." : "Update Request"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditTutorRequestModal;
