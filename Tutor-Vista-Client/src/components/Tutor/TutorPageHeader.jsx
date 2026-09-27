import React from "react";
import CommonSectionHeading from "../Common/CommonSectionHeading";

const TutorPageHeader = ({ totalTutors = 0 }) => {
  return (
    <div className="text-center pt-8 pb-4">
      <CommonSectionHeading
        badge="ALL INSTRUCTORS"
        title="Browse Verified"
        highlight="Tutors"
        subtitle={`Discover ${totalTutors ? totalTutors.toLocaleString() + "+" : "5,000+"} qualified, background-checked home and online tutors across all divisions.`}
      />
    </div>
  );
};

export default TutorPageHeader;
