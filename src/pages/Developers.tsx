import React, { useState } from 'react';
import { Language } from '../data/translations';
import { LEAD_DEVELOPER } from '../data/teamData';
import {
  Code,
  GraduationCap,
  Mail,
  Award,
  Sparkles,
  CheckCircle2,
  ExternalLink,
  Shield,
  Cpu,
  Layers,
  HeartPulse,
  Navigation,
  Activity,
  AlertCircle,
  WifiOff,
  Droplets,
  Building,
} from 'lucide-react';

interface DevelopersProps {
  language: Language;
}

const LinkedInIcon = ({ size = 16 }: { size?: number }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="currentColor"
    style={{ display: 'inline-block', verticalAlign: 'middle' }}
  >
    <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 10.9v8.37H9.2V10.9H6.46M7.83 6.45a1.64 1.64 0 1 0 0 3.28 1.64 1.64 0 0 0 0-3.28" />
  </svg>
);

const GitHubIcon = ({ size = 16 }: { size?: number }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="currentColor"
    style={{ display: 'inline-block', verticalAlign: 'middle' }}
  >
    <path d="M12 2A10 10 0 0 0 2 12c0 4.42 2.87 8.17 6.84 9.5.5.08.66-.23.66-.5v-1.69c-2.77.6-3.36-1.34-3.36-1.34-.46-1.16-1.11-1.47-1.11-1.47-.91-.62.07-.6.07-.6 1 .07 1.53 1.03 1.53 1.03.87 1.52 2.34 1.07 2.91.83.1-.65.35-1.09.63-1.34-2.22-.25-4.55-1.11-4.55-4.92 0-1.11.38-2 1.03-2.71-.1-.25-.45-1.29.1-2.64 0 0 .84-.27 2.75 1.02.79-.22 1.65-.33 2.5-.33.85 0 1.71.11 2.5.33 1.91-1.29 2.75-1.02 2.75-1.02.55 1.35.2 2.39.1 2.64.65.71 1.03 1.6 1.03 2.71 0 3.82-2.34 4.66-4.57 4.91.36.31.69.92.69 1.85V21c0 .27.16.59.67.5C19.14 20.16 22 16.42 22 12A10 10 0 0 0 12 2z" />
  </svg>
);

