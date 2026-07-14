const base = import.meta.env.BASE_URL

export const PERSON = {
  name: "Apur Apasna",
  role: "Cybersecurity Enthusiast | Ethical Hacking Learner | AI + Security Explorer",
  college: "Stanley College of Engineering and Technology for Women, Hyderabad",
  degree: "B.E in Computer Engineering",
  year: "B.E Computer Engineering · 3rd Year (2023 — 2027)",
  cgpa: "8.45",
  email: "apasnaapur@gmail.com",
  phone: "+91 9441776664",
  githubUsername: import.meta.env.VITE_GITHUB_USERNAME ?? "Apur-Apasna05",
  resumePath: `${base}resume.pdf`,
  profileImage: `${base}apur-profile.jpg`,
  profileAlt:
    "Apur Apasna — cybersecurity student at Stanley College of Engineering and Technology for Women",
  summary:
    "Highly motivated computer science undergraduate with hands-on experience in cybersecurity, machine learning, and AI-driven application development. Former intern at DRDO (Networking) and contributing as a Tech Lead Intern on LLM-based AI projects. Skilled in Python, FastAPI, Streamlit, Git, and model deployment, with experience building end-to-end systems including fraud detection platforms, malicious URL detectors, and intelligent chatbots. Passionate about ethical hacking, secure systems design, and AI-powered cybersecurity solutions.",
}

export const HERO_TYPING = [
  "Penetration Testing",
  "Network Security",
  "Threat Analysis",
  "Digital Forensics",
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
  { label: "Projects", value: 8, suffix: "+" },
  { label: "Certifications", value: 4, suffix: "" },
  { label: "Internships", value: 2, suffix: "" },
  { label: "GitHub Contributions", value: 79, suffix: "" },
  { label: "LinkedIn Followers", value: 1100, suffix: "+" },
] as const

export const SKILLS = [
  { name: "Python", percent: 92 },
  { name: "FastAPI & REST APIs", percent: 86 },
  { name: "Streamlit", percent: 88 },
  { name: "AI/ML & Transformers", percent: 84 },
  { name: "Cybersecurity & Networking", percent: 82 },
  { name: "Wireshark & Nmap", percent: 78 },
  { name: "Linux / Kali basics", percent: 80 },
  { name: "Git & GitLab", percent: 88 },
  { name: "SQL & SQLite", percent: 85 },
  { name: "SHAP & Explainable AI", percent: 76 },
] as const

export const TOOLS = [
  {
    name: "Nmap",
    desc: "Network discovery, port scanning, and service fingerprinting for reconnaissance.",
    icon: "scan" as const,
  },
  {
    name: "Burp Suite",
    desc: "Web vulnerability scanning and manual testing proxy for application security.",
    icon: "globe" as const,
  },
  {
    name: "Metasploit",
    desc: "Exploitation framework for penetration testing and controlled payload delivery.",
    icon: "zap" as const,
  },
  {
    name: "Wireshark",
    desc: "Deep packet inspection and protocol analysis for traffic investigation.",
    icon: "activity" as const,
  },
  {
    name: "Hydra",
    desc: "Parallelized login cracker for authorized credential strength assessments.",
    icon: "key" as const,
  },
  {
    name: "John the Ripper",
    desc: "Fast password hash cracking for offline security audits and research.",
    icon: "lock" as const,
  },
  {
    name: "Nikto",
    desc: "Web server scanner for misconfigurations and outdated software detection.",
    icon: "shield-alert" as const,
  },
] as const

