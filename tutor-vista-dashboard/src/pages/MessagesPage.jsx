import React, { useEffect, useState } from "react";
import { Trash2, Phone, User, Calendar } from "lucide-react";
import ApiService from "../services/api";
import { useAuth } from "../context/AuthContext";
import DeleteConfirm from "../components/DeleteConfirm";

const MessagesPage = () => {
  const { user } = useAuth();
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);

  // Add pagination states
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(5);

  useEffect(() => {
    fetchMessages();
  }, []);

  const fetchMessages = async () => {
    try {
      const res = await ApiService.getMessages();
      setMessages(res.data?.messages || []);
    } catch (err) {
      console.error("Error fetching messages:", err);
      setMessages([]);
    } finally {
      setLoading(false);
    }
  };

  // Calculate pagination
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentMessages = messages.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(messages.length / itemsPerPage);

  const deleteConfirm = DeleteConfirm({});

  const handleDelete = (id, senderName) => {
    deleteConfirm.handleDelete({
      onDelete: async () => {
        await ApiService.deleteMessage(id);
        setMessages((prev) => prev.filter((msg) => msg._id !== id));
      },
      itemName: senderName,
      itemType: "message",
      customMessage: `Are you sure you want to delete the message from ${senderName}?`,
    });
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-2">Messages</h2>
        <p className="text-gray-600">Contact messages from website visitors</p>
      </div>

      {/* Messages List */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200">
        {messages.length === 0 ? (
          <div className="text-center py-12">
            <div className="text-gray-500 text-lg mb-2">No messages found</div>
            <p className="text-gray-400">
              Messages from contact form will appear here
            </p>
          </div>
        ) : (
          <div className="divide-y divide-gray-200">
            {currentMessages.map((msg) => (
              <div
                key={msg._id}
                className="p-6 hover:bg-gray-50 transition-colors duration-200"
              >
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    {/* Header with name and time */}
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center space-x-2">
                        <User className="w-5 h-5 text-blue-500" />
                        <span className="font-semibold text-gray-900">
                          {msg.name}
                        </span>
                      </div>
                      <div className="flex items-center space-x-4">
                        <div className="flex items-center text-sm text-gray-500">
                          <Calendar className="w-4 h-4 mr-1" />
                          {new Date(msg.createdAt).toLocaleString()}
                        </div>
                        {/* Delete button - only show for admin */}
                        {user?.role === "admin" && (
                          <button
                            onClick={() => handleDelete(msg._id, msg.name)}
                            className="text-red-600 hover:text-red-900 p-2 rounded-lg hover:bg-red-50 transition-colors duration-200"
                            title="Delete Message"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        )}
                      </div>
                    </div>

                    {/* Phone number */}
                    <div className="flex items-center space-x-2 mb-3">
                      <Phone className="w-4 h-4 text-green-500" />
                      <span className="text-sm font-medium text-gray-700">
                        {msg.phoneNumber}
                      </span>
                    </div>

                    {/* Message content */}
                    <div className="bg-gray-50 rounded-lg p-4">
                      <p className="text-gray-800 leading-relaxed">
                        {msg.message}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Beautiful Pagination Component */}
      {totalPages > 1 && (
        <div className="flex items-center justify-between px-6 py-4 bg-gradient-to-r from-gray-50 to-gray-100 border-t border-gray-200 rounded-b-xl">
          {/* Mobile Pagination */}
          <div className="flex justify-between flex-1 sm:hidden">
            <button
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
              className={`relative inline-flex items-center px-4 py-2 text-sm font-medium rounded-lg border transition-all duration-200 ${
                currentPage === 1
                  ? "text-gray-400 bg-gray-100 border-gray-200 cursor-not-allowed"
                  : "text-gray-700 bg-white border-gray-300 hover:bg-gray-50 hover:border-gray-400 hover:shadow-md"
              }`}
            >
              <svg
                className="w-4 h-4 mr-2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 19l-7-7 7-7"
                />
              </svg>
              Previous
            </button>
            <button
              onClick={() =>
                setCurrentPage((prev) => Math.min(prev + 1, totalPages))
              }
              disabled={currentPage === totalPages}
              className={`relative inline-flex items-center px-4 py-2 text-sm font-medium rounded-lg border transition-all duration-200 ${
                currentPage === totalPages
                  ? "text-gray-400 bg-gray-100 border-gray-200 cursor-not-allowed"
                  : "text-gray-700 bg-white border-gray-300 hover:bg-gray-50 hover:border-gray-400 hover:shadow-md"
              }`}
            >
              Next
              <svg
                className="w-4 h-4 ml-2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </button>
          </div>

          {/* Desktop Pagination */}
          <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
            {/* Results Info */}
            <div className="flex items-center space-x-2">
              <div className="bg-blue-50 px-3 py-1 rounded-full">
                <p className="text-sm font-medium text-blue-700">
                  Showing{" "}
                  <span className="font-bold">{indexOfFirstItem + 1}</span> to{" "}
                  <span className="font-bold">
                    {Math.min(indexOfLastItem, messages.length)}
                  </span>{" "}
                  of <span className="font-bold">{messages.length}</span>{" "}
                  results
                </p>
              </div>
            </div>

            {/* Page Navigation */}
            <div className="flex items-center space-x-2">
              {/* Previous Button */}
              <button
                onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
                className={`relative inline-flex items-center px-4 py-2 text-sm font-medium rounded-lg border transition-all duration-200 ${
                  currentPage === 1
                    ? "text-gray-400 bg-gray-100 border-gray-200 cursor-not-allowed"
                    : "text-gray-700 bg-white border-gray-300 hover:bg-blue-50 hover:border-blue-300 hover:text-blue-700 hover:shadow-md"
                }`}
              >
                <svg
                  className="w-4 h-4 mr-2"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 19l-7-7 7-7"
                  />
                </svg>
                Previous
              </button>

              {/* Page Numbers */}
              <div className="flex items-center space-x-1">
                {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                  (page) => {
                    // Show first page, last page, current page, and pages around current page
                    if (
                      page === 1 ||
                      page === totalPages ||
                      (page >= currentPage - 1 && page <= currentPage + 1)
                    ) {
                      return (
                        <button
                          key={page}
                          onClick={() => setCurrentPage(page)}
                          className={`relative inline-flex items-center px-4 py-2 text-sm font-medium rounded-lg border transition-all duration-200 ${
                            currentPage === page
                              ? "z-10 bg-blue-600 border-blue-600 text-white shadow-lg"
                              : "bg-white border-gray-300 text-gray-500 hover:bg-gray-50 hover:border-gray-400 hover:text-gray-700"
                          }`}
                        >
                          {page}
                        </button>
                      );
                    } else if (
                      page === currentPage - 2 ||
                      page === currentPage + 2
                    ) {
                      return (
                        <span key={page} className="px-2 py-2 text-gray-400">
                          ...
                        </span>
                      );
                    }
                    return null;
                  }
                )}
              </div>

              {/* Next Button */}
              <button
                onClick={() =>
                  setCurrentPage((prev) => Math.min(prev + 1, totalPages))
                }
                disabled={currentPage === totalPages}
                className={`relative inline-flex items-center px-4 py-2 text-sm font-medium rounded-lg border transition-all duration-200 ${
                  currentPage === totalPages
                    ? "text-gray-400 bg-gray-100 border-gray-200 cursor-not-allowed"
                    : "text-gray-700 bg-white border-gray-300 hover:bg-blue-50 hover:border-blue-300 hover:text-blue-700 hover:shadow-md"
                }`}
              >
                Next
                <svg
                  className="w-4 h-4 ml-2"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MessagesPage;
