import {
  Document,
  Paragraph,
  Table,
  TableRow,
  TableCell,
  TextRun,
  AlignmentType,
  Packer,
  Footer,
} from "docx";
import { saveAs } from "file-saver";

export class TutorDocxGenerator {
  constructor(tutor) {
    this.tutor = tutor;
    this.primaryColor = "2C5282";
    this.secondaryColor = "718096";
    this.lightGray = "EDF2F7";
  }

  createHeadingStyles() {
    return [
      {
        id: "Heading1",
        name: "Heading 1",
        basedOn: "Normal",
        next: "Normal",
        run: { size: 30, bold: true, color: this.primaryColor },
        paragraph: { spacing: { after: 200 } },
      },
      {
        id: "Heading2",
        name: "Heading 2",
        basedOn: "Normal",
        next: "Normal",
        run: { size: 24, bold: true, color: "1A202C" },
        paragraph: { spacing: { before: 200, after: 120 } },
      },
    ];
  }

  createDetailRow(label, value) {
    return new TableRow({
      children: [
        new TableCell({
          children: [
            new Paragraph({
              children: [new TextRun({ text: label, bold: true })],
            }),
          ],
          shading: { fill: this.lightGray },
          margins: { top: 80, bottom: 80, left: 120, right: 120 },
        }),
        new TableCell({
          children: [new Paragraph(String(value || "N/A"))],
          margins: { top: 80, bottom: 80, left: 120, right: 120 },
        }),
      ],
    });
  }

  createEducationContent() {
    const educationContent = [];

    if (this.tutor.educationSections?.length) {
      const validEducationSections = this.tutor.educationSections.filter(
        (edu) =>
          edu.institution || edu.gpa || edu.cgpa || edu.passingYear || edu.year
      );

      if (validEducationSections.length > 0) {
        validEducationSections.forEach((edu) => {
          educationContent.push(
            new Paragraph({
              text: edu.examination || "Degree",
              style: "Heading2",
            })
          );
          const details = [
            `Institution: ${edu.institution || "N/A"}`,
            `Year: ${edu.passingYear || edu.year || "N/A"}`,
            edu.medium ? `Medium: ${edu.medium}` : null,
            edu.department ? `Dept: ${edu.department}` : null,
            edu.groupSubject ? `Group: ${edu.groupSubject}` : null,
            edu.board ? `Board: ${edu.board}` : null,
            edu.gpa ? `GPA: ${edu.gpa}` : null,
            edu.cgpa ? `CGPA: ${edu.cgpa}` : null,
          ]
            .filter(Boolean)
            .join(" | ");
          educationContent.push(
            new Paragraph({
              children: [
                new TextRun({ text: details, color: this.secondaryColor }),
              ],
            })
          );
        });
      } else {
        educationContent.push(
          new Paragraph({
            text: "No education information provided",
            color: this.secondaryColor,
          })
        );
      }
    } else {
      educationContent.push(
        new Paragraph({
          text: "No education information provided",
          color: this.secondaryColor,
        })
      );
    }

    return educationContent;
  }

  createSkillsRows() {
    const skillsRows = [
      this.createDetailRow(
        "Preferred Subjects",
        this.tutor.preferredSubjects?.length
          ? this.tutor.preferredSubjects.join(", ")
          : "N/A"
      ),
    ];

    if (this.tutor.specialSkills) {
      const skillsArray = Array.isArray(this.tutor.specialSkills)
        ? this.tutor.specialSkills
        : [this.tutor.specialSkills];
      skillsArray
        .filter((skill) => skill && skill.type)
        .forEach((skill, idx) => {
          skillsRows.push(
            this.createDetailRow(
              idx === 0 ? "Special Skill" : `Special Skill ${idx + 1}`,
              `${skill.type}: ${skill.value || "N/A"}`
            )
          );
        });
    }

    return skillsRows;
  }

  async generate() {
    const doc = new Document({
      styles: { paragraphStyles: this.createHeadingStyles() },
      sections: [
        {
          footers: {
            default: new Footer({
              children: [
                new Paragraph({
                  alignment: AlignmentType.CENTER,
                  children: [
                    new TextRun({
                      text: `Generated on ${new Date().toLocaleString()}`,
                      size: 18,
                      color: this.secondaryColor,
                      italics: true,
                    }),
                  ],
                }),
              ],
            }),
          },
          children: [
            // Header Table
            new Table({
              width: { size: 100, type: "pct" },
              rows: [
                new TableRow({
                  children: [
                    new TableCell({
                      children: [
                        new Paragraph({
                          children: [
                            new TextRun({
                              text: this.tutor.name,
                              size: 48,
                              bold: true,
                              color: this.primaryColor,
                            }),
                          ],
                        }),
                        new Paragraph({
                          children: [
                            new TextRun({
                              text: "Professional Tutor Profile",
                              size: 24,
                              color: this.secondaryColor,
                            }),
                          ],
                        }),
                      ],
                      shading: { fill: this.lightGray },
                      margins: { top: 240, bottom: 240, left: 240, right: 240 },
                    }),
                  ],
                }),
              ],
            }),

            // Personal Information
            new Paragraph({ text: "Personal Information", style: "Heading1" }),
            new Table({
              width: { size: 100, type: "pct" },
              rows: [
                this.createDetailRow("Phone", this.tutor.phone),
                this.createDetailRow("Email", this.tutor.email),
                this.createDetailRow("Gender", this.tutor.gender),
                this.createDetailRow(
                  "Hired Status",
                  this.tutor.isHired ? "Hired" : "Not Hired"
                ),
              ],
            }),

            // Educational Background
            new Paragraph({
              text: "Educational Background",
              style: "Heading1",
            }),
            ...this.createEducationContent(),

            // Skills & Subjects
            new Paragraph({ text: "Skills & Subjects", style: "Heading1" }),
            new Table({
              width: { size: 100, type: "pct" },
              rows: this.createSkillsRows(),
            }),

            // Address Information
            new Paragraph({ text: "Address Information", style: "Heading1" }),
            new Table({
              width: { size: 100, type: "pct" },
              rows: [
                this.createDetailRow("Area", this.tutor.area),
                this.createDetailRow("Thana", this.tutor.thana),
                this.createDetailRow("District", this.tutor.district),
                this.createDetailRow("Division", this.tutor.division),
              ],
            }),

            // Teaching Experience
            ...(this.tutor.experience
              ? [
                  new Paragraph({
                    text: "Teaching Experience",
                    style: "Heading1",
                  }),
                  new Paragraph(this.tutor.experience),
                ]
              : []),
          ],
        },
      ],
    });

    const blob = await Packer.toBlob(doc);
    saveAs(blob, `Tutor_Profile_${this.tutor.name.replace(/\s+/g, "_")}.docx`);
  }
}
