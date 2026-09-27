import React from "react";
import { Plus, FileDown, FileText, Sheet } from "lucide-react";

const ActionButton = ({
  onClick,
  disabled,
  isDownloading,
  icon: Icon,
  text,
  colorClass,
}) => (
  <button
    onClick={onClick}
    disabled={disabled}
    className={`w-full sm:w-auto sm:min-w-[170px] flex items-center justify-center space-x-2 ${colorClass} text-white px-4 py-2 rounded-lg transition-colors duration-200 font-medium disabled:opacity-50 disabled:cursor-not-allowed relative`}
  >
    {isDownloading && (
      <div className="absolute inset-0 flex justify-center items-center">
        <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
      </div>
    )}
    <div
      className={
        isDownloading
          ? "invisible flex items-center space-x-2"
          : "flex items-center space-x-2"
      }
    >
      <Icon className="w-4 h-4" />
      <span>{text}</span>
    </div>
  </button>
);

const TutorsPageHeader = ({
  user,
  onAddTutor,
  onDownloadPdf,
  onDownloadDocx,
  onDownloadSheet,
  isDownloading,
}) => {
  return (
    <div className="flex flex-col md:flex-row md:items-center justify-between mb-6">
      <h3 className="text-lg font-semibold text-gray-800 mb-4 md:mb-0">
        Tutor List
      </h3>
      <div className="flex flex-wrap items-center gap-3 w-full md:w-auto">
        <ActionButton
          onClick={onDownloadPdf}
          disabled={isDownloading.pdf}
          isDownloading={isDownloading.pdf}
          icon={FileDown}
          text="Download All PDF"
          colorClass="bg-green-600 hover:bg-green-700"
        />
        <ActionButton
          onClick={onDownloadDocx}
          disabled={isDownloading.docx}
          isDownloading={isDownloading.docx}
          icon={FileText}
          text="Download All DOCX"
          colorClass="bg-blue-600 hover:bg-blue-700"
        />
        <ActionButton
          onClick={onDownloadSheet}
          disabled={isDownloading.sheet}
          isDownloading={isDownloading.sheet}
          icon={Sheet}
          text="Download All Sheet"
          colorClass="bg-teal-600 hover:bg-teal-700"
        />
        {user?.role !== "user" && (
          <button
            onClick={onAddTutor}
            className="w-full sm:w-auto sm:min-w-[170px] flex items-center justify-center space-x-2 bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg transition-colors duration-200 font-medium"
          >
            <Plus className="w-4 h-4" />
            <span>Add Tutor</span>
          </button>
        )}
      </div>
    </div>
  );
};

export default TutorsPageHeader;
