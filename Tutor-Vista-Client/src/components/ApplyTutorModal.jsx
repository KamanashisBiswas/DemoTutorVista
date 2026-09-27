import React, { useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
// import Button from "./Common/Button";
import { Check } from "lucide-react";
import axios from "../lib/axios";
import { toast } from "react-toastify";

const ApplyTutorModal = ({ isOpen, onClose, onSubmit, form, setForm }) => {
  const navigate = useNavigate();
  const [showApplyTutor, setShowApplyTutor] = useState(false);
  const [checking, setChecking] = useState(false);
  const [isChecked, setIsChecked] = useState(false);

  if (!isOpen) return null;

  // Reset form fields
  const resetForm = () => {
    setForm({
      number: "",
      name: "",
      salary: "",
      tutorId: "",
    });
    setShowApplyTutor(false);
    setIsChecked(false);
  };

  // Checkbox change handler
  const handleCheckboxChange = async (e) => {
    const checked = e.target.checked;
    setIsChecked(checked);

    if (checked && form.number) {
      setChecking(true);
      try {
        const res = await axios.get(`/api/tutor/by-phone/${form.number}`);
        if (res.data?.success && res.data?.data?._id) {
          setForm((prev) => ({
            ...prev,
            name: res.data.data.name,
            tutorId: res.data.data._id,
          }));
          setShowApplyTutor(false);
        } else {
          setForm((prev) => ({
            ...prev,
            name: "",
            tutorId: "",
          }));
          setShowApplyTutor(true);
          toast.error("No tutor found with this phone number!");
        }
      } catch (err) {
        setForm((prev) => ({
          ...prev,
          name: "",
          tutorId: "",
        }));
        setShowApplyTutor(true);
        toast.error("No tutor found with this phone number!");
      }
      setChecking(false);
    } else if (!checked) {
      setForm((prev) => ({
        ...prev,
        name: "",
        tutorId: "",
      }));
      setShowApplyTutor(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
      <motion.div
        variants={{
          hidden: { opacity: 0, y: -30 },
          visible: {
            opacity: 1,
            y: 0,
            transition: { type: "spring", duration: 0.3 },
          },
          exit: { opacity: 0, y: 30, transition: { duration: 0.2 } },
        }}
        initial="hidden"
        animate="visible"
        exit="exit"
        className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-8"
      >
        <h2 className="text-2xl font-bold mb-6 text-center text-blue-700">
          Apply for Tuition
        </h2>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            onSubmit(form);
            resetForm();
            onClose();
          }}
        >
          <div className="space-y-5 mb-8">
            <div>
              <label className="block text-xs md:text-sm font-medium text-gray-700 mb-2">
                Number (Enter registered contact number then check)
                <span className="text-red-500 mr-2">*</span>
              </label>
              <div className="relative">
                <input
                  type="text"
                  value={form.number}
                  onChange={(e) => {
                    setForm({ ...form, number: e.target.value });
                    setForm((prev) => ({ ...prev, name: "" }));
                    setShowApplyTutor(false);
                    setIsChecked(false);
                  }}
                  className="w-full px-4 py-2 pr-16 border border-gray-300 rounded-lg focus:border-blue-500 focus:ring-2 text-[11px] md:text-sm focus:ring-blue-200"
                  required
                  placeholder="Enter registered contact number then check"
                />
                <div className="absolute right-3 top-1/2 transform -translate-y-1/2 flex items-center">
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={isChecked}
                      onChange={handleCheckboxChange}
                      disabled={!form.number || checking}
                      className="sr-only"
                    />
                    <div
                      className={`
                      w-5 h-5 border-2 rounded-md flex items-center justify-center transition-all duration-200
                      ${
                        isChecked
                          ? "bg-blue-500 border-blue-500"
                          : "bg-white border-gray-300 hover:border-blue-400"
                      }
                      ${
                        !form.number || checking
                          ? "opacity-50 cursor-not-allowed"
                          : "cursor-pointer"
                      }
                    `}
                    >
                      {isChecked && (
                        <Check className="w-3 h-3 text-white" strokeWidth={3} />
                      )}
                      {checking && (
                        <div className="w-3 h-3 border-2 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
                      )}
                    </div>
                  </label>
                </div>
              </div>
              {/* Error message below Number input */}
              {showApplyTutor && (
                <p className="text-red-500 text-sm mt-2">
                  No tutor found with this phone number!
                </p>
              )}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Name
              </label>
              <input
                type="text"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
                required
                disabled
                placeholder="Tutor name"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Expected Salary <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                value={form.salary}
                onChange={(e) => setForm({ ...form, salary: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
                required
                placeholder="Enter your expected salary"
                disabled={showApplyTutor}
              />
            </div>
          </div>
          <div className="flex justify-between items-center mt-8">
            {showApplyTutor ? (
              <button
                className="bg-gradient-to-r from-blue-500 to-pink-500 text-white px-4 py-1.5 rounded-lg text-sm font-medium shadow hover:scale-105 transition"
                type="button"
                onClick={() => {
                  navigate("/apply-tutor");
                  resetForm();
                  onClose();
                }}
              >
                Apply Tutor
              </button>
            ) : (
              <div />
            )}
            <div className="flex gap-3">
              <button
                className="bg-red-500 text-white px-4 py-1.5 rounded-lg text-sm font-medium shadow transition-colors duration-200 hover:bg-red-600"
                type="button"
                onClick={() => {
                  resetForm();
                  onClose();
                }}
              >
                Cancel
              </button>
              <button
                className="bg-gradient-to-r from-blue-500 to-pink-500 text-white px-4 py-1.5 rounded-lg text-sm font-medium shadow hover:scale-105 transition"
                type="submit"
              >
                Submit
              </button>
            </div>
          </div>
        </form>
      </motion.div>
    </div>
  );
};

export default ApplyTutorModal;
