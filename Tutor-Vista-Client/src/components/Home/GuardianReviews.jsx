import React, { useState } from "react";
import Marquee from "react-fast-marquee";
import { Users, GraduationCap } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import ReviewCard from "../ReviewCard";
import AjrinKarim from "../../assets/Review/Guardian/Ajrin-Karim.jpg";
import KamrunNahar from "../../assets/Review/Guardian/Kamrun-Nahar.jpg";
import RipaSahaTropa from "../../assets/Review/Guardian/Ripa-Saha-Tropa.jpg";
import AllenMehedi from "../../assets/Review/Guardian/Allen-Mehedi.jpg";
import TariqulIslamFahim from "../../assets/Review/Guardian/Tariqul-Islam-Fahim.jpg";
import NavidSheikh from "../../assets/Review/Guardian/Navid-Sheikh.jpg";
import TaninIslamAkash from "../../assets/Review/Guardian/Tanin-Islam-Akash.jpg";
import JubayelHossen from "../../assets/Review/Tutor/JubayelHossen.jpg";
import TareqRahman from "../../assets/Review/Tutor/Tareq-Rahman.jpg";
import ArmanAkib from "../../assets/Review/Tutor/Arman-Akib.jpg";
import ChidratulMuntah from "../../assets/Review/Tutor/Chidratul-Muntah.jpg";
import BilkisAkther from "../../assets/Review/Tutor/Bilkis-Akther.jpg";
import Avatar from "../../assets/Review/Tutor/avarar.jpg";

