import { jsPDF } from "jspdf";
import appLogo from "../assets/Logo.png";
import qrImg from "../assets/qr-code.jpg";

export class TutorPdfGenerator {
  constructor(tutor) {
    this.tutor = tutor;
    this.doc = new jsPDF({
      orientation: "portrait",
      unit: "mm",
      format: "a4",
    });
    this.primary = [17, 94, 179];
    this.secondary = [45, 55, 72];
    this.subtle = [113, 128, 150];
    this.accent = [56, 189, 248];
    this.cardFill = [247, 250, 252];
    this.margin = 18;
    this.y = 18;
    this.profileImage = null;
    this.headerLogo = null; // লোগো রাখার জন্য নতুন প্রপার্টি
  }

  async fetchBase64(url) {
    try {
      const res = await fetch(url);
      if (!res.ok) return null;
      const blob = await res.blob();
      return await new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onloadend = () => resolve(reader.result);
        reader.onerror = reject;
        reader.readAsDataURL(blob);
      });
    } catch (err) {
      console.error("Image fetch failed:", err);
      return null;
    }
  }

  nextPage() {
    this.doc.addPage();
    this.y = 18;
  }

  ensureSpace(height) {
    if (this.y + height > 285) this.nextPage();
  }

  drawProfileHeader() {
    // Main gradient background
    this.doc.setFillColor(13, 71, 161);
    this.doc.rect(0, 0, 210, 60, "F");

    this.doc.setFillColor(30, 136, 229);
    this.doc.rect(0, 30, 210, 30, "F");

    // Decorative circles
    this.doc.setFillColor(14, 116, 204);
    this.doc.circle(200, 10, 35, "F");

    // --- Top-right Logo and Text ---
    const logoWidth = 15;
    const logoHeight = 15;
    const logoX = 210 - this.margin - 0;
    const logoY = 3;

    // Draw logo badge and image
    if (this.headerLogo) {
      this.doc.setFillColor(255, 255, 255);
      this.doc.roundedRect(
        logoX - 2,
        logoY - 2,
        logoWidth + 4,
        logoHeight + 4,
        4,
        4,
        "F",
      );
      this.doc.addImage(
        this.headerLogo,
        "PNG",
        logoX,
        logoY,
        logoWidth,
        logoHeight,
      );
    } else {
      // Fallback to "TV" text if logo fails to load
      this.doc.setFillColor(255, 255, 255);
      this.doc.roundedRect(
        logoX - 2,
        logoY - 2,
        logoWidth + 4,
        logoHeight + 4,
        4,
        4,
        "F",
      );
      this.doc.setFont("helvetica", "bold");
      this.doc.setFontSize(9);
      this.doc.setTextColor(13, 71, 161);
      this.doc.text("TV", logoX + logoWidth / 2, logoY + logoHeight / 2 + 3, {
        align: "center",
      });
    }

    // "Tutor Vista" text below the logo
    this.doc.setFont("helvetica", "bold");
    this.doc.setFontSize(15);
    this.doc.setTextColor(255, 255, 255);
    const textX = logoX + logoWidth / 2 + 12; // Adjust X for vertical alignment
    const textY = logoY + logoHeight + 7; // Adjust Y to position below the logo
    this.doc.text("Tutor Vista", textX, textY, {
      align: "center",
      angle: -90, // Rotate text to be vertical (bottom-to-top)
    });

    // Profile Image - Left side
    const avatarSize = 38;
    const avatarX = this.margin;
    const avatarY = 12;

    if (this.profileImage) {
      this.doc.addImage(
        this.profileImage,
        "JPEG",
        avatarX,
        avatarY,
        avatarSize,
        avatarSize,
      );
    } else {
      this.doc.setFillColor(226, 232, 240);
      this.doc.rect(avatarX, avatarY, avatarSize, avatarSize, "F");
      this.doc.setFont("helvetica", "normal");
      this.doc.setFontSize(8);
      this.doc.setTextColor(71, 85, 105);
      this.doc.text(
        "No Photo",
        avatarX + avatarSize / 2,
        avatarY + avatarSize / 2,
        {
          align: "center",
        },
      );
    }

    // Name and info section - Right of image
    const infoStartX = avatarX + avatarSize + 12;
    const infoStartY = 14;

    // Name
    this.doc.setTextColor(255, 255, 255);
    this.doc.setFont("helvetica", "bold");
    this.doc.setFontSize(24);
    this.doc.text(this.tutor.name || "N/A", infoStartX, infoStartY + 8);

    // Gender & Hired Status - Below name
    this.doc.setFont("helvetica", "normal");
    this.doc.setFontSize(10);
    this.doc.setTextColor(226, 232, 240);
    const statusText = `${this.tutor.gender || "N/A"} • ${
      this.tutor.isHired ? "Hired" : "Available"
    }`;
    this.doc.text(statusText, infoStartX, infoStartY + 15);

    // Contact info with ICONS (NO LABELS)
    const contactY = infoStartY + 22; // Adjusted Y position for contact info
    const iconX = infoStartX;

    // Phone icon
    this.doc.setDrawColor(255, 255, 255);
    this.doc.setFillColor(255, 255, 255);
    this.doc.setLineWidth(0.5);
    this.doc.roundedRect(iconX + 0.5, contactY - 2.2, 2, 3, 0.4, 0.4, "S");
    this.doc.line(iconX + 0.9, contactY - 1.8, iconX + 2.1, contactY - 1.8);
    this.doc.circle(iconX + 1.5, contactY + 0.4, 0.15, "F");
    this.doc.setFont("helvetica", "normal");
    this.doc.setFontSize(10);
    this.doc.setTextColor(255, 255, 255);
    this.doc.text(this.tutor.phone || "N/A", iconX + 5.5, contactY);

    // Email icon
    const emailY = contactY + 7;
    this.doc.setDrawColor(255, 255, 255);
    this.doc.setFillColor(255, 255, 255);
    this.doc.setLineWidth(0.5);
    this.doc.rect(iconX + 0.5, emailY - 1.8, 2.5, 1.8, "S");
    this.doc.line(iconX + 0.5, emailY - 1.8, iconX + 1.75, emailY - 0.5);
    this.doc.line(iconX + 3, emailY - 1.8, iconX + 1.75, emailY - 0.5);
    this.doc.setFont("helvetica", "normal");
    this.doc.setFontSize(10);
    this.doc.setTextColor(255, 255, 255);
    this.doc.text(this.tutor.email || "N/A", iconX + 5.5, emailY);

    // Address icon
    const addressY = emailY + 7;
    this.doc.setDrawColor(255, 255, 255);
    this.doc.setFillColor(255, 255, 255);
    this.doc.setLineWidth(0.5);
    this.doc.circle(iconX + 1.5, addressY - 1.5, 0.8, "S");
    this.doc.circle(iconX + 1.5, addressY - 1.5, 0.3, "F");
    this.doc.line(iconX + 1.5, addressY - 0.7, iconX + 1.5, addressY + 0.2);
    this.doc.setFont("helvetica", "normal");
    this.doc.setFontSize(10);
    this.doc.setTextColor(255, 255, 255);
    const addressText =
      [this.tutor.area, this.tutor.thana, this.tutor.district]
        .filter(Boolean)
        .join(", ") || "Address N/A";
    const addressLines = this.doc.splitTextToSize(addressText, 125);
    this.doc.text(addressLines, iconX + 5.5, addressY);

    this.y = 70;
  }

  sectionHeader(title) {
    this.ensureSpace(24);
    this.doc.setFillColor(...this.primary);
    this.doc.roundedRect(this.margin, this.y, 180, 12, 3, 3, "F");
    this.doc.setTextColor(255, 255, 255);
    this.doc.setFont("helvetica", "bold");
    this.doc.setFontSize(12);
    this.doc.text(title, this.margin + 6, this.y + 8);
    this.y += 20;
  }

  drawInfoCard(items) {
    // Calculate dynamic card height based on content
    let totalHeight = 10;
    items.forEach((item) => {
      if (item.value && item.value !== "N/A") {
        const valueLines = this.doc.splitTextToSize(item.value, 120);
        totalHeight += valueLines.length * 5 + 3;
      }
    });

    this.ensureSpace(totalHeight);

    this.doc.setDrawColor(209, 213, 219);
    this.doc.setFillColor(...this.cardFill);
    this.doc.setLineWidth(0.4);
    this.doc.roundedRect(this.margin, this.y, 174, totalHeight, 3, 3, "FD");

    let itemY = this.y + 8;
    items.forEach((item) => {
      if (item.value && item.value !== "N/A") {
        // Label
        this.doc.setFont("helvetica", "bold");
        this.doc.setFontSize(9);
        this.doc.setTextColor(...this.secondary);
        this.doc.text(`${item.label}:`, this.margin + 6, itemY);

        // Value with proper spacing (increased from 45 to 60)
        this.doc.setFont("helvetica", "normal");
        this.doc.setFontSize(9);
        this.doc.setTextColor(...this.subtle);
        const valueLines = this.doc.splitTextToSize(item.value, 120);
        this.doc.text(valueLines, this.margin + 60, itemY);

        itemY += valueLines.length * 5 + 3;
      }
    });

    this.y += totalHeight + 6;
  }

  drawEducationCard(edu) {
    const title = edu.examination || "Degree";
    const subtitle = edu.institution || "Institution N/A";
    const pill = edu.gpa || edu.cgpa || "";

    const details = [
      edu.groupSubject ? `Group: ${edu.groupSubject}` : null,
      edu.medium ? `Medium: ${edu.medium}` : null,
      edu.curriculum ? `Curriculum: ${edu.curriculum}` : null,
      edu.board ? `Board: ${edu.board}` : null,
      edu.department ? `Department: ${edu.department}` : null,
      edu.year ? `Year: ${edu.year}` : null,
      edu.passingYear ? `Passing Year: ${edu.passingYear}` : null,
    ]
      .filter(Boolean)
      .join("   ");

    const detailLines = this.doc.splitTextToSize(details, 150);
    const blockHeight = 32 + detailLines.length * 5;
    this.ensureSpace(blockHeight + 10);

    this.doc.setDrawColor(209, 213, 219);
    this.doc.setFillColor(...this.cardFill);
    this.doc.setLineWidth(0.4);
    this.doc.roundedRect(this.margin + 6, this.y, 170, blockHeight, 4, 4, "FD");

    // Timeline decoration
    this.doc.setFillColor(...this.accent);
    this.doc.circle(this.margin, this.y + 10, 3, "F");
    this.doc.setDrawColor(209, 213, 219);
    this.doc.line(this.margin, this.y + 10, this.margin, this.y + blockHeight);
    this.doc.setFillColor(209, 213, 219);
    this.doc.circle(this.margin, this.y + blockHeight, 2, "F");

    // Title
    this.doc.setFont("helvetica", "bold");
    this.doc.setFontSize(11);
    this.doc.setTextColor(...this.primary);
    this.doc.text(title, this.margin + 14, this.y + 10);

    // Subtitle
    this.doc.setFont("helvetica", "normal");
    this.doc.setFontSize(10);
    this.doc.setTextColor(...this.secondary);
    this.doc.text(subtitle, this.margin + 14, this.y + 17);

    // GPA/CGPA pill
    if (pill) {
      this.doc.setFillColor(...this.accent);
      this.doc.setTextColor(255, 255, 255);
      const pillWidth = this.doc.getTextWidth(pill) + 14;
      this.doc.roundedRect(
        this.margin + 174 - pillWidth - 6,
        this.y + 6,
        pillWidth,
        10,
        5,
        5,
        "F",
      );
      this.doc.setFont("helvetica", "bold");
      this.doc.setFontSize(10);
      this.doc.text(
        pill,
        this.margin + 174 - pillWidth - 6 + pillWidth / 2,
        this.y + 13,
        {
          align: "center",
        },
      );
    }

    // Details
    if (details) {
      this.doc.setFont("helvetica", "normal");
      this.doc.setFontSize(9);
      this.doc.setTextColor(...this.subtle);
      this.doc.text(detailLines, this.margin + 14, this.y + 28);
    }

    this.y += blockHeight + 10;
  }

  addFooter() {
    const totalPages = this.doc.internal.getNumberOfPages();
    for (let page = 1; page <= totalPages; page++) {
      this.doc.setPage(page);
      this.doc.setDrawColor(226, 232, 240);
      this.doc.setLineWidth(0.4);
      this.doc.line(this.margin, 285, 210 - this.margin, 285);
      this.doc.setFont("helvetica", "normal");
      this.doc.setFontSize(8);
      this.doc.setTextColor(...this.subtle);
      this.doc.text(`Page ${page} of ${totalPages}`, this.margin, 292);
      this.doc.text(
        `Generated on ${new Date().toLocaleString()}`,
        210 - this.margin,
        292,
        { align: "right" },
      );
    }
  }

  async generate() {
    // Fetch profile image and app logo in parallel
    const [profileImgBase64, logoBase64, qrBase64] = await Promise.all([
      this.tutor.profileImage?.url
        ? this.fetchBase64(this.tutor.profileImage.url)
        : Promise.resolve(null),
      this.fetchBase64(appLogo),
      this.fetchBase64(qrImg),
    ]);

    this.profileImage = profileImgBase64;
    this.headerLogo = logoBase64;

    // Draw header (contains name, gender, hired status, phone, email, address)
    this.drawProfileHeader();

    // Teaching Experience (Moved Up)
    if (this.tutor.experience) {
      this.sectionHeader("Teaching Experience");

      const cardWidth = 174;
      const textPadding = 6;
      const textMaxWidth = cardWidth - textPadding * 2;

      this.doc.setFont("helvetica", "normal");
      this.doc.setFontSize(9);

      const paragraphs = this.tutor.experience.split("\n");

      const finalLines = [];
      paragraphs.forEach((paragraph) => {
        const wrappedLines = this.doc.splitTextToSize(paragraph, textMaxWidth);
        finalLines.push(...wrappedLines);
      });

      const experienceHeight = finalLines.length * 5 + 12;
      this.ensureSpace(experienceHeight);

      this.doc.setDrawColor(209, 213, 219);
      this.doc.setFillColor(...this.cardFill);
      this.doc.setLineWidth(0.4);
      this.doc.roundedRect(
        this.margin,
        this.y,
        cardWidth,
        experienceHeight,
        3,
        3,
        "FD",
      );

      this.doc.setTextColor(...this.subtle);
      this.doc.text(finalLines, this.margin + textPadding, this.y + 8);

      this.y += experienceHeight + 6;
    }

    // Educational Background
    this.sectionHeader("Educational Background");
    if (this.tutor.educationSections?.length) {
      const validEducationSections = this.tutor.educationSections.filter(
        (edu) =>
          edu.institution || edu.gpa || edu.cgpa || edu.passingYear || edu.year,
      );

      if (validEducationSections.length > 0) {
        validEducationSections.forEach((edu) => this.drawEducationCard(edu));
      } else {
        this.drawInfoCard([
          { label: "Education", value: "No education information provided" },
        ]);
      }
    } else {
      this.drawInfoCard([
        { label: "Education", value: "No education information provided" },
      ]);
    }

    // Skills & Subjects
    this.sectionHeader("Skills & Subjects");
    const skillsItems = [
      {
        label: "Preferred Subjects",
        value: this.tutor.preferredSubjects?.length
          ? this.tutor.preferredSubjects.join(", ")
          : "N/A",
      },
    ];

    if (this.tutor.specialSkills) {
      const skillsArray = Array.isArray(this.tutor.specialSkills)
        ? this.tutor.specialSkills
        : [this.tutor.specialSkills];

      skillsArray
        .filter((skill) => skill?.type)
        .forEach((skill, idx) => {
          skillsItems.push({
            label: idx === 0 ? "Special Skill" : `Special Skill ${idx + 1}`,
            value: `${skill.type}: ${skill.value || "N/A"}`,
          });
        });
    }
    this.drawInfoCard(skillsItems);

    // Location & Teaching Areas
    const locationItems = [];

    const fullAddress = [
      this.tutor.area,
      this.tutor.thana,
      this.tutor.district,
      this.tutor.division,
    ]
      .filter(Boolean)
      .join(", ");

    if (fullAddress) {
      locationItems.push({
        label: "Current Location",
        value: fullAddress,
      });
    }

    if (this.tutor.suitableArea && this.tutor.suitableArea.length > 0) {
      locationItems.push({
        label: "Preferred Teaching Areas",
        value: this.tutor.suitableArea.join(", "),
      });
    }

    if (locationItems.length > 0) {
      this.sectionHeader("Location & Teaching Areas");
      this.drawInfoCard(locationItems);
    }

    // QR Code Section (Added at the end, if space available)
    if (qrBase64) {
      const qrSize = 35;
      const qrSpaceNeeded = qrSize + 20;

      // Check if we need a new page for QR code
      this.ensureSpace(qrSpaceNeeded);

      // Draw QR Code Card
      this.doc.setDrawColor(209, 213, 219);
      this.doc.setFillColor(...this.cardFill);
      this.doc.setLineWidth(0.4);
      this.doc.roundedRect(this.margin, this.y, 174, qrSize + 15, 3, 3, "FD");

      // Center QR code horizontally
      const qrX = 105 - qrSize / 2;
      this.doc.addImage(qrBase64, "JPEG", qrX, this.y + 5, qrSize, qrSize);

      // Professional text below QR code
      this.doc.setFont("helvetica", "bold");
      this.doc.setFontSize(9);
      this.doc.setTextColor(...this.primary);
      this.doc.text("Scan for More Information", 105, this.y + qrSize + 12, {
        align: "center",
      });

      this.y += qrSize + 20;
    }

    // Add footer
    this.addFooter();

    // Download
    this.doc.save(`Tutor_Profile_${this.tutor.name.replace(/\s+/g, "_")}.pdf`);
  }
}
