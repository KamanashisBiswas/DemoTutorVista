import React from "react";
import avatar from "../assets/Review/avarar.jpg";
import { Star, MapPin, Quote } from "lucide-react";
import { Card } from "./ui/Card";

const ReviewCard = ({ review, activeCategory }) => {
  const handleImageError = (e) => {
    e.target.onerror = null;
    e.target.src = avatar;
  };

  return (
    <div className="shrink-0 w-80 sm:w-96 mx-3 my-2">
      <Card
        hoverable
        className="bg-white border-[#E4E6EE] p-5 h-64 flex flex-col justify-between"
      >
        {/* Header */}
        <div>
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-3">
              <div className="relative">
                <img
                  src={review.image || avatar}
                  onError={handleImageError}
                  alt={review.name}
                  className="w-12 h-12 rounded-full object-cover border-2 border-[#3730E0]/20 bg-[#F7F8FB]"
                />
              </div>
              <div>
                <h4 className="text-sm font-bold text-[#1A1D29] tracking-tight">
                  {review.name}
                </h4>
                <div className="flex items-center gap-1 text-[11px] text-[#5B5F73]">
                  <MapPin className="w-3 h-3 text-[#0EA5A0] shrink-0" />
                  <span>{review.address}</span>
                </div>
              </div>
            </div>

            <span
              className={`px-2 py-0.5 rounded-full text-[11px] font-semibold ${
                activeCategory === "guardian"
                  ? "bg-[#EEEDFD] text-[#3730E0] border border-[#DDD9FC]"
                  : "bg-[#F0FDFA] text-[#0EA5A0] border border-[#CCFBF1]"
              }`}
            >
              {review.relationship || (activeCategory === "guardian" ? "Guardian" : "Tutor")}
            </span>
          </div>

          {/* Star Rating */}
          <div className="flex items-center gap-1 mb-2">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className={`w-3.5 h-3.5 ${
                  i < review.rating
                    ? "fill-[#F5A524] text-[#F5A524]"
                    : "text-[#E4E6EE]"
                }`}
              />
            ))}
          </div>

          {/* Review Quote */}
          <p className="text-xs sm:text-sm text-[#5B5F73] leading-relaxed italic line-clamp-4">
            "{review.review}"
          </p>
        </div>

        <div className="pt-2 border-t border-[#E4E6EE]/60 flex items-center justify-between text-[11px] text-[#0EA5A0] font-medium">
          <span>Verified Review</span>
          <Quote className="w-3.5 h-3.5 text-[#3730E0]/40" />
        </div>
      </Card>
    </div>
  );
};

export default ReviewCard;
