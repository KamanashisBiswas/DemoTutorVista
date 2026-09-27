import React, { useEffect } from "react";
import { motion } from "framer-motion";
import VisionImg from "../assets/About/vision1.jpg";
import MissionImg from "../assets/About/Mission2.svg";
import ChooseImg from "../assets/About/chooce-us.png";
import CommonSectionHeading from "../components/Common/CommonSectionHeading";

const AboutUsPage = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const sectionVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5,
        ease: "easeInOut",
      },
    },
  };

  const slideInLeft = {
    hidden: { x: -50, opacity: 0 },
    visible: {
      x: 0,
      opacity: 1,
      transition: {
        duration: 0.7,
        ease: "easeOut",
      },
    },
  };

  const slideInRight = {
    hidden: { x: 50, opacity: 0 },
    visible: {
      x: 0,
      opacity: 1,
      transition: {
        duration: 0.7,
        ease: "easeOut",
      },
    },
  };

  return (
    <div className="bg-white font-dmsans">
      {/* Header Section */}
      <section className="py-10 overflow-hidden">
        <motion.div
          className="w-full mx-auto px-4 sm:px-6 lg:px-8 xl:px-12 2xl:px-16 text-center"
          initial="hidden"
          animate="visible"
          variants={sectionVariants}
        >
          <CommonSectionHeading title="About" highlight="US" />
          <motion.p
            className="text-base sm:text-lg leading-relaxed text-justify"
            variants={itemVariants}
          >
            At Tutor Vista, we are dedicated to transforming the educational
            experience by offering high-quality, responsible, and reliable
            private tutors. With over 1 lakh verified tutors across Dhaka and
            Chattogram, we are fully licensed under the government, ensuring
            that our services are legitimate and trustworthy. Whether it's a
            young learner just starting their journey, a student preparing for
            exams, or someone seeking specialized knowledge in areas like art,
            music, or spoken English, we are here to ensure that every student
            gets the attention and support they deserve. We are not just a
            tutoring service; we are a bridge that connects students, parents,
            and tutors to the finest educational experience possible. Our
            commitment is to continuously strive for excellence and to provide
            the best service tailored to the needs of guardians, students, and
            tutors.
          </motion.p>
        </motion.div>
      </section>

      {/* Our Vision Section */}
      <section className="pb-12 overflow-hidden">
        <div className="w-full mx-auto px-4 sm:px-6 lg:px-8 xl:px-12 2xl:px-16">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center">
            {/* Left Content */}
            <motion.div
              className="order-2 lg:order-1"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
              variants={slideInLeft}
            >
              <motion.div
                className="bg-gradient-to-br from-blue-50 to-indigo-100 p-10 sm:p-10 lg:p-16 border-2 border-blue-200 transition-shadow duration-500 group"
                style={{ borderRadius: "0 6rem 0 6rem" }}
                whileHover={{ scale: 1.02, shadow: "xl" }}
              >
                <motion.div
                  variants={sectionVariants}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                >
                  <motion.h2
                    className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-6 sm:mb-8"
                    variants={itemVariants}
                  >
                    Our <span className="text-blue-600">Vision</span>
                  </motion.h2>
                  <motion.div
                    className="space-y-6 font-medium text-justify"
                    variants={sectionVariants}
                  >
                    <motion.p
                      className="text-base sm:text-lg leading-relaxed"
                      variants={itemVariants}
                    >
                      Our vision is to become the leading educational platform
                      for private tutoring in Bangladesh, creating a dynamic and
                      engaging learning environment where students are inspired,
                      motivated, and equipped to achieve academic excellence. We
                      see a future where every student has access to the best
                      tutors, enabling them to thrive in their studies, build
                      confidence, and face the challenges of tomorrow with
                      knowledge and skill.
                    </motion.p>
                    <motion.p
                      className="text-base sm:text-lg leading-relaxed"
                      variants={itemVariants}
                    >
                      We aspire to not only provide educational services but
                      also to make a lasting impact on the educational landscape
                      in Bangladesh, making learning an enjoyable and fulfilling
                      journey for students and a rewarding experience for
                      tutors. Through continuous innovation, dedication, and a
                      commitment to excellence, we will shape the future of
                      education.
                    </motion.p>
                  </motion.div>
                </motion.div>
              </motion.div>
            </motion.div>

            {/* Right Image */}
            <motion.div
              className="order-1 lg:order-2 flex justify-center"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
              variants={slideInRight}
            >
              <motion.img
                src={VisionImg}
                alt="Our Vision"
                className="w-full max-w-md lg:max-w-lg xl:max-w-xl rounded-xl"
                whileHover={{ scale: 1.05, rotate: 2 }}
                transition={{ duration: 0.3 }}
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Our Mission Section */}
      <section className="py-12 overflow-hidden">
        <div className="w-full mx-auto px-4 sm:px-6 lg:px-8 xl:px-12 2xl:px-16">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center">
            {/* Left Image */}
            <motion.div
              className="flex justify-center"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
              variants={slideInLeft}
            >
              <motion.img
                src={MissionImg}
                alt="Our Mission"
                className="w-full max-w-md lg:max-w-lg xl:max-w-xl h-auto"
                whileHover={{ scale: 1.05, rotate: -2 }}
                transition={{ duration: 0.3 }}
              />
            </motion.div>

            {/* Right Content */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
              variants={slideInRight}
            >
              <motion.div
                className="bg-gradient-to-br from-green-50 to-emerald-100 p-10 sm:p-10 text-justify lg:p-16 border-2 border-green-200 transition-shadow duration-500 group"
                style={{ borderRadius: "6rem 0 6rem 0" }}
                whileHover={{ scale: 1.02, shadow: "xl" }}
              >
                <motion.div
                  variants={sectionVariants}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                >
                  <motion.h2
                    className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-6 sm:mb-8"
                    variants={itemVariants}
                  >
                    Our <span className="text-green-600">Mission</span>
                  </motion.h2>
                  <motion.div
                    className="space-y-6 font-medium"
                    variants={sectionVariants}
                  >
                    <motion.p
                      className="text-base sm:text-lg leading-relaxed"
                      variants={itemVariants}
                    >
                      Our mission is to inspire and nurture the minds of
                      students by providing access to qualified and passionate
                      tutors who are dedicated to the success of their students.
                      We aim to bridge the gap between aspirations and
                      achievement by offering a diverse range of tutoring
                      services. From pre-school to university level, from IELTS
                      to SAT preparation, we empower students to excel in their
                      academic pursuits.
                    </motion.p>
                    <motion.p
                      className="text-base sm:text-lg leading-relaxed"
                      variants={itemVariants}
                    >
                      We aim to build an educational ecosystem that fosters
                      collaboration, respect, and growth for students, parents,
                      and tutors alike. By upholding the highest standards of
                      quality, we ensure that every learner's potential is
                      unlocked and their dreams are realized.
                    </motion.p>
                  </motion.div>
                </motion.div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="py-12 overflow-hidden">
        <div className="w-full mx-auto px-4 sm:px-6 lg:px-8 xl:px-12 2xl:px-16">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center">
            {/* Left Content */}
            <motion.div
              className="order-2 lg:order-1"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
              variants={slideInLeft}
            >
              <motion.div
                className="bg-gradient-to-br from-purple-50 to-violet-100 p-10 sm:p-10 lg:p-16 border-2 border-purple-200 transition-shadow duration-500 group"
                style={{ borderRadius: "0 6rem 0 6rem" }}
                whileHover={{ scale: 1.02, shadow: "xl" }}
              >
                <motion.div
                  variants={sectionVariants}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                >
                  <motion.h2
                    className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-6 sm:mb-8"
                    variants={itemVariants}
                  >
                    Why Choose <span>Us?</span>
                  </motion.h2>
                  <motion.div className="space-y-6" variants={sectionVariants}>
                    {[
                      "Licenced by Government",
                      "Verified & Experienced Tutors",
                      "Personalized Matches",
                      "Wide Range of Subjects & Levels",
                      "Support Across Dhaka & Chattogram",
                      "Simple, Fast, and Transparent Process",
                    ].map((feature) => (
                      <motion.div
                        key={feature}
                        className="flex items-start space-x-4"
                        variants={itemVariants}
                        whileHover={{ x: 5 }}
                      >
                        <div className="flex-shrink-0 w-6 h-6 mt-1">
                          <svg
                            className="w-full h-full text-purple-600"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                          >
                            <path
                              fillRule="evenodd"
                              d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                              clipRule="evenodd"
                            />
                          </svg>
                        </div>
                        <div>
                          <h3 className="text-lg sm:text-xl font-extrabold text-gray-900 mb-2">
                            {feature}
                          </h3>
                        </div>
                      </motion.div>
                    ))}
                  </motion.div>
                </motion.div>
              </motion.div>
            </motion.div>

            {/* Right Image */}
            <motion.div
              className="order-1 lg:order-2 flex justify-center"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
              variants={slideInRight}
            >
              <motion.img
                src={ChooseImg}
                alt="Why Choose Us"
                className="w-full max-w-md lg:max-w-lg xl:max-w-xl h-auto"
                whileHover={{ scale: 1.05, rotate: 1 }}
                transition={{ duration: 0.3 }}
              />
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutUsPage;
