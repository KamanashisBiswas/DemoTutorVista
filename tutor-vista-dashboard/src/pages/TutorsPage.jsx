import React, { useState, useEffect, useMemo, useCallback } from "react";
import { toast } from "react-toastify";
import * as XLSX from "xlsx";
import { jsPDF } from "jspdf";
import autoTable from "jspdf-autotable";
import {
  Document,
  Paragraph,
  Table,
  TableRow,
  TableCell,
  TextRun,
  AlignmentType,
  Packer,
  PageOrientation,
  HeadingLevel,
} from "docx";
import { saveAs } from "file-saver";

import ApiService from "../services/api";
import { useAuth } from "../context/AuthContext";
import locationData from "../assets/data/address.json";
import { TutorPdfGenerator } from "../utils/TutorPdfGenerator";
import { TutorDocxGenerator } from "../utils/TutorDocxGenerator";

import AddTutorModal from "../components/AddTutorModal";
import EditTutorModal from "../components/EditTutorModal";
import TutorDetailsModal from "../components/TutorDetailsModal";
import DeleteConfirm from "../components/DeleteConfirm";
import Pagination from "../components/Pagination";
import TutorsPageHeader from "../components/TutorsPageHeader";
import TutorSearchFilters from "../components/TutorSearchFilters";
import TutorAdvancedFilters from "../components/TutorAdvancedFilters";
import TutorsTable from "../components/TutorsTable";

