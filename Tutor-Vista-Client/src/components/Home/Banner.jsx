import React, { useState, useEffect } from "react";
// import BannerImg1 from "../../assets/Home/HomeBanner.png";
import BannerImg1 from "../../assets/Home/HomeBanner2.jpg";
import BannerImg4 from "../../assets/Home/HomeBanner.jpg";
import BannerImg2 from "../../assets/Home/bannar-1.jpg";
import BannerImg3 from "../../assets/Home/bannar-2.jpg";
// import BannerImg3 from "../../assets/Home/HomeBanner3.svg";
// import BannerImg1 from "../../assets/Home/HomeBanner_new1.svg";
// import BannerImg3 from "../../assets/Home/HomeBanner_new2.svg";
// import BannerImg3 from "../../assets/Home/HomeBanner_new3.svg";
import { Typewriter } from "react-simple-typewriter";
import { motion, AnimatePresence } from "framer-motion";

// Banner Images Function - Add or remove images here
const getBannerImages = () => {
  return [BannerImg1, BannerImg2, BannerImg3, BannerImg4];
};

const Banner = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const images = getBannerImages();
  const autoPlayDuration = 4000; // 4 seconds per image
  const [[page, direction], setPage] = useState([0, 0]);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prevIndex) => {
        const newIndex = (prevIndex + 1) % images.length;
        setPage([newIndex, 1]);
        return newIndex;
      });
    }, autoPlayDuration);

    return () => clearInterval(timer);
  }, [images.length]);

  const paginate = (newDirection) => {
    const newIndex =
      (currentIndex + newDirection + images.length) % images.length;
    setPage([newIndex, newDirection]);
    setCurrentIndex(newIndex);
  };

  const swipeConfidenceThreshold = 10000;
  const swipePower = (offset, velocity) => {
    return Math.abs(offset) * velocity;
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { x: -50, opacity: 0 },
    visible: {
      x: 0,
      opacity: 1,
      transition: { type: "spring", stiffness: 100 },
    },
  };

  return (
    <section className="bg-white font-dmsans relative overflow-hidden">
      <div className="w-full mx-auto px-4 sm:px-6 lg:px-8 xl:px-12 2xl:px-16 py-12 flex flex-col-reverse md:flex-row items-center gap-10">
        {/* Left Content */}
        <motion.div
          className="w-full md:w-1/2 text-center md:text-left"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.h1
            className="text-3xl lg:text-5xl font-bold text-gray-900 leading-tight"
            variants={itemVariants}
          >
            {/* Typewriter effect for the heading */}
            <Typewriter
              words={["Top Tutors, Easy Access"]}
              loop={false}
              cursor
              cursorStyle="|"
              typeSpeed={70}
              deleteSpeed={50}
              delaySpeed={1000}
            />
          </motion.h1>
          <motion.p
            className="mt-4 text-lg text-gray-600"
            variants={itemVariants}
          >
            Trusted, expert home tutors for every subject — now available in
            Dhaka and Chattogram.
          </motion.p>
        </motion.div>

        {/* Right Image Carousel */}
        <div className="w-full md:w-1/2 flex justify-center relative">
          <div className="relative w-full h-full overflow-hidden">
            <AnimatePresence initial={false} custom={direction} mode="wait">
              <motion.img
                key={currentIndex}
                src={images[currentIndex]}
                alt={`Tutoring Illustration ${currentIndex + 1}`}
                className="w-full h-full object-contain"
                custom={direction}
                initial={{ x: direction > 0 ? 300 : -300, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                exit={{ x: direction > 0 ? -300 : 300, opacity: 0 }}
                transition={{
                  x: { type: "spring", stiffness: 300, damping: 30 },
                  opacity: { duration: 0.2 },
                }}
                drag="x"
                dragConstraints={{ left: 0, right: 0 }}
                dragElastic={1}
                onDragEnd={(e, { offset, velocity }) => {
                  const swipe = swipePower(offset.x, velocity.x);

                  if (swipe < -swipeConfidenceThreshold) {
                    paginate(1);
                  } else if (swipe > swipeConfidenceThreshold) {
                    paginate(-1);
                  }
                }}
              />
            </AnimatePresence>

            {/* Progress Bar - Center Right */}
            <div className="absolute top-1/2 right-4 transform -translate-y-1/2 flex flex-col gap-2">
              {images.map((_, index) => (
                <div
                  key={index}
                  className="w-1 h-16 bg-gray-300 rounded-full overflow-hidden cursor-pointer"
                  onClick={() => {
                    setPage([index, index > currentIndex ? 1 : -1]);
                    setCurrentIndex(index);
                  }}
                >
                  <motion.div
                    className="w-full bg-blue-600 rounded-full"
                    initial={{ height: "0%" }}
                    animate={{
                      height:
                        index === currentIndex
                          ? "100%"
                          : index < currentIndex
                          ? "100%"
                          : "0%",
                    }}
                    transition={{
                      duration:
                        index === currentIndex ? autoPlayDuration / 1000 : 0.3,
                      ease: index === currentIndex ? "linear" : "easeInOut",
                    }}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Banner;
