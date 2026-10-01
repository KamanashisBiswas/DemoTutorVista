// Comprehensive data store for Tutor Profile Pages
export const TUTOR_PROFILES = {
  "tutor-2": {
    id: "tutor-2",
    tutorId: "TB-NSU-0941",
    tutorCode: "TB-84920",
    name: "Salman Muktadir",
    gender: "Male",
    image: "/images/tutors/tutor-2.jpg",
    headline: "Mathematics & Economics Specialist (English & Bangla Medium)",
    memberSince: "Member since Jan 2022",
    badgeTier: "TutorBridge Gold Verified",
    rankBadge: "Top 1% Educator",
    districtName: "Dhaka",
    areaDisplay: "Dhaka Tutors",
    subjectDisplay: "Mathematics & Economics",
    institution: "North South University (NSU)",
    institutionDetail: "BBA in Finance & Economics (CGPA 3.82)",
    college: "Notre Dame College, Dhaka (HSC GPA 5.00)",
    rating: "4.95",
    reviewsCount: 52,
    experience: "4+ Years",
    studentsCount: "38+ Students",
    studentSuccess: "85% A/A* Board Grades",
    responseTime: "< 15 min",
    expectedSalary: "৳10,000",
    salaryUnit: "/ month",
    salaryRange: "Range: ৳8k - ৳12k",
    philosophy:
      "I believe that mathematics and economics are fundamentally about intuitive problem solving rather than rote formula memorization. Over the past four years, I have mentored dozens of students across both English Medium (Cambridge/Edexcel) and English Version/Bangla Medium curricula. My framework centers on breaking complex syllabus milestones into digestible real-world logic models.",
    pedagogyCards: [
      {
        icon: "quiz",
        title: "Weekly Assessments",
        description:
          "Timely diagnostic mock tests mirroring past board exam patterns with granular marking rubrics.",
      },
      {
        icon: "query_stats",
        title: "Guardian Reports",
        description:
          "Bi-weekly WhatsApp progress updates and personalized analytics covering topic readiness and homework accuracy.",
      },
      {
        icon: "draw",
        title: "Hybrid Tools",
        description:
          "Digital stylus tablet notes & PDF annotations shared instantly after every physical or live online class.",
      },
    ],
    levelBadge: "Class 6 to College / A-Level",
    primaryFocusSubjects: [
      { name: "Higher Mathematics", highlighted: true },
      { name: "General Mathematics", highlighted: true },
      { name: "Economics (O & A Levels)", highlighted: true },
      { name: "Business Studies & Accounting", highlighted: false },
      { name: "ICT & Computer Science", highlighted: false },
      { name: "English Language", highlighted: false },
    ],
    curriculaCovered: [
      "Cambridge International (IGCSE, O-Level, AS & A-Level)",
      "Pearson Edexcel (Edexcel O-Level & IAL)",
      "National Curriculum English Version (NCTB)",
      "Bangla Medium (Class 9-10 SSC & Class 11-12 HSC)",
    ],
    teachingMediums: [
      {
        icon: "home_pin",
        text: "Home Tutoring (Student's residence in Dhaka South & West)",
      },
      {
        icon: "laptop_chromebook",
        text: "1-on-1 Interactive Online Class (Zoom / Google Meet HD)",
      },
      {
        icon: "groups",
        text: "Small Batches / Pair Tuition (Max 2-3 classmates)",
      },
      {
        icon: "schedule",
        text: "Flexible slots (3 to 4 days/week, 1.5 - 2 hrs/session)",
      },
    ],
    educationTimeline: [
      {
        institution: "North South University (NSU)",
        period: "2020 – 2024 (Graduated)",
        degree:
          "Bachelor of Business Administration (BBA) — Double Major in Finance & Economics",
        description:
          "Graduated with Magna Cum Laude honors (CGPA 3.82/4.00). Former Academic Teaching Assistant for Intro to Econometrics.",
        dotColor: "bg-primary",
      },
      {
        institution: "Notre Dame College, Dhaka",
        period: "2017 – 2019",
        degree: "Higher Secondary Certificate (HSC) — Science Group",
        description:
          "Obtained Golden GPA 5.00 with top percentile marks in Higher Mathematics, Physics, and ICT.",
        dotColor: "bg-tertiary",
      },
      {
        institution: "St. Gregory's High School & College",
        period: "Passing Year: 2017",
        degree: "Secondary School Certificate (SSC) — Science Group",
        description:
          "Achieved Golden GPA 5.00. National Mathematics Olympiad divisional runner-up.",
        dotColor: "bg-outline-variant",
      },
    ],
    studentAchievements: [
      {
        badge: "O & A Levels",
        badgeStyle: "bg-primary text-on-primary",
        count: "16 Students",
        countColor: "text-primary",
        title: "Cambridge & Edexcel Board Distinctions",
        description:
          "14 out of 16 students scored A or A* in O-Level Mathematics and Economics between 2022 and 2024.",
        tag: "Scholastica, Sunnydale, Mastermind students",
      },
      {
        badge: "SSC & HSC (NCTB)",
        badgeStyle: "bg-secondary text-on-secondary",
        count: "22 Students",
        countColor: "text-secondary",
        title: "Board Exam Golden A+ Results",
        description:
          "Over 90% achieved A+ in Higher Mathematics. 8 alumni successfully secured admissions into IBA-DU, NSU, and BUP.",
        tag: "Viqarunnisa, DRMC, St. Joseph students",
      },
    ],
    guardianReviews: [
      {
        initials: "RA",
        name: "Mrs. Rehana Akhter",
        designation: "Guardian of Grade 10 (O-Level, Scholastica) • Dhanmondi 8/A",
        stars: 5,
        review:
          '"Salman sir taught my son Cambridge O-Level Mathematics and Economics for 8 months. Before his guidance, my son had weak fundamentals in calculus and algebra. Salman\'s patience, punctuality, and regular weekend mock tests made a huge turnaround. He achieved an A* in both subjects this January. We couldn\'t be more thankful."',
        verifiedTag: "Verified Tuition Completed • Reviewed 3 weeks ago",
      },
      {
        initials: "EH",
        name: "Engr. Tariqul Islam",
        designation: "Parent of HSC 2024 Candidate • Lalmatia Block D",
        stars: 5,
        review:
          '"Extremely disciplined tutor. Never missed a scheduled day without prior notice. His handwritten formula sheets and step-by-step problem sets for Higher Math 1st and 2nd papers gave my daughter immense confidence. She secured GPA 5.00 with 96 marks in Math."',
        verifiedTag: "Verified Tuition Completed • Reviewed Nov 2024",
      },
    ],
    teachingHubs: [
      "Dhanmondi (All Roads)",
      "Lalmatia",
      "Kalabagan",
      "Mohammadpur",
      "Panthapath",
      "Green Road",
    ],
    scheduleSlots: [
      { day: "Sat", slot: "AM", active: true },
      { day: "Sun", slot: "PM", active: true },
      { day: "Mon", slot: "PM", active: true },
      { day: "Tue", slot: "PM", active: true },
      { day: "Wed", slot: "PM", active: true },
      { day: "Thu", slot: "Full", active: false },
      { day: "Fri", slot: "Off", active: false },
    ],
    openSlotsCount: "4 Evenings Open",
  },

  "tutor-1": {
    id: "tutor-1",
    tutorId: "TB-BUET-0418",
    tutorCode: "TB-73210",
    name: "Syeda Tasnim",
    gender: "Female",
    image: "/images/tutors/tutor-1.jpg",
    headline: "Physics & Higher Mathematics Specialist (English & Bangla Medium)",
    memberSince: "Member since Mar 2021",
    badgeTier: "TutorBridge Gold Verified",
    rankBadge: "Top 1% Educator",
    districtName: "Dhaka",
    areaDisplay: "Dhaka Tutors",
    subjectDisplay: "Physics & Higher Mathematics",
    institution: "Bangladesh University of Engineering and Technology (BUET)",
    institutionDetail: "B.Sc in Electrical & Electronic Engineering (EEE)",
    college: "Viqarunnisa Noon College, Dhaka (HSC GPA 5.00)",
    rating: "4.95",
    reviewsCount: 38,
    experience: "5+ Years",
    studentsCount: "32+ Students",
    studentSuccess: "92% A/A* Board Grades",
    responseTime: "< 10 min",
    expectedSalary: "৳12,000",
    salaryUnit: "/ month",
    salaryRange: "Range: ৳10k - ৳15k",
    philosophy:
      "Physics and mathematics are best understood through intuitive conceptual clarity, real-world analogies, and rigorous structured practice rather than memorization. I help students build bulletproof fundamentals for board exams and competitive university admissions.",
    pedagogyCards: [
      {
        icon: "quiz",
        title: "Weekly Assessments",
        description:
          "Rigorous chapter-wise tests following standard Cambridge and National Curriculum question patterns.",
      },
      {
        icon: "query_stats",
        title: "Guardian Reports",
        description:
          "Regular performance debriefs, detailed error logs, and personalized improvement roadmaps.",
      },
      {
        icon: "draw",
        title: "Hybrid Tools",
        description:
          "High-definition visual diagrams, simulated physical experiments, and curated formula cheat sheets.",
      },
    ],
    levelBadge: "Class 8 to College / O & A-Level",
    primaryFocusSubjects: [
      { name: "Physics", highlighted: true },
      { name: "Higher Math", highlighted: true },
      { name: "ICT", highlighted: true },
      { name: "General Science", highlighted: false },
      { name: "Calculus & Mechanics", highlighted: false },
    ],
    curriculaCovered: [
      "Cambridge International (IGCSE, O-Level, AS & A-Level)",
      "Pearson Edexcel (Edexcel O-Level & IAL)",
      "National Curriculum English Version (NCTB)",
      "Bangla Medium (Class 9-10 SSC & Class 11-12 HSC)",
    ],
    teachingMediums: [
      {
        icon: "home_pin",
        text: "Home Tutoring (Dhanmondi, Lalmatia, Kalabagan & surrounding areas)",
      },
      {
        icon: "laptop_chromebook",
        text: "1-on-1 Interactive Online Class (Zoom / Google Meet HD)",
      },
      {
        icon: "groups",
        text: "Small Batches / Pair Tuition (Max 2-3 classmates)",
      },
      {
        icon: "schedule",
        text: "Flexible slots (3 to 4 days/week, 1.5 - 2 hrs/session)",
      },
    ],
    educationTimeline: [
      {
        institution: "BUET",
        period: "2019 – 2024 (Graduated)",
        degree: "B.Sc in Electrical & Electronic Engineering (EEE)",
        description:
          "Top 100 merit rank in BUET admission test. Teaching assistant for fundamental electromagnetics.",
        dotColor: "bg-primary",
      },
      {
        institution: "Viqarunnisa Noon College, Dhaka",
        period: "2017 – 2019",
        degree: "Higher Secondary Certificate (HSC) — Science Group",
        description: "Golden GPA 5.00 with top percentile in Physics and Math.",
        dotColor: "bg-tertiary",
      },
    ],
    studentAchievements: [
      {
        badge: "O & A Levels",
        badgeStyle: "bg-primary text-on-primary",
        count: "18 Students",
        countColor: "text-primary",
        title: "Cambridge & Edexcel Board Distinctions",
        description:
          "16 out of 18 students scored straight A* in Physics and Pure Mathematics.",
        tag: "Sunnydale, Scholastica, SFX Greenherald students",
      },
      {
        badge: "SSC & HSC (NCTB)",
        badgeStyle: "bg-secondary text-on-secondary",
        count: "14 Students",
        countColor: "text-secondary",
        title: "Board Exam Golden A+ Results",
        description:
          "100% achieved A+ in Higher Mathematics and Physics in HSC Board examinations.",
        tag: "Holy Cross, Viqarunnisa, Notre Dame students",
      },
    ],
    guardianReviews: [
      {
        initials: "SB",
        name: "Dr. Shahana Begum",
        designation: "Mother of A-Level Candidate (Scholastica)",
        stars: 5,
        review:
          '"Tasnim ma\'am is an exceptional teacher. Her explanations for electromagnetic theory and advanced mechanics made learning enjoyable for my daughter."',
        verifiedTag: "Verified Tuition Completed • Reviewed 2 weeks ago",
      },
    ],
    teachingHubs: [
      "Dhanmondi (All Roads)",
      "Lalmatia",
      "Kalabagan",
      "Sobhanbag",
      "Elephant Road",
    ],
    scheduleSlots: [
      { day: "Sat", slot: "AM", active: true },
      { day: "Sun", slot: "PM", active: true },
      { day: "Mon", slot: "PM", active: true },
      { day: "Tue", slot: "PM", active: true },
      { day: "Wed", slot: "Full", active: false },
      { day: "Thu", slot: "Full", active: false },
      { day: "Fri", slot: "Off", active: false },
    ],
    openSlotsCount: "3 Evenings Open",
  },

  "tutor-5": {
    id: "tutor-5",
    tutorId: "TB-DMC-0812",
    tutorCode: "TB-62981",
    name: "Md. Mahfuzur Rahman",
    gender: "Male",
    image: "/images/tutors/tutor-5.jpg",
    headline: "Biology, Zoology & Medical Admission Specialist",
    memberSince: "Member since Aug 2021",
    badgeTier: "TutorBridge Gold Verified",
    rankBadge: "Top 1% Educator",
    districtName: "Dhaka",
    areaDisplay: "Dhaka Tutors",
    subjectDisplay: "Biology & Medical Prep",
    institution: "Dhaka Medical College (DMC)",
    institutionDetail: "MBBS 4th Year (Clinical Phase)",
    college: "Dhaka College (HSC GPA 5.00)",
    rating: "4.96",
    reviewsCount: 42,
    experience: "4+ Years",
    studentsCount: "28+ Students",
    studentSuccess: "90% Medical Merit & A+ Board Grades",
    responseTime: "< 15 min",
    expectedSalary: "৳11,000",
    salaryUnit: "/ month",
    salaryRange: "Range: ৳9k - ৳14k",
    philosophy:
      "Biology shouldn't be about memorizing thousands of lines; it's about understanding how life functions, using mnemonics, structured diagrams, and conceptual correlations. I mentor students targeting top board grades and medical entrance success.",
    pedagogyCards: [
      {
        icon: "quiz",
        title: "Medical Diagnostic Quizzes",
        description:
          "Fast-paced MCQs and short-answer diagnostic tests following Medical Admission Board trends.",
      },
      {
        icon: "query_stats",
        title: "Guardian Reports",
        description:
          "Bi-weekly progress audits focusing on diagram reproduction and syllabus mastery.",
      },
      {
        icon: "draw",
        title: "High-Yield Diagramming",
        description:
          "Interactive digital whiteboard sessions teaching high-scoring biological illustrations.",
      },
    ],
    levelBadge: "Class 9 to Medical Admission",
    primaryFocusSubjects: [
      { name: "Biology", highlighted: true },
      { name: "Zoology", highlighted: true },
      { name: "Medical Prep", highlighted: true },
      { name: "Chemistry", highlighted: false },
      { name: "Genetics", highlighted: false },
    ],
    curriculaCovered: [
      "Bangla Medium (Class 9-10 SSC & Class 11-12 HSC)",
      "National Curriculum English Version (NCTB)",
      "Medical College Admission Preparation",
      "Cambridge International (O-Level Biology)",
    ],
    teachingMediums: [
      {
        icon: "home_pin",
        text: "Home Tutoring (Segunbagicha, Shantinagar, Motijheel & Baily Road)",
      },
      {
        icon: "laptop_chromebook",
        text: "1-on-1 Interactive Online Class (Zoom / Google Meet HD)",
      },
      {
        icon: "groups",
        text: "Small Batches / Medical Aspirant Batches",
      },
      {
        icon: "schedule",
        text: "3 Days/week (1.5 - 2 hours per session)",
      },
    ],
    educationTimeline: [
      {
        institution: "Dhaka Medical College (DMC)",
        period: "2021 – Present (MBBS 4th Year)",
        degree: "Bachelor of Medicine, Bachelor of Surgery (MBBS)",
        description:
          "Secured 84th merit position in national medical admission examination.",
        dotColor: "bg-primary",
      },
      {
        institution: "Dhaka College",
        period: "2018 – 2020",
        degree: "Higher Secondary Certificate (HSC) — Science Group",
        description: "Golden GPA 5.00 with 98 marks in Biology.",
        dotColor: "bg-tertiary",
      },
    ],
    studentAchievements: [
      {
        badge: "Medical Admission",
        badgeStyle: "bg-primary text-on-primary",
        count: "12 Students",
        countColor: "text-primary",
        title: "Government Medical College Admissions",
        description:
          "8 students successfully secured seats in DMC, SSMC, and SBMC in 2023-2024.",
        tag: "Notre Dame, Dhaka College, Holy Cross alumni",
      },
      {
        badge: "SSC & HSC",
        badgeStyle: "bg-secondary text-on-secondary",
        count: "16 Students",
        countColor: "text-secondary",
        title: "Board Exam Golden A+ in Biology",
        description:
          "15 out of 16 students scored A+ in both papers with over 90% aggregate.",
        tag: "Viqarunnisa, Ideal, Residential Model students",
      },
    ],
    guardianReviews: [
      {
        initials: "MH",
        name: "Mr. Mahbubul Haque",
        designation: "Father of HSC 2024 Candidate • Baily Road",
        stars: 5,
        review:
          '"Mahfuzur\'s structured revision techniques and diagram drills completely transformed my son\'s confidence in Biology. Highly recommended!"',
        verifiedTag: "Verified Tuition Completed • Reviewed 1 month ago",
      },
    ],
    teachingHubs: [
      "Segunbagicha",
      "Shantinagar",
      "Motijheel",
      "Baily Road",
      "Kakrail",
    ],
    scheduleSlots: [
      { day: "Sat", slot: "PM", active: true },
      { day: "Sun", slot: "PM", active: true },
      { day: "Mon", slot: "Off", active: false },
      { day: "Tue", slot: "PM", active: true },
      { day: "Wed", slot: "PM", active: true },
      { day: "Thu", slot: "Full", active: false },
      { day: "Fri", slot: "Off", active: false },
    ],
    openSlotsCount: "4 Evenings Open",
  },

  "tutor-8": {
    id: "tutor-8",
    tutorId: "TB-DU-0524",
    tutorCode: "TB-51829",
    name: "Anika Tabassum",
    gender: "Female",
    image: "/images/tutors/tutor-8.jpg",
    headline: "English Language, Literature & IELTS 8.5 Specialist",
    memberSince: "Member since May 2022",
    badgeTier: "TutorBridge Gold Verified",
    rankBadge: "Top 1% Educator",
    districtName: "Dhaka",
    areaDisplay: "Dhaka Tutors",
    subjectDisplay: "English Language & Literature",
    institution: "University of Dhaka (DU)",
    institutionDetail: "B.A. & M.A. in English Literature",
    college: "Holy Cross College, Dhaka (HSC GPA 5.00)",
    rating: "4.97",
    reviewsCount: 48,
    experience: "4+ Years",
    studentsCount: "35+ Students",
    studentSuccess: "IELTS 8.0+ & Straight A/A* Grades",
    responseTime: "< 15 min",
    expectedSalary: "৳10,000",
    salaryUnit: "/ month",
    salaryRange: "Range: ৳8k - ৳12k",
    philosophy:
      "Language mastery comes from confident oral expression, critical reading, and structured writing habits. I guide English medium and version students to develop native-level proficiency, analytical essay craftsmanship, and top board distinctions.",
    pedagogyCards: [
      {
        icon: "quiz",
        title: "Weekly Essay Critiques",
        description:
          "Line-by-line grammar, vocabulary, and thesis coherence feedback on analytical essays.",
      },
      {
        icon: "query_stats",
        title: "Guardian Reports",
        description:
          "Progress tracking on lexical resource, reading comprehension speed, and oral fluency.",
      },
      {
        icon: "draw",
        title: "Vocabulary & Reading Modules",
        description:
          "Curated classic & contemporary literary texts with interactive annotation templates.",
      },
    ],
    levelBadge: "Class 6 to A-Level / IELTS",
    primaryFocusSubjects: [
      { name: "English Lang", highlighted: true },
      { name: "IELTS 8.5", highlighted: true },
      { name: "Literature", highlighted: true },
      { name: "Creative Writing", highlighted: false },
      { name: "Spoken Fluency", highlighted: false },
    ],
    curriculaCovered: [
      "Cambridge International (IGCSE & O-Level English)",
      "Pearson Edexcel (Edexcel English Language & Literature)",
      "IELTS Academic & General Training",
      "National Curriculum English Version (NCTB)",
    ],
    teachingMediums: [
      {
        icon: "home_pin",
        text: "Home Tutoring (Mohammadpur, Dhanmondi & Shyamoli)",
      },
      {
        icon: "laptop_chromebook",
        text: "1-on-1 Interactive Online Class (Zoom / Google Meet HD)",
      },
      {
        icon: "groups",
        text: "Small Speaking & Writing Cohorts (Max 2-3 students)",
      },
      {
        icon: "schedule",
        text: "3-4 Days/week (1.5 hours per session)",
      },
    ],
    educationTimeline: [
      {
        institution: "University of Dhaka (DU)",
        period: "2019 – 2023 (Graduated)",
        degree: "B.A. (Hons) in English Literature",
        description:
          "Graduated First Class. Official IELTS Academic Score: 8.5 (Reading 9.0, Listening 9.0).",
        dotColor: "bg-primary",
      },
      {
        institution: "Holy Cross College, Dhaka",
        period: "2017 – 2019",
        degree: "Higher Secondary Certificate (HSC) — Humanities",
        description: "Golden GPA 5.00 with highest marks in English.",
        dotColor: "bg-tertiary",
      },
    ],
    studentAchievements: [
      {
        badge: "O & A Levels",
        badgeStyle: "bg-primary text-on-primary",
        count: "20 Students",
        countColor: "text-primary",
        title: "Cambridge & Edexcel Board A* Distinctions",
        description:
          "18 students secured A and A* in English Language and Literature papers.",
        tag: "Mastermind, Scholastica, Maple Leaf students",
      },
      {
        badge: "IELTS & Higher Study",
        badgeStyle: "bg-secondary text-on-secondary",
        count: "15 Students",
        countColor: "text-secondary",
        title: "Target Band 7.5 to 8.5 Attained",
        description:
          "Over 90% of IELTS examinees achieved their target band score in first attempt.",
        tag: "Undergraduate & Graduate scholarship recipients",
      },
    ],
    guardianReviews: [
      {
        initials: "TA",
        name: "Tanzeela Ahmed",
        designation: "Guardian of Grade 9 (Cambridge O-Level)",
        stars: 5,
        review:
          '"Anika miss helped my daughter overcome her fear of essay writing and vocabulary. Her score jumped from a C to a solid A in 6 months."',
        verifiedTag: "Verified Tuition Completed • Reviewed 2 weeks ago",
      },
    ],
    teachingHubs: [
      "Mohammadpur (Town Hall, Ring Road)",
      "Dhanmondi",
      "Shyamoli",
      "Lalmatia",
    ],
    scheduleSlots: [
      { day: "Sat", slot: "AM", active: true },
      { day: "Sun", slot: "PM", active: true },
      { day: "Mon", slot: "PM", active: true },
      { day: "Tue", slot: "PM", active: true },
      { day: "Wed", slot: "PM", active: true },
      { day: "Thu", slot: "Off", active: false },
      { day: "Fri", slot: "Off", active: false },
    ],
    openSlotsCount: "5 Slots Open",
  },
};

