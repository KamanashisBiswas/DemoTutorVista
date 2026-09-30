import React, { useState } from "react";
import {
  MapPin,
  Clock,
  BookOpen,
  CalendarDays,
  GraduationCap,
  User,
  ArrowRight,
  Users,
  Laptop,
  CheckCircle2,
  Calendar,
} from "lucide-react";
import ApplyTutorModal from "./ApplyTutorModal";
import ApiService from "../services/api";
import { toast } from "react-toastify";
import { Card } from "./ui/Card";
import { Button } from "./ui/Button";
import { SkeletonCard } from "./ui/Skeleton";

const TuitionRequestCard = ({ request }) => {
  const [showModal, setShowModal] = useState(false);
  const [modalForm, setModalForm] = useState({
    number: "",
    name: "",
    salary: "",
    tutorId: "",
  });

  const handleApplyClick = (e) => {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }
    setShowModal(true);
  };
  const handleModalClose = () => setShowModal(false);
  const handleModalSubmit = async (form) => {
    try {
      const payload = {
        requestTutorId: request._id,
        tutorId: form.tutorId,
        expectedSalary: form.salary,
      };

      const res = await ApiService.applyForTuitionJob(payload);
      if (res.success) {
        toast.success("Application submitted successfully!");
      } else {
        toast.error(res.message || "Failed to submit application.");
      }
    } catch (err) {
      toast.error(
        err.response?.data?.message || "Failed to apply for this tuition job."
      );
    }
    setShowModal(false);
  };

  if (!request) {
    return <SkeletonCard />;
  }

  const locationParts = [request.adminDivision || request.division, request.adminArea || request.area].filter(
    Boolean
  );

  const allSubjects = [
    ...(request.subjects || []),
    ...(request.multipleStudent && request.subjects2 ? request.subjects2 : []),
  ];

  const allMediums = [
    ...(request.medium ? [request.medium] : []),
    ...(request.multipleStudent && request.medium2 ? [request.medium2] : []),
  ];

  const formattedDate = request.createdAt
    ? new Date(request.createdAt).toLocaleDateString("en-GB", {
        day: "numeric",
        month: "short",
      })
    : "Recently";

  const tuitionTitle = `Tuition for ${request.grade || request.class || "Student"}`;

  return (
    <Card
      hoverable
      className="bg-white border-[#E4E6EE] p-5 flex flex-col justify-between h-full transition-all duration-200 hover:shadow-card hover:border-[#3730E0]/30"
    >
      <div>
        {/* Card Top: Class Badge, Mediums, and Status */}
        <div className="flex items-start justify-between gap-2 mb-3">
          <div className="flex flex-wrap items-center gap-1.5">
            <span className="px-2.5 py-1 rounded-md text-xs font-bold bg-[#EEEDFD] text-[#3730E0] border border-[#DDD9FC]">
              {request.grade || request.class || "Tuition Job"}
            </span>
            {request.multipleStudent && (
              <span className="px-2 py-0.5 rounded-md text-[11px] font-semibold bg-[#F0FDFA] text-[#0EA5A0] border border-[#CCFBF1] flex items-center gap-1">
                <Users className="w-3 h-3" />
                <span>2 Students</span>
              </span>
            )}
            {allMediums.map((med, idx) => (
              <span
                key={idx}
                className="px-2 py-0.5 rounded-md text-[11px] font-medium bg-[#F7F8FB] text-[#5B5F73] border border-[#E4E6EE]"
              >
                {med}
              </span>
            ))}
          </div>

          <div className="flex items-center gap-1.5">
            <span className="text-[11px] font-semibold text-[#16A34A] bg-[#DCFCE7] px-2 py-0.5 rounded-full shrink-0 flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-[#16A34A] animate-pulse" />
              Open
            </span>
          </div>
        </div>

        {/* Title & Institution / Class Info */}
        <div className="mb-3">
          <h4 className="text-base font-bold text-[#1A1D29] tracking-tight line-clamp-1">
            {tuitionTitle}
          </h4>
          <div className="flex items-center gap-2 mt-1 text-xs text-[#5B5F73]">
            {request.institution && (
              <span className="flex items-center gap-1 line-clamp-1">
                <GraduationCap className="w-3.5 h-3.5 text-[#3730E0] shrink-0" />
                <span className="truncate">{request.institution}</span>
              </span>
            )}
            <span className="text-[11px] text-[#5B5F73]/70 flex items-center gap-1">
              <Calendar className="w-3 h-3" />
              {formattedDate}
            </span>
          </div>
        </div>

        {/* Subjects Tags */}
        <div className="mb-3.5">
          <div className="flex items-center gap-1 text-[11px] font-semibold uppercase tracking-wider text-[#5B5F73] mb-1.5">
            <BookOpen className="w-3.5 h-3.5 text-[#3730E0]" />
            <span>Subjects</span>
          </div>
          <div className="flex flex-wrap gap-1.5">
            {allSubjects.slice(0, 5).map((subj, idx) => (
              <span
                key={idx}
                className="px-2 py-0.5 rounded-md text-xs bg-[#F7F8FB] text-[#1A1D29] border border-[#E4E6EE] font-medium"
              >
                {subj}
              </span>
            ))}
            {allSubjects.length > 5 && (
              <span className="px-1.5 py-0.5 rounded-md text-[11px] text-[#5B5F73] font-medium">
                +{allSubjects.length - 5} more
              </span>
            )}
          </div>
        </div>

        {/* Details Grid */}
        <div className="grid grid-cols-2 gap-2.5 py-3 border-y border-[#E4E6EE] mb-4 text-xs">
          <div className="space-y-0.5">
            <span className="text-[11px] text-[#5B5F73] flex items-center gap-1 font-medium">
              <CalendarDays className="w-3 h-3 text-[#3730E0]" />
              Schedule
            </span>
            <p className="font-semibold text-[#1A1D29] truncate">
              {request.days || "Negotiable"}
            </p>
          </div>
          <div className="space-y-0.5">
            <span className="text-[11px] text-[#5B5F73] flex items-center gap-1 font-medium">
              <Clock className="w-3 h-3 text-[#3730E0]" />
              Time
            </span>
            <p className="font-semibold text-[#1A1D29] truncate">
              {request.time || "Negotiable"}
            </p>
          </div>
          <div className="space-y-0.5">
            <span className="text-[11px] text-[#5B5F73] flex items-center gap-1 font-medium">
              <Laptop className="w-3 h-3 text-[#0EA5A0]" />
              Teaching Mode
            </span>
            <p className="font-semibold text-[#1A1D29] truncate">
              Home Tutoring
            </p>
          </div>
          <div className="space-y-0.5">
            <span className="text-[11px] text-[#5B5F73] flex items-center gap-1 font-medium">
              <MapPin className="w-3 h-3 text-[#3730E0]" />
              Location
            </span>
            <p className="font-semibold text-[#1A1D29] truncate">
              {locationParts.length > 0 ? locationParts.join(", ") : "Bangladesh"}
            </p>
          </div>
        </div>
      </div>

      {/* Salary & CTA Button */}
      <div className="flex items-center justify-between gap-3 pt-1">
        <div>
          <span className="block text-[10px] text-[#5B5F73] uppercase font-medium">
            Offered Remuneration
          </span>
          <span className="text-base sm:text-lg font-extrabold text-[#1A1D29]">
            ৳{request.salary}
            <span className="text-xs font-normal text-[#5B5F73]">/mo</span>
          </span>
        </div>

        <Button
          variant="primary"
          size="sm"
          onClick={handleApplyClick}
          iconRight={ArrowRight}
          className="text-xs font-semibold px-4"
        >
          Apply Now
        </Button>
      </div>

      <ApplyTutorModal
        isOpen={showModal}
        onClose={handleModalClose}
        onSubmit={handleModalSubmit}
        form={modalForm}
        setForm={setModalForm}
      />
    </Card>
  );
};

export default TuitionRequestCard;
