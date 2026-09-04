import React, { useState, useRef } from 'react';
import { Language, translations } from '../data/translations';
import {
  Grievance,
  GrievanceCategory,
  MAHARASHTRA_FACILITIES,
} from '../data/maharashtraHealthData';
import {
  getStoredGrievances,
  saveGrievance,
} from '../utils/offlineStorage';
import {
  ShieldAlert,
  Search,
  CheckCircle2,
  Clock,
  AlertTriangle,
  Send,
  Building,
  PhoneCall,
  Mail,
  ArrowRight,
  FileText,
  User,
  Sparkles,
  Camera,
  Image as ImageIcon,
  UploadCloud,
  X,
  Eye,
  FileCheck2,
} from 'lucide-react';

interface GrievancePortalProps {
  language: Language;
}

// Sample demo proof images for instant one-click testing
const DEMO_EVIDENCE_PHOTOS = [
  {
    name: 'Hospital Bill Receipt (Overcharge)',
    url: 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?auto=format&fit=crop&w=600&q=80',
  },
  {
    name: 'Pharmacy Out-of-Stock Board',
    url: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?auto=format&fit=crop&w=600&q=80',
  },
  {
    name: 'Ward Sanitation Condition',
    url: 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&w=600&q=80',
  },
];

export const GrievancePortal: React.FC<GrievancePortalProps> = ({ language }) => {
  const t = translations[language] || translations.en;
  const [grievances, setGrievances] = useState<Grievance[]>(getStoredGrievances());
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedGrievance, setSelectedGrievance] = useState<Grievance | null>(
    grievances[0] || null
  );

  // Form State
  const [patientName, setPatientName] = useState('Sunita Ravindra Jadhav');
  const [patientMobile, setPatientMobile] = useState('9822144910');
  const [selectedFacilityId, setSelectedFacilityId] = useState(
    MAHARASHTRA_FACILITIES[0]?.id || 'fac-pun-02'
  );
  const [category, setCategory] = useState<GrievanceCategory>('MJPJAY Scheme Denied');
  const [description, setDescription] = useState('');
  const [photoUrl, setPhotoUrl] = useState<string | null>(null);
  const [photoName, setPhotoName] = useState<string | null>(null);
  const [showSuccessId, setShowSuccessId] = useState<string | null>(null);
  const [previewZoomModal, setPreviewZoomModal] = useState<string | null>(null);

  const fileInputRef = useRef<HTMLInputElement>(null);

  // File Upload Handler
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setPhotoName(file.name);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPhotoUrl(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSelectDemoPhoto = (item: { name: string; url: string }) => {
    setPhotoUrl(item.url);
    setPhotoName(item.name);
  };

  const handleRemovePhoto = () => {
    setPhotoUrl(null);
    setPhotoName(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleSubmitGrievance = (e: React.FormEvent) => {
    e.preventDefault();
    const facility =
      MAHARASHTRA_FACILITIES.find((f) => f.id === selectedFacilityId) ||
      MAHARASHTRA_FACILITIES[0];

    const randomNum = Math.floor(1000 + Math.random() * 9000);
    const newId = `MH-GRV-2026-${randomNum}`;

    const newGrievance: Grievance = {
      id: newId,
      patientName,
      patientMobile,
      facilityId: facility.id,
      facilityName: facility.name,
      district: facility.district,
      category,
      description,
      photoUrl: photoUrl || undefined,
      photoName: photoName || undefined,
      submittedAt: new Date().toLocaleString(),
      status: 'submitted',
      currentLevel: `Level 1: Hospital Grievance Cell (${facility.name})`,
      escalationDaysRemaining: 2,
      auditTrail: [
        {
          timestamp: new Date().toLocaleString(),
          level: 'Level 1: Hospital Grievance Cell',
          action: 'Complaint Registered',
          actor: `${patientName} (Mobile OTP Verified)`,
          comment: `Auto-assigned to Medical Superintendent ${facility.director?.name || ''} with 48h resolution SLA.${photoUrl ? ' Photo evidence attached.' : ''}`,
        },
      ],
    };

    const updated = saveGrievance(newGrievance);
    setGrievances(updated);
    setSelectedGrievance(newGrievance);
    setShowSuccessId(newId);
    setDescription('');
    setPhotoUrl(null);
    setPhotoName(null);
  };

  const filteredGrievances = grievances.filter((g) => {
    return (
      g.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      g.patientName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      g.facilityName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      g.district.toLowerCase().includes(searchQuery.toLowerCase())
    );
  });

  return (
    <div className="grievance-page-container">
      {/* Header Banner */}
      <div className="grievance-header-banner">
        <div className="gov-seal-badge">
          🏛️ <strong>{t.govTopTag}</strong> | Public Grievance Portal
        </div>
        <h1>{t.grievanceTitle}</h1>
        <p>{t.grievanceSubtitle}</p>

        {/* Helplines Bar */}
        <div className="grievance-helplines-strip">
          <div className="helpline-pill">
            <PhoneCall size={16} />
            <span>
              <strong>104 / 1800 123 2211</strong> (24x7 Toll-Free Maharashtra)
            </span>
          </div>
          <div className="helpline-pill">
            <Mail size={16} />
            <span>grievance.health@maharashtra.gov.in</span>
          </div>
        </div>
      </div>

      {/* Main 2-Column Grid */}
      <div className="grievance-two-col-grid">
        {/* Left Col: Submit New Grievance Form */}
        <div className="grievance-form-card">
          <div className="card-top-title">
            <ShieldAlert size={22} className="alert-red-icon" />
            <div>
              <h2>{t.btnSubmitGrievance}</h2>
              <small>
                {language === 'mr'
                  ? 'सर्व शासकीय व MJPJAY संलग्न रुग्णालयांसाठी थेट तक्रार कक्ष (फोटो पुराव्यासह)'
                  : language === 'hi'
                  ? 'सभी सरकारी व MJPJAY सूचीबद्ध अस्पतालों के लिए सीधी शिकायत (फोटो सबूत सहित)'
                  : 'Direct escalation to Hospital Superintendent & District Health Officer'}
              </small>
            </div>
          </div>

          {showSuccessId && (
            <div className="grievance-success-alert">
              <CheckCircle2 size={24} className="green-check" />
              <div>
                <strong>{t.grievanceSubmittedSuccess}</strong>
                <p>
                  Reference ID: <strong>{showSuccessId}</strong> (SMS alert dispatched to {patientMobile}).
                </p>
              </div>
            </div>
          )}

          <form onSubmit={handleSubmitGrievance} className="submit-grievance-form">
            {/* Patient Name */}
            <div className="form-group-item">
              <label>
                {language === 'mr' ? 'तक्रारदाराचे नाव:' : language === 'hi' ? 'शिकायतकर्ता का नाम:' : 'Complainant Full Name:'}
              </label>
              <input
                type="text"
                value={patientName}
                onChange={(e) => setPatientName(e.target.value)}
                className="grievance-input"
                required
              />
            </div>

            {/* Mobile */}
            <div className="form-group-item">
              <label>
                {language === 'mr' ? 'मोबाईल नंबर (SMS ट्रॅकिंगसाठी):' : language === 'hi' ? 'मोबाइल नंबर (SMS ट्रैकिंग हेतु):' : 'Mobile Number (for SMS Tracking):'}
              </label>
              <input
                type="tel"
                value={patientMobile}
                onChange={(e) => setPatientMobile(e.target.value)}
                className="grievance-input"
                required
              />
            </div>

            {/* Hospital Select */}
            <div className="form-group-item">
              <label>
                {language === 'mr' ? 'संबंधित आरोग्य केंद्र / रुग्णालय:' : language === 'hi' ? 'संबंधित अस्पताल / स्वास्थ्य केंद्र:' : 'Concerned Hospital / Facility:'}
              </label>
              <select
                value={selectedFacilityId}
                onChange={(e) => setSelectedFacilityId(e.target.value)}
                className="grievance-select"
              >
                {MAHARASHTRA_FACILITIES.map((f) => (
                  <option key={f.id} value={f.id}>
                    {f.name} ({f.district} - {f.taluka})
                  </option>
                ))}
              </select>
            </div>

            {/* Category Select */}
            <div className="form-group-item">
              <label>{t.grievanceCategory}</label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value as GrievanceCategory)}
                className="grievance-select"
              >
                <option value="MJPJAY Scheme Denied">MJPJAY Scheme Denied / Cashless Rejection</option>
                <option value="Medicine Stockout">Medicine Stockout / Free Drug Denied</option>
                <option value="Staff Behavior">Staff Behavior / Rude Conduct</option>
                <option value="Overcharging / Bribe">Overcharging / Illegal Deposit / Bribe</option>
                <option value="Ambulance Delay">108 Ambulance Delay / Refusal</option>
                <option value="Sanitation & Hygiene">Hospital Hygiene & Cleanliness</option>
                <option value="Doctor Absenteeism">Doctor Absenteeism / OPD Delayed</option>
              </select>
            </div>

            {/* Description */}
            <div className="form-group-item">
              <label>{t.grievanceDescription}</label>
              <textarea
                rows={4}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Describe the incident with date, ward number, doctor/staff name, and details..."
                className="grievance-textarea"
                required
              />
            </div>

            {/* OPTIONAL PHOTO EVIDENCE UPLOAD SECTION */}
            <div className="form-group-item photo-evidence-section">
              <div className="photo-label-row">
                <label className="photo-main-label">
                  <Camera size={16} />
                  <span>
                    {language === 'mr'
                      ? 'समस्येचा फोटो / बिल / पुरावा जोडा'
                      : language === 'hi'
                      ? 'समस्या की फोटो / बिल / सबूत जोड़ें'
                      : 'Attach Photo Evidence / Bill / Proof'}
                  </span>
                  <span className="optional-tag">
                    {language === 'mr' ? '(ऐच्छिक / Optional)' : language === 'hi' ? '(ऐच्छिक / Optional)' : '(Optional)'}
                  </span>
                </label>
              </div>

              {/* Hidden file input */}
              <input
                type="file"
                ref={fileInputRef}
                accept="image/*"
                onChange={handleFileUpload}
                style={{ display: 'none' }}
              />

              {!photoUrl ? (
                <div className="photo-upload-dropzone">
                  <div className="dropzone-actions">
                    <button
                      type="button"
                      className="upload-trigger-btn"
                      onClick={() => fileInputRef.current?.click()}
                    >
                      <UploadCloud size={18} />
                      <span>
                        {language === 'mr'
                          ? 'गॅलरीतून किंवा कॅमेऱ्यातून फोटो निवडा'
                          : language === 'hi'
                          ? 'गैलरी या कैमरे से फोटो चुनें'
                          : 'Choose Image from Device / Camera'}
                      </span>
                    </button>
                  </div>

                  {/* One-click demo photos for presentation */}
                  <div className="demo-photo-pills-row">
                    <small>Quick Demo Proofs:</small>
                    {DEMO_EVIDENCE_PHOTOS.map((dp, idx) => (
                      <button
                        key={idx}
                        type="button"
                        className="demo-photo-pill"
                        onClick={() => handleSelectDemoPhoto(dp)}
                      >
                        <ImageIcon size={12} />
                        <span>{dp.name}</span>
                      </button>
                    ))}
                  </div>
                </div>
              ) : (
                <div className="photo-preview-card">
                  <div className="preview-img-wrapper">
                    <img src={photoUrl} alt="Uploaded Proof Preview" className="preview-thumbnail" />
                    <button
                      type="button"
                      className="remove-photo-btn"
                      onClick={handleRemovePhoto}
                      title="Remove Photo"
                    >
                      <X size={14} />
                    </button>
                  </div>
                  <div className="preview-meta-info">
                    <div className="meta-title">
                      <FileCheck2 size={14} className="green-check" />
                      <strong>{photoName || 'Attached Evidence Photo'}</strong>
                    </div>
                    <small>Photo attached to grievance reference. Will be reviewed by Medical Superintendent.</small>
                  </div>
                </div>
              )}
            </div>

            <button type="submit" className="submit-grievance-btn">
              <Send size={18} />
              <span>
                {language === 'mr'
                  ? 'तक्रार नोंदवा (Register Grievance)'
                  : language === 'hi'
                  ? 'शिकायत दर्ज करें (Register Grievance)'
                  : 'Submit Official Grievance'}
              </span>
            </button>
          </form>
        </div>

        {/* Right Col: Live Status & 4-Level Auto-Escalation Tracker */}
        <div className="grievance-tracking-card">
          <div className="tracking-search-bar">
            <Search size={18} />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={t.grievanceIdPlaceholder}
              className="tracking-search-input"
            />
          </div>

          {/* Grievance Select Chips */}
          <div className="grievance-chips-scroll">
            {filteredGrievances.map((g) => (
              <button
                key={g.id}
                className={`grievance-pill-btn ${selectedGrievance?.id === g.id ? 'active' : ''}`}
                onClick={() => setSelectedGrievance(g)}
              >
                <strong>{g.id}</strong>
                <span>{g.category}</span>
                <div className="chip-bottom-row">
                  <small className={`status-badge-chip ${g.status}`}>{g.status.toUpperCase()}</small>
                  {g.photoUrl && <span className="photo-attached-tag">📷 Photo</span>}
                </div>
              </button>
            ))}
          </div>

          {/* Selected Grievance Detail Card */}
          {selectedGrievance ? (
            <div className="selected-grievance-detail">
              <div className="detail-top-row">
                <div>
                  <span className="grv-id-pill">{selectedGrievance.id}</span>
                  <h3>{selectedGrievance.category}</h3>
                  <div className="grv-facility-name">
                    <Building size={15} />
                    <span>
                      {selectedGrievance.facilityName} ({selectedGrievance.district})
                    </span>
                  </div>
                </div>

                <div className={`large-status-badge ${selectedGrievance.status}`}>
                  {selectedGrievance.status === 'resolved' ? (
                    <>
                      <CheckCircle2 size={16} />
                      <span>{t.grievanceResolvedBadge}</span>
                    </>
                  ) : selectedGrievance.status === 'under_review' ? (
                    <>
                      <Clock size={16} />
                      <span>{t.grievanceReviewBadge}</span>
                    </>
                  ) : (
                    <>
                      <AlertTriangle size={16} />
                      <span>{t.grievanceEscalatedBadge}</span>
                    </>
                  )}
                </div>
              </div>

              <div className="grv-description-box">
                <strong>
                  {language === 'mr' ? 'तक्रारीचा सारांश:' : language === 'hi' ? 'शिकायत का सारांश:' : 'Grievance Description:'}
                </strong>
                <p>"{selectedGrievance.description}"</p>
                <small>Submitted by: {selectedGrievance.patientName} on {selectedGrievance.submittedAt}</small>
              </div>

              {/* ATTACHED PHOTO PROOF CARD (IF PRESENT) */}
              {selectedGrievance.photoUrl && (
                <div className="attached-evidence-card">
                  <div className="evidence-header">
                    <Camera size={16} />
                    <strong>Attached Evidence / Proof Photo:</strong>
                    <button
                      type="button"
                      className="zoom-photo-btn"
                      onClick={() => setPreviewZoomModal(selectedGrievance.photoUrl || null)}
                    >
                      <Eye size={13} />
                      <span>Enlarge View</span>
                    </button>
                  </div>
                  <div
                    className="evidence-img-frame"
                    onClick={() => setPreviewZoomModal(selectedGrievance.photoUrl || null)}
                  >
                    <img
                      src={selectedGrievance.photoUrl}
                      alt="Grievance Evidence Proof"
                      className="evidence-img"
                    />
                  </div>
                </div>
              )}

              {/* 4-Stage Escalation Visual Timeline */}
              <div className="escalation-timeline-section">
                <h4>{t.grievanceEscalationTimeline}</h4>

                <div className="escalation-steps-wrapper">
                  {/* Step 1: Hospital */}
                  <div className="escalation-step completed">
                    <div className="step-marker-circle">1</div>
                    <div className="step-content">
                      <strong>{t.level1Hospital}</strong>
                      <span>Hospital Grievance Redressal Cell (RH/SDH/GMC)</span>
                    </div>
                  </div>

                  {/* Step 2: DHO */}
                  <div
                    className={`escalation-step ${selectedGrievance.status === 'escalated_dho' || selectedGrievance.status === 'resolved' ? 'completed' : 'active'}`}
                  >
                    <div className="step-marker-circle">2</div>
                    <div className="step-content">
                      <strong>{t.level2DHO}</strong>
                      <span>District Health Officer / Civil Surgeon Oversight</span>
                    </div>
                  </div>

                  {/* Step 3: Commissioner */}
                  <div
                    className={`escalation-step ${selectedGrievance.status === 'escalated_commissioner' ? 'active' : 'pending'}`}
                  >
                    <div className="step-marker-circle">3</div>
                    <div className="step-content">
                      <strong>{t.level3Commissioner}</strong>
                      <span>State Health Commissioner & Apex Redressal Cell</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Resolution Note or SLA */}
              {selectedGrievance.resolutionNote ? (
                <div className="resolution-note-box">
                  <CheckCircle2 size={20} className="green-check" />
                  <div>
                    <strong>Action Taken Report (ATR):</strong>
                    <p>{selectedGrievance.resolutionNote}</p>
                  </div>
                </div>
              ) : (
                <div className="sla-countdown-box">
                  <Clock size={18} className="sla-clock" />
                  <span>
                    Auto-Escalation SLA: Resolution due within <strong>48 Hours</strong>. If unaddressed, automatically escalates to District Health Officer (DHO {selectedGrievance.district}).
                  </span>
                </div>
              )}

              {/* Audit Trail */}
              <div className="audit-trail-box">
                <strong>Audit Trail & Logs:</strong>
                <ul>
                  {selectedGrievance.auditTrail.map((log, idx) => (
                    <li key={idx}>
                      <span className="log-time">{log.timestamp}</span> •{' '}
                      <strong>{log.action}</strong> by <em>{log.actor}</em>
                      {log.comment && <div className="log-comment">"{log.comment}"</div>}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ) : (
            <div className="no-selection-placeholder">
              <FileText size={40} />
              <p>Select a grievance reference ID from the list to view live escalation tracking.</p>
            </div>
          )}
        </div>
      </div>

      {/* Enlarged Photo Modal */}
      {previewZoomModal && (
        <div className="photo-zoom-modal-backdrop" onClick={() => setPreviewZoomModal(null)}>
          <div className="photo-zoom-modal-card" onClick={(e) => e.stopPropagation()}>
            <div className="zoom-header">
              <strong>Attached Photo Evidence</strong>
              <button onClick={() => setPreviewZoomModal(null)} className="close-zoom-btn">
                <X size={18} />
              </button>
            </div>
            <div className="zoom-body">
              <img src={previewZoomModal} alt="Enlarged Proof" className="zoom-full-img" />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default GrievancePortal;
