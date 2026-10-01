import React from "react";
import reviewMahmuda from "../../assets/Home/stitch/review-mahmuda.jpg";
import reviewTanvir from "../../assets/Home/stitch/review-tanvir.jpg";
import reviewSayedul from "../../assets/Home/stitch/review-sayedul.jpg";

const reviews = [
  {
    id: 1,
    quote:
      '"Finding a reliable Physics tutor for my daughter in Dhanmondi was always stressful. TutorBridge matched us with a BUET tutor within 6 hours. Her confidence improved drastically and she scored GPA-5 in her SSC board exam!"',
    name: "Mahmuda Akhter",
    role: "Mother of SSC Candidate • Dhanmondi",
    image: reviewMahmuda,
    alt: "Portrait of a smiling Bangladeshi mother in elegant saree standing in cozy home living room",
  },
  {
    id: 2,
    quote:
      '"As an English Medium student taking Cambridge O-Levels, generic tutors never understood the syllabus pacing. My TutorBridge mentor simplified complex mechanics and past papers. The online whiteboard recordings are a lifesaver."',
    name: "Tanvir Rahman",
    role: "O-Level Student • Uttara, Dhaka",
    image: reviewTanvir,
    alt: "Portrait of an energetic teenage South Asian boy student in school uniform smiling confidently outdoors",
  },
  {
    id: 3,
    quote:
      '"The 4-step background check and NID verification gave our family complete peace of mind. We have two daughters and safety is our first priority. TutorBridge is by far the most professional tuition platform in Bangladesh."',
    name: "Engr. Sayedul Islam",
    role: "Guardian of 2 • GEC, Chattogram",
    image: reviewSayedul,
    alt: "Portrait of a dignified middle aged Bangladeshi professional engineer wearing glasses and formal shirt in modern office",
  },
];

const GuardianReviews = () => {
  return (
    <section className="w-full py-16 lg:py-20 bg-surface">
      <div className="container mx-auto px-4 sm:px-6 lg:px-12">
        <div className="text-center max-w-2xl mx-auto mb-14 lg:mb-16 space-y-3">
          <span className="px-3.5 py-1 rounded-full bg-secondary-container text-on-secondary-container font-label-sm text-label-sm font-bold tracking-wide">
            Verified Stories
          </span>
          <h2 className="font-headline-lg text-headline-lg text-on-surface font-bold tracking-tight">
            Trusted by Parents Across Bangladesh
          </h2>
          <p className="font-body-md text-body-md text-on-surface-variant">
            Real feedback from parents and students who achieved academic transformation through TutorBridge.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {reviews.map((rev) => (
            <div
              key={rev.id}
              className="bg-surface-container-lowest rounded-2xl p-6 shadow-xs flex flex-col justify-between relative border border-outline-variant/10 hover:shadow-md transition-shadow"
            >
              <div>
                <div className="flex items-center gap-1 text-amber-500 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <span
                      key={i}
                      className="material-symbols-outlined text-[18px]"
                      style={{ fontVariationSettings: "'FILL' 1" }}
                    >
                      star
                    </span>
                  ))}
                </div>
                <p className="font-body-md text-body-md text-on-surface leading-relaxed italic">
                  {rev.quote}
                </p>
              </div>

              <div className="flex items-center gap-3 pt-6 mt-4 border-t border-outline-variant/20">
                <img
                  className="w-11 h-11 rounded-full object-cover"
                  src={rev.image}
                  alt={rev.alt}
                />
                <div>
                  <h4 className="font-headline-sm text-headline-sm text-on-surface font-bold text-[14px]">
                    {rev.name}
                  </h4>
                  <p className="font-body-sm text-body-sm text-on-surface-variant text-[12px]">
                    {rev.role}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default GuardianReviews;
