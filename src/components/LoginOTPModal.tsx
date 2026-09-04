import React, { useState } from 'react';
import { Language } from '../data/translations';
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
  X,
  UserCheck,
  Lock,
  ArrowRight,
  LogOut,
  Stethoscope,
  Users,
  Building,
  Activity,
  Award,
} from 'lucide-react';

interface LoginOTPModalProps {
  isOpen: boolean;
  onClose: () => void;
  language: Language;
  onLoginSuccess: (session: UserAuthSession) => void;
}

export const LoginOTPModal: React.FC<LoginOTPModalProps> = ({
  isOpen,
  onClose,
  language,
  onLoginSuccess,
}) => {
  const currentSession = getAuthSession();
  const [mobileNumber, setMobileNumber] = useState(currentSession?.mobile || '9822144910');
  const [fullName, setFullName] = useState(currentSession?.fullName || 'Sunita Ravindra Jadhav');
  const [selectedRole, setSelectedRole] = useState<AuthRole>(currentSession?.role || 'patient');
  const [otpStep, setOtpStep] = useState<'mobile' | 'otp' | 'authenticated'>(
    currentSession?.isLoggedIn ? 'authenticated' : 'mobile'
  );
  const [enteredOtp, setEnteredOtp] = useState('123456');
  const [otpError, setOtpError] = useState('');

  if (!isOpen) return null;

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
      fullName: fullName || (selectedRole === 'doctor' ? 'Dr. Kiran Jadhav' : 'Sunita Ravindra Jadhav'),
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
  };

  const handleLogout = () => {
    clearAuthSession();
    setOtpStep('mobile');
    setOtpError('');
    onClose();
  };

  return (
    <div className="modal-backdrop-blur">
      <div className="login-otp-modal-box">
        {/* Header */}
        <div className="login-modal-header">
          <div className="login-header-title">
            <ShieldCheck size={24} className="gold-shield-icon" />
            <div>
              <h3>
                {language === 'mr'
                  ? 'सुरक्षित OTP लॉगिन व भूमिका निवड (RBAC)'
                  : language === 'hi'
                  ? 'सुरक्षित OTP लॉगिन एवं भूमिका चयन (RBAC)'
                  : 'Secure Mobile OTP Login & Role Access (RBAC)'}
              </h3>
              <span>
                {language === 'mr'
                  ? 'सार्वजनिक आरोग्य विभाग, महाराष्ट्र शासन'
                  : language === 'hi'
                  ? 'सार्वजनिक स्वास्थ्य विभाग, महाराष्ट्र शासन'
                  : 'Public Health Department, Govt of Maharashtra'}
              </span>
            </div>
          </div>
          <button className="modal-close-btn" onClick={onClose}>
            <X size={20} />
          </button>
        </div>

        {/* Modal Body */}
        <div className="login-modal-body">
          {otpStep === 'authenticated' ? (
            <div className="authenticated-session-card">
              <div className="auth-success-circle">
                <UserCheck size={36} />
              </div>
              <h3>
                {language === 'mr' ? 'सक्रिय सत्र (Active Session)' : language === 'hi' ? 'सक्रिय सत्र (Active Session)' : 'Active Verified Session'}
              </h3>
              <div className="auth-details-box">
                <div>
                  <strong>{language === 'mr' ? 'नाव:' : language === 'hi' ? 'नाम:' : 'Name:'}</strong>{' '}
                  <span>{currentSession?.fullName || fullName}</span>
                </div>
                <div>
                  <strong>{language === 'mr' ? 'मोबाईल:' : language === 'hi' ? 'मोबाइल:' : 'Mobile:'}</strong>{' '}
                  <span>{currentSession?.mobile || mobileNumber}</span>
                </div>
                <div>
                  <strong>{language === 'mr' ? 'भूमिका (Role):' : language === 'hi' ? 'भूमिका (Role):' : 'Role:'}</strong>{' '}
                  <span className="role-tag-badge">{currentSession?.role || selectedRole}</span>
                </div>
                {currentSession?.abhaId && (
                  <div>
                    <strong>ABHA ID:</strong> <span>{currentSession.abhaId}</span>
                  </div>
                )}
                {currentSession?.licenseNumber && (
                  <div>
                    <strong>MMC Reg No:</strong> <span>{currentSession.licenseNumber}</span>
                  </div>
                )}
              </div>

              <div className="auth-actions-row">
                <button className="auth-done-btn" onClick={onClose}>
                  {language === 'mr' ? 'सुरू ठेवा (Continue)' : language === 'hi' ? 'जारी रखें (Continue)' : 'Continue to Dashboard'}
                </button>
                <button className="auth-logout-btn" onClick={handleLogout}>
                  <LogOut size={16} />
                  <span>{language === 'mr' ? 'लॉगआउट' : language === 'hi' ? 'लॉगआउट' : 'Log Out'}</span>
                </button>
              </div>
            </div>
          ) : otpStep === 'mobile' ? (
            <form onSubmit={handleSendOtp} className="login-form">
              {/* Role Selection */}
              <div className="form-group-item">
                <label>
                  {language === 'mr'
                    ? 'लॉगिन भूमिका निवडा (Role-Based Access):'
                    : language === 'hi'
                    ? 'लॉगिन भूमिका चुनें (Role-Based Access):'
                    : 'Select Your Access Role (RBAC):'}
                </label>
                <div className="role-options-grid">
                  <button
                    type="button"
                    className={`role-option-btn ${selectedRole === 'patient' ? 'active-role' : ''}`}
                    onClick={() => {
                      setSelectedRole('patient');
                      setFullName('Sunita Ravindra Jadhav');
                      setMobileNumber('9822144910');
                    }}
                  >
                    <Users size={18} />
                    <div>
                      <strong>Patient / Citizen</strong>
                      <small>Personal records, tokens & complaints</small>
                    </div>
                  </button>

                  <button
                    type="button"
                    className={`role-option-btn ${selectedRole === 'doctor' ? 'active-role' : ''}`}
                    onClick={() => {
                      setSelectedRole('doctor');
                      setFullName('Dr. Kiran Jadhav');
                      setMobileNumber('9822455010');
                    }}
                  >
                    <Stethoscope size={18} />
                    <div>
                      <strong>Doctor / MO</strong>
                      <small>Patient clinical queue & lab orders</small>
                    </div>
                  </button>

                  <button
                    type="button"
                    className={`role-option-btn ${selectedRole === 'worker' ? 'active-role' : ''}`}
                    onClick={() => {
                      setSelectedRole('worker');
                      setFullName('Mandakini Kadam (ASHA)');
                      setMobileNumber('9421888320');
                    }}
                  >
                    <Activity size={18} />
                    <div>
                      <strong>ASHA / Health Worker</strong>
                      <small>Village referrals & registrations</small>
                    </div>
                  </button>

                  <button
                    type="button"
                    className={`role-option-btn ${selectedRole === 'collector' || selectedRole === 'dho' ? 'active-role' : ''}`}
                    onClick={() => {
                      setSelectedRole('collector');
                      setFullName('Dr. Rajesh Deshmukh (Collector)');
                      setMobileNumber('9422001122');
                    }}
                  >
                    <Building size={18} />
                    <div>
                      <strong>Collector / DHO</strong>
                      <small>36-district command analytics</small>
                    </div>
                  </button>
                </div>
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
                  placeholder="Enter full name..."
                  className="login-input-field"
                  required
                />
              </div>

              {/* Mobile Number */}
              <div className="form-group-item">
                <label>
                  {language === 'mr'
                    ? 'नोंदणीकृत मोबाईल नंबर (१० अंक):'
                    : language === 'hi'
                    ? 'पंजीकृत मोबाइल नंबर (१० अंक):'
                    : 'Registered Mobile Number (10 digits):'}
                </label>
                <div className="mobile-input-wrap">
                  <span className="country-prefix">🇮🇳 +91</span>
                  <input
                    type="tel"
                    value={mobileNumber}
                    onChange={(e) => setMobileNumber(e.target.value.replace(/\D/g, '').slice(0, 10))}
                    placeholder="98XXXXXXXX"
                    className="login-input-field"
                    required
                  />
                </div>
              </div>

              {otpError && <div className="login-error-msg">{otpError}</div>}

              <button type="submit" className="login-submit-btn">
                <Smartphone size={18} />
                <span>
                  {language === 'mr'
                    ? 'OTP पाठवा (Send OTP)'
                    : language === 'hi'
                    ? 'OTP भेजें (Send OTP)'
                    : 'Send 6-Digit OTP'}
                </span>
                <ArrowRight size={16} />
              </button>
            </form>
          ) : (
            <form onSubmit={handleVerifyOtp} className="login-form">
              <div className="otp-sent-banner">
                <Smartphone size={20} />
                <div>
                  <strong>
                    {language === 'mr' ? 'OTP पाठवला आहे:' : language === 'hi' ? 'OTP भेजा गया है:' : 'OTP Sent to:'}
                  </strong>{' '}
                  <span>+91 {mobileNumber}</span>
                  <div className="demo-otp-hint">💡 Demo OTP: <strong>123456</strong></div>
                </div>
              </div>

              <div className="form-group-item">
                <label>
                  {language === 'mr' ? '६-अंकी OTP टाका:' : language === 'hi' ? '६-अंकों का OTP दर्ज करें:' : 'Enter 6-Digit OTP:'}
                </label>
                <div className="otp-input-wrap">
                  <KeyRound size={20} className="key-icon" />
                  <input
                    type="text"
                    value={enteredOtp}
                    onChange={(e) => setEnteredOtp(e.target.value.slice(0, 6))}
                    maxLength={6}
                    placeholder="123456"
                    className="login-input-field otp-big-input"
                    autoFocus
                    required
                  />
                </div>
              </div>

              {otpError && <div className="login-error-msg">{otpError}</div>}

              <div className="otp-buttons-row">
                <button
                  type="button"
                  className="otp-back-btn"
                  onClick={() => setOtpStep('mobile')}
                >
                  {language === 'mr' ? '← मागे' : language === 'hi' ? '← वापस' : '← Back'}
                </button>
                <button type="submit" className="login-submit-btn">
                  <Lock size={18} />
                  <span>
                    {language === 'mr'
                      ? 'सत्यापित करा व लॉगिन करा'
                      : language === 'hi'
                      ? 'सत्यापित करें एवं लॉगिन करें'
                      : 'Verify OTP & Login'}
                  </span>
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default LoginOTPModal;
