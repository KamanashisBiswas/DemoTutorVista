import React, { useState, useEffect, useMemo, useRef } from "react";
import ApiService from "../services/api";
import { toast } from "react-toastify";
import locationData from "../assets/data/address.json";
import { X } from "lucide-react";
import imageCompression from "browser-image-compression";

import TutorPersonalInfoSection from "./TutorPersonalInfoSection";
import TutorEducationInfoSection from "./TutorEducationInfoSection";
import TutorProfessionalInfoSection from "./TutorProfessionalInfoSection";
import TutorDocumentUploadSection from "./TutorDocumentUploadSection";

const AddTutorModal = ({ isOpen, onClose, onSuccess }) => {
  // Refs for fields that might have validation errors
  const fieldRefs = {
    name: useRef(null),
    phone: useRef(null),
    email: useRef(null),
    division: useRef(null),
    district: useRef(null),
    thana: useRef(null),
    area: useRef(null),
    profileImage: useRef(null),
    educationDocument: useRef(null),
    nidFront: useRef(null),
    nidBack: useRef(null),
    birthCertificate: useRef(null),
    experience: useRef(null),
    preferredSubjects: useRef(null),
  };

  const [suitableThana, setSuitableThana] = useState([]);
  const [suitableArea, setSuitableArea] = useState([]);

  const [personalInfo, setPersonalInfo] = useState({
    name: "",
    phone: "",
    email: "",
    gender: "Male",
  });

  const [addressInfo, setAddressInfo] = useState({
    division: "",
    district: "",
    thana: "",
    area: "",
  });

  const [fileData, setFileData] = useState({
    profileImage: null,
    educationDocument: null,
    documentType: "nid",
    nidFront: null,
    nidBack: null,
    birthCertificate: null,
  });

  const [otherData, setOtherData] = useState({
    preferredSubjects: [],
    experience: "",
    agreeTerms: true, // Admin modal, so we can default to true
    score: "",
  });

  const [educationSections, setEducationSections] = useState([
    {
      id: 1,
      institution: "",
      examination: "SSC/O Level/Dakhil",
      medium: "",
      curriculum: "",
      board: "",
      groupSubject: "",
      gpa: "",
      passingYear: "",
    },
    {
      id: 2,
      institution: "",
      examination: "HSC/A Levels/Alim",
      medium: "",
      curriculum: "",
      board: "",
      groupSubject: "",
      gpa: "",
      passingYear: "",
    },
    {
      id: 3,
      institution: "",
      examination: "Honours",
      department: "",
      year: "",
      cgpa: "",
    },
    {
      id: 4,
      institution: "",
      examination: "Masters",
      department: "",
      year: "",
      cgpa: "",
    },
  ]);

  const [skillInput, setSkillInput] = useState({ type: "", value: "" });
  const [specialSkills, setSpecialSkills] = useState([]);
  const [fieldErrors, setFieldErrors] = useState({});
  const [imagePreview, setImagePreview] = useState({
    profileImage: null,
    educationDocument: null,
    nidFront: null,
    nidBack: null,
    birthCertificate: null,
  });
  const [isCompressing, setIsCompressing] = useState({
    profileImage: false,
    educationDocument: false,
    nidFront: false,
    nidBack: false,
    birthCertificate: false,
  });
  const [loading, setLoading] = useState(false);

  const resetForm = () => {
    setPersonalInfo({ name: "", phone: "", email: "", gender: "Male" });
    setAddressInfo({ division: "", district: "", thana: "", area: "" });
    setFileData({
      profileImage: null,
      educationDocument: null,
      documentType: "nid",
      nidFront: null,
      nidBack: null,
      birthCertificate: null,
    });
    setOtherData({
      preferredSubjects: [],
      experience: "",
      agreeTerms: true,
      score: "",
    });
    setEducationSections([
      {
        id: 1,
        institution: "",
        examination: "SSC/O Level/Dakhil",
        medium: "",
        curriculum: "",
        board: "",
        groupSubject: "",
        gpa: "",
        passingYear: "",
      },
      {
        id: 2,
        institution: "",
        examination: "HSC/A Levels/Alim",
        medium: "",
        curriculum: "",
        board: "",
        groupSubject: "",
        gpa: "",
        passingYear: "",
      },
      {
        id: 3,
        institution: "",
        examination: "Honours",
        department: "",
        year: "",
        cgpa: "",
      },
      {
        id: 4,
        institution: "",
        examination: "Masters",
        department: "",
        year: "",
        cgpa: "",
      },
    ]);
    setImagePreview({
      profileImage: null,
      educationDocument: null,
      nidFront: null,
      nidBack: null,
      birthCertificate: null,
    });
    setSkillInput({ type: "", value: "" });
    setSpecialSkills([]);
    setSuitableThana([]);
    setSuitableArea([]);
    setFieldErrors({});
    setLoading(false);
  };

  useEffect(() => {
    if (isOpen) {
      resetForm();
    }
  }, [isOpen]);

  const divisions = useMemo(
    () => locationData.divisions.map((d) => d.division.name_en),
    []
  );
  const districts = useMemo(() => {
    if (!addressInfo.division) return [];
    const selected = locationData.divisions.find(
      (d) => d.division.name_en === addressInfo.division
    );
    return selected ? selected.districts.map((dist) => dist.name_en) : [];
  }, [addressInfo.division]);
  const thanas = useMemo(() => {
    if (!addressInfo.division || !addressInfo.district) return [];
    const selectedDiv = locationData.divisions.find(
      (d) => d.division.name_en === addressInfo.division
    );
    const selectedDist = selectedDiv?.districts.find(
      (d) => d.name_en === addressInfo.district
    );
    return selectedDist ? selectedDist.thanas.map((u) => u.name_en) : [];
  }, [addressInfo.division, addressInfo.district]);
  const areas = useMemo(() => {
    if (!addressInfo.division || !addressInfo.district || !addressInfo.thana)
      return [];
    const selectedDiv = locationData.divisions.find(
      (d) => d.division.name_en === addressInfo.division
    );
    const selectedDist = selectedDiv?.districts.find(
      (d) => d.name_en === addressInfo.district
    );
    const selectedThana = selectedDist?.thanas.find(
      (u) => u.name_en === addressInfo.thana
    );
    return selectedThana ? selectedThana.areas.map((area) => area.name_en) : [];
  }, [addressInfo.division, addressInfo.district, addressInfo.thana]);

  const suitableAreaOptions = useMemo(() => {
    if (
      !addressInfo.division ||
      !addressInfo.district ||
      suitableThana.length === 0
    ) {
      return [];
    }

    const selectedDivision = locationData.divisions.find(
      (d) => d.division.name_en === addressInfo.division
    );
    if (!selectedDivision) return [];

    const selectedDistrict = selectedDivision.districts.find(
      (dist) => dist.name_en === addressInfo.district
    );
    if (!selectedDistrict) return [];

    const allAreas = suitableThana.flatMap((selectedThanaName) => {
      const thanaData = selectedDistrict.thanas.find(
        (t) => t.name_en === selectedThanaName
      );
      return thanaData ? thanaData.areas.map((area) => area.name_en) : [];
    });

    return [...new Set(allAreas)].sort();
  }, [addressInfo.division, addressInfo.district, suitableThana]);

  const validateForm = () => {
    const errors = {};
    if (!personalInfo.name || personalInfo.name.trim().length < 2)
      errors.name = "Please enter your name (2-100 characters).";
    if (personalInfo.name.length > 100)
      errors.name = "Name can't be more than 100 characters.";
    if (!/^[a-zA-Z\s.'-]+$/.test(personalInfo.name))
      errors.name =
        "Name can only contain letters, spaces, dots, apostrophes, and hyphens.";
    if (!personalInfo.phone || !/^01[3-9]\d{8}$/.test(personalInfo.phone))
      errors.phone =
        "Enter a valid Bangladeshi phone number (e.g. 01XXXXXXXXX).";
    if (
      !personalInfo.email ||
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(personalInfo.email)
    )
      errors.email = "Enter a valid email address.";
    if (!addressInfo.division) errors.division = "Please select your division.";
    if (!addressInfo.district) errors.district = "Please select your district.";
    if (!addressInfo.thana) errors.thana = "Please select your thana.";
    if (!addressInfo.area) errors.area = "Please select your area.";

    educationSections.forEach((section, index) => {
      const sectionKey = `education_${section.id}`;
      const isRequired = index < 2;
      if (isRequired) {
        if (!section.institution || section.institution.trim() === "") {
          errors[`${sectionKey}_institution`] = `Institution name is required`;
        }
        if (
          section.examination === "SSC/O Level/Dakhil" ||
          section.examination === "HSC/A Levels/Alim"
        ) {
          if (
            !section.medium ||
            ![
              "Bangla Medium",
              "English Medium",
              "English Version (National Curriculum)",
              "Arabic Medium",
            ].includes(section.medium)
          ) {
            errors[`${sectionKey}_medium`] = `Medium is required`;
          }
          if (
            section.medium === "English Medium" &&
            (!section.curriculum ||
              !["Cambridge", "Edexcel", "IB Curriculum"].includes(
                section.curriculum
              ))
          ) {
            errors[
              `${sectionKey}_curriculum`
            ] = `Curriculum is required for English Medium`;
          }
          if (!section.board || section.board.trim() === "") {
            errors[`${sectionKey}_board`] = `Board is required`;
          }
          if (!section.groupSubject || section.groupSubject.trim() === "") {
            errors[`${sectionKey}_groupSubject`] = `Group/Subject is required`;
          }
          if (section.gpa && section.gpa.trim().length > 20) {
            errors[
              `${sectionKey}_gpa`
            ] = `GPA/Grade cannot be more than 20 characters.`;
          }
          if (!section.passingYear) {
            errors[`${sectionKey}_passingYear`] = `Passing year is required`;
          } else {
            const year = parseInt(section.passingYear);
            const currentYear = new Date().getFullYear();
            if (isNaN(year) || year < 2000 || year > currentYear) {
              errors[
                `${sectionKey}_passingYear`
              ] = `Invalid passing year. Must be between 2000 and ${currentYear}`;
            }
          }
        }
      } else {
        if (section.cgpa && section.cgpa.trim().length > 20) {
          errors[`${sectionKey}_cgpa`] = `CGPA cannot exceed 20 characters.`;
        }
        if (section.year && section.year.trim() !== "") {
          const validYears =
            section.examination === "Honours"
              ? ["1st", "2nd", "3rd", "4th", "5th", "Passed"]
              : ["1st", "Passed"];
          if (!validYears.includes(section.year)) {
            errors[
              `${sectionKey}_year`
            ] = `Invalid year. Must be one of: ${validYears.join(", ")}`;
          }
        }
      }
    });

    if (!fileData.educationDocument)
      errors.educationDocument = "Please upload your education document.";
    if (fileData.documentType === "nid") {
      if (!fileData.nidFront)
        errors.nidFront = "Please upload your NID front image.";
      if (!fileData.nidBack)
        errors.nidBack = "Please upload your NID back image.";
    } else if (
      fileData.documentType === "birth_certificate" &&
      !fileData.birthCertificate
    ) {
      errors.birthCertificate = "Please upload your birth certificate image.";
    }

    if (!otherData.experience || otherData.experience.trim().length < 50)
      errors.experience =
        "Please describe your teaching experience (min 50 characters).";
    if (otherData.experience.length > 2000)
      errors.experience =
        "Experience description can't exceed 2000 characters.";
    if (
      !otherData.preferredSubjects ||
      otherData.preferredSubjects.length === 0
    )
      errors.preferredSubjects = "Please add at least one preferred subject.";
    if (!suitableThana || suitableThana.length === 0) {
      errors.suitableThana = "Please select at least one suitable thana.";
    }
    if (!suitableArea || suitableArea.length === 0) {
      errors.suitableArea = "Please add at least one suitable area.";
    }
    if (!otherData.agreeTerms)
      errors.agreeTerms = "You must agree to the terms and conditions.";

    if (otherData.score) {
      const scoreValue = parseFloat(otherData.score);
      if (isNaN(scoreValue) || scoreValue < 1 || scoreValue > 500) {
        errors.score = "Score must be a number between 1 and 500.";
      }
    }

    return errors;
  };

  const handlePersonalInfoChange = (field, value) => {
    setPersonalInfo((prev) => ({ ...prev, [field]: value }));
    if (fieldErrors[field])
      setFieldErrors((prev) => ({ ...prev, [field]: undefined }));
  };

  const handleAddressChange = (field, value) => {
    if (fieldErrors[field])
      setFieldErrors((prev) => ({ ...prev, [field]: undefined }));
    if (field === "division") {
      setAddressInfo({ division: value, district: "", thana: "", area: "" });
      setFieldErrors((prev) => ({
        ...prev,
        district: undefined,
        thana: undefined,
        area: undefined,
      }));
    } else if (field === "district") {
      setAddressInfo((prev) => ({
        ...prev,
        district: value,
        thana: "",
        area: "",
      }));
      setFieldErrors((prev) => ({
        ...prev,
        thana: undefined,
        area: undefined,
      }));
    } else if (field === "thana") {
      setAddressInfo((prev) => ({ ...prev, thana: value, area: "" }));
      setFieldErrors((prev) => ({ ...prev, area: undefined }));
    } else {
      setAddressInfo((prev) => ({ ...prev, [field]: value }));
    }
  };

  const handleFileChange = (field, value) => {
    setFileData((prev) => ({ ...prev, [field]: value }));
    if (fieldErrors[field])
      setFieldErrors((prev) => ({ ...prev, [field]: undefined }));
  };

  const handleOtherDataChange = (field, value) => {
    setOtherData((prev) => ({ ...prev, [field]: value }));
    if (fieldErrors[field])
      setFieldErrors((prev) => ({ ...prev, [field]: undefined }));
  };

  const updateEducationSection = (id, field, value) => {
    setEducationSections((prev) =>
      prev.map((s) => (s.id === id ? { ...s, [field]: value } : s))
    );
    const errorKey = `education_${id}_${field}`;
    if (fieldErrors[errorKey])
      setFieldErrors((prev) => ({ ...prev, [errorKey]: undefined }));
  };

  const handleAddSkill = () => {
    if (!skillInput.type || !skillInput.value.trim()) {
      return toast.error("Please select skill type and enter value");
    }
    if (skillInput.value.trim().length < 2) {
      return toast.error("Skill value must be at least 2 characters");
    }
    const isDuplicate = specialSkills.some(
      (skill) =>
        skill.type === skillInput.type &&
        skill.value.toLowerCase() === skillInput.value.trim().toLowerCase()
    );
    if (isDuplicate) {
      return toast.error("This skill already exists");
    }
    setSpecialSkills((prev) => [
      ...prev,
      { type: skillInput.type, value: skillInput.value.trim() },
    ]);
    setSkillInput({ type: "", value: "" });
  };

  const removeSkill = (index) => {
    setSpecialSkills((prev) => prev.filter((_, i) => i !== index));
  };

  const addSubject = (subject) => {
    if (subject && !otherData.preferredSubjects.includes(subject)) {
      setOtherData((prev) => ({
        ...prev,
        preferredSubjects: [...prev.preferredSubjects, subject],
      }));
      if (fieldErrors.preferredSubjects)
        setFieldErrors((prev) => ({ ...prev, preferredSubjects: undefined }));
    }
  };

  const removeSubject = (subject) => {
    setOtherData((prev) => ({
      ...prev,
      preferredSubjects: prev.preferredSubjects.filter((s) => s !== subject),
    }));
    if (fieldErrors.preferredSubjects)
      setFieldErrors((prev) => ({ ...prev, preferredSubjects: undefined }));
  };

  const removeImage = (field) => {
    setFileData((prev) => ({ ...prev, [field]: null }));
    setImagePreview((prev) => {
      const currentUrl = prev[field];
      if (currentUrl) URL.revokeObjectURL(currentUrl);
      return { ...prev, [field]: null };
    });
  };

  const handleFileUpload = async (field, file) => {
    if (!file || !file.type.startsWith("image/"))
      return toast.error("Only image files are allowed");
    if (file.size > 3 * 1024 * 1024)
      return toast.error("File size cannot exceed 3MB.");

    setIsCompressing((prev) => ({ ...prev, [field]: true }));
    const options = {
      maxSizeMB: 0.3,
      maxWidthOrHeight: 800,
      useWebWorker: true,
      fileType: "image/jpeg",
      quality: 0.7,
    };

    try {
      const compressedFile = await imageCompression(file, options);
      handleFileChange(field, compressedFile);
      setImagePreview((prev) => ({
        ...prev,
        [field]: URL.createObjectURL(compressedFile),
      }));
      toast.success(`${field} compressed and ready`);
    } catch (error) {
      console.error("Image compression error:", error);
      toast.error("Could not compress image.");
    } finally {
      setIsCompressing((prev) => ({ ...prev, [field]: false }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errors = validateForm();
    setFieldErrors(errors);

    if (Object.keys(errors).length > 0) {
      const firstErrorField = Object.keys(errors)[0];
      const firstErrorMessage = errors[firstErrorField];
      toast.error(firstErrorMessage || "Please fill all required fields.");

      const refKey = firstErrorField.startsWith("education_")
        ? firstErrorField.split("_")[2]
        : firstErrorField;
      const fieldRef = fieldRefs[refKey];

      if (fieldRef && fieldRef.current) {
        fieldRef.current.focus({ preventScroll: true });
        fieldRef.current.scrollIntoView({
          behavior: "smooth",
          block: "center",
        });
      }
      return;
    }

    setLoading(true);
    const formData = new FormData();
    formData.append("name", personalInfo.name);
    formData.append("phone", personalInfo.phone);
    formData.append("email", personalInfo.email);
    formData.append("gender", personalInfo.gender);
    formData.append("division", addressInfo.division);
    formData.append("district", addressInfo.district);
    formData.append("thana", addressInfo.thana);
    formData.append("area", addressInfo.area);
    if (fileData.profileImage)
      formData.append("profileImage", fileData.profileImage);
    formData.append("educationDocument", fileData.educationDocument);
    formData.append("documentType", fileData.documentType);
    if (fileData.documentType === "nid") {
      formData.append("nidFront", fileData.nidFront);
      formData.append("nidBack", fileData.nidBack);
    } else {
      formData.append("birthCertificate", fileData.birthCertificate);
    }
    formData.append("experience", otherData.experience);
    formData.append(
      "preferredSubjects",
      JSON.stringify(otherData.preferredSubjects)
    );
    formData.append("educationSections", JSON.stringify(educationSections));

    const validSpecialSkills = specialSkills.filter(
      (skill) => skill.type && skill.value
    );
    if (validSpecialSkills.length > 0) {
      formData.append("specialSkills", JSON.stringify(validSpecialSkills));
    }

    formData.append("suitableThana", JSON.stringify(suitableThana));
    formData.append("suitableArea", JSON.stringify(suitableArea));
    formData.append("agreeTerms", otherData.agreeTerms);
    formData.append("score", otherData.score);

    try {
      const res = await ApiService.applyTutor(formData);
      toast.success(res.message || "Tutor added successfully!");
      onSuccess();
      onClose();
    } catch (error) {
      console.error("Submission error:", error);
      toast.error(error.response?.data?.message || "Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  const specialSkillOptions = [
    "Language",
    "Art",
    "IELTS",
    "SAT",
    "PT",
    "TOEFL",
    "Music Instrument",
    "Singing",
    "Dancing",
  ];
  const getValidCurriculaForEnglishMedium = () => [
    "Cambridge",
    "Edexcel",
    "IB Curriculum",
  ];
  const getYearOptionsForExamination = (exam) => {
    if (exam === "Honours")
      return ["1st", "2nd", "3rd", "4th", "5th", "Passed"];
    if (exam === "Masters") return ["1st", "Passed"];
    return [];
  };

  return (
    <>
      <div className="fixed inset-0 bg-black/60 backdrop-blur-xs z-50 flex justify-center items-center p-4">
        <div className="bg-white rounded-2xl shadow-xl border border-[#E4E6EE] w-full max-w-4xl max-h-[90vh] flex flex-col overflow-hidden">
          <div className="p-5 border-b border-[#E4E6EE] bg-white flex justify-between items-center">
            <h2 className="text-base font-bold text-[#1A1D29]">Add New Tutor</h2>
            <button
              onClick={onClose}
              className="p-1.5 text-[#5B5F73] hover:text-[#1A1D29] hover:bg-[#F7F8FB] rounded-lg transition-colors"
            >
              <X size={20} />
            </button>
          </div>
          <div className="p-6 overflow-y-auto">
            <form onSubmit={handleSubmit} className="space-y-8">
              <TutorPersonalInfoSection
                personalInfo={personalInfo}
                otherData={otherData}
                handlePersonalInfoChange={handlePersonalInfoChange}
                handleOtherDataChange={handleOtherDataChange}
                fieldErrors={fieldErrors}
                fieldRefs={fieldRefs}
              />

              <TutorEducationInfoSection
                educationSections={educationSections}
                updateEducationSection={updateEducationSection}
                fieldErrors={fieldErrors}
                skillInput={skillInput}
                setSkillInput={setSkillInput}
                specialSkills={specialSkills}
                handleAddSkill={handleAddSkill}
                removeSkill={removeSkill}
                specialSkillOptions={specialSkillOptions}
                getValidCurriculaForEnglishMedium={
                  getValidCurriculaForEnglishMedium
                }
                getYearOptionsForExamination={getYearOptionsForExamination}
              />

              <TutorProfessionalInfoSection
                addressInfo={addressInfo}
                handleAddressChange={handleAddressChange}
                divisions={divisions}
                districts={districts}
                thanas={thanas}
                areas={areas}
                otherData={otherData}
                handleOtherDataChange={handleOtherDataChange}
                addSubject={addSubject}
                removeSubject={removeSubject}
                suitableThana={suitableThana}
                setSuitableThana={setSuitableThana}
                suitableArea={suitableArea}
                setSuitableArea={setSuitableArea}
                suitableAreaOptions={suitableAreaOptions}
                fieldErrors={fieldErrors}
                fieldRefs={fieldRefs}
              />

              <TutorDocumentUploadSection
                fileData={fileData}
                handleFileChange={handleFileChange}
                imagePreview={imagePreview}
                isCompressing={isCompressing}
                removeImage={removeImage}
                handleFileUpload={handleFileUpload}
                fieldErrors={fieldErrors}
              />

              {/* Terms and Submit */}
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="agreeTerms"
                  checked={otherData.agreeTerms}
                  onChange={(e) =>
                    handleOtherDataChange("agreeTerms", e.target.checked)
                  }
                  className="w-4 h-4"
                />
                <label
                  htmlFor="agreeTerms"
                  className="ml-2 text-sm font-medium"
                >
                  Agree to terms and conditions
                </label>
              </div>
              {fieldErrors.agreeTerms && (
                <p className="text-sm text-red-600">{fieldErrors.agreeTerms}</p>
              )}
            </form>
          </div>
          <div className="p-5 border-t border-[#E4E6EE] bg-white flex justify-end gap-3">
            <button
              onClick={onClose}
              className="px-5 py-2.5 bg-white text-[#1A1D29] hover:bg-[#F7F8FB] border border-[#E4E6EE] rounded-lg text-xs font-semibold shadow-xs transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={handleSubmit}
              disabled={loading || !otherData.agreeTerms}
              className="px-5 py-2.5 bg-[#3730E0] text-white hover:bg-[#2D24C4] rounded-lg text-xs font-semibold shadow-xs disabled:bg-[#EEF2FF] disabled:text-[#94A3B8] disabled:border disabled:border-[#E0E7FF] transition-all"
            >
              {loading ? "Submitting..." : "Submit Tutor"}
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default AddTutorModal;