const GuardianReviews = () => {
  const [activeCategory, setActiveCategory] = useState("guardian");

  const guardianReviews = [
    {
      id: 1,
      name: "Tanin Islam Akash",
      address: "Modhubag Dhaka",
      review:
        "আপনাদের সার্ভিসে আমি সন্তুষ্ট।  ভবিষ্যতে আরো ভালো টিউটর দিবেন আশা করছি। শুভ কামনা রইলো।",
      rating: 5,
      image: AjrinKarim,
      relationship: "Mother",
    },
    {
      id: 2,
      name: "Kamrun Nahar",
      address: "Dhanmondi, Dhaka",
      review:
        "I got two teachers from you. Both of them are qualified enough. Thanks for your service.",
      rating: 5,
      image: KamrunNahar,
      relationship: "Mother",
    },
    {
      id: 3,
      name: "Ripa Saha Tropa",
      address: "Uttara, Dhaka",
      review:
        "অভিজ্ঞ টিউটর দেওয়ার জন্য অভিজ্ঞ টিউটর প্রভাইডারও যে প্রয়োজন এটার বাস্তব উদাহরণ টিউটর ভিসতা। শুভ কামনা রইলো। ❤️",
      rating: 5,
      image: RipaSahaTropa,
      relationship: "Mother",
    },
    {
      id: 4,
      name: "Allen Mehedi",
      address: "Chattogram",
      review:
        "Undoubtedly the best tuition media in Chattogram providing quality teachers with diverse backgrounds.",
      rating: 5,
      image: AllenMehedi,
      relationship: "Brother",
    },
    {
      id: 5,
      name: "Tariqul Islam Fahim",
      address: "Banani, Dhaka",
      review: "Valo teacher provider. thank you for your service.",
      rating: 5,
      image: TariqulIslamFahim,
      relationship: "Father",
    },
    {
      id: 6,
      name: "Navid Sheikh",
      address: "Banani, Dhaka",
      review:
        "As a busy professional, finding quality tutoring was challenging. This service exceeded expectations with qualified tutors and flexible scheduling.",
      rating: 5,
      image: NavidSheikh,
      relationship: "Brother",
    },
    {
      id: 7,
      name: "Tanin Islam Akash",
      address: "Banani, Dhaka",
      review:
        "আপনাদের সার্ভিসে আমি সন্তুষ্ট।  ভবিষ্যতে আরো ভালো টিউটর দিবেন আশা করছি। শুভ কামনা রইলো।",
      rating: 5,
      image: TaninIslamAkash,
      relationship: "Brother",
    },
  ];

  const tutorReviews = [
    {
      id: 1,
      name: "মো যুবাইল হোসেন",
      address: "Gulshan, Dhaka",
      review:
        "আলহামদুলিল্লাহ! ১ মাস আগে আমি আশাহীন ভাবেই Vista Tutor এ অ্যাপ্লাই করেছিলাম।কিন্তু কিছুক্ষণের মধ্যেই দেখি আমাকে একটা টিউশন অফার করেছে এই পেজ থেকে।আজকে ১ মাস পর সেই টিউশন  থেকে প্রথম বেতন পেলাম।",
      rating: 5,
      image: JubayelHossen,
      relationship: "Tutor",
    },
    {
      id: 2,
      name: "Tareq Rahman",
      address: "Dhanmondi, Dhaka",
      review:
        "This page isn’t just about tuition—it’s a whole new way of learning! The content feels like it’s crafted by someone who truly understands students as well as the tutors, like a mentor who’s both wise and relatable. Every post is packed with value. If you’re looking for a tutor or wanna be a tutor, this is the place to be!",
      rating: 5,
      image: TareqRahman,
      relationship: "Tutor",
    },
    {
      id: 3,
      name: "Arman Akib",
      address: "Uttara, Dhaka",
      review: "Best tutor Agency.. very Co-operative.",
      rating: 5,
      image: ArmanAkib,
      relationship: "Tutor",
    },
    {
      id: 4,
      name: "ছিদরাতুল মুনতাহা",
      address: "Chattogram",
      review:
        "টিউটর ভিস্তা এর প্রতি আমি কৃতজ্ঞ কোনো মিডিয়াতে এরকম ১ মাস পর মিডিয়া ফি নেয় না। কিন্তু আপনাদের এই সুযোগ টা রাখার কারণে অনেক বেশি উপকৃত হলাম। মন মতো টিউশন পেলাম আলহামদুলিল্লাহ।",
      rating: 5,
      image: ChidratulMuntah,
      relationship: "Tutor",
    },
    {
      id: 5,
      name: "Bilkis Akther",
      address: "Banani, Dhaka",
      review:
        "টিউটর ভিস্তা থেকে টিউশন পেয়েছি। খুবই ভালো গার্ডিয়ান এবং স্টুডেন্ট। ভরসার নির্ভরযোগ্য একটি প্রতিষ্টান টিউটর ভিস্তা। ভাইয়া কে অনেক ধন্যবাদ।",
      rating: 5,
      image: BilkisAkther,
      relationship: "Tutor",
    },
    {
      id: 6,
      name: "Sybal Saha",
      address: "Gulshan, Dhaka",
      review:
        "Got Two tuitions from Tutor Vista. One student of grade 9 and one is HSC examinee. Thanks for trusting in me.",
      rating: 5,
      image: Avatar,
      relationship: "Tutor",
    },
    {
      id: 7,
      name: "Nahid Reza",
      address: "Gulshan, Dhaka",
      review:
        "Thnak you Tutor Vista আমি দুইটি Tusion পেয়ছি And করছি... Trusted media. Thank You again",
      rating: 5,
      image: Avatar,
      relationship: "Tutor",
    },
    {
      id: 8,
      name: "Saima Alam",
      address: "Gulshan, Dhaka",
      review:
        "A trusted & helpful media. Thanks to Tutor Vista for your efforts to find me a tuition.",
      rating: 5,
      image: Avatar,
      relationship: "Tutor",
    },
  ];

  const currentReviews =
    activeCategory === "guardian" ? guardianReviews : tutorReviews;

  return (
    <section
      className={`py-8 sm:py-12 font-dmsans lg:py-16 ${
        activeCategory === "guardian"
          ? "bg-gradient-to-br from-gray-50 to-blue-50"
          : "bg-gradient-to-br from-gray-50 to-green-50"
      } transition-all duration-500`}
    >
      <div className="w-full mx-auto px-4 sm:px-6 lg:px-8 xl:px-12 2xl:px-16">
        {/* Header Section with Switch */}
        <div className="text-center mb-8 sm:mb-12">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-bold text-gray-900 mb-3 sm:mb-4">
            What{" "}
            <AnimatePresence mode="wait">
              <motion.span
                key={activeCategory}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
                className={`inline-block ${
                  activeCategory === "guardian"
                    ? "text-blue-600"
                    : "text-green-600"
                }`}
              >
                {activeCategory === "guardian" ? "Parents" : "Tutors"}
              </motion.span>
            </AnimatePresence>{" "}
            Say
          </h2>
          <p className="text-base sm:text-lg lg:text-xl text-gray-600 max-w-2xl lg:max-w-3xl mx-auto mb-6">
            <AnimatePresence mode="wait">
              <motion.span
                key={activeCategory}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="inline-block"
              >
                {activeCategory === "guardian"
                  ? "Hear from satisfied parents who have experienced our exceptional tutoring services"
                  : "Listen to our experienced tutors sharing their teaching journey with us"}
              </motion.span>
            </AnimatePresence>
          </p>

          {/* Toggle Switch */}
          <div className="flex items-center justify-center space-x-4">
            <div className="flex items-center space-x-2">
              <Users
                className={`w-5 h-5 transition-colors duration-300 ${
                  activeCategory === "guardian"
                    ? "text-blue-600"
                    : "text-gray-400"
                }`}
              />
              <span
                className={`font-medium transition-colors duration-300 ${
                  activeCategory === "guardian"
                    ? "text-blue-600"
                    : "text-gray-500"
                }`}
              >
                Guardian
              </span>
            </div>

            <button
              onClick={() =>
                setActiveCategory(
                  activeCategory === "guardian" ? "tutor" : "guardian"
                )
              }
              className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 ${
                activeCategory === "guardian"
                  ? "bg-blue-600 focus:ring-blue-500"
                  : "bg-green-600 focus:ring-green-500"
              }`}
            >
              <span
                className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform duration-300 ${
                  activeCategory === "guardian"
                    ? "translate-x-1"
                    : "translate-x-6"
                }`}
              />
            </button>

            <div className="flex items-center space-x-2">
              <span
                className={`font-medium transition-colors duration-300 ${
                  activeCategory === "tutor"
                    ? "text-green-600"
                    : "text-gray-500"
                }`}
              >
                Tutor
              </span>
              <GraduationCap
                className={`w-5 h-5 transition-colors duration-300 ${
                  activeCategory === "tutor"
                    ? "text-green-600"
                    : "text-gray-400"
                }`}
              />
            </div>
          </div>
        </div>

        {/* Custom CSS to hide scrollbars */}
        <style>
          {`
            .marquee-container {
              overflow: hidden !important;
            }
            .marquee-container::-webkit-scrollbar {
              display: none !important;
            }
            .marquee-container {
              -ms-overflow-style: none !important;
              scrollbar-width: none !important;
            }
            .rfm-marquee-container {
              overflow: hidden !important;
            }
            .rfm-marquee-container::-webkit-scrollbar {
              display: none !important;
            }
            .rfm-child {
              overflow: hidden !important;
            }
          `}
        </style>

        {/* Marquee Rows */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeCategory}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="space-y-6 sm:space-y-8 overflow-hidden">
              {/* First Row - Moving Right */}
              <div className="marquee-container overflow-hidden">
                <Marquee
                  speed={30}
                  gradient={true}
                  gradientColor={
                    activeCategory === "guardian"
                      ? "rgb(248, 250, 252)"
                      : "rgb(247, 254, 251)"
                  }
                  gradientWidth={50}
                  pauseOnHover={true}
                  className="py-2 overflow-hidden"
                  style={{ overflow: "hidden" }}
                  key={`row1-${activeCategory}`}
                >
                  {currentReviews.map((review) => (
                    <ReviewCard
                      key={`row1-${review.id}-${activeCategory}`}
                      review={review}
                      activeCategory={activeCategory}
                    />
                  ))}
                </Marquee>
              </div>

              {/* Second Row - Moving Left */}
              <div className="marquee-container overflow-hidden">
                <Marquee
                  speed={35}
                  direction="right"
                  gradient={true}
                  gradientColor={
                    activeCategory === "guardian"
                      ? "rgb(248, 250, 252)"
                      : "rgb(247, 254, 251)"
                  }
                  gradientWidth={50}
                  pauseOnHover={true}
                  className="py-2 overflow-hidden"
                  style={{ overflow: "hidden" }}
                  key={`row2-${activeCategory}`}
                >
                  {currentReviews
                    .slice()
                    .reverse()
                    .map((review) => (
                      <ReviewCard
                        key={`row2-${review.id}-${activeCategory}`}
                        review={review}
                        activeCategory={activeCategory}
                      />
                    ))}
                </Marquee>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
};

export default GuardianReviews;
