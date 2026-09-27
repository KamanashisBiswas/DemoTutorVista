import React from "react";
import { X } from "lucide-react";

const LandingPopup = ({ isOpen, onClose, imageSrc }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50 p-4 animate-fade-in-fast">
      <div className="relative w-full max-w-5xl sm:max-w-2xl md:max-w-3xl lg:max-w-5xl mx-auto animate-slide-up-fast">
        <button
          onClick={onClose}
          className="absolute -top-2 -right-2 bg-gray-600 text-slate-50 p-2 rounded-full hover:bg-gray-700-600 font-bold hover:rotate-90 transition-all duration-300 shadow-lg z-10"
          aria-label="Close"
        >
          <X className="w-6 h-6" />
        </button>
        <div className="bg-white rounded-lg shadow-2xl overflow-hidden">
          <img
            src={imageSrc}
            alt="Welcome Popup"
            className="w-full max-w-full h-auto max-h-[85vh] object-contain"
            // Removed minWidth for responsiveness
          />
        </div>
      </div>
      <style>{`
        @keyframes fade-in-fast {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes slide-up-fast {
          from { transform: translateY(20px); opacity: 0; }
          to { transform: translateY(0); opacity: 1; }
        }
        .animate-fade-in-fast {
          animation: fade-in-fast 0.3s ease-out forwards;
        }
        .animate-slide-up-fast {
          animation: slide-up-fast 0.4s ease-out forwards;
        }
      `}</style>
    </div>
  );
};

export default LandingPopup;
