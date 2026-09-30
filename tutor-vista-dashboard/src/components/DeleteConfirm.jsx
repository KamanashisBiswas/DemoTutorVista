import React, { useState } from "react";
import { toast } from "react-toastify";
import { AlertTriangle } from "lucide-react";

const DeleteConfirm = () => {
  const handleDelete = ({
    onDelete,
    itemName,
    itemType = "item",
    customMessage = null,
  }) => {
    const message =
      customMessage ||
      `Are you sure you want to delete ${itemType} "${itemName}"?`;

    const DeleteModalContent = () => {
      const [isDeleting, setIsDeleting] = useState(false);

      return (
        <div className="flex flex-col items-center justify-center p-5 text-center">
          <div className="w-12 h-12 rounded-full bg-[#FEF2F2] border border-[#FEE2E2] flex items-center justify-center text-[#DC2626] mb-3">
            <AlertTriangle className="w-6 h-6" />
          </div>
          <div className="text-base font-bold text-[#1A1D29] mb-1.5">
            Confirm Deletion
          </div>
          <div className="text-xs text-[#5B5F73] mb-5 leading-relaxed max-w-xs">
            {message} This action cannot be undone.
          </div>
          <div className="flex justify-center items-center gap-2.5 w-full">
            <button
              onClick={async () => {
                setIsDeleting(true);
                try {
                  await onDelete();
                  toast.success(
                    `${
                      itemType.charAt(0).toUpperCase() + itemType.slice(1)
                    } deleted successfully!`
                  );
                } catch (error) {
                  console.error(`Error deleting ${itemType}:`, error);
                  toast.error(
                    `Failed to delete ${itemType}. Please try again.`
                  );
                } finally {
                  setIsDeleting(false);
                  toast.dismiss(toastId);
                }
              }}
              disabled={isDeleting}
              className={`flex-1 py-2 px-4 rounded-lg text-xs font-semibold transition-all flex items-center justify-center gap-1.5 shadow-xs ${
                isDeleting
                  ? "bg-[#FCA5A5] text-white cursor-not-allowed"
                  : "bg-[#DC2626] text-white hover:bg-[#B91C1C]"
              }`}
            >
              {isDeleting && (
                <div className="animate-spin rounded-full h-3.5 w-3.5 border-2 border-white border-t-transparent"></div>
              )}
              {isDeleting ? "Deleting..." : "Delete"}
            </button>
            <button
              onClick={() => toast.dismiss(toastId)}
              disabled={isDeleting}
              className={`flex-1 py-2 px-4 rounded-lg text-xs font-semibold transition-all border border-[#E4E6EE] shadow-xs ${
                isDeleting
                  ? "bg-[#F7F8FB] text-[#94A3B8] cursor-not-allowed"
                  : "bg-white text-[#1A1D29] hover:bg-[#F7F8FB]"
              }`}
            >
              Cancel
            </button>
          </div>
        </div>
      );
    };

    const toastId = toast(() => <DeleteModalContent />, {
      autoClose: false,
      closeOnClick: false,
      draggable: false,
      closeButton: false,
      position: "top-center",
      style: { minWidth: 320, borderRadius: 16, padding: 0 },
    });
  };

  return { handleDelete };
};

export default DeleteConfirm;
