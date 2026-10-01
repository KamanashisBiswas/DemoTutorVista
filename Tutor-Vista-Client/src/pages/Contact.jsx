import React, { useEffect, useState } from "react";
import ApiService from "../services/api";
import { toast } from "react-toastify";
import { motion } from "framer-motion";
import Button from "../components/Common/Button";
import CommonSectionHeading from "../components/Common/CommonSectionHeading";
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  MessageCircle,
  User,
  Building2,
  Send,
  CheckCircle2,
  ShieldCheck,
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

  const handleSubmit = async (e) => {
    if (e) e.preventDefault();
    if (!formData.name.trim() || !formData.phoneNumber.trim()) {
      toast.warn("Please provide your name and phone number");
      return;
    }

    if (!formData.agreeToTerms) {
      toast.warn("You must agree to terms and conditions");
      return;
    }

    setLoading(true);
    try {
      const res = await ApiService.sendMessage({
        name: formData.name,
        phoneNumber: formData.phoneNumber,
        message: formData.message,
        agreeTerms: formData.agreeToTerms,
      });

      toast.success(res?.message || "Message submitted successfully!");

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
        toast.error(error.response.data.errors[0].message);
      } else {
        const errorMsg =
          error.response?.data?.message || "Something went wrong";
        toast.error(errorMsg);
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    window.scrollTo(0, 0);
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({
      event: "contact_us",
    });
  }, []);

  return (
    <div className="min-h-screen bg-[#F7F8FB] text-[#1A1D29] font-sans">
      {/* Header Banner */}
      <section className="py-12 sm:py-16 bg-white border-b border-[#E4E6EE]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <CommonSectionHeading title="Contact" highlight="TutorBridge" />
          <p className="mt-3 text-sm sm:text-base text-[#5B5F73] max-w-2xl mx-auto">
            Have questions about finding a tutor or applying for tuition jobs? Reach out to our dedicated support helpline.
          </p>

          {/* Quick Metrics */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-3xl mx-auto mt-8">
            <div className="p-3 bg-[#F7F8FB] border border-[#E4E6EE] rounded-sm text-center">
              <div className="text-xl font-bold text-[#3730E0]">27,000+</div>
              <div className="text-xs text-[#5B5F73] mt-0.5">Students Guided</div>
            </div>
            <div className="p-3 bg-[#F7F8FB] border border-[#E4E6EE] rounded-sm text-center">
              <div className="text-xl font-bold text-[#3730E0]">39,000+</div>
              <div className="text-xs text-[#5B5F73] mt-0.5">Verified Tutors</div>
            </div>
            <div className="p-3 bg-[#F7F8FB] border border-[#E4E6EE] rounded-sm text-center">
              <div className="text-xl font-bold text-[#3730E0]">24/7</div>
              <div className="text-xs text-[#5B5F73] mt-0.5">Support Desk</div>
            </div>
            <div className="p-3 bg-[#F7F8FB] border border-[#E4E6EE] rounded-sm text-center">
              <div className="text-xl font-bold text-[#3730E0]">Dhaka & CTG</div>
              <div className="text-xs text-[#5B5F73] mt-0.5">Major Hubs</div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content Section */}
      <section className="py-12 sm:py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Left Column: Form */}
            <div className="lg:col-span-7 bg-white rounded-lg shadow-card border border-[#E4E6EE] p-6 sm:p-8">
              <div className="flex items-center gap-3 mb-6 pb-4 border-b border-[#E4E6EE]">
                <div className="w-9 h-9 rounded-sm bg-[#EEEDFD] text-[#3730E0] flex items-center justify-center">
                  <MessageCircle className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-base sm:text-lg font-bold text-[#1A1D29]">
                    Send us a Message
                  </h3>
                  <p className="text-xs text-[#5B5F73]">
                    Our support team will get back to you within 24 hours.
                  </p>
                </div>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-xs font-semibold text-[#1A1D29] mb-1.5">
                    Full Name <span className="text-[#DC2626]">*</span>
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      placeholder="e.g., Kamanashis Biswas"
                      className="w-full px-3.5 py-2.5 pl-10 text-xs sm:text-sm border border-[#E4E6EE] rounded-sm text-[#1A1D29] placeholder-[#5B5F73]/50 focus:border-[#3730E0] focus:ring-2 focus:ring-[#3730E0]/15"
                      required
                    />
                    <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#5B5F73]" />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#1A1D29] mb-1.5">
                    Phone Number <span className="text-[#DC2626]">*</span>
                  </label>
                  <div className="relative">
                    <input
                      type="tel"
                      name="phoneNumber"
                      value={formData.phoneNumber}
                      onChange={handleInputChange}
                      placeholder="01700-000000"
                      className="w-full px-3.5 py-2.5 pl-10 text-xs sm:text-sm border border-[#E4E6EE] rounded-sm text-[#1A1D29] placeholder-[#5B5F73]/50 focus:border-[#3730E0] focus:ring-2 focus:ring-[#3730E0]/15"
                      required
                    />
                    <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#5B5F73]" />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#1A1D29] mb-1.5">
                    Your Message
                  </label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    rows={4}
                    placeholder="Tell us about your tuition queries, requirement details, or general questions..."
                    className="w-full px-3.5 py-2.5 text-xs sm:text-sm border border-[#E4E6EE] rounded-sm text-[#1A1D29] placeholder-[#5B5F73]/50 focus:border-[#3730E0] focus:ring-2 focus:ring-[#3730E0]/15 resize-vertical"
                  />
                </div>

                <div className="flex items-start pt-1">
                  <input
                    type="checkbox"
                    id="contactAgreeTerms"
                    name="agreeToTerms"
                    checked={formData.agreeToTerms}
                    onChange={handleInputChange}
                    className="mt-0.5 w-4 h-4 text-[#3730E0] border-[#E4E6EE] rounded focus:ring-[#3730E0]"
                  />
                  <label
                    htmlFor="contactAgreeTerms"
                    className="ml-2.5 text-xs text-[#5B5F73] cursor-pointer"
                  >
                    I agree to the{" "}
                    <a href="/terms-and-conditions" className="text-[#3730E0] underline font-medium">
                      Terms of Service
                    </a>{" "}
                    and{" "}
                    <a href="/privacy-policy" className="text-[#3730E0] underline font-medium">
                      Privacy Policy
                    </a>
                    .
                  </label>
                </div>

                <div className="pt-2">
                  <Button
                    type="submit"
                    variant="primary"
                    size="md"
                    disabled={!formData.agreeToTerms || loading}
                    isLoading={loading}
                    iconLeft={Send}
                    className="w-full sm:w-auto px-8"
                  >
                    {loading ? "Sending..." : "Send Message"}
                  </Button>
                </div>
              </form>
            </div>

            {/* Right Column: Contact Cards & Trust */}
            <div className="lg:col-span-5 space-y-6">
              {/* Quick Contact Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="bg-white border border-[#E4E6EE] p-5 rounded-md shadow-card">
                  <div className="w-8 h-8 rounded-sm bg-[#EEEDFD] text-[#3730E0] flex items-center justify-center mb-3">
                    <Phone className="w-4 h-4" />
                  </div>
                  <h4 className="text-xs font-bold uppercase tracking-wider text-[#5B5F73]">
                    Call Helpline
                  </h4>
                  <p className="text-sm font-bold text-[#1A1D29] mt-1">
                    01700-000000
                  </p>
                </div>

                <div className="bg-white border border-[#E4E6EE] p-5 rounded-md shadow-card">
                  <div className="w-8 h-8 rounded-sm bg-[#EEEDFD] text-[#3730E0] flex items-center justify-center mb-3">
                    <Mail className="w-4 h-4" />
                  </div>
                  <h4 className="text-xs font-bold uppercase tracking-wider text-[#5B5F73]">
                    Email Us
                  </h4>
                  <p className="text-xs font-bold text-[#1A1D29] mt-1 truncate">
                    support@tutorbridge.com
                  </p>
                </div>
              </div>

              {/* Working Hours */}
              <div className="bg-white border border-[#E4E6EE] p-6 rounded-md shadow-card">
                <div className="flex items-center gap-2.5 mb-4 pb-3 border-b border-[#E4E6EE]">
                  <Clock className="w-4 h-4 text-[#3730E0]" />
                  <h4 className="text-sm font-bold text-[#1A1D29]">
                    Support Operating Hours
                  </h4>
                </div>
                <div className="space-y-2.5 text-xs text-[#5B5F73]">
                  <div className="flex justify-between items-center">
                    <span>Saturday – Thursday:</span>
                    <strong className="text-[#1A1D29]">9:00 AM – 9:00 PM</strong>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>Friday (Emergency Hotline):</span>
                    <strong className="text-[#1A1D29]">10:00 AM – 6:00 PM</strong>
                  </div>
                  <div className="flex justify-between items-center pt-2 border-t border-[#E4E6EE]">
                    <span>Emergency Messenger / WhatsApp:</span>
                    <strong className="text-[#16A34A]">24/7 Available</strong>
                  </div>
                </div>
              </div>

              {/* Trust Features */}
              <div className="bg-white border border-[#E4E6EE] p-6 rounded-md shadow-card space-y-3">
                <div className="flex items-center gap-2.5">
                  <ShieldCheck className="w-4 h-4 text-[#3730E0]" />
                  <span className="text-xs text-[#1A1D29] font-medium">
                    Government Licensed Educational Agency
                  </span>
                </div>
                <div className="flex items-center gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-[#3730E0]" />
                  <span className="text-xs text-[#1A1D29] font-medium">
                    100% Background-Checked Tutors
                  </span>
                </div>
                <div className="flex items-center gap-2.5">
                  <Headphones className="w-4 h-4 text-[#3730E0]" />
                  <span className="text-xs text-[#1A1D29] font-medium">
                    Personalized Counselor Assistance
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Office Locations Section */}
      <section className="py-12 sm:py-16 bg-white border-t border-[#E4E6EE]">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <h3 className="text-xl sm:text-2xl font-bold text-[#1A1D29]">
              Our Office <span className="text-[#3730E0]">Locations</span>
            </h3>
            <p className="text-xs sm:text-sm text-[#5B5F73] mt-1">
              Visit our customer support centers in Dhaka and Chattogram
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {/* Dhaka Office */}
            <div className="bg-[#F7F8FB] border border-[#E4E6EE] rounded-md p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-8 h-8 rounded-sm bg-[#EEEDFD] text-[#3730E0] flex items-center justify-center">
                  <Building2 className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-[#1A1D29]">
                    Dhaka Corporate Office
                  </h4>
                  <p className="text-[11px] text-[#5B5F73]">Mirpur DOHS, Dhaka</p>
                </div>
              </div>
              <div className="space-y-2 text-xs text-[#5B5F73]">
                <div className="flex items-start gap-2">
                  <MapPin className="w-3.5 h-3.5 text-[#3730E0] mt-0.5 flex-shrink-0" />
                  <span>Road 10, Avenue 3, Mirpur DOHS, Dhaka, Bangladesh</span>
                </div>
                <div className="flex items-center gap-2">
                  <Phone className="w-3.5 h-3.5 text-[#3730E0] flex-shrink-0" />
                  <span className="font-semibold text-[#1A1D29]">01700-000000</span>
                </div>
                <div className="flex items-center gap-2">
                  <Mail className="w-3.5 h-3.5 text-[#3730E0] flex-shrink-0" />
                  <span>support@tutorbridge.com</span>
                </div>
              </div>
            </div>

            {/* Chattogram Office */}
            <div className="bg-[#F7F8FB] border border-[#E4E6EE] rounded-md p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-8 h-8 rounded-sm bg-[#EEEDFD] text-[#3730E0] flex items-center justify-center">
                  <Building2 className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-[#1A1D29]">
                    Chattogram Regional Branch
                  </h4>
                  <p className="text-[11px] text-[#5B5F73]">Chawkbazar, Chattogram</p>
                </div>
              </div>
              <div className="space-y-2 text-xs text-[#5B5F73]">
                <div className="flex items-start gap-2">
                  <MapPin className="w-3.5 h-3.5 text-[#3730E0] mt-0.5 flex-shrink-0" />
                  <span>Block-A, Rasulbag R/A, Chawkbazar, Chattogram, Bangladesh</span>
                </div>
                <div className="flex items-center gap-2">
                  <Phone className="w-3.5 h-3.5 text-[#3730E0] flex-shrink-0" />
                  <span className="font-semibold text-[#1A1D29]">01700-000000</span>
                </div>
                <div className="flex items-center gap-2">
                  <Mail className="w-3.5 h-3.5 text-[#3730E0] flex-shrink-0" />
                  <span>support@tutorbridge.com</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;
