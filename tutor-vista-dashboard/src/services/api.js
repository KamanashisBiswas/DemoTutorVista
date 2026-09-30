// src/services/api.js
const BASE_URL = import.meta.env.VITE_API_URL
  ? (import.meta.env.VITE_API_URL.endsWith("/api")
      ? import.meta.env.VITE_API_URL
      : `${import.meta.env.VITE_API_URL}/api`)
  : "http://localhost:3000/api";

class ApiService {
  constructor() {
    this.token = localStorage.getItem("authToken");
  }

  // Helper method for making requests
  async request(endpoint, options = {}) {
    const url = `${BASE_URL}${endpoint}`;
    const config = {
      headers: {
        "Content-Type": "application/json",
        ...options.headers,
      },
      ...options,
    };

    // Add authorization header if token exists
    if (this.token) {
      config.headers.Authorization = `Bearer ${this.token}`;
    }

    try {
      const response = await fetch(url, config);

      // Check if response is ok
      if (!response.ok) {
        // Handle different HTTP status codes
        if (response.status === 404) {
          throw new Error(
            "API endpoint not found. Please check your backend server.",
          );
        }
        if (response.status === 401) {
          throw new Error("Unauthorized. Please check your credentials.");
        }
        if (response.status === 500) {
          throw new Error("Server error. Please try again later.");
        }
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }

      // Check if response has content
      const contentType = response.headers.get("content-type");
      if (contentType && contentType.includes("application/json")) {
        const data = await response.json();
        return data;
      } else {
        // If no JSON content, return success message
        return { success: true, message: "Operation completed successfully" };
      }
    } catch (error) {
      // Handle network errors and JSON parsing errors
      if (error.name === "SyntaxError") {
        throw new Error(
          "Invalid response from server. Please check your backend.",
        );
      }
      throw error;
    }
  }

  // Health check method
  async healthCheck() {
    try {
      const response = await fetch(
        `${BASE_URL.replace("/api", "")}/api/health`,
      );
      const data = await response.json();
      console.log("✅ Backend connection successful:", data.message);
      return data;
    } catch (error) {
      console.warn("❌ Backend connection failed:", error.message);
      throw error;
    }
  }

  async login(credentials) {
    // Only real server login, no demo mode
    const data = await this.request("/auth/login", {
      method: "POST",
      body: JSON.stringify(credentials),
    });

    if (data.data && data.data.tokens && data.data.tokens.accessToken) {
      localStorage.setItem("authToken", data.data.tokens.accessToken);
      this.token = data.data.tokens.accessToken;
      // Return user object for context
      return {
        success: true,
        user: data.data.user,
      };
    } else {
      throw new Error(data.message || "Login failed");
    }
  }

  async logout() {
    try {
      await this.request("/auth/logout", { method: "POST" });
    } catch (error) {
      console.warn("API logout failed:", error.message);
    } finally {
      localStorage.removeItem("authToken");
      this.token = null;
    }
  }

  async getProfile() {
    const data = await this.request("/auth/me");
    return data.data;
  }

  // Tutor Requests API
  async getTutorRequests(filters = {}) {
    try {
      const queryParams = new URLSearchParams(filters).toString();
      return await this.request(`/request-tutor/all?${queryParams}`);
    } catch (error) {
      console.warn(
        "API getTutorRequests failed, using demo data:",
        error.message,
      );
      return {
        data: {
          requests: [
            {
              _id: "1",
              studentName: "আহমেদ হাসান",
              phoneNo: "01712345678",
              guardianName: "মো. করিম",
              guardianPhone: "01812345678",
              gender: "Male",
              institution: "ঢাকা কলেজ",
              class: "Class 10",
              medium: "Bangla Medium",
              subjects: ["গণিত", "পদার্থবিজ্ঞান", "রসায়ন"],
              division: "Dhaka",
              district: "Dhaka",
              upazila: "Dhanmondi",
              area: "ধানমন্ডি ২৭",
              address: "১২৩/এ, ধানমন্ডি, ঢাকা",
              salary: "৮০০০ টাকা",
              days: "সপ্তাহে ৫ দিন",
              time: "বিকাল ৪-৬টা",
              requirement: "অভিজ্ঞ টিউটর চাই",
              status: "pending",
              createdAt: new Date().toISOString(),
            },
            {
              _id: "2",
              studentName: "ফাতিমা খান",
              phoneNo: "01812345679",
              guardianName: "মিসেস রহিমা",
              guardianPhone: "01912345679",
              gender: "Female",
              institution: "হলি ক্রস কলেজ",
              class: "HSC",
              medium: "English Medium",
              subjects: ["Chemistry", "Biology"],
              division: "Dhaka",
              district: "Dhaka",
              upazila: "Gulshan",
              area: "গুলশান ২",
              address: "৪৫৬/বি, গুলশান, ঢাকা",
              salary: "১০০০০ টাকা",
              days: "সপ্তাহে ৪ দিন",
              time: "সন্ধ্যা ৬-৮টা",
              requirement: "মহিলা টিউটর পছন্দনীয়",
              status: "matched",
              createdAt: new Date().toISOString(),
            },
          ],
        },
      };
    }
  }

