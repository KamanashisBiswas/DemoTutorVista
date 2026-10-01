import React from "react";
import { Link, useNavigate } from "react-router-dom";

const categories = [
  {
    id: "class-1-5",
    tag: "Foundational Years",
    title: "Class 1–5 (Primary)",
    description:
      "Bangla & English Version basic concepts, handwriting, English reading & mental math.",
    icon: "child_care",
    tutorCount: "420+ Vetted Tutors",
    query: "Class 1-5",
  },
  {
    id: "class-6-10",
    tag: "SSC & O-Levels",
    title: "Class 6–10 (Secondary)",
    description:
      "General Math, Higher Math, Physics, Chemistry, Biology & English Medium Cambridge track.",
    icon: "menu_book",
    tutorCount: "1,180+ Vetted Tutors",
    query: "Class 6-8",
  },
  {
    id: "hsc",
    tag: "Board Prep & A-Levels",
    title: "HSC & A-Levels",
    description:
      "Intensive college syllabus coverage by university faculty & department toppers.",
    icon: "calculate",
    tutorCount: "890+ Vetted Tutors",
    query: "HSC",
  },
  {
    id: "admission",
    tag: "BUET / DU / Medical",
    title: "Admission Test Prep",
    description:
      "Engineering, Medical College & IBA varsity admission mentorship with question bank solving.",
    icon: "biotech",
    tutorCount: "640+ Vetted Tutors",
    query: "University Admission",
  },
  {
    id: "skills",
    tag: "IELTS & Tech Skills",
    title: "Language & ICT",
    description:
      "IELTS band score boost, Spoken English fluency, Python, C++ & HSC ICT programming.",
    icon: "translate",
    tutorCount: "310+ Vetted Tutors",
    query: "Language & Skills",
  },
];

const PopularCategoriesSection = () => {
  const navigate = useNavigate();

  return (
    <section id="categories" className="w-full py-10 lg:py-14 bg-surface border-b border-outline-variant/10">
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
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-5">
          {categories.map((cat) => (
            <div
              key={cat.id}
              onClick={() => navigate(`/tutors?class=${encodeURIComponent(cat.query)}`)}
              className="bg-surface-container-lowest rounded-2xl p-5 sm:p-6 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between group cursor-pointer hover:-translate-y-1 border border-slate-100/80"
            >
              <div>
                <div className="w-12 h-12 rounded-xl bg-surface-container flex items-center justify-center text-primary-container mb-4 group-hover:bg-primary-container group-hover:text-on-primary transition-colors">
                  <span className="material-symbols-outlined text-[26px]">{cat.icon}</span>
                </div>
                <span className="font-label-sm text-label-sm text-secondary font-bold block mb-1">
                  {cat.tag}
                </span>
                <h3 className="font-headline-sm text-headline-sm text-on-surface font-bold text-[16px]">
                  {cat.title}
                </h3>
                <p className="font-body-sm text-body-sm text-on-surface-variant mt-2 leading-relaxed">
                  {cat.description}
                </p>
              </div>

              <div className="mt-5 pt-4 border-t border-outline-variant/20 flex items-center justify-between">
                <span className="font-label-sm text-label-sm font-semibold text-on-surface-variant">
                  {cat.tutorCount}
                </span>
                <span className="material-symbols-outlined text-primary-container text-[18px] group-hover:translate-x-1 transition-transform">
                  arrow_forward
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PopularCategoriesSection;
