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
} from "lucide-react";
import ApplyTutorModal from "./ApplyTutorModal";
import axios from "../lib/axios";
import { toast } from "react-toastify";
import { Card } from "./ui/Card";
import { Button } from "./ui/Button";
import { Badge } from "./ui/Badge";
import { SkeletonCard } from "./ui/Skeleton";

const TuitionRequestCard = ({ request }) => {
  const [showModal, setShowModal] = useState(false);
  const [modalForm, setModalForm] = useState({
    number: "",
    name: "",
    salary: "",
    tutorId: "",
  });

  const handleApplyClick = () => setShowModal(true);
  const handleModalClose = () => setShowModal(false);
  const handleModalSubmit = async (form) => {
    try {
      const payload = {
        requestTutorId: request._id,
        tutorId: form.tutorId,
        expectedSalary: form.salary,
      };

      const res = await axios.post("/api/applied-job", payload);
      if (res.data.success) {
        toast.success("Applied successfully!");
      } else {
        toast.error(res.data.message || "Failed to apply.");
      }
    } catch (err) {
      toast.error(
        err.response?.data?.message || "Failed to apply for this job."
      );
    }
    setShowModal(false);
  };

  if (!request) {
    return <SkeletonCard />;
  }

  const locationParts = [request.adminDivision, request.adminArea].filter(
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

  return (
    <Card
      hoverable
      className="bg-white border-[#E4E6EE] p-5 flex flex-col justify-between h-full transition-all duration-200"
    >
      <div>
        {/* Card Top: Class, Medium, Multiple Student tag */}
        <div className="flex items-start justify-between gap-2 mb-3">
          <div className="flex flex-wrap items-center gap-1.5">
            <span className="px-2.5 py-1 rounded-sm text-xs font-bold bg-[#EEEDFD] text-[#3730E0] border border-[#DDD9FC]">
              {request.grade || request.class || "Tuition Job"}
            </span>
            {request.multipleStudent && (
              <span className="px-2 py-0.5 rounded-sm text-[11px] font-semibold bg-[#F0FDFA] text-[#0EA5A0] border border-[#CCFBF1] flex items-center gap-1">
                <Users className="w-3 h-3" />
                <span>2 Students</span>
              </span>
            )}
            {allMediums.map((med, idx) => (
              <span
                key={idx}
                className="px-2 py-0.5 rounded-sm text-[11px] font-medium bg-[#F7F8FB] text-[#5B5F73] border border-[#E4E6EE]"
              >
                {med}
              </span>
            ))}
          </div>

          <span className="text-[11px] font-semibold text-[#16A34A] bg-[#DCFCE7] px-2 py-0.5 rounded-full shrink-0">
            Open
          </span>
        </div>

        {/* Student / Institution Info */}
        <div className="mb-4">
          <h4 className="text-base font-bold text-[#1A1D29] tracking-tight line-clamp-1">
            {request.studentName || "Student"}
          </h4>
          {request.institution && (
            <p className="text-xs text-[#5B5F73] flex items-center gap-1 mt-0.5 line-clamp-1">
              <GraduationCap className="w-3.5 h-3.5 text-[#3730E0] shrink-0" />
              <span>{request.institution}</span>
            </p>
          )}
        </div>

        {/* Subjects Tags */}
        <div className="mb-4">
          <div className="flex items-center gap-1 text-[11px] font-semibold uppercase tracking-wider text-[#5B5F73] mb-1.5">
            <BookOpen className="w-3.5 h-3.5 text-[#3730E0]" />
            <span>Subjects</span>
          </div>
          <div className="flex flex-wrap gap-1.5">
            {allSubjects.slice(0, 5).map((subj, idx) => (
              <span
                key={idx}
                className="px-2 py-0.5 rounded-sm text-xs bg-[#F7F8FB] text-[#1A1D29] border border-[#E4E6EE] font-medium"
              >
                {subj}
              </span>
            ))}
            {allSubjects.length > 5 && (
              <span className="px-1.5 py-0.5 rounded-sm text-[11px] text-[#5B5F73] font-medium">
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
              <User className="w-3 h-3 text-[#3730E0]" />
              Preferred Tutor
            </span>
            <p className="font-semibold text-[#1A1D29] truncate">
              {request.gender || "Any Gender"}
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
      <div className="flex items-center justify-between gap-3 pt-2">
        <div>
          <span className="block text-[11px] text-[#5B5F73] font-medium">
            Offered Salary
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
