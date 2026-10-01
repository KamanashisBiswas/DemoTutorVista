import React from "react";
import TuitionRequestCard from "../TuitionRequestCard";

const RequestGrid = ({
  loading,
  error,
  requests = [],
  fetchRequests,
  viewMode = "grid",
  totalRequests = 1840,
}) => {
  if (loading) {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between animate-pulse">
          <div className="h-6 w-64 bg-slate-200 rounded-lg"></div>
          <div className="h-4 w-28 bg-slate-200 rounded-lg"></div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {Array.from({ length: 6 }).map((_, index) => (
            <div key={index} className="h-96 bg-white rounded-2xl border border-slate-200 p-6 animate-pulse space-y-4">
              <div className="flex justify-between">
                <div className="h-5 w-24 bg-slate-200 rounded-full"></div>
                <div className="h-4 w-16 bg-slate-200 rounded"></div>
              </div>
              <div className="h-6 w-3/4 bg-slate-200 rounded"></div>
              <div className="h-4 w-1/2 bg-slate-200 rounded"></div>
              <div className="grid grid-cols-2 gap-2 pt-4">
                <div className="h-16 bg-slate-100 rounded-xl"></div>
                <div className="h-16 bg-slate-100 rounded-xl"></div>
                <div className="h-16 bg-slate-100 rounded-xl"></div>
                <div className="h-16 bg-slate-100 rounded-xl"></div>
              </div>
              <div className="h-10 bg-slate-200 rounded-xl mt-4"></div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (error && requests.length === 0) {
    return (
      <div className="bg-white rounded-2xl border border-slate-200 p-8 text-center max-w-lg mx-auto shadow-xs">
        <div className="w-12 h-12 rounded-full bg-rose-100 text-rose-600 flex items-center justify-center mx-auto mb-3">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"></path>
          </svg>
        </div>
        <h3 className="text-base font-bold text-slate-900 mb-1">Failed to Load Tuition Jobs</h3>
        <p className="text-xs sm:text-sm text-slate-500 mb-4">{error}</p>
        <button
          type="button"
          onClick={fetchRequests}
          className="px-4 py-2 rounded-xl bg-brand-700 text-white text-xs sm:text-sm font-semibold hover:bg-brand-800 transition-colors cursor-pointer"
        >
          Try Again
        </button>
      </div>
    );
  }

  if (requests.length === 0) {
    return (
      <div className="bg-white rounded-2xl border border-slate-200 p-10 text-center max-w-md mx-auto shadow-xs">
        <div className="w-14 h-14 rounded-2xl bg-indigo-50 text-brand-700 flex items-center justify-center mx-auto mb-3">
          <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
          </svg>
        </div>
        <h3 className="text-lg font-bold text-slate-900 mb-1">No Tuition Jobs Found</h3>
        <p className="text-xs sm:text-sm text-slate-500 mb-4">
          No tuition jobs match your selected filters. Try choosing a different location or resetting your preferences.
        </p>
        <button
          type="button"
          onClick={fetchRequests}
          className="px-4 py-2 rounded-xl bg-brand-700 text-white text-xs sm:text-sm font-semibold hover:bg-brand-800 transition-colors cursor-pointer"
        >
          Refresh Listings
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Results Header Summary */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
        <div className="flex items-center gap-2.5">
          <h2 className="text-lg sm:text-xl font-bold text-slate-900 tracking-tight">
            Available Tuition Opportunities
          </h2>
          <span className="px-2.5 py-0.5 rounded-full bg-indigo-50 text-brand-700 font-bold text-xs border border-indigo-100">
            Showing {requests.length} of {totalRequests ? totalRequests.toLocaleString() : "1,840"} Jobs
          </span>
        </div>
        <div className="text-xs sm:text-sm text-slate-500 font-medium">
          Updated <span className="font-bold text-slate-900">3 mins ago</span>
        </div>
      </div>

      {/* Modern Tuition Cards Grid or List */}
      <div
        className={
          viewMode === "grid"
            ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            : "flex flex-col gap-5"
        }
      >
        {requests.map((request) => (
          <TuitionRequestCard key={request._id || request.jobId} request={request} />
        ))}
      </div>
    </div>
  );
};

export default RequestGrid;
