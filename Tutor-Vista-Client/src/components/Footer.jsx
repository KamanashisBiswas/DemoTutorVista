import React from "react";
import Logo from "../assets/Logo/Logo.svg";
import { Link } from "react-router-dom";
import { Mail, Phone, MapPin, ShieldCheck, Heart, ArrowUpRight } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-[#1A1D29] text-white border-t border-[#E4E6EE]/10">
      {/* Top Value Proposition Banner */}
      <div className="border-b border-white/10 bg-[#3730E0]/15 py-10 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6 text-center md:text-left">
          <div>
            <h3 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
              Ready to find the perfect tutor for your child?
            </h3>
            <p className="text-sm text-[#E4E6EE]/80 mt-1 max-w-xl">
              Post your requirements for free. Get verified teacher profiles within 24 hours.
            </p>
          </div>
          <div className="flex items-center gap-3">
            <Link
              to="/request-tutor"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-md bg-[#3730E0] hover:bg-[#2D24C4] text-white text-sm font-semibold transition-all shadow-sm"
            >
              <span>Post Tuition Request</span>
              <ArrowUpRight className="w-4 h-4" />
            </Link>
            <Link
              to="/apply-tutor"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-md bg-white/10 hover:bg-white/15 text-white text-sm font-semibold border border-white/15 transition-all"
            >
              <span>Join as a Tutor</span>
            </Link>
          </div>
        </div>
      </div>

      {/* Main Footer Links */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
          {/* Brand Info */}
          <div className="lg:col-span-2 space-y-4">
            <Link to="/" className="inline-block bg-white p-2 rounded-md">
              <img src={Logo} alt="TutorVista" className="h-8 w-auto object-contain" />
            </Link>
            <p className="text-sm text-[#E4E6EE]/70 max-w-sm leading-relaxed">
              TutorVista is Bangladesh’s premier platform connecting students with verified, skilled home and online tutors. Trusted by thousands of guardians nationwide.
            </p>
            <div className="flex items-center gap-2 text-xs text-[#0EA5A0] font-medium pt-1">
              <ShieldCheck className="w-4 h-4 shrink-0" />
              <span>100% Background-Verified Educational Credentials</span>
            </div>
          </div>

          {/* Quick Explore */}
          <div>
            <h4 className="text-sm font-bold uppercase tracking-wider text-white mb-4">
              Explore
            </h4>
            <ul className="space-y-2.5 text-sm text-[#E4E6EE]/75">
              <li>
                <Link to="/tutors" className="hover:text-[#F5A524] transition-colors">
                  Find Tutors
                </Link>
              </li>
              <li>
                <Link to="/tuition-jobs" className="hover:text-[#F5A524] transition-colors">
                  Tuition Jobs
                </Link>
              </li>
              <li>
                <Link to="/about" className="hover:text-[#F5A524] transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/founder-message" className="hover:text-[#F5A524] transition-colors">
                  Founder’s Message
                </Link>
              </li>
              <li>
                <Link to="/contact" className="hover:text-[#F5A524] transition-colors">
                  Contact Support
                </Link>
              </li>
            </ul>
          </div>

          {/* For Guardians & Tutors */}
          <div>
            <h4 className="text-sm font-bold uppercase tracking-wider text-white mb-4">
              Services & Policies
            </h4>
            <ul className="space-y-2.5 text-sm text-[#E4E6EE]/75">
              <li>
                <Link to="/request-tutor" className="hover:text-[#F5A524] transition-colors">
                  Request a Home Tutor
                </Link>
              </li>
              <li>
                <Link to="/apply-tutor" className="hover:text-[#F5A524] transition-colors">
                  Apply as a Tutor
                </Link>
              </li>
              <li>
                <Link to="/terms-and-conditions" className="hover:text-[#F5A524] transition-colors">
                  Terms & Conditions
                </Link>
              </li>
              <li>
                <Link to="/privacy-policy" className="hover:text-[#F5A524] transition-colors">
                  Privacy Policy
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Details */}
          <div>
            <h4 className="text-sm font-bold uppercase tracking-wider text-white mb-4">
              Contact Us
            </h4>
            <ul className="space-y-3 text-sm text-[#E4E6EE]/75">
              <li className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-[#F5A524] shrink-0 mt-0.5" />
                <span>Road 10, Avenue 3, Mirpur DOHS, Dhaka, Bangladesh</span>
              </li>
              <li className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-[#0EA5A0] shrink-0" />
                <span className="font-semibold text-white">01700-000000</span>
              </li>
              <li className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-[#3730E0] shrink-0" />
                <span className="break-all">support@tutorvista.com</span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Copyright & Disclaimer */}
      <div className="border-t border-white/10 py-6 px-4 bg-black/30">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-[#E4E6EE]/60">
          <p>
            &copy; {new Date().getFullYear()} TutorVista. All rights reserved. Empowering Education in Bangladesh.
          </p>
          <div className="flex items-center gap-4">
            <Link to="/privacy-policy" className="hover:text-white transition-colors">Privacy</Link>
            <span>•</span>
            <Link to="/terms-and-conditions" className="hover:text-white transition-colors">Terms</Link>
            <span>•</span>
            <span className="inline-flex items-center gap-1">
              Crafted with <Heart className="w-3.5 h-3.5 text-[#DC2626] fill-[#DC2626]" /> for learners
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
