import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const PromoCampaignBanner = () => {
  // Target deadline: 5 days, 14 hours, 32 minutes from now, ticking every second
  const [timeLeft, setTimeLeft] = useState({
    days: "05",
    hours: "14",
    mins: "32",
    secs: "45",
  });

  useEffect(() => {
    // Set target date to 5 days, 14 hours from when component mounts
    const targetDate = new Date();
    targetDate.setDate(targetDate.getDate() + 5);
    targetDate.setHours(targetDate.getHours() + 14);
    targetDate.setMinutes(targetDate.getMinutes() + 32);

    const updateCountdown = () => {
      const now = new Date().getTime();
      const distance = targetDate.getTime() - now;

      if (distance <= 0) {
        setTimeLeft({ days: "00", hours: "00", mins: "00", secs: "00" });
        return;
      }

      const d = Math.floor(distance / (1000 * 60 * 60 * 24));
      const h = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const m = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      const s = Math.floor((distance % (1000 * 60)) / 1000);

      setTimeLeft({
        days: String(d).padStart(2, "0"),
        hours: String(h).padStart(2, "0"),
        mins: String(m).padStart(2, "0"),
        secs: String(s).padStart(2, "0"),
      });
    };

    updateCountdown();
    const interval = setInterval(updateCountdown, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section
      id="promo-campaign-banner"
      className="w-full py-10 lg:py-14 bg-surface relative overflow-hidden"
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-12">
        <div className="relative rounded-3xl overflow-hidden bg-gradient-to-r from-[#1e1b4b] via-primary-container to-[#1e1b4b] text-white shadow-2xl p-6 sm:p-8 lg:p-12 border border-indigo-400/30">
          {/* Ambient luminous background glows */}
          <div className="absolute -top-24 -right-24 w-96 h-96 rounded-full bg-secondary-container/20 blur-3xl pointer-events-none -z-10" />
          <div className="absolute -bottom-24 -left-24 w-96 h-96 rounded-full bg-primary-fixed-dim/20 blur-3xl pointer-events-none -z-10" />

          <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-8 lg:gap-10">
            {/* Left Column: Pitch & Badges */}
            <div className="flex-1 max-w-2xl space-y-4 sm:space-y-5 text-left">
              {/* Campaign Pill Badge */}
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-indigo-500/20 text-indigo-200 border border-indigo-400/30 text-xs font-semibold shadow-sm">
                <span className="flex h-2 w-2 relative">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-300 opacity-75" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-amber-300" />
                </span>
                <span className="text-amber-300 font-bold uppercase tracking-wider text-[11px]">
                  🔥 Limited Time Academic Offer
                </span>
                <span className="text-indigo-300">•</span>
                <span className="text-white font-medium text-[11px]">
                  New Term 2026
                </span>
              </div>

              {/* Main Offer Headline */}
              <h2 className="font-display-hero text-2xl sm:text-3xl lg:text-[40px] font-extrabold tracking-tight text-white leading-tight">
                Get Up to{" "}
                <span className="bg-gradient-to-r from-secondary-container to-secondary-fixed bg-clip-text text-transparent underline decoration-secondary-container decoration-4 underline-offset-8">
                  30% Off
                </span>{" "}
                On First Month + 1 Free Demo Class!
              </h2>

              <p className="text-indigo-100 text-body-md text-sm lg:text-[15px] leading-relaxed">
                Connect with verified top-tier tutors from BUET, DU, and Medical
                college. Book before March 31st to secure zero platform matching
                fees and a personalized diagnostic learning plan.
              </p>

              {/* Feature Highlights Pills */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
                <div className="flex items-center gap-2.5 p-3 rounded-xl bg-white/10 backdrop-blur-md border border-white/10">
                  <div className="w-8 h-8 rounded-lg bg-amber-300/20 text-amber-300 flex items-center justify-center shrink-0">
                    <span className="material-symbols-outlined text-[18px]">
                      bolt
                    </span>
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-white">
                      Instant Matching
                    </h4>
                    <p className="text-[11px] text-indigo-200">
                      Top 3 in &lt; 24 hours
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2.5 p-3 rounded-xl bg-white/10 backdrop-blur-md border border-white/10">
                  <div className="w-8 h-8 rounded-lg bg-secondary-container/20 text-secondary-container flex items-center justify-center shrink-0">
                    <span className="material-symbols-outlined text-[18px]">
                      verified_user
                    </span>
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-white">
                      100% Satisfaction
                    </h4>
                    <p className="text-[11px] text-indigo-200">
                      Free replacement
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2.5 p-3 rounded-xl bg-white/10 backdrop-blur-md border border-white/10">
                  <div className="w-8 h-8 rounded-lg bg-primary-fixed/20 text-primary-fixed flex items-center justify-center shrink-0">
                    <span className="material-symbols-outlined text-[18px]">
                      card_giftcard
                    </span>
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-white">
                      Free Diagnostic
                    </h4>
                    <p className="text-[11px] text-indigo-200">
                      Assessment test
                    </p>
                  </div>
                </div>
              </div>

              {/* Trust Proof Footer */}
              <div className="flex flex-wrap items-center gap-y-2 gap-x-4 pt-2 text-[12px] text-indigo-200">
                <span className="flex items-center gap-1.5">
                  <span
                    className="material-symbols-outlined text-secondary-container text-[16px]"
                    style={{ fontVariationSettings: "'FILL' 1" }}
                  >
                    check_circle
                  </span>
                  No credit card required upfront
                </span>
                <span className="flex items-center gap-1.5">
                  <span
                    className="material-symbols-outlined text-secondary-container text-[16px]"
                    style={{ fontVariationSettings: "'FILL' 1" }}
                  >
                    check_circle
                  </span>
                  Varsity &amp; NID background verified
                </span>
                <span className="flex items-center gap-1.5">
                  <span
                    className="material-symbols-outlined text-secondary-container text-[16px]"
                    style={{ fontVariationSettings: "'FILL' 1" }}
                  >
                    check_circle
                  </span>
                  15,000+ happy guardians
                </span>
              </div>
            </div>

            {/* Right Column: Interactive Countdown Box & Action Card */}
            <div className="w-full lg:w-auto shrink-0 flex flex-col items-center bg-white/10 backdrop-blur-md p-6 lg:p-8 rounded-2xl border border-white/15 shadow-xl max-w-md">
              <span className="text-xs uppercase tracking-widest text-indigo-200 font-bold mb-3 flex items-center gap-1.5">
                <span className="material-symbols-outlined text-[16px] text-amber-300">
                  timer
                </span>
                Offer Ends Strictly In:
              </span>

              {/* Countdown Boxes */}
              <div className="grid grid-cols-4 gap-2 sm:gap-2.5 w-full text-center mb-6">
                <div className="bg-[#1e1b4b]/80 border border-indigo-400/30 rounded-xl p-2 sm:p-2.5 flex flex-col items-center shadow-inner">
                  <span className="font-headline-md text-2xl lg:text-[28px] font-extrabold text-white">
                    {timeLeft.days}
                  </span>
                  <span className="text-[10px] uppercase font-bold text-indigo-200 mt-0.5">
                    Days
                  </span>
                </div>
                <div className="bg-[#1e1b4b]/80 border border-indigo-400/30 rounded-xl p-2 sm:p-2.5 flex flex-col items-center shadow-inner">
                  <span className="font-headline-md text-2xl lg:text-[28px] font-extrabold text-white">
                    {timeLeft.hours}
                  </span>
                  <span className="text-[10px] uppercase font-bold text-indigo-200 mt-0.5">
                    Hours
                  </span>
                </div>
                <div className="bg-[#1e1b4b]/80 border border-indigo-400/30 rounded-xl p-2 sm:p-2.5 flex flex-col items-center shadow-inner">
                  <span className="font-headline-md text-2xl lg:text-[28px] font-extrabold text-white">
                    {timeLeft.mins}
                  </span>
                  <span className="text-[10px] uppercase font-bold text-indigo-200 mt-0.5">
                    Mins
                  </span>
                </div>
                <div className="bg-[#1e1b4b]/80 border border-indigo-400/30 rounded-xl p-2 sm:p-2.5 flex flex-col items-center shadow-inner">
                  <span className="font-headline-md text-2xl lg:text-[28px] font-extrabold text-emerald-300 animate-pulse">
                    {timeLeft.secs}
                  </span>
                  <span className="text-[10px] uppercase font-bold text-indigo-200 mt-0.5">
                    Secs
                  </span>
                </div>
              </div>

              {/* CTA Action Buttons */}
              <div className="w-full space-y-2.5">
                <Link
                  to="/request-tutor"
                  className="w-full py-3.5 px-6 rounded-xl bg-white hover:bg-slate-100 text-[#1e1b4b] font-headline-sm text-[15px] font-extrabold shadow-lg hover:shadow-xl transition-all flex items-center justify-center gap-2 group text-center cursor-pointer hover:scale-[1.01]"
                >
                  <span>Claim Offer &amp; Request Tutor</span>
                  <span className="material-symbols-outlined text-[18px] group-hover:translate-x-1 transition-transform">
                    arrow_forward
                  </span>
                </Link>
                <div className="flex items-center gap-2 w-full">
                  <a
                    href="tel:+8809612888777"
                    className="flex-1 py-2.5 px-3 rounded-lg bg-indigo-500/20 hover:bg-indigo-500/30 border border-indigo-300/30 text-indigo-100 hover:text-white text-xs font-semibold transition-colors flex items-center justify-center gap-1.5"
                  >
                    <span className="material-symbols-outlined text-[15px]">
                      call
                    </span>
                    <span>+880 9612 888 777</span>
                  </a>
                  <Link
                    to="/tutors"
                    className="flex-1 py-2.5 px-3 rounded-lg bg-indigo-500/20 hover:bg-indigo-500/30 border border-indigo-300/30 text-indigo-100 hover:text-white text-xs font-semibold transition-colors flex items-center justify-center gap-1.5 text-center"
                  >
                    <span className="material-symbols-outlined text-[15px]">
                      search
                    </span>
                    <span>Eligible Tutors</span>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PromoCampaignBanner;
