import React, { useState, useEffect, useMemo, useRef, memo } from "react";
import { X } from "lucide-react";
import axios from "../lib/axios";
import { toast } from "react-toastify";
import { useAuth } from "../context/AuthContext";
import locationData from "../assets/data/address.json";
import imageCompression from "browser-image-compression";

import EditTutorPersonalInfoSection from "./EditTutorPersonalInfoSection";
import EditTutorProfessionalInfoSection from "./EditTutorProfessionalInfoSection";
import EditTutorEducationInfoSection from "./EditTutorEducationInfoSection";
import EditTutorDocumentUploadSection from "./EditTutorDocumentUploadSection";

const EditTutorModal = ({ isOpen, tutor, onClose, onSuccess }) => {
  const { user } = useAuth();
  const [isHired, setIsHired] = useState(false);

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
    agreeTerms: true,
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

  // const [specialSkills, setSpecialSkills] = useState([]);
  const [currentSkill, setCurrentSkill] = useState({ type: "", value: "" });
  const [fieldErrors, setFieldErrors] = useState({});

  const [imagePreview, setImagePreview] = useState({
    profileImage: null,
    educationDocument: null,
    nidFront: null,
    nidBack: null,
    birthCertificate: null,
  });

  const [existingImages, setExistingImages] = useState({
    profileImage: null,
    educationDocument: null,
    nidFront: null,
    nidBack: null,
    birthCertificate: null,
  });

  const [loading, setLoading] = useState(false);
  const [isCompressing, setIsCompressing] = useState({
    profileImage: false,
    educationDocument: false,
    nidFront: false,
    nidBack: false,
    birthCertificate: false,
  });
  const [score, setScore] = useState("");
  const initialStateRef = useRef(null);

  // Location data mapping (EditTutorRequestModal style)
  const divisions = useMemo(
    () => locationData.divisions.map((d) => d.division.name_en),
    [],
  );

  const districts = useMemo(() => {
    if (!addressInfo.division) return [];
    const selected = locationData.divisions.find(
      (d) => d.division.name_en === addressInfo.division,
    );
    return selected ? selected.districts.map((dist) => dist.name_en) : [];
  }, [addressInfo.division]);

  const thanas = useMemo(() => {
    if (!addressInfo.district) return [];
    const selectedDiv = locationData.divisions.find(
      (d) => d.division.name_en === addressInfo.division,
    );
    const selectedDist = selectedDiv?.districts.find(
      (d) => d.name_en === addressInfo.district,
    );
    return selectedDist ? selectedDist.thanas.map((u) => u.name_en) : [];
  }, [addressInfo.division, addressInfo.district]);

  const areas = useMemo(() => {
    if (!addressInfo.thana) return [];
    const selectedDiv = locationData.divisions.find(
      (d) => d.division.name_en === addressInfo.division,
    );
    const selectedDist = selectedDiv?.districts.find(
      (d) => d.name_en === addressInfo.district,
    );
    const selectedThana = selectedDist?.thanas.find(
      (u) => u.name_en === addressInfo.thana,
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
      (d) => d.division.name_en === addressInfo.division,
    );
    if (!selectedDivision) return [];

    const selectedDistrict = selectedDivision.districts.find(
      (dist) => dist.name_en === addressInfo.district,
    );
    if (!selectedDistrict) return [];

    const allAreas = suitableThana.flatMap((selectedThanaName) => {
      const thanaData = selectedDistrict.thanas.find(
        (t) => t.name_en === selectedThanaName,
      );
      return thanaData ? thanaData.areas.map((area) => area.name_en) : [];
    });

    return [...new Set(allAreas)].sort();
  }, [addressInfo.division, addressInfo.district, suitableThana]);

  useEffect(() => {
    if (isOpen && tutor) {
      setIsHired(!!tutor.isHired);
      const initialPersonalInfo = {
        name: tutor.name || "",
        phone: tutor.phone || "",
        email: tutor.email || "",
        gender: tutor.gender || "Male",
      };
      const initialAddressInfo = {
        division: tutor.division || "",
        district: tutor.district || "",
        thana: tutor.thana || "",
        area: tutor.area || "",
      };
      const initialOtherData = {
        preferredSubjects: tutor.preferredSubjects || [],
        experience: tutor.experience || "",
        agreeTerms: true,
      };
      const initialEducationSections =
        tutor.educationSections && tutor.educationSections.length > 0
          ? tutor.educationSections.map((edu, index) => ({
              id: index + 1,
              ...edu,
            }))
          : [
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
            ];
      let initialCurrentSkill = { type: "", value: "" };
      if (
        tutor.specialSkills &&
        typeof tutor.specialSkills === "object" &&
        tutor.specialSkills.type
      ) {
        initialCurrentSkill = {
          type: tutor.specialSkills.type || "",
          value: tutor.specialSkills.value || "",
        };
      }
      const initialExistingImages = {
        profileImage: tutor.profileImage || null,
        educationDocument: tutor.educationDocument || null,
        nidFront: tutor.nidFrontImage || null,
        nidBack: tutor.nidBackImage || null,
        birthCertificate: tutor.birthCertificateImage || null,
      };
      const initialDocumentType = tutor.documentType || "nid";
      setPersonalInfo(initialPersonalInfo);
      setAddressInfo(initialAddressInfo);
      setOtherData(initialOtherData);
      setEducationSections(initialEducationSections);
      setExistingImages(initialExistingImages);
      setCurrentSkill(initialCurrentSkill);
      setFileData({
        profileImage: null,
        educationDocument: null,
        documentType: initialDocumentType,
        nidFront: null,
        nidBack: null,
        birthCertificate: null,
      });
      setImagePreview({
        profileImage: null,
        educationDocument: null,
        nidFront: null,
        nidBack: null,
        birthCertificate: null,
      });
      setScore(tutor.score ?? "");

      initialStateRef.current = {
        personalInfo: initialPersonalInfo,
        addressInfo: initialAddressInfo,
        otherData: initialOtherData,
        educationSections: initialEducationSections,
        currentSkill: initialCurrentSkill,
        existingImages: initialExistingImages,
        documentType: initialDocumentType,
        score: tutor.score ?? "",
      };
      setSuitableThana(tutor.suitableThana || []);
      setSuitableArea(tutor.suitableArea || []);
    }
  }, [isOpen, tutor]);

  const handlePersonalInfoChange = (field, value) => {
    setPersonalInfo((prev) => ({ ...prev, [field]: value }));
  };

  // Fixed handleAddressChange to match EditTutorRequestModal pattern exactly
  const handleAddressChange = (field, value) => {
    const newAddressInfo = { ...addressInfo, [field]: value };
    if (field === "division") {
      newAddressInfo.district = "";
      newAddressInfo.thana = "";
      newAddressInfo.area = "";
    } else if (field === "district") {
      newAddressInfo.thana = "";
      newAddressInfo.area = "";
    } else if (field === "thana") {
      newAddressInfo.area = "";
    }
    setAddressInfo(newAddressInfo);
  };

  const handleFileChange = (field, value) => {
    setFileData((prev) => ({ ...prev, [field]: value }));
  };
  const handleOtherDataChange = (field, value) => {
    setOtherData((prev) => ({ ...prev, [field]: value }));
  };
  const addEducationSection = () => {
    if (educationSections.length < 4) {
      setEducationSections((prev) => [
        ...prev,
        {
          id: Date.now(),
          institution: "",
          examination: "",
          medium: "",
          level: "",
          board: "",
          groupSubject: "",
          gpa: "",
          passingYear: "",
        },
      ]);
    }
  };
  const removeEducationSection = (id) => {
    // Find the index of the section to be removed
    const sectionIndex = educationSections.findIndex(
      (section) => section.id === id,
    );

    // Prevent removal of SSC (index 0) and HSC (index 1) sections
    if (sectionIndex < 2) {
      toast.error(
        "SSC and HSC sections cannot be removed as they are required.",
      );
      return;
    }

    if (educationSections.length > 1) {
      setEducationSections((prev) =>
        prev.filter((section) => section.id !== id),
      );
    }
  };
  const updateEducationSection = (id, field, value) => {
    setEducationSections((prev) =>
      prev.map((section) =>
        section.id === id ? { ...section, [field]: value } : section,
      ),
    );
  };
  const removeSubject = (subject) => {
    setOtherData((prev) => ({
      ...prev,
      preferredSubjects: prev.preferredSubjects.filter((s) => s !== subject),
    }));
  };
  const addSubject = (subject) => {
    if (subject && !otherData.preferredSubjects.includes(subject)) {
      setOtherData((prev) => ({
        ...prev,
        preferredSubjects: [...prev.preferredSubjects, subject],
      }));
    }
  };

  const validateForm = () => {
    const errors = {};
    if (!personalInfo.name?.trim()) errors.name = "Name is required";
    if (!personalInfo.phone?.trim()) errors.phone = "Phone is required";
    if (!personalInfo.email?.trim()) errors.email = "Email is required";
    if (!addressInfo.division) errors.division = "Division is required";
    if (!addressInfo.district) errors.district = "District is required";
    if (!addressInfo.thana) errors.thana = "Thana is required";
    if (!addressInfo.area) errors.area = "Area is required";

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
          if (!section.medium) {
            errors[`${sectionKey}_medium`] = `Medium is required`;
          }
          if (section.medium === "English Medium" && !section.curriculum) {
            errors[`${sectionKey}_curriculum`] =
              `Curriculum is required for English Medium`;
          }
          if (!section.board || section.board.trim() === "") {
            errors[`${sectionKey}_board`] = `Board is required`;
          }
          if (!section.groupSubject || section.groupSubject.trim() === "") {
            errors[`${sectionKey}_groupSubject`] = `Group/Subject is required`;
          }
          if (section.gpa && section.gpa.trim().length > 20) {
            errors[`${sectionKey}_gpa`] =
              `GPA/Grade cannot be more than 20 characters.`;
          }
          if (!section.passingYear) {
            errors[`${sectionKey}_passingYear`] = `Passing year is required`;
          }
        }
      } else {
        if (section.cgpa && section.cgpa.trim().length > 20) {
          errors[`${sectionKey}_cgpa`] = `CGPA cannot exceed 20 characters.`;
        }
      }
    });

    if (!otherData.experience?.trim()) {
      errors.experience = "Teaching experience is required";
    } else if (otherData.experience.length < 50) {
      errors.experience = "Experience must be at least 50 characters";
    }
    if (
      !otherData.preferredSubjects ||
      otherData.preferredSubjects.length === 0
    ) {
      errors.preferredSubjects = "At least one preferred subject is required";
    }
    // Score validation (1-500 range)
    if (user?.role === "admin") {
      if (score !== "") {
        const num = Number(score);
        if (isNaN(num) || num < 1 || num > 500) {
          errors.score = "Score must be a number between 1 and 500.";
        }
      }
    }
    return errors;
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

  const isEdited = () => {
    if (!initialStateRef.current) return false;
    const initial = initialStateRef.current;
    if (
      user?.role === "admin" &&
      String(score ?? "") !== String(initial.score ?? "")
    )
      return true;
    if (JSON.stringify(personalInfo) !== JSON.stringify(initial.personalInfo))
      return true;
    if (JSON.stringify(addressInfo) !== JSON.stringify(initial.addressInfo))
      return true;
    if (JSON.stringify(otherData) !== JSON.stringify(initial.otherData))
      return true;
    if (
      JSON.stringify(educationSections) !==
      JSON.stringify(initial.educationSections)
    )
      return true;
    if (JSON.stringify(currentSkill) !== JSON.stringify(initial.currentSkill))
      return true;
    // Detect new uploads
    if (
      fileData.profileImage ||
      fileData.educationDocument ||
      fileData.nidFront ||
      fileData.nidBack ||
      fileData.birthCertificate
    )
      return true;
    // Detect image removal (profile image existed before, now removed)
    if (
      tutor.profileImage &&
      !existingImages.profileImage &&
      !fileData.profileImage
    )
      return true;
    if (fileData.documentType !== initial.documentType) return true;
    if (
      JSON.stringify(suitableThana) !==
      JSON.stringify(tutor?.suitableThana || [])
    )
      return true;
    if (
      JSON.stringify(suitableArea) !== JSON.stringify(tutor?.suitableArea || [])
    )
      return true;
    if (isHired !== !!tutor.isHired) return true;

    return false;
  };

  const handleFileUpload = async (field, file) => {
    if (!file || !file.type.startsWith("image/")) {
      toast.error("Only image files are allowed");
      return;
    }
    if (file.size > 10 * 1024 * 1024) {
      toast.error("File size must be less than 10MB");
      return;
    }
    setIsCompressing((prev) => ({ ...prev, [field]: true }));
    const options = {
      maxSizeMB: 1,
      maxWidthOrHeight: 1920,
      useWebWorker: true,
    };
    try {
      const compressedFile = await imageCompression(file, options);
      handleFileChange(field, compressedFile);
      const reader = new FileReader();
      reader.onload = (e) => {
        setImagePreview((prev) => ({ ...prev, [field]: e.target.result }));
      };
      reader.readAsDataURL(compressedFile);
    } catch (error) {
      console.error("Image compression error:", error);
      toast.error("Could not compress image, please try another file.");
      handleFileChange(field, file);
      const reader = new FileReader();
      reader.onload = (e) => {
        setImagePreview((prev) => ({ ...prev, [field]: e.target.result }));
      };
      reader.readAsDataURL(file);
    } finally {
      setIsCompressing((prev) => ({ ...prev, [field]: false }));
    }
  };

  const removeImage = (field) => {
    handleFileChange(field, null);
    setImagePreview((prev) => ({ ...prev, [field]: null }));
    setExistingImages((prev) => ({ ...prev, [field]: null }));
  };

  const resetForm = () => {
    if (!tutor || !initialStateRef.current) return;
    setPersonalInfo(initialStateRef.current.personalInfo);
    setAddressInfo(initialStateRef.current.addressInfo);
    setOtherData(initialStateRef.current.otherData);
    setEducationSections(initialStateRef.current.educationSections);
    setExistingImages(initialStateRef.current.existingImages);
    setFileData({
      profileImage: null,
      educationDocument: null,
      documentType: initialStateRef.current.documentType,
      nidFront: null,
      nidBack: null,
      birthCertificate: null,
    });
    setImagePreview({
      profileImage: null,
      educationDocument: null,
      nidFront: null,
      nidBack: null,
      birthCertificate: null,
    });
    setSuitableThana(tutor?.suitableThana || []);
    setSuitableArea(tutor?.suitableArea || []);
  };

  const ImageUploadField = ({
    field,
    label,
    icon: Icon,
    description,
    required = true,
  }) => {
    const currentFile = fileData[field];
    const preview = imagePreview[field];
    const existing = existingImages[field];
    const compressing = isCompressing[field];
    return (
      <div>
        <div className="flex items-center space-x-2 mb-2">
          {Icon && <Icon className="w-4 h-4 text-gray-600" />}
          <label className="block text-sm font-medium text-gray-700">
            {label} {required && <span className="text-red-500">*</span>}
          </label>
        </div>
        {description && (
          <p className="text-xs text-gray-500 mb-3">{description}</p>
        )}
        {compressing ? (
          <div className="border-2 border-dashed border-blue-200 rounded-xl p-8 text-center bg-blue-50/50 flex items-center justify-center aspect-video">
            <div className="flex flex-col items-center space-y-3">
              <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-blue-600"></div>
              <p className="text-md font-semibold text-gray-700">
                Compressing Image...
              </p>
              <p className="text-xs text-gray-500">
                Please wait, this may take a moment.
              </p>
            </div>
          </div>
        ) : (preview && currentFile) || existing ? (
          <div className="relative group border-2 border-blue-200 rounded-xl overflow-hidden bg-white shadow-lg hover:shadow-xl transition-all duration-300">
            <div className="aspect-video w-full bg-gradient-to-br from-blue-50 to-indigo-50 flex items-center justify-center relative overflow-hidden">
              <img
                src={preview || existing?.url}
                alt="Preview"
                className="max-w-full max-h-full object-contain rounded-lg shadow-sm"
              />
              <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 transition-all duration-300 flex items-center justify-center">
                <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex space-x-3">
                  <button
                    type="button"
                    onClick={() => removeImage(field)}
                    className="bg-red-500 bg-opacity-90 hover:bg-opacity-100 text-white p-3 rounded-full shadow-lg transform hover:scale-110 transition-all duration-200"
                  >
                    <Trash2 className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </div>
            <div className="p-4 bg-gradient-to-r from-blue-50 via-indigo-50 to-purple-50 border-t border-blue-100">
              <p className="text-sm font-semibold text-gray-800 truncate mb-1">
                {currentFile?.name ||
                  existing?.originalName ||
                  "Uploaded Image"}
              </p>
              <p className="text-xs text-gray-500">
                {currentFile
                  ? (currentFile.size / 1024 / 1024).toFixed(2) + " MB • Image"
                  : existing
                    ? "Previously Uploaded"
                    : ""}
              </p>
            </div>
            <button
              type="button"
              onClick={() => document.getElementById(field + "-edit").click()}
              className="absolute top-3 right-3 bg-blue-500 hover:bg-blue-600 text-white p-2 rounded-full shadow-lg transform hover:scale-110 transition-all duration-200 opacity-0 group-hover:opacity-100"
            >
              <Upload className="w-4 h-4" />
            </button>
          </div>
        ) : (
          <div className="border-2 border-dashed border-blue-200 rounded-xl p-8 text-center hover:border-blue-300 transition-all duration-300 bg-gradient-to-br from-blue-50/30 via-indigo-50/30 to-purple-50/30 hover:from-blue-50/50 hover:via-indigo-50/50 hover:to-purple-50/50 group">
            <div className="space-y-4">
              <div>
                <p className="text-lg font-semibold text-gray-700 mb-2">
                  Drop your image here
                </p>
                <p className="text-sm text-gray-500 mb-1">
                  PNG, JPG, JPEG, GIF up to 5MB
                </p>
                <p className="text-xs text-gray-400">
                  Click to browse or drag and drop
                </p>
              </div>
              <button
                type="button"
                onClick={() => document.getElementById(field + "-edit").click()}
                className="bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500 hover:from-blue-600 hover:via-indigo-600 hover:to-purple-600 text-white px-8 py-3 rounded-xl text-sm font-semibold transition-all duration-300 transform hover:scale-105 hover:shadow-lg"
              >
                Upload Image
              </button>
            </div>
          </div>
        )}
        <input
          id={field + "-edit"}
          type="file"
          accept="image/*"
          className="hidden"
          onChange={(e) => handleFileUpload(field, e.target.files[0])}
        />
      </div>
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errors = validateForm();
    setFieldErrors(errors);

    if (Object.keys(errors).length > 0) {
      const firstErrorField = Object.keys(errors)[0];
      toast.error(errors[firstErrorField] || "Please fill all required fields");
      return;
    }

    if (!isEdited()) {
      return toast.info("No changes detected to submit.");
    }

    setLoading(true);
    const formData = new FormData();

    // Helper to append if changed
    const appendIfChanged = (key, currentValue, initialValue) => {
      if (JSON.stringify(currentValue) !== JSON.stringify(initialValue)) {
        formData.append(key, currentValue);
      }
    };

    const initial = initialStateRef.current;

    // Personal Info
    appendIfChanged("name", personalInfo.name, initial.personalInfo.name);
    appendIfChanged("phone", personalInfo.phone, initial.personalInfo.phone);
    appendIfChanged("email", personalInfo.email, initial.personalInfo.email);
    appendIfChanged("gender", personalInfo.gender, initial.personalInfo.gender);

    // Address Info
    appendIfChanged(
      "division",
      addressInfo.division,
      initial.addressInfo.division,
    );
    appendIfChanged(
      "district",
      addressInfo.district,
      initial.addressInfo.district,
    );
    appendIfChanged("thana", addressInfo.thana, initial.addressInfo.thana);
    appendIfChanged("area", addressInfo.area, initial.addressInfo.area);

    // Other Data
    appendIfChanged(
      "experience",
      otherData.experience,
      initial.otherData.experience,
    );
    if (
      JSON.stringify(otherData.preferredSubjects) !==
      JSON.stringify(initial.otherData.preferredSubjects)
    ) {
      formData.append(
        "preferredSubjects",
        JSON.stringify(otherData.preferredSubjects),
      );
    }

    // Education
    if (
      JSON.stringify(educationSections) !==
      JSON.stringify(initial.educationSections)
    ) {
      formData.append("educationSections", JSON.stringify(educationSections));
    }

    // Skills
    if (JSON.stringify(currentSkill) !== JSON.stringify(initial.currentSkill)) {
      formData.append("specialSkills", JSON.stringify(currentSkill));
    }

    // Admin-only fields
    if (user?.role === "admin") {
      if (String(score ?? "") !== String(initial.score ?? "")) {
        formData.append("score", score);
      }
      if (isHired !== !!tutor.isHired) {
        formData.append("isHired", isHired);
      }
      if (
        JSON.stringify(suitableThana) !==
        JSON.stringify(tutor?.suitableThana || [])
      ) {
        formData.append("suitableThana", JSON.stringify(suitableThana));
      }
      if (
        JSON.stringify(suitableArea) !==
        JSON.stringify(tutor?.suitableArea || [])
      ) {
        formData.append("suitableArea", JSON.stringify(suitableArea));
      }
    }

    // File Data
    if (fileData.profileImage)
      formData.append("profileImage", fileData.profileImage);
    if (fileData.educationDocument)
      formData.append("educationDocument", fileData.educationDocument);
    if (fileData.nidFront) formData.append("nidFront", fileData.nidFront);
    if (fileData.nidBack) formData.append("nidBack", fileData.nidBack);
    if (fileData.birthCertificate)
      formData.append("birthCertificate", fileData.birthCertificate);

    // Handle image removal
    if (
      initial.existingImages.profileImage &&
      !existingImages.profileImage &&
      !fileData.profileImage
    ) {
      formData.append("removeProfileImage", true);
    }

    if (fileData.documentType !== initial.documentType) {
      formData.append("documentType", fileData.documentType);
    }

    try {
      const res = await axios.put(`/api/tutor/${tutor._id}/edit`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      toast.success(res.data.message || "Tutor updated successfully!");
      onSuccess();
      onClose();
    } catch (error) {
      console.error("Update error:", error);
      toast.error(error.response?.data?.message || "Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl shadow-xl w-full max-w-4xl max-h-[90vh] overflow-hidden flex flex-col">
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-800">Edit Tutor</h3>
          <button
            onClick={() => {
              if (isEdited()) {
                if (
                  window.confirm(
                    "You have unsaved changes. Are you sure you want to close?",
                  )
                ) {
                  onClose();
                }
              } else {
                onClose();
              }
            }}
            className="text-gray-400 hover:text-gray-600 p-1 rounded"
          >
            <X className="w-6 h-6" />
          </button>
        </div>
        <div className="p-6 overflow-y-auto max-h-[calc(90vh-160px)]">
          <form onSubmit={handleSubmit} className="space-y-8">
            <EditTutorPersonalInfoSection
              user={user}
              personalInfo={personalInfo}
              handlePersonalInfoChange={handlePersonalInfoChange}
              score={score}
              setScore={setScore}
              isHired={isHired}
              setIsHired={setIsHired}
              fieldErrors={fieldErrors}
            />

            <EditTutorProfessionalInfoSection
              user={user}
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
              currentSkill={currentSkill}
              setCurrentSkill={setCurrentSkill}
              specialSkillOptions={specialSkillOptions}
              suitableThana={suitableThana}
              setSuitableThana={setSuitableThana}
              suitableArea={suitableArea}
              setSuitableArea={setSuitableArea}
              suitableAreaOptions={suitableAreaOptions}
              fieldErrors={fieldErrors}
            />

            <EditTutorEducationInfoSection
              educationSections={educationSections}
              addEducationSection={addEducationSection}
              removeEducationSection={removeEducationSection}
              updateEducationSection={updateEducationSection}
              getValidCurriculaForEnglishMedium={
                getValidCurriculaForEnglishMedium
              }
              getYearOptionsForExamination={getYearOptionsForExamination}
              fieldErrors={fieldErrors}
            />

            <EditTutorDocumentUploadSection
              fileData={fileData}
              handleFileChange={handleFileChange}
              imagePreview={imagePreview}
              existingImages={existingImages}
              isCompressing={isCompressing}
              removeImage={removeImage}
              handleFileUpload={handleFileUpload}
            />

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
              <label htmlFor="agreeTerms" className="ml-2 text-sm font-medium">
                Agree to terms and conditions
              </label>
            </div>
            {fieldErrors.agreeTerms && (
              <p className="text-sm text-red-600">{fieldErrors.agreeTerms}</p>
            )}
          </form>
        </div>
        <div className="flex justify-end space-x-3 p-6 border-t border-gray-200">
          <button
            type="button"
            onClick={() => {
              if (isEdited()) {
                if (
                  window.confirm(
                    "You have unsaved changes. Are you sure you want to cancel and reset the form?",
                  )
                ) {
                  resetForm();
                }
              } else {
                onClose();
              }
            }}
            className="px-6 py-2 bg-red-600 text-white rounded-lg font-semibold hover:bg-red-700 transition"
          >
            {isEdited() ? "Reset" : "Cancel"}
          </button>
          <button
            type="submit"
            form="edit-tutor-form"
            disabled={loading || !isEdited()}
            onClick={handleSubmit}
            className={`px-6 py-2 rounded-lg transition-all duration-200 flex items-center justify-center ${
              loading || !isEdited()
                ? "bg-blue-300 text-blue-700 cursor-not-allowed"
                : "bg-blue-600 text-white hover:bg-blue-700"
            }`}
          >
            {loading && (
              <svg
                className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                />
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8v16a8 8 0 01-8-8z"
                />
              </svg>
            )}
            <span className="text-sm font-semibold">
              {loading ? "Updating..." : "Update Tutor"}
            </span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditTutorModal;
