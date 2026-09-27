import React, { useState, useEffect } from "react";
import { Menu, X, Sparkles, PhoneCall, GraduationCap, ChevronRight } from "lucide-react";
import { Link, NavLink, useLocation } from "react-router-dom";
import Logo from "../assets/Logo/Logo.svg";
import Marquee from "react-fast-marquee";
import { Button } from "./ui/Button";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  // Close mobile drawer on route navigation
  useEffect(() => {
    setIsMenuOpen(false);
  }, [location.pathname]);

  const navItems = [
    { name: "Home", path: "/" },
    { name: "Find Tutors", path: "/tutors" },
    { name: "Tuition Jobs", path: "/tuition-jobs" },
    { name: "Request Tutor", path: "/request-tutor" },
    { name: "Apply as Tutor", path: "/apply-tutor" },
    { name: "About Us", path: "/about" },
    { name: "Founder's Message", path: "/founder-message" },
    { name: "Contact", path: "/contact" },
  ];

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-[#E4E6EE] shadow-xs">
      {/* Top Announcement Bar */}
      <div className="bg-[#3730E0] text-white py-1.5 px-4 text-xs font-medium">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-2 shrink-0 pr-4">
            <span className="inline-flex items-center gap-1 bg-[#2D24C4] px-2 py-0.5 rounded-full text-[11px] font-semibold text-[#F5A524]">
              <Sparkles className="h-3 w-3" />
              <span>OFFER</span>
            </span>
          </div>

          <div className="flex-1 overflow-hidden">
            <Marquee gradient={false} speed={45} pauseOnHover={true}>
              <div className="flex items-center space-x-12 pr-12 text-xs">
                <span>
                  🎓 Verified & Expert Tutors available in Dhaka, Chittagong & all major divisions.
                </span>
                <span>
                  ✨ Refer a qualified tutor or student and earn up to 10% referral bonus!
                </span>
                <span>
                  📞 Free Guardian Consultation & Free Demo Class Guarantee!
                </span>
              </div>
            </Marquee>
          </div>

          <div className="hidden lg:flex items-center gap-2 pl-4 border-l border-white/20 text-xs">
            <PhoneCall className="w-3 h-3 text-[#F5A524]" />
            <span className="text-white/90">Helpline:</span>
            <span className="font-semibold text-white">01700-000000</span>
          </div>
        </div>
      </div>

      {/* Main Navbar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-18">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2.5 shrink-0 py-2">
            <img
              src={Logo}
              alt="TutorVista"
              className="h-9 w-auto object-contain transition-transform duration-200 hover:scale-105"
            />
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden xl:flex items-center space-x-1">
            {navItems.map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                className={({ isActive }) =>
                  `px-3 py-2 text-sm font-medium rounded-md transition-all duration-150 ${
                    isActive
                      ? "text-[#3730E0] bg-[#EEEDFD] font-semibold"
                      : "text-[#1A1D29] hover:text-[#3730E0] hover:bg-[#F7F8FB]"
                  }`
                }
              >
                {item.name}
              </NavLink>
            ))}
          </nav>

          {/* Right Header CTAs */}
          <div className="hidden lg:flex items-center space-x-3">
            <Link to="/request-tutor">
              <Button variant="primary" size="md" iconRight={ChevronRight}>
                Request a Tutor
              </Button>
            </Link>
          </div>

          {/* Mobile Menu Trigger */}
          <div className="xl:hidden flex items-center space-x-2">
            <Link to="/request-tutor" className="sm:inline-block hidden">
              <Button variant="primary" size="sm">
                Request Tutor
              </Button>
            </Link>
            <button
              type="button"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="p-2 rounded-md text-[#1A1D29] hover:text-[#3730E0] hover:bg-[#F7F8FB] focus:outline-none focus:ring-2 focus:ring-[#3730E0]/20 transition"
              aria-label="Toggle Navigation Menu"
            >
              {isMenuOpen ? (
                <X className="h-6 w-6 text-[#DC2626]" />
              ) : (
                <Menu className="h-6 w-6 text-[#1A1D29]" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Drawer */}
      {isMenuOpen && (
        <div className="xl:hidden fixed inset-0 top-[102px] z-50 flex">
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-black/40 backdrop-blur-xs transition-opacity"
            onClick={() => setIsMenuOpen(false)}
          />

          {/* Drawer content */}
          <div className="relative w-4/5 max-w-sm bg-white h-full shadow-2xl flex flex-col justify-between p-6 overflow-y-auto animate-slide-up">
            <div className="space-y-1">
              <div className="pb-3 mb-3 border-b border-[#E4E6EE] flex items-center justify-between">
                <span className="text-xs font-semibold uppercase tracking-wider text-[#5B5F73]">
                  Navigation Menu
                </span>
                <span className="text-xs text-[#0EA5A0] font-medium flex items-center gap-1">
                  <GraduationCap className="w-3.5 h-3.5" />
                  Verified Platform
                </span>
              </div>

              {navItems.map((item) => (
                <NavLink
                  key={item.path}
                  to={item.path}
                  className={({ isActive }) =>
                    `flex items-center justify-between px-3.5 py-2.5 rounded-md text-sm font-medium transition-all ${
                      isActive
                        ? "text-[#3730E0] bg-[#EEEDFD] font-semibold"
                        : "text-[#1A1D29] hover:text-[#3730E0] hover:bg-[#F7F8FB]"
                    }`
                  }
                >
                  <span>{item.name}</span>
                  <ChevronRight className="w-4 h-4 text-[#5B5F73]/50" />
                </NavLink>
              ))}
            </div>

            {/* Mobile Drawer Bottom Actions */}
            <div className="pt-6 border-t border-[#E4E6EE] space-y-2.5">
              <Link to="/request-tutor" className="block w-full">
                <Button variant="primary" size="md" fullWidth>
                  Request a Tutor
                </Button>
              </Link>
              <Link to="/apply-tutor" className="block w-full">
                <Button variant="secondary" size="md" fullWidth>
                  Apply as a Tutor
                </Button>
              </Link>
              <div className="p-3 bg-[#F7F8FB] rounded-md text-center mt-3">
                <p className="text-xs text-[#5B5F73]">Need immediate assistance?</p>
                <p className="text-xs font-bold text-[#3730E0] mt-0.5">📞 01700-000000</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
