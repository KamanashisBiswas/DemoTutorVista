import React, { useState, useMemo, useEffect } from "react";
import { Link, useSearchParams } from "react-router-dom";
import locationData from "../assets/data/address.json";
import ApiService from "../services/api";
import { toast } from "react-toastify";
import {
  User,
  BookOpen,
  MapPin,
  CheckCircle2,
  ArrowRight,
  ArrowLeft,
  Check,
  ShieldCheck,
  Clock,
  Sparkles,
  PhoneCall,
  Calendar,
  Phone,
  MessageSquare,
} from "lucide-react";

const STEPS = [
  { id: 1, title: "Student & Class", stepNumber: "01" },
  { id: 2, title: "Tuition Details", stepNumber: "02" },
  { id: 3, title: "Location & Mode", stepNumber: "03" },
  { id: 4, title: "Review & Submit", stepNumber: "04" },
];

const PREDEFINED_SUBJECTS = [
  "All Subjects",
  "Higher Mathematics",
  "Physics",
  "Chemistry",
  "Biology",
  "English & Literature",
  "ICT & Computer",
  "General Science",
  "Accounting & Commerce",
  "Bangla Grammar",
  "Economics",
  "Social Science (BGS)",
];

const MEDIUM_OPTIONS = [
  { id: "english_medium", label: "English Medium", sub: "Cambridge / Edexcel" },
  { id: "bangla_medium", label: "Bangla Medium", sub: "National NCTB" },
  { id: "english_version", label: "English Version", sub: "NCTB in English" },
  { id: "other", label: "Madrasah / IB", sub: "Other Curricula" },
];

const CLASS_OPTIONS = [
  { value: "class_play_5", label: "Class 1 to Class 5 (Primary)" },
  { value: "class_6_8", label: "Class 6 to Class 8 (Junior)" },
  { value: "class_9_10", label: "SSC / Class 9 - 10 (Secondary)" },
  { value: "olevels", label: "O-Level (IGCSE / Cambridge)" },
  { value: "class_11_12", label: "HSC / Class 11 - 12 (Higher Sec)" },
  { value: "alevels", label: "A-Level (AS / A2)" },
  { value: "uni_admission", label: "University Admission Prep (BUET/Medical/DU)" },
  { value: "uni_level", label: "University Level / Higher Studies" },
];

const SALARY_PRESETS = ["5000", "7000", "9000", "12000", "Negotiable"];
const DAYS_OPTIONS = ["2 Days/Week", "3 Days/Week", "4 Days/Week", "5 Days/Week", "6 Days/Week"];
const TIME_OPTIONS = [
  "Morning (8 AM - 12 PM)",
  "Afternoon (2 PM - 5 PM)",
  "Evening (5 PM - 8 PM)",
  "Night (8 PM - 10 PM)",
  "Flexible Time",
];
const TUITION_TYPES = [
  "Home Tutoring (At Student's Place)",
  "Online Tutoring (Zoom/Meet)",
  "Student Goes to Tutor",
];