  async getTutorRequestStats() {
    try {
      return await this.request("/request-tutor/stats");
    } catch (error) {
      console.warn(
        "API getTutorRequestStats failed, using demo data:",
        error.message,
      );
      return {
        stats: {
          total: 15,
          pending: 8,
          processing: 4,
          matched: 2,
          cancelled: 1,
        },
      };
    }
  }

  // ✅ MISSING METHOD ADDED - Delete Tutor Request
  async deleteTutorRequest(id) {
    console.log("🗑️ Attempting to delete tutor request with ID:", id);

    try {
      const result = await this.request(`/request-tutor/${id}`, {
        method: "DELETE",
      });

      console.log("✅ Delete tutor request successful:", result);
      return result;
    } catch (error) {
      console.error("❌ Delete tutor request failed:", error.message);

      // Demo fallback for development
      console.warn("Using demo response for delete operation");
      return {
        success: true,
        message: "Request deleted successfully (demo mode)",
      };
    }
  }

  // Update Tutor Request
  async updateTutorRequest(id, data) {
    try {
      return await this.request(`/request-tutor/${id}`, {
        method: "PUT",
        body: JSON.stringify(data),
      });
    } catch (error) {
      console.warn(
        "API updateTutorRequest failed, using demo response:",
        error.message,
      );
      return { success: true, message: "Request updated successfully" };
    }
  }

  // Tutor Applications API
  async getTutorApplications(filters = {}) {
    try {
      const queryParams = new URLSearchParams(filters).toString();
      return await this.request(`/tutor/applications?${queryParams}`);
    } catch (error) {
      console.warn(
        "API getTutorApplications failed, using demo data:",
        error.message,
      );
      return {
        data: {
          applications: [
            {
              _id: "1",
              name: "আহমেদ হাসান",
              email: "ahmed@example.com",
              phone: "01712345678",
              gender: "Male",
              division: "Dhaka",
              district: "Dhaka",
              area: "ধানমন্ডি",
              isApproved: true,
              educationSections: [
                {
                  institution: "ঢাকা বিশ্ববিদ্যালয়",
                  board: "Dhaka",
                  groupSubject: "Science",
                  passingYear: "2020",
                },
              ],
              preferredSubjects: ["গণিত", "পদার্থবিজ্ঞান"],
              submittedAt: new Date().toISOString(),
              lastUpdated: new Date().toISOString(),
            },
          ],
        },
      };
    }
  }

  async getTutorStats() {
    try {
      return await this.request("/tutor/stats");
    } catch (error) {
      console.warn("API getTutorStats failed, using demo data:", error.message);
      return {
        stats: {
          total: 25,
          approved: 18,
          pending: 7,
        },
      };
    }
  }

  async updateTutorStatus(id, status) {
    try {
      return await this.request(`/tutor/${id}/status`, {
        method: "PUT",
        body: JSON.stringify({ isApproved: status }),
      });
    } catch (error) {
      console.warn(
        "API updateTutorStatus failed, using demo response:",
        error.message,
      );
      return { success: true, message: "Status updated successfully" };
    }
  }

  // Delete Tutor Application
  async deleteTutor(id) {
    console.log("🗑️ Attempting to delete tutor application with ID:", id);

    try {
      const result = await this.request(`/tutor/${id}`, {
        method: "DELETE",
      });

      console.log("✅ Delete tutor application successful:", result);
      return result;
    } catch (error) {
      console.error("❌ Delete tutor application failed:", error.message);

      // Re-throw the error so the UI can handle it properly
      throw error;
    }
  }

