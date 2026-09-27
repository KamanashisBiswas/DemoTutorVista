import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import CommonSectionHeading from "../Common/CommonSectionHeading";
import Button from "../Common/Button"; // Import Button component

const AvailableTuitionSection = () => {
  const [activeTab, setActiveTab] = useState("Dhaka");

  // Sample tuition data
  const tuitionData = {
    Dhaka: [
      {
        id: 1,
        type: "Home",
        location: "Dhaka",
        medium: "Bangla Medium",
        subjects: ["Bangla", "Bangla", "Bangla"],
        schedule: "5 Days/week",
        time: "Negotiable Time",
        price: "5000 Tk",
      },
      {
        id: 2,
        type: "Home",
        location: "Dhaka",
        medium: "Bangla Medium",
        subjects: ["Bangla", "Bangla", "Bangla"],
        schedule: "5 Days/week",
        time: "Negotiable Time",
        price: "5000 Tk",
      },
      {
        id: 3,
        type: "Home",
        location: "Dhaka",
        medium: "Bangla Medium",
        subjects: ["Bangla", "Bangla", "Bangla"],
        schedule: "5 Days/week",
        time: "Negotiable Time",
        price: "5000 Tk",
      },
      {
        id: 4,
        type: "Home",
        location: "Dhaka",
        medium: "English Medium",
        subjects: ["English", "Math", "Science"],
        schedule: "3 Days/week",
        time: "Evening",
        price: "6000 Tk",
      },
      {
        id: 5,
        type: "Home",
        location: "Dhaka",
        medium: "Bangla Medium",
        subjects: ["Math", "Physics", "Chemistry"],
        schedule: "4 Days/week",
        time: "Afternoon",
        price: "5500 Tk",
      },
      {
        id: 6,
        type: "Home",
        location: "Dhaka",
        medium: "English Version",
        subjects: ["Biology", "ICT", "English"],
        schedule: "6 Days/week",
        time: "Morning",
        price: "7000 Tk",
      },
    ],
    Chattogram: [
      {
        id: 1,
        type: "Home",
        location: "Chattogram",
        medium: "Bangla Medium",
        subjects: ["Bangla", "Bangla", "Bangla"],
        schedule: "5 Days/week",
        time: "Negotiable Time",
        price: "5000 Tk",
      },
      {
        id: 2,
        type: "Home",
        location: "Chattogram",
        medium: "Bangla Medium",
        subjects: ["Bangla", "Bangla", "Bangla"],
        schedule: "5 Days/week",
        time: "Negotiable Time",
        price: "5000 Tk",
      },
      {
        id: 3,
        type: "Home",
        location: "Chattogram",
        medium: "Bangla Medium",
        subjects: ["Bangla", "Bangla", "Bangla"],
        schedule: "5 Days/week",
        time: "Negotiable Time",
        price: "5000 Tk",
      },
      {
        id: 4,
        type: "Home",
        location: "Chattogram",
        medium: "Bangla Medium",
        subjects: ["Bangla", "Bangla", "Bangla"],
        schedule: "5 Days/week",
        time: "Negotiable Time",
        price: "5000 Tk",
      },
      {
        id: 5,
        type: "Home",
        location: "Chattogram",
        medium: "Bangla Medium",
        subjects: ["Bangla", "Bangla", "Bangla"],
        schedule: "5 Days/week",
        time: "Negotiable Time",
        price: "5000 Tk",
      },
      {
        id: 6,
        type: "Home",
        location: "Chattogram",
        medium: "Bangla Medium",
        subjects: ["Bangla", "Bangla", "Bangla"],
        schedule: "5 Days/week",
        time: "Negotiable Time",
        price: "5000 Tk",
      },
    ],
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { type: "spring", stiffness: 150, damping: 20 },
    },
    exit: {
      opacity: 0,
      y: -20,
      transition: { duration: 0.2 },
    },
  };

  return (
    <section className="py-12 bg-gray-50">
      <div className="w-full mx-auto px-4 sm:px-6 lg:px-8 xl:px-12 2xl:px-16 font-dmsans">
        {/* Header Section */}
        <motion.div
          className="flex flex-row justify-center items-center mb-8 sm:mb-12"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
        >
          <div className="mb-6 sm:mb-0 w-full flex flex-col items-center">
            <CommonSectionHeading title="All Available" highlight="Tuition" />

            {/* Tab Navigation - Using Button Component */}
            <div className="flex items-center justify-center gap-3 mt-4">
              {["Dhaka", "Chattogram"].map((city) => (
                <Button
                  key={city}
                  onClick={() => setActiveTab(city)}
                  variant={activeTab === city ? "primary" : "secondary"}
                >
                  {city}
                </Button>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Tuition Cards Grid */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            exit="hidden"
          >
            {tuitionData[activeTab].map((tuition) => (
              <motion.div
                key={tuition.id}
                variants={cardVariants}
                className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-lg transition-all duration-300 hover:-translate-y-1 relative"
              >
                {/* Background Vector Shape */}
                <div className="absolute inset-0 overflow-hidden">
                  <svg
                    className="absolute top-0 right-0 w-full h-full"
                    viewBox="0 0 400 300"
                    fill="none"
                    preserveAspectRatio="xMaxYMin slice"
                  >
                    {/* Main background gradient shape */}
                    <path
                      d="M400 0C400 0 320 20 280 60C240 100 200 80 160 120C120 160 80 140 40 180C0 220 0 0 0 0H400Z"
                      fill="url(#gradient1)"
                      opacity="0.1"
                    />
                    {/* Secondary accent shape */}
                    <circle
                      cx="350"
                      cy="50"
                      r="80"
                      fill="url(#gradient2)"
                      opacity="0.08"
                    />
                    {/* Additional decorative elements */}
                    <path
                      d="M400 100C380 120 360 140 340 120C320 100 300 120 280 100C260 80 240 100 220 80V0H400V100Z"
                      fill="url(#gradient3)"
                      opacity="0.06"
                    />

                    <defs>
                      <linearGradient
                        id="gradient1"
                        x1="0%"
                        y1="0%"
                        x2="100%"
                        y2="100%"
                      >
                        <stop offset="0%" stopColor="#FDE68A" />
                        <stop offset="50%" stopColor="#F59E0B" />
                        <stop offset="100%" stopColor="#D97706" />
                      </linearGradient>
                      <radialGradient id="gradient2" cx="50%" cy="50%" r="50%">
                        <stop offset="0%" stopColor="#FBBF24" />
                        <stop offset="100%" stopColor="#F59E0B" />
                      </radialGradient>
                      <linearGradient
                        id="gradient3"
                        x1="0%"
                        y1="0%"
                        x2="100%"
                        y2="0%"
                      >
                        <stop offset="0%" stopColor="#FEF3C7" />
                        <stop offset="100%" stopColor="#FDE68A" />
                      </linearGradient>
                    </defs>
                  </svg>
                </div>

                {/* Circular Home Badge */}
                <div className="absolute top-6 left-6 w-32 h-32 bg-gradient-to-br from-yellow-200 to-yellow-300 rounded-full flex items-center justify-center shadow-md z-10">
                  <span className="text-orange-600 font-bold text-xl">
                    {tuition.type}
                  </span>
                </div>

                {/* Card Content */}
                <div className="pt-28 px-6 pb-6 relative z-10">
                  {/* Location with icon */}
                  <div className="flex items-center mb-6 mt-4 ml-32 text-gray-700">
                    <svg
                      className="w-5 h-5 text-blue-500 mr-2 flex-shrink-0"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z"
                        clipRule="evenodd"
                      />
                    </svg>
                    <span className="text-lg font-semibold text-gray-800">
                      {tuition.location}
                    </span>
                  </div>

                  {/* Medium */}
                  <div className="mb-4">
                    <h4 className="text-gray-900 font-bold text-lg mb-3">
                      {tuition.medium}
                    </h4>

                    {/* Subject Tags */}
                    <div className="flex flex-wrap gap-2 mb-6">
                      {tuition.subjects.map((subject, index) => (
                        <span
                          key={index}
                          className="bg-orange-200 text-gray-800 px-4 py-2 rounded-lg text-sm font-semibold"
                        >
                          {subject}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Schedule */}
                  <div className="mb-4">
                    <p className="text-gray-800 text-lg font-semibold">
                      {tuition.schedule}
                    </p>
                  </div>

                  {/* Time */}
                  <div className="mb-8">
                    <span className="bg-orange-200 text-gray-800 px-4 py-2 rounded-full text-sm font-semibold">
                      {tuition.time}
                    </span>
                  </div>

                  {/* Price and View Button */}
                  <div className="flex justify-between items-center">
                    <div className="text-blue-600 font-bold text-2xl">
                      ৳ {tuition.price}
                    </div>
                    {/* <button className="bg-white hover:bg-gray-50 text-blue-600 px-6 py-2 rounded-lg text-sm font-semibold border border-gray-200 transition-colors duration-200 shadow-sm">
                    View
                  </button> */}
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
};

export default AvailableTuitionSection;
