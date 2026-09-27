import React, { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { Users, UserCheck, Briefcase, Star } from "lucide-react";

const StatisticsSection = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [counters, setCounters] = useState({
    totalApplied: 0,
    totalTutors: 0,
    liveTuitionJobs: 0,
    tutorRating: 0,
  });

  const sectionRef = useRef(null);

  const finalValues = {
    totalApplied: 780,
    totalTutors: 40000,
    liveTuitionJobs: 127,
    tutorRating: 4.8,
  };

  // Animation variants for Framer Motion
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 25, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
      },
    },
  };

  // Intersection Observer to trigger animation when section is visible
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !isVisible) {
          setIsVisible(true);
        }
      },
      { threshold: 0.3 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, [isVisible]);

  // Counter animation effect
  useEffect(() => {
    if (!isVisible) return;

    const duration = 2000; // 2 seconds
    const steps = 60; // 60 steps for smooth animation
    const stepTime = duration / steps;

    const intervals = {};

    // Animate each counter
    Object.keys(finalValues).forEach((key) => {
      const finalValue = finalValues[key];
      const increment = finalValue / steps;
      let currentStep = 0;

      intervals[key] = setInterval(() => {
        currentStep++;
        const newValue =
          key === "tutorRating"
            ? Math.min(currentStep * increment, finalValue).toFixed(1)
            : Math.floor(Math.min(currentStep * increment, finalValue));

        setCounters((prev) => ({
          ...prev,
          [key]: newValue,
        }));

        if (currentStep >= steps) {
          clearInterval(intervals[key]);
          // Set final exact value
          setCounters((prev) => ({
            ...prev,
            [key]: key === "tutorRating" ? finalValue.toFixed(1) : finalValue,
          }));
        }
      }, stepTime);
    });

    // Cleanup intervals
    return () => {
      Object.values(intervals).forEach((interval) => clearInterval(interval));
    };
  }, [isVisible]);

  const formatNumber = (num, isRating = false) => {
    if (isRating) return num;
    return num.toLocaleString() + "+";
  };

  return (
    <section className="py-14 bg-gray-50 relative" ref={sectionRef}>
      <div className="w-full mx-auto px-4 sm:px-6 lg:px-8 xl:px-12 2xl:px-16 font-dmsans">
        {/* Statistics Grid */}
        <motion.div
          className="grid grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-10 lg:gap-8"
          variants={containerVariants}
          initial="hidden"
          animate={isVisible ? "visible" : "hidden"}
        >
          {/* Total Applied */}
          <motion.div
            className="bg-white rounded-2xl p-4 sm:p-6 lg:p-8 xl:p-10 shadow-sm hover:shadow-md transition-all duration-300 transform hover:-translate-y-1 text-center relative pt-16 sm:pt-18 lg:pt-16"
            variants={itemVariants}
          >
            {/* Icon - Half inside, half outside */}
            <div className="absolute -top-6 sm:-top-8 left-1/2 transform -translate-x-1/2">
              <div className="w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 lg:w-16 lg:h-16 bg-blue-500 rounded-full flex items-center justify-center shadow-lg">
                <Users className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 lg:w-8 lg:h-8 text-white" />
              </div>
            </div>
            <div className="mb-2 sm:mb-4">
              <h3 className="text-xl sm:text-2xl lg:text-3xl xl:text-4xl 2xl:text-5xl font-bold text-blue-600 mb-1 sm:mb-2 font-mono tracking-tight">
                {formatNumber(counters.totalApplied)}
              </h3>
              <p className="text-gray-700 text-xs sm:text-sm lg:text-base xl:text-lg font-semibold">
                Total Applied
              </p>
            </div>
          </motion.div>

          {/* Total Tutors */}
          <motion.div
            className="bg-white rounded-2xl p-4 sm:p-6 lg:p-8 xl:p-10 shadow-sm hover:shadow-md transition-all duration-300 transform hover:-translate-y-1 text-center relative pt-16 sm:pt-18 lg:pt-16"
            variants={itemVariants}
          >
            {/* Icon - Half inside, half outside */}
            <div className="absolute -top-6 sm:-top-8 left-1/2 transform -translate-x-1/2">
              <div className="w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 lg:w-16 lg:h-16 bg-green-500 rounded-full flex items-center justify-center shadow-lg">
                <UserCheck className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 lg:w-8 lg:h-8 text-white" />
              </div>
            </div>
            <div className="mb-2 sm:mb-4">
              <h3 className="text-xl sm:text-2xl lg:text-3xl xl:text-4xl 2xl:text-5xl font-bold text-blue-600 mb-1 sm:mb-2 font-mono tracking-tight">
                {formatNumber(counters.totalTutors)}
              </h3>
              <p className="text-gray-700 text-xs sm:text-sm lg:text-base xl:text-lg font-semibold">
                Total Tutors
              </p>
            </div>
          </motion.div>

          {/* Live Tuition Jobs */}
          <motion.div
            className="bg-white rounded-2xl p-4 sm:p-6 lg:p-8 xl:p-10 shadow-sm hover:shadow-md transition-all duration-300 transform hover:-translate-y-1 text-center relative pt-16 sm:pt-18 lg:pt-16"
            variants={itemVariants}
          >
            {/* Icon - Half inside, half outside */}
            <div className="absolute -top-6 sm:-top-8 left-1/2 transform -translate-x-1/2">
              <div className="w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 lg:w-16 lg:h-16 bg-purple-500 rounded-full flex items-center justify-center shadow-lg">
                <Briefcase className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 lg:w-8 lg:h-8 text-white" />
              </div>
            </div>
            <div className="mb-2 sm:mb-4">
              <h3 className="text-xl sm:text-2xl lg:text-3xl xl:text-4xl 2xl:text-5xl font-bold text-blue-600 mb-1 sm:mb-2 font-mono tracking-tight">
                {formatNumber(counters.liveTuitionJobs)}
              </h3>
              <p className="text-gray-700 text-xs sm:text-sm lg:text-base xl:text-lg font-semibold">
                Live Tuition Jobs
              </p>
            </div>
          </motion.div>

          {/* Tutor Rating */}
          <motion.div
            className="bg-white rounded-2xl p-4 sm:p-6 lg:p-8 xl:p-10 shadow-sm hover:shadow-md transition-all duration-300 transform hover:-translate-y-1 text-center relative pt-16 sm:pt-18 lg:pt-16"
            variants={itemVariants}
          >
            {/* Icon - Half inside, half outside */}
            <div className="absolute -top-6 sm:-top-8 left-1/2 transform -translate-x-1/2">
              <div className="w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 lg:w-16 lg:h-16 bg-yellow-500 rounded-full flex items-center justify-center shadow-lg">
                <Star className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 lg:w-8 lg:h-8 text-white fill-current" />
              </div>
            </div>
            <div className="mb-2 sm:mb-4">
              <h3 className="text-xl sm:text-2xl lg:text-3xl xl:text-4xl 2xl:text-5xl font-bold text-blue-600 mb-1 sm:mb-2 font-mono tracking-tight">
                {counters.tutorRating}
              </h3>
              <p className="text-gray-700 text-xs sm:text-sm lg:text-base xl:text-lg font-semibold">
                Tutor Rating
              </p>
            </div>
          </motion.div>
        </motion.div>

        {/* Optional: Add a subtle background pattern */}
        <div className="absolute inset-0 opacity-5 pointer-events-none">
          <div className="absolute top-10 left-10 w-20 h-20 bg-blue-500 rounded-full"></div>
          <div className="absolute bottom-10 right-10 w-16 h-16 bg-green-500 rounded-full"></div>
          <div className="absolute top-1/2 left-1/4 w-12 h-12 bg-purple-500 rounded-full"></div>
        </div>
      </div>
    </section>
  );
};

export default StatisticsSection;
