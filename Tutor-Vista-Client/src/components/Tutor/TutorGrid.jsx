import React from "react";
import TutorCard from "../TutorCard";
import { SkeletonCard } from "../ui/Skeleton";
import { ErrorState } from "../ui/ErrorState";
import { EmptyState } from "../ui/EmptyState";
import { GraduationCap } from "lucide-react";

const TutorGrid = ({
  loading,
  error,
  tutors = [],
  fetchTutors,
  onDetailsClick,
  truncateText,
  onClearFilters,
}) => {
  if (loading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {Array.from({ length: 8 }).map((_, i) => (
          <SkeletonCard key={i} />
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <ErrorState
        title="Unable to load tutors"
        message={error}
        onRetry={fetchTutors}
      />
    );
  }

  if (tutors.length === 0) {
    return (
      <EmptyState
        icon={GraduationCap}
        title="No Tutors Found"
        description="We couldn't find any tutors matching your active search filters. Try clearing your filters or changing your selected city."
        actionLabel={onClearFilters ? "Reset Filters" : "Try Again"}
        onAction={onClearFilters || fetchTutors}
      />
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {tutors.map((tutor) => (
        <TutorCard
          key={tutor._id}
          tutor={tutor}
          onDetailsClick={onDetailsClick}
          truncateText={truncateText}
        />
      ))}
    </div>
  );
};

export default TutorGrid;
