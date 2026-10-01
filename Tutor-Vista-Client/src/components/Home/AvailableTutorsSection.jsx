import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowRight, MapPin, GraduationCap } from "lucide-react";
import ApiService from "../../services/api";
import CommonSectionHeading from "../Common/CommonSectionHeading";
import TutorCard from "../TutorCard";
import TutorDetailsModal from "../TutorDetailsModal";
import { Button } from "../ui/Button";
import { SkeletonCard } from "../ui/Skeleton";
import { EmptyState } from "../ui/EmptyState";
import { ErrorState } from "../ui/ErrorState";

const TUTORS_PER_DIVISION = 8;
const DIVISION_ALIASES = {
  Dhaka: ["Dhaka"],
  Chattogram: ["Chattogram", "Chattagram", "Chittagong"],
  Khulna: ["Khulna"],
  Sylhet: ["Sylhet"],
};

const AvailableTutorsSection = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("Dhaka");
  const [allTutors, setAllTutors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedTutor, setSelectedTutor] = useState(null);
  const [showTutorDetailsModal, setShowTutorDetailsModal] = useState(false);

  const handleDetailsClick = (tutor) => {
    const tutorId = tutor._id || tutor.id || "tutor-2";
    navigate(`/tutors/${tutorId}`);
  };

  const fetchTutors = async () => {
    try {
      setLoading(true);
      setError(null);

      const divisions = DIVISION_ALIASES[activeTab] || [activeTab];
      const responses = await Promise.all(
        divisions.map((division) =>
          ApiService.getTutors({
            limit: TUTORS_PER_DIVISION,
            page: 1,
            division,
          })
        )
      );

      const tutorsMap = new Map();
      responses.forEach((res) => {
        if (res?.success && res.data?.applications) {
          res.data.applications.forEach((tutor) => {
            tutorsMap.set(tutor._id, tutor);
          });
        }
      });

      setAllTutors(Array.from(tutorsMap.values()).slice(0, TUTORS_PER_DIVISION));
    } catch (err) {
      console.error("Error fetching tutors:", err);
      setError("Failed to load featured tutors.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTutors();
  }, [activeTab]);

  const cities = ["Dhaka", "Chattogram", "Khulna", "Sylhet"];

  return (
    <section className="py-16 sm:py-20 bg-[#F7F8FB] border-b border-[#E4E6EE]">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <CommonSectionHeading
          badge="TOP INSTRUCTORS"
          title="Featured Verified"
          highlight="Tutors"
          subtitle="Discover verified teachers from leading public and private universities ready to teach at your home or online."
        />

        {/* Division Filter Tabs */}
        <div className="flex items-center justify-center mb-10 overflow-x-auto pb-2">
          <div className="inline-flex items-center gap-1.5 p-1 bg-white border border-[#E4E6EE] rounded-full shadow-xs">
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
                      : "text-[#5B5F73] hover:text-[#1A1D29] hover:bg-[#F7F8FB]"
                  }`}
                >
                  <MapPin className="w-3.5 h-3.5" />
                  <span>{city}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Content Section */}
        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {Array.from({ length: 4 }).map((_, i) => (
              <SkeletonCard key={i} />
            ))}
          </div>
        ) : error ? (
          <ErrorState message={error} onRetry={fetchTutors} />
        ) : allTutors.length === 0 ? (
          <EmptyState
            icon={GraduationCap}
            title={`No featured tutors found in ${activeTab}`}
            description="We have tutors joining every day. Explore all verified tutors across Bangladesh."
            actionLabel="Browse All Tutors"
            onAction={() => navigate("/tutors")}
          />
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {allTutors.map((tutor) => (
              <TutorCard
                key={tutor._id}
                tutor={tutor}
                onDetailsClick={handleDetailsClick}
              />
            ))}
          </div>
        )}

        {/* Bottom CTA to view all tutors */}
        <div className="mt-12 text-center">
          <Button
            variant="outline"
            size="lg"
            onClick={() => navigate("/tutors")}
            iconRight={ArrowRight}
          >
            Explore All 5,000+ Verified Tutors
          </Button>
        </div>
      </div>

      <TutorDetailsModal
        showModal={showTutorDetailsModal}
        setShowModal={setShowTutorDetailsModal}
        selectedTutor={selectedTutor}
      />
    </section>
  );
};

export default AvailableTutorsSection;
