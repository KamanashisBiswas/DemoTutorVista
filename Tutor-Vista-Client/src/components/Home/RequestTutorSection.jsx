import React, { useState, useEffect } from "react";
// eslint-disable-next-line no-unused-vars
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { MapPinned } from "lucide-react";
import axios from "../../lib/axios";
import CommonSectionHeading from "../Common/CommonSectionHeading";
import TuitionRequestCard from "../TuitionRequestCard";

const RequestTutorSection = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("Dhaka");
  const [allRequests, setAllRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const CARDS_PER_DIVISION = 6;

  const normalizeDivision = (value = "") => {
    const normalized = value.toLowerCase().trim();

    if (normalized === "chattagram" || normalized === "chittagong") {
      return "chattogram";
    }

    return normalized;
  };

  useEffect(() => {
    const fetchRequests = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await axios.get("/api/request-tutor", {
          params: {
            limit: CARDS_PER_DIVISION,
            page: 1,
            isActive: true,
            division: activeTab,
          },
        });
        if (response.data.success) {
          setAllRequests(response.data.data.requests || []);
        } else {
          setAllRequests([]);
        }
      } catch {
        setError("Failed to load tutor requests");
        setAllRequests([]);
      } finally {
        setLoading(false);
      }
    };
    fetchRequests();
  }, [activeTab]);

  const filteredRequests = allRequests
    .filter((request) => {
      const reqDivision = normalizeDivision(
        request.division || request.adminDivision || "",
      );
      return reqDivision === normalizeDivision(activeTab);
    })
    .slice(0, CARDS_PER_DIVISION);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 },
    },
    exit: { opacity: 0 },
  };

  const handleTabChange = (tab) => setActiveTab(tab);
  const handleSeeMoreJobs = () => navigate("/tuition-jobs");

  return (
    <section className="py-12 bg-gradient-to-b from-gray-50 to-white">
      <div className="w-full mx-auto px-4 sm:px-6 lg:px-8 xl:px-12 2xl:px-16 font-dmsans">
        {/* Header Section */}
        <motion.div
          className="flex flex-row justify-center items-center mb-8 sm:mb-12"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
        >
          <div className="mb-6 sm:mb-0 w-full flex flex-col items-center">
            <CommonSectionHeading title="All Available" highlight="Tuitions" />

            {/* Tab Navigation - Segmented Control Style */}
            <div className="mt-12 mb-4 relative">
              <div className="inline-flex items-center gap-1 bg-white rounded-full p-1.5 sm:p-2 shadow-lg border-2 border-gray-200">
                {["Dhaka", "Chattogram", "Khulna", "Sylhet"].map((city) => {
                  const isActive = activeTab === city;

                  return (
                    <motion.button
                      key={city}
                      onClick={() => handleTabChange(city)}
                      className={`relative px-3 py-2 sm:px-6 sm:py-3 rounded-full text-xs sm:text-sm font-semibold transition-all duration-300 min-w-[70px] sm:min-w-[120px] ${
                        isActive
                          ? "bg-blue-600 text-white shadow-lg"
                          : "text-gray-600 hover:text-gray-900 hover:bg-gray-50"
                      }`}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      {/* Map Pin Icon Animation - Above Button */}
                      <AnimatePresence>
                        {isActive && (
                          <motion.div
                            className="absolute left-[40%] -translate-x-1/2 -translate-y-1/2 -top-9"
                            initial={{ y: 30, opacity: 0, scale: 0.3 }}
                            animate={{ y: 0, opacity: 1, scale: 1 }}
                            exit={{ y: 20, opacity: 0, scale: 0.3 }}
                            transition={{
                              type: "spring",
                              stiffness: 500,
                              damping: 25,
                            }}
                          >
                            <MapPinned
                              className="w-6 h-6 sm:w-8 sm:h-8 text-blue-600"
                              fill="currentColor"
                              strokeWidth={0}
                            />
                          </motion.div>
                        )}
                      </AnimatePresence>

                      <span className="relative z-10">{city}</span>
                    </motion.button>
                  );
                })}
              </div>
            </div>
          </div>
        </motion.div>

        {/* Loading state */}
        {loading && (
          <div className="text-center py-16">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
            <p className="text-gray-500 mt-4">Loading tuition jobs...</p>
          </div>
        )}

        {/* Error state */}
        {error && !loading && (
          <div className="text-center py-16">
            <div className="text-red-400 mb-4">
              <svg
                className="w-16 h-16 mx-auto"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
            <p className="text-red-500 text-lg font-medium">
              Failed to load tuition jobs
            </p>
            <p className="text-gray-400 text-sm mt-2">Please try again later</p>
          </div>
        )}

        {/* Tuition Jobs Grid */}
        {!loading && !error && (
          <AnimatePresence mode="wait">
            {filteredRequests.length > 0 ? (
              <motion.div
                key={activeTab}
                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8"
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
              >
                {filteredRequests.map((request) => (
                  <TuitionRequestCard key={request._id} request={request} />
                ))}
              </motion.div>
            ) : (
              <motion.div
                key={`${activeTab}-empty`}
                className="flex flex-col items-center justify-center text-center py-16 px-6 bg-gradient-to-br from-white via-blue-50/30 to-indigo-50/40 rounded-3xl shadow-xl border border-blue-100/50 relative overflow-hidden min-h-[500px]"
                initial={{ opacity: 0, y: 40, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 40, scale: 0.95 }}
                transition={{ duration: 0.6, type: "spring", bounce: 0.3 }}
              >
                {/* Decorative background elements */}
                <div className="absolute inset-0 overflow-hidden pointer-events-none">
                  <div className="absolute -top-20 -left-20 w-64 h-64 bg-blue-200/20 rounded-full blur-3xl animate-pulse"></div>
                  <div className="absolute -bottom-20 -right-20 w-80 h-80 bg-indigo-200/20 rounded-full blur-3xl animate-pulse [animation-delay:1s]"></div>
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-purple-100/10 rounded-full blur-3xl"></div>
                </div>

                {/* Content */}
                <div className="relative z-10">
                  {/* Animated Icon */}
                  <motion.div
                    className="mb-8 inline-block"
                    initial={{ scale: 0, rotate: -180 }}
                    animate={{ scale: 1, rotate: 0 }}
                    transition={{
                      type: "spring",
                      stiffness: 200,
                      damping: 15,
                      delay: 0.2,
                    }}
                  >
                    <div className="relative">
                      <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-indigo-400 rounded-full blur-xl opacity-40 animate-pulse"></div>
                      <div className="relative bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full p-8 shadow-2xl">
                        <svg
                          className="w-20 h-20 text-white"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={1.5}
                            d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                          />
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={1.5}
                            d="M9 12l2 2 4-4"
                            opacity={0.4}
                          />
                        </svg>
                      </div>
                    </div>
                  </motion.div>

                  {/* Title */}
                  <motion.h3
                    className="text-3xl md:text-4xl font-bold text-gray-800 mb-4 tracking-tight"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                  >
                    No Tuitions Available in{" "}
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">
                      {activeTab}
                    </span>
                  </motion.h3>

                  {/* Description */}
                  <motion.p
                    className="text-lg text-gray-600 mb-8 max-w-md mx-auto leading-relaxed"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.4 }}
                  >
                    Currently, there are no active tuition requests in this
                    area. New opportunities are posted regularly, so please
                    check back soon!
                  </motion.p>

                  {/* Suggestions */}
                  <motion.div
                    className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-blue-100 max-w-lg mx-auto"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 }}
                  >
                    <h4 className="text-sm font-semibold text-gray-700 mb-4 flex items-center justify-center gap-2">
                      <svg
                        className="w-5 h-5 text-blue-500"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path d="M11 3a1 1 0 10-2 0v1a1 1 0 102 0V3zM15.657 5.757a1 1 0 00-1.414-1.414l-.707.707a1 1 0 001.414 1.414l.707-.707zM18 10a1 1 0 01-1 1h-1a1 1 0 110-2h1a1 1 0 011 1zM5.05 6.464A1 1 0 106.464 5.05l-.707-.707a1 1 0 00-1.414 1.414l.707.707zM5 10a1 1 0 01-1 1H3a1 1 0 110-2h1a1 1 0 011 1zM8 16v-1h4v1a2 2 0 11-4 0zM12 14c.015-.34.208-.646.477-.859a4 4 0 10-4.954 0c.27.213.462.519.476.859h4.002z" />
                      </svg>
                      What You Can Do
                    </h4>
                    <div className="space-y-3 text-left">
                      <div className="flex items-start gap-3">
                        <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                        <p className="text-sm text-gray-600">
                          Try selecting a different city from the tabs above
                        </p>
                      </div>
                      <div className="flex items-start gap-3">
                        <div className="w-2 h-2 bg-indigo-500 rounded-full mt-2 flex-shrink-0"></div>
                        <p className="text-sm text-gray-600">
                          Refresh the page to check for new listings
                        </p>
                      </div>
                      <div className="flex items-start gap-3">
                        <div className="w-2 h-2 bg-purple-500 rounded-full mt-2 flex-shrink-0"></div>
                        <p className="text-sm text-gray-600">
                          Visit again later for updated opportunities
                        </p>
                      </div>
                    </div>
                  </motion.div>

                  {/* Animated dots */}
                  <motion.div
                    className="flex gap-2 justify-center mt-8"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.6 }}
                  >
                    <div className="h-2 w-2 bg-blue-400 rounded-full animate-bounce [animation-delay:-0.3s]"></div>
                    <div className="h-2 w-2 bg-indigo-500 rounded-full animate-bounce [animation-delay:-0.15s]"></div>
                    <div className="h-2 w-2 bg-purple-400 rounded-full animate-bounce"></div>
                  </motion.div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        )}

        {/* See More Button */}
        {!loading && !error && filteredRequests.length > 0 && (
          <motion.div
            className="flex justify-center mt-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
          >
            <button
              onClick={handleSeeMoreJobs}
              className="px-8 py-4 bg-blue-600 text-white font-semibold text-lg rounded-full shadow-lg hover:bg-blue-700 transition-all duration-300 hover:scale-105 active:scale-95"
            >
              See More Tuition Jobs
            </button>
          </motion.div>
        )}
      </div>
    </section>
  );
};

export default RequestTutorSection;
