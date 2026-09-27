import React, { useState, useEffect } from "react";
import Banner from "../components/Home/Banner";
import TutorCategoryCards from "../components/Home/TutorCategoryCards";
import HomeContact from "../components/Home/HomeContact";
import TuitionTypeSection from "../components/Home/TuitionTypeSection ";
import FAQComponent from "../components/Home/FAQComponent";
// import AvailableTuitionSection from "../components/Home/AvailableTuitionSection";
import StatisticsSection from "../components/Home/StatisticsSection";
import AvailableTutorsSection from "../components/Home/AvailableTutorsSection";
import GuardianReviews from "../components/Home/GuardianReviews";
import LandingPopup from "../components/LandingPopup";
import popupImage from "../assets/Popup/landing.png";
import RequestTutorSection from "../components/Home/RequestTutorSection";
import TutorCategoryCardsDuplicate from "../components/Home/TutorCategoryCardsDuplicate";
import AvailableTuitionSection from "../components/Home/AvailableTuitionSection";

const HomePage = () => {
  const [showPopup, setShowPopup] = useState(false);
  useEffect(() => {
    const hasSeenPopup = sessionStorage.getItem("hasSeenPopup");

    window.scrollTo(0, 0);

    if (!hasSeenPopup) {
      setShowPopup(true);
      sessionStorage.setItem("hasSeenPopup", "true");
    }
  }, []);

  return (
    <div>
      <LandingPopup
        isOpen={showPopup}
        onClose={() => setShowPopup(false)}
        imageSrc={popupImage}
      />
      <Banner />
      {/* <TutorCategoryCards /> */}
      <TutorCategoryCardsDuplicate />
      <HomeContact />
      <TuitionTypeSection />
      <RequestTutorSection />
      <AvailableTutorsSection />
      <StatisticsSection />
      {/* <AvailableTuitionSection /> */}
      <GuardianReviews />
      <FAQComponent />
    </div>
  );
};

export default HomePage;
