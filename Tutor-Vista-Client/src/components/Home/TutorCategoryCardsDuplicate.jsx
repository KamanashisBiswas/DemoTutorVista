import React from "react";
import { Link } from "react-router-dom";
import { MapPin, Users, ArrowUpRight, GraduationCap, Sparkles } from "lucide-react";
import { Card } from "../ui/Card";
import { Button } from "../ui/Button";

const TutorCategoryCardsDuplicate = () => {
  const divisions = [
    {
      id: 1,
      city: "Dhaka",
      count: "4,500+ Tutors",
      desc: "Top home & online tutors across Dhanmondi, Gulshan, Uttara, Mirpur.",
      badge: "Highest Demand",
    },
    {
      id: 2,
      city: "Chattogram",
      count: "1,800+ Tutors",
      desc: "Qualified instructors in GEC, Panchlaish, Nasirabad, Agrabad.",
      badge: "Popular",
    },
    {
      id: 3,
      city: "Sylhet",
      count: "950+ Tutors",
      desc: "Experienced tutors in Zindabazar, Amberkhana, Shahjalal Uposhohor.",
      badge: "Growing Fast",
    },
    {
      id: 4,
      city: "Khulna",
      count: "800+ Tutors",
      desc: "Academic tutors available in Sonadanga, Boyra, Khalishpur.",
      badge: "Verified",
    },
  ];

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Side: 4 Division Hubs (8 cols) */}
        <div className="lg:col-span-8">
          <div className="flex items-center justify-between mb-4">
            <div>
              <span className="text-xs font-bold text-[#0EA5A0] uppercase tracking-wider">
                Explore by Region
              </span>
              <h3 className="text-xl font-bold text-[#1A1D29]">
                Find Tutors in Your City
              </h3>
            </div>
            <Link
              to="/tutors"
              className="text-xs font-semibold text-[#3730E0] hover:underline flex items-center gap-1"
            >
              <span>View All Locations</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {divisions.map((div) => (
              <Link
                key={div.id}
                to={`/tutors?division=${encodeURIComponent(div.city)}`}
                className="group block"
              >
                <Card
                  hoverable
                  className="p-5 h-full flex flex-col justify-between border-[#E4E6EE] hover:border-[#3730E0]/40 transition-all bg-white"
                >
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <div className="w-10 h-10 rounded-sm bg-[#EEEDFD] text-[#3730E0] flex items-center justify-center group-hover:scale-105 transition-transform">
                        <MapPin className="w-5 h-5" />
                      </div>
                      <span className="px-2 py-0.5 rounded-full text-[11px] font-semibold bg-[#F0FDFA] text-[#0EA5A0] border border-[#CCFBF1]">
                        {div.badge}
                      </span>
                    </div>
                    <div className="flex items-baseline gap-2">
                      <h4 className="text-base font-bold text-[#1A1D29] group-hover:text-[#3730E0] transition-colors">
                        {div.city}
                      </h4>
                      <span className="text-xs font-semibold text-[#0EA5A0]">
                        {div.count}
                      </span>
                    </div>
                    <p className="text-xs text-[#5B5F73] mt-1.5 leading-relaxed">
                      {div.desc}
                    </p>
                  </div>

                  <div className="mt-4 pt-3 border-t border-[#E4E6EE] flex items-center justify-between text-xs font-semibold text-[#3730E0]">
                    <span>Browse Tutors</span>
                    <ArrowUpRight className="w-4 h-4 transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                  </div>
                </Card>
              </Link>
            ))}
          </div>
        </div>

        {/* Right Side: Quick Action Feature Cards (4 cols) */}
        <div className="lg:col-span-4 flex flex-col gap-4">
          {/* Guardian Request Card */}
          <div className="p-6 rounded-md bg-[#3730E0] text-white flex-1 flex flex-col justify-between shadow-sm relative overflow-hidden">
            <div className="absolute top-0 right-0 -mr-8 -mt-8 w-32 h-32 rounded-full bg-white/10 blur-xl pointer-events-none" />
            <div className="space-y-3 relative z-10">
              <div className="w-10 h-10 rounded-sm bg-white/15 backdrop-blur-xs flex items-center justify-center text-white">
                <Users className="w-5 h-5" />
              </div>
              <h4 className="text-lg font-bold text-white tracking-tight">
                Looking for a Tutor?
              </h4>
              <p className="text-xs text-white/80 leading-relaxed">
                Post your subject, schedule & salary requirements. We will connect you with verified teachers for a free demo class.
              </p>
            </div>
            <div className="mt-5 pt-3 border-t border-white/15 relative z-10">
              <Link to="/request-tutor">
                <Button variant="secondary" size="sm" fullWidth className="bg-white text-[#3730E0] hover:bg-[#F7F8FB] font-bold">
                  Post Tuition Request
                </Button>
              </Link>
            </div>
          </div>

          {/* Tutor Apply Card */}
          <div className="p-6 rounded-md bg-white border border-[#E4E6EE] shadow-sm flex-1 flex flex-col justify-between">
            <div className="space-y-3">
              <div className="w-10 h-10 rounded-sm bg-[#F0FDFA] text-[#0EA5A0] flex items-center justify-center">
                <GraduationCap className="w-5 h-5" />
              </div>
              <h4 className="text-lg font-bold text-[#1A1D29] tracking-tight">
                Want to Teach?
              </h4>
              <p className="text-xs text-[#5B5F73] leading-relaxed">
                Join 5,000+ top tutors earning dignified income. Build your tutoring career with genuine tuition opportunities.
              </p>
            </div>
            <div className="mt-5 pt-3 border-t border-[#E4E6EE]">
              <Link to="/apply-tutor">
                <Button variant="outline" size="sm" fullWidth className="border-[#0EA5A0] text-[#0EA5A0] hover:bg-[#F0FDFA] font-bold">
                  Apply as a Tutor
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TutorCategoryCardsDuplicate;
