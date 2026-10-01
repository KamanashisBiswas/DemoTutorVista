import React, { useState } from "react";
import { Link } from "react-router-dom";
import tutorTanvir from "../../assets/Home/stitch/tutor-tanvir.jpg";
import tutorSadia from "../../assets/Home/stitch/tutor-sadia.jpg";
import tutorRafiul from "../../assets/Home/stitch/tutor-rafiul.jpg";
import tutorFarzana from "../../assets/Home/stitch/tutor-farzana.jpg";

const tutors = [
  {
    id: "tanvir",
    name: "Tanvir Ahmed",
    institution: "BUET (EEE)",
    specialty: "Higher Math & Physics Specialist",
    rating: "4.95",
    experience: "4+ Yrs Exp",
    location: "Dhaka (In-Person / Online)",
    image: tutorTanvir,
    tags: ["Class 9–12", "HSC Board Prep", "BUET Track"],
    category: "Mathematics",
  },
  {
    id: "sadia",
    name: "Dr. Sadia Sharmin",
    institution: "Dhaka Medical (DMC)",
    specialty: "Biology & Chemistry Expert",
    rating: "5.0",
    experience: "6+ Yrs Exp",
    location: "Dhanmondi & Online",
    image: tutorSadia,
    tags: ["Class 9–10", "HSC Medical Batch", "English Version"],
    category: "Biology",
  },
  {
    id: "rafiul",
    name: "Rafiul Hossain",
    institution: "University of Dhaka (DU)",
    specialty: "English Language & IELTS Coach (8.5)",
    rating: "4.88",
    experience: "5+ Yrs Exp",
    location: "Gulshan, Banani & Online",
    image: tutorRafiul,
    tags: ["O/A Levels", "IELTS Band Prep", "Spoken English"],
    category: "English & IELTS",
  },
  {
    id: "farzana",
    name: "Farzana Haque",
    institution: "North South Univ (NSU)",
    specialty: "ICT, C Programming & Gen Math",
    rating: "4.92",
    experience: "3+ Yrs Exp",
    location: "Bashundhara & Online",
    image: tutorFarzana,
    tags: ["HSC ICT", "Python / C++", "Class 8–10"],
    category: "ICT & CS",
  },
];

const categories = ["All", "Mathematics", "Physics", "English & IELTS", "Biology", "ICT & CS"];

const FeaturedTutorsSection = () => {
  const [activeCategory, setActiveCategory] = useState("All");

  const filteredTutors =
    activeCategory === "All"
      ? tutors
      : tutors.filter((t) => t.category === activeCategory || activeCategory === "All");

  return (
    <section className="w-full py-10 lg:py-14 bg-surface-container-low/40 border-b border-outline-variant/10">
      <div className="container mx-auto px-4 sm:px-6 lg:px-12">
        {/* Section Header with Filter Pills */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-8 sm:mb-10 gap-5">
          <div>
            <span className="px-3 py-1 rounded-full bg-surface-container-highest text-primary-container font-label-sm text-label-sm font-bold uppercase tracking-wider inline-block mb-2">
              Verified Academic Talent
            </span>
            <h2 className="font-headline-lg text-headline-lg text-on-surface font-bold tracking-tight">
              Meet Our Top-Ranked Verified Tutors
            </h2>
            <p className="font-body-md text-body-md text-on-surface-variant mt-1">
              Background checked, skill-tested, and endorsed by thousands of Bangladeshi parents.
            </p>
          </div>

          {/* Filter Pills */}
          <div className="flex flex-wrap gap-2">
            {categories.map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => setActiveCategory(cat)}
                className={`px-3.5 py-1.5 rounded-full font-label-md text-label-md transition-all cursor-pointer ${
                  activeCategory === cat
                    ? "bg-primary-container text-on-primary font-bold shadow-sm"
                    : "bg-surface-container hover:bg-surface-container-high text-on-surface"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Tutors Grid (4 Cards) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredTutors.map((tutor) => (
            <div
              key={tutor.id}
              className="bg-surface-container-lowest rounded-2xl p-5 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between group border border-slate-100"
            >
              <div>
                <div className="relative mb-4">
                  <img
                    src={tutor.image}
                    alt={tutor.name}
                    className="w-full h-48 rounded-xl object-cover object-top"
                  />
                  <span className="absolute top-2.5 right-2.5 px-2 py-0.5 rounded-md bg-surface-container-lowest/90 backdrop-blur text-secondary font-label-sm text-label-sm font-bold flex items-center gap-1 shadow-sm">
                    <span className="material-symbols-outlined text-[14px]">verified</span> Verified
                  </span>
                  <span className="absolute bottom-2.5 left-2.5 px-2 py-0.5 rounded-md bg-on-surface/80 text-surface font-label-sm text-label-sm text-white">
                    {tutor.institution}
                  </span>
                </div>

                <div className="flex items-center justify-between mb-1">
                  <h3 className="font-headline-sm text-headline-sm text-on-surface font-bold text-[16px] truncate">
                    {tutor.name}
                  </h3>
                  <div className="flex items-center gap-1 text-on-surface font-label-sm text-label-sm font-bold">
                    <span
                      className="material-symbols-outlined text-amber-500 text-[15px]"
                      style={{ fontVariationSettings: "'FILL' 1" }}
                    >
                      star
                    </span>
                    <span>{tutor.rating}</span>
                  </div>
                </div>

                <p className="font-body-sm text-body-sm text-on-surface-variant truncate">
                  {tutor.specialty}
                </p>

                <div className="flex flex-wrap gap-1.5 my-3">
                  {tutor.tags.map((tag, idx) => (
                    <span
                      key={idx}
                      className="px-2 py-0.5 rounded bg-surface-container text-on-surface font-label-sm text-label-sm text-[10px]"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                <div className="flex items-center justify-between text-on-surface-variant font-label-sm text-label-sm py-2 border-t border-outline-variant/20">
                  <span className="flex items-center gap-1">
                    <span className="material-symbols-outlined text-[15px]">work_history</span>{" "}
                    {tutor.experience}
                  </span>
                  <span className="flex items-center gap-1 truncate">
                    <span className="material-symbols-outlined text-[15px]">location_on</span>{" "}
                    <span className="truncate">{tutor.location}</span>
                  </span>
                </div>
              </div>

              <div className="mt-4 pt-3 flex items-center gap-2">
                <Link
                  to="/tutors"
                  className="flex-1 py-2 rounded-xl bg-surface-container hover:bg-surface-container-high text-on-surface font-label-md text-label-md font-bold transition-all text-center"
                >
                  View Profile
                </Link>
                <Link
                  to="/request-tutor"
                  className="p-2 rounded-xl bg-primary-container hover:bg-tertiary-container text-on-primary font-label-md text-label-md transition-all flex items-center justify-center cursor-pointer"
                  title="Request Free Demo"
                >
                  <span className="material-symbols-outlined text-[18px]">calendar_add_on</span>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedTutorsSection;
