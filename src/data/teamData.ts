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
  photoUrl?: string;
  avatarText: string;
  avatarBg: string;
  bio: string;
  contributions: string[];
}

export const LEAD_DEVELOPER: TeamMember = {
  id: 'lead-akash',
  name: 'Akash Dhakad',
  role: 'Lead Full-Stack AI Developer & System Architect',
  isLead: true,
  college: 'Madhav Institute of Technology & Science (MITS), Gwalior',
  branch: 'Artificial Intelligence (AI Core)',
  year: 'B.Tech (AI Engineering)',
  email: '26ai1ak9@mitsgwl.ac.in',
  linkedin: 'https://www.linkedin.com/in/akash-dhakad8358',
  github: 'https://github.com/akashcyber02',
  photoUrl: 'https://github.com/akashcyber02.png',
  avatarText: 'AD',
  avatarBg: 'linear-gradient(135deg, #059669 0%, #10b981 100%)',
  bio: 'Lead Full-Stack & AI architect behind Swasthya Setu Maharashtra. Conceptualized and engineered the end-to-end platform architecture, Haversine GPS proximity locator, Multilingual AI Voice Triage Navigator, 9-Stage Closed-Loop Clinical Referral tracking, 108 SOS emergency dispatch simulation, Photo-evidence Grievance Redressal with 48h SLA auto-escalation, and Offline-First Sync Engine for the Government of Maharashtra.',
  contributions: [
    'Platform Architecture, UI/UX & Full-Stack System Design',
    'Haversine GPS Distance Calculation & Real-Time Proximity Radar',
    '9-Stage Closed-Loop Patient Treatment Journey Tracker ("इलाज हुआ या नहीं")',
    '4-Level Auto-Escalating Grievance Redressal with Photo Evidence',
    'Multilingual AI Voice Triage Engine (Marathi / Hindi / English)',
    '108 Emergency SOS & Automated Ambulance Dispatch Simulation',
    'Offline-First Local Storage, Service Worker PWA & Capacitor Native Android Engine',
    'e-RaktKosh 36-District Real-Time Blood Bank Integration',
  ],
};

export const SIH_TEAM_MEMBERS: TeamMember[] = [LEAD_DEVELOPER];
