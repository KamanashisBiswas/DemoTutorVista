import React, { useState } from "react";

const faqs = [
  {
    id: 1,
    question: "Are there any charges or commissions for parents to find a tutor?",
    answer:
      "No, TutorBridge is 100% free for parents and guardians. You do not pay any registration, placement, or commission fee. You only pay the agreed monthly tuition fee directly for the tutor’s service.",
  },
  {
    id: 2,
    question: "How does TutorBridge verify tutor backgrounds and identity?",
    answer:
      "Every tutor undergoes a rigorous 4-step verification: official National ID (NID) authentication, university student ID cross-check with academic institutions (e.g. BUET, DU, DMC, NSU, BRAC), academic transcript audits, and optional local address and police verification.",
  },
  {
    id: 3,
    question: "Can we take a free demo class before finalizing?",
    answer:
      "Yes! We offer a complimentary 1-day demo session so the student and parents can evaluate the tutor’s teaching style, communication fluency, and subject proficiency before making any financial commitment.",
  },
  {
    id: 4,
    question: "What happens if the matched tutor is not suitable?",
    answer:
      "Under our Free Replacement Guarantee, if you are not 100% satisfied with your matched tutor at any point during the first month, our coordinator will arrange an alternate top-rated tutor within 24 hours at no extra charge.",
  },
  {
    id: 5,
    question: "What are the typical tuition fees across Dhaka and other cities?",
    answer:
      "Tuition fees vary depending on the class, medium, days per week, and tutor’s university background. Typically, Primary levels range from ৳ 4,000–6,000/mo, Secondary & SSC range from ৳ 6,000–9,000/mo, and HSC or O/A-Levels range from ৳ 8,000–15,000/mo.",
  },
  {
    id: 6,
    question: "How do university students register as tutors on TutorBridge?",
    answer:
      "Educators can click 'Join as Tutor', complete their profile with verified credentials (Varsity ID, NID, and SSC/HSC marksheets), pass an online subject competency test, and start applying to live tuition jobs immediately.",
  },
];

const FAQComponent = () => {
  // First item open by default as in Stitch
  const [openIndex, setOpenIndex] = useState(0);

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? -1 : index);
  };

  return (
    <section className="w-full py-16 lg:py-20 bg-surface-container-low/50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-12">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-14 space-y-3">
            <span className="px-3.5 py-1 rounded-full bg-surface-container-highest text-primary-container font-label-sm text-label-sm font-bold tracking-wide">
              Common Queries
            </span>
            <h2 className="font-headline-lg text-headline-lg text-on-surface font-bold tracking-tight">
              Frequently Asked Questions
            </h2>
            <p className="font-body-md text-body-md text-on-surface-variant">
              Everything you need to know about matching, verification, and payments.
            </p>
          </div>

          <div className="space-y-4">
            {faqs.map((faq, idx) => {
              const isOpen = openIndex === idx;
              return (
                <div
                  key={faq.id}
                  className="bg-surface-container-lowest rounded-2xl shadow-xs overflow-hidden border border-outline-variant/10 transition-all"
                >
                  <button
                    onClick={() => toggleFAQ(idx)}
                    className="w-full p-6 text-left flex items-center justify-between gap-4 font-headline-sm text-headline-sm text-on-surface font-bold text-[16px] hover:text-primary-container transition-colors"
                  >
                    <span>{faq.question}</span>
                    <span
                      className={`material-symbols-outlined text-[20px] transition-transform duration-200 ${
                        isOpen ? "rotate-180 text-primary-container" : "text-on-surface-variant"
                      }`}
                    >
                      expand_more
                    </span>
                  </button>

                  {isOpen && (
                    <div className="px-6 pb-6 pt-1 text-on-surface-variant font-body-md text-body-md leading-relaxed animate-fadeIn">
                      {faq.answer}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default FAQComponent;
