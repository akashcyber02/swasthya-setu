import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Language, translations } from '../data/translations';
import {
  MapPin,
  FileText,
  GitPullRequest,
  Sparkles,
  ShieldAlert,
  PhoneCall,
  CheckCircle2,
  ArrowRight,
  WifiOff,
  Building2,
  HeartPulse,
  Droplets,
  Activity,
  AlertCircle,
  Stethoscope,
  Compass,
  Radio,
  Clock,
  ShieldCheck,
} from 'lucide-react';

interface HomeProps {
  language: Language;
  onOpenSOS: () => void;
  onOpenAINav: () => void;
  onOpenABHA: () => void;
}

export const Home: React.FC<HomeProps> = ({
  language,
  onOpenSOS,
  onOpenAINav,
  onOpenABHA: _onOpenABHA,
}) => {
  const navigate = useNavigate();
  const t = translations[language] || translations.mr;

  return (
    <div className="home-page-container">
      {/* Live State Intelligence Ticker */}
      <div className="live-ticker-strip">
        <div className="ticker-badge">
          <span className="live-radar-ping"></span>
          <Radio size={14} className="ticker-radio-icon" />
          <span>LIVE MAHARASHTRA HEALTH RADAR</span>
        </div>
        <div className="ticker-content-track">
          <div className="ticker-marquee-text">
            <span>🔴 108 Emergency Ambulance Fleet Live Across 36 Districts</span>
            <span className="ticker-divider">•</span>
            <span>🏥 16+ Apex Medical Colleges & Civil Hospitals Synchronized</span>
            <span className="ticker-divider">•</span>
            <span>🐍 Anti-Snake Venom (ASV) Stock Active in Gadchiroli, Palghar & Nandurbar</span>
            <span className="ticker-divider">•</span>
            <span>💳 MJPJAY 2.0 & Ayushman Bharat ₹5 Lakh Cashless Coverage Guarantee</span>
            <span className="ticker-divider">•</span>
            <span>⏱️ 9-Stage Referral Protocol ("इलाज हुआ या नहीं") Tracking Live</span>
          </div>
        </div>
      </div>

      {/* Hero Section */}
      <section className="hero-banner-section">
        <div className="hero-content-left">
          <div className="official-gov-badge">
            <span className="gov-flag">🏛️</span>
            <span>
              {language === 'mr'
                ? 'महाराष्ट्र शासन • सार्वजनिक आरोग्य विभाग'
                : language === 'hi'
                ? 'महाराष्ट्र शासन • सार्वजनिक स्वास्थ्य विभाग'
                : 'Government of Maharashtra • Public Health Department'}
            </span>
          </div>

          <h1 className="hero-main-heading">
            {t.heroTitle1}
            <span className="hero-green-highlight">{t.heroTitleHighlight}</span>
          </h1>

          <p className="hero-subtext">{t.heroSubtitle}</p>

          <div className="hero-action-row">
            <button
              className="hero-primary-btn"
              onClick={() => navigate('/healthcare?nearMe=true')}
              title="Locate Nearest Government Hospital & Check Live Beds"
            >
              <Compass size={18} />
              <span>{t.btnFindFacilities}</span>
            </button>

            <button className="hero-ai-voice-btn" onClick={onOpenAINav} title="AI Symptom Navigator in Marathi, Hindi & English">
              <Sparkles size={18} />
              <span>{t.btnTalkAi}</span>
            </button>

            <button className="hero-sos-btn" onClick={onOpenSOS} title="Trigger 108 Emergency Ambulance Dispatch">
              <ShieldAlert size={18} />
              <span>{t.btnEmergencySOS}</span>
            </button>
          </div>

          {/* Key Value Highlights */}
          <div className="hero-features-strip">
            <div className="feature-item">
              <div className="feature-icon-box">📡</div>
              <div>
                <strong>{t.featureOffline}</strong>
                <small>{t.featureOfflineDesc}</small>
              </div>
            </div>

            <div className="feature-item">
              <div className="feature-icon-box">🗣️</div>
              <div>
                <strong>{t.featureMultilingual}</strong>
                <small>{t.featureMultilingualDesc}</small>
              </div>
            </div>

            <div className="feature-item">
              <div className="feature-icon-box">💳</div>
              <div>
                <strong>{t.featureSchemes}</strong>
                <small>{t.featureSchemesDesc}</small>
              </div>
            </div>

            <div className="feature-item">
              <div className="feature-icon-box">🩺</div>
              <div>
                <strong>{t.featureReferral}</strong>
                <small>{t.featureReferralDesc}</small>
              </div>
            </div>
          </div>
        </div>

        {/* Hero Interactive 3D Map / Visual Preview Card */}
        <div className="hero-visual-card">
          <div className="interactive-map-mock">
            <div className="map-grid-overlay"></div>

            {/* Pulsing Facility Pins across Maharashtra */}
            <div
              className="facility-map-pin pin-sassoon"
              title="Sassoon GH & BJMC Pune"
              onClick={() => navigate('/healthcare?district=Pune')}
            >
              <div className="pin-pulse"></div>
              <span>🏛️ Sassoon GH Pune (Apex GMC)</span>
            </div>

            <div
              className="facility-map-pin pin-kem"
              title="KEM Hospital Mumbai"
              onClick={() => navigate('/healthcare?district=Mumbai+City')}
            >
              <div className="pin-pulse"></div>
              <span>🏥 KEM Hospital Mumbai</span>
            </div>

            <div
              className="facility-map-pin pin-nagpur"
              title="GMCH Nagpur"
              onClick={() => navigate('/healthcare?district=Nagpur')}
            >
              <div className="pin-pulse"></div>
              <span>🏥 GMCH Nagpur (Vidarbha)</span>
            </div>

            <div
              className="facility-map-pin pin-aheri"
              title="SDH Aheri (Gadchiroli Tribal)"
              onClick={() => navigate('/healthcare?district=Gadchiroli')}
            >
              <div className="pin-pulse"></div>
              <span>🐍 SDH Aheri (ASV Ready)</span>
            </div>

            <div
              className="facility-map-pin pin-nashik"
              title="Civil Hospital Nashik"
              onClick={() => navigate('/healthcare?district=Nashik')}
            >
              <div className="pin-pulse"></div>
              <span>🏥 Civil Hospital Nashik</span>
            </div>

            <div
              className="facility-map-pin pin-palghar"
              title="SDH Dahanu Palghar"
              onClick={() => navigate('/healthcare?district=Palghar')}
            >
              <div className="pin-pulse"></div>
              <span>🩺 SDH Dahanu (Palghar Coastal)</span>
            </div>

            <div className="map-floating-summary">
              <div className="summary-indicator">
                <span className="live-dot"></span>
                <strong>{t.liveStatusTitle}</strong>
              </div>
              <div className="summary-stats-line">
                <span>{t.districtsConnected}</span>
                <span>•</span>
                <span>{t.bedsAvailableCount}</span>
                <span>•</span>
                <span>{t.ambulanceActiveCount}</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Quick Services 3D Grid */}
      <section className="quick-services-section">
        <div className="section-title-bar">
          <div>
            <span className="section-kicker">{t.quickAccessTitle}</span>
            <h2>{t.quickAccessSubtitle}</h2>
          </div>
        </div>

        <div className="services-cards-grid">
          {/* Card 1: Find Hospitals & Live Beds */}
          <div className="service-feature-card">
            <div className="card-top-icon blue-theme">
              <Building2 size={24} />
            </div>
            <h3>{t.cardHospitalsTitle}</h3>
            <p>{t.cardHospitalsDesc}</p>
            <button
              className="card-explore-btn"
              onClick={() => navigate('/healthcare')}
            >
              <span>{t.btnExplore}</span>
              <ArrowRight size={14} />
            </button>
          </div>

          {/* Card 2: Blood Bank & e-RaktKosh */}
          <div className="service-feature-card">
            <div className="card-top-icon red-theme">
              <Droplets size={24} />
            </div>
            <h3>Blood Banks & Components</h3>
            <p>Real-time units for A+, B+, AB+, O+ blood and platelets across government blood banks.</p>
            <button
              className="card-explore-btn blood-btn-color"
              onClick={() => navigate('/blood-bank')}
            >
              <span>Check Stocks</span>
              <ArrowRight size={14} />
            </button>
          </div>

          {/* Card 3: 9-Stage Treatment Tracker */}
          <div className="service-feature-card">
            <div className="card-top-icon orange-theme">
              <Activity size={24} />
            </div>
            <h3>9-Stage Referral Tracker</h3>
            <p>Closed-loop patient treatment verification ("इलाज हुआ या नहीं") with digital milestone tracking.</p>
            <button
              className="card-explore-btn"
              onClick={() => navigate('/treatment-tracker')}
            >
              <span>Track Referral</span>
              <ArrowRight size={14} />
            </button>
          </div>

          {/* Card 4: Schemes & MJPJAY 2.0 */}
          <div className="service-feature-card">
            <div className="card-top-icon green-theme">
              <FileText size={24} />
            </div>
            <h3>{t.cardSchemesTitle}</h3>
            <p>{t.cardSchemesDesc}</p>
            <button
              className="card-explore-btn"
              onClick={() => navigate('/schemes')}
            >
              <span>{t.btnCheck}</span>
              <ArrowRight size={14} />
            </button>
          </div>

          {/* Card 5: AI Healthcare Navigator */}
          <div className="service-feature-card highlight-ai-card">
            <div className="card-top-icon purple-theme">
              <Sparkles size={24} />
            </div>
            <h3>{t.cardAiNavTitle}</h3>
            <p>{t.cardAiNavDesc}</p>
            <button className="card-explore-btn ai-btn-color" onClick={onOpenAINav}>
              <span>{t.btnOpen}</span>
              <ArrowRight size={14} />
            </button>
          </div>

          {/* Card 6: 48-Hour Auto-Escalating Grievance Portal */}
          <div className="service-feature-card">
            <div className="card-top-icon crimson-theme">
              <AlertCircle size={24} />
            </div>
            <h3>Grievance & Auto-Escalation</h3>
            <p>Report medicine stockout, staff misbehavior or overcharging with photo proof & 48h SLA escalation.</p>
            <button
              className="card-explore-btn"
              onClick={() => navigate('/grievances')}
            >
              <span>File Grievance</span>
              <ArrowRight size={14} />
            </button>
          </div>
        </div>
      </section>

      {/* Smart Referral Pathway Visual Workflow */}
      <section className="referral-workflow-section">
        <div className="referral-text-content">
          <span className="section-kicker">SMART CLINICAL REFERRAL PROTOCOL</span>
          <h2>{t.referralFlowHeading}</h2>
          <p>{t.referralFlowDesc}</p>

          <div className="referral-highlights-list">
            <div className="highlight-item">
              <CheckCircle2 size={18} className="green-check" />
              <span>{t.refHighlight1}</span>
            </div>
            <div className="highlight-item">
              <CheckCircle2 size={18} className="green-check" />
              <span>{t.refHighlight2}</span>
            </div>
            <div className="highlight-item">
              <CheckCircle2 size={18} className="green-check" />
              <span>{t.refHighlight3}</span>
            </div>
          </div>

          <button
            className="track-flow-btn"
            onClick={() => navigate('/referrals')}
          >
            <span>{t.btnTrackFlow}</span>
          </button>
        </div>

        <div className="workflow-timeline-card">
          <div className="wf-step completed-step">
            <div className="wf-step-dot">1</div>
            <div className="wf-step-info">
              <strong>{t.flowStep1Title}</strong>
              <span>{t.flowStep1Desc}</span>
            </div>
          </div>

          <div className="wf-connector-line"></div>

          <div className="wf-step completed-step">
            <div className="wf-step-dot">2</div>
            <div className="wf-step-info">
              <strong>{t.flowStep2Title}</strong>
              <span>{t.flowStep2Desc}</span>
            </div>
          </div>

          <div className="wf-connector-line"></div>

          <div className="wf-step active-step">
            <div className="wf-step-dot">3</div>
            <div className="wf-step-info">
              <strong>{t.flowStep3Title}</strong>
              <span>{t.flowStep3Desc}</span>
            </div>
          </div>

          <div className="wf-connector-line"></div>

          <div className="wf-step target-step">
            <div className="wf-step-dot">4</div>
            <div className="wf-step-info">
              <strong>{t.flowStep4Title}</strong>
              <span>{t.flowStep4Desc}</span>
            </div>
          </div>
        </div>
      </section>

      {/* Offline & Low Connectivity Banner */}
      <section className="offline-advantage-strip">
        <div className="offline-strip-icon">
          <WifiOff size={32} />
        </div>
        <div className="offline-strip-text">
          <strong>{t.offlineStripTitle}</strong>
          <p>{t.offlineStripDesc}</p>
        </div>
        <div className="offline-active-badge">
          <span className="pulse-green-dot"></span>
          <span>{t.offlineReadyTag}</span>
        </div>
      </section>

      {/* Official Helplines Bar */}
      <section className="helpline-footer-strip">
        <div className="helpline-col">
          <PhoneCall size={20} className="red-phone" />
          <div>
            <strong>108</strong>
            <small>{t.emergencyHelpline108}</small>
          </div>
        </div>

        <div className="helpline-col">
          <HeartPulse size={20} className="green-phone" />
          <div>
            <strong>104</strong>
            <small>{t.healthHelpline104}</small>
          </div>
        </div>

        <div className="helpline-col">
          <FileText size={20} className="blue-phone" />
          <div>
            <strong>155388 / 1800 123 2211</strong>
            <small>{t.mjpjayTitle}</small>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;