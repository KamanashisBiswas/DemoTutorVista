import React, { useState, useEffect, useCallback } from "react";
import {
  Document,
  Paragraph,
  Table,
  TableRow,
  TableCell,
  TextRun,
  AlignmentType,
  HeadingLevel,
  BorderStyle,
  Packer,
} from "docx";
import { saveAs } from "file-saver";
import { jsPDF } from "jspdf";
import autoTable from "jspdf-autotable";
import * as XLSX from "xlsx";
import { toast } from "react-toastify";
import { Copy, ClipboardCopy, Image as ImageIcon, Users, CheckCircle, Clock, AlertTriangle, UserCheck, Play, XCircle } from "lucide-react";

import ApiService from "../services/api";
import { useAuth } from "../context/AuthContext";

import AddTutorRequestModal from "../components/AddTutorRequestModal";
import EditTutorRequestModal from "../components/EditTutorRequestModal";
import TutorRequestDetailsModal from "../components/TutorRequestDetailsModal";
import DeleteConfirm from "../components/DeleteConfirm";
import TutorRequestHeader from "../components/TutorRequestHeader";
import TutorRequestFilters from "../components/TutorRequestFilters";
import TutorRequestTable from "../components/TutorRequestTable";
import BannerTemplate from "../components/BannerTemplate";
import Pagination from "../components/Pagination";

const getDateRange = (preset, customStart, customEnd) => {
  const now = new Date();
  const start = new Date(now);
  const end = new Date(now);

  switch (preset) {
    case "today":
      start.setHours(0, 0, 0, 0);
      end.setHours(23, 59, 59, 999);
      return { startDate: start.toISOString(), endDate: end.toISOString() };
    case "yesterday":
      start.setDate(now.getDate() - 1);
      start.setHours(0, 0, 0, 0);
      end.setDate(now.getDate() - 1);
      end.setHours(23, 59, 59, 999);
      return { startDate: start.toISOString(), endDate: end.toISOString() };
    case "last7":
      start.setDate(now.getDate() - 6);
      start.setHours(0, 0, 0, 0);
      end.setHours(23, 59, 59, 999);
      return { startDate: start.toISOString(), endDate: end.toISOString() };
    case "last30":
      start.setDate(now.getDate() - 29);
      start.setHours(0, 0, 0, 0);
      end.setHours(23, 59, 59, 999);
      return { startDate: start.toISOString(), endDate: end.toISOString() };
    case "thisMonth":
      start.setDate(1);
      start.setHours(0, 0, 0, 0);
      end.setHours(23, 59, 59, 999);
      return { startDate: start.toISOString(), endDate: end.toISOString() };
    case "custom":
      if (customStart && customEnd) {
        const s = new Date(customStart);
        s.setHours(0, 0, 0, 0);
        const e = new Date(customEnd);
        e.setHours(23, 59, 59, 999);
        return { startDate: s.toISOString(), endDate: e.toISOString() };
      }
      return { startDate: null, endDate: null };
    default:
      return { startDate: null, endDate: null };
  }
};

