import React, { useState, useEffect, useRef } from "react";
import { Users, UserCheck, Briefcase, Star, Sparkles } from "lucide-react";
import { Card } from "../ui/Card";

const StatisticsSection = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [counters, setCounters] = useState({
    totalApplied: 0,
    totalTutors: 0,
    liveTuitionJobs: 0,
    tutorRating: 0,
  });

  const sectionRef = useRef(null);

  const stats = [
    {
      key: "totalTutors",
      label: "Verified Tutors",
      finalValue: 40000,
      suffix: "+",
      icon: UserCheck,
      color: "text-[#3730E0]",
      bg: "bg-[#EEEDFD]",
      desc: "Vetted graduates & university mentors",
    },
    {
      key: "totalApplied",
      label: "Matched Applications",
      finalValue: 12500,
      suffix: "+",
      icon: Users,
      color: "text-[#0EA5A0]",
      bg: "bg-[#F0FDFA]",
      desc: "Successful student placements",
    },
    {
      key: "liveTuitionJobs",
      label: "Active Tuition Posts",
      finalValue: 350,
      suffix: "+",
      icon: Briefcase,
      color: "text-[#3730E0]",
      bg: "bg-[#EEEDFD]",
      desc: "New postings added daily",
    },
    {
      key: "tutorRating",
      label: "Average Rating",
      finalValue: 4.9,
      isRating: true,
      suffix: " / 5.0",
      icon: Star,
      color: "text-[#F5A524]",
      bg: "bg-[#FFFBEB]",
      desc: "Based on 8,000+ guardian reviews",
    },
  ];

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !isVisible) {
          setIsVisible(true);
        }
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, [isVisible]);

  useEffect(() => {
    if (!isVisible) return;

    const duration = 1800;
    const steps = 40;
    const stepTime = duration / steps;
    let step = 0;

    const interval = setInterval(() => {
      step++;
      const progress = step / steps;

      setCounters({
        totalTutors: Math.floor(progress * 40000),
        totalApplied: Math.floor(progress * 12500),
        liveTuitionJobs: Math.floor(progress * 350),
        tutorRating: (progress * 4.9).toFixed(1),
      });

      if (step >= steps) {
        clearInterval(interval);
        setCounters({
          totalTutors: 40000,
          totalApplied: 12500,
          liveTuitionJobs: 350,
          tutorRating: "4.9",
        });
      }
    }, stepTime);

    return () => clearInterval(interval);
  }, [isVisible]);

  return (
    <section
      ref={sectionRef}
      className="py-16 sm:py-20 bg-white border-b border-[#E4E6EE] relative overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((item) => {
            const Icon = item.icon;
            const displayValue = item.isRating
              ? counters[item.key]
              : Number(counters[item.key]).toLocaleString();

            return (
              <Card
                key={item.key}
                hoverable
                className="p-6 text-center bg-[#F7F8FB] border-[#E4E6EE] flex flex-col items-center justify-between"
              >
                <div
                  className={`w-12 h-12 rounded-md ${item.bg} ${item.color} flex items-center justify-center mb-4 shadow-2xs`}
                >
                  <Icon className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-3xl sm:text-4xl font-extrabold text-[#1A1D29] tracking-tight mb-1">
                    {displayValue}
                    <span className="text-[#3730E0] text-2xl font-bold">
                      {item.suffix}
                    </span>
                  </h3>
                  <h4 className="text-sm font-bold text-[#1A1D29] mb-1">
                    {item.label}
                  </h4>
                  <p className="text-xs text-[#5B5F73] max-w-[200px] leading-normal">
                    {item.desc}
                  </p>
                </div>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default StatisticsSection;
