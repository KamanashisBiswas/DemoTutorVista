// import React, { useEffect } from "react";
// import { motion } from "framer-motion";
// import CEOImage from "../assets/ceo/image-1.png";
// import CommonSectionHeading from "../components/Common/CommonSectionHeading";

// const CEOMessagesPage = () => {
//   useEffect(() => {
//     window.scrollTo(0, 0);
//   }, []);

//   const containerVariants = {
//     hidden: { opacity: 0 },
//     visible: {
//       opacity: 1,
//       transition: {
//         staggerChildren: 0.2,
//         delayChildren: 0.1,
//       },
//     },
//   };

//   const itemVariants = {
//     hidden: { opacity: 0, y: 20 },
//     visible: {
//       opacity: 1,
//       y: 0,
//       transition: {
//         duration: 0.6,
//         ease: "easeInOut",
//       },
//     },
//   };

//   const imageVariants = {
//     hidden: { opacity: 0, scale: 0.8, rotateY: -20 },
//     visible: {
//       opacity: 1,
//       scale: 1,
//       rotateY: 0,
//       transition: {
//         duration: 0.8,
//         ease: "easeOut",
//       },
//     },
//   };

//   const textVariants = {
//     hidden: { opacity: 0, x: -30 },
//     visible: {
//       opacity: 1,
//       x: 0,
//       transition: {
//         duration: 0.7,
//         ease: "easeInOut",
//       },
//     },
//   };

//   const floatingAnimation = {
//     y: [0, -20, 0],
//     transition: {
//       duration: 4,
//       repeat: Infinity,
//       ease: "easeInOut",
//     },
//   };

//   const paragraphs = [
//     "Behind every student's silence, there is often confusion, pressure, or a lack of the right guidance — and behind every parent's concern, there is a deep desire to do the best for their child. I don't just understand this reality — I have built my journey around solving it.",
//     "With a background in Economics and a strong commitment to social impact, I founded Tutor Vista and VistaTech to make education more accessible, reliable, and truly life-changing — in Bangladesh and beyond.",
//     "Tutor Vista is not just about finding a tutor; it's about finding the right mentor. VistaTech is not just technology; it's a pathway to smarter, more connected learning.",
//     "As a young entrepreneur, my mission goes beyond business. I aim to build trust, create opportunities, and develop a sustainable educational network that empowers the next generation — not only locally, but worldwide.",
//   ];

//   return (
//     <div className="bg-gradient-to-b from-white to-gray-50 min-h-screen font-dmsans">
//       {/* Header Section */}
//       <motion.div
//         initial={{ opacity: 0 }}
//         animate={{ opacity: 1 }}
//         transition={{ duration: 0.8 }}
//         className="w-full py-12 sm:py-16 lg:py-20 bg-gradient-to-r from-blue-600 to-blue-800 text-white"
//       >
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//           <motion.div
//             initial={{ opacity: 0, y: -20 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ duration: 0.6, delay: 0.2 }}
//             className="text-center"
//           >
//             <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">
//               Message from Our Founder
//             </h1>
//             <p className="text-lg sm:text-xl opacity-90">
//               Connecting Education, Empowering Lives
//             </p>
//           </motion.div>
//         </div>
//       </motion.div>

//       {/* Main Content Section */}
//       <motion.div
//         initial="hidden"
//         whileInView="visible"
//         viewport={{ once: true, margin: "-100px" }}
//         variants={containerVariants}
//         className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-20"
//       >
//         <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
//           {/* Image Section */}
//           <motion.div
//             variants={imageVariants}
//             className="flex justify-center items-center order-2 lg:order-1"
//           >
//             <motion.div animate={floatingAnimation} className="relative">
//               <div className="absolute -inset-3 sm:-inset-4 bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 rounded-2xl blur-lg opacity-40"></div>
//               <img
//                 src={CEOImage}
//                 alt="Abu Junayed - Founder & CEO"
//                 className="w-72 h-auto rounded-2xl shadow-2xl relative z-10 object-cover"
//               />
//             </motion.div>
//           </motion.div>

//           {/* Text Section */}
//           <motion.div variants={textVariants} className="order-1 lg:order-2">
//             <motion.div variants={containerVariants} className="space-y-6">
//               {paragraphs.map((paragraph, index) => (
//                 <motion.p
//                   key={index}
//                   variants={itemVariants}
//                   className="text-base sm:text-lg leading-relaxed text-gray-700 hover:text-gray-900 transition-colors duration-300"
//                 >
//                   {paragraph}
//                 </motion.p>
//               ))}

