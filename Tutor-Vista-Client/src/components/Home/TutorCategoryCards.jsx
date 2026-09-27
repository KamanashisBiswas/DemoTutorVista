import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import Teach from "../../assets/Home/Icon/Teach.svg";
import Female from "../../assets/Home/Icon/Female.svg";
import Quiz from "../../assets/Home/Icon/Quiz.svg";

const TutorCategoryCards = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const cardVariants = {
    hidden: { y: 30, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 120,
      },
    },
  };

  return (
    <section className="w-full mx-auto px-4 sm:px-6 lg:px-8 xl:px-12 2xl:px-16 py-10 font-dmsans relative md:-top-32">
      <motion.div
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
      >
        {/* Dhaka Card */}
        <motion.div
          className="bg-[#9EDC99] rounded-lg text-gray-800 shadow-md hover:shadow-xl transition-shadow duration-300 relative"
          variants={cardVariants}
          whileHover={{ y: -8, scale: 1.03 }}
        >
          <div className="bg-[#CAECC6] p-4 rounded-t-lg rounded-bl-[40px] rounded-br-[40px] rounded-tr-[40px] left-0 top-0 absolute">
            <img src={Teach} alt="Dhaka" className="w-[74px] h-[74px]" />
          </div>
          <h3 className="font-semibold text-lg mt-8 pl-28 py-1 bg-[#CAECC6] w-full">
            Dhaka : 40000+
          </h3>
          <p className="text-lg mt-14 mr-11 ml-6 mb-8">
            Find expert home tutors for all subjects across Dhaka.
          </p>
        </motion.div>

        {/* Chattogram Card */}
        <motion.div
          className="bg-[#7AC6D2] rounded-lg text-gray-800 shadow-md hover:shadow-xl transition-shadow duration-300 relative"
          variants={cardVariants}
          whileHover={{ y: -8, scale: 1.03 }}
        >
          <div className="bg-[#C1D7FC] p-4 rounded-t-lg rounded-bl-[40px] rounded-br-[40px] rounded-tr-[40px] left-0 top-0 absolute">
            <img src={Female} alt="Chattogram" className="w-[74px] h-[74px]" />
          </div>
          <h3 className="font-semibold text-lg mt-8 pl-28 py-1 bg-[#C1D7FC] w-full">
            Chattogram : 13000+
          </h3>
          <p className="text-lg mt-14 mr-11 ml-6 mb-8">
            Get qualified home tutors for all subjects in Chattogram.
          </p>
        </motion.div>

        {/* Request Tutor Card */}
        <motion.div
          className="bg-[#C1D7FC] rounded-lg text-gray-800 shadow-md hover:shadow-xl transition-shadow duration-300 relative"
          variants={cardVariants}
          whileHover={{ y: -8, scale: 1.03 }}
        >
          <div className="bg-[#F0F5FE] p-4 rounded-t-lg rounded-bl-[40px] rounded-br-[40px] rounded-tr-[40px] left-0 top-0 absolute">
            <img src={Quiz} alt="Request Tutor" className="w-[74px] h-[74px]" />
          </div>
          <h3 className="font-semibold text-lg mt-8 pl-28 py-1 bg-[#F0F5FE] w-full">
            Request Tutor
          </h3>
          <p className="text-lg mt-14 mr-11 ml-6">
            Easily request a trusted and experienced tutor tailored to your
            needs.
          </p>
          <Link
            to="/request-tutor"
            className="group text-black font-bold flex mt-5 mb-8 ml-6 items-center gap-1 hover:text-blue-600 transition-colors duration-300"
          >
            <span className="origin-left transition-transform duration-300 group-hover:scale-105">
              Request
            </span>
            <span className="transition-transform duration-300 group-hover:translate-x-1.5">
              →
            </span>
          </Link>
        </motion.div>

        {/* Apply Tutor Card */}
        <motion.div
          className="bg-[#8CB2FF] rounded-lg text-gray-800 shadow-md hover:shadow-xl transition-shadow duration-300 relative"
          variants={cardVariants}
          whileHover={{ y: -8, scale: 1.03 }}
        >
          <div className="bg-[#DFFFF5] p-4 rounded-t-lg rounded-bl-[40px] rounded-br-[40px] rounded-tr-[40px] left-0 top-0 absolute">
            <img src={Quiz} alt="Apply Tutor" className="w-[74px] h-[74px]" />
          </div>
          <h3 className="font-semibold text-lg mt-8 pl-28 py-1 bg-[#DFFFF5] w-full">
            Apply Tutor
          </h3>
          <p className="text-lg mt-14 mr-11 ml-6">
            Start your journey as a home tutor and help students thrive.
          </p>
          <Link
            to="/apply-tutor"
            className="group text-black font-bold flex mt-5 mb-8 ml-6 items-center gap-1 hover:text-blue-500 transition-colors duration-300"
          >
            <span className="origin-left transition-transform duration-300 group-hover:scale-105">
              Apply
            </span>
            <span className="transition-transform duration-300 group-hover:translate-x-1.5">
              →
            </span>
          </Link>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default TutorCategoryCards;
