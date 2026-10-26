import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Language, translations } from '../data/translations';
import {
  AuthRole,
  UserAuthSession,
  setAuthSession,
  getAuthSession,
  clearAuthSession,
} from '../utils/offlineStorage';
import {
  ShieldCheck,
  Smartphone,
  KeyRound,
  UserCheck,
  Lock,
  ArrowRight,
  LogOut,
  Stethoscope,
  Users,
  Building,
  Activity,
  Award,
  CheckCircle2,
  HeartPulse,
} from 'lucide-react';

interface LoginProps {
  language: Language;
  onLoginSuccess: (session: UserAuthSession) => void;
}

export const Login: React.FC<LoginProps> = ({ language, onLoginSuccess }) => {
  const navigate = useNavigate();
  const currentSession = getAuthSession();
  const [selectedRole, setSelectedRole] = useState<AuthRole>(currentSession?.role || 'patient');
  const [mobileNumber, setMobileNumber] = useState(currentSession?.mobile || '9822144910');
  const [fullName, setFullName] = useState(currentSession?.fullName || 'Sunita Ravindra Jadhav');
  const [otpStep, setOtpStep] = useState<'mobile' | 'otp' | 'authenticated'>(
    currentSession?.isLoggedIn ? 'authenticated' : 'mobile'
  );
  const [enteredOtp, setEnteredOtp] = useState('123456');
  const [otpError, setOtpError] = useState('');

  const handleRoleChange = (r: AuthRole) => {
    setSelectedRole(r);
    if (r === 'patient') {
      setFullName('Sunita Ravindra Jadhav');
      setMobileNumber('9822144910');
    } else if (r === 'doctor') {
      setFullName('Dr. Kiran Jadhav (MD, DM Cardiology)');
      setMobileNumber('9822455010');
    } else if (r === 'worker') {
      setFullName('Mandakini Kadam (ASHA Worker)');
      setMobileNumber('9421888320');
    } else if (r === 'collector' || r === 'dho') {
      setFullName('Dr. Rajesh Deshmukh (District Collector)');
      setMobileNumber('9422001122');
    } else {
      setFullName('State Health Administrator');
      setMobileNumber('9822009988');
    }
  };

  const handleSendOtp = (e: React.FormEvent) => {
    e.preventDefault();
    if (mobileNumber.length < 10) {
      setOtpError(language === 'mr' ? 'कृपया वैध १०-अंकी मोबाईल नंबर टाका.' : 'Please enter a valid 10-digit mobile number.');
      return;
    }
    setOtpError('');
    setOtpStep('otp');
  };

  const handleVerifyOtp = (e: React.FormEvent) => {
    e.preventDefault();
    if (enteredOtp !== '123456' && enteredOtp.length !== 6) {
      setOtpError(language === 'mr' ? 'अवैध OTP. डेमोसाठी "123456" वापरा.' : 'Invalid OTP. Use "123456" for demo authentication.');
      return;
    }

    const session: UserAuthSession = {
      isLoggedIn: true,
      mobile: mobileNumber,
      fullName: fullName,
      role: selectedRole,
      abhaId: selectedRole === 'patient' ? '91-8842-1920-5512' : undefined,
      licenseNumber: selectedRole === 'doctor' ? 'MMC-2008/04/1120' : undefined,
      hospitalAffiliation:
        selectedRole === 'doctor' || selectedRole === 'hospital_staff'
          ? 'Sassoon General Hospital & B.J. GMC Pune'
          : undefined,
      district: 'Pune',
    };

    setAuthSession(session);
    setOtpStep('authenticated');
    onLoginSuccess(session);

    // Auto-redirect to appropriate portal
    if (selectedRole === 'doctor') navigate('/doctor-portal');
    else if (selectedRole === 'worker') navigate('/worker');
    else if (selectedRole === 'collector' || selectedRole === 'dho' || selectedRole === 'admin') navigate('/admin');
    else navigate('/');
  };

  const handleLogout = () => {
    clearAuthSession();
    setOtpStep('mobile');
    setOtpError('');
  };

  return (
    <div className="login-fullpage-wrapper">
      <div className="login-page-container">
        {/* Left Col: Brand & Govt Info */}
        <div className="login-brand-panel">
          <div className="login-gov-seal">
            <HeartPulse size={36} />
          </div>

          <div className="login-tagline">
            🏛️ <strong>सार्वजनिक आरोग्य विभाग, महाराष्ट्र शासन</strong>
            <h1>Swasthya Setu Maharashtra</h1>
            <p>
              Unified Healthcare Authentication Gateway for Citizens, Doctors, ASHA Workers, and District Administrators across Maharashtra.
            </p>
          </div>

          <div className="security-features-list">
            <div className="sec-feature-item">
              <ShieldCheck size={18} className="green-check" />
              <span>Ayushman Bharat Digital Mission (ABDM) Compliant</span>
            </div>
            <div className="sec-feature-item">
              <Lock size={18} className="green-check" />
              <span>Mobile OTP Two-Factor Authentication</span>
            </div>
            <div className="sec-feature-item">
              <Award size={18} className="green-check" />
              <span>Role-Based Access Control (RBAC) Data Security</span>
            </div>
          </div>
        </div>

        {/* Right Col: Login Form */}
        <div className="login-card-panel">
          {otpStep === 'authenticated' ? (
            <div className="authenticated-view-box">
              <div className="auth-avatar-circle">
                <UserCheck size={40} />
              </div>
              <h2>
                {language === 'mr' ? 'प्रमाणीकरण यशस्वी' : language === 'hi' ? 'सत्यापन सफल' : 'Successfully Verified & Logged In'}
              </h2>
              <div className="auth-info-card">
                <div>
                  <strong>{language === 'mr' ? 'नाव:' : language === 'hi' ? 'नाम:' : 'Full Name:'}</strong>{' '}
                  <span>{currentSession?.fullName || fullName}</span>
                </div>
                <div>
                  <strong>{language === 'mr' ? 'मोबाईल:' : language === 'hi' ? 'मोबाइल:' : 'Mobile Number:'}</strong>{' '}
                  <span>+91 {currentSession?.mobile || mobileNumber}</span>
                </div>
                <div>
                  <strong>{language === 'mr' ? 'भूमिका (Role):' : language === 'hi' ? 'भूमिका (Role):' : 'Active Role:'}</strong>{' '}
                  <span className="role-tag-badge">{currentSession?.role || selectedRole}</span>
                </div>
                {currentSession?.abhaId && (
                  <div>
                    <strong>ABHA Health ID:</strong> <span>{currentSession.abhaId}</span>
                  </div>
                )}
                {currentSession?.licenseNumber && (
                  <div>
                    <strong>MMC Reg No:</strong> <span>{currentSession.licenseNumber}</span>
                  </div>
                )}
              </div>

              <div className="auth-portal-buttons">
                {selectedRole === 'doctor' ? (
                  <button className="goto-portal-btn" onClick={() => navigate('/doctor-portal')}>
                    <span>Open Doctor Clinical Portal →</span>
                  </button>
                ) : selectedRole === 'worker' ? (
                  <button className="goto-portal-btn" onClick={() => navigate('/worker')}>
                    <span>Open ASHA Worker Portal →</span>
                  </button>
                ) : selectedRole === 'collector' || selectedRole === 'dho' || selectedRole === 'admin' ? (
                  <button className="goto-portal-btn" onClick={() => navigate('/admin')}>
                    <span>Open District Command Center →</span>
                  </button>
                ) : (
                  <button className="goto-portal-btn" onClick={() => navigate('/')}>
                    <span>Continue to Patient Home →</span>
                  </button>
                )}

                <button className="logout-action-btn" onClick={handleLogout}>
                  <LogOut size={16} />
                  <span>Log Out (लॉगआउट)</span>
                </button>
              </div>
            </div>
          ) : otpStep === 'mobile' ? (
            <form onSubmit={handleSendOtp} className="main-login-form">
              <div className="form-header-row">
                <h3>Select Access Role & Login</h3>
                <small>Secure OTP Verification</small>
              </div>

              {/* Role Select Grid */}
              <div className="role-buttons-grid">
                <button
                  type="button"
                  className={`role-select-btn ${selectedRole === 'patient' ? 'active' : ''}`}
                  onClick={() => handleRoleChange('patient')}
                >
                  <Users size={16} />
                  <span>Citizen / Patient</span>
                </button>

                <button
                  type="button"
                  className={`role-select-btn ${selectedRole === 'doctor' ? 'active' : ''}`}
                  onClick={() => handleRoleChange('doctor')}
                >
                  <Stethoscope size={16} />
                  <span>Doctor / MO</span>
                </button>

                <button
                  type="button"
                  className={`role-select-btn ${selectedRole === 'worker' ? 'active' : ''}`}
                  onClick={() => handleRoleChange('worker')}
                >
                  <Activity size={16} />
                  <span>ASHA Worker</span>
                </button>

                <button
                  type="button"
                  className={`role-select-btn ${selectedRole === 'collector' || selectedRole === 'dho' ? 'active' : ''}`}
                  onClick={() => handleRoleChange('collector')}
                >
                  <Building size={16} />
                  <span>DHO / Collector</span>
                </button>
              </div>

              {/* Full Name */}
              <div className="form-group-item">
                <label>
                  {language === 'mr' ? 'पूर्ण नाव:' : language === 'hi' ? 'पूरा नाम:' : 'Full Name:'}
                </label>
                <input
                  type="text"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  className="fullpage-login-input"
                  required
                />
              </div>

              {/* Mobile */}
              <div className="form-group-item">
                <label>
                  {language === 'mr'
                    ? 'नोंदणीकृत मोबाईल नंबर (१० अंक):'
                    : language === 'hi'
                    ? 'पंजीकृत मोबाइल नंबर (१० अंक):'
                    : 'Registered Mobile Number:'}
                </label>
                <div className="mobile-prefix-wrap">
                  <span>🇮🇳 +91</span>
                  <input
                    type="tel"
                    value={mobileNumber}
                    onChange={(e) => setMobileNumber(e.target.value.replace(/\D/g, '').slice(0, 10))}
                    placeholder="98XXXXXXXX"
                    className="fullpage-login-input"
                    required
                  />
                </div>
              </div>

              {otpError && <div className="login-error-alert">{otpError}</div>}

              <button type="submit" className="login-btn-primary">
                <Smartphone size={18} />
                <span>Send 6-Digit OTP (OTP पाठवा)</span>
                <ArrowRight size={16} />
              </button>
            </form>
          ) : (
            <form onSubmit={handleVerifyOtp} className="main-login-form">
              <div className="otp-sent-banner">
                <Smartphone size={20} />
                <div>
                  <strong>OTP sent to:</strong> +91 {mobileNumber}
                  <div className="demo-otp-tag">💡 Demo OTP: <strong>123456</strong></div>
                </div>
              </div>

              <div className="form-group-item">
                <label>Enter 6-Digit OTP:</label>
                <div className="otp-input-field-wrap">
                  <KeyRound size={20} />
                  <input
                    type="text"
                    value={enteredOtp}
                    onChange={(e) => setEnteredOtp(e.target.value.slice(0, 6))}
                    maxLength={6}
                    placeholder="123456"
                    className="fullpage-login-input otp-large-input"
                    autoFocus
                    required
                  />
                </div>
              </div>

              {otpError && <div className="login-error-alert">{otpError}</div>}

              <div className="otp-actions-row">
                <button
                  type="button"
                  className="login-back-btn"
                  onClick={() => setOtpStep('mobile')}
                >
                  ← Back
                </button>
                <button type="submit" className="login-btn-primary">
                  <Lock size={18} />
                  <span>Verify OTP & Enter Portal</span>
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default Login;