const TutorRequestsPage = () => {
  const { user } = useAuth();
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [totalRequests, setTotalRequests] = useState(0);
  const [totalPages, setTotalPages] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(8);
  const [statusFilter, setStatusFilter] = useState("");
  const [workflowStatusFilter, setWorkflowStatusFilter] = useState("");
  const [dateFilter, setDateFilter] = useState("");
  const [customStartDate, setCustomStartDate] = useState("");
  const [customEndDate, setCustomEndDate] = useState("");
  const [zoneFilter, setZoneFilter] = useState("");
  const [mediumFilter, setMediumFilter] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState(searchTerm);

  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [selectedRequest, setSelectedRequest] = useState(null);

  const [isDownloading, setIsDownloading] = useState({
    pdf: false,
    docx: false,
    sheet: false,
    banner: false,
  });

  const [stats, setStats] = useState({
    total: 0,
    active: 0,
    pending: 0,
    referred: 0,
    confirmed: 0,
    demo: 0,
    problem: 0,
    cancelled: 0,
  });

  const fetchStats = async () => {
    try {
      const res = await ApiService.getTutorRequestStats();
      if (res && res.data && res.data.stats) {
        setStats(res.data.stats);
      } else if (res && res.stats) {
        setStats(res.stats);
      }
    } catch (error) {
      console.error("Error fetching request stats:", error);
    }
  };

  const fetchRequests = useCallback(async () => {
    setLoading(true);
    try {
      let startDate = undefined;
      let endDate = undefined;
      if (dateFilter) {
        const ranges = getDateRange(dateFilter, customStartDate, customEndDate);
        startDate = ranges.startDate || undefined;
        endDate = ranges.endDate || undefined;
      }

      const params = {
        page: currentPage,
        limit: itemsPerPage,
        search: debouncedSearch,
        isActive:
          statusFilter === "active"
            ? true
            : statusFilter === "inactive"
            ? false
            : undefined,
        status: workflowStatusFilter || undefined,
        startDate,
        endDate,
        zone: zoneFilter || undefined,
        medium: mediumFilter || undefined,
      };
      Object.keys(params).forEach(
        (key) => params[key] === undefined && delete params[key]
      );

      const data = await ApiService.getTutorRequests(params);
      setRequests(data.data?.requests || []);
      setTotalRequests(data.data?.pagination?.total || 0);
      setTotalPages(data.data?.pagination?.pages || 1);
    } catch (error) {
      console.error("Error fetching requests:", error);
      toast.error("Failed to fetch tutor requests.");
    } finally {
      setLoading(false);
    }
  }, [
    currentPage,
    debouncedSearch,
    statusFilter,
    workflowStatusFilter,
    dateFilter,
    customStartDate,
    customEndDate,
    zoneFilter,
    mediumFilter,
    itemsPerPage,
  ]);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearch(searchTerm);
      setCurrentPage(1); // Reset to first page on search
    }, 400);
    return () => clearTimeout(handler);
  }, [searchTerm]);

  useEffect(() => {
    setCurrentPage(1);
  }, [statusFilter, workflowStatusFilter, dateFilter, customStartDate, customEndDate, zoneFilter, mediumFilter]);

  useEffect(() => {
    fetchRequests();
    fetchStats();
  }, [fetchRequests]);

  const handleView = (request) => {
    setSelectedRequest(request);
    setShowDetailsModal(true);
  };

  const deleteConfirm = DeleteConfirm({});

  const handleDelete = (id, name) => {
    deleteConfirm.handleDelete({
      onDelete: async () => {
        await ApiService.deleteTutorRequest(id);
        await fetchRequests();
        await fetchStats();
      },
      itemName: name,
      itemType: "request",
      customMessage: `Are you sure you want to delete ${name}'s request?`,
    });
  };

  const handleAddRequest = () => setShowAddModal(true);
  const handleEditRequest = (request) => {
    setSelectedRequest(request);
    setShowEditModal(true);
  };

  const handleSuccess = () => {
    fetchRequests();
    fetchStats();
    setShowAddModal(false);
    setShowEditModal(false);
  };

  const handleClearFilters = () => {
    setSearchTerm("");
    setDebouncedSearch("");
    setStatusFilter("");
    setWorkflowStatusFilter("");
    setDateFilter("");
    setCustomStartDate("");
    setCustomEndDate("");
    setZoneFilter("");
    setMediumFilter("");
    setCurrentPage(1);
  };

  const fetchAllRequestsForDownload = async () => {
    try {
      let startDate = undefined;
      let endDate = undefined;
      if (dateFilter) {
        const ranges = getDateRange(dateFilter, customStartDate, customEndDate);
        startDate = ranges.startDate || undefined;
        endDate = ranges.endDate || undefined;
      }

      const params = {
        search: debouncedSearch || undefined,
        isActive:
          statusFilter === "active"
            ? true
            : statusFilter === "inactive"
            ? false
            : undefined,
        status: workflowStatusFilter || undefined,
        startDate,
        endDate,
        zone: zoneFilter || undefined,
        medium: mediumFilter || undefined,
        limit: 10000, // Fetch all
        page: 1,
      };
      Object.keys(params).forEach(
        (key) => params[key] === undefined && delete params[key]
      );
      const data = await ApiService.getTutorRequests(params);
      return data.data?.requests || [];
    } catch (error) {
      toast.error("Could not fetch all requests for download.");
      return [];
    }
  };

  const formatUpdatedDate = (dateString) => {
    if (!dateString) return "N/A";
    const date = new Date(dateString);
    if (isNaN(date.getTime())) return "N/A";
    
    const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    const day = String(date.getDate()).padStart(2, "0");
    const month = months[date.getMonth()];
    const year = date.getFullYear();
    
    let hours = date.getHours();
    const minutes = String(date.getMinutes()).padStart(2, "0");
    const ampm = hours >= 12 ? "PM" : "AM";
    hours = hours % 12;
    hours = hours ? hours : 12;
    const formattedHours = String(hours).padStart(2, "0");
    
    return `${day} ${month} ${year}, ${formattedHours}:${minutes} ${ampm}`;
  };

  const handleCopyRequests = (includeContact) => {
    if (requests.length === 0) return;

    const blockSeparator = "--------------------------------------------------";
    
    const formattedBlocks = requests.map((req) => {
      const tuitionId = `TV-${req._id ? req._id.toString().slice(-4).toUpperCase() : "N/A"}`;
      const status = req.status ? req.status.charAt(0).toUpperCase() + req.status.slice(1) : "N/A";
      const student = req.studentName || "N/A";
      const className = req.grade || "N/A";
      const subject = req.subjects && req.subjects.length > 0 ? req.subjects.join(", ") : "N/A";
      const medium = req.medium || "N/A";
      const location = req.area && req.district ? `${req.area}, ${req.district}` : (req.area || req.district || "N/A");
      
      let budget = "N/A";
      if (req.salary) {
        budget = `${req.salary}${req.salary.toLowerCase().includes("bdt") || req.salary.toLowerCase().includes("tk") ? "" : " BDT"}`;
      }
      
      let schedule = "N/A";
      if (req.days) {
        schedule = `${req.days}${req.days.toLowerCase().includes("day") ? "" : " Days / Week"}`;
      }
      
      const preferredTutor = req.gender || "N/A";
      const guardian = req.guardianName || "N/A";
      const contact = req.phoneNo || "N/A";
      const comment = req.comment && req.comment.trim() !== "" ? req.comment.trim() : "N/A";
      const updatedDate = formatUpdatedDate(req.updatedAt);

      const lines = [
        blockSeparator,
        "",
        `Tuition ID:\n${tuitionId}`,
        "",
        `Status:\n${status}`,
        "",
        `Student:\n${student}`,
        "",
        `Class:\n${className}`,
        "",
        `Subject:\n${subject}`,
        "",
        `Medium:\n${medium}`,
        "",
        `Location:\n${location}`,
        "",
        `Budget:\n${budget}`,
        "",
        `Schedule:\n${schedule}`,
        "",
        `Preferred Tutor:\n${preferredTutor}`,
        "",
        `Guardian:\n${guardian}`,
      ];

      if (includeContact) {
        lines.push("", `Contact:\n${contact}`);
      }

      lines.push(
        "",
        `Comment:\n${comment}`,
        "",
        `Updated Date:\n${updatedDate}`,
        "",
        blockSeparator
      );

      return lines.join("\n");
    });

    const fullText = formattedBlocks.join("\n\n");

    navigator.clipboard.writeText(fullText)
      .then(() => {
        if (includeContact) {
          toast.success("✅ Tutor Requests copied with contact numbers.");
        } else {
          toast.success("✅ Tutor Requests copied successfully.");
        }
      })
      .catch((err) => {
        console.error("Failed to copy tutor requests:", err);
        toast.error("Failed to copy tutor requests to clipboard.");
      });
  };

  const handleCopySingleRequest = (req) => {
    const blockSeparator = "--------------------------------------------------";
    const tuitionId = `TV-${req._id ? req._id.toString().slice(-4).toUpperCase() : "N/A"}`;
    const status = req.status ? req.status.charAt(0).toUpperCase() + req.status.slice(1) : "N/A";
    const student = req.studentName || "N/A";
    const className = req.grade || "N/A";
    const subject = req.subjects && req.subjects.length > 0 ? req.subjects.join(", ") : "N/A";
    const medium = req.medium || "N/A";
    const location = req.area && req.district ? `${req.area}, ${req.district}` : (req.area || req.district || "N/A");
    
    let budget = "N/A";
    if (req.salary) {
      budget = `${req.salary}${req.salary.toLowerCase().includes("bdt") || req.salary.toLowerCase().includes("tk") ? "" : " BDT"}`;
    }
    
    let schedule = "N/A";
    if (req.days) {
      schedule = `${req.days}${req.days.toLowerCase().includes("day") ? "" : " Days / Week"}`;
    }
    
    const preferredTutor = req.gender || "N/A";
    const guardian = req.guardianName || "N/A";
    const contact = req.phoneNo || "N/A";
    const comment = req.comment && req.comment.trim() !== "" ? req.comment.trim() : "N/A";
    const updatedDate = formatUpdatedDate(req.updatedAt);

    const lines = [
      blockSeparator,
      "",
      `Tuition ID:\n${tuitionId}`,
      "",
      `Status:\n${status}`,
      "",
      `Student:\n${student}`,
      "",
      `Class:\n${className}`,
      "",
      `Subject:\n${subject}`,
      "",
      `Medium:\n${medium}`,
      "",
      `Location:\n${location}`,
      "",
      `Budget:\n${budget}`,
      "",
      `Schedule:\n${schedule}`,
      "",
      `Preferred Tutor:\n${preferredTutor}`,
      "",
      `Guardian:\n${guardian}`,
      "",
      `Contact:\n${contact}`,
      "",
      `Comment:\n${comment}`,
      "",
      `Updated Date:\n${updatedDate}`,
      "",
      blockSeparator
    ];

    const fullText = lines.join("\n");

    navigator.clipboard.writeText(fullText)
      .then(() => {
        toast.success("✅ Tutor Request copied with contact numbers.");
      })
      .catch((err) => {
        console.error("Failed to copy tutor request:", err);
        toast.error("Failed to copy tutor request to clipboard.");
      });
  };

  const getBannerTitleDivision = () => {
    if (requests.length === 0) return "Dhaka";
    const firstDiv = requests[0].division;
    const allSame = requests.every((req) => req.division === firstDiv);
    return allSame && firstDiv ? firstDiv : "Dhaka";
  };

  const downloadBanners = async () => {
    if (requests.length === 0) {
      toast.warning("No tutor requests available to download.");
      return;
    }
    
    setIsDownloading((prev) => ({ ...prev, banner: true }));
    const html2canvas = (await import("html2canvas")).default;
    
    try {
      const pageCount = bannerChunks.length;
      toast.info(`Preparing ${pageCount} page(s) of banners...`);
      
      for (let i = 0; i < pageCount; i++) {
        const element = document.getElementById(`banner-page-${i}`);
        if (!element) continue;
        
        // Temporarily override display style for html2canvas
        const originalStyle = element.style.display;
        element.style.display = "block";
        
        // Wait a tiny bit for render
        await new Promise((resolve) => setTimeout(resolve, 100));
        
        const canvas = await html2canvas(element, {
          scale: 2, // 2x scale for crystal-clear resolution
          useCORS: true,
          backgroundColor: null,
        });
        
        element.style.display = originalStyle;
        
        const imgData = canvas.toDataURL("image/png");
        const link = document.createElement("a");
        
        // Construct filename
        const divisionTitle = getBannerTitleDivision();
        const divisionSlug = divisionTitle.toLowerCase().replace(/\s+/g, "_");
        link.download = `tuitions_in_${divisionSlug}_page_${i + 1}.png`;
        link.href = imgData;
        link.click();
        
        // Sleep 1 second before the next download to prevent browser blockages
        if (i < pageCount - 1) {
          await new Promise((resolve) => setTimeout(resolve, 1000));
        }
      }
      toast.success("✅ All tuition banners downloaded successfully!");
    } catch (err) {
      console.error("Failed to generate banners:", err);
      toast.error("Failed to download banners.");
    } finally {
      setIsDownloading((prev) => ({ ...prev, banner: false }));
    }
  };

  const downloadAllRequestsPdf = async () => {
    setIsDownloading((prev) => ({ ...prev, pdf: true }));
    try {
      const allRequests = await fetchAllRequestsForDownload();
      if (allRequests.length === 0) {
        toast.info("No requests to download");
        return;
      }
      const doc = new jsPDF({
        orientation: "landscape",
        unit: "mm",
        format: "a4",
      });
      doc.text("Tutor Vista - All Tutor Requests", 14, 15);
      const tableData = allRequests.map((req, index) => [
        index + 1,
        req.studentName || "N/A",
        req.phoneNo || "N/A",
        req.grade
          ? `${req.grade} (${req.medium || "N/A"})`
          : req.medium || "N/A",
        `${req.area || "N/A"}, ${req.district || "N/A"}`,
        req.subjects?.slice(0, 3).join(", ") || "N/A",
        new Date(req.createdAt).toLocaleDateString(),
      ]);
      autoTable(doc, {
        head: [
          [
            "#",
            "Student",
            "Phone",
            "Grade/Medium",
            "Location",
            "Subjects",
            "Requested Date",
          ],
        ],
        body: tableData,
        startY: 25,
        theme: "grid",
        headStyles: { fillColor: [43, 99, 235] },
      });
      doc.save(
        `TutorVista_AllRequests_${new Date()
          .toLocaleDateString()
          .replace(/\//g, "-")}.pdf`
      );
    } finally {
      setIsDownloading((prev) => ({ ...prev, pdf: false }));
    }
  };

  const downloadAllRequestsSheet = async () => {
    setIsDownloading((prev) => ({ ...prev, sheet: true }));
    try {
      const allRequests = await fetchAllRequestsForDownload();
      if (allRequests.length === 0) {
        toast.info("No requests to download");
        return;
      }
      const sheetData = allRequests.map((req, index) => ({
        "#": index + 1,
        "Student Name": req.studentName || "N/A",
        "Phone No": req.phoneNo || "N/A",
        "Guardian Phone": req.guardianPhone || "N/A",
        "Grade/Medium": req.grade
          ? `${req.grade} (${req.medium || "N/A"})`
          : req.medium || "N/A",
        Location: `${req.area || "N/A"}, ${req.district || "N/A"}`,
        Subjects: req.subjects?.join(", ") || "N/A",
        Status: req.isActive ? "Active" : "Inactive",
        "Requested Date": new Date(req.createdAt).toLocaleDateString(),
      }));
      const worksheet = XLSX.utils.json_to_sheet(sheetData);
      const workbook = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(workbook, worksheet, "TutorRequests");
      const cols = Object.keys(sheetData[0]).map((key) => ({
        wch: Math.max(
          key.length,
          ...sheetData.map((row) => String(row[key]).length)
        ),
      }));
      worksheet["!cols"] = cols;
      XLSX.writeFile(
        workbook,
        `TutorVista_AllRequests_${new Date()
          .toLocaleDateString()
          .replace(/\//g, "-")}.xlsx`
      );
    } finally {
      setIsDownloading((prev) => ({ ...prev, sheet: false }));
    }
  };

  const downloadAllRequestsDocx = async () => {
    setIsDownloading((prev) => ({ ...prev, docx: true }));
    try {
      const allRequests = await fetchAllRequestsForDownload();
      if (allRequests.length === 0) {
        toast.info("No requests to download");
        return;
      }
      const doc = new Document({
        sections: [
          {
            children: [
              new Paragraph({
                text: "Tutor Vista - All Tutor Requests",
                heading: HeadingLevel.TITLE,
                alignment: AlignmentType.CENTER,
                spacing: { after: 400 },
              }),
              new Table({
                width: { size: 100, type: "pct" },
                rows: [
                  new TableRow({
                    tableHeader: true,
                    children: [
                      "#",
                      "Student",
                      "Contact",
                      "Grade/Medium",
                      "Location",
                      "Subjects",
                      "Requested Date",
                    ].map(
                      (text) =>
                        new TableCell({
                          shading: { fill: "2563EB" },
                          children: [
                            new Paragraph({
                              children: [
                                new TextRun({
                                  text,
                                  bold: true,
                                  color: "FFFFFF",
                                }),
                              ],
                              alignment: AlignmentType.CENTER,
                            }),
                          ],
                        })
                    ),
                  }),
                  ...allRequests.map(
                    (req, index) =>
                      new TableRow({
                        children: [
                          new TableCell({
                            children: [
                              new Paragraph({
                                text: (index + 1).toString(),
                                alignment: AlignmentType.CENTER,
                              }),
                            ],
                          }),
                          new TableCell({
                            children: [new Paragraph(req.studentName || "N/A")],
                          }),
                          new TableCell({
                            children: [new Paragraph(req.phoneNo || "N/A")],
                          }),
                          new TableCell({
                            children: [
                              new Paragraph(
                                req.grade
                                  ? `${req.grade} (${req.medium || "N/A"})`
                                  : req.medium || "N/A"
                              ),
                            ],
                          }),
                          new TableCell({
                            children: [
                              new Paragraph(
                                `${req.area || "N/A"}, ${req.district || "N/A"}`
                              ),
                            ],
                          }),
                          new TableCell({
                            children: [
                              new Paragraph(req.subjects?.join(", ") || "N/A"),
                            ],
                          }),
                          new TableCell({
                            children: [
                              new Paragraph(
                                new Date(req.createdAt).toLocaleDateString()
                              ),
                            ],
                          }),
                        ],
                      })
                  ),
                ],
              }),
            ],
          },
        ],
      });
      const blob = await Packer.toBlob(doc);
      saveAs(
        blob,
        `TutorVista_AllRequests_${new Date()
          .toLocaleDateString()
          .replace(/\//g, "-")}.docx`
      );
    } finally {
      setIsDownloading((prev) => ({ ...prev, docx: false }));
    }
  };

  // Download Single Request as PDF
  const downloadSingleRequestPdf = () => {
    if (!selectedRequest) return;
    const doc = new jsPDF({
      orientation: "portrait",
      unit: "mm",
      format: "a4",
    });
    const primaryColor = "#2563EB";
    const secondaryColor = "#6C7280";

    doc.setFillColor(primaryColor);
    doc.rect(0, 0, 210, 25, "F");
    doc.setTextColor(255, 255, 255);
    doc.setFont("helvetica", "bold");
    doc.setFontSize(18);
    doc.text("Tutor Vista", 15, 15);
    doc.setFontSize(12);
    doc.text("Tutor Request Details", 150, 15);

    let yPosition = 35;
    const addSection = (title, content) => {
      if (yPosition > 250) {
        doc.addPage();
        yPosition = 20;
      }
      doc.setTextColor(primaryColor);
      doc.setFont("helvetica", "bold");
      doc.setFontSize(14);
      doc.text(title, 15, yPosition);
      doc.setDrawColor(primaryColor);
      doc.setLineWidth(0.5);
      doc.line(15, yPosition + 1, 70, yPosition + 1);
      yPosition += 10;
      content();
      yPosition += 5;
    };

    const addField = (label, value) => {
      if (!value) return; // Don't add field if value is missing
      doc.setFont("helvetica", "bold");
      doc.text(`${label}:`, 15, yPosition);
      doc.setFont("helvetica", "normal");
      doc.text(value, 55, yPosition);
      yPosition += 7;
    };

    addSection("Student Information", () => {
      doc.setTextColor(0, 0, 0);
      doc.setFontSize(11);
      addField("Student Name", selectedRequest.studentName);
      addField("Phone", selectedRequest.phoneNo);
      addField("Gender", selectedRequest.gender);
      addField("Institution", selectedRequest.institution);
      addField("Medium", selectedRequest.medium);
      if (selectedRequest.curriculum) {
        addField("Curriculum", selectedRequest.curriculum);
      }
      if (selectedRequest.grade) {
        addField("Grade/Class", selectedRequest.grade);
      }
    });

    addSection("Location", () => {
      doc.setTextColor(0, 0, 0);
      doc.setFontSize(11);
      addField("Division", selectedRequest.division);
      addField("District", selectedRequest.district);
      addField("Thana", selectedRequest.thana);
      addField("Area", selectedRequest.area);
      const addressLines = doc.splitTextToSize(
        selectedRequest.address || "N/A",
        140
      );
      doc.setFont("helvetica", "bold");
      doc.text("Full Address:", 15, yPosition);
      doc.setFont("helvetica", "normal");
      doc.text(addressLines, 55, yPosition);
      yPosition += addressLines.length * 5;
    });

    addSection("Tuition Details", () => {
      doc.setTextColor(0, 0, 0);
      doc.setFontSize(11);
      addField("Subjects", selectedRequest.subjects?.join(", "));
      addField("Days per Week", selectedRequest.days);
      addField("Preferred Time", selectedRequest.time);
      addField("Salary", selectedRequest.salary);
      if (selectedRequest.requirement) {
        const reqLines = doc.splitTextToSize(selectedRequest.requirement, 140);
        doc.setFont("helvetica", "bold");
        doc.text("Requirements:", 15, yPosition);
        doc.setFont("helvetica", "normal");
        doc.text(reqLines, 55, yPosition);
        yPosition += reqLines.length * 5;
      }
    });

    addSection("Request Information", () => {
      doc.setTextColor(0, 0, 0);
      doc.setFontSize(11);
      addField(
        "Requested Date",
        new Date(selectedRequest.createdAt).toLocaleString()
      );
      addField(
        "Last Updated",
        new Date(selectedRequest.updatedAt).toLocaleString()
      );
    });

    const pageCount = doc.internal.getNumberOfPages();
    for (let i = 1; i <= pageCount; i++) {
      doc.setPage(i);
      doc.setTextColor(secondaryColor);
      doc.setFontSize(8);
      doc.setFont("helvetica", "normal");
      doc.text(`Tutor Request - Page ${i} of ${pageCount}`, 105, 290, {
        align: "center",
      });
      doc.text(`Generated on: ${new Date().toLocaleString()}`, 105, 285, {
        align: "center",
      });
    }

    doc.save(
      `TutorRequest_${selectedRequest.studentName.replace(/\s+/g, "_")}.pdf`
    );
  };

  const downloadSingleRequestDocx = async () => {
    if (!selectedRequest) return;

    const createSection = (title, data) => {
      const children = [
        new Paragraph({
          text: title,
          heading: HeadingLevel.HEADING_1,
          border: {
            bottom: { color: "2563EB", size: 6, style: BorderStyle.SINGLE },
          },
          spacing: { before: 300, after: 200 },
        }),
      ];
      if (Array.isArray(data)) {
        children.push(
          new Table({
            width: { size: 100, type: "pct" },
            rows: data.map(
              (item) =>
                new TableRow({
                  children: [
                    new TableCell({
                      children: [
                        new Paragraph({
                          children: [
                            new TextRun({ text: `${item.label}:`, bold: true }),
                          ],
                        }),
                      ],
                    }),
                    new TableCell({
                      children: [new Paragraph(item.value || "N/A")],
                    }),
                  ],
                })
            ),
          })
        );
      } else {
        children.push(new Paragraph(data || "N/A"));
      }
      return children;
    };

    const studentInfo = [
      { label: "Student Name", value: selectedRequest.studentName },
      { label: "Phone", value: selectedRequest.phoneNo },
      { label: "Gender", value: selectedRequest.gender },
      { label: "Institution", value: selectedRequest.institution },
      { label: "Medium", value: selectedRequest.medium },
    ];

    if (selectedRequest.curriculum) {
      studentInfo.push({
        label: "Curriculum",
        value: selectedRequest.curriculum,
      });
    }
    if (selectedRequest.grade) {
      studentInfo.push({ label: "Grade/Class", value: selectedRequest.grade });
    }

    const doc = new Document({
      sections: [
        {
          children: [
            new Paragraph({
              text: "Tutor Vista - Tutor Request Details",
              heading: HeadingLevel.TITLE,
              alignment: AlignmentType.CENTER,
              spacing: { after: 300 },
            }),
            ...createSection("Student Information", studentInfo),
            ...createSection("Location", [
              { label: "Division", value: selectedRequest.division },
              { label: "District", value: selectedRequest.district },
              { label: "Thana", value: selectedRequest.thana },
              { label: "Area", value: selectedRequest.area },
              { label: "Full Address", value: selectedRequest.address },
            ]),
            ...createSection("Subjects", selectedRequest.subjects?.join(", ")),
            ...createSection("Schedule & Compensation", [
              { label: "Days per Week", value: selectedRequest.days },
              { label: "Preferred Time", value: selectedRequest.time },
              { label: "Salary", value: selectedRequest.salary },
            ]),
            ...(selectedRequest.requirement
              ? createSection(
                  "Additional Requirements",
                  selectedRequest.requirement
                )
              : []),
            ...createSection("Request Information", [
              {
                label: "Requested Date",
                value: new Date(selectedRequest.createdAt).toLocaleString(),
              },
              {
                label: "Last Updated",
                value: new Date(selectedRequest.updatedAt).toLocaleString(),
              },
            ]),
            new Paragraph({
              children: [
                new TextRun({
                  text: `Generated on: ${new Date().toLocaleString()}`,
                  italics: true,
                }),
              ],
              alignment: AlignmentType.CENTER,
              spacing: { before: 500 },
            }),
          ],
        },
      ],
    });

    const blob = await Packer.toBlob(doc);
    saveAs(
      blob,
      `TutorRequest_${selectedRequest.studentName.replace(/\s+/g, "_")}.docx`
    );
  };

  const bannerChunks = [];
  for (let i = 0; i < requests.length; i += 6) {
    bannerChunks.push(requests.slice(i, i + 6));
  }

  return (
    <div className="space-y-6">
      {/* Stats Cards Section */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
        {/* Total Requests Card */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 px-4 py-3 flex items-center justify-between h-16">
          <div>
            <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block">Total Requests</span>
            <span className="text-xl font-extrabold text-gray-900 block mt-0.5 leading-none">{stats.total}</span>
          </div>
          <div className="bg-blue-50 text-blue-500 p-1.5 rounded-lg shrink-0">
            <Users className="w-4 h-4" />
          </div>
        </div>

        {/* Active Card */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 px-4 py-3 flex items-center justify-between h-16">
          <div>
            <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block">Active</span>
            <span className="text-xl font-extrabold text-gray-900 block mt-0.5 leading-none">{stats.active}</span>
          </div>
          <div className="bg-green-50 text-green-500 p-1.5 rounded-lg shrink-0">
            <CheckCircle className="w-4 h-4" />
          </div>
        </div>

        {/* Pending Card */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 px-4 py-3 flex items-center justify-between h-16">
          <div>
            <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block">Pending</span>
            <span className="text-xl font-extrabold text-gray-900 block mt-0.5 leading-none">{stats.pending}</span>
          </div>
          <div className="bg-amber-50 text-amber-500 p-1.5 rounded-lg shrink-0">
            <Clock className="w-4 h-4" />
          </div>
        </div>

        {/* Referred Card */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 px-4 py-3 flex items-center justify-between h-16">
          <div>
            <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block">Referred</span>
            <span className="text-xl font-extrabold text-gray-900 block mt-0.5 leading-none">{stats.referred}</span>
          </div>
          <div className="bg-emerald-50 text-emerald-500 p-1.5 rounded-lg shrink-0">
            <UserCheck className="w-4 h-4" />
          </div>
        </div>

        {/* Confirmed Card */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 px-4 py-3 flex items-center justify-between h-16">
          <div>
            <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block">Confirmed</span>
            <span className="text-xl font-extrabold text-gray-900 block mt-0.5 leading-none">{stats.confirmed}</span>
          </div>
          <div className="bg-purple-50 text-purple-500 p-1.5 rounded-lg shrink-0">
            <CheckCircle className="w-4 h-4" strokeWidth={2.5} />
          </div>
        </div>

        {/* Demo Card */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 px-4 py-3 flex items-center justify-between h-16">
          <div>
            <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block">Demo</span>
            <span className="text-xl font-extrabold text-gray-900 block mt-0.5 leading-none">{stats.demo}</span>
          </div>
          <div className="bg-yellow-50 text-yellow-600 p-1.5 rounded-lg shrink-0">
            <Play className="w-4 h-4 fill-yellow-600" />
          </div>
        </div>

        {/* Problem Card */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 px-4 py-3 flex items-center justify-between h-16">
          <div>
            <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block">Problem</span>
            <span className="text-xl font-extrabold text-gray-900 block mt-0.5 leading-none">{stats.problem}</span>
          </div>
          <div className="bg-orange-50 text-orange-500 p-1.5 rounded-lg shrink-0">
            <AlertTriangle className="w-4 h-4" />
          </div>
        </div>

        {/* Cancelled Card */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 px-4 py-3 flex items-center justify-between h-16">
          <div>
            <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block">Cancelled</span>
            <span className="text-xl font-extrabold text-gray-900 block mt-0.5 leading-none">{stats.cancelled}</span>
          </div>
          <div className="bg-red-50 text-red-500 p-1.5 rounded-lg shrink-0">
            <XCircle className="w-4 h-4" />
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <TutorRequestHeader
          user={user}
          onAddRequest={handleAddRequest}
          onDownloadPdf={downloadAllRequestsPdf}
          onDownloadDocx={downloadAllRequestsDocx}
          onDownloadSheet={downloadAllRequestsSheet}
          isDownloading={isDownloading}
        />
        <TutorRequestFilters
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          statusFilter={statusFilter}
          setStatusFilter={setStatusFilter}
          workflowStatusFilter={workflowStatusFilter}
          setWorkflowStatusFilter={setWorkflowStatusFilter}
          dateFilter={dateFilter}
          setDateFilter={setDateFilter}
          customStartDate={customStartDate}
          setCustomStartDate={setCustomStartDate}
          customEndDate={customEndDate}
          setCustomEndDate={setCustomEndDate}
          zoneFilter={zoneFilter}
          setZoneFilter={setZoneFilter}
          mediumFilter={mediumFilter}
          setMediumFilter={setMediumFilter}
          onClearFilters={handleClearFilters}
        />
        
        {/* Actions Panel */}
        <div className="mb-6 flex flex-col sm:flex-row gap-3">
          <button
            onClick={downloadBanners}
            disabled={requests.length === 0 || loading || isDownloading.banner}
            title={requests.length === 0 ? "No tutor requests available to download." : "Download tuition banners"}
            className={`flex items-center justify-center space-x-2 px-4 py-2.5 rounded-lg font-semibold border transition duration-200 text-sm w-full sm:w-auto ${
              requests.length === 0 || loading || isDownloading.banner
                ? "bg-gray-100 border-gray-200 text-gray-400 cursor-not-allowed"
                : "bg-pink-600 border-pink-600 text-white hover:bg-pink-700 disabled:opacity-50"
            }`}
          >
            {isDownloading.banner ? (
              <>
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                <span>Downloading...</span>
              </>
            ) : (
              <>
                <ImageIcon className="w-4 h-4 mr-2" />
                <span>Download Banner</span>
              </>
            )}
          </button>
        </div>

        <TutorRequestTable
          requests={requests}
          loading={loading}
          onView={handleView}
          onEdit={handleEditRequest}
          onDelete={handleDelete}
          onCopy={handleCopySingleRequest}
          user={user}
          onClearFilters={handleClearFilters}
        />
      </div>

      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={setCurrentPage}
        totalItems={totalRequests}
        itemsPerPage={itemsPerPage}
      />

      <TutorRequestDetailsModal
        open={showDetailsModal}
        onClose={() => setShowDetailsModal(false)}
        request={selectedRequest}
        onDownloadPdf={downloadSingleRequestPdf}
        onDownloadDocx={downloadSingleRequestDocx}
      />
      <AddTutorRequestModal
        isOpen={showAddModal}
        onClose={() => setShowAddModal(false)}
        onSuccess={handleSuccess}
      />
      <EditTutorRequestModal
        isOpen={showEditModal}
        onClose={() => setShowEditModal(false)}
        onSuccess={handleSuccess}
        request={selectedRequest}
      />

      <BannerTemplate
        bannerChunks={bannerChunks}
        divisionTitle={getBannerTitleDivision()}
      />
    </div>
  );
};

export default TutorRequestsPage;
