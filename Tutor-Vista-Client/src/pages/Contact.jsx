import React, { useEffect, useState } from "react";
import axios from "../lib/axios";
import { toast } from "react-toastify";
import { motion } from "framer-motion";
import Lottie from "lottie-react";
import ContactAnimation from "../assets/Contact/contact.json";
import Button from "../components/Common/Button";
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  MessageCircle,
  User,
  Building2,
  Send,
  CheckCircle,
  Globe,
  Shield,
  Headphones,
} from "lucide-react";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    phoneNumber: "",
    message: "",
    agreeToTerms: false,
  });

  const [loading, setLoading] = useState(false);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async () => {
    if (!formData.agreeToTerms) {
      toast.warn("You must agree to terms and conditions");
      return;
    }

    setLoading(true);
    try {
      const res = await axios.post("/api/message", {
        name: formData.name,
        phoneNumber: formData.phoneNumber,
        message: formData.message,
        agreeTerms: formData.agreeToTerms,
      });

      toast.success("✅ Message submitted successfully!");

      setFormData({
        name: "",
        phoneNumber: "",
        message: "",
        agreeToTerms: false,
      });
    } catch (error) {
      if (
        error.response?.data?.errors &&
        error.response.data.errors.length > 0
      ) {
        // Show only the first field error message in toast
        toast.error(error.response.data.errors[0].message);
      } else {
        const errorMsg =
          error.response?.data?.message || "Something went wrong";
        toast.error(`🚨 ${errorMsg}`);
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    window.scrollTo(0, 0);
    // GTM: Push contact_us event on page visit
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({
      event: "contact_us",
    });
  }, []);

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
      },
    },
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section with Gradient */}
      <section className="relative bg-gradient-to-br from-blue-600 via-indigo-700 to-purple-800 text-white overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPGRlZnM+CjxwYXR0ZXJuIGlkPSJncmlkIiB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHBhdHRlcm5Vbml0cz0idXNlclNwYWNlT25Vc2UiPgo8cGF0aCBkPSJNIDEwIDAgTCAwIDAgMCAxMCIgZmlsbD0ibm9uZSIgc3Ryb2tlPSJyZ2JhKDI1NSwgMjU1LCAyNTUsIDAuMSkiIHN0cm9rZS13aWR0aD0iMSIvPgo8L3BhdHRlcm4+CjwvZGVmcz4KPHJlY3Qgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgZmlsbD0idXJsKCNncmlkKSIgLz4KPHN2Zz4=')] opacity-20"></div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <motion.div
            className="text-center"
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-white to-blue-100 bg-clip-text text-transparent">
              Let's Connect
            </h1>
            <p className="text-xl md:text-2xl text-blue-100 max-w-3xl mx-auto mb-8 leading-relaxed">
              Ready to start your educational journey? Get in touch with our
              expert team and discover how we can help you achieve your academic
              goals.
            </p>

            {/* Quick Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto mt-12">
              <div className="text-center">
                <div className="text-3xl font-bold text-white">27000+</div>
                <div className="text-blue-200 text-sm">Happy Students</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-white">39000+</div>
                <div className="text-blue-200 text-sm">Expert Tutors</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-white">24/7</div>
                <div className="text-blue-200 text-sm">Support</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-white">4</div>
                <div className="text-blue-200 text-sm">Cities</div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Main Content Section */}
      <section className="py-20 bg-gradient-to-b from-gray-50 to-white">
        <div className="w-full mx-auto px-4 sm:px-6 lg:px-8 xl:px-12 2xl:px-16 pb-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            {/* Left Side - Contact Form */}
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="space-y-8"
            >
              {/* Form Header */}
              <motion.div variants={itemVariants}>
                <div className="flex items-center mb-6">
                  <div className="bg-gradient-to-r from-blue-500 to-indigo-600 p-4 rounded-xl shadow-lg">
                    <MessageCircle className="h-8 w-8 text-white" />
                  </div>
                  <div className="ml-4">
                    <h2 className="text-3xl font-bold text-gray-900">
                      Send Message
                    </h2>
                    <p className="text-gray-600">
                      We'll respond within 24 hours
                    </p>
                  </div>
                </div>
              </motion.div>

              {/* Contact Form */}
              <motion.div
                variants={itemVariants}
                className="bg-white rounded-3xl shadow-2xl p-8 border border-gray-100 relative overflow-hidden"
              >
                {/* Decorative Elements */}
                <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-blue-100 to-indigo-100 rounded-full -mr-16 -mt-16 opacity-50"></div>
                <div className="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-tr from-purple-100 to-pink-100 rounded-full -ml-12 -mb-12 opacity-50"></div>

                <div className="relative z-10 space-y-6">
                  {/* Name Field */}
                  <div className="space-y-2">
                    <label className="flex items-center text-sm font-semibold text-gray-700">
                      <User className="w-4 h-4 mr-2 text-blue-600" />
                      Full Name <span className="text-red-500 ml-1">*</span>
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      placeholder="Enter your full name"
                      className="w-full px-4 py-4 rounded-xl border border-gray-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition-all duration-200 text-gray-900 text-lg"
                      required
                    />
                  </div>

                  {/* Phone Field */}
                  <div className="space-y-2">
                    <label className="flex items-center text-sm font-semibold text-gray-700">
                      <Phone className="w-4 h-4 mr-2 text-blue-600" />
                      Phone Number <span className="text-red-500 ml-1">*</span>
                    </label>
                    <input
                      type="tel"
                      name="phoneNumber"
                      value={formData.phoneNumber}
                      onChange={handleInputChange}
                      placeholder="Enter your phone number"
                      className="w-full px-4 py-4 rounded-xl border border-gray-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition-all duration-200 text-gray-900 text-lg"
                      required
                    />
                  </div>

                  {/* Message Field */}
                  <div className="space-y-2">
                    <label className="flex items-center text-sm font-semibold text-gray-700">
                      <MessageCircle className="w-4 h-4 mr-2 text-blue-600" />
                      Message
                    </label>
                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleInputChange}
                      rows="5"
                      placeholder="Tell us about your tutoring needs, preferred subjects, or any questions you have..."
                      className="w-full px-4 py-4 rounded-xl border border-gray-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition-all duration-200 text-gray-900 text-lg resize-none"
                    />
                  </div>

                  {/* Terms Checkbox */}
                  <div className="flex items-start space-x-3 p-4  rounded-xl">
                    <input
                      type="checkbox"
                      name="agreeToTerms"
                      checked={formData.agreeToTerms}
                      onChange={handleInputChange}
                      className="mt-1 w-5 h-5 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                    />
                    <label className="text-sm text-gray-700 leading-relaxed">
                      I agree to the{" "}
                      <span className="text-blue-600 font-semibold hover:underline cursor-pointer">
                        Terms of Service
                      </span>{" "}
                      and{" "}
                      <span className="text-blue-600 font-semibold hover:underline cursor-pointer">
                        Privacy Policy
                      </span>
                    </label>
                  </div>

                  {/* Submit Button */}
                  <div className="pt-4">
                    <Button
                      onClick={handleSubmit}
                      disabled={!formData.agreeToTerms || loading}
                      className="w-full py-4 text-lg font-semibold flex items-center justify-center"
                    >
                      {loading ? (
                        <>
                          <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                          <span>Sending Message...</span>
                        </>
                      ) : (
                        <>
                          <Send className="w-5 h-5 mr-2" />
                          <span>Send Message</span>
                        </>
                      )}
                    </Button>
                  </div>
                </div>
              </motion.div>
            </motion.div>

            {/* Right Side - Contact Info & Animation */}
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="space-y-8"
            >
              {/* Contact Animation */}
              <motion.div
                variants={itemVariants}
                className="flex justify-center"
              >
                <div className="w-96 h-96 bg-gradient-to-br from-blue-50 to-indigo-100 rounded-3xl flex items-center justify-center">
                  <div className="w-80 h-80">
                    <Lottie animationData={ContactAnimation} loop={true} />
                  </div>
                </div>
              </motion.div>

              {/* Quick Contact Cards */}
              <motion.div
                variants={itemVariants}
                className="grid grid-cols-1 md:grid-cols-2 gap-4"
              >
                <div className="bg-gradient-to-r from-blue-500 to-indigo-600 p-6 rounded-2xl text-white">
                  <Phone className="h-8 w-8 mb-4" />
                  <h3 className="font-bold text-lg mb-2">Call Us</h3>
                  <p className="text-blue-100">01329-266008</p>
                </div>
                <div className="bg-gradient-to-r from-indigo-500 to-purple-600 p-6 rounded-2xl text-white">
                  <Mail className="h-8 w-8 mb-4" />
                  <h3 className="font-bold text-lg mb-2">Email Us</h3>
                  <p className="text-indigo-100 text-sm">
                    tutorvista.tuitions@gmail.com
                  </p>
                </div>
              </motion.div>

              {/* Why Choose Us */}
              <motion.div
                variants={itemVariants}
                className="bg-white rounded-3xl shadow-xl p-8 border border-gray-100"
              >
                <div className="flex items-center mb-6">
                  <div className="bg-gradient-to-r from-green-500 to-emerald-600 p-3 rounded-xl">
                    <CheckCircle className="h-6 w-6 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 ml-4">
                    Why Choose Us?
                  </h3>
                </div>
                <div className="space-y-4">
                  <div className="flex items-center space-x-4">
                    <Globe className="h-5 w-5 text-blue-600" />
                    <span className="text-gray-700">
                      Available in Dhaka & Chattogram
                    </span>
                  </div>
                  <div className="flex items-center space-x-4">
                    <Shield className="h-5 w-5 text-blue-600" />
                    <span className="text-gray-700">
                      Verified & Experienced Tutors
                    </span>
                  </div>
                  <div className="flex items-center space-x-4">
                    <Headphones className="h-5 w-5 text-blue-600" />
                    <span className="text-gray-700">24/7 Customer Support</span>
                  </div>
                  <div className="flex items-center space-x-4">
                    <CheckCircle className="h-5 w-5 text-blue-600" />
                    <span className="text-gray-700">
                      100% Satisfaction Guarantee
                    </span>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Office Locations Section */}
      <section className="py-20 bg-gradient-to-r from-gray-900 to-gray-800 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <div className="flex items-center justify-center mb-6">
              <div className="bg-gradient-to-r from-blue-500 to-indigo-600 p-4 rounded-xl">
                <Building2 className="h-8 w-8 text-white" />
              </div>
            </div>
            <h2 className="text-4xl font-bold mb-4">Our Office Locations</h2>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              Visit us at our modern offices in Bangladesh's major cities
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Dhaka Office */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="bg-white rounded-3xl p-8 text-gray-900 shadow-2xl hover:shadow-3xl transition-all duration-300 transform hover:-translate-y-2"
            >
              <div className="flex items-center mb-6">
                <div className="bg-gradient-to-r from-blue-500 to-indigo-600 p-4 rounded-xl">
                  <Building2 className="h-8 w-8 text-white" />
                </div>
                <div className="ml-4">
                  <h3 className="text-2xl font-bold text-gray-900">
                    Dhaka Office
                  </h3>
                  <p className="text-gray-600">Capital City Branch</p>
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex items-start space-x-4">
                  <MapPin className="w-6 h-6 text-blue-600 mt-1 flex-shrink-0" />
                  <div>
                    <p className="text-gray-700 text-lg leading-relaxed">
                      Flat B1, House 710, Road 10, Avenue 3,
                      <br />
                      Mirpur DOHS, Dhaka, Bangladesh
                    </p>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <Phone className="w-6 h-6 text-blue-600 flex-shrink-0" />
                  <p className="text-gray-700 text-lg font-semibold">
                    01329-266008
                  </p>
                </div>
                <div className="flex items-center space-x-4">
                  <Mail className="w-6 h-6 text-blue-600 flex-shrink-0" />
                  <p className="text-gray-700 text-lg">
                    tutorvista.tuitions@gmail.com
                  </p>
                </div>
              </div>
            </motion.div>

            {/* Chattogram Office */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="bg-white rounded-3xl p-8 text-gray-900 shadow-2xl hover:shadow-3xl transition-all duration-300 transform hover:-translate-y-2"
            >
              <div className="flex items-center mb-6">
                <div className="bg-gradient-to-r from-indigo-500 to-purple-600 p-4 rounded-xl">
                  <Building2 className="h-8 w-8 text-white" />
                </div>
                <div className="ml-4">
                  <h3 className="text-2xl font-bold text-gray-900">
                    Chattogram Office
                  </h3>
                  <p className="text-gray-600">Port City Branch</p>
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex items-start space-x-4">
                  <MapPin className="w-6 h-6 text-indigo-600 mt-1 flex-shrink-0" />
                  <div>
                    <p className="text-gray-700 text-lg leading-relaxed">
                      Matrichaya, Block-A, Rasulbag R/A,
                      <br />
                      Chawkbazar, Chattogram, Bangladesh
                    </p>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <Phone className="w-6 h-6 text-indigo-600 flex-shrink-0" />
                  <p className="text-gray-700 text-lg font-semibold">
                    01630-083060
                  </p>
                </div>
                <div className="flex items-center space-x-4">
                  <Mail className="w-6 h-6 text-indigo-600 flex-shrink-0" />
                  <p className="text-gray-700 text-lg">
                    tutorvista.tuitions@gmail.com
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Business Hours & Support Section */}
      <section className="py-20 bg-gradient-to-br from-blue-50 to-indigo-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {/* Business Hours */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="bg-white rounded-3xl shadow-xl p-8 border border-gray-100"
            >
              <div className="flex items-center mb-6">
                <div className="bg-gradient-to-r from-blue-500 to-indigo-600 p-4 rounded-xl">
                  <Clock className="h-8 w-8 text-white" />
                </div>
                <div className="ml-4">
                  <h3 className="text-2xl font-bold text-gray-900">
                    Business Hours
                  </h3>
                  <p className="text-gray-600">We're here when you need us</p>
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex justify-between items-center py-3 border-b border-gray-100">
                  <span className="text-gray-700 font-medium">
                    Monday - Friday:
                  </span>
                  <span className="text-gray-900 font-bold">
                    9:00 AM - 6:00 PM
                  </span>
                </div>
                <div className="flex justify-between items-center py-3 border-b border-gray-100">
                  <span className="text-gray-700 font-medium">Saturday:</span>
                  <span className="text-gray-900 font-bold">
                    10:00 AM - 4:00 PM
                  </span>
                </div>
                <div className="flex justify-between items-center py-3">
                  <span className="text-gray-700 font-medium">Sunday:</span>
                  <span className="text-red-600 font-bold">Closed</span>
                </div>
              </div>
            </motion.div>

            {/* Support Info */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="bg-gradient-to-r from-indigo-600 to-purple-700 rounded-3xl shadow-xl p-8 text-white"
            >
              <div className="flex items-center mb-6">
                <div className="bg-white bg-opacity-20 p-4 rounded-xl">
                  <Headphones className="h-8 w-8 text-white" />
                </div>
                <div className="ml-4">
                  <h3 className="text-2xl font-bold">24/7 Support</h3>
                  <p className="text-indigo-100">Always here to help</p>
                </div>
              </div>

              <div className="space-y-4">
                <p className="text-lg text-indigo-100 leading-relaxed">
                  Our dedicated support team is available round the clock to
                  assist you with any questions or concerns about our tutoring
                  services.
                </p>
                <div className="flex items-center space-x-4">
                  <CheckCircle className="h-5 w-5 text-white" />
                  <span className="text-indigo-100">Quick Response Time</span>
                </div>
                <div className="flex items-center space-x-4">
                  <CheckCircle className="h-5 w-5 text-white" />
                  <span className="text-indigo-100">Expert Guidance</span>
                </div>
                <div className="flex items-center space-x-4">
                  <CheckCircle className="h-5 w-5 text-white" />
                  <span className="text-indigo-100">
                    Personalized Solutions
                  </span>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;