const TutorsPage = () => {
  const { user } = useAuth();
  const [tutors, setTutors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [selectedTutor, setSelectedTutor] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState(searchTerm);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [hiredFilter, setHiredFilter] = useState("");
  const [specialSkillsFilter, setSpecialSkillsFilter] = useState([]);
  const [isDownloading, setIsDownloading] = useState({
    pdf: false,
    docx: false,
    sheet: false,
  });

  const [locationFilter, setLocationFilter] = useState({
    division: "",
    district: "",
    thana: "",
    area: "",
  });
  const [mediumFilter, setMediumFilter] = useState({ medium: "", level: "" });
  const [preferredSubjectFilter, setPreferredSubjectFilter] = useState("");
  const [genderFilter, setGenderFilter] = useState("");
  const [scoreFilter, setScoreFilter] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalTutors, setTotalTutors] = useState(0);
  const itemsPerPage = 8;
  const [suitableAreaFilter, setSuitableAreaFilter] = useState([]);
  const [institutionFilter, setInstitutionFilter] = useState("");
  const [departmentFilter, setDepartmentFilter] = useState("");
  const [sortByScore, setSortByScore] = useState(""); // Add state for score sorting

  // New states for holding input values before applying filter
  const [inputScore, setInputScore] = useState("");
  const [inputDepartment, setInputDepartment] = useState("");
  const [inputInstitution, setInputInstitution] = useState("");
  const [inputSubject, setInputSubject] = useState("");

  const divisions = useMemo(
    () => locationData.divisions.map((d) => d.division?.name_en || d.name_en),
    [],
  );

  const districts = useMemo(() => {
    if (!locationFilter.division) return [];
    const selectedDivision = locationData.divisions.find(
      (d) => (d.division?.name_en || d.name_en) === locationFilter.division,
    );
    return selectedDivision && selectedDivision.districts
      ? selectedDivision.districts.map((d) => d.name_en)
      : [];
  }, [locationFilter.division]);

  const thanas = useMemo(() => {
    if (!locationFilter.district) return [];
    const selectedDistrict = locationData.divisions
      .filter((d) => d.districts)
      .flatMap((d) => d.districts)
      .find((dist) => dist.name_en === locationFilter.district);
    return selectedDistrict && selectedDistrict.thanas
      ? selectedDistrict.thanas.map((t) => t.name_en)
      : [];
  }, [locationFilter.district]);

  const areas = useMemo(() => {
    if (!locationFilter.thana) return [];
    const selectedThana = locationData.divisions
      .filter((d) => d.districts)
      .flatMap((d) => d.districts)
      .flatMap((dist) => dist.thanas || [])
      .find((t) => t.name_en === locationFilter.thana);
    return selectedThana && selectedThana.areas
      ? selectedThana.areas.map((a) => a.name_en)
      : [];
  }, [locationFilter.thana]);

  const availableMediums = useMemo(
    () => [
      "Bangla Medium",
      "English Medium",
      "English Version (National Curriculum)",
      "Arabic Medium",
    ],
    [],
  );

  const getValidLevelsForMedium = useCallback(
    (medium) =>
      medium === "English Medium"
        ? ["Cambridge", "Edexcel", "IB Curriculum"]
        : [],
    [],
  );

  const availableGenders = useMemo(() => ["Male", "Female", "Any"], []);

  const availableSpecialSkills = useMemo(
    () => [
      "Language",
      "Art",
      "IELTS",
      "SAT",
      "PT",
      "TOEFL",
      "Music Instrument",
      "Singing",
      "Dancing",
    ],
    [],
  );

  const availableSuitableAreas = useMemo(() => {
    // Extract all unique areas from address.json
    const allAreas = new Set();

    locationData.divisions?.forEach((division) => {
      division.districts?.forEach((district) => {
        district.thanas?.forEach((thana) => {
          thana.areas?.forEach((area) => {
            if (area && area.name_en) {
              allAreas.add(area.name_en);
            }
          });
        });
      });
    });

    return Array.from(allAreas).sort();
  }, []);

  const handleLocationFilterChange = (field, value) => {
    setLocationFilter((prev) => {
      const newState = { ...prev, [field]: value };
      if (field === "division")
        Object.assign(newState, { district: "", thana: "", area: "" });
      if (field === "district")
        Object.assign(newState, { thana: "", area: "" });
      if (field === "thana") Object.assign(newState, { area: "" });
      return newState;
    });
  };

  const handleApplyTextFilter = (filterType) => {
    setCurrentPage(1); // Reset to first page on filter apply
    if (filterType === "score") {
      setScoreFilter(inputScore);
    } else if (filterType === "department") {
      setDepartmentFilter(inputDepartment);
    } else if (filterType === "institution") {
      setInstitutionFilter(inputInstitution);
    } else if (filterType === "subject") {
      setPreferredSubjectFilter(inputSubject);
    }
  };

  const handleMediumFilterChange = (field, value) => {
    setMediumFilter((prev) => ({
      ...prev,
      [field]: value,
      ...(field === "medium" && { level: "" }),
    }));
  };

  const clearAllFilters = () => {
    setLocationFilter({ division: "", district: "", thana: "", area: "" });
    setMediumFilter({ medium: "", level: "" });
    setPreferredSubjectFilter("");
    setGenderFilter("");
    setScoreFilter("");
    setSpecialSkillsFilter([]);
    setSearchTerm("");
    setCurrentPage(1);
    setSuitableAreaFilter([]);
    setInstitutionFilter("");
    setDepartmentFilter("");
    setHiredFilter("");
    setSortByScore(""); // Reset sort order

    // Clear input fields as well
    setInputScore("");
    setInputDepartment("");
    setInputInstitution("");
    setInputSubject("");
  };

  const fetchTutors = useCallback(async () => {
    setLoading(true);
    try {
      const params = {
        page: currentPage,
        limit: itemsPerPage,
        search: debouncedSearch,
        isHired:
          hiredFilter === "hired"
            ? true
            : hiredFilter === "not_hired"
              ? false
              : undefined,
        division: locationFilter.division || undefined,
        district: locationFilter.district || undefined,
        thana: locationFilter.thana || undefined,
        area: locationFilter.area || undefined,
        medium: mediumFilter.medium || undefined,
        level: mediumFilter.level || undefined,
        preferredSubjects: preferredSubjectFilter || undefined,
        gender: genderFilter || undefined,
        score: scoreFilter || undefined,
        specialSkills:
          specialSkillsFilter.length > 0
            ? specialSkillsFilter.join(",")
            : undefined,
        suitableArea:
          suitableAreaFilter.length > 0
            ? suitableAreaFilter.join(",")
            : undefined,
        institution: institutionFilter || undefined,
        department: departmentFilter || undefined,
        sortByScore: sortByScore || undefined, // Pass sort parameter to API
      };
      Object.keys(params).forEach(
        (key) => params[key] === undefined && delete params[key],
      );
      const data = await ApiService.getTutorApplications(params);
      setTutors(data.data?.applications || []);
      setTotalPages(data.data?.pagination?.pages || 1);
      setTotalTutors(data.data?.pagination?.total || 0);
    } catch (error) {
      console.error("Error fetching tutors:", error);
      toast.error("Failed to fetch tutors.");
      setTutors([]);
    } finally {
      setLoading(false);
    }
  }, [
    currentPage,
    debouncedSearch,
    hiredFilter,
    locationFilter,
    mediumFilter,
    preferredSubjectFilter,
    genderFilter,
    scoreFilter,
    specialSkillsFilter,
    suitableAreaFilter,
    institutionFilter,
    departmentFilter,
    sortByScore, // Add to dependency array
  ]);

  useEffect(() => {
    const handler = setTimeout(() => setDebouncedSearch(searchTerm), 400);
    return () => clearTimeout(handler);
  }, [searchTerm]);

  useEffect(() => {
    fetchTutors();
  }, [fetchTutors]);

  const handleView = (tutor) => {
    setSelectedTutor(tutor);
    setShowModal(true);
  };

  const handleEdit = (tutor) => {
    setSelectedTutor(tutor);
    setShowEditModal(true);
  };

  const deleteConfirm = DeleteConfirm({});

  const handleDelete = (id, name) => {
    deleteConfirm.handleDelete({
      onDelete: async () => {
        await ApiService.deleteTutor(id);
        await fetchTutors();
      },
      itemName: name,
      itemType: "tutor",
      customMessage: `Are you sure you want to delete ${name}'s Tutor?`,
    });
  };

  const handleSuccess = () => {
    fetchTutors();
    setShowAddModal(false);
    setShowEditModal(false);
  };

  const fetchAllTutorsForDownload = async () => {
    setLoading(true);
    try {
      const params = {
        search: searchTerm,
        isHired:
          hiredFilter === "hired"
            ? true
            : hiredFilter === "not_hired"
              ? false
              : undefined,
        division: locationFilter.division || undefined,
        district: locationFilter.district || undefined,
        thana: locationFilter.thana || undefined,
        area: locationFilter.area || undefined,
        medium: mediumFilter.medium || undefined,
        level: mediumFilter.level || undefined,
        preferredSubjects: preferredSubjectFilter || undefined,
        gender: genderFilter || undefined,
        score: scoreFilter || undefined,
      };

      Object.keys(params).forEach(
        (key) => params[key] === undefined && delete params[key],
      );

      params.limit = 10000;
      params.page = 1;

      const data = await ApiService.getTutorApplications(params);
      return data.data?.applications || [];
    } catch (error) {
      console.error("Error fetching all tutors for download:", error);
      toast.error("Could not fetch all tutors for download.");
      return [];
    } finally {
      setLoading(false);
    }
  };

  const downloadAllTutorsPdf = async () => {
    setIsDownloading((prev) => ({ ...prev, pdf: true }));
    try {
      const allTutors = await fetchAllTutorsForDownload();
      if (allTutors.length === 0) {
        toast.error("No tutors to download");
        return;
      }

      const doc = new jsPDF({
        orientation: "landscape",
        unit: "mm",
        format: "a4",
      });

      const primaryColor = "#2563EB";
      const secondaryColor = "#6C7280";

      doc.setFillColor(primaryColor);
      doc.rect(0, 0, 297, 25, "F");
      doc.setTextColor(255, 255, 255);
      doc.setFont("helvetica", "bold");
      doc.setFontSize(18);
      doc.text("Tutor Vista", 15, 15);
      doc.setFontSize(12);
      doc.text("All Tutors List", 250, 15);

      const tableData = allTutors.map((tutor, index) => [
        index + 1,
        tutor.name || "N/A",
        tutor.phone || "N/A",
        tutor.email || "N/A",
        tutor.gender || "N/A",
        `${tutor.area || "N/A"}, ${tutor.district || "N/A"}`,
        tutor.educationSections?.[0]?.institution || "N/A",
        tutor.educationSections?.[0]?.examination || "N/A",
        tutor.educationSections?.[0]?.gpa || "N/A",
        tutor.preferredSubjects?.slice(0, 3).join(", ") || "N/A",
      ]);

      autoTable(doc, {
        startY: 35,
        head: [
          [
            "#",
            "Name",
            "Phone",
            "Email",
            "Gender",
            "Location",
            "Institution",
            "Degree",
            "GPA",
            "Subjects",
          ],
        ],
        body: tableData,
        theme: "grid",
        headStyles: {
          fillColor: [43, 99, 235],
          textColor: 255,
          fontStyle: "bold",
          halign: "center",
          fontSize: 9,
        },
        styles: {
          cellPadding: 2,
          fontSize: 8,
          overflow: "linebreak",
          lineWidth: 0.1,
        },
        columnStyles: {
          0: { cellWidth: 10 },
          1: { cellWidth: 30 },
          2: { cellWidth: 25 },
          3: { cellWidth: 35 },
          4: { cellWidth: 15 },
          5: { cellWidth: 35 },
          6: { cellWidth: 40 },
          7: { cellWidth: 25 },
          8: { cellWidth: 15 },
          9: { cellWidth: 40 },
        },
      });

      const pageCount = doc.internal.getNumberOfPages();
      for (let i = 1; i <= pageCount; i++) {
        doc.setPage(i);
        doc.setTextColor(secondaryColor);
        doc.setFontSize(8);
        doc.setFont("helvetica", "normal");
        doc.text(
          `Tutor Vista - All Tutors List - Page ${i} of ${pageCount}`,
          148,
          200,
          { align: "center" },
        );
        doc.text(`Generated on: ${new Date().toLocaleString()}`, 148, 195, {
          align: "center",
        });
      }

      doc.save(
        `TutorVista_AllTutors_${new Date()
          .toLocaleDateString()
          .replace(/\//g, "-")}.pdf`,
      );
    } finally {
      setIsDownloading((prev) => ({ ...prev, pdf: false }));
    }
  };

  const downloadAllTutorsSheet = async () => {
    setIsDownloading((prev) => ({ ...prev, sheet: true }));
    try {
      const allTutors = await fetchAllTutorsForDownload();
      if (allTutors.length === 0) {
        toast.error("No tutors to download");
        return;
      }

      const sheetData = allTutors.map((tutor, index) => ({
        "#": index + 1,
        Name: tutor.name || "N/A",
        Phone: tutor.phone || "N/A",
        Email: tutor.email || "N/A",
        Gender: tutor.gender || "N/A",
        Location: `${tutor.area || "N/A"}, ${tutor.district || "N/A"}`,
        Institution: tutor.educationSections?.[0]?.institution || "N/A",
        Degree: tutor.educationSections?.[0]?.examination || "N/A",
        GPA: tutor.educationSections?.[0]?.gpa || "N/A",
        Subjects: tutor.preferredSubjects?.join(", ") || "N/A",
        "Hired Status": tutor.isHired ? "Hired" : "Not Hired",
      }));

      const worksheet = XLSX.utils.json_to_sheet(sheetData);
      const workbook = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(workbook, worksheet, "Tutors");

      // Auto-fit columns
      const cols = Object.keys(sheetData[0]).map((key) => ({
        wch: Math.max(
          key.length,
          ...sheetData.map((row) => String(row[key]).length),
        ),
      }));
      worksheet["!cols"] = cols;

      XLSX.writeFile(
        workbook,
        `TutorVista_AllTutors_${new Date()
          .toLocaleDateString()
          .replace(/\//g, "-")}.xlsx`,
      );
    } finally {
      setIsDownloading((prev) => ({ ...prev, sheet: false }));
    }
  };

  const downloadAllTutorsDocx = async () => {
    setIsDownloading((prev) => ({ ...prev, docx: true }));
    try {
      const allTutors = await fetchAllTutorsForDownload();
      if (allTutors.length === 0) {
        toast.error("No tutors to download");
        return;
      }

      const doc = new Document({
        sections: [
          {
            properties: {
              page: {
                size: {
                  orientation: PageOrientation.LANDSCAPE,
                },
              },
            },
            children: [
              new Paragraph({
                text: "Tutor Vista - All Tutors List",
                heading: HeadingLevel.TITLE,
                alignment: AlignmentType.CENTER,
                spacing: { after: 400 },
              }),
              new Table({
                width: { size: 100, type: "pct" },
                columnWidths: [20, 50, 30],
                rows: [
                  new TableRow({
                    children: [
                      new TableCell({
                        children: [
                          new Paragraph({
                            children: [
                              new TextRun({
                                text: "#",
                                bold: true,
                                color: "FFFFFF",
                              }),
                            ],
                            alignment: AlignmentType.CENTER,
                          }),
                        ],
                        width: { size: 5, type: "pct" },
                      }),
                      new TableCell({
                        children: [
                          new Paragraph({
                            children: [
                              new TextRun({
                                text: "Name",
                                bold: true,
                                color: "FFFFFF",
                              }),
                            ],
                            alignment: AlignmentType.CENTER,
                          }),
                        ],
                        width: { size: 15, type: "pct" },
                      }),
                      new TableCell({
                        children: [
                          new Paragraph({
                            children: [
                              new TextRun({
                                text: "Contact",
                                bold: true,
                                color: "FFFFFF",
                              }),
                            ],
                          }),
                        ],
                        width: { size: 20, type: "pct" },
                      }),
                      new TableCell({
                        children: [
                          new Paragraph({
                            children: [
                              new TextRun({
                                text: "Location",
                                bold: true,
                                color: "FFFFFF",
                              }),
                            ],
                          }),
                        ],
                        width: { size: 15, type: "pct" },
                      }),
                      new TableCell({
                        children: [
                          new Paragraph({
                            children: [
                              new TextRun({
                                text: "Education",
                                bold: true,
                                color: "FFFFFF",
                              }),
                            ],
                          }),
                        ],
                        width: { size: 25, type: "pct" },
                      }),
                      new TableCell({
                        children: [
                          new Paragraph({
                            children: [
                              new TextRun({
                                text: "Subjects",
                                bold: true,
                                color: "FFFFFF",
                              }),
                            ],
                          }),
                        ],
                        width: { size: 20, type: "pct" },
                      }),
                      new TableCell({
                        children: [
                          new Paragraph({
                            children: [
                              new TextRun({
                                text: "Hired Status",
                                bold: true,
                                color: "FFFFFF",
                              }),
                            ],
                            alignment: AlignmentType.CENTER,
                          }),
                        ],
                        width: { size: 15, type: "pct" },
                      }),
                    ],
                  }),
                  ...allTutors.map(
                    (tutor, index) =>
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
                            children: [
                              new Paragraph({
                                children: [
                                  new TextRun({
                                    text: tutor.name || "N/A",
                                    bold: true,
                                  }),
                                  new TextRun({
                                    text: `\n${tutor.gender || "N/A"}`,
                                    size: 18,
                                    color: "666666",
                                  }),
                                ],
                              }),
                            ],
                          }),
                          new TableCell({
                            children: [
                              new Paragraph({
                                children: [
                                  new TextRun({
                                    text: tutor.phone || "N/A",
                                    bold: true,
                                  }),
                                  new TextRun({
                                    text: `\n${tutor.email || "N/A"}`,
                                    size: 18,
                                    color: "666666",
                                  }),
                                ],
                              }),
                            ],
                          }),
                          new TableCell({
                            children: [
                              new Paragraph({
                                children: [
                                  new TextRun({
                                    text: tutor.area || "N/A",
                                    bold: true,
                                  }),
                                  new TextRun({
                                    text: `\n${tutor.district || "N/A"}`,
                                    size: 18,
                                    color: "666666",
                                  }),
                                ],
                              }),
                            ],
                          }),
                          new TableCell({
                            children: [
                              new Paragraph({
                                children: [
                                  new TextRun({
                                    text:
                                      tutor.educationSections?.[0]
                                        ?.institution || "N/A",
                                    bold: true,
                                  }),
                                  new TextRun({
                                    text: `\n${
                                      tutor.educationSections?.[0]
                                        ?.examination || "N/A"
                                    } • GPA: ${
                                      tutor.educationSections?.[0]?.gpa || "N/A"
                                    }`,
                                    size: 18,
                                    color: "666666",
                                  }),
                                ],
                              }),
                            ],
                          }),
                          new TableCell({
                            children: [
                              new Paragraph(
                                tutor.preferredSubjects
                                  ?.slice(0, 4)
                                  .join(", ") || "No subjects specified",
                              ),
                            ],
                          }),
                          new TableCell({
                            children: [
                              new Paragraph({
                                children: [
                                  new TextRun({
                                    text: tutor.hiredStatus
                                      ? "Hired"
                                      : "Not Hired",
                                    bold: true,
                                    color: tutor.hiredStatus
                                      ? "28a745"
                                      : "dc3545",
                                  }),
                                ],
                                alignment: AlignmentType.CENTER,
                              }),
                            ],
                          }),
                        ],
                      }),
                  ),
                ],
              }),
              new Paragraph({
                children: [
                  new TextRun({
                    text: `Generated on: ${new Date().toLocaleString()}`,
                    italics: true,
                    size: 20,
                    color: "666666",
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
        `TutorVista_AllTutors_${new Date()
          .toLocaleDateString()
          .replace(/\//g, "-")}.docx`,
      );
    } finally {
      setIsDownloading((prev) => ({ ...prev, docx: false }));
    }
  };

  const downloadTutorPdf = async () => {
    if (!selectedTutor) return;
    const generator = new TutorPdfGenerator(selectedTutor);
    await generator.generate();
  };

  const downloadTutorDocx = async () => {
    if (!selectedTutor) return;
    const generator = new TutorDocxGenerator(selectedTutor);
    await generator.generate();
  };

  const downloadFile = async (url, filename) => {
    try {
      const response = await fetch(url);
      const blob = await response.blob();
      const downloadUrl = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = downloadUrl;
      link.download = filename;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(downloadUrl);
    } catch (error) {
      console.error("Download failed:", error);
      toast.error("Download failed. Please try again.");
    }
  };

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <TutorsPageHeader
          user={user}
          onAddTutor={() => setShowAddModal(true)}
          onDownloadPdf={downloadAllTutorsPdf}
          onDownloadDocx={downloadAllTutorsDocx}
          onDownloadSheet={downloadAllTutorsSheet}
          isDownloading={isDownloading}
        />

        <div className="mb-6 space-y-4">
          <TutorSearchFilters
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
            hiredFilter={hiredFilter}
            setHiredFilter={setHiredFilter}
          />
          <TutorAdvancedFilters
            clearAllFilters={clearAllFilters}
            locationFilter={locationFilter}
            handleLocationFilterChange={handleLocationFilterChange}
            divisions={divisions}
            districts={districts}
            thanas={thanas}
            areas={areas}
            mediumFilter={mediumFilter}
            handleMediumFilterChange={handleMediumFilterChange}
            availableMediums={availableMediums}
            getValidLevelsForMedium={getValidLevelsForMedium}
            inputSubject={inputSubject}
            setInputSubject={setInputSubject}
            genderFilter={genderFilter}
            setGenderFilter={setGenderFilter}
            availableGenders={availableGenders}
            inputScore={inputScore}
            setInputScore={setInputScore}
            specialSkillsFilter={specialSkillsFilter}
            setSpecialSkillsFilter={setSpecialSkillsFilter}
            availableSpecialSkills={availableSpecialSkills}
            suitableAreaFilter={suitableAreaFilter}
            setSuitableAreaFilter={setSuitableAreaFilter}
            availableSuitableAreas={availableSuitableAreas}
            inputInstitution={inputInstitution}
            setInputInstitution={setInputInstitution}
            inputDepartment={inputDepartment}
            setInputDepartment={setInputDepartment}
            handleApplyTextFilter={handleApplyTextFilter}
            sortByScore={sortByScore}
            setSortByScore={setSortByScore}
          />
        </div>

        <TutorsTable
          tutors={tutors}
          loading={loading}
          onView={handleView}
          onEdit={handleEdit}
          onDelete={handleDelete}
          user={user}
        />
      </div>

      {totalPages > 1 && (
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
          totalItems={totalTutors}
          itemsPerPage={itemsPerPage}
        />
      )}

      {showModal && selectedTutor && (
        <TutorDetailsModal
          open={showModal}
          onClose={() => setShowModal(false)}
          tutor={selectedTutor}
          onDownloadPdf={downloadTutorPdf}
          onDownloadDocx={downloadTutorDocx}
          downloadFile={downloadFile}
        />
      )}

      {showAddModal && (
        <AddTutorModal
          isOpen={showAddModal}
          onClose={() => setShowAddModal(false)}
          onSuccess={handleSuccess}
        />
      )}

      {showEditModal && selectedTutor && (
        <EditTutorModal
          isOpen={showEditModal}
          onClose={() => setShowEditModal(false)}
          tutor={selectedTutor}
          onSuccess={handleSuccess}
        />
      )}
    </div>
  );
};

export default TutorsPage;
