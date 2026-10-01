import React, { useState, useEffect } from "react";
import Banner from "../components/Home/Banner";
import StatisticsSection from "../components/Home/StatisticsSection";
import PopularCategoriesSection from "../components/Home/PopularCategoriesSection";
import HowItWorksSection from "../components/Home/HowItWorksSection";
import WhyTutorVistaSection from "../components/Home/WhyTutorVistaSection";
import TuitionTypeSection from "../components/Home/TuitionTypeSection";
import PromoCampaignBanner from "../components/Home/PromoCampaignBanner";
import LatestTuitionJobsSection from "../components/Home/LatestTuitionJobsSection";
import FeaturedTutorsSection from "../components/Home/FeaturedTutorsSection";
import GuardianReviews from "../components/Home/GuardianReviews";
import FAQComponent from "../components/Home/FAQComponent";
import BottomCTASection from "../components/Home/BottomCTASection";
import LandingPopup from "../components/LandingPopup";

const HomePage = () => {
  const [showPopup, setShowPopup] = useState(false);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const dismissedDate = localStorage.getItem("tutorbridge_popup_dismissed_date");
    const isDismissedToday = dismissedDate === new Date().toDateString();
    const hasSeenPopup =
      isDismissedToday ||
      sessionStorage.getItem("hasSeenPopup") ||
      params.get("nopopup") === "1";
    window.scrollTo(0, 0);

    if (!hasSeenPopup) {
      setShowPopup(true);
      sessionStorage.setItem("hasSeenPopup", "true");
    }
  }, []);

  return (
    <div className="flex flex-col w-full bg-surface font-body-md text-on-surface antialiased">
      <LandingPopup
        isOpen={showPopup}
        onClose={() => setShowPopup(false)}
      />

      {/* 1. Hero Section: Left Value Proposition & Matching Search Engine, Right Top 1% Tutor & Social Proof */}
      <Banner />

      {/* 2. Impact Metrics / Social Proof Strip */}
      <StatisticsSection />

      {/* 3. Popular Tuition Categories (5 items) */}
      <PopularCategoriesSection />

      {/* 4. How It Works (3-Step Effortless Matching Process) */}
      <HowItWorksSection />

      {/* 5. Why Choose TutorBridge (Rich Visual Card Showcase with Overlays + Structured Credibility Pillars) */}
      <WhyTutorVistaSection />

      {/* 6. Tuition Modes (Side-by-Side Comparison Cards) */}
      <TuitionTypeSection />

      {/* 6.5 Promotional Campaign Banner (Live Countdown & Seasonal Offer) */}
      <PromoCampaignBanner />

      {/* 7. Live Tuition Jobs Feed (4 Cards) */}
      <LatestTuitionJobsSection />

      {/* 8. Featured Top-Rated Tutors (Showcase Grid - 4 Cards) */}
      <FeaturedTutorsSection />

      {/* 9. Reviews & Guardian Testimonials (3 Cards) */}
      <GuardianReviews />

      {/* 10. Frequently Asked Questions (Accordion - 6 Items) */}
      <FAQComponent />

      {/* 11. High-Conversion Dual-Action Bottom CTA Banner */}
      <BottomCTASection />
    </div>
  );
};

export default HomePage;
