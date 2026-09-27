import React from "react";
import { motion } from "framer-motion";
import { Pagination as UIPagination } from "../ui/Pagination";

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  if (totalPages <= 1) {
    return null;
  }

  return (
    <motion.div
      className="flex justify-center mt-12 mb-6"
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2 }}
    >
      <UIPagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={onPageChange}
      />
    </motion.div>
  );
};

export default Pagination;
