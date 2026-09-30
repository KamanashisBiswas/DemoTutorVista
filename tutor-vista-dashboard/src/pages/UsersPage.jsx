// src/pages/UsersPage.jsx
import React, { useState, useEffect } from "react";
import {
  Eye,
  Trash2,
  Search,
  X,
  User,
  Mail,
  Calendar,
  Crown,
  ShieldCheck,
  CheckCircle2,
  Clock,
  UserCheck,
} from "lucide-react";
import ApiService from "../services/api";
import { useAuth } from "../context/AuthContext";
import Badge from "../components/ui/Badge";
import EmptyState from "../components/ui/EmptyState";
import { SkeletonTable } from "../components/ui/Skeleton";
import Modal from "../components/ui/Modal";
import Button from "../components/ui/Button";

const UsersPage = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const { user: currentUser } = useAuth();

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const data = await ApiService.getAllUsers();
      setUsers(data.data?.users || []);
    } catch (error) {
      setUsers([]);
    } finally {
      setLoading(false);
    }
  };

  const handleView = (user) => {
    setSelectedUser(user);
    setShowModal(true);
  };

  const handleDelete = async (id) => {
    if (
      window.confirm(
        "Are you sure you want to delete this user? This action cannot be undone."
      )
    ) {
      try {
        await ApiService.deleteUser(id);
        fetchUsers();
      } catch (error) {
        setUsers(users.filter((user) => user._id !== id));
      }
    }
  };

  const closeModal = () => {
    setShowModal(false);
    setSelectedUser(null);
  };

  const filteredUsers = users.filter((user) => {
    return (
      user.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email?.toLowerCase().includes(searchTerm.toLowerCase())
    );
  });

  const adminCount = users.filter((u) => u.role === "admin").length;
  const userCount = users.filter((u) => u.role === "user").length;

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="bg-white rounded-xl border border-[#E4E6EE] p-6 shadow-xs">
          <SkeletonTable rows={6} cols={6} />
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header & Stats */}
      <div className="bg-white rounded-xl border border-[#E4E6EE] p-6 shadow-xs">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
          <div>
            <h1 className="text-xl font-bold text-[#1A1D29]">User Management</h1>
            <p className="text-xs text-[#5B5F73] mt-1">
              Manage administrative staff and registered platform users
            </p>
          </div>
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-[#F5F3FF] text-[#7C3AED] border border-[#DDD6FE]">
              <Crown className="w-3.5 h-3.5" />
              {adminCount} Admins
            </span>
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-[#EFF6FF] text-[#2563EB] border border-[#BFDBFE]">
              <User className="w-3.5 h-3.5" />
              {userCount} Users
            </span>
          </div>
        </div>

        {/* Search */}
        <div className="flex flex-col md:flex-row mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-3.5 top-1/2 transform -translate-y-1/2 text-[#5B5F73] w-4 h-4 pointer-events-none" />
            <input
              type="text"
              placeholder="Search users by name or email address..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 text-sm bg-[#F7F8FB] border border-[#E4E6EE] rounded-lg text-[#1A1D29] placeholder-[#5B5F73] focus:outline-none focus:border-[#3730E0] focus:ring-2 focus:ring-[#3730E0]/15 transition-all"
            />
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto border border-[#E4E6EE] rounded-xl">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-[#F7F8FB] border-b border-[#E4E6EE] text-[11px] font-semibold text-[#5B5F73] uppercase tracking-wider">
                <th className="px-5 py-3.5">User</th>
                <th className="px-5 py-3.5">Email</th>
                <th className="px-5 py-3.5">Role</th>
                <th className="px-5 py-3.5">Status</th>
                <th className="px-5 py-3.5">Joined</th>
                <th className="px-5 py-3.5 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#E4E6EE] bg-white text-sm">
              {filteredUsers.length > 0 ? (
                filteredUsers.map((u) => (
                  <tr key={u._id} className="hover:bg-[#F7F8FB]/75 transition-colors">
                    <td className="px-5 py-4 whitespace-nowrap">
                      <div className="flex items-center gap-3">
                        <div
                          className={`w-10 h-10 rounded-full flex items-center justify-center text-white font-bold text-sm shadow-xs ${
                            u.role === "admin"
                              ? "bg-gradient-to-tr from-[#3730E0] to-[#7C3AED]"
                              : "bg-gradient-to-tr from-[#0EA5A0] to-[#0284C7]"
                          }`}
                        >
                          {u.name?.charAt(0)?.toUpperCase() || "U"}
                        </div>
                        <div>
                          <div className="font-semibold text-[#1A1D29] hover:text-[#3730E0] transition-colors">
                            {u.name || "Unnamed User"}
                          </div>
                          <div className="text-xs text-[#5B5F73] font-mono">
                            ID: {u._id?.substring(0, 8)}...
                          </div>
                        </div>
                      </div>
                    </td>

                    <td className="px-5 py-4 whitespace-nowrap">
                      <div className="flex items-center gap-1.5 text-sm text-[#1A1D29]">
                        <Mail className="w-4 h-4 text-[#5B5F73]" />
                        <span>{u.email}</span>
                      </div>
                      {u.isEmailVerified && (
                        <div className="text-[11px] text-[#16A34A] font-medium flex items-center gap-1 mt-0.5">
                          <CheckCircle2 className="w-3 h-3" />
                          Verified
                        </div>
                      )}
                    </td>

                    <td className="px-5 py-4 whitespace-nowrap">
                      {u.role === "admin" ? (
                        <Badge variant="primary" dot size="sm">
                          Admin
                        </Badge>
                      ) : (
                        <Badge variant="neutral" dot size="sm">
                          User
                        </Badge>
                      )}
                    </td>

                    <td className="px-5 py-4 whitespace-nowrap">
                      {u.lastLogin ? (
                        <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium bg-[#DCFCE7] text-[#15803D]">
                          <span className="w-1.5 h-1.5 rounded-full bg-[#16A34A]"></span>
                          Active
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium bg-[#F1F5F9] text-[#64748B]">
                          <span className="w-1.5 h-1.5 rounded-full bg-[#94A3B8]"></span>
                          Inactive
                        </span>
                      )}
                    </td>

                    <td className="px-5 py-4 whitespace-nowrap text-xs text-[#5B5F73]">
                      {new Date(u.createdAt).toLocaleDateString("en-US", {
                        month: "short",
                        day: "numeric",
                        year: "numeric",
                      })}
                    </td>

                    <td className="px-5 py-4 whitespace-nowrap text-right">
                      <div className="flex items-center justify-end gap-1.5">
                        <button
                          onClick={() => handleView(u)}
                          className="p-1.5 text-[#5B5F73] hover:text-[#3730E0] hover:bg-[#EEF2FF] rounded-lg transition-colors"
                          title="View User Details"
                        >
                          <Eye className="w-4 h-4" />
                        </button>
                        {currentUser?.role === "admin" && currentUser._id !== u._id && (
                          <button
                            onClick={() => handleDelete(u._id)}
                            className="p-1.5 text-[#5B5F73] hover:text-[#DC2626] hover:bg-[#FEF2F2] rounded-lg transition-colors"
                            title="Delete User"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={6} className="py-12">
                    <EmptyState
                      title="No users found"
                      description={
                        searchTerm
                          ? `No user matched your search "${searchTerm}".`
                          : "No users currently registered."
                      }
                      icon={<UserCheck className="w-8 h-8 text-[#5B5F73]" />}
                    />
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* User Details Modal */}
      {showModal && selectedUser && (
        <Modal
          isOpen={showModal}
          onClose={closeModal}
          title="User Account Details"
          size="lg"
        >
          <div className="space-y-6">
            {/* Header Card */}
            <div className="flex items-center gap-4 p-4 rounded-xl bg-[#F7F8FB] border border-[#E4E6EE]">
              <div
                className={`w-14 h-14 rounded-full flex items-center justify-center text-white font-bold text-xl shadow-xs ${
                  selectedUser.role === "admin"
                    ? "bg-gradient-to-tr from-[#3730E0] to-[#7C3AED]"
                    : "bg-gradient-to-tr from-[#0EA5A0] to-[#0284C7]"
                }`}
              >
                {selectedUser.name?.charAt(0)?.toUpperCase() || "U"}
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <h3 className="text-lg font-bold text-[#1A1D29]">
                    {selectedUser.name}
                  </h3>
                  {selectedUser.role === "admin" ? (
                    <Badge variant="primary" size="sm">
                      Admin
                    </Badge>
                  ) : (
                    <Badge variant="neutral" size="sm">
                      User
                    </Badge>
                  )}
                </div>
                <p className="text-xs text-[#5B5F73] font-mono mt-0.5">
                  ID: {selectedUser._id}
                </p>
              </div>
            </div>

            {/* Profile Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4 rounded-xl border border-[#E4E6EE] bg-white">
                <span className="text-xs font-medium text-[#5B5F73] block mb-1">
                  Email Address
                </span>
                <div className="flex items-center gap-2">
                  <Mail className="w-4 h-4 text-[#3730E0]" />
                  <span className="text-sm font-semibold text-[#1A1D29]">
                    {selectedUser.email}
                  </span>
                </div>
                {selectedUser.isEmailVerified && (
                  <span className="text-[11px] text-[#16A34A] font-medium flex items-center gap-1 mt-1">
                    <CheckCircle2 className="w-3 h-3" />
                    Verified Email
                  </span>
                )}
              </div>

              <div className="p-4 rounded-xl border border-[#E4E6EE] bg-white">
                <span className="text-xs font-medium text-[#5B5F73] block mb-1">
                  Access Level
                </span>
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-[#3730E0]" />
                  <span className="text-sm font-semibold text-[#1A1D29] capitalize">
                    {selectedUser.role} Access
                  </span>
                </div>
              </div>

              <div className="p-4 rounded-xl border border-[#E4E6EE] bg-white">
                <span className="text-xs font-medium text-[#5B5F73] block mb-1">
                  Registration Date
                </span>
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-[#3730E0]" />
                  <span className="text-sm font-medium text-[#1A1D29]">
                    {new Date(selectedUser.createdAt).toLocaleString()}
                  </span>
                </div>
              </div>

              <div className="p-4 rounded-xl border border-[#E4E6EE] bg-white">
                <span className="text-xs font-medium text-[#5B5F73] block mb-1">
                  Last Activity
                </span>
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-[#3730E0]" />
                  <span className="text-sm font-medium text-[#1A1D29]">
                    {selectedUser.lastLogin
                      ? new Date(selectedUser.lastLogin).toLocaleString()
                      : "Never logged in"}
                  </span>
                </div>
              </div>
            </div>

            <div className="flex justify-end pt-4 border-t border-[#E4E6EE]">
              <Button variant="secondary" onClick={closeModal}>
                Close
              </Button>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
};

export default UsersPage;
