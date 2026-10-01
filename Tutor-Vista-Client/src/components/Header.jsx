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

        {/* Desktop Nav Items (100% matched with reference image) */}
        <nav className="hidden xl:flex items-center gap-4 lg:gap-5 2xl:gap-7">
          {navItems.map((item) => (
            <NavLink
              key={item.name}
              to={item.path}
              end={item.path === "/"}
              className={({ isActive }) =>
                `text-[14px] transition-all ${
                  isActive
                    ? "px-4 py-2 rounded-xl bg-[#EEF2FF] text-primary-container font-bold shadow-2xs"
                    : "text-on-surface-variant hover:text-on-surface font-medium px-1 py-1"
                }`
              }
            >
              {item.name}
            </NavLink>
          ))}
        </nav>

        {/* Right Side: Phone Pill */}
        <div className="flex items-center gap-3">
          <a
            href="tel:+8809612888777"
            className="flex items-center gap-2 px-4 py-2 rounded-full bg-[#EEF2FF] text-on-surface font-semibold text-[13.5px] hover:bg-[#E0E7FF] transition-colors shadow-2xs"
          >
            <span className="material-symbols-outlined text-secondary text-[18px]">call</span>
            <span>+880 9612 888 777</span>
          </a>

          {/* Mobile Menu Hamburger */}
          <button
            type="button"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="xl:hidden p-2 rounded-lg text-on-surface hover:bg-surface-container transition cursor-pointer"
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
        <div className="xl:hidden border-t border-outline-variant/20 bg-surface-container-lowest px-6 py-4 space-y-2 shadow-lg">
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
  );
};

export default Header;
