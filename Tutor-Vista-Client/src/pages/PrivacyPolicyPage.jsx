import React, { useEffect } from "react";
import { motion } from "framer-motion";
import { Shield, Eye, Lock, Users, FileText, Globe } from "lucide-react";

const PrivacyPolicyPage = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const sectionVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.4 },
    },
  };

  const sections = [
    {
      icon: <Shield className="w-6 h-6" />,
      title: "Our Commitment",
      content:
        "At Tutor Vista, accessible through www.tutorvistabd.com, safeguarding the privacy of our visitors is one of our top priorities. This Privacy Policy outlines the types of information we collect and how we use it.",
    },
    {
      icon: <Eye className="w-6 h-6" />,
      title: "Information We Collect",
      content:
        "The personal information you are required to provide and the reasons for asking it will be clearly communicated when we request it. If you contact us directly, we may receive additional details such as your name, email address, phone number, the content of your message, any attachments you send, and any other information you choose to provide.",
    },
    {
      icon: <Users className="w-6 h-6" />,
      title: "How We Use Your Information",
      content:
        "We utilize the information we collect to operate, maintain, and enhance our website, personalize and improve features, understand user interactions, develop new services, communicate with you for customer service and promotional purposes, send emails, and detect fraud.",
    },
  ];

  return (
    <div className="bg-white font-dmsans">
      {/* Header Section */}
      <section className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-12 sm:py-16 lg:py-20">
        <motion.div
          className="w-full mx-auto px-4 sm:px-6 lg:px-8 xl:px-12 2xl:px-16 text-center"
          initial="hidden"
          animate="visible"
          variants={sectionVariants}
        >
          <motion.div
            className="w-16 h-16 sm:w-20 sm:h-20 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-6"
            variants={itemVariants}
          >
            <Shield className="w-8 h-8 sm:w-10 sm:h-10 text-white" />
          </motion.div>

          <motion.h1
            className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-4"
            variants={itemVariants}
          >
            Privacy Policy
          </motion.h1>

          <motion.p
            className="text-base sm:text-lg lg:text-xl opacity-90 mx-auto px-4 sm:px-8 lg:px-16 xl:px-32"
            variants={itemVariants}
          >
            Your privacy is important to us. Learn how we collect, use, and
            protect your information.
          </motion.p>
        </motion.div>
      </section>

      {/* Quick Overview */}
      <section className="py-10 sm:py-12 lg:py-16">
        <div className="w-full mx-auto px-4 sm:px-6 lg:px-8 xl:px-12 2xl:px-16">
          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={sectionVariants}
          >
            {sections.map((section, index) => (
              <motion.div
                key={index}
                className="bg-gradient-to-br from-blue-50 to-indigo-50 p-6 sm:p-8 rounded-xl border border-blue-100"
                variants={itemVariants}
                whileHover={{ y: -5, scale: 1.02 }}
              >
                <div className="w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center text-white mb-4">
                  {section.icon}
                </div>
                <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-3">
                  {section.title}
                </h3>
                <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
                  {section.content}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-10 sm:py-12 lg:py-16 bg-gray-50">
        <div className="w-full mx-auto px-4 sm:px-6 lg:px-8 xl:px-12 2xl:px-16">
          <motion.div
            className="bg-white rounded-xl lg:rounded-2xl shadow-lg p-6 sm:p-8 lg:p-12"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={sectionVariants}
          >
            {/* Contact Information */}
            <motion.div className="mb-8 sm:mb-12" variants={itemVariants}>
              <div className="bg-blue-50 border-l-4 border-blue-600 p-4 sm:p-6 rounded-r-lg">
                <p className="text-sm sm:text-base text-gray-700 leading-relaxed">
                  For any questions or more details about our Privacy Policy,
                  feel free to contact us via email at{" "}
                  <a
                    href="mailto:tutorvista.tuitions@gmail.com"
                    className="text-blue-600 font-semibold hover:underline break-all"
                  >
                    tutorvista.tuitions@gmail.com
                  </a>
                </p>
              </div>
            </motion.div>

            {/* Consent Section */}
            <motion.div className="mb-8 sm:mb-12" variants={itemVariants}>
              <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4 sm:mb-6 flex items-center">
                <FileText className="w-5 h-5 sm:w-6 sm:h-6 text-blue-600 mr-3" />
                Consent
              </h2>
              <div className="bg-green-50 border border-green-200 rounded-lg p-4 sm:p-6">
                <p className="text-sm sm:text-base text-gray-700 leading-relaxed">
                  By accessing and using our website, you consent to our Privacy
                  Policy and agree to its terms. This policy applies solely to
                  our online activities and is relevant for visitors to our
                  website regarding the information they share or collect on
                  Tutor Vista. It does not apply to any information gathered
                  offline or through other channels outside this website.
                </p>
              </div>
            </motion.div>

            {/* Information Collection */}
            <motion.div className="mb-8 sm:mb-12" variants={itemVariants}>
              <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4 sm:mb-6 flex items-center">
                <Eye className="w-5 h-5 sm:w-6 sm:h-6 text-blue-600 mr-3" />
                Information We Collect
              </h2>
              <div className="space-y-4 sm:space-y-6">
                <p className="text-sm sm:text-base text-gray-700 leading-relaxed">
                  The personal information you are required to provide and the
                  reasons for asking it will be clearly communicated when we
                  request it.
                </p>
                <p className="text-sm sm:text-base text-gray-700 leading-relaxed">
                  If you contact us directly, we may receive additional details
                  such as your name, email address, phone number, the content of
                  your message, any attachments you send, and any other
                  information you choose to provide.
                </p>
                <p className="text-sm sm:text-base text-gray-700 leading-relaxed">
                  When registering for an account, we may ask for your contact
                  details, including your name, company name, address, email
                  address, and phone number.
                </p>
              </div>
            </motion.div>

            {/* How We Use Information */}
            <motion.div className="mb-8 sm:mb-12" variants={itemVariants}>
              <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4 sm:mb-6 flex items-center">
                <Users className="w-5 h-5 sm:w-6 sm:h-6 text-blue-600 mr-3" />
                How We Use Your Information
              </h2>
              <div className="bg-purple-50 border border-purple-200 rounded-lg p-4 sm:p-6">
                <p className="text-sm sm:text-base text-gray-700 leading-relaxed mb-4">
                  We utilize the information we collect in several ways,
                  including to:
                </p>
                <ul className="space-y-2 sm:space-y-3 text-gray-700">
                  <li className="flex items-start">
                    <span className="w-2 h-2 bg-purple-600 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                    <span className="text-sm sm:text-base">
                      Operate, maintain, and enhance our website
                    </span>
                  </li>
                  <li className="flex items-start">
                    <span className="w-2 h-2 bg-purple-600 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                    <span className="text-sm sm:text-base">
                      Personalize, improve, and expand our website's features
                    </span>
                  </li>
                  <li className="flex items-start">
                    <span className="w-2 h-2 bg-purple-600 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                    <span className="text-sm sm:text-base">
                      Understand and analyze how you interact with our website
                    </span>
                  </li>
                  <li className="flex items-start">
                    <span className="w-2 h-2 bg-purple-600 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                    <span className="text-sm sm:text-base">
                      Develop new products, services, features, and
                      functionalities
                    </span>
                  </li>
                  <li className="flex items-start">
                    <span className="w-2 h-2 bg-purple-600 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                    <span className="text-sm sm:text-base">
                      Communicate with you for customer service, updates, and
                      promotional purposes
                    </span>
                  </li>
                  <li className="flex items-start">
                    <span className="w-2 h-2 bg-purple-600 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                    <span className="text-sm sm:text-base">
                      Send you emails
                    </span>
                  </li>
                  <li className="flex items-start">
                    <span className="w-2 h-2 bg-purple-600 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                    <span className="text-sm sm:text-base">
                      Detect and prevent fraud
                    </span>
                  </li>
                </ul>
              </div>
            </motion.div>

            {/* Log Files */}
            <motion.div className="mb-8 sm:mb-12" variants={itemVariants}>
              <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4 sm:mb-6">
                Log Files
              </h2>
              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 sm:p-6">
                <p className="text-sm sm:text-base text-gray-700 leading-relaxed">
                  <strong>Tutor Vista</strong> follows standard procedures by
                  using log files to track visitors on our website. Hosting
                  companies typically perform this process as part of their
                  service analytics. The information collected in log files
                  includes IP addresses, browser types, Internet Service
                  Provider (ISP), date and time stamps, referring/exit pages,
                  and possibly the number of clicks. This data is not linked to
                  any personally identifiable information and is used for
                  analyzing trends, administering the site, monitoring user
                  activity, and gathering demographic insights.
                </p>
              </div>
            </motion.div>

            {/* Cookies Section */}
            <motion.div className="mb-8 sm:mb-12" variants={itemVariants}>
              <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4 sm:mb-6 flex items-center">
                <Globe className="w-5 h-5 sm:w-6 sm:h-6 text-blue-600 mr-3" />
                Cookies and Web Beacons
              </h2>
              <div className="space-y-4 sm:space-y-6">
                <p className="text-sm sm:text-base text-gray-700 leading-relaxed">
                  Like most websites, <strong>Tutor Vista</strong> uses cookies
                  to store information such as visitors' preferences and the
                  pages they accessed on the site. This helps in customizing the
                  user experience based on their browser type and other details.
                </p>
                <div className="bg-orange-50 border border-orange-200 rounded-lg p-4 sm:p-6">
                  <p className="text-sm sm:text-base text-gray-700 leading-relaxed">
                    Google, a third-party vendor, also uses cookies (DART
                    cookies) to serve ads based on users' visits to{" "}
                    <a
                      href="https://www.tutorvistabd.com"
                      className="text-blue-600 hover:underline font-medium break-all"
                    >
                      www.tutorvistabd.com
                    </a>{" "}
                    and other websites. Visitors can opt-out of the use of DART
                    cookies by visiting the{" "}
                    <a
                      href="https://policies.google.com/technologies/ads"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:underline font-medium"
                    >
                      Google Ads Privacy Policy
                    </a>
                    .
                  </p>
                </div>
                <p className="text-sm sm:text-base text-gray-700 leading-relaxed">
                  Additionally, some advertisers on our site may use cookies and
                  web beacons. Each advertising partner has its own privacy
                  policy regarding user data. Third-party ad servers or networks
                  use technologies like cookies, JavaScript, or Web Beacons in
                  their advertisements and links that appear on Tutor Vista.
                </p>
              </div>
            </motion.div>

            {/* Rights Section */}
            <motion.div className="mb-8 sm:mb-12" variants={itemVariants}>
              <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4 sm:mb-6 flex items-center">
                <Lock className="w-5 h-5 sm:w-6 sm:h-6 text-blue-600 mr-3" />
                Your Rights (GDPR & CCPA)
              </h2>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8">
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 sm:p-6">
                  <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-4">
                    GDPR Rights
                  </h3>
                  <ul className="space-y-2 text-sm sm:text-base text-gray-700">
                    <li>• Right to access your personal data</li>
                    <li>• Right to rectification of inaccurate data</li>
                    <li>• Right to erasure under certain conditions</li>
                    <li>• Right to restrict processing</li>
                    <li>• Right to data portability</li>
                  </ul>
                </div>
                <div className="bg-green-50 border border-green-200 rounded-lg p-4 sm:p-6">
                  <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-4">
                    CCPA Rights
                  </h3>
                  <ul className="space-y-2 text-sm sm:text-base text-gray-700">
                    <li>• Request disclosure of collected data</li>
                    <li>• Request deletion of personal data</li>
                    <li>• Request that we do not sell personal data</li>
                    <li>• Non-discrimination for exercising rights</li>
                  </ul>
                </div>
              </div>
              <div className="mt-4 sm:mt-6 bg-gray-100 rounded-lg p-3 sm:p-4">
                <p className="text-xs sm:text-sm text-gray-600 text-center">
                  <strong>Response Time:</strong> We have one month to respond
                  to any requests.
                </p>
              </div>
            </motion.div>

            {/* Children's Information */}
            <motion.div className="mb-8 sm:mb-12" variants={itemVariants}>
              <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4 sm:mb-6">
                Children's Information
              </h2>
              <div className="bg-red-50 border border-red-200 rounded-lg p-4 sm:p-6">
                <p className="text-sm sm:text-base text-gray-700 leading-relaxed">
                  We prioritize protecting children while they use the internet.
                  We encourage parents and guardians to observe, monitor, and
                  guide their children's online activity.{" "}
                  <strong>Tutor Vista</strong> does not knowingly collect any
                  personally identifiable information from children under the
                  age of 13. If you believe your child has provided such
                  information on our website, please contact us immediately, and
                  we will make every effort to promptly remove it from our
                  records.
                </p>
              </div>
            </motion.div>

            {/* Contact Footer */}
            <motion.div
              className="bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg lg:rounded-xl p-6 sm:p-8 text-center"
              variants={itemVariants}
            >
              <h3 className="text-lg sm:text-xl font-bold mb-4">
                Questions About Our Privacy Policy?
              </h3>
              <p className="text-sm sm:text-base mb-6 opacity-90 leading-relaxed">
                We have one month to respond to any requests. If you'd like to
                exercise any of your rights or have questions, please contact
                us.
              </p>
              <a
                href="mailto:tutorvista.tuitions@gmail.com"
                className="inline-flex items-center bg-white text-blue-600 px-4 sm:px-6 py-2 sm:py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors text-sm sm:text-base"
              >
                Contact Us
              </a>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default PrivacyPolicyPage;
