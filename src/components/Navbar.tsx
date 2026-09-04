import React, { useState, useRef, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Language, translations } from '../data/translations';
import { UserAuthSession, clearAuthSession } from '../utils/offlineStorage';
import {
  ShieldAlert,
  Wifi,
  WifiOff,
  HeartPulse,
  FileText,
  MapPin,
  GitPullRequest,
  Users,
  Lock,
  Code,
  Droplets,
  Activity,
  AlertCircle,
  Stethoscope,
  Bell,
  User,
  KeyRound,
  LogOut,
  CheckCircle2,
  Clock,
} from 'lucide-react';

export type UserRole = 'patient' | 'worker' | 'admin' | 'doctor';

interface NavbarProps {
  language: Language;
  onLanguageChange: (lang: Language) => void;
  role: UserRole;
  onRoleChange: (role: UserRole) => void;
  isOffline: boolean;
  onToggleOffline: () => void;
  onOpenSOS: () => void;
  onOpenABHA: () => void;
  onOpenAINav: () => void;
  session: UserAuthSession | null;
  onLogout: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  language,
  onLanguageChange,
  role,
  onRoleChange,
  isOffline,
  onToggleOffline,
  onOpenSOS,
  onOpenABHA,
  onOpenAINav,
  session,
  onLogout,
}) => {
  const navigate = useNavigate();
  const location = useLocation();
  const t = translations[language] || translations.en;

  // Inline Notification Dropdown State
  const [isNotifDropdownOpen, setIsNotifDropdownOpen] = useState(false);
  const notifRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (notifRef.current && !notifRef.current.contains(event.target as Node)) {
        setIsNotifDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const sampleNotifications = [
    {
      id: 'n1',
      title: '🚨 Critical Resource Alert: ASV Stock Low',
      time: '10 Mins ago',
      type: 'alert',
    },
    {
      id: 'n2',
      title: '🎫 Your OPD Token #27 is Next in Queue',
      time: '18 Mins ago',
      type: 'info',
    },
    {
      id: 'n3',
      title: '🩺 New Referral Assigned: MH-REF-2026-8841',
      time: '45 Mins ago',
      type: 'warning',
    },
  ];

  return (
    <header className="gov-header-wrapper">
      {/* Tri-color Top Strip */}
      <div className="gov-tricolor-strip">
        <div className="strip-saffron"></div>
        <div className="strip-white"></div>
        <div className="strip-green"></div>
      </div>

      {/* Official Government Top Bar */}
      <div className="gov-topbar">
        <div className="gov-topbar-content">
          <div className="gov-badge-group">
            <span className="gov-emblem-text">
              🏛️ <strong>{t.govTopTag}</strong> | Government of Maharashtra
            </span>
            <span className="sih-tag">SIH26133</span>
          </div>

          <div className="gov-topbar-actions">
            {/* 108 Emergency SOS Trigger */}
            <button className="sos-pill-btn" onClick={onOpenSOS}>
              <ShieldAlert size={16} className="sos-pulse-icon" />
              <span>{t.sosEmergency}</span>
            </button>

            {/* Offline Simulation Toggle */}
            <button
              className={`network-toggle-btn ${isOffline ? 'is-offline' : 'is-online'}`}
              onClick={onToggleOffline}
              title={isOffline ? t.offlineMode : t.onlineMode}
            >
              {isOffline ? <WifiOff size={14} /> : <Wifi size={14} />}
              <span>{isOffline ? t.offlineMode : t.onlineMode}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Navigation Bar */}
      <nav className="main-navbar">
        <div className="nav-container">
          {/* Logo & Brand */}
          <div className="brand-lockup" onClick={() => navigate('/')}>
            <div className="brand-logo-seal">
              <HeartPulse size={24} />
            </div>
            <div className="brand-titles">
              <div className="brand-main-title">
                Swasthya Setu <span>Maharashtra</span>
              </div>
              <div className="brand-sub-title">
                {language === 'mr'
                  ? 'सार्वजनिक आरोग्य विभाग, महाराष्ट्र शासन'
                  : language === 'hi'
                  ? 'सार्वजनिक स्वास्थ्य विभाग, महाराष्ट्र शासन'
                  : 'Public Health Department, Government of Maharashtra'}
              </div>
            </div>
          </div>

          {/* Nav Links */}
          <div className="nav-links">
            <button
              className={`nav-link-btn ${location.pathname === '/' ? 'active' : ''}`}
              onClick={() => navigate('/')}
            >
              {t.home}
            </button>

            <button
              className={`nav-link-btn ${location.pathname === '/healthcare' ? 'active' : ''}`}
              onClick={() => navigate('/healthcare')}
            >
              <MapPin size={14} />
              <span>{t.findHealthcare}</span>
            </button>

            <button
              className={`nav-link-btn ${location.pathname === '/blood-bank' ? 'active' : ''}`}
              onClick={() => navigate('/blood-bank')}
            >
              <Droplets size={14} />
              <span>{t.navBloodBank}</span>
            </button>

            <button
              className={`nav-link-btn ${location.pathname === '/treatment-tracker' ? 'active' : ''}`}
              onClick={() => navigate('/treatment-tracker')}
            >
              <Activity size={14} />
              <span>{t.navTreatmentTracker}</span>
            </button>

            <button
              className={`nav-link-btn ${location.pathname === '/grievances' ? 'active' : ''}`}
              onClick={() => navigate('/grievances')}
            >
              <AlertCircle size={14} />
              <span>{t.navGrievances}</span>
            </button>

            <button
              className={`nav-link-btn ${location.pathname === '/schemes' ? 'active' : ''}`}
              onClick={() => navigate('/schemes')}
            >
              <FileText size={14} />
              <span>{t.schemes}</span>
            </button>

            <button
              className={`nav-link-btn ${location.pathname === '/doctor-portal' ? 'active' : ''}`}
              onClick={() => navigate('/doctor-portal')}
            >
              <Stethoscope size={14} />
              <span>{t.navDoctorPortal}</span>
            </button>

            {/* Worker Portal Link */}
            <button
              className={`nav-link-btn ${location.pathname === '/worker' ? 'active' : ''}`}
              onClick={() => {
                onRoleChange('worker');
                navigate('/worker');
              }}
            >
              <Users size={14} />
              <span>{t.workerPortal}</span>
            </button>

            {/* Developers Link */}
            <button
              className={`nav-link-btn dev-highlight-link ${location.pathname === '/developers' ? 'active' : ''}`}
              onClick={() => navigate('/developers')}
            >
              <Code size={14} />
              <span>
                {language === 'mr' ? 'डेव्हलपर्स' : language === 'hi' ? 'डेवलपर्स' : 'Developers'}
              </span>
            </button>
          </div>

          {/* Right Tools */}
          <div className="nav-right-tools">
            {/* Inline Notification Bell with Dropdown */}
            <div className="notif-dropdown-wrapper" ref={notifRef}>
              <button
                className="notif-bell-btn"
                onClick={() => setIsNotifDropdownOpen(!isNotifDropdownOpen)}
                title="Notifications"
              >
                <Bell size={18} />
                <span className="notif-badge-dot"></span>
              </button>

              {isNotifDropdownOpen && (
                <div className="inline-notif-dropdown">
                  <div className="dropdown-header-bar">
                    <strong>Notifications</strong>
                    <span className="unread-count-pill">3 New</span>
                  </div>
                  <div className="dropdown-items-list">
                    {sampleNotifications.map((n) => (
                      <div key={n.id} className={`dropdown-notif-item type-${n.type}`}>
                        <div className="notif-item-text">{n.title}</div>
                        <small className="notif-item-time">
                          <Clock size={11} />
                          <span>{n.time}</span>
                        </small>
                      </div>
                    ))}
                  </div>
                  <button
                    className="dropdown-view-all"
                    onClick={() => {
                      setIsNotifDropdownOpen(false);
                      navigate('/admin');
                    }}
                  >
                    View All in Command Center →
                  </button>
                </div>
              )}
            </div>

            {/* Login / Profile / Logout Buttons */}
            {session?.isLoggedIn ? (
              <div className="nav-logged-in-box">
                <div className="nav-user-chip" onClick={() => navigate('/login')}>
                  <User size={14} />
                  <span>
                    <strong>{session.fullName.split(' ')[0]}</strong> ({session.role})
                  </span>
                </div>
                <button
                  className="nav-logout-btn"
                  onClick={onLogout}
                  title="Log Out of this session"
                >
                  <LogOut size={14} />
                  <span>Logout</span>
                </button>
              </div>
            ) : (
              <button
                className="auth-profile-chip-btn"
                onClick={() => navigate('/login')}
              >
                <KeyRound size={14} />
                <span>{t.navLoginOtp}</span>
              </button>
            )}

            {/* AI Navigator */}
            <button className="ai-nav-chip-btn" onClick={onOpenAINav}>
              <span className="sparkle-emoji">✨</span>
              <span>AI Navigator</span>
            </button>

            {/* ABHA Locker */}
            <button className="abha-locker-btn" onClick={onOpenABHA} title={t.abhaLocker}>
              <Lock size={14} />
              <span>ABHA</span>
            </button>

            {/* Language Selector */}
            <div className="lang-select-container">
              <select
                aria-label="Language Selector"
                value={language}
                onChange={(e) => onLanguageChange(e.target.value as Language)}
                className="language-selector"
              >
                <option value="en">🌐 English</option>
                <option value="hi">🇮🇳 हिन्दी</option>
                <option value="mr">🇮🇳 मराठी</option>
              </select>
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
