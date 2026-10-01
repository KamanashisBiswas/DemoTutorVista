import React from "react";

const StatisticsSection = () => {
  return (
    <section className="w-full bg-surface-container-lowest py-8 shadow-[0_1px_6px_rgba(0,0,0,0.03)] border-b border-outline-variant/20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center divide-x-0 md:divide-x divide-outline-variant/20">
          
          <div className="flex flex-col items-center p-2">
            <div className="flex items-center gap-1.5 text-primary-container">
              <span className="material-symbols-outlined text-[24px]">verified</span>
              <span className="font-headline-lg text-headline-lg font-extrabold text-on-surface">
                10,000+
              </span>
            </div>
            <p className="font-label-lg text-label-lg text-on-surface-variant mt-1">
              Verified Tutors
            </p>
            <span className="font-body-sm text-body-sm text-secondary font-medium text-[11px]">
              Strict ID &amp; Varsity Audited
            </span>
          </div>

          <div className="flex flex-col items-center p-2">
            <div className="flex items-center gap-1.5 text-secondary">
              <span className="material-symbols-outlined text-[24px]">school</span>
              <span className="font-headline-lg text-headline-lg font-extrabold text-on-surface">
                25,000+
              </span>
            </div>
            <p className="font-label-lg text-label-lg text-on-surface-variant mt-1">
              Successful Tuitions
            </p>
            <span className="font-body-sm text-body-sm text-secondary font-medium text-[11px]">
              98.6% Guardian Rating
            </span>
          </div>

          <div className="flex flex-col items-center p-2">
            <div className="flex items-center gap-1.5 text-tertiary-container">
              <span className="material-symbols-outlined text-[24px]">map</span>
              <span className="font-headline-lg text-headline-lg font-extrabold text-on-surface">
                64
              </span>
            </div>
            <p className="font-label-lg text-label-lg text-on-surface-variant mt-1">
              Districts Covered
            </p>
            <span className="font-body-sm text-body-sm text-on-surface-variant font-medium text-[11px]">
              In-Home &amp; Nationwide Online
            </span>
          </div>

          <div className="flex flex-col items-center p-2">
            <div className="flex items-center gap-1.5 text-primary">
              <span className="material-symbols-outlined text-[24px]">grade</span>
              <span className="font-headline-lg text-headline-lg font-extrabold text-on-surface">
                99.4%
              </span>
            </div>
            <p className="font-label-lg text-label-lg text-on-surface-variant mt-1">
              Satisfaction Rate
            </p>
            <span className="font-body-sm text-body-sm text-secondary font-medium text-[11px]">
              Free Replacement Guarantee
            </span>
          </div>

        </div>
      </div>
    </section>
  );
};

export default StatisticsSection;
