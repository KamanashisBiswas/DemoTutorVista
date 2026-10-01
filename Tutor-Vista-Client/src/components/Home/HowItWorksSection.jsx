import React from "react";
import { Link } from "react-router-dom";

const HowItWorksSection = () => {
  return (
    <section
      id="how-it-works"
      className="w-full py-10 lg:py-14 bg-surface-container-low/60 border-b border-outline-variant/10"
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-12">
        {/* Section Heading */}
        <div className="text-center max-w-2xl mx-auto mb-10 sm:mb-12 space-y-2.5">
          <span className="px-3.5 py-1 rounded-full bg-secondary-container text-on-secondary-container font-label-sm text-label-sm font-bold tracking-wide inline-block">
            Simple &amp; Transparent
          </span>
          <h2 className="font-headline-lg text-headline-lg text-on-surface font-bold tracking-tight">
            How TutorBridge Works in 3 Easy Steps
          </h2>
          <p className="font-body-md text-body-md text-on-surface-variant">
            Finding the right tutor for your child takes under 2 minutes. No upfront agency fees.
          </p>
        </div>

        {/* 3 Step Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 relative">
          {/* Step 1 */}
          <div className="bg-surface-container-lowest rounded-2xl p-6 sm:p-7 shadow-sm relative flex flex-col items-start border border-slate-100">
            <div className="w-12 h-12 rounded-xl bg-primary-container text-on-primary flex items-center justify-center font-headline-md text-headline-md font-extrabold mb-5 shadow-md">
              1
            </div>
            <h3 className="font-headline-sm text-headline-sm text-on-surface font-bold mb-2 text-[17px]">
              Post Tuition Requirement
            </h3>
            <p className="font-body-md text-body-md text-on-surface-variant leading-relaxed mb-6">
              Share your child’s class, curriculum, subjects needed, weekly schedule, and location in under 2 minutes.
            </p>
            <div className="mt-auto flex items-center gap-2 text-secondary font-label-sm text-label-sm font-bold">
              <span className="material-symbols-outlined text-[18px]">timer</span>
              <span>Takes &lt; 2 minutes • 100% Free</span>
            </div>
          </div>

          {/* Step 2 */}
          <div className="bg-surface-container-lowest rounded-2xl p-6 sm:p-7 shadow-sm relative flex flex-col items-start border border-slate-100">
            <div className="w-12 h-12 rounded-xl bg-primary-container text-on-primary flex items-center justify-center font-headline-md text-headline-md font-extrabold mb-5 shadow-md">
              2
            </div>
            <h3 className="font-headline-sm text-headline-sm text-on-surface font-bold mb-2 text-[17px]">
              Get Matched with Top 3 Tutors
            </h3>
            <p className="font-body-md text-body-md text-on-surface-variant leading-relaxed mb-6">
              Our smart matching algorithm and tuition coordinators shortlist 3 verified tutors with proven academic records.
            </p>
            <div className="mt-auto flex items-center gap-2 text-secondary font-label-sm text-label-sm font-bold">
              <span className="material-symbols-outlined text-[18px]">verified</span>
              <span>NID &amp; University ID Verified</span>
            </div>
          </div>

          {/* Step 3 */}
          <div className="bg-surface-container-lowest rounded-2xl p-6 sm:p-7 shadow-sm relative flex flex-col items-start border border-slate-100">
            <div className="w-12 h-12 rounded-xl bg-primary-container text-on-primary flex items-center justify-center font-headline-md text-headline-md font-extrabold mb-5 shadow-md">
              3
            </div>
            <h3 className="font-headline-sm text-headline-sm text-on-surface font-bold mb-2 text-[17px]">
              Free Trial &amp; Start Tutoring
            </h3>
            <p className="font-body-md text-body-md text-on-surface-variant leading-relaxed mb-6">
              Conduct a complimentary trial session. Once satisfied, confirm and begin lessons with our replacement guarantee.
            </p>
            <div className="mt-auto flex items-center gap-2 text-secondary font-label-sm text-label-sm font-bold">
              <span className="material-symbols-outlined text-[18px]">lock_reset</span>
              <span>Money-Back Safety Guarantee</span>
            </div>
          </div>
        </div>

        {/* Action Button */}
        <div className="mt-8 sm:mt-10 text-center">
          <Link
            to="/request-tutor"
            className="inline-flex items-center gap-2 px-8 py-3.5 rounded-xl bg-primary-container hover:bg-tertiary-container text-on-primary font-headline-sm text-headline-sm text-[16px] font-bold shadow-md hover:shadow-lg transition-all"
          >
            <span>Find Your Perfect Tutor Today</span>
            <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default HowItWorksSection;
