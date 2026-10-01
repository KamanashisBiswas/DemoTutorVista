import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="w-full bg-surface-container-low text-on-surface pt-16 pb-12 shadow-[0_-1px_8px_rgba(0,0,0,0.02)] border-t border-outline-variant/15">
      <div className="container mx-auto px-4 sm:px-6 lg:px-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-14 border-b border-outline-variant/20">
          {/* Brand Info & Badges */}
          <div className="lg:col-span-2 space-y-4">
            <Link to="/" className="inline-flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-primary-container flex items-center justify-center text-on-primary shadow-xs">
                <span className="material-symbols-outlined text-[20px]">school</span>
              </div>
              <span className="font-headline-sm text-headline-sm font-bold text-on-surface tracking-tight">
                Tutor<span className="text-primary-container">Bridge</span> BD
              </span>
            </Link>
            <p className="font-body-md text-body-md text-on-surface-variant max-w-sm">
              Connecting ambitious students with vetted, top-tier tutors across Bangladesh. Better education, brighter future.
            </p>
            <div className="flex flex-wrap items-center gap-2 pt-2">
              <span className="px-2.5 py-1 rounded-full bg-secondary-container text-on-secondary-container font-label-sm text-label-sm font-semibold inline-flex items-center gap-1">
                <span className="material-symbols-outlined text-[14px]">verified</span>
                Government Registered EduTech
              </span>
              <span className="px-2.5 py-1 rounded-full bg-surface-container-high text-on-surface-variant font-label-sm text-label-sm font-semibold">
                ISO 9001:2015
              </span>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-3">
            <h4 className="font-headline-sm text-headline-sm text-on-surface text-[15px] font-bold">
              Quick Links
            </h4>
            <ul className="space-y-2 font-body-sm text-body-sm text-on-surface-variant">
              <li>
                <Link to="/tutors" className="hover:text-primary-container transition-colors">
                  Find Tutors
                </Link>
              </li>
              <li>
                <Link to="/tuitions" className="hover:text-primary-container transition-colors">
                  Tuition Jobs
                </Link>
              </li>
              <li>
                <Link to="/about" className="hover:text-primary-container transition-colors">
                  How It Works
                </Link>
              </li>
              <li>
                <Link to="/about" className="hover:text-primary-container transition-colors">
                  Tutor Safety &amp; Verification
                </Link>
              </li>
              <li>
                <Link to="/tuitions" className="hover:text-primary-container transition-colors">
                  Tuition Fee Guide
                </Link>
              </li>
            </ul>
          </div>

          {/* For Tutors */}
          <div className="space-y-3">
            <h4 className="font-headline-sm text-headline-sm text-on-surface text-[15px] font-bold">
              For Tutors
            </h4>
            <ul className="space-y-2 font-body-sm text-body-sm text-on-surface-variant">
              <li>
                <Link to="/register" className="hover:text-primary-container transition-colors">
                  Join as Tutor
                </Link>
              </li>
              <li>
                <Link to="/dashboard" className="hover:text-primary-container transition-colors">
                  Tutor Dashboard
                </Link>
              </li>
              <li>
                <Link to="/about" className="hover:text-primary-container transition-colors">
                  Success Stories
                </Link>
              </li>
              <li>
                <Link to="/about" className="hover:text-primary-container transition-colors">
                  Code of Conduct
                </Link>
              </li>
              <li>
                <Link to="/contact" className="hover:text-primary-container transition-colors">
                  Tutor FAQs
                </Link>
              </li>
            </ul>
          </div>

          {/* Popular Curricula */}
          <div className="space-y-3">
            <h4 className="font-headline-sm text-headline-sm text-on-surface text-[15px] font-bold">
              Popular Curricula
            </h4>
            <ul className="space-y-2 font-body-sm text-body-sm text-on-surface-variant">
              <li>
                <Link to="/tuitions" className="hover:text-primary-container transition-colors">
                  Bangla Medium (All Classes)
                </Link>
              </li>
              <li>
                <Link to="/tuitions" className="hover:text-primary-container transition-colors">
                  English Medium &amp; Version
                </Link>
              </li>
              <li>
                <Link to="/tuitions" className="hover:text-primary-container transition-colors">
                  HSC &amp; SSC Exam Batch
                </Link>
              </li>
              <li>
                <Link to="/tuitions" className="hover:text-primary-container transition-colors">
                  Cadet College Prep
                </Link>
              </li>
              <li>
                <Link to="/tuitions" className="hover:text-primary-container transition-colors">
                  Varsity &amp; IBA Admission
                </Link>
              </li>
              <li>
                <Link to="/tuitions" className="hover:text-primary-container transition-colors">
                  ICT &amp; Spoken English
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Legal & License */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between gap-4 font-body-sm text-body-sm text-on-surface-variant">
          <div className="flex flex-wrap items-center gap-y-2 gap-x-6 text-xs sm:text-sm">
            <span>© 2026 TutorBridge BD. All rights reserved.</span>
            <Link to="/about" className="hover:text-on-surface transition-colors">
              Privacy Policy
            </Link>
            <Link to="/about" className="hover:text-on-surface transition-colors">
              Terms of Service
            </Link>
            <span className="text-on-surface-variant/80">
              Offices: Banani, Dhaka &amp; GEC, Chattogram
            </span>
          </div>
          <div className="flex items-center gap-2 text-xs sm:text-sm font-medium">
            <span className="w-2 h-2 rounded-full bg-secondary"></span>
            <span>Verified Trade License: TRAD/DNCC/024881/2024</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
