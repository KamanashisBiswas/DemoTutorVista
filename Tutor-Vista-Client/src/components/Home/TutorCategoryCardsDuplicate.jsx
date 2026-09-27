// import React from "react";
// import { motion } from "framer-motion";
// import Teach from "../../assets/Home/Icon/Teach.svg";
// import Female from "../../assets/Home/Icon/Female.svg";
// import Quiz from "../../assets/Home/Icon/Quiz.svg";

// const TutorCategoryCardsDuplicate = () => {
//   const containerVariants = {
//     hidden: { opacity: 0 },
//     visible: {
//       opacity: 1,
//       transition: {
//         staggerChildren: 0.1,
//       },
//     },
//   };

//   const cardVariants = {
//     hidden: { y: 20, opacity: 0 },
//     visible: {
//       y: 0,
//       opacity: 1,
//       transition: {
//         type: "spring",
//         stiffness: 120,
//       },
//     },
//   };

//   // Data for the 4 Location Cards
//   const locationCards = [
//     {
//       id: 1,
//       title: "Dhaka : 40000+",
//       desc: "Find expert home tutors for all subjects across Dhaka.",
//       icon: Teach,
//       bgColor: "#9EDC99", // Greenish
//       innerColor: "#CAECC6",
//     },
//     {
//       id: 2,
//       title: "Chattogram : 13000+",
//       desc: "Get qualified home tutors for all subjects in Chattogram.",
//       icon: Female,
//       bgColor: "#7AC6D2", // Blueish
//       innerColor: "#C1D7FC",
//     },
//     {
//       id: 3,
//       title: "Sylhet : 8500+",
//       desc: "Connect with experienced home tutors in Sylhet.",
//       icon: Teach,
//       bgColor: "#FFB6C1", // Pinkish
//       innerColor: "#FFE4E9",
//     },
//     {
//       id: 4,
//       title: "Khulna : 7200+",
//       desc: "Find qualified home tutors for academic needs in Khulna.",
//       icon: Female,
//       bgColor: "#B19CD9", // Purpleish
//       innerColor: "#E8DEFF",
//     },
//   ];

//   return (
//     <section className="w-full mx-auto px-4 sm:px-6 lg:px-8 xl:px-12 2xl:px-16 py-6 font-dmsans relative md:-top-28">
//       <motion.div
//         className="grid grid-cols-1 lg:grid-cols-4 gap-4"
//         variants={containerVariants}
//         initial="hidden"
//         whileInView="visible"
//         viewport={{ once: true, amount: 0.2 }}
//       >
//         {/* First 2 Columns: 4 Location Cards in a 2x2 Grid */}
//         <div className="lg:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-4">
//           {locationCards.map((card) => (
//             <motion.div
//               key={card.id}
//               className="rounded-xl text-gray-800 shadow-sm hover:shadow-lg transition-all duration-300 relative min-h-[200px] flex flex-col"
//               style={{ backgroundColor: card.bgColor }}
//               variants={cardVariants}
//               whileHover={{ y: -5, scale: 1.01 }}
//             >
//               <div
//                 className="p-3 rounded-t-xl rounded-bl-[30px] rounded-br-[30px] rounded-tr-[30px] left-0 top-0 absolute z-10"
//                 style={{ backgroundColor: card.innerColor }}
//               >
//                 <img
//                   src={card.icon}
//                   alt={card.title}
//                   className="w-[45px] h-[45px]"
//                 />
//               </div>
//               <h3
//                 className="font-bold text-sm mt-5 pl-20 py-1.5 w-full pr-2 rounded-r-full"
//                 style={{ backgroundColor: card.innerColor }}
//               >
//                 {card.title}
//               </h3>
//               <p className="text-sm mt-8 mx-5 mb-4 font-medium leading-relaxed text-gray-700">
//                 {card.desc}
//               </p>
//             </motion.div>
//           ))}
//         </div>

