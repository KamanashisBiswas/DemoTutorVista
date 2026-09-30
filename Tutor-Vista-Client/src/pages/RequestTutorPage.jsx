import React, { useState, useMemo, useEffect, useRef } from "react";
import locationData from "../assets/data/address.json";
import ApiService from "../services/api";
import { toast } from "react-toastify";
import Button from "../components/Common/Button";
import RequestTutorHeader from "../components/RequestTutor/RequestTutorHeader";
import StudentInfoForm from "../components/RequestTutor/StudentInfoForm";
import TuitionDetailsForm from "../components/RequestTutor/TuitionDetailsForm";
import AddressForm from "../components/RequestTutor/AddressForm";
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
} from "lucide-react";

const STEPS = [
  { id: 1, title: "Student & Class", icon: User },
  { id: 2, title: "Tuition Details", icon: BookOpen },
  { id: 3, title: "Location", icon: MapPin },
  { id: 4, title: "Review & Submit", icon: CheckCircle2 },
];

const RequestTutorPage = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({
      event: "request_tutor",
    });
  }, []);

  const [currentStep, setCurrentStep] = useState(1);
  const [submittedSuccess, setSubmittedSuccess] = useState(false);
  const [submissionId, setSubmissionId] = useState("");

  const initialEducationalDetail = {
    institution: "",
    medium: "",
    curriculum: "",
    grade: "",
    subjects: [],
  };

  const [formData, setFormData] = useState({
    studentName: "",
    phoneNo: "",
    gender: "Male",
    studentNumber: 1,
    educationalDetails: [initialEducationalDetail],
    salary: "",
    days: "",
    time: "",
    requirement: "",
    division: "",
    district: "",
    thana: "",
    area: "",
    address: "",
    agreeTerms: false,
  });

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
    address: useRef(null),
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
        "AS",
        "A2",
      ];
    } else if (
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
    } else if (medium === "University Level") {
      return ["1st Year", "2nd Year", "3rd Year", "4th Year", "Masters", "PhD"];
    } else if (medium === "Admission Preparation") {
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

  const divisions = useMemo(
    () => locationData.divisions.map((d) => d.division.name_en),
    []
  );
  const districts = useMemo(() => {
    if (!formData.division) return [];
    const selected = locationData.divisions.find(
      (d) => d.division.name_en === formData.division
    );
    return selected ? selected.districts.map((dist) => dist.name_en) : [];
  }, [formData.division]);
  const thanas = useMemo(() => {
    if (!formData.division || !formData.district) return [];
    const selectedDiv = locationData.divisions.find(
      (d) => d.division.name_en === formData.division
    );
    const selectedDist = selectedDiv?.districts.find(
      (d) => d.name_en === formData.district
    );
    return selectedDist ? selectedDist.thanas.map((t) => t.name_en) : [];
  }, [formData.division, formData.district]);
  const areas = useMemo(() => {
    if (!formData.division || !formData.district || !formData.thana) return [];
    const selectedDiv = locationData.divisions.find(
      (d) => d.division.name_en === formData.division
    );
    const selectedDist = selectedDiv?.districts.find(
      (d) => d.name_en === formData.district
    );
    const selectedThana = selectedDist?.thanas.find(
      (t) => t.name_en === formData.thana
    );
    return selectedThana ? selectedThana.areas.map((a) => a.name_en) : [];
  }, [formData.division, formData.district, formData.thana]);

  const handleInputChange = (field, value) => {
    setFieldErrors((prev) => ({ ...prev, [field]: undefined }));
    const cascadingResets = {
      division: { district: "", thana: "", area: "" },
      district: { thana: "", area: "" },
      thana: { area: "" },
    };
    if (cascadingResets[field]) {
      setFormData((prev) => ({
        ...prev,
        [field]: value,
        ...cascadingResets[field],
      }));
    } else {
      setFormData((prev) => ({ ...prev, [field]: value }));
    }
  };

  const handleEducationalDetailChange = (index, field, value) => {
    const newEducationalDetails = [...formData.educationalDetails];
    newEducationalDetails[index][field] = value;
    const errorFieldName = `${field}${index > 0 ? "2" : ""}`;
    setFieldErrors((prev) => ({ ...prev, [errorFieldName]: undefined }));

    if (field === "medium") {
      newEducationalDetails[index].curriculum = "";
      newEducationalDetails[index].grade = "";
      if (value === "English Medium") {
        newEducationalDetails[index].subjects = [];
      }
    } else if (field === "curriculum") {
      newEducationalDetails[index].grade = "";
    }

    setFormData((prev) => ({
      ...prev,
      educationalDetails: newEducationalDetails,
    }));
  };

  const handleToggleSecondStudent = () => {
    const isShowing = !showSecondStudent;
    setShowSecondStudent(isShowing);

    if (isShowing) {
      setFormData((prev) => ({
        ...prev,
        studentNumber: 2,
        educationalDetails: [
          ...prev.educationalDetails,
          initialEducationalDetail,
        ],
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        studentNumber: 1,
        educationalDetails: prev.educationalDetails.slice(0, 1),
      }));
    }
  };

  const handleSubjectChange = (studentIndex, newSubjects) => {
    const newEducationalDetails = [...formData.educationalDetails];
    newEducationalDetails[studentIndex].subjects = newSubjects;
    setFormData((prev) => ({
      ...prev,
      educationalDetails: newEducationalDetails,
    }));
  };

  // Step 1 Validation
  const validateStep1 = () => {
    const errors = {};
    if (!formData.studentName.trim() || formData.studentName.trim().length < 2)
      errors.studentName = "Please enter student name.";
    if (!formData.phoneNo || !/^01[3-9]\d{8}$/.test(formData.phoneNo))
      errors.phoneNo = "Enter a valid Bangladeshi phone number (e.g. 01XXXXXXXXX).";
    if (!formData.educationalDetails[0]?.medium)
      errors.medium = "Please select curriculum/medium.";
    if (!formData.educationalDetails[0]?.grade)
      errors.grade = "Please select class/grade.";
    if (!formData.educationalDetails[0]?.subjects?.length)
      errors.subjects = "Please select at least one subject.";
    return errors;
  };

  // Step 2 Validation
  const validateStep2 = () => {
    const errors = {};
    if (!formData.salary.trim())
      errors.salary = "Please specify offered monthly salary.";
    if (!formData.days.trim())
      errors.days = "Please select number of days per week.";
    if (!formData.time.trim())
      errors.time = "Please select preferred tutoring time.";
    return errors;
  };

  // Step 3 Validation
  const validateStep3 = () => {
    const errors = {};
    if (!formData.division) errors.division = "Please select your division.";
    if (!formData.district) errors.district = "Please select your district.";
    if (!formData.thana) errors.thana = "Please select your thana.";
    if (!formData.area) errors.area = "Please select your area.";
    if (!formData.address.trim())
      errors.address = "Please provide detailed street/house address.";
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
    setFieldErrors({});

    if (!formData.agreeTerms) {
      toast.warn("Please agree to the Terms & Conditions.");
      setFieldErrors((prev) => ({
        ...prev,
        agreeTerms: "You must agree to terms and conditions to submit.",
      }));
      return;
    }

    setLoading(true);

    const payload = {
      ...formData,
      institution: formData.educationalDetails[0]?.institution || "",
      medium: formData.educationalDetails[0]?.medium || "",
      curriculum: formData.educationalDetails[0]?.curriculum || "",
      grade: formData.educationalDetails[0]?.grade || "",
      subjects: formData.educationalDetails[0]?.subjects || [],
      multipleStudent: showSecondStudent,
    };

    if (showSecondStudent && formData.educationalDetails[1]) {
      payload.institution2 = formData.educationalDetails[1].institution || "";
      payload.medium2 = formData.educationalDetails[1].medium || "";
      payload.curriculum2 = formData.educationalDetails[1].curriculum || "";
      payload.grade2 = formData.educationalDetails[1].grade || "";
      payload.subjects2 = formData.educationalDetails[1].subjects || [];
    }

    delete payload.educationalDetails;

    try {
      const res = await ApiService.createTuitionRequest(payload);
      toast.success(res.message || "Tuition request submitted successfully!");

      const reqId = res.requestId || res.data?.request?.id || `TV-REQ-${Date.now().toString().slice(-6)}`;
      setSubmissionId(reqId);
      setSubmittedSuccess(true);

      window.dataLayer = window.dataLayer || [];
      window.dataLayer.push({
        event: "tutor_request_Submit",
        transaction_id: reqId,
      });

      window.scrollTo({ top: 0, behavior: "smooth" });
    } catch (error) {
      const apiErrors = {};
      if (error.response?.data?.errors) {
        error.response.data.errors.forEach((err) => {
          if (err.field) apiErrors[err.field] = err.message;
        });
        setFieldErrors(apiErrors);
        toast.error(
          error.response.data.errors[0]?.message ||
            "Please check the form for errors."
        );
      } else {
        toast.error(
          error.response?.data?.message ||
            "Something went wrong. Please try again."
        );
      }
    } finally {
      setLoading(false);
    }
  };

  // Success Confirmation View
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
                Tuition Request Submitted!
              </h2>
              <p className="text-sm text-[#5B5F73] max-w-md mx-auto">
                We have received your requirement. A dedicated TutorVista academic coordinator will contact you to match the best tutor.
              </p>
            </div>

            <div className="bg-[#F7F8FB] border border-[#E4E6EE] rounded-xl p-4 max-w-sm mx-auto">
              <span className="text-xs text-[#5B5F73]">Request Reference Code</span>
              <p className="text-base font-bold text-[#3730E0]">{submissionId}</p>
            </div>

            {/* Guardian Guarantees */}
            <div className="text-left bg-white border border-[#E4E6EE] rounded-xl p-5 space-y-3">
              <h4 className="text-xs font-bold uppercase tracking-wider text-[#1A1D29]">
                Guardian Protection & Service Timeline
              </h4>
              <ul className="space-y-2.5 text-xs sm:text-sm text-[#5B5F73]">
                <li className="flex items-start gap-2">
                  <PhoneCall className="w-4 h-4 text-[#3730E0] mt-0.5 shrink-0" />
                  <span>Our coordinator will call you within 24 hours to confirm tutor preferences.</span>
                </li>
                <li className="flex items-start gap-2">
                  <ShieldCheck className="w-4 h-4 text-[#16A34A] mt-0.5 shrink-0" />
                  <span>2 Free Demo Classes are guaranteed before making any payment.</span>
                </li>
                <li className="flex items-start gap-2">
                  <Calendar className="w-4 h-4 text-[#0EA5A0] mt-0.5 shrink-0" />
                  <span>Free tutor replacement guarantee anytime if not fully satisfied.</span>
                </li>
              </ul>
            </div>

            <div className="pt-2 flex flex-col sm:flex-row gap-3 justify-center">
              <a href="/find-tutors">
                <Button variant="primary" size="md" iconRight={ArrowRight}>
                  Explore Verified Tutors
                </Button>
              </a>
              <Button
                variant="secondary"
                size="md"
                onClick={() => {
                  setSubmittedSuccess(false);
                  setCurrentStep(1);
                  setFormData({
                    studentName: "",
                    phoneNo: "",
                    gender: "Male",
                    studentNumber: 1,
                    educationalDetails: [initialEducationalDetail],
                    salary: "",
                    days: "",
                    time: "",
                    requirement: "",
                    division: "",
                    district: "",
                    thana: "",
                    area: "",
                    address: "",
                    agreeTerms: false,
                  });
                }}
              >
                Submit Another Request
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
        <RequestTutorHeader />

        {/* Multi-Step Stepper Bar */}
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
        <form
          onSubmit={handleSubmit}
          className="bg-white rounded-2xl shadow-card border border-[#E4E6EE] p-6 sm:p-10"
        >
          <div className="mb-6 pb-4 border-b border-[#E4E6EE] flex items-center justify-between">
            <div>
              <span className="text-[11px] font-bold text-[#3730E0] uppercase tracking-wider">
                Step 0{currentStep} of 04
              </span>
              <h2 className="text-xl sm:text-2xl font-bold text-[#1A1D29] mt-0.5">
                {STEPS[currentStep - 1].title}
              </h2>
            </div>
            <span className="text-xs text-[#5B5F73] bg-[#F7F8FB] px-3 py-1.5 rounded-full border border-[#E4E6EE]">
              Guardian Portal
            </span>
          </div>

          {/* Step 1: Student Information */}
          {currentStep === 1 && (
            <StudentInfoForm
              formData={formData}
              handleInputChange={handleInputChange}
              fieldErrors={fieldErrors}
              fieldRefs={fieldRefs}
              showSecondStudent={showSecondStudent}
              handleToggleSecondStudent={handleToggleSecondStudent}
              handleEducationalDetailChange={handleEducationalDetailChange}
              handleSubjectChange={handleSubjectChange}
              mediumOptions={mediumOptions}
              curriculumOptions={curriculumOptions}
              getGradeOptions={getGradeOptions}
            />
          )}

          {/* Step 2: Tuition Details & Schedule */}
          {currentStep === 2 && (
            <TuitionDetailsForm
              formData={formData}
              handleInputChange={handleInputChange}
              fieldErrors={fieldErrors}
              fieldRefs={fieldRefs}
            />
          )}

          {/* Step 3: Location Details */}
          {currentStep === 3 && (
            <AddressForm
              formData={formData}
              handleInputChange={handleInputChange}
              fieldErrors={fieldErrors}
              fieldRefs={fieldRefs}
              divisions={divisions}
              districts={districts}
              thanas={thanas}
              areas={areas}
            />
          )}

          {/* Step 4: Review & Submit */}
          {currentStep === 4 && (
            <div className="space-y-6">
              <div className="p-4 rounded-xl bg-[#EEEDFD]/50 border border-[#DDD9FC] flex items-start gap-3">
                <Sparkles className="w-5 h-5 text-[#3730E0] mt-0.5 shrink-0" />
                <div className="text-xs sm:text-sm text-[#1A1D29] leading-relaxed">
                  Please review your tuition requirements below. Once submitted, we will match verified tutors matching these exact criteria.
                </div>
              </div>

              {/* Requirement Summary Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="bg-[#F7F8FB] border border-[#E4E6EE] rounded-xl p-4 space-y-2">
                  <div className="flex items-center justify-between pb-2 border-b border-[#E4E6EE]">
                    <h4 className="text-xs font-bold uppercase text-[#3730E0]">Student Details</h4>
                    <button
                      type="button"
                      onClick={() => setCurrentStep(1)}
                      className="text-[11px] font-semibold text-[#3730E0] hover:underline"
                    >
                      Edit
                    </button>
                  </div>
                  <p className="text-sm font-bold text-[#1A1D29]">{formData.studentName}</p>
                  <p className="text-xs text-[#5B5F73]">
                    {formData.educationalDetails[0]?.grade || "Grade N/A"} • {formData.educationalDetails[0]?.medium}
                  </p>
                  <div className="flex flex-wrap gap-1 pt-1">
                    {(formData.educationalDetails[0]?.subjects || []).map((sub, i) => (
                      <span key={i} className="px-2 py-0.5 rounded text-[11px] bg-white border border-[#E4E6EE] text-[#1A1D29]">
                        {sub}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="bg-[#F7F8FB] border border-[#E4E6EE] rounded-xl p-4 space-y-2">
                  <div className="flex items-center justify-between pb-2 border-b border-[#E4E6EE]">
                    <h4 className="text-xs font-bold uppercase text-[#3730E0]">Tuition & Location</h4>
                    <button
                      type="button"
                      onClick={() => setCurrentStep(2)}
                      className="text-[11px] font-semibold text-[#3730E0] hover:underline"
                    >
                      Edit
                    </button>
                  </div>
                  <p className="text-xs text-[#1A1D29] font-semibold">
                    Offered Salary: ৳{formData.salary} / month
                  </p>
                  <p className="text-xs text-[#5B5F73]">
                    Schedule: {formData.days} • {formData.time}
                  </p>
                  <p className="text-xs text-[#5B5F73]">
                    Location: {formData.area}, {formData.thana}, {formData.district}
                  </p>
                </div>
              </div>

              {/* Terms Checkbox */}
              <div className="pt-2">
                <div className="flex items-start">
                  <input
                    type="checkbox"
                    id="agreeTermsCheckbox"
                    checked={formData.agreeTerms}
                    onChange={(e) =>
                      handleInputChange("agreeTerms", e.target.checked)
                    }
                    className={`mt-0.5 w-4 h-4 rounded text-[#3730E0] focus:ring-[#3730E0] ${
                      fieldErrors.agreeTerms
                        ? "border-[#DC2626]"
                        : "border-[#E4E6EE]"
                    }`}
                  />
                  <label
                    htmlFor="agreeTermsCheckbox"
                    className={`ml-2.5 text-xs sm:text-sm cursor-pointer select-none ${
                      fieldErrors.agreeTerms ? "text-[#DC2626] font-medium" : "text-[#5B5F73]"
                    }`}
                  >
                    I agree to the{" "}
                    <a href="/terms-and-conditions" target="_blank" rel="noopener noreferrer" className="text-[#3730E0] underline font-medium">
                      Terms & Conditions
                    </a>{" "}
                    and{" "}
                    <a href="/privacy-policy" target="_blank" rel="noopener noreferrer" className="text-[#3730E0] underline font-medium">
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
                disabled={loading}
                isLoading={loading}
                className="px-8 font-semibold"
              >
                {loading ? "Submitting..." : "Submit Tuition Request"}
              </Button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};

export default RequestTutorPage;
