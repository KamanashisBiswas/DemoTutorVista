import React from "react";
import { motion } from "framer-motion";

import homeTutoringImage from "../../assets/Home/Image/home-tutor.svg";
import onlineTutoringImage from "../../assets/Home/Image/online-tutor.svg";
import groupTutoringImage from "../../assets/Home/Image/group-tutor.svg";
import CommonSectionHeading from "../Common/CommonSectionHeading";

const TuitionTypeSection = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3,
        ease: "easeOut",
      },
    },
  };

  // A more subtle and smooth animation: fade in and scale up
  const cardVariants = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        type: "tween",
        ease: "circOut",
        duration: 0.8,
      },
    },
  };

  return (
    <section className="py-14 md:py-20 bg-white overflow-hidden">
      <div className="w-full mx-auto px-4 sm:px-6 lg:px-8 xl:px-12 2xl:px-16 font-dmsans">
        {/* Section Title */}
        <div className="text-center mb-10 md:mb-16">
          <CommonSectionHeading title="Tuition" highlight="Type" />
          <p className="mt-4 max-w-2xl mx-auto text-gray-600">
            Choose the learning style that best fits your needs. We offer
            flexible options for every student.
          </p>
        </div>

        {/* Cards Grid - Responsive and Centered */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12 max-w-6xl mx-auto"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
        >
          {/* Home Tutoring Card */}
          <motion.div
            className="bg-gradient-to-br from-purple-100 via-purple-50 to-purple-100 rounded-3xl p-6 sm:p-8 group hover:shadow-2xl hover:shadow-purple-200/50 transition-all duration-300 hover:-translate-y-2 w-full border border-purple-200/50"
            variants={cardVariants}
          >
            {/* Image Container */}
            <div className="mb-6 sm:mb-8 flex justify-center">
              <div className="w-full h-48 sm:h-56 flex items-center justify-center transform group-hover:scale-105 transition-transform duration-300">
                <img
                  src={homeTutoringImage}
                  alt="Home Tutoring Illustration"
                  className="w-full h-full object-contain"
                />
              </div>
            </div>

            {/* Content */}
            <div className="text-center">
              <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-3 sm:mb-4">
                Home Tutoring
              </h3>
              <p className="text-gray-600 text-sm sm:text-base leading-relaxed">
                Personalized one-on-one learning at home for better academic
                support.
              </p>
            </div>
          </motion.div>

          {/* Online Tutoring Card */}
          <motion.div
            className="bg-gradient-to-br from-cyan-100 via-cyan-50 to-cyan-100 rounded-3xl p-6 sm:p-8 group hover:shadow-2xl hover:shadow-cyan-200/50 transition-all duration-300 hover:-translate-y-2 w-full border border-cyan-200/50"
            variants={cardVariants}
          >
            {/* Image Container */}
            <div className="mb-6 sm:mb-8 flex justify-center">
              <div className="w-full h-48 sm:h-56 flex items-center justify-center transform group-hover:scale-105 transition-transform duration-300">
                <img
                  src={onlineTutoringImage}
                  alt="Online Tutoring Illustration"
                  className="w-full h-full object-contain"
                />
              </div>
            </div>

            {/* Content */}
            <div className="text-center">
              <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-3 sm:mb-4">
                Online Tutoring
              </h3>
              <p className="text-gray-600 text-sm sm:text-base leading-relaxed">
                Flexible virtual lessons providing personalized education
                anytime, anywhere.
              </p>
            </div>
          </motion.div>

          {/* Group Tutoring Card */}
          <motion.div
            className="bg-gradient-to-br from-green-100 via-green-50 to-green-100 rounded-3xl p-6 sm:p-8 group hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 w-full border border-green-200/50"
            variants={cardVariants}
          >
            <div className="mb-6 sm:mb-8 flex justify-center">
              <div className="w-full h-48 sm:h-56 flex items-center justify-center transform group-hover:scale-105 transition-transform duration-300">
                <img
                  src={groupTutoringImage}
                  alt="Group Tutoring Illustration"
                  className="w-full h-full object-contain"
                />
              </div>
            </div>
            <div className="text-center">
              <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-3 sm:mb-4">
                Group Tutoring
              </h3>
              <p className="text-gray-600 text-sm sm:text-base leading-relaxed mb-6">
                Collaborative sessions where students learn and grow together
                effectively.
              </p>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default TuitionTypeSection;
