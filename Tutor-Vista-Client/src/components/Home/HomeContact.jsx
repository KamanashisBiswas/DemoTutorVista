import React from "react";
import HomeAboutImg from "../../assets/About/AboutUs1.jpg";
import { Link } from "react-router-dom";
import Button from "../Common/Button";
import { motion } from "framer-motion";
import CommonSectionHeading from "../Common/CommonSectionHeading";

const HomeContact = () => {
  const slideInLeft = {
    hidden: { x: -100, opacity: 0 },
    visible: {
      x: 0,
      opacity: 1,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  };

  const slideInRight = {
    hidden: { x: 100, opacity: 0 },
    visible: {
      x: 0,
      opacity: 1,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  };

  return (
    <section className="bg-white md:-mt-24 overflow-hidden">
      <div className="w-full mx-auto px-4 sm:px-6 lg:px-8 xl:px-12 2xl:px-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center">
          {/* Left Side - Image */}
          <motion.div
            className="order-1 lg:order-1 flex justify-center lg:justify-start"
            variants={slideInLeft}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
          >
            <div className="relative w-full">
              {/* Background decorative lines */}
              <div className="absolute -top-4 -left-4 w-24 h-24 opacity-30">
                <svg
                  viewBox="0 0 100 100"
                  className="w-full h-full text-gray-300"
                >
                  <defs>
                    <pattern
                      id="lines"
                      patternUnits="userSpaceOnUse"
                      width="10"
                      height="10"
                    >
                      <path
                        d="M 0,10 l 10,-10 M -2.5,2.5 l 5,-5 M 7.5,12.5 l 5,-5"
                        stroke="currentColor"
                        strokeWidth="1"
                      />
                    </pattern>
                  </defs>
                  <rect width="100" height="100" fill="url(#lines)" />
                </svg>
              </div>

              {/* Main image */}
              <motion.img
                src={HomeAboutImg}
                alt="Student with books"
                className="w-full rounded-lg h-auto relative z-10"
                whileHover={{ scale: 1.05 }}
                transition={{ type: "spring", stiffness: 300 }}
              />
            </div>
          </motion.div>

          {/* Right Side - Content */}
          <motion.div
            className="order-2 lg:order-2 font-dmsans text-center lg:text-left"
            variants={slideInRight}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
          >
            {/* About US heading */}
            <CommonSectionHeading title="About" highlight="US" />

            {/* Main heading */}
            <h3 className="text-xl sm:text-2xl lg:text-3xl xl:text-4xl font-bold text-gray-900 leading-tight lg:leading-[1.2] xl:leading-[1.30] mb-6 sm:mb-8">
              Connecting <span className="text-blue-500">Students</span>
              <br />
              with Top <span className="text-blue-500">Tutors</span>
            </h3>

            {/* Description */}
            <p className="text-base sm:text-lg lg:text-xl text-gray-700 leading-relaxed mb-8 sm:mb-10 max-w-2xl mx-auto lg:mx-0">
              We help students achieve academic success by connecting them with
              experienced, thoroughly verified tutors who provide personalized,
              one-on-one learning sessions in the comfort of their own home.
            </p>

            {/* Explore button */}
            <Link to="/about">
              <Button>Explore</Button>
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default HomeContact;
