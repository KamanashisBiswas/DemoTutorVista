import React, { useState } from "react";
import Marquee from "react-fast-marquee";
import { Users, GraduationCap, Star } from "lucide-react";
import CommonSectionHeading from "../Common/CommonSectionHeading";
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
      address: "Dhaka",
      review: "আপনাদের সার্ভিসে আমি সন্তুষ্ট। অত্যন্ত যত্নশীল ও নিয়মানুবর্তী টিউটর পেয়েছি। শুভ কামনা রইলো।",
      rating: 5,
      image: AjrinKarim,
      relationship: "Parent",
    },
    {
      id: 2,
      name: "Kamrun Nahar",
      address: "Dhanmondi, Dhaka",
      review: "I found two dedicated teachers from TutorVista for my kids. Both are well-qualified and sincere.",
      rating: 5,
      image: KamrunNahar,
      relationship: "Guardian",
    },
    {
      id: 3,
      name: "Ripa Saha Tropa",
      address: "Uttara, Dhaka",
      review: "অভিজ্ঞ টিউটর দেওয়ার জন্য অভিজ্ঞ টিউটর প্রভাইডারও যে প্রয়োজন এটার বাস্তব উদাহরণ টিউটর ভিসতা।",
      rating: 5,
      image: RipaSahaTropa,
      relationship: "Mother",
    },
    {
      id: 4,
      name: "Allen Mehedi",
      address: "Chattogram",
      review: "Undoubtedly the most dependable tuition network in Chattogram providing top-tier teachers.",
      rating: 5,
      image: AllenMehedi,
      relationship: "Parent",
    },
    {
      id: 5,
      name: "Tariqul Islam Fahim",
      address: "Banani, Dhaka",
      review: "Quick matching and genuine background checks. Found our physics teacher within 24 hours.",
      rating: 5,
      image: TariqulIslamFahim,
      relationship: "Father",
    },
    {
      id: 6,
      name: "Navid Sheikh",
      address: "Gulshan, Dhaka",
      review: "As a busy professional, finding trustworthy home tutoring was challenging. TutorVista made it effortless.",
      rating: 5,
      image: NavidSheikh,
      relationship: "Parent",
    },
  ];

  const tutorReviews = [
    {
      id: 1,
      name: "Jubayel Hossen",
      address: "DU Student, Dhaka",
      review: "TutorVista helped me find genuine tuitions near my university hall without any payment risks.",
      rating: 5,
      image: JubayelHossen,
      relationship: "Math Tutor",
    },
    {
      id: 2,
      name: "Tareq Rahman",
      address: "BUET, Dhaka",
      review: "Respectful guardians and clear commission terms. Highly recommend to university students.",
      rating: 5,
      image: TareqRahman,
      relationship: "Physics Tutor",
    },
    {
      id: 3,
      name: "Chidratul Muntah",
      address: "Chattogram",
      review: "Verified students and smooth coordination from the matching team. Very supportive platform.",
      rating: 5,
      image: ChidratulMuntah,
      relationship: "English Tutor",
    },
    {
      id: 4,
      name: "Arman Akib",
      address: "Sylhet",
      review: "Professional communication and on-time tuition match alerts. Best media in the city.",
      rating: 5,
      image: ArmanAkib,
      relationship: "Chemistry Tutor",
    },
    {
      id: 5,
      name: "Bilkis Akther",
      address: "Mirpur, Dhaka",
      review: "Female tutor security was my top priority. TutorVista connects only with genuine verified families.",
      rating: 5,
      image: BilkisAkther,
      relationship: "Biology Tutor",
    },
  ];

  const activeReviews = activeCategory === "guardian" ? guardianReviews : tutorReviews;

  return (
    <section className="py-16 sm:py-20 bg-[#F7F8FB] border-b border-[#E4E6EE] overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <CommonSectionHeading
          badge="TESTIMONIALS"
          title="Loved by Guardians &"
          highlight="Tutors Alike"
          subtitle="Real feedback from families and educators who found academic matches through TutorVista."
        />

        {/* Category Switcher Tabs */}
        <div className="flex items-center justify-center mb-10">
          <div className="inline-flex items-center gap-1.5 p-1 bg-white border border-[#E4E6EE] rounded-full shadow-xs">
            <button
              type="button"
              onClick={() => setActiveCategory("guardian")}
              className={`flex items-center gap-2 px-5 py-2 rounded-full text-xs font-semibold transition-all duration-150 ${
                activeCategory === "guardian"
                  ? "bg-[#3730E0] text-white shadow-sm"
                  : "text-[#5B5F73] hover:text-[#1A1D29] hover:bg-[#F7F8FB]"
              }`}
            >
              <Users className="w-3.5 h-3.5" />
              <span>Parents & Guardians</span>
            </button>
            <button
              type="button"
              onClick={() => setActiveCategory("tutor")}
              className={`flex items-center gap-2 px-5 py-2 rounded-full text-xs font-semibold transition-all duration-150 ${
                activeCategory === "tutor"
                  ? "bg-[#3730E0] text-white shadow-sm"
                  : "text-[#5B5F73] hover:text-[#1A1D29] hover:bg-[#F7F8FB]"
              }`}
            >
              <GraduationCap className="w-3.5 h-3.5" />
              <span>Verified Tutors</span>
            </button>
          </div>
        </div>

        {/* Carousel / Marquee */}
        <div className="relative">
          <Marquee
            gradient={true}
            gradientColor="#F7F8FB"
            gradientWidth={40}
            speed={35}
            pauseOnHover={true}
          >
            {activeReviews.map((rev) => (
              <ReviewCard
                key={rev.id}
                review={rev}
                activeCategory={activeCategory}
              />
            ))}
          </Marquee>
        </div>
      </div>
    </section>
  );
};

export default GuardianReviews;
