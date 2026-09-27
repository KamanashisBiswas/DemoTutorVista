import React, { useState, useMemo, useEffect, useRef } from "react";
import locationData from "../assets/data/address.json";
import axios from "../lib/axios";
import { toast } from "react-toastify";
import Button from "../components/Common/Button";
import RequestTutorHeader from "../components/RequestTutor/RequestTutorHeader";
import StudentInfoForm from "../components/RequestTutor/StudentInfoForm";
import TuitionDetailsForm from "../components/RequestTutor/TuitionDetailsForm";
import AddressForm from "../components/RequestTutor/AddressForm";

const RequestTutorPage = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
    // GTM: Push request_tutor event on page visit
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({
      event: "request_tutor",
    });
  }, []);

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
      setFieldErrors((prev) => {
        const newErrors = { ...prev };
        Object.keys(newErrors).forEach((key) => {
          if (key.startsWith("educationalDetails[1]")) {
            delete newErrors[key];
          }
        });
        return newErrors;
      });
    }
  };

  const handleSubjectChange = (studentIndex, newSubjects) => {
    const newEducationalDetails = [...formData.educationalDetails];
    newEducationalDetails[studentIndex].subjects = newSubjects;
    setFormData((prev) => ({
      ...prev,
      educationalDetails: newEducationalDetails,
    }));
    setFieldErrors((prev) => {
      const newErrors = { ...prev };
      delete newErrors[`educationalDetails[${studentIndex}].subjects`];
      return newErrors;
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFieldErrors({});

    if (!formData.agreeTerms) {
      toast.warn("You must agree to terms and conditions");
      setFieldErrors((prev) => ({
        ...prev,
        agreeTerms: "You must agree to terms and conditions",
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
      const res = await axios.post("/api/request-tutor", payload);
      toast.success(res.data.message || "Request submitted successfully!");

      // GTM: Push tutor_request_Submit event on successful submission
      window.dataLayer = window.dataLayer || [];
      window.dataLayer.push({
        event: "tutor_request_Submit",
        transaction_id: res.data.requestId || `TUTOR_REQ_${Date.now()}`,
      });

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
      setShowSecondStudent(false);
      setFieldErrors({});
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

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 py-6 sm:py-12 font-dmsans">
      <div className="w-full mx-auto px-4 sm:px-6 lg:px-20 xl:px-40 2xl:px-80">
        <RequestTutorHeader />

        <form
          onSubmit={handleSubmit}
          className="bg-[#C1D7FC] rounded-2xl shadow-xl p-6 md:p-8 lg:p-12 animate-fade-in-up"
        >
          <h2 className="text-2xl font-semibold text-gray-800 mb-8 text-center">
            Student Information
          </h2>

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

          <TuitionDetailsForm
            formData={formData}
            handleInputChange={handleInputChange}
            fieldErrors={fieldErrors}
            fieldRefs={fieldRefs}
          />

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

          <div className="space-y-6">
            <div className="flex items-start">
              <input
                type="checkbox"
                checked={formData.agreeTerms}
                onChange={(e) =>
                  handleInputChange("agreeTerms", e.target.checked)
                }
                className={`mt-1 w-4 h-4 ${
                  fieldErrors.agreeTerms
                    ? "text-red-600 border-red-500 focus:ring-red-500"
                    : "text-blue-600 border-gray-300 focus:ring-blue-500"
                } rounded`}
              />
              <label
                className={`ml-3 text-sm font-medium ${
                  fieldErrors.agreeTerms ? "text-red-600" : "text-gray-700"
                }`}
              >
                I agree to the terms and conditions and privacy policy.
              </label>
            </div>
            {fieldErrors.agreeTerms && (
              <p className="text-sm text-red-600 mt-1">
                {fieldErrors.agreeTerms}
              </p>
            )}
            <div className="text-center">
              <Button type="submit" disabled={loading}>
                {loading ? "Submitting..." : "Submit Request"}
              </Button>
            </div>
          </div>
        </form>
      </div>
      <style>{`@keyframes fade-in-down{from{opacity:0;transform:translateY(-20px)}to{opacity:1;transform:translateY(0)}}@keyframes fade-in-up{from{opacity:0;transform:translateY(20px)}to{opacity:1;transform:translateY(0)}}.animate-fade-in-down{animation:fade-in-down .6s ease-out}.animate-fade-in-up{animation:fade-in-up .8s ease-out}`}</style>
    </div>
  );
};

export default RequestTutorPage;
