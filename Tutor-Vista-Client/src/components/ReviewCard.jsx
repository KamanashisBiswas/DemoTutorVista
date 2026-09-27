import React from "react";
import avatar from "../assets/Review/avarar.jpg";

const ReviewCard = ({ review, activeCategory }) => {
  const handleImageError = (e) => {
    e.target.onerror = null;
    e.target.src = avatar;
  };

  return (
    <div className="flex-shrink-0 w-72 sm:w-80 lg:w-96 h-64 sm:h-72 lg:h-80 mx-3 sm:mx-4 bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 p-4 sm:p-6 border border-gray-100 group hover:-translate-y-1 flex flex-col">
      {/* Header with Image and Info */}
      <div className="flex items-center mb-3 sm:mb-4 flex-shrink-0">
        <div className="relative">
          <img
            src={review.image || avatar}
            onError={handleImageError}
            alt={review.name}
            className="w-12 h-12 sm:w-16 sm:h-16 rounded-full object-cover ring-2 sm:ring-4 ring-blue-100 group-hover:ring-blue-200 transition-all duration-300 bg-gray-200"
          />
          <div
            className={`absolute -bottom-1 -right-1 ${
              activeCategory === "guardian" ? "bg-blue-500" : "bg-green-500"
            } text-white text-xs px-1.5 sm:px-2 py-0.5 sm:py-1 rounded-full font-semibold whitespace-nowrap`}
          >
            {review.relationship}
          </div>
        </div>
        <div className="ml-3 sm:ml-4 flex-1 min-w-0">
          <h3 className="font-bold text-gray-900 text-sm sm:text-base lg:text-lg mb-1 truncate">
            {review.name}
          </h3>
          <div className="flex items-center text-gray-600 text-xs sm:text-sm mb-1 sm:mb-2">
            <svg
              className={`w-3 h-3 sm:w-4 sm:h-4 mr-1 flex-shrink-0 ${
                activeCategory === "guardian"
                  ? "text-blue-500"
                  : "text-green-500"
              }`}
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fillRule="evenodd"
                d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z"
                clipRule="evenodd"
              />
            </svg>
            <span className="truncate">{review.address}</span>
          </div>
          {/* Star Rating */}
          <div className="flex items-center">
            {[...Array(5)].map((_, i) => (
              <svg
                key={i}
                className={`w-3 h-3 sm:w-4 sm:h-4 ${
                  i < review.rating ? "text-yellow-400" : "text-gray-300"
                }`}
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
            ))}
          </div>
        </div>
      </div>

      {/* Review Text - Expandable */}
      <div className="relative flex-1 flex flex-col">
        <div className="flex-1 relative">
          <svg
            className={`absolute top-0 left-1 w-4 h-4 sm:w-6 sm:h-6 lg:w-8 lg:h-8 ${
              activeCategory === "guardian" ? "text-blue-100" : "text-green-100"
            } flex-shrink-0`}
            fill="currentColor"
            viewBox="0 0 24 24"
          >
            <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h4v10h-10z" />
          </svg>

          <div className="pl-6 sm:pl-8 lg:pl-10 pr-6 sm:pr-8 lg:pr-10 h-full flex items-center">
            <p className="text-gray-700 italic leading-relaxed text-xs sm:text-sm lg:text-base overflow-hidden text-ellipsis">
              {review.review.length > 150
                ? review.review.substring(0, 150) + "..."
                : review.review}
            </p>
          </div>

          <svg
            className={`absolute bottom-0 right-1 w-4 h-4 sm:w-6 sm:h-6 lg:w-8 lg:h-8 ${
              activeCategory === "guardian" ? "text-blue-100" : "text-green-100"
            } transform rotate-180 flex-shrink-0`}
            fill="currentColor"
            viewBox="0 0 24 24"
          >
            <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h4v10h-10z" />
          </svg>
        </div>

        {/* Decorative bottom accent */}
        <div
          className={`mt-2 sm:mt-3 h-1 ${
            activeCategory === "guardian"
              ? "bg-gradient-to-r from-blue-500 to-purple-500"
              : "bg-gradient-to-r from-green-500 to-teal-500"
          } rounded-full transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 flex-shrink-0`}
        ></div>
      </div>
    </div>
  );
};

export default ReviewCard;
