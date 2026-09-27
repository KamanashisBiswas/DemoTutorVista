import React from "react";
import ReqTutor from "../../assets/RequestTutor/RequestTutor1.png";
import CommonSectionHeading from "../Common/CommonSectionHeading";

const RequestTutorHeader = () => {
  return (
    <div className="text-center mb-8 sm:mb-12 animate-fade-in-down">
      <div className="flex justify-center mb-6 md:w-[400px] mx-auto">
        <img src={ReqTutor} alt="Request Tutor Image" />
      </div>
      <CommonSectionHeading
        title="Are You Looking for an Expert"
        highlight="Tutor"
      />
      <p className="text-lg text-gray-600 max-w-2xl mx-auto">
        Please fill out the form to let us know your requirements. A
        representative will contact you within 24 hours.
      </p>
    </div>
  );
};

export default RequestTutorHeader;