//         {/* 3rd Column: Request Tutor Card */}
//         <motion.div
//           className="bg-[#C1D7FC] rounded-xl text-gray-800 shadow-sm hover:shadow-lg transition-all duration-300 relative min-h-[200px] flex flex-col justify-between"
//           variants={cardVariants}
//           whileHover={{ y: -5, scale: 1.01 }}
//         >
//           <div>
//             <div className="bg-[#F0F5FE] p-3 rounded-t-xl rounded-bl-[30px] rounded-br-[30px] rounded-tr-[30px] left-0 top-0 absolute z-10">
//               <img
//                 src={Quiz}
//                 alt="Request Tutor"
//                 className="w-[55px] h-[55px]"
//               />
//             </div>
//             <h3 className="font-bold text-base mt-5 pl-24 py-1.5 bg-[#F0F5FE] w-full rounded-r-full">
//               Request Tutor
//             </h3>
//             <p className="text-sm mt-10 mx-6 mb-2 font-medium text-gray-700 leading-relaxed">
//               Easily request a trusted and experienced tutor tailored to your
//               needs.
//             </p>
//           </div>
//           <a
//             href="/request-tutor"
//             className="group text-black font-bold text-sm flex mb-5 ml-6 items-center gap-1 hover:text-blue-700 transition-colors duration-300"
//           >
//             Request{" "}
//             <span className="group-hover:translate-x-1 transition-transform">
//               →
//             </span>
//           </a>
//         </motion.div>

//         {/* 4th Column: Apply Tutor Card */}
//         <motion.div
//           className="bg-[#8CB2FF] rounded-xl text-gray-800 shadow-sm hover:shadow-lg transition-all duration-300 relative min-h-[200px] flex flex-col justify-between"
//           variants={cardVariants}
//           whileHover={{ y: -5, scale: 1.01 }}
//         >
//           <div>
//             <div className="bg-[#DFFFF5] p-3 rounded-t-xl rounded-bl-[30px] rounded-br-[30px] rounded-tr-[30px] left-0 top-0 absolute z-10">
//               <img src={Quiz} alt="Apply Tutor" className="w-[55px] h-[55px]" />
//             </div>
//             <h3 className="font-bold text-base mt-5 pl-24 py-1.5 bg-[#DFFFF5] w-full rounded-r-full">
//               Apply Tutor
//             </h3>
//             <p className="text-sm mt-10 mx-6 mb-2 font-medium text-gray-700 leading-relaxed">
//               Start your journey as a home tutor and help students thrive.
//             </p>
//           </div>
//           <a
//             href="/apply-tutor"
//             className="group text-black font-bold text-sm flex mb-5 ml-6 items-center gap-1 hover:text-blue-800 transition-colors duration-300"
//           >
//             Apply{" "}
//             <span className="group-hover:translate-x-1 transition-transform">
//               →
//             </span>
//           </a>
//         </motion.div>
//       </motion.div>
//     </section>
//   );
// };

// export default TutorCategoryCardsDuplicate;

import React from "react";
import { motion } from "framer-motion";
import Teach from "../../assets/Home/Icon/Teach.svg";
import Female from "../../assets/Home/Icon/Female.svg";
import Quiz from "../../assets/Home/Icon/Quiz.svg";

