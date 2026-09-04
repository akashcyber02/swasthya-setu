import React, { useState } from 'react';
import { Language } from '../data/translations';
import { SIH_TEAM_MEMBERS, TeamMember } from '../data/teamData';
import {
  Code,
  GraduationCap,
  Mail,
  Award,
  Sparkles,
  CheckCircle2,
  ExternalLink,
  Users,
  Shield,
  Cpu,
  Layers,
  HeartPulse,
  Image as ImageIcon,
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

// Photo Avatar Component with Error Fallback
const TeamMemberAvatar: React.FC<{
  member: TeamMember;
  isLead?: boolean;
}> = ({ member, isLead = false }) => {
  const [imageError, setImageError] = useState(false);

  if (member.photoUrl && !imageError) {
    return (
      <div className={isLead ? 'lead-photo-container' : 'member-photo-container'}>
        <img
          src={member.photoUrl}
          alt={member.name}
          className={isLead ? 'lead-avatar-img' : 'member-avatar-img'}
          onError={() => setImageError(true)}
        />
      </div>
    );
  }

  return (
    <div
      className={isLead ? 'lead-avatar-bubble' : 'member-avatar-circle'}
      style={{ background: member.avatarBg }}
    >
      <span>{member.avatarText}</span>
    </div>
  );
};

export const Developers: React.FC<DevelopersProps> = ({ language }) => {
  const leadMember = SIH_TEAM_MEMBERS.find((m) => m.isLead) || SIH_TEAM_MEMBERS[0];
  const otherMembers = SIH_TEAM_MEMBERS.filter((m) => !m.isLead);

  return (
    <div className="developers-page-container">
      {/* Top Banner */}
      <div className="developers-header-banner">
        <div className="dev-banner-badge">
          <Award size={18} className="gold-icon" />
          <span>
            {language === 'mr'
              ? 'स्मार्ट इंडिया हॅकाथॉन (SIH 2026) टीम'
              : language === 'hi'
              ? 'स्मार्ट इंडिया हैकाथॉन (SIH 2026) टीम'
              : 'Smart India Hackathon (SIH 2026) Developer Team'}
          </span>
        </div>

        <h1>
          {language === 'mr'
            ? 'प्रकल्प निर्माते व टीम'
            : language === 'hi'
            ? 'प्रोजेक्ट डेवलपर्स एवं टीम'
            : 'Meet the Developers & SIH Team'}
        </h1>

        <p>
          {language === 'mr'
            ? 'माधव इन्स्टिट्यूट ऑफ टेक्नॉलॉजी अँड सायन्स (MITS), ग्वाल्हेर च्या AI Core शाखेच्या विद्यार्थ्यांद्वारे विकसित.'
            : language === 'hi'
            ? 'माधव इंस्टीट्यूट ऑफ टेक्नोलॉजी एंड साइंस (MITS), ग्वालियर के AI Core ब्रांच के छात्रों द्वारा विकसित।'
            : 'Designed & Engineered by AI Core branch students of Madhav Institute of Technology & Science (MITS), Gwalior for Government of Maharashtra.'}
        </p>

        {/* Problem Statement Pill */}
        <div className="sih-problem-pill">
          <span className="sih-id-tag">Problem Statement: SIH26133</span>
          <span>
            {language === 'mr'
              ? 'ग्रामीण व दुर्गम भागात सार्वजनिक आरोग्य सेवांची सुलभता व गुणवत्ता वाढवणे (महाराष्ट्र शासन)'
              : language === 'hi'
              ? 'ग्रामीण और दुर्गम क्षेत्रों में सार्वजनिक स्वास्थ्य सेवाओं की पहुंच और गुणवत्ता (महाराष्ट्र शासन)'
              : 'Accessibility and quality of public healthcare services, particularly in rural and underserved areas (Govt of Maharashtra)'}
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
                ? 'टीम लीडर व मुख्य डेव्हलपर'
                : language === 'hi'
                ? 'टीम लीडर एवं मुख्य डेवलपर'
                : 'Team Leader & Lead Full-Stack AI Developer'}
            </span>
          </div>

          <div className="lead-card-grid">
            {/* Avatar & Key Info */}
            <div className="lead-avatar-col">
              <TeamMemberAvatar member={leadMember} isLead={true} />

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
                  ? 'प्रकल्पातील मुख्य योगदान व भूमिका'
                  : language === 'hi'
                  ? 'प्रोजेक्ट में मुख्य योगदान एवं भूमिका'
                  : 'Core Project Role & Key Contributions'}
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

      {/* All Team Members Section */}
      <section className="team-grid-section">
        <div className="team-section-header">
          <Users size={22} className="team-header-icon" />
          <div>
            <h2>
              {language === 'mr'
                ? 'हॅकाथॉन टीम सदस्य (SIH 2026)'
                : language === 'hi'
                ? 'हैकाथॉन टीम सदस्य (SIH 2026)'
                : 'SIH 2026 Team Members & Contributors'}
            </h2>
            <p>
              {language === 'mr'
                ? 'MITS ग्वाल्हेरच्या ६-सदस्यीय टीमचे योगदान'
                : language === 'hi'
                ? 'MITS ग्वालियर के ६-सदस्यीय टीम का योगदान'
                : '6-Member Engineering Team from Madhav Institute of Technology & Science (MITS), Gwalior'}
            </p>
          </div>
        </div>

        <div className="team-members-grid">
          {otherMembers.map((member) => (
            <div className="team-member-card" key={member.id}>
              <div className="member-card-header">
                <TeamMemberAvatar member={member} isLead={false} />

                <div className="member-name-group">
                  <h3>{member.name}</h3>
                  <span className="member-role-badge">{member.role}</span>
                </div>
              </div>

              <div className="member-academic-meta">
                <div className="meta-item">
                  <GraduationCap size={15} />
                  <span>{member.college}</span>
                </div>
                <div className="meta-item">
                  <Cpu size={15} />
                  <span>
                    {member.branch} • {member.year}
                  </span>
                </div>
              </div>

              <p className="member-bio-text">{member.bio}</p>

              {/* Contributions */}
              <div className="member-contributions-box">
                <strong>
                  {language === 'mr'
                    ? 'योगदान:'
                    : language === 'hi'
                    ? 'योगदान:'
                    : 'Contributions:'}
                </strong>
                <ul>
                  {member.contributions.map((c, i) => (
                    <li key={i}>{c}</li>
                  ))}
                </ul>
              </div>

              {/* Social Links */}
              <div className="member-links-footer">
                {member.email ? (
                  <a
                    href={`mailto:${member.email}`}
                    className="member-social-link"
                    title="Send Email"
                  >
                    <Mail size={15} />
                    <span>Email</span>
                  </a>
                ) : null}

                {member.linkedin && member.linkedin !== 'NOT AVAILABLE' && (
                  <a
                    href={member.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="member-social-link"
                    title="LinkedIn Profile"
                  >
                    <LinkedInIcon size={15} />
                    <span>LinkedIn</span>
                  </a>
                )}

                {member.github && member.github !== 'NOT AVAILABLE' && (
                  <a
                    href={member.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="member-social-link"
                    title="GitHub Profile"
                  >
                    <GitHubIcon size={15} />
                    <span>GitHub</span>
                  </a>
                )}
              </div>
            </div>
          ))}
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
            <p>React 19, TypeScript, React Router DOM v7, Vite, Lucide Icons, Mobile-first Responsive CSS.</p>
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
