import React, { useState, useEffect } from "react";
import { Menu, X, BellRing } from "lucide-react";
import { Link, NavLink } from "react-router-dom";
import Logo from "../assets/Logo/Logo.svg";
import Marquee from "react-fast-marquee";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeLink, setActiveLink] = useState("Home");

  // // Load chat widget script
  // useEffect(() => {
  //   const script = document.createElement("script");
  //   script.id = "contactus-jssdk";
  //   script.src =
  //     "https://api.theanychat.com/widget/5f17dab6-101c-3d46-b167-a7fcdd1eb01a?r=" +
  //     encodeURIComponent(window.location);

  //   // Check if script is already loaded
  //   if (!document.getElementById("contactus-jssdk")) {
  //     const firstScript = document.getElementsByTagName("script")[0];
  //     firstScript.parentNode.insertBefore(script, firstScript);
  //   }

  //   // Cleanup function
  //   return () => {
  //     const existingScript = document.getElementById("contactus-jssdk");
  //     if (existingScript) {
  //       existingScript.remove();
  //     }
  //   };
  // }, []);

  // Load Chatwoot chat widget script
  useEffect(() => {
    // Check if already loaded
    if (window.chatwootSDK) {
      return;
    }

    // Load Chatwoot chat widget
    const BASE_URL = "https://app.unichat.com.bd";
    const g = document.createElement("script");
    g.src = BASE_URL + "/packs/js/sdk.js";
    g.async = true;
    g.onload = function () {
      if (window.chatwootSDK) {
        window.chatwootSDK.run({
          websiteToken: "HcgNFvHYigZwFBA5FcqwGGjh",
          baseUrl: BASE_URL,
        });
      }
    };
    g.onerror = function () {
      console.error("Failed to load Chatwoot chat widget");
    };
    document.head.appendChild(g);
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleLinkClick = (linkName) => {
    setActiveLink(linkName);
  };

  const navItems = [
    { name: "Home", path: "/" },
    { name: "About US", path: "/about" },
    { name: "Request Tutor", path: "/request-tutor" },
    { name: "Apply Tutor", path: "/apply-tutor" },
    { name: "Contact", path: "/contact" },
    { name: "Founder’s Message", path: "/founder-message" },
  ];

  return (
    <>
      {/* Move entire header to be sticky, including marquee */}
      <header className="sticky top-0 z-50 font-dmsans">
        {/* Marquee section now inside header */}
        <div className="bg-gradient-to-r from-blue-600 via-blue-500 to-blue-600 text-white py-1.5 relative overflow-hidden shadow-md">
          <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmZmZmYiIGZpbGwtb3BhY2l0eT0iMC4xIj48cGF0aCBkPSJNMzYgMzRjMC0yLjIxLTEuNzktNC00LTRzLTQgMS43OS00IDQgMS43OSA0IDQgNCAzLjk5LTEuNzUgNC0zLjk4di0uMDJtMC0xMGMwLTIuMjEtMS43OS00LTQtNHMtNCAxLjc5LTQgNCAxLjc5IDQgNCA0IDMuOTktMS43NSA0LTMuOTh2LS4wMiIvPjwvZz48L2c+PC9zdmc+')] opacity-20"></div>
          <div className="flex items-center">
            <div className="hidden md:flex items-center space-x-2 px-4 border-r border-blue-400 mr-4">
              <BellRing className="h-5 w-5 animate-pulse text-yellow-300" />
              <span className="font-semibold whitespace-nowrap">
                SPECIAL OFFER
              </span>
            </div>
            <Marquee
              gradient={false}
              speed={50}
              pauseOnHover={true}
              className="text-sm md:text-base font-medium"
            >
              <div className="flex items-center space-x-8">
                <span>
                  🔥{" "}
                  <b>
                    Refer a tutor for any tuition and get 10% as referral bonus
                    after service charge (T&C applicable)
                  </b>
                </span>
              </div>
            </Marquee>
          </div>
        </div>

        {/* Main navigation section */}
        <div className="bg-white shadow-sm">
          <div className="w-full mx-auto px-4 sm:px-6 lg:px-8 xl:px-12 2xl:px-16">
            <div className="flex items-center justify-between h-16 relative">
              {/* Logo */}
              <Link
                to="/"
                className="flex items-center space-x-2 flex-shrink-0"
              >
                <img
                  src={Logo}
                  alt="Tutor Vista Logo"
                  className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 object-contain"
                />
                <span className="text-lg sm:text-xl font-bold text-gray-800">
                  Tutor Vista
                </span>
              </Link>

              {/* Desktop Navigation - Properly Centered */}
              <nav className="hidden lg:flex absolute left-1/2 transform -translate-x-1/2 top-1/2 -translate-y-1/2">
                <div className="flex items-center space-x-8">
                  {navItems.map((item, index) => (
                    <NavLink
                      key={index}
                      to={item.path}
                      onClick={() => handleLinkClick(item.name)}
                      className={({ isActive }) =>
                        `px-3 py-2 text-base font-medium transition duration-200 whitespace-nowrap ${
                          isActive
                            ? "text-blue-600 font-semibold"
                            : "text-gray-700 hover:text-blue-600"
                        }`
                      }
                    >
                      {item.name}
                    </NavLink>
                  ))}
                </div>
              </nav>

              {/* Empty div for balance (optional) */}
              <div className="hidden lg:block w-32"></div>

              {/* Mobile menu button */}
              <div className="lg:hidden">
                <button
                  onClick={toggleMenu}
                  className="p-2 rounded-md text-gray-700 hover:text-blue-600 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500 transition"
                  aria-expanded={isMenuOpen}
                >
                  <span className="sr-only">Toggle menu</span>
                  {isMenuOpen ? (
                    <X className="h-6 w-6" />
                  ) : (
                    <Menu className="h-6 w-6" />
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Mobile menu stays the same... */}
        <div
          className={`lg:hidden fixed top-0 left-0 h-full w-64 bg-white border-r border-gray-200 shadow-lg transform transition-transform duration-300 z-50 ${
            isMenuOpen ? "translate-x-0" : "-translate-x-full"
          }`}
        >
          <div className="flex items-center justify-between px-4 h-16 border-b border-gray-200">
            <div className="flex items-center space-x-2">
              <img
                src={Logo}
                alt="Tutor Vista Logo"
                className="w-8 h-8 object-contain"
              />
              <span className="text-lg font-bold text-gray-800">
                Tutor Vista
              </span>
            </div>
            <button
              onClick={toggleMenu}
              className="text-gray-700 hover:text-blue-600 focus:outline-none"
            >
              <X className="h-6 w-6" />
            </button>
          </div>
          <div className="px-4 py-4 space-y-2">
            {navItems.map((item, index) => (
              <NavLink
                key={index}
                to={item.path}
                onClick={() => handleLinkClick(item.name)}
                className={({ isActive }) =>
                  `block px-3 py-2 rounded-md text-base font-medium transition duration-200 ${
                    isActive
                      ? "text-blue-600 bg-blue-50 font-semibold"
                      : "text-gray-700 hover:text-blue-600 hover:bg-gray-50"
                  }`
                }
              >
                {item.name}
              </NavLink>
            ))}
            {/* Only mobile: Additional Links */}
            <NavLink
              to="/tutors"
              onClick={() => handleLinkClick("Available Tutor")}
              className={({ isActive }) =>
                `block px-3 py-2 rounded-md text-base font-medium transition duration-200 ${
                  isActive
                    ? "text-blue-600 bg-blue-50 font-semibold"
                    : "text-gray-700 hover:text-blue-600 hover:bg-gray-50"
                }`
              }
            >
              Available Tutor
            </NavLink>
            <NavLink
              to="/tuition-jobs"
              onClick={() => handleLinkClick("Available Tuition")}
              className={({ isActive }) =>
                `block px-3 py-2 rounded-md text-base font-medium transition duration-200 ${
                  isActive
                    ? "text-blue-600 bg-blue-50 font-semibold"
                    : "text-gray-700 hover:text-blue-600 hover:bg-gray-50"
                }`
              }
            >
              Available Tuition
            </NavLink>
          </div>
        </div>

        {/* Backdrop */}
        {isMenuOpen && (
          <div
            className="fixed inset-0 bg-black bg-opacity-30 z-40 lg:hidden"
            onClick={toggleMenu}
          />
        )}
      </header>
    </>
  );
};

export default Header;
