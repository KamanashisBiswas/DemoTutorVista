import React from "react";
import { Video, ChevronRight } from "lucide-react";
import ApplyTutorImg from "../../assets/ApplyTutor/ApplyTutor1.png";
import CommonSectionHeading from "../Common/CommonSectionHeading";

const ApplicationHeader = ({ showVideo, setShowVideo }) => {
  return (
    <div className="text-center mb-8 sm:mb-12 animate-fade-in-down">
      <div className="flex justify-center mb-6 md:w-[400px] mx-auto">
        <img src={ApplyTutorImg} alt="Request Tutor Image" />
      </div>
      <CommonSectionHeading title="Start Your Tutoring" highlight="Career" />
      <p className="text-gray-600 text-sm sm:text-base lg:text-lg max-w-2xl mx-auto leading-relaxed">
        Fill out this form to apply as a tutor and start receiving tuition job
        offers in your preferred location.
      </p>

      {/* Video Guide Section pore UnComment korte hobe */}
      {/* <div className="mt-6 max-w-4xl mx-auto">
        <button
          onClick={() => setShowVideo(!showVideo)}
          className="flex items-center justify-between w-full bg-gradient-to-r from-blue-600 to-blue-700 text-white px-6 py-3 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 group"
        >
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-white bg-opacity-20 rounded-full flex items-center justify-center">
              <Video className="w-5 h-5 text-white" />
            </div>
            <span className="font-semibold text-lg">
              Watch our application guide video
            </span>
          </div>
          <ChevronRight
            className={`w-5 h-5 transform transition-transform duration-300 ${
              showVideo ? "rotate-90" : ""
            }`}
          />
        </button>

        {showVideo && (
          <div className="mt-4 bg-white rounded-xl shadow-lg p-3 animate-fade-in overflow-hidden">
            <div className="relative aspect-video w-full rounded-lg overflow-hidden group">
              <iframe
                width="100%"
                height="100%"
                src="https://www.youtube.com/embed/5g9yo7W39zU?autoplay=1&loop=1&playlist=5g9yo7W39zU&controls=1&modestbranding=1&rel=0&showinfo=0&fs=1&disablekb=1&iv_load_policy=3"
                title="Application Guide Video"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
                className="rounded-lg"
              ></iframe>
            </div>
            <div className="text-center mt-3">
              <h3 className="text-lg font-semibold text-gray-800">
                Complete Application Guide
              </h3>
              <p className="text-sm text-gray-600">
                Watch this video to understand how to fill out the form
                correctly.
              </p>
            </div>
          </div>
        )}
      </div> */}
    </div>
  );
};

export default ApplicationHeader;
