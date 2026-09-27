import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import axios from "../../lib/axios";
import faqImage from "../../assets/FAQ/Faq1.svg";
import CommonSectionHeading from "../Common/CommonSectionHeading";

const FAQComponent = () => {
  const [openFAQ, setOpenFAQ] = useState(0); // First FAQ is open by default
  const [faqs, setFaqs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch FAQs from backend using axios
  useEffect(() => {
    const fetchFAQs = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await axios.get("/api/faq", {
          timeout: 10000, // 10 second timeout
        });

        if (response.data && response.data.success) {
          const faqsData = response.data.data?.faqs || [];
          setFaqs(faqsData);
        } else {
          console.warn(
            "FAQ API returned unsuccessful response:",
            response.data
          );
          setError("Failed to load FAQs");
        }
      } catch (err) {
        console.error("Error fetching FAQs:", err);
        if (err.code === "ECONNABORTED") {
          setError("Request timeout. Please check your connection.");
        } else if (err.response) {
          setError(`Server error: ${err.response.status}`);
        } else if (err.request) {
          setError("Network error. Please check your internet connection.");
        } else {
          setError("Unable to load FAQs. Please try again later.");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchFAQs();
  }, []);

  const toggleFAQ = (index) => {
    setOpenFAQ(openFAQ === index ? -1 : index);
  };

  // Loading state
  if (loading) {
    return (
      <section className="pb-12 sm:pb-16 lg:pb-20 bg-gradient-to-br from-blue-50 via-purple-50 to-blue-50">
        <div className="w-full mx-auto px-4 sm:px-6 lg:px-8 xl:px-12 2xl:px-16 font-dmsans">
          <div className="text-center mb-12 sm:mb-16">
            <CommonSectionHeading highlight="FAQ's" />
            {/* Illustration */}
            <div className="flex justify-center mb-8">
              <div className="w-64 sm:w-80 md:w-[420px] flex items-center justify-center">
                <img
                  src={faqImage}
                  alt="FAQ"
                  className="w-full h-auto max-h-72 sm:max-h-80 md:max-h-96 object-contain mx-auto"
                />
              </div>
            </div>
          </div>
          {/* Loading skeleton */}
          <div className="space-y-4 sm:space-y-6">
            {[1, 2, 3, 4, 5].map((item) => (
              <div
                key={item}
                className="bg-white rounded-2xl shadow-sm border-2 border-gray-200 overflow-hidden animate-pulse"
              >
                <div className="px-6 sm:px-8 py-4 sm:py-6">
                  <div className="h-4 bg-gray-300 rounded w-3/4 mb-2"></div>
                  <div className="h-3 bg-gray-200 rounded w-1/2"></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  // Error state
  if (error) {
    return (
      <section className="pb-12 sm:pb-16 lg:pb-20 bg-gradient-to-br from-blue-50 via-purple-50 to-blue-50">
        <div className="w-full mx-auto px-4 sm:px-6 lg:px-8 xl:px-12 2xl:px-16 font-dmsans">
          <div className="text-center mb-12 sm:mb-16">
            <CommonSectionHeading highlight="FAQ's" />
            {/* Illustration */}
            <div className="flex justify-center mb-8">
              <div className="w-64 sm:w-80 md:w-[420px] flex items-center justify-center">
                <img
                  src={faqImage}
                  alt="FAQ"
                  className="w-full h-auto max-h-72 sm:max-h-80 md:max-h-96 object-contain mx-auto"
                />
              </div>
            </div>
          </div>
          <div className="text-center py-12">
            <div className="bg-red-50 border border-red-200 rounded-lg p-6">
              <svg
                className="mx-auto h-12 w-12 text-red-400 mb-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.732-.833-2.5 0L4.268 18.5c-.77.833.192 2.5 1.732 2.5z"
                />
              </svg>
              <h3 className="text-lg font-medium text-red-800 mb-2">
                Error Loading FAQs
              </h3>
              <p className="text-red-600">{error}</p>
              <button
                onClick={() => window.location.reload()}
                className="mt-4 bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors"
              >
                Try Again
              </button>
            </div>
          </div>
        </div>
      </section>
    );
  }

  // No FAQs available
  if (faqs.length === 0) {
    return (
      <section className="pb-12 sm:pb-16 lg:pb-20 bg-gradient-to-br from-blue-50 via-purple-50 to-blue-50">
        <div className="w-full mx-auto px-4 sm:px-6 lg:px-8 xl:px-12 2xl:px-16 font-dmsans">
          <div className="text-center mb-12 sm:mb-16">
            <CommonSectionHeading highlight="FAQ's" />
            {/* Illustration */}
            <div className="flex justify-center mb-8">
              <div className="w-64 sm:w-80 md:w-[420px] flex items-center justify-center">
                <img
                  src={faqImage}
                  alt="FAQ"
                  className="w-full h-auto max-h-72 sm:max-h-80 md:max-h-96 object-contain mx-auto"
                />
              </div>
            </div>
          </div>
          <div className="text-center py-12">
            <div className="bg-gray-50 border border-gray-200 rounded-lg p-6">
              <svg
                className="mx-auto h-12 w-12 text-gray-400 mb-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              <h3 className="text-lg font-medium text-gray-800 mb-2">
                No FAQs Available
              </h3>
              <p className="text-gray-600">
                Frequently asked questions will appear here soon.
              </p>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="pt-3 pb-12 sm:pb-16 lg:pb-20 bg-gradient-to-br from-blue-50 via-purple-50 to-blue-50">
      <div className="w-full mx-auto px-4 sm:px-6 lg:px-8 xl:px-12 2xl:px-16 font-dmsans">
        {/* Header Section */}
        <motion.div
          className="text-center mb-12 sm:mb-16"
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          {/* Title */}
          <CommonSectionHeading highlight="FAQ's" />
          {/* Illustration */}
          <div className="flex justify-center mb-8">
            <div className="w-64 sm:w-80 md:w-[420px] flex items-center justify-center">
              <img
                src={faqImage}
                alt="FAQ"
                className="w-full h-auto max-h-72 sm:max-h-80 md:max-h-96 object-contain mx-auto"
              />
            </div>
          </div>
        </motion.div>

        {/* FAQ Items */}
        <motion.div
          className="space-y-4 sm:space-y-6"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          variants={{
            visible: { transition: { staggerChildren: 0.1 } },
          }}
        >
          {faqs.map((faq, index) => (
            <motion.div
              key={faq._id}
              className="bg-white rounded-2xl shadow-sm border-2 border-gray-200 overflow-hidden transition-all duration-300 hover:shadow-md"
              variants={{
                hidden: { y: 20, opacity: 0 },
                visible: { y: 0, opacity: 1 },
              }}
            >
              {/* Question Header */}
              <button
                onClick={() => toggleFAQ(index)}
                className="w-full px-6 sm:px-8 py-4 sm:py-6 text-left flex items-center justify-between hover:bg-gray-50 transition-colors"
              >
                <h3 className="text-base sm:text-lg font-semibold text-gray-900 pr-4">
                  {faq.question}
                </h3>
                <motion.div
                  className="flex-shrink-0"
                  animate={{ rotate: openFAQ === index ? 180 : 0 }}
                  transition={{ duration: 0.3 }}
                >
                  {openFAQ === index ? (
                    // Minus icon when expanded
                    <div className="w-6 h-6 sm:w-8 sm:h-8 bg-blue-500 hover:bg-blue-600 rounded-full flex items-center justify-center">
                      <svg
                        className="w-3 h-3 sm:w-4 sm:h-4 text-white"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={3}
                          d="M20 12H4"
                        />
                      </svg>
                    </div>
                  ) : (
                    // Plus icon when collapsed
                    <div className="w-6 h-6 sm:w-8 sm:h-8 bg-blue-500 hover:bg-blue-600 rounded-full flex items-center justify-center">
                      <svg
                        className="w-3 h-3 sm:w-4 sm:h-4 text-white"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={3}
                          d="M12 4v16m8-8H4"
                        />
                      </svg>
                    </div>
                  )}
                </motion.div>
              </button>

              {/* Answer Content */}
              <AnimatePresence initial={false}>
                {openFAQ === index && (
                  <motion.div
                    key="content"
                    initial="collapsed"
                    animate="open"
                    exit="collapsed"
                    variants={{
                      open: { opacity: 1, height: "auto" },
                      collapsed: { opacity: 0, height: 0 },
                    }}
                    transition={{
                      duration: 0.4,
                      ease: [0.04, 0.62, 0.23, 0.98],
                    }}
                    className="overflow-hidden"
                  >
                    <div className="px-6 sm:px-8 pb-4 sm:pb-6">
                      <div className="bg-blue-50 p-4 sm:p-6 border-l-2 border-blue-200">
                        <p className="text-sm sm:text-base text-gray-700 leading-relaxed">
                          {faq.answer}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default FAQComponent;
