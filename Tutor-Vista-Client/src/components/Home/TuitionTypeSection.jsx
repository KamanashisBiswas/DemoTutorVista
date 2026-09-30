import React from "react";
import { Link } from "react-router-dom";
import { Home, Laptop, Users, Check, ArrowRight } from "lucide-react";
import CommonSectionHeading from "../Common/CommonSectionHeading";
import { Card } from "../ui/Card";
import { Button } from "../ui/Button";

import homeTutoringImage from "../../assets/Home/Image/home-tutor.svg";
import onlineTutoringImage from "../../assets/Home/Image/online-tutor.svg";
import groupTutoringImage from "../../assets/Home/Image/group-tutor.svg";

const TuitionTypeSection = () => {
  const types = [
    {
      id: "home",
      icon: Home,
      title: "Home Tutoring",
      badge: "Most Popular",
      badgeColor: "bg-[#EEEDFD] text-[#3730E0] border-[#DDD9FC]",
      image: homeTutoringImage,
      desc: "One-on-one personalized learning at the comfort of your own home with dedicated attention.",
      features: [
        "In-person mentor supervision",
        "Individual pace & customized lesson plans",
        "Convenient schedule matching guardian needs",
      ],
      link: "/request-tutor?type=home",
    },
    {
      id: "online",
      icon: Laptop,
      title: "Online Tutoring",
      badge: "Flexible & Global",
      badgeColor: "bg-[#F0FDFA] text-[#0EA5A0] border-[#CCFBF1]",
      image: onlineTutoringImage,
      desc: "Interactive live digital classes via Zoom / Google Meet with top national subject experts.",
      features: [
        "Access teachers from anywhere in Bangladesh",
        "Digital screen sharing & session recordings",
        "Economical with zero travel time",
      ],
      link: "/request-tutor?type=online",
    },
    {
      id: "group",
      icon: Users,
      title: "Group Tutoring",
      badge: "Collaborative",
      badgeColor: "bg-[#FFFBEB] text-[#D97706] border-[#FDE68A]",
      image: groupTutoringImage,
      desc: "Small-batch collaborative sessions where peers learn together under expert guidance.",
      features: [
        "Cost-effective shared tuition fees",
        "Healthy peer discussion & mock tests",
        "Ideal for SSC / HSC syllabus batch coverage",
      ],
      link: "/request-tutor?type=group",
    },
  ];

  return (
    <section className="py-16 sm:py-20 bg-[#F7F8FB]">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <CommonSectionHeading
          badge="LEARNING FORMATS"
          title="Flexible Tuition Modes"
          highlight="For Every Need"
          subtitle="Whether you prefer face-to-face home tutoring or flexible interactive online classes, we provide verified educators tailored to your learning style."
        />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {types.map((item) => {
            const Icon = item.icon;
            return (
              <Card
                key={item.id}
                hoverable
                className="bg-white border-[#E4E6EE] p-6 flex flex-col justify-between"
              >
                <div>
                  {/* Card Header & Badge */}
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-10 h-10 rounded-sm bg-[#EEEDFD] text-[#3730E0] flex items-center justify-center">
                      <Icon className="w-5 h-5" />
                    </div>
                    <span
                      className={`px-2.5 py-0.5 rounded-full text-xs font-semibold border ${item.badgeColor}`}
                    >
                      {item.badge}
                    </span>
                  </div>

                  {/* Illustration Container */}
                  <div className="h-40 w-full flex items-center justify-center p-3 mb-4 bg-[#F7F8FB] rounded-md">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="max-h-full max-w-full object-contain"
                    />
                  </div>

                  {/* Title & Desc */}
                  <h3 className="text-lg font-bold text-[#1A1D29] mb-2 tracking-tight">
                    {item.title}
                  </h3>
                  <p className="text-xs text-[#5B5F73] leading-relaxed mb-4">
                    {item.desc}
                  </p>

                  {/* Feature checklist */}
                  <ul className="space-y-2 mb-6">
                    {item.features.map((feat, fIdx) => (
                      <li
                        key={fIdx}
                        className="flex items-start gap-2 text-xs text-[#1A1D29]"
                      >
                        <Check className="w-3.5 h-3.5 text-[#16A34A] shrink-0 mt-0.5" />
                        <span>{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="pt-4 border-t border-[#E4E6EE]">
                  <Link to={item.link}>
                    <Button variant="secondary" size="sm" fullWidth iconRight={ArrowRight}>
                      Choose {item.title}
                    </Button>
                  </Link>
                </div>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default TuitionTypeSection;
