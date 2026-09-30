import React, { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { X, ShieldCheck, CheckCircle2, Phone, CreditCard } from "lucide-react";
import Button from "./Common/Button";
import termsData from "../assets/data/terms.json";

const TermsModal = ({ isOpen, onClose, onAccept }) => {
  const [terms, setTerms] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
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
      <div className="fixed inset-0 bg-black/50 backdrop-blur-xs flex items-center justify-center z-50 p-4 font-sans">
        <div className="bg-white rounded-md shadow-card p-6 border border-[#E4E6EE] text-center text-xs sm:text-sm text-[#5B5F73]">
          Loading terms...
        </div>
      </div>
    );
  }

  if (!terms) {
    return (
      <div className="fixed inset-0 bg-black/50 backdrop-blur-xs flex items-center justify-center z-50 p-4 font-sans">
        <div className="bg-white rounded-md shadow-card p-6 border border-[#E4E6EE] text-center text-xs sm:text-sm text-[#DC2626]">
          Error loading terms
        </div>
      </div>
    );
  }

  const modalContent = (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-xs flex items-center justify-center z-50 p-3 sm:p-4 font-sans">
      {/* Modal Panel */}
      <div className="bg-white rounded-lg shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-hidden flex flex-col border border-[#E4E6EE]">
        {/* Header */}
        <div className="flex items-center justify-between p-4 sm:p-5 border-b border-[#E4E6EE] flex-shrink-0">
          <div className="flex items-center gap-3">
            <div className="bg-[#EEEDFD] p-2 rounded-sm text-[#3730E0]">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base sm:text-lg font-bold text-[#1A1D29]">
                {terms.title}
              </h3>
              <p className="text-xs text-[#5B5F73]">
                Please review before submitting your tutor application
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1.5 rounded-sm text-[#5B5F73] hover:text-[#1A1D29] hover:bg-[#F7F8FB] transition-colors cursor-pointer"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-5 sm:p-6 overflow-y-auto flex-1 space-y-6">
          <p className="text-xs sm:text-sm text-[#5B5F73] leading-relaxed">
            {terms.description}
          </p>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Main Terms Column */}
            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-[#1A1D29] mb-3">
                Key Agreements & Responsibilities
              </h4>
              <ul className="space-y-3">
                {terms.terms.map((term) => (
                  <li key={term.id} className="flex items-start gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-[#16A34A] mt-0.5 flex-shrink-0" />
                    <span className="text-xs sm:text-sm text-[#1A1D29] leading-relaxed">
                      {term.text}
                    </span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Payment Information Column */}
            <div className="space-y-4">
              <div className="bg-[#FEF9EE] border border-[#FDE68A] rounded-md p-4">
                <div className="flex items-center gap-2 mb-2.5">
                  <CreditCard className="w-4 h-4 text-[#D97706]" />
                  <h4 className="text-xs font-bold uppercase tracking-wider text-[#92400E]">
                    {terms.paymentInfo.title}
                  </h4>
                </div>

                <div className="space-y-2 text-xs text-[#78350F]">
                  <div className="flex items-center gap-2">
                    <Phone className="w-3.5 h-3.5 text-[#3730E0]" />
                    <span>
                      Helpline: <strong>{terms.paymentInfo.contactNumber}</strong>
                    </span>
                  </div>

                  <div>
                    <strong>Bkash / Nagad:</strong> {terms.paymentInfo.bkashNogod}
                  </div>

                  <ul className="space-y-1.5 mt-2.5 pt-2.5 border-t border-[#FDE68A]/60">
                    {terms.paymentInfo.rules.map((rule, index) => (
                      <li key={index} className="flex items-start gap-1.5">
                        <span className="text-[#D97706]">•</span>
                        <span>{rule}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Conclusion */}
              <div className="bg-[#EEEDFD]/50 border border-[#3730E0]/20 rounded-md p-4">
                <p className="text-xs text-[#3730E0] leading-relaxed">
                  {terms.conclusion}
                </p>
              </div>

              {/* Organization */}
              <div className="text-right pt-2">
                <p className="text-xs font-medium text-[#5B5F73]">
                  Sincerely,
                  <br />
                  <span className="text-[#3730E0] font-bold">
                    {terms.organization}
                  </span>
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="flex items-center justify-end gap-3 p-4 sm:p-5 bg-[#F7F8FB] border-t border-[#E4E6EE] flex-shrink-0">
          <Button
            type="button"
            variant="secondary"
            size="md"
            onClick={onClose}
          >
            Cancel
          </Button>
          <Button
            type="button"
            variant="primary"
            size="md"
            onClick={onAccept}
          >
            Accept & Continue
          </Button>
        </div>
      </div>
    </div>
  );

  return typeof document !== "undefined"
    ? createPortal(modalContent, document.body)
    : null;
};

export default TermsModal;
