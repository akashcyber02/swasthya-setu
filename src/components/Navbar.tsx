import React, { useState, useRef, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Language, translations } from '../data/translations';
import { UserAuthSession } from '../utils/offlineStorage';
import {
  ShieldAlert,
  Wifi,
  WifiOff,
  HeartPulse,
  FileText,
  MapPin,
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
  Clock,
  ChevronDown,
  LayoutDashboard,
  Menu,
  X,
  Sparkles,
  Info,
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
  role: _role,
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

  // Dropdown & Menu States
  const [isNotifDropdownOpen, setIsNotifDropdownOpen] = useState(false);
  const [isPortalsDropdownOpen, setIsPortalsDropdownOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const notifRef = useRef<HTMLDivElement>(null);
  const portalsRef = useRef<HTMLDivElement>(null);

  // Close dropdowns on outside click
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (notifRef.current && !notifRef.current.contains(event.target as Node)) {
        setIsNotifDropdownOpen(false);
      }
      if (portalsRef.current && !portalsRef.current.contains(event.target as Node)) {
        setIsPortalsDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setIsMobileMenuOpen(false);
    setIsPortalsDropdownOpen(false);
  }, [location.pathname]);

  const sampleNotifications = [
    {
      id: 'n1',
      title: '🚨 Resource Alert: Anti-Snake Venom (ASV) Stock Updated in Palghar & Gadchiroli',
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

  const isPortalActive =
    location.pathname === '/doctor-portal' ||
    location.pathname === '/worker' ||
    location.pathname === '/admin';

  return (
    <header className="gov-header-wrapper">
      {/* Tri-color Top National Strip */}
      <div className="gov-tricolor-strip">
        <div className="strip-saffron"></div>
        <div className="strip-white"></div>
        <div className="strip-green"></div>
      </div>

      {/* Official 3D Executive Top Utility Bar */}
      <div className="gov-topbar">
        <div className="gov-topbar-inner">
          <div className="gov-badge-group">
            <span className="gov-emblem-icon">🏛️</span>
            <span className="gov-emblem-text">
              <strong>{t.govTopTag}</strong>
            </span>
            <span className="arogya-live-pill">Arogya Seva 24x7</span>
          </div>

          <div className="gov-topbar-actions">
            {/* Language Selector in Top Bar */}
            <div className="topbar-lang-box">
              <select
                aria-label="Language Selector"
                value={language}
                onChange={(e) => onLanguageChange(e.target.value as Language)}
                className="topbar-lang-select"
              >
                <option value="en">🌐 English</option>
                <option value="hi">🇮🇳 हिन्दी</option>
                <option value="mr">🇮🇳 मराठी</option>
              </select>
            </div>

            {/* 108 Emergency SOS Trigger */}
            <button className="topbar-sos-btn" onClick={onOpenSOS}>
              <ShieldAlert size={14} className="sos-pulse-icon" />
              <span>108 SOS</span>
            </button>

            {/* Offline Simulation Toggle */}
            <button
              className={`topbar-network-btn ${isOffline ? 'is-offline' : 'is-online'}`}
              onClick={onToggleOffline}
              title={isOffline ? t.offlineMode : t.onlineMode}
            >
              {isOffline ? <WifiOff size={13} /> : <Wifi size={13} />}
              <span>{isOffline ? 'Offline' : 'Online (Live)'}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Glassmorphic 3D Navbar */}
      <nav className="main-navbar">
        <div className="nav-container-inner">
          {/* 3D Brand Logo & Lockup */}
          <div className="brand-lockup-3d" onClick={() => navigate('/')}>
            <div className="brand-logo-3d">
              <HeartPulse size={24} className="pulse-svg" />
            </div>
            <div className="brand-text-block">
              <div className="brand-heading-3d">
                Swasthya Setu <span className="mh-text">Maharashtra</span>
              </div>
              <div className="brand-sub-caption">
                {language === 'mr'
                  ? 'सार्वजनिक आरोग्य विभाग'
                  : language === 'hi'
                  ? 'सार्वजनिक स्वास्थ्य विभाग'
                  : 'Public Health Department'}
              </div>
            </div>
          </div>

          {/* Desktop Navigation Links */}
          <div className="nav-links-cluster">
            <button
              className={`nav-btn-3d ${location.pathname === '/' ? 'active' : ''}`}
              onClick={() => navigate('/')}
            >
              <span>{t.home}</span>
            </button>

            <button
              className={`nav-btn-3d ${location.pathname === '/healthcare' ? 'active' : ''}`}
              onClick={() => navigate('/healthcare')}
            >
              <MapPin size={14} />
              <span>{language === 'en' ? 'Hospitals & Beds' : t.findHealthcare}</span>
            </button>

            <button
              className={`nav-btn-3d ${location.pathname === '/blood-bank' ? 'active' : ''}`}
              onClick={() => navigate('/blood-bank')}
            >
              <Droplets size={14} />
              <span>{t.navBloodBank}</span>
            </button>

            <button
              className={`nav-btn-3d ${location.pathname === '/treatment-tracker' ? 'active' : ''}`}
              onClick={() => navigate('/treatment-tracker')}
            >
              <Activity size={14} />
              <span>{language === 'en' ? 'Track Referral' : t.navTreatmentTracker}</span>
            </button>

            <button
              className={`nav-btn-3d ${location.pathname === '/grievances' ? 'active' : ''}`}
              onClick={() => navigate('/grievances')}
            >
              <AlertCircle size={14} />
              <span>{t.navGrievances}</span>
            </button>

            <button
              className={`nav-btn-3d ${location.pathname === '/schemes' ? 'active' : ''}`}
              onClick={() => navigate('/schemes')}
            >
              <FileText size={14} />
              <span>MJPJAY</span>
            </button>

            {/* Portals Dropdown */}
            <div className="portals-dropdown-root" ref={portalsRef}>
              <button
                className={`nav-btn-3d dropdown-btn-3d ${isPortalActive ? 'active' : ''}`}
                onClick={() => setIsPortalsDropdownOpen(!isPortalsDropdownOpen)}
              >
                <Stethoscope size={14} />
                <span>Portals</span>
                <ChevronDown
                  size={12}
                  className={`dropdown-arrow ${isPortalsDropdownOpen ? 'rotated' : ''}`}
                />
              </button>

              {isPortalsDropdownOpen && (
                <div className="portals-dropdown-menu-3d">
                  <button
                    className={`dropdown-menu-item-3d ${location.pathname === '/doctor-portal' ? 'active' : ''}`}
                    onClick={() => {
                      setIsPortalsDropdownOpen(false);
                      navigate('/doctor-portal');
                    }}
                  >
                    <div className="item-icon-box doc-icon">
                      <Stethoscope size={16} />
                    </div>
                    <div className="item-details">
                      <strong>Doctor Clinical Portal</strong>
                      <small>OPD, Referrals & Prescriptions</small>
                    </div>
                  </button>

                  <button
                    className={`dropdown-menu-item-3d ${location.pathname === '/worker' ? 'active' : ''}`}
                    onClick={() => {
                      setIsPortalsDropdownOpen(false);
                      onRoleChange('worker');
                      navigate('/worker');
                    }}
                  >
                    <div className="item-icon-box asha-icon">
                      <Users size={16} />
                    </div>
                    <div className="item-details">
                      <strong>ASHA / Frontline Worker</strong>
                      <small>Offline Vitals & Field Referrals</small>
                    </div>
                  </button>

                  <button
                    className={`dropdown-menu-item-3d ${location.pathname === '/admin' ? 'active' : ''}`}
                    onClick={() => {
                      setIsPortalsDropdownOpen(false);
                      onRoleChange('admin');
                      navigate('/admin');
                    }}
                  >
                    <div className="item-icon-box admin-icon">
                      <LayoutDashboard size={16} />
                    </div>
                    <div className="item-details">
                      <strong>District Command Center</strong>
                      <small>36-District Bed & Stock Radar</small>
                    </div>
                  </button>
                </div>
              )}
            </div>

            {/* About & Architecture */}
            <button
              className={`nav-btn-3d dev-pill-3d ${location.pathname === '/developers' ? 'active' : ''}`}
              onClick={() => navigate('/developers')}
              title="Platform Architecture & Lead Developer"
            >
              <Code size={14} />
              <span>Architecture</span>
            </button>
          </div>

          {/* Right Action Tools Cluster */}
          <div className="nav-actions-cluster">
            {/* Notification Bell */}
            <div className="notif-wrapper-3d" ref={notifRef}>
              <button
                className="notif-bell-3d"
                onClick={() => setIsNotifDropdownOpen(!isNotifDropdownOpen)}
                title="Notifications"
                aria-label="Notifications"
              >
                <Bell size={16} />
                <span className="notif-badge-ping"></span>
              </button>

              {isNotifDropdownOpen && (
                <div className="notif-dropdown-3d">
                  <div className="notif-header-3d">
                    <strong>System Alerts</strong>
                    <span className="notif-count-badge">3 New</span>
                  </div>
                  <div className="notif-items-container">
                    {sampleNotifications.map((n) => (
                      <div key={n.id} className={`notif-card-3d type-${n.type}`}>
                        <div className="notif-text">{n.title}</div>
                        <small className="notif-time">
                          <Clock size={11} />
                          <span>{n.time}</span>
                        </small>
                      </div>
                    ))}
                  </div>
                  <button
                    className="notif-footer-btn"
                    onClick={() => {
                      setIsNotifDropdownOpen(false);
                      navigate('/admin');
                    }}
                  >
                    Open District Command Center →
                  </button>
                </div>
              )}
            </div>

            {/* AI Voice Navigator */}
            <button
              className="ai-voice-btn-3d"
              onClick={onOpenAINav}
              title="AI Voice Symptom Navigator"
            >
              <Sparkles size={14} className="sparkle-svg" />
              <span>AI Navigator</span>
            </button>

            {/* ABHA Locker */}
            <button
              className="abha-btn-3d"
              onClick={onOpenABHA}
              title="ABHA Health Locker"
            >
              <Lock size={13} />
              <span>ABHA</span>
            </button>

            {/* Prominent 3D Login / Profile Button */}
            {session?.isLoggedIn ? (
              <div className="user-profile-box-3d" title={`Logged in as ${session.fullName} (${session.role})`}>
                <div className="user-name-pill" onClick={() => navigate('/login')}>
                  <div className="user-avatar-dot">
                    <User size={13} />
                  </div>
                  <div className="user-info-text">
                    <span className="user-firstname">{session.fullName.split(' ')[0]}</span>
                    <span className={`user-role-badge role-${session.role}`}>{session.role}</span>
                  </div>
                </div>
                <button
                  className="user-logout-btn-3d"
                  onClick={onLogout}
                  title="Sign Out / Logout"
                  aria-label="Logout"
                >
                  <LogOut size={13} />
                </button>
              </div>
            ) : (
              <button
                className="login-btn-3d"
                onClick={() => navigate('/login')}
                title="Login to Citizen / Staff Healthcare Portal"
              >
                <div className="login-key-icon-wrapper">
                  <KeyRound size={14} className="key-icon-svg" />
                </div>
                <span className="login-btn-text">Portal Login</span>
              </button>
            )}

            {/* Mobile Hamburger Button */}
            <button
              className="hamburger-btn-3d"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label="Toggle Navigation Menu"
            >
              {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>

        {/* Mobile Responsive Navigation Drawer */}
        {isMobileMenuOpen && (
          <div className="mobile-drawer-3d">
            <div className="mobile-drawer-inner">
              <button
                className={`mobile-link-card ${location.pathname === '/' ? 'active' : ''}`}
                onClick={() => navigate('/')}
              >
                <HeartPulse size={16} />
                <span>{t.home}</span>
              </button>

              <button
                className={`mobile-link-card ${location.pathname === '/healthcare' ? 'active' : ''}`}
                onClick={() => navigate('/healthcare')}
              >
                <MapPin size={16} />
                <span>{t.findHealthcare}</span>
              </button>

              <button
                className={`mobile-link-card ${location.pathname === '/blood-bank' ? 'active' : ''}`}
                onClick={() => navigate('/blood-bank')}
              >
                <Droplets size={16} />
                <span>{t.navBloodBank}</span>
              </button>

              <button
                className={`mobile-link-card ${location.pathname === '/treatment-tracker' ? 'active' : ''}`}
                onClick={() => navigate('/treatment-tracker')}
              >
                <Activity size={16} />
                <span>{t.navTreatmentTracker}</span>
              </button>

              <button
                className={`mobile-link-card ${location.pathname === '/grievances' ? 'active' : ''}`}
                onClick={() => navigate('/grievances')}
              >
                <AlertCircle size={16} />
                <span>{t.navGrievances}</span>
              </button>

              <button
                className={`mobile-link-card ${location.pathname === '/schemes' ? 'active' : ''}`}
                onClick={() => navigate('/schemes')}
              >
                <FileText size={16} />
                <span>{t.schemes}</span>
              </button>

              <div className="mobile-divider">Portals & Tools</div>

              <button
                className={`mobile-link-card ${location.pathname === '/doctor-portal' ? 'active' : ''}`}
                onClick={() => navigate('/doctor-portal')}
              >
                <Stethoscope size={16} />
                <span>Doctor Clinical Portal</span>
              </button>

              <button
                className={`mobile-link-card ${location.pathname === '/worker' ? 'active' : ''}`}
                onClick={() => {
                  onRoleChange('worker');
                  navigate('/worker');
                }}
              >
                <Users size={16} />
                <span>ASHA Frontline Worker</span>
              </button>

              <button
                className={`mobile-link-card ${location.pathname === '/admin' ? 'active' : ''}`}
                onClick={() => {
                  onRoleChange('admin');
                  navigate('/admin');
                }}
              >
                <LayoutDashboard size={16} />
                <span>District Command Center</span>
              </button>

              <button
                className={`mobile-link-card arch-link ${location.pathname === '/developers' ? 'active' : ''}`}
                onClick={() => navigate('/developers')}
              >
                <Code size={16} />
                <span>Platform Architecture & Lead Developer</span>
              </button>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
};

export default Navbar;
