import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Phone } from "lucide-react";

// Animation presets - with reduced intensity
const ANIMATIONS = {
  button: {
    hover: { scale: 1.03, boxShadow: "0 10px 25px rgba(34, 197, 94, 0.3)" }, // Softer shadow and scale
    tap: { scale: 0.97 },
    float: {
      y: [0, -3, 0], // Smaller float effect
      transition: { duration: 2, repeat: Infinity, ease: "easeInOut" },
    },
  },
  icon: {
    rotate: [0, 8, -8, 0], // Less rotation
    transition: { duration: 1.5, repeat: Infinity, ease: "easeInOut" },
  },
  container: {
    initial: { opacity: 0, x: -100, scale: 0 },
    animate: { opacity: 1, x: 0, scale: 1 },
    exit: { opacity: 0, x: -100, scale: 0 },
    transition: { type: "spring", stiffness: 260, damping: 15 },
  },
};

// Component for smaller wave effects
const WaveEffects = () => (
  <div className="absolute inset-0 rounded-full">
    <div className="absolute inset-0 rounded-full bg-green-400 animate-ping opacity-15"></div>
    <div className="absolute inset-0 rounded-full bg-green-400 animate-pulse opacity-20"></div>

    {[0, 0.5].map(
      (
        delay,
        index // Reduced to two waves
      ) => (
        <motion.div
          key={index}
          className={`absolute inset-0 rounded-full border border-green-400 opacity-40`}
          animate={{
            scale: [1, 1.6, 1.9], // Smaller scale
            opacity: [0.5, 0.3, 0], // More transparent
          }}
          transition={{
            duration: 1.8, // Faster duration
            repeat: Infinity,
            ease: "easeOut",
            delay,
          }}
        />
      )
    )}
  </div>
);

const FloatingCallButton = ({
  onClick,
  label = "Call Now",
  phoneNumber = "01329-266008",
  position = "bottom-left",
  showAfterScroll = 300,
}) => {
  const [show, setShow] = useState(false);

  const positionClasses =
    {
      "bottom-left": "bottom-5 left-5", // Slightly adjusted position
      "bottom-right": "bottom-5 right-5",
      "mid-left": "top-1/2 -translate-y-1/2 left-5",
      "mid-right": "top-1/2 -translate-y-1/2 right-5",
    }[position] || "bottom-5 left-5";

  useEffect(() => {
    const handleScroll = () => {
      setShow(window.scrollY > showAfterScroll);
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll(); // Check on initial load
    return () => window.removeEventListener("scroll", handleScroll);
  }, [showAfterScroll]);

  const handleCall = () => {
    window.open(`tel:${phoneNumber}`, "_self");
  };

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          className={`fixed ${positionClasses} z-50`}
          {...ANIMATIONS.container}
        >
          <WaveEffects />

          <motion.button
            onClick={onClick || handleCall}
            className="relative bg-green-600 hover:bg-green-700 text-white px-3 py-2 rounded-full shadow-lg flex items-center gap-2 transition-all duration-300 hover:shadow-xl" // Smaller padding and gap
            aria-label={label}
            whileHover={ANIMATIONS.button.hover}
            whileTap={ANIMATIONS.button.tap}
            animate={ANIMATIONS.button.float}
          >
            <motion.div animate={ANIMATIONS.icon}>
              <Phone className="w-4 h-4" /> {/* Smaller icon */}
            </motion.div>
            <div className="text-left">
              <div className="font-semibold text-xs">{label}</div>{" "}
              {/* Smaller font */}
              <div className="text-[10px] opacity-90">{phoneNumber}</div>{" "}
              {/* Smaller font */}
            </div>
          </motion.button>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default FloatingCallButton;
