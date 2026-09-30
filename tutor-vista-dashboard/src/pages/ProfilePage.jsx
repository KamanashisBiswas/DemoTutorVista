// src/pages/ProfilePage.jsx
import React, { useState, useEffect } from "react";
import {
  User,
  Mail,
  Shield,
  Calendar,
  Save,
  X,
  Edit2,
  Clock,
  CheckCircle,
  Crown,
} from "lucide-react";
import ApiService from "../services/api";
import Button from "../components/ui/Button";
import Badge from "../components/ui/Badge";
import Card from "../components/ui/Card";
import Input from "../components/ui/Input";

const ProfilePage = () => {
  const [profile, setProfile] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      const data = await ApiService.getProfile();
      setProfile(data.user);
      setFormData({
        name: data.user.name,
        email: data.user.email,
      });
    } catch (error) {
      console.error("Error fetching profile:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      await ApiService.updateUserProfile(formData);
      await fetchProfile();
      setIsEditing(false);
      setSuccessMessage("Profile updated successfully!");
      setTimeout(() => setSuccessMessage(""), 4000);
    } catch (error) {
      console.error("Error updating profile:", error);
    } finally {
      setSaving(false);
    }
  };

  const handleCancel = () => {
    setFormData({
      name: profile?.name || "",
      email: profile?.email || "",
    });
    setIsEditing(false);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-72">
        <div className="flex flex-col items-center gap-3">
          <div className="w-10 h-10 border-3 border-[#3730E0] border-t-transparent rounded-full animate-spin"></div>
          <span className="text-xs text-[#5B5F73] font-medium">Loading profile...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Top Banner Card */}
      <div className="bg-white rounded-2xl border border-[#E4E6EE] shadow-xs overflow-hidden">
        <div className="h-32 bg-gradient-to-r from-[#3730E0] via-[#4338CA] to-[#0EA5A0] relative">
          <div className="absolute inset-0 bg-black/10"></div>
        </div>

        <div className="px-6 pb-6 pt-0 relative">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 -mt-12 mb-6">
            <div className="flex items-end gap-4">
              <div className="w-24 h-24 rounded-2xl bg-white p-1.5 shadow-md flex-shrink-0">
                <div className="w-full h-full rounded-xl bg-gradient-to-tr from-[#3730E0] to-[#7C3AED] flex items-center justify-center text-white text-3xl font-bold">
                  {profile?.name?.charAt(0)?.toUpperCase() || "A"}
                </div>
              </div>
              <div className="mb-1">
                <div className="flex items-center gap-2">
                  <h1 className="text-xl font-bold text-[#1A1D29]">
                    {profile?.name}
                  </h1>
                  <Badge variant="primary" size="sm">
                    <Crown className="w-3 h-3 mr-1 inline" />
                    {profile?.role === "admin" ? "Super Admin" : profile?.role}
                  </Badge>
                </div>
                <p className="text-xs text-[#5B5F73] flex items-center gap-1.5 mt-0.5">
                  <Mail className="w-3.5 h-3.5" />
                  {profile?.email}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              {!isEditing ? (
                <Button
                  variant="primary"
                  size="sm"
                  onClick={() => setIsEditing(true)}
                  icon={Edit2}
                >
                  Edit Profile
                </Button>
              ) : (
                <div className="flex items-center gap-2">
                  <Button
                    variant="primary"
                    size="sm"
                    onClick={handleSave}
                    disabled={saving}
                    icon={Save}
                  >
                    {saving ? "Saving..." : "Save Changes"}
                  </Button>
                  <Button
                    variant="secondary"
                    size="sm"
                    onClick={handleCancel}
                    disabled={saving}
                    icon={X}
                  >
                    Cancel
                  </Button>
                </div>
              )}
            </div>
          </div>

          {successMessage && (
            <div className="mb-6 p-3 rounded-lg bg-[#DCFCE7] border border-[#BBF7D0] text-[#15803D] text-xs font-semibold flex items-center gap-2">
              <CheckCircle className="w-4 h-4" />
              <span>{successMessage}</span>
            </div>
          )}

          {/* Profile Details Form */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4 border-t border-[#E4E6EE]">
            <div className="space-y-4">
              <h3 className="text-sm font-bold text-[#1A1D29] uppercase tracking-wider text-xs">
                Personal Credentials
              </h3>

              <div>
                <label className="block text-xs font-semibold text-[#5B5F73] mb-1.5">
                  Full Name
                </label>
                {isEditing ? (
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    className="w-full px-3.5 py-2.5 text-sm bg-[#F7F8FB] border border-[#E4E6EE] rounded-lg text-[#1A1D29] focus:outline-none focus:border-[#3730E0] focus:ring-2 focus:ring-[#3730E0]/15 transition-all"
                  />
                ) : (
                  <div className="flex items-center gap-2 px-3.5 py-2.5 bg-[#F7F8FB] border border-[#E4E6EE] rounded-lg text-sm text-[#1A1D29] font-medium">
                    <User className="w-4 h-4 text-[#5B5F73]" />
                    <span>{profile?.name}</span>
                  </div>
                )}
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#5B5F73] mb-1.5">
                  Email Address
                </label>
                {isEditing ? (
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="w-full px-3.5 py-2.5 text-sm bg-[#F7F8FB] border border-[#E4E6EE] rounded-lg text-[#1A1D29] focus:outline-none focus:border-[#3730E0] focus:ring-2 focus:ring-[#3730E0]/15 transition-all"
                  />
                ) : (
                  <div className="flex items-center gap-2 px-3.5 py-2.5 bg-[#F7F8FB] border border-[#E4E6EE] rounded-lg text-sm text-[#1A1D29] font-medium">
                    <Mail className="w-4 h-4 text-[#5B5F73]" />
                    <span>{profile?.email}</span>
                  </div>
                )}
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="text-sm font-bold text-[#1A1D29] uppercase tracking-wider text-xs">
                Administrative System Info
              </h3>

              <div>
                <label className="block text-xs font-semibold text-[#5B5F73] mb-1.5">
                  Access Privileges
                </label>
                <div className="flex items-center gap-2 px-3.5 py-2.5 bg-[#F7F8FB] border border-[#E4E6EE] rounded-lg text-sm text-[#1A1D29] font-medium capitalize">
                  <Shield className="w-4 h-4 text-[#3730E0]" />
                  <span>{profile?.role} Privilege Access</span>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#5B5F73] mb-1.5">
                  Member Registration
                </label>
                <div className="flex items-center gap-2 px-3.5 py-2.5 bg-[#F7F8FB] border border-[#E4E6EE] rounded-lg text-sm text-[#1A1D29] font-medium">
                  <Calendar className="w-4 h-4 text-[#5B5F73]" />
                  <span>
                    {profile?.createdAt
                      ? new Date(profile.createdAt).toLocaleDateString("en-US", {
                          month: "long",
                          day: "numeric",
                          year: "numeric",
                        })
                      : "N/A"}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {profile?.lastLogin && (
            <div className="mt-6 pt-4 border-t border-[#E4E6EE] flex items-center gap-2 text-xs text-[#5B5F73]">
              <Clock className="w-3.5 h-3.5 text-[#3730E0]" />
              <span>
                Last session authenticated:{" "}
                <span className="font-semibold text-[#1A1D29]">
                  {new Date(profile.lastLogin).toLocaleString()}
                </span>
              </span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