export const CURATED_PROJECTS = [
  {
    slug: "SheBuilds",
    title: "SheBuilds",
    highlight: true,
    description:
      "Flagship initiative build — community-focused web work aligned with She Builds, emphasizing inclusive engineering, polished UI, and security-minded delivery.",
    stack: ["JavaScript", "Web", "Community"],
    github: `https://github.com/${PERSON.githubUsername}/SheBuilds`,
    live: "#contact",
    accent: "from-fuchsia-500/40 via-rose-500/30 to-violet-600/35",
  },
  {
    slug: "ClaimWatch",
    title: "ClaimWatch AI",
    description:
      "End-to-end insurance fraud detection platform combining supervised ML and anomaly detection with explainable AI (SHAP) insights.",
    stack: ["Python", "scikit-learn", "FastAPI", "Pandas", "SHAP", "Streamlit"],
    github: `https://github.com/${PERSON.githubUsername}/ClaimWatch`,
    live: "#contact",
    accent: "from-violet-500/30 to-fuchsia-500/20",
  },
  {
    slug: "Smartscan-Attend",
    title: "SmartScan Attend",
    description:
      "Secure, role-based attendance system with QR authentication, IP validation, and a real-time analytics dashboard.",
    stack: ["Python", "Streamlit", "SQLite", "HTML/CSS"],
    github: `https://github.com/${PERSON.githubUsername}/Smartscan-Attend`,
    live: "#contact",
    accent: "from-cyan-500/30 to-blue-600/20",
  },
  {
    title: "Travel Guru",
    description:
      "AI-powered travel assistant that generates location-based suggestions using transformer models.",
    stack: ["Python", "Hugging Face Transformers", "Streamlit"],
    github: `https://github.com/${PERSON.githubUsername}?tab=repositories`,
    live: "#contact",
    accent: "from-sky-500/30 to-teal-500/20",
  },
  {
    title: "Malicious URL Detector",
    description:
      "ML pipeline to flag suspicious URLs with explainable signals and safe evaluation practices.",
    stack: ["Python", "Streamlit", "scikit-learn"],
    github: `https://github.com/${PERSON.githubUsername}?tab=repositories`,
    live: "#contact",
    accent: "from-emerald-500/30 to-cyan-500/20",
  },
  {
    title: "GitLab Utils — Standup Automation",
    description:
      "Contributed the daily standup automation module to the open-source GitLab Utils project used by collaborating teams.",
    stack: ["Python", "GitLab API", "Automation"],
    github: `https://github.com/${PERSON.githubUsername}`,
    live: "https://code.swecha.org/APASNA",
    accent: "from-orange-500/25 to-amber-500/20",
  },
  {
    title: "Password Strength Checker",
    description:
      "Entropy scoring, breach-pattern hints, and visual feedback without storing plaintext secrets.",
    stack: ["TypeScript", "React", "Web Crypto"],
    github: `https://github.com/${PERSON.githubUsername}?tab=repositories`,
    live: "#contact",
    accent: "from-rose-500/30 to-orange-500/20",
  },
  {
    title: "Network Scanner",
    description:
      "Lightweight LAN inventory with passive discovery options and exportable asset reports.",
    stack: ["Python", "Scapy", "CLI"],
    github: `https://github.com/${PERSON.githubUsername}?tab=repositories`,
    live: "#contact",
    accent: "from-lime-500/30 to-emerald-600/20",
  },
] as const

/** @deprecated Use CURATED_PROJECTS — kept for backwards compatibility in imports */
export const PROJECTS = CURATED_PROJECTS

export const EXPERIENCE = [
  {
    title: "Research Intern — Networking & Cybersecurity",
    org: "DRDO-DRDL · Hyderabad, India",
    period: "May 2025 — Jun 2025",
    detail:
      "Worked on networking and secure communication systems in a research-driven defense environment. Analyzed network architectures and secure data transmission protocols. Assisted in vulnerability assessment and threat models in controlled systems. Strengthened knowledge in computer networks, operating systems, and secure system design.",
  },
  {
    title: "Summer Intern — AI & QA (Tech Lead Intern, LLM projects)",
    org: "Swecha Organisation · Hyderabad, India",
    period: "May 2025 — Present",
    detail:
      "Conducted end-to-end testing of AI-driven applications, validating workflows, identifying bugs, and ensuring reliability across frontend, backend, and model integration layers. Contributed as Tech Lead Intern on LLM-based initiatives.",
  },
  {
    title: "Leadership & Event Operations",
    org: "Stanley College & community",
    period: "Ongoing",
    detail:
      "Led logistics and design for 4+ major college events, including an international conference with 500+ attendees, with zero logistical faults and high participant satisfaction. Mentored 10+ junior students in academics and career planning.",
  },
  {
    title: "Community & industry engagement",
    org: "NULL · Salesforce · Swecha",
    period: "2025",
    detail:
      "NULL Community Meet (Salesforce, Hyderabad): cybersecurity discussions with industry professionals. AI Days 2025 @ Swecha: AI-focused technical sessions and community interactions.",
  },
] as const

export const CERTIFICATIONS = [
  {
    name: "Cybersecurity Analyst Job Simulation",
    issuer: "Tata",
    year: "2025",
  },
  {
    name: "Introduction to Cybersecurity",
    issuer: "Cisco",
    year: "2025",
  },
  {
    name: "Cyber Job Simulation",
    issuer: "Deloitte",
    year: "2025",
  },
  {
    name: "Foundation of Cybersecurity",
    issuer: "Google",
    year: "2025",
  },
] as const
