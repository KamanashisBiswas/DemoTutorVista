import React, { useState, useEffect } from "react";
import { X, ShieldCheck, CheckCircle, Phone, CreditCard } from "lucide-react";
import Button from "./Common/Button";
import termsData from "../assets/data/terms.json";

const TermsModal = ({ isOpen, onClose, onAccept }) => {
  const [terms, setTerms] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate loading and set the terms data
    const loadTerms = async () => {
      try {
        setTerms(termsData);
      } catch (error) {
        console.error("Error loading terms:", error);
      } finally {
        setLoading(false);
      }
    };

    if (isOpen) {
      loadTerms();
    }
  }, [isOpen]);

  if (!isOpen) return null;

  if (loading) {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50 p-4 font-dmsans">
        <div className="bg-white rounded-2xl shadow-2xl p-8">
          <div className="text-center">Loading terms...</div>
        </div>
      </div>
    );
  }

  if (!terms) {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50 p-4 font-dmsans">
        <div className="bg-white rounded-2xl shadow-2xl p-8">
          <div className="text-center text-red-500">Error loading terms</div>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50 p-2 sm:p-4 animate-fade-in-fast font-dmsans">
      {/* Modal Panel */}
      <div className="bg-white rounded-lg sm:rounded-2xl shadow-2xl w-full h-full sm:h-auto sm:max-h-[95vh] max-h-[100vh] transform transition-all duration-300 animate-slide-up-fast overflow-hidden flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-4 sm:p-5 border-b border-gray-200 flex-shrink-0">
          <div className="flex items-center space-x-3">
            <div className="bg-blue-100 p-2 rounded-full">
              <ShieldCheck className="w-5 h-5 sm:w-6 sm:h-6 text-blue-600" />
            </div>
            <h2 className="text-lg sm:text-xl font-bold text-gray-800">
              {terms.title}
            </h2>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-full text-black focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-4 sm:p-6 overflow-y-auto flex-1">
          <p className="text-gray-600 mb-4 sm:mb-6 text-sm sm:text-base">
            {terms.description}
          </p>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8">
            {/* Main Terms Column */}
            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-4">
                Terms & Conditions
              </h3>
              <ul className="space-y-3 sm:space-y-4">
                {terms.terms.map((term) => (
                  <li key={term.id} className="flex items-start space-x-3">
                    <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5 text-green-500 mt-1 flex-shrink-0" />
                    <span className="text-gray-700 leading-relaxed text-sm sm:text-base">
                      {term.text}
                    </span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Payment Information Column */}
            <div className="space-y-4 sm:space-y-6">
              {/* Payment Information */}
              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                <div className="flex items-center space-x-2 mb-3">
                  <CreditCard className="w-5 h-5 text-yellow-600" />
                  <h3 className="text-lg font-semibold text-yellow-800">
                    {terms.paymentInfo.title}
                  </h3>
                </div>

                <div className="space-y-3">
                  <div className="flex items-center space-x-2">
                    <Phone className="w-4 h-4 text-blue-600" />
                    <span className="text-sm text-gray-700">
                      Contact:{" "}
                      <strong>{terms.paymentInfo.contactNumber}</strong>
                    </span>
                  </div>

                  <div className="text-sm text-gray-700">
                    <strong>Bkash/Nogod (Personal):</strong>{" "}
                    {terms.paymentInfo.bkashNogod}
                  </div>

                  <ul className="space-y-2 mt-3">
                    {terms.paymentInfo.rules.map((rule, index) => (
                      <li key={index} className="flex items-start space-x-2">
                        <span className="text-yellow-600 mt-1">•</span>
                        <span className="text-sm text-gray-700">{rule}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Conclusion */}
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <p className="text-sm text-blue-800 leading-relaxed">
                  {terms.conclusion}
                </p>
              </div>

              {/* Organization */}
              <div className="text-right">
                <p className="text-sm font-medium text-gray-600">
                  Regards,
                  <br />
                  <span className="text-blue-600 font-semibold">
                    {terms.organization}
                  </span>
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Footer / Actions */}
        <div className="flex flex-row justify-center md:justify-end items-center gap-3 p-4 sm:p-6 bg-gray-50 border-t border-gray-200 flex-shrink-0">
          <Button
            onClick={onClose}
            className="flex-1 md:flex-none md:w-auto !px-4 sm:!px-6 !py-3 !text-sm !font-medium !mb-0"
          >
            Cancel
          </Button>
          <Button
            onClick={onAccept}
            className="flex-1 md:flex-none md:w-auto !px-4 sm:!px-6 !py-3 !text-sm !font-medium !mb-0"
          >
            Accept & Continue
          </Button>
        </div>
      </div>

      {/* Keyframes for animation */}
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

export default TermsModal;
