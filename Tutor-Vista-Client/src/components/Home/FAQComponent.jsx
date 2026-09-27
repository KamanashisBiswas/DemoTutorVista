import React, { useState, useEffect } from "react";
import { ChevronDown, HelpCircle, MessageSquare, PhoneCall, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import axios from "../../lib/axios";
import CommonSectionHeading from "../Common/CommonSectionHeading";
import { Button } from "../ui/Button";
import { Skeleton } from "../ui/Skeleton";

const defaultFaqs = [
  {
    _id: "def-1",
    question: "How does TutorVista verify tutors?",
    answer: "Every tutor undergoes a multi-step verification process: National ID (NID) / Birth Certificate check, verified university student ID / graduation certificates, academic transcript review, and a direct interview before being approved for guardian referrals.",
  },
  {
    _id: "def-2",
    question: "Is there any registration fee for Guardians or Students?",
    answer: "No, registration and posting tuition requirements are completely free for guardians and students. We also provide a free demo class to ensure you are 100% satisfied with the teacher.",
  },
  {
    _id: "def-3",
    question: "What happens if we are not satisfied with the assigned tutor?",
    answer: "If you feel the tutor's teaching methodology doesn't match your student's learning style after the demo class, our matching team will provide immediate replacement teacher profiles at zero extra charge.",
  },
  {
    _id: "def-4",
    question: "How can university students join as tutors?",
    answer: "University students and graduates can apply online through our 'Apply as Tutor' portal by uploading their academic certificates and ID documents. Once verified, our team will notify you for matching tuitions in your preferred areas.",
  },
  {
    _id: "def-5",
    question: "Can I choose both Male and Female tutors for home or online classes?",
    answer: "Yes, guardians can specify their exact gender preference, preferred days per week, class timings, and whether they need home tutoring or online classes.",
  },
];

const FAQComponent = () => {
  const [openFAQ, setOpenFAQ] = useState(0);
  const [faqs, setFaqs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFAQs = async () => {
      try {
        setLoading(true);
        const response = await axios.get("/api/faq", { timeout: 8000 });
        if (response.data && response.data.success && response.data.data?.faqs?.length > 0) {
          setFaqs(response.data.data.faqs);
        } else {
          setFaqs(defaultFaqs);
        }
      } catch {
        setFaqs(defaultFaqs);
      } finally {
        setLoading(false);
      }
    };

    fetchFAQs();
  }, []);

  const toggleFAQ = (index) => {
    setOpenFAQ(openFAQ === index ? -1 : index);
  };

  return (
    <section className="py-16 sm:py-20 bg-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <CommonSectionHeading
          badge="HELP & FAQ"
          title="Frequently Asked"
          highlight="Questions"
          subtitle="Everything you need to know about finding tutors, demo classes, and joining our teaching community."
        />

        {/* FAQ Accordion */}
        <div className="space-y-3">
          {loading ? (
            <div className="space-y-3">
              {[1, 2, 3, 4].map((i) => (
                <div
                  key={i}
                  className="p-4 bg-[#F7F8FB] border border-[#E4E6EE] rounded-md"
                >
                  <Skeleton variant="text" className="h-5 w-3/4 mb-2" />
                  <Skeleton variant="text" className="h-4 w-1/2" />
                </div>
              ))}
            </div>
          ) : (
            faqs.map((faq, index) => {
              const isOpen = openFAQ === index;
              return (
                <div
                  key={faq._id || index}
                  className={`border rounded-md transition-all duration-150 overflow-hidden ${
                    isOpen
                      ? "border-[#3730E0] bg-[#EEEDFD]/15 shadow-xs"
                      : "border-[#E4E6EE] bg-white hover:border-[#CBD5E1]"
                  }`}
                >
                  <button
                    type="button"
                    onClick={() => toggleFAQ(index)}
                    className="w-full py-4 px-5 text-left flex items-center justify-between gap-4 focus:outline-none"
                    aria-expanded={isOpen}
                  >
                    <span className="text-sm sm:text-base font-bold text-[#1A1D29] tracking-tight">
                      {faq.question}
                    </span>
                    <div
                      className={`w-7 h-7 rounded-sm flex items-center justify-center shrink-0 transition-transform duration-200 ${
                        isOpen
                          ? "bg-[#3730E0] text-white rotate-180"
                          : "bg-[#F7F8FB] text-[#5B5F73]"
                      }`}
                    >
                      <ChevronDown className="w-4 h-4" />
                    </div>
                  </button>

                  {isOpen && (
                    <div className="px-5 pb-5 pt-1 text-xs sm:text-sm text-[#5B5F73] leading-relaxed border-t border-[#E4E6EE]/50">
                      <p>{faq.answer}</p>
                    </div>
                  )}
                </div>
              );
            })
          )}
        </div>

        {/* Bottom Support Banner */}
        <div className="mt-12 p-6 rounded-md bg-[#F7F8FB] border border-[#E4E6EE] flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-sm bg-[#EEEDFD] text-[#3730E0] flex items-center justify-center shrink-0">
              <MessageSquare className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-[#1A1D29]">
                Have a question not listed here?
              </h4>
              <p className="text-xs text-[#5B5F73]">
                Our academic counseling team is available 7 days a week.
              </p>
            </div>
          </div>
          <Link to="/contact">
            <Button variant="primary" size="sm" iconRight={ArrowRight}>
              Contact Support
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default FAQComponent;
