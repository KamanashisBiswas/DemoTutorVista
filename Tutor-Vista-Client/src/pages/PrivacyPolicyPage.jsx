import React, { useEffect } from "react";
import { motion } from "framer-motion";
import { Shield, Eye, Lock, Users, FileText, Globe, CheckCircle2, Mail, ExternalLink } from "lucide-react";

const PrivacyPolicyPage = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const sectionVariants = {
    hidden: { opacity: 0, y: 16 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        staggerChildren: 0.08,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 12 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.35 },
    },
  };

  const quickHighlights = [
    {
      icon: <Shield className="w-5 h-5 text-[#3730E0]" />,
      title: "Our Commitment",
      content:
        "Safeguarding the privacy of our students, guardians, and tutors is our top priority. We operate with strict transparency.",
    },
    {
      icon: <Eye className="w-5 h-5 text-[#0EA5A0]" />,
      title: "Clear Collection",
      content:
        "We explicitly explain why information is required whenever requested, strictly limiting data to what is needed for tutoring matches.",
    },
    {
      icon: <Users className="w-5 h-5 text-[#3730E0]" />,
      title: "Responsible Use",
      content:
        "Data is used solely to facilitate matching, verify credentials, prevent fraud, and deliver responsive customer support.",
    },
  ];

  return (
    <div className="bg-[#F7F8FB] min-h-screen text-[#1A1D29]">
      {/* Header Section */}
      <section className="relative bg-[#3730E0] text-white py-14 sm:py-20 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-white/10 via-transparent to-transparent pointer-events-none" />
        <motion.div
          className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center"
          initial="hidden"
          animate="visible"
          variants={sectionVariants}
        >
          <motion.div
            className="w-16 h-16 bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl flex items-center justify-center mx-auto mb-5 shadow-inner"
            variants={itemVariants}
          >
            <Shield className="w-8 h-8 text-white" />
          </motion.div>

          <motion.h1
            className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight mb-4"
            variants={itemVariants}
          >
            Privacy Policy
          </motion.h1>

          <motion.p
            className="text-base sm:text-lg text-white/80 max-w-2xl mx-auto leading-relaxed"
            variants={itemVariants}
          >
            Your privacy matters to us. Learn how TutorBridge collects, uses, and protects your information across our platform.
          </motion.p>
        </motion.div>
      </section>

      {/* Quick Overview Highlights */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 -mt-8 relative z-10">
        <motion.div
          className="grid grid-cols-1 md:grid-cols-3 gap-6"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={sectionVariants}
        >
          {quickHighlights.map((highlight, index) => (
            <motion.div
              key={index}
              className="bg-white p-6 rounded-2xl border border-[#E4E6EE] shadow-card hover:shadow-card-hover transition-all"
              variants={itemVariants}
            >
              <div className="w-10 h-10 rounded-xl bg-gray-50 border border-[#E4E6EE] flex items-center justify-center mb-4">
                {highlight.icon}
              </div>
              <h3 className="text-lg font-bold text-[#1A1D29] mb-2">
                {highlight.title}
              </h3>
              <p className="text-sm text-[#5B5F73] leading-relaxed">
                {highlight.content}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* Main Content */}
      <section className="py-12 sm:py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="bg-white rounded-2xl border border-[#E4E6EE] shadow-card p-6 sm:p-10 space-y-10"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={sectionVariants}
          >
            {/* Contact Notice */}
            <motion.div variants={itemVariants}>
              <div className="bg-[#F7F8FB] border border-[#E4E6EE] border-l-4 border-l-[#3730E0] p-5 rounded-r-xl flex items-start gap-3">
                <Mail className="w-5 h-5 text-[#3730E0] mt-0.5 flex-shrink-0" />
                <p className="text-sm sm:text-base text-[#5B5F73] leading-relaxed">
                  For questions or full details regarding our privacy practices, please contact our Data Protection team at{" "}
                  <a
                    href="mailto:support@tutorbridge.com"
                    className="text-[#3730E0] font-semibold hover:underline break-all"
                  >
                    support@tutorbridge.com
                  </a>
                  .
                </p>
              </div>
            </motion.div>

            {/* Consent Section */}
            <motion.div variants={itemVariants} className="space-y-4">
              <h2 className="text-xl sm:text-2xl font-bold text-[#1A1D29] flex items-center gap-3">
                <FileText className="w-6 h-6 text-[#3730E0]" />
                1. Consent & Applicability
              </h2>
              <div className="p-5 rounded-xl bg-[#0EA5A0]/5 border border-[#0EA5A0]/20 text-[#5B5F73] text-sm sm:text-base leading-relaxed space-y-2">
                <p>
                  By accessing and using TutorBridge, you consent to our Privacy Policy and agree to its terms.
                </p>
                <p>
                  This policy applies solely to our online activities and visitors to our website regarding information shared or collected on TutorBridge. It does not apply to offline information collection or non-platform channels.
                </p>
              </div>
            </motion.div>

            {/* Information Collection */}
            <motion.div variants={itemVariants} className="space-y-4">
              <h2 className="text-xl sm:text-2xl font-bold text-[#1A1D29] flex items-center gap-3">
                <Eye className="w-6 h-6 text-[#3730E0]" />
                2. Information We Collect
              </h2>
              <div className="space-y-3 text-sm sm:text-base text-[#5B5F73] leading-relaxed">
                <p>
                  The personal information requested and the reasons for requesting it are clearly communicated when prompted.
                </p>
                <p>
                  If you contact us directly, we may receive additional details such as your name, email address, phone number, the content of your message, and any verification documents you provide.
                </p>
                <p>
                  When registering as a tutor or requesting a tuition, we collect contact and academic details including full name, phone number, academic qualification, institution, tuition location preferences, and subject proficiencies.
                </p>
              </div>
            </motion.div>

            {/* How We Use Information */}
            <motion.div variants={itemVariants} className="space-y-4">
              <h2 className="text-xl sm:text-2xl font-bold text-[#1A1D29] flex items-center gap-3">
                <Users className="w-6 h-6 text-[#3730E0]" />
                3. How We Use Your Information
              </h2>
              <div className="bg-[#F7F8FB] border border-[#E4E6EE] rounded-xl p-5 sm:p-6 space-y-3">
                <p className="text-sm sm:text-base font-semibold text-[#1A1D29]">
                  We utilize collected information to:
                </p>
                <ul className="space-y-2.5 text-sm sm:text-base text-[#5B5F73]">
                  {[
                    "Operate, maintain, and enhance platform performance and reliability",
                    "Match qualified tutors with matching student requirements efficiently",
                    "Understand user interactions to streamline search and booking experiences",
                    "Verify academic credentials and uphold community safety standards",
                    "Communicate with users regarding tuition job updates, matches, and support",
                    "Send essential notifications and service-related emails",
                    "Detect, prevent, and mitigate fraudulent activities",
                  ].map((item, idx) => (
                    <li key={idx} className="flex items-start gap-2.5">
                      <CheckCircle2 className="w-4 h-4 text-[#16A34A] mt-1 flex-shrink-0" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>

            {/* Log Files */}
            <motion.div variants={itemVariants} className="space-y-4">
              <h2 className="text-xl sm:text-2xl font-bold text-[#1A1D29]">
                4. Log Files
              </h2>
              <p className="text-sm sm:text-base text-[#5B5F73] leading-relaxed">
                TutorBridge follows standard industry practices for logging visitor traffic. The information collected by log files includes internet protocol (IP) addresses, browser type, Internet Service Provider (ISP), date/time stamps, referring/exit pages, and click counts. These are not linked to personally identifiable information and are strictly analyzed for trend assessment, security audits, and site administration.
              </p>
            </motion.div>

            {/* Cookies & Web Beacons */}
            <motion.div variants={itemVariants} className="space-y-4">
              <h2 className="text-xl sm:text-2xl font-bold text-[#1A1D29] flex items-center gap-3">
                <Globe className="w-6 h-6 text-[#3730E0]" />
                5. Cookies & Tracking Technologies
              </h2>
              <div className="space-y-4 text-sm sm:text-base text-[#5B5F73] leading-relaxed">
                <p>
                  Like most platforms, TutorBridge uses cookies to remember user preferences and personalize pages based on device configuration.
                </p>
                <div className="p-4 rounded-xl bg-amber-50 border border-amber-200 text-[#1A1D29] text-sm">
                  Google and other verified partners may serve informational ads using cookies (such as DART cookies). Visitors can opt out of third-party ad cookies by visiting the{" "}
                  <a
                    href="https://policies.google.com/technologies/ads"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[#3730E0] font-semibold hover:underline inline-flex items-center gap-1"
                  >
                    Google Ads Privacy Policy <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                  .
                </div>
              </div>
            </motion.div>

            {/* Rights Section (GDPR & CCPA) */}
            <motion.div variants={itemVariants} className="space-y-4">
              <h2 className="text-xl sm:text-2xl font-bold text-[#1A1D29] flex items-center gap-3">
                <Lock className="w-6 h-6 text-[#3730E0]" />
                6. Data Protection Rights (GDPR & CCPA)
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="bg-[#F7F8FB] border border-[#E4E6EE] rounded-xl p-5">
                  <h3 className="text-base font-bold text-[#1A1D29] mb-3">
                    GDPR Rights
                  </h3>
                  <ul className="space-y-2 text-sm text-[#5B5F73]">
                    <li>• Right of access to your personal records</li>
                    <li>• Right to rectification of inaccurate data</li>
                    <li>• Right to request data erasure</li>
                    <li>• Right to restriction of processing</li>
                    <li>• Right to portable data transmission</li>
                  </ul>
                </div>
                <div className="bg-[#F7F8FB] border border-[#E4E6EE] rounded-xl p-5">
                  <h3 className="text-base font-bold text-[#1A1D29] mb-3">
                    CCPA Rights
                  </h3>
                  <ul className="space-y-2 text-sm text-[#5B5F73]">
                    <li>• Disclosure of collected personal categories</li>
                    <li>• Request deletion of stored personal data</li>
                    <li>• Guarantee against selling personal information</li>
                    <li>• Non-discrimination for privacy rights exercise</li>
                  </ul>
                </div>
              </div>
              <div className="p-3 bg-gray-50 rounded-lg border border-[#E4E6EE] text-center text-xs text-[#5B5F73]">
                Standard Response Period: Requests are acknowledged and processed within 30 days.
              </div>
            </motion.div>

            {/* Children's Information */}
            <motion.div variants={itemVariants} className="space-y-4">
              <h2 className="text-xl sm:text-2xl font-bold text-[#1A1D29]">
                7. Child Protection
              </h2>
              <p className="text-sm sm:text-base text-[#5B5F73] leading-relaxed">
                Safeguarding younger learners is paramount. TutorBridge does not knowingly collect personally identifiable information from children under 13 without direct guardian supervision. If a parent or guardian believes their child has registered unmonitored information, contact us immediately to purge the record.
              </p>
            </motion.div>

            {/* Contact Footer Card */}
            <motion.div
              className="bg-[#3730E0] text-white rounded-2xl p-6 sm:p-8 text-center space-y-4 shadow-lg"
              variants={itemVariants}
            >
              <h3 className="text-xl sm:text-2xl font-bold">
                Have Questions About Our Privacy Policy?
              </h3>
              <p className="text-sm sm:text-base text-white/85 max-w-xl mx-auto leading-relaxed">
                Our support team is available to assist you with privacy inquiries or data requests.
              </p>
              <a
                href="mailto:support@tutorbridge.com"
                className="inline-flex items-center gap-2 bg-white text-[#3730E0] hover:bg-gray-100 font-semibold px-6 py-3 rounded-xl transition-all shadow-sm text-sm sm:text-base"
              >
                <Mail className="w-4 h-4" />
                Contact Privacy Team
              </a>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default PrivacyPolicyPage;
