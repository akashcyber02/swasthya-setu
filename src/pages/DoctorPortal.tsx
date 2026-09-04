import React, { useState } from 'react';
import { Language, translations } from '../data/translations';
import {
  DigitalReferral,
  INITIAL_REFERRALS,
} from '../data/maharashtraHealthData';
import {
  getStoredReferrals,
  getAuthSession,
  saveReferral,
} from '../utils/offlineStorage';
import {
  Stethoscope,
  User,
  Activity,
  FileCheck2,
  Send,
  Sparkles,
  ShieldCheck,
  CheckCircle2,
  Pill,
  Microscope,
  ArrowRight,
} from 'lucide-react';

interface DoctorPortalProps {
  language: Language;
}

export const DoctorPortal: React.FC<DoctorPortalProps> = ({ language }) => {
  const t = translations[language] || translations.en;
  const session = getAuthSession();
  const [referrals, setReferrals] = useState<DigitalReferral[]>(getStoredReferrals());
  const [selectedPatient, setSelectedPatient] = useState<DigitalReferral | null>(
    referrals[0] || null
  );

  // Consultation State
  const [clinicalDiagnosis, setClinicalDiagnosis] = useState(
    'Gestational hypertension with mild pre-eclampsia'
  );
  const [prescribedMedicines, setPrescribedMedicines] = useState(
    '1. Tab Labetalol 100mg BD\n2. Tab Calcium & Vitamin D3 OD\n3. Inj Artesunate (if fever)'
  );
  const [orderedLabTests, setOrderedLabTests] = useState(
    'Obstetric Sonography (USG), Urine Protein 24h, Platelet Count'
  );
  const [consultationSuccess, setConsultationSuccess] = useState(false);

  const doctorName = session?.fullName || 'Dr. Kiran Jadhav (MD, DM Cardiology)';
  const doctorReg = session?.licenseNumber || 'MMC-2008/04/1120';
  const hospital = session?.hospitalAffiliation || 'Sassoon General Hospital & B.J. GMC Pune';

  const handleRecordConsultation = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedPatient) return;

    const updatedReferral: DigitalReferral = {
      ...selectedPatient,
      status: 'completed',
      assignedDoctor: doctorName,
      notes: `Consultation Completed by ${doctorName}. Diagnosis: ${clinicalDiagnosis}. Prescription & Lab orders dispatched.`,
    };

    const updatedList = saveReferral(updatedReferral);
    setReferrals(updatedList);
    setSelectedPatient(updatedReferral);
    setConsultationSuccess(true);
  };

  return (
    <div className="doctor-portal-page-container">
      {/* Doctor Header Banner */}
      <div className="doctor-header-banner">
        <div className="doc-avatar-seal">
          <Stethoscope size={32} />
        </div>
        <div className="doc-title-info">
          <div className="gov-seal-badge">
            🏛️ <strong>{t.govTopTag}</strong> | Medical Officer Clinical Registry
          </div>
          <h1>{doctorName}</h1>
          <div className="doc-credentials-line">
            <span><strong>Reg No:</strong> {doctorReg}</span> •{' '}
            <span><strong>Hospital:</strong> {hospital}</span> •{' '}
            <span className="doc-status-online">🟢 Active OPD Duty</span>
          </div>
        </div>
      </div>

      {/* Main 2-Column Doctor Workflow */}
      <div className="doctor-grid-layout">
        {/* Left Column: Assigned / Referred Patients Queue */}
        <div className="patients-queue-card">
          <div className="queue-header">
            <Activity size={20} className="queue-icon" />
            <div>
              <h3>{t.assignedPatientsQueue}</h3>
              <small>{referrals.length} Patient(s) In Clinic</small>
            </div>
          </div>

          <div className="queue-patient-items">
            {referrals.map((pat) => (
              <button
                key={pat.id}
                className={`queue-patient-btn ${selectedPatient?.id === pat.id ? 'active' : ''}`}
                onClick={() => {
                  setSelectedPatient(pat);
                  setConsultationSuccess(false);
                }}
              >
                <div className="pat-btn-top">
                  <strong>{pat.patientName}</strong>
                  <span className={`urgency-tag ${pat.urgency}`}>
                    {pat.urgency.toUpperCase()}
                  </span>
                </div>
                <div className="pat-btn-meta">
                  <span>{pat.patientAge} Yrs, {pat.patientGender}</span> •{' '}
                  <span>{pat.village}</span>
                </div>
                <div className="pat-btn-reason">"{pat.referralReason}"</div>
              </button>
            ))}
          </div>
        </div>

        {/* Right Column: Clinical Examination & Prescription */}
        <div className="clinical-exam-card">
          {selectedPatient ? (
            <div>
              <div className="clinical-patient-top">
                <div>
                  <span className="pat-ref-chip">{selectedPatient.id}</span>
                  <h2>{selectedPatient.patientName}</h2>
                  <div className="pat-sub-meta">
                    <span>Age: {selectedPatient.patientAge} Yrs ({selectedPatient.patientGender})</span> •{' '}
                    <span>Village: {selectedPatient.village}, {selectedPatient.district}</span>
                  </div>
                </div>

                {/* Vitals Box */}
                <div className="patient-vitals-strip">
                  <div className="vital-chip">
                    <small>BP</small>
                    <strong>{selectedPatient.vitals.bp}</strong>
                  </div>
                  <div className="vital-chip">
                    <small>SpO2</small>
                    <strong>{selectedPatient.vitals.spo2}</strong>
                  </div>
                  <div className="vital-chip">
                    <small>Pulse</small>
                    <strong>{selectedPatient.vitals.pulse}</strong>
                  </div>
                </div>
              </div>

              {consultationSuccess && (
                <div className="consultation-success-banner">
                  <CheckCircle2 size={22} className="green-check" />
                  <div>
                    <strong>Consultation & Electronic Prescription Recorded!</strong>
                    <p>Referral marked completed and synced with MJPJAY cashless pharmacy & lab queue.</p>
                  </div>
                </div>
              )}

              {/* Consultation Form */}
              <form onSubmit={handleRecordConsultation} className="clinical-notes-form">
                <div className="form-group-item">
                  <label>
                    <strong>Clinical Diagnosis / Doctor's Assessment:</strong>
                  </label>
                  <input
                    type="text"
                    value={clinicalDiagnosis}
                    onChange={(e) => setClinicalDiagnosis(e.target.value)}
                    className="doctor-input"
                    required
                  />
                </div>

                <div className="form-group-item">
                  <label>
                    <Microscope size={16} />
                    <strong>Order Laboratory & Diagnostic Tests:</strong>
                  </label>
                  <input
                    type="text"
                    value={orderedLabTests}
                    onChange={(e) => setOrderedLabTests(e.target.value)}
                    className="doctor-input"
                    placeholder="e.g., CBC, Ultrasound Sonography, 20WBCT, Serum Creatinine..."
                  />
                </div>

                <div className="form-group-item">
                  <label>
                    <Pill size={16} />
                    <strong>Prescribe Essential Medicines (Free Govt / MJPJAY):</strong>
                  </label>
                  <textarea
                    rows={4}
                    value={prescribedMedicines}
                    onChange={(e) => setPrescribedMedicines(e.target.value)}
                    className="doctor-textarea"
                    placeholder="Enter medicine names, dosage, duration..."
                    required
                  />
                </div>

                <div className="form-actions-footer">
                  <button type="submit" className="doctor-submit-btn">
                    <FileCheck2 size={18} />
                    <span>{t.btnCompleteConsultation}</span>
                    <ArrowRight size={16} />
                  </button>
                </div>
              </form>
            </div>
          ) : (
            <div className="no-patient-selected">
              <User size={40} />
              <p>Select a patient from the waiting queue to begin clinical examination.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default DoctorPortal;
