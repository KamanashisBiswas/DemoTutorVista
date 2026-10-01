import React from "react";
import { Link, useNavigate } from "react-router-dom";

const categories = [
  {
    id: "class-1-5",
    badge: {
      text: "Popular",
      icon: "trending_up",
      class: "bg-secondary-container/20 text-secondary",
    },
    tag: "Foundational Years",
    title: "Class 1–5 (Primary)",
    description:
      "Bangla & English Version basic concepts, handwriting, English reading & mental math.",
    bullets: [
      "Activity-based learning modules",
      "Weekly guardian progress report",
    ],
    icon: "child_care",
    tutors: "420+ Tutors",
    students: "1,250+ Students",
    query: "Class 1-5",
  },
  {
    id: "class-6-10",
    badge: {
      text: "High Demand",
      icon: "local_fire_department",
      class: "bg-primary-fixed text-on-primary-fixed-variant",
    },
    tag: "SSC & O-Levels",
    title: "Class 6–10 (Secondary)",
    description:
      "General Math, Higher Math, Physics, Chemistry, Biology & Cambridge syllabus coaching.",
    bullets: [
      "Chapter test & creative question solve",
      "O-Level past paper drills",
    ],
    icon: "menu_book",
    tutors: "1,180+ Tutors",
    students: "3,400+ Students",
    query: "Class 6-8",
  },
  {
    id: "hsc",
    badge: {
      text: "Top Rated",
      icon: "verified",
      class: "bg-secondary-container text-on-secondary-container",
    },
    tag: "Board Prep & A-Levels",
    title: "HSC & A-Levels",
    description:
      "Intensive college syllabus coverage by university faculty & department toppers.",
    bullets: [
      "BUET/DU mentor allocations",
      "CQ & MCQ speed mastery",
    ],
    icon: "calculate",
    tutors: "890+ Tutors",
    students: "2,800+ Students",
    query: "HSC",
  },
  {
    id: "admission",
    badge: {
      text: "Elite Track",
      icon: "workspace_premium",
      class: "bg-amber-300/20 text-amber-600 dark:text-amber-400",
    },
    tag: "BUET / DU / Medical",
    title: "Admission Test Prep",
    description:
      "Engineering, Medical College & IBA varsity admission mentorship with question bank solving.",
    bullets: [
      "Varsity ranker 1-on-1 coaching",
      "Model tests & negative mark strategy",
    ],
    icon: "biotech",
    tutors: "640+ Tutors",
    students: "1,900+ Students",
    query: "University Admission",
  },
  {
    id: "skills",
    badge: {
      text: "Global Prep",
      icon: "public",
      class: "bg-surface-container-high text-primary-container",
    },
    tag: "IELTS & Tech Skills",
    title: "Language & ICT",
    description:
      "IELTS band 7.5+ boost, Spoken English fluency, Python, C++ & HSC ICT programming.",
    bullets: [
      "Mock speaking & writing scoring",
      "Live coding syntax walk-through",
    ],
    icon: "translate",
    tutors: "310+ Tutors",
    students: "950+ Students",
    query: "Language & Skills",
  },
];

const PopularCategoriesSection = () => {
  const navigate = useNavigate();

  return (
    <section
      id="categories"
      className="w-full py-10 lg:py-14 bg-surface border-b border-outline-variant/10"
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-12">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 sm:mb-10 gap-4">
          <div>
            <span className="px-3 py-1 rounded-full bg-surface-container-highest text-primary-container font-label-sm text-label-sm font-bold uppercase tracking-wider inline-block mb-2">
              Curriculum Spectrum
            </span>
            <h2 className="font-headline-lg text-headline-lg text-on-surface font-bold tracking-tight">
              Popular Tuition Categories
            </h2>
            <p className="font-body-md text-body-md text-on-surface-variant mt-1">
              Explore tailored learning options across every academic stage and medium.
            </p>
          </div>
          <Link
            to="/tutors"
            className="inline-flex items-center gap-1.5 font-label-lg text-label-lg text-primary-container font-bold hover:underline"
          >
            <span>Explore All 24+ Categories</span>
            <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
          </Link>
        </div>

        {/* Categories Grid (5 items) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-5 sm:gap-6">
          {categories.map((cat) => (
            <div
              key={cat.id}
              onClick={() => navigate(`/tutors?class=${encodeURIComponent(cat.query)}`)}
              className="bg-surface-container-lowest rounded-2xl p-5 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between group cursor-pointer hover:-translate-y-1 border border-outline-variant/20 relative overflow-hidden"
            >
              {/* Top Card Badge */}
              <div className="absolute top-3 right-3">
                <span
                  className={`px-2 py-0.5 rounded-full ${cat.badge.class} text-[11px] font-bold tracking-wide flex items-center gap-1`}
                >
                  <span className="material-symbols-outlined text-[13px]">{cat.badge.icon}</span>
                  <span>{cat.badge.text}</span>
                </span>
              </div>

              <div>
                <div className="w-11 h-11 rounded-xl bg-surface-container flex items-center justify-center text-primary-container mb-4 group-hover:bg-primary-container group-hover:text-on-primary transition-colors shadow-sm">
                  <span className="material-symbols-outlined text-[24px]">{cat.icon}</span>
                </div>
                <span className="font-label-sm text-label-sm text-secondary font-bold block mb-1">
                  {cat.tag}
                </span>
                <h3 className="font-headline-sm text-headline-sm text-on-surface font-bold text-[17px]">
                  {cat.title}
                </h3>
                <p className="font-body-sm text-body-sm text-on-surface-variant mt-1.5 leading-relaxed text-[12px]">
                  {cat.description}
                </p>

                {/* Feature Checkpoints */}
                <ul className="mt-3 space-y-1.5 border-t border-outline-variant/20 pt-2.5 text-[11px] text-on-surface-variant">
                  {cat.bullets.map((bullet, idx) => (
                    <li key={idx} className="flex items-center gap-1.5">
                      <span className="material-symbols-outlined text-secondary text-[14px]">
                        check_circle
                      </span>
                      <span>{bullet}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mt-4 pt-3 border-t border-outline-variant/20 flex items-center justify-between">
                <div className="flex flex-col">
                  <span className="font-label-sm text-label-sm font-bold text-on-surface">
                    {cat.tutors}
                  </span>
                  <span className="text-[10px] text-secondary font-semibold">
                    {cat.students}
                  </span>
                </div>
                <div className="w-7 h-7 rounded-full bg-surface-container flex items-center justify-center group-hover:bg-primary-container group-hover:text-on-primary transition-colors">
                  <span className="material-symbols-outlined text-[16px] group-hover:translate-x-0.5 transition-transform">
                    arrow_forward
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PopularCategoriesSection;
