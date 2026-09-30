// src/pages/MessagesPage.jsx
import React, { useEffect, useState } from "react";
import { Trash2, Phone, User, Calendar, Mail, Search, MessageSquare } from "lucide-react";
import ApiService from "../services/api";
import { useAuth } from "../context/AuthContext";
import DeleteConfirm from "../components/DeleteConfirm";
import { EmptyState } from "../components/ui/EmptyState";
import { SkeletonCard } from "../components/ui/Skeleton";
import { Pagination } from "../components/ui/Pagination";
import { Badge } from "../components/ui/Badge";

const MessagesPage = () => {
  const { user } = useAuth();
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  useEffect(() => {
    fetchMessages();
  }, []);

  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm]);

  const fetchMessages = async () => {
    setLoading(true);
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

  const deleteConfirm = DeleteConfirm({});

  const handleDelete = (id, senderName) => {
    deleteConfirm.handleDelete({
      onDelete: async () => {
        await ApiService.deleteMessage(id);
        setMessages((prev) => prev.filter((msg) => msg._id !== id));
      },
      itemName: senderName,
      itemType: "message",
      customMessage: `Are you sure you want to permanently delete the inquiry from ${senderName}?`,
    });
  };

  const filteredMessages = messages.filter(
    (msg) =>
      msg.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      msg.phoneNumber?.includes(searchTerm) ||
      msg.message?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentMessages = filteredMessages.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredMessages.length / itemsPerPage);

  return (
    <div className="space-y-6">
      {/* Header & Search */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-xl sm:text-2xl font-extrabold text-[#1A1D29] tracking-tight">
              Inquiries & Messages
            </h2>
            <span className="text-[11px] font-bold text-[#F5A524] bg-[#FFFBEB] px-2.5 py-0.5 rounded-full border border-[#FDE68A]">
              {messages.length} Total
            </span>
          </div>
          <p className="text-xs sm:text-sm text-[#5B5F73] mt-0.5">
            Incoming guardian, tutor, and visitor inquiries submitted through the contact form.
          </p>
        </div>

        <div className="relative w-full sm:w-72">
          <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-[#5B5F73]">
            <Search className="w-4 h-4" />
          </div>
          <input
            type="text"
            className="w-full pl-10 pr-4 py-2 bg-white border border-[#E4E6EE] rounded-xl text-xs sm:text-sm text-[#1A1D29] placeholder:text-[#5B5F73]/60 focus:outline-none focus:border-[#3730E0] focus:ring-2 focus:ring-[#3730E0]/15 transition-all shadow-xs"
            placeholder="Search messages or phone..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      {/* Messages Feed */}
      {loading ? (
        <div className="space-y-4">
          {Array.from({ length: 4 }).map((_, i) => (
            <SkeletonCard key={i} className="h-32" />
          ))}
        </div>
      ) : filteredMessages.length === 0 ? (
        <EmptyState
          icon={Mail}
          title="No Messages in Inbox"
          description={
            searchTerm
              ? `No messages found matching "${searchTerm}". Try a different term.`
              : "When visitors submit messages through the website contact form, they will appear here."
          }
          actionLabel={searchTerm ? "Clear Search" : undefined}
          onAction={() => setSearchTerm("")}
        />
      ) : (
        <div className="space-y-4">
          {currentMessages.map((msg) => (
            <div
              key={msg._id}
              className="bg-white rounded-2xl border border-[#E4E6EE] p-5 shadow-xs hover:border-[#3730E0]/30 hover:shadow-card transition-all"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-[#E4E6EE]">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-[#EEEDFD] text-[#3730E0] flex items-center justify-center font-bold text-xs shrink-0">
                    {(msg.name || "U").charAt(0).toUpperCase()}
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-[#1A1D29]">
                      {msg.name || "Anonymous Visitor"}
                    </h4>
                    <div className="flex items-center gap-2 text-xs text-[#5B5F73] mt-0.5">
                      <span className="flex items-center gap-1 font-semibold text-[#1A1D29]">
                        <Phone className="w-3 h-3 text-[#16A34A]" />
                        {msg.phoneNumber || "No phone"}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-between sm:justify-end gap-3 text-xs text-[#5B5F73]">
                  <span className="flex items-center gap-1">
                    <Calendar className="w-3.5 h-3.5 text-[#3730E0]" />
                    {msg.createdAt
                      ? new Date(msg.createdAt).toLocaleString("en-GB", {
                          day: "numeric",
                          month: "short",
                          year: "numeric",
                          hour: "2-digit",
                          minute: "2-digit",
                        })
                      : "Recent"}
                  </span>

                  {user?.role === "admin" && (
                    <button
                      onClick={() => handleDelete(msg._id, msg.name)}
                      className="p-1.5 rounded-lg text-[#5B5F73] hover:text-[#DC2626] hover:bg-red-50 transition-colors"
                      title="Delete Message"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  )}
                </div>
              </div>

              {/* Message Content Bubble */}
              <div className="mt-3.5 p-3.5 rounded-xl bg-[#F7F8FB] border border-[#E4E6EE] text-xs sm:text-sm text-[#1A1D29] leading-relaxed">
                {msg.message || "No content provided."}
              </div>
            </div>
          ))}

          {totalPages > 1 && (
            <div className="bg-white p-4 rounded-2xl border border-[#E4E6EE] flex items-center justify-between">
              <span className="text-xs text-[#5B5F73]">
                Showing {indexOfFirstItem + 1} to {Math.min(indexOfLastItem, filteredMessages.length)} of {filteredMessages.length} messages
              </span>
              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={(p) => setCurrentPage(p)}
              />
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default MessagesPage;
