// src/services/api.js
import API from "../lib/axios";

class ApiService {
  // Helper method for making requests via centralized Axios instance
  async request(endpoint, options = {}) {
    const method = (options.method || "GET").toUpperCase();
    let data = options.body;

    // Parse JSON string body if provided as string
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

  // Tutors
  async getTutors(params = {}) {
    return await this.request("/api/tutor/applications", { params });
  }

  async getTutorByPhone(phone) {
    return await this.request(
      `/api/tutor/by-phone/${encodeURIComponent(phone)}`
    );
  }

  async applyAsTutor(formData) {
    return await this.request("/api/tutor/apply", {
      method: "POST",
      body: formData,
    });
  }

  // Tuition Requests
  async getTuitionRequests(params = {}) {
    return await this.request("/api/request-tutor", { params });
  }

  async createTuitionRequest(payload) {
    return await this.request("/api/request-tutor", {
      method: "POST",
      body: payload,
    });
  }

  // Applied Jobs
  async applyForTuitionJob(payload) {
    return await this.request("/api/applied-job", {
      method: "POST",
      body: payload,
    });
  }

  async getAppliedJobsByTutorId(tutorId) {
    return await this.request(`/api/applied-job/tutor/${tutorId}`);
  }

  async getAllAppliedJobs() {
    return await this.request("/api/applied-job");
  }

  async getMatchedTuitionJobs(division, limit = 6) {
    return await this.request(
      `/api/request-tutor?division=${encodeURIComponent(division)}&limit=${limit}`
    );
  }

  // Contact / Message
  async sendMessage(payload) {
    return await this.request("/api/message", {
      method: "POST",
      body: payload,
    });
  }

  // FAQs
  async getFaqs() {
    return await this.request("/api/faq");
  }
}

export default new ApiService();
