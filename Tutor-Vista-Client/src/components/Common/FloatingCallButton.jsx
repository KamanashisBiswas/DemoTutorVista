import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { PhoneCall } from "lucide-react";

const FloatingCallButton = ({
  onClick,
  label = "Direct Helpline",
  phoneNumber = "01700-000000",
  position = "bottom-left",
  showAfterScroll = 300,
}) => {
  const [show, setShow] = useState(false);

  const positionClasses =
    {
      "bottom-left": "bottom-6 left-6",
      "bottom-right": "bottom-6 right-6",
    }[position] || "bottom-6 left-6";

  useEffect(() => {
    const handleScroll = () => {
      setShow(window.scrollY > showAfterScroll);
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll();
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
          initial={{ opacity: 0, y: 30, scale: 0.85 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 30, scale: 0.85 }}
          transition={{ duration: 0.25 }}
        >
          <button
            onClick={onClick || handleCall}
            className="group relative bg-[#0EA5A0] hover:bg-[#0D9488] text-white px-4 py-2.5 rounded-full shadow-md hover:shadow-lg flex items-center gap-2.5 transition-all duration-200 active:scale-95 border border-white/20"
            aria-label={label}
          >
            <div className="w-7 h-7 rounded-full bg-white/20 flex items-center justify-center shrink-0">
              <PhoneCall className="w-3.5 h-3.5 text-white" />
            </div>
            <div className="text-left">
              <div className="font-semibold text-xs leading-tight">{label}</div>
              <div className="text-[11px] font-medium text-white/90">{phoneNumber}</div>
            </div>
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default FloatingCallButton;
