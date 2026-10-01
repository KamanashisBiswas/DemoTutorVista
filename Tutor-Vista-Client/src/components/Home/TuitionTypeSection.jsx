import React from "react";
import { Link } from "react-router-dom";

const TuitionTypeSection = () => {
  return (
    <section className="w-full py-10 lg:py-14 bg-surface-container-low/40 border-b border-outline-variant/10">
      <div className="container mx-auto px-4 sm:px-6 lg:px-12">
        {/* Section Heading */}
        <div className="text-center max-w-2xl mx-auto mb-10 sm:mb-12 space-y-2.5">
          <span className="px-3.5 py-1 rounded-full bg-surface-container-highest text-primary-container font-label-sm text-label-sm font-bold tracking-wide inline-block">
            Flexible Formats
          </span>
          <h2 className="font-headline-lg text-headline-lg text-on-surface font-bold tracking-tight">
            Choose the Ideal Tutoring Mode
          </h2>
          <p className="font-body-md text-body-md text-on-surface-variant">
            Customized learning formats designed to fit your family’s routine and academic goals.
          </p>
        </div>

        {/* 3 Modes Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
          {/* Mode 1: Home Tutoring */}
          <div className="bg-surface-container-lowest rounded-3xl p-6 sm:p-7 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between relative group border border-slate-100">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="w-12 h-12 rounded-2xl bg-primary-fixed text-on-primary-fixed flex items-center justify-center">
                  <span className="material-symbols-outlined text-[26px]">home_pin</span>
                </div>
                <span className="px-3 py-1 rounded-full bg-surface-container text-on-surface font-label-sm text-label-sm font-semibold">
                  Most Popular
                </span>
              </div>
              <h3 className="font-headline-md text-headline-md text-on-surface font-bold text-[20px]">
                Home Tutoring
              </h3>
              <p className="font-body-sm text-body-sm text-on-surface-variant leading-relaxed">
                Dedicated 1-on-1 personalized teaching in the comfort and safety of your residence.
              </p>
              <ul className="space-y-2.5 pt-2 font-body-sm text-body-sm text-on-surface">
                <li className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-secondary text-[16px]">check</span>
                  <span>Personalized student attention &amp; pace</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-secondary text-[16px]">check</span>
                  <span>Direct daily feedback to guardians</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-secondary text-[16px]">check</span>
                  <span>Flexible 3, 4 or 5 days/week schedules</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-secondary text-[16px]">check</span>
                  <span>Verified tutors nearby your area</span>
                </li>
              </ul>
            </div>
            <div className="pt-6 mt-6 border-t border-outline-variant/20">
              <Link
                to="/request-tutor?type=home"
                className="block w-full py-3 text-center rounded-xl bg-surface-container hover:bg-primary-container text-on-surface hover:text-on-primary font-label-lg text-label-lg font-bold transition-all"
              >
                Request Home Tutor
              </Link>
            </div>
          </div>

          {/* Mode 2: Online 1-on-1 */}
          <div className="bg-surface-container-lowest rounded-3xl p-6 sm:p-7 shadow-md hover:shadow-xl transition-all duration-300 flex flex-col justify-between relative border-2 border-primary-container">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="w-12 h-12 rounded-2xl bg-secondary-container text-on-secondary-container flex items-center justify-center">
                  <span className="material-symbols-outlined text-[26px]">laptop_mac</span>
                </div>
                <span className="px-3 py-1 rounded-full bg-secondary text-on-secondary font-label-sm text-label-sm font-bold">
                  Nationwide Access
                </span>
              </div>
              <h3 className="font-headline-md text-headline-md text-on-surface font-bold text-[20px]">
                Online 1-on-1 Tutoring
              </h3>
              <p className="font-body-sm text-body-sm text-on-surface-variant leading-relaxed">
                Connect with BUET, DU &amp; medical college toppers regardless of which city you reside in.
              </p>
              <ul className="space-y-2.5 pt-2 font-body-sm text-body-sm text-on-surface">
                <li className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-secondary text-[16px]">check</span>
                  <span>Live digital tablet whiteboard sessions</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-secondary text-[16px]">check</span>
                  <span>Full session recordings for revisions</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-secondary text-[16px]">check</span>
                  <span>Zero travel hassle, weather safe</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-secondary text-[16px]">check</span>
                  <span>Specialized syllabus &amp; exam modules</span>
                </li>
              </ul>
            </div>
            <div className="pt-6 mt-6 border-t border-outline-variant/20">
              <Link
                to="/request-tutor?type=online"
                className="block w-full py-3 text-center rounded-xl bg-primary-container hover:bg-tertiary-container text-on-primary font-label-lg text-label-lg font-bold shadow-md transition-all"
              >
                Request Online Tutor
              </Link>
            </div>
          </div>

          {/* Mode 3: Group Batch */}
          <div className="bg-surface-container-lowest rounded-3xl p-6 sm:p-7 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between relative group border border-slate-100">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="w-12 h-12 rounded-2xl bg-surface-container text-tertiary-container flex items-center justify-center">
                  <span className="material-symbols-outlined text-[26px]">groups</span>
                </div>
                <span className="px-3 py-1 rounded-full bg-surface-container text-on-surface font-label-sm text-label-sm font-semibold">
                  Cost-Effective
                </span>
              </div>
              <h3 className="font-headline-md text-headline-md text-on-surface font-bold text-[20px]">
                Group Tuition (Batch 3–5)
              </h3>
              <p className="font-body-sm text-body-sm text-on-surface-variant leading-relaxed">
                Small batch collaborative learning with peers to build competitive spirit and discuss problem sets.
              </p>
              <ul className="space-y-2.5 pt-2 font-body-sm text-body-sm text-on-surface">
                <li className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-secondary text-[16px]">check</span>
                  <span>35% to 45% savings on tuition budget</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-secondary text-[16px]">check</span>
                  <span>Weekly peer mock exams &amp; leaderboard</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-secondary text-[16px]">check</span>
                  <span>Interactive group doubt-solving</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-secondary text-[16px]">check</span>
                  <span>Held at tutor facility or online</span>
                </li>
              </ul>
            </div>
            <div className="pt-6 mt-6 border-t border-outline-variant/20">
              <Link
                to="/request-tutor?type=group"
                className="block w-full py-3 text-center rounded-xl bg-surface-container hover:bg-primary-container text-on-surface hover:text-on-primary font-label-lg text-label-lg font-bold transition-all"
              >
                Explore Group Batches
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TuitionTypeSection;
