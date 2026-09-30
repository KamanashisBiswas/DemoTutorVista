import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowRight, MapPin, Briefcase } from "lucide-react";
import axios from "../../lib/axios";
import CommonSectionHeading from "../Common/CommonSectionHeading";
import TuitionRequestCard from "../TuitionRequestCard";
import { Button } from "../ui/Button";
import { SkeletonCard } from "../ui/Skeleton";
import { EmptyState } from "../ui/EmptyState";
import { ErrorState } from "../ui/ErrorState";

const RequestTutorSection = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("Dhaka");
  const [allRequests, setAllRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const CARDS_PER_DIVISION = 6;

  const normalizeDivision = (value = "") => {
    const normalized = value.toLowerCase().trim();
    if (normalized === "chattagram" || normalized === "chittagong") {
      return "chattogram";
    }
    return normalized;
  };

  const fetchRequests = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await axios.get("/api/request-tutor", {
        params: {
          limit: CARDS_PER_DIVISION,
          page: 1,
          isActive: true,
          division: activeTab,
        },
      });
      if (response.data.success) {
        setAllRequests(response.data.data.requests || []);
      } else {
        setAllRequests([]);
      }
    } catch {
      setError("Failed to load tuition opportunities.");
      setAllRequests([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRequests();
  }, [activeTab]);

  const filteredRequests = allRequests
    .filter((request) => {
      const reqDivision = normalizeDivision(
        request.division || request.adminDivision || ""
      );
      return reqDivision === normalizeDivision(activeTab);
    })
    .slice(0, CARDS_PER_DIVISION);

  const cities = ["Dhaka", "Chattogram", "Khulna", "Sylhet"];

  return (
    <section className="py-16 sm:py-20 bg-white border-b border-[#E4E6EE]">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <CommonSectionHeading
          badge="LATEST OPPORTUNITIES"
          title="Active Tuition"
          highlight="Jobs"
          subtitle="Explore genuine tuition openings posted by verified guardians across Bangladesh. Apply immediately with your verified profile."
        />

        {/* Division Filter Tabs */}
        <div className="flex items-center justify-center mb-10 overflow-x-auto pb-2">
          <div className="inline-flex items-center gap-1.5 p-1 bg-[#F7F8FB] border border-[#E4E6EE] rounded-full">
            {cities.map((city) => {
              const isActive = activeTab === city;
              return (
                <button
                  key={city}
                  type="button"
                  onClick={() => setActiveTab(city)}
                  className={`flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-semibold transition-all duration-150 ${
                    isActive
                      ? "bg-[#3730E0] text-white shadow-sm"
                      : "text-[#5B5F73] hover:text-[#1A1D29] hover:bg-white/60"
                  }`}
                >
                  <MapPin className="w-3.5 h-3.5" />
                  <span>{city}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Content Section: Loading, Error, Empty, or Cards */}
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {Array.from({ length: 3 }).map((_, i) => (
              <SkeletonCard key={i} />
            ))}
          </div>
        ) : error ? (
          <ErrorState message={error} onRetry={fetchRequests} />
        ) : filteredRequests.length === 0 ? (
          <EmptyState
            icon={Briefcase}
            title={`No tuitions currently in ${activeTab}`}
            description="Check other divisions or browse all tuition jobs to find active tutoring opportunities."
            actionLabel="View All Tuition Jobs"
            onAction={() => navigate("/tuition-jobs")}
          />
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredRequests.map((request) => (
              <TuitionRequestCard key={request._id} request={request} />
            ))}
          </div>
        )}

        {/* Bottom CTA to view all */}
        <div className="mt-12 text-center">
          <Button
            variant="outline"
            size="lg"
            onClick={() => navigate("/tuition-jobs")}
            iconRight={ArrowRight}
          >
            Explore All Available Tuitions
          </Button>
        </div>
      </div>
    </section>
  );
};

export default RequestTutorSection;
