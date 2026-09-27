import React from "react";
import { motion } from "framer-motion";
import { Briefcase } from "lucide-react";
import TuitionRequestCard from "../TuitionRequestCard";
import { SkeletonCard } from "../ui/Skeleton";
import { EmptyState } from "../ui/EmptyState";
import { ErrorState } from "../ui/ErrorState";

const RequestGrid = ({ loading, error, requests, fetchRequests }) => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.08 },
    },
  };

  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {Array.from({ length: 6 }).map((_, index) => (
          <SkeletonCard key={index} className="h-64" />
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <ErrorState
        title="Failed to Load Tuition Jobs"
        message={error || "We encountered an issue fetching available tuition posts. Please try again."}
        onRetry={fetchRequests}
      />
    );
  }

  if (requests.length === 0) {
    return (
      <EmptyState
        icon={Briefcase}
        title="No Tuition Jobs Found"
        description="Currently, there are no tuition jobs matching your criteria. Try adjusting your filters or selecting a different city."
      />
    );
  }

  return (
    <motion.div
      className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {requests.map((request) => (
        <TuitionRequestCard key={request._id} request={request} />
      ))}
    </motion.div>
  );
};

export default RequestGrid;
