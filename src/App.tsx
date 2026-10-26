import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import { Language, translations } from './data/translations';
import { Navbar, UserRole } from './components/Navbar';
import { AINavigator } from './components/AINavigator';
import { EmergencySOSModal } from './components/EmergencySOSModal';
import { ABHALockerModal } from './components/ABHALockerModal';
import { AdminDashboard } from './components/AdminDashboard';
import { Home } from './pages/Home';
import { Healthcare } from './pages/Healthcare';
import { Schemes } from './pages/Schemes';
import { Referral } from './pages/Referral';
import { Patient } from './pages/Patient';
import { Developers } from './pages/Developers';
import { GrievancePortal } from './pages/GrievancePortal';
import { BloodBankPage } from './pages/BloodBank';
import { TreatmentTracker } from './pages/TreatmentTracker';
import { DoctorPortal } from './pages/DoctorPortal';
import { Login } from './pages/Login';
import { InstallAppBanner } from './components/InstallAppBanner';
import {
  initializeOfflineStorage,
  isOfflineMode,
  setOfflineMode,
  getAuthSession,
  clearAuthSession,
  UserAuthSession,
} from './utils/offlineStorage';
import { ShieldAlert, WifiOff } from 'lucide-react';

function AppContent() {
  // Default language is English ('en')
  const [language, setLanguage] = useState<Language>('en');
  const [role, setRole] = useState<UserRole>('patient');
  const [isOffline, setIsOfflineState] = useState<boolean>(false);
  const [authSession, setAuthSessionState] = useState<UserAuthSession | null>(null);

  // Modals
  const [isSOSOpen, setIsSOSOpen] = useState(false);
  const [isAINavOpen, setIsAINavOpen] = useState(false);
  const [isABHAOpen, setIsABHAOpen] = useState(false);

  const t = translations[language] || translations.en;

  useEffect(() => {
    initializeOfflineStorage();
    setIsOfflineState(isOfflineMode());
    const session = getAuthSession();
    setAuthSessionState(session);
    if (session?.isLoggedIn) {
      if (session.role === 'worker') setRole('worker');
      else if (session.role === 'collector' || session.role === 'dho' || session.role === 'admin') setRole('admin');
      else if (session.role === 'doctor') setRole('doctor');
      else setRole('patient');
    }
  }, []);

  const handleToggleOffline = () => {
    const next = !isOffline;
    setIsOfflineState(next);
    setOfflineMode(next);
  };

  const handleLoginSuccess = (session: UserAuthSession) => {
    setAuthSessionState(session);
    if (session.role === 'worker') setRole('worker');
    else if (session.role === 'collector' || session.role === 'dho' || session.role === 'admin') setRole('admin');
    else if (session.role === 'doctor') setRole('doctor');
    else setRole('patient');
  };

  const handleLogout = () => {
    clearAuthSession();
    setAuthSessionState(null);
    setRole('patient');
  };

  return (
    <div className="app-root-layout">
      {/* Top Navbar */}
      <Navbar
        language={language}
        onLanguageChange={setLanguage}
        role={role}
        onRoleChange={setRole}
        isOffline={isOffline}
        onToggleOffline={handleToggleOffline}
        onOpenSOS={() => setIsSOSOpen(true)}
        onOpenABHA={() => setIsABHAOpen(true)}
        onOpenAINav={() => setIsAINavOpen(true)}
        session={authSession}
        onLogout={handleLogout}
      />

      {/* Offline Alert Banner (when simulated offline) */}
      {isOffline && (
        <div className="simulated-offline-banner">
          <WifiOff size={16} />
          <span>
            <strong>{t.offlineMode}:</strong>{' '}
            {language === 'mr'
              ? 'स्थानिक कॅशमधील डेटा वापरला जात आहे. नवीन नोंदणी व रेफरल्स ऑफलाइन सेव्ह होत आहेत.'
              : language === 'hi'
              ? 'स्थानीय कैश का डेटा उपयोग किया जा रहा है। ऑफलाइन मोड सक्रिय है।'
              : 'Using locally cached directory. New patient registrations, referrals and grievances are stored offline.'}
          </span>
        </div>
      )}

      {/* Main Page Routing - Always fully accessible */}
      <main className="main-content-area">
        <Routes>
          <Route
            path="/"
            element={
              <Home
                language={language}
                onOpenSOS={() => setIsSOSOpen(true)}
                onOpenAINav={() => setIsAINavOpen(true)}
                onOpenABHA={() => setIsABHAOpen(true)}
              />
            }
          />
          <Route
            path="/healthcare"
            element={<Healthcare language={language} />}
          />
          <Route
            path="/schemes"
            element={<Schemes language={language} />}
          />
          <Route
            path="/referrals"
            element={<Referral language={language} />}
          />
          <Route
            path="/worker"
            element={<Patient language={language} />}
          />
          <Route
            path="/blood-bank"
            element={<BloodBankPage language={language} />}
          />
          <Route
            path="/grievances"
            element={<GrievancePortal language={language} />}
          />
          <Route
            path="/treatment-tracker"
            element={<TreatmentTracker language={language} />}
          />
          <Route
            path="/doctor-portal"
            element={<DoctorPortal language={language} />}
          />
          <Route
            path="/login"
            element={<Login language={language} onLoginSuccess={handleLoginSuccess} />}
          />
          <Route
            path="/developers"
            element={<Developers language={language} />}
          />
          <Route
            path="/admin"
            element={<AdminDashboard language={language} />}
          />
        </Routes>
      </main>

      {/* Global Modals */}
      <AINavigator
        isOpen={isAINavOpen}
        onClose={() => setIsAINavOpen(false)}
        language={language}
        onOpenSOS={() => setIsSOSOpen(true)}
      />

      <EmergencySOSModal
        isOpen={isSOSOpen}
        onClose={() => setIsSOSOpen(false)}
        language={language}
      />

      <ABHALockerModal
        isOpen={isABHAOpen}
        onClose={() => setIsABHAOpen(false)}
        language={language}
      />

      {/* Floating 108 Emergency SOS Action Button */}
      <button
        className="floating-sos-action-btn"
        onClick={() => setIsSOSOpen(true)}
        title="108 Emergency SOS"
      >
        <ShieldAlert size={26} />
        <span>108 SOS</span>
      </button>

      {/* Floating AI Voice Navigator Button */}
      <button
        className="floating-ai-action-btn"
        onClick={() => setIsAINavOpen(true)}
        title="AI Health Navigator"
      >
        <span className="sparkle-anim">✨</span>
        <span>AI Navigator</span>
      </button>

      {/* Floating PWA Install App Banner */}
      <InstallAppBanner language={language} />

      {/* Government Official Footer */}
      <footer className="gov-official-footer">
        <div className="footer-top-row">
          <div className="footer-brand-col">
            <div className="footer-gov-badge">
              🏛️ <strong>{t.govTopTag}</strong>
            </div>
            <h3>Swasthya Setu Maharashtra</h3>
            <p>{t.footerAbout}</p>
            <div className="footer-dev-credit">
              💡 <strong>Lead Architect & Developer:</strong> Akash Dhakad (AI Core, MITS Gwalior) • Public Health Department, Maharashtra
            </div>
          </div>

          <div className="footer-links-col">
            <h4>Quick Navigation</h4>
            <div className="footer-link-items">
              <a href="/">Home (मुख्य पृष्ठ)</a>
              <a href="/healthcare">Hospitals & Doctors (रुग्णालये व डॉक्टर्स)</a>
              <a href="/blood-bank">e-RaktKosh Blood Bank (रक्तपेढी)</a>
              <a href="/treatment-tracker">Treatment Tracker (इलाज ट्रॅकर)</a>
              <a href="/grievances">Grievance Redressal (तक्रार निवारण)</a>
              <a href="/schemes">MJPJAY 2.0 Schemes (योजना)</a>
              <a href="/referrals">Smart Referral (रेफरल्स)</a>
              <a href="/doctor-portal">Doctor Clinical Portal (डॉक्टर पोर्टल)</a>
              <a href="/worker">ASHA Worker Portal (आरोग्य सेवक)</a>
              <a href="/login">🔐 Official Login (लॉगिन)</a>
              <a href="/developers" className="footer-dev-highlight">🚀 Platform Architecture & Developer</a>
            </div>
          </div>

          <div className="footer-emergency-col">
            <h4>Official Helplines</h4>
            <div className="footer-helpline-box">
              <div>
                <strong>108</strong>
                <span>{t.emergencyHelpline108}</span>
              </div>
              <div>
                <strong>104</strong>
                <span>{t.healthHelpline104}</span>
              </div>
              <div>
                <strong>155388 / 1800 123 2211</strong>
                <span>{t.mjpjayTitle}</span>
              </div>
            </div>
          </div>
        </div>

        <div className="footer-bottom-strip">
          <span>{t.footerRights}</span>
          <span>Engineered by Akash Dhakad (AI Engineering, MITS Gwalior) for Public Health Department, Government of Maharashtra</span>
        </div>
      </footer>
    </div>
  );
}

function App() {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  );
}

export default App;