import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Check, Search, AlertCircle, ArrowRight } from "lucide-react";
import ApiService from "../services/api";
import { toast } from "react-toastify";
import { Modal } from "./ui/Modal";
import { Button } from "./ui/Button";

const ApplyTutorModal = ({ isOpen, onClose, onSubmit, form, setForm }) => {
  const navigate = useNavigate();
  const [showApplyTutor, setShowApplyTutor] = useState(false);
  const [checking, setChecking] = useState(false);
  const [isChecked, setIsChecked] = useState(false);

  if (!isOpen) return null;

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

  const handleVerifyPhone = async () => {
    if (!form.number) {
      toast.warning("Please enter your registered phone number.");
      return;
    }

    setChecking(true);
    try {
      const res = await ApiService.getTutorByPhone(form.number);
      if (res?.success && res?.data?._id) {
        setForm((prev) => ({
          ...prev,
          name: res.data.name,
          tutorId: res.data._id,
        }));
        setIsChecked(true);
        setShowApplyTutor(false);
        toast.success(`Verified: ${res.data.name}`);
      } else {
        setForm((prev) => ({
          ...prev,
          name: "",
          tutorId: "",
        }));
        setIsChecked(false);
        setShowApplyTutor(true);
        toast.error("No registered tutor found with this phone number!");
      }
    } catch {
      setForm((prev) => ({
        ...prev,
        name: "",
        tutorId: "",
      }));
      setIsChecked(false);
      setShowApplyTutor(true);
      toast.error("No registered tutor found with this phone number!");
    } finally {
      setChecking(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!isChecked || !form.tutorId) {
      toast.warning("Please verify your registered phone number first.");
      return;
    }
    onSubmit(form);
    resetForm();
    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={() => {
        resetForm();
        onClose();
      }}
      title="Apply for Tuition Job"
      subtitle="Verify your registered tutor phone number to submit your application"
      maxWidth="max-w-md"
    >
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Phone verification */}
        <div>
          <label className="block text-xs font-semibold text-[#1A1D29] mb-1.5">
            Registered Phone Number <span className="text-[#DC2626]">*</span>
          </label>
          <div className="flex gap-2">
            <input
              type="text"
              value={form.number}
              onChange={(e) => {
                setForm({ ...form, number: e.target.value, name: "", tutorId: "" });
                setShowApplyTutor(false);
                setIsChecked(false);
              }}
              placeholder="e.g. 01712345678"
              required
              className="flex-1 h-10 px-3 text-sm bg-white border border-[#E4E6EE] rounded-md focus:outline-none focus:border-[#3730E0] focus:ring-2 focus:ring-[#3730E0]/20"
            />
            <Button
              type="button"
              variant={isChecked ? "success" : "primary"}
              size="md"
              loading={checking}
              onClick={handleVerifyPhone}
              iconLeft={isChecked ? Check : Search}
            >
              {isChecked ? "Verified" : "Verify"}
            </Button>
          </div>
          {showApplyTutor && (
            <div className="mt-2.5 p-3 rounded-md bg-[#FEF2F2] border border-[#FEE2E2] flex items-start gap-2">
              <AlertCircle className="w-4 h-4 text-[#DC2626] shrink-0 mt-0.5" />
              <div className="text-xs text-[#DC2626]">
                <span>No registered tutor profile found. </span>
                <button
                  type="button"
                  onClick={() => {
                    navigate("/apply-tutor");
                    resetForm();
                    onClose();
                  }}
                  className="font-bold underline ml-1 hover:text-[#B91C1C]"
                >
                  Register as Tutor Now →
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Verified Tutor Name */}
        <div>
          <label className="block text-xs font-semibold text-[#1A1D29] mb-1.5">
            Tutor Name
          </label>
          <input
            type="text"
            value={form.name}
            readOnly
            placeholder="Verified automatically after checking phone"
            className="w-full h-10 px-3 text-sm bg-[#F7F8FB] text-[#1A1D29] border border-[#E4E6EE] rounded-md cursor-not-allowed font-medium"
          />
        </div>

        {/* Expected Salary */}
        <div>
          <label className="block text-xs font-semibold text-[#1A1D29] mb-1.5">
            Expected Monthly Salary (৳) <span className="text-[#DC2626]">*</span>
          </label>
          <input
            type="text"
            value={form.salary}
            onChange={(e) => setForm({ ...form, salary: e.target.value })}
            placeholder="e.g. 6000"
            required
            className="w-full h-10 px-3 text-sm bg-white border border-[#E4E6EE] rounded-md focus:outline-none focus:border-[#3730E0] focus:ring-2 focus:ring-[#3730E0]/20"
          />
        </div>

        {/* Actions */}
        <div className="pt-4 border-t border-[#E4E6EE] flex items-center justify-end gap-2.5">
          <Button
            type="button"
            variant="ghost"
            size="md"
            onClick={() => {
              resetForm();
              onClose();
            }}
          >
            Cancel
          </Button>
          <Button
            type="submit"
            variant="primary"
            size="md"
            disabled={!isChecked || !form.tutorId}
          >
            Submit Application
          </Button>
        </div>
      </form>
    </Modal>
  );
};

export default ApplyTutorModal;
