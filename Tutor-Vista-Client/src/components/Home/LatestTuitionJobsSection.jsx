import React from "react";
import { Link } from "react-router-dom";

const jobs = [
  {
    id: "TB-8492",
    badge: "Job #TB-8492",
    badgeClass: "bg-surface-container text-primary-container",
    timeAgo: "2 hours ago",
    title: "Class 8: General Science & Higher Mathematics",
    subtitle: "English Version • Viqarunnisa Noon School & College curriculum",
    location: "Dhanmondi, Dhaka",
    schedule: "3 Days / Week (Evening)",
    preference: "Female Tutor Preferred",
    mode: "In-Person Tuition",
    remuneration: "৳ 7,500",
  },
  {
    id: "TB-8493",
    badge: "Urgent Requirement",
    badgeClass: "bg-secondary-container text-on-secondary-container",
    timeAgo: "3 hours ago",
    title: "HSC 2nd Year: Physics 1st & 2nd Paper + Math",
    subtitle: "Bangla Medium • Notre Dame College Student",
    location: "Uttara Sector 7, Dhaka",
    schedule: "4 Days / Week",
    preference: "BUET / DU Student Preferred",
    mode: "In-Person Tuition",
    remuneration: "৳ 10,000",
  },
  {
    id: "TB-8494",
    badge: "Online Session",
    badgeClass: "bg-surface-container text-primary-container",
    timeAgo: "5 hours ago",
    title: "Class 5: All Subjects (Foundation Coaching)",
    subtitle: "English Version • Scholastica Senior Section",
    location: "Online (Mirpur Base)",
    schedule: "3 Days / Week",
    preference: "Any Qualified Educator",
    mode: "Zoom / Google Meet HD",
    remuneration: "৳ 6,000",
  },
  {
    id: "TB-8495",
    badge: "Medical Track",
    badgeClass: "bg-surface-container text-primary-container",
    timeAgo: "8 hours ago",
    title: "Medical Admission Prep: Biology & Organic Chemistry",
    subtitle: "Admission Batch • Chattogram College Candidate",
    location: "GEC Circle, Chattogram",
    schedule: "4 Days / Week",
    preference: "DMC / CMC Student Preferred",
    mode: "In-Person Tuition",
    remuneration: "৳ 8,500",
  },
];

const LatestTuitionJobsSection = () => {
  return (
    <section className="w-full py-10 lg:py-14 bg-surface border-b border-outline-variant/10">
      <div className="container mx-auto px-4 sm:px-6 lg:px-12">
        {/* Feed Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 sm:mb-10 gap-4">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-secondary opacity-75" />
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-secondary" />
              </span>
              <span className="px-2.5 py-0.5 rounded-full bg-secondary-container text-on-secondary-container font-label-sm text-label-sm font-bold">
                14 New Jobs Posted Today
              </span>
            </div>
            <h2 className="font-headline-lg text-headline-lg text-on-surface font-bold tracking-tight">
              Latest Available Tuition Jobs
            </h2>
            <p className="font-body-md text-body-md text-on-surface-variant mt-1">
              Verified tutoring posts from parents looking for qualified educators right now.
            </p>
          </div>
          <Link
            to="/tuition-jobs"
            className="px-5 py-2.5 rounded-xl bg-surface-container hover:bg-primary-container text-on-surface hover:text-on-primary font-label-lg text-label-lg font-bold transition-all flex items-center gap-2 self-start md:self-auto cursor-pointer"
          >
            <span>View All 350+ Tuition Jobs</span>
            <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
          </Link>
        </div>

        {/* Jobs Grid (4 Cards) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {jobs.map((job) => (
            <div
              key={job.id}
              className="bg-surface-container-lowest rounded-2xl p-6 shadow-sm hover:shadow-md transition-all flex flex-col justify-between border border-slate-100"
            >
              <div>
                <div className="flex items-center justify-between gap-2 mb-3">
                  <span
                    className={`px-2.5 py-1 rounded-md font-label-sm text-label-sm font-bold ${job.badgeClass}`}
                  >
                    {job.badge}
                  </span>
                  <span className="font-body-sm text-body-sm text-on-surface-variant text-[12px] flex items-center gap-1">
                    <span className="material-symbols-outlined text-[14px]">schedule</span>{" "}
                    {job.timeAgo}
                  </span>
                </div>

                <h3 className="font-headline-sm text-headline-sm text-on-surface font-bold text-[16px] leading-snug">
                  {job.title}
                </h3>
                <p className="font-body-sm text-body-sm text-on-surface-variant mt-1">
                  {job.subtitle}
                </p>

                <div className="grid grid-cols-2 gap-3 my-4 py-3 border-y border-outline-variant/20 font-body-sm text-body-sm">
                  <div className="flex items-center gap-2 text-on-surface">
                    <span className="material-symbols-outlined text-primary-container text-[18px]">
                      location_on
                    </span>
                    <span className="truncate">{job.location}</span>
                  </div>
                  <div className="flex items-center gap-2 text-on-surface">
                    <span className="material-symbols-outlined text-primary-container text-[18px]">
                      calendar_today
                    </span>
                    <span className="truncate">{job.schedule}</span>
                  </div>
                  <div className="flex items-center gap-2 text-on-surface">
                    <span className="material-symbols-outlined text-primary-container text-[18px]">
                      person
                    </span>
                    <span className="truncate">{job.preference}</span>
                  </div>
                  <div className="flex items-center gap-2 text-on-surface">
                    <span className="material-symbols-outlined text-secondary text-[18px]">
                      home
                    </span>
                    <span className="truncate">{job.mode}</span>
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-between pt-2">
                <div>
                  <span className="font-body-sm text-body-sm text-on-surface-variant text-[11px] block">
                    Monthly Remuneration
                  </span>
                  <span className="font-headline-sm text-headline-sm text-secondary font-extrabold text-[17px]">
                    {job.remuneration}{" "}
                    <span className="font-body-sm text-body-sm text-on-surface-variant font-normal">
                      / mo
                    </span>
                  </span>
                </div>
                <Link
                  to={`/tuition-jobs`}
                  className="px-4 py-2 rounded-xl bg-primary-container hover:bg-tertiary-container text-on-primary font-label-md text-label-md font-bold shadow-sm transition-all flex items-center gap-1.5 cursor-pointer"
                >
                  <span>Apply Now</span>
                  <span className="material-symbols-outlined text-[16px]">send</span>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default LatestTuitionJobsSection;