//               {/* Signature */}
//               <motion.div
//                 variants={itemVariants}
//                 className="mt-8 pt-8 border-t-2 border-gray-200"
//               >
//                 <p className="text-lg font-semibold text-gray-900">
//                   Abu Junayed
//                 </p>
//                 <p className="text-base text-blue-600 font-medium">
//                   Founder & CEO
//                 </p>
//                 <p className="text-gray-600 mt-1">Tutor Vista & VistaTech</p>
//               </motion.div>
//             </motion.div>
//           </motion.div>
//         </div>
//       </motion.div>

//       {/* Mission Cards Section */}
//       <motion.div
//         initial="hidden"
//         whileInView="visible"
//         viewport={{ once: true, margin: "-100px" }}
//         variants={containerVariants}
//         className="bg-white py-12 sm:py-16 lg:py-20 border-t border-gray-200"
//       >
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//           <motion.div
//             variants={itemVariants}
//             className="text-center mb-12 lg:mb-16"
//           >
//             <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
//               Our Vision
//             </h2>
//             <p className="text-lg text-gray-600 max-w-2xl mx-auto">
//               Building a sustainable educational network that empowers the next
//               generation
//             </p>
//           </motion.div>

//           <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
//             {[
//               {
//                 title: "Education Access",
//                 description:
//                   "Making quality education more accessible and affordable for everyone.",
//                 icon: "📚",
//               },
//               {
//                 title: "Right Mentorship",
//                 description:
//                   "Connecting students with the right mentors who understand their needs.",
//                 icon: "🤝",
//               },
//               {
//                 title: "Social Impact",
//                 description:
//                   "Creating opportunities for sustainable growth locally and worldwide.",
//                 icon: "🌍",
//               },
//             ].map((card, index) => (
//               <motion.div
//                 key={index}
//                 variants={itemVariants}
//                 whileHover={{
//                   y: -10,
//                   boxShadow: "0 20px 40px rgba(0,0,0,0.1)",
//                 }}
//                 className="bg-gradient-to-br from-blue-50 to-purple-50 p-6 sm:p-8 rounded-xl border border-gray-200 hover:border-blue-400 transition-all duration-300 cursor-pointer"
//               >
//                 <div className="text-4xl mb-4">{card.icon}</div>
//                 <h3 className="text-xl font-bold text-gray-900 mb-3">
//                   {card.title}
//                 </h3>
//                 <p className="text-gray-700 leading-relaxed">
//                   {card.description}
//                 </p>
//               </motion.div>
//             ))}
//           </div>
//         </div>
//       </motion.div>

//       {/* Call to Action Section */}
//       <motion.div
//         initial={{ opacity: 0 }}
//         whileInView={{ opacity: 1 }}
//         viewport={{ once: true }}
//         transition={{ duration: 0.8 }}
//         className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-12 sm:py-16 lg:py-20"
//       >
//         <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
//           <motion.h2
//             initial={{ opacity: 0, y: 20 }}
//             whileInView={{ opacity: 1, y: 0 }}
//             viewport={{ once: true }}
//             transition={{ duration: 0.6, delay: 0.1 }}
//             className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-4"
//           >
//             Join Us in Transforming Education
//           </motion.h2>
//           <motion.p
//             initial={{ opacity: 0, y: 20 }}
//             whileInView={{ opacity: 1, y: 0 }}
//             viewport={{ once: true }}
//             transition={{ duration: 0.6, delay: 0.2 }}
//             className="text-lg opacity-90 mb-8"
//           >
//             Whether you're a student seeking guidance or a parent advocating for
//             your child, Tutor Vista is here to bridge the gap.
//           </motion.p>
//           <motion.div
//             initial={{ opacity: 0, y: 20 }}
//             whileInView={{ opacity: 1, y: 0 }}
//             viewport={{ once: true }}
//             transition={{ duration: 0.6, delay: 0.3 }}
//             className="flex flex-col sm:flex-row gap-4 justify-center"
//           >
//             <motion.a
//               href="/request-tutor"
//               whileHover={{ scale: 1.05 }}
//               whileTap={{ scale: 0.95 }}
//               className="px-8 py-3 bg-white text-blue-600 font-semibold rounded-lg hover:bg-gray-100 transition-colors duration-300"
//             >
//               Request a Tutor
//             </motion.a>
//             <motion.a
//               href="/apply-tutor"
//               whileHover={{ scale: 1.05 }}
//               whileTap={{ scale: 0.95 }}
//               className="px-8 py-3 bg-transparent text-white font-semibold border-2 border-white rounded-lg hover:bg-white hover:text-blue-600 transition-all duration-300"
//             >
//               Become a Tutor
//             </motion.a>
//           </motion.div>
//         </div>
//       </motion.div>
//     </div>
//   );
// };

