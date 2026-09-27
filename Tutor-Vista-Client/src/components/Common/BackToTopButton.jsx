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
          initial={{ opacity: 0, y: 50, scale: 0.5 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 50, scale: 0.5 }}
          transition={{ type: "spring", stiffness: 300, damping: 20 }}
        >
          <span className="absolute bottom-full mb-2 right-1/2 translate-x-1/2 bg-gray-800 text-white text-xs font-semibold px-3 py-1 rounded-md shadow-lg opacity-0 scale-90 group-hover:opacity-100 group-hover:scale-100 transition-all duration-150 ease-in-out pointer-events-none whitespace-nowrap">
            Back to Top
          </span>
          <motion.button
            onClick={handleClick}
            className="bg-black hover:bg-gray-800 text-white p-3 rounded-full shadow-lg flex items-center justify-center transition-colors duration-150"
            aria-label="Back to top"
            whileHover={{ scale: 1.15, y: -5, backgroundColor: "#1f2937" }} // darker on hover
            whileTap={{ scale: 0.95 }}
            animate={{
              scale: [1, 1.07, 1], // Wave effect
            }}
            transition={{
              default: { type: "spring", stiffness: 400, damping: 17 },
              scale: {
                duration: 2,
                repeat: Infinity,
                repeatType: "mirror",
                ease: "easeInOut",
              },
            }}
          >
            <ChevronUp className="w-6 h-6" />
          </motion.button>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default BackToTopButton;
