import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useTutorAuth } from "../context/TutorAuthContext";
import { GraduationCap, Phone, ArrowRight, ShieldCheck, Lock, AlertCircle, ArrowLeft, KeyRound } from "lucide-react";
import { Button } from "../components/ui/Button";

const TutorLoginPage = () => {
  const navigate = useNavigate();
  const { checkTutorPhone, verifyAndLogin, loading, isLoggedIn } = useTutorAuth();
  
  const [step, setStep] = useState(1); // 1: Phone input, 2: PIN verification
  const [phone, setPhone] = useState("");
  const [phoneError, setPhoneError] = useState("");
  const [matchedTutor, setMatchedTutor] = useState(null);

  const [pin, setPin] = useState("");
  const [pinError, setPinError] = useState("");

  // If already logged in, redirect
  React.useEffect(() => {
    if (isLoggedIn) {
      navigate("/tutor-portal");
    }
  }, [isLoggedIn, navigate]);

  const validatePhone = (value) => {
    const bdRegex = /^01[3-9]\d{8}$/;
    const clean = value.trim().replace(/[\s-]/g, "");
    if (!clean) {
      return "Phone number is required";
    }
    if (!bdRegex.test(clean)) {
      return "Please enter a valid 11-digit Bangladeshi number (e.g., 01712345678)";
    }
    return "";
  };

  const handlePhoneSubmit = async (e) => {
    e.preventDefault();
    const error = validatePhone(phone);
    if (error) {
      setPhoneError(error);
      return;
    }
    setPhoneError("");

    const result = await checkTutorPhone(phone);
    if (result.success && result.tutor) {
      setMatchedTutor(result.tutor);
      setStep(2);
    }
  };

  const handlePinSubmit = async (e) => {
    e.preventDefault();
    if (!pin.trim()) {
      setPinError("Please enter your 4-digit security PIN");
      return;
    }
    if (pin.trim().length < 4) {
      setPinError("PIN must be 4 digits");
      return;
    }
    setPinError("");

    const result = await verifyAndLogin(phone, pin);
    if (result.success) {
      navigate("/tutor-portal");
    }
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        {/* Header */}
        <div className="text-center space-y-2">
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-[#EEEDFD] text-[#3730E0] mb-2 shadow-xs">
            <GraduationCap className="w-8 h-8" />
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-[#1A1D29] tracking-tight">
            Tutor Portal Login
          </h2>
          <p className="text-xs sm:text-sm text-[#5B5F73]">
            {step === 1
              ? "Access your applications, track status, and view tuition opportunities."
              : `Verify security credentials for ${matchedTutor?.name || "your account"}.`}
          </p>
        </div>

        {/* Login Card */}
        <div className="bg-white p-6 sm:p-8 rounded-2xl shadow-card border border-[#E4E6EE] space-y-6">
          {step === 1 ? (
            <form onSubmit={handlePhoneSubmit} className="space-y-5">
              <div>
                <label
                  htmlFor="phone"
                  className="block text-xs font-semibold text-[#1A1D29] mb-1.5"
                >
                  Registered Mobile Number <span className="text-[#DC2626]">*</span>
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-[#5B5F73]">
                    <Phone className="w-4 h-4" />
                  </div>
                  <input
                    id="phone"
                    type="tel"
                    value={phone}
                    onChange={(e) => {
                      setPhone(e.target.value);
                      if (phoneError) setPhoneError("");
                    }}
                    placeholder="017xxxxxxxx"
                    className={`w-full h-11 pl-10 pr-4 text-sm bg-white border rounded-xl focus:outline-none focus:ring-2 ${
                      phoneError
                        ? "border-[#DC2626] focus:ring-[#DC2626]/20"
                        : "border-[#E4E6EE] focus:border-[#3730E0] focus:ring-[#3730E0]/20"
                    }`}
                    autoComplete="tel"
                  />
                </div>
                {phoneError && (
                  <p className="text-xs text-[#DC2626] mt-1.5 flex items-center gap-1">
                    <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                    <span>{phoneError}</span>
                  </p>
                )}
              </div>

              <Button
                type="submit"
                variant="primary"
                size="lg"
                fullWidth
                loading={loading}
                iconRight={ArrowRight}
                className="font-semibold text-sm rounded-xl py-3"
              >
                {loading ? "Checking Account..." : "Continue to Verification"}
              </Button>
            </form>
          ) : (
            <form onSubmit={handlePinSubmit} className="space-y-5">
              {/* Account Confirmation Banner */}
              <div className="p-3 rounded-xl bg-indigo-50 border border-indigo-100 flex items-center justify-between">
                <div>
                  <p className="text-xs font-bold text-indigo-950">{matchedTutor?.name}</p>
                  <p className="text-[11px] text-indigo-700">Phone: {phone}</p>
                </div>
                <button
                  type="button"
                  onClick={() => {
                    setStep(1);
                    setPin("");
                    setPinError("");
                  }}
                  className="text-xs text-indigo-600 hover:text-indigo-800 font-semibold underline flex items-center gap-0.5 cursor-pointer"
                >
                  <ArrowLeft className="w-3 h-3" /> Change
                </button>
              </div>

              <div>
                <label
                  htmlFor="pin"
                  className="block text-xs font-semibold text-[#1A1D29] mb-1.5"
                >
                  4-Digit Security PIN <span className="text-[#DC2626]">*</span>
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-[#5B5F73]">
                    <Lock className="w-4 h-4" />
                  </div>
                  <input
                    id="pin"
                    type="password"
                    maxLength={6}
                    value={pin}
                    onChange={(e) => {
                      setPin(e.target.value);
                      if (pinError) setPinError("");
                    }}
                    placeholder="Enter 4-digit PIN"
                    className={`w-full h-11 pl-10 pr-4 text-sm bg-white border rounded-xl focus:outline-none focus:ring-2 tracking-widest ${
                      pinError
                        ? "border-[#DC2626] focus:ring-[#DC2626]/20"
                        : "border-[#E4E6EE] focus:border-[#3730E0] focus:ring-[#3730E0]/20"
                    }`}
                    autoComplete="current-password"
                    autoFocus
                  />
                </div>
                {pinError && (
                  <p className="text-xs text-[#DC2626] mt-1.5 flex items-center gap-1">
                    <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                    <span>{pinError}</span>
                  </p>
                )}
                <p className="text-[11px] text-slate-500 mt-2 flex items-center gap-1">
                  <KeyRound className="w-3.5 h-3.5 text-indigo-600 shrink-0" />
                  <span>Demo/First-time PIN: <strong>1234</strong> or last 4 digits of phone.</span>
                </p>
              </div>

              <div className="space-y-2">
                <Button
                  type="submit"
                  variant="primary"
                  size="lg"
                  fullWidth
                  loading={loading}
                  iconRight={ArrowRight}
                  className="font-semibold text-sm rounded-xl py-3"
                >
                  {loading ? "Authenticating..." : "Login to Tutor Dashboard"}
                </Button>
                <button
                  type="button"
                  onClick={() => {
                    setStep(1);
                    setPin("");
                    setPinError("");
                  }}
                  className="w-full py-2 text-xs text-slate-600 hover:text-slate-900 font-medium text-center cursor-pointer"
                >
                  ← Back to phone number
                </button>
              </div>
            </form>
          )}

          {/* Quick Perks */}
          <div className="p-3.5 rounded-xl bg-[#F7F8FB] border border-[#E4E6EE] space-y-2 text-xs text-[#5B5F73]">
            <div className="flex items-center gap-2 text-[#1A1D29] font-medium">
              <ShieldCheck className="w-4 h-4 text-[#3730E0]" />
              <span>What you can do in your portal:</span>
            </div>
            <ul className="space-y-1 pl-6 list-disc marker:text-[#3730E0]">
              <li>Track all your submitted tuition applications</li>
              <li>See interview & shortlisting status</li>
              <li>Browse tuitions tailored to your preferred location</li>
            </ul>
          </div>

          {/* Register Prompt */}
          <div className="pt-4 border-t border-[#E4E6EE] text-center text-xs text-[#5B5F73]">
            Not a registered tutor yet?{" "}
            <Link
              to="/apply-tutor"
              className="text-[#3730E0] font-bold hover:underline"
            >
              Apply as a Tutor Now →
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TutorLoginPage;
