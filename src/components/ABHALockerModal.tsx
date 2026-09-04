import React, { useState } from 'react';
import { Language } from '../data/translations';
import {
  ShieldCheck,
  QrCode,
  FileText,
  Download,
  Printer,
  X,
  User,
  Calendar,
  Syringe,
  Activity,
  HeartPulse,
} from 'lucide-react';

interface ABHALockerModalProps {
  isOpen: boolean;
  onClose: () => void;
  language: Language;
}

export const ABHALockerModal: React.FC<ABHALockerModalProps> = ({
  isOpen,
  onClose,
  language,
}) => {
  const [activeTab, setActiveTab] = useState<'card' | 'prescriptions' | 'labs' | 'vaccines'>('card');

  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="abha-modal-card">
        {/* Header */}
        <div className="abha-modal-header">
          <div className="abha-header-brand">
            <div className="abha-seal-icon">
              <ShieldCheck size={24} />
            </div>
            <div>
              <h3>आभा (ABHA) डिजिटल हेल्थ लॉकर</h3>
              <span>Ayushman Bharat Digital Mission | Government of Maharashtra</span>
            </div>
          </div>
          <button className="modal-close-icon-btn" onClick={onClose}>
            <X size={20} />
          </button>
        </div>

        {/* Tab Navigation */}
        <div className="abha-tab-bar">
          <button
            className={`abha-tab-btn ${activeTab === 'card' ? 'active-tab' : ''}`}
            onClick={() => setActiveTab('card')}
          >
            <User size={16} />
            <span>ABHA Card</span>
          </button>
          <button
            className={`abha-tab-btn ${activeTab === 'prescriptions' ? 'active-tab' : ''}`}
            onClick={() => setActiveTab('prescriptions')}
          >
            <FileText size={16} />
            <span>प्रिस्क्रिप्शन (Rx)</span>
          </button>
          <button
            className={`abha-tab-btn ${activeTab === 'labs' ? 'active-tab' : ''}`}
            onClick={() => setActiveTab('labs')}
          >
            <Activity size={16} />
            <span>चाचणी अहवाल (Labs)</span>
          </button>
          <button
            className={`abha-tab-btn ${activeTab === 'vaccines' ? 'active-tab' : ''}`}
            onClick={() => setActiveTab('vaccines')}
          >
            <Syringe size={16} />
            <span>लसीकरण नोंद (Vaccine)</span>
          </button>
        </div>

        {/* Tab Content */}
        <div className="abha-modal-body">
          {activeTab === 'card' && (
            <div className="abha-card-view">
              {/* Digital ABHA Card Representation */}
              <div className="official-abha-card">
                <div className="abha-card-top">
                  <div className="emblem-row">
                    <span className="gov-text">महाराष्ट्र शासन | National Health Authority</span>
                  </div>
                  <div className="abha-logo-badge">ABHA</div>
                </div>

                <div className="abha-card-main">
                  <div className="abha-avatar-box">
                    <User size={45} className="abha-avatar" />
                  </div>

                  <div className="abha-person-details">
                    <h4>Sunita Ravindra Jadhav</h4>
                    <div className="abha-id-highlight">
                      <span>ABHA Number:</span>
                      <strong>91-8842-1920-5512</strong>
                    </div>
                    <div className="abha-meta-row">
                      <span>ABHA Address: sunita.jadhav@abdm</span>
                      <span>Gender: Female | Age: 29 Yrs</span>
                      <span>District: Pune, Maharashtra</span>
                    </div>
                  </div>

                  <div className="abha-qr-box">
                    <div className="qr-sim">
                      <QrCode size={65} />
                    </div>
                    <small>Scan at PHC/Hospital</small>
                  </div>
                </div>

                <div className="abha-card-footer">
                  <span>MJPJAY 2.0 & PM-JAY Integrated</span>
                  <span>100% Cashless Verification Ready</span>
                </div>
              </div>

              <div className="abha-card-actions">
                <button
                  className="download-abha-btn"
                  onClick={() => alert('ABHA Card downloaded in offline wallet!')}
                >
                  <Download size={16} />
                  <span>Download Digital Card (PDF)</span>
                </button>
                <button
                  className="print-abha-btn"
                  onClick={() => window.print()}
                >
                  <Printer size={16} />
                  <span>Print Card</span>
                </button>
              </div>
            </div>
          )}

          {activeTab === 'prescriptions' && (
            <div className="records-list">
              <div className="record-item-card">
                <div className="record-icon blue-bg">
                  <FileText size={20} />
                </div>
                <div className="record-details">
                  <strong>OPD Prescription - Antenatal Care (ANC Followup)</strong>
                  <span>Facility: Rural Hospital (CHC) Bhor | Dr. Anjali Deshmukh</span>
                  <small>Date: 28 Aug 2026 | Medicines: IFA Tablets, Calcium 500mg, Folic Acid</small>
                </div>
                <button
                  className="view-doc-btn"
                  onClick={() => alert('Viewing Digital Prescription Slip')}
                >
                  पहा / View
                </button>
              </div>

              <div className="record-item-card">
                <div className="record-icon green-bg">
                  <HeartPulse size={20} />
                </div>
                <div className="record-details">
                  <strong>General OPD - Acute Bronchitis & Fever</strong>
                  <span>Facility: PHC Kuran | Dr. V. S. Patil (MO)</span>
                  <small>Date: 12 July 2026 | Medicines: Amoxicillin 500mg, Paracetamol 650mg</small>
                </div>
                <button
                  className="view-doc-btn"
                  onClick={() => alert('Viewing Digital Prescription Slip')}
                >
                  पहा / View
                </button>
              </div>
            </div>
          )}

          {activeTab === 'labs' && (
            <div className="records-list">
              <div className="record-item-card">
                <div className="record-icon purple-bg">
                  <Activity size={20} />
                </div>
                <div className="record-details">
                  <strong>Obstetric Ultrasound (USG) Scan Report</strong>
                  <span>Facility: Sub-District Hospital Bhor | Single Live Intrauterine Pregnancy</span>
                  <small>Date: 25 Aug 2026 | Status: Normal Growth (32 Weeks)</small>
                </div>
                <button
                  className="view-doc-btn"
                  onClick={() => alert('Viewing Lab Report')}
                >
                  रिपोर्ट / PDF
                </button>
              </div>

              <div className="record-item-card">
                <div className="record-icon orange-bg">
                  <Activity size={20} />
                </div>
                <div className="record-details">
                  <strong>Complete Blood Count (CBC) & Sickle Cell Screen</strong>
                  <span>Facility: PHC Pathology Unit | Hb: 11.2 gm/dl, Sickle Test: Negative</span>
                  <small>Date: 14 Aug 2026 | Verified by Govt Laboratory Technician</small>
                </div>
                <button
                  className="view-doc-btn"
                  onClick={() => alert('Viewing Lab Report')}
                >
                  रिपोर्ट / PDF
                </button>
              </div>
            </div>
          )}

          {activeTab === 'vaccines' && (
            <div className="records-list">
              <div className="record-item-card">
                <div className="record-icon green-bg">
                  <Syringe size={20} />
                </div>
                <div className="record-details">
                  <strong>Tetanus & Diphtheria (Td) Adult Vaccine</strong>
                  <span>Dose 2 Completed | Administered by ASHA Mandakini Kadam</span>
                  <small>Date: 20 Aug 2026 | Batch: TD-MH-99120</small>
                </div>
                <span className="verified-chip">✓ पूर्ण / Completed</span>
              </div>

              <div className="record-item-card">
                <div className="record-icon green-bg">
                  <Syringe size={20} />
                </div>
                <div className="record-details">
                  <strong>COVID-19 Booster Precaution Dose</strong>
                  <span>Covishield | Certified by Public Health Department</span>
                  <small>Date: 10 Jan 2024</small>
                </div>
                <span className="verified-chip">✓ पूर्ण / Completed</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