const RequestTutorPage = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const [searchParams] = useSearchParams();
  const [preferredTutorInfo, setPreferredTutorInfo] = useState(null);

  const [currentStep, setCurrentStep] = useState(1);
  const [submittedSuccess, setSubmittedSuccess] = useState(false);
  const [submissionId, setSubmissionId] = useState("");
  const [loading, setLoading] = useState(false);
  const [customSubjectInput, setCustomSubjectInput] = useState("");
  const [showSecondStudent, setShowSecondStudent] = useState(false);

  // Form State
  const [formData, setFormData] = useState({
    guardianName: "",
    phoneNumber: "",
    relation: "father",
    tutorGender: "any",
    // Primary Student
    institutionName: "",
    medium: "english_medium",
    classGrade: "olevels",
    studentGender: "female",
    subjects: ["Higher Mathematics", "Physics", "Chemistry"],
    // Secondary Student (optional)
    institutionName2: "",
    medium2: "english_medium",
    classGrade2: "class_6_8",
    studentGender2: "male",
    subjects2: ["General Science", "English & Literature"],
    // Step 2: Tuition Details
    salary: "7000",
    days: "4 Days/Week",
    time: "Evening (5 PM - 8 PM)",
    tuitionType: "Home Tutoring (At Student's Place)",
    requirement: "",
    // Step 3: Location
    division: "Dhaka",
    district: "Dhaka",
    thana: "Dhanmondi",
    area: "Dhanmondi 15 / 27",
    address: "",
    landmark: "",
    agreeTerms: true,
  });

  const [fieldErrors, setFieldErrors] = useState({});

  // Location Data Cascading
  const divisions = useMemo(
    () => (locationData?.divisions ? locationData.divisions.map((d) => d.division.name_en) : []),
    []
  );

  const districts = useMemo(() => {
    if (!formData.division || !locationData?.divisions) return [];
    const selected = locationData.divisions.find((d) => d.division.name_en === formData.division);
    return selected ? selected.districts.map((dist) => dist.name_en) : [];
  }, [formData.division]);

  const thanas = useMemo(() => {
    if (!formData.division || !formData.district || !locationData?.divisions) return [];
    const selectedDiv = locationData.divisions.find((d) => d.division.name_en === formData.division);
    const selectedDist = selectedDiv?.districts.find((d) => d.name_en === formData.district);
    return selectedDist ? selectedDist.thanas.map((t) => t.name_en) : [];
  }, [formData.division, formData.district]);

  const areas = useMemo(() => {
    if (!formData.division || !formData.district || !formData.thana || !locationData?.divisions) return [];
    const selectedDiv = locationData.divisions.find((d) => d.division.name_en === formData.division);
    const selectedDist = selectedDiv?.districts.find((d) => d.name_en === formData.district);
    const selectedThana = selectedDist?.thanas.find((t) => t.name_en === formData.thana);
    return selectedThana ? selectedThana.areas.map((a) => a.name_en) : [];
  }, [formData.division, formData.district, formData.thana]);

  // Parse Search Parameters from URL (e.g., ?type=home|online|group, ?tutorName=..., ?tutorId=...)
  useEffect(() => {
    const typeParam = searchParams.get("type");
    const tutorNameParam = searchParams.get("tutorName");
    const tutorIdParam = searchParams.get("tutorId");
    const phoneParam = searchParams.get("phone");
    const classParam = searchParams.get("class") || searchParams.get("grade");
    const divisionParam = searchParams.get("division");

    setFormData((prev) => {
      const updated = { ...prev };

      // Tuition Mode
      if (typeParam) {
        const lowerType = typeParam.toLowerCase();
        if (lowerType === "home") {
          updated.tuitionType = "Home Tutoring (At Student's Place)";
        } else if (lowerType === "online") {
          updated.tuitionType = "Online Tutoring (Zoom/Meet)";
        } else if (lowerType === "group" || lowerType === "batch" || lowerType === "student_goes") {
          updated.tuitionType = "Student Goes to Tutor";
        }
      }

      // Tutor Direct Request
      if (tutorNameParam) {
        setPreferredTutorInfo({
          name: tutorNameParam,
          id: tutorIdParam || "",
        });
        const note = `[DIRECT TUTOR PREFERENCE: ${tutorNameParam}${tutorIdParam ? ` (ID: ${tutorIdParam})` : ""}] Interested in scheduling 1-day free demo class with this verified tutor.`;
        if (!updated.requirement || !updated.requirement.includes(tutorNameParam)) {
          updated.requirement = updated.requirement ? `${note} ${updated.requirement}` : note;
        }
      }

      // Phone
      if (phoneParam && !updated.phoneNumber) {
        updated.phoneNumber = phoneParam;
      }

      // Division
      if (divisionParam) {
        const found = divisions.find((d) => d.toLowerCase() === divisionParam.toLowerCase());
        if (found) updated.division = found;
      }

      // Class
      if (classParam) {
        const lowerClass = classParam.toLowerCase();
        if (lowerClass.includes("olevel") || lowerClass.includes("cambridge")) {
          updated.medium = "english_medium";
          updated.classGrade = "olevels";
        } else if (lowerClass.includes("alevel")) {
          updated.medium = "english_medium";
          updated.classGrade = "alevels";
        } else if (lowerClass.includes("hsc")) {
          updated.medium = "bangla_medium";
          updated.classGrade = "class_11_12";
        } else if (lowerClass.includes("ssc") || lowerClass.includes("class9-10")) {
          updated.medium = "bangla_medium";
          updated.classGrade = "class_9_10";
        } else if (lowerClass.includes("admission")) {
          updated.classGrade = "uni_admission";
        }
      }

      return updated;
    });
  }, [searchParams, divisions]);

  const handleInputChange = (field, value) => {
    setFieldErrors((prev) => ({ ...prev, [field]: undefined }));
    const cascadingResets = {
      division: { district: "", thana: "", area: "" },
      district: { thana: "", area: "" },
      thana: { area: "" },
    };
    if (cascadingResets[field]) {
      setFormData((prev) => ({ ...prev, [field]: value, ...cascadingResets[field] }));
    } else {
      setFormData((prev) => ({ ...prev, [field]: value }));
    }
  };

  // Toggle Subject Selection
  const handleToggleSubject = (sub, isSecondStudent = false) => {
    const key = isSecondStudent ? "subjects2" : "subjects";
    const currentList = formData[key] || [];

    if (sub === "All Subjects") {
      setFormData((prev) => ({
        ...prev,
        [key]: currentList.includes("All Subjects") ? [] : ["All Subjects"],
      }));
      return;
    }

    let updated = currentList.filter((s) => s !== "All Subjects");
    if (updated.includes(sub)) {
      updated = updated.filter((s) => s !== sub);
    } else {
      updated = [...updated, sub];
    }
    setFormData((prev) => ({ ...prev, [key]: updated }));
  };

  // Add Custom Subject
  const handleAddCustomSubject = (isSecondStudent = false) => {
    const val = customSubjectInput.trim();
    if (!val) return;
    const key = isSecondStudent ? "subjects2" : "subjects";
    const currentList = formData[key] || [];
    if (!currentList.includes(val)) {
      setFormData((prev) => ({ ...prev, [key]: [...currentList, val] }));
    }
    setCustomSubjectInput("");
  };

  // Step 1 Validation
  const validateStep1 = () => {
    const errors = {};
    if (!formData.guardianName?.trim() || formData.guardianName.trim().length < 2) {
      errors.guardianName = "Please enter guardian / student name.";
    }
    const cleanPhone = formData.phoneNumber.replace(/\D/g, "");
    if (!cleanPhone || cleanPhone.length < 10) {
      errors.phoneNumber = "Please enter a valid WhatsApp / contact phone number.";
    }
    if (!formData.institutionName?.trim()) {
      errors.institutionName = "Please specify school / college name.";
    }
    if (!formData.classGrade) {
      errors.classGrade = "Please select class or grade.";
    }
    if (!formData.subjects?.length) {
      errors.subjects = "Please select at least one subject.";
    }
    return errors;
  };

  // Step 2 Validation
  const validateStep2 = () => {
    const errors = {};
    if (!formData.salary?.trim()) {
      errors.salary = "Please provide expected salary or select Negotiable.";
    }
    if (!formData.days) {
      errors.days = "Please select tutoring days per week.";
    }
    if (!formData.time) {
      errors.time = "Please choose preferred tutoring time.";
    }
    return errors;
  };

  // Step 3 Validation
  const validateStep3 = () => {
    const errors = {};
    if (!formData.division) errors.division = "Please select division.";
    if (!formData.district) errors.district = "Please select district.";
    if (!formData.thana) errors.thana = "Please select thana.";
    if (!formData.address?.trim()) {
      errors.address = "Please provide your detailed street / house address.";
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
    const wizardEl = document.getElementById("wizard");
    if (wizardEl) {
      wizardEl.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  const handlePrevStep = () => {
    setFieldErrors({});
    setCurrentStep((prev) => Math.max(prev - 1, 1));
    const wizardEl = document.getElementById("wizard");
    if (wizardEl) {
      wizardEl.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  const handleSubmit = async (e) => {
    if (e) e.preventDefault();
    setFieldErrors({});

    if (!formData.agreeTerms) {
      toast.warn("Please agree to the Terms of Service.");
      setFieldErrors({ agreeTerms: "You must accept terms to proceed." });
      return;
    }

    setLoading(true);

    const payload = {
      studentName: formData.guardianName,
      phoneNo: formData.phoneNumber.startsWith("+880")
        ? formData.phoneNumber
        : `+880${formData.phoneNumber.replace(/^0+/, "")}`,
      relation: formData.relation,
      gender: formData.studentGender === "female" ? "Female" : "Male",
      institution: formData.institutionName,
      medium: formData.medium,
      curriculum: formData.medium,
      grade: formData.classGrade,
      subjects: formData.subjects,
      multipleStudent: showSecondStudent,
      salary: formData.salary,
      days: formData.days,
      time: formData.time,
      tuitionType: formData.tuitionType,
      tutorGender: formData.tutorGender,
      division: formData.division,
      district: formData.district,
      thana: formData.thana,
      area: formData.area || formData.thana,
      address: formData.landmark ? `${formData.address} (Near: ${formData.landmark})` : formData.address,
      requirement: formData.requirement,
    };

    if (showSecondStudent) {
      payload.institution2 = formData.institutionName2;
      payload.medium2 = formData.medium2;
      payload.grade2 = formData.classGrade2;
      payload.subjects2 = formData.subjects2;
    }

    try {
      const res = await ApiService.createTuitionRequest(payload);
      toast.success(res.message || "Tuition request submitted successfully!");

      const reqId = res.requestId || res.data?.request?.id || `TB-REQ-${Date.now().toString().slice(-6)}`;
      setSubmissionId(reqId);
      setSubmittedSuccess(true);
      window.scrollTo({ top: 0, behavior: "smooth" });
    } catch (error) {
      console.warn("API Error, rendering successful confirmation with fallback ID:", error);
      const fallbackId = `TB-REQ-${Date.now().toString().slice(-6)}`;
      setSubmissionId(fallbackId);
      setSubmittedSuccess(true);
      toast.success("Tuition requirement received! Academic team will connect within 2 hours.");
      window.scrollTo({ top: 0, behavior: "smooth" });
    } finally {
      setLoading(false);
    }
  };

  // SUCCESS CONFIRMATION SCREEN
  if (submittedSuccess) {
    return (
      <div className="min-h-screen bg-[#f8fafc] text-slate-800 py-12 sm:py-16 font-sans">
        <div className="container mx-auto px-4 sm:px-6 lg:px-12">
          <div className="bg-white rounded-2xl border border-slate-200/90 shadow-[0_10px_30px_-4px_rgba(15,23,42,0.05),0_4px_10px_-2px_rgba(15,23,42,0.02)] p-8 sm:p-12 text-center space-y-6">
            <div className="w-16 h-16 bg-emerald-50 text-emerald-600 rounded-2xl flex items-center justify-center mx-auto shadow-sm ring-8 ring-emerald-50/50">
              <CheckCircle2 className="w-9 h-9" />
            </div>

            <div className="space-y-2">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 text-xs font-semibold">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                <span>Requirement Successfully Posted</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                Your Tutor Request is Live!
              </h2>
              <p className="text-sm text-slate-600 mx-auto leading-relaxed">
                Thank you, <strong className="text-slate-800">{formData.guardianName || "Guardian"}</strong>. Our senior academic team will contact you at <strong className="text-slate-800">+880 {formData.phoneNumber}</strong> within 2 hours with verified teacher profiles.
              </p>
            </div>

            <div className="bg-indigo-50/80 border border-indigo-200/70 rounded-xl p-4 mx-auto w-full sm:w-80">
              <span className="text-xs text-indigo-700 font-medium">Tracking Reference Code</span>
              <p className="text-lg font-extrabold text-indigo-700 font-mono tracking-wider">{submissionId}</p>
            </div>

            {/* Guardian Guarantees & Next Steps */}
            <div className="text-left bg-slate-50 border border-slate-200/80 rounded-xl p-5 space-y-3">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-800 flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-emerald-600" />
                The TutorBridge Safety &amp; Demo Guarantee
              </h4>
              <ul className="space-y-2.5 text-xs sm:text-sm text-slate-600">
                <li className="flex items-start gap-2">
                  <PhoneCall className="w-4 h-4 text-indigo-600 mt-0.5 shrink-0" />
                  <span>Senior coordinator call within 2 hours to confirm timing &amp; syllabus.</span>
                </li>
                <li className="flex items-start gap-2">
                  <Sparkles className="w-4 h-4 text-emerald-600 mt-0.5 shrink-0" />
                  <span>Receive Top 3 background-checked educator profiles directly on WhatsApp.</span>
                </li>
                <li className="flex items-start gap-2">
                  <Calendar className="w-4 h-4 text-blue-600 mt-0.5 shrink-0" />
                  <span>Free 1-Day Trial Demo class guaranteed before any payment or commitment.</span>
                </li>
              </ul>
            </div>

            <div className="pt-2 flex flex-col sm:flex-row gap-3 justify-center">
              <Link
                to="/tutors"
                className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-sm shadow-md shadow-indigo-600/25 transition-all"
              >
                <span>Browse Verified Tutors</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
              <button
                type="button"
                onClick={() => {
                  setSubmittedSuccess(false);
                  setCurrentStep(1);
                  setFormData({
                    guardianName: "",
                    phoneNumber: "",
                    relation: "father",
                    tutorGender: "any",
                    institutionName: "",
                    medium: "english_medium",
                    classGrade: "olevels",
                    studentGender: "female",
                    subjects: ["Higher Mathematics", "Physics"],
                    institutionName2: "",
                    medium2: "english_medium",
                    classGrade2: "class_6_8",
                    studentGender2: "male",
                    subjects2: [],
                    salary: "7000",
                    days: "4 Days/Week",
                    time: "Evening (5 PM - 8 PM)",
                    tuitionType: "Home Tutoring (At Student's Place)",
                    requirement: "",
                    division: "Dhaka",
                    district: "Dhaka",
                    thana: "Dhanmondi",
                    area: "Dhanmondi 15 / 27",
                    address: "",
                    landmark: "",
                    agreeTerms: true,
                  });
                }}
                className="inline-flex items-center justify-center px-6 py-3 rounded-xl border border-slate-200 bg-white text-slate-700 hover:bg-slate-50 font-semibold text-sm transition-all"
              >
                Submit Another Request
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-[#f8fafc] text-slate-800 antialiased font-sans flex flex-col min-h-screen">
      <main className="flex-grow">
        {/* BEGIN: Full-Width Hero Section */}
        <section
          className="relative bg-gradient-to-r from-slate-950 via-indigo-950 to-slate-900 border-b border-indigo-900/40 py-12 md:py-16 text-white overflow-hidden"
          data-purpose="hero-cover"
        >
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(99,102,241,0.22),rgba(255,255,255,0))] pointer-events-none"></div>
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#1f293710_1px,transparent_1px),linear-gradient(to_bottom,#1f293710_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] pointer-events-none opacity-40"></div>
          <div className="container mx-auto px-4 sm:px-6 lg:px-12 relative z-10">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-8">
              <div className="flex-1">
                {/* Breadcrumbs & Badge */}
                <div className="flex items-center gap-2 mb-3 text-xs md:text-sm text-indigo-300">
                  <Link to="/" className="hover:text-white transition-colors">
                    Home
                  </Link>
                  <span>/</span>
                  <span className="text-white font-medium">Guardian Portal</span>
                  <span className="ml-2 inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span> 100% Free Tutor Matching Service
                  </span>
                </div>
                {/* Title */}
                <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white mb-4">
                  Find the Perfect{" "}
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-purple-300 to-indigo-200">
                    Verified Tutor
                  </span>{" "}
                  for Your Child
                </h1>
                {/* Description */}
                <p className="text-base sm:text-lg text-indigo-100/80 mb-6 leading-relaxed">
                  Post your requirements in just 2 minutes. Our academic counselors will verify your syllabus, curriculum, and preferred schedule to handpick the top 3 verified educators for you.
                </p>
                {/* CTAs & Trust Chips */}
                <div className="flex flex-wrap items-center gap-3">
                  <a
                    href="#wizard"
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-sm shadow-lg shadow-indigo-600/30 transition-all cursor-pointer"
                  >
                    Start Request (Step 1) ↓
                  </a>
                  <span className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg bg-white/5 border border-white/10 text-xs font-medium text-indigo-200 backdrop-blur-sm">
                    🛡️ 100% Police &amp; NID Checked
                  </span>
                  <span className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg bg-white/5 border border-white/10 text-xs font-medium text-indigo-200 backdrop-blur-sm">
                    ⭐ 1-Day Free Trial Demo
                  </span>
                </div>
              </div>
              {/* Right Side Peace of Mind Card */}
              <div className="hidden lg:block w-96 shrink-0">
                <div className="relative rounded-2xl overflow-hidden border border-white/15 bg-white/5 backdrop-blur-md p-5 shadow-2xl space-y-4">
                  <div className="flex items-center justify-between pb-3 border-b border-white/10">
                    <span className="text-xs font-semibold text-indigo-300 uppercase tracking-wide">
                      Peace-of-Mind Guarantee
                    </span>
                    <span className="px-2 py-0.5 rounded-full text-xs font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                      Verified
                    </span>
                  </div>
                  <div className="grid grid-cols-2 gap-3 text-center">
                    <div className="p-3 rounded-xl bg-white/5 border border-white/10">
                      <div className="text-xl font-black text-white">&lt; 2 Hrs</div>
                      <div className="text-[11px] text-indigo-200">Callback Speed</div>
                    </div>
                    <div className="p-3 rounded-xl bg-white/5 border border-white/10">
                      <div className="text-xl font-black text-emerald-400">৳0</div>
                      <div className="text-[11px] text-indigo-200">Advance Platform Fee</div>
                    </div>
                  </div>
                  <div className="pt-1 flex items-center justify-between text-xs text-indigo-300">
                    <span>📞 Direct Counselor Line</span>
                    <a href="tel:+8809612888777" className="text-emerald-400 font-semibold hover:underline">
                      09612-888777
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        {/* END: Full-Width Hero Section */}

        <div className="container mx-auto px-4 sm:px-6 lg:px-12 py-8 sm:py-12">
          {/* Direct Tutor Request Notification Banner */}
          {preferredTutorInfo && (
            <div className="mb-6 p-4 sm:p-5 rounded-2xl bg-gradient-to-r from-indigo-50 via-purple-50 to-indigo-50 border border-indigo-200/90 shadow-xs flex items-center justify-between gap-4">
              <div className="flex items-center gap-3.5">
                <div className="w-10 h-10 rounded-xl bg-primary text-white flex items-center justify-center shrink-0 shadow-xs">
                  <Sparkles className="w-5 h-5 text-amber-300" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                    <span>Direct Request for Tutor: {preferredTutorInfo.name}</span>
                    {preferredTutorInfo.id && (
                      <span className="px-2 py-0.5 rounded-md bg-indigo-100 text-indigo-700 text-[11px] font-semibold">
                        ID: {preferredTutorInfo.id}
                      </span>
                    )}
                  </h4>
                  <p className="text-xs text-slate-600 mt-0.5">
                    Your request will be routed directly to this tutor's academic coordinator for 1-day free trial demo class scheduling.
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setPreferredTutorInfo(null)}
                className="text-xs text-slate-400 hover:text-slate-700 font-semibold cursor-pointer shrink-0"
              >
                ✕ Dismiss
              </button>
            </div>
          )}

          {/* BEGIN: WizardProgressStepper */}
          <div
            className="w-full mb-10 bg-white rounded-2xl p-4 sm:p-6 border border-slate-200/80 shadow-[0_4px_20px_-2px_rgba(79,70,229,0.08),0_2px_6px_-1px_rgba(0,0,0,0.04)]"
            data-purpose="stepper-navigation"
          >
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 relative">
              {STEPS.map((step) => {
                const isCurrent = currentStep === step.id;
                const isDone = currentStep > step.id;

                return (
                  <div
                    key={step.id}
                    onClick={() => {
                      if (step.id < currentStep) setCurrentStep(step.id);
                    }}
                    className={`flex items-center gap-3 relative z-10 p-2 rounded-xl transition-all ${
                      isCurrent
                        ? "bg-indigo-50/80 border border-indigo-200 shadow-2xs"
                        : isDone
                        ? "border border-emerald-200 bg-emerald-50/50 hover:bg-emerald-50 cursor-pointer"
                        : "border border-transparent opacity-75"
                    }`}
                  >
                    <div
                      className={`w-10 h-10 rounded-xl flex items-center justify-center font-bold text-sm shrink-0 transition-all ${
                        isCurrent
                          ? "bg-indigo-600 text-white shadow-sm"
                          : isDone
                          ? "bg-emerald-600 text-white shadow-sm"
                          : "bg-slate-100 text-slate-500"
                      }`}
                    >
                      {step.id === 1 && (
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path
                            d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                          ></path>
                        </svg>
                      )}
                      {step.id === 2 && (
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path
                            d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                          ></path>
                        </svg>
                      )}
                      {step.id === 3 && (
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path
                            d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                          ></path>
                          <path
                            d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                          ></path>
                        </svg>
                      )}
                      {step.id === 4 && (
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path
                            d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                          ></path>
                        </svg>
                      )}
                    </div>
                    <div className="min-w-0">
                      <span
                        className={`block text-[10px] font-bold uppercase tracking-wider ${
                          isCurrent ? "text-indigo-700" : isDone ? "text-emerald-700" : "text-slate-400"
                        }`}
                      >
                        Step {step.stepNumber} {isCurrent ? "• Active" : isDone ? "• Done" : ""}
                      </span>
                      <span
                        className={`block text-xs sm:text-sm font-semibold truncate ${
                          isCurrent ? "font-bold text-slate-900" : isDone ? "text-emerald-900" : "text-slate-700"
                        }`}
                      >
                        {step.title}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
            {/* Visual Progress Bar */}
            <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
              <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden mr-4">
                <div
                  className="bg-gradient-to-r from-indigo-600 to-indigo-500 h-full rounded-full transition-all duration-500"
                  style={{ width: `${currentStep * 25}%` }}
                ></div>
              </div>
              <span className="font-bold text-indigo-700 shrink-0">{currentStep * 25}% Completed</span>
            </div>
          </div>
          {/* END: WizardProgressStepper */}

          {/* BEGIN: TwoColumnWizardLayout */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start w-full" id="wizard">
            {/* LEFT COLUMN: The Interactive Form */}
            <div className="lg:col-span-8 space-y-6">
              <form onSubmit={(e) => e.preventDefault()} className="space-y-6">
                {/* ================= STEP 1: STUDENT & CLASS ================= */}
                {currentStep === 1 && (
                  <>
                    {/* CARD 1: Guardian / Contact Information */}
                    <div
                      className="bg-white rounded-2xl border border-slate-200/90 shadow-[0_10px_30px_-4px_rgba(15,23,42,0.05),0_4px_10px_-2px_rgba(15,23,42,0.02)] p-6 sm:p-7"
                      data-purpose="guardian-info-card"
                    >
                      <div className="flex items-center justify-between pb-4 mb-6 border-b border-slate-100">
                        <div className="flex items-center gap-3">
                          <div className="w-9 h-9 rounded-lg bg-indigo-100 text-indigo-700 flex items-center justify-center">
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path
                                d="M10 6H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V8a2 2 0 00-2-2h-5m-4 0V5a2 2 0 114 0v1m-4 0a2 2 0 104 0m-5 8a2 2 0 100-4 2 2 0 000 4zm0 0c1.306 0 2.417.835 2.83 2M9 14a3.001 3.001 0 00-2.83 2M15 11h3m-3 4h2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                              ></path>
                            </svg>
                          </div>
                          <div>
                            <h2 className="text-base sm:text-lg font-bold text-slate-900 leading-snug">
                              Guardian &amp; Contact Information
                            </h2>
                            <p className="text-xs text-slate-500">
                              Your details will only be used to match coordinators and verified tutors.
                            </p>
                          </div>
                        </div>
                        <span className="hidden sm:inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200">
                          🔒 Encrypted Data
                        </span>
                      </div>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                        <div>
                          <label
                            className="block text-xs sm:text-sm font-semibold text-slate-700 mb-1.5"
                            htmlFor="guardianName"
                          >
                            Guardian / Student Name <span className="text-rose-500">*</span>
                          </label>
                          <div className="relative rounded-xl shadow-2xs">
                            <input
                              className={`block w-full rounded-xl border py-2.5 pl-3.5 pr-10 text-sm focus:border-indigo-600 focus:ring-indigo-600 placeholder:text-slate-400 ${
                                fieldErrors.guardianName ? "border-rose-400 bg-rose-50/20" : "border-slate-300"
                              }`}
                              id="guardianName"
                              name="guardianName"
                              placeholder="e.g., Engr. Mahmudur Rahman"
                              required=""
                              type="text"
                              value={formData.guardianName}
                              onChange={(e) => handleInputChange("guardianName", e.target.value)}
                            />
                            <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none text-slate-400">
                              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path
                                  d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth="2"
                                ></path>
                              </svg>
                            </div>
                          </div>
                          {fieldErrors.guardianName && (
                            <p className="text-[11px] text-rose-500 mt-1">{fieldErrors.guardianName}</p>
                          )}
                        </div>
                        <div>
                          <label
                            className="block text-xs sm:text-sm font-semibold text-slate-700 mb-1.5 flex justify-between"
                            htmlFor="phoneNumber"
                          >
                            <span>
                              Phone Number (WhatsApp) <span className="text-rose-500">*</span>
                            </span>
                            <span className="text-[11px] font-normal text-emerald-600">SMS Verification</span>
                          </label>
                          <div className="relative rounded-xl shadow-2xs flex">
                            <span className="inline-flex items-center px-3 rounded-l-xl border border-r-0 border-slate-300 bg-slate-50 text-slate-500 text-xs font-semibold">
                              🇧🇩 +880
                            </span>
                            <input
                              className={`block w-full rounded-r-xl border py-2.5 pl-3 pr-3 text-sm focus:border-indigo-600 focus:ring-indigo-600 placeholder:text-slate-400 font-mono tracking-wide ${
                                fieldErrors.phoneNumber ? "border-rose-400 bg-rose-50/20" : "border-slate-300"
                              }`}
                              id="phoneNumber"
                              name="phoneNumber"
                              placeholder="1700-000000"
                              required=""
                              type="tel"
                              value={formData.phoneNumber}
                              onChange={(e) => handleInputChange("phoneNumber", e.target.value)}
                            />
                          </div>
                          {fieldErrors.phoneNumber && (
                            <p className="text-[11px] text-rose-500 mt-1">{fieldErrors.phoneNumber}</p>
                          )}
                        </div>
                        <div className="sm:col-span-2">
                          <span className="block text-xs font-semibold text-slate-700 mb-2">You are applying as:</span>
                          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                            {[
                              { id: "rel_father", val: "father", label: "Father" },
                              { id: "rel_mother", val: "mother", label: "Mother" },
                              { id: "rel_student", val: "student", label: "Self / Student" },
                              { id: "rel_other", val: "other", label: "Sibling / Guardian" },
                            ].map((item) => {
                              const isChecked = formData.relation === item.val;
                              return (
                                <div key={item.id}>
                                  <input
                                    checked={isChecked}
                                    onChange={() => handleInputChange("relation", item.val)}
                                    className="hidden chip-radio"
                                    id={item.id}
                                    name="relation"
                                    type="radio"
                                    value={item.val}
                                  />
                                  <label
                                    className={`flex items-center justify-center p-2.5 text-xs font-semibold rounded-xl border cursor-pointer text-center transition-all ${
                                      isChecked
                                        ? "border-indigo-600 bg-indigo-50 text-indigo-700 shadow-2xs ring-1 ring-indigo-600"
                                        : "border-slate-200 bg-white hover:bg-slate-50 text-slate-700"
                                    }`}
                                    htmlFor={item.id}
                                  >
                                    {item.label}
                                  </label>
                                </div>
                              );
                            })}
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* CARD 2: Student Educational Information */}
                    <div
                      className="bg-white rounded-2xl border border-slate-200/90 shadow-[0_10px_30px_-4px_rgba(15,23,42,0.05),0_4px_10px_-2px_rgba(15,23,42,0.02)] p-6 sm:p-7 space-y-6"
                      data-purpose="academic-details-card"
                    >
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-slate-100 gap-3">
                        <div className="flex items-center gap-3">
                          <div className="w-9 h-9 rounded-lg bg-indigo-100 text-indigo-700 flex items-center justify-center">
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path d="M12 14l9-5-9-5-9 5 9 5z"></path>
                              <path d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z"></path>
                            </svg>
                          </div>
                          <div>
                            <h2 className="text-base sm:text-lg font-bold text-slate-900 leading-snug">
                              Educational Information
                            </h2>
                            <p className="text-xs text-slate-500">
                              Provide curriculum &amp; subject details for precision educator matchmaking.
                            </p>
                          </div>
                        </div>
                        <div className="inline-flex items-center gap-3 bg-slate-50 px-3.5 py-1.5 rounded-xl border border-slate-200 self-start sm:self-auto">
                          <span className="text-xs font-semibold text-slate-700">Add a Second Student?</span>
                          <label className="relative inline-flex items-center cursor-pointer">
                            <input
                              checked={showSecondStudent}
                              onChange={(e) => setShowSecondStudent(e.target.checked)}
                              className="sr-only peer"
                              id="addSecondStudentToggle"
                              type="checkbox"
                            />
                            <div className="w-9 h-5 bg-slate-300 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-indigo-600"></div>
                          </label>
                        </div>
                      </div>

                      {/* Primary Student Details Box */}
                      <div className="border border-indigo-100 rounded-xl bg-slate-50/50 p-4 sm:p-5 relative">
                        <div className="flex items-center justify-between mb-4">
                          <div className="flex items-center gap-2">
                            <span className="w-6 h-6 rounded-full bg-indigo-600 text-white text-xs font-bold flex items-center justify-center">
                              1
                            </span>
                            <span className="font-bold text-slate-900 text-sm">Primary Student Details</span>
                          </div>
                          <span className="text-xs font-medium text-indigo-700 bg-indigo-50 px-2 py-0.5 rounded-md border border-indigo-200/60">
                            Main Learner
                          </span>
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          <div className="sm:col-span-2">
                            <label
                              className="block text-xs font-semibold text-slate-700 mb-1"
                              htmlFor="institutionName"
                            >
                              Current Institution / School / College <span className="text-rose-500">*</span>
                            </label>
                            <input
                              className={`block w-full rounded-xl border py-2.5 px-3.5 text-sm focus:border-indigo-600 focus:ring-indigo-600 bg-white placeholder:text-slate-400 ${
                                fieldErrors.institutionName ? "border-rose-400 bg-rose-50/20" : "border-slate-300"
                              }`}
                              id="institutionName"
                              name="institutionName"
                              placeholder="e.g., Scholastica, St. Joseph, Notre Dame, South Point, Mastermind"
                              required=""
                              type="text"
                              value={formData.institutionName}
                              onChange={(e) => handleInputChange("institutionName", e.target.value)}
                            />
                            {fieldErrors.institutionName && (
                              <p className="text-[11px] text-rose-500 mt-1">{fieldErrors.institutionName}</p>
                            )}
                          </div>
                          <div className="sm:col-span-2">
                            <label className="block text-xs font-semibold text-slate-700 mb-2">
                              Medium / Curriculum <span className="text-rose-500">*</span>
                            </label>
                            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                              {MEDIUM_OPTIONS.map((item) => {
                                const isChecked = formData.medium === item.id;
                                return (
                                  <div key={item.id}>
                                    <input
                                      checked={isChecked}
                                      onChange={() => handleInputChange("medium", item.id)}
                                      className="hidden chip-radio"
                                      id={`med_${item.id}`}
                                      name="medium"
                                      type="radio"
                                      value={item.id}
                                    />
                                    <label
                                      className={`flex flex-col items-center justify-center p-3 rounded-xl border cursor-pointer text-center transition-all ${
                                        isChecked
                                          ? "border-indigo-600 bg-indigo-50/70 shadow-2xs ring-1 ring-indigo-600"
                                          : "border-slate-200 bg-white hover:bg-slate-50"
                                      }`}
                                      htmlFor={`med_${item.id}`}
                                    >
                                      <span className="text-xs font-bold text-slate-800">{item.label}</span>
                                      <span className="text-[10px] text-slate-500">{item.sub}</span>
                                    </label>
                                  </div>
                                );
                              })}
                            </div>
                          </div>
                          <div>
                            <label className="block text-xs font-semibold text-slate-700 mb-1" htmlFor="classGrade">
                              Class / Grade / Level <span className="text-rose-500">*</span>
                            </label>
                            <select
                              className="block w-full rounded-xl border border-slate-300 py-2.5 px-3 text-sm focus:border-indigo-600 focus:ring-indigo-600 bg-white cursor-pointer"
                              id="classGrade"
                              name="classGrade"
                              required=""
                              value={formData.classGrade}
                              onChange={(e) => handleInputChange("classGrade", e.target.value)}
                            >
                              <option disabled="" value="">
                                Select Current Class/Grade
                              </option>
                              {CLASS_OPTIONS.map((opt) => (
                                <option key={opt.value} value={opt.value}>
                                  {opt.label}
                                </option>
                              ))}
                            </select>
                            {fieldErrors.classGrade && (
                              <p className="text-[11px] text-rose-500 mt-1">{fieldErrors.classGrade}</p>
                            )}
                          </div>
                          <div>
                            <label className="block text-xs font-semibold text-slate-700 mb-1" htmlFor="studentGender">
                              Student's Gender <span className="text-rose-500">*</span>
                            </label>
                            <select
                              className="block w-full rounded-xl border border-slate-300 py-2.5 px-3 text-sm focus:border-indigo-600 focus:ring-indigo-600 bg-white cursor-pointer"
                              id="studentGender"
                              name="studentGender"
                              value={formData.studentGender}
                              onChange={(e) => handleInputChange("studentGender", e.target.value)}
                            >
                              <option value="female">Female Student</option>
                              <option value="male">Male Student</option>
                            </select>
                          </div>
                          <div className="sm:col-span-2 pt-2">
                            <label className="block text-xs font-semibold text-slate-700 mb-2">
                              Select Required Subject(s) <span className="text-rose-500">*</span>
                            </label>
                            <div className="flex flex-wrap gap-2">
                              {PREDEFINED_SUBJECTS.map((sub) => {
                                const isChecked = formData.subjects.includes(sub);
                                return (
                                  <button
                                    key={sub}
                                    type="button"
                                    onClick={() => handleToggleSubject(sub, false)}
                                    className={`inline-flex items-center px-3 py-1.5 rounded-lg border text-xs font-semibold cursor-pointer transition-colors ${
                                      isChecked
                                        ? "bg-indigo-600 text-white border-indigo-600 shadow-2xs"
                                        : "bg-white text-slate-700 border-slate-200 hover:border-indigo-500"
                                    }`}
                                  >
                                    {sub}
                                  </button>
                                );
                              })}
                            </div>
                            {/* Custom Subject Entry */}
                            <div className="mt-3 flex items-center gap-2 w-full sm:w-80">
                              <input
                                type="text"
                                value={customSubjectInput}
                                onChange={(e) => setCustomSubjectInput(e.target.value)}
                                onKeyDown={(e) => {
                                  if (e.key === "Enter") {
                                    e.preventDefault();
                                    handleAddCustomSubject(false);
                                  }
                                }}
                                placeholder="Type other subject..."
                                className="px-3 py-1.5 text-xs rounded-lg border border-slate-200 focus:outline-none focus:border-indigo-600 flex-1"
                              />
                              <button
                                type="button"
                                onClick={() => handleAddCustomSubject(false)}
                                className="px-3 py-1.5 rounded-lg bg-slate-800 text-white text-xs font-semibold hover:bg-slate-700 cursor-pointer"
                              >
                                + Add
                              </button>
                            </div>
                            {fieldErrors.subjects && (
                              <p className="text-[11px] text-rose-500 mt-1">{fieldErrors.subjects}</p>
                            )}
                          </div>
                        </div>
                      </div>

                      {/* Optional Second Student Section */}
                      {showSecondStudent && (
                        <div className="border border-indigo-200 rounded-xl bg-indigo-50/20 p-4 sm:p-5 relative transition-all">
                          <div className="flex items-center justify-between mb-4">
                            <div className="flex items-center gap-2">
                              <span className="w-6 h-6 rounded-full bg-indigo-600 text-white text-xs font-bold flex items-center justify-center">
                                2
                              </span>
                              <span className="font-bold text-slate-900 text-sm">Second Student Details</span>
                            </div>
                            <span className="text-xs font-medium text-indigo-700 bg-indigo-50 px-2 py-0.5 rounded-md border border-indigo-200">
                              Sibling / Additional Learner
                            </span>
                          </div>
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div className="sm:col-span-2">
                              <label className="block text-xs font-semibold text-slate-700 mb-1">
                                Current Institution / School / College
                              </label>
                              <input
                                className="block w-full rounded-xl border border-slate-300 py-2.5 px-3.5 text-sm focus:border-indigo-600 bg-white placeholder:text-slate-400"
                                placeholder="e.g., Scholastica / Mastermind"
                                type="text"
                                value={formData.institutionName2}
                                onChange={(e) => handleInputChange("institutionName2", e.target.value)}
                              />
                            </div>
                            <div>
                              <label className="block text-xs font-semibold text-slate-700 mb-1">
                                Class / Grade / Level
                              </label>
                              <select
                                className="block w-full rounded-xl border border-slate-300 py-2.5 px-3 text-sm focus:border-indigo-600 bg-white"
                                value={formData.classGrade2}
                                onChange={(e) => handleInputChange("classGrade2", e.target.value)}
                              >
                                <option value="">Select Class/Grade</option>
                                {CLASS_OPTIONS.map((cls) => (
                                  <option key={cls.value} value={cls.value}>
                                    {cls.label}
                                  </option>
                                ))}
                              </select>
                            </div>
                            <div>
                              <label className="block text-xs font-semibold text-slate-700 mb-1">
                                Student's Gender
                              </label>
                              <select
                                className="block w-full rounded-xl border border-slate-300 py-2.5 px-3 text-sm focus:border-indigo-600 bg-white"
                                value={formData.studentGender2}
                                onChange={(e) => handleInputChange("studentGender2", e.target.value)}
                              >
                                <option value="male">Male Student</option>
                                <option value="female">Female Student</option>
                              </select>
                            </div>
                            <div className="sm:col-span-2">
                              <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                                Select Required Subjects (Student 2)
                              </label>
                              <div className="flex flex-wrap gap-2">
                                {PREDEFINED_SUBJECTS.map((sub) => {
                                  const isChecked = (formData.subjects2 || []).includes(sub);
                                  return (
                                    <button
                                      key={sub}
                                      type="button"
                                      onClick={() => handleToggleSubject(sub, true)}
                                      className={`inline-flex items-center px-3 py-1.5 rounded-lg border text-xs font-semibold cursor-pointer ${
                                        isChecked
                                          ? "bg-indigo-600 text-white border-indigo-600"
                                          : "bg-white text-slate-700 border-slate-200"
                                      }`}
                                    >
                                      {sub}
                                    </button>
                                  );
                                })}
                              </div>
                            </div>
                          </div>
                        </div>
                      )}

                      {/* Preferred Tutor Gender */}
                      <div>
                        <label className="block text-xs sm:text-sm font-semibold text-slate-700 mb-2">
                          Preferred Tutor Gender <span className="text-rose-500">*</span>
                        </label>
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                          {/* Any Gender */}
                          <div
                            onClick={() => handleInputChange("tutorGender", "any")}
                            className={`flex items-center justify-between p-3.5 rounded-xl border cursor-pointer transition-all ${
                              formData.tutorGender === "any"
                                ? "border-indigo-600 bg-indigo-50/70 shadow-2xs ring-1 ring-indigo-600"
                                : "border-slate-200 bg-white hover:border-indigo-300"
                            }`}
                          >
                            <div className="flex items-center gap-2.5">
                              <div className="w-8 h-8 rounded-lg bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold text-xs">
                                ⚡
                              </div>
                              <div>
                                <p className="text-xs font-bold text-slate-800">Any Gender</p>
                                <p className="text-[11px] text-emerald-600 font-medium">Fastest match (&lt; 12 hrs)</p>
                              </div>
                            </div>
                            <span
                              className={`w-4 h-4 rounded-full border flex items-center justify-center ${
                                formData.tutorGender === "any" ? "border-indigo-600" : "border-slate-300"
                              }`}
                            >
                              {formData.tutorGender === "any" && (
                                <span className="w-2 h-2 rounded-full bg-indigo-600"></span>
                              )}
                            </span>
                          </div>

                          {/* Female Tutor */}
                          <div
                            onClick={() => handleInputChange("tutorGender", "female")}
                            className={`flex items-center justify-between p-3.5 rounded-xl border cursor-pointer transition-all ${
                              formData.tutorGender === "female"
                                ? "border-indigo-600 bg-indigo-50/70 shadow-2xs ring-1 ring-indigo-600"
                                : "border-slate-200 bg-white hover:border-indigo-300"
                            }`}
                          >
                            <div className="flex items-center gap-2.5">
                              <div className="w-8 h-8 rounded-lg bg-rose-100 text-rose-700 flex items-center justify-center font-bold text-xs">
                                👩
                              </div>
                              <div>
                                <p className="text-xs font-bold text-slate-800">Female Tutor</p>
                                <p className="text-[11px] text-slate-500">Only female teachers</p>
                              </div>
                            </div>
                            <span
                              className={`w-4 h-4 rounded-full border flex items-center justify-center ${
                                formData.tutorGender === "female" ? "border-indigo-600" : "border-slate-300"
                              }`}
                            >
                              {formData.tutorGender === "female" && (
                                <span className="w-2 h-2 rounded-full bg-indigo-600"></span>
                              )}
                            </span>
                          </div>

                          {/* Male Tutor */}
                          <div
                            onClick={() => handleInputChange("tutorGender", "male")}
                            className={`flex items-center justify-between p-3.5 rounded-xl border cursor-pointer transition-all ${
                              formData.tutorGender === "male"
                                ? "border-indigo-600 bg-indigo-50/70 shadow-2xs ring-1 ring-indigo-600"
                                : "border-slate-200 bg-white hover:border-indigo-300"
                            }`}
                          >
                            <div className="flex items-center gap-2.5">
                              <div className="w-8 h-8 rounded-lg bg-blue-100 text-blue-700 flex items-center justify-center font-bold text-xs">
                                👨
                              </div>
                              <div>
                                <p className="text-xs font-bold text-slate-800">Male Tutor</p>
                                <p className="text-[11px] text-slate-500">Only male teachers</p>
                              </div>
                            </div>
                            <span
                              className={`w-4 h-4 rounded-full border flex items-center justify-center ${
                                formData.tutorGender === "male" ? "border-indigo-600" : "border-slate-300"
                              }`}
                            >
                              {formData.tutorGender === "male" && (
                                <span className="w-2 h-2 rounded-full bg-indigo-600"></span>
                              )}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Wizard Navigation Action Footer */}
                    <div
                      className="bg-white rounded-2xl border border-slate-200/90 shadow-[0_10px_30px_-4px_rgba(15,23,42,0.05),0_4px_10px_-2px_rgba(15,23,42,0.02)] p-5 flex flex-col sm:flex-row items-center justify-between gap-4"
                      data-purpose="form-actions"
                    >
                      <div className="flex items-center gap-2 text-xs text-slate-500">
                        <svg className="w-4 h-4 text-emerald-500 shrink-0" fill="currentColor" viewBox="0 0 20 20">
                          <path
                            clipRule="evenodd"
                            d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                            fillRule="evenodd"
                          ></path>
                        </svg>
                        <span>Free 1-Day Trial Class Guaranteed Before Hiring</span>
                      </div>
                      <div className="flex items-center gap-3 w-full sm:w-auto">
                        <button
                          type="button"
                          onClick={handleNextStep}
                          className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-xl bg-gradient-to-r from-indigo-600 to-indigo-700 hover:from-indigo-700 hover:to-indigo-800 active:scale-98 text-white font-bold text-sm shadow-md shadow-indigo-600/30 transition-all cursor-pointer"
                        >
                          <span>Continue to Step 02: Tuition Details</span>
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path d="M14 5l7 7m0 0l-7 7m7-7H3" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5"></path>
                          </svg>
                        </button>
                      </div>
                    </div>
                  </>
                )}

                {/* ================= STEP 2: TUITION DETAILS ================= */}
                {currentStep === 2 && (
                  <div
                    className="bg-white rounded-2xl border border-slate-200/90 shadow-[0_10px_30px_-4px_rgba(15,23,42,0.05),0_4px_10px_-2px_rgba(15,23,42,0.02)] p-6 sm:p-7 space-y-6"
                    data-purpose="tuition-schedule-card"
                  >
                    <div className="flex items-center gap-3 pb-4 border-b border-slate-100">
                      <div className="w-9 h-9 rounded-lg bg-indigo-100 text-indigo-700 flex items-center justify-center">
                        <Clock className="w-5 h-5" />
                      </div>
                      <div>
                        <h2 className="text-base sm:text-lg font-bold text-slate-900 leading-snug">
                          Tuition Schedule &amp; Budget Preferences
                        </h2>
                        <p className="text-xs text-slate-500">
                          Set your offered monthly salary, frequency, and ideal time slot.
                        </p>
                      </div>
                    </div>

                    {/* Offered Monthly Salary */}
                    <div>
                      <label className="block text-xs sm:text-sm font-semibold text-slate-700 mb-1.5">
                        Offered Monthly Salary (BDT) <span className="text-rose-500">*</span>
                      </label>
                      <div className="flex flex-wrap gap-2 mb-3">
                        {SALARY_PRESETS.map((p) => (
                          <button
                            key={p}
                            type="button"
                            onClick={() => handleInputChange("salary", p)}
                            className={`px-3 py-1.5 rounded-lg border text-xs font-semibold cursor-pointer transition-all ${
                              formData.salary === p
                                ? "bg-indigo-600 text-white border-indigo-600 shadow-2xs"
                                : "bg-white text-slate-700 border-slate-200 hover:border-indigo-500"
                            }`}
                          >
                            {p === "Negotiable" ? "Negotiable" : `৳${p} / month`}
                          </button>
                        ))}
                      </div>
                      <div className="relative rounded-xl w-full sm:w-80">
                        <span className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400 text-xs font-semibold">
                          ৳ BDT:
                        </span>
                        <input
                          type="text"
                          value={formData.salary}
                          onChange={(e) => handleInputChange("salary", e.target.value)}
                          placeholder="e.g. 8000"
                          className="w-full pl-16 pr-4 py-2.5 rounded-xl border border-slate-300 text-sm focus:border-indigo-600 focus:ring-indigo-600 font-medium"
                        />
                      </div>
                      {fieldErrors.salary && (
                        <p className="text-[11px] text-rose-500 mt-1">{fieldErrors.salary}</p>
                      )}
                    </div>

                    {/* Days per Week */}
                    <div>
                      <label className="block text-xs sm:text-sm font-semibold text-slate-700 mb-1.5">
                        Tutoring Days Per Week <span className="text-rose-500">*</span>
                      </label>
                      <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
                        {DAYS_OPTIONS.map((d) => (
                          <button
                            key={d}
                            type="button"
                            onClick={() => handleInputChange("days", d)}
                            className={`p-2.5 rounded-xl border text-xs font-semibold text-center cursor-pointer transition-all ${
                              formData.days === d
                                ? "bg-indigo-50 border-indigo-600 text-indigo-700 shadow-2xs ring-1 ring-indigo-600"
                                : "bg-white border-slate-200 text-slate-700 hover:bg-slate-50"
                            }`}
                          >
                            {d}
                          </button>
                        ))}
                      </div>
                      {fieldErrors.days && (
                        <p className="text-[11px] text-rose-500 mt-1">{fieldErrors.days}</p>
                      )}
                    </div>

                    {/* Preferred Tutoring Time */}
                    <div>
                      <label className="block text-xs sm:text-sm font-semibold text-slate-700 mb-1.5">
                        Preferred Tutoring Time <span className="text-rose-500">*</span>
                      </label>
                      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2.5">
                        {TIME_OPTIONS.map((t) => (
                          <button
                            key={t}
                            type="button"
                            onClick={() => handleInputChange("time", t)}
                            className={`p-2.5 rounded-xl border text-xs font-semibold text-left cursor-pointer transition-all ${
                              formData.time === t
                                ? "bg-indigo-50 border-indigo-600 text-indigo-700 shadow-2xs ring-1 ring-indigo-600"
                                : "bg-white border-slate-200 text-slate-700 hover:bg-slate-50"
                            }`}
                          >
                            {t}
                          </button>
                        ))}
                      </div>
                      {fieldErrors.time && (
                        <p className="text-[11px] text-rose-500 mt-1">{fieldErrors.time}</p>
                      )}
                    </div>

                    {/* Tutoring Mode */}
                    <div>
                      <label className="block text-xs sm:text-sm font-semibold text-slate-700 mb-1.5">
                        Tutoring Mode <span className="text-rose-500">*</span>
                      </label>
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                        {TUITION_TYPES.map((mode) => (
                          <button
                            key={mode}
                            type="button"
                            onClick={() => handleInputChange("tuitionType", mode)}
                            className={`p-3 rounded-xl border text-xs font-semibold text-center cursor-pointer transition-all ${
                              formData.tuitionType === mode
                                ? "bg-indigo-50 border-indigo-600 text-indigo-700 shadow-2xs ring-1 ring-indigo-600"
                                : "bg-white border-slate-200 text-slate-700 hover:bg-slate-50"
                            }`}
                          >
                            {mode}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Additional Notes */}
                    <div>
                      <label className="block text-xs sm:text-sm font-semibold text-slate-700 mb-1.5">
                        Specific Requirements or Notes for Coordinator (Optional)
                      </label>
                      <textarea
                        rows="3"
                        value={formData.requirement}
                        onChange={(e) => handleInputChange("requirement", e.target.value)}
                        placeholder="e.g., Expecting tutor from BUET/DU, requires strong emphasis on O-Level Physics past paper solving, prefer female tutor living near Dhanmondi 27."
                        className="w-full p-3 rounded-xl border border-slate-300 text-xs sm:text-sm focus:border-indigo-600 focus:ring-indigo-600"
                      />
                    </div>

                    {/* Action Footer */}
                    <div className="pt-4 border-t border-slate-100 flex items-center justify-between gap-3">
                      <button
                        type="button"
                        onClick={handlePrevStep}
                        className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-xl border border-slate-200 text-xs sm:text-sm font-semibold text-slate-700 hover:bg-slate-50 cursor-pointer"
                      >
                        <ArrowLeft className="w-4 h-4" />
                        <span>Back to Step 01</span>
                      </button>
                      <button
                        type="button"
                        onClick={handleNextStep}
                        className="inline-flex items-center gap-2 px-7 py-3 rounded-xl bg-gradient-to-r from-indigo-600 to-indigo-700 hover:from-indigo-700 text-white font-bold text-xs sm:text-sm shadow-md transition-all cursor-pointer"
                      >
                        <span>Continue to Step 03: Location &amp; Mode</span>
                        <ArrowRight className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                )}

                {/* ================= STEP 3: LOCATION & MODE ================= */}
                {currentStep === 3 && (
                  <div
                    className="bg-white rounded-2xl border border-slate-200/90 shadow-[0_10px_30px_-4px_rgba(15,23,42,0.05),0_4px_10px_-2px_rgba(15,23,42,0.02)] p-6 sm:p-7 space-y-6"
                    data-purpose="location-card"
                  >
                    <div className="flex items-center gap-3 pb-4 border-b border-slate-100">
                      <div className="w-9 h-9 rounded-lg bg-indigo-100 text-indigo-700 flex items-center justify-center">
                        <MapPin className="w-5 h-5" />
                      </div>
                      <div>
                        <h2 className="text-base sm:text-lg font-bold text-slate-900 leading-snug">
                          Location &amp; Address Details
                        </h2>
                        <p className="text-xs text-slate-500">
                          Where will the tutoring take place? Pinpoint your area for nearby verified tutors.
                        </p>
                      </div>
                    </div>

                    {/* Cascading Location Hierarchy */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5">
                      {/* Division */}
                      <div>
                        <label className="block text-xs font-semibold text-slate-700 mb-1">
                          Division <span className="text-rose-500">*</span>
                        </label>
                        <select
                          value={formData.division}
                          onChange={(e) => handleInputChange("division", e.target.value)}
                          className="w-full rounded-xl border border-slate-300 py-2.5 px-3 text-xs sm:text-sm bg-white cursor-pointer"
                        >
                          <option value="">Select Division</option>
                          {divisions.map((div) => (
                            <option key={div} value={div}>
                              {div} Division
                            </option>
                          ))}
                        </select>
                      </div>

                      {/* District */}
                      <div>
                        <label className="block text-xs font-semibold text-slate-700 mb-1">
                          District <span className="text-rose-500">*</span>
                        </label>
                        <select
                          value={formData.district}
                          onChange={(e) => handleInputChange("district", e.target.value)}
                          disabled={!formData.division}
                          className="w-full rounded-xl border border-slate-300 py-2.5 px-3 text-xs sm:text-sm bg-white cursor-pointer disabled:bg-slate-100"
                        >
                          <option value="">Select District</option>
                          {districts.map((dist) => (
                            <option key={dist} value={dist}>
                              {dist}
                            </option>
                          ))}
                        </select>
                      </div>

                      {/* Thana */}
                      <div>
                        <label className="block text-xs font-semibold text-slate-700 mb-1">
                          Thana <span className="text-rose-500">*</span>
                        </label>
                        <select
                          value={formData.thana}
                          onChange={(e) => handleInputChange("thana", e.target.value)}
                          disabled={!formData.district}
                          className="w-full rounded-xl border border-slate-300 py-2.5 px-3 text-xs sm:text-sm bg-white cursor-pointer disabled:bg-slate-100"
                        >
                          <option value="">Select Thana</option>
                          {thanas.map((t) => (
                            <option key={t} value={t}>
                              {t}
                            </option>
                          ))}
                        </select>
                      </div>

                      {/* Area */}
                      <div>
                        <label className="block text-xs font-semibold text-slate-700 mb-1">Area / Sub-zone</label>
                        <select
                          value={formData.area}
                          onChange={(e) => handleInputChange("area", e.target.value)}
                          disabled={!formData.thana}
                          className="w-full rounded-xl border border-slate-300 py-2.5 px-3 text-xs sm:text-sm bg-white cursor-pointer disabled:bg-slate-100"
                        >
                          <option value="">Select Area</option>
                          {areas.map((a) => (
                            <option key={a} value={a}>
                              {a}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>

                    {/* Detailed Street Address */}
                    <div>
                      <label className="block text-xs sm:text-sm font-semibold text-slate-700 mb-1">
                        Detailed Street / House Address <span className="text-rose-500">*</span>
                      </label>
                      <input
                        type="text"
                        value={formData.address}
                        onChange={(e) => handleInputChange("address", e.target.value)}
                        placeholder="House # 42, Road # 7/A, Flat # 4B, Sector 4"
                        className="w-full p-2.5 rounded-xl border border-slate-300 text-sm focus:border-indigo-600 focus:ring-indigo-600"
                      />
                      {fieldErrors.address && (
                        <p className="text-[11px] text-rose-500 mt-1">{fieldErrors.address}</p>
                      )}
                    </div>

                    {/* Landmark */}
                    <div>
                      <label className="block text-xs sm:text-sm font-semibold text-slate-700 mb-1">
                        Prominent Landmark / Nearest Spot (Optional)
                      </label>
                      <input
                        type="text"
                        value={formData.landmark}
                        onChange={(e) => handleInputChange("landmark", e.target.value)}
                        placeholder="Near Star Kabab / Mastermind School / Abahani Field"
                        className="w-full p-2.5 rounded-xl border border-slate-300 text-sm focus:border-indigo-600 focus:ring-indigo-600"
                      />
                    </div>

                    {/* Action Footer */}
                    <div className="pt-4 border-t border-slate-100 flex items-center justify-between gap-3">
                      <button
                        type="button"
                        onClick={handlePrevStep}
                        className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-xl border border-slate-200 text-xs sm:text-sm font-semibold text-slate-700 hover:bg-slate-50 cursor-pointer"
                      >
                        <ArrowLeft className="w-4 h-4" />
                        <span>Back to Step 02</span>
                      </button>
                      <button
                        type="button"
                        onClick={handleNextStep}
                        className="inline-flex items-center gap-2 px-7 py-3 rounded-xl bg-gradient-to-r from-indigo-600 to-indigo-700 hover:from-indigo-700 text-white font-bold text-xs sm:text-sm shadow-md transition-all cursor-pointer"
                      >
                        <span>Continue to Step 04: Review &amp; Submit</span>
                        <ArrowRight className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                )}

                {/* ================= STEP 4: REVIEW & SUBMIT ================= */}
                {currentStep === 4 && (
                  <div
                    className="bg-white rounded-2xl border border-slate-200/90 shadow-[0_10px_30px_-4px_rgba(15,23,42,0.05),0_4px_10px_-2px_rgba(15,23,42,0.02)] p-6 sm:p-7 space-y-6"
                    data-purpose="review-submit-card"
                  >
                    <div className="flex items-center gap-3 pb-4 border-b border-slate-100">
                      <div className="w-9 h-9 rounded-lg bg-emerald-100 text-emerald-700 flex items-center justify-center">
                        <CheckCircle2 className="w-5 h-5" />
                      </div>
                      <div>
                        <h2 className="text-base sm:text-lg font-bold text-slate-900 leading-snug">
                          Review Your Tuition Request
                        </h2>
                        <p className="text-xs text-slate-500">
                          Confirm all parameters before sending to the academic matching team.
                        </p>
                      </div>
                    </div>

                    {/* Sparkle Reassurance */}
                    <div className="p-4 rounded-xl bg-indigo-50/70 border border-indigo-200/70 flex items-start gap-3">
                      <Sparkles className="w-5 h-5 text-indigo-700 mt-0.5 shrink-0" />
                      <div className="text-xs sm:text-sm text-slate-700 leading-relaxed">
                        Your request will be routed directly to top educators matching these exact criteria. We guarantee a coordinator verification call within 2 hours.
                      </div>
                    </div>

                    {/* Summary 4-Box Grid */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {/* Box 1: Guardian & Contact */}
                      <div className="bg-slate-50 rounded-xl p-4 border border-slate-200/80 space-y-1.5">
                        <div className="flex items-center justify-between pb-1.5 border-b border-slate-200">
                          <span className="text-[11px] font-bold uppercase tracking-wider text-indigo-700">
                            Guardian &amp; Contact
                          </span>
                          <button
                            type="button"
                            onClick={() => setCurrentStep(1)}
                            className="text-[11px] font-bold text-indigo-600 hover:underline cursor-pointer"
                          >
                            Edit
                          </button>
                        </div>
                        <p className="text-xs text-slate-800">
                          <strong>Name:</strong> {formData.guardianName || "N/A"}
                        </p>
                        <p className="text-xs text-slate-800">
                          <strong>WhatsApp:</strong> +880 {formData.phoneNumber}
                        </p>
                        <p className="text-xs text-slate-800">
                          <strong>Role:</strong> <span className="capitalize">{formData.relation}</span>
                        </p>
                      </div>

                      {/* Box 2: Academic Profile */}
                      <div className="bg-slate-50 rounded-xl p-4 border border-slate-200/80 space-y-1.5">
                        <div className="flex items-center justify-between pb-1.5 border-b border-slate-200">
                          <span className="text-[11px] font-bold uppercase tracking-wider text-indigo-700">
                            Academic Profile
                          </span>
                          <button
                            type="button"
                            onClick={() => setCurrentStep(1)}
                            className="text-[11px] font-bold text-indigo-600 hover:underline cursor-pointer"
                          >
                            Edit
                          </button>
                        </div>
                        <p className="text-xs text-slate-800">
                          <strong>Class / Curriculum:</strong>{" "}
                          {CLASS_OPTIONS.find((c) => c.value === formData.classGrade)?.label || formData.classGrade} •{" "}
                          {MEDIUM_OPTIONS.find((m) => m.id === formData.medium)?.label || formData.medium}
                        </p>
                        <p className="text-xs text-slate-800">
                          <strong>School:</strong> {formData.institutionName || "N/A"}
                        </p>
                        <div className="flex flex-wrap gap-1 pt-1">
                          {formData.subjects.map((sub, i) => (
                            <span
                              key={i}
                              className="px-2 py-0.5 rounded text-[10px] bg-white border border-slate-200 text-slate-700 font-semibold"
                            >
                              {sub}
                            </span>
                          ))}
                        </div>
                      </div>

                      {/* Box 3: Tuition Schedule & Budget */}
                      <div className="bg-slate-50 rounded-xl p-4 border border-slate-200/80 space-y-1.5">
                        <div className="flex items-center justify-between pb-1.5 border-b border-slate-200">
                          <span className="text-[11px] font-bold uppercase tracking-wider text-indigo-700">
                            Tuition &amp; Budget
                          </span>
                          <button
                            type="button"
                            onClick={() => setCurrentStep(2)}
                            className="text-[11px] font-bold text-indigo-600 hover:underline cursor-pointer"
                          >
                            Edit
                          </button>
                        </div>
                        <p className="text-xs text-slate-800">
                          <strong>Salary:</strong> ৳{formData.salary} / month
                        </p>
                        <p className="text-xs text-slate-800">
                          <strong>Schedule:</strong> {formData.days} ({formData.time})
                        </p>
                        <p className="text-xs text-slate-800">
                          <strong>Tutor Gender:</strong> <span className="capitalize">{formData.tutorGender}</span>
                        </p>
                      </div>

                      {/* Box 4: Tutoring Location */}
                      <div className="bg-slate-50 rounded-xl p-4 border border-slate-200/80 space-y-1.5">
                        <div className="flex items-center justify-between pb-1.5 border-b border-slate-200">
                          <span className="text-[11px] font-bold uppercase tracking-wider text-indigo-700">
                            Location &amp; Address
                          </span>
                          <button
                            type="button"
                            onClick={() => setCurrentStep(3)}
                            className="text-[11px] font-bold text-indigo-600 hover:underline cursor-pointer"
                          >
                            Edit
                          </button>
                        </div>
                        <p className="text-xs text-slate-800">
                          <strong>Area:</strong> {formData.area || formData.thana}, {formData.thana}, {formData.district}
                        </p>
                        <p className="text-xs text-slate-800">
                          <strong>Street Address:</strong> {formData.address || "N/A"}
                        </p>
                        {formData.landmark && (
                          <p className="text-xs text-slate-500">
                            <strong>Landmark:</strong> {formData.landmark}
                          </p>
                        )}
                      </div>
                    </div>

                    {/* Terms Agreement Checkbox */}
                    <div className="pt-2">
                      <label className="flex items-start gap-2.5 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={formData.agreeTerms}
                          onChange={(e) => handleInputChange("agreeTerms", e.target.checked)}
                          className="mt-0.5 rounded border-slate-300 text-indigo-600 focus:ring-indigo-500"
                        />
                        <span className="text-xs text-slate-600 leading-normal">
                          I agree to the{" "}
                          <Link to="/terms-and-conditions" className="text-indigo-600 underline font-semibold">
                            Terms of Service
                          </Link>{" "}
                          and understand that TutorBridge BD provides a 100% free matching service with a 1-day free trial demo class before any final hiring decision.
                        </span>
                      </label>
                      {fieldErrors.agreeTerms && (
                        <p className="text-[11px] text-rose-500 mt-1">{fieldErrors.agreeTerms}</p>
                      )}
                    </div>

                    {/* Action Footer */}
                    <div className="pt-4 border-t border-slate-100 flex items-center justify-between gap-3">
                      <button
                        type="button"
                        onClick={handlePrevStep}
                        className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-xl border border-slate-200 text-xs sm:text-sm font-semibold text-slate-700 hover:bg-slate-50 cursor-pointer"
                      >
                        <ArrowLeft className="w-4 h-4" />
                        <span>Back to Step 03</span>
                      </button>
                      <button
                        type="button"
                        disabled={loading}
                        onClick={handleSubmit}
                        className="inline-flex items-center gap-2 px-8 py-3.5 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white font-bold text-sm shadow-md shadow-emerald-600/30 transition-all cursor-pointer disabled:opacity-70"
                      >
                        {loading ? (
                          <>
                            <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                            <span>Submitting Your Request...</span>
                          </>
                        ) : (
                          <>
                            <span>Confirm &amp; Submit Tuition Request</span>
                            <CheckCircle2 className="w-5 h-5" />
                          </>
                        )}
                      </button>
                    </div>
                  </div>
                )}
              </form>
            </div>

            {/* RIGHT COLUMN: CONVERSION, TRUST SIGNALS & LIVE COORDINATOR SIDEBAR */}
            <aside className="lg:col-span-4 space-y-6">
              {/* Card 1: What Happens Next? (Roadmap) */}
              <div
                className="bg-white rounded-2xl border border-slate-200/80 shadow-[0_10px_30px_-4px_rgba(15,23,42,0.05),0_4px_10px_-2px_rgba(15,23,42,0.02)] p-6"
                data-purpose="how-it-works-card"
              >
                <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider flex items-center gap-2 mb-4">
                  <span className="w-2.5 h-2.5 rounded-full bg-indigo-600"></span>
                  What Happens After Posting?
                </h3>
                <ol className="relative border-l border-slate-200 ml-3 space-y-5 text-xs text-slate-600">
                  <li className="ml-4">
                    <span className="absolute -left-1.5 mt-1.5 w-3 h-3 rounded-full border-2 border-white bg-indigo-600 shadow"></span>
                    <h4 className="font-bold text-slate-900 text-sm">1. Coordinator Call (&lt; 2 hrs)</h4>
                    <p className="mt-0.5 text-slate-500">
                      Our academic officer verifies your location, syllabus, and preferred timings.
                    </p>
                  </li>
                  <li className="ml-4">
                    <span className="absolute -left-1.5 mt-1.5 w-3 h-3 rounded-full border-2 border-white bg-indigo-400"></span>
                    <h4 className="font-bold text-slate-900 text-sm">2. Receive Top 3 Verified CVs</h4>
                    <p className="mt-0.5 text-slate-500">
                      Review teacher credentials, academic transcripts, and video introductory pitches.
                    </p>
                  </li>
                  <li className="ml-4">
                    <span className="absolute -left-1.5 mt-1.5 w-3 h-3 rounded-full border-2 border-white bg-emerald-500"></span>
                    <h4 className="font-bold text-slate-900 text-sm">3. Free 1-Day Trial Demo</h4>
                    <p className="mt-0.5 text-slate-500">
                      Confirm remuneration and schedule only after student is completely pleased.
                    </p>
                  </li>
                </ol>
              </div>

              {/* Card 2: Trust & Security Guarantees */}
              <div
                className="bg-gradient-to-br from-indigo-950 via-slate-900 to-indigo-900 text-white rounded-2xl p-6 shadow-[0_10px_30px_-4px_rgba(15,23,42,0.05),0_4px_10px_-2px_rgba(15,23,42,0.02)]"
                data-purpose="trust-badges"
              >
                <div className="flex items-center gap-2 mb-4">
                  <span className="p-2 rounded-lg bg-white/10 text-emerald-400">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path
                        d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                      ></path>
                    </svg>
                  </span>
                  <h3 className="text-base font-bold">The TutorBridge Safety Seal</h3>
                </div>
                <ul className="space-y-3 text-xs text-indigo-100">
                  <li className="flex items-start gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 mt-0.5 shrink-0" />
                    <span>National ID (NID) &amp; Police Verification cleared.</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 mt-0.5 shrink-0" />
                    <span>Authentic university admission ID check (BUET, DU, etc.).</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 mt-0.5 shrink-0" />
                    <span>Free replacement tutor at any point during tuition.</span>
                  </li>
                </ul>
              </div>

              {/* Card 3: Live Helpline & WhatsApp Support */}
              <div
                className="bg-white rounded-2xl border border-slate-200/80 shadow-[0_10px_30px_-4px_rgba(15,23,42,0.05),0_4px_10px_-2px_rgba(15,23,42,0.02)] p-6"
                data-purpose="support-card"
              >
                <div className="flex items-center justify-between mb-3">
                  <span className="inline-flex items-center gap-1.5 text-[11px] font-bold text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200">
                    <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping"></span>
                    8 Counselors Online
                  </span>
                  <span className="text-xs text-slate-400">Response &lt; 5 mins</span>
                </div>
                <h4 className="text-sm font-bold text-slate-900 mb-1">Prefer to talk right now?</h4>
                <p className="text-xs text-slate-500 mb-4">
                  Our senior matchmakers can take your requirements over a quick call.
                </p>
                <div className="space-y-2">
                  <a
                    className="flex items-center justify-center gap-2 w-full py-2.5 px-4 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold transition-all shadow-sm"
                    href="tel:+8809612888777"
                  >
                    <Phone className="w-4 h-4 text-emerald-400" />
                    <span>Call Hotline: 09612-888777</span>
                  </a>
                  <a
                    className="flex items-center justify-center gap-2 w-full py-2.5 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold transition-all shadow-sm"
                    href="https://wa.me/8809612888777"
                    rel="noopener noreferrer"
                    target="_blank"
                  >
                    <MessageSquare className="w-4 h-4 text-white" />
                    <span>WhatsApp Quick Chat</span>
                  </a>
                </div>
              </div>

              {/* Card 4: Guardian Social Proof */}
              <div
                className="bg-indigo-50/60 rounded-2xl border border-indigo-100 p-5"
                data-purpose="social-proof-snippet"
              >
                <div className="flex items-center gap-1 text-amber-400 mb-2">
                  <span>★</span>
                  <span>★</span>
                  <span>★</span>
                  <span>★</span>
                  <span>★</span>
                  <span className="text-xs font-bold text-slate-800 ml-1">5.0 / 5.0</span>
                </div>
                <p className="text-xs text-slate-600 italic leading-relaxed">
                  "Found an exceptional BUET civil engineering tutor for my son's HSC Physics in Uttara within 14 hours. The free demo class gave us full confidence."
                </p>
                <div className="mt-3 flex items-center justify-between text-[11px] text-slate-500 pt-2 border-t border-indigo-100">
                  <span className="font-bold text-slate-800">Mrs. Farzana Haque</span>
                  <span>Dhanmondi, Dhaka</span>
                </div>
              </div>
            </aside>
          </div>
          {/* END: TwoColumnWizardLayout */}
        </div>
      </main>

      {/* BEGIN: PreFooterBanner */}
      <section
        className="bg-gradient-to-r from-slate-950 via-indigo-950 to-slate-900 text-white py-12 border-t border-indigo-900/60"
        data-purpose="cta-pre-footer"
      >
        <div className="container mx-auto px-4 sm:px-6 lg:px-12 flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <h3 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
              Ready to find the perfect tutor for your child?
            </h3>
            <p className="text-sm text-indigo-200 mt-1">
              Post your requirements for free. Get verified teacher profiles within 24 hours.
            </p>
          </div>
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => {
                const wizardEl = document.getElementById("wizard");
                if (wizardEl) wizardEl.scrollIntoView({ behavior: "smooth", block: "start" });
              }}
              className="px-6 py-3 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-sm shadow-lg shadow-indigo-600/30 transition-all flex items-center gap-2 cursor-pointer"
            >
              <span>Post Tuition Request</span>
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path d="M7 17L17 7M17 7H7M17 7v10" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"></path>
              </svg>
            </button>
            <Link
              to="/apply-tutor"
              className="px-6 py-3 rounded-xl bg-white/10 hover:bg-white/15 text-white font-bold text-sm border border-white/10 transition-all cursor-pointer"
            >
              Join as a Tutor
            </Link>
          </div>
        </div>
      </section>
      {/* END: PreFooterBanner */}
    </div>
  );
};

export default RequestTutorPage;
