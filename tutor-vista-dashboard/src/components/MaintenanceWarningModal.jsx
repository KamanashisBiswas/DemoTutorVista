import React from "react";

// তারিখ ফরম্যাট ফাংশন
const formatDate = (dateStr) => {
  if (!dateStr) return "N/A";
  const date = new Date(dateStr);
  return date.toLocaleDateString("en-GB", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
};

// Custom Warning SVG (no package)
const WarningIcon = ({ className }) => (
  <svg
    className={className}
    viewBox="0 0 48 48"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
  >
    <circle cx="24" cy="24" r="22" fill="#FEE2E2" stroke="#F87171" />
    <path
      d="M24 14v12"
      stroke="#DC2626"
      strokeWidth="3"
      strokeLinecap="round"
    />
    <circle cx="24" cy="32" r="2" fill="#DC2626" />
  </svg>
);

// Custom Close SVG (no package)
const CloseIcon = ({ className }) => (
  <svg
    className={className}
    viewBox="0 0 24 24"
    fill="none"
    stroke="#6B7280"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <line x1="18" y1="6" x2="6" y2="18" />
    <line x1="6" y1="6" x2="18" y2="18" />
  </svg>
);

const MaintenanceWarningModal = ({ open, onClose, website }) => {
  if (!open || !website) return null;

  // বিল আইটেমগুলো
  const billItems = [
    { label: "Maintenance Bill", key: "maintenanceBill" },
    { label: "Hosting Bill", key: "hostingBill" },
    { label: "Domain Bill", key: "domainBill" },
    { label: "Bulk SMS Bill", key: "bulkSmsBill" },
    { label: "Social Platform Bill", key: "socialPlatformBill" },
  ];
  const validBills = billItems.filter(
    (item) => website[item.key] != null && website[item.key] > 0
  );
  const totalDue =
    validBills.reduce((acc, item) => acc + (website[item.key] || 0), 0) +
    (website.maintenanceFee || 0);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm transition-opacity duration-300">
      <div className="w-full max-w-4xl mx-auto rounded-2xl shadow-2xl bg-white overflow-hidden border border-red-100 animate-[fadeInUp_0.4s_ease]">
        {/* Header */}
        <div className="relative flex items-center gap-4 px-8 py-6 bg-gradient-to-r from-red-500 via-orange-400 to-yellow-300">
          <span className="flex items-center justify-center rounded-full bg-white/80 shadow p-2 animate-pulse">
            <WarningIcon className="w-12 h-12" />
          </span>
          <div>
            <h2 className="text-2xl font-bold text-red-700 drop-shadow-sm tracking-wide">
              Maintenance Fee Due!
            </h2>
            <p className="text-sm text-red-900/80 font-medium">
              Action required for your website
            </p>
          </div>
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 rounded-full hover:bg-red-100 transition"
            aria-label="Close"
            type="button"
          >
            <CloseIcon className="w-7 h-7" />
          </button>
        </div>

        {/* Content */}
        <div className="px-10 py-8 animate-fade-in">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-8">
            {/* Left Column: Bill Details */}
            <div className="flex flex-col">
              <div className="mb-5">
                <div className="text-xl font-semibold text-gray-800 text-center">
                  {website.name}
                </div>
                <div className="text-center text-sm text-blue-600 underline break-all">
                  <a
                    href={website.websiteUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {website.websiteUrl}
                  </a>
                </div>
              </div>

              <div className="space-y-2">
                {validBills.map((item) => (
                  <div
                    key={item.key}
                    className="flex justify-between items-center border-b border-gray-100 pb-1.5"
                  >
                    <span className="text-gray-500 text-sm">{item.label}</span>
                    <span className="font-semibold text-gray-800">
                      {website[item.key]}{" "}
                      <span className="text-xs text-gray-400">৳</span>
                    </span>
                  </div>
                ))}
                {website.maintenanceFee && !website.maintenanceBill && (
                  <div className="flex justify-between items-center border-b border-gray-100 pb-1.5">
                    <span className="text-gray-500 text-sm">
                      Maintenance Fee
                    </span>
                    <span className="font-semibold text-gray-800">
                      {website.maintenanceFee}{" "}
                      <span className="text-xs text-gray-400">৳</span>
                    </span>
                  </div>
                )}
                {totalDue > 0 && (
                  <div className="flex justify-between items-center pt-3 mt-2 border-t-2 border-red-100">
                    <span className="font-bold text-gray-700 text-lg">
                      Total Due
                    </span>
                    <span className="text-2xl font-bold text-red-600 animate-bounce">
                      {totalDue}{" "}
                      <span className="text-base text-gray-400">৳</span>
                    </span>
                  </div>
                )}
              </div>
            </div>

            {/* Right Column: Info & Action */}
            <div className="flex flex-col">
              <div className="grid grid-cols-2 gap-4 mb-4">
                <div>
                  <div className="text-xs text-gray-400">Billing Cycle</div>
                  <div className="font-medium text-gray-700 capitalize">
                    {website.feeType}
                  </div>
                </div>
                <div>
                  <div className="text-xs text-gray-400">Due Date</div>
                  <div className="font-medium text-red-600 bg-red-50 px-2 py-1 rounded animate-pulse">
                    {formatDate(website.nextDueDate)}
                  </div>
                </div>
                <div>
                  <div className="text-xs text-gray-400">Status</div>
                  <div className="font-medium text-green-700">
                    {website.isActive ? "Active" : "Inactive"}
                  </div>
                </div>
                <div>
                  <div className="text-xs text-gray-400">Payment</div>
                  <div
                    className={`font-medium ${
                      website.isPaid ? "text-green-700" : "text-red-700"
                    }`}
                  >
                    {website.isPaid ? "Paid" : "Unpaid"}
                  </div>
                </div>
              </div>

              {(website.message || website.notes) && (
                <div className="mb-4 bg-yellow-50 border-l-4 border-yellow-400 p-3 rounded">
                  <div className="text-xs text-yellow-700 font-semibold mb-1">
                    Note
                  </div>
                  <div className="text-sm text-yellow-900">
                    {website.message || website.notes}
                  </div>
                </div>
              )}

              <div className="text-center bg-red-50 border-l-4 border-red-400 p-4 rounded mt-auto animate-fade-in">
                <p className="font-semibold text-red-700 text-base">
                  আপনার ওয়েবসাইটের ফি পরিশোধ হয়নি। অনুগ্রহ করে দ্রুত ফি পরিশোধ
                  করুন。
                </p>
              </div>
            </div>
          </div>
          <div className="mt-8">
            <button
              className="w-full py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-bold rounded-lg shadow-lg hover:shadow-xl hover:from-blue-700 hover:to-purple-700 transition-all duration-300 transform hover:-translate-y-0.5"
              onClick={onClose}
            >
              বুঝেছি
            </button>
          </div>
        </div>
      </div>
      {/* Tailwind Animations */}
      <style>
        {`
          @keyframes fadeInUp {
            0% { opacity: 0; transform: translateY(40px);}
            100% { opacity: 1; transform: translateY(0);}
          }
          .animate-[fadeInUp_0.4s_ease] {
            animation: fadeInUp 0.4s ease;
          }
          .animate-fade-in {
            animation: fadeInUp 0.6s cubic-bezier(0.4,0,0.2,1);
          }
        `}
      </style>
    </div>
  );
};

export default MaintenanceWarningModal;
