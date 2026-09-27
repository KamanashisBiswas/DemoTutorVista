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
  CheckCircle,
  XCircle,
} from "lucide-react";
import ApiService from "../services/api";
import DeleteConfirm from "../components/DeleteConfirm";

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
      setFaqs(data.data?.faqs || []);
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
      itemName: "FAQ",
      itemType: "FAQ",
      customMessage: "Are you sure you want to delete this FAQ?",
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

    // Status filter logic
    let matchesStatus = true;
    if (activeFilter && inactiveFilter) {
      // Both checked - show all
      matchesStatus = true;
    } else if (activeFilter) {
      // Only active checked
      matchesStatus = faq.isActive;
    } else if (inactiveFilter) {
      // Only inactive checked
      matchesStatus = !faq.isActive;
    } else {
      // None checked - show all
      matchesStatus = true;
    }

    return matchesSearch && matchesStatus;
  });

  const getStatusBadge = (isActive) => {
    return isActive ? (
      <span className="px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800 inline-flex items-center">
        <CheckCircle className="w-3 h-3 mr-1" />
        Active
      </span>
    ) : (
      <span className="px-2 py-1 rounded-full text-xs font-medium bg-red-100 text-red-800 inline-flex items-center">
        <XCircle className="w-3 h-3 mr-1" />
        Inactive
      </span>
    );
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
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-4 md:mb-0">
            FAQ Management
          </h3>
          <div className="flex items-center space-x-4">
            <button
              onClick={handleAdd}
              className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors duration-200 flex items-center space-x-2"
            >
              <Plus className="w-5 h-5" />
              <span>Add FAQ</span>
            </button>
          </div>
        </div>

        {/* Filters */}
        <div className="flex flex-col lg:flex-row space-y-4 lg:space-y-0 lg:space-x-6 mb-6">
          {/* Search Bar */}
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search FAQs by question or answer..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white shadow-sm"
              />
            </div>
          </div>

          {/* Status Filter Checkboxes */}
          <div className="flex items-center space-x-4">
            <span className="text-sm font-medium text-gray-700">
              Filter by Status:
            </span>
            <div className="flex items-center space-x-4 bg-gray-50 rounded-lg p-3">
              {/* Active Checkbox */}
              <label className="flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={activeFilter}
                  onChange={(e) => setActiveFilter(e.target.checked)}
                  className="sr-only"
                />
                <div
                  className={`flex items-center space-x-2 px-3 py-1.5 rounded-md transition-all duration-200 ${
                    activeFilter
                      ? "bg-green-100 text-green-700 border border-green-200"
                      : "text-gray-600 hover:bg-gray-100"
                  }`}
                >
                  <div
                    className={`w-4 h-4 rounded border-2 flex items-center justify-center transition-colors ${
                      activeFilter
                        ? "bg-green-500 border-green-500"
                        : "border-gray-300 bg-white"
                    }`}
                  >
                    {activeFilter && (
                      <CheckCircle className="w-3 h-3 text-white" />
                    )}
                  </div>
                  <CheckCircle
                    className={`w-4 h-4 ${
                      activeFilter ? "text-green-500" : "text-gray-400"
                    }`}
                  />
                  <span className="text-sm font-medium">Active</span>
                  <span className="text-xs bg-white px-2 py-0.5 rounded-full">
                    {faqs.filter((f) => f.isActive).length}
                  </span>
                </div>
              </label>

              {/* Inactive Checkbox */}
              <label className="flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={inactiveFilter}
                  onChange={(e) => setInactiveFilter(e.target.checked)}
                  className="sr-only"
                />
                <div
                  className={`flex items-center space-x-2 px-3 py-1.5 rounded-md transition-all duration-200 ${
                    inactiveFilter
                      ? "bg-red-100 text-red-700 border border-red-200"
                      : "text-gray-600 hover:bg-gray-100"
                  }`}
                >
                  <div
                    className={`w-4 h-4 rounded border-2 flex items-center justify-center transition-colors ${
                      inactiveFilter
                        ? "bg-red-500 border-red-500"
                        : "border-gray-300 bg-white"
                    }`}
                  >
                    {inactiveFilter && (
                      <XCircle className="w-3 h-3 text-white" />
                    )}
                  </div>
                  <XCircle
                    className={`w-4 h-4 ${
                      inactiveFilter ? "text-red-500" : "text-gray-400"
                    }`}
                  />
                  <span className="text-sm font-medium">Inactive</span>
                  <span className="text-xs bg-white px-2 py-0.5 rounded-full">
                    {faqs.filter((f) => !f.isActive).length}
                  </span>
                </div>
              </label>
            </div>
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full table-auto">
            <thead>
              <tr className="bg-gray-50">
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Question
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Answer Preview
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Created
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredFaqs.map((faq) => (
                <tr key={faq._id} className="hover:bg-gray-50">
                  <td className="px-4 py-4">
                    <div className="flex items-start">
                      <HelpCircle className="w-5 h-5 text-blue-500 mr-2 mt-0.5 flex-shrink-0" />
                      <div className="text-sm font-medium text-gray-900 max-w-xs">
                        {faq.question?.substring(0, 100)}
                        {faq.question?.length > 100 && "..."}
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-4 max-w-sm">
                    <div className="text-sm text-gray-600">
                      {faq.answer?.substring(0, 150)}
                      {faq.answer?.length > 150 && "..."}
                    </div>
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap">
                    {getStatusBadge(faq.isActive)}
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500">
                    {new Date(faq.createdAt).toLocaleDateString()}
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="flex space-x-2">
                      <button
                        onClick={() => handleView(faq)}
                        className="text-blue-600 hover:text-blue-900 p-1 rounded"
                        title="View FAQ"
                      >
                        <Eye className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleEdit(faq)}
                        className="text-green-600 hover:text-green-900 p-1 rounded"
                        title="Edit FAQ"
                      >
                        <Edit className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleDelete(faq._id)}
                        className="text-red-600 hover:text-red-900 p-1 rounded"
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

          {filteredFaqs.length === 0 && (
            <div className="text-center py-8 text-gray-500">No FAQs found.</div>
          )}
        </div>
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-xl w-full max-w-3xl max-h-[90vh] overflow-hidden">
            <div className="flex items-center justify-between p-6 border-b border-gray-200">
              <h3 className="text-lg font-semibold text-gray-800">
                {modalType === "view"
                  ? "View FAQ"
                  : modalType === "edit"
                  ? "Edit FAQ"
                  : "Add FAQ"}
              </h3>
              <button
                onClick={closeModal}
                className="text-gray-400 hover:text-gray-600 p-1 rounded"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            <div className="p-6 overflow-y-auto max-h-[calc(90vh-120px)]">
              {modalType === "view" && selectedFaq ? (
                <div className="space-y-6">
                  <div className="bg-gray-50 rounded-lg p-4">
                    <h4 className="font-semibold text-gray-800 mb-3 flex items-center">
                      <HelpCircle className="w-5 h-5 mr-2" />
                      Question
                    </h4>
                    <p className="text-gray-800">{selectedFaq.question}</p>
                  </div>

                  <div className="bg-gray-50 rounded-lg p-4">
                    <h4 className="font-semibold text-gray-800 mb-3">Answer</h4>
                    <p className="text-gray-800 whitespace-pre-wrap">
                      {selectedFaq.answer}
                    </p>
                  </div>

                  <div className="bg-gray-50 rounded-lg p-4">
                    <h4 className="font-semibold text-gray-800 mb-3">
                      FAQ Information
                    </h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="text-sm font-medium text-gray-600">
                          Status
                        </label>
                        <div className="mt-1">
                          {getStatusBadge(selectedFaq.isActive)}
                        </div>
                      </div>
                      <div>
                        <label className="text-sm font-medium text-gray-600">
                          Created
                        </label>
                        <p className="text-gray-800">
                          {new Date(selectedFaq.createdAt).toLocaleDateString()}
                        </p>
                      </div>
                      <div>
                        <label className="text-sm font-medium text-gray-600">
                          Last Updated
                        </label>
                        <p className="text-gray-800">
                          {new Date(selectedFaq.updatedAt).toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* View Mode Cancel Button */}
                  <div className="flex justify-end pt-4 border-t">
                    <button
                      onClick={closeModal}
                      className="px-6 py-2 bg-red-600 text-white rounded-lg font-semibold hover:bg-red-700 transition"
                    >
                      <span>Close</span>
                    </button>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Question *
                    </label>
                    <textarea
                      name="question"
                      value={formData.question}
                      onChange={handleInputChange}
                      required
                      rows={3}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                      placeholder="Enter the FAQ question..."
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Answer *
                    </label>
                    <textarea
                      name="answer"
                      value={formData.answer}
                      onChange={handleInputChange}
                      required
                      rows={6}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                      placeholder="Enter the FAQ answer..."
                    />
                  </div>

                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      name="isActive"
                      checked={formData.isActive}
                      onChange={handleInputChange}
                      className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                    />
                    <label className="ml-2 block text-sm text-gray-700">
                      Active (visible to public)
                    </label>
                  </div>

                  {/* Form Mode Cancel Button */}
                  <div className="flex justify-end space-x-4 pt-4 border-t">
                    <button
                      type="button"
                      onClick={closeModal}
                      className="px-6 py-2 bg-red-600 text-white rounded-lg font-semibold hover:bg-red-700 transition"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors duration-200"
                    >
                      {modalType === "add" ? "Create FAQ" : "Update FAQ"}
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default FAQsPage;
