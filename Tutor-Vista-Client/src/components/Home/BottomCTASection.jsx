import React from "react";
import { Link } from "react-router-dom";

const BottomCTASection = () => {
  return (
    <section className="w-full py-16 lg:py-20 bg-surface">
      <div className="container mx-auto px-4 sm:px-6 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* CTA 1: For Parents */}
          <div className="rounded-3xl p-8 sm:p-10 bg-primary-container text-on-primary flex flex-col justify-between relative overflow-hidden shadow-xl">
            <div className="absolute -right-12 -bottom-12 w-64 h-64 bg-on-primary-container/10 rounded-full blur-2xl pointer-events-none"></div>
            <div className="relative z-10">
              <span className="px-3 py-1 rounded-full bg-on-primary/10 text-on-primary font-label-sm text-label-sm font-semibold inline-block mb-4">
                For Parents &amp; Students
              </span>
              <h3 className="font-headline-lg text-headline-lg font-bold leading-tight mb-3">
                Need a Qualified Tutor for Your Child Today?
              </h3>
              <p className="font-body-md text-body-md text-on-primary/90 leading-relaxed mb-8 max-w-md">
                Post your requirements in under 2 minutes. Receive verified tutor profiles and schedule a free trial class within 24 hours.
              </p>
            </div>
            <div className="relative z-10">
              <Link
                to="/request-tutor"
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-surface-container-lowest text-primary-container font-headline-sm text-headline-sm text-[15px] font-bold shadow-md hover:bg-surface-container transition-all"
              >
                <span>Post Tuition Requirement (Free)</span>
                <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
              </Link>
            </div>
          </div>

          {/* CTA 2: For Tutors */}
          <div className="rounded-3xl p-8 sm:p-10 bg-surface-container-high text-on-surface flex flex-col justify-between relative overflow-hidden shadow-xl border border-outline-variant/20">
            <div className="absolute -right-12 -bottom-12 w-64 h-64 bg-secondary-container/20 rounded-full blur-2xl pointer-events-none"></div>
            <div className="relative z-10">
              <span className="px-3 py-1 rounded-full bg-secondary-container text-on-secondary-container font-label-sm text-label-sm font-semibold inline-block mb-4">
                For Aspiring Tutors
              </span>
              <h3 className="font-headline-lg text-headline-lg font-bold leading-tight mb-3">
                Are You an Ambitious Educator or University Student?
              </h3>
              <p className="font-body-md text-body-md text-on-surface-variant leading-relaxed mb-8 max-w-md">
                Earn handsome remuneration, gain teaching credentials, and tutor on your own schedule across Dhaka and beyond.
              </p>
            </div>
            <div className="relative z-10">
              <Link
                to="/apply-tutor"
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-secondary text-on-secondary font-headline-sm text-headline-sm text-[15px] font-bold shadow-md hover:bg-on-secondary-container transition-all"
              >
                <span>Apply to Join as a Tutor</span>
                <span className="material-symbols-outlined text-[18px]">badge</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BottomCTASection;
