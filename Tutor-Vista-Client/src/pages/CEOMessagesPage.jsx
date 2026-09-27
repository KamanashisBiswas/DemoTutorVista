import React, { useEffect } from "react";
import { motion } from "framer-motion";
import { Quote, BookOpen, Users, Globe, Award, Sparkles } from "lucide-react";
import FounderImage from "../assets/ceo/founder-portrait.jpg";
import CommonSectionHeading from "../components/Common/CommonSectionHeading";

const CEOMessagesPage = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const paragraphs = [
    "Education is more than just grades and exam results — it is the bridge between a student's hidden potential and their future aspirations. When a learner is paired with the right mentor, uncertainty transforms into genuine curiosity and lifelong confidence.",
    "Every student learns at their own pace, and behind every parent's search for a tutor is a deep aspiration to provide their child with the highest standard of guidance. TutorVista was built to bridge this vital gap — combining modern technology with compassionate, verified mentorship.",
    "Having witnessed the challenges families and educators encounter across the conventional learning landscape, our goal has always been clear: create a seamless, transparent platform where top-tier academic guidance is accessible to every student, everywhere.",
    "At TutorVista, we don't merely connect tutors with students. We thoroughly verify credentials, uphold rigorous teaching standards, and provide continuous support so that every session brings measurable academic growth and peace of mind.",
    "As we expand our reach across Bangladesh, our commitment remains steadfast — empowering young minds, honoring passionate educators, and building a trusted community dedicated to lifelong learning.",
  ];

  const missionCards = [
    {
      title: "Universal Educational Access",
      description:
        "Connecting students across all districts with highly qualified, subject-specialist mentors tailored to their unique curriculum.",
      icon: BookOpen,
    },
    {
      title: "Compassionate Mentorship",
      description:
        "Fostering an encouraging environment where students feel confident to ask questions, solve challenges, and excel.",
      icon: Users,
    },
    {
      title: "Empowering Educators",
      description:
        "Providing university graduates and scholars with rewarding teaching opportunities and professional pedagogical support.",
      icon: Globe,
    },
  ];

  return (
    <div className="bg-[#F7F8FB] text-[#1A1D29] font-sans min-h-screen">
      {/* Header Banner */}
      <section className="py-12 sm:py-16 bg-white border-b border-[#E4E6EE]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <CommonSectionHeading title="Founder's" highlight="Message" />
          <p className="mt-3 text-sm sm:text-base text-[#5B5F73] max-w-xl mx-auto">
            Inspiring Curiosity, Empowering Learners, and Elevating Mentorship Across Bangladesh
          </p>
        </div>
      </section>

      {/* Main Executive Letter */}
      <section className="py-12 sm:py-16">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-2xl shadow-card border border-[#E4E6EE] overflow-hidden p-6 sm:p-10 lg:p-12">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
              {/* Photo & Founder Details */}
              <div className="lg:col-span-5 flex flex-col items-center">
                <div className="relative w-64 sm:w-72 aspect-[4/5] rounded-2xl overflow-hidden border-2 border-[#E4E6EE] shadow-md bg-[#F7F8FB] group">
                  <img
                    src={FounderImage}
                    alt="Syed Tanvir Rahman - Founder & CEO"
                    className="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent pointer-events-none" />
                  <div className="absolute bottom-3 left-3 right-3 bg-white/90 backdrop-blur-md px-3 py-2 rounded-xl border border-white/60 shadow-sm flex items-center justify-between text-xs">
                    <span className="font-semibold text-[#1A1D29] flex items-center gap-1.5">
                      <Sparkles className="w-3.5 h-3.5 text-[#3730E0]" />
                      Verified Leader
                    </span>
                    <span className="text-[#0EA5A0] font-medium flex items-center gap-1">
                      <Award className="w-3.5 h-3.5" />
                      TutorVista
                    </span>
                  </div>
                </div>

                <div className="mt-5 text-center">
                  <h4 className="text-lg font-bold text-[#1A1D29]">
                    Syed Tanvir Rahman
                  </h4>
                  <p className="text-xs font-semibold text-[#3730E0] uppercase tracking-wider mt-0.5">
                    Founder & Chief Executive Officer
                  </p>
                  <p className="text-xs text-[#5B5F73] mt-1">
                    Education Entrepreneur & Social Advocate
                  </p>
                </div>
              </div>

              {/* Message Content */}
              <div className="lg:col-span-7 space-y-5">
                <div className="w-11 h-11 rounded-2xl bg-[#3730E0]/10 text-[#3730E0] flex items-center justify-center">
                  <Quote className="w-5 h-5" />
                </div>

                <div className="space-y-4 text-xs sm:text-sm text-[#5B5F73] leading-relaxed">
                  {paragraphs.map((p, idx) => (
                    <p
                      key={idx}
                      className={
                        idx === 0
                          ? "text-sm sm:text-base font-semibold text-[#1A1D29] leading-relaxed italic border-l-4 border-[#3730E0] pl-4 py-1"
                          : ""
                      }
                    >
                      {p}
                    </p>
                  ))}
                </div>

                <div className="pt-6 border-t border-[#E4E6EE] flex items-center justify-between flex-wrap gap-3">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-1 bg-[#3730E0] rounded-full"></div>
                    <span className="text-xs font-semibold text-[#5B5F73] uppercase tracking-wider">
                      Leadership & Vision
                    </span>
                  </div>
                  <div className="text-xs font-semibold text-[#3730E0] bg-[#3730E0]/5 px-3 py-1.5 rounded-full border border-[#3730E0]/15">
                    TutorVista Community
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Strategic Pillars */}
      <section className="py-12 sm:py-16 bg-white border-t border-[#E4E6EE]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <h3 className="text-xl sm:text-2xl font-bold text-[#1A1D29]">
              Our Guiding <span className="text-[#3730E0]">Pillars</span>
            </h3>
            <p className="text-xs sm:text-sm text-[#5B5F73] mt-2 max-w-lg mx-auto">
              Building a transparent, sustainable educational ecosystem that nurtures learners everywhere.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {missionCards.map((card, idx) => {
              const Icon = card.icon;
              return (
                <div
                  key={idx}
                  className="bg-[#F7F8FB] border border-[#E4E6EE] rounded-2xl p-6 hover:border-[#3730E0]/30 hover:shadow-card transition-all"
                >
                  <div className="w-10 h-10 rounded-xl bg-[#3730E0]/10 text-[#3730E0] flex items-center justify-center mb-4">
                    <Icon className="w-5 h-5" />
                  </div>
                  <h4 className="text-base font-bold text-[#1A1D29] mb-2">
                    {card.title}
                  </h4>
                  <p className="text-xs sm:text-sm text-[#5B5F73] leading-relaxed">
                    {card.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
};

export default CEOMessagesPage;
