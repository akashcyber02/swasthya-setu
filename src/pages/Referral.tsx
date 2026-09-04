import React, { useState } from 'react';
import { Language, translations } from '../data/translations';
import { DigitalReferral } from '../data/maharashtraHealthData';
import { getStoredReferrals } from '../utils/offlineStorage';
import {
  Search,
  GitPullRequest,
  CheckCircle2,
  Printer,
  QrCode,
  Ambulance,
  Stethoscope,
} from 'lucide-react';

interface ReferralProps {
  language: Language;
}

export const Referral: React.FC<ReferralProps> = ({ language }) => {
  const t = translations[language] || translations.mr;
  const referrals = getStoredReferrals();

  const [searchId, setSearchId] = useState('MH-REF-2026-8841');
  const [activeReferral, setActiveReferral] = useState<DigitalReferral | null>(
    referrals[0] || null
  );

  const handleSearch = () => {
    const found = referrals.find(
      (r) =>
        r.id.toLowerCase() === searchId.trim().toLowerCase() ||
        r.patientMobile.includes(searchId.trim()) ||
        r.patientName.toLowerCase().includes(searchId.trim().toLowerCase())
    );
    if (found) {
      setActiveReferral(found);
    } else {
      alert(
        language === 'mr'
          ? 'रेफरल आयडी सापडला नाही. कृपया "MH-REF-2026-8841" किंवा "MH-REF-2026-7730" तपासा.'
          : language === 'hi'
          ? 'रेफरल आईडी नहीं मिली। कृपया "MH-REF-2026-8841" या "MH-REF-2026-7730" से खोजें।'
          : 'Referral ID not found. Please try "MH-REF-2026-8841" or "MH-REF-2026-7730".'
      );
    }
  };

  return (
    <div className="referral-page-container">
      {/* Referral Page Header */}
      <div className="referral-header-banner">
        <div>
          <span className="section-kicker">{t.referralNetworkKicker}</span>
          <h1>{t.referralTitle}</h1>
          <p>{t.referralSubtitle}</p>
        </div>

        <div className="referral-search-box">
          <input
            type="text"
            placeholder={t.referralIdPlaceholder}
            value={searchId}
            onChange={(e) => setSearchId(e.target.value)}
            className="referral-search-input"
          />
          <button className="referral-search-btn" onClick={handleSearch}>
            <Search size={16} />
            <span>{t.btnTrackReferral}</span>
          </button>
        </div>
      </div>

      {activeReferral && (
        <div className="referral-content-layout">
          {/* Visual 4-Stage Pathway Timeline */}
          <div className="referral-tracking-card">
            <div className="card-header-row">
              <div className="referral-id-pill">
                <GitPullRequest size={18} />
                <span>
                  {language === 'mr'
                    ? 'आयडी'
                    : language === 'hi'
                    ? 'आईडी'
                    : 'ID'}
                  :{' '}
                  <strong>{activeReferral.id}</strong>
                </span>
              </div>

              <span
                className={`urgency-badge ${
                  activeReferral.urgency === 'emergency'
                    ? 'urgency-crit'
                    : activeReferral.urgency === 'urgent'
                    ? 'urgency-mod'
                    : 'urgency-rout'
                }`}
              >
                {activeReferral.urgency === 'emergency'
                  ? language === 'mr'
                    ? '🚨 अति-तातडीचे (Emergency)'
                    : language === 'hi'
                    ? '🚨 अति-गंभीर (Emergency)'
                    : '🚨 Critical Emergency'
                  : activeReferral.urgency === 'urgent'
                  ? language === 'mr'
                    ? '⚡ तातडीचे २४ तास (Urgent)'
                    : language === 'hi'
                    ? '⚡ त्वरित २४ घंटे (Urgent)'
                    : '⚡ Urgent (Within 24h)'
                  : language === 'mr'
                  ? '🟢 नियमित (Routine)'
                  : language === 'hi'
                  ? '🟢 सामान्य (Routine)'
                  : '🟢 Routine Follow-up'}
              </span>
            </div>

            <h3 className="timeline-title">{t.referralJourney}</h3>

            <div className="referral-horizontal-timeline">
              {/* Step 1: Created */}
              <div className="pathway-milestone step-done">
                <div className="milestone-icon">
                  <CheckCircle2 size={20} />
                </div>
                <div className="milestone-text">
                  <strong>{t.stepCreated}</strong>
                  <span>{activeReferral.sourceFacilityName}</span>
                  <small>{activeReferral.createdAt}</small>
                </div>
              </div>

              <div className="pathway-connector done-connector"></div>

              {/* Step 2: Accepted */}
              <div
                className={`pathway-milestone ${
                  activeReferral.status === 'accepted' ||
                  activeReferral.status === 'in_transit' ||
                  activeReferral.status === 'completed'
                    ? 'step-done'
                    : 'step-pending'
                }`}
              >
                <div className="milestone-icon">
                  <CheckCircle2 size={20} />
                </div>
                <div className="milestone-text">
                  <strong>{t.stepAccepted}</strong>
                  <span>{activeReferral.destinationFacilityName}</span>
                  <small>{t.bedReservedNote}</small>
                </div>
              </div>

              <div
                className={`pathway-connector ${
                  activeReferral.status === 'in_transit' ||
                  activeReferral.status === 'completed'
                    ? 'done-connector'
                    : 'pending-connector'
                }`}
              ></div>

              {/* Step 3: In Transit */}
              <div
                className={`pathway-milestone ${
                  activeReferral.status === 'in_transit'
                    ? 'step-current'
                    : activeReferral.status === 'completed'
                    ? 'step-done'
                    : 'step-pending'
                }`}
              >
                <div className="milestone-icon">
                  <Ambulance size={20} />
                </div>
                <div className="milestone-text">
                  <strong>{t.stepInTransit}</strong>
                  <span>{t.ambulance108Coord}</span>
                  <small>{t.liveGpsTracking}</small>
                </div>
              </div>

              <div
                className={`pathway-connector ${
                  activeReferral.status === 'completed'
                    ? 'done-connector'
                    : 'pending-connector'
                }`}
              ></div>

              {/* Step 4: Completed */}
              <div
                className={`pathway-milestone ${
                  activeReferral.status === 'completed'
                    ? 'step-done'
                    : 'step-pending'
                }`}
              >
                <div className="milestone-icon">
                  <Stethoscope size={20} />
                </div>
                <div className="milestone-text">
                  <strong>{t.stepCompleted}</strong>
                  <span>{t.specialistExamDone}</span>
                  <small>{t.freeMedicineUnderMjpjay}</small>
                </div>
              </div>
            </div>
          </div>

          {/* Official Digital Referral Slip View */}
          <div className="official-referral-slip-card" id="printable-slip">
            <div className="slip-top-emblem">
              <div>
                <h4>{t.govTopTag}</h4>
                <span>{t.referralSlipTitle} • GOVERNMENT OF MAHARASHTRA</span>
              </div>
              <div className="slip-qr-box">
                <QrCode size={50} />
                <small>{activeReferral.id}</small>
              </div>
            </div>

            <div className="slip-patient-grid">
              <div className="slip-grid-col">
                <span className="slip-label">{t.patientName}</span>
                <strong>{activeReferral.patientName}</strong>
              </div>

              <div className="slip-grid-col">
                <span className="slip-label">{t.ageAndGender}</span>
                <strong>
                  {activeReferral.patientAge} {t.yearsOld} | {activeReferral.patientGender}
                </strong>
              </div>

              <div className="slip-grid-col">
                <span className="slip-label">{t.villageAndTaluka}</span>
                <strong>
                  {activeReferral.village}, {activeReferral.taluka} ({activeReferral.district})
                </strong>
              </div>

              <div className="slip-grid-col">
                <span className="slip-label">{t.abhaIdLabel}</span>
                <strong>{activeReferral.abhaId || '91-8842-1920-5512'}</strong>
              </div>
            </div>

            <div className="slip-routing-box">
              <div className="route-item">
                <span className="slip-label">{t.originSource}</span>
                <strong>📍 {activeReferral.sourceFacilityName}</strong>
              </div>
              <div className="route-arrow">➔</div>
              <div className="route-item">
                <span className="slip-label">{t.targetFacility}</span>
                <strong>🏥 {activeReferral.destinationFacilityName}</strong>
              </div>
            </div>

            <div className="slip-clinical-summary">
              <span className="slip-label">{t.provisionalDiagnosis}</span>
              <p>{activeReferral.referralReason}</p>
            </div>

            {/* Vitals Recorded at Source */}
            <div className="slip-vitals-strip">
              <div className="vital-item">
                <span>{t.vitalsBp}</span>
                <strong>{activeReferral.vitals.bp}</strong>
              </div>
              <div className="vital-item">
                <span>{t.vitalsSpo2}</span>
                <strong>{activeReferral.vitals.spo2}</strong>
              </div>
              <div className="vital-item">
                <span>{t.vitalsPulse}</span>
                <strong>{activeReferral.vitals.pulse}</strong>
              </div>
              {activeReferral.vitals.temp && (
                <div className="vital-item">
                  <span>
                    {language === 'mr'
                      ? 'तापमान:'
                      : language === 'hi'
                      ? 'तापमान:'
                      : 'Temperature:'}
                  </span>
                  <strong>{activeReferral.vitals.temp}</strong>
                </div>
              )}
            </div>

            {activeReferral.notes && (
              <div className="slip-notes-box">
                <span className="slip-label">{t.clinicalNotes}</span>
                <p>{activeReferral.notes}</p>
              </div>
            )}

            {activeReferral.assignedDoctor && (
              <div className="slip-doctor-sign">
                <span>{t.receivingOfficer}</span>
                <strong>{activeReferral.assignedDoctor}</strong>
              </div>
            )}

            <div className="slip-actions-bar">
              <button
                className="print-slip-btn"
                onClick={() => window.print()}
              >
                <Printer size={16} />
                <span>{t.btnPrintSlip}</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Directory of Other Active Referrals */}
      <section className="recent-referrals-section">
        <h3>{t.otherActiveReferrals}</h3>
        <div className="referrals-table-card">
          <table className="referrals-table">
            <thead>
              <tr>
                <th>{t.tableRefId}</th>
                <th>{t.tablePatientName}</th>
                <th>{t.tableVillageDistrict}</th>
                <th>{t.tableFrom}</th>
                <th>{t.tableTo}</th>
                <th>{t.tableUrgency}</th>
                <th>{t.tableStatus}</th>
                <th>{t.tableView}</th>
              </tr>
            </thead>
            <tbody>
              {referrals.map((r) => (
                <tr key={r.id}>
                  <td>
                    <strong>{r.id}</strong>
                  </td>
                  <td>{r.patientName}</td>
                  <td>
                    {r.village}, {r.district}
                  </td>
                  <td>{r.sourceFacilityName}</td>
                  <td>{r.destinationFacilityName}</td>
                  <td>
                    <span
                      className={`table-urgency-chip ${
                        r.urgency === 'emergency'
                          ? 'chip-red'
                          : r.urgency === 'urgent'
                          ? 'chip-orange'
                          : 'chip-green'
                      }`}
                    >
                      {r.urgency}
                    </span>
                  </td>
                  <td>
                    <span className="table-status-pill">{r.status}</span>
                  </td>
                  <td>
                    <button
                      className="view-ref-btn"
                      onClick={() => {
                        setActiveReferral(r);
                        setSearchId(r.id);
                        window.scrollTo({ top: 0, behavior: 'smooth' });
                      }}
                    >
                      {t.tableView}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
};

export default Referral;
