// src/services/api.js
import API from "../lib/axios";

class ApiService {
  // Helper method for making requests via centralized Axios instance
  async request(endpoint, options = {}) {
    const method = (options.method || "GET").toUpperCase();
    let data = options.body;

    // Parse JSON string body if provided as a string
    if (typeof data === "string") {
      try {
        data = JSON.parse(data);
      } catch {
        // Keep as string if not valid JSON
      }
    }

    try {
      const response = await API.request({
        url: endpoint,
        method,
        data,
        headers: options.headers,
        params: options.params,
      });

      return response.data;
    } catch (error) {
      const message =
        error.response?.data?.message ||
        error.message ||
        "An unexpected error occurred";
      const err = new Error(message);
      err.response = error.response;
      err.status = error.response?.status;
      throw err;
    }
  }

  // Health check method
  async healthCheck() {
    try {
      const response = await API.get("/health");
      console.log("✅ Backend connection successful:", response.data?.message);
      return response.data;
    } catch (error) {
      console.warn("❌ Backend connection failed:", error.message);
      throw error;
    }
  }

  // Auth API
  async login(credentials) {
    const data = await this.request("/auth/login", {
      method: "POST",
      body: JSON.stringify(credentials),
    });

    if (data.data?.tokens?.accessToken) {
      localStorage.setItem("authToken", data.data.tokens.accessToken);
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
    }
  }

  async getProfile() {
    const data = await this.request("/auth/me");
    return data.data;
  }

  // Tutor Requests API
  async getTutorRequests(filters = {}) {
    const queryParams = new URLSearchParams(filters).toString();
    return await this.request(
      `/request-tutor/all${queryParams ? `?${queryParams}` : ""}`
    );
  }

  async getTutorRequestStats() {
    return await this.request("/request-tutor/stats");
  }

  async createTutorRequest(payload) {
    return await this.request("/request-tutor", {
      method: "POST",
      body: payload,
    });
  }

  async deleteTutorRequest(id) {
    return await this.request(`/request-tutor/${id}`, {
      method: "DELETE",
    });
  }

  async updateTutorRequest(id, data) {
    return await this.request(`/request-tutor/${id}`, {
      method: "PUT",
      body: data,
    });
  }

  // Tutor Applications API
  async getTutorApplications(filters = {}) {
    const queryParams = new URLSearchParams(filters).toString();
    return await this.request(
      `/tutor/applications${queryParams ? `?${queryParams}` : ""}`
    );
  }

  async getTutorStats() {
    return await this.request("/tutor/stats");
  }

  async applyTutor(formData) {
    return await this.request("/tutor/apply", {
      method: "POST",
      body: formData,
    });
  }

  async editTutor(id, formData) {
    return await this.request(`/tutor/${id}/edit`, {
      method: "PUT",
      body: formData,
    });
  }

  async updateTutorStatus(id, status) {
    return await this.request(`/tutor/${id}/status`, {
      method: "PUT",
      body: JSON.stringify({ isApproved: status }),
    });
  }

  async deleteTutor(id) {
    return await this.request(`/tutor/${id}`, {
      method: "DELETE",
    });
  }

  // Applied Jobs API
  async getAllAppliedJobs() {
    return await this.request("/applied-job");
  }

  async deleteAppliedJob(id) {
    return await this.request(`/applied-job/${id}`, {
      method: "DELETE",
    });
  }

  async updateAppliedJobStatus(id, status) {
    return await this.request(`/applied-job/${id}/status`, {
      method: "PATCH",
      body: { status },
    });
  }

  // Messages API
  async getMessages(filters = {}) {
    const queryParams = new URLSearchParams(filters).toString();
    return await this.request(
      `/message${queryParams ? `?${queryParams}` : ""}`
    );
  }

  async getMessageStats() {
    return await this.request("/message/stats");
  }

  async deleteMessage(id) {
    return await this.request(`/message/${id}`, { method: "DELETE" });
  }

  // FAQ API
  async getAllFAQsAdmin() {
    return await this.request("/faq/admin/all");
  }

  async createFAQ(data) {
    return await this.request("/faq", {
      method: "POST",
      body: JSON.stringify(data),
    });
  }

  async updateFAQ(id, data) {
    return await this.request(`/faq/${id}`, {
      method: "PUT",
      body: JSON.stringify(data),
    });
  }

  async deleteFAQ(id) {
    return await this.request(`/faq/${id}`, { method: "DELETE" });
  }

  // Users API
  async getAllUsers() {
    return await this.request("/user/all");
  }

  async updateUserRole(id, role) {
    return await this.request(`/user/${id}/role`, {
      method: "PUT",
      body: JSON.stringify({ role }),
    });
  }

  async deleteUser(id) {
    return await this.request(`/user/${id}`, { method: "DELETE" });
  }

  async updateUserProfile(data) {
    return await this.request("/user/profile", {
      method: "PUT",
      body: JSON.stringify(data),
    });
  }
}

export default new ApiService();
