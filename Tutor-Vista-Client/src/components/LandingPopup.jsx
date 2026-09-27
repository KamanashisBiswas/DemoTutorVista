import React from "react";
import { X, Sparkles, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "./ui/Button";

const LandingPopup = ({ isOpen, onClose, imageSrc }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-xs flex items-center justify-center z-50 p-4">
      <div className="relative w-full max-w-xl mx-auto bg-white rounded-lg shadow-2xl border border-[#E4E6EE] overflow-hidden animate-slide-up">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 bg-white/90 hover:bg-white text-[#1A1D29] p-1.5 rounded-full transition-transform hover:scale-105 shadow-sm border border-[#E4E6EE] z-20"
          aria-label="Close"
        >
          <X className="w-5 h-5" />
        </button>

        {imageSrc ? (
          <img
            src={imageSrc}
            alt="Welcome to TutorVista"
            className="w-full h-auto max-h-[75vh] object-cover"
          />
        ) : (
          <div className="p-8 text-center space-y-4">
            <div className="w-12 h-12 rounded-full bg-[#EEEDFD] text-[#3730E0] mx-auto flex items-center justify-center">
              <Sparkles className="w-6 h-6 text-[#F5A524]" />
            </div>
            <h3 className="text-xl font-bold text-[#1A1D29]">
              Welcome to TutorVista
            </h3>
            <p className="text-sm text-[#5B5F73]">
              Find Bangladesh’s top home and online tutors or apply as an educator today.
            </p>
            <div className="flex gap-3 justify-center pt-2">
              <Link to="/request-tutor" onClick={onClose}>
                <Button variant="primary" size="md">
                  Request a Tutor
                </Button>
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default LandingPopup;
