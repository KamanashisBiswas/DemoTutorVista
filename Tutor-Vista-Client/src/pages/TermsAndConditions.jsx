import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  CheckCircle2,
  Phone,
  CreditCard,
  FileText,
  AlertTriangle,
  ShieldCheck,
  Building,
} from "lucide-react";
import termsData from "../assets/data/terms.json";

const TermsAndConditions = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    window.scrollTo(0, 0);
    const timer = setTimeout(() => {
      setData(termsData);
      setLoading(false);
    }, 300);
    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#F7F8FB] flex items-center justify-center p-4">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-[#3730E0] border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-[#5B5F73] text-sm font-medium">Loading Terms & Conditions...</p>
        </div>
      </div>
    );
  }

  if (!data || !data.terms) {
    return (
      <div className="min-h-screen bg-[#F7F8FB] flex items-center justify-center p-4">
        <div className="text-center bg-white p-8 rounded-2xl border border-[#E4E6EE] shadow-card max-w-md w-full">
          <AlertTriangle className="w-12 h-12 text-[#DC2626] mx-auto mb-4" />
          <h2 className="text-xl font-bold text-[#1A1D29] mb-2">
            Failed to Load Terms
          </h2>
          <p className="text-sm text-[#5B5F73]">
            Unable to load the terms and conditions at this moment. Please refresh the page.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-[#F7F8FB] min-h-screen text-[#1A1D29] pb-16">
      {/* Header Section */}
      <section className="relative bg-[#3730E0] text-white py-14 sm:py-20 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-white/10 via-transparent to-transparent pointer-events-none" />
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="w-16 h-16 bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl flex items-center justify-center mx-auto mb-5 shadow-inner">
            <FileText className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight mb-4">
            {data.title || "Terms and Conditions"}
          </h1>
          <p className="text-base sm:text-lg text-white/80 max-w-2xl mx-auto leading-relaxed">
            {data.description || "By applying to be a tutor with Tutor Vista, you agree to the following terms:"}
          </p>
        </div>
      </section>

      {/* Main Content Container */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 -mt-8 relative z-10 space-y-8">
        {/* Terms List Card */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="bg-white rounded-2xl border border-[#E4E6EE] shadow-card p-6 sm:p-10"
        >
          <div className="flex items-center gap-3 mb-6 pb-4 border-b border-[#E4E6EE]">
            <div className="w-10 h-10 rounded-xl bg-[#3730E0]/10 flex items-center justify-center text-[#3730E0]">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-[#1A1D29]">
                Tutor Guidelines & Rules
              </h2>
              <p className="text-xs sm:text-sm text-[#5B5F73]">
                Please review all conditions thoroughly before accepting tuition placements.
              </p>
            </div>
          </div>

          <div className="space-y-4">
            {data.terms.map((term) => (
              <div
                key={term.id}
                className="flex items-start gap-4 p-4 rounded-xl border border-[#E4E6EE] hover:border-[#3730E0]/30 hover:bg-[#F7F8FB] transition-all"
              >
                <span className="flex-shrink-0 w-8 h-8 rounded-lg bg-[#3730E0] text-white flex items-center justify-center text-sm font-bold shadow-sm">
                  {term.id}
                </span>
                <p className="text-[#5B5F73] text-sm sm:text-base leading-relaxed pt-0.5">
                  {term.text}
                </p>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Payment & Important Rules Card */}
        {data.paymentInfo && (
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4 }}
            className="bg-white rounded-2xl border border-[#E4E6EE] shadow-card p-6 sm:p-10"
          >
            <div className="flex items-center gap-3 mb-6 pb-4 border-b border-[#E4E6EE]">
              <div className="w-10 h-10 rounded-xl bg-[#0EA5A0]/10 flex items-center justify-center text-[#0EA5A0]">
                <CreditCard className="w-5 h-5" />
              </div>
              <h2 className="text-xl font-bold text-[#1A1D29]">
                {data.paymentInfo.title || "Payment & Policy Information"}
              </h2>
            </div>

            {/* Contact & Payment Info Pills */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
              <div className="flex items-center gap-4 p-4 bg-[#F7F8FB] rounded-xl border border-[#E4E6EE]">
                <div className="w-10 h-10 rounded-lg bg-[#3730E0]/10 flex items-center justify-center text-[#3730E0] flex-shrink-0">
                  <Phone className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-xs text-[#5B5F73] font-medium">For Queries & Support</p>
                  <p className="text-base font-bold text-[#1A1D29]">
                    {data.paymentInfo.contactNumber}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-4 p-4 bg-[#F7F8FB] rounded-xl border border-[#E4E6EE]">
                <div className="w-10 h-10 rounded-lg bg-[#16A34A]/10 flex items-center justify-center text-[#16A34A] flex-shrink-0">
                  <CreditCard className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-xs text-[#5B5F73] font-medium">bKash / Nagad</p>
                  <p className="text-base font-bold text-[#1A1D29]">
                    {data.paymentInfo.bkashNogod}
                  </p>
                </div>
              </div>
            </div>

            {/* Rules list */}
            {data.paymentInfo.rules && (
              <div className="space-y-3">
                <h3 className="text-sm font-semibold uppercase tracking-wider text-[#5B5F73]">
                  Mandatory Policies:
                </h3>
                {data.paymentInfo.rules.map((rule, idx) => (
                  <div
                    key={idx}
                    className="flex items-start gap-3 p-4 bg-amber-50/60 rounded-xl border border-amber-200/80 text-amber-900"
                  >
                    <AlertTriangle className="w-5 h-5 text-amber-600 mt-0.5 flex-shrink-0" />
                    <p className="text-sm sm:text-base leading-relaxed">{rule}</p>
                  </div>
                ))}
              </div>
            )}
          </motion.div>
        )}

        {/* Conclusion Card */}
        {data.conclusion && (
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4 }}
            className="bg-white rounded-2xl border border-[#E4E6EE] shadow-card p-6 sm:p-8 text-center"
          >
            <div className="w-12 h-12 rounded-2xl bg-[#16A34A]/10 text-[#16A34A] flex items-center justify-center mx-auto mb-4">
              <CheckCircle2 className="w-6 h-6" />
            </div>
            <p className="text-sm sm:text-base text-[#5B5F73] leading-relaxed max-w-2xl mx-auto mb-6">
              {data.conclusion}
            </p>
            <div className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#F7F8FB] border border-[#E4E6EE] rounded-full text-xs sm:text-sm font-semibold text-[#1A1D29]">
              <CheckCircle2 className="w-4 h-4 text-[#16A34A]" />
              Accepted upon application confirmation
            </div>
          </motion.div>
        )}

        {/* Footer Card */}
        <div className="text-center p-6 bg-white rounded-2xl border border-[#E4E6EE] shadow-sm">
          <p className="text-xs sm:text-sm text-[#5B5F73] mb-2">
            By using our services, you confirm agreement to the terms outlined above.
          </p>
          <div className="flex items-center justify-center gap-1.5 text-sm font-bold text-[#3730E0]">
            <Building className="w-4 h-4" />
            <span>{data.organization || "TutorVista"}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TermsAndConditions;
