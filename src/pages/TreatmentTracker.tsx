import React, { useState } from 'react';
import { Language, translations } from '../data/translations';
import { PatientTreatmentJourney } from '../data/maharashtraHealthData';
import {
  getStoredTreatmentJourneys,
  updateTreatmentStage,
  getAuthSession,
} from '../utils/offlineStorage';
import {
  Activity,
  Search,
  CheckCircle2,
  Clock,
  CircleDot,
  User,
  ShieldCheck,
  Building,
  HeartPulse,
  Award,
  Sparkles,
  ArrowRight,
  FileCheck2,
} from 'lucide-react';

interface TreatmentTrackerProps {
  language: Language;
}

export const TreatmentTracker: React.FC<TreatmentTrackerProps> = ({ language }) => {
  const t = translations[language] || translations.en;
  const [journeys, setJourneys] = useState<PatientTreatmentJourney[]>(
    getStoredTreatmentJourneys()
  );
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedJourney, setSelectedJourney] = useState<PatientTreatmentJourney | null>(
    journeys[0] || null
  );
  const [activeStageUpdateNotes, setActiveStageUpdateNotes] = useState('');
  const session = getAuthSession();

  const handleUpdateStage = (stageNum: number) => {
    if (!selectedJourney) return;
    const actorName = session?.fullName || 'Duty Medical Officer';
    const updated = updateTreatmentStage(
      selectedJourney.referralId,
      stageNum,
      activeStageUpdateNotes || 'Treatment step completed and recorded in clinical registry.',
      actorName
    );
    setJourneys(updated);
    const refreshed = updated.find((j) => j.referralId === selectedJourney.referralId);
    if (refreshed) setSelectedJourney(refreshed);
    setActiveStageUpdateNotes('');
  };

  const filteredJourneys = journeys.filter((j) => {
    return (
      j.referralId.toLowerCase().includes(searchQuery.toLowerCase()) ||
      j.patientName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      j.village.toLowerCase().includes(searchQuery.toLowerCase()) ||
      j.district.toLowerCase().includes(searchQuery.toLowerCase())
    );
  });

  return (
    <div className="treatment-tracker-page-container">
      {/* Top Header Banner */}
      <div className="treatment-header-banner">
        <div className="gov-seal-badge">
          🏛️ <strong>{t.govTopTag}</strong> | Clinical Tracking Engine
        </div>
        <h1>{t.treatmentTrackerTitle}</h1>
        <p>{t.treatmentTrackerSubtitle}</p>
      </div>

      {/* Search & Select Strip */}
      <div className="treatment-search-strip">
        <div className="search-box-wrap">
          <Search size={18} />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search Referral ID (e.g. MH-REF-2026-8841), Patient Name, or Village..."
            className="treatment-search-input"
          />
        </div>

        <div className="journey-chips-row">
          {filteredJourneys.map((j) => (
            <button
              key={j.referralId}
              className={`journey-select-chip ${selectedJourney?.referralId === j.referralId ? 'active' : ''}`}
              onClick={() => setSelectedJourney(j)}
            >
              <div className="chip-ref-id">{j.referralId}</div>
              <div className="chip-pat-name">{j.patientName}</div>
              <small>Stage {j.currentStageIndex} of 9</small>
            </button>
          ))}
        </div>
      </div>

      {/* Selected Journey View */}
      {selectedJourney && (
        <div className="journey-main-card">
          {/* Patient Overview Header */}
          <div className="journey-pat-header">
            <div className="pat-header-info">
              <div className="pat-avatar-box">
                <User size={28} />
              </div>
              <div>
                <div className="pat-ref-tag">Referral ID: {selectedJourney.referralId}</div>
                <h2>{selectedJourney.patientName}</h2>
                <div className="pat-meta-details">
                  <span>{selectedJourney.patientAge} Yrs • {selectedJourney.patientGender}</span>
                  <span>Village: {selectedJourney.village} ({selectedJourney.district})</span>
                  <span>ABHA: {selectedJourney.abhaId}</span>
                </div>
              </div>
            </div>

            <div className="mjpjay-verified-pill">
              <ShieldCheck size={20} />
              <div>
                <strong>MJPJAY 2.0 Cashless Verified</strong>
                <small>100% Free Treatment Guaranteed</small>
              </div>
            </div>
          </div>

          {/* Provisional Diagnosis Banner */}
          <div className="diagnosis-summary-box">
            <strong>Clinical Provisional Diagnosis & Referral Reason:</strong>
            <p>"{selectedJourney.provisionalDiagnosis}"</p>
          </div>

          {/* 9-Stage Visual Timeline */}
          <div className="nine-stages-vertical-timeline">
            <h3>9-Stage Clinical Treatment Progression ("इलाज प्रवास"):</h3>

            <div className="timeline-items-list">
              {selectedJourney.stages.map((stage) => {
                const isCompleted = stage.status === 'completed';
                const isActive = stage.status === 'active';
                const isPending = stage.status === 'pending';

                return (
                  <div
                    key={stage.stageNumber}
                    className={`timeline-stage-row ${stage.status}`}
                  >
                    {/* Circle Node */}
                    <div className="stage-marker-node">
                      {isCompleted ? (
                        <CheckCircle2 size={24} className="node-icon-completed" />
                      ) : isActive ? (
                        <div className="pulse-active-node">
                          <span>{stage.stageNumber}</span>
                        </div>
                      ) : (
                        <div className="pending-node">
                          <span>{stage.stageNumber}</span>
                        </div>
                      )}
                      <div className="timeline-connector-line"></div>
                    </div>

                    {/* Stage Details */}
                    <div className="stage-content-card">
                      <div className="stage-header-row">
                        <div>
                          <span className="stage-num-badge">Stage {stage.stageNumber}</span>
                          <h4>
                            {language === 'mr' ? stage.marathiTitle : stage.title}
                          </h4>
                          <div className="stage-location-tag">
                            <Building size={14} />
                            <span>{stage.location}</span>
                          </div>
                        </div>

                        <div className="stage-status-badge">
                          {isCompleted ? (
                            <span className="status-pill completed">COMPLETED</span>
                          ) : isActive ? (
                            <span className="status-pill active">IN PROGRESS</span>
                          ) : (
                            <span className="status-pill pending">PENDING</span>
                          )}
                        </div>
                      </div>

                      {/* Notes & Actor */}
                      <p className="stage-notes-text">"{stage.notes}"</p>

                      <div className="stage-footer-meta">
                        <span>
                          <strong>Attending Actor:</strong> {stage.actor}
                        </span>
                        {stage.completedAt && (
                          <span>
                            <strong>Recorded At:</strong> {stage.completedAt}
                          </span>
                        )}
                      </div>

                      {/* Doctor / Worker Action: Complete this stage */}
                      {isActive && (
                        <div className="stage-action-box">
                          <input
                            type="text"
                            placeholder="Add clinical observation or update notes..."
                            value={activeStageUpdateNotes}
                            onChange={(e) => setActiveStageUpdateNotes(e.target.value)}
                            className="stage-update-input"
                          />
                          <button
                            className="complete-stage-btn"
                            onClick={() => handleUpdateStage(stage.stageNumber)}
                          >
                            <FileCheck2 size={16} />
                            <span>Mark Stage {stage.stageNumber} Completed</span>
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Outcome Footer Banner */}
          {selectedJourney.currentStageIndex >= 7 && (
            <div className="treatment-celebration-footer">
              <Sparkles size={24} className="sparkle-gold" />
              <div>
                <h4>{t.treatmentCompletedCelebration}</h4>
                <p>
                  Zero out-of-pocket expenditure verified. Discharge summary & 10-day medicine package issued under Mahatma Jyotirao Phule Jan Arogya Yojana.
                </p>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default TreatmentTracker;
