import React from "react";
import { motion } from "framer-motion";
import CommonSectionHeading from "../Common/CommonSectionHeading";

const TuitionRequestHeader = () => {
  return (
    <motion.div
      className="text-center mb-12"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <CommonSectionHeading title="All" highlight="Tuition Request" />
      <p className="text-gray-600 mt-4 max-w-2xl mx-auto">
        Browse through all available tuition jobs and find the perfect
        opportunity for teaching
      </p>
    </motion.div>
  );
};

export default TuitionRequestHeader;
