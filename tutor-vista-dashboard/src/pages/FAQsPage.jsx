// src/pages/FAQsPage.jsx
import React, { useState, useEffect } from "react";
import {
  Eye,
  Edit,
  Trash2,
  Plus,
  Search,
  X,
  HelpCircle,
  CheckCircle2,
  XCircle,
  Check,
} from "lucide-react";
import ApiService from "../services/api";
import DeleteConfirm from "../components/DeleteConfirm";
import { Button } from "../components/ui/Button";
import { Badge } from "../components/ui/Badge";
import { Modal } from "../components/ui/Modal";
import { EmptyState } from "../components/ui/EmptyState";
import { SkeletonTable } from "../components/ui/Skeleton";

const FAQsPage = () => {
  const [faqs, setFaqs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [selectedFaq, setSelectedFaq] = useState(null);
  const [modalType, setModalType] = useState("view"); // 'view', 'edit', 'add'
  const [searchTerm, setSearchTerm] = useState("");
  const [activeFilter, setActiveFilter] = useState(false);
  const [inactiveFilter, setInactiveFilter] = useState(false);
  const [formData, setFormData] = useState({
    question: "",
    answer: "",
    isActive: true,
  });

  useEffect(() => {
    fetchFAQs();
  }, []);

  const fetchFAQs = async () => {
    try {
      const data = await ApiService.getAllFAQsAdmin();
      setFaqs(data.data?.faqs || data.faqs || []);
    } catch (error) {
      console.error("Error fetching FAQs:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleView = (faq) => {
    setSelectedFaq(faq);
    setModalType("view");
    setShowModal(true);
  };

  const handleEdit = (faq) => {
    setSelectedFaq(faq);
    setFormData({
      question: faq.question,
      answer: faq.answer,
      isActive: faq.isActive,
    });
    setModalType("edit");
    setShowModal(true);
  };

  const handleAdd = () => {
    setSelectedFaq(null);
    setFormData({
      question: "",
      answer: "",
      isActive: true,
    });
    setModalType("add");
    setShowModal(true);
  };

  const deleteConfirm = DeleteConfirm({});

  const handleDelete = async (id) => {
    deleteConfirm.handleDelete({
      onDelete: async () => {
        await ApiService.deleteFAQ(id);
        fetchFAQs();
      },
      itemName: "FAQ Item",
      itemType: "FAQ",
      customMessage: "Are you sure you want to permanently delete this FAQ?",
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (modalType === "add") {
        await ApiService.createFAQ(formData);
      } else if (modalType === "edit") {
        await ApiService.updateFAQ(selectedFaq._id, formData);
      }
      fetchFAQs();
      closeModal();
    } catch (error) {
      console.error("Error saving FAQ:", error);
    }
  };

  const closeModal = () => {
    setShowModal(false);
    setSelectedFaq(null);
    setFormData({
      question: "",
      answer: "",
      isActive: true,
    });
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const filteredFaqs = faqs.filter((faq) => {
    const matchesSearch =
      faq.question?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      faq.answer?.toLowerCase().includes(searchTerm.toLowerCase());

    let matchesStatus = true;
    if (activeFilter && inactiveFilter) {
      matchesStatus = true;
    } else if (activeFilter) {
      matchesStatus = faq.isActive;
    } else if (inactiveFilter) {
      matchesStatus = !faq.isActive;
    }

    return matchesSearch && matchesStatus;
  });

  return (
    <div className="space-y-6">
      {/* Header and Controls */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-xl sm:text-2xl font-extrabold text-[#1A1D29] tracking-tight">
              FAQ & Knowledge Management
            </h2>
            <span className="text-[11px] font-bold text-[#3730E0] bg-[#EEEDFD] px-2.5 py-0.5 rounded-full border border-[#DDD9FC]">
              {faqs.length} Total
            </span>
          </div>
          <p className="text-xs sm:text-sm text-[#5B5F73] mt-0.5">
            Manage frequently asked questions displayed on the public landing page.
          </p>
        </div>

        <Button
          variant="primary"
          size="sm"
          onClick={handleAdd}
          iconLeft={Plus}
        >
          Add New FAQ
        </Button>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white rounded-2xl border border-[#E4E6EE] p-4 sm:p-5 shadow-xs flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
        <div className="relative flex-1 max-w-md">
          <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-[#5B5F73]">
            <Search className="w-4 h-4" />
          </div>
          <input
            type="text"
            className="w-full pl-10 pr-4 py-2 bg-[#F7F8FB] border border-[#E4E6EE] rounded-xl text-xs sm:text-sm text-[#1A1D29] placeholder:text-[#5B5F73]/60 focus:bg-white focus:outline-none focus:border-[#3730E0] focus:ring-2 focus:ring-[#3730E0]/15 transition-all"
            placeholder="Search FAQs by question or answer..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        {/* Status Pill Filters */}
        <div className="flex items-center gap-2">
          <span className="text-xs font-semibold text-[#5B5F73]">Status:</span>
          <button
            type="button"
            onClick={() => setActiveFilter(!activeFilter)}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold border transition-all ${
              activeFilter
                ? "bg-[#DCFCE7] text-[#16A34A] border-[#BBF7D0]"
                : "bg-[#F7F8FB] text-[#5B5F73] border-[#E4E6EE] hover:bg-white"
            }`}
          >
            <CheckCircle2 className="w-3.5 h-3.5" />
            <span>Active</span>
          </button>
          <button
            type="button"
            onClick={() => setInactiveFilter(!inactiveFilter)}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold border transition-all ${
              inactiveFilter
                ? "bg-red-50 text-[#DC2626] border-red-200"
                : "bg-[#F7F8FB] text-[#5B5F73] border-[#E4E6EE] hover:bg-white"
            }`}
          >
            <XCircle className="w-3.5 h-3.5" />
            <span>Inactive</span>
          </button>
        </div>
      </div>

      {/* FAQs Table */}
      {loading ? (
        <SkeletonTable rows={5} cols={4} />
      ) : filteredFaqs.length === 0 ? (
        <EmptyState
          icon={HelpCircle}
          title="No FAQs Found"
          description={
            searchTerm
              ? `No FAQ entries matched "${searchTerm}". Try a different search.`
              : "No FAQs currently created in the knowledge base."
          }
          actionLabel="Add First FAQ"
          onAction={handleAdd}
        />
      ) : (
        <div className="bg-white rounded-2xl border border-[#E4E6EE] shadow-xs overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead className="bg-[#F7F8FB] border-b border-[#E4E6EE] text-[11px] font-bold uppercase tracking-wider text-[#5B5F73]">
                <tr>
                  <th className="py-3.5 px-4">Question</th>
                  <th className="py-3.5 px-4">Answer Preview</th>
                  <th className="py-3.5 px-4">Status</th>
                  <th className="py-3.5 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#E4E6EE] text-xs sm:text-sm text-[#1A1D29]">
                {filteredFaqs.map((faq) => (
                  <tr
                    key={faq._id}
                    className="hover:bg-[#F7F8FB]/60 transition-colors group"
                  >
                    <td className="py-3.5 px-4 max-w-sm">
                      <div className="flex items-start gap-2.5">
                        <HelpCircle className="w-4 h-4 text-[#3730E0] shrink-0 mt-0.5" />
                        <span className="font-bold text-[#1A1D29]">
                          {faq.question}
                        </span>
                      </div>
                    </td>
                    <td className="py-3.5 px-4 max-w-md">
                      <p className="text-xs text-[#5B5F73] line-clamp-2">
                        {faq.answer}
                      </p>
                    </td>
                    <td className="py-3.5 px-4 whitespace-nowrap">
                      {faq.isActive ? (
                        <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold bg-[#DCFCE7] text-[#16A34A]">
                          <CheckCircle2 className="w-3 h-3" />
                          <span>Active</span>
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold bg-gray-100 text-[#5B5F73]">
                          <XCircle className="w-3 h-3" />
                          <span>Hidden</span>
                        </span>
                      )}
                    </td>
                    <td className="py-3.5 px-4 text-right whitespace-nowrap">
                      <div className="flex items-center justify-end gap-1.5">
                        <button
                          onClick={() => handleView(faq)}
                          className="p-1.5 rounded-lg text-[#5B5F73] hover:text-[#3730E0] hover:bg-[#EEEDFD] transition-colors"
                          title="View FAQ"
                        >
                          <Eye className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleEdit(faq)}
                          className="p-1.5 rounded-lg text-[#5B5F73] hover:text-[#16A34A] hover:bg-green-50 transition-colors"
                          title="Edit FAQ"
                        >
                          <Edit className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleDelete(faq._id)}
                          className="p-1.5 rounded-lg text-[#5B5F73] hover:text-[#DC2626] hover:bg-red-50 transition-colors"
                          title="Delete FAQ"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Add / Edit / View Modal */}
      {showModal && (
        <Modal
          isOpen={showModal}
          onClose={closeModal}
          title={
            modalType === "view"
              ? "FAQ Entry Details"
              : modalType === "edit"
              ? "Edit FAQ Entry"
              : "Create New FAQ Entry"
          }
          subtitle="Customer facing question and answer"
          maxWidth="max-w-xl"
        >
          {modalType === "view" && selectedFaq ? (
            <div className="space-y-4">
              <div className="p-4 bg-[#F7F8FB] border border-[#E4E6EE] rounded-xl space-y-1">
                <span className="text-[11px] font-bold uppercase text-[#3730E0]">
                  Question
                </span>
                <p className="text-sm font-bold text-[#1A1D29]">
                  {selectedFaq.question}
                </p>
              </div>

              <div className="p-4 bg-white border border-[#E4E6EE] rounded-xl space-y-1">
                <span className="text-[11px] font-bold uppercase text-[#5B5F73]">
                  Answer
                </span>
                <p className="text-xs sm:text-sm text-[#1A1D29] leading-relaxed whitespace-pre-wrap">
                  {selectedFaq.answer}
                </p>
              </div>

              <div className="flex items-center justify-between pt-3 border-t border-[#E4E6EE]">
                <div className="flex items-center gap-2">
                  <span className="text-xs text-[#5B5F73]">Status:</span>
                  {selectedFaq.isActive ? (
                    <Badge variant="success" size="sm">Active</Badge>
                  ) : (
                    <Badge variant="neutral" size="sm">Inactive</Badge>
                  )}
                </div>
                <Button variant="secondary" size="sm" onClick={closeModal}>
                  Close
                </Button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-[#1A1D29] mb-1.5">
                  Question <span className="text-[#DC2626]">*</span>
                </label>
                <textarea
                  name="question"
                  value={formData.question}
                  onChange={handleInputChange}
                  required
                  rows={2}
                  className="w-full px-3.5 py-2.5 bg-white border border-[#E4E6EE] rounded-xl text-xs sm:text-sm text-[#1A1D29] focus:outline-none focus:border-[#3730E0] focus:ring-2 focus:ring-[#3730E0]/15 resize-none"
                  placeholder="e.g. How does TutorVista verify tutor credentials?"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#1A1D29] mb-1.5">
                  Answer <span className="text-[#DC2626]">*</span>
                </label>
                <textarea
                  name="answer"
                  value={formData.answer}
                  onChange={handleInputChange}
                  required
                  rows={5}
                  className="w-full px-3.5 py-2.5 bg-white border border-[#E4E6EE] rounded-xl text-xs sm:text-sm text-[#1A1D29] focus:outline-none focus:border-[#3730E0] focus:ring-2 focus:ring-[#3730E0]/15 resize-none"
                  placeholder="Provide a clear, helpful response for website visitors..."
                />
              </div>

              <div className="flex items-center gap-2 pt-1">
                <input
                  type="checkbox"
                  id="faqIsActiveCheckbox"
                  name="isActive"
                  checked={formData.isActive}
                  onChange={handleInputChange}
                  className="w-4 h-4 rounded text-[#3730E0] focus:ring-[#3730E0]"
                />
                <label
                  htmlFor="faqIsActiveCheckbox"
                  className="text-xs sm:text-sm font-medium text-[#1A1D29] cursor-pointer"
                >
                  Active (Visible on public FAQ section)
                </label>
              </div>

              <div className="pt-4 border-t border-[#E4E6EE] flex items-center justify-end gap-2.5">
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  onClick={closeModal}
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  variant="primary"
                  size="sm"
                >
                  {modalType === "add" ? "Create FAQ" : "Save Changes"}
                </Button>
              </div>
            </form>
          )}
        </Modal>
      )}
    </div>
  );
};

export default FAQsPage;
