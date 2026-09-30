import React from "react";
import { Link } from "react-router-dom";
import { Home, ArrowLeft, Search, HelpCircle } from "lucide-react";
import { Button } from "../components/ui/Button";

const NotFoundPage = () => {
  return (
    <div className="min-h-[70vh] flex items-center justify-center py-16 px-4">
      <div className="max-w-md w-full text-center space-y-6">
        {/* 404 Badge */}
        <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-[#EEEDFD] text-[#3730E0] mb-2 shadow-xs">
          <span className="text-3xl font-black">404</span>
        </div>

        <div className="space-y-2">
          <h1 className="text-2xl sm:text-3xl font-extrabold text-[#1A1D29] tracking-tight">
            Page Not Found
          </h1>
          <p className="text-sm text-[#5B5F73] leading-relaxed">
            Sorry, the page you are looking for doesn't exist, has been removed, or the link may be outdated.
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
          <Link to="/" className="w-full sm:w-auto">
            <Button
              variant="primary"
              size="md"
              iconLeft={Home}
              className="w-full sm:w-auto font-semibold"
            >
              Back to Home
            </Button>
          </Link>
          <Link to="/tuition-jobs" className="w-full sm:w-auto">
            <Button
              variant="secondary"
              size="md"
              iconLeft={Search}
              className="w-full sm:w-auto font-semibold"
            >
              Browse Tuitions
            </Button>
          </Link>
        </div>

        {/* Support Help */}
        <div className="pt-6 border-t border-[#E4E6EE] text-xs text-[#5B5F73]">
          Need help finding something?{" "}
          <Link to="/contact" className="text-[#3730E0] font-semibold hover:underline">
            Contact Support
          </Link>
        </div>
      </div>
    </div>
  );
};

export default NotFoundPage;
