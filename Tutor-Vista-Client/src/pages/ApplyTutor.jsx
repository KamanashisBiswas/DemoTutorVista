import React, { useState, useEffect, useMemo, useRef } from "react";
import axios from "../lib/axios";
import { toast } from "react-toastify";
import locationData from "../assets/data/address.json";
import TermsModal from "../components/TermsModal";
import Button from "../components/Common/Button";
import imageCompression from "browser-image-compression";

import ApplicationHeader from "../components/ApplyTutor/ApplicationHeader";
import PersonalInfoForm, {
  MemoizedInput,
  SelectField,
} from "../components/ApplyTutor/PersonalInfoForm";
import ProfessionalInfoForm from "../components/ApplyTutor/ProfessionalInfoForm";
import DocumentUploadSection from "../components/ApplyTutor/DocumentUploadSection";

const ApplyTutor = () => {
  const SESSION_STORAGE_KEY = "tutorApplicationFormData";

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

    // GTM: Push apply_tutor event on page visit
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

  const validateForm = () => {
    const errors = {};
    if (!personalInfo.name || personalInfo.name.trim().length < 2)
      errors.name = "Please enter your name (2-100 characters).";
    if (!personalInfo.phone || !/^01[3-9]\d{8}$/.test(personalInfo.phone))
      errors.phone =
        "Enter a valid Bangladeshi phone number (e.g. 01XXXXXXXXX).";
    if (
      !personalInfo.email ||
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(personalInfo.email)
    )
      errors.email = "Enter a valid email address.";
    if (!addressInfo.division) errors.division = "Please select your division.";
    if (!addressInfo.district) errors.district = "Please enter your district.";
    if (!addressInfo.thanas) errors.thanas = "Please enter your thanas/thana.";
    if (!addressInfo.area) errors.area = "Please enter your area.";
    educationSections.forEach((section, index) => {
      const sectionKey = `education_${section.id}`;
      if (index < 2) {
        if (!section.institution)
          errors[`${sectionKey}_institution`] = `Institution name is required`;
        if (!section.medium)
          errors[`${sectionKey}_medium`] = `Medium is required`;
        if (section.medium === "English Medium" && !section.curriculum)
          errors[
            `${sectionKey}_curriculum`
          ] = `Curriculum is required for English Medium`;
        if (!section.board) errors[`${sectionKey}_board`] = `Board is required`;
        if (!section.groupSubject)
          errors[`${sectionKey}_groupSubject`] = `Group/Subject is required`;
        if (!section.passingYear)
          errors[`${sectionKey}_passingYear`] = `Passing year is required`;
      }
    });
    if (!fileData.educationDocument)
      errors.educationDocument = "Please upload your education document.";
    if (fileData.documentType === "nid") {
      if (!fileData.nidFront)
        errors.nidFront = "Please upload your NID front image.";
      if (!fileData.nidBack)
        errors.nidBack = "Please upload your NID back image.";
    } else if (fileData.documentType === "birth_certificate") {
      if (!fileData.birthCertificate)
        errors.birthCertificate = "Please upload your birth certificate image.";
    }
    if (!otherData.experience || otherData.experience.trim().length < 50)
      errors.experience =
        "Please describe your teaching experience (50-2000 characters).";
    if (otherData.preferredSubjects.length === 0)
      errors.preferredSubjects = "Please add at least one preferred subject.";
    if (suitableThana.length === 0)
      errors.suitableThana =
        "Please select at least one suitable thanas/thana.";
    if (suitableArea.length === 0)
      errors.suitableArea = "Please add at least one suitable area.";
    if (!otherData.agreeTerms)
      errors.agreeTerms =
        "You must agree to the terms and conditions to apply.";
    return errors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length > 0) {
      setFieldErrors(validationErrors);
      const firstErrorField = Object.keys(validationErrors)[0];
      toast.error(validationErrors[firstErrorField]);
      if (fieldRefs[firstErrorField] && fieldRefs[firstErrorField].current) {
        fieldRefs[firstErrorField].current.focus();
        fieldRefs[firstErrorField].current.scrollIntoView({
          behavior: "smooth",
          block: "center",
        });
      }
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
      const response = await axios.post("/api/tutor/apply", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      if (response.data.success) {
        toast.success("Application submitted successfully!");
        sessionStorage.removeItem(SESSION_STORAGE_KEY);

        // GTM: Push tutor_application_Submit event on successful submission
        window.dataLayer = window.dataLayer || [];
        window.dataLayer.push({
          event: "tutor_application_Submit",
          transaction_id:
            response.data.applicationId || `TUTOR_APP_${Date.now()}`,
        });

        // Reset form state...
        setPersonalInfo({ name: "", phone: "", email: "", gender: "Male" });
        setAddressInfo({ division: "", district: "", thanas: "", area: "" });
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
          agreeTerms: false,
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
        setSpecialSkills([]);
        setSkillInput({ type: "", value: "" });
        setSuitableThana([]);
        setSuitableArea([]);
        setImagePreview({
          profileImage: null,
          educationDocument: null,
          nidFront: null,
          nidBack: null,
          birthCertificate: null,
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
      return toast.error(
        "File size is too large. Please select an image under 15MB."
      );
    setIsCompressing((prev) => ({ ...prev, [field]: true }));
    const options = {
      maxSizeMB: 0.5,
      maxWidthOrHeight: 1280,
      useWebWorker: true,
      fileType: "image/jpeg",
    };
    try {
      const compressionToast = toast.info("Compressing image...", {
        autoClose: false,
      });
      const compressedFile = await imageCompression(file, options);
      toast.dismiss(compressionToast);
      toast.success("Image compressed successfully!");
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

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 py-6 sm:py-12 font-dmsans">
      <div className="w-full mx-auto px-4 sm:px-6 lg:px-20 xl:px-40 2xl:px-80">
        <ApplicationHeader showVideo={showVideo} setShowVideo={setShowVideo} />

        <div className="bg-[#8CB2FF] rounded-2xl shadow-xl overflow-hidden animate-fade-in-up">
          <form className="p-6 sm:p-8 lg:p-12" onSubmit={handleSubmit}>
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
            <div className="space-y-6">
              <div className="flex items-start">
                <input
                  type="checkbox"
                  checked={otherData.agreeTerms}
                  onChange={() => setIsModalOpen(true)}
                  className="mt-1 w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                />
                <label className="ml-3 text-sm font-medium">
                  Tap Submit to agree with our terms and privacy rules.
                </label>
              </div>
              {fieldErrors.agreeTerms && (
                <p className="text-sm text-red-600">{fieldErrors.agreeTerms}</p>
              )}
              <div className="text-center">
                <Button
                  type="submit"
                  disabled={!otherData.agreeTerms || loading}
                >
                  {loading ? "Submitting..." : "Submit"}
                </Button>
              </div>
            </div>
          </form>
        </div>
        <TermsModal
          isOpen={isModalOpen}
          onClose={handleCancelTerms}
          onAccept={handleAcceptTerms}
        />
      </div>
      <style>{`
        @keyframes fade-in-down { from { opacity: 0; transform: translateY(-20px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes fade-in-up { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes fade-in { from { opacity: 0; } to { opacity: 1; } }
        .animate-fade-in-down { animation: fade-in-down 0.6s ease-out; }
        .animate-fade-in-up { animation: fade-in-up 0.8s ease-out; }
        .animate-fade-in { animation: fade-in 0.3s ease-in; }
      `}</style>
    </div>
  );
};

export default ApplyTutor;
