import React from "react";
import { motion } from "framer-motion";
import CommonSectionHeading from "../Common/CommonSectionHeading";

const TutorPageHeader = () => {
  return (
    <motion.div
      className="text-center mb-12"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <CommonSectionHeading title="All" highlight="Available Tutors" />
      <p className="text-gray-600 mt-4 max-w-2xl mx-auto">
        Find the perfect tutor from our extensive network of qualified educators
      </p>
    </motion.div>
  );
};

export default TutorPageHeader;
