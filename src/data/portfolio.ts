const base = import.meta.env.BASE_URL

export const PERSON = {
  name: "Apur Apasna",
  role: "Software Developer | Backend & QA Engineer | REST APIs & Systems",
  college: "Stanley College of Engineering and Technology for Women, Hyderabad",
  degree: "B.E. in Computer Engineering",
  year: "B.E. Computer Engineering (2023 — 2027)",
  cgpa: "4.25",
  email: "apurapasnaa@gmail.com",
  phone: "+91 9441776664",
  githubUsername: import.meta.env.VITE_GITHUB_USERNAME ?? "Apur-Apasna05",
  resumePath: `${base}resume.pdf`,
  profileImage: `${base}apur-profile.jpg`,
  profileAlt:
    "Apur Apasna — Software Developer and Computer Engineering student at Stanley College of Engineering and Technology for Women",
  summary:
    "Computer Engineering student with experience in software testing, debugging, and backend development. Familiar with REST APIs, microservices, and troubleshooting, with a strong interest in solving technical problems, building robust backend architectures, and implementing reliable software integrations and test automation.",
}

export const HERO_TYPING = [
  "Backend Development",
  "Software Testing & QA",
  "REST APIs & Microservices",
  "Distributed Systems",
] as const

export const SOCIALS = [
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/apur-apasna",
    icon: "user" as const,
  },
  {
    label: "GitHub",
    href: `https://github.com/${PERSON.githubUsername}`,
    icon: "code" as const,
  },
  {
    label: "Swecha Code",
    href: "https://code.swecha.org/APASNA",
    icon: "link" as const,
  },
  {
    label: "Email",
    href: `mailto:${PERSON.email}`,
    icon: "mail" as const,
  },
]

export const STATS = [
  { label: "Projects", value: 10, suffix: "+" },
  { label: "Certifications", value: 4, suffix: "" },
  { label: "Internships", value: 2, suffix: "" },
  { label: "GitHub Contributions", value: 79, suffix: "" },
  { label: "LinkedIn Followers", value: 1.1, suffix: "k" },
] as const

export const SKILLS = [
  { name: "Java & Spring Boot", percent: 90 },
  { name: "REST APIs & FastAPI", percent: 88 },
  { name: "Software Testing & Cypress", percent: 92 },
  { name: "Data Structures & OOP", percent: 88 },
  { name: "SQL & Relational DBMS", percent: 86 },
  { name: "Python & Data Processing", percent: 85 },
  { name: "Computer Networks & OS", percent: 84 },
  { name: "Docker & Containerization", percent: 80 },
  { name: "Git, GitHub & CI/CD", percent: 88 },
  { name: "JUnit, Maven & Debugging", percent: 82 },
] as const

export const TOOLS = [
  {
    name: "Docker",
    desc: "Containerization platform for isolated application services, environments, and backend microservices deployment.",
    icon: "zap" as const,
  },
  {
    name: "Postman",
    desc: "API testing, automated endpoint validation, request lifecycle tracking, and backend integration workflows.",
    icon: "globe" as const,
  },
  {
    name: "Cypress",
    desc: "Automated end-to-end and regression testing framework for validating website features, user flows, and interface states.",
    icon: "activity" as const,
  },
  {
    name: "Git & GitHub",
    desc: "Distributed version control, branch management, collaborative code reviews, and CI/CD automation pipelines.",
    icon: "key" as const,
  },
  {
    name: "JUnit & Maven",
    desc: "Java build automation and unit testing framework for verifying backend application logic and regression safety.",
    icon: "lock" as const,
  },
  {
    name: "Linux",
    desc: "Operating system environment for backend server management, shell automation, process monitoring, and networking.",
    icon: "scan" as const,
  },
] as const

