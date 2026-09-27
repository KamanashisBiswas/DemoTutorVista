import React from "react";

const BannerCard = ({ req }) => {
  const preferredTutor = req.gender || "Male/Female";
  const requirementText = req.requirement ? ` (${req.requirement})` : "";
  const titleText = `${preferredTutor}${requirementText}`;

  let budget = "N/A";
  if (req.salary) {
    budget = req.salary;
  }

  let schedule = "N/A";
  if (req.days) {
    schedule = req.days;
    if (!schedule.toLowerCase().includes("day")) {
      schedule = `${schedule} days`;
    }
  }

  const offerId = req._id
    ? `D${req._id.toString().slice(-4).toUpperCase()}`
    : "N/A";

  const classAndMedium = `${req.grade || "N/A"} (${req.medium || "N/A"})`;

  let subjectsText = "N/A";
  if (req.subjects && req.subjects.length > 0) {
    subjectsText = req.subjects.join(", ");
  }
  if (req.multipleStudent) {
    subjectsText += " (2 students)";
  }

  return (
    <div
      style={{
        display: "flex",
        alignItems: "stretch",
        backgroundColor: "#fff",
        borderRadius: "14px",
        overflow: "hidden",
        boxShadow: "0 1px 4px rgba(0,0,0,0.06)",
      }}
    >
      {/* Green left border bar */}
      <div
        style={{
          width: "7px",
          minHeight: "100%",
          backgroundColor: "#2bb573",
          borderRadius: "14px 0 0 14px",
          flexShrink: 0,
        }}
      ></div>

      {/* Card content */}
      <div
        style={{
          display: "flex",
          alignItems: "flex-start",
          padding: "18px 20px 18px 18px",
          flex: 1,
          gap: "0px",
        }}
      >
        {/* Left: Title + Location */}
        <div style={{ width: "36%", paddingRight: "14px" }}>
          <div
            style={{
              fontSize: "16px",
              fontWeight: "800",
              color: "#1a1a1a",
              lineHeight: "1.35",
              marginBottom: "8px",
              wordWrap: "break-word",
            }}
          >
            {titleText}
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: "5px" }}>
            {/* Red location pin circle */}
            <svg
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              style={{ flexShrink: 0 }}
            >
              <circle
                cx="12"
                cy="10"
                r="9"
                fill="#fff"
                stroke="#e53935"
                strokeWidth="2"
              />
              <path d="M12 7a3 3 0 100 6 3 3 0 000-6z" fill="#e53935" />
              <path
                d="M12 22s-7-5.75-7-12a7 7 0 0114 0c0 6.25-7 12-7 12z"
                fill="none"
                stroke="#e53935"
                strokeWidth="1.5"
              />
            </svg>
            <span style={{ fontSize: "13px", color: "#666", fontWeight: "500" }}>
              {req.area || "N/A"}
            </span>
          </div>
        </div>

        {/* Middle: Class + Subjects */}
        <div style={{ width: "38%", paddingLeft: "6px", paddingRight: "10px" }}>
          {/* Graduation cap + Class */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "8px",
              marginBottom: "10px",
            }}
          >
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              style={{ flexShrink: 0 }}
            >
              <path d="M12 3L1 9l11 6 9-4.91V17h2V9L12 3z" fill="#0d7377" />
              <path
                d="M5 13.18v4L12 21l7-3.82v-4L12 17l-7-3.82z"
                fill="#0d7377"
                opacity="0.7"
              />
            </svg>
            <span style={{ fontSize: "14px", fontWeight: "600", color: "#333" }}>
              {classAndMedium}
            </span>
          </div>
          {/* Book + Subjects */}
          <div style={{ display: "flex", alignItems: "flex-start", gap: "8px" }}>
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              style={{ flexShrink: 0, marginTop: "2px" }}
            >
              <path
                d="M4 19.5A2.5 2.5 0 016.5 17H20"
                stroke="#e65100"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M6.5 2H20v20H6.5A2.5 2.5 0 014 19.5v-15A2.5 2.5 0 016.5 2z"
                stroke="#e65100"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            <span
              style={{
                fontSize: "13px",
                fontWeight: "500",
                color: "#555",
                lineHeight: "1.4",
              }}
            >
              {subjectsText}
            </span>
          </div>
        </div>

        {/* Right: Offer No + Salary + Schedule */}
        <div
          style={{
            width: "26%",
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-end",
            justifyContent: "space-between",
            textAlign: "right",
            minHeight: "80px",
          }}
        >
          <span style={{ fontSize: "10px", fontWeight: "600", color: "#999" }}>
            #Offer No: {offerId}
          </span>
          <div style={{ marginTop: "2px" }}>
            <div
              style={{
                fontSize: "9px",
                fontWeight: "700",
                color: "#999",
                textTransform: "uppercase",
                letterSpacing: "0.8px",
              }}
            >
              SALARY
            </div>
            <div
              style={{
                fontSize: "22px",
                fontWeight: "800",
                color: "#0fa958",
                lineHeight: "1.15",
              }}
            >
              {budget} <span style={{ fontSize: "20px" }}>৳</span>
            </div>
          </div>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "4px",
              marginTop: "2px",
            }}
          >
            <svg
              width="13"
              height="13"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              style={{ flexShrink: 0 }}
            >
              <rect
                x="3"
                y="4"
                width="18"
                height="18"
                rx="2"
                stroke="#e65100"
                strokeWidth="2"
              />
              <path
                d="M16 2v4M8 2v4M3 10h18"
                stroke="#e65100"
                strokeWidth="2"
                strokeLinecap="round"
              />
            </svg>
            <span
              style={{
                fontSize: "13px",
                fontWeight: "700",
                color: "#e65100",
                whiteSpace: "nowrap",
              }}
            >
              {schedule}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

