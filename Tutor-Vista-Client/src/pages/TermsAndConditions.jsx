import React, { useState, useEffect } from "react";
import {
  CheckCircle,
  Phone,
  CreditCard,
  FileText,
  AlertTriangle,
} from "lucide-react";
import termsData from "../assets/data/terms.json";

const TermsAndConditions = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate loading from JSON file
    setTimeout(() => {
      setData(termsData);
      setLoading(false);
    }, 500);
  }, []);

  if (loading) {
    return (
      <div
        className="flex items-center justify-center"
        style={{ height: "100vh", backgroundColor: "#f8fafc" }}
      >
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-4 border-blue-600 border-t-transparent mx-auto mb-4"></div>
          <p className="text-gray-600 text-lg">Loading Terms & Conditions...</p>
        </div>
      </div>
    );
  }

  // Add safety check for data and terms
  if (!data || !data.terms) {
    return (
      <div
        className="flex items-center justify-center"
        style={{ height: "100vh", backgroundColor: "#f8fafc" }}
      >
        <div className="text-center animate-pulse">
          <AlertTriangle className="w-16 h-16 text-red-500 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            Error loading terms and conditions
          </h2>
          <p className="text-gray-600 text-lg">Please try again later.</p>
        </div>
      </div>
    );
  }

  return (
    <div
      style={{
        backgroundColor: "#f8fafc",
        padding: "2rem 1rem",
        "@media (min-width: 768px)": { padding: "3rem 2rem" },
        "@media (min-width: 1024px)": { padding: "4rem 3rem" },
      }}
    >
      <div
        style={{
          margin: "0 auto",
          width: "100%",
          "@media (min-width: 640px)": { width: "90%" },
          "@media (min-width: 768px)": { width: "85%" },
          "@media (min-width: 1024px)": { width: "80%" },
          "@media (min-width: 1280px)": { width: "75%" },
        }}
      >
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl shadow-xl p-8 mb-8 text-white transform hover:scale-[1.02] transition-all duration-300 animate-fade-in">
          <div className="text-center">
            <FileText className="w-16 h-16 mx-auto mb-4 animate-bounce" />
            <h1 className="text-4xl md:text-5xl font-bold mb-4 animate-slide-down">
              {data?.title || "Terms and Conditions"}
            </h1>
            <p className="text-xl opacity-90 animate-slide-up">
              {data?.description || ""}
            </p>
          </div>
        </div>

        {/* Terms List */}
        <div className="bg-white rounded-2xl shadow-xl p-8 mb-8 transform hover:shadow-2xl transition-all duration-300 animate-fade-in-up">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
            <CheckCircle className="w-8 h-8 text-green-500 mr-3" />
            Terms & Conditions
          </h2>
          <div className="space-y-6">
            {data.terms?.map((term, index) => (
              <div
                key={term.id}
                className="flex items-start p-4 bg-gray-50 rounded-xl hover:bg-blue-50 transition-all duration-300 transform hover:scale-[1.02] animate-slide-in-right"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <span className="flex-shrink-0 w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-full flex items-center justify-center text-sm font-bold mr-4 mt-1 shadow-lg">
                  {term.id}
                </span>
                <p className="text-gray-700 leading-relaxed text-lg">
                  {term.text}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Payment Information */}
        {data.paymentInfo && (
          <div className="bg-white rounded-2xl shadow-xl p-8 mb-8 transform hover:shadow-2xl transition-all duration-300 animate-fade-in-up">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
              <CreditCard className="w-8 h-8 text-blue-600 mr-3" />
              {data.paymentInfo.title}
            </h2>

            {/* Contact Numbers */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
              <div className="flex items-center p-4 bg-blue-50 rounded-xl hover:bg-blue-100 transition-all duration-300 transform hover:scale-105">
                <Phone className="w-6 h-6 text-blue-600 mr-4" />
                <div>
                  <p className="text-sm text-gray-600">For Queries</p>
                  <p className="text-lg font-semibold text-gray-900">
                    {data.paymentInfo.contactNumber}
                  </p>
                </div>
              </div>
              <div className="flex items-center p-4 bg-green-50 rounded-xl hover:bg-green-100 transition-all duration-300 transform hover:scale-105">
                <CreditCard className="w-6 h-6 text-green-600 mr-4" />
                <div>
                  <p className="text-sm text-gray-600">Bkash/Nogod</p>
                  <p className="text-lg font-semibold text-gray-900">
                    {data.paymentInfo.bkashNogod}
                  </p>
                </div>
              </div>
            </div>

            {/* Payment Rules */}
            <div className="space-y-4">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">
                Important Rules:
              </h3>
              {data.paymentInfo.rules?.map((rule, index) => (
                <div
                  key={index}
                  className="flex items-start p-4 bg-red-50 rounded-xl border-l-4 border-red-500 hover:bg-red-100 transition-all duration-300 animate-slide-in-left"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <AlertTriangle className="w-5 h-5 text-red-500 mr-3 mt-1 flex-shrink-0" />
                  <span className="text-gray-700 leading-relaxed">{rule}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Conclusion */}
        <div className="bg-gradient-to-r from-green-50 to-blue-50 rounded-2xl p-8 mb-8 border border-green-200 transform hover:scale-[1.02] transition-all duration-300 animate-fade-in-up">
          <div className="text-center">
            <CheckCircle className="w-12 h-12 text-green-600 mx-auto mb-4 animate-pulse" />
            <p className="text-gray-700 leading-relaxed mb-6 text-lg">
              {data?.conclusion || ""}
            </p>
            <div className="inline-flex items-center px-6 py-3 bg-white rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105">
              <CheckCircle className="w-6 h-6 text-green-600 mr-2" />
              <span className="text-gray-900 font-semibold text-lg">
                Do you agree to these terms and conditions?
              </span>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="text-center p-8 bg-white rounded-2xl shadow-xl border-t-4 border-blue-600 animate-fade-in">
          <div className="mb-4">
            <div className="w-16 h-1 bg-gradient-to-r from-blue-600 to-purple-600 mx-auto rounded-full mb-4"></div>
            <p className="text-gray-700 font-medium mb-2 text-lg">
              By using our services, you agree to these terms and conditions.
            </p>
          </div>
          <div className="text-center">
            <p className="text-gray-600 mb-2">Regards,</p>
            <div className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-full font-bold text-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105">
              {data?.organization || "Tutor Vista"}
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes fade-in {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }

        @keyframes fade-in-up {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes slide-down {
          from {
            opacity: 0;
            transform: translateY(-30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes slide-up {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes slide-in-right {
          from {
            opacity: 0;
            transform: translateX(30px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        @keyframes slide-in-left {
          from {
            opacity: 0;
            transform: translateX(-30px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        .animate-fade-in {
          animation: fade-in 0.6s ease-out;
        }

        .animate-fade-in-up {
          animation: fade-in-up 0.8s ease-out;
        }

        .animate-slide-down {
          animation: slide-down 0.8s ease-out;
        }

        .animate-slide-up {
          animation: slide-up 0.8s ease-out 0.2s both;
        }

        .animate-slide-in-right {
          animation: slide-in-right 0.6s ease-out;
        }

        .animate-slide-in-left {
          animation: slide-in-left 0.6s ease-out;
        }
      `}</style>
    </div>
  );
};

export default TermsAndConditions;
