import React, { useState, useEffect, useMemo, useRef } from "react";
import ApiService from "../services/api";
import { toast } from "react-toastify";
import locationData from "../assets/data/address.json";
import TermsModal from "../components/TermsModal";
import Button from "../components/Common/Button";
import imageCompression from "browser-image-compression";
import {
  User,
  GraduationCap,
  FileCheck,
  CheckCircle2,
  ArrowRight,
  ArrowLeft,
  ShieldCheck,
  Check,
  AlertCircle,
  FileText,
  Clock,
  Sparkles,
} from "lucide-react";

import ApplicationHeader from "../components/ApplyTutor/ApplicationHeader";
import PersonalInfoForm from "../components/ApplyTutor/PersonalInfoForm";
import ProfessionalInfoForm from "../components/ApplyTutor/ProfessionalInfoForm";
import DocumentUploadSection from "../components/ApplyTutor/DocumentUploadSection";

const STEPS = [
  { id: 1, title: "Personal Details", icon: User },
  { id: 2, title: "Qualifications", icon: GraduationCap },
  { id: 3, title: "Documents", icon: FileCheck },
  { id: 4, title: "Review & Submit", icon: CheckCircle2 },
];

const ApplyTutor = () => {
  const SESSION_STORAGE_KEY = "tutorApplicationFormData";

  const [currentStep, setCurrentStep] = useState(1);
  const [submittedSuccess, setSubmittedSuccess] = useState(false);
  const [submissionId, setSubmissionId] = useState("");

  const fieldRefs = {
    name: useRef(null),
    phone: useRef(null),
    email: useRef(null),
    division: useRef(null),
    district: useRef(null),
    thanas: useRef(null),
    area: useRef(null),
    profileImage: useRef(null),
    educationDocument: useRef(null),
    nidFront: useRef(null),
    nidBack: useRef(null),
    birthCertificate: useRef(null),
    experience: useRef(null),
    preferredSubjects: useRef(null),
  };

  const [personalInfo, setPersonalInfo] = useState({
    name: "",
    phone: "",
    email: "",
    gender: "Male",
  });
  const [addressInfo, setAddressInfo] = useState({
    division: "",
    district: "",
    thanas: "",
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
    agreeTerms: false,
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
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [skillInput, setSkillInput] = useState({ type: "", value: "" });
  const [specialSkills, setSpecialSkills] = useState([]);
  const [subjectInput, setSubjectInput] = useState("");
  const [suitableThana, setSuitableThana] = useState([]);
  const [suitableArea, setSuitableArea] = useState([]);
  const [showVideo, setShowVideo] = useState(false);

  // Restore state from sessionStorage on component mount
  useEffect(() => {
    window.scrollTo(0, 0);

    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({
      event: "apply_tutor",
    });

    try {
      const savedData = sessionStorage.getItem(SESSION_STORAGE_KEY);
      if (savedData) {
        const parsedData = JSON.parse(savedData);
        setPersonalInfo(
          parsedData.personalInfo || {
            name: "",
            phone: "",
            email: "",
            gender: "Male",
          }
        );
        setAddressInfo(
          parsedData.addressInfo || {
            division: "",
            district: "",
            thanas: "",
            area: "",
          }
        );
        setEducationSections(parsedData.educationSections || educationSections);
        setOtherData(
          parsedData.otherData || {
            preferredSubjects: [],
            experience: "",
            agreeTerms: false,
          }
        );
        setFileData((prev) => ({
          ...prev,
          documentType: parsedData.documentType || "nid",
        }));
        setSkillInput(parsedData.skillInput || { type: "", value: "" });
        setSuitableThana(parsedData.suitableThana || []);
        setSuitableArea(parsedData.suitableArea || []);
      }
    } catch (error) {
      console.error("Failed to restore form data from session storage", error);
    }
  }, []);

  // Save state to sessionStorage on any change
  useEffect(() => {
    try {
      const dataToSave = {
        personalInfo,
        addressInfo,
        educationSections,
        otherData,
        documentType: fileData.documentType,
        skillInput,
        suitableThana,
        suitableArea,
      };
      sessionStorage.setItem(SESSION_STORAGE_KEY, JSON.stringify(dataToSave));
    } catch (error) {
      console.error("Failed to save form data to session storage", error);
    }
  }, [
    personalInfo,
    addressInfo,
    educationSections,
    otherData,
    fileData.documentType,
    skillInput,
    suitableThana,
    suitableArea,
  ]);

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
    const selectedDivision = locationData.divisions.find(
      (d) => d.division.name_en === addressInfo.division
    );
    if (!selectedDivision) return [];
    const selectedDistrict = selectedDivision.districts.find(
      (dist) => dist.name_en === addressInfo.district
    );
    return selectedDistrict
      ? selectedDistrict.thanas.map((u) => u.name_en)
      : [];
  }, [addressInfo.division, addressInfo.district]);
  const areas = useMemo(() => {
    if (!addressInfo.division || !addressInfo.district || !addressInfo.thanas)
      return [];
    const selectedDivision = locationData.divisions.find(
      (d) => d.division.name_en === addressInfo.division
    );
    if (!selectedDivision) return [];
    const selectedDistrict = selectedDivision.districts.find(
      (dist) => dist.name_en === addressInfo.district
    );
    if (!selectedDistrict) return [];
    const selectedthanas = selectedDistrict.thanas.find(
      (u) => u.name_en === addressInfo.thanas
    );
    return selectedthanas ? selectedthanas.areas.map((un) => un.name_en) : [];
  }, [addressInfo.division, addressInfo.district, addressInfo.thanas]);
  const suitableAreaOptions = useMemo(() => {
    if (
      !addressInfo.division ||
      !addressInfo.district ||
      suitableThana.length === 0
    )
      return [];
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

  // Step 1 Validation
  const validateStep1 = () => {
    const errors = {};
    if (!personalInfo.name || personalInfo.name.trim().length < 2)
      errors.name = "Please enter your full name (at least 2 characters).";
    if (!personalInfo.phone || !/^01[3-9]\d{8}$/.test(personalInfo.phone))
      errors.phone = "Enter a valid Bangladeshi phone number (e.g. 01XXXXXXXXX).";
    if (!personalInfo.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(personalInfo.email))
      errors.email = "Enter a valid email address.";
    if (!addressInfo.division) errors.division = "Please select your division.";
    if (!addressInfo.district) errors.district = "Please select your district.";
    if (!addressInfo.thanas) errors.thanas = "Please select your thana.";
    if (!addressInfo.area) errors.area = "Please select your area.";
    return errors;
  };

  // Step 2 Validation
  const validateStep2 = () => {
    const errors = {};
    educationSections.forEach((section, index) => {
      const sectionKey = `education_${section.id}`;
      if (index < 2) {
        if (!section.institution)
          errors[`${sectionKey}_institution`] = `Institution name is required`;
        if (!section.medium)
          errors[`${sectionKey}_medium`] = `Medium is required`;
        if (section.medium === "English Medium" && !section.curriculum)
          errors[`${sectionKey}_curriculum`] = `Curriculum is required for English Medium`;
        if (!section.board) errors[`${sectionKey}_board`] = `Board is required`;
        if (!section.groupSubject)
          errors[`${sectionKey}_groupSubject`] = `Group/Subject is required`;
        if (!section.passingYear)
          errors[`${sectionKey}_passingYear`] = `Passing year is required`;
      }
    });
    if (!otherData.experience || otherData.experience.trim().length < 50)
      errors.experience = "Please describe your teaching experience (at least 50 characters).";
    if (otherData.preferredSubjects.length === 0)
      errors.preferredSubjects = "Please add at least one preferred subject.";
    if (suitableThana.length === 0)
      errors.suitableThana = "Please select at least one suitable thana.";
    if (suitableArea.length === 0)
      errors.suitableArea = "Please add at least one suitable area.";
    return errors;
  };

  // Step 3 Validation
  const validateStep3 = () => {
    const errors = {};
    if (!fileData.educationDocument)
      errors.educationDocument = "Please upload your education certificate or student ID.";
    if (fileData.documentType === "nid") {
      if (!fileData.nidFront)
        errors.nidFront = "Please upload your NID front image.";
      if (!fileData.nidBack)
        errors.nidBack = "Please upload your NID back image.";
    } else if (fileData.documentType === "birth_certificate") {
      if (!fileData.birthCertificate)
        errors.birthCertificate = "Please upload your birth certificate image.";
    }
    return errors;
  };

  const handleNextStep = () => {
    let errors = {};
    if (currentStep === 1) errors = validateStep1();
    else if (currentStep === 2) errors = validateStep2();
    else if (currentStep === 3) errors = validateStep3();

    if (Object.keys(errors).length > 0) {
      setFieldErrors(errors);
      const firstError = Object.values(errors)[0];
      toast.error(firstError);
      return;
    }

    setFieldErrors({});
    setCurrentStep((prev) => Math.min(prev + 1, 4));
    window.scrollTo({ top: 120, behavior: "smooth" });
  };

  const handlePrevStep = () => {
    setFieldErrors({});
    setCurrentStep((prev) => Math.max(prev - 1, 1));
    window.scrollTo({ top: 120, behavior: "smooth" });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!otherData.agreeTerms) {
      setFieldErrors((prev) => ({
        ...prev,
        agreeTerms: "You must agree to the terms and conditions to proceed.",
      }));
      toast.warn("Please agree to the Terms & Conditions.");
      return;
    }

    setLoading(true);
    try {
      const formData = new FormData();
      formData.append("name", personalInfo.name);
      formData.append("phone", personalInfo.phone);
      formData.append("email", personalInfo.email);
      formData.append("gender", personalInfo.gender);
      formData.append("division", addressInfo.division);
      formData.append("district", addressInfo.district);
      formData.append("thana", addressInfo.thanas);
      formData.append("area", addressInfo.area);
      formData.append("suitableThana", JSON.stringify(suitableThana));
      formData.append("suitableArea", JSON.stringify(suitableArea));
      formData.append("educationSections", JSON.stringify(educationSections));
      formData.append(
        "preferredSubjects",
        JSON.stringify(otherData.preferredSubjects)
      );
      const validSpecialSkills = specialSkills.filter(
        (skill) => skill.type && skill.value
      );
      if (validSpecialSkills.length > 0)
        formData.append("specialSkills", JSON.stringify(validSpecialSkills));
      formData.append("experience", otherData.experience);
      formData.append("documentType", fileData.documentType);
      formData.append("agreeTerms", otherData.agreeTerms);
      if (fileData.profileImage)
        formData.append("profileImage", fileData.profileImage);
      if (fileData.educationDocument)
        formData.append("educationDocument", fileData.educationDocument);
      if (fileData.documentType === "nid") {
        if (fileData.nidFront) formData.append("nidFront", fileData.nidFront);
        if (fileData.nidBack) formData.append("nidBack", fileData.nidBack);
      } else if (fileData.documentType === "birth_certificate") {
        if (fileData.birthCertificate)
          formData.append("birthCertificate", fileData.birthCertificate);
      }

      const response = await ApiService.applyAsTutor(formData);

      if (response.success) {
        toast.success("Application submitted successfully!");
        sessionStorage.removeItem(SESSION_STORAGE_KEY);

        const appId = response.applicationId || response.data?.application?.id || `TV-TUTOR-${Date.now().toString().slice(-6)}`;
        setSubmissionId(appId);
        setSubmittedSuccess(true);

        window.dataLayer = window.dataLayer || [];
        window.dataLayer.push({
          event: "tutor_application_Submit",
          transaction_id: appId,
        });

        window.scrollTo({ top: 0, behavior: "smooth" });
      }
    } catch (error) {
      console.error("Submission error:", error);
      toast.error(
        error.response?.data?.message || "Failed to submit application"
      );
    } finally {
      setLoading(false);
    }
  };

  const handlePersonalInfoChange = (field, value) => {
    setPersonalInfo((prev) => ({ ...prev, [field]: value }));
    if (fieldErrors[field])
      setFieldErrors((prev) => ({ ...prev, [field]: undefined }));
  };

  const handleAddressChange = (field, value) => {
    if (fieldErrors[field])
      setFieldErrors((prev) => ({ ...prev, [field]: undefined }));
    if (field === "division")
      setAddressInfo({ division: value, district: "", thanas: "", area: "" });
    else if (field === "district")
      setAddressInfo((prev) => ({
        ...prev,
        district: value,
        thanas: "",
        area: "",
      }));
    else if (field === "thanas")
      setAddressInfo((prev) => ({ ...prev, thanas: value, area: "" }));
    else setAddressInfo((prev) => ({ ...prev, [field]: value }));
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

  const handleAcceptTerms = () => {
    setOtherData((prev) => ({ ...prev, agreeTerms: true }));
    setFieldErrors((prev) => ({ ...prev, agreeTerms: undefined }));
    setIsModalOpen(false);
  };

  const handleCancelTerms = () => {
    setOtherData((prev) => ({ ...prev, agreeTerms: false }));
    setIsModalOpen(false);
  };

  const updateEducationSection = (id, field, value) => {
    setEducationSections((prev) =>
      prev.map((section) =>
        section.id === id ? { ...section, [field]: value } : section
      )
    );
    const errorKey = `education_${id}_${field}`;
    if (fieldErrors[errorKey])
      setFieldErrors((prev) => ({ ...prev, [errorKey]: undefined }));
  };

  const removeSubject = (subject) =>
    setOtherData((prev) => ({
      ...prev,
      preferredSubjects: prev.preferredSubjects.filter((s) => s !== subject),
    }));

  const handleAddSubject = () => {
    const subjectToAdd = subjectInput.trim();
    if (subjectToAdd.length < 2)
      return toast.warn("Subject must be at least 2 characters long.");
    if (otherData.preferredSubjects.includes(subjectToAdd))
      return toast.warn(`"${subjectToAdd}" has already been added.`);
    setOtherData((prev) => ({
      ...prev,
      preferredSubjects: [...prev.preferredSubjects, subjectToAdd],
    }));
    setSubjectInput("");
  };

  const handleAddSkill = () => {
    if (!skillInput.type || !skillInput.value.trim())
      return toast.error("Please select skill type and enter value");
    if (skillInput.value.trim().length < 2)
      return toast.error("Skill value must be at least 2 characters");
    const isDuplicate = specialSkills.some(
      (skill) =>
        skill.type === skillInput.type &&
        skill.value.toLowerCase() === skillInput.value.trim().toLowerCase()
    );
    if (isDuplicate) return toast.error("This skill already exists");
    setSpecialSkills((prev) => [
      ...prev,
      { type: skillInput.type, value: skillInput.value.trim() },
    ]);
    setSkillInput({ type: "", value: "" });
  };

  const removeSkill = (index) =>
    setSpecialSkills((prev) => prev.filter((_, i) => i !== index));

  const removeImage = (field) => {
    setFileData((prev) => ({ ...prev, [field]: null }));
    setImagePreview((prev) => {
      if (prev[field]) URL.revokeObjectURL(prev[field]);
      return { ...prev, [field]: null };
    });
  };

  const handleFileUpload = async (field, file) => {
    if (!file || !file.type.startsWith("image/"))
      return toast.error("Only image files are allowed.");
    if (file.size > 15 * 1024 * 1024)
      return toast.error("File size is too large. Please select an image under 15MB.");
    setIsCompressing((prev) => ({ ...prev, [field]: true }));
    const options = {
      maxSizeMB: 0.5,
      maxWidthOrHeight: 1280,
      useWebWorker: true,
      fileType: "image/jpeg",
    };
    try {
      const compressionToast = toast.info("Optimizing document for secure upload...", {
        autoClose: false,
      });
      const compressedFile = await imageCompression(file, options);
      toast.dismiss(compressionToast);
      toast.success("Document optimized successfully!");
      setFileData((prev) => ({ ...prev, [field]: compressedFile }));
      setImagePreview((prev) => {
        if (prev[field]) URL.revokeObjectURL(prev[field]);
        return { ...prev, [field]: URL.createObjectURL(compressedFile) };
      });
    } catch (error) {
      console.error("Image compression error:", error);
      toast.error("Failed to compress image.");
    } finally {
      setIsCompressing((prev) => ({ ...prev, [field]: false }));
    }
  };

  const addSuitableArea = (area) => {
    if (area && !suitableArea.includes(area)) {
      setSuitableArea((prev) => [...prev, area]);
      if (fieldErrors.suitableArea)
        setFieldErrors((prev) => ({ ...prev, suitableArea: undefined }));
    }
  };
  const removeSuitableArea = (area) => {
    setSuitableArea((prev) => prev.filter((a) => a !== area));
    if (fieldErrors.suitableArea)
      setFieldErrors((prev) => ({ ...prev, suitableArea: undefined }));
  };

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

  // Success Confirmation State
  if (submittedSuccess) {
    return (
      <div className="min-h-screen bg-[#F7F8FB] text-[#1A1D29] py-12 sm:py-16 font-sans">
        <div className="max-w-2xl mx-auto px-4 sm:px-6">
          <div className="bg-white rounded-2xl border border-[#E4E6EE] shadow-card p-8 sm:p-12 text-center space-y-6">
            <div className="w-16 h-16 bg-[#16A34A]/10 text-[#16A34A] rounded-2xl flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-9 h-9" />
            </div>

            <div className="space-y-2">
              <h2 className="text-2xl sm:text-3xl font-extrabold text-[#1A1D29]">
                Application Submitted!
              </h2>
              <p className="text-sm text-[#5B5F73] max-w-md mx-auto">
                Thank you for applying to become a verified tutor at TutorBridge. Your profile is now registered for screening.
              </p>
            </div>

            <div className="bg-[#F7F8FB] border border-[#E4E6EE] rounded-xl p-4 max-w-sm mx-auto">
              <span className="text-xs text-[#5B5F73]">Tracking Reference ID</span>
              <p className="text-base font-bold text-[#3730E0]">{submissionId}</p>
            </div>

            {/* Next Steps Card */}
            <div className="text-left bg-white border border-[#E4E6EE] rounded-xl p-5 space-y-3">
              <h4 className="text-xs font-bold uppercase tracking-wider text-[#1A1D29]">
                What Happens Next?
              </h4>
              <ul className="space-y-2 text-xs sm:text-sm text-[#5B5F73]">
                <li className="flex items-start gap-2">
                  <Clock className="w-4 h-4 text-[#3730E0] mt-0.5 shrink-0" />
                  <span>Document verification takes approximately 24 to 48 hours.</span>
                </li>
                <li className="flex items-start gap-2">
                  <ShieldCheck className="w-4 h-4 text-[#16A34A] mt-0.5 shrink-0" />
                  <span>Once verified, tuition requests matching your locations will be dispatched to your phone.</span>
                </li>
                <li className="flex items-start gap-2">
                  <Sparkles className="w-4 h-4 text-[#0EA5A0] mt-0.5 shrink-0" />
                  <span>You can apply immediately to open tuition vacancies across Bangladesh.</span>
                </li>
              </ul>
            </div>

            <div className="pt-2 flex flex-col sm:flex-row gap-3 justify-center">
              <a href="/tuition-jobs">
                <Button variant="primary" size="md" iconRight={ArrowRight}>
                  Explore Available Tuition Jobs
                </Button>
              </a>
              <Button
                variant="secondary"
                size="md"
                onClick={() => {
                  setSubmittedSuccess(false);
                  setCurrentStep(1);
                }}
              >
                Submit Another Application
              </Button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F7F8FB] text-[#1A1D29] py-8 sm:py-12 font-sans">
      <div className="w-full max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <ApplicationHeader showVideo={showVideo} setShowVideo={setShowVideo} />

        {/* Multi-Step Progress Stepper */}
        <div className="bg-white rounded-2xl border border-[#E4E6EE] p-4 sm:p-6 mb-6 shadow-sm">
          <div className="grid grid-cols-4 gap-2 sm:gap-4">
            {STEPS.map((s) => {
              const Icon = s.icon;
              const isPassed = currentStep > s.id;
              const isCurrent = currentStep === s.id;

              return (
                <div
                  key={s.id}
                  onClick={() => {
                    if (s.id < currentStep) setCurrentStep(s.id);
                  }}
                  className={`flex flex-col sm:flex-row items-center gap-2 p-2 rounded-xl transition-all ${
                    s.id < currentStep ? "cursor-pointer hover:bg-[#F7F8FB]" : ""
                  }`}
                >
                  <div
                    className={`w-9 h-9 sm:w-10 sm:h-10 rounded-xl flex items-center justify-center text-xs font-bold shrink-0 transition-all ${
                      isPassed
                        ? "bg-[#16A34A] text-white shadow-xs"
                        : isCurrent
                        ? "bg-[#3730E0] text-white shadow-sm ring-4 ring-[#3730E0]/15"
                        : "bg-[#F7F8FB] text-[#5B5F73] border border-[#E4E6EE]"
                    }`}
                  >
                    {isPassed ? <Check className="w-4 h-4" /> : <Icon className="w-4 h-4" />}
                  </div>
                  <div className="text-center sm:text-left hidden sm:block">
                    <span className="block text-[10px] text-[#5B5F73] uppercase font-semibold">
                      Step 0{s.id}
                    </span>
                    <span
                      className={`text-xs font-bold truncate block ${
                        isCurrent
                          ? "text-[#3730E0]"
                          : isPassed
                          ? "text-[#1A1D29]"
                          : "text-[#5B5F73]"
                      }`}
                    >
                      {s.title}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Progress Bar */}
          <div className="w-full bg-[#E4E6EE] h-1.5 rounded-full mt-4 overflow-hidden">
            <div
              className="bg-[#3730E0] h-full transition-all duration-300 rounded-full"
              style={{ width: `${(currentStep / 4) * 100}%` }}
            />
          </div>
        </div>

        {/* Form Container */}
        <div className="bg-white rounded-2xl shadow-card border border-[#E4E6EE] overflow-hidden">
          <div className="px-6 py-5 border-b border-[#E4E6EE] bg-white flex items-center justify-between">
            <div>
              <span className="text-[11px] font-bold text-[#3730E0] uppercase tracking-wider">
                Step 0{currentStep} of 04
              </span>
              <h2 className="text-xl sm:text-2xl font-bold text-[#1A1D29] mt-0.5">
                {STEPS[currentStep - 1].title}
              </h2>
            </div>
            <span className="text-xs text-[#5B5F73] bg-[#F7F8FB] px-3 py-1.5 rounded-full border border-[#E4E6EE]">
              Tutor Registration
            </span>
          </div>

          <form className="p-6 sm:p-8 lg:p-10" onSubmit={handleSubmit}>
            {/* Step 1: Personal & Address */}
            {currentStep === 1 && (
              <PersonalInfoForm
                personalInfo={personalInfo}
                handlePersonalInfoChange={handlePersonalInfoChange}
                addressInfo={addressInfo}
                handleAddressChange={handleAddressChange}
                fieldErrors={fieldErrors}
                fieldRefs={fieldRefs}
                divisions={divisions}
                districts={districts}
                thanas={thanas}
                areas={areas}
              />
            )}

            {/* Step 2: Educational & Professional */}
            {currentStep === 2 && (
              <ProfessionalInfoForm
                educationSections={educationSections}
                updateEducationSection={updateEducationSection}
                fieldErrors={fieldErrors}
                specialSkills={specialSkills}
                skillInput={skillInput}
                setSkillInput={setSkillInput}
                handleAddSkill={handleAddSkill}
                removeSkill={removeSkill}
                specialSkillOptions={specialSkillOptions}
                otherData={otherData}
                handleOtherDataChange={handleOtherDataChange}
                fieldRefs={fieldRefs}
                subjectInput={subjectInput}
                setSubjectInput={setSubjectInput}
                handleAddSubject={handleAddSubject}
                removeSubject={removeSubject}
                suitableThana={suitableThana}
                setSuitableThana={setSuitableThana}
                thanas={thanas}
                suitableArea={suitableArea}
                addSuitableArea={addSuitableArea}
                removeSuitableArea={removeSuitableArea}
                suitableAreaOptions={suitableAreaOptions}
              />
            )}

            {/* Step 3: Document Uploads */}
            {currentStep === 3 && (
              <DocumentUploadSection
                fileData={fileData}
                handleFileChange={handleFileChange}
                imagePreview={imagePreview}
                setImagePreview={setImagePreview}
                isCompressing={isCompressing}
                fieldErrors={fieldErrors}
                handleFileUpload={handleFileUpload}
                removeImage={removeImage}
              />
            )}

            {/* Step 4: Review & Terms */}
            {currentStep === 4 && (
              <div className="space-y-6">
                <div className="p-4 rounded-xl bg-[#EEEDFD]/50 border border-[#DDD9FC] flex items-start gap-3">
                  <Sparkles className="w-5 h-5 text-[#3730E0] mt-0.5 shrink-0" />
                  <div className="text-xs sm:text-sm text-[#1A1D29] leading-relaxed">
                    Please review your registration details carefully before submitting. All information will be verified against your uploaded documents.
                  </div>
                </div>

                {/* Review Cards Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Personal Summary */}
                  <div className="bg-[#F7F8FB] border border-[#E4E6EE] rounded-xl p-4 space-y-2">
                    <div className="flex items-center justify-between pb-2 border-b border-[#E4E6EE]">
                      <h4 className="text-xs font-bold uppercase text-[#3730E0]">Personal Info</h4>
                      <button
                        type="button"
                        onClick={() => setCurrentStep(1)}
                        className="text-[11px] font-semibold text-[#3730E0] hover:underline"
                      >
                        Edit
                      </button>
                    </div>
                    <p className="text-sm font-bold text-[#1A1D29]">{personalInfo.name}</p>
                    <p className="text-xs text-[#5B5F73]">{personalInfo.phone} • {personalInfo.email}</p>
                    <p className="text-xs text-[#5B5F73]">
                      {addressInfo.area}, {addressInfo.thanas}, {addressInfo.district}
                    </p>
                  </div>

                  {/* Academic Summary */}
                  <div className="bg-[#F7F8FB] border border-[#E4E6EE] rounded-xl p-4 space-y-2">
                    <div className="flex items-center justify-between pb-2 border-b border-[#E4E6EE]">
                      <h4 className="text-xs font-bold uppercase text-[#3730E0]">Academic & Skills</h4>
                      <button
                        type="button"
                        onClick={() => setCurrentStep(2)}
                        className="text-[11px] font-semibold text-[#3730E0] hover:underline"
                      >
                        Edit
                      </button>
                    </div>
                    <p className="text-xs text-[#1A1D29] font-medium">
                      SSC: {educationSections[0]?.institution || "Provided"} ({educationSections[0]?.passingYear || ""})
                    </p>
                    <p className="text-xs text-[#1A1D29] font-medium">
                      HSC: {educationSections[1]?.institution || "Provided"} ({educationSections[1]?.passingYear || ""})
                    </p>
                    <div className="flex flex-wrap gap-1 pt-1">
                      {otherData.preferredSubjects.slice(0, 4).map((sub, i) => (
                        <span key={i} className="px-2 py-0.5 rounded text-[11px] bg-white border border-[#E4E6EE] text-[#1A1D29]">
                          {sub}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Documents Status */}
                <div className="bg-[#F7F8FB] border border-[#E4E6EE] rounded-xl p-4">
                  <div className="flex items-center justify-between pb-2 border-b border-[#E4E6EE] mb-3">
                    <h4 className="text-xs font-bold uppercase text-[#3730E0]">Attached Documents</h4>
                    <button
                      type="button"
                      onClick={() => setCurrentStep(3)}
                      className="text-[11px] font-semibold text-[#3730E0] hover:underline"
                    >
                      Edit
                    </button>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    <div className="flex items-center gap-2 text-xs">
                      <CheckCircle2 className={`w-4 h-4 ${fileData.profileImage ? "text-[#16A34A]" : "text-[#5B5F73]"}`} />
                      <span>Profile Photo: {fileData.profileImage ? "Attached" : "Optional"}</span>
                    </div>
                    <div className="flex items-center gap-2 text-xs">
                      <CheckCircle2 className={`w-4 h-4 ${fileData.educationDocument ? "text-[#16A34A]" : "text-[#DC2626]"}`} />
                      <span>Academic Doc: {fileData.educationDocument ? "Attached" : "Missing"}</span>
                    </div>
                    <div className="flex items-center gap-2 text-xs">
                      <CheckCircle2 className="w-4 h-4 text-[#16A34A]" />
                      <span>Identity ({fileData.documentType.toUpperCase()}): Attached</span>
                    </div>
                  </div>
                </div>

                {/* Terms Agreement Checkbox */}
                <div className="pt-2">
                  <div className="flex items-start">
                    <input
                      type="checkbox"
                      id="agreeTermsApplyCheckbox"
                      checked={otherData.agreeTerms}
                      onChange={() => setIsModalOpen(true)}
                      className="mt-0.5 w-4 h-4 text-[#3730E0] border-[#E4E6EE] rounded focus:ring-[#3730E0]"
                    />
                    <label
                      htmlFor="agreeTermsApplyCheckbox"
                      className="ml-2.5 text-xs sm:text-sm text-[#5B5F73] cursor-pointer"
                    >
                      I confirm that all provided details and documents are authentic, and I agree to the{" "}
                      <button
                        type="button"
                        onClick={() => setIsModalOpen(true)}
                        className="text-[#3730E0] underline font-medium hover:text-[#2D24C4]"
                      >
                        Terms & Conditions
                      </button>{" "}
                      and{" "}
                      <a
                        href="/privacy-policy"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[#3730E0] underline font-medium hover:text-[#2D24C4]"
                      >
                        Privacy Policy
                      </a>
                      .
                    </label>
                  </div>
                  {fieldErrors.agreeTerms && (
                    <p className="text-xs text-[#DC2626] mt-2">
                      {fieldErrors.agreeTerms}
                    </p>
                  )}
                </div>
              </div>
            )}

            {/* Stepper Navigation Buttons */}
            <div className="pt-8 border-t border-[#E4E6EE] mt-8 flex items-center justify-between">
              {currentStep > 1 ? (
                <Button
                  type="button"
                  variant="secondary"
                  size="md"
                  onClick={handlePrevStep}
                  iconLeft={ArrowLeft}
                  disabled={loading}
                >
                  Previous Step
                </Button>
              ) : (
                <div />
              )}

              {currentStep < 4 ? (
                <Button
                  type="button"
                  variant="primary"
                  size="md"
                  onClick={handleNextStep}
                  iconRight={ArrowRight}
                >
                  Continue to Step 0{currentStep + 1}
                </Button>
              ) : (
                <Button
                  type="submit"
                  variant="primary"
                  size="lg"
                  disabled={!otherData.agreeTerms || loading}
                  isLoading={loading}
                  className="px-8 font-semibold"
                >
                  {loading ? "Submitting Application..." : "Submit Application"}
                </Button>
              )}
            </div>
          </form>
        </div>

        <TermsModal
          isOpen={isModalOpen}
          onClose={handleCancelTerms}
          onAccept={handleAcceptTerms}
        />
      </div>
    </div>
  );
};

export default ApplyTutor;