const BannerPage = ({ chunk, pageIndex, divisionTitle }) => {
  return (
    <div
      id={`banner-page-${pageIndex}`}
      style={{
        width: "820px",
        display: "none",
        background:
          "linear-gradient(135deg, #e0f2f1 0%, #e8f5e9 30%, #f1f8e9 60%, #e8f5e9 100%)",
        padding: "32px 28px 36px 28px",
        fontFamily: "'Segoe UI', 'Roboto', 'Arial', sans-serif",
        borderRadius: "18px",
      }}
    >
      {/* Header */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          marginBottom: "24px",
        }}
      >
        <span
          style={{
            fontSize: "26px",
            fontWeight: "700",
            fontStyle: "italic",
            color: "#1a2332",
            letterSpacing: "-0.3px",
          }}
        >
          Apply Now
        </span>
        <div style={{ textAlign: "center" }}>
          <div
            style={{
              fontSize: "30px",
              fontWeight: "800",
              color: "#1a2332",
              letterSpacing: "-0.5px",
              lineHeight: "1.1",
            }}
          >
            Tuitions in {divisionTitle}
          </div>
          <span
            style={{
              display: "inline-block",
              marginTop: "6px",
              padding: "3px 14px",
              fontSize: "10px",
              fontWeight: "700",
              color: "#444",
              border: "1.5px solid #bbb",
              borderRadius: "20px",
              backgroundColor: "#fff",
              letterSpacing: "0.3px",
            }}
          >
            No Advance Payment Required
          </span>
        </div>
        <span
          style={{
            fontSize: "15px",
            fontWeight: "700",
            color: "#0d7377",
            letterSpacing: "0.2px",
          }}
        >
          www.tutorvistabd.com
        </span>
      </div>

      {/* Cards */}
      <div style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
        {chunk.map((req) => (
          <BannerCard key={req._id} req={req} />
        ))}
      </div>
    </div>
  );
};

const BannerTemplate = ({ bannerChunks, divisionTitle }) => {
  if (!bannerChunks || bannerChunks.length === 0) return null;

  return (
    <div style={{ position: "absolute", left: "-9999px", top: "-9999px" }}>
      {bannerChunks.map((chunk, pageIndex) => (
        <BannerPage
          key={pageIndex}
          chunk={chunk}
          pageIndex={pageIndex}
          divisionTitle={divisionTitle}
        />
      ))}
    </div>
  );
};

export default BannerTemplate;
