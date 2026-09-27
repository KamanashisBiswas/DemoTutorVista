import React, { useState } from "react";
import { toast } from "react-toastify";

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
        <div className="flex flex-col items-center justify-center p-6">
          <div className="text-xl font-bold text-red-600 mb-2">
            Delete Confirmation
          </div>
          <div className="text-base text-gray-800 mb-4">{message}</div>
          <div className="flex justify-center gap-4">
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
              className={`px-6 py-2 rounded-lg font-semibold transition flex items-center gap-2 ${
                isDeleting
                  ? "bg-red-400 text-white cursor-not-allowed"
                  : "bg-red-600 text-white hover:bg-red-700"
              }`}
            >
              {isDeleting && (
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
              )}
              {isDeleting ? "Deleting..." : "Yes, Delete"}
            </button>
            <button
              onClick={() => toast.dismiss(toastId)}
              disabled={isDeleting}
              className={`px-6 py-2 rounded-lg font-semibold transition ${
                isDeleting
                  ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                  : "bg-gray-200 text-gray-800 hover:bg-gray-300"
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
      style: { minWidth: 350, minHeight: 200 },
    });
  };

  return { handleDelete };
};

export default DeleteConfirm;
