import React from "react";
import HomeAboutImg from "../../assets/About/AboutUs1.jpg";
import { Link } from "react-router-dom";
import { CheckCircle2, ArrowRight, ShieldCheck, Award, Clock } from "lucide-react";
import { Button } from "../ui/Button";

const HomeContact = () => {
  const highlights = [
    {
      icon: ShieldCheck,
      title: "100% Verified Credentials",
      desc: "Every tutor passes rigorous academic & identity verification.",
    },
    {
      icon: Award,
      title: "Top Tier Universities",
      desc: "Educators from BUET, DU, Medical Colleges, and leading institutions.",
    },
    {
      icon: Clock,
      title: "Fast 24-Hour Matching",
      desc: "Receive customized tutor recommendations within 24 hours.",
    },
  ];

  return (
    <section className="bg-white py-16 sm:py-20 border-y border-[#E4E6EE] overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Side: Educational Image Showcase */}
          <div className="lg:col-span-5 relative flex justify-center">
            <div className="relative w-full max-w-md">
              <div className="relative z-10 rounded-lg overflow-hidden border border-[#E4E6EE] shadow-md bg-[#F7F8FB]">
                <img
                  src={HomeAboutImg}
                  alt="TutorVista Student Learning"
                  className="w-full h-auto object-cover transform hover:scale-102 transition-transform duration-500"
                />
              </div>

              {/* Decorative Accent Badges */}
              <div className="absolute -bottom-5 -right-5 bg-white p-4 rounded-md border border-[#E4E6EE] shadow-lg z-20 hidden sm:flex items-center gap-3">
                <div className="w-10 h-10 rounded-sm bg-[#EEEDFD] text-[#3730E0] flex items-center justify-center font-bold">
                  98%
                </div>
                <div>
                  <h5 className="text-xs font-bold text-[#1A1D29]">Parent Satisfaction</h5>
                  <p className="text-[11px] text-[#5B5F73]">Across 12,000+ sessions</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Side: Content & Value Propositions */}
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
            <div>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-[#F0FDFA] text-[#0EA5A0] border border-[#CCFBF1] mb-3">
                ABOUT TUTORVISTA
              </span>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-[#1A1D29] tracking-tight leading-tight">
                Connecting <span className="text-[#3730E0]">Ambitious Students</span> with Expert, Vetted Tutors
              </h2>
            </div>

            <p className="text-sm sm:text-base text-[#5B5F73] leading-relaxed max-w-2xl mx-auto lg:mx-0">
              We empower students to achieve academic excellence by providing trusted, background-checked tutors for one-on-one home and online tuition. Personalized care, disciplined study plans, and verifiable progress.
            </p>

            {/* 3 Pillars */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2 text-left">
              {highlights.map((item, idx) => {
                const Icon = item.icon;
                return (
                  <div
                    key={idx}
                    className="p-3.5 rounded-md bg-[#F7F8FB] border border-[#E4E6EE]"
                  >
                    <Icon className="w-5 h-5 text-[#3730E0] mb-2" />
                    <h4 className="text-xs font-bold text-[#1A1D29]">{item.title}</h4>
                    <p className="text-[11px] text-[#5B5F73] mt-1 leading-normal">
                      {item.desc}
                    </p>
                  </div>
                );
              })}
            </div>

            {/* Action buttons */}
            <div className="pt-2 flex flex-wrap items-center justify-center lg:justify-start gap-3">
              <Link to="/about">
                <Button variant="primary" size="md" iconRight={ArrowRight}>
                  Learn More About Us
                </Button>
              </Link>
              <Link to="/request-tutor">
                <Button variant="secondary" size="md">
                  Request a Demo Class
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HomeContact;