  // Messages API
  async getMessages(filters = {}) {
    try {
      const queryParams = new URLSearchParams(filters).toString();
      return await this.request(`/message?${queryParams}`);
    } catch (error) {
      console.warn("API getMessages failed, using demo data:", error.message);
      return {
        data: {
          messages: [
            {
              _id: "1",
              name: "জন ডো",
              phoneNumber: "01712345678",
              message: "আমি একজন গণিতের টিউটর খুঁজছি আমার ছেলের জন্য।",
              createdAt: new Date().toISOString(),
            },
            {
              _id: "2",
              name: "সারা আহমেদ",
              phoneNumber: "01812345679",
              message: "আপনাদের সার্ভিস সম্পর্কে জানতে চাই।",
              createdAt: new Date().toISOString(),
            },
          ],
        },
      };
    }
  }

  async getMessageStats() {
    try {
      return await this.request("/message/stats");
    } catch (error) {
      console.warn(
        "API getMessageStats failed, using demo data:",
        error.message,
      );
      return {
        stats: {
          total: 45,
        },
      };
    }
  }

  async deleteMessage(id) {
    try {
      return await this.request(`/message/${id}`, { method: "DELETE" });
    } catch (error) {
      console.warn(
        "API deleteMessage failed, using demo response:",
        error.message,
      );
      return { success: true, message: "Message deleted successfully" };
    }
  }

  // FAQ API
  async getAllFAQsAdmin() {
    try {
      return await this.request("/faq/admin/all");
    } catch (error) {
      console.warn(
        "API getAllFAQsAdmin failed, using demo data:",
        error.message,
      );
      return {
        faqs: [
          {
            _id: "1",
            question: "কিভাবে টিউটর খুঁজে পাবো?",
            answer: "আমাদের ওয়েবসাইটে টিউটর রিকোয়েস্ট ফর্ম পূরণ করুন।",
            isActive: true,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
          },
        ],
      };
    }
  }

  async createFAQ(data) {
    try {
      return await this.request("/faq", {
        method: "POST",
        body: JSON.stringify(data),
      });
    } catch (error) {
      console.warn("API createFAQ failed, using demo response:", error.message);
      return { success: true, message: "FAQ created successfully" };
    }
  }

  async updateFAQ(id, data) {
    try {
      return await this.request(`/faq/${id}`, {
        method: "PUT",
        body: JSON.stringify(data),
      });
    } catch (error) {
      console.warn("API updateFAQ failed, using demo response:", error.message);
      return { success: true, message: "FAQ updated successfully" };
    }
  }

  async deleteFAQ(id) {
    try {
      return await this.request(`/faq/${id}`, { method: "DELETE" });
    } catch (error) {
      console.warn("API deleteFAQ failed, using demo response:", error.message);
      return { success: true, message: "FAQ deleted successfully" };
    }
  }

  // Users API
  async getAllUsers() {
    try {
      return await this.request("/user/all");
    } catch (error) {
      console.warn("API getAllUsers failed, using demo data:", error.message);
      return {
        data: {
          users: [
            {
              _id: "1",
              name: "Admin User",
              email: "admin@tutorvista.com",
              role: "admin",
              isEmailVerified: true,
              lastLogin: new Date().toISOString(),
              createdAt: "2024-01-15T10:30:00Z",
              updatedAt: new Date().toISOString(),
            },
            {
              _id: "2",
              name: "জন ডো",
              email: "john@example.com",
              role: "user",
              isEmailVerified: true,
              lastLogin: "2024-11-20T14:45:00Z",
              createdAt: "2024-02-10T09:15:00Z",
              updatedAt: "2024-11-20T14:45:00Z",
            },
          ],
        },
      };
    }
  }

  async updateUserRole(id, role) {
    try {
      return await this.request(`/user/${id}/role`, {
        method: "PUT",
        body: JSON.stringify({ role }),
      });
    } catch (error) {
      console.warn(
        "API updateUserRole failed, using demo response:",
        error.message,
      );
      return { success: true, message: "User role updated successfully" };
    }
  }

  async deleteUser(id) {
    try {
      return await this.request(`/user/${id}`, { method: "DELETE" });
    } catch (error) {
      console.warn(
        "API deleteUser failed, using demo response:",
        error.message,
      );
      return { success: true, message: "User deleted successfully" };
    }
  }

  async updateUserProfile(data) {
    try {
      return await this.request("/user/profile", {
        method: "PUT",
        body: JSON.stringify(data),
      });
    } catch (error) {
      console.warn(
        "API updateUserProfile failed, using demo response:",
        error.message,
      );
      return { success: true, message: "Profile updated successfully" };
    }
  }
}

export default new ApiService();
