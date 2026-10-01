import React from "react";
import whyStudyImg from "../../assets/Home/stitch/why-study.jpg";

const WhyTutorVistaSection = () => {
  return (
    <section className="w-full py-10 lg:py-14 bg-surface border-b border-outline-variant/10">
      <div className="container mx-auto px-4 sm:px-6 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-center">
          
          {/* Left: Rich Visual Card Showcase with Overlays */}
          <div className="lg:col-span-6 relative">
            <div className="relative rounded-3xl overflow-hidden shadow-2xl">
              <img
                src={whyStudyImg}
                alt="Student studying with dedicated tutor"
                className="w-full h-[420px] sm:h-[460px] object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-on-surface/85 via-on-surface/20 to-transparent" />
              <div className="absolute bottom-6 left-6 right-6 text-on-primary">
                <span className="px-3 py-1 rounded-full bg-secondary text-on-secondary font-label-sm text-label-sm font-bold inline-block mb-2">
                  Monitored Safety
                </span>
                <p className="font-headline-sm text-headline-sm font-bold text-white">
                  Guaranteed Safety &amp; Quality Education at Home
                </p>
                <p className="font-body-sm text-body-sm text-white/90 mt-1">
                  Every session is backed by our guardian monitoring and weekly reporting system.
                </p>
              </div>
            </div>

            {/* Floating Stat Badge 1 */}
            <div className="absolute -top-4 -right-4 bg-surface-container-lowest p-3.5 sm:p-4 rounded-2xl shadow-xl flex items-center gap-3 border border-outline-variant/20 hidden sm:flex z-10">
              <div className="w-10 h-10 rounded-xl bg-secondary-container text-on-secondary-container flex items-center justify-center">
                <span className="material-symbols-outlined text-[20px]">trending_up</span>
              </div>
              <div>
                <p className="font-headline-sm text-headline-sm text-on-surface font-extrabold text-[15px]">
                  98% Grade Uplift
                </p>
                <p className="font-body-sm text-body-sm text-on-surface-variant text-[11px]">
                  Across SSC &amp; HSC Batches
                </p>
              </div>
            </div>

            {/* Floating Stat Badge 2 */}
            <div className="absolute top-1/2 -left-4 bg-surface-container-lowest p-3.5 sm:p-4 rounded-2xl shadow-xl flex items-center gap-3 border border-outline-variant/20 hidden sm:flex z-10">
              <div className="w-10 h-10 rounded-xl bg-surface-container text-primary-container flex items-center justify-center">
                <span className="material-symbols-outlined text-[20px]">assignment_turned_in</span>
              </div>
              <div>
                <p className="font-headline-sm text-headline-sm text-on-surface font-extrabold text-[15px]">
                  Weekly Reports
                </p>
                <p className="font-body-sm text-body-sm text-on-surface-variant text-[11px]">
                  Direct to Guardian WhatsApp
                </p>
              </div>
            </div>
          </div>

          {/* Right: Structured Credibility Pillars */}
          <div className="lg:col-span-6 flex flex-col space-y-5">
            <div>
              <span className="px-3 py-1 rounded-full bg-surface-container-highest text-primary-container font-label-sm text-label-sm font-bold uppercase tracking-wider inline-block mb-2">
                Why Parents Trust Us
              </span>
              <h2 className="font-headline-lg text-headline-lg text-on-surface font-bold tracking-tight">
                Connecting Ambitious Students with Bangladesh's Most Trusted Educators
              </h2>
              <p className="font-body-md text-body-md text-on-surface-variant mt-2 leading-relaxed">
                We eliminate the frustration and uncertainty of informal tuition agencies. Our
                institutional standards ensure your child learns safely with verified subject champions.
              </p>
            </div>

            <div className="space-y-3 pt-1">
              {/* Pillar 1 */}
              <div className="flex items-start gap-3.5 p-3.5 sm:p-4 rounded-xl bg-surface-container-low hover:bg-surface-container transition-colors">
                <div className="w-10 h-10 rounded-lg bg-surface-container-highest text-primary-container flex items-center justify-center shrink-0">
                  <span className="material-symbols-outlined text-[22px]">badge</span>
                </div>
                <div>
                  <h4 className="font-headline-sm text-headline-sm text-on-surface font-bold text-[15px]">
                    Strict 4-Step Verification
                  </h4>
                  <p className="font-body-sm text-body-sm text-on-surface-variant mt-1 leading-relaxed">
                    National ID (NID) check, active varsity registration verify, academic certificates check, and address verification for every single tutor.
                  </p>
                </div>
              </div>

              {/* Pillar 2 */}
              <div className="flex items-start gap-3.5 p-3.5 sm:p-4 rounded-xl bg-surface-container-low hover:bg-surface-container transition-colors">
                <div className="w-10 h-10 rounded-lg bg-secondary-container text-on-secondary-container flex items-center justify-center shrink-0">
                  <span className="material-symbols-outlined text-[22px]">shield</span>
                </div>
                <div>
                  <h4 className="font-headline-sm text-headline-sm text-on-surface font-bold text-[15px]">
                    Safe &amp; Transparent Process
                  </h4>
                  <p className="font-body-sm text-body-sm text-on-surface-variant mt-1 leading-relaxed">
                    Direct parent-tutor agreements, escrow payment security, and zero commission or placement charges taken from parents.
                  </p>
                </div>
              </div>

              {/* Pillar 3 */}
              <div className="flex items-start gap-3.5 p-3.5 sm:p-4 rounded-xl bg-surface-container-low hover:bg-surface-container transition-colors">
                <div className="w-10 h-10 rounded-lg bg-surface-container-highest text-primary-container flex items-center justify-center shrink-0">
                  <span className="material-symbols-outlined text-[22px]">devices</span>
                </div>
                <div>
                  <h4 className="font-headline-sm text-headline-sm text-on-surface font-bold text-[15px]">
                    Flexible Tuition Modes
                  </h4>
                  <p className="font-body-sm text-body-sm text-on-surface-variant mt-1 leading-relaxed">
                    Choose in-home one-to-one tutoring, high-definition online classes with whiteboard collaboration, or small personalized peer batches.
                  </p>
                </div>
              </div>

              {/* Pillar 4 */}
              <div className="flex items-start gap-3.5 p-3.5 sm:p-4 rounded-xl bg-surface-container-low hover:bg-surface-container transition-colors">
                <div className="w-10 h-10 rounded-lg bg-surface-container text-secondary flex items-center justify-center shrink-0">
                  <span className="material-symbols-outlined text-[22px]">swap_horiz</span>
                </div>
                <div>
                  <h4 className="font-headline-sm text-headline-sm text-on-surface font-bold text-[15px]">
                    Dedicated Coordinator &amp; 24hr Replacement
                  </h4>
                  <p className="font-body-sm text-body-sm text-on-surface-variant mt-1 leading-relaxed">
                    Unhappy with teaching style or schedule adjustments? Get a qualified replacement within 24 hours at no extra fee.
                  </p>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default WhyTutorVistaSection;