// export default CEOMessagesPage;

import React, { useEffect } from "react";
import { motion } from "framer-motion";
import CEOImage from "../assets/ceo/image-1.png";
// import CommonSectionHeading from "../components/Common/CommonSectionHeading";

const CEOMessagesPage = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15, delayChildren: 0.1 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: [0.25, 0.8, 0.25, 1] },
    },
  };

  const imageVariants = {
    hidden: { opacity: 0, scale: 0.85, rotateY: -15 },
    visible: {
      opacity: 1,
      scale: 1,
      rotateY: 0,
      transition: { duration: 0.8, ease: "easeOut" },
    },
  };

  const floatingAnimation = {
    y: [0, -15, 0],
    transition: { duration: 5, repeat: Infinity, ease: "easeInOut" },
  };

  const paragraphs = [
    "Behind every student's silence, there is often confusion, pressure, or a lack of the right guidance — and behind every parent's concern, there is a deep desire to do the best for their child. I don't just understand this reality — I have built my journey around solving it.",
    "With a background in Economics and a strong commitment to social impact, I founded Tutor Vista and VistaTech to make education more accessible, reliable, and truly life-changing — in Bangladesh and beyond.",
    "Tutor Vista is not just about finding a tutor; it's about finding the right mentor. VistaTech is not just technology; it's a pathway to smarter, more connected learning.",
    "As a young entrepreneur, my mission goes beyond business. I aim to build trust, create opportunities, and develop a sustainable educational network that empowers the next generation — not only locally, but worldwide.",
  ];

  const missionCards = [
    {
      title: "Education Access",
      description:
        "Making quality education more accessible and affordable for everyone.",
      icon: "📚",
      gradient: "from-blue-500 to-cyan-400",
    },
    {
      title: "Right Mentorship",
      description:
        "Connecting students with the right mentors who understand their specific needs.",
      icon: "🤝",
      gradient: "from-purple-500 to-pink-400",
    },
    {
      title: "Social Impact",
      description:
        "Creating opportunities for sustainable growth locally and worldwide.",
      icon: "🌍",
      gradient: "from-emerald-400 to-teal-500",
    },
  ];

  return (
    <div className="bg-slate-50 min-h-screen font-dmsans overflow-hidden">
      {/* Header Section */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="relative w-full py-16 sm:py-24 lg:py-28 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-blue-700 via-blue-900 to-slate-900 text-white overflow-hidden"
      >
        {/* Background Decorative Elements */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
          <div className="absolute -top-24 -left-24 w-64 h-64 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20"></div>
          <div className="absolute top-1/2 right-0 w-72 h-72 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 transform -translate-y-1/2"></div>
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center z-10">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <span className="inline-block py-1 px-3 rounded-full bg-blue-800/50 border border-blue-500/30 text-blue-200 text-sm font-semibold tracking-wider mb-4">
              LEADERSHIP VISION
            </span>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold mb-6 tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-white to-blue-200">
              Message from Our Founder
            </h1>
            <p className="text-lg sm:text-xl lg:text-2xl text-blue-100/80 max-w-2xl mx-auto font-light">
              Connecting Education, Empowering Lives
            </p>
          </motion.div>
        </div>
      </motion.div>

      {/* Main Content Section */}
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-50px" }}
        variants={containerVariants}
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24"
      >
        <div className="flex flex-col lg:flex-row gap-12 lg:gap-20 items-center">
          {/* Image Section (Shows on top in Mobile) */}
          <motion.div
            variants={imageVariants}
            className="w-full lg:w-5/12 flex justify-center items-center order-1 lg:order-1"
          >
            <motion.div
              animate={floatingAnimation}
              className="relative group perspective-1000"
            >
              {/* Decorative Background Blob */}
              <div className="absolute -inset-4 bg-gradient-to-br from-blue-400 via-purple-400 to-pink-400 rounded-[2rem] blur-xl opacity-50 group-hover:opacity-70 transition-opacity duration-500"></div>

              <div className="relative rounded-[2rem] overflow-hidden border-4 border-white shadow-2xl bg-white">
                <img
                  src={CEOImage}
                  alt="Abu Junayed - Founder & CEO"
                  className="w-64 sm:w-80 lg:w-full max-w-sm h-auto object-cover transform transition-transform duration-700 group-hover:scale-105"
                />

                {/* Image Overlay Badge */}
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-6 pt-12">
                  <p className="text-white font-bold text-xl">Abu Junayed</p>
                  <p className="text-blue-300 text-sm font-medium">
                    Founder & CEO
                  </p>
                </div>
              </div>
            </motion.div>
          </motion.div>

          {/* Text Section */}
          <motion.div className="w-full lg:w-7/12 order-2 lg:order-2 relative">
            {/* SVG Quote mark behind text */}
            <svg
              className="absolute -top-8 -left-8 w-24 h-24 text-blue-100/60 z-0 hidden sm:block pointer-events-none"
              fill="currentColor"
              viewBox="0 0 32 32"
              aria-hidden="true"
            >
              <path d="M9.352 4C4.456 7.456 1 13.12 1 19.36c0 5.088 3.072 8.064 6.624 8.064 3.36 0 5.856-2.688 5.856-5.856 0-3.168-2.208-5.472-5.088-5.472-.576 0-1.344.096-1.536.192.48-3.264 3.552-7.104 6.624-9.024L9.352 4zm16.512 0c-4.8 3.456-8.256 9.12-8.256 15.36 0 5.088 3.072 8.064 6.624 8.064 3.264 0 5.856-2.688 5.856-5.856 0-3.168-2.304-5.472-5.184-5.472-.576 0-1.248.096-1.44.192.48-3.264 3.456-7.104 6.528-9.024L25.864 4z" />
            </svg>

            <motion.div
              variants={containerVariants}
              className="relative z-10 space-y-6"
            >
              {paragraphs.map((paragraph, index) => (
                <motion.p
                  key={index}
                  variants={itemVariants}
                  className={`text-base sm:text-lg leading-relaxed text-slate-700 ${
                    index === 0
                      ? "text-xl sm:text-2xl font-medium text-slate-800"
                      : ""
                  }`}
                >
                  {paragraph}
                </motion.p>
              ))}

              {/* Signature */}
              <motion.div
                variants={itemVariants}
                className="mt-10 pt-8 border-t border-slate-200"
              >
                <div className="flex items-center gap-4">
                  <div className="w-12 h-1 bg-blue-600 rounded-full"></div>
                  <div>
                    <h4 className="text-xl font-bold text-slate-900">
                      Abu Junayed
                    </h4>
                    <p className="text-blue-600 font-semibold text-sm uppercase tracking-wider mt-1">
                      Tutor Vista & VistaTech
                    </p>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </motion.div>
        </div>
      </motion.div>

      {/* Mission Cards Section */}
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-50px" }}
        variants={containerVariants}
        className="bg-white py-16 sm:py-24 border-t border-slate-100 relative"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div variants={itemVariants} className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 mb-4">
              Our Vision
            </h2>
            <div className="w-20 h-1.5 bg-blue-600 mx-auto rounded-full mb-6"></div>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              Building a sustainable educational network that empowers the next
              generation, everywhere.
            </p>
          </motion.div>

          {/* Grid updated for better tablet responsiveness */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {missionCards.map((card, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                whileHover={{ y: -8 }}
                className="group relative bg-white p-8 rounded-2xl shadow-lg hover:shadow-2xl border border-slate-100 transition-all duration-300"
              >
                <div
                  className={`absolute top-0 left-0 w-full h-1 bg-gradient-to-r ${card.gradient} rounded-t-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300`}
                ></div>
                <div className="w-16 h-16 rounded-2xl bg-slate-50 flex items-center justify-center text-3xl mb-6 shadow-sm group-hover:scale-110 transition-transform duration-300">
                  {card.icon}
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-3 group-hover:text-blue-600 transition-colors">
                  {card.title}
                </h3>
                <p className="text-slate-600 leading-relaxed">
                  {card.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default CEOMessagesPage;
