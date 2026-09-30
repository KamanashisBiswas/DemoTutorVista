// src/pages/LoginPage.jsx
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Logo from "../assets/Logo.svg";
import {
  AlertCircle,
  Eye,
  EyeOff,
  Mail,
  Lock,
  ShieldCheck,
  ArrowRight,
  CheckCircle2,
  LockKeyhole,
} from "lucide-react";
import { useAuth } from "../context/AuthContext";

const LoginPage = () => {
  const [loginForm, setLoginForm] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [animateIn, setAnimateIn] = useState(false);

  const { login } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => setAnimateIn(true), 80);
    return () => clearTimeout(timer);
  }, []);

  const validateForm = () => {
    if (!loginForm.email.trim()) {
      setError("Please enter your admin email address.");
      return false;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(loginForm.email.trim())) {
      setError("Please enter a valid email address format.");
      return false;
    }
    if (!loginForm.password) {
      setError("Please enter your password.");
      return false;
    }
    return true;
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setLoading(true);
    setError("");

    try {
      const result = await login(loginForm);
      if (result.success) {
        navigate("/");
      } else {
        setError(result.error || "Invalid email or password. Please try again.");
      }
    } catch {
      setError("Unable to connect to the authentication server. Please check your network.");
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    setLoginForm({ ...loginForm, [e.target.name]: e.target.value });
    if (error) setError("");
  };

  return (
    <div className="min-h-screen bg-[#F7F8FB] flex items-center justify-center p-4 sm:p-6 lg:p-8">
      {/* Container Card with Split Layout */}
      <div
        className={`w-full max-w-5xl bg-white rounded-2xl border border-[#E4E6EE] shadow-md overflow-hidden grid grid-cols-1 lg:grid-cols-12 transition-all duration-500 ease-out ${
          animateIn
            ? "opacity-100 translate-y-0"
            : "opacity-0 translate-y-4"
        }`}
      >
        {/* Left Side: Brand Story & Security Panel (Desktop) */}
        <div className="lg:col-span-5 bg-[#3730E0] text-white p-8 sm:p-10 lg:p-12 flex flex-col justify-between relative overflow-hidden">
          {/* Subtle Background Glow */}
          <div className="absolute top-0 right-0 w-72 h-72 bg-white/10 rounded-full blur-3xl pointer-events-none -mr-20 -mt-20" />
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-[#0EA5A0]/20 rounded-full blur-2xl pointer-events-none -ml-20 -mb-20" />

          {/* Top Brand & Access Badge */}
          <div className="relative z-10">
            <div className="inline-flex items-center gap-2 bg-white/15 backdrop-blur-md px-3.5 py-1.5 rounded-full text-xs font-semibold tracking-wide text-white border border-white/20 mb-8">
              <ShieldCheck className="w-4 h-4 text-[#0EA5A0]" />
              <span>Admin Management Gateway</span>
            </div>

            <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight leading-snug mb-4">
              Empowering Education Through Verified Mentorship
            </h2>

            <p className="text-sm text-white/80 leading-relaxed">
              Unified administrative portal for managing tutor applications, tuition job dispatches, user accounts, and platform governance.
            </p>
          </div>

          {/* Feature Highlights */}
          <div className="relative z-10 my-8 space-y-4">
            {[
              "Verified Tutor Screening & Quality Assurance",
              "Real-Time Tuition Matching & Dispatch",
              "Role-Based Access Control & Safe Operations",
            ].map((feature, idx) => (
              <div key={idx} className="flex items-center gap-3 text-xs sm:text-sm text-white/90">
                <div className="w-5 h-5 rounded-full bg-white/15 flex items-center justify-center flex-shrink-0">
                  <CheckCircle2 className="w-3.5 h-3.5 text-white" />
                </div>
                <span>{feature}</span>
              </div>
            ))}
          </div>

          {/* Security Footer Note */}
          <div className="relative z-10 pt-6 border-t border-white/15 flex items-center gap-2 text-xs text-white/70">
            <LockKeyhole className="w-3.5 h-3.5 flex-shrink-0 text-white/90" />
            <span>256-Bit SSL Encrypted Administrative Session</span>
          </div>
        </div>

        {/* Right Side: Authentication Form */}
        <div className="lg:col-span-7 p-8 sm:p-10 lg:p-12 flex flex-col justify-center bg-white">
          <div className="max-w-md w-full mx-auto">
            {/* Header */}
            <div className="mb-8">
              <div className="flex items-center justify-between mb-6">
                <img src={Logo} alt="TutorVista" className="h-9 w-auto" />
                <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-semibold bg-[#F7F8FB] text-[#3730E0] border border-[#E4E6EE]">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#16A34A] animate-pulse"></span>
                  Portal v2.0
                </span>
              </div>

              <h1 className="text-2xl sm:text-3xl font-bold text-[#1A1D29] tracking-tight">
                Sign In
              </h1>
              <p className="text-sm text-[#5B5F73] mt-1.5">
                Enter your authorized credentials to access the TutorVista dashboard.
              </p>
            </div>

            {/* Error Banner */}
            {error && (
              <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-xl flex items-start gap-3 animate-fade-in">
                <AlertCircle className="w-5 h-5 text-[#DC2626] mt-0.5 flex-shrink-0" />
                <div className="text-xs sm:text-sm text-[#DC2626] leading-relaxed">
                  {error}
                </div>
              </div>
            )}

            {/* Form */}
            <form onSubmit={handleLogin} className="space-y-5" noValidate>
              {/* Email Address */}
              <div>
                <label className="block text-xs font-semibold text-[#1A1D29] uppercase tracking-wider mb-2">
                  Admin Email Address
                </label>
                <div className="relative group">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-[#5B5F73] group-focus-within:text-[#3730E0] transition-colors">
                    <Mail className="w-4 h-4" />
                  </div>
                  <input
                    type="email"
                    name="email"
                    required
                    autoFocus
                    disabled={loading}
                    placeholder="admin@tutorvista.com"
                    value={loginForm.email}
                    onChange={handleInputChange}
                    className="w-full pl-10 pr-4 py-3 bg-[#F7F8FB] border border-[#E4E6EE] rounded-xl text-sm text-[#1A1D29] placeholder:text-[#5B5F73]/60 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#3730E0] focus:border-[#3730E0] transition-all disabled:opacity-60 disabled:cursor-not-allowed"
                  />
                </div>
              </div>

              {/* Password */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="block text-xs font-semibold text-[#1A1D29] uppercase tracking-wider">
                    Password
                  </label>
                </div>
                <div className="relative group">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-[#5B5F73] group-focus-within:text-[#3730E0] transition-colors">
                    <Lock className="w-4 h-4" />
                  </div>
                  <input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    required
                    disabled={loading}
                    placeholder="Enter your password"
                    value={loginForm.password}
                    onChange={handleInputChange}
                    className="w-full pl-10 pr-11 py-3 bg-[#F7F8FB] border border-[#E4E6EE] rounded-xl text-sm text-[#1A1D29] placeholder:text-[#5B5F73]/60 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#3730E0] focus:border-[#3730E0] transition-all disabled:opacity-60 disabled:cursor-not-allowed"
                  />
                  <button
                    type="button"
                    tabIndex={-1}
                    aria-label={showPassword ? "Hide password" : "Show password"}
                    onClick={() => setShowPassword(!showPassword)}
                    disabled={loading}
                    className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-[#5B5F73] hover:text-[#1A1D29] transition-colors disabled:opacity-50"
                  >
                    {showPassword ? (
                      <EyeOff className="w-4 h-4" />
                    ) : (
                      <Eye className="w-4 h-4" />
                    )}
                  </button>
                </div>
              </div>

              {/* Sign In Button */}
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-[#3730E0] hover:bg-[#2D24C4] active:bg-[#231CA6] text-white font-semibold py-3.5 px-4 rounded-xl shadow-sm hover:shadow-md transition-all duration-200 flex items-center justify-center gap-2 text-sm disabled:opacity-60 disabled:cursor-not-allowed mt-2"
              >
                {loading ? (
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    <span>Verifying Credentials...</span>
                  </div>
                ) : (
                  <>
                    <span>Sign In to Admin Portal</span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>
            </form>

            {/* Footer Support Notice */}
            <div className="mt-8 pt-6 border-t border-[#E4E6EE] text-center">
              <p className="text-xs text-[#5B5F73]">
                Having access issues? Contact{" "}
                <a
                  href="mailto:support@tutorvista.com"
                  className="text-[#3730E0] font-medium hover:underline"
                >
                  support@tutorvista.com
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