// Similar tutors recommendations
export const SIMILAR_RECOMMENDED_TUTORS = [
  {
    id: "tutor-1",
    name: "Syeda Tasnim",
    image: "/images/tutors/tutor-1.jpg",
    institution: "BUET • B.Sc in EEE",
    rating: "4.95",
    subjects: ["Physics", "Higher Math", "ICT"],
    description:
      "Specialized in English Medium O/A Level Physics & NCTB College Section. 32+ students mentored with outstanding grades.",
    area: "Dhanmondi, Lalmatia",
    salary: "৳10,000 - ৳15,000/mo",
  },
  {
    id: "tutor-5",
    name: "Md. Mahfuzur Rahman",
    image: "/images/tutors/tutor-5.jpg",
    institution: "DMC • MBBS 4th Year",
    rating: "4.96",
    subjects: ["Biology", "Zoology", "Medical Prep"],
    description:
      "Top 100 Medical Merit holder. Focuses on memory retention techniques, biology diagram clarity, and competitive exams.",
    area: "Segunbagicha, Motijheel",
    salary: "৳9,000 - ৳14,000/mo",
  },
  {
    id: "tutor-8",
    name: "Anika Tabassum",
    image: "/images/tutors/tutor-8.jpg",
    institution: "DU • English Literature",
    rating: "4.97",
    subjects: ["English Lang", "IELTS 8.5", "Literature"],
    description:
      "Specialist in spoken fluency, creative writing, and Edexcel English. 35+ successful students across top English Medium schools.",
    area: "Mohammadpur, Dhanmondi",
    salary: "৳8,000 - ৳12,000/mo",
  },
];

// Helper to get tutor profile with fallback to Salman Muktadir (tutor-2)
export const getTutorProfile = (id) => {
  if (!id) return TUTOR_PROFILES["tutor-2"];
  if (TUTOR_PROFILES[id]) return TUTOR_PROFILES[id];

  // Try matching numeric or name
  const matchedKey = Object.keys(TUTOR_PROFILES).find((k) =>
    id.toLowerCase().includes(k.toLowerCase())
  );
  if (matchedKey) return TUTOR_PROFILES[matchedKey];

  return TUTOR_PROFILES["tutor-2"];
};
