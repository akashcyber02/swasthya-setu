export interface TeamMember {
  id: string;
  name: string;
  role: string;
  isLead?: boolean;
  college: string;
  branch: string;
  year: string;
  email: string;
  linkedin: string;
  github?: string;
  photoUrl?: string; // e.g. '/team/akash.jpg' or 'https://github.com/username.png'
  avatarText: string;
  avatarBg: string;
  bio: string;
  contributions: string[];
}

export const SIH_TEAM_MEMBERS: TeamMember[] = [
  {
    id: "lead-akash",
    name: "Akash Dhakad ",
    role: "Team Leader & Lead Full-Stack AI Developer",
    isLead: true,
    college: "Madhav Institute of Technology & Science (MITS), Gwalior",
    branch: "Artificial Intelligence (AI Core)",
    year: "B.Tech 1st Year (AI Engineering)",
    email: "26ai1ak9@mitsgwl.ac.in",
    linkedin: "https://www.linkedin.com/in/akash-dhakad8358",
    github: "https://github.com/akashcyber02",
    // Live GitHub Profile Picture (or you can use '/team/akash.jpg')
    photoUrl: "https://github.com/akashcyber02.png",
    avatarText: "AD",
    avatarBg: "linear-gradient(135deg, #059669 0%, #10b981 100%)",
    bio: "Lead Full-Stack & AI architect behind Swasthya Setu Maharashtra. Designed the end-to-end platform architecture, Multilingual AI Voice Triage Navigator, Smart Digital Referral flow, 108 SOS emergency dispatch simulation, and Offline Sync Engine for Government of Maharashtra (SIH26133).",
    contributions: [
      "Platform Architecture & Full-Stack System Design",
      "Multilingual AI Voice Triage Engine (Marathi / Hindi / English)",
      "108 Emergency SOS & Ambulance Dispatch System",
      "Smart Digital Referral Tracking & QR Passports",
      "Offline-First Local Storage & Sync Queue",
    ],
  },
  {
    id: "member-2",
    name: "Honey Kushwaha",
    role: "Presentation & Healthcare Research Lead",
    isLead: false,
    college: "Madhav Institute of Technology & Science (MITS), Gwalior",
    branch: "Artificial Intelligence (AI Core)",
    year: "B.Tech 1st Year",
    email: "26ai1ho49@mitsgwl.ac.in",
    linkedin: "NOT AVAILABLE",
    github: "https://github.com/26ai1ho49-honey",
    photoUrl: "https://avatars.githubusercontent.com/u/324976339?v=4",
    avatarText: "HK",
    avatarBg: "linear-gradient(135deg, #2563eb 0%, #3b82f6 100%)",
    bio: "Researched Maharashtra public healthcare delivery mechanisms, tribal district vulnerabilities, and crafted project presentation architecture for Smart India Hackathon evaluation.",
    contributions: [
      "Presentation Design & Project Defense Architecture",
      "Maharashtra Healthcare System & Tribal Belt Analysis",
      "Field Workflow Validation for Rural Users",
    ],
  },
  {
    id: "member-3",
    name: "Chandan Singh (Team member)",
    role: "Healthcare Data & Triage Rules Lead",
    isLead: false,
    college: "Madhav Institute of Technology & Science (MITS), Gwalior",
    branch: "Artificial Intelligence (AI Core)",
    year: "B.Tech 1st Year",
    email: "26ai1ch31@mitsgwl.ac.in",
    linkedin:
      "https://www.linkedin.com/in/chandan-singh-4254a4433?utm_source=share_via&utm_content=profile&utm_medium=member_android",
    github: "https://github.com/chandan9340",
    photoUrl: "https://github.com/chandan9340.png", // Add '/team/chandan.jpg' or any image URL here
    avatarText: "CS",
    avatarBg: "linear-gradient(135deg, #7c3aed 0%, #8b5cf6 100%)",
    bio: "Curated 36-district Maharashtra public healthcare facilities dataset, MJPJAY 2.0 scheme parameters, and clinical triage urgency rules for rural emergency handling.",
    contributions: [
      "Maharashtra 36-District Healthcare Facility Dataset",
      "Symptom-to-Facility Urgency Classification Rules",
      "Medicine Inventory & Essential Stock Modeling",
    ],
  },
  {
    id: "member-4",
    name: "Dhananjay Dandolia (SIH Team Leader) ",
    role: "AI / NLP & Multilingual Localization",
    isLead: false,
    college: "Madhav Institute of Technology & Science (MITS), Gwalior",
    branch: "Artificial Intelligence (AI Core)",
    year: "B.Tech 1st Year",
    email: "26ai1dh34@mitsgwl.ac.in",
    linkedin:
      "https://www.linkedin.com/in/dhananjay-dandolia-a1b217433?utm_source=share_via&utm_content=profile&utm_medium=member_android",
    github: "https://github.com/Dhananjaydj7",
    photoUrl: "https://github.com/Dhananjaydj7.png", // Add '/team/member4.jpg' or any image URL here
    avatarText: "DD",
    avatarBg: "linear-gradient(135deg, #ea580c 0%, #f97316 100%)",
    bio: "Built Marathi and Hindi translation datasets, symptom triage intent classification, and voice synthesis recognition pipelines for low-literacy rural users.",
    contributions: [
      "Marathi & Hindi Clinical Triage NLP Dictionaries",
      "Web Speech STT / TTS Integration",
      "Multilingual Vocabulary Verification",
    ],
  },
  {
    id: "member-5",
    name: "Bansi Lal Mandeliya",
    role: "Frontline Worker & Teleconsultation Lead",
    isLead: false,
    college: "Madhav Institute of Technology & Science (MITS), Gwalior",
    branch: "Artificial Intelligence (AI Core)",
    year: "B.Tech 1st Year",
    email: "26ai1ba30@mitsgwl.ac.in",
    linkedin:
      "https://www.linkedin.com/in/bansi-lal-mandeliya-325495433?utm_source=share_via&utm_content=profile&utm_medium=member_ios",
    github: "https://github.com/bansimandeliya",
    photoUrl: "https://github.com/bansimandeliya.png",
    avatarText: "BM",
    avatarBg: "linear-gradient(135deg, #0284c7 0%, #0ea5e9 100%)",
    bio: "Engineered the ASHA / ANM frontline health worker portal, e-Sanjeevani teleconsultation workflow, and digital patient vitals registration.",
    contributions: [
      "ASHA / ANM Frontline Worker Portal & Workflow",
      "e-Sanjeevani National Telemedicine Simulation",
      "Digital Patient Registration & Vitals Logger",
    ],
  },
  {
    id: "member-6",
    name: "Gagandeep Rawat",
    role: "Presentation & Cloud Deployment Coordinator",
    isLead: false,
    college: "Madhav Institute of Technology & Science (MITS), Gwalior",
    branch: "Artificial Intelligence (AI Core)",
    year: "B.Tech 1st Year",
    email: "26ai1ga38@mitsgwl.ac.in",
    linkedin:
      "https://www.linkedin.com/in/gagan-2830a0428?utm_source=share_via&utm_content=profile&utm_medium=member_android",
    github: "https://github.com/Gagandeeprawat",
    photoUrl: "https://github.com/Gagandeeprawat.png",
    avatarText: "GR",
    avatarBg: "linear-gradient(135deg, #ea580c 0%, #f97316 100%)",
    bio: "Coordinated project presentation deck architecture, slide alignment, and cloud hosting deployment workflows for Smart India Hackathon evaluation.",
    contributions: [
      "Presentation Deck Architecture & Slide Design",
      "Domain Name & Cloud Hosting Infrastructure Setup",
      "SIH Project Submission & Documentation Support",
    ],
  },
];