const TutorCategoryCardsDuplicate = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const cardVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 120,
      },
    },
  };

  // Data for the 4 Location Cards with Refined Gradients
  const locationCards = [
    {
      id: 1,
      city: "Dhaka",
      count: "40k+",
      desc: "Find expert home tutors for all subjects across Dhaka.",
      icon: Teach,
      gradient: "linear-gradient(135deg, #E8F5E9 0%, #A5D6A7 100%)", // Soft Mint
      shadow: "shadow-green-200",
      textColor: "text-green-900",
    },
    {
      id: 2,
      city: "Chattogram",
      count: "13k+",
      desc: "Get qualified home tutors for all subjects in Chattogram.",
      icon: Female,
      gradient: "linear-gradient(135deg, #E3F2FD 0%, #90CAF9 100%)", // Soft Blue
      shadow: "shadow-blue-200",
      textColor: "text-blue-900",
    },
    {
      id: 3,
      city: "Sylhet",
      count: "8.5k+",
      desc: "Connect with experienced home tutors in Sylhet.",
      icon: Teach,
      gradient: "linear-gradient(135deg, #FCE4EC 0%, #F48FB1 100%)", // Soft Pink
      shadow: "shadow-pink-200",
      textColor: "text-pink-900",
    },
    {
      id: 4,
      city: "Khulna",
      count: "7.2k+",
      desc: "Find qualified home tutors for academic needs in Khulna.",
      icon: Female,
      gradient: "linear-gradient(135deg, #F3E5F5 0%, #CE93D8 100%)", // Soft Purple
      shadow: "shadow-purple-200",
      textColor: "text-purple-900",
    },
  ];

  return (
    <section className="w-full mx-auto px-4 sm:px-6 lg:px-8 xl:px-12 2xl:px-16 py-8 font-dmsans relative md:-top-24 z-10">
      <motion.div
        className="grid grid-cols-1 lg:grid-cols-4 gap-6"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
      >
        {/* First 2 Columns: 4 Location Cards in a 2x2 Grid */}
        <div className="lg:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-5">
          {locationCards.map((card) => (
            <motion.div
              key={card.id}
              className={`rounded-3xl shadow-lg ${card.shadow} hover:shadow-xl transition-all duration-300 relative min-h-[220px] flex flex-col overflow-hidden group border border-white/40`}
              style={{ background: card.gradient }}
              variants={cardVariants}
              whileHover={{ y: -6 }}
            >
              {/* Decorative Background Shape */}
              <div className="absolute -right-6 -top-6 w-32 h-32 rounded-full bg-white/20 blur-2xl group-hover:bg-white/30 transition-all duration-500" />

              {/* Icon Box */}
              <div className="p-4 rounded-br-[32px] absolute left-0 top-0 z-10 backdrop-blur-sm bg-white/60 border-r border-b border-white/50 shadow-sm">
                <img src={card.icon} alt={card.city} className="w-9 h-9" />
              </div>

              {/* Content */}
              <div className="mt-auto px-6 pb-6 pt-20 relative z-10">
                <div className="flex justify-between items-end mb-3">
                  <h3 className={`font-bold text-2xl ${card.textColor}`}>
                    {card.city}
                  </h3>
                  <span className="text-xs font-bold px-3 py-1 rounded-full bg-white/60 backdrop-blur-md shadow-sm text-gray-800 border border-white/40">
                    {card.count}
                  </span>
                </div>
                <p
                  className={`text-sm font-medium ${card.textColor} opacity-90 leading-relaxed`}
                >
                  {card.desc}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* 3rd Column: Request Tutor Card */}
        <motion.div
          className="rounded-3xl shadow-lg shadow-blue-200 hover:shadow-xl transition-all duration-300 relative min-h-[220px] flex flex-col justify-between overflow-hidden group bg-gradient-to-br from-[#E8F0FE] to-[#C1D7FC] border border-white/50"
          variants={cardVariants}
          whileHover={{ y: -6 }}
        >
          <div className="absolute top-0 right-0 w-full h-full bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-[0.03]"></div>

          <div className="p-7 flex flex-col h-full relative z-10">
            <div className="w-14 h-14 bg-white rounded-2xl flex items-center justify-center shadow-sm mb-6 border border-blue-100">
              <img src={Quiz} alt="Request Tutor" className="w-8 h-8" />
            </div>

            <h3 className="font-bold text-2xl text-gray-900 mb-3">
              Request Tutor
            </h3>
            <p className="text-gray-600 font-medium leading-relaxed mb-8 text-sm">
              Easily request a trusted and experienced tutor tailored to your
              specific needs.
            </p>

            <div className="mt-auto">
              <a
                href="/request-tutor"
                className="flex items-center justify-between px-6 py-3.5 bg-white text-blue-600 font-bold rounded-xl shadow-sm hover:shadow-md border border-blue-50 transition-all duration-300 group-hover:translate-y-[-2px]"
              >
                <span>Request Now</span>
                <span className="bg-blue-50 p-1 rounded-full group-hover:bg-blue-100 transition-colors">
                  {" "}
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M5 12h14M12 5l7 7-7 7" />
                  </svg>
                </span>
              </a>
            </div>
          </div>
        </motion.div>

        {/* 4th Column: Apply Tutor Card */}
        <motion.div
          className="rounded-3xl shadow-lg shadow-indigo-200 hover:shadow-xl transition-all duration-300 relative min-h-[220px] flex flex-col justify-between overflow-hidden group bg-gradient-to-br from-[#E3F2FD] to-[#90CAF9] border border-white/50"
          variants={cardVariants}
          whileHover={{ y: -6 }}
        >
          <div className="absolute top-0 right-0 w-full h-full bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-[0.03]"></div>

          <div className="p-7 flex flex-col h-full relative z-10">
            <div className="w-14 h-14 bg-white rounded-2xl flex items-center justify-center shadow-sm mb-6 border border-blue-100">
              <img src={Quiz} alt="Apply Tutor" className="w-8 h-8" />
            </div>

            <h3 className="font-bold text-2xl text-gray-900 mb-3">
              Apply Tutor
            </h3>
            <p className="text-gray-700 font-medium leading-relaxed mb-8 text-sm">
              Start your journey as a home tutor and help students thrive in
              their studies.
            </p>

            <div className="mt-auto">
              <a
                href="/apply-tutor"
                className="flex items-center justify-between px-6 py-3.5 bg-white text-blue-700 font-bold rounded-xl shadow-sm hover:shadow-md border border-blue-50 transition-all duration-300 group-hover:translate-y-[-2px]"
              >
                <span>Apply Now</span>
                <span className="bg-blue-50 p-1 rounded-full group-hover:bg-blue-100 transition-colors">
                  {" "}
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M5 12h14M12 5l7 7-7 7" />
                  </svg>
                </span>
              </a>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default TutorCategoryCardsDuplicate;

// import React from "react";
// import { motion } from "framer-motion";
// import Teach from "../../assets/Home/Icon/Teach.svg";
// import Female from "../../assets/Home/Icon/Female.svg";
// import Quiz from "../../assets/Home/Icon/Quiz.svg";

// const TutorCategoryCardsDuplicate = () => {
//   const containerVariants = {
//     hidden: { opacity: 0 },
//     visible: {
//       opacity: 1,
//       transition: {
//         staggerChildren: 0.1,
//       },
//     },
//   };

//   const cardVariants = {
//     hidden: { y: 20, opacity: 0 },
//     visible: {
//       y: 0,
//       opacity: 1,
//       transition: {
//         type: "spring",
//         stiffness: 120,
//       },
//     },
//   };

//   // Data for the 4 Location Cards with Gradients
//   const locationCards = [
//     {
//       id: 1,
//       city: "Dhaka",
//       count: "40,000+",
//       desc: "Find expert home tutors for all subjects across Dhaka.",
//       icon: Teach,
//       gradient: "linear-gradient(135deg, #A5D6A7 0%, #81C784 100%)", // Professional Green
//     },
//     {
//       id: 2,
//       city: "Chattogram",
//       count: "13,000+",
//       desc: "Get qualified home tutors for all subjects in Chattogram.",
//       icon: Female,
//       gradient: "linear-gradient(135deg, #90CAF9 0%, #64B5F6 100%)", // Professional Blue
//     },
//     {
//       id: 3,
//       city: "Sylhet",
//       count: "8,500+",
//       desc: "Connect with experienced home tutors in Sylhet.",
//       icon: Teach,
//       gradient: "linear-gradient(135deg, #F48FB1 0%, #F06292 100%)", // Professional Pink
//     },
//     {
//       id: 4,
//       city: "Khulna",
//       count: "7,200+",
//       desc: "Find qualified home tutors for academic needs in Khulna.",
//       icon: Female,
//       gradient: "linear-gradient(135deg, #CE93D8 0%, #BA68C8 100%)", // Professional Purple
//     },
//   ];

//   return (
//     <section className="w-full mx-auto px-4 sm:px-6 lg:px-8 xl:px-12 2xl:px-16 py-8 font-dmsans relative md:-top-24 z-10">
//       <motion.div
//         className="grid grid-cols-1 lg:grid-cols-4 gap-6"
//         variants={containerVariants}
//         initial="hidden"
//         whileInView="visible"
//         viewport={{ once: true, amount: 0.2 }}
//       >
//         {/* First 2 Columns: 4 Location Cards in a 2x2 Grid */}
//         <div className="lg:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-5">
//           {locationCards.map((card) => (
//             <motion.div
//               key={card.id}
//               className="rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 relative min-h-[220px] flex flex-col overflow-hidden group"
//               style={{ background: card.gradient }}
//               variants={cardVariants}
//               whileHover={{ y: -5 }}
//             >
//               {/* Decorative Circle */}
//               <div className="absolute -right-8 -top-8 w-32 h-32 rounded-full bg-white opacity-10 group-hover:scale-110 transition-transform duration-500" />

//               {/* Icon Box with Glassmorphism */}
//               <div className="p-3.5 rounded-br-[30px] absolute left-0 top-0 z-10 shadow-sm backdrop-blur-md bg-white/60 border-r border-b border-white/40">
//                 <img src={card.icon} alt={card.city} className="w-10 h-10" />
//               </div>

//               {/* Content */}
//               <div className="mt-16 px-6 pb-6 flex flex-col h-full justify-between relative z-10">
//                 <div>
//                   <div className="flex items-center gap-2 flex-wrap mb-2">
//                     <h3 className="font-bold text-xl text-gray-900">
//                       {card.city}
//                     </h3>
//                     <span className="text-xs font-bold px-2 py-1 rounded-full bg-white/40 text-gray-900 backdrop-blur-sm shadow-sm">
//                       {card.count}
//                     </span>
//                   </div>
//                   <p className="text-sm font-medium text-gray-800/90 leading-relaxed">
//                     {card.desc}
//                   </p>
//                 </div>

//                 {/* Subtle Arrow on Hover */}
//                 <div className="mt-2 flex justify-end opacity-0 group-hover:opacity-100 transition-opacity duration-300 transform translate-x-2 group-hover:translate-x-0">
//                   <svg
//                     width="20"
//                     height="20"
//                     viewBox="0 0 24 24"
//                     fill="none"
//                     stroke="currentColor"
//                     strokeWidth="2"
//                     strokeLinecap="round"
//                     strokeLinejoin="round"
//                     className="text-gray-900"
//                   >
//                     <path d="M5 12h14M12 5l7 7-7 7" />
//                   </svg>
//                 </div>
//               </div>
//             </motion.div>
//           ))}
//         </div>

//         {/* 3rd Column: Request Tutor Card */}
//         <motion.div
//           className="rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 relative min-h-[220px] flex flex-col justify-between overflow-hidden group bg-gradient-to-br from-[#C1D7FC] to-[#9bbcf2]"
//           variants={cardVariants}
//           whileHover={{ y: -5 }}
//         >
//           <div className="absolute -right-10 -top-10 w-40 h-40 rounded-full bg-white opacity-20 group-hover:scale-110 transition-transform duration-500" />

//           <div className="p-6 flex flex-col h-full relative z-10">
//             <div className="w-14 h-14 bg-white/70 backdrop-blur-md rounded-2xl flex items-center justify-center shadow-sm mb-6 border border-white/50">
//               <img src={Quiz} alt="Request Tutor" className="w-8 h-8" />
//             </div>

//             <h3 className="font-bold text-2xl text-gray-900 mb-3">
//               Request Tutor
//             </h3>
//             <p className="text-gray-800/90 font-medium leading-relaxed mb-6">
//               Easily request a trusted and experienced tutor tailored to your
//               needs.
//             </p>

//             <div className="mt-auto">
//               <a
//                 href="/request-tutor"
//                 className="inline-flex items-center justify-center px-6 py-3 bg-white text-blue-600 font-bold rounded-xl shadow-sm hover:shadow-md hover:bg-blue-50 transition-all duration-300 w-full sm:w-auto group-hover:translate-y-[-2px]"
//               >
//                 Request Now <span className="ml-2">→</span>
//               </a>
//             </div>
//           </div>
//         </motion.div>

//         {/* 4th Column: Apply Tutor Card */}
//         <motion.div
//           className="rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 relative min-h-[220px] flex flex-col justify-between overflow-hidden group bg-gradient-to-br from-[#8CB2FF] to-[#6b9df8]"
//           variants={cardVariants}
//           whileHover={{ y: -5 }}
//         >
//           <div className="absolute -right-10 -top-10 w-40 h-40 rounded-full bg-white opacity-20 group-hover:scale-110 transition-transform duration-500" />

//           <div className="p-6 flex flex-col h-full relative z-10">
//             <div className="w-14 h-14 bg-white/70 backdrop-blur-md rounded-2xl flex items-center justify-center shadow-sm mb-6 border border-white/50">
//               <img src={Quiz} alt="Apply Tutor" className="w-8 h-8" />
//             </div>

//             <h3 className="font-bold text-2xl text-gray-900 mb-3">
//               Apply Tutor
//             </h3>
//             <p className="text-gray-800/90 font-medium leading-relaxed mb-6">
//               Start your journey as a home tutor and help students thrive.
//             </p>

//             <div className="mt-auto">
//               <a
//                 href="/apply-tutor"
//                 className="inline-flex items-center justify-center px-6 py-3 bg-white text-blue-700 font-bold rounded-xl shadow-sm hover:shadow-md hover:bg-blue-50 transition-all duration-300 w-full sm:w-auto group-hover:translate-y-[-2px]"
//               >
//                 Apply Now <span className="ml-2">→</span>
//               </a>
//             </div>
//           </div>
//         </motion.div>
//       </motion.div>
//     </section>
//   );
// };

// export default TutorCategoryCardsDuplicate;
