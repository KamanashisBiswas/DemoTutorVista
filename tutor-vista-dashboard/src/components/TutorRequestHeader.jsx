// src/components/TutorRequestHeader.jsx
import React from "react";
import { Plus, FileDown, FileText, Sheet, Sparkles } from "lucide-react";
import { Button } from "./ui/Button";

const TutorRequestHeader = ({
  user,
  onAddRequest,
  onDownloadPdf,
  onDownloadDocx,
  onDownloadSheet,
  isDownloading,
}) => {
  return (
    <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 mb-6">
      <div>
        <div className="flex items-center gap-2">
          <h2 className="text-xl sm:text-2xl font-extrabold text-[#1A1D29] tracking-tight">
            Tuition Requests Management
          </h2>
          <span className="text-[11px] font-bold text-[#3730E0] bg-[#EEEDFD] px-2.5 py-0.5 rounded-full border border-[#DDD9FC]">
            Live Roster
          </span>
        </div>
        <p className="text-xs sm:text-sm text-[#5B5F73] mt-0.5">
          Review, filter, dispatch, and export student tuition requests.
        </p>
      </div>

      <div className="flex flex-wrap items-center gap-2 sm:gap-2.5">
        <Button
          variant="secondary"
          size="sm"
          onClick={onDownloadPdf}
          disabled={isDownloading.pdf}
          loading={isDownloading.pdf}
          iconLeft={FileDown}
        >
          Export PDF
        </Button>
        <Button
          variant="secondary"
          size="sm"
          onClick={onDownloadDocx}
          disabled={isDownloading.docx}
          loading={isDownloading.docx}
          iconLeft={FileText}
        >
          Export DOCX
        </Button>
        <Button
          variant="secondary"
          size="sm"
          onClick={onDownloadSheet}
          disabled={isDownloading.sheet}
          loading={isDownloading.sheet}
          iconLeft={Sheet}
        >
          Export Excel
        </Button>

        {user?.role !== "user" && (
          <Button
            variant="primary"
            size="sm"
            onClick={onAddRequest}
            iconLeft={Plus}
          >
            Add New Request
          </Button>
        )}
      </div>
    </div>
  );
};

export default TutorRequestHeader;
