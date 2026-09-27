import React, { useEffect, useState } from "react";
import { ChevronUp } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const BackToTopButton = () => {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShow(window.scrollY > 300);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleClick = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          className="fixed bottom-6 right-6 z-50 group"
          initial={{ opacity: 0, y: 30, scale: 0.8 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 30, scale: 0.8 }}
          transition={{ duration: 0.2 }}
        >
          <span className="absolute bottom-full mb-2 right-1/2 translate-x-1/2 bg-[#1A1D29] text-white text-xs font-semibold px-2.5 py-1 rounded-sm shadow-md opacity-0 group-hover:opacity-100 transition-opacity duration-150 pointer-events-none whitespace-nowrap">
            Back to Top
          </span>
          <button
            onClick={handleClick}
            className="w-11 h-11 bg-[#3730E0] hover:bg-[#2D24C4] text-white rounded-full shadow-md flex items-center justify-center transition-all duration-200 active:scale-95"
            aria-label="Back to top"
          >
            <ChevronUp className="w-5 h-5" />
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default BackToTopButton;
