import React, { useState, useEffect } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    setIsMenuOpen(false);
  }, [location.pathname]);

  const navItems = [
    { name: "Home", path: "/" },
    { name: "Find Tutors", path: "/tutors" },
    { name: "Tuition Jobs", path: "/tuition-jobs" },
    { name: "Request Tutor", path: "/request-tutor" },
    { name: "Apply Tutor", path: "/apply-tutor" },
    { name: "About Us", path: "/about" },
    { name: "Founder's Message", path: "/founder-message" },
    { name: "Contact", path: "/contact" },
  ];

  return (
    <>
      <div id="promotional-announcement-bar" className="w-full bg-[#1e1b4b] text-white border-b border-indigo-900/60 z-50 relative py-2 px-4 text-xs font-medium">
        <div className="container mx-auto px-4 sm:px-6 lg:px-12 flex items-center justify-between gap-4">
          <div className="flex items-center gap-2.5 overflow-hidden flex-1 min-w-0">
            <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-indigo-500/20 text-indigo-200 border border-indigo-400/30 whitespace-nowrap shrink-0">
              <svg className="w-3.5 h-3.5 text-amber-300" fill="currentColor" viewBox="0 0 20 20">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
              </svg>
              Announcement
            </span>
            <marquee
              className="text-indigo-100 text-xs flex-1 min-w-0"
              behavior="scroll"
              direction="left"
              scrollamount="6"
              onMouseEnter={(e) => e.target.stop()}
              onMouseLeave={(e) => e.target.start()}
            >
              <span className="font-semibold text-white">Bangladesh's Premier Tuition Network:</span> 100% Free Tutor Registration • Earn up to ৳35,000+/month • Top Scholars from BUET/DU/Medical • 0% Advance Deposit • 24/7 Academic Helpline Active
            </marquee>
          </div>
          <div className="flex items-center gap-4 shrink-0 text-xs">
            <a href="tel:+8809612888777" className="flex items-center gap-1.5 text-indigo-200 hover:text-white transition-colors">
              <svg className="w-3.5 h-3.5 text-indigo-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path>
              </svg>
              <span className="hidden sm:inline text-indigo-300">Tutor Helpline:</span>
              <span className="font-semibold text-white">+880 9612 888 777</span>
            </a>
          </div>
        </div>
      </div>
      <header className="sticky top-0 w-full z-50 bg-surface-container-lowest/95 backdrop-blur-xl shadow-[0_1px_8px_rgba(0,0,0,0.03)] border-b border-outline-variant/15">
      <div className="h-20 container mx-auto px-4 sm:px-6 lg:px-12 flex items-center justify-between gap-4">
        {/* Brand Logo & Subtitle */}
        <Link to="/" className="flex items-center gap-2.5 shrink-0">
          <div className="w-10 h-10 rounded-xl bg-primary-container flex items-center justify-center text-on-primary shadow-xs">
            <span className="material-symbols-outlined text-[22px]">school</span>
          </div>
          <div className="flex flex-col">
            <div className="flex items-center gap-1.5">
              <span className="font-bold text-[18px] text-on-surface tracking-tight leading-tight">
                Tutor<span className="text-primary-container">Bridge</span>
              </span>
              <span className="px-1.5 py-0.5 rounded-full bg-secondary-container text-on-secondary-container font-bold text-[10.5px] tracking-wide leading-none">
                BD
              </span>
            </div>
            <span className="text-[11px] text-on-surface-variant font-medium leading-tight">
              Premier Tuition Network
            </span>
          </div>
        </Link>

        {/* Desktop Nav Items */}
        <nav className="hidden lg:flex items-center gap-2 lg:gap-3 xl:gap-5">
          {navItems.map((item) => (
            <NavLink
              key={item.name}
              to={item.path}
              end={item.path === "/"}
              className={({ isActive }) =>
                `text-[14px] transition-all whitespace-nowrap ${
                  isActive
                    ? "px-3.5 py-2 rounded-xl bg-[#EEF2FF] text-primary-container font-bold shadow-2xs"
                    : "text-on-surface-variant hover:text-on-surface font-medium px-2 py-1"
                }`
              }
            >
              {item.name}
            </NavLink>
          ))}
        </nav>

        {/* Mobile Menu Hamburger */}
        <div className="lg:hidden flex items-center">
          <button
            type="button"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="p-2 rounded-lg text-on-surface hover:bg-surface-container transition cursor-pointer"
            aria-label="Toggle Navigation"
          >
            <span className="material-symbols-outlined text-[24px]">
              {isMenuOpen ? "close" : "menu"}
            </span>
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {isMenuOpen && (
        <div className="lg:hidden border-t border-outline-variant/20 bg-surface-container-lowest px-6 py-4 space-y-2 shadow-lg">
          {navItems.map((item) => (
            <NavLink
              key={item.name}
              to={item.path}
              end={item.path === "/"}
              onClick={() => setIsMenuOpen(false)}
              className={({ isActive }) =>
                `block py-2 text-[15px] font-medium transition-colors ${
                  isActive
                    ? "text-primary-container font-bold pl-2 border-l-2 border-primary-container"
                    : "text-on-surface hover:text-primary-container"
                }`
              }
            >
              {item.name}
            </NavLink>
          ))}
          <div className="pt-3 border-t border-outline-variant/20 flex flex-col gap-2">
            <Link
              to="/tutor-portal"
              onClick={() => setIsMenuOpen(false)}
              className="py-2.5 text-center font-semibold text-[14px] text-primary-container bg-indigo-50 border border-indigo-200 rounded-xl shadow-xs flex items-center justify-center gap-1.5"
            >
              <span className="material-symbols-outlined text-[18px]">account_circle</span>
              <span>Tutor Portal Login</span>
            </Link>
            <Link
              to="/request-tutor"
              onClick={() => setIsMenuOpen(false)}
              className="py-2.5 text-center font-semibold text-[14px] text-on-primary bg-primary-container rounded-xl shadow-xs"
            >
              Hire a Tutor Now
            </Link>
          </div>
        </div>
      )}
    </header>
    </>
  );
};

export default Header;