export const CURATED_PROJECTS = [
  {
    slug: "TerraScope",
    title: "TerraScope — Geospatial Platform",
    highlight: true,
    description:
      "Backend services and data-processing platform aggregating weather, environmental, and geographical datasets into unified REST APIs to power real-time monitoring and analytics.",
    stack: ["Python", "FastAPI", "REST APIs", "Pandas", "NumPy"],
    github: `https://github.com/${PERSON.githubUsername}`,
    live: "#contact",
    accent: "from-emerald-500/40 via-teal-500/30 to-cyan-600/35",
  },
  {
    slug: "Aether-Lite",
    title: "Aether Lite — Offline P2P Mesh",
    highlight: true,
    description:
      "Decentralized Android peer-to-peer communication app enabling nearby devices to exchange messages without internet via BLE mesh forwarding, background coroutines, and local Room storage.",
    stack: ["Kotlin", "Android", "BLE", "Room DB", "Coroutines"],
    github: `https://github.com/${PERSON.githubUsername}`,
    live: "#contact",
    accent: "from-blue-500/40 via-indigo-500/30 to-violet-600/35",
  },
  {
    slug: "SheBuilds",
    title: "SheBuilds",
    description:
      "Flagship initiative build — community-focused web platform emphasizing inclusive engineering, responsive UI design, and modern client-side workflows.",
    stack: ["JavaScript", "React", "Tailwind CSS", "Web"],
    github: `https://github.com/${PERSON.githubUsername}/SheBuilds`,
    live: "#contact",
    accent: "from-fuchsia-500/40 via-rose-500/30 to-violet-600/35",
  },
  {
    slug: "ClaimWatch",
    title: "ClaimWatch AI",
    description:
      "End-to-end data analytics and anomaly detection system integrating supervised ML models with FastAPI backend services and interactive reporting dashboards.",
    stack: ["Python", "FastAPI", "scikit-learn", "Pandas", "Streamlit"],
    github: `https://github.com/${PERSON.githubUsername}/ClaimWatch`,
    live: "#contact",
    accent: "from-violet-500/30 to-fuchsia-500/20",
  },
  {
    slug: "Smartscan-Attend",
    title: "SmartScan Attend",
    description:
      "Role-based attendance tracking platform featuring QR validation, real-time logging, and interactive administrative analytics.",
    stack: ["Python", "FastAPI", "SQLite", "HTML/CSS"],
    github: `https://github.com/${PERSON.githubUsername}/Smartscan-Attend`,
    live: "#contact",
    accent: "from-cyan-500/30 to-blue-600/20",
  },
  {
    title: "Travel Guru",
    description:
      "AI-assisted travel recommendation service leveraging transformer language models to provide contextual itinerary suggestions.",
    stack: ["Python", "Transformers", "Streamlit", "REST APIs"],
    github: `https://github.com/${PERSON.githubUsername}?tab=repositories`,
    live: "#contact",
    accent: "from-sky-500/30 to-teal-500/20",
  },
  {
    title: "GitLab Utils — Standup Automation",
    description:
      "Contributed an automated standup aggregation module to the open-source GitLab Utils project, streamlining developer status updates.",
    stack: ["Python", "GitLab API", "Automation", "CI/CD"],
    github: `https://github.com/${PERSON.githubUsername}`,
    live: "https://code.swecha.org/APASNA",
    accent: "from-orange-500/25 to-amber-500/20",
  },
] as const

/** @deprecated Use CURATED_PROJECTS — kept for backwards compatibility in imports */
export const PROJECTS = CURATED_PROJECTS

export const EXPERIENCE = [
  {
    title: "Software Developer",
    org: "Viswam.ai · Hyderabad, India",
    period: "May 2025 — Nov 2025",
    detail:
      "Tested website features and user workflows using Cypress to identify issues and ensure everything worked as expected. Created automated test cases to check different pages, user actions, and application functionality. Worked closely with developers to understand reported issues, track bugs, and verify fixes. Performed systematic regression testing after updates to make sure existing features continued to work properly.",
  },
  {
    title: "Research Intern — Distributed Networks & Systems",
    org: "DRDO–DRDL · Hyderabad, India",
    period: "May 2025 — Aug 2025",
    detail:
      "Explored distributed network architectures and reliable communication protocols used in defense systems. Researched network transmission mechanisms and multi-node data exchange across complex topologies. Assisted with system resilience testing, fault analysis, and system behavior modeling in controlled test environments. Applied core networking and operating systems concepts to analyze performance and optimize system throughput.",
  },
  {
    title: "Technical Lead Intern — Systems & QA",
    org: "Swecha Organisation · Hyderabad, India",
    period: "May 2025 — Present",
    detail:
      "Conducted end-to-end testing of software applications, validating user workflows, identifying bugs, and ensuring reliability across frontend, backend, and integration layers. Contributed as Tech Lead Intern on software development initiatives.",
  },
  {
    title: "Campus Leadership & Technical Operations",
    org: "Stanley College & Student Community",
    period: "2023 — Present",
    detail:
      "Led logistics and operations for 4+ major college technical events, including an international conference with 500+ attendees with zero operational faults. Mentored 10+ junior students in programming, data structures, and academic planning.",
  },
] as const

export const CERTIFICATIONS = [
  {
    name: "Software Engineering Job Simulation",
    issuer: "Tata",
    year: "2025",
  },
  {
    name: "Computer Networks & Communications",
    issuer: "Cisco",
    year: "2025",
  },
  {
    name: "Technology & Systems Engineering Simulation",
    issuer: "Deloitte",
    year: "2025",
  },
  {
    name: "IT Systems & Cloud Infrastructure Foundations",
    issuer: "Google",
    year: "2025",
  },
] as const