export const Developers: React.FC<DevelopersProps> = ({ language }) => {
  const [imageError, setImageError] = useState(false);
  const leadMember = LEAD_DEVELOPER;

  return (
    <div className="developers-page-container">
      {/* Top Banner */}
      <div className="developers-header-banner">
        <div className="dev-banner-badge">
          <Award size={18} className="gold-icon" />
          <span>
            {language === 'mr'
              ? 'सार्वजनिक आरोग्य विभाग • महाराष्ट्र शासन'
              : language === 'hi'
              ? 'सार्वजनिक स्वास्थ्य विभाग • महाराष्ट्र शासन'
              : 'Public Health Department • Government of Maharashtra'}
          </span>
        </div>

        <h1>
          {language === 'mr'
            ? 'प्लॅटफॉर्म आर्किटेक्चर व मुख्य डेव्हलपर'
            : language === 'hi'
            ? 'प्लेटफॉर्म आर्किटेक्चर एवं मुख्य डेवलपर'
            : 'Platform Architecture & Lead Developer'}
        </h1>

        <p>
          {language === 'mr'
            ? 'माधव इन्स्टिट्यूट ऑफ टेक्नॉलॉजी अँड सायन्स (MITS), ग्वाल्हेर च्या AI Core शाखेचे विद्यार्थी आकाश धाकड द्वारे संपूर्ण प्लॅटफॉर्मची निर्मिती.'
            : language === 'hi'
            ? 'माधव इंस्टीट्यूट ऑफ टेक्नोलॉजी एंड साइंस (MITS), ग्वालियर के AI Core ब्रांच के छात्र आकाश धाकड़ द्वारा संपूर्ण प्लेटफॉर्म का निर्माण।'
            : 'Designed, Architected & Engineered by Akash Dhakad (AI Core, Madhav Institute of Technology & Science - MITS Gwalior) for Public Health Department, Government of Maharashtra.'}
        </p>

        {/* Mission Mandate Banner */}
        <div className="sih-problem-pill">
          <span className="sih-id-tag">Mission Mandate</span>
          <span>
            {language === 'mr'
              ? 'महाराष्ट्रातील ३६ जिल्ह्यांमध्ये ग्रामीण व दुर्गम भागात सार्वजनिक आरोग्य सेवांची सुलभता, पारदर्शकता व १००% डिजिटल तक्रार निवारण.'
              : language === 'hi'
              ? 'महाराष्ट्र के ३६ जिलों में ग्रामीण और दुर्गम क्षेत्रों में सार्वजनिक स्वास्थ्य सेवाओं की सुलभता, पारदर्शिता एवं १००% डिजिटल शिकायत निवारण।'
              : 'Universal Healthcare Access, Real-Time Proximity Radar, 9-Stage Clinical Referral Tracking & Auto-Escalating Grievance Redressal across all 36 Districts of Maharashtra.'}
          </span>
        </div>
      </div>

      {/* Featured Lead Developer Card */}
      <section className="featured-lead-section">
        <div className="lead-dev-card">
          <div className="lead-card-badge">
            <Sparkles size={16} />
            <span>
              {language === 'mr'
                ? 'मुख्य सिस्टीम आर्किटेक्ट व डेव्हलपर'
                : language === 'hi'
                ? 'मुख्य सिस्टम आर्किटेक्ट एवं डेवलपर'
                : 'Lead Full-Stack AI Developer & System Architect'}
            </span>
          </div>

          <div className="lead-card-grid">
            {/* Avatar & Key Info */}
            <div className="lead-avatar-col">
              <div className="lead-photo-container">
                {leadMember.photoUrl && !imageError ? (
                  <img
                    src={leadMember.photoUrl}
                    alt={leadMember.name}
                    className="lead-avatar-img"
                    onError={() => setImageError(true)}
                  />
                ) : (
                  <div
                    className="lead-avatar-bubble"
                    style={{ background: leadMember.avatarBg }}
                  >
                    <span>{leadMember.avatarText}</span>
                  </div>
                )}
              </div>

              <h2>{leadMember.name}</h2>
              <div className="lead-role-title">{leadMember.role}</div>

              <div className="lead-college-info">
                <div className="info-row">
                  <GraduationCap size={16} />
                  <span>{leadMember.college}</span>
                </div>
                <div className="info-row highlight-branch">
                  <Cpu size={16} />
                  <span>
                    <strong>{leadMember.branch}</strong> ({leadMember.year})
                  </span>
                </div>
              </div>

              {/* Social & Contact Actions */}
              <div className="lead-actions-row">
                <a
                  href={`mailto:${leadMember.email}`}
                  className="social-btn email-btn"
                  title={`Email: ${leadMember.email}`}
                >
                  <Mail size={16} />
                  <span>{leadMember.email}</span>
                </a>

                {leadMember.linkedin && leadMember.linkedin !== 'NOT AVAILABLE' && (
                  <a
                    href={leadMember.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="social-btn linkedin-btn"
                  >
                    <LinkedInIcon size={16} />
                    <span>LinkedIn</span>
                    <ExternalLink size={12} />
                  </a>
                )}

                {leadMember.github && leadMember.github !== 'NOT AVAILABLE' && (
                  <a
                    href={leadMember.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="social-btn github-btn"
                  >
                    <GitHubIcon size={16} />
                    <span>GitHub</span>
                    <ExternalLink size={12} />
                  </a>
                )}
              </div>
            </div>

            {/* Bio & Key Architectural Contributions */}
            <div className="lead-bio-col">
              <h3>
                {language === 'mr'
                  ? 'प्लॅटफॉर्म आर्किटेक्चर व मुख्य वैशिष्ट्ये'
                  : language === 'hi'
                  ? 'प्लेटफॉर्म आर्किटेक्चर एवं मुख्य विशेषताएं'
                  : 'Core Platform Architecture & Engineering Innovations'}
              </h3>
              <p className="lead-bio-text">{leadMember.bio}</p>

              <div className="lead-contributions-list">
                {leadMember.contributions.map((item, idx) => (
                  <div className="contribution-item" key={idx}>
                    <CheckCircle2 size={16} className="green-check" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Core Platform Modules Grid */}
      <section className="team-grid-section">
        <div className="team-section-header">
          <Building size={22} className="team-header-icon" />
          <div>
            <h2>
              {language === 'mr'
                ? 'प्लॅटफॉर्मची ६ मुख्य इंजिनिअरिंग मॉड्यूल्स'
                : language === 'hi'
                ? 'प्लेटफॉर्म के ६ मुख्य इंजीनियरिंग मॉड्यूल्स'
                : 'Core System Modules & Functional Architecture'}
            </h2>
            <p>
              {language === 'mr'
                ? 'नागरिक, डॉक्टर्स, आशा सेविका आणि जिल्हा प्रशासनासाठी अखंड एकात्मिक प्रणाली'
                : language === 'hi'
                ? 'नागरिकों, डॉक्टरों, आशा कार्यकर्ताओं और जिला प्रशासन के लिए एकीकृत प्रणाली'
                : 'Integrated digital ecosystem connecting Citizens, Doctors, ASHA Workers, and District Health Officers'}
            </p>
          </div>
        </div>

        <div className="team-members-grid">
          {/* Module 1: GPS Radar */}
          <div className="team-member-card">
            <div className="member-card-header">
              <div className="member-avatar-circle" style={{ background: 'linear-gradient(135deg, #059669 0%, #10b981 100%)' }}>
                <Navigation size={20} color="white" />
              </div>
              <div className="member-name-group">
                <h3>GPS Proximity & Live Resource Radar</h3>
                <span className="member-role-badge">Haversine Geodesic Engine</span>
              </div>
            </div>
            <p className="member-bio-text">
              Real-time calculation of physical distance (in KM) and estimated driving time from user's live GPS coordinates to nearest PHC, CHC, District Hospitals, and Medical Colleges with live General & ICU bed counts.
            </p>
            <div className="member-contributions-box">
              <strong>Key Capabilities:</strong>
              <ul>
                <li>Haversine mathematical geodesic distance algorithm</li>
                <li>Live General, ICU & Oxygen bed vacancy meters</li>
                <li>Anti-Snake Venom (ASV) emergency availability radar</li>
              </ul>
            </div>
          </div>

          {/* Module 2: 9-Stage Tracker */}
          <div className="team-member-card">
            <div className="member-card-header">
              <div className="member-avatar-circle" style={{ background: 'linear-gradient(135deg, #2563eb 0%, #3b82f6 100%)' }}>
                <Activity size={20} color="white" />
              </div>
              <div className="member-name-group">
                <h3>9-Stage Clinical Treatment Tracker</h3>
                <span className="member-role-badge">Closed-Loop Referrals</span>
              </div>
            </div>
            <p className="member-bio-text">
              Eliminates rural referral drop-outs by tracking patient journeys step-by-step from Village Sub-Centre (ASHA) ➔ PHC ➔ CHC ➔ District Hospital to verify whether the patient received treatment ("इलाज हुआ या नहीं").
            </p>
            <div className="member-contributions-box">
              <strong>Key Capabilities:</strong>
              <ul>
                <li>Digital Referral Slips with verifiable QR codes</li>
                <li>Real-time clinical stage progress & doctor notes</li>
                <li>Pre-allocated hospital bed & 108 ambulance dispatch</li>
              </ul>
            </div>
          </div>

          {/* Module 3: Grievance Portal */}
          <div className="team-member-card">
            <div className="member-card-header">
              <div className="member-avatar-circle" style={{ background: 'linear-gradient(135deg, #dc2626 0%, #ef4444 100%)' }}>
                <AlertCircle size={20} color="white" />
              </div>
              <div className="member-name-group">
                <h3>4-Level Auto-Escalating Grievance Cell</h3>
                <span className="member-role-badge">Photo Evidence & 48h SLA</span>
              </div>
            </div>
            <p className="member-bio-text">
              Direct patient grievance redressal against overcharging, staff misconduct, or medicine stockouts with optional camera photo evidence and an automated 48-hour SLA escalation timer.
            </p>
            <div className="member-contributions-box">
              <strong>Key Capabilities:</strong>
              <ul>
                <li>Optional camera/device photo evidence attachment</li>
                <li>48-Hour SLA timer auto-escalating to DHO & Collector</li>
                <li>Transparent public audit trail & Action Taken Reports (ATR)</li>
              </ul>
            </div>
          </div>

          {/* Module 4: Offline PWA */}
          <div className="team-member-card">
            <div className="member-card-header">
              <div className="member-avatar-circle" style={{ background: 'linear-gradient(135deg, #7c3aed 0%, #8b5cf6 100%)' }}>
                <WifiOff size={20} color="white" />
              </div>
              <div className="member-name-group">
                <h3>Offline-First PWA & Android Engine</h3>
                <span className="member-role-badge">Zero-Internet Capability</span>
              </div>
            </div>
            <p className="member-bio-text">
              Engineered with Service Workers, IndexedDB, and Capacitor Native Android wrappers to function with 100% reliability in remote tribal forests with zero or intermittent 2G connectivity.
            </p>
            <div className="member-contributions-box">
              <strong>Key Capabilities:</strong>
              <ul>
                <li>Workbox Service Worker caching & background sync</li>
                <li>Capacitor native Android Studio project wrapper</li>
                <li>PWA 1-click install banner with instant offline caching</li>
              </ul>
            </div>
          </div>

          {/* Module 5: Multilingual Voice AI */}
          <div className="team-member-card">
            <div className="member-card-header">
              <div className="member-avatar-circle" style={{ background: 'linear-gradient(135deg, #d97706 0%, #f59e0b 100%)' }}>
                <Sparkles size={20} color="white" />
              </div>
              <div className="member-name-group">
                <h3>Multilingual AI Voice Navigator</h3>
                <span className="member-role-badge">Marathi / Hindi / English</span>
              </div>
            </div>
            <p className="member-bio-text">
              Voice-assisted clinical triage and symptom navigator enabling non-literate rural citizens to speak their symptoms in local dialects and receive instant care tier recommendations.
            </p>
            <div className="member-contributions-box">
              <strong>Key Capabilities:</strong>
              <ul>
                <li>Web Speech STT & TTS in mr-IN, hi-IN, and en-IN</li>
                <li>Triage urgency classification (Routine, Urgent, Emergency)</li>
                <li>Red-flag symptom detection with 1-click 108 SOS alert</li>
              </ul>
            </div>
          </div>

          {/* Module 6: Blood Bank & Schemes */}
          <div className="team-member-card">
            <div className="member-card-header">
              <div className="member-avatar-circle" style={{ background: 'linear-gradient(135deg, #0284c7 0%, #0ea5e9 100%)' }}>
                <Droplets size={20} color="white" />
              </div>
              <div className="member-name-group">
                <h3>e-RaktKosh Blood Bank & MJPJAY 2.0</h3>
                <span className="member-role-badge">Universal Cashless Health</span>
              </div>
            </div>
            <p className="member-bio-text">
              Real-time blood component availability across all 36 Maharashtra districts, along with ration-card eligibility checking for Maharashtra's universal ₹5 Lakh MJPJAY 2.0 cashless coverage.
            </p>
            <div className="member-contributions-box">
              <strong>Key Capabilities:</strong>
              <ul>
                <li>Live stock counter for A+, B+, AB+, O+ and rare Bombay Blood</li>
                <li>MJPJAY 2.0 ration card eligibility calculator</li>
                <li>5-Tab government hospital fee & rate transparency</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Tech Stack & Architecture Highlights */}
      <section className="tech-stack-showcase-section">
        <div className="tech-card-header">
          <Layers size={22} />
          <h2>
            {language === 'mr'
              ? 'प्रकल्प तंत्रज्ञान व आर्किटेक्चर'
              : language === 'hi'
              ? 'प्रोजेक्ट टेक्नोलॉजी एवं आर्किटेक्चर'
              : 'Technology Stack & Engineering Highlights'}
          </h2>
        </div>

        <div className="tech-pillars-grid">
          <div className="tech-pillar-card">
            <div className="pillar-icon blue-p">
              <Code size={22} />
            </div>
            <h4>Full-Stack & Frontend</h4>
            <p>React 19, TypeScript, React Router v7, Vite, Lucide Icons, Mobile-first Responsive CSS.</p>
          </div>

          <div className="tech-pillar-card">
            <div className="pillar-icon purple-p">
              <Sparkles size={22} />
            </div>
            <h4>Multilingual Voice AI</h4>
            <p>Web Speech API (STT & TTS in mr-IN, hi-IN, en-IN), Clinical Symptom Triage, Red Flag Detection.</p>
          </div>

          <div className="tech-pillar-card">
            <div className="pillar-icon green-p">
              <Shield size={22} />
            </div>
            <h4>Offline-First Engine</h4>
            <p>LocalStorage & IndexedDB caching, Offline patient registration queue, automatic network sync.</p>
          </div>

          <div className="tech-pillar-card">
            <div className="pillar-icon red-p">
              <HeartPulse size={22} />
            </div>
            <h4>Govt Integration</h4>
            <p>MJPJAY 2.0 & Ayushman Bharat calculator, 108 Emergency SOS simulation, QR Digital Referrals.</p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Developers;
