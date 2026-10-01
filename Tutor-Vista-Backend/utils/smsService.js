const https = require("https");

/**
 * Normalizes a Bangladeshi phone number to the standard 8801XXXXXXXXX format required by BulkSMSBD.
 * Handles inputs like:
 * - 017XXXXXXXX -> 88017XXXXXXXX
 * - +88017XXXXXXXX -> 88017XXXXXXXX
 * - 88017XXXXXXXX -> 88017XXXXXXXX
 * - 017XX-XXXXXX -> 88017XXXXXXXX
 */
function normalizeBDPhone(phone) {
  if (!phone) return null;
  let cleaned = String(phone).replace(/[\s\-\(\)\+]/g, "").trim();
  
  if (cleaned.startsWith("880")) {
    return cleaned;
  }
  if (cleaned.startsWith("0")) {
    return `88${cleaned}`;
  }
  if (cleaned.length === 10 && cleaned.startsWith("1")) {
    return `880${cleaned}`;
  }
  return cleaned;
}

/**
 * Sends an SMS using bulksmsbd.net API.
 * Uses native fetch (Node 18+) with an https fallback.
 * 
 * @param {Object} options
 * @param {string} options.phone - Recipient mobile number
 * @param {string} options.message - Text message content
 * @returns {Promise<{success: boolean, responseCode?: number, message?: string, error?: string}>}
 */
async function sendSMS({ phone, message }) {
  const apiKey = process.env.BULK_SMS_API_KEY || "zBAgGPshwuA0XIyxRYqu";
  const senderId = process.env.BULK_SMS_SENDER_ID || "8809617625675";

  if (!apiKey || !senderId) {
    console.warn("[BulkSMS] Missing API Key or Sender ID in environment variables.");
    return { success: false, error: "SMS credentials not configured" };
  }

  const normalizedPhone = normalizeBDPhone(phone);
  if (!normalizedPhone || !/^8801[3-9]\d{8}$/.test(normalizedPhone)) {
    console.warn(`[BulkSMS] Invalid Bangladeshi phone number format: ${phone}`);
    return { success: false, error: "Invalid phone number format" };
  }

  const apiUrl = `https://bulksmsbd.net/api/smsapi?api_key=${encodeURIComponent(
    apiKey
  )}&senderid=${encodeURIComponent(
    senderId
  )}&number=${encodeURIComponent(
    normalizedPhone
  )}&message=${encodeURIComponent(message)}`;

  try {
    if (typeof fetch === "function") {
      const response = await fetch(apiUrl, { method: "GET" });
      const data = await response.json().catch(() => null);
      
      const responseCode = data?.response_code;
      if (responseCode === 202) {
        console.log(`[BulkSMS] Successfully sent SMS to ${normalizedPhone.slice(0, 5)}***`);
        return { success: true, responseCode, data };
      } else {
        console.warn(`[BulkSMS] Gateway returned response code ${responseCode}:`, data?.error_message || data);
        return { success: false, responseCode, message: data?.error_message || data?.success_message };
      }
    } else {
      // Fallback for environments where global fetch is unavailable
      return new Promise((resolve) => {
        https.get(apiUrl, (res) => {
          let rawData = "";
          res.on("data", (chunk) => { rawData += chunk; });
          res.on("end", () => {
            try {
              const data = JSON.parse(rawData);
              const responseCode = data?.response_code;
              if (responseCode === 202) {
                console.log(`[BulkSMS] Successfully sent SMS to ${normalizedPhone.slice(0, 5)}***`);
                resolve({ success: true, responseCode, data });
              } else {
                console.warn(`[BulkSMS] Gateway returned code ${responseCode}:`, data);
                resolve({ success: false, responseCode, message: data?.error_message });
              }
            } catch (e) {
              resolve({ success: false, error: "Failed to parse SMS gateway response" });
            }
          });
        }).on("error", (err) => {
          console.error("[BulkSMS] HTTPS request error:", err.message);
          resolve({ success: false, error: err.message });
        });
      });
    }
  } catch (error) {
    console.error("[BulkSMS] Exception sending SMS:", error.message);
    return { success: false, error: error.message };
  }
}

/**
 * Sends a confirmation SMS to a parent / guardian after they submit a tuition request.
 */
async function sendParentRequestConfirmation({ phoneNo, studentName, requestId }) {
  const shortId = requestId ? String(requestId).slice(-6).toUpperCase() : "";
  const namePart = studentName ? ` for ${studentName}` : "";
  const idPart = shortId ? ` (ID: #${shortId})` : "";
  
  const message = `Dear Guardian, your tutor request${namePart}${idPart} has been received at TutorBridge. Our academic team will contact you shortly. Helpline: 09612-888777`;
  
  return await sendSMS({ phone: phoneNo, message });
}

/**
 * Sends a confirmation SMS to a tutor after applying for registration.
 */
async function sendTutorApplicationConfirmation({ phone, name }) {
  const namePart = name ? ` ${name}` : "";
  const message = `Dear${namePart}, your tutor application has been received at TutorBridge. Your profile is currently under review. Helpline: 09612-888777`;
  
  return await sendSMS({ phone, message });
}

/**
 * Sends an alert to admin/coordinator on new tutor request.
 */
async function sendAdminRequestAlert({ adminPhone, studentName, phoneNo, area, subject }) {
  if (!adminPhone) return { success: false, error: "Admin phone not provided" };
  const message = `TutorBridge Alert: New tutor request from ${studentName || "Guardian"} (${phoneNo}). Area: ${area || "N/A"}, Subject: ${subject || "N/A"}. Check dashboard.`;
  return await sendSMS({ phone: adminPhone, message });
}

/**
 * Checks current SMS balance on BulkSMSBD.
 */
async function checkSMSBalance() {
  const apiKey = process.env.BULK_SMS_API_KEY || "zBAgGPshwuA0XIyxRYqu";
  const url = `https://bulksmsbd.net/api/getBalanceApi?api_key=${encodeURIComponent(apiKey)}`;
  try {
    const res = await fetch(url);
    const data = await res.json();
    return { success: data?.response_code === 202, balance: data?.balance, data };
  } catch (err) {
    return { success: false, error: err.message };
  }
}

module.exports = {
  normalizeBDPhone,
  sendSMS,
  sendParentRequestConfirmation,
  sendTutorApplicationConfirmation,
  sendAdminRequestAlert,
  checkSMSBalance,
};
