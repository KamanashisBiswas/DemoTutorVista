import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  MapPin,
  Clock,
  BookOpen,
  CalendarDays,
  GraduationCap,
  User,
  ArrowRight,
  User2,
} from "lucide-react";
import ApplyTutorModal from "./ApplyTutorModal";
import axios from "../lib/axios";
import { toast } from "react-toastify";

const cardVariants = {
  hidden: { opacity: 0, y: 50, scale: 0.9 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { type: "spring", stiffness: 100, damping: 15 },
  },
};

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

  // Skeleton loader for when data is not yet available
  if (!request) {
    return (
      <div className="w-full max-w-md mx-auto bg-white rounded-2xl p-6">
        <div className="animate-pulse">
          <div className="flex items-center space-x-4 mb-6">
            <div className="w-16 h-16 bg-gray-200 rounded-full"></div>
            <div className="flex-1 space-y-2">
              <div className="h-4 bg-gray-200 rounded w-3/4"></div>
              <div className="h-3 bg-gray-200 rounded w-1/2"></div>
            </div>
          </div>
          <div className="h-3 bg-gray-200 rounded w-full mb-3"></div>
          <div className="h-3 bg-gray-200 rounded w-5/6 mb-6"></div>
          <div className="flex justify-between items-center">
            <div className="h-8 bg-gray-200 rounded-md w-1/3"></div>
            <div className="h-10 bg-gray-300 rounded-lg w-1/4"></div>
          </div>
        </div>
      </div>
    );
  }

  // Simplified location logic
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
    <motion.div
      variants={cardVariants}
      // SOLVED 1: Added 'flex flex-col' to make the card a vertical flex container.
      className="group bg-white rounded-3xl shadow-lg border border-gray-100 overflow-hidden hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 cursor-pointer relative flex flex-col"
    >
      {/* --- Header Section --- */}
      {/* Removed 'overflow-hidden' to let decorative circle show */}
      <div className="bg-gradient-to-r from-blue-500 to-pink-600 p-6 rounded-t-2xl text-white relative">
        <div className="flex items-center space-x-4">
          <div className="bg-white/20 p-3 rounded-full">
            <GraduationCap className="w-8 h-8" />
          </div>
          <div>
            <h2 className="text-xl font-bold tracking-tight text-white">
              {request.studentName}
            </h2>
            <p className="text-sm font-medium text-gray-100">
              {request.institution}
            </p>
          </div>
        </div>
        <div className="absolute -bottom-10 -right-8 w-28 h-28 bg-white/10 rounded-full opacity-50"></div>
      </div>

      {/* --- Grade/Class & Apply Button Row --- */}
      <div className="flex justify-between items-center mt-1">
        <div className="flex">
          {(request.grade || request.class) && (
            <div
              className="flex items-center gap-2 bg-gradient-to-r from-green-300 to-green-500 text-green-800 px-2 md:px-3 py-2 font-bold shadow-lg"
              // style={{ minWidth: "100px", justifyContent: "center" }}
            >
              {request.grade || request.class}
            </div>
          )}

          {request.multipleStudent && (request.grade2 || request.class2) && (
            <div
              className="flex items-center gap-2 bg-gradient-to-r from-green-300 to-green-500 text-green-800 px-2 md:px-3 py-2 rounded-br-xl font-bold shadow-lg ml-1"
              // style={{ minWidth: "100px", justifyContent: "center" }}
            >
              {request.grade2 || request.class2}
            </div>
          )}
        </div>
        {/* <button
          className="flex items-center gap-2 bg-gradient-to-r from-gray-500 to-gray-700 text-white px-6 py-2 rounded-bl-xl font-bold shadow-lg transition-all duration-300"
          onClick={handleApplyClick}
        >
          Apply <ArrowRight className="w-5 h-5" />
        </button> */}

        <div className="relative">
          <button
            className="flex items-center gap-2 bg-gradient-to-r from-gray-500 to-gray-700 text-white px-3 md:px-6 py-2 rounded-bl-xl font-bold shadow-lg transition-all duration-300 relative overflow-hidden group hover:shadow-xl hover:-translate-y-0.5"
            onClick={handleApplyClick}
          >
            <span className="relative z-10 flex items-center gap-2">
              Apply{" "}
              <ArrowRight className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" />
            </span>
            <span className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-green-300 to-green-500 transform origin-left scale-x-0 transition-transform duration-300 group-hover:scale-x-100"></span>
          </button>
          {request.multipleStudent && (
            <div
              className="absolute left-0 right-1 flex justify-end"
              style={{ bottom: -32 }}
            >
              <User2 />
              <User2 />
            </div>
          )}
        </div>
      </div>

      {/* --- Main Content --- */}
      {/* SOLVED 2: Added 'flex-grow' to make this section fill available space, pushing the footer down. */}
      <div className="p-6 space-y-5 flex-grow">
        {/* --- Subjects Section --- */}
        <div>
          <div className="flex items-center space-x-2 text-gray-900 mb-3">
            <BookOpen className="w-5 h-5 text-gray-900" />
            <h3 className="text-sm font-semibold uppercase tracking-wide text-gray-900">
              Subjects
            </h3>
          </div>
          <div className="flex flex-wrap gap-2">
            {allSubjects.map((subject, index) => (
              <span
                key={index}
                className="bg-gray-100 text-gray-900 px-3 py-1.5 rounded-md text-sm font-medium"
              >
                {subject}
              </span>
            ))}
          </div>
        </div>

        {/* --- Schedule & Details Grid --- */}
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 text-sm">
          <InfoItem
            icon={<CalendarDays />}
            label="Schedule"
            value={request.days}
          />
          <InfoItem icon={<Clock />} label="Time" value={request.time} />
          <InfoItem
            icon={<User />}
            label="Tutor Gender"
            value={request.gender}
          />
        </div>

        {/* --- Medium Section --- */}
        {allMediums.length > 0 && (
          <div>
            <div className="flex items-center space-x-2 text-gray-900 mb-3">
              <GraduationCap className="w-5 h-5 text-gray-900" />
              <h3 className="text-sm font-semibold uppercase tracking-wide text-gray-900">
                Medium
              </h3>
            </div>
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 flex flex-wrap gap-2">
              {allMediums.map((medium, idx) => (
                <span
                  key={idx}
                  className="font-semibold text-blue-800 text-base bg-blue-100 px-3 py-1 rounded"
                >
                  {medium}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* --- Location Section --- */}
        <div>
          <div className="flex items-center space-x-2 text-gray-900 mb-3">
            <MapPin className="w-5 h-5 text-gray-900" />
            <h3 className="text-sm font-semibold uppercase tracking-wide text-gray-900">
              Location
            </h3>
          </div>
          <div className="bg-gray-100 border border-gray-200 rounded-lg p-3">
            <p className="font-semibold text-gray-900 text-base">
              {locationParts.length > 0 ? locationParts.join(", ") : "N/A"}
            </p>
          </div>
        </div>
      </div>

      {/* --- Footer & CTA --- */}
      <div className="px-6 py-4 bg-gray-100 rounded-b-2xl border-t border-gray-200 flex justify-between items-center">
        <div>
          <p className="text-xs text-gray-900">Proposed Salary</p>
          <p className="text-xl font-bold text-gray-900">
            ৳{request.salary}/month
          </p>
        </div>
      </div>

      {/* --- Modal --- */}
      <ApplyTutorModal
        isOpen={showModal}
        onClose={handleModalClose}
        onSubmit={handleModalSubmit}
        form={modalForm}
        setForm={setModalForm}
      />
    </motion.div>
  );
};

const InfoItem = ({ icon, label, value }) => (
  <div className="flex flex-col">
    <div className="flex items-center space-x-1.5 text-gray-900 mb-1">
      {React.cloneElement(icon, { className: "w-4 h-4 text-gray-900" })}
      <span className="text-xs font-semibold uppercase text-gray-900">
        {label}
      </span>
    </div>
    <p className="font-semibold text-gray-900">{value || "N/A"}</p>
  </div>
);

export default TuitionRequestCard;
