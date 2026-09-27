import React, { useEffect } from "react";
import { motion } from "framer-motion";
import {
  Compass,
  Target,
  ShieldCheck,
  CheckCircle2,
  Users,
  GraduationCap,
  Sparkles,
  Award,
} from "lucide-react";
import VisionImg from "../assets/About/vision1.jpg";
import MissionImg from "../assets/About/Mission2.svg";
import ChooseImg from "../assets/About/chooce-us.png";
import CommonSectionHeading from "../components/Common/CommonSectionHeading";

const AboutUsPage = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const features = [
    {
      title: "Government Licensed",
      desc: "Fully registered and licensed educational consultancy in Bangladesh.",
    },
    {
      title: "100% Verified Tutors",
      desc: "Rigorous background, NID, and academic credential verification.",
    },
    {
      title: "Precision Matching",
      desc: "Tailored tutor recommendations matching student medium, curriculum, and goals.",
    },
    {
      title: "Wide Coverage",
      desc: "From preschool to university admission and professional certifications.",
    },
    {
      title: "Dhaka & Chattogram",
      desc: "Fast, localized support across all major metropolitan areas.",
    },
    {
      title: "Transparent & Safe",
      desc: "Demo classes, clear service guidelines, and responsive customer helpline.",
    },
  ];

  return (
    <div className="bg-[#F7F8FB] text-[#1A1D29] font-sans min-h-screen">
      {/* Hero / Overview Section */}
      <section className="py-12 sm:py-16 bg-white border-b border-[#E4E6EE]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <CommonSectionHeading title="About" highlight="TutorVista" />
          <p className="mt-6 text-sm sm:text-base lg:text-lg text-[#5B5F73] leading-relaxed text-justify sm:text-center">
            At TutorVista, we are dedicated to transforming the educational experience by offering high-quality, responsible, and reliable private tutors. With over 100,000 verified tutors across Dhaka and Chattogram, we are fully licensed under the government, ensuring that our services are legitimate and trustworthy. Whether it is a young learner taking their first steps, a student preparing for board exams, or someone seeking specialized guidance in language, arts, or test prep, we ensure every student receives personalized mentorship.
          </p>
        </div>
      </section>

      {/* Vision & Mission Section */}
      <section className="py-12 sm:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
          {/* Vision */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            <div className="order-2 lg:order-1 bg-white p-6 sm:p-10 rounded-lg shadow-card border border-[#E4E6EE]">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-[#EEEDFD] text-[#3730E0] mb-4">
                <Compass className="w-3.5 h-3.5" />
                <span>Our Aspirations</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-bold text-[#1A1D29] mb-4">
                Our <span className="text-[#3730E0]">Vision</span>
              </h2>
              <div className="space-y-4 text-xs sm:text-sm text-[#5B5F73] leading-relaxed">
                <p>
                  Our vision is to become the leading educational platform for private tutoring in Bangladesh, creating a dynamic and engaging learning environment where students are inspired, motivated, and equipped to achieve academic excellence.
                </p>
                <p>
                  We see a future where every student has access to top-tier, trustworthy tutors—empowering them to thrive in their studies, cultivate confidence, and overcome future challenges with knowledge and critical skills.
                </p>
              </div>
            </div>

            <div className="order-1 lg:order-2 flex justify-center">
              <img
                src={VisionImg}
                alt="Our Vision"
                className="w-full max-w-md rounded-lg shadow-card border border-[#E4E6EE] object-cover"
              />
            </div>
          </div>

          {/* Mission */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            <div className="flex justify-center">
              <img
                src={MissionImg}
                alt="Our Mission"
                className="w-full max-w-md rounded-lg shadow-card border border-[#E4E6EE] bg-white p-6"
              />
            </div>

            <div className="bg-white p-6 sm:p-10 rounded-lg shadow-card border border-[#E4E6EE]">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-[#E6F7F7] text-[#0EA5A0] mb-4">
                <Target className="w-3.5 h-3.5" />
                <span>Our Purpose</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-bold text-[#1A1D29] mb-4">
                Our <span className="text-[#0EA5A0]">Mission</span>
              </h2>
              <div className="space-y-4 text-xs sm:text-sm text-[#5B5F73] leading-relaxed">
                <p>
                  Our mission is to inspire and nurture student potential by connecting them with qualified, passionate tutors committed to their success. We bridge the gap between academic ambition and real achievement across every level—from primary grades to college admissions, IELTS, and SATs.
                </p>
                <p>
                  We foster a collaborative, respectful ecosystem for parents, educators, and pupils alike, upholding the highest standards of integrity, pedagogy, and student safety.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-12 sm:py-16 bg-white border-t border-[#E4E6EE]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-[#EEEDFD] text-[#3730E0] mb-3">
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>The TutorVista Advantage</span>
              </div>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-[#1A1D29] mb-4">
                Why Guardians & Tutors <span className="text-[#3730E0]">Trust Us</span>
              </h2>
              <p className="text-xs sm:text-sm text-[#5B5F73] mb-8 leading-relaxed">
                We combine government-certified credibility with personalized customer service, ensuring seamless matching and complete peace of mind.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {features.map((item, index) => (
                  <div
                    key={index}
                    className="p-4 rounded-md border border-[#E4E6EE] bg-[#F7F8FB] hover:border-[#CBD5E1] transition-all"
                  >
                    <div className="flex items-start gap-2.5">
                      <CheckCircle2 className="w-4 h-4 text-[#3730E0] mt-0.5 flex-shrink-0" />
                      <div>
                        <h4 className="text-xs sm:text-sm font-bold text-[#1A1D29]">
                          {item.title}
                        </h4>
                        <p className="text-xs text-[#5B5F73] mt-1 leading-normal">
                          {item.desc}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex justify-center">
              <img
                src={ChooseImg}
                alt="Why Choose Us"
                className="w-full max-w-md rounded-lg shadow-card border border-[#E4E6EE] bg-white p-4"
              />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutUsPage;
